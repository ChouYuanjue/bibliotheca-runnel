---
title: "Discussion and Reflection on MLP Teaching Routes: Regression vs. Classification Entry Points"
date: "2025-10-12"
---

## Overview

This fragment records a discussion between me and two senior scholars in the field of Deep Learning (DL) regarding the rationality of teaching routes for Multi-Layer Perceptron (MLP). The core topic revolves around whether it is appropriate to introduce MLP starting from regression or classification. I put forward the confusion encountered in the teaching preparation process: starting directly from regression to introduce activation functions and then jumping to MLP fails to enable students to effectively understand the core logic of neural networks, while starting from perceptrons is difficult to explain the necessity of activation functions in an essential way. The two seniors shared their professional insights, pointing out that the core of neural networks is classification, and it is more reasonable to directly take classification as the entry point for teaching, and also explained the key reasons for introducing activation functions. Through this in-depth discussion, I gained a more systematic and in-depth understanding of the teaching logic of DL foundational knowledge.

## Transcript of the Discussion

*Note: "Scholar A" is an Associate Professor in the DL field with a Ph.D. from Tsinghua University (THU); "Scholar B" is a Ph.D. from Peking University (PKU). Both prefer not to disclose their real names, so their original nicknames are replaced. "Runnel" is me, an undergraduate student consulting seniors.*

- Runnel: Moreover, jumping directly to classification networks like MLP in the first class is indeed a bit fast.

- Runnel: He wants to show the necessity of activation functions through regression examples.

- Runnel: But jumping directly from regression to MLP, the students listening to the class actually can't understand what the neural network is doing.

- Scholar B: That's right, talk about pure PE next time.

- Scholar B: Now I get it.

- Runnel: Starting from perceptrons, it's hard to explain why an activation function is necessary instead of a linear function. Just saying that this will make multi-layer neural networks ineffective is not essential enough.

- Scholar B: Exactly.

- Scholar A: @Runnel Actually, most people who teach DL do this.

- Scholar A: No need to mention senior brothers.

- Runnel: In short, we discussed for a long time and didn't find a teaching method that combines the two ideas.

- Scholar A: Top experts do the same.

- Scholar A: First, they say that the XOR problem is difficult to solve.

- Scholar A: Then introduce [the method] to solve the XOR problem.

- Scholar A: Then talk about activation functions (suspected input error in the original text).

- Scholar A: We shouldn't start from regression at all.

- Runnel (18:33): Starting from regression is conducive to intuitively understanding a "fitting" process. Using linear functions cannot achieve this fitting, so non-linear ones are necessary.

- Runnel: That's the reason why he chose to start from regression.

- Runnel: But the effect today was not good.

- Scholar A: (Sent a section of literature content about the development of statistics, perceptrons, MLP, SVM, etc.): "With the development of communication technology and chip technology, the status of the computer vision field in the entire scientific research field has been continuously improved. Traditional support vector machines (SVM) based on SVM have made slow progress in processing image data. However, in 2012, AlexNet achieved excellent results in the ImageNet Large-Scale Visual Recognition Challenge. At this time, more data and stronger chip performance made training neural networks no longer a difficult problem. With the substantial growth of training data sets, the performance of neural networks has been greatly improved. In contrast, the performance of SVM has not been significantly improved. Its good performance in more complex problems has made neural networks continuously applied in various scenarios and regarded as the only route to AGI. However, the interpretability problem of neural networks is a dark cloud lingering over the building of machine learning. For this reason, many scholars have begun to explore the interpretability of neural networks from different angles, intending to break this deadlock to better handle practical problems."

- Scholar A: In fact, we shouldn't start from regression at all.

- Scholar A: Instead, start from classification.

- Scholar A: You can adopt my teaching route.

- Scholar A: I revised the teaching method for X Yang before.

- Runnel: Our ultimate goal is indeed to explain MLP clearly.

- Scholar A: The core of neural networks is classification.

- Scholar A: Regression and prediction seem almost the same as classification.

- Scholar A: They only differ by a softmax.

- Runnel: I think starting from classification, including giving examples, is indeed more convenient.

- Scholar A: But it's hard for you to explain why MLP and dropout are needed starting from regression.

- Scholar A: Back in 2016.

- Runnel: We initially wanted to naturally transition from regression to classification.

- Scholar A: A group of people specially asked me to revise their papers.

- Scholar A: Let me revise the regularization.

- Scholar A: Not papers.

- Runnel: Treat classification as a "problem of multiple regressions."

- Scholar A: They are textbooks.

- Scholar A: I think for early-stage students.

- Scholar A: We shouldn't directly talk about classification and regression.

- Scholar A: Or rather, we shouldn't think they are integrated.

