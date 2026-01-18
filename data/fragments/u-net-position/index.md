---
title: "Implementation and Technical Exploration of U-Net-SE with Positional Offset"
date: "2025-10-10"
---

## Overview

This project aims to realize Google Emoji Kitchen-style emoji fusion through large models, capable of combining two different emojis into a new, creative emoji image. This fragment documents my exploration process of modifying U-Net and adding positional offset capabilities to solve the spatial constraint problem in emoji fusion. Although many seniors regarded this attempt as foolish at that time, I now reflect and believe it was not entirely worthless. My core focus was on how to enable the model to accurately control the positional and size relationships of emoji elements in a small-sample scenario. Eventually, the project shifted to an engineering implementation combining LoRA fine-tuning and Diffusion Model, which will not be the focus of this fragment.

Project Repository: https://github.com/ChouYuanjue/AI_Emoji_Kitchen_Lab

---

## I. Core Motivation: Technical Entry Point Anchored on Spatial Priors

When I first attempted to reproduce emoji fusion, I ran several rounds of experiments with the original U-Net. The result was clear: texture fusion met the requirements, but problems such as element misalignment and proportion imbalance occurred frequently—for example, a flame that should have been on top of the head moved to the side, or sunglasses were too large and covered half of the face. After carefully analyzing samples from Google Emoji Kitchen, I discovered a strong pattern in such fusions: the spatial relationships of specific elements are fixed. Decorative emojis must fit the contour of the main subject, and their proportions also fall within a fixed range. This spatial constraint is the key to generating qualified results, rather than texture details.

At that time, I only had a rough understanding of the underlying principles of U-Net and did not get bogged down in classical paradigms, focusing solely on the pain point that "the model cannot learn fixed spatial relationships with small samples." My thinking did not reach maturity in one step but followed a clear evolutionary path: I first experimented with the original U-Net, which exposed the spatial misalignment problem. Then I modified it to create the basic U-Net-SE version—its core was adding a lightweight attention module to enhance the spatial correlation of feature channels, which alleviated misalignment to a certain extent but still did not meet the requirements. Later, I further iterated by supplementing pixel-level positional encoding and other modules on the basis of U-Net-SE, forming the final "U-Net-SE with positional offset." The core logic was to gradually complete the spatial constraint capability: first, use the SE module to strengthen channel-level spatial correlation, then use positional encoding and offset modules to achieve precise position and proportion control, and finally form a complete idea of "align first, then fuse."

## II. Core Implementation: Thinking and Landing of U-Net-SE with Positional Offset

Based on the evolutionary logic of "U-Net → U-Net-SE → U-Net-SE with positional offset," my modification principle was clear: do not disassemble the original Encoder-Decoder framework of U-Net. The basic U-Net-SE version had already verified the adaptability of the framework, and subsequent iterations only supplemented spatial alignment modules on top of it. All newly added modules adopted a lightweight approach: the basic U-Net-SE version solved the channel-level spatial correlation problem, while the subsequently added positional encoding and offset modules focused on "precise position and proportion control" to fill the final gap. No redundant designs were made; each step was iterated around problems exposed in the early stage, and details were continuously adjusted based on experimental feedback. The following is the complete implementation idea and practical details.

### 2.1 Architecture Foundation: Adaptation and Fine-Tuning of Classical U-Net

The core of the symmetric U-Net was directly adopted, with minor adaptations for the 6-channel scenario of dual-emoji input to avoid wasting time building the architecture from scratch:

- Encoder Side: 4 downsampling layers were retained, each consisting of 3×3 convolution (Conv2d) + Batch Normalization (BN) + ReLU. A 3×3 convolution was deliberately chosen here because it can capture richer local textures than 1×1 convolution, making it suitable for emoji detail restoration. Followed by 2×2 Max Pooling for downsampling, the number of feature channels starts from 6 (input) and doubles with each downsampling, eventually reaching 1024 channels to ensure sufficient extraction of multi-scale features;

- Decoder Side: 4 upsampling layers were implemented using 2×2 transposed convolution. After each upsampling, channel concatenation (Concatenate) was performed with the feature map of the same scale from the Encoder. After concatenation, two sets of 3×3 convolution + BN + ReLU were used for fusion. Two sets of convolutions were adopted because dual-emoji feature fusion requires stronger feature integration capability, and a single set of convolutions tends to result in rigid fusion. The number of channels gradually decreases from 1024 back to 6 to ensure the feature dimension matches the input;

