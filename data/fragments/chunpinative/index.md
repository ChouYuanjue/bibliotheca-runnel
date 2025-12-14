---
title: "Initial Construction and Preliminary Properties of Chunpinative Geometry"
date: "2020-12-07"
---


## Overview

This content takes the form of a geometric theory construction record, proposing the core axiom of "Chunpinative Geometry" (Chunping Geometry), and defines related concepts such as "Chunpinative Space" (Chunping Space) and "Chunpinatively Measurable" on this basis, and puts forward preliminary properties and lemmas. From the perspective of mainstream geometry, the core axiom "the corner is equal to the supplementary angle" breaks the basic logical relationship of angles in Euclidean geometry and non-Euclidean geometry, and the related property descriptions lack strict mathematical derivation support. Combined with the subsequent note, it can be inferred that this is a humorous mathematical theory simulation, essentially using the form of geometric axiom system construction to tease the user's junior high school math teacher Chunping Ding (the "Chunpinative" in the theory name corresponds to the teacher's given name "Chunping") and classmate CZL (the proposer of the lemma in the content).

---

## 1. Core Axiom and Basic Definition of Chunpinative Geometry

### 1.1 Foundational Axiom: D-C-P Axiom

The core axiom of Chunpinative Geometry, referred to as the D-C-P Axiom, is clearly defined as: **"The corner is equal to its supplementary angle"**. In the context of this axiom, the "corner" refers to the angle formed by two intersecting line segments or rays in the geometric space, and the "supplementary angle" refers to the angle whose sum with the original angle is \(180^\circ\). This axiom breaks the constraint that "the supplementary angle of an angle is equal to \(180^\circ\) minus the original angle" in traditional geometry, and establishes a direct equivalence relationship between the angle and its supplementary angle, which is the logical starting point for constructing the entire Chunpinative Geometry system.

### 1.2 Definition of Core Geometric Space: Chunpinative Space

**1.2.1 Formal Definition**: A geometric space that satisfies the D-C-P Axiom (i.e., in this space, any corner is equal to its supplementary angle) is formally named **Chunpinative Space**. The theoretical system that studies the measure of general sets on Chunpinative Space is collectively called **Chunpinative Geometry**. The naming of the space and the geometry system is intended to highlight the core position of the axiom in the entire theory and carry the corresponding commemorative or humorous connotation.

**1.2.2 Scope of Application Note**: The initial definition of Chunpinative Space is based on the general geometric framework. For special cases such as zero-dimensional space, one-dimensional space, and discrete space, it needs to be further supplemented and restricted in the follow-up expansion of the theory, and the relevant content will be discussed in the subsequent detailed research.

### 1.3 Preliminary Properties of Chunpinative Space

Based on the D-C-P Axiom and the definition of Chunpinative Space, the following preliminary properties (1.2.1 Properties) can be derived, which lay the foundation for the further study of the space structure:

- **Property i (Space Carrier)**: A general Chunpinative Space is defined on the Cartesian product \(X \times Y\), where \(X\) and \(Y\) are non-empty sets (usually number sets or point sets in traditional geometry). This means that the elements (points) in the space can be represented by ordered pairs \((x, y)\) where \(x \in X\) and \(y \in Y\), which provides a coordinate representation basis for the analytical study of the space. The specific forms of \(X\) and \(Y\) (such as real number sets, integer sets, etc.) will be determined according to the specific research objects of the space.

- **Property ii (Algebraic Structure)**: Chunpinative Space is an Abelian space (commutative space), which means that for the defined binary operation (such as the addition operation of vectors or points in the space), the commutative law holds, i.e., for any two elements \(a\) and \(b\) in the space, \(a + b = b + a\). However, the space is not closed under addition, that is, the result of adding two elements in the space may not belong to the space itself. The proof of this property is regarded as an exercise for further exploration, and the core of the proof lies in constructing counterexamples based on the D-C-P Axiom.