- Runnel: Separate first, then integrate?

- Scholar A: When you teach MLP normally, you don't need to touch regression at all.

- Scholar A: The definition of regression itself gives a functional relationship, and then fits the parameters.

- Scholar A: MLP itself is not a writable functional relationship.

- Runnel: Yes, that's the reason why a natural transition is impossible.

- Scholar A: So we should directly talk about classification.

- Runnel: I think a common problem in understanding neural networks is "why don't we directly use weighting instead of activation functions."

- Runnel: Our idea is to explain this problem clearly through regression.

- Scholar A: @Runnel How can you explain it clearly like this.

- Scholar A: I even think people who teach this way don't understand why activation functions are introduced themselves.

- Scholar A: Let's get back to the topic.

- Scholar A: That is, if you want to explain why activation functions are introduced.

- Scholar A: There are two main points.

- Scholar A: The first point is: Activation functions can solve the XOR problem.

- Scholar A: The second point is: Later, through the Universal Approximation Theorem, it was found that S-type functions are the necessary and sufficient condition for the Universal Approximation Theorem.

- Scholar A: If you want to talk about the second point, you need to present the proof process.

- Runnel: @Scholar A We want to intuitively illustrate this situation through regression examples ().

- Scholar A: Then we can only go back to the first point.

- Scholar A: It's impossible.

- Scholar A: How can you describe the S-type function with regression.

- Scholar A: My evaluation is that it's very unreasonable.

- Runnel: @Scholar A We show this approximation process through regression examples.

- Runnel: It can be found that linear functions cannot achieve the same effect.

- Scholar A: Then why don't I use quadratic functions.

- Scholar A: Why don't I use power functions.

- Scholar A: In terms of teaching.

- Runnel: That makes sense.

- Scholar A: I have taught many basic courses dozens of times.

- Scholar A: So if you want to explain it clearly, you have to follow my train of thought.

## Personal Reflection

Through this discussion with the two seniors, I have thoroughly rethought the teaching logic of MLP and the introduction of activation functions, and corrected many one-sided understandings I had before. The core of the discussion lies in the choice of the entry point for teaching—regression or classification—and the essential explanation of the necessity of activation functions. Below, I will sort out and reflect on the key contents of the discussion in combination with relevant theoretical knowledge and mathematical formulas.

### 1. The Inappropriateness of Taking Regression as the Entry Point for MLP Teaching

Previously, I agreed with the idea of "transitioning from regression to classification" because regression can intuitively show the "fitting" process. For example, in univariate linear regression, we try to find a linear function \( y = wx + b \) (where \( w \) is the weight and \( b \) is the bias) to minimize the loss function (such as the mean square error \( L = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2 \), where \( y_i \) is the true value and \( \hat{y}_i \) is the predicted value). If the data has a non-linear distribution, linear regression cannot achieve effective fitting, so it is thought that this can naturally lead to the need for non-linear activation functions and further introduce MLP. However, the seniors pointed out the core flaw of this logic: MLP itself is not a "writable functional relationship," while regression is inherently based on a given functional form to fit parameters. This fundamental difference makes it impossible to naturally transition from regression to MLP.

Specifically, regression problems have clear target output forms. For example, linear regression assumes a linear relationship between input and output, and polynomial regression extends it to a polynomial form \( y = w_nx^n + ... + w_1x + b \). Even if non-linear regression is used, the functional form is predefined. However, MLP is a universal approximator whose output form is determined by the network structure (number of layers, number of neurons in each layer) and the parameters (weights and biases) learned from data, and cannot be expressed as a simple explicit function. If we start from regression, it is difficult to explain why we need to use a complex structure like MLP instead of directly using higher-order polynomial functions (such as quadratic functions \( y = ax^2 + bx + c \) or power functions \( y = ax^k \)) to solve non-linear fitting problems. This is exactly the key question raised by Scholar A, which made me realize that the teaching route starting from regression will not only fail to help students understand MLP but also confuse the essence of regression and neural networks.

In addition, the seniors emphasized that "the core of neural networks is classification." Although regression and classification seem similar (and can be converted through softmax), they have essentially different objectives: regression aims to predict continuous values, while classification aims to predict discrete categories. For early-stage students, confusing the two or trying to integrate them at the beginning will increase the difficulty of understanding. It is more reasonable to first teach classification as the core of neural networks, and then introduce regression as another task scenario after students have a clear understanding of the working mechanism of neural networks. This "separate first, then integrate" teaching logic is more in line with the cognitive law of beginners.

### 2. The Essential Explanation of the Necessity of Activation Functions