- Skip Connection: The original logic was fully retained, but its effect was specially verified—removing it would blur emoji edges, while retaining it can accurately transmit fine-grained features such as edges and sharp corners, which is crucial for regular graphics like emojis;

- Output Layer: A 1×1 convolution was used to compress the 6-channel features into a 3-channel RGB image. Tanh was selected as the activation function instead of Sigmoid because the output range of Tanh is [-1,1], which is more consistent with the pixel distribution after image normalization and can reduce color cast in generated images.

### 2.2 Core Modification 1: Pixel-Level Absolute Positional Encoding

This was the first modification I implemented, aiming to solve the translational invariance of standard CNNs—CNNs do not distinguish pixel positions when extracting features, making the model unaware of "which corner of the image this feature point is in" and thus unable to accurately control emoji placement. My idea was to add a "coordinate label" to each pixel, making positional information a learnable and quantifiable feature to lay the foundation for subsequent offset and scaling.

#### 2.2.1 Encoding Generation Logic

For the input feature map $X \in \mathbb{R}^{B\times C\times H\times W}$ (B = batch size, C = number of channels, H/W = height/width of the feature map), a dual-dimensional positional tensor was designed to ensure strict alignment with the feature map size and avoid dimension mismatch issues:

- $Pos_x$ Encoding (Horizontal Direction): Normalize the width dimension to the [0,1] interval. The horizontal coordinate value of each pixel is calculated as $Pos_x[:,0,i,j] = \frac{j}{W-1}$. Direct pixel values were not used for encoding because the pixel ranges of feature maps of different sizes (e.g., after downsampling) are different. Normalization allows positional encoding to adapt to the feature scales of the entire network and avoids the dilution of positional information in small-sized feature maps;

- $Pos_y$ Encoding (Vertical Direction): Similarly, after normalizing the height dimension, the vertical coordinate of each pixel is $Pos_y[:,0,i,j] = \frac{i}{H-1}$, ensuring the unified cross-scale of vertical positional information;

- Encoding Concatenation: Concatenate $Pos_x$ and $Pos_y$ along the channel dimension to obtain a 2-channel positional tensor $Pos \in \mathbb{R}^{B\times 2\times H\times W}$. 2 channels were chosen because only horizontal and vertical positional information is needed; more channels would only increase computational complexity without improving performance, which was verified through 3 experiments (a 4-channel encoding was attempted, doubling the number of parameters with no performance gain).

#### 2.2.2 Encoding Embedding and Feature Modulation

Initially, I directly concatenated positional encoding with image features as input, but found that positional information was disconnected from image features, and the model still could not associate "features" with "positions." Later, I adjusted to a "convolutional encoding + pixel-wise multiplication" method to deeply integrate positional information into image features. The specific steps are as follows:

1. Lightweight Convolutional Encoding: Feed the 2-channel $Pos$ into a 3×3 convolution layer to convert the number of channels from 2 to C (consistent with image features). The number of convolution kernels strictly corresponds to C to ensure the output positional weight map has the same dimension as the image features. Followed by BN, ReLU activation, and Sigmoid activation in sequence to obtain the positional weight map $Pos_{weight} \in \mathbb{R}^{B\times C\times H\times W}$. Sigmoid was added to constrain the weight values within [0,1], avoiding excessive or insufficient weights interfering with the image features themselves;

2. Feature Modulation: Fuse the image features $X$ with the positional weight map $Pos_{weight}$ through pixel-wise multiplication, i.e., $X_{encode} = X \cdot Pos_{weight}$. This method allows the feature value of each pixel to be multiplied by its corresponding positional weight, achieving "strong binding of feature values and positions." For example, the pixel features in the upper left corner of the image are modulated by the corresponding positional weight in the upper left corner, enabling the model to clearly identify the positional attribute of the feature;

3. Embedding Position: This module was deliberately placed before the Encoder input and after EmojiSeparator processing. Because the features separated by EmojiSeparator are purer, injecting positional information at this point allows spatial constraints to take effect from the source of feature extraction, achieving better results than embedding in the middle of the Encoder (experimental verification: embedding in the middle dilutes positional information in the first two downsampling layers, reducing positional alignment accuracy by approximately 15%).

