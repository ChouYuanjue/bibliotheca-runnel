from __future__ import annotations

import argparse
from pathlib import Path

import fitz


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate a vector SVG preview from the first page of a poster PDF.")
    parser.add_argument("pdf", type=Path, help="Input PDF poster")
    parser.add_argument("svg", type=Path, nargs="?", help="Output SVG path (defaults to the PDF path with .svg)")
    args = parser.parse_args()

    pdf_path = args.pdf.resolve()
    svg_path = (args.svg or pdf_path.with_suffix(".svg")).resolve()

    if not pdf_path.exists():
        raise SystemExit(f"PDF not found: {pdf_path}")

    document = fitz.open(pdf_path)
    if document.page_count < 1:
        raise SystemExit("PDF has no pages")

    svg = document.load_page(0).get_svg_image(text_as_path=False)
    svg_path.parent.mkdir(parents=True, exist_ok=True)
    svg_path.write_text(svg, encoding="utf-8")
    print(svg_path)


if __name__ == "__main__":
    main()
