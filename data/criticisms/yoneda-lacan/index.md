---
title: "From Euclid to Yoneda, from Plato to Lacan — Signs, Structures, and the Unsayable"
date: "2023-03-23"
type: "LECTURE"
image: "/library/criticisms/yoneda-lacan/image.jpg"
description: "This lecture maps an intellectual journey from Euclid to Yoneda, where mathematical objects are defined by relational networks—captured in the Yoneda Lemma—and into Lacan, where the subject is trapped in a signifying chain unable to fully capture reality. It examines the paradox of symbolization: tools meant to simplify instead create new complexities, building bridges that are also walls—ultimately reflecting on the boundary between the articulated and the eternally unsayable."
---

[SLIDES FOR LECTURE](/library/criticisms/yoneda-lacan/slide.pptx)

## From Euclid to Yoneda, from Plato to Lacan  
— **Signs, Structures, and the Unsayable**

### Opening Remarks

Dear classmates, good afternoon.

Today, I would like to invite you on a journey of thought. The starting point of this journey is the ancient Greek geometer Euclid, and the destination is the 20th-century mathematician Nobuo Yoneda. Along the way, we will pass through Plato's cave and also visit Lacan's psychoanalytic clinic. This may sound like a rambling discourse across time and space, but running through it all is a single thread—**the sign**.

We live in a world surrounded by signs. Mathematical formulas, linguistic vocabulary, cultural customs, and even our self-awareness are all woven from signs. But how exactly do signs work? Do they help us understand the world, or do they obscure a deeper reality? Today, starting from one of the most abstract fields in mathematics—category theory—we will venture into this labyrinth of signs.

To help you follow this journey, I first need to lay down some foundational knowledge. We will spend some time carefully examining what category theory actually is, and what Lacan's theory truly says. Don't worry; I will explain using the most intuitive examples.

---

### Part I: From Diagrams to Categories — The Philosophy of Arrows

Let's begin with a simple mathematical image: the commutative diagram.

In mathematics, we often say $f \circ g = h$. This means, first apply $g$, then apply $f$, which equals directly applying $h$. If we draw $f$, $g$, $h$ as arrows, and sets as points, then this diagram is "commutative" — starting from the same point, no matter which path you take, you end up at the same destination.

For example, let $f(x)=x^2$, $g(x)=x+1$, then $f(g(x))=(x+1)^2$, and $h(x)=(x+1)^2$, so $f \circ g = h$, and the corresponding diagram commutes. Another example is from last week's mathematics competition involving complex conjugates; if drawn as a commutative diagram, it would look like this.

This language of arrows initially was just a graphical representation of functions. But mathematicians soon discovered: **arrows are more fundamental than objects**. What we care about is not what the points themselves are, but how they are connected. Consider a chemical reaction network, like the aluminum triangle — $\mathrm{Al}^{3+}$, $\mathrm{Al(OH)_3}$, $\mathrm{AlO_2^-}$. If one substance can transform into another by adding $\mathrm{OH^-}$, we draw an arrow. Thus, chemical transformation relationships also form a commutative diagram. Similarly, if you have a partially ordered set, like integers with $\leq$, that too is a network of arrows.

Thus, category theory was born. It consists of three basic elements:
- **Objects** (imaginable as sets, groups, topological spaces...)
- **Arrows** (relationships between objects, such as functions, homomorphisms, mappings)
- **Composition of arrows** (satisfying associativity, and each object has an identity arrow)

More precisely, a category $\mathcal{C}$ contains:
- Some objects $\text{Ob}(\mathcal{C})$
- For any two objects $A, B$, a collection of arrows $\text{Hom}_{\mathcal{C}}(A,B)$
- For any $A, B, C$, a composition operation $\circ: \text{Hom}_{\mathcal{C}}(B,C) \times \text{Hom}_{\mathcal{C}}(A,B) \to \text{Hom}_{\mathcal{C}}(A,C)$, satisfying associativity: $(h \circ g) \circ f = h \circ (g \circ f)$
- Each object $A$ has an identity arrow $1_A: A \to A$, satisfying $f \circ 1_A = f$, $1_A \circ g = g$

This definition may seem abstract, but its core insight is: **any mathematical structure can be characterized by a network of arrows**.

#### Example 1: The Category of Sets, $\mathbf{Set}$
- Objects: All sets
- Arrows: Functions between sets
- Composition: Composition of functions
- Identity arrows: Identity function $x \mapsto x$

#### Example 2: The Category of Posets, $\mathbf{Pos}$
- Objects: Partially ordered sets $(P,\leq)$
- Arrows: If $a \leq b$, then there exists a unique arrow $a \to b$ (essentially, arrows are order relations)
- Composition: If $a \leq b$ and $b \leq c$, then $a \leq c$, so arrows are composable
- Identity arrows: Reflexivity $a \leq a$

