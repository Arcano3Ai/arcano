const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '../src/app/tienda/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

const targetSnippet = `{activeProduct.details && activeProduct.details.length > 0 && (
                          <ul className="space-y-2 pt-3 border-t border-neutral-800 text-xs sm:text-sm text-neutral-300">
                            {activeProduct.details.map((d, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <span className="text-[#C5A059] mt-0.5 font-bold">✦</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        )}`;

const replacementSnippet = `{activeProduct.beadMatrix ? (
                          <div className="pt-3 border-t border-neutral-800 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A059]">
                                Matriz Técnica Sagrada · 22 Cuentas
                              </span>
                              <span className="text-[10px] text-neutral-400 font-sans italic">
                                {activeProduct.beadMatrix.archetype}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                              <div className="p-2.5 bg-[#141414] border border-neutral-800 rounded-sm">
                                <span className="text-[9px] block text-neutral-400 uppercase font-sans mb-1 font-medium">
                                  Cuerpo Principal (19 ctas - 8mm)
                                </span>
                                <span className="text-white font-medium block">
                                  {activeProduct.beadMatrix.mainBody.replace(/ \\(\\d+ ctas - \\d+ mm\\)/, '')}
                                </span>
                              </div>
                              <div className="p-2.5 bg-[#141414] border border-[#C5A059]/40 rounded-sm">
                                <span className="text-[9px] block text-[#C5A059] uppercase font-sans mb-1 font-medium">
                                  Laterales (2 ctas - 8mm)
                                </span>
                                <span className="text-[#F3EFE6] font-medium block">
                                  {activeProduct.beadMatrix.lateralBeads.replace(/ \\(\\d+ ctas - \\d+ mm\\)/, '')}
                                </span>
                              </div>
                              <div className="p-2.5 bg-[#141414] border border-neutral-800 rounded-sm">
                                <span className="text-[9px] block text-neutral-400 uppercase font-sans mb-1 font-medium">
                                  Centro Focal (1 cta - 10mm)
                                </span>
                                <span className="text-white font-medium block">
                                  {activeProduct.beadMatrix.centerPiece.replace(/ \\(\\d+ cta - \\d+ mm\\)/, '')}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : activeProduct.details && activeProduct.details.length > 0 ? (
                          <ul className="space-y-2 pt-3 border-t border-neutral-800 text-xs sm:text-sm text-neutral-300">
                            {activeProduct.details.map((d, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <span className="text-[#C5A059] mt-0.5 font-bold">✦</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}`;

if (!content.includes('Matriz Técnica Sagrada · 22 Cuentas')) {
  // Normalize CRLF to LF for matching
  const isCRLF = content.includes('\r\n');
  const normalizedContent = content.replace(/\r\n/g, '\n');
  const normalizedTarget = targetSnippet.replace(/\r\n/g, '\n');

  if (normalizedContent.includes(normalizedTarget)) {
    let updated = normalizedContent.replace(normalizedTarget, replacementSnippet);
    if (isCRLF) updated = updated.replace(/\n/g, '\r\n');
    fs.writeFileSync(pagePath, updated, 'utf8');
    console.log('✅ Modal de producto enriquecido con la Matriz Técnica de 22 cuentas');
  } else {
    console.log('⚠️ No se encontró el snippet exacto en tienda/page.tsx');
  }
} else {
  console.log('ℹ️ Matriz Técnica ya presente en modal');
}
