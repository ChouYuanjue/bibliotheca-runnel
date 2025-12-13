# AI Emoji Kitchen Lab

这是一个基于深度学习的表情符号（Emoji）融合项目，旨在通过大模型实现 Google Emoji Kitchen 风格的表情符号融合，能够将两个不同的 emoji 融合成一个全新的、富有创意的 emoji 图像。

**WARNING!!!**：本项目为大一小登的首次尝试，原始融合效果和训练策略尚不完善，属于长期探索项目。请勿直接用于生产环境。

**WARNING!!!**：由于作者发现现在的多模态模型（如GPT-5）已经在一定程度上可以实现稳定的融合效果，本项目可能不再维护。

---

## 项目概述

本项目目前包含两套训练与生成方案：

### 1. 传统 UNet/SEUNet 方案（原始版本）

- 使用 UNet、SEUNet 及带位置编码的 UNet 架构，学习 emoji 之间的融合规律。
- 支持完整的数据获取、预处理、模型训练、推理和演示流程。
- 适合快速实验和调试，结构清晰，易于理解和修改。

### 2. LoRA + Diffusion 方案（open-genmoji 训练方法）

- 新增基于 [open-genmoji](https://github.com/EvanZhouDev/open-genmoji) 的训练方法，结合 LoRA 微调和扩散模型（Diffusion Model）。
- 能够在更强大的生成模型基础上，针对 emoji kitchen 数据进行定制化训练，提升融合效果和创意性。
- 支持 LoRA 参数注入，训练效率高，适合大规模或高质量 emoji 生成任务。

- **自定义扩展：本项目对 open-genmoji 方案进行了改进，支持由两个或者多个 emoji 直接作为输入，生成融合图片。**
- 相关脚本和数据处理已适配多 emoji 输入，包括 `emoji_mapper.py`（emoji与描述映射）、`description_dataset.py`（融合图片描述生成）、`emoji_dataset.py`（数据集定义）等。
- 数据集文件如 `dataset/emoji_description_mapping.json`、`dataset/fusion_images/metadata.json` 支持多 emoji 组合描述。
- metaprompt 及 LoRA 训练流程已支持多 emoji 输入，具体可参考 `metaprompt/open-genmoji.md`。

---

## 项目结构

```
├── README.md
├── emoji_dataset.py
├── emoji_fusion_demo.py
├── get_emoji_kitchen.py
├── infer.py
├── losses.py
├── metrics.py
├── emoji_mapper.py           # emoji与描述映射脚本
├── description_dataset.py    # 生成融合图片描述脚本
├── models/
│   ├── blocks.py
│   ├── unet.py
│   ├── unet_se.py
│   ├── unet_positional.py
│   └── emoji_fusion_model/
├── prepare_dataset.py
├── render_emojis.py
├── requirements.txt
├── train_unet.py
├── lora/                # LoRA 相关配置与说明
│   ├── info.json
│   ├── LORA_TEMPLATE.md
│   └── README.md
├── metaprompt/          # open-genmoji 相关配置
│   ├── open-genmoji.json
│   └── open-genmoji.md
└── ...
```

---

## 安装依赖

```bash
pip install -r requirements.txt
```

---

## 使用指南

### 1. 数据集准备

下载 Emoji Kitchen 融合图像数据：

```bash
python get_emoji_kitchen.py
```

渲染原始 emoji 图像：

```bash
python render_emojis.py
```

生成 emoji 与描述的映射文件：

```bash
python emoji_mapper.py
```

根据融合图片生成描述文本：

```bash
python description_dataset.py
```

准备训练数据集：

```bash
python prepare_dataset.py
```

---

### 2. 训练与生成

#### 2.1 UNet/SEUNet 方案

训练模型：

```bash
python train_unet.py
```

推理融合：

```bash
python infer.py --emoji1 path/to/first_emoji.png --emoji2 path/to/second_emoji.png --ckpt outputs/unet/epoch_10.pt --out output.png
```

运行演示：

```bash
python emoji_fusion_demo.py
```

#### 2.2 LoRA + Diffusion 方案（open-genmoji）

1. 按照 `lora/README.md` 和 `metaprompt/open-genmoji.md` 配置 LoRA 微调参数和 Diffusion 训练流程。
2. 使用 open-genmoji 的训练脚本进行 LoRA 微调，具体流程可参考 [open-genmoji 官方文档](https://github.com/EvanZhouDev/open-genmoji)。
3. 训练完成后，可通过扩散模型进行高质量 emoji 融合生成。

**本项目已支持多个 emoji 作为输入进行融合训练和生成，相关 metaprompt 及数据处理均已适配。**

---

## 模型架构与技术细节

- **UNet/SEUNet**：经典 U 型结构，支持通道注意力（SE），可选位置编码。
- **LoRA+Diffusion**：基于扩散模型，支持 LoRA 微调，适合大规模高质量生成。
- **损失函数**：L1 + SSIM 组合（L1SSIMLoss）。
- **优化器**：AdamW，学习率 2e-4。
- **训练策略**：指数移动平均（EMA）。

---

## 注意事项

1. 建议使用 GPU 进行训练。
2. emoji 文件名采用 Unicode 编码。
3. 需在 `resources/` 目录下放置 `NotoColorEmoji-Regular.ttf` 字体文件。
4. LoRA+Diffusion 方案需参考 open-genmoji 相关配置和脚本。

---

## 未来工作

- 优化损失函数与训练策略
- 扩展更先进的生成模型
- 提升融合效果与创意性

---

## License

[MIT License](LICENSE)

---

如需英文版或更详细的 open-genmoji 训练流程，请参考 `lora/README.md` 和 `metaprompt/open-genmoji.md`。