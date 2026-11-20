# Runcheng Zhang

**Research & Engineering CV** · November 2026

**Email:** [zhangruncheng@thunlp.com](mailto:zhangruncheng@thunlp.com) · **GitHub:** [ChouYuanjue](https://github.com/ChouYuanjue) · **ORCID:** [0009-0005-7611-3583](https://orcid.org/0009-0005-7611-3583) · **Location:** Nanjing, China

## Education
### Nanjing University
**B.S. in Intelligent Science and Technology** · Nanjing, China · Sep 2025 – Present

## Honors & Awards
### 2026 International Genetically Engineered Machine (iGEM) Competition

**Gold Medal** · **Best Software & AI Project** · **Best Model Nominee**

**Student Leader (Head of the Dry Lab)**, NJU-China.

## Manuscript
### Input-Output Sampling for Efficient Multi-Objective Molecular Optimization with LLMs

Haoran Liu\*, **Runcheng Zhang\***, Zheni Zeng, Yukun Yan, Zhenghao Liu.
*Submitted to ICLR 2027.* \*Equal contribution.

- Introduced MolDAS: capability-aware sampling, selective oracle evaluation, and adaptive imitation for multi-objective molecular optimization.
- Improved multi-objective optimization scores by **16.1%** over vanilla GRPO under the same budget for high-fidelity property evaluations.

## Research Experience
### Tsinghua University — Natural Language Processing Lab (THUNLP)
*Research Intern, AI for Science* · Advisor: Zheni Zeng · Mar 2026 – Present

- Built a scientific discovery agent that combines molecular observations, surrogate predictions, and executable analysis to propose hypotheses and select follow-up tests on unseen scaffolds.
- Developed training and evaluation workflows for language models in molecular design, connecting candidate generation to property scoring and checks against multiple chemical objectives.

### Microsoft Research Asia (Beijing)
*Research Intern, AI for Mathematics* · Advisor: Xian Zhang; Collaborator: Ziyu Zhou · Jan – Aug 2026

- Built verifier-guided tools for Lean proof search and Rzk autoformalization, using checker feedback to localize failed proof steps.
- Designed controlled evaluations that isolate the effects of retrieval, search budget, and prover choice on proof success.

### NJU Institute of Intelligent Networks and Communications (NINE)
*Research Intern* · Supervisor: Huihong Liang; Institute Director: Kun Yang · Aug 2026 – Present

- Implemented selective token refresh and temporal feature reuse in a Raspberry Pi 5 encoder, achieving **18.3 FPS** in a sender-side benchmark.
- Built a reconstruction evaluation pipeline that measures fidelity around moving people using reference regions from the original footage.

### Wuxi Xishan NJU Institute of Applied Biotechnology
*Research Intern, Computational Enzyme Discovery* · Sep 2026 – Present

- Translated biochemical reaction queries into experimental screening shortlists by combining model rankings with supporting evidence.

## Professional Experience
### Beijing Volcano Engine Technology Co., Ltd.
*Agent Development Engineer* · Client: **Guizhou Xijiu Group** · Aug 2026 – Present

- Built Xijiu's document workflow for source-linked drafting, semantic review, and iterative revision.
- Integrated enterprise retrieval, model routing, and document editing through reusable adapters, with source checks and task state carried across review rounds.

### Nanjing Flux Technology Co., Ltd.
*Project Team Member* · Client-facing software development · Jan 2026 – Present

- **Bank of Nanjing.** Implemented speech preprocessing, speaker-aware transcription, and audio-language inference for a multimodal LLM system for customer emotion recognition.
- Developed backend services and APIs and integrated model inference into client-facing applications.

## Selected Research Projects
### [Evidence-Grounded Enzyme–Reaction Discovery (iGEM 2026)](https://www.runnelzhang.com/posters/igem-atlas)
*NJU-China · Student Leader (Head of the Dry Lab) · 2026*

- Led development of BRIDGE, a bidirectional enzyme–reaction retrieval model that combines learned representations with gated expert signals. It achieved **2.7× to 3.5×** EnzymeCAGE's balanced top-10 recall across the two directions.
- Integrated BRIDGE with COMPASS and EDGE to support natural-language searches and inspection of the evidence behind ranked candidates.

### [BiSem-Edge: Compute-Efficient Semantic Video](https://www.runnelzhang.com/posters/bisem-edge)
*NINE Lab · 2026*

- Cut encoder latency on Raspberry Pi 5 by **72%** using native one-bit NEON kernels, compared with floating-point inference at the same quantization level.
- Used compact PCA side information to restore image detail lost in the original decoder, improving reconstruction PSNR by 1.18 dB on held-out cameras.

### [TRACE: Typed Reasoning with Attribution, Certificates, and Evidence](https://www.runnelzhang.com/posters/trace)
*Formal reasoning research linked to MSRA work · 2026*

- Built a typed reasoning graph that tracks proof dependencies across Lean, Rzk, and symbolic logic, with outputs for checked proofs, refutations, and witnesses that identify missing premises.

### [Tangut-SPAR: Structured Proxy Augmentation and Reliable Preference Tuning](https://www.runnelzhang.com/posters/tangut-spar)
*Low-resource language modeling · 2026*

- Trained a Tangut translation model with synthetic multitask data and preference optimization. Combining it with dictionary-grounded LLM prompting improved chrF++ by **22.2%** over the DeepSeek-V3.2 prompting baseline.

### [Doge-SAGE: Stateful Agent Systems for Scientific Communities](https://www.runnelzhang.com/posters/doge-sage)
*Agent infrastructure and scientific computing · 2026*

- Built a group-chat assistant with a shared tool registry, concurrent workers that preserve conversation history, and a local check that screens requests before invoking the model.

## Additional Research Posters
- **[Exchangeable Hard Negatives for Vision–Language Evaluation](https://www.runnelzhang.com/posters/candidate-exchangeability)** (2026) — Designed balanced hard negatives to measure how much vision–language reasoning depends on the image itself.
- **[ProCo: Verifiable Abstention through Missing-Support Supervision](https://www.runnelzhang.com/posters/proco-evidence)** (2026) — Taught language models to identify missing premises and improved the rate of correct, evidence-backed answers on ProofWriter from 39.9% to 75.0%.
- **[Attributing Inference-Time Gains in Lean Theorem Proving](https://www.runnelzhang.com/posters/lean-attribution)** (2026) — Used fixed-budget search portfolios and controlled ablations to separate search improvements from retrieval and prover changes.
- **[Structural Transfer in Low-Resource Autoformalization](https://www.runnelzhang.com/posters/structural-transfer)** (2026) — Used structural hints to improve Rzk proof completion and recover failures that persisted under direct prompting.
- **[MOSAIC: Reference-Grounded Compositional Emoji Fusion](https://www.runnelzhang.com/posters/mosaic)** (2025) — Defined typed fusion plans linking source identity, spatial layout, and rendering style for controllable multi-emoji composition.

## Technical Background
**Research:** Scientific agents, molecular optimization, multimodal learning, formal verification.

**Engineering:** Python, TypeScript, PyTorch, Linux, Git; retrieval, tool orchestration, edge inference.

## Independent Mathematical Writing
### [Informal Notes on Mathematics](https://www.runnelzhang.com/projects/inm-tex)
*Author and editor · Ongoing*

Author and editor of a multi-volume English-language book of mathematical notes and essays. Reworked multilingual drafts into a coherent collection, revising proofs, expanding explanations, and adding diagrams across algebra, geometry, topology, analysis, and logic. [Notes library](https://www.runnelzhang.com/library/notes).

## Technical Presentations
### Navigating the Full-Stack Ecosystem: Implementation Strategies and Knowledge Graphs for Information Aggregation
*Presented at Intelligent Data and Decision Studio, Nanjing University · Dec 2025* · [Presentation record](https://doi.org/10.5281/zenodo.17852269)

### Architectural Paradigms in Collaborative Software Engineering: A Comprehensive Analysis of the Nova Project
*Presented at Intelligent Data and Decision Studio, Nanjing University · Nov 2025* · [Presentation record](https://doi.org/10.5281/zenodo.17765724)

Published both technical presentations as DOI-archived, openly accessible records.