- **Property iii (Rigidity)**: Any Chunpinative Space is rigid, which is mainly reflected in its non-deformability. In traditional geometry, "rigidity" usually refers to the property that the shape and size of a geometric figure remain unchanged when it is subjected to external forces. In Chunpinative Space, this rigidity is derived from the uniqueness of the angle relationship determined by the D-C-P Axiom—since the angle and its supplementary angle are equal, the angle size is uniquely determined (equal to \(90^\circ\) in the case of real number angles), which makes the relative position relationship between the line segments or planes in the space fixed and cannot be deformed arbitrarily. The verification of this property can be realized by constructing a specific Chunpinative Space (such as the space mentioned in Lemma 1.3) and analyzing its structural invariance.

### 1.4 Key Lemma: CZL Lemma (by Cui Ziling)

**Lemma Statement (1.3 Lemma)**: There exists a Chunpinative Space in which a right triangle with a vertex angle of \(100^\circ\) can exist. This lemma is proposed by classmate CZL (Cui Ziling) and is therefore named the CZL Lemma. It is a key breakthrough in the study of the specific structure of Chunpinative Space, proving the existence of special Chunpinative Spaces that differ from traditional geometric spaces.

**Relationship with General Space**: It is obvious that the Chunpinative Space mentioned in Lemma 1.3 is a special case of the general Chunpinative Space defined in Property i (1.2.1 i). The general space is defined on \(X \times Y\), while the space in the lemma is a specific form of \(X \times Y\) with restricted \(X\) and \(Y\), which is a concrete manifestation of the general space under specific conditions.

### 1.5 Construction Method of Special Chunpinative Space

To construct the special Chunpinative Space that satisfies the CZL Lemma (i.e., the space where a right triangle with a vertex angle of \(100^\circ\) exists), the method of analytic continuation of the entire space must be adopted. Analytic continuation is a common method in mathematical analysis, which extends the definition domain of a function or the scope of a space while maintaining certain analytical properties. In the construction of Chunpinative Space, this method is used to break the constraints of traditional Cartesian product \(X \times Y\) and expand the space structure.

Specifically, the analytic continuation transforms the original space into a mapping from \(X \times Y\) to \(\xi(X \times Y)\), where \(\xi\) is the expanded space after continuation. In the case of no ambiguity, this type of space obtained by continuation is referred to as \(\xi\) for short. The core of the mapping is to redefine the angle measurement rule in the space based on the D-C-P Axiom, so that the "right triangle" in the space no longer follows the angle sum theorem of triangles in Euclidean geometry, thereby realizing the existence of a right triangle with a vertex angle of \(100^\circ\).

### 1.6 Definition of Chunpinatively Measurable Space

**Formal Definition (1.4 Definition)**: Let \(\xi\) be a non-empty Chunpinative Space obtained by analytic continuation (\(\xi \neq \emptyset\)), and let \(R\) be a \(\sigma\)-algebra composed of some subsets of \(\xi\). Then the binary group \((\xi, R)\) is called a **Chunpinatively Measurable** space. Among them, the \(\sigma\)-algebra \(R\) satisfies three conditions: 1. The entire space \(\xi \in R\); 2. If \(A \in R\), then the complement of \(A\) (\(\xi \setminus A\)) \(\in R\); 3. For any countable sequence of sets \(A_1, A_2, \dots, A_n, \dots \in R\), their union \(\bigcup A_n \in R\). The definition of \(\sigma\)-algebra provides a mathematical basis for the definition of measure on Chunpinative Space, which is the premise of studying the measure of general sets on the space.

## 2. Supplementary Note on Chunpinative Geometry

It should be noted that the above content is only the initial attempt of the construction of Chunpinative Geometry, and there may be problems such as incomplete logical derivation and unclear concept definition. The core purpose is to use the form of geometric theory to carry out humorous expression. The later complete and self-consistent version of Chunpinative Geometry has been improved and sorted out, and can be viewed through the link: [https://www.runnelzhang.com/achieved/paper-cpg](https://www.runnelzhang.com/achieved/paper-cpg). The improved version will supplement the strict proof of the lemma, the detailed definition of the space operation, and the specific form of the measure, making the entire theory more rigorous and self-consistent.
> （注：文档部分内容可能由 AI 生成）