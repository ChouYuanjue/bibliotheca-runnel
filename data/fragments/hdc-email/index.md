---
title: "Follow-up on Hugo Duminil-Copin's Lecture: Probing SAW Universality and 4D Triviality"
date: "2025-11-27"
---


## Overview

Following the suggestion from Professor Hugo Duminil-Copin, I sent a detailed email to him to follow up on the questions I was unable to ask during the Q&A session. The email, sent on November 27, 2025, covers two major topics: the subtle mathematical reasons behind the solvability of **Self-Avoiding Walks (SAW)** on the honeycomb lattice versus the square lattice (the **Symmetry-Complexity Paradox**), and a more conceptual inquiry into his work on the **Marginal Triviality of the 4D $\Phi^4$ model** in Quantum Field Theory. Since the email has not been answered, I plan to resolve these questions through self-study, and the formatted email below serves as the structured outline for that research.

***

## Detailed Summary of the Follow-Up Email

The email is structured into an introduction and two major sections, each containing a set of focused questions.

### 1. Introduction and Context

I identified myself as the undergraduate student from Nanjing University (NJU) who specifically traveled to Southeast University (SEU) for the talk and was the first to ask for a joint photograph. The purpose of the email was to convey my enthusiasm and follow up on the promised questions due to Professor Duminil-Copin's tight schedule.

### 2. Part I: SAW Universality and Lattice Geometry

This section dives deep into the **Self-Avoiding Walk (SAW)** problem, focusing on the contrast between the solvable honeycomb lattice and the unsolved square lattice.

*   **Core Fascination:** The "analogy" thinking that led to the solution via the **parafermionic operator** was highlighted as the central point of interest.
*   **The Debate:** I presented a summary of a debate with a roommate (Yuyang Su) regarding the underlying reason for the honeycomb lattice's solvability.
    *   *Opposing Argument:* The roommate suggested solvability is merely due to the **lower coordination number** (3 choices on honeycomb versus 4 on square).
    *   *My Counter-Argument (Hypothesis):* I argued that this simplistic view violates the **Universality Principle** of statistical mechanics and that historical examples (like the solvable Ising model on the square lattice) contradict the idea that local degrees of freedom are the primary barrier. I hypothesized that the solution hinges on a specific, non-obvious **algebraic cancellation** allowed by the honeycomb's geometry but absent in the square lattice.

*   **The Questions:**
    1.  **Symmetry-Complexity Paradox:** Why does the superior four-fold rotational symmetry of the square lattice appear to *complicate* the analysis, while the less symmetric honeycomb lattice permits a closed-form solution? Is there a deeper mathematical principle governing this inverse relationship?
    2.  **Methodological Extension:** Since the current method does not apply to the square lattice, could a modified approach involving **parafermionic operators**, perhaps integrated with additional symmetries or disorder operators, be the key to future progress?

### 3. Part II: 4D Triviality and Scaling Limits

The second part transitions to Professor Duminil-Copin's work on fundamental physics, specifically the paper *Aizenman, Duminil-Copin, Marginal triviality of the scaling limits of critical 4D Ising and $\phi^4$ models*, which was recommended by members of the Chinese academic forum "Chaoli." I noted the connection to a forum member, Chengyang Shao, a postdoc at HDC's home institution, IHÉS.

*   **The Concept:** The focus is on **marginal triviality**—the finding that the 4D $\Phi^4$ model behaves like a Gaussian (free) field in the scaling limit.

*   **The Questions:**
    1.  **Geometric Intuition:** From an intuitive or geometric standpoint (e.g., in the language of **random currents** or polymers), what specific feature in four dimensions causes the non-Gaussian interactions to effectively vanish, making 4D intersections appear **"transparent"** in the limit?
    2.  **SAW Connection:** Given that the **upper critical dimension for SAW is 4**, does the $\Phi^4$ model's triviality imply that the "self-avoiding" constraint becomes geometrically negligible in 4D, making the polymer path behave essentially like a simple **random walk**?
    3.  **Dynamical Perspective (Critical Regularity Structures):** A question posed by a forum member (Hachiri Tomoko) on the dynamic $\Phi^4$ equation: Considering the static triviality and the success of Martin Hairer’s **Regularity Structures** theory in sub-critical cases (like $\Phi^4_3$), is there a **"critical version" of regularity structures** (or an equivalent tool) that can rigorously describe the 4D dynamic $\Phi^4$ equation?

### 4. Conclusion

The email concluded with a polite acknowledgment of the volume of questions, stating that a brief comment or pointer to relevant literature would be sufficient, and reiterating my sincere enthusiasm.

***

## The Follow-up Email: Research Outline

Since the email has not yet been answered, it will now serve as my personal research outline for investigating these advanced topics.