### 2.3 Core Modification 2: Center-Aware Scaling and Position Offset Module (CenterAwareScaleModule)

This is the core module for implementing the "align first, then fuse" intuition and took the longest time to debug. My core idea was to let the model first adjust the positions and sizes of the two emojis correctly before entering U-Net for texture fusion, which is equivalent to adding a "preliminary layout" step to the model. This avoids the model being caught between "positioning" and "texture rendering" and failing at both. This module is embedded between the input layer and the Encoder, running independently without interfering with the feature extraction logic of U-Net itself.

#### 2.3.1 Module Structure and Parameter Prediction

I did not want to manually set offsets and scaling ratios, as this would result in poor versatility. Therefore, a lightweight prediction branch was designed to allow the model to learn parameters by itself based on the features of the input emojis, with all parameters optimized through gradient descent without any manual intervention:

- Feature Compression: Perform Adaptive Average Pooling on the two emoji features output by EmojiSeparator (each with C channels) to compress each emoji's feature map into a 1×1×C vector. Adaptive Average Pooling was selected because it can adapt to feature maps of any size without manually adjusting the pooling kernel size, and can retain the global features of each emoji to ensure the predicted parameters fit the overall shape of the emojis;

- Parameter Prediction: Concatenate the two 1×1×C vectors and feed them into an MLP structure composed of two 1×1 convolution layers. The first convolution layer compresses the number of channels to C/4 to reduce computational complexity, and the second convolution layer outputs 4 core parameters. Activation functions were selected specifically: scaling factors ($scale_h, scale_w$) were activated by Sigmoid and then multiplied by 2 to constrain the range to (0,2], avoiding excessive scaling (values less than 1 for reduction, greater than 1 for enlargement, consistent with the conventional proportions of emoji fusion); offsets ($offset_y, offset_x$) were activated by Tanh and then multiplied by 0.2 to constrain the range to [-0.2,0.2]. This range was calculated based on emoji size—for 256×256 size, the maximum offset is 51 pixels, which can just cover regular position adjustment needs without causing elements to move out of the frame;

- Parameter Mapping: The normalized proportion values of offsets were converted to pixel values using the formula $pixel\_offset = offset \times H/W$ to avoid insufficient offset in small-sized feature maps and excessive offset in large-sized feature maps.

#### 2.3.2 Geometric Transformation and Training Logic

Bilinear interpolation and symmetric padding were used to achieve distortion-free transformation, and a phased training strategy was designed to ensure alignment accuracy:

1. Transformation Execution: First, determine the main subject among the two emojis through EmojiCenterDetector. The main subject maintains its central position and original size, while the non-main subject performs geometric transformation based on the predicted parameters using bilinear interpolation for scaling and symmetric padding for offset. Bilinear interpolation was chosen over nearest-neighbor interpolation for smoother results without jagged edges, fitting the rounded shape of emojis. Symmetric padding (with a padding value of 0, i.e., black) was used for offset. Since the emoji background is inherently transparent, padding does not affect subsequent fusion effects and avoids element loss after offset;

2. Phased Training: This was a deliberately designed training strategy, which was verified through multiple experiments to be much more effective than end-to-end training. Phase 1: Freeze all weights of the U-Net main body, only unfreeze the parameters of CenterAwareScaleModule, and use only MSE (Mean Squared Error) as the loss function to compare the layout of the transformed emojis with the pixel similarity of Google's original images. The goal is to make the model focus solely on adjusting positions and sizes without being interfered by texture fusion. When the similarity converges to a threshold of 0.92, enter Phase 2: Unfreeze all network weights of U-Net, switch the loss function to MSE + Perceptual Loss, and optimize both spatial alignment and texture fusion simultaneously. The threshold of 0.92 was chosen because below this value, spatial alignment is not precise enough, leading to misalignment in subsequent texture fusion; above this value, the gain from further optimizing spatial parameters is minimal but increases training time.

### 2.4 Core Modification 3: Spatial-Enhanced Attention Module (PositionalAttention-SE)

