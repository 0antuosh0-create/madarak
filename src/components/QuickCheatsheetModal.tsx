import React, { useState, useEffect } from 'react';
import { X, Search, Copy, Check, Calculator, BookOpen, Layers } from 'lucide-react';
import { theoremsList, formulasHandbook } from '../data/cheatsheetData';
import { MathFormula } from './common/MathFormula';

interface QuickCheatsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickCheatsheetModal: React.FC<QuickCheatsheetModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'theorems' | 'formulas'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredTheorems = theoremsList.filter(
    (t) =>
      t.titleFa.includes(searchQuery) ||
      t.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.statementFa.includes(searchQuery) ||
      t.formulaTex.includes(searchQuery)
  );

  const filteredFormulas = formulasHandbook
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.titleFa.includes(searchQuery) ||
          item.formula.includes(searchQuery) ||
          item.descriptionFa.includes(searchQuery)
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Calculator size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                فرمول‌نامه سریع و قضایای مدارهای الکتریکی ۱
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                مرجع سریع فرمول‌ها، قضایا و روابط تحلیلی مدار و شبکه‌ها
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search bar & filter pills */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0b1320] flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="جستجوی فرمول، نام قضیه، تونن، تلگان..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-9 pe-3 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              autoFocus
            />
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              همه ({filteredTheorems.length + filteredFormulas.reduce((acc, g) => acc + g.items.length, 0)})
            </button>
            <button
              onClick={() => setActiveTab('theorems')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'theorems'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              قضایا ({filteredTheorems.length})
            </button>
            <button
              onClick={() => setActiveTab('formulas')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'formulas'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              روابط عناصر
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Theorems Section */}
          {(activeTab === 'all' || activeTab === 'theorems') && filteredTheorems.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <BookOpen size={14} className="text-amber-500" />
                <span>قضایای اساسی شبکه و مدار</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredTheorems.map((th) => (
                  <div
                    key={th.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-700 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {th.titleFa}
                          </h4>
                          <span className="text-[11px] text-slate-500">
                            {th.titleEn}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(th.id, th.formulaTex)}
                          title="کپی فرمول"
                          className="p-1 rounded text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
                        >
                          {copiedId === th.id ? (
                            <Check size={14} className="text-emerald-500" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                        {th.statementFa}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center text-xs font-bold text-amber-700 dark:text-amber-300">
                      <MathFormula formula={th.formulaTex} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formulas handbook section */}
          {(activeTab === 'all' || activeTab === 'formulas') && filteredFormulas.length > 0 && (
            <div className="space-y-6">
              {filteredFormulas.map((group) => (
                <div key={group.id} className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <Layers size={14} className="text-amber-500" />
                    <span>{group.titleFa}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {group.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-700 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {item.titleFa}
                          </h5>
                          <button
                            onClick={() => handleCopy(`${group.id}-${idx}`, item.formula)}
                            className="p-1 text-slate-400 hover:text-amber-500 transition-colors"
                          >
                            {copiedId === `${group.id}-${idx}` ? (
                              <Check size={13} className="text-emerald-500" />
                            ) : (
                              <Copy size={13} />
                            )}
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">
                          {item.descriptionFa}
                        </p>
                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 text-center">
                          <MathFormula formula={item.formula} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredTheorems.length === 0 && filteredFormulas.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm">هیچ فرمول یا قضیه‌ای مطابق با عبارت جستجو یافت نشد.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
