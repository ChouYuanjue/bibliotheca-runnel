---
title: "The Derivation of Trigonometric Sum and Difference Formulas from Advanced Standpoints"
date: "2023-02-23"
---


## Overview

The origin of this note was during class when I wanted to verify the tangent (tan) sum formula directly using the **Reciprocal Basis** from tensor calculus. I initially tried using the scalar triple product (mixed product), but that didn't work. Later, I attempted orthogonal decomposition, but the reciprocal basis of a unit orthogonal basis is the basis itself, which rendered the specific properties of reciprocal bases useless.

Although simply "grabbing" the result using rotation matrices is a very reasonable approach, I had an obsession with finding a **"direct proof for tan."** Therefore, I organized various derivation paths ranging from elementary geometry to tensor operations, and finally to higher-level mathematical viewpoints.

N-20230220: View via [here](https://www.runnelzhang.com/notes/2023/N-20230220.pdf), or visit DOI:[10.6084/M9.FIGSHARE.22268962](https://doi.org/10.6084/m9.figshare.22268962)

N-20230223: View via [here](https://www.runnelzhang.com/notes/2023/N-20230223.pdf), or visit DOI:[10.6084/M9.FIGSHARE.22268965](https://doi.org/10.6084/m9.figshare.22268965)

---

## I. Approaches via Geometry & Vectors

### 1. Proof of the Sine Formula via Cross Product
This is the most intuitive method. We restrict the angle range to $(0, \pi)$.
Let $\vec{OM} = (\cos\beta, \sin\beta)$ and $\vec{ON} = (\cos\alpha, \sin\alpha)$.
Using the geometric definition of the cross product's modulus:
$$ |\vec{ON} \times \vec{OM}| = |\vec{ON}||\vec{OM}|\sin(\beta-\alpha) = \sin(\beta-\alpha) $$
On the other hand, using the coordinate form (determinant):
$$ \vec{ON} \times \vec{OM} = \begin{vmatrix} \cos\alpha & \sin\alpha \\ \cos\beta & \sin\beta \end{vmatrix} \vec{k} = (\sin\beta\cos\alpha - \sin\alpha\cos\beta)\vec{k} $$
Comparing both expressions (noting direction and sign), we directly obtain:
$$ \sin(\beta-\alpha) = \sin\beta\cos\alpha - \sin\alpha\cos\beta $$

### 2. The Failed Attempt via Projection Vectors
I attempted to find a shortcut using vector projection.
Calculating the squared modulus of the projection vector $\vec{NH}$ resulted in $1 - \cos^2(\beta-\alpha) = \sin^2(\beta-\alpha)$.
This circled back to the $\sin/\cos$ form and did not achieve my goal of "deriving tan directly." This path is a dead end.

---

## II. Perspectives from Algebra & Analysis

### 3. Rotation Matrices
It is perhaps better to say that this is the most reasonable method, and my personal favorite. Even before encountering textbooks, I preferred thinking in terms of matrices.
Algebraically, "rotating by $\alpha+\beta$" is equivalent to the composition of linear transformations: first rotating by $\alpha$, then by $\beta$.
$$ R(\alpha+\beta) = R(\beta) \cdot R(\alpha) $$
$$ \begin{bmatrix} \cos(\alpha+\beta) & -\sin(\alpha+\beta) \\ \sin(\alpha+\beta) & \cos(\alpha+\beta) \end{bmatrix} = \begin{bmatrix} \cos\beta & -\sin\beta \\ \sin\beta & \cos\beta \end{bmatrix} \cdot \begin{bmatrix} \cos\alpha & -\sin\alpha \\ \sin\alpha & \cos\alpha \end{bmatrix} $$
Directly expanding the matrix multiplication yields the sum formulas for sine and cosine instantly.

### 4. Euler's Formula
When dealing with trigonometric formulas, using complex numbers is generally the most convenient (Trivial) approach.
$$ e^{i(\alpha+\beta)} = e^{i\alpha} \cdot e^{i\beta} $$
$$ \cos(\alpha+\beta) + i\sin(\alpha+\beta) = (\cos\alpha + i\sin\alpha)(\cos\beta + i\sin\beta) $$
Simply expanding the real and imaginary parts suffices. While this proof is extremely elegant, it still targets $\sin$ and $\cos$.

---

## III. The Tensor Challenge: Direct Proof of the Tangent Formula

To satisfy my obsession with "proving tan directly," I attempted to introduce concepts of **non-orthogonal bases** and the **Reciprocal Basis**.

### 5. Reciprocal Basis Attempt
**Idea:** Let $\vec{OM}, \vec{ON}$ be the basis $\{g_i\}$. The metric tensor matrix is $G = \begin{bmatrix} \cos\alpha & \cos\beta \\ \sin\alpha & \sin\beta \end{bmatrix}$.
Using Gaussian elimination to find the inverse yields the reciprocal basis $\{g^i\}$.

**Process:**
In the note from the 20th, I derived a determinant involving $\tan(\alpha-\beta)$, but there was a sign error. In the note from the 23rd, I corrected the calculation, constructed a vector $\vec{z} = (\sin(\alpha-\beta), 0, \cos(\alpha-\beta))$, and calculated the following determinant:
$$ 1/\tan(\alpha-\beta) = \begin{vmatrix} 1 & 0 & \frac{1}{\tan(\alpha-\beta)} \\ -\tan\beta & 1 & 0 \\ \tan\alpha & -1 & 0 \end{vmatrix} $$
After expansion and simplification, I finally obtained:
$$ \frac{1}{\tan(\alpha-\beta)} = \frac{1 + \tan\alpha\tan\beta}{\tan\alpha - \tan\beta} $$
This verifies the tangent difference formula. Although the manual calculation was somewhat tedious, it proves the feasibility of handling trigonometric functions using the properties of covariant and contravariant vectors.

---

## IV. Supplements from Higher Viewpoints

After organizing the notes above, I realized that these methods actually imply deeper mathematical structures. Here are a few higher-level perspectives I have added:

### 6. Analytical Perspective: ODE Uniqueness
Disregarding geometry, $\sin$ and $\cos$ are essentially linearly independent solutions to the differential equation $y'' + y = 0$.
Define $f(x) = \sin(x+a)$. It is easy to prove that $f(x)$ is also a solution to this equation.
According to the Uniqueness Theorem for solutions of second-order linear ODEs, $f(x)$ must be a linear combination of $\sin x$ and $\cos x$:
$$ \sin(x+a) = C_1 \sin x + C_2 \cos x $$
By substituting $x=0$ and $x'(0)$ to determine the coefficients, one can derive the formula purely analytically. This is a "hardcore" analytical proof.

### 7. The Ultimate Geometric Perspective: Ptolemy's Theorem
This is a "dimensional strike" (a powerful simplification) in geometry. Construct a cyclic quadrilateral on a unit circle. According to the theorem—"the product of the diagonals equals the sum of the products of the opposite sides"—the side lengths correspond directly to chord lengths (i.e., sine values).
$$ \sin(\alpha+\beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta $$
This requires no complex auxiliary lines, relying directly on the profound properties of Euclidean geometry.

### 8. Algebraic Perspective: Lie Groups & The Exponential Map
Returning to my favorite "Rotation Matrix Method," elevating it to the level of the Lie Group $SO(2)$ makes everything transparent.
Elements of the 2D rotation group $SO(2)$ can be represented via the exponential map $R(\theta) = e^{\theta X}$, where $X$ is the generator (skew-symmetric matrix).
Using the homomorphism property of the exponential function:
$$ e^{(\alpha+\beta)X} = e^{\alpha X} \cdot e^{\beta X} $$
This indicates that the trigonometric addition formula is essentially the **manifestation of group addition under the exponential map**. This also explains why Euler's formula ($U(1)$ group) and the Rotation Matrix ($SO(2)$ group) approaches are so formally similar—they are isomorphic.

---

**Conclusion:**
From initially drawing circles and finding segments, to deriving matrices and tensors, and finally understanding the underlying Group Theory structure. So-called "formulas" are merely projections of the same mathematical entity across different spaces. Although it was a long detour, and the reciprocal basis calculation was laborious, the process of exploration was perhaps more interesting than the result itself.