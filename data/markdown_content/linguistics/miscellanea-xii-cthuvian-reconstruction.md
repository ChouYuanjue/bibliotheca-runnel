---
id: "miscellanea-xii"
title: "Miscellanea XII. A Formal Reconstruction of Cthuvian as a Translatable Language System"
description: "A rigorous conlanging framework for Cthuvian (R’lyehian), reconstructing its phonology, morphology, and syntax into a dual-register system that preserves Mythos authenticity while enabling consistent English-to-Cthuvian translation and partial reverse interpretation."
slug: "miscellanea-xii-cthuvian-reconstruction"
date: "2026-04-29"
tags: [Conlanging, Linguistics, Cthulhu Mythos, Semiotics]
---

## RC-1: A Usable Translation-Oriented Reconstruction of Cthuvian

The following is a **standardized, translation-capable Cthuvian / R’lyehian system**. It does not claim to recover Lovecraft’s “true grammar.” Instead, it treats the available Cthuvian material as a corpus, then supplies the missing phonology, morphology, syntax, derivation, and decoding rules that a rigorous conlanger would need.

The hard constraints preserved here are as follows: the available materials present Cthuvian / R’lyehian as a fictional alien language of the Cthulhu Mythos. Its phonology permits extremely dense syllable structures. The sources also note that **h** after a consonant modifies that consonant’s pronunciation. Grammatically, word-class boundaries are unclear, affixes fuse with roots, prepositions often become prefixes, plurality may be expressed through repetition of final syllables, and word order is relatively free. The sources also repeatedly emphasize that the written form is only a rough approximation of a mind-projected or nonhuman language, and that much meaning is lost outside context.

