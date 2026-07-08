# Lean Portfolio Attribution

`Lean Portfolio Attribution` studies how to evaluate inference-time improvements in Lean theorem proving with stronger attribution discipline. The repository combines a host prover, fixed-budget attempt portfolios, retrieval-side controls, matched-compute comparisons, and cross-system checks so that reported gains can be tied to the component that actually earns them.

The central contribution of the repository is an experimental framework for answering a practical question: when proof success improves, how much of that improvement comes from scheduling, retrieval, budget use, or prover-specific effects? The code and paper artifacts here are organized to support that question directly.

## What The Repository Provides

- A host-prover implementation for controlled inference-time experiments
- Fixed-budget portfolio schedules for multi-attempt proof search
- Evaluation code for retrieval-free controls and matched-compute baselines
- Portability checks against external systems such as ReProver
- Paper artifacts for `Attributing Inference-Time Gains in Lean Proving`

## Main Components

- `src/`: host-prover model, search, and evaluation code
- `scripts/`: active experiment runners, launchers, and paper utilities
- `scripts/legacy_pipeline/`: archived artifact-building and legacy training pipeline entry points
- `paper/`: manuscript source and bibliography
- `REAL-Prover/`, `ReProver/`: external baseline repositories kept as nested git repos

## Typical Workflows

- Run host-prover evaluations with `python src/evaluate.py ...`
- Launch the controller budget matrix with `bash scripts/run_controller_budget_matrix_v1_until_done.sh`
- Run portability checks with `bash scripts/run_reprover_attempt_portfolio_v1_until_done.sh <checkpoint>`
- Evaluate external retrieval baselines with `bash scripts/run_reprover_external_baselines_v1_until_done.sh <checkpoint>`
- Resume the staged experiment protocol with `bash scripts/run_solid_experiment_resume.sh <phase>`
- Regenerate paper tables and compile artifacts with `bash scripts/run_autonomy_paper_pipeline.sh`

## Reproducibility

See [ARTIFACT.md](./ARTIFACT.md) for the claim-boundary oriented artifact guide. It separates:

- regenerating paper tables from existing JSON artifacts
- rerunning the host-prover case study
- rerunning the ReProver portability checks
- the full expensive end-to-end rerun

The minimal closed loop is:

```bash
bash scripts/run_autonomy_paper_pipeline.sh
```

## Repository Conventions

- Run commands from the repository root.
- Large outputs, caches, local notes, and generated paper fragments are kept out of version control.
- Long-running experiment launchers resolve the repository root dynamically so the local directory name can change without breaking scripts.
