<div align="center">

English | [简体中文](README_zh-CN.md)

<img src="assets/banner.jpg" width="640px"  alt="TEXQBGEN"/>  

</div>

# TeX Question Bank Generator (TeX-QB-Gen)

![GitHub License](https://img.shields.io/github/license/ChouYuanjue/TeX-QB-Gen)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/ChouYuanjue/TeX-QB-Gen)
![GitHub commit activity](https://img.shields.io/github/commit-activity/t/ChouYuanjue/TeX-QB-Gen)
![GitHub Tag](https://img.shields.io/github/v/tag/ChouYuanjue/TeX-QB-Gen)

> Generate question banks directly from textbooks.

Leverage OpenRouter's multimodal/language models and local OCR capabilities to extract math problems and solutions from images, web pages, or PDFs, and generate uniformly formatted TeX question banks. Each question generates an independent TeX file, summarized by `master.tex` for batch compilation.

## Background

This project was born out of the need to earn NJU labor education hours. When professors require you to organize question banks in TeX to earn these hours, why not adopt a faster solution?

> **Note**: All test files in the `tests/` directory are examples that can be successfully processed.

## Key Features

- **Multiple Input Channels**: Images, PDFs (automatically distinguish text-based/scanned), URLs; batch fetching from Math Stack Exchange / MathOverflow using APIs.
- **Intelligent Problem Splitting**: Text PDFs locate problem boundaries via keywords; scanned versions only call OCR or multimodal models on suspected problem pages.
- **Answer Strategy**: Retain original answers/solutions; for minimal responses like "obvious" or "evident," automatically call LLM to generate `Solution (by LLM)` with a "may be inaccurate" disclaimer.
- **Unified Output**: Each question generates a `.tex` file containing `Exercise`, `Answer`, `Solution`, and `Solution (by LLM)` with metadata annotations; `master.tex` is auto-generated with hierarchical structure based on input folder organization. Use `--generate-master` to create a master document from existing `.tex` files.
- **Caching and Retry**: OpenRouter requests are cached to disk, automatically handling rate limits and retries to reduce redundant calls.
- **Extensible Configuration**: Override models, cache, StackExchange API Key, Tesseract path, etc., via `.env`.

## Quick Start

### 1. Prepare the Environment

```powershell
python -m venv .venv
\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 2. Configure Keys

Copy `.env.example` to `.env` and fill in the following:

- `OPENROUTER_API_KEY`: API Key from [OpenRouter](https://openrouter.ai/).
- `STACKEXCHANGE_KEY` (optional): Enhance StackExchange API quota.
- `TESSERACT_CMD` (optional): Path to Tesseract executable on Windows.
- `TEXBANK_DEFAULT_LANGUAGE` (optional): Default output language, supports `auto` (retain original), `zh` (Chinese), `en` (English).
- `TEXBANK_OCR_ENGINE` (optional): OCR engine, supports `tesseract` (default) or `paddle` (suitable for Chinese).

### 3. Tesseract OCR (Local Backup)

- Windows: Install via [official package](https://github.com/UB-Mannheim/tesseract/wiki) or Chocolatey.
- After installation, add the installation directory to `PATH` or set `TESSERACT_CMD` in `.env`.

### 4. Run Command

```powershell
$env:PYTHONPATH = "src"
python -m texbank.cli --input examples\sample.pdf --out out
```

Command Parameters:

| Parameter       | Description |
|-----------------|-------------|
| `--input/-i`    | Supports multiple inputs; use `@file` to read a list. |
| `--out/-o`      | Output directory. |
| `--keyword/-k`  | StackExchange search keywords. |
| `--max-items/-m`| StackExchange question limit. |
| `--site/-s`     | `math` or `mathoverflow`. |
| `--generate-master` | Generate master.tex from existing .tex files in directory. |
| `--no-llm-solution` | Disable auto-generated solutions. |
| `--omit-answer-field` | Ask multimodal extraction to return only `exercise` and `solution`, omitting `answer`. |
| `--language/-l` | Output language (`auto`/`zh`/`en`), default `auto`. |
| `--paired-sequence` | Configure paired question/answer PDFs with label template and ranges (e.g. `{chapter}.{section}.{n}|chapter=1-5|section=1-3`). |
| `--paired-start` | Override the starting question index when iterating paired labels. |
| `--paired-max-gap` | Stop after this many consecutive missing labels for a prefix context. |
| `--paired-max-questions` | Limit total questions extracted per paired traversal. |
| `--paired-max-pages` | Maximum distinct pages fetched for a matched label (before auto-appending the next page). |
| `--paired-prefix-limit` | Limit generated values for prefix placeholders without explicit ranges. |
| `--paired-latest-only` | When multiple matches exist, use the last occurrence and the following page for extraction. |
| `--verbose/-v`  | Print detailed progress logs. |
| `--debug`       | Print debug-level logs (including stack traces). |

After execution, the `out/` directory will contain `.tex` files for each question and `master.tex`.

When the specified language differs from the original question language, the pipeline automatically calls LLM to translate the question, solution, and additional solutions. Metadata records whether translation occurred.

## Detailed Processing Flow

- **Smart Page Segmentation**: Text-based PDFs extract candidate blocks using keywords (Exercise/Problem/Question/题目/例题, etc.), then generate cross-page combinations (up to 3 groups) to ensure questions and answers are on the same screen.
- **Multimodal Priority Strategy**: Candidate pages are rendered as images and submitted in batches to multimodal models, with prompts guiding the model to return only matching questions. If requests fail, logs are recorded, and it automatically falls back to local OCR or raw text parsing.
- **Fallback for Scanned PDFs**: For suspected scanned PDFs, pages are selected based on scan probability, converted to images, and reused in the image processing flow, avoiding page-by-page OCR for the entire document.
- **Question Merging and Post-Processing**: Cross-page extraction results are deduplicated and concatenated. Missing answers trigger LLM to generate `Solution (by LLM)`. Language detection and translation ensure the final output adheres to `--language` or `TEXBANK_DEFAULT_LANGUAGE` settings.
- **Observability**: With `--verbose`/`--debug`, real-time details of each block's page group attempts, fallback reasons, translation status, etc., are available, making it easier to locate bottlenecks in long processing times or failed responses.

## Key Modules

- `texbank.config`: Centralized management of settings for models, cache, OpenRouter, StackExchange, etc.
- `texbank.llm_client`: OpenRouter wrapper supporting text/multimodal requests, structured JSON parsing, retries, and disk caching.
- `texbank.pdf_utils`: PDF text/scan detection, keyword segmentation, scanned page image extraction.
- `texbank.pipeline`: Unified pipeline for processing image/PDF/URL inputs and outputting `ProblemItem` lists.
- `texbank.texgen`: Renders `ProblemItem` into TeX files and generates `master.tex`.
- `texbank.stackexchange`: Calls StackExchange API to search and fetch complete questions and answers.

## Model Recommendations

- **Structured Extraction**: `google/gemini-2.5-flash-lite` (economical and sensitive to question structure).
- **Multimodal Understanding**: `google/gemini-2.5-flash-image-preview` (stable performance for images with formulas).
- **Solution Generation**: `deepseek/deepseek-chat` (cost-effective); switch to `meta-llama/llama-3.1-70b-instruct` for complex reasoning.
- **Supplementary Reasoning/Validation**: `deepseek/deepseek-r1` as a low-cost alternative.

For offline/local models, replace model names in `.env` and deploy HTTP proxies yourself.

## Run Tests

```powershell
$env:PYTHONPATH = "src"
pytest
```

Tests rely on a stubbed OpenRouter client to ensure basic logic correctness without real network calls.

## FAQ

- **429 Too Many Requests**: OpenRouter rate-limiting. Retry later or request a higher quota.
- **Tesseract Not Found**: Ensure `tesseract.exe` is in `PATH` after installation or set `TESSERACT_CMD`.
- **StackExchange Returns 502**: API occasionally fluctuates; retry or reduce request volume.
- **TeX Special Characters**: Escape `%` in comments before rendering; formulas remain unchanged.

## TO-DO LIST

- [x] Emit each problem to its own TeX file immediately after processing.
- [x] Fix issues with Chinese PDFs being processed as garbled text, preventing correct problem segmentation.
- [x] Generate a correct and aesthetically pleasing `master.tex` file, including table of contents, chapters, and even references.
- [x] Handle obvious error responses, such as returning multiple questions at once, incorrect JSON, or Markdown syntax in LLM-generated answers.
- [x] Test scanned PDFs.
- [x] Test cases where answers appear at the end of the book.
- [ ] Construct appropriate prompts for cases involving communative diagrams and test them.
- [ ] Improve and test batch fetching from MathStackExchange and URL-based solutions.
- [ ] Enhance the compatibility of processing solutions to accommodate a wider range of possible textbook formats.
- [x] Add asynchronous processing to improve speed.
- [x] Include local solutions suitable for Chinese OCR.
- [ ] Build better preprocessing schemes to reduce hallucinations from large models.
- [ ] More precise PDF question segmentation (based on layout analysis or deep learning).
- [ ] Test higher-accuracy multimodal models and automatically compare costs.
- [ ] Add a Web UI for visualized generation and management of question banks.
- [ ] Add automatic validation or symbolic computation checks for `Solution (by LLM)`.

Feel free to open issues and submit PRs.