It is important to clarify: the basic U-Net-SE version already has a built-in basic SE attention module to enhance channel-level spatial correlation, which alleviates partial misalignment problems but cannot solve fine-grained alignment difficulties. Therefore, I added this spatial-enhanced attention module on the basis of U-Net-SE, essentially upgrading and supplementing the original SE module. After alignment by CenterAwareScaleModule, the overall position is correct, but there is still slight fine-grained misalignment (e.g., loose edge fitting between emojis). Later analysis revealed that positional information is slightly lost when the Decoder upsamples to restore resolution, especially for medium and high-resolution feature maps (Up3 and Up4 layers), which are crucial for fine-grained position restoration. Therefore, this module was embedded in these two layers to form a dual-layer spatial constraint with the newly added pixel-level positional encoding, further enhancing fine-grained position accuracy on the basis of channel correlation from the original SE module.

#### 2.4.1 Core Calculation Process

1. Input Fusion: First perform channel concatenation of the upsampled features from the Decoder and the skip-connected features from the Encoder. Skip-connected features supplement fine-grained information, while upsampled features provide global structure. After fusion, add the positional tensor $Pos$ to ensure positional information can function in combination with multi-scale features;

2. Dual Weight Generation: Design channel weights and spatial weights to form joint attention, avoiding the limitations of a single weight. Channel weights are generated through "Global Average Pooling + 1×1 convolution" to highlight feature channels important for positional alignment and suppress irrelevant channels. Spatial weights are generated by enhancing the positional tensor $Pos$ through 3×3 convolution to further strengthen the representational capability of positional information and prevent it from being overshadowed by feature information;

3. Joint Attention: Multiply channel weights and spatial weights pixel-wise to obtain a "position-channel joint attention map." Here, the weights of non-central offset regions are deliberately enhanced, while those of the main subject region are suppressed. Because the position of the main subject is already fixed, the focus is on adjusting the fine-grained positions of the non-main subject to ensure it fits closely to the contour of the main subject;

4. Feature Modulation: Use the joint attention map to perform pixel-wise weighting on the concatenated features, guiding the model to first fine-tune the fine-grained positions of the non-main subject at the feature level before optimizing texture fusion. This effectively solves the problem of loose edge fitting.

#### 2.4.2 Module Characteristics

I strictly controlled the number of parameters of this module to avoid excessive burden on the network: it only uses 1 3×3 convolution layer and 2 1×1 convolution layers, increasing the number of parameters by less than 5% compared to the original U-Net. The inference speed is basically the same as that of the original U-Net (inferring a 256×256 image on a GPU takes only 2ms longer). Moreover, the module only takes effect on the Up3 and Up4 layers of the Decoder—these two layers are medium and high-resolution feature maps, which have the greatest impact on positional details. Embedding it in the Up1 and Up2 layers (low resolution) would only increase redundant computation, which is the optimal solution verified through experiments.

### 2.5 Auxiliary Module: EmojiSeparator Feature Separation and Alignment Layer

This module was added after I encountered problems. Initially, I directly concatenated two emojis into a 6-channel feature and input it into U-Net, but found that the model could not distinguish between the features of the two emojis, often mixing the features of the main subject and non-main subject, leading to the failure of position learning—for example, misjudging the texture features of the main subject as those of the non-main subject, resulting in position offset errors. Therefore, I designed this auxiliary module, whose core is to process the features of the two emojis separately to avoid aliasing:

- Input Processing: Receive the 6-channel tensor concatenated from two emojis, split it into two independent 3-channel features (corresponding to $E_1$ and $E_2$ respectively) by channel to ensure independent feature flow for each emoji;

- Feature Separation: Use two completely independent "3×3 convolution + BN + ReLU" structures to extract features from the two 3-channel features respectively. The weights of the two convolution sets are not shared to avoid interference between the features of one emoji and the other, maximizing the retention of their respective texture and structural features. This allows the subsequent CenterAwareScaleModule to accurately distinguish between the main subject and non-main subject;

- Output Alignment: Concatenate the extracted two 3-channel features back into a 6-channel tensor and output it to CenterAwareScaleModule. The dimension remains unchanged after concatenation, enabling seamless connection with subsequent modules while ensuring the independence of the dual feature flows, thus solving the previous feature aliasing problem.

### 2.6 Complete Forward Propagation Pipeline