> Subject: **Follow-up on your lecture at SEU: SAW Universality & 4D Triviality (Student from NJU)**
> 
> From: Runnel Zhang <runnel.zhang@smail.nju.edu.cn>
> 
> Date: Thursday, November 27, 2025, 10:08 PM
> 
> To: Hugo Duminil-Copin <hugo.duminil@unige.ch>
> 
> Dear Professor Duminil-Copin,
> 
> I hope this email finds you well.
> 
> I am the undergraduate student from Nanjing University who attended your lecture at Southeast University on November 26th. I traveled from NJU specifically to hear your talk, and I was the one who rushed to the stage first to ask for a photo with you. It was truly an inspiring experience for me.
> 
> At that time, I had a few questions, but due to your tight schedule, you kindly suggested that I reach out via email. I am writing to follow up on that conversation.
> 
> My first set of questions concerns the honeycomb lattice **Self-Avoiding Walks (SAW)** part of your talk. It is such a legendary work, and I was fascinated by the "**analogy**" thinking using the **parafermionic operator**. While my background is not yet deep enough to fully grasp the rigorous proof, I had an interesting debate with my roommate regarding the intuition behind it.
> 
> My roommate Yuyang Su argued that the complexity of the SAW problem is primarily determined by the coordination number (the number of available directions at a vertex)—that the honeycomb lattice is solvable simply because a walker only has 3 choices, whereas other lattices have more. I respectfully disagreed with him. I argued that in statistical mechanics, difficulty rarely scales linearly with the number of local degrees of freedom. If it were just about counting paths, the principle of **Universality** would be compromised. I pointed out that historically, some integrable models (like the Ising model) were solved on square lattices despite having a higher coordination number, implying that "having more directions" is not the fundamental barrier. I suspect the honeycomb lattice succeeds because its geometry allows for a specific **algebraic cancellation** that the square lattice forbids—but I couldn't explain to him why the square lattice, with its superior symmetry, fails to support this structure.
> 
> Driven by this discussion, I have formulated the following questions:
> 
> 1. The square lattice possesses a higher four-fold rotational **symmetry** compared to the honeycomb lattice, which intuitively should simplify the problem. Yet in reality, this seems to make it more challenging. Is there a deeper mathematical principle explaining why **increased symmetry can sometimes complicate rather than simplify the analysis**?
> 2. As you noted, the method does not apply directly to the square lattice, where the connective constant is still unknown. Do you think modified versions of the **parafermionic approach**—perhaps incorporating additional symmetries or **disorder operators**—could eventually yield progress there?
> 
> The second part of my email relates to your other work. I am the youngest core member of a small academic forum here in China called "**Chaoli**". After sharing my excitement about your lecture, our members recommended that I read your work on 4D physics: *Aizenman M., Duminil-Copin H., Marginal triviality of the scaling limits of critical 4D Ising and $\phi^4$ models.*
> 
> Interestingly, the introductory article on our forum regarding this paper (https://chaoli.club/index.php/6841/) was authored by Chengyang Shao, who I believe is currently a postdoc at **IHÉS**, your home institution!
> 
> Since my background in quantum field theory is still developing, I have a more intuitive question regarding this work:
> 
> 1. The result establishes the "**marginal triviality**" (**Gaussian behavior**) in 4D. Intuitively, what specific geometric feature of the "**random currents**" or polymer representation in 4D causes the non-Gaussian interactions to vanish? Is there a visual way to understand why **4D intersections become "transparent"** in the scaling limit compared to 3D?
> 2. This brings me back to your lecture on SAW. In 2D, the self-avoiding constraint fundamentally changes the universality class. However, since the **upper critical dimension for SAW is 4**, does this mean that in 4D, the "**self-avoiding**" constraint becomes geometrically negligible? Is the triviality of the **$\phi^4$ field** essentially stating that the polymer representation behaves like a simple **random walk** because the paths rarely intersect in such high dimensions?
> 3. One of our members nicknamed Hachiri Tomoko raised a question regarding the dynamical perspective. Since the static $\phi^4_4$ is trivial, how should we understand this via **Stochastic Quantization**? Martin Hairer’s **Regularity Structure theory** has successfully handled the sub-critical cases (like $\Phi^4_3$).
> **The Question: Is there a "critical version" of regularity structures (or similar tools) that can rigorously describe the 4D dynamic $\phi^4$ equation?** (This might be slightly tangential... I'm just the *porteur* of this question)
> 
> Thank you so much for your time.
> 
> I realize this email contains quite a few questions. Please do not feel pressured to answer them in detail. If you are busy, a brief comment or a pointer to relevant reading references would already be incredibly helpful. I do not wish to disturb your busy schedule but simply wanted to convey my enthusiasm.
> 
> Sincerely yours,
> 
> **Runnel Zhang** | Undergraduate Student
> Nanjing University | Jianxiong Academy
> 22 Hankou Road, Gulou District, Nanjing 210093, China
> Phone: +86 198 5277 1690
> runnel.zhang@smail.nju.edu.cn | nju.edu.cn