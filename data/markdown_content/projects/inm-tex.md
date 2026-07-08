# INM TeX

**INM-TeX** is the TeX-refactored, English-only version of the original project:

```text
https://github.com/ChouYuanjue/Informal_Notes_on_Mathematics
```

The original notes were accumulated over a long period and contained a mixture of Chinese, English, and Russian, together with many informal fragments, exercises, explanations, and later comments.  This repository reorganizes that material into a unified LaTeX book project.

The compiled reading version is kept in the repository as:

```text
inm.pdf
```

## About this version

This repository is not a simple mechanical conversion of the original notes.  It is a **TeX reconstruction** and editorial refactoring of the earlier material.

The main goals of this version are:

- to convert the notes into a consistent book-like TeX structure;
- to make the whole text readable as a single English document;
- to correct obvious mathematical, linguistic, and structural errors;
- to expand places where the original notes were too compressed;
- to preserve the informal, exploratory style of the original project;
- to keep the generated PDF available for direct reading.

The result is still called *Informal Notes on Mathematics* because the purpose has not changed: it is a record of mathematical learning, problem solving, and conceptual connection.  The difference is that this version is more coherent as a book and more convenient to read, compile, revise, and maintain.

## Relation to the original notes

The original project should be understood as the source archive.  It contains the earlier form of the notes, including multilingual passages and rougher formatting.  This repository is a later TeX-based reconstruction.

During the reconstruction, the following kinds of changes were made:

1. **Language unification.**  The original mixture of Chinese, English, and Russian has been rewritten into English.
2. **Structural reorganization.**  Notes are arranged into thematic parts and dated note chapters.
3. **Correction of obvious errors.**  Statements that were visibly false, misleading, or inconsistent with later explanations were corrected.
4. **Expansion of thin sections.**  Short fragments, empty-looking examples, missing explanations, and unfinished TODO-style remarks were expanded where the intended mathematics was clear.
5. **Editorial smoothing.**  The prose has been made more consistent while retaining the informal note-taking voice.
6. **TeX normalization.**  The project now has a single main entry point, shared macros, shared style files, part files, and individual note source files.

This version should therefore be read as a revised descendant of the original repository rather than a byte-for-byte reproduction.

## What kind of book is this?

This book is closer to a mathematical notebook than to a conventional textbook.  It does not try to present every subject in a perfectly linear curriculum.  Instead, it records how ideas from different areas of mathematics begin to connect with one another.

A typical chapter may begin with an elementary problem or calculation, then move toward a more structural interpretation.  For example, a computation with determinants may lead to volume and alternating multilinearity; a discussion of quotient sets may lead toward quotient spaces; a concrete group action may suggest geometry or topology; a derivative calculation may be reinterpreted as linear approximation; and backpropagation may be seen as a structured chain rule.

The book is informal in tone, but it tries to be serious about mathematical meaning.  It values examples, warnings, diagrams, and conceptual bridges.  It also keeps some of the historical texture of the learning process: the dated note labels remain, and the reader can often see how an elementary idea later reappears in a more advanced form.

## Mathematical scope

The notes range across many areas, including:

- foundations of mathematics, set theory, category-theoretic language, and type-theoretic viewpoints;
- arithmetic, congruences, finite fields, algebraic number theory, elliptic curves, and early Langlands-related motivation;
- combinatorics, counting arguments, binomial identities, generating functions, and graph-related examples;
- linear algebra, determinants, rank, basis change, inner products, diagonalization, quadratic forms, tensors, and spectral ideas;
- single-variable calculus, mean value theorems, integration, inequalities, and complex differentiability;
- multivariable calculus, total derivatives, Hessians, constrained extrema, multiple integrals, coordinate changes, and vector calculus intuition;
- Fourier series, ordinary differential equations, partial differential equations, wave equations, heat equations, and diffusion;
- Euclidean, analytic, projective, and transformation-based geometry;
- topology, quotient spaces, homotopy, CW complexes, Riemann surfaces, Hopf fibrations, and related geometric structures;
- short research-facing vignettes connecting classical mathematics with modern topics such as machine learning.

The breadth is intentional.  The purpose is not to replace specialized textbooks, but to show how mathematical language travels between topics.

## Editorial philosophy

The guiding principle of the book is that computations should eventually point beyond themselves.

Elementary exercises are not treated as disposable drills.  They are often the first appearance of a structure that becomes more visible later.  A recurrence may lead to algebraic thinking; a counting identity may become a generating-function argument; a matrix calculation may become a statement about a linear map; a topology example may become a question about invariance under deformation.

This is why the book contains both routine-looking examples and more abstract commentary.  The informal style is meant to make the transitions visible: from example to definition, from calculation to invariant, from formula to structure.

The reconstruction also tries to avoid over-polishing.  The book should still feel like notes.  It is allowed to contain motivation, side remarks, warnings, and bridges to later mathematics.  Those features are part of its identity.

## TeX template and styling

The TeX template is mainly based on Evan Chen's *An Infinitely Large Napkin* project:

```text
https://github.com/vEnhance/napkin/
```

This repository uses that style as the foundation for the book layout and then makes small modifications for this project.  The local style layer includes project-specific note chapters, theorem-like boxes, examples, remarks, cautions, diagrams, and part-level organization.

The main style-related files are:

```text
tex/preamble.tex
tex/macros.tex
tex/note-style.tex
```

The goal of the styling is to keep the document readable as a long mathematical book while still preserving the feeling of informal notes.

## How to read the note labels

Most chapters are labeled by identifiers such as:

```text
N-20251202
```

These identifiers preserve the date-based origin of the original notes.  The visible chapter title gives the mathematical topic, while the note label acts as an archival tag.  This makes it possible to keep the historical structure of the notes without forcing the reader to treat the book as a strict chronological diary.

## Repository layout

```text
inm.tex                 Main TeX entry point
inm.pdf                 Generated PDF, intentionally kept in the repository
.latexmkrc              latexmk build configuration
README.md               Project description
.gitignore              Ignore rules for generated auxiliary files

tex/
  preamble.tex          Main package and document setup
  macros.tex            Shared mathematical macros
  note-style.tex        Note/chapter styling and custom boxes
  Qcircuit.tex          Local circuit diagram support
  frontmatter/          Epigraph, preface, and other front matter
  volumes/              Part-level organization files
  notes/                Individual dated note chapters

figures/                Figures used in the notes
cover-art.png           Cover artwork
images.bib              Local bibliography resource used by biblatex
volumes-index.tex       Includes all volume files
notes-index.tex         Auxiliary index of note sources
```

## Building

The project is configured for XeLaTeX through `latexmk`.

A standard build command is:

```powershell
latexmk -interaction=nonstopmode -halt-on-error
```

A forced rebuild can be run with:

```powershell
latexmk -g -interaction=nonstopmode -halt-on-error
```

The project uses `biblatex`/`biber`, `minitoc`, and custom style files.  On Windows with MiKTeX, `latexmk` requires Perl to be available in `PATH`.

Because the document is large, `.latexmkrc` includes additional XeLaTeX memory options for clean rebuilds.

## PDF policy

Unlike many TeX repositories, this repository intentionally tracks the generated PDF:

```text
inm.pdf
```

The PDF is included because the document is book-length, rebuilding may be inconvenient for casual readers, and the compiled file is the natural reading artifact.

Ordinary LaTeX auxiliary files are ignored by `.gitignore`.  Source files and `inm.pdf` are the important tracked artifacts.
