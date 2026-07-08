# R'lyehian-Cthuvian Translator

This repository contains a deterministic translator toolkit for **RC-1**, a standardized R'lyehian/Cthuvian conlang layer designed for practical translation.

The project does not claim to recover a historical or canonical grammar. Instead, it treats the public Cthuvian/R'lyehian material as seed corpus and builds a rigorous, versioned translation system around it:

- English to RC-1 is intended to be stable and mostly deterministic.
- RC-1 to English is intentionally gloss-like and multi-valued.
- Lovecraftian source phrases such as `ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn` remain valid high-register forms.
- Unknown or unsafe text is preserved through reversible sealed encoding.
- Optional LLM usage is constrained to proposal tasks; accepted terms belong to the registry, not to the model.

## Quick Start

```powershell
python -m pip install -e ".[dev]"
python -m pytest
python -m cthuvian_translator.cli translate "I do not know everything."
python -m cthuvian_translator.cli translate "I do not know everything." --register high
python -m cthuvian_translator.cli gloss "ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn"
```

For the Netlify Web UI:

```powershell
npm install
npm test
npm run build
npm run dev
```

Deploy settings are already in `netlify.toml`:

```text
Build command: npm run build
Publish directory: public
Functions directory: netlify/functions
```

Copy `.env.example` to `.env` for local development. In Netlify production, set the same values in the Netlify environment variable UI or CLI with Functions scope. Do not place real LLM API keys in frontend code.

Expected examples:

```text
Ya-yr na kadishtu nilgh'ri-ef
Ya na kadishtu nilgh'ri
dead; beyond the threshold / still living or active / unknown or proper name / unknown or proper name / dwelling-place / waits, dreams, lies dormant
```

## Project Layout

```text
data/
  affixes.yaml       RC-1 prefixes, role suffixes, derivational suffixes
  lexemes.yaml       seed lexemes, pronouns, proper names, fixed terms
  registry.json      local read-only accepted terminology seed
docs/
  LANGUAGE_SPEC.md
  ARCHITECTURE.md
  NETLIFY_REGISTRY.md
  LLM_PLUGIN.md
src/cthuvian_translator/
  translator.py      English -> IR -> low/high RC-1
  reverse.py         RC-1 -> English gloss forest
  sealing.py         reversible sealed fallback
  registry.py        local registry adapter
  llm.py             minimal LLM plugin protocol
tests/
public/
  index.html        Netlify Web UI
  app.js
  styles.css
netlify/functions/
  translate.mjs     server-only API route
  rc1-runtime.mjs   JS RC-1 runtime shared by tests and function
```

## Design Summary

The translator behaves like a small compiler:

```text
English text
  -> normalized tokens
  -> clause IR
  -> lexeme and registry lookup
  -> RC-1 morphology
  -> phonological cleanup
  -> low or high register surface text
```

The reverse path is not a single translation. It is a glossing tool:

```text
RC-1 text
  -> token and suffix analysis
  -> lexical gloss candidates
  -> notes about role suffixes and ambiguity
```

For production use, keep `data/lexemes.yaml` and `data/affixes.yaml` in Git as the immutable rule base, and store learned accepted terminology in a database registry.

## Current Scope

The implementation is intentionally compact. It currently handles:

- simple subject-verb-object clauses
- negation
- a small set of past/non-present verb forms
- prepositional roles such as `to`, `in`, `with`, `into`, and `about`
- seeded Cthuvian mythos names and RC-1 terms
- sealed fallback for arbitrary text

The architecture is ready for richer English parsing, a Postgres-backed registry, and optional constrained LLM proposals.

## Web UI Security Model

The browser calls only `/api/translate`. The LLM provider key is read inside the Netlify Function from `process.env.LLM_API_KEY`, so it is never bundled into `public/app.js`.

LLM use is gated server-side:

- `LLM_ENABLED=true` must be set.
- If `PUBLIC_LLM_ENABLED=false`, requests must include `X-RC1-LLM-GATE` matching `LLM_GATE_TOKEN`.
- `LLM_DAILY_LIMIT_PER_IP` limits server-side LLM calls per IP when Netlify Blobs are available.
- `SITE_ORIGIN` can restrict browser origins.

The public toggle only asks the server to use LLM assistance. It does not grant permission by itself.

The Web UI also includes two common-vocabulary layers:

- a hand-built RC-1 compound layer for everyday words such as `pencil`, `phone`, `computer`, `car`, `school`, and `money`
- an offline generated 5000-word frequency seed from `google-10000-english-no-swears`, with word-family normalization and semantic root matching so analyzable words like `telephone`, `software`, and `biology` become RC-1 compounds

Unknown terms now follow this order:

```text
core lexicon -> hand common terms -> generated frequency seed -> learned registry -> gated LLM compound/coined term -> sealed fallback
```

This keeps sealed `zha'...'zhro` output as a last resort instead of the default look for normal vocabulary.

See [docs/OFFLINE_LEXICON.md](docs/OFFLINE_LEXICON.md) for the generation pipeline.

Lexicon quality can be checked with:

```bash
npm run check:lexicon
```

## Sources Used For RC-1 Constraints

The RC-1 specification was shaped from the two references:

- <https://conlang.fandom.com/wiki/Cthuvian>
- <https://www.cthulhuclub.com/articles/learn-cthuvian/>

See [docs/LANGUAGE_SPEC.md](docs/LANGUAGE_SPEC.md) for the full language rules and compatibility notes.
