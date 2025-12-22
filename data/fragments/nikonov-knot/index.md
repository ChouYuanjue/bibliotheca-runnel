---
title: "The Space Between the Lines: A Post-Gaokao Journey into Knot Theory via Nikonov's seminar"
date: "2025-07-05"
---

## Overview

The summer after the *Gaokao* is a strange time. The pressure valve releases, and suddenly, there is silence. To fill that silence, I found myself in a online seminar room, listening to I. M. Nikonov speak about "Partial Tribrackets."

I will be honest: I was completely lost. Terms like "quasigroups," "biquandloids," and "thickened surfaces" were flying around the room, and I felt like I had walked into a movie halfway through. My high school mathematics education—calculus, geometry, algebra—had built a strong foundation, but this was a skyscraper I couldn't see the top of.

Refusing to let the confusion win, I tracked down the speaker's related paper: **“The crossing and the arc from the topological viewpoint” (arXiv:2504.18836v1)**. I decided to treat this paper not just as a reading assignment, but as a map.

My study session became "top-heavy." I spent days obsessing over the **Introduction** and **Section 2**, specifically the fundamental philosophical divide in knot theory: the **Topological** view vs. the **Combinatorial** view. This note is the result of that deep dive—a compilation of what I learned from the paper, supplemented by the external research I had to do just to understand the first page.

---

## **Part I: The Two Faces of Knot Theory**

The paper opens with a sentence that dictates the entire structure of the field:

> *"Knot theory can be approached from two different sides. The topological approach defines a knot as an embedding of the circle in $\mathbb{R}^3$. ... Combinatorially, a knot can be defined as an equivalence class of diagrams modulo Reidemeister moves."* — Nikonov

This duality fascinated me. It’s like the wave-particle duality in physics; to truly understand the object, you must accept it behaves as two different things simultaneously.

### **1. The Topological Approach: The God’s Eye View**

This is the definition that feels most "real." It treats the knot as a physical object existing in 3-dimensional space.

**Definition:** A knot $K$ is an embedding of the circle $S^1$ into the Euclidean space $\mathbb{R}^3$ (or the sphere $S^3$).
$$ f: S^1 \hookrightarrow \mathbb{R}^3 $$

When I first read "embedding," I had to look up what that actually meant mathematically. It’s not just placing a loop in space; it must be a homeomorphism onto its image. Crucially, knot theory generally deals with *tame* knots (knots that can be represented as a polygon with a finite number of sides), avoiding "wild knots" that have infinite wiggliness (like the Fox-Artin wild arc).

The core problem in the topological approach is **Ambient Isotopy**. Two knots $K_1$ and $K_2$ are equivalent if there is a continuous deformation of the space $\mathbb{R}^3$ that carries $K_1$ to $K_2$. It’s not just that the string moves; the *entire universe around the string* stretches and twists like rubber to accommodate the movement.

The paper lists several major topological achievements that I had to unpack one by one:

