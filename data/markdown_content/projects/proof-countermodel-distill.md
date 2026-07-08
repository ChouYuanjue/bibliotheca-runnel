# ProCo: Missing-Support Witnesses for ProofWriter-Style Indexed Rule Reasoning

This project studies whether models can make abstention checkable in
ProofWriter-style indexed rule reasoning. In this setting, an unsupported query
is not false; neither the query nor its opposite follows from the theory.
ProCo therefore trains models to emit three concrete response types:

- `PROVE` for entailed queries,
- `REFUTE` for contradicted queries,
- `ABSTAIN` for unsupported queries with a missing-support witness.

The benchmark is **ProofWriter** on the processed OWA splits from
`hitachi-nlp/proofwriter_processed_OWA`.

## Current Result Snapshot

### 0.5B Pilot (`Qwen/Qwen2.5-0.5B-Instruct`, 4,096 train questions)

| Domain | Variant | Accuracy | Unknown F1 | Verifier-accepted | Joint |
|--------|---------|----------|------------|--------------|-------|
| ID | answer-only | 74.7 | 71.1 | 0.0 | 0.0 |
| ID | proof-only | 70.7 | 62.5 | 5.3 | 5.2 |
| ID | ProCo | 71.3 | 66.3 | 29.6 | 29.4 |
| OOD | answer-only | 64.2 | 61.7 | 0.0 | 0.0 |
| OOD | proof-only | 63.0 | 54.9 | 0.8 | 0.8 |
| OOD | ProCo | 61.8 | 54.4 | 20.2 | 20.2 |

### 7B Main Runs (`Qwen/Qwen2.5-7B-Instruct`, same 4,096 train questions)

| Domain | Variant | Accuracy | Unknown F1 | Verifier-accepted | Joint |
|--------|---------|----------|------------|--------------|-------|
| ID | answer-only | 88.5 | 86.8 | 0.0 | 0.0 |
| ID | proof-only | 89.3 | 87.7 | 40.8 | 40.7 |
| ID | ProCo | 89.3 | 87.8 | 75.6 | 75.6 |
| OOD | answer-only | 81.2 | 78.3 | 0.0 | 0.0 |
| OOD | proof-only | 75.2 | 73.0 | 26.2 | 26.2 |
| OOD | ProCo | 76.8 | 74.9 | 55.6 | 55.6 |

Main takeaway:

> ProCo's distinctive gain is not that it predicts `Unknown` more often. It
> turns `Unknown` predictions into verifier-checkable missing-support
> explanations, greatly improving joint label-plus-evidence correctness
> relative to `proof-only`. At the 4k budget, answer-only remains the strongest
> raw classifier; ProCo's value is checkable evidence, not raw-label
> superiority.

## Project Layout

- `docs/`: local project notes, runbook, and analysis markdown (gitignored).
- `src/pocd/`: data processing, symbolic reasoning, training, evaluation.
- `scripts/`: entrypoints for training, evaluation, summarization, plotting, and prediction analysis.
- `scripts/run_main_track_suite.py`: GPU-aware launcher for the main-track experiment matrix.
- `scripts/refresh_artifacts.py`: one-shot refresh for summaries, plots, LaTeX tables, and unknown-behavior reports.
- `scripts/summarize_compute.py`: runtime and throughput summary for appendix-level compute disclosure.
- `artifacts/`, `results/`, `logs/`, `state/`: local training/evaluation workdirs (gitignored).
- `paper/`: LaTeX paper sources.


## Persistent Background Execution

To keep the queue alive across SSH disconnects and host reboots, use the user service in `systemd/proof-countermodel-distill.service`.

- Service wrapper: `bin/proof_countermodel_service.sh`
- Resumable orchestrator: `scripts/run_systemd_pipeline.py`
- Runbook: `docs/SYSTEMD_RUNBOOK.md`

The service writes phase markers to `state/systemd/markers/`, a JSON progress snapshot to `state/systemd/maintrack_pipeline_status.json`, and logs to `logs/systemd/pipeline.service.log`.

## Core Commands

### Train

```bash
python scripts/train_variant.py \
  --model-name Qwen/Qwen2.5-7B-Instruct \
  --variant proco \
  --output-dir artifacts/main_proco_qwen7b \
  --train-max-examples 4096 \
  --eval-max-examples 512 \
  --max-length 512 \
  --epochs 1 \
  --batch-size 2 \
  --eval-batch-size 2 \
  --grad-accum 8 \
  --seed 0
```

### Evaluate

```bash
python scripts/evaluate_variant.py \
  --model-name Qwen/Qwen2.5-7B-Instruct \
  --variant proco \
  --adapter-path artifacts/main_proco_qwen7b \
  --output-path results/main_proco_qwen7b_dev.json \
  --config-name depth-3ext-NatLang \
  --split dev \
  --max-examples 1000 \
  --data-seed 0 \
  --batch-size 8 \
  --max-prompt-length 512 \
  --max-new-tokens 64
```

### Summarize, Plot, Analyze

```bash
python scripts/refresh_artifacts.py --compile-paper
python scripts/analyze_predictions.py \
  --input-path results/main_proco_qwen7b_dev.json \
  --output-path results/main_proco_qwen7b_dev_analysis.md
```

### Launch A Main-Track Sweep

```bash
python scripts/run_main_track_suite.py \
  --study-tags maintrack \
  --train-labels 4096 \
  --seeds 0,1,2 \
  --variants answer_only,proof_only,proco \
  --gpus 0,1
```

For seed-stability studies on subset evaluations, keep `--data-seed 0` fixed at evaluation time so every seed is scored on the same sampled test questions.

The main paper is intentionally scoped to ProofWriter-style indexed rule
reasoning. The `Joint` metric requires verifier-accepted evidence; answer-only
gets `0.0` on joint by construction because it emits no evidence to check.

## One-Sentence Thesis

Missing-support witness supervision turns abstention from a label into
verifier-accepted evidence for ProofWriter-style indexed rule reasoning.
