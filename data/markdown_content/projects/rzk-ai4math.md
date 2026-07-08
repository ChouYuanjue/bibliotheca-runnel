# Rzk AI4Math

This repository contains the artifact for an LLM autoformalization evaluation paper. The main claim is about diagnostic interpretation, not tool building: we use \Rzk/\sHoTT as a low-resource structural microscope to audit substrate bias, slice bias, and verifier-grounded local completion under controlled repair.

## Layout

- `paper/`: ACL-style paper sources
- `data/`: released JSONL manifests and benchmark slices
- `scripts/`: extraction, evaluation, replay, and analysis utilities
- `lean_portability/`: the Lean portability probe used for the substrate contrast
- `results/`: generated run outputs and summaries

## Reproducibility Docs

- [`README_REPRODUCIBILITY.md`](README_REPRODUCIBILITY.md)
- [`DATA_CARD.md`](DATA_CARD.md)
- [`EVALUATION_PROTOCOL.md`](EVALUATION_PROTOCOL.md)
- [`RUN_CARD.md`](RUN_CARD.md)
- [`ANONYMIZATION.md`](ANONYMIZATION.md)

## Environment

Use the repository's conda environment:

```bash
source /home/runnel/miniconda3/etc/profile.d/conda.sh
conda activate tangut-nlp
```

For hosted runs, set `AI4M1_API_KEY` or `AZURE_OPENAI_API_KEY` before invoking the runners. The evaluation scripts also respect `LLM_API_KEY`, `LLM_MODEL`, and related `LLM_*` settings.

## Quick Checks

```bash
python scripts/run_lean_portability_probe.py
python scripts/run_rzk_body_completion_pilot.py \
  --manifest data/shape_heavy_smoke_v0.jsonl \
  --settings direct,structure_lite,direct_repair,structure_lite_repair \
  --output-prefix shape_heavy_smoke_v0
python scripts/analyze_rzk_task_complexity.py \
  --output-jsonl results/rzk_task_complexity.jsonl \
  --output-md results/rzk_task_complexity.md
python scripts/analyze_rzk_failure_taxonomy.py \
  --output-jsonl results/rzk_failure_taxonomy.jsonl \
  --output-md results/rzk_failure_taxonomy.md
```

The main paper tables are sourced from the result files already checked into `results/` and summarized again in `paper/sections/A_appendix.tex`.