Sources: [Conlang Fandom: Cthuvian](https://conlang.fandom.com/wiki/Cthuvian), [Cthulhu Club: Learn Cthuvian](https://www.cthulhuclub.com/articles/learn-cthuvian/)

Therefore, this system adopts a two-layer model:

1. **The “High Register Compression Layer”** preserves the ambiguity, poetic density, and ritual opacity of Cthuvian phrases from Lovecraftian fiction.
2. **The “Translator’s Low Register Layer”** adds explicit role marking, tense-aspect markers, derivational rules, and enough regularity to make stable English-to-Cthuvian translation possible.

Original Cthulhu Mythos phrases are not treated as incorrect. They are interpreted as high-register forms that omit many low-register grammatical markers.

GitHub Repository: https://github.com/ChouYuanjue/Rlyehian-Cthuvian-Translator/

Translator Demo: https://rlyehian-cthuvian-translator.netlify.app/

---

### 1. Basic Principles

**RC-1 is not designed to turn Cthuvian into English wearing alien spelling. It is designed to let Cthuvian carry English information while still looking and behaving like Cthuvian.**

It has three general principles.

**First, roots have no fixed part of speech.**
A root may function as a noun, verb, adjective, or state depending on position and affixation. For example, `kadishtu` may mean “to know,” “to understand,” “knowledge,” “understanding,” or “knowing.” `fhtagn` may mean “to wait,” “to dream-sleep,” “waiting,” “latent dreaming,” or “being in a state between sleep and awakening.”

**Second, semantics come before syntax.**
In the high register, word order may be free. Interpretation depends on context, divine names, place names, and fixed formulas. In the low register, role suffixes may be added for translation precision.

**Third, all new words must look Cthuvian.**
English words must not be copied directly. One should not translate “English” as `inglish`. New words should preferably be formed through Cthuvian roots and compounds. Technical terms, modern words, and proper names may use “foreign-source transcription,” but they must undergo phonological distortion, glottal insertion, and classification suffixes.

---

### 2. Phonology and Orthography

#### 2.1 Letters

Consonants:

`p b t d k g c m n ng f v s sh th h r l y w`

Permitted clusters include:

`cth, kth, fht, mgl, mglw, ngl, thfl, n’gh, shg, ll, rr, gh, kh`

Vowels:

`a e i u ä ’`

The apostrophe `’` has three functions:

1. It represents a glottal stop, rupture, or nonhuman central vowel.
2. It marks morpheme boundaries, as in `ph’nglui`.
3. It allows otherwise unpronounceable consonant clusters to be written in compressed form.

#### 2.2 The Rule of h

When `h` appears alone, it is a throat sound.
When it follows a consonant, it does not simply represent /h/. Instead, it pharyngealizes, weakens, roughens, or distorts the preceding consonant.

Thus:

`ph` is not simply English “f,” but a deep-throated sound between /p/ and /f/.

`th` is not ordinary English “th,” but a tense dental-throatal fricative.

`fh` is a breathy, frictional, half-choked f-like sound.

This preserves the source material’s treatment of `h`.

#### 2.3 Syllable Structure

The standard syllable may be written as:

`(C)(C)(C)(C)V(C)(C)`

Typical legal forms include:

`nglui`

`fhtagn`

`mglw’nafh`

`thflthkh`

`n’grkdl’lh`

Human speakers may insert an extremely short central vowel between consonants when reading aloud, but this vowel is not shown in writing.

---

### 3. General Morphological Template

A complete word is roughly built in the following order:

`[relation/preposition prefix] + [negative/tense-aspect prefix] + [pronoun/possessive prefix] + root + [derivational suffix] + [number/intensity repetition] + [role suffix]`

For example:

`ph-nglui` 
= beyond-threshold 
= death, being outside the gate, trans-threshold state

`c-fhayak` → `cf’ayak` 
= we-offer 
= we offer

The existing material contains `c-` as a first-person plural prefix, and it affects the interpretation of the following consonant. RC-1 formalizes this as a regular sound-change rule.

---

### 4. Pronouns and Possessives

#### 4.1 Independent Pronouns

| RC-1   | Meaning                                  |
| ------ | ---------------------------------------- |
| `ya`   | I                                        |
| `tha`  | you                                      |
| `hya`  | he, she, it, this entity                 |
| `cya`  | we                                       |
| `fya`  | they, those entities                     |
| `gha`  | this, this one                           |
| `ngha` | that, that one                           |
| `sya`  | someone, something, an indefinite entity |

`ya` is compatible with the source interpretation of “I.”

#### 4.2 Possessive Prefixes

| Prefix | Meaning       |
| ------ | ------------- |
| `y-`   | my            |
| `th-`  | your          |
| `h-`   | his, her, its |
| `c-`   | our           |
| `f-`   | their         |

Examples:

`y’orr’e` = my soul

`h’ee` = its answer, his answer, her answer

`c-vulgtm` → `cvulgtm / c’vulgtm` = our prayer

---

### 5. Low-Register Role Suffixes

The high register may omit roles.

The low register uses role suffixes to guarantee English-to-Cthuvian translatability.

| Suffix | Function                  | Approximate English    |
| ------ | ------------------------- | ---------------------- |
| `-yr`  | actor, agent, experiencer | subject, agent         |
| `-ef`  | patient, theme            | object, patient, theme |
| `-ug`  | recipient, goal           | to, for                |
| `-agl` | location                  | at, in, on             |
| `-hup` | source, origin            | from, of               |
| `-vra` | accompaniment, membership | with, among            |
| `-li`  | instrument, price, cause  | by, with, because of   |
| `-ep`  | result, transformed state | into, as result        |

Example:

`Ya-yr na kadishtu nilgh’ri-ef.` 
= I-agent not know all-things-object. 
= I do not know everything.

The high-register version may be compressed as:

`Ya na kadishtu nilgh’ri.`

This remains compatible with the source’s interpretation of `Ya na kadishtu nilgh’ri`.

---

### 6. Tense, Aspect, Mood, and Negation

The source material already suggests a system with only “present” and “non-present,” as well as multivalent forms such as `nafl-`, `na`, and `mg-`. RC-1 regularizes these.

| Form         | RC-1 Function                               | Explanation                         |
| ------------ | ------------------------------------------- | ----------------------------------- |
| zero marking | gnomic, present, mythic truth               | default                             |
| `hai`        | now, at this moment                         | explicit present                    |
| `nafl-`      | non-present, already, not-yet, hypothetical | specified by context or time adverb |
| `mg-`        | still, yet, however                         | continuative plus concessive        |
| `ilyaa-`     | will, expected to, awaiting occurrence      | future / expectation                |
| `ng-`        | then, next, and then                        | sequential                          |
| `na`         | not, no, non-                               | negation                            |
| `syha’h`     | eternal, always                             | eternal aspect                      |
| `ep`         | thereafter, thus, as a result               | consequent time point               |

Key explanation:

`nafl-` is not a simple past tense. 
Its core meaning is “outside the present.”

Therefore it may indicate:

* past: `nafl’athg` = wrote, signed, inscribed;
* hypothetical: `nafl’fhtagn` = would wait, may it wait;
* unreal or counterfactual: `nafl’wk’hmr` = if it transformed, were it transformed.

`na` is direct negation:

`Ya na kadishtu.`
= I do not know.

`mg-` combines “still” and “however.” Therefore `mglw’nafh` may be interpreted as “though dead, still living,” “still active,” or “still living in dream.” The source material also interprets `mg` as a connective or contrastive prefix and links `lw’nafh` with living or acting.

---

### 7. Basic Syntax

#### 7.1 Low-Register Standard Word Order

For translatability, the low-register default order is:

`[scene/time] + predicate + actor + patient + goal + location + instrument/cause + result`

However, as long as role suffixes are clear, word order may vary.

Example:

`Nafl’athg ya-yr s’uhn-ef y’orr’e-li.` 
= signed I-agent pact-object my-soul-price. 
= I signed the pact with my soul as payment.

High-register compression:

`Ya nafl’athg s’uhn y’orr’e-li.`

#### 7.2 Copula

RC-1 does not require a word equivalent to “be.”

`Cthulhu ph’nglui.` 
= Cthulhu is dead / beyond the gate.

When identity, equivalence, or predication must be explicit, use `ai`.

`Yog-Sothoth ai nglui.` 
= Yog-Sothoth is the gate / Yog-Sothoth, gate-aspect.

The source material suggests that `ai` links different qualities to one subject. RC-1 fixes this as a grammatical function.

#### 7.3 Questions

| RC-1        | Meaning                     |
| ----------- | --------------------------- |
| `kn’a`      | question, whether           |
| `kn’a-yr`   | who                         |
| `kn’a-ef`   | what                        |
| `kn’a-agl`  | where                       |
| `kn’a-rhan` | when                        |
| `kn’a-li`   | why, by what cause          |
| `kn’a-vra`  | with whom, among what group |

Examples:

`Kn’a-yr fhtagn l’nglui-agl?` 
= who waits at-gate-location? 
= Who waits at the gate?

`Tha-yr kadishtu kn’a-ef?` 
= you-agent know what-object? 
= What do you know?

#### 7.4 Relative Clauses

Use `ai` to connect a noun with an explanatory clause.

`shuggoth ai ya-yr nafl’yll-ef` 
= earth-native that I-agent saw-object 
= the human whom I saw

`wgah’nagl ai hya-yr fhtagn` 
= dwelling that he waits 
= the house where he waits

---

### 8. Nouns, Plurals, and Derivation

#### 8.1 Plurality

The source material contains examples in which plurality is formed by repeating a final syllable, such as `n’gha` → `n’gha-ghaa`, as well as analyses based on final repetition.

RC-1 rules:

1. If the word ends in an open syllable, repeat the final syllable and lengthen the vowel.

   `n’gha` → `n’gha-ghaa`

   death → deaths

2. If the word ends in a consonant, repeat the final consonant.

   `vulgtm` → `vulgtmm`

   prayer → prayers

3. Living beings, offspring, and collective groups often take `-nn`.

   `gof’nn` = offspring, children

#### 8.2 Common Derivational Suffixes

| Suffix         | Function                                     | Example                                |
| -------------- | -------------------------------------------- | -------------------------------------- |
| `-agl`         | place, location                              | `wgah’nagl` = dwelling place           |
| `-oth`         | native being of a domain                     | `shoggoth` = deep-native               |
| `-yth / -nyth` | servant, executor, professional agent        | `kadishtu-nyth` = scholar              |
| `-hu`          | skin, boundary, covering, interface          | `ftaghu` = skin, boundary              |
| `-eeh`         | answer, knowledge-object, knowable content   | `r’luh-eeh` = secret knowledge         |
| `-na`          | state, abstract noun                         | `n’gha-na` = deathness, mortality      |
| `-ri`          | totality, collective whole                   | `nilgh’ri` = all things                |
| `-og`          | intensifier, greatness, horror-amplification | `throdog` = violent trembling, wailing |

The interpretation of `-agl`, `-oth / -nyth`, and `-og` is compatible with the source analysis, especially in forms such as `wgah’nagl`, `shoggoth`, and `throdog`.

---

### 9. Core Root List

The following are the core roots of RC-1.

Roots marked here as inherited come from, or are compatible with, the existing materials. Expanded roots are added to make ordinary translation possible.

#### 9.1 Inherited or Source-Compatible Roots

| Root         | Core Meaning                                              |
| ------------ | --------------------------------------------------------- |
| `ia / iä`    | sacred cry, exclamation, ritual praise                    |
| `ai`         | say, call, link, identify                                 |
| `ah`         | do, generic action                                        |
| `athg`       | sign, write, pledge, inscribe                             |
| `bug`        | go, leave, move toward                                    |
| `bthnk`      | body                                                      |
| `ch`         | cross, travel                                             |
| `ctenff`     | brotherhood, society, community                           |
| `ebumna`     | abyss, pit, mine                                          |
| `eeh`        | answer, response                                          |
| `fhayak`     | offer, present, place before                              |
| `fhtagn`     | wait, dream-sleep, lie latent                             |
| `ftaghu`     | skin, boundary, covering                                  |
| `geb`        | here, this place                                          |
| `gof’nn`     | children, offspring, descendants                          |
| `hai`        | now, at this moment                                       |
| `hupadgh`    | from, belonging to, born of                               |
| `ilyaa`      | wait for, expect                                          |
| `kadishtu`   | know, understand                                          |
| `kn’a`       | question, inquiry                                         |
| `k’yarnak`   | share, exchange                                           |
| `l-`         | beside, except, near, laterally related to                |
| `lloig`      | mind, spirit, intellect                                   |
| `lw’nafh`    | alive, active, living motion                              |
| `mg-`        | still, yet, however                                       |
| `na`         | not, non-                                                 |
| `nafl-`      | non-present, hypothetical, past, unreal                   |
| `n’gha`      | death, deadness                                           |
| `n’ghft`     | darkness, death-darkness                                  |
| `ng-`        | then, next                                                |
| `nglui`      | gate, threshold, boundary                                 |
| `nilgh’ri`   | all, all things                                           |
| `orr’e`      | soul, soul-substance                                      |
| `ph-`        | beyond, across, outside                                   |
| `phlegeth`   | information-domain, data-realm, immaterial exchange-field |
| `r’luh`      | secret, hidden                                            |
| `s’uhn`      | pact, agreement, dark binding                             |
| `shagg`      | dream-domain                                              |
| `shogg`      | abyss, underground, primal depth                          |
| `shugg`      | earth, soil, ground                                       |
| `stell’bsna` | request, ask, seek instruction                            |
| `syha’h`     | forever, always, eternal                                  |
| `throd`      | tremble, shudder, wail                                    |
| `uaaah`      | spell-completion, ritual closure                          |
| `uln`        | summon, call to a place                                   |
| `ut`         | utterance, ritual opening                                 |
| `vra`        | with, as a member of                                      |
| `vugtlagln`  | beg, plead for response                                   |
| `vulgtm`     | prayer                                                    |
| `wgah’n`     | dwell, be located, be within                              |
| `wk’hmr`     | transform, attach, make take on form                      |
| `ygnaiih`    | father, my father                                         |
| `zhro`       | counterspell completion, cancellation, sealing back       |

#### 9.2 Expanded Basic Roots

These roots are newly added in RC-1 to allow translation of ordinary English.

| Root       | Core Meaning                    |
| ---------- | ------------------------------- |
| `kthar`    | stone, solid matter, block      |
| `ulh`      | water, liquid, flow             |
| `cthugh`   | fire, heat, energy              |
| `hral`     | air, wind, breath               |
| `yyl`      | light, see, appear              |
| `mnahn`    | memory, history, record         |
| `zhrn`     | number, measurement, order      |
| `rhan`     | time, cycle                     |
| `ghrath`   | large, vast, many               |
| `vren`     | small, tiny, few                |
| `mghal`    | blood, red, life-fluid          |
| `khlid`    | cold, still, frozen             |
| `ghor`     | sound, noise, vibration         |
| `thrul`    | desire, tendency, will          |
| `llogr`    | force, power, potential         |
| `nyar`     | or, possibility, divergent path |
| `k’th`     | if, condition                   |
| `zh’vul`   | beauty, seductive order         |
| `n’vul`    | ugliness, distorted disorder    |
| `fmagl`    | tool, device, machine           |
| `rhygg`    | plant, stretching growth        |
| `grahm`    | animal, moving flesh            |
| `shuggoth` | earth-native, human             |
| `shoggoth` | deep-native, shoggothic being   |

Note that `shuggoth` and `shoggoth` are intentionally similar:

`shugg-oth` = earth-native, human

`shogg-oth` = deep-native, shoggothic being

This fits the Cthuvian preference for near-homophony, semantic contamination, and horrifying misreading.

---

### 10. Word Formation Rules

#### 10.1 Default Compound Order: Modifier Before Head

`r’luh-eeh` 
= secret-knowledge-object 
= secret knowledge, forbidden doctrine

`phlegeth-lloig’agl` 
= information-domain-mind-place 
= computer, data-thinking device

`ulh-ri’agl` 
= water-totality-place 
= ocean

`kadishtu-nyth` 
= knowledge-servant/executor 
= scholar, researcher, scientist

#### 10.2 Action Nouns, Tool Nouns, Profession Nouns

| Structure      | Meaning                                     |
| -------------- | ------------------------------------------- |
| `root + -na`   | abstract state                              |
| `root + -agl`  | place where the action occurs               |
| `root + -hu`   | interface, surface, or medium of the action |
| `root + -nyth` | person or being who performs the action     |
| `root + fmagl` | tool used for the action                    |

Examples:

`athg-na` = writing, signing, inscription-act

`athg-hu` = writing surface, inscribed medium

`athg-fmagl` = pen, carving tool, writing device

`athg-nyth` = scribe, signer, inscriber

#### 10.3 Modern Word Formation

Modern concepts must not be transliterated directly from English. Semantic compounds are preferred.

| English   | RC-1                                                                |
| --------- | ------------------------------------------------------------------- |
| computer  | `phlegeth-lloig’agl`, information-mind-place                        |
| internet  | `nilgh’ri phlegeth-uln’agl`, all-things information-summoning-place |
| telephone | `ghor-ai fmagl`, sound-calling tool                                 |
| camera    | `yyl-mnahn fmagl`, light-memory tool                                |
| book      | `eeh-ftaghu`, knowledge-skin                                        |
| city      | `wgah’nagl-ri`, totality of dwelling places                         |
| spaceship | `stell-bug fmagl`, star-going device                                |
| democracy | `shuggoth-kn’a-ctenff`, earth-native question-decision community    |
| science   | `kadishtu-na zhrn-li`, knowing-state by measurement                 |
| religion  | `vulgtm-ctenff`, prayer-community                                   |
| contract  | `s’uhn`                                                             |
| signature | `athg-hu` or `athg-eeh`                                             |
| law       | `ctenff-s’uhn`, community-pact                                      |
| prison    | `ph’nglui-wgah’nagl`, beyond-threshold dwelling, separated dwelling |

---

### 11. Foreign-Source Transcription Rules

When a proper name, brand, scientific term, or otherwise necessary borrowed form must be preserved, RC-1 uses “foreign-source transcription.”

Rules:

1. Do not preserve the English spelling directly.
2. First derive a sound value from a non-English source, Latin/Greek etymology, native pronunciation, or proper-name pronunciation.
3. Convert it into Cthuvian phonotactics.
4. Add a classifying suffix when useful.

#### 11.1 Sound-Change Table

| Source Sound | RC-1 Tendency    |
| ------------ | ---------------- |
| p            | `ph`, `p’`       |
| b            | `b`, `bh`        |
| t            | `th`, `t’`       |
| d            | `d`, `dh`        |
| k / c / q    | `k`, `cth`, `k’` |
| g            | `g`, `gh`        |
| f            | `fh`, `f`        |
| v            | `v`, `w`         |
| s            | `s`, `sh`        |
| z            | `zh`             |
| r            | `r`, `r’`, `rh`  |
| l            | `l`, `ll`        |
| m            | `m`, `mgl`       |
| n            | `n`, `ng`, `n’`  |
| a            | `a`, `ä`         |
| e            | `e`, `ee`        |
| i / y        | `i`, `y`         |
| o            | `u`, `og`        |
| u            | `u`, `uh`        |

If the transcription leaves a sequence of three or more letters identical to the English original, insert `’` or `h`, or replace the sequence with a near-sound cluster.

Examples:

London → do not write `London`

Possible RC-1 form: `Lhond’nym’agl`, the place called London

Newton → do not write `Newton`

Possible RC-1 form: `Nyw’thun-yth`, Newton-person

quantum → do not write `quantum`

Possible RC-1 form: `k’wanth’agm-na`, quantum-state

DNA → may be translated semantically as `bthnk-mnahn-zhrn`, body-memory-order.

If the letters themselves must be preserved, use the sealed-name method.

---

### 12. Sealed-Name Method: Encoding Any String

To make complete translation theoretically possible, RC-1 permits “sealed names.”

Format:

`zha’ [letter-name sequence] ’zhro`

Letter names:

| Letter | Name   |
| ------ | ------ |
| A      | `a`    |
| B      | `bhu`  |
| C      | `cth`  |
| D      | `dhu`  |
| E      | `ee`   |
| F      | `fha`  |
| G      | `ghu`  |
| H      | `ha`   |
| I      | `ii`   |
| J      | `zhya` |
| K      | `kha`  |
| L      | `lla`  |
| M      | `mna`  |
| N      | `ngha` |
| O      | `u`    |
| P      | `pha`  |
| Q      | `k’wa` |
| R      | `rha`  |
| S      | `sha`  |
| T      | `tha`  |
| U      | `uu`   |
| V      | `vha`  |
| W      | `wha`  |
| X      | `khs`  |
| Y      | `yha`  |
| Z      | `zha`  |

Example:

DNA 
= `zha’dhu-ngha-a’zhro`

This is not the elegant translation. It is only the fallback encoding mechanism. Normal text should use semantic translation whenever possible.

---

### 13. Numbers

RC-1 uses low-register decimal numbers for ease of translating modern texts.

| Number | RC-1                            |
| ------ | ------------------------------- |
| 0      | `nyl`                           |
| 1      | `yak`                           |
| 2      | `ghal`                          |
| 3      | `thog`                          |
| 4      | `khrun`                         |
| 5      | `vlag`                          |
| 6      | `shuth`                         |
| 7      | `zhral`                         |
| 8      | `fhtan`                         |
| 9      | `mglun`                         |
| 10     | `zhrn-yak-nyl`, number-one-zero |

Large numbers may be read digit by digit:

2026 
= `zhrn ghal-nyl-ghal-shuth`

“The third one”:

`thog-zhrn’yth` 
= three-number-ordinal-being 
= third

---

### 14. Compatibility with Original Mythos Sentences

#### 14.1 The Famous Cthulhu Formula

`ph’nglui mglw’nafh Cthulhu R’lyeh wgah’nagl fhtagn.`

The source materials associate this sentence with translations such as “In his house at R’lyeh, dead Cthulhu waits dreaming.” They also connect `ph’nglui`, `mglw’nafh`, `wgah’nagl`, and `fhtagn` with death or threshold-crossing, still-living or still-dreaming, dwelling, and waiting.

RC-1 analysis:

| Form               | Analysis                                                    |
| ------------------ | ----------------------------------------------------------- |
| `ph’nglui`         | beyond the threshold; dead; outside the boundary of reality |
| `mg-lw’nafh`       | yet still alive, still active, still living in dream        |
| `Cthulhu`          | topic / divine name                                         |
| `R’lyeh wgah’nagl` | the dwelling-place of R’lyeh                                |
| `fhtagn`           | waits, dream-sleeps, lies latent                            |

Low-register expansion:

`Ph’nglui mg-lw’nafh Cthulhu-yr fhtagn R’lyeh wgah’nagl-agl.`

Literal translation:

“Threshold-crossed yet still living, Cthulhu waits dreaming in the dwelling-place of R’lyeh.”

This preserves the ambiguity of the original:

It may mean “dead and dreaming,”

or “beyond the gate yet not destroyed,”

or “in a waiting state outside the threshold of life.”

#### 14.2 “I Know Nothing”

High register:

`Ya na kadishtu nilgh’ri.`

RC-1 expansion:

`Ya-yr na kadishtu nilgh’ri-ef.`

Analysis:

`ya` = I

`na` = not

`kadishtu` = know, understand

`nilgh’ri` = all, all things

Translation:

“I know nothing / I do not know all things.”

The source material also interprets this kind of sentence as “I know nothing” or “I do not know everything.”

#### 14.3 “The Offspring of the Black Goat”

High register:

`gof’nn hupadgh Shub-Niggurath.`

RC-1 analysis:

`gof’nn` = children, offspring, descendants

`hupadgh` = from, belonging to, born of

`Shub-Niggurath` = divine name

Translation:

“offspring born of Shub-Niggurath.”

The source material similarly interprets `gof’nn` as offspring or children, and `hupadgh` as from, belonging to, or born of.

#### 14.4 Ritual Spell Sentence

High register:

`Y’ai ’ng’ngah, Yog-Sothoth h’ee – l’geb f’ai throdog uaaah.`

RC-1 analysis:

| Form               | Analysis                                     |
| ------------------ | -------------------------------------------- |
| `Y’ai`             | my call, I call                              |
| `’ng’ngah`         | then-act, intensified ritual action          |
| `Yog-Sothoth h’ee` | Yog-Sothoth answers                          |
| `l’geb`            | beside here, near this place                 |
| `f’ai throdog`     | they / the things call and violently tremble |
| `uaaah`            | spell closure, completion                    |

Translation:

“I call and perform the ritual act; Yog-Sothoth answers; the things around this place wail and tremble. The spell is complete.”

The source material likewise interprets the sentence as involving calling, answering, surrounding things trembling, and `uaaah` as a spell-ending or completion word.

---

### 15. Translation Procedure

#### 15.1 English → RC-1

Procedure:

1. Identify subject, predicate, object, location, time, cause, and result.
2. Replace English words with existing roots.
3. If no existing root exists, use semantic compounding.
4. If semantic compounding still fails, use foreign-source transcription.
5. Add low-register role suffixes where precision is needed.
6. If a literary or ritual style is desired, remove some role suffixes and compress into high register.

Example 1:

English:
“I do not know everything.”

Low register:

`Ya-yr na kadishtu nilgh’ri-ef.`

High register:

`Ya na kadishtu nilgh’ri.`

---

Example 2:

English:
“We offer prayers to Hastur.”

Low register:

`Cya-yr cf’ayak vulgtmm-ef Hastur-ug.`

Older, more prayer-like style:

`Hastur cf’ayak ’vulgtmm.`

Analysis:

`c-` = we

`fhayak` = offer

`vulgtmm` = prayers, plural of prayer

`Hastur-ug` = to Hastur

---

Example 3:

English:
“The scholar wrote a book about the hidden city.”

RC-1:

`Kadishtu-nyth-yr nafl’athg eeh-ftaghu-ef l’r’luh wgah’nagl-ri.`

Word by word:

`kadishtu-nyth-yr` = knowledge-executor-agent, scholar

`nafl’athg` = wrote, inscribed, signed in non-present time

`eeh-ftaghu-ef` = knowledge-skin-object, book

`l’r’luh wgah’nagl-ri` = concerning / beside the hidden totality of dwelling-places, the hidden city

Translation:

“The scholar wrote a book concerning the hidden city.”

---

Example 4:

English:
“The machine transforms the body into a gate.”

RC-1:

`Fmagl-yr wk’hmr bthnk-ef nglui-ep.`

Word by word:

`fmagl-yr` = tool / machine-agent

`wk’hmr` = transforms, attaches, makes take on form

`bthnk-ef` = body-object

`nglui-ep` = as-result gate

Translation:

“The machine transforms the body into a gate.”

---

Example 5:

English:
“In the sea, the dead god still dreams.”

RC-1:

`L’ulh-ri’agl ph’nglui llogr’yth-yr mg-fhtagn.`

Word by word:

`l’ulh-ri’agl` = in the water-totality-place, in the sea

`ph’nglui` = beyond the threshold, dead

`llogr’yth` = force-being, godlike powerful entity

`mg-fhtagn` = still waits, still dream-sleeps

Translation:

“In the sea, the dead god still dreams.”

---

### 16. Approximate Cthuvian → English Interpretation

Because word classes are not fixed, Cthuvian-to-English translation cannot guarantee a single unique result. Interpretation should proceed in the following order:

1. First identify divine names, place names, and fixed ritual formulas.
2. Then segment prefixes: `ph-`, `mg-`, `nafl-`, `ng-`, `l-`, `h-`, `y-`, `c-`, `f-`.
3. Then identify suffixes: `-agl`, `-oth`, `-nyth`, `-hu`, `-eeh`, `-na`, `-ri`, `-og`.
4. If role suffixes are present, translate according to the low register.
5. If role suffixes are absent, treat the phrase as high register: the topic is usually a divine name or salient noun; locations often precede the predicate; a strong final verb often serves as the clause nucleus.
6. Each root should first be interpreted as a semantic bundle, then assigned an English part of speech according to context.

For example:

`ph’nglui`

Do not translate it only as “dead.”
First interpret it as:

“across the gate, beyond the threshold, outside the boundary, death, nonhuman unreality-state.”

Then, according to context, it may be rendered as:

* dead
* beyond the gate
* outside life
* in deathlike stasis
* having crossed the threshold

This is the core of RC-1:

**English → Cthuvian is translatable; Cthuvian → English is interpretable but not unique.**

---

### 17. Short Grammatical Paradigms

#### 17.1 Statement

`Ya-yr kadishtu r’luh-eeh-ef.`

I know the secret knowledge.

#### 17.2 Negation

`Ya-yr na kadishtu r’luh-eeh-ef.`

I do not know the secret knowledge.

#### 17.3 Past / Non-Present

`Ya-yr nafl’kadishtu r’luh-eeh-ef.`

I once knew the secret knowledge.

#### 17.4 Future / Expectation

`Ya-yr ilyaa-kadishtu r’luh-eeh-ef.`

I will know / I expect to know the secret knowledge.

#### 17.5 Question

`Tha-yr kadishtu kn’a-ef?`

What do you know?

#### 17.6 Condition

`K’th tha-yr ph’nglui, ep hya-yr fhtagn.`

If you cross the threshold, then it waits.

#### 17.7 Command

`Ut kadishtu r’luh-eeh-ef uaaah.`

Know this secret knowledge. The spell is complete.

#### 17.8 Counterspell

`Zhro nafl’kadishtu r’luh-eeh-ef zhro.`

Let this knowing be withdrawn; the counterspell is sealed.

---

### 18. Where the “Cthulhu Flavor” Comes From

RC-1 does not rely on random gibberish. Its Cthuvian flavor comes from five mechanisms.

First, **the threshold metaphor is generalized**.

Death is not simply “dead,” but `ph’nglui`: having crossed the gate, being beyond the threshold.

Second, **word classes dissolve**.

`kadishtu` is simultaneously “know,” “knowledge,” “understanding,” and “wise.”

Third, **semantic domains are root-based**.

`shogg`, `shagg`, `lloig`, and `phlegeth` refer respectively to the deep domain, dream domain, mind domain, and information domain.

Fourth, **classification suffixes shape meaning**.

`-agl` marks place, `-oth` marks native-being, `-nyth` marks servant or executor, and `-hu` marks skin, boundary, or interface.

Fifth, **high and low registers coexist**.

Original mythic phrases may remain difficult and ambiguous. When a translator needs precision, they add role suffixes such as `-yr`, `-ef`, and `-ug`.

Thus, original Cthulhu Mythos sentences remain valid, while new sentences can be generated consistently.

For example, the English sentence:

“The human remembers the sea.”

should not be rendered by distorting English words. Instead:

`Shuggoth-yr mnahn ulh-ri’agl-ef.`

Literal translation:

“The earth-native remembers the water-totality-place.”

A high-register version may compress this further:

`Shuggoth mnahn ulh’ri.`

This is the basic shape of RC-1:

**translatable, interpretable, and still strange.**
