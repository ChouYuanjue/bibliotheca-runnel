const fs = require('fs');
const path = require('path');
const { mdToPdf } = require('md-to-pdf');

(async () => {
  const cvPath = path.join(__dirname, '../data/cv.md');
  const outputPath = path.join(__dirname, '../public/cv.pdf');

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
            margin: '20mm',
            printBackground: true,
        },
        css: `
            body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 12px; line-height: 1.6; color: #333; }
            h1 { font-size: 28px; font-weight: bold; margin-bottom: 5px; color: #000; }
            h2 { font-size: 18px; font-weight: bold; margin-top: 25px; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 5px; color: #000; }
            h3 { font-size: 14px; font-weight: bold; margin-top: 15px; margin-bottom: 5px; color: #000; }
            p { margin: 0 0 10px 0; }
            a { color: #2563eb; text-decoration: none; }
            ul { margin: 0 0 10px 20px; padding: 0; }
            li { margin-bottom: 5px; }
            code { background-color: #f3f4f6; padding: 2px 4px; border-radius: 4px; font-family: monospace; }
            /* KaTeX adjustments */
            .katex { font-size: 1.1em; }
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
