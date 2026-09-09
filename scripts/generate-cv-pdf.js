const fs = require('fs');
const path = require('path');
const { mdToPdf } = require('md-to-pdf');

(async () => {
  const cvPath = path.join(__dirname, '../data/cv.md');
  const outputPath = path.join(__dirname, '../public/cv.pdf');

  // Check if we need to regenerate
  if (fs.existsSync(outputPath)) {
    const cvStats = fs.statSync(cvPath);
    const pdfStats = fs.statSync(outputPath);

    if (cvStats.mtime <= pdfStats.mtime) {
      console.log('CV PDF is up to date. Skipping generation.');
      return;
    }
  }

  console.log(`Generating PDF from ${cvPath}...`);

  try {
    let mdContent = fs.readFileSync(cvPath, 'utf-8');

    // Add KaTeX support with auto-render
    // We inject the CSS and JS, and a script to trigger rendering with $...$ support
    const katexHeader = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        renderMathInElement(document.body, {
            delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false},
              {left: '\\\\(', right: '\\\\)', display: false},
              {left: '\\\\[', right: '\\\\]', display: true}
            ],
            throwOnError : false
        });
    });
</script>
`;

    // Prepend header to content
    mdContent = katexHeader + '\n\n' + mdContent;

    const pdf = await mdToPdf({ content: mdContent }, {
        stylesheet_encoding: 'utf-8',
        pdf_options: {
            format: 'A4',
            margin: '13mm',
            printBackground: true,
        },
        css: `
            body { font-family: "Times New Roman", "Songti SC", serif; font-size: 10.5px; line-height: 1.38; color: #222; }
            h1 { font-size: 24px; font-weight: 700; margin: 0 0 4px 0; color: #111; }
            h2 { font-size: 15px; font-weight: 700; margin: 13px 0 7px 0; border-bottom: 1px solid #d9d9d9; padding-bottom: 3px; color: #111; break-after: avoid; page-break-after: avoid; }
            h3 { font-size: 12px; font-weight: 700; margin: 8px 0 3px 0; color: #111; break-after: avoid; page-break-after: avoid; }
            p { margin: 0 0 5px 0; }
            a { color: #222; text-decoration: none; }
            ul { margin: 1px 0 5px 16px; padding: 0; }
            li { margin-bottom: 2px; }
            strong { font-weight: 700; }
            code { background-color: #f3f4f6; padding: 1px 3px; border-radius: 2px; font-family: monospace; }
            h2 + p, h3 + p { break-before: avoid; page-break-before: avoid; }
            /* KaTeX adjustments */
            .katex { font-size: 1em; }
        `
    });

    if (pdf) {
      fs.writeFileSync(outputPath, pdf.content);
      console.log(`CV PDF generated at ${outputPath}`);
    }
  } catch (err) {
    console.error('Error generating PDF:', err);
    process.exit(1);
  }
})();
