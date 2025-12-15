---
title: "The \"Holy War\" Moves to the Server Room — Notes on Mochizuki’s Oct 2025 Report"
date: "2025-11-15"
---

## Overview
I had a disscusion on digesting Shinichi Mochizuki’s *Report on the Current Situation Surrounding Inter-Universal Teichmüller Theory (IUT)*, released this past October, with some of my net friends. Our opinions were alike. Ostensibly, this 30-page document is a rebuttal to a critical article by J.D. Boyd in *SciSci Research*, but it reads more like a philosophical manifesto than a standard mathematical response.

For those of us tracking this saga for years, the report marks a significant shift. Mochizuki appears to have largely abandoned the hope of convincing the current generation of arithmetic geometers via traditional human dialogue. His argument is that the "social/political dynamics" of the mathematical community have superseded "mathematical truth." His proposed solution? A complete retreat into formal verification (Lean 4).

While the tone is calmer than some of his previous blog posts, the implications are arguably more radical. He isn't just defending a proof; he is proposing a redefinition of how mathematical consensus should be reached, seemingly to bypass the "human" element that has rejected his theory.

Below is a breakdown of the key points and my thoughts.

---

## 1. The "Label-Removal" Defense
A significant portion of the report (§2.1–§2.3) is dedicated to dismantling the famous Scholze-Stix counterargument. Mochizuki argues that the contradiction Scholze and Stix found arises because they are impermissibly "removing labels" from distinct copies of universes.

Mochizuki uses a rather elementary analogy to explain why he believes his critics are wrong:

> **From Example 2.2.1:**
> "Write $\mathbb{N}^\dagger$ for the quotient set of $\mathbb{N}$ obtained by identifying the elements $2 \in \mathbb{N}$ and $3 \in \mathbb{N}$... If one assumes that addition of natural numbers in $\mathbb{N}$ is sufficiently 'robust' in the sense that it is unaffected by the label-removal... then one immediately obtains the contradiction $1 + 3 = 3$."

Mochizuki is doubling down on the idea that IUT lives or dies by its complex apparatus of distinct, labeled universes. He asserts that Scholze and Stix treated these labeled objects as identical when they shouldn't have (Concept **FA2** in the report).
While this defense is logically self-consistent within his framework, it remains unsatisfying to the outside observer. The criticism has always been that once you enforce all these distinct labels to prevent the structure from collapsing, you also prevent the structure from interacting enough to prove the *abc* inequality. Mochizuki insists the structure holds; the community insists it's too rigid to be useful. We are still at a stalemate here.

## 2. The Pivot to Lean: "Liberating Mathematical Truth"
This is the most fascinating and slightly dystopian part of the report (§3). Mochizuki seems to view Lean (the theorem prover) not just as a tool for verification, but as an "ideal, universal colleague" (**Asp2**) that doesn't suffer from the "social dynamics" or "faith en masse" of human mathematicians.

He envisions a future where academic hierarchy is determined by code:

> **From §3, (Asp4):**
> "...individuals — i.e., even, potentially, 'complete amateurs'... could be hired for/promoted to high-ranking positions... not on the basis of traditional criteria... but rather on the basis of **Lean code** that is submitted to the university or journal."

He also admits that the formalization of IUT is currently relying on "black boxes" (**BBxFm** in §3.2) for the heavy lifting in anabelian geometry.

I think There is an irony here. Mochizuki criticizes the community for "faith en masse" regarding Scholze’s views, yet he asks us to have faith in a future formalization that is currently built on black boxes. If the logical gap exists where Scholze says it does—in the interface between the additive and multiplicative structures—formalizing the surrounding architecture won't fix it. The computer will simply confirm that *if* the definitions hold, the result follows. The question remains: do the definitions mean what Mochizuki thinks they mean?

## 3. The Rejection of "Partial" Acceptance
Interestingly, Mochizuki takes a hard line against the "compromise" position held by some younger researchers (like Emmanuel Lepage). The compromise view is that the *anabelian geometry* in IUT is interesting and correct, even if the proof of *abc* is flawed.

Mochizuki rejects this separation entirely:

> **From §2.4 (AnMs1):**
> "The anabelian content of IUT... can somehow be *separated* and *isolated* from the portions/aspects of IUT that relate to the *abc inequality*... this sort of distinction is **mathematically meaningless**."


This "all-or-nothing" stance is risky. By refusing to let the community salvage the "good parts" of the theory without accepting the main result, he isolates himself further. He characterizes the attempt to separate the theory as a "misunderstanding," but to many, it looks like the only way to save the framework from total obscurity.

## Conclusion
The October 2025 report confirms that the IUT debate has left the realm of standard peer review. Mochizuki effectively declares that the "functional peer review system" is broken because it rejected his work, and that the only valid judge left is the machine (Lean).

While I appreciate the intellectual commitment to formalization, the report reads like a door slamming shut. The "strategic ambiguity" is gone. Unless the Lean formalization can unpack the specific "black boxes" where the contradiction is suspected to hide, this report changes nothing about the mathematical consensus—it only formalizes the disagreement.