After connecting all modules in series, the entire process forms a complete closed loop, fully following the idea of "align first, then fuse, and enhance details." Each step has a clear function with no redundant links: $E_1, E_2$ (original dual-emoji input, 256×256×3) → EmojiSeparator splits and independently extracts features to avoid aliasing → EmojiCenterDetector determines the main subject and non-main subject → CenterAwareScaleModule predicts parameters, performs bilinear interpolation scaling and symmetric padding offset on the non-main subject to complete global spatial alignment → concatenates into a 6-channel feature map, injects and modulates pixel-level positional encoding → U-Net Encoder performs 4 downsampling layers to extract multi-scale features → Decoder Up1/Up2 layers perform basic upsampling, fuse skip-connected features to restore initial resolution → PositionalAttention-SE is embedded in Up3/Up4 layers to fine-tune fine-grained positions and strengthen spatial constraints → 1×1 convolution compresses 6-channel features into 3-channel → Tanh activation normalization outputs the final fused image.

## III. Technical Reflection and Trend Adaptation

### 3.1 Limitations of Technical Design

1. Significant Generalization Limitations: This architecture is tailored for emojis, relying on their regular geometric features and fixed spatial laws. When migrated to the fusion of complex natural images such as humans and scenes, spatial constraints become vague, and the positional alignment accuracy drops to approximately 45%, making it a typical task-specific design;

2. Training Still Relies on Experience: The 0.92 similarity threshold for phased training was debugged through 5 experiments with different thresholds (0.85, 0.88, 0.92, 0.95, 0.98). There is no adaptive adjustment mechanism, and it may need to be re-debugged when switching to a new dataset, lacking flexibility;

3. Clear Architectural Ceiling: Limited by the CNN architecture of U-Net, even with positional offset modifications, its ability to handle complex texture and light fusion is still inferior to that of Diffusion Models. For emoji samples with rich textures, U-Net-SE may produce blurred textures, while Diffusion Models can accurately restore them. This is an inherent bottleneck of the architecture itself, which cannot be broken through by module modifications;

4. Insufficient Scalability: It only supports dual-emoji fusion, and EmojiCenterDetector can only make binary decisions (main subject/non-main subject), unable to scale to multi-emoji scenarios. When multiple emojis are input simultaneously, position conflicts and proportion chaos occur.

### 3.2 Absorption of External Views and Cognitive Iteration

Some hold the view that "manually adding positional encoding is unnecessary." Instead of denying it, I objectively analyzed its applicable scenarios and absorbed it as a reference for subsequent idea iteration. The core logic of this view stems from Scaling Law—with sufficient computing power and massive data (above millions), large models can indeed capture spatial laws through implicit learning, making manually injected positional priors redundant and even potentially limiting the model's generalization ability.

This cognition directly promoted my subsequent shift to the LoRA+Diffusion+Prompt scheme: Diffusion Models, after training on massive data, inherently possess strong universal spatial perception capabilities. I no longer need to manually design position modules; instead, I only need to adapt to emoji styles through LoRA fine-tuning and describe spatial relationships with Prompts (this part can be realized through LLM-guided Prompt construction to achieve more imaginative compositions), enabling rapid emoji fusion with much higher efficiency than modifying U-Net. However, to me, this is closer to a "boring engineering."

### 3.3 Exploration Path Adapting to Scaling Law Trends

The shift from U-Net → U-Net-SE → U-Net-SE with positional offset to LoRA+Diffusion is not a denial of the former but a rational iteration adapting to industry trends. U-Net-SE and its subsequent positional offset upgrades have fully verified the spatial constraint logic of "channel correlation + precise position control," which is the core gain. The core value of Scaling Law lies in building a universal capability base through scaling, reducing the technical threshold for specific tasks, allowing researchers to focus more on task-specific adaptation instead of repeatedly designing modules for basic capabilities (such as spatial perception). However, this does not mean that specialized modifications have lost their significance—the "channel correlation + position constraint" technical logic accumulated in the evolution of the U-Net-SE series can provide important anchors for universal model adaptation.

Regarding the core idea of "spatial priors," I transformed it into the Prompt design logic of Diffusion Models—guiding LLMs to construct Prompts to describe spatial relationships. Essentially, this converts manually injected spatial priors into natural language-guided spatial priors, adapting to the paradigm of universal models. In the future, I may focus on the direction of "generalizing specialized knowledge": on the one hand, optimize the module design of U-Net-SE by adding adaptive threshold mechanisms and multi-subject decision logic to improve its scalability in multi-emoji scenarios; on the other hand, refine the effective spatial constraint logic verified in U-Net-SE into universal Prompt templates and LoRA fine-tuning strategies.