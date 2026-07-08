# CORAL Travel Planning

CORAL is a research codebase for trustworthy travel planning on the `TravelPlanner` and `ChinaTravel` benchmarks. The repository focuses on a practical planning pipeline with two core pieces: robust grounding from raw user queries, and localized repair when an initially generated itinerary fails benchmark checks.

The project is designed around executable evaluation rather than prompt-only plausibility. It provides benchmark adapters, planning code, repair logic, audit scripts, and paper artifacts for studying when travel plans are both logically grounded and executable under the released benchmark environments.

## Core Contributions

- Raw-query grounding for `TravelPlanner` without reading privileged structured benchmark fields
- Localized repair that improves final executable pass rate after an initial plan is produced
- Ceiling-aware and infeasibility-aware evaluation for `ChinaTravel`
- Reproducible audit scripts for parser quality, repair activity, confidence intervals, and runtime budgets
- Structured run manifests that record information access and evaluator scope for each benchmark run

## Main Results

### TravelPlanner validation

- Greedy final pass: `89.44%`
- CORAL final pass: `92.22%`
- Hard macro: `93.89% -> 96.67%`
- Hard micro: `96.43% -> 97.62%`
- The oracle-free parser audit matches the validation split exactly on all grounded fields

### TravelPlanner released-train stress test

- Parser all-field exact match: `44/45` (`97.78%`)
- Greedy final pass: `91.11%`
- CORAL final pass: `97.78%`

### ChinaTravel human

- Greedy raw all-pass: `57.79%`
- Greedy ceiling-aware all-pass: `60.14%` (`89/148`)
- CORAL raw all-pass after validation-aware repair gating: `59.09%` (`91/154`)
- CORAL ceiling-aware all-pass after validation-aware repair gating: `61.49%` (`91/148`)
- Accepted repair remains sparse: `25/154` instances (`16.2%`), and all accepted repairs are budget-aware replans

### ChinaTravel easy / medium

- Easy raw all-pass: `53.67% -> 56.33%`
- Medium raw all-pass: `62.67% -> 67.33%`

## Repository Structure

- `src/coral/benchmarks/`: benchmark adapters for `TravelPlanner` and `ChinaTravel`
- `src/coral/planning/`: planning and repair logic
- `src/coral/utils/`: shared I/O helpers
- `scripts/run_travelplanner_planner.py`: `TravelPlanner` evaluation entrypoint
- `scripts/run_chinatravel_planner.py`: `ChinaTravel` evaluation entrypoint
- `scripts/audit_travelplanner_parser.py`: parser audit without privileged structured fields
- `scripts/compute_chinatravel_ceiling_metrics.py`: ceiling-aware reporting for `ChinaTravel`
- `scripts/audit_chinatravel_impossible_cases.py`: infeasible-case audit for released `ChinaTravel` queries
- `scripts/compute_rate_confidence_intervals.py`: bootstrap confidence intervals for headline rates
- `scripts/summarize_repair_activity.py`: repair-activity summary from released metadata
- `scripts/profile_planner_runtime.py`: runtime and repair-budget profiler
- `README_REPRO.md`: cache-only reproduction guide and bundle instructions
- `ARTIFACT_MANIFEST.md`: claim-to-artifact mapping for reviewers
- `Makefile`: `smoke`, `reproduce`, `bundle`, and `pdf` targets
- `Dockerfile`: anonymous local build for cache-only reproduction
- `paper/`: manuscript source

Local-only notes, upstream benchmark clones, artifacts, evaluation outputs, and logs are intentionally kept out of version control through `.gitignore`.

## Installation

The package targets Python `>=3.10`.

```bash
pip install -e .
```


In restricted environments where `datasets` or `conda run` need a writable temporary directory, use:

```bash
TMPDIR=/dev/shm CONDA_NO_PLUGINS=true conda run --no-capture-output -n tangut-nlp python ...
```

## Representative Commands

```bash
python scripts/audit_travelplanner_parser.py --split validation
python scripts/audit_travelplanner_parser.py --split train

python scripts/run_travelplanner_planner.py --split validation --method greedy
python scripts/run_travelplanner_planner.py --split validation --method coral
python scripts/run_travelplanner_planner.py --split train --method greedy
python scripts/run_travelplanner_planner.py --split train --method coral

python scripts/run_chinatravel_planner.py --split human --method greedy
python scripts/run_chinatravel_planner.py --split human --method coral
python scripts/run_chinatravel_planner.py --split easy --method greedy
python scripts/run_chinatravel_planner.py --split easy --method coral
python scripts/run_chinatravel_planner.py --split medium --method greedy
python scripts/run_chinatravel_planner.py --split medium --method coral

python scripts/compute_chinatravel_ceiling_metrics.py \
  --eval-details results/chinatravel_greedy_human/eval_details.json
python scripts/audit_chinatravel_impossible_cases.py
python scripts/compute_rate_confidence_intervals.py
python scripts/summarize_repair_activity.py
python scripts/profile_planner_runtime.py
python scripts/build_evaluation_audit_manifest.py

make smoke-test
make reproduce-from-cache
make bundle
```

## Method Summary

### TravelPlanner

- Parse the raw English query into executable fields
- Use benchmark-provided references as the candidate pool for planning
- Generate an initial plan greedily
- Apply targeted repair for cuisine and hotel-selection failures

### ChinaTravel

- Parse the raw Chinese request into budget, transport, attraction, cuisine, and hotel constraints
- Build itineraries directly against the shipped benchmark environment
- Accept repair candidates only when they preserve both schema validity and executable commonsense consistency

## Reproducibility Scope

The repository is organized around reproduced benchmark runs, parser audits, repair diagnostics, and paper-ready summaries. It is intended to support both end-to-end evaluation and component-level analysis of where travel-planning success and failure come from.

Each benchmark runner now emits a `run_manifest.json` file alongside plans, metrics, and evaluator details so that the information-access boundary used for a run is explicit and machine-readable.

For submission packaging and reviewer-facing instructions, start with `README_REPRO.md` and `ARTIFACT_MANIFEST.md`. The anonymous supplementary ZIP can be created with `make bundle`.