A key confusion in the discussion is: How to explain the necessity of activation functions to students. Previously, I thought that regression examples could be used to show that linear functions cannot fit non-linear data, thus highlighting the need for non-linear activation functions. But Scholar A pointed out that this explanation is not essential, and even people who use this explanation may not have a deep understanding of activation functions themselves.

According to Scholar A, the necessity of activation functions can be explained from two essential points, which are supported by strict theoretical foundations:

The first point is that activation functions solve the XOR problem that perceptrons cannot solve. A single-layer perceptron is a linear classifier, whose decision boundary is a linear hyperplane. For the XOR problem (the input is (0,0) output 0, (0,1) output 1, (1,0) output 1, (1,1) output 0), it is impossible to find a linear hyperplane to separate the two categories. Mathematically, the XOR problem cannot be expressed as a linear combination of inputs. Assuming the input is \( x_1, x_2 \), the output of the perceptron is \( y = \text{sign}(w_1x_1 + w_2x_2 + b) \), where \( \text{sign} \) is the sign function. For the XOR problem, there is no such \( w_1, w_2, b \) that satisfies all input-output pairs. After introducing non-linear activation functions (such as sigmoid, ReLU), multi-layer perceptrons can form non-linear decision boundaries, thereby solving the XOR problem. This is a concrete and intuitive example to prove the necessity of activation functions, and it is also the classic teaching route adopted by top experts.

The second point is based on the Universal Approximation Theorem. The theorem states that a feedforward neural network with a single hidden layer containing a finite number of neurons can approximate any continuous function on a compact subset of \( \mathbb{R}^n \) to any desired precision, provided that the activation function is non-constant, bounded, and continuous (the S-type function represented by sigmoid is a typical example that satisfies the conditions). Mathematically, for any continuous function \( f: K \to \mathbb{R} \) (where \( K \subset \mathbb{R}^n \) is compact) and any \( \epsilon > 0 \), there exists a positive integer \( m \), weights \( w_{ij}, v_j \), and biases \( b_j, c \) such that the output of the MLP \( \hat{f}(x) = c + \sum_{j=1}^{m}v_j\sigma(w_{ij}x_i + b_j) \) satisfies \( \sup_{x \in K} |f(x) - \hat{f}(x)| < \epsilon \), where \( \sigma \) is the S-type activation function. This theorem reveals the theoretical basis for the powerful fitting ability of neural networks, and also explains the necessity of choosing S-type activation functions—they are the necessary and sufficient conditions for the Universal Approximation Theorem to hold. If you want to explain this point to students, you need to introduce the proof process of the theorem, which requires students to have a certain foundation in mathematical analysis, so it is more suitable for advanced teaching.

Comparing the two explanation methods, it can be found that using the XOR problem to explain the necessity of activation functions is more intuitive and suitable for beginners, while the Universal Approximation Theorem provides a more in-depth theoretical explanation. The previous idea of using regression examples to explain is flawed because regression focuses on fitting predefined functional forms, while the core of activation functions is to enable neural networks to have non-linear expression capabilities to solve problems that linear models cannot solve (such as XOR) and approximate arbitrary continuous functions. Using regression to explain activation functions confuses the problem scenarios and theoretical foundations, making it difficult for students to grasp the essence.

### 3. Insights into DL Teaching

This discussion also made me gain a deeper understanding of DL teaching. First, the design of the teaching route should follow the cognitive law of students. For basic concepts (such as MLP, activation functions), we should choose intuitive and concrete entry points (such as the XOR problem) to help students establish a preliminary understanding, and then gradually deepen to theoretical foundations (such as the Universal Approximation Theorem). We should not prematurely integrate complex concepts (such as regression and classification), otherwise, it will increase the cognitive burden of students.

Second, teaching should focus on the essence of concepts. When explaining activation functions, we should not only say that "linear functions make multi-layer neural networks ineffective" but also explain why linear functions are ineffective (cannot solve non-linear problems such as XOR) and what essential role activation functions play (providing non-linear expression capabilities, supporting the Universal Approximation Theorem). Only in this way can students truly understand the necessity of concepts, rather than memorizing conclusions by rote.

Finally, the choice of teaching examples is crucial. Examples should be closely related to the core of the concept. For activation functions, the XOR problem is a more appropriate example than regression examples because it directly reflects the limitation of linear models and the value of non-linear activation functions. For MLP teaching, starting from classification examples (such as handwritten digit recognition) can make it easier for students to understand the application scenarios and working logic of neural networks.

In summary, this discussion has corrected my one-sided understanding of MLP teaching routes and the explanation of activation functions. In future teaching preparation, I will adopt the route of starting from classification, take the XOR problem as the entry point to explain the necessity of activation functions, and gradually introduce the theoretical basis such as the Universal Approximation Theorem, so as to help students establish a systematic and in-depth understanding of DL foundational knowledge.