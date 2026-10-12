import katex from 'katex';

/**
 * Clean common LaTeX quirks before passing to KaTeX
 */
export function cleanLatex(formula: string): string {
  return formula
    .trim()
    // Replace \text{آمپر } etc. that might cause font issues
    .replace(/\\text\{([^}]+)\}/g, (_match, text) => {
      // If it contains Persian characters, keep it simple
      return `\\mathrm{${text}}`;
    });
}

/**
 * Render single formula with KaTeX
 */
export function renderKatex(formula: string, displayMode: boolean = false): string {
  try {
    const cleaned = cleanLatex(formula);
    return katex.renderToString(cleaned, {
      displayMode,
      throwOnError: false,
    });
  } catch (err) {
    console.error('KaTeX render error:', err);
    return `<code class="text-rose-500 font-mono">${formula}</code>`;
  }
}

/**
 * Full markdown-to-HTML parser with KaTeX math rendering
 */
export function renderMarkdownWithMath(content: string): string {
  if (!content) return '';

  const mathBlocks: string[] = [];
  const mathInlines: string[] = [];

  // 1. Extract $$...$$ display math blocks
  let text = content.replace(/\$\$([\s\S]*?)\$\$/g, (_match, math) => {
    const idx = mathBlocks.length;
    mathBlocks.push(math.trim());
    return `%%%MATH_BLOCK_${idx}%%%`;
  });

  // 2. Extract $...$ inline math
  text = text.replace(/(?<!\$)\$(?!\$)([^\n]+?)(?<!\$)\$(?!\$)/g, (_match, math) => {
    const idx = mathInlines.length;
    mathInlines.push(math.trim());
    return `%%%MATH_INLINE_${idx}%%%`;
  });

  // 3. Process Markdown Tables
  text = text.replace(/((?:\|[^\n]+\|\r?\n)+)/g, (tableBlock) => {
    const rows = tableBlock.trim().split(/\r?\n/).filter((r) => r.trim());
    if (rows.length < 2) return tableBlock;

    let html = '<div class="overflow-x-auto my-4"><table class="w-full text-xs sm:text-sm border-collapse border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">';
    
    // Header row
    const headerCells = rows[0].split('|').map((c) => c.trim()).filter((c) => c);
    html += '<thead class="bg-slate-100 dark:bg-[#131d31] text-slate-800 dark:text-slate-200 font-bold"><tr>';
    headerCells.forEach((c) => {
      html += `<th class="p-2.5 text-start border-b border-slate-200 dark:border-slate-700">${c}</th>`;
    });
    html += '</tr></thead><tbody>';

    // Body rows (skip separator row at index 1)
    for (let i = 2; i < rows.length; i++) {
      const cells = rows[i].split('|').map((c) => c.trim()).filter((c) => c);
      html += '<tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-[#18243c]">';
      cells.forEach((c) => {
        html += `<td class="p-2.5 text-start">${c}</td>`;
      });
      html += '</tr>';
    }

    html += '</tbody></table></div>';
    return html;
  });

  // 4. Process Headings
  text = text
    .replace(/^### (.*$)/gim, '<h3 class="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400 mt-5 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-6 mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-6 mb-3">$1</h1>');

  // 5. Bold & Italics
  text = text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-slate-700 dark:text-slate-300">$1</em>');

  // 6. Inline code
  text = text.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-amber-600 dark:text-amber-400 text-xs">$1</code>');

  // 7. Bullet lists & Numbered lists
  text = text.replace(/^[*-] (.*$)/gim, '<li class="ms-4 list-disc text-slate-700 dark:text-slate-300">$1</li>');
  text = text.replace(/^(\d+)\. (.*$)/gim, '<li class="ms-4 list-decimal text-slate-700 dark:text-slate-300">$2</li>');

  // 8. Paragraphs & line breaks
  text = text.replace(/\n\n/g, '<div class="my-2"></div>');

  // 9. Substitute back KaTeX rendered math blocks
  mathBlocks.forEach((math, idx) => {
    const rendered = renderKatex(math, true);
    const blockHtml = `<div dir="ltr" class="my-3 py-3 px-3 sm:px-4 rounded-xl bg-slate-100 dark:bg-[#131d31] border border-slate-200 dark:border-slate-700 overflow-x-auto text-center flex items-center justify-center shadow-2xs">${rendered}</div>`;
    text = text.replace(`%%%MATH_BLOCK_${idx}%%%`, blockHtml);
  });

  // 10. Substitute back KaTeX rendered inline math
  mathInlines.forEach((math, idx) => {
    const rendered = renderKatex(math, false);
    const inlineHtml = `<span dir="ltr" class="inline-block px-1 align-baseline">${rendered}</span>`;
    text = text.replace(`%%%MATH_INLINE_${idx}%%%`, inlineHtml);
  });

  return text;
}
