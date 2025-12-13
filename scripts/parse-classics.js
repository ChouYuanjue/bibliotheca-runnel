const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const quotedPrintable = require('quoted-printable');
const OpenCC = require('opencc-js');

const INPUT_FILE = path.join(__dirname, '../public/classics/让诺集.mhtml');
const OUTPUT_FILE = path.join(__dirname, '../data/classics.json');

async function main() {
  console.log('Reading MHTML file...');
  let rawContent = fs.readFileSync(INPUT_FILE, 'utf-8');

  // 1. Extract the HTML content from MHTML
  // Find the first boundary and the HTML part
  // This is a simplified MHTML parser assuming the first part is the HTML
  const boundaryMatch = rawContent.match(/boundary="([^"]+)"/);
  if (!boundaryMatch) {
    console.error('Could not find boundary in MHTML');
    return;
  }
  const boundary = boundaryMatch[1];
  const parts = rawContent.split(`--${boundary}`);
  
  // Find the part with text/html
  let htmlPart = parts.find(p => p.includes('Content-Type: text/html'));
  if (!htmlPart) {
    console.error('Could not find HTML part');
    return;
  }

  // Remove headers from the part
  const bodyStartIndex = htmlPart.indexOf('\r\n\r\n');
  let htmlContent = htmlPart.substring(bodyStartIndex).trim();

  // Decode Quoted-Printable
  // MHTML often breaks lines with =\r\n, quoted-printable library handles =XX but might not handle soft line breaks perfectly if not normalized.
  // We need to manually handle the soft line breaks (= at end of line) first if the library doesn't.
  // Actually quoted-printable library decode should handle it.
  // But let's clean up the string first.
  
  try {
      htmlContent = quotedPrintable.decode(htmlContent);
      
      // Fix surrogate pair entities (e.g. &#55327;&#57091; -> Tangut char)
      // Microsoft Word MHTML often exports surrogate pairs as separate entities.
      htmlContent = htmlContent.replace(/&#(\d+);&#(\d+);/g, (match, high, low) => {
          const h = parseInt(high, 10);
          const l = parseInt(low, 10);
          if (h >= 55296 && h <= 56319 && l >= 56320 && l <= 57343) {
              const codePoint = (h - 55296) * 1024 + (l - 56320) + 65536;
              return String.fromCodePoint(codePoint);
          }
          return match;
      });

      // console.log("Decoded content sample:", htmlContent.substring(0, 500));
      if (htmlContent.includes('name="_Toc4319"')) {
          console.log("Debug: Found unescaped anchor in HTML content.");
      } else if (htmlContent.includes('name=3D"_Toc4319"')) {
          console.log("Debug: Found ESCAPED anchor (decoding failed?)");
      } else {
          console.log("Debug: Anchor _Toc4319 NOT FOUND in HTML content.");
      }
  } catch (e) {
      console.error("Error decoding quoted-printable:", e);
      // Fallback or manual fix might be needed
  }

  // 2. Parse HTML
  const $ = cheerio.load(htmlContent);
  const converter = OpenCC.Converter({ from: 'cn', to: 'hk' }); // Simplified to Traditional (Hong Kong variant is usually good for classics)

  // Helper to process content for Classic/Modern modes
  function processContent($node, isClassic) {
    let html = '';
    $node.contents().each((i, el) => {
      if (el.type === 'text') {
        let text = $(el).text();
        if (isClassic) {
          // Remove all punctuation using Unicode Property Escapes
          // \p{P} matches any kind of punctuation character
          text = converter(text).replace(/\p{P}/gu, '');
        }
        html += text;
      } else if (el.type === 'tag') {
        const tagName = el.tagName;
        if (tagName === 'i' || tagName === 'em') {
          const inner = processContent($(el), isClassic);
          html += `<span class="note">${inner}</span>`;
        } else if (tagName === 'br') {
          html += '<br/>';
        } else if (tagName === 'font') {
          const face = $(el).attr('face');
          const inner = processContent($(el), isClassic);
          if (face && (face.includes('源流明體月') || face.includes('GenRyuMin'))) {
             html += `<span class="font-genryu">${inner}</span>`;
          } else if (face && (face.includes('Noto西夏宋体') || face.includes('NotoSerifTangut'))) {
             html += `<span class="font-tangut">${inner}</span>`;
          } else {
             html += inner;
          }
        } else {
          // Unwrap other tags (span, b, etc.)
          html += processContent($(el), isClassic);
        }
      }
    });
    return html;
  }

  const structure = [];
  let currentCategory = null;
  
  // 3. Analyze TOC to build structure
  // Look for p.MsoToc1 (Category/Genre) and p.MsoToc2 (Title)
  // Or just scan the document flow if TOC is hard to parse.
  // Let's try scanning the headers in the body directly.
  // Headers usually have specific styles or font sizes.
  // Based on grep, titles are in <font face="源流明體月 M">Title</font> inside a <p> or <span>.
  
  // Strategy: Iterate through all paragraphs.
  // Identify "Category" headers (e.g., "赋", "记") - likely larger font or specific style.
  // Identify "Title" headers - likely slightly smaller than Category but larger than body.
  // Identify Body text.

  // Let's look at the TOC first to get the map.
  const tocEntries = [];
  $('p[class^=MsoToc]').each((i, el) => {
    const $el = $(el);
    const level = parseInt($el.attr('class').replace('MsoToc', ''));
    const link = $el.find('a').attr('href');
    const text = $el.text().trim().replace(/[0-9]+$/, '').trim(); // Remove page numbers
    
    if (link && text) {
      tocEntries.push({ level, text, link: link.replace('#', '').trim() });
    }
  });

  console.log('Found TOC entries:', tocEntries.length);

  // 4. Extract content based on TOC anchors
  let currentItem = null;

  for (let i = 0; i < tocEntries.length; i++) {
    const entry = tocEntries[i];
    const nextEntry = tocEntries[i + 1];
    
    if (entry.level === 1) {
      // This is a category
      currentCategory = {
        category: entry.text,
        items: []
      };
      structure.push(currentCategory);
      currentItem = null;
    } else {
      // Level 2 or 3
      // If Level 2, create new Item
      if (entry.level === 2) {
          if (!currentCategory) {
            currentCategory = { category: 'Uncategorized', items: [] };
            structure.push(currentCategory);
          }
          currentItem = {
              title: entry.text,
              titleTrad: converter(entry.text),
              sections: []
          };
          currentCategory.items.push(currentItem);
      }

      // If Level 3, we append to currentItem. If no currentItem (shouldn't happen if structure is correct), create one.
      if (entry.level >= 3 && !currentItem) {
           // Fallback: treat as L2
           if (!currentCategory) {
            currentCategory = { category: 'Uncategorized', items: [] };
            structure.push(currentCategory);
          }
           currentItem = {
              title: entry.text,
              titleTrad: converter(entry.text),
              sections: []
          };
          currentCategory.items.push(currentItem);
      }

      // Find the anchor in the document
      const anchorName = entry.link;
      // Try finding by name or id
      let $anchor = $(`a[name="${anchorName}"]`);
      if ($anchor.length === 0) {
          $anchor = $(`[id="${anchorName}"]`);
      }
      
      if ($anchor.length) {
        // console.log(`Found anchor for ${entry.text}`);
        let $contentNode = $anchor.closest('p, h1, h2, h3, h4, h5, h6, div, span');
        
        // If the anchor is inside a span inside a p, we want the p.
        if ($contentNode.is('span') || $contentNode.is('a')) {
             $contentNode = $contentNode.closest('p');
        }

        // If still not found, maybe the anchor is just a void element preceding the content
        if ($contentNode.length === 0) {
             $contentNode = $anchor.parent();
        }

        let contentText = '';
        let contentHtml = '';
        let contentTradHtml = '';
        
        // Start loop
        let $curr = $contentNode;
        
        // Safety break
        let count = 0;

        while ($curr.length && count < 1000) {
          count++;
          // Check for next anchor in this element
          if (nextEntry) {
             const nextAnchorName = nextEntry.link;
             if ($curr.find(`a[name="${nextAnchorName}"], [id="${nextAnchorName}"]`).length > 0) {
                 // Found next anchor inside this node (unlikely for P, but possible for DIV)
                 break;
             }
             // Check if this node IS the next anchor target
             if ($curr.attr('name') === nextAnchorName || $curr.attr('id') === nextAnchorName) {
                 break;
             }
             // Check if previous sibling was the last one (hard to do in forward loop)
          }

          // Extract text
          const text = $curr.text().trim();
          
          // Normalize whitespace for comparison (replace non-breaking spaces and multiple spaces with single space)
          const normalizedText = text.replace(/\s+/g, ' ');
          const normalizedTitle = entry.text.replace(/\s+/g, ' ');

          // Filter out the title itself if it appears
          if (text && normalizedText !== normalizedTitle && !text.includes('PAGEREF')) {
             contentText += text + '\n';
             // Use helper to preserve <i> tags and handle conversion
             contentHtml += `<p>${processContent($curr, false)}</p>`;
             contentTradHtml += `<p>${processContent($curr, true)}</p>`;
          }
          
          $curr = $curr.next();
          
          // Check if the NEXT node contains the next anchor (before processing it)
          if (nextEntry && $curr.length) {
             const nextAnchorName = nextEntry.link;
             if ($curr.find(`a[name="${nextAnchorName}"], [id="${nextAnchorName}"]`).length > 0) {
                 break;
             }
             if ($curr.attr('name') === nextAnchorName || $curr.attr('id') === nextAnchorName) {
                 break;
             }
          }
        }

        // Convert to Traditional
        const titleTrad = converter(entry.text);
        
        // Add section to currentItem
        if (currentItem) {
            currentItem.sections.push({
                title: entry.text,
                titleTrad: titleTrad,
                content: contentText,
                contentTradHtml: contentTradHtml, // Replaces contentTradNoPunc
                contentHtml: contentHtml,
                level: entry.level,
                anchor: anchorName,
                isTitleSection: entry.level === 2 // Mark if this section comes from the main title
            });
        }
      }
    }
  }

  // Filter out empty categories
  const finalStructure = structure.filter(c => c.items.length > 0);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalStructure, null, 2), 'utf-8');
  console.log(`Generated ${OUTPUT_FILE} with ${finalStructure.length} categories.`);
}

main().catch(console.error);
