import React from 'react';
import katex from 'katex';

interface MathFormulaProps {
  formula: string;
  displayMode?: boolean;
  className?: string;
}

export const MathFormula: React.FC<MathFormulaProps> = ({
  formula,
  displayMode = true,
  className = '',
}) => {
  let html = '';
  try {
    html = katex.renderToString(formula, {
      displayMode,
      throwOnError: false,
    });
  } catch {
    html = `<span class="text-rose-500 font-mono">${formula}</span>`;
  }

  return (
    <div
      dir="ltr"
      className={`overflow-x-auto ${displayMode ? 'text-center py-1' : 'inline-block'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