#### Example 3: The Category of Groups, $\mathbf{Grp}$
- Objects: Groups (sets with a group operation)
- Arrows: Group homomorphisms (maps preserving the operation)
- Composition: Composition of homomorphisms is again a homomorphism
- Identity arrows: Identity homomorphism

But more interestingly, **a group itself can be viewed as a category**. How? Let $G$ be a group. We can construct a category $\mathcal{C}$ with a single object: denote it as $*$. What are the arrows? We let each group element $g \in G$ correspond to an arrow $g: * \to *$. Composition of arrows is the group multiplication: $g \circ h = g \cdot h$. The identity arrow is the identity element $e$. Thus, the entire group structure is encoded in the composition of arrows. You see, under the language of category theory, the same concept can have multiple identities. This is the power of symbolization: **it allows us to see the commonality of a structure from different perspectives**.

So, category theory tells us: **Mathematical objects are not isolated; they are defined by the arrows between them**. This idea will lead us to the Yoneda Lemma.

---

### Part II: The Yoneda Lemma and "Yonedadaism"

Now, let's delve into one of category theory's most central theorems: the **Yoneda Lemma**.

The Yoneda Lemma sounds technical, but its philosophical implications are profound. Simply put, it says: **Any object is completely determined by all the arrows from it to other objects**. In other words, **what you are depends entirely on how you are viewed by other things**.

Let's be a bit more precise. In a category $\mathcal{C}$, fix an object $A$. We can consider all arrows starting from $A$, i.e., $A \to X$ (where $X$ ranges over all objects). These arrows form a structure called the "Hom functor out of $A$." The Yoneda Lemma tells us that the object $A$ and this Hom functor correspond one-to-one. That is, object $A$ is completely determined by the network of relationships it has with other objects. This strongly echoes philosophical relationism — the essence of a thing lies not in itself, but in its relations.

For example, in the category of sets, is a set $A$ determined by its functions to all sets? How many elements does $A$ have? This can be found by considering functions from a one-point set $\{*\}$ to $A$: each such function corresponds to an element in $A$. So the number of elements in $A$ is precisely the cardinality of $\text{Hom}_{\mathbf{Set}}(\{*\},A)$. Therefore, $A$ is indeed determined by its Hom-sets.

In the category of posets, an object $a$ is determined by all $x$ such that $a \leq x$ — this is essentially its set of upper bounds.

For this reason, category theory often induces a sense of vertigo. Those dense commutative diagrams, arrows flying everywhere, can easily overwhelm a beginner. Some jokingly call this state "**Yonedadaism**" — a kind of dizzying infatuation with abstract structures.

But it is precisely this abstraction that gives category theory its **universality**. Whether you study groups, topological spaces, or logical systems, category theory provides a unified language. Concepts like "product" and "coproduct" appear different in various fields, but in category theory, they have perfectly dual definitions. Symbolization allows us to see the deep isomorphisms between different branches of mathematics.

However, this abstraction comes at a cost: it moves further and further away from intuition, becoming increasingly difficult to articulate. And this, precisely, is our cue to turn to philosophy.

---

### Part III: Lacan's Symbolic World

Now, let's turn from Yoneda's commutative diagrams to Lacan's structural diagrams.

Jacques Lacan was a 20th-century French psychoanalyst who sought to reinterpret Freud using structuralist linguistics and mathematics (especially topology). His theories are notoriously obscure, but one core idea is: **the unconscious is structured like a language**.

In Lacanian psychoanalysis, there is a famous diagram (often called the "L-schema" or "R-schema"). In the bottom left, there is a barred $S$ — the **Subject** (Sujet). This bar indicates that the subject is forever incomplete, divided. Why? Because the moment one enters language, one is captured by the symbolic order. Language is public, while our inner experience is private; when we try to express ourselves using language, a part always remains untranslatable. Hence, the subject is marked by a fundamental lack, and desire can never be truly satisfied.

Extending from $S$ to the upper right is a "signifying chain." A signifier (signifiant) is a symbol that points to things. Every word, every sound in language is a signifier. They connect to each other, forming a network — the order of language. For example, the signifier "tree" is not equivalent to any specific, concrete tree; it merely evokes our concept of a tree. Moreover, the meaning of a signifier depends on its difference from other signifiers: "tree" is "tree" because it is not "wood," not "forest," not "root."

Lacan argues that all our expression relies on this signifying network. We want to express "love," but we must use the signifier "love." We want to describe pain, we must use the word "pain." But the sign itself is not the thing itself. It is merely a stand-in, pointing to something else.

