# Runcheng Zhang

**Research & Engineering CV** · November 2026

**Email:** [zhangruncheng@thunlp.com](mailto:zhangruncheng@thunlp.com) · **GitHub:** [ChouYuanjue](https://github.com/ChouYuanjue) · **ORCID:** [0009-0005-7611-3583](https://orcid.org/0009-0005-7611-3583)

## Education
### Nanjing University
**B.S. in Intelligent Science and Technology** · Sep 2025 – Present

## Honors & Awards
### 2026 International Genetically Engineered Machine (iGEM) Competition

**Gold Medal** · **Best Software & AI Project** · **Best Model Nominee**

**Student Leader (Head of the Dry Lab)**, NJU-China.

## Manuscript
### Input-Output Sampling for Efficient Multi-Objective Molecular Optimization with LLMs

Haoran Liu\*, **Runcheng Zhang\***, Zheni Zeng, Yukun Yan, Zhenghao Liu.
*Submitted to ICLR 2027.* \*Equal contribution.

- Introduced MolDAS to train language models for molecular design under an expensive evaluation budget. It samples tasks to match model capability, selectively queries the oracle, and uses adaptive imitation to learn from the evaluated candidates.
- Improved multi-objective optimization scores by **16.1%** over vanilla GRPO under the same budget for high-fidelity property evaluations.

## Research Experience
### Tsinghua University — Natural Language Processing Lab (THUNLP)
*Research Intern, AI for Science* · Advisor: Zheni Zeng · Mar 2026 – Present

- Built a scientific discovery agent that runs Python analyses to turn molecular property predictions into testable hypotheses and select candidates for higher-fidelity evaluation.
- Trained surrogate models for drug absorption, metabolism, and toxicity to screen candidate molecules before more expensive scoring.

### Microsoft Research Asia (Beijing)
*Research Intern, AI for Mathematics* · Advisor: Xian Zhang; Collaborator: Ziyu Zhou · Jan – Aug 2026

- Built a staged Lean prover that tries a narrow set of tactics first, broadens the search on unresolved goals, and spends the remaining time on harder cases.
- Built an Rzk autoformalization method that guides the model through dependent types, boundary conditions, and nested proof witnesses, then type-checks the generated proof body.

### NJU Institute of Intelligent Networks and Communications (NINE)
*Research Intern* · Supervisor: Huihong Liang; Institute Director: Kun Yang · Aug 2026 – Present

- Built a Raspberry Pi 5 video encoder that refreshes patches based on visual change and cache age, reusing attention states for other patches. The sender ran at **18.3 FPS**.

### Wuxi Xishan NJU Institute of Applied Biotechnology
*Research Intern, Computational Enzyme Discovery* · Sep 2026 – Present

- Translated biochemical reaction queries into experimental screening shortlists by combining model rankings with supporting evidence.

## Professional Experience
### Beijing Volcano Engine Technology Co., Ltd.
*Agent Development Engineer* · Client: **Guizhou Xijiu Group** · Aug 2026 – Present

- Built Xijiu's document workflow for source-linked drafting, semantic review, and iterative revision.
- Integrated enterprise retrieval, model routing, and document editing through reusable adapters, with source checks and task state carried across review rounds.

### Nanjing Flux Technology Co., Ltd.
*Project Team Member* · Client projects and in-house product development · Jan 2026 – Present

- **Client project for Bank of Nanjing (Jan–Mar 2026).** Implemented speech preprocessing, speaker-aware transcription, and audio-language inference for a multimodal LLM system for customer emotion recognition.
- Developed Flux's own internet products, building backend services and APIs for in-house applications.

## Selected Research Projects
### [Evidence-Grounded Enzyme–Reaction Discovery (iGEM 2026)](https://www.runnelzhang.com/posters/igem-atlas)
*NJU-China · Student Leader (Head of the Dry Lab) · 2026*

- Led development of BRIDGE, which ranks the full search space and gates expert corrections by query. It achieved **2.7× to 3.5×** EnzymeCAGE's balanced top-10 recall across both enzyme–reaction search directions.
- Added a memory that can incorporate newly validated examples without retraining. Connected the model to COMPASS and EDGE so users can trace candidate evidence from natural-language queries.

### [BiSem-Edge: Compute-Efficient Semantic Video](https://www.runnelzhang.com/posters/bisem-edge)
*NINE Lab · 2026*

- Implemented native one-bit NEON kernels for semantic video encoding on Raspberry Pi 5, cutting encoder latency by **72%** versus floating-point execution at the same quantization level.
- Recovered detail lost in semantic compression by sending compact PCA side information to the decoder, improving PSNR by 1.18 dB on held-out cameras.

### [TRACE: Typed Reasoning with Attribution, Certificates, and Evidence](https://www.runnelzhang.com/posters/trace)
*Formal reasoning research linked to MSRA work · 2026*

- Represented reasoning as typed proof obligations in a shared graph across Lean, Rzk, and symbolic logic. Each outcome can carry a checked proof, refutation, or witness to a missing premise.

### [Tangut-SPAR: Structured Proxy Augmentation and Reliable Preference Tuning](https://www.runnelzhang.com/posters/tangut-spar)
*Low-resource language modeling · 2026*

- Trained a Tangut translation model with synthetic multitask data and preference optimization. Combining it with dictionary-grounded LLM prompting improved chrF++ by **22.2%** over the DeepSeek-V3.2 prompting baseline.

### [Doge-SAGE: Stateful Agent Systems for Scientific Communities](https://www.runnelzhang.com/posters/doge-sage)
*Agent infrastructure and scientific computing · 2026*

- Designed a concurrent group-chat agent that runs inference independently for each event and merges only new history at a short, locked commit step. A shared registry serves both natural-language requests and explicit commands, with a local check before model invocation.

## Additional Research Posters
- **[Exchangeable Hard Negatives for Vision–Language Evaluation](https://www.runnelzhang.com/posters/candidate-exchangeability)** (2026) — Constructed exchangeable hard negatives that put every candidate in the same structural role, exposing when a model can answer from the choice set alone.
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
*Student presenter · Intelligent Data and Decision Studio, Nanjing University · Dec 2025* · [Presentation record](https://doi.org/10.5281/zenodo.17852269)

### Architectural Paradigms in Collaborative Software Engineering: A Comprehensive Analysis of the Nova Project
*Student presenter · Intelligent Data and Decision Studio, Nanjing University · Nov 2025* · [Presentation record](https://doi.org/10.5281/zenodo.17765724)
