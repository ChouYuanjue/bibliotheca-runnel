# Tangut-NLP

Tangut-NLP is a research codebase for ultra-low-resource Tangut short-text translation. The repository studies a focused regime: only 491 real Tangut-Chinese pairs are available, many targets are compact title-like strings, and evaluation has to distinguish between fluent modern Chinese and faithful historical title reconstruction.

The project centers on a workflow question rather than a single-model question: once a strong frontier Chinese LLM already has dictionary grounding and a title-oriented prompt, what remains worth learning locally, and how can frontier and local candidates be combined into a stronger translation pipeline?

## Repository Contributions

- A strong frontier prompt-only baseline for Tangut title translation
- Local synthetic multitask SFT and gap-filtered DPO pipelines for trainable Tangut models
- Open and closed candidate-selection workflows that exploit frontier/local complementarity
- Reference-aware evaluation, contamination analysis, uncertainty analysis, and bootstrap significance tools
- A supplementary oracle-bone portability probe built around the same workflow logic

## Headline Results

- Best single frontier model: `frontier_deepseek_v32_fewshot_cot`
  `28.54` chrF++, `12/50` exact match, `2.80/5` reference-aware overall
- Best local trained model: `final_gap04_multitask_sigmoid`
  `30.01` chrF++, `5/50` exact match, `2.22/5` reference-aware overall
- Best open workflow: `open_hybrid_heuristic_guarded`
  `32.62` chrF++, `12/50` exact match, `2.90/5` reference-aware overall, `0/50` contamination
- Best overall workflow: `hybrid_multi3_catalog_gpt54`
  `34.87` chrF++, `14/50` exact match, `3.02/5` reference-aware overall
- Oracle portability probe:
  dictionary-grounded prompt reaches `40/200` exact and `46.20` chrF++, while a simple open 2-way hybrid improves this to `44/200` exact and `47.81` chrF++

## Repository Layout

- `experiments/`: model-facing generation, training, and workflow experiments
- `eval/`: metric computation, cleaning, judge interfaces, and result aggregation
- `scripts/`: active analysis, evaluation, portability, and workflow utilities
- `scripts/legacy_sft_pipeline/`: archived orchestration scripts from earlier local-training pipelines
- `src/`: data preparation, dictionary handling, prompt construction, and synthesis helpers
- `paper/`: main manuscript source
- `configs/`: DeepSpeed configurations
- `data/dictionary/`: tracked dictionary assets used by evaluation and prompting
- `data/eval/`: tracked evaluation splits

Local notes, generated corpora, checkpoints, semantic indices, evaluation outputs, logs, and paper build products are intentionally excluded from version control.

## Research Framing

The codebase supports a controlled comparison across four layers:

1. strong frontier prompting with dictionary grounding
2. local supervised models built from synthetic multitask training data
3. local preference optimization after aggressive pair filtering
4. workflow-level candidate selection over complementary frontier and local outputs

This organization matches the paper's main question: what remains useful after strong frontier prompting is already in place?

## Environment

The working environment on this machine is:

```bash
conda activate tangut-nlp
pip install -r requirements.txt
```

Azure-backed judge and adjudication scripts no longer ship embedded credentials.
Set the Azure OpenAI connection explicitly before running them:

```bash
export AZURE_OPENAI_API_KEY=...
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com/
export AZURE_OPENAI_DEPLOYMENT=<your-deployment-name>
```

## Representative Entry Points

- `python experiments/frontier_openrouter_dict.py`
  strong frontier prompt-only baseline
- `python experiments/baseline3_synthetic_sft.py`
  local SFT training entrypoint
- `python experiments/final_dpo.py`
  local DPO training entrypoint
- `python experiments/open_hybrid_heuristic.py`
  open hybrid selector
- `python scripts/run_reference_eval_suite.py`
  Azure-backed reference-aware evaluation bundle
- `python scripts/run_local_reference_eval_suite.py`
  local surrogate reference-aware evaluation bundle
- `python scripts/open_selector_study.py`
  selector sensitivity and pool-ablation study
- `python scripts/build_obimd_oracle_probe.py`
  oracle portability probe construction
- `python scripts/bootstrap_significance.py`
  paired bootstrap significance analysis

## Paper

The main manuscript in `paper/` corresponds to the current workflow-focused framing:

*What Remains Useful After Strong Frontier Prompting? Complementary Local Models for Ultra-Low-Resource Tangut Title Translation*

The repository is therefore organized around reproducible workflow comparisons, reference-aware evaluation, and portability diagnostics rather than around a single training recipe.