Thus, a fundamental contradiction emerges: **We can only use signs to express that which can never be fully captured by signs**. The subject yearns for the real but is imprisoned in the symbolic cage.

#### Example from Lacanian Theory: The Mirror Stage

Lacan has a famous concept called the "mirror stage." Around 6-18 months, an infant first recognizes itself in a mirror. It sees a complete, coordinated image, while its actual bodily movements are still clumsy and uncoordinated. This mirror image becomes an idealized self — an "ideal-I." From then on, the individual identifies with this external image. This image is a sign, representing the self we aspire to be but can never fully become. Thus, the ego is from the outset a symbolic construct, a product of alienation.

#### Another Example: The Graph of Desire

Lacan also sketched a graph of desire, featuring a signifying chain emanating from the subject, pointing towards an forever-unattainable object — the *objet petit a* (object small a). This object is not a concrete item but the cause of desire, the forever missing thing. For instance, we think buying a new car will bring happiness, but soon after buying it, we crave an even newer one. The signifiers of desire constantly slide, never able to be fixed.

This reminds me of Plato's cave allegory: prisoners in the cave see only shadows on the wall, mistaking them for reality. Signs are those shadows; the real lies forever outside the cave.

So why does humanity gravitate towards symbolization? Why are mathematics, philosophy, and even daily life inseparable from signs?

---

### Part IV: The Paradox of Symbolization

The original intention of symbolization was **simplification**. Use "$+$" instead of "plus," use "$\forall$" instead of "for all," use "$S$" instead of "subject." Signs make expression clearer and communication more efficient.

But ironically, symbolization ultimately leads to **complexification**. The symbolic systems of mathematics become increasingly vast, the terminology of philosophy becomes increasingly obscure. We create symbols to simplify, only to create a new, even more difficult-to-understand world.

This is the paradox of symbolization: **It is both a bridge to understanding and a wall that obstructs it**.

Lacan himself is a perfect example. His writings are filled with topological diagrams, algebraic symbols, and neologisms, to the point where his own doctrine becomes a "signifying labyrinth." He claims that symbolic expression of the subject is always残缺 (incomplete/deficient), yet he himself uses the most complex symbols to articulate this very deficiency.

We all face a similar dilemma. When we try to express deep emotions with language, we often feel that "words are pale, signs are powerless." Some things seem inherently "ineffable."

---

### Part V: Language Development and the Threshold of Abstraction

Interestingly, this dilemma of symbolization can also be observed in the development of natural language.

In linguistics, languages can be classified into several types:
- **Agglutinative languages** (like Japanese): Grammatical relationships are expressed by concatenating different affixes. E.g., "食べたくなかった" = "eat" + "want" + "negation" + "past".
- **Inflectional (fusional) languages** (like Russian): Grammatical relations like case, number, gender are expressed through changes in word endings. E.g., nouns have six case forms.
- **Analytic (isolating) languages** (like Chinese): Rely on word order and function words; word forms remain largely unchanged. E.g., in "我吃过了" (I have eaten), time is indicated by "过了".

English is evolving from an inflectional towards a more analytic language. This evolution is often accompanied by an increase in the level of abstraction — grammatical rules become more implicit, expression relies more heavily on context.

For beginners, highly developed languages are often particularly difficult. Japanese honorifics (keigo) baffle foreigners, the six cases of Russian daunt learners, and Chinese tones and idioms leave students disoriented.

Similarly, category theory is recognized as one of the most challenging parts of the mathematical foundation, not because it involves complex calculations, but because it is **highly abstract and highly symbolized**. It requires the learner to abandon attachment to concrete objects and focus purely on relationships. It's like learning an entirely new language, requiring a restructuring of one's way of thinking.

So, when we encounter difficulty with category theory or Lacanian theory, it's normal. It's not that we aren't smart enough; it's that the sign itself is a beast that needs to be slowly tamed.

---

### Conclusion: On the Border of Signs

Today, we journeyed from Euclid's geometric diagrams to Yoneda's commutative diagrams; from Plato's world of Forms into Lacan's signifying chain. We discovered that symbolization is both a great achievement of human intellect and an eternal limitation of human expression.

Signs allow us to see structure, but also make us forget essence. They enable communication, yet also foster solitude.

Lacan said the subject is always outside the sign. This means that no matter how hard we try, a part of reality remains unsayable. But this does not mean we should abandon speech. On the contrary, it is precisely this "unsayable" that motivates us to continually create new signs, new languages, to approach that ever-unreachable horizon.

Just as mathematicians weave categories with arrows, poets weave images with words, and philosophers weave thoughts with concepts — we all stand on the border of signs, trying to touch the untouchable real.

Thank you all.