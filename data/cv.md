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

## Research Experience
### Tsinghua University — Natural Language Processing Lab (THUNLP)
*Research Intern, AI for Science* · Advisor: Zheni Zeng · Mar 2026 – Present

- Co-developed MolDAS, improving molecular optimization scores by **16.1%** over vanilla GRPO with the same expensive property-evaluation budget.
- Built surrogate-to-oracle training with difficulty-aware sampling and targeted feedback; improved low-cost optimization scores by **3.7%** over GRPO.

### Microsoft Research Asia (Beijing)
*Research Intern, AI for Mathematics* · Advisor: Xian Zhang; Collaborator: Ziyu Zhou · Jan – Aug 2026

- Developed verifier-guided proof generation for Lean and Rzk; structural guidance improved Rzk completion by **56%** over direct prompting (32.1% to 50.0%).
- Built proof-search evaluation and replay tools that produce kernel-checked proofs, localized repair feedback, and comparable theorem-level execution traces.

### NJU Institute of Intelligent Networks and Communications (NINE)
*Research Intern* · Supervisor: Huihong Liang; Institute Director: Kun Yang · Aug 2026 – Present

- Accelerated Raspberry Pi 5 video encoding by **3.57×** over matched-quantization floating-point inference using packed one-bit NEON kernels.
- Reduced model state by **93.2%** versus floating-point storage (458.0 to 31.4 MB); deployed a Pi 5 sender sustaining 18.3 FPS.

### Wuxi Xishan NJU Institute of Applied Biotechnology
*Research Intern, Computational Enzyme Discovery* · Sep 2026 – Present

- Delivered an enzyme-discovery workbench that converts reaction and sequence queries into experimental shortlists linked to chemical structures and literature evidence.

## Professional Experience
### Beijing Volcano Engine Technology Co., Ltd.
*Agent Development Engineer* · Client: **Guizhou Xijiu Group** · Aug 2026 – Present

- Built Xijiu's document-agent workflow, turning retrieved company material into source-linked drafts, semantic reviews, and revised documents.
- Integrated retrieval, model routing, and office tools through reusable adapters, delivering editable documents with source checks and persistent task state.

### Nanjing Flux Technology Co., Ltd.
*Project Team Member* · Client-facing software development · Jan 2026 – Present

- Delivered backend APIs and model integrations that combine reusable services into client-facing analysis workflows.
- **Bank of Nanjing:** built multimodal customer-emotion analysis combining audio preprocessing, speaker-aware transcription, and model inference, producing attributed transcripts and emotion labels.

## Manuscript
### Input-Output Sampling for Efficient Multi-Objective Molecular Optimization with LLMs

Haoran Liu\*, **Runcheng Zhang\***, Zheni Zeng, Yukun Yan, Zhenghao Liu.
*Submitted to ICLR 2027.* \*Equal contribution.

- Introduced MolDAS: capability-aware sampling, selective oracle evaluation, and adaptive imitation for multi-objective molecular optimization.
- Outperformed vanilla GRPO by **3.7%** with low-cost property predictors and **16.1%** under the same high-fidelity oracle budget.

## Selected Research Projects
### [Evidence-Grounded Enzyme–Reaction Discovery (iGEM 2026)](https://www.runnelzhang.com/posters/igem-atlas)
*NJU-China · Student Leader (Head of the Dry Lab) · 2026*

- Led BRIDGE development, improving balanced top-10 recall by **173%** for reaction-to-enzyme search and **250%** in reverse versus EnzymeCAGE.
- Connected BRIDGE, COMPASS, and EDGE into an evidence-linked discovery workbench; won iGEM Gold and Best Software & AI Project.

### [TRACE: Typed Reasoning with Attribution, Certificates, and Evidence](https://www.runnelzhang.com/posters/trace)
*Formal reasoning research linked to MSRA work · 2026*

- Built a typed reasoning graph connecting Lean, symbolic-logic, and Rzk checkers, producing proof certificates, targeted repair feedback, and replayable traces.
- Increased correct, evidence-verified answers by **88%** over proof-only training on ProofWriter (39.9% to 75.0%) through missing-support supervision.

### [Tangut-SPAR: Structured Proxy Augmentation and Reliable Preference Tuning](https://www.runnelzhang.com/posters/tangut-spar)
*Low-resource language modeling · 2026*

- Built synthetic multitask training and preference optimization from 491 Tangut–Chinese pairs, producing local candidates for dictionary-grounded historical translation.
- Improved translation quality (chrF++) by **22.2%** over dictionary-grounded DeepSeek-V3.2 prompting (28.54 to 34.87) through hybrid candidate selection.

### [BiSem-Edge: Compute-Efficient Semantic Video](https://www.runnelzhang.com/posters/bisem-edge)
*NINE Lab · 2026*

- Cut Pi 5 encoder latency by **72%** versus matched-quantization floating-point inference (1,709 to 479 ms per four-keyframe batch).
- Improved reconstruction PSNR by 1.18 dB over the original 64-dimensional decoder across 12 held-out cameras using compact PCA side information.

### [Doge-SAGE: Stateful Agent Systems for Scientific Communities](https://www.runnelzhang.com/posters/doge-sage)
*Agent infrastructure and scientific computing · 2026*

- Deployed a persistent scientific assistant unifying 281 actions across 36 domains behind shared handlers for natural-language and explicit commands.
- Replaced serialized group execution with concurrent event runners and shared history commits; local admission eliminates model-token spending on rejected requests.

## Additional Research Posters
- **[Exchangeable Hard Negatives for Vision–Language Evaluation](https://www.runnelzhang.com/posters/candidate-exchangeability)** (2026) — Built 1,301 balanced candidate sets that hold text-only shortcuts at 50% chance, isolating visual reasoning gains.
- **[ProCo: Verifiable Abstention through Missing-Support Supervision](https://www.runnelzhang.com/posters/proco-evidence)** (2026) — More than doubled evidence-verified reasoning under depth shift versus proof-only training (26.5% to 55.0%).
- **[Attributing Inference-Time Gains in Lean Theorem Proving](https://www.runnelzhang.com/posters/lean-attribution)** (2026) — Improved Lean proof success by **10.5%** over single-profile search (31.7% to 35.0%) using fixed-budget portfolios.
- **[Structural Transfer in Low-Resource Autoformalization](https://www.runnelzhang.com/posters/structural-transfer)** (2026) — Raised Rzk completion by **56%** over direct prompting (32.1% to 50.0%); structural repair solved 2.2× as many replayed failures.
- **[MOSAIC: Reference-Grounded Compositional Emoji Fusion](https://www.runnelzhang.com/posters/mosaic)** (2025) — Defined typed fusion plans linking source identity, spatial layout, and rendering style for controllable multi-emoji composition.

## Technical Background
**Research:** Scientific agents, molecular optimization, multimodal learning, formal verification.

**Engineering:** Python, TypeScript, PyTorch, Linux, Git; retrieval, tool orchestration, edge inference.

## Independent Mathematical Writing
### [Informal Notes on Mathematics](https://www.runnelzhang.com/projects/inm-tex)
*Author and editor · Ongoing*

Built and edited a searchable library of **170 mathematical notes**, publishing an English-language collection spanning algebra, geometry, topology, analysis, and logic. [Notes library](https://www.runnelzhang.com/library/notes).

## Technical Presentations
### Navigating the Full-Stack Ecosystem: Implementation Strategies and Knowledge Graphs for Information Aggregation
*Presented at Intelligent Data and Decision Studio, Nanjing University · Dec 2025* · [Presentation record](https://doi.org/10.5281/zenodo.17852269)

### Architectural Paradigms in Collaborative Software Engineering: A Comprehensive Analysis of the Nova Project
*Presented at Intelligent Data and Decision Studio, Nanjing University · Nov 2025* · [Presentation record](https://doi.org/10.5281/zenodo.17765724)

Published both technical presentations as DOI-archived, openly accessible records.
