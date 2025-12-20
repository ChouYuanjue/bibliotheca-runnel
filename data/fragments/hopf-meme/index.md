---
title: "Echoes of Summer — From Hopf Fibrations to Higher Algebra"
date: "2024-07-27"
---

## Overview

During the summer, while scrolling through my QQ space, I stumbled upon a dynamic update from **Dr. Peng Keyao** (now, rightfully, **Prof. Peng**). It was a poster for his recent lecture titled *"From Elementary Arithmetic to Higher Algebra."* Seeing his name instantly triggered a wave of nostalgia, transporting me back to the summer of 2021.

Three years ago, he gave us a lecture on the **Hopf Fibration**. I still vividly remember spending days preparing for it, scribbling notes, and trying to wrap my head around the topology of spheres. The note is available at [Chaoli Forum](https://chaoli.club/index.php/6596), with a DOI: [10.6084/M9.FIGSHARE.20310042](https://doi.org/10.6084/M9.FIGSHARE.20310042).

Time changes things — Dr. Peng has ascended to a postdoc at the Université de Bourgogne and been teaching Algebraic Geometry courses, and the topics have evolved from classical topology to the cutting-edge realm of **Infinity Categories** and **Higher Algebra**.

Although I deeply regret missing his 2024 lecture, looking at the lecture abstract and the meme he famously shared back in the day (which seems to bridge his past and present research), I feel a strange sense of temporal overlap. The memories of 2021 have superimposed onto the reality of 2024.

Below is the context of his recent talk, followed by my attempt to decode that legendary "Galaxy Brain" meme, tracing the path from a simple sphere mapping to the profound "truth" of $0=1-1=-1+1=0$.

---

## Part I: The Lecture

![LECTURE](/fragments/hopf-meme/lecture.jpg)

**Title:** Entering the Hall — From Elementary Arithmetic to Higher Algebra
**Speaker:** Peng Keyao (Université de Bourgogne)

**The Abstract:**
> *"Higher Algebra" is a brand-new mathematical direction independently developed by Jacob Lurie and others. It is built upon a foundation known as "Infinity Categories" (or $\infty$-categories). Here, mathematical objects are endowed with "Homotopy."*
>
> *Starting from a meme, we will encounter the Hopf Fibration, Homotopy Groups, Configuration Spaces, and the accompanying Algebraic K-Theory in this report. Simultaneously, we will gradually uncover the truth behind "0=1-1=-1+1=0".*

---

## Part II: Decoding the "Galaxy Brain" Meme

![MEME](/fragments/hopf-meme/meme.jpg)

Prof. Peng used this meme to illustrate the vertiginous ascent of mathematical abstraction. It represents the journey from concrete geometric intuition to the abstract machinery of stable homotopy and K-theory. Here is my interpretation of the progression:

### **Level 1: The Definition**
$$ S^3 \sim \mathbb{C}^2 \setminus \{0\} \to \mathbb{C}P^1 \sim S^2 $$
This is the standard definition of the **Hopf Fibration**.
*   **Context:** It describes a mapping from the 3-sphere ($S^3$) to the 2-sphere ($S^2$).
*   **The Math:** By treating $S^3$ as the unit sphere in $\mathbb{C}^2$, we map points $(z_1, z_2)$ to their ratio $[z_1:z_2]$ in the Complex Projective Line ($\mathbb{C}P^1$), which is topologically a 2-sphere ($S^2$).
*   **Significance:** This was the first example of a non-trivial fiber bundle, where the "fibers" (pre-images of points) are circles ($S^1$) that are linked together.

### **Level 2: The Visualization**
**The Image:** A visualization of nested tori filling space.
*   **Interpretation:** This represents the stereographic projection of the Hopf Fibration into $\mathbb{R}^3$. The fibers (circles) wrap around each other in a way that no two fibers can be separated without cutting. It is the geometric intuition behind the algebraic formula in Level 1—the beauty of topology made visible.

### **Level 3: The First Non-Trivial Calculation**
$$ \pi_4(S^3) \cong \mathbb{Z}/2\mathbb{Z} $$
**Concept:** Homotopy Groups of Spheres.
*   **The Shift:** We move from looking at the map itself to calculating the *invariants*. $\pi_n(S^k)$ measures the number of distinct ways to map an $n$-dimensional sphere into a $k$-dimensional sphere.
*   **The Surprise:** One might expect $\pi_4(S^3)$ to be trivial (0) because $4 > 3$. However, the Hopf map generates a non-trivial element. The result $\mathbb{Z}/2\mathbb{Z}$ indicates that there is a "twist" that persists. This marks the entry into the notoriously difficult field of computing higher homotopy groups.

### **Level 4: The Stable Homotopy & Geometry Connection**
$$ \pi_1^s(\mathbb{S}) \cong \Omega_1^{fr} $$
**Concept:** The Pontryagin-Thom Construction.
*   **$\pi_1^s(\mathbb{S})$:** This denotes the **first stable homotopy group of spheres**. "Stable" means we look at what happens when dimensions go to infinity (suspension).
*   **$\Omega_1^{fr}$:** This is the **framed cobordism group** of 1-manifolds.
*   **The Insight:** This isomorphism is a profound result (Pontryagin-Thom theorem) that translates a difficult topological problem (homotopy groups) into a geometric one (classifying manifolds with framed boundaries). It bridges the gap between "wobbly" topology and rigid geometry.

### **Level 5: The Ultimate Abstraction (The "Field with One Element")**
$$ K_1(\mathbb{F}_1) \cong S_\infty^{\text{ab}} $$
**Concept:** Algebraic K-Theory and $\mathbb{F}_1$.
*   **$\mathbb{F}_1$:** The **Field with One Element**. This is a hypothetical, non-existent mathematical object that mathematicians behave *as if* it exists to unify arithmetic and geometry.
*   **$S_\infty^{\text{ab}}$:** This likely refers to the abelianization of the infinite symmetric group, or concepts related to the sphere spectrum in a stable setting.
*   **The Meaning:** At this level of enlightenment, we are doing **Algebraic K-Theory** (the study of projective modules and invariants) on this ghost field. It suggests that the stable homotopy groups of spheres (the topology from Level 4) are actually just the K-theory of $\mathbb{F}_1$. It is a glimpse into the "Higher Algebra" Prof. Peng mentioned—where Number Theory and Topology become indistinguishable.

### **Level 6: The "Truth"**
$$ 0 = 1 - 1 = -1 + 1 = 0 $$
**Concept:** The Eilenberg Swindle / Infinite Stability.
*   **The Paradox:** In elementary arithmetic, this is trivial. But in the context of infinite structures (like the "Infinity Categories" mentioned in the lecture abstract), this represents the **Eilenberg Swindle**.
*   **Explanation:** If you have an infinite sum or an object capable of absorbing addition (like an infinite direct sum $S = A \oplus A \oplus \dots$), you can shift parentheses:
    $$ S = 1 - 1 + 1 - 1 \dots $$
    $$ S = (1 - 1) + (1 - 1) + \dots = 0 $$
    $$ S = 1 + (-1 + 1) + (-1 + 1) + \dots = 1 $$
*   **Conclusion:** This is the "God Tier" realization. It usually proves that certain invariants (like K-groups of infinite rings) vanish (become zero). It is the mechanism that allows "stable" phenomena to exist. The complex machinery of Level 5 collapses into this fundamental, beautiful arithmetic trick regarding infinity.

---

## Final Thought

Three years ago, I was just learning what a fiber bundle was. Today, seeing Prof. Peng discuss the "Truth of $0=1-1=-1+1=0$" via Jacob Lurie’s Higher Algebra, I realize how deep the rabbit hole goes. While I missed the lecture, re-analyzing this meme with my current understanding feels like a small, personal seminar—a quiet nod to the passage of time and the enduring elegance of mathematics.