#### **A. Prime Decomposition (Schubert)**
Nikonov cites [35] regarding the decomposition of knots.
*   **The Concept:** Just as every integer can be uniquely factored into prime numbers (e.g., $12 = 2 \times 2 \times 3$), every knot can be decomposed into "Prime Knots."
*   **The Operation:** The "multiplication" for knots is the **Connected Sum** ($K_1 \# K_2$). You cut a small arc out of each knot and splice them together.
*   **The Theorem:** Horst Schubert proved in 1949 that this decomposition is unique. A knot is "prime" if it cannot be written as the sum of two non-trivial knots.
*   *Why this matters:* It gives us a periodic table of knots. The Trefoil is prime. The Figure-Eight is prime. But a "Granny Knot" is just two Trefoils added together.

#### **B. Thurston’s Trichotomy**
This was the most intimidating concept in the introduction. The paper references Thurston [38], a giant in the field.
*   **The Concept:** In the late 1970s, William Thurston revolutionized topology by linking it to geometry. He proposed that 3-manifolds (like the space obtained by carving a knot out of $\mathbb{R}^3$, called the *knot complement*) can be cut into pieces, each of which has a specific geometric structure.
*   **The Three Types of Knots:**
    1.  **Torus Knots:** These live on the surface of a donut (torus). They are highly structured and repetitive.
    2.  **Satellite Knots:** These are "knots within knots." Imagine taking a solid torus that contains a knot, tying that entire solid torus into *another* knot, and pulling it tight. They are "composite" in a geometric sense.
    3.  **Hyperbolic Knots:** This was the shocker. *Most* knots fall into this category. Their complements admit a metric of constant negative curvature (hyperbolic geometry). This means the knot complement has a finite, rigid **Hyperbolic Volume**, which becomes a powerful topological invariant. The Figure-Eight knot is the simplest hyperbolic knot.

#### **C. The Knot Group**
Nikonov mentions the "knot group [9]."
*   **Definition:** $\pi_1(\mathbb{R}^3 \setminus K)$. This is the fundamental group of the space *around* the knot.
*   **Interpretation:** Imagine holding a loop of string in the empty space around the knot. Can you shrink that loop to a point without touching the knot? If the knot wasn't there, the answer would always be yes (the group is trivial). But the knot acts as an obstacle. The algebra of how those loops wind around the knot captures the knot's topology perfectly.
*   **The Catch:** While the Knot Group is a perfect invariant (it distinguishes the unknot from everything else), it is an infinite non-abelian group. Checking if two such groups are isomorphic is an algorithmically unsolvable problem in general!

### **2. The Combinatorial Approach: The Shadow World**

While the topological approach is elegant, it is incredibly hard to calculate with. How do you calculate the "hyperbolic volume" of a string in your pocket? This is where the Combinatorial approach enters.

**Definition:** A knot is an equivalence class of **Diagrams** modulo **Reidemeister Moves**.

This essentially flattens the 3D complexity into 2D graphs with "over/under" information.
*   **The Diagram:** A 4-valent planar graph where vertices (crossings) are marked to show which strand is on top.
*   **Reidemeister Moves:** Kurt Reidemeister proved that any two diagrams of the same knot can be transformed into each other using just three local moves:
    1.  $\Omega_1$: Twisting a loop (adding/removing a curl).
    2.  $\Omega_2$: Sliding one strand over another (adding/removing two crossings).
    3.  $\Omega_3$: Sliding a strand across a crossing (the triangle move).

The paper notes a crucial limitation here:
> *"Many constructions of knot invariants ... use labels assigned to diagram elements. ... The universal invariant labels ... can be thought of as equivalence classes of arcs and crossings."*

This is the problem. In the combinatorial world, we chop the knot into pieces—**Arcs** (lines between undercrossings), **Regions** (spaces between lines), and **Crossings**. We assign algebraic values (colors) to these pieces to build invariants (like the Jones Polynomial or Skein Modules).

**The Philosophocal Gap:**
When we calculate something using a diagram, we often lose the geometric intuition. *Why* does coloring an arc with a matrix correspond to 3D topology? Is an "arc" just a line of ink on paper, or is it something real?

---

## **Part II: The Bridge — Nikonov’s "Probes"**

This is where Nikonov’s paper truly shines and where my deep reading paid off. He proposes a way to unify these two worlds. He asks: **What if the combinatorial elements (arcs, crossings) were actually topological objects?**

To do this, he introduces the environment of a **Thickened Surface**.
Instead of $\mathbb{R}^3$, we work in $F \times I$, where $F$ is a surface and $I=[0,1]$ is an interval. This is like a slice of space, a slab of jelly.

### **1. Redefining Diagram Elements**
This section of the paper (Section 2.2 - 2.5) blew my mind. Nikonov stops treating diagram elements as 2D drawings and redefines them as **Isotopy Classes of Paths**, which he calls **Probes**.

*   **The Arc (Topological Definition):**
    Usually, an arc is a line segment in a diagram.
    *Nikonov's View:* An arc is an isotopy class of a path starting on the knot $K$ and travelling "up" through the thickened surface to the top boundary $F \times \{1\}$.
    *Visualization:* Imagine the knot floating in the middle of the jelly slab. You stick a needle (the probe) from the top surface down to touch the knot. The "arc" is that needle. If you wiggle the needle (isotopy), it's still the same arc.

*   **The Semiarc (Topological Definition):**
    Usually, a semiarc is an edge of the graph from one crossing to another.
    *Nikonov's View:* A path from the bottom surface $F \times \{0\}$ to the top surface $F \times \{1\}$ that intersects the knot $K$ exactly once.

*   **The Crossing (Topological Definition):**
    Usually, a vertex where two lines cross.
    *Nikonov's View:* A path from bottom to top that intersects the knot **twice**.
    *Why this is brilliant:* A crossing isn't just a point; it's a history of interaction. The probe passes through the knot at two different depth levels, capturing the "over/under" nature physically.

*   **The Region (Topological Definition):**
    *Nikonov's View:* A path from bottom to top that **never** intersects the knot. It explores the empty space (the knot complement).

### **2. Invariants vs. Coinvariants**
The Introduction makes a subtle but vital distinction between *Invariants* and *Coinvariants*, a concept linked to **Categorification**.

*   **Invariant:** A value that is exactly the same for all diagrams of a knot (e.g., The genus is always an integer, say $g=1$).
*   **Coinvariant:** A set or space that is *isomorphic* for all diagrams, but not identical.
    *   *My Analogy:* Think of a Vector Space $V$. Its dimension (a number) is an invariant. The Space $V$ itself is a coinvariant. If you change the basis (change the diagram), the coordinates change, but the space is intrinsically the same.
    *   Nikonov argues that the set of all possible Arc Probes is the **Universal Coinvariant**. It contains all the information needed to build other invariants.

By defining these elements topologically, Nikonov validates the combinatorial approach. When we perform a Reidemeister move, we aren't just erasing lines on paper; we are isotoping these "probes" in 3D space.

---

## **Part III: From Topology to Algebra (The Seminar Connection)**

Having grounded myself in the definitions, the second half of the paper (and the actual content of the seminar) finally made sense. The seminar was about "Partial Tribrackets." I realized this was simply the algebraic shadow of the topological probes I had just studied.

The paper transitions from **Isotopy** (physical movement) to **Homotopy** (algebraic equivalence). When we look at the homotopy classes of these probes, they naturally form algebraic structures. This answers the question: "How do we color a knot?"

### **1. Arcs $\to$ Quandles**
This is the most famous example. If you take the homotopy classes of the Arc Probes, they form a structure called a **Quandle**.
*   *The Logic:* If two arcs $a$ and $b$ meet at a crossing to form a third arc $c$, the algebraic relationship $c = a * b$ must hold.
*   *Topologically:* This corresponds to the fundamental group of the knot complement acting on the arcs.

### **2. Regions $\to$ Partial Ternary Quasigroups (Tribrackets)**
This was the specific topic of Nikonov's talk.
*   *The Setup:* Instead of arcs, we color the **regions**.
*   *The Interaction:* At a crossing, four regions meet. If you know the colors of three, can you determine the fourth?
*   *The Structure:* This creates a ternary operation $[a, b, c] = d$. This structure is called a **Tribracket**.
*   *Why "Partial"?* In the standard plane, any regions can technically interact. But in a thickened surface (topology!), there are obstructions. Not all regions *can* touch each other due to the genus of the surface. Therefore, the algebraic operation is only defined for "neighboring" regions. Hence, **Partial** Tribrackets.

### **3. Semiarcs $\to$ Biquandloids**
Standard Biquandles are used for virtual knots. Nikonov introduces the **Biquandloid** to handle the geometric constraints of knots in fixed surfaces. It’s a biquandle with "shadow maps" to account for the spatial positioning of the semiarcs.

### **4. Crossings $\to$ Crossoids**
Finally, he defines a structure for the crossings themselves, called a **Crossoid**. This generalizes the theory of Parity (which distinguishes "good" and "bad" crossings in virtual knot theory).

---

## **Conclusion: The Grand Unification**

The paper concludes by introducing the **Homotopical Multicrossing Complex**. This felt like the "Final Boss" of the paper. It seems Nikonov is constructing a massive homology theory where:
1.  The chains are made of these "multicrossings" (sequences of probes).
2.  The boundary operations correspond to resolving these crossings.
3.  The Tribracket, Biquandle, and Crossoid homologies are just specific "projections" or pairings of this one universal complex.

**Final Thoughts:**
My attempt to understand a single seminar turned into a journey through the foundations of low-dimensional topology. I started by looking for a definition of a "tribracket" and ended up realizing that the lines we draw on paper to represent knots are actually physical, topological probes reaching through a thickened surface.

The gap between the "God's eye" Topological view and the "Shadow" Combinatorial view is vast, but concepts like Nikonov's Probes provide the bridge. The algebra isn't just abstract rules; it's the encoded movement of these probes in 3D space. While I definitely need more time to digest the complexities of the Multicrossing Complex, I no longer feel like I walked into the movie halfway through. I’m just starting to watch it from the beginning.