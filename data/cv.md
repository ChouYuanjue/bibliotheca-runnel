# Runcheng Zhang

**Research & Engineering CV** · November 2026

**Email:** [zhangruncheng@thunlp.com](mailto:zhangruncheng@thunlp.com) · **GitHub:** [ChouYuanjue](https://github.com/ChouYuanjue) · **ORCID:** [0009-0005-7611-3583](https://orcid.org/0009-0005-7611-3583) · **Location:** Nanjing, China

## Education

### Nanjing University
**B.S. in Intelligent Science and Technology** · Nanjing, China · Sep 2025 – Present

## Research Experience

### Tsinghua University — Natural Language Processing Lab (THUNLP)
*Research Intern, AI for Science* · Advisor: Zheni Zeng · Mar 2026 – Present

- Investigating language-model inference and sampling strategies for multi-objective molecular optimization, linking candidate generation to molecular property evaluation and scientific constraints.
- Prototyping scientific agents that combine inexpensive surrogate predictions, selective high-cost verification, executable analysis tools, and evidence-traceable hypotheses.

### Microsoft Research Asia (Beijing)
*Research Intern, AI for Mathematics* · Advisor: Xian Zhang; Collaborator: Ziyu Zhou · Jan – Aug 2026

- Explored formal reasoning and autoformalization with Lean and Rzk, emphasizing native verifier feedback, typed proof obligations, error localization, and structured repair.
- Developed reproducible evaluation and proof-search utilities to separate verified proof progress from incomplete or invalid model outputs.

### NJU Institute of Intelligent Networks and Communications (NINE)
*Research Intern* · Supervisor: Huihong Liang; Institute Director: Kun Yang · Aug 2026 – Present

- Studied efficient semantic video processing on constrained devices, including selective vision-token updates, temporal feature reuse, and reconstruction fidelity at narrow representation bottlenecks.
- Investigated CPU-native low-bit inference on ARM platforms and checked computational equivalence against reference implementations.

### Wuxi Xishan NJU Institute of Applied Biotechnology
*Research Intern, Computational Enzyme Discovery* · Sep 2026 – Present

- Contributed to an enzyme–reaction discovery workflow connecting biochemical reaction queries, domain-specific evidence, and interactive computational tools for experimental research.

## Manuscript

### Input-Output Sampling for Efficient Multi-Objective Molecular Optimization with LLMs

Haoran Liu\*, **Runcheng Zhang\***, Zheni Zeng, Yukun Yan, Zhenghao Liu.
*Submitted to ICLR 2027.* \*Equal contribution.

- Proposed **MolDAS** for multi-objective molecular reinforcement learning: capability-aware sampling of diverse, learnable inputs; selective oracle feedback on low-probability output segments; and reward-dispersion-guided imitation with adaptive objective weights.
- In simulator-to-oracle training, improved optimization scores over vanilla GRPO by **3.7%** in the low-fidelity stage and **over 16.1%** under capped high-fidelity calls, while reducing structural redundancy and training fluctuations.

## Professional Experience

### Beijing Volcano Engine Technology Co., Ltd.
*Agent Development Engineer* · Client: **Guizhou Xijiu Group** · Aug 2026 – Present

- Developed components of a document-centric enterprise agent that structures multi-step analysis, draft generation, semantic review, and revision as tool-augmented workflows with explicit intermediate state.
- Integrated enterprise knowledge retrieval, model orchestration, and office-document tools through modular adapters; incorporated source-grounded checks to preserve verifiable facts across generated documents.

### Nanjing Flux Technology Co., Ltd.
*Project Team Member* · Client-facing software development · Jan 2026 – Present

- Participate in backend and full-stack development, integrating reusable services, APIs, and model-assisted workflows within team-delivered projects.
- **Bank of Nanjing (outsourced proof of concept, Jan–Mar 2026):** implemented parts of a multimodal customer-emotion recognition pipeline combining speech preprocessing, speaker-aware transcription, and audio-language inference. Work remained at the PoC stage.

## Selected Research Projects

### [Evidence-Grounded Enzyme–Reaction Discovery (iGEM 2026)](https://www.runnelzhang.com/posters/igem-atlas)
*NJU-China Dry Lab · Dry Lab Student Lead · 2026*

- Built a two-direction protein–reaction ranking framework that combines sequence and reaction representations with evidence-dependent expert corrections, without restricting predictions to expert-retrieved candidates.
- Connected ranking outputs to a scientific-agent workflow spanning reaction/sequence queries, graph-based evidence exploration, and explicit separation of verified knowledge from inferred candidates.
- Coordinated computational modeling and evaluation with wet-lab objectives, focusing on how researchers can inspect candidate provenance before experimental follow-up.

### [TRACE: Typed Reasoning with Attribution, Certificates, and Evidence](https://www.runnelzhang.com/posters/trace)
*Formal reasoning research linked to MSRA work · 2026*

- Explored typed obligation graphs as a common interface between model-generated reasoning steps and independent native checkers for formal proof tasks.
- Organized certificate-backed conclusions, missing-support diagnoses, and replayable tool traces so unresolved search is not confused with a logically established answer.

### [Tangut-SPAR: Structured Proxy Augmentation and Reliable Preference Tuning](https://www.runnelzhang.com/posters/tangut-spar)
*Low-resource language modeling · 2026*

- Studied data scarcity in Tangut translation using structured proxy augmentation to supply additional training signals while retaining linguistic constraints.
- Explored preference-based refinement of translation candidates, emphasizing faithful generation and the reliability of weak or proxy-derived supervision.

### [BiSem-Edge: Compute-Efficient Semantic Video](https://www.runnelzhang.com/posters/bisem-edge)
*NINE Lab · 2026*

- Investigated selective visual-token refresh and cached temporal representations to avoid redundant encoder computation on largely unchanged frames.
- Analyzed information lost in low-dimensional semantic features and explored complementary reconstruction and CPU-native bitwise inference without conflating encoder speed with restored video quality.

### [Doge-SAGE: Stateful Agent Systems for Scientific Communities](https://www.runnelzhang.com/posters/doge-sage)
*Agent infrastructure and scientific computing · 2026*

- Designed a persistent, multi-user scientific assistant with shared capability discovery, turn-scoped state assembly, and event-local execution paths.
- Isolated concurrent task execution and merged committed history into durable group state, while applying admission checks before model or tool calls.

## Additional Research Posters

- **[Exchangeable Hard Negatives for Vision–Language Evaluation](https://www.runnelzhang.com/posters/candidate-exchangeability)** (2026) — Removed candidate-set structural shortcuts to test whether vision–language models use image evidence.
- **[ProCo: Verifiable Abstention through Missing-Support Supervision](https://www.runnelzhang.com/posters/proco-evidence)** (2026) — Trained abstention with verifier-checkable witnesses of missing evidence in open-world reasoning.
- **[Attributing Inference-Time Gains in Lean Theorem Proving](https://www.runnelzhang.com/posters/lean-attribution)** (2026) — Separated search-policy gains from retrieval, compute-budget, and prover-specific effects.
- **[Structural Transfer in Low-Resource Autoformalization](https://www.runnelzhang.com/posters/structural-transfer)** (2026) — Diagnosed Rzk proof construction across boundaries, dependent lifts, and nested witnesses.
- **[MOSAIC: Reference-Grounded Compositional Emoji Fusion](https://www.runnelzhang.com/posters/mosaic)** (2025) — Proposed source-aware visual composition with explicit roles, attribute transfer, and region planning.

## Independent Mathematical Writing

### [Informal Notes on Mathematics](https://www.runnelzhang.com/projects/inm-tex)
*Author and editor · Ongoing*

A multi-volume, English-language LaTeX collection of informal mathematical notes and essays. Rebuilt earlier multilingual material into a coherent book with thematic organization, corrected arguments, diagrams, and expanded explanations spanning algebra, geometry, topology, analysis, and logic. [Browse the notes library](https://www.runnelzhang.com/library/notes).

## Technical Presentations

### Navigating the Full-Stack Ecosystem: Implementation Strategies and Knowledge Graphs for Information Aggregation
*Student presenter · Intelligent Data and Decision Studio, Nanjing University · Dec 2025* · [Presentation record](https://doi.org/10.5281/zenodo.17852269)

### Architectural Paradigms in Collaborative Software Engineering: A Comprehensive Analysis of the Nova Project
*Student presenter · Intelligent Data and Decision Studio, Nanjing University · Nov 2025* · [Presentation record](https://doi.org/10.5281/zenodo.17765724)

## Technical Background

**Research:** LLM reasoning and scientific agents; multimodal representation; molecular optimization; formal verification; evaluation design.

**Engineering:** Python, TypeScript, PyTorch, Linux, Git; model/tool orchestration, knowledge retrieval, asynchronous services, resource-constrained inference.
