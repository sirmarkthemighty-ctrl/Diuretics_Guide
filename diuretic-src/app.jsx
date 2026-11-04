const { useState, useMemo, useEffect } = React;

/* ---------- Icons (same stroke set as the bronchodilator guide) ---------- */
const mk = (body, sw) => ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw || 2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{body}</svg>;
const Search = mk(<><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>);
const LayoutGrid = mk(<><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>);
const TableIcon = mk(<><rect x="3" y="4" width="18" height="16" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="4" x2="9" y2="20" /></>);
const ListIcon = mk(<><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></>);
const SortIcon = mk(<><line x1="15" y1="18" x2="15" y2="6" /><polyline points="11 10 15 6 19 10" /><line x1="9" y1="6" x2="9" y2="18" /><polyline points="5 14 9 18 13 14" /></>);
const ActivityIcon = mk(<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />);
const Check = mk(<polyline points="20 6 9 17 4 12" />, 3);
const X = mk(<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>, 3);
const SunIcon = mk(<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></>);
const MoonIcon = mk(<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />);
const FunnelIcon = mk(<path d="M3 5h18l-7 8.5V19l-4 2v-7.5z" />, 2.2);
const HelpIcon = mk(<><circle cx="12" cy="12" r="9.5" /><path d="M9.3 9.2a2.8 2.8 0 1 1 4 2.6c-.8.5-1.3 1-1.3 2" /><path d="M12 17.2h.01" /></>, 2.2);
const CompareIcon = mk(<><rect x="3" y="4" width="7" height="16" rx="1.5" /><rect x="14" y="4" width="7" height="16" rx="1.5" /></>);
const InfoIcon = mk(<><circle cx="12" cy="12" r="9.5" /><path d="M12 16v-4" /><path d="M12 8h.01" /></>);
const PillIcon = mk(<><path d="M10.5 20.5a5 5 0 0 1-7-7l10-10a5 5 0 0 1 7 7z" /><path d="M8.5 8.5l7 7" /></>);
const NephronIcon = mk(<><circle cx="6" cy="5" r="2.5" /><path d="M6 7.5c-2.5 1.5 2.5 3 0 4.5" /><path d="M6 12v8h6V9h3v6h3V4" /></>);
const LadderIcon = mk(<path d="M8 3v18M16 3v18M8 8h8M8 13h8M8 18h8" />);


/* ---------- Data ---------- */
const VERSION = 'v1.1.0';
const CHANGELOG = [
  { v: 'v1.1.0', date: '2026-11-04',
    en: ['First release: 24 diuretics (18 core plus 6 sold in the UK, EU or Japan) with doses, electrolyte effects and side effects.', 'Tile, list and table views.', 'Mechanism button: highlights where selected drugs act on the nephron.', 'Diuretic resistance: sequential nephron blockade guide.', 'Thai NLEM 2569 chip checked against the official list (5 Basic drugs, the rest Non-NLEM) and TH / US / UK / EU / JP availability filter (all five checked 2026-11-04: UK on emc, EU on Spain AEMPS, EMA lists and national sources, JP on KEGG / JAPIC). FDA status per country (current / past † / never ⊘) with a filter; US checked against openFDA. Doses and Thai brands checked against MIMS Thailand.'],
    th: ['เปิดตัวครั้งแรก: ยาขับปัสสาวะ 24 ชนิด (หลัก 18 ชนิด และอีก 6 ชนิดที่มีใน UK, EU หรือญี่ปุ่น) พร้อมขนาดยา ผลต่ออิเล็กโทรไลต์ และผลข้างเคียง', 'มุมมองการ์ด รายการ และตาราง', 'ปุ่มกลไก: แสดงตำแหน่งที่ยาที่เลือกออกฤทธิ์บนเนฟรอน', 'ภาวะดื้อยาขับปัสสาวะ: แนวทางการปิดกั้นเนฟรอนตามลำดับ', 'ป้าย NLEM 2569 ตรวจกับบัญชียาหลักฯ ฉบับจริง (หมวดพื้นฐาน 5 ชนิด ที่เหลือไม่อยู่ใน NLEM) และตัวกรองประเทศ TH / US / UK / EU / JP (ตรวจครบทั้งห้าเมื่อ 2026-11-04: UK ใน emc, EU ใน AEMPS สเปน รายการ EMA และแหล่งระดับประเทศ, JP ใน KEGG / JAPIC) สถานะ อย. รายประเทศ (ปัจจุบัน / เคยมี † / ไม่เคยมี ⊘) พร้อมตัวกรอง ตรวจสหรัฐฯ กับ openFDA ตรวจขนาดยาและยี่ห้อในไทยกับ MIMS Thailand'] },
];

// Nephron segments, in flow order
const SEGS = ['pct', 'dl', 'tal', 'dct', 'cd'];
const SEG_NAME = {
  pct: { en: 'Proximal tubule (PCT)', th: 'ท่อไตส่วนต้น (PCT)' },
  dl: { en: 'Descending limb', th: 'ห่วงเฮนเลขาลง' },
  tal: { en: 'Thick ascending limb (TAL)', th: 'ห่วงเฮนเลขาขึ้นส่วนหนา (TAL)' },
  dct: { en: 'Distal convoluted tubule (DCT)', th: 'ท่อไตส่วนปลาย (DCT)' },
  cd: { en: 'Collecting duct (CD)', th: 'ท่อรวม (CD)' },
};

const CLS = {
  cai: { hex: '#8b5cf6', en: 'Carbonic anhydrase inhibitor', th: 'ยายับยั้งคาร์บอนิกแอนไฮเดรส', s: { en: 'CA inhibitor', th: 'CA inhibitor' }, chip: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-400/30', txt: 'text-violet-700 dark:text-violet-300' },
  osm: { hex: '#64748b', en: 'Osmotic diuretic', th: 'ยาขับปัสสาวะออสโมติก', s: { en: 'Osmotic', th: 'ออสโมติก' }, chip: 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-500/10 dark:text-slate-300 dark:border-slate-400/30', txt: 'text-slate-700 dark:text-slate-300' },
  loop: { hex: '#2563eb', en: 'Loop diuretic', th: 'ยาขับปัสสาวะกลุ่มลูป', s: { en: 'Loop', th: 'ลูป' }, chip: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-400/30', txt: 'text-blue-700 dark:text-blue-300' },
  thz: { hex: '#059669', en: 'Thiazide / thiazide-like', th: 'ไทอาไซด์ / คล้ายไทอาไซด์', s: { en: 'Thiazide', th: 'ไทอาไซด์' }, chip: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-400/30', txt: 'text-emerald-700 dark:text-emerald-300' },
  enac: { hex: '#d97706', en: 'ENaC blocker (K-sparing)', th: 'ยาปิดกั้น ENaC (ไม่เสียโพแทสเซียม)', s: { en: 'ENaC blocker', th: 'ปิดกั้น ENaC' }, chip: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-400/30', txt: 'text-amber-700 dark:text-amber-300' },
  mra: { hex: '#ea580c', en: 'Mineralocorticoid antagonist', th: 'ยาต้านมิเนอรัลโลคอร์ติคอยด์', s: { en: 'MRA', th: 'MRA' }, chip: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:border-orange-400/30', txt: 'text-orange-700 dark:text-orange-300' },
  v2: { hex: '#e11d48', en: 'Vasopressin V2 antagonist', th: 'ยาต้านวาโซเพรสซิน V2', s: { en: 'V2 antagonist', th: 'ต้าน V2' }, chip: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-400/30', txt: 'text-rose-700 dark:text-rose-300' },
  sglt: { hex: '#0891b2', en: 'SGLT2 inhibitor', th: 'ยายับยั้ง SGLT2', s: { en: 'SGLT2i', th: 'SGLT2i' }, chip: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-400/30', txt: 'text-cyan-700 dark:text-cyan-300' },
};
const CLS_ORDER = Object.keys(CLS);

// Side-effect vocabulary (EN / TH) so each drug lists terms, not sentences
const SE = {
  hypoK: ['Hypokalemia', 'โพแทสเซียมต่ำ'], hyperK: ['Hyperkalemia', 'โพแทสเซียมสูง'],
  hypoNa: ['Hyponatremia', 'โซเดียมต่ำ'], hyperNa: ['Hypernatremia', 'โซเดียมสูง'],
  hypoMg: ['Hypomagnesemia', 'แมกนีเซียมต่ำ'], hypoCa: ['Hypocalcemia', 'แคลเซียมต่ำ'], hyperCa: ['Hypercalcemia', 'แคลเซียมสูง'],
  metAlk: ['Metabolic alkalosis', 'ภาวะด่างเมตาบอลิก'], metAcid: ['Metabolic acidosis', 'ภาวะกรดเมตาบอลิก'],
  hypoV: ['Volume depletion', 'ขาดน้ำ/ปริมาตรเลือดต่ำ'], hypoT: ['Hypotension', 'ความดันต่ำ'], ototox: ['Ototoxicity', 'พิษต่อหู'],
  uric: ['Hyperuricemia / gout', 'ยูริกสูง / เก๊าท์'], gluc: ['Hyperglycemia', 'น้ำตาลสูง'], lipid: ['Raised lipids', 'ไขมันสูง'],
  sulfa: ['Sulfonamide allergy (rare cross-reactivity)', 'แพ้ซัลฟา (ข้ามกลุ่มพบน้อย)'], aki: ['AKI', 'ไตวายเฉียบพลัน'],
  gyn: ['Gynecomastia / menstrual change', 'เต้านมโตในชาย / ประจำเดือนผิดปกติ'], paresth: ['Paresthesia, taste change', 'ชาปลายมือเท้า รับรสเปลี่ยน'],
  stones: ['Kidney stones', 'นิ่วในไต'], liver: ['Liver injury', 'พิษต่อตับ'], thirst: ['Thirst', 'กระหายน้ำ'],
  ods: ['Overly fast Na correction (ODS)', 'แก้ Na เร็วเกิน (ODS)'], pulm: ['Fluid overload / pulmonary edema', 'น้ำเกิน/ปอดบวมน้ำ'],
  gu: ['Genital mycotic infection', 'ติดเชื้อราที่อวัยวะเพศ'], dka: ['Euglycemic DKA', 'ภาวะ DKA ชนิดน้ำตาลไม่สูง'],
  gi: ['GI upset', 'ระบบทางเดินอาหารผิดปกติ'], blood: ['Megaloblastic anemia / folate antagonism', 'โลหิตจางชนิดเมกะโลบลาสติก'], rash: ['Rash / photosensitivity', 'ผื่น/ไวต่อแสง'], wbc: ['Agranulocytosis / leukopenia (rare)', 'เม็ดเลือดขาวต่ำ/แอกรานูโลไซโทซิส (พบน้อย)'],
};

// fx: effect on serum level. 1 = raises, -1 = lowers, 0 = no major effect, 'v' = variable
const D = (id, name, th, cls, sites, target, fena, dose, fx, se, pearl) => ({ id, name, th, cls, sites, target, fena, dose, fx, se, pearl });
const DRUGS = [
  D('acetazolamide', 'Acetazolamide', 'อะเซตาโซลาไมด์', 'cai', ['pct'], 'Carbonic anhydrase', '≈3–5%',
    [['PO/IV', 'Edema 250–375 mg OD or alternate days; glaucoma 250–1,000 mg/day divided'], ['Resistance', '250–500 mg IV/PO OD × 1–3 days']],
    { na: 0, k: -1, mg: 0, ca: 0, hco3: -1 }, ['metAcid', 'hypoK', 'paresth', 'stones', 'sulfa'],
    { en: 'Self-limiting: bicarbonate loss stops the effect in 2–3 days. Useful when HCO₃⁻ is high from loop therapy (ADVOR: 500 mg IV daily added to loop).', th: 'ออกฤทธิ์จำกัดตัวเอง เพราะเสีย HCO₃⁻ แล้วฤทธิ์ลดลงใน 2–3 วัน ใช้ได้ดีเมื่อ HCO₃⁻ สูงจากยาลูป (ADVOR: 500 mg IV วันละครั้งเสริมยาลูป)' }),
  D('mannitol', 'Mannitol', 'แมนนิทอล', 'osm', ['pct', 'dl'], 'Osmotic force (not a transporter)', 'Variable',
    [['IV', '0.25–2 g/kg over 30–60 min (10–20% solution); may repeat q6–8 h']],
    { na: 'v', k: -1, mg: 0, ca: 0, hco3: 0 }, ['pulm', 'hypoNa', 'hyperNa', 'aki', 'hypoK'],
    { en: 'Used for raised ICP / ICP crises, not for routine edema. Avoid in anuria and in pulmonary edema; early dilutional hyponatremia then water loss.', th: 'ใช้ลดความดันในกะโหลกศีรษะ ไม่ใช้รักษาบวมทั่วไป หลีกเลี่ยงในภาวะไม่มีปัสสาวะและปอดบวมน้ำ' }),
  D('furosemide', 'Furosemide', 'ฟูโรซีไมด์', 'loop', ['tal'], 'NKCC2 (Na⁺-K⁺-2Cl⁻)', '≈20–25%',
    [['PO', '20–80 mg OD–BID (max ≈ 600 mg/day)'], ['IV', '20–50 mg slow IV (label max 1,500 mg/day); infusion 5–40 mg/h']],
    { na: -1, k: -1, mg: -1, ca: -1, hco3: 1 }, ['hypoK', 'hypoMg', 'metAlk', 'hypoV', 'ototox', 'uric', 'sulfa'],
    { en: 'Oral bioavailability ≈ 50% (10–100%, lower with gut edema): 40 mg PO ≈ 20 mg IV. Short action (≈ 6 h) → post-diuretic Na retention; give BID.', th: 'การดูดซึมทางปากประมาณ 50% (10–100% ลดลงเมื่อลำไส้บวม): 40 mg PO ≈ 20 mg IV ออกฤทธิ์สั้น (~6 ชม.) จึงเกิด Na retention หลังยาหมด ควรให้วันละ 2 ครั้ง' }),
  D('bumetanide', 'Bumetanide', 'บูเมทานิด', 'loop', ['tal'], 'NKCC2 (Na⁺-K⁺-2Cl⁻)', '≈20–25%',
    [['PO/IV', '0.5–2 mg OD–BID (max ≈ 10 mg/day)']],
    { na: -1, k: -1, mg: -1, ca: -1, hco3: 1 }, ['hypoK', 'hypoMg', 'metAlk', 'hypoV', 'ototox', 'sulfa'],
    { en: '1 mg ≈ 40 mg PO furosemide. Bioavailability 80–100%, so it is more predictable than furosemide in gut edema.', th: '1 mg ≈ furosemide 40 mg PO การดูดซึม 80–100% คาดเดาผลได้ดีกว่า furosemide เมื่อลำไส้บวม' }),
  D('torsemide', 'Torsemide (torasemide)', 'ทอร์ซีไมด์', 'loop', ['tal'], 'NKCC2 (Na⁺-K⁺-2Cl⁻)', '≈20–25%',
    [['PO/IV', '10–20 mg OD (up to 100–200 mg in resistance)']],
    { na: -1, k: -1, mg: -1, ca: -1, hco3: 1 }, ['hypoK', 'hypoMg', 'metAlk', 'hypoV', 'ototox', 'sulfa'],
    { en: '20 mg ≈ 40 mg PO furosemide. Bioavailability 80–100%, half-life 3–4 h, once-daily. TRANSFORM-HF: no mortality difference vs furosemide.', th: '20 mg ≈ furosemide 40 mg PO การดูดซึม 80–100% ครึ่งชีวิต 3–4 ชม. วันละครั้ง TRANSFORM-HF: อัตราตายไม่ต่างจาก furosemide' }),
  D('ethacrynic', 'Ethacrynic acid', 'เอทาครินิกแอซิด', 'loop', ['tal'], 'NKCC2 (Na⁺-K⁺-2Cl⁻)', '≈20–25%',
    [['PO', '25–50 mg OD–BID'], ['IV', '50 mg (or 0.5–1 mg/kg)']],
    { na: -1, k: -1, mg: -1, ca: -1, hco3: 1 }, ['hypoK', 'hypoMg', 'metAlk', 'hypoV', 'ototox'],
    { en: 'The only non-sulfonamide loop diuretic: option for true sulfa allergy. Highest ototoxicity of the loops.', th: 'เป็นยาลูปตัวเดียวที่ไม่ใช่ซัลฟา ใช้ได้เมื่อแพ้ซัลฟาจริง มีพิษต่อหูสูงสุดในกลุ่มลูป' }),
  D('hctz', 'Hydrochlorothiazide', 'ไฮโดรคลอโรไทอาไซด์', 'thz', ['dct'], 'NCC (Na⁺-Cl⁻)', '≈5–8%',
    [['PO', 'HTN 12.5–50 mg OD; edema 25–100 mg OD–BID']],
    { na: -1, k: -1, mg: -1, ca: 1, hco3: 1 }, ['hypoNa', 'hypoK', 'hypoMg', 'hyperCa', 'uric', 'gluc', 'lipid', 'rash'],
    { en: 'Thiazide hyponatremia can be severe in older adults. Less effective at low eGFR (classically < 30). Raises serum Ca: useful in calcium stones.', th: 'โซเดียมต่ำจากไทอาไซด์อาจรุนแรงในผู้สูงอายุ ได้ผลน้อยลงเมื่อ eGFR ต่ำ (< 30) ทำให้แคลเซียมในเลือดสูง ใช้ประโยชน์ในนิ่วแคลเซียม' }),
  D('chlorthalidone', 'Chlorthalidone', 'คลอร์ธาลิโดน', 'thz', ['dct'], 'NCC (Na⁺-Cl⁻)', '≈5–8%',
    [['PO', 'HTN 12.5–25 mg OD; edema 25–50 mg OD, up to 100–200 mg in severe cases']],
    { na: -1, k: -1, mg: -1, ca: 1, hco3: 1 }, ['hypoNa', 'hypoK', 'hypoMg', 'hyperCa', 'uric', 'gluc'],
    { en: 'Half-life 40–60 h; more potent per mg than HCTZ. CLICK trial: lowers BP in stage 4 CKD.', th: 'ครึ่งชีวิต 40–60 ชม. แรงกว่า HCTZ ต่อ mg การศึกษา CLICK: ลดความดันได้ใน CKD ระยะ 4' }),
  D('indapamide', 'Indapamide', 'อินดาพาไมด์', 'thz', ['dct'], 'NCC (Na⁺-Cl⁻)', '≈5–8%',
    [['PO', 'HTN 1.25–2.5 mg OD (SR 1.5 mg OD); CHF edema 2.5–5 mg OD']],
    { na: -1, k: -1, mg: -1, ca: 1, hco3: 1 }, ['hypoNa', 'hypoK', 'hypoMg', 'uric'],
    { en: 'Thiazide-like with a vasodilating effect; proven outcome benefit in HYVET and ADVANCE. Less glucose / lipid effect.', th: 'คล้ายไทอาไซด์ มีฤทธิ์ขยายหลอดเลือด มีหลักฐานผลลัพธ์ใน HYVET และ ADVANCE ผลต่อน้ำตาลและไขมันน้อยกว่า' }),
  D('metolazone', 'Metolazone', 'เมโทลาโซน', 'thz', ['dct'], 'NCC (Na⁺-Cl⁻)', '≈5–8%',
    [['PO', '2.5–10 mg OD, 30 min before the loop dose']],
    { na: -1, k: -1, mg: -1, ca: 1, hco3: 1 }, ['hypoK', 'hypoNa', 'hypoMg', 'hypoV', 'aki'],
    { en: 'Keeps working at low GFR. Add to a loop for sequential blockade for 1–3 days only; check K⁺, Mg²⁺, Na⁺ and creatinine daily.', th: 'ยังออกฤทธิ์ได้เมื่อ GFR ต่ำ ใช้เสริมยาลูปเพื่อปิดกั้นต่อเนื่อง 1–3 วัน ตรวจ K⁺, Mg²⁺, Na⁺, creatinine ทุกวัน' }),
  D('chlorothiazide', 'Chlorothiazide IV', 'คลอโรไทอาไซด์ (IV)', 'thz', ['dct'], 'NCC (Na⁺-Cl⁻)', '≈5–8%',
    [['IV', '500–1000 mg OD–BID, 30 min before the loop dose']],
    { na: -1, k: -1, mg: -1, ca: 1, hco3: 1 }, ['hypoK', 'hypoNa', 'hypoMg', 'hypoV', 'aki'],
    { en: 'The IV option for sequential blockade when gut absorption is poor. Often not stocked: HCTZ or metolazone PO is the usual substitute.', th: 'ทางเลือกแบบฉีดสำหรับการปิดกั้นต่อเนื่องเมื่อการดูดซึมทางลำไส้ไม่ดี มักไม่มีในโรงพยาบาล ใช้ HCTZ หรือ metolazone ชนิดกินแทนได้' }),
  D('spironolactone', 'Spironolactone', 'สไปโรโนแลกโทน', 'mra', ['cd'], 'Mineralocorticoid receptor', '≈2%',
    [['PO', 'HF (guideline) 12.5–50 mg OD; edema 25–200 mg/day; cirrhotic ascites 100–400 mg/day']],
    { na: -1, k: 1, mg: 0, ca: 0, hco3: -1 }, ['hyperK', 'gyn', 'metAcid', 'aki'],
    { en: 'Slow onset (days). Cirrhotic ascites: start 100 mg, usually with furosemide 40 mg (100:40). Check K⁺ and creatinine at 1 and 4 weeks.', th: 'ออกฤทธิ์ช้า (เป็นวัน) ท้องมานจากตับแข็ง: เริ่ม 100 mg มักให้คู่กับ furosemide 40 mg (100:40) ตรวจ K⁺ และ creatinine ที่ 1 และ 4 สัปดาห์' }),
  D('eplerenone', 'Eplerenone', 'เอพเลรีโนน', 'mra', ['cd'], 'Mineralocorticoid receptor', '≈2%',
    [['PO', '25–50 mg OD']],
    { na: -1, k: 1, mg: 0, ca: 0, hco3: -1 }, ['hyperK', 'aki'],
    { en: 'Selective MRA: no gynecomastia. Avoid with strong CYP3A4 inhibitors.', th: 'MRA แบบจำเพาะ ไม่ทำให้เต้านมโต หลีกเลี่ยงร่วมกับยายับยั้ง CYP3A4 ที่แรง' }),
  D('amiloride', 'Amiloride', 'อะมิโลไรด์', 'enac', ['cd'], 'ENaC (Na⁺ channel)', '≈2%',
    [['PO', '5–10 mg OD (max 20 mg)']],
    { na: -1, k: 1, mg: 0, ca: 0, hco3: -1 }, ['hyperK', 'metAcid', 'gi'],
    { en: 'Also treats lithium-induced nephrogenic diabetes insipidus (enters through ENaC). Do not combine with MRA / ACEi / ARB without K⁺ monitoring.', th: 'ใช้รักษา nephrogenic DI จากลิเทียมได้ (ลิเทียมเข้าเซลล์ผ่าน ENaC) ห้ามใช้ร่วม MRA / ACEi / ARB โดยไม่ติดตามค่า K⁺' }),
  D('triamterene', 'Triamterene', 'ไตรแอมเทอรีน', 'enac', ['cd'], 'ENaC (Na⁺ channel)', '≈2%',
    [['PO', '150–250 mg/day in 2 doses (max 300 mg/day); alternate days for maintenance']],
    { na: -1, k: 1, mg: 0, ca: 0, hco3: -1 }, ['hyperK', 'stones', 'blood', 'aki'],
    { en: 'Usually combined with HCTZ to offset hypokalemia. Can form kidney stones and a weak folate antagonist effect.', th: 'มักให้คู่กับ HCTZ เพื่อลดโพแทสเซียมต่ำ อาจทำให้เกิดนิ่วและต้านโฟเลตเล็กน้อย' }),
  D('tolvaptan', 'Tolvaptan', 'โทลวาปแทน', 'v2', ['cd'], 'Vasopressin V2 receptor (aquaporin-2)', 'Water only (aquaresis)',
    [['PO', 'Hyponatremia: start 15 mg OD, titrate to 30–60 mg']],
    { na: 1, k: 0, mg: 0, ca: 0, hco3: 0 }, ['ods', 'thirst', 'liver', 'hypoV'],
    { en: 'Start in hospital and check Na⁺ every 6–8 h; keep the rise ≤ 8–10 mmol/L per 24 h. Do not restrict fluids. Avoid > 30 days in non-ADPKD use (liver injury).', th: 'เริ่มในโรงพยาบาล เจาะ Na⁺ ทุก 6–8 ชม. ให้ Na⁺ เพิ่มไม่เกิน 8–10 mmol/L ใน 24 ชม. ไม่ต้องจำกัดน้ำ ไม่ควรใช้เกิน 30 วันในข้อบ่งชี้อื่นที่ไม่ใช่ ADPKD (พิษต่อตับ)' }),
  D('dapagliflozin', 'Dapagliflozin', 'ดาพากลิโฟลซิน', 'sglt', ['pct'], 'SGLT2 (Na⁺-glucose)', 'Mild natriuresis',
    [['PO', 'HF / CKD 10 mg OD']],
    { na: 0, k: 0, mg: 0, ca: 0, hco3: 0 }, ['gu', 'dka', 'hypoV'],
    { en: 'Used for HF / CKD outcomes; the diuretic effect is mild but additive. Hold when acutely ill, fasting or before surgery (DKA).', th: 'ใช้เพื่อผลลัพธ์ในโรคหัวใจล้มเหลว/โรคไต ฤทธิ์ขับปัสสาวะไม่มากแต่เสริมกัน งดเมื่อป่วยหนัก อดอาหาร หรือก่อนผ่าตัด (DKA)' }),
  D('empagliflozin', 'Empagliflozin', 'เอมพากลิโฟลซิน', 'sglt', ['pct'], 'SGLT2 (Na⁺-glucose)', 'Mild natriuresis',
    [['PO', 'HF / CKD 10 mg OD']],
    { na: 0, k: 0, mg: 0, ca: 0, hco3: 0 }, ['gu', 'dka', 'hypoV'],
    { en: 'Used for HF / CKD outcomes; the diuretic effect is mild but additive. Hold when acutely ill, fasting or before surgery (DKA).', th: 'ใช้เพื่อผลลัพธ์ในโรคหัวใจล้มเหลว/โรคไต ฤทธิ์ขับปัสสาวะไม่มากแต่เสริมกัน งดเมื่อป่วยหนัก อดอาหาร หรือก่อนผ่าตัด (DKA)' }),
  D('bendroflumethiazide', 'Bendroflumethiazide', 'เบนโดรฟลูเมไทอาไซด์', 'thz', ['dct'], 'NCC (Na⁺-Cl⁻)', '≈5–8%',
    [['PO', 'HTN 2.5 mg every morning (more is rarely needed); edema 5–10 mg every morning at first, then 2.5–5 mg on 2–3 days a week']],
    { na: -1, k: -1, mg: -1, ca: 1, hco3: 1 }, ['hypoNa', 'hypoK', 'hypoMg', 'hyperCa', 'uric', 'gluc', 'rash'],
    { en: 'Long-standing UK thiazide. NICE NG136 now prefers a thiazide-like drug (indapamide, chlortalidone) for new hypertension. Contraindicated in Addison disease, hypercalcemia, hyponatremia and refractory hypokalemia.', th: 'ไทอาไซด์ที่ใช้มานานในสหราชอาณาจักร ปัจจุบัน NICE NG136 แนะนำยาคล้ายไทอาไซด์ (indapamide, chlortalidone) สำหรับความดันสูงรายใหม่ ห้ามใช้ในโรค Addison แคลเซียมสูง โซเดียมต่ำ และโพแทสเซียมต่ำที่แก้ไม่ได้' }),
  D('xipamide', 'Xipamide', 'ไซพาไมด์', 'thz', ['dct'], 'NCC (Na⁺-Cl⁻)', '≈5–8%',
    [['PO', 'HTN 20 mg OD; edema 20 mg OD, up to 40 mg; up to 60 mg/day in advanced kidney impairment (German leaflet)']],
    { na: -1, k: -1, mg: -1, ca: 1, hco3: 1 }, ['hypoK', 'hypoNa', 'hypoMg', 'hyperCa', 'uric', 'sulfa'],
    { en: 'Thiazide-like sulfonamide sold in Germany (generics). Hypokalemia is very common. Contraindicated in gout / high uric acid, refractory hypokalemia, hypercalcemia, severe liver disease and pregnancy.', th: 'ยาซัลฟาคล้ายไทอาไซด์ มีจำหน่ายในเยอรมนี (ยาสามัญ) โพแทสเซียมต่ำพบบ่อยมาก ห้ามใช้ในเก๊าท์/ยูริกสูง โพแทสเซียมต่ำที่แก้ไม่ได้ แคลเซียมสูง โรคตับรุนแรง และการตั้งครรภ์' }),
  D('trichlormethiazide', 'Trichlormethiazide', 'ไตรคลอร์เมไทอาไซด์', 'thz', ['dct'], 'NCC (Na⁺-Cl⁻)', '≈5–8%',
    [['PO', '2–8 mg/day in 1–2 doses (Japan label); start low in older adults']],
    { na: -1, k: -1, mg: -1, ca: 1, hco3: 1 }, ['hypoNa', 'hypoK', 'hypoMg', 'uric', 'gluc'],
    { en: 'Thiazide used in Japan (Fluitran, generics) for hypertension and edema. Contraindicated in anuria and acute renal failure.', th: 'ไทอาไซด์ที่ใช้ในญี่ปุ่น (Fluitran และยาสามัญ) สำหรับความดันสูงและบวม ห้ามใช้ในภาวะไม่มีปัสสาวะและไตวายเฉียบพลัน' }),
  D('azosemide', 'Azosemide', 'อะโซเซไมด์', 'loop', ['tal'], 'NKCC2 (Na⁺-K⁺-2Cl⁻)', '≈20–25%',
    [['PO', '60 mg OD (Japan label); adjust to age and symptoms']],
    { na: -1, k: -1, mg: -1, ca: -1, hco3: 1 }, ['hypoK', 'metAlk', 'hypoV', 'wbc'],
    { en: 'Long-acting loop diuretic used in Japan (Diart) for cardiac, renal and hepatic edema. The label warns of electrolyte abnormalities and of agranulocytosis / leukopenia; contraindicated in anuria and hepatic coma.', th: 'ยาลูปออกฤทธิ์นานที่ใช้ในญี่ปุ่น (Diart) สำหรับบวมจากหัวใจ ไต และตับ ฉลากเตือนเรื่องอิเล็กโทรไลต์ผิดปกติและเม็ดเลือดขาวต่ำ/แอกรานูโลไซโทซิส ห้ามใช้ในภาวะไม่มีปัสสาวะและโคม่าจากตับ' }),
  D('canrenoate', 'Potassium canrenoate', 'โพแทสเซียมแคนรีโนเอต', 'mra', ['cd'], 'Mineralocorticoid receptor', '≈2%',
    [['IV', '100–200 mg slowly IV 1–2 times/day (Japan label); max 600 mg/day, usually ≤ 2 weeks']],
    { na: -1, k: 1, mg: 0, ca: 0, hco3: -1 }, ['hyperK', 'gyn', 'aki'],
    { en: 'IV mineralocorticoid antagonist (prodrug of canrenone) sold in Japan, Italy and Germany. Contraindicated in renal failure, risk of hyperkalemia, Addison disease and with eplerenone. Check K⁺ regularly.', th: 'ยาต้านมิเนอรัลโลคอร์ติคอยด์ชนิดฉีด (prodrug ของ canrenone) มีจำหน่ายในญี่ปุ่น อิตาลี และเยอรมนี ห้ามใช้ในไตวาย เสี่ยงโพแทสเซียมสูง โรค Addison และร่วมกับ eplerenone ตรวจ K⁺ สม่ำเสมอ' }),
  D('esaxerenone', 'Esaxerenone', 'เอซาเซเรโนน', 'mra', ['cd'], 'Mineralocorticoid receptor', 'Minimal',
    [['PO', 'HTN 2.5 mg OD; may increase to 5 mg (Japan label)']],
    { na: 0, k: 1, mg: 0, ca: 0, hco3: 0 }, ['hyperK'],
    { en: 'Non-steroidal MRA approved in Japan (Minebro) for hypertension, not a diuretic. Do not start if K⁺ > 5.0 mEq/L or eGFR < 30. Check K⁺ before, within 2 weeks of starting or changing the dose, and at about 1 month. Contraindicated with eplerenone, K-sparing diuretics and K supplements.', th: 'MRA ชนิดไม่ใช่สเตียรอยด์ อนุมัติในญี่ปุ่น (Minebro) สำหรับความดันสูง ไม่ใช่ยาขับปัสสาวะ ห้ามเริ่มถ้า K⁺ > 5.0 mEq/L หรือ eGFR < 30 ตรวจ K⁺ ก่อนเริ่ม ภายใน 2 สัปดาห์หลังเริ่มหรือปรับขนาด และที่ราว 1 เดือน ห้ามใช้ร่วมกับ eplerenone ยาขับปัสสาวะประหยัดโพแทสเซียม และโพแทสเซียมเสริม' }),
];
const DRUG = Object.fromEntries(DRUGS.map(d => [d.id, d]));

// Thai NLEM 2569 (2026) list, checked row by row against media.xlsx (group 2.2 Diuretics, plus acetazolamide under
// 11.4 glaucoma). All five are the Basic (b) category. A drug not in the list is Non-NLEM; forms listed are in `f`.
const NLEM = {
  furosemide: { f: 'tab, sterile sol' }, hctz: { f: 'tab' }, mannitol: { f: 'sterile sol' }, spironolactone: { f: 'tab' },
  acetazolamide: { f: 'tab (listed under glaucoma, 11.4)' },
};
const NLEM_EXTRA = { amiloride: { en: 'Only the combination amiloride 5 mg + HCTZ 50 mg tab is listed (Basic).', th: 'ขึ้นบัญชีเฉพาะยาผสม amiloride 5 mg + HCTZ 50 mg tab (พื้นฐาน)' } };
// Country availability: 1 = confirmed. Only TH for the NLEM-listed drugs; everything else is unknown (N/A).
// Thai brands listed in MIMS Thailand (checked 2026-11-04, signed in). Drugs with "Brand information not available"
// in MIMS (bumetanide, torsemide, ethacrynic acid, chlorothiazide, metolazone, eplerenone, amiloride, triamterene) have none.
const BRANDS = {
  furosemide: 'Dirine, Femide, Furetic, Furide, Furosemide Injection T P', acetazolamide: 'Diamox, Medene',
  hctz: 'Dichlotride, Diric, Diuret-P, Dragotab, Hychlozide, Hydrozide, Urazide, GPO, T.O., Union Drug', mannitol: 'Mannitol Thai Otsuka, Unitol 20%',
  spironolactone: 'Hyles', chlorthalidone: 'Chotalin', indapamide: 'Natrilix SR', tolvaptan: 'Jinarc, Samsca, Saptan 15',
  empagliflozin: 'Jardiance, Emdiance, Emflodiaz, Empabit, Emze, Goempa',
};
// Registration status per country: 'current' | 'past' (was registered, now withdrawn) | 'never'; missing = N/A (not found
// in the source below, or not checked). Sources, all checked 2026-11-04: TH = NLEM 2569 or a MIMS Thailand brand;
// US = openFDA drugsfda (the original 18 all have a Prescription product; Discontinued only = past; no FDA record = never);
// UK = emc (medicines.org.uk); EU = Spain AEMPS CIMA, the EMA lists of nationally authorised products and German / Italian /
// Swedish sources (EU current = marketed in at least one member state); JP = KEGG MEDICUS (JAPIC prescription products).
// A drug with no UK / EU / JP entry was not found there; it may have been withdrawn.
const C = 'current', ALL = { uk: C, eu: C, jp: C };
const REG_X = {
  acetazolamide: ALL, mannitol: ALL, furosemide: ALL, torsemide: ALL, indapamide: ALL, spironolactone: ALL, eplerenone: ALL, tolvaptan: ALL, dapagliflozin: ALL, empagliflozin: ALL,
  bumetanide: { uk: C, eu: C }, ethacrynic: { eu: C }, hctz: { eu: C, jp: C }, chlorthalidone: { uk: C, eu: C }, metolazone: { uk: C, eu: C },
  amiloride: { uk: C, eu: C }, triamterene: { eu: C },
  bendroflumethiazide: { us: 'past', uk: C, eu: C }, xipamide: { us: 'never', eu: C }, canrenoate: { us: 'never', eu: C, jp: C },
  trichlormethiazide: { us: 'past', jp: C }, azosemide: { us: 'never', jp: C }, esaxerenone: { us: 'never', jp: C },
};
// Extra caveats per drug (shown under Availability)
const REG_NOTE = {
  amiloride: { en: 'EU: sold as a combination with HCTZ (Spain). UK: single-ingredient tablet and oral solution too.', th: 'EU: จำหน่ายเป็นยาผสมกับ HCTZ (สเปน) UK: มีทั้งยาเดี่ยวชนิดเม็ดและน้ำ' },
  triamterene: { en: 'EU: combination with HCTZ only (Spain, Germany). Not found on emc (UK).', th: 'EU: มีเฉพาะยาผสมกับ HCTZ (สเปน เยอรมนี) ไม่พบใน emc (UK)' },
  hctz: { en: 'UK: only combinations on emc; no licensed single-ingredient tablet was found.', th: 'UK: พบเฉพาะยาผสมใน emc ไม่พบยาเดี่ยวที่ขึ้นทะเบียน' },
  canrenoate: { en: 'IV only. EU evidence is Italy (Kanrenol) and Germany; not found on emc (UK).', th: 'ชนิดฉีดเท่านั้น หลักฐาน EU คืออิตาลี (Kanrenol) และเยอรมนี ไม่พบใน emc (UK)' },
};
// MIMS Thailand not searched (the 6 drugs added from UK / EU / JP sources) or unusable page (dapagliflozin): Thai status is N/A.
const MIMS_UNCHECKED = new Set(['dapagliflozin', 'bendroflumethiazide', 'xipamide', 'trichlormethiazide', 'azosemide', 'canrenoate', 'esaxerenone']);
const TH_OK = new Set([...Object.keys(NLEM), ...Object.keys(BRANDS)]);
const REG = Object.fromEntries(DRUGS.map(d => [d.id, { us: C, ...(TH_OK.has(d.id) ? { th: C } : {}), ...REG_X[d.id] }]));
const stOf = (d, c) => (REG[d.id] && REG[d.id][c]) || null;
const COUNTRIES = ['th', 'us', 'uk', 'eu', 'jp'];
const CTRY = {
  th: { on: 'bg-emerald-600 text-white shadow-sm', off: 'text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10', chip: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-300', name: ['Thailand', 'ไทย'] },
  us: { on: 'bg-blue-600 text-white shadow-sm', off: 'text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/10', chip: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-400/30 dark:bg-blue-500/10 dark:text-blue-300', name: ['United States', 'สหรัฐอเมริกา'] },
  uk: { on: 'bg-rose-600 text-white shadow-sm', off: 'text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-500/10', chip: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-300', name: ['United Kingdom', 'สหราชอาณาจักร'] },
  eu: { on: 'bg-amber-500 text-white shadow-sm', off: 'text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-500/10', chip: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-300', name: ['European Union', 'สหภาพยุโรป'] },
  jp: { on: 'bg-violet-600 text-white shadow-sm', off: 'text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-500/10', chip: 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-400/30 dark:bg-violet-500/10 dark:text-violet-300', name: ['Japan', 'ญี่ปุ่น'] },
};

const ELECTROLYTES = [
  { k: 'na', l: 'Na⁺' }, { k: 'k', l: 'K⁺' }, { k: 'mg', l: 'Mg²⁺' }, { k: 'ca', l: 'Ca²⁺' }, { k: 'hco3', l: 'HCO₃⁻' },
];
// quick filter chips: [electrolyte, direction]
const FX_FILTERS = [['k', -1], ['k', 1], ['na', -1], ['na', 1], ['mg', -1], ['ca', 1], ['ca', -1], ['hco3', 1], ['hco3', -1]];

/* ---------- Strings ---------- */
const TXT = {
  title: ['Diuretics Guide', 'คู่มือยาขับปัสสาวะ'],
  sub: ['Doses, electrolyte effects and sites of action', 'ขนาดยา ผลต่ออิเล็กโทรไลต์ และตำแหน่งออกฤทธิ์'],
  made: ['Made with ❤️ by Wardom', 'สร้างด้วย ❤️ โดย Wardom'],
  disc: ['For clinician reference. Check local protocols and the patient before prescribing.', 'ใช้อ้างอิงสำหรับบุคลากรทางการแพทย์ ตรวจสอบแนวปฏิบัติของโรงพยาบาลและผู้ป่วยก่อนสั่งยา'],
  search: ['Search drug, class or target…', 'ค้นหายา กลุ่มยา หรือเป้าหมาย…'],
  mech: ['Mechanism', 'กลไก'], resist: ['Diuretic resistance', 'ดื้อยาขับปัสสาวะ'], key: ['Key', 'คำอธิบาย'],
  all: ['All', 'ทั้งหมด'], any: ['Any effect', 'ทุกผล'],
  tile: ['Tile', 'การ์ด'], list: ['List', 'รายการ'], table: ['Table', 'ตาราง'],
  sort: ['Sort', 'เรียง'], byClass: ['Class', 'กลุ่มยา'], byName: ['Name', 'ชื่อยา'], bySite: ['Site', 'ตำแหน่ง'],
  showing: ['Showing', 'แสดง'], of: ['of', 'จาก'], drugs: ['drugs', 'ชนิด'], clear: ['Clear', 'ล้าง'],
  select: ['Select', 'เลือก'], selected: ['Selected', 'เลือกแล้ว'], nsel: ['selected', 'รายการที่เลือก'],
  none: ['No drug matches these filters.', 'ไม่พบยาที่ตรงกับตัวกรอง'],
  dose: ['Dose', 'ขนาดยา'], site: ['Site of action', 'ตำแหน่งออกฤทธิ์'], target: ['Target', 'เป้าหมาย'], fena: ['Filtered Na⁺ blocked', 'Na⁺ ที่ถูกกั้น'],
  elec: ['Electrolyte effect', 'ผลต่ออิเล็กโทรไลต์'], se: ['Side effects', 'ผลข้างเคียง'], pearl: ['Clinical pearl', 'ข้อควรรู้'],
  noMajor: ['No major electrolyte effect', 'ไม่มีผลต่ออิเล็กโทรไลต์ที่สำคัญ'],
  showNeph: ['Show on nephron', 'แสดงบนเนฟรอน'],
  close: ['Close', 'ปิด'], theme: ['Toggle dark mode', 'สลับโหมดมืด'],
  mechHint: ['Tick drugs on the cards to highlight where they act. Nothing is selected yet.', 'ติ๊กเลือกยาในการ์ดเพื่อไฮไลต์ตำแหน่งที่ออกฤทธิ์ ตอนนี้ยังไม่ได้เลือกยา'],
  pickDrugs: ['Drugs (tap to add / remove)', 'ยา (แตะเพื่อเพิ่ม/ลบ)'],
  actsHere: ['Acts here', 'ออกฤทธิ์ที่นี่'],
  glom: ['Glomerulus', 'โกลเมอรูลัส'], cortex: ['CORTEX', 'เปลือกไต'], medulla: ['MEDULLA', 'ไขสันหลังไต'],
  source: ['Sources', 'แหล่งอ้างอิง'],
  details: ['Details', 'รายละเอียด'], searchOpen: ['Search', 'ค้นหา'], filters: ['Filters', 'ตัวกรอง'], countries: ['Countries', 'ประเทศ'], nlemOnly: ['NLEM only', 'เฉพาะ NLEM'], nlemTitle: ['Only drugs on the Thai NLEM 2569 list', 'เฉพาะยาในบัญชียาหลักแห่งชาติ 2569'],
  discLink: ['Decision support only: read the disclaimer', 'เป็นเครื่องมือช่วยตัดสินใจเท่านั้น: อ่านข้อจำกัด'], discBody: ['For adult clinicians only. This guide supports decisions and does not replace clinical judgement, the product label or your local protocol. Check doses, renal function and electrolytes for each patient before prescribing.', 'สำหรับบุคลากรทางการแพทย์ที่ดูแลผู้ใหญ่เท่านั้น คู่มือนี้ช่วยการตัดสินใจ ไม่ได้แทนวิจารณญาณทางคลินิก ฉลากยา หรือแนวปฏิบัติของโรงพยาบาล ตรวจขนาดยา การทำงานของไต และอิเล็กโทรไลต์ของผู้ป่วยทุกครั้งก่อนสั่งยา'],
  keyTitle: ['Explains every chip, mark and colour', 'อธิบายป้าย สัญลักษณ์ และสี'], inDb: ['in database', 'ในฐานข้อมูล'],
  nlem: ['NLEM', 'บัญชียาหลักฯ'], avail: ['Availability', 'การจดทะเบียน/มีจำหน่าย'],
  ctryNote: ['Checked 2026-11-04: Thailand (NLEM or MIMS brand), US (openFDA), UK (emc), EU (Spain AEMPS, EMA lists, national sources), JP (KEGG / JAPIC). N/A = not found there or not checked; it may have been withdrawn.', 'ตรวจเมื่อ 2026-11-04: ไทย (NLEM หรือยี่ห้อ MIMS) สหรัฐฯ (openFDA) UK (emc) EU (สเปน AEMPS รายการ EMA และแหล่งระดับประเทศ) ญี่ปุ่น (KEGG / JAPIC) N/A = ไม่พบหรือยังไม่ได้ตรวจ อาจถูกถอนทะเบียนแล้ว'],
  st_current: ['Registered now', 'ขึ้นทะเบียนอยู่'], st_past: ['Previously registered', 'เคยขึ้นทะเบียน'], st_never: ['Never registered', 'ไม่เคยขึ้นทะเบียน'], st_unk: ['Not verified (N/A)', 'ยังไม่ตรวจสอบ (N/A)'],
  fdaStatus: ['FDA status', 'สถานะ อย.'], fCur: ['Current', 'ปัจจุบัน'], fPast: ['Past †', 'เคยมี †'], fNever: ['Never ⊘', 'ไม่เคยมี ⊘'],
  brandsT: ['Thai brands (MIMS Thailand)', 'ยี่ห้อในประเทศไทย (MIMS Thailand)'], brandUnchk: ['Not checked.', 'ยังไม่ได้ตรวจ'], noBrand: ['No Thai brand listed in MIMS Thailand.', 'MIMS Thailand ไม่มียี่ห้อในไทยที่ระบุ'],
  nlemNote: ['Thai NLEM 2569 (2026): the drug is not on the list.', 'บัญชียาหลักแห่งชาติ 2569: ไม่มียานี้ในบัญชี'],
};
const KEY_ROWS = [
  ['K⁺↓', { en: 'Lowers the serum level', th: 'ลดระดับในเลือด' }, 'sky'],
  ['K⁺↑', { en: 'Raises the serum level', th: 'เพิ่มระดับในเลือด' }, 'orange'],
  ['Na⁺↕', { en: 'Variable effect', th: 'ผลไม่แน่นอน' }, 'violet'],
  ['—', { en: 'No major effect', th: 'ไม่มีผลสำคัญ' }, 'slate'],
];

/* ---------- Small helpers ---------- */
const FX_STYLE = {
  '-1': 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-400/30',
  '1': 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:border-orange-400/30',
  v: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-400/30',
  '0': 'bg-slate-50 text-slate-400 border-slate-200 dark:bg-transparent dark:text-slate-500 dark:border-[#263449]',
};
const ARROW = { '-1': '↓', '1': '↑', v: '↕', '0': '—' };
const SURF = 'bg-white dark:bg-[#151f32] border-slate-200 dark:border-[#263449]';
const INSET = 'bg-slate-50 dark:bg-[#101a2b] border-slate-200 dark:border-[#263449]';
const BTN_ON = 'bg-indigo-600 text-white border-indigo-600 shadow-sm';
const BTN_OFF = 'bg-white dark:bg-[#151f32] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#263449] hover:bg-slate-50 dark:hover:bg-[#101a2b]';
const MUTED = 'text-slate-500 dark:text-slate-400';

function EffChip({ k, v, bare }) {
  const e = ELECTROLYTES.find(x => x.k === k);
  return <span title={e.l + ' ' + ARROW[v]} className={'inline-flex items-center gap-0.5 rounded border px-1 py-px text-[10px] font-bold whitespace-nowrap ' + FX_STYLE[v]}>{e.l}{ARROW[v]}</span>;
}
function ClassChip({ c, lang }) {
  return <span className={'inline-flex rounded border px-1 py-px text-[10px] font-bold whitespace-nowrap ' + CLS[c].chip}>{CLS[c].s[lang]}</span>;
}
function SiteChips({ d, lang }) {
  return <>{d.sites.map(s => <span key={s} className="inline-flex rounded border px-1 py-px text-[10px] font-bold whitespace-nowrap bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-400/30">{s.toUpperCase()}</span>)}</>;
}
function NlemChip({ d, lang }) {
  const c = NLEM[d.id];
  return <span title={c ? 'NLEM 2569: ' + c.f : TXT.nlemNote[lang === 'th' ? 1 : 0]} className={'inline-flex rounded border px-1 py-px text-[10px] font-bold whitespace-nowrap ' + (c ? CTRY.th.chip : 'border-slate-200 text-slate-500 dark:border-[#263449] dark:text-slate-400')}>{c ? (lang === 'th' ? 'NLEM · พื้นฐาน (b)' : 'NLEM · Basic (b)') : (lang === 'th' ? 'ไม่อยู่ใน NLEM' : 'Non-NLEM')}</span>;
}
function CountryChips({ d, lang }) {
  return <>{COUNTRIES.map(c => {
    const st = stOf(d, c);
    const cls = st === 'current' ? CTRY[c].chip : st === 'past' ? 'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-300' : 'border-slate-200 text-slate-400 dark:border-[#263449] dark:text-slate-500';
    return <span key={c} title={CTRY[c].name[lang === 'th' ? 1 : 0] + ': ' + TXT['st_' + (st || 'unk')][lang === 'th' ? 1 : 0]} className={'text-[10px] font-bold rounded border px-1 py-px leading-none whitespace-nowrap ' + cls}>{c.toUpperCase()}{st === 'past' ? ' †' : st === 'never' ? ' ⊘' : st ? '' : ' ?'}</span>;
  })}</>;
}
function Effects({ d, showZero }) {
  const items = ELECTROLYTES.filter(e => showZero || d.fx[e.k] !== 0);
  if (!items.length) return null;
  return <div className="flex flex-wrap gap-1">{items.map(e => <EffChip key={e.k} k={e.k} v={String(d.fx[e.k])} />)}</div>;
}
const doseLine = (d) => d.dose.map(x => x[0] + ': ' + x[1]).join(' · ');

function Fold({ title, color, children, open }) {
  const [o, setO] = useState(open !== false);
  return (
    <div className={'rounded-xl border border-l-4 ' + SURF + ' ' + color}>
      <button type="button" onClick={() => setO(!o)} aria-expanded={o} className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left">
        <span className="text-sm font-extrabold">{title}</span>
        <span className={'text-xs ' + MUTED}>{o ? '▾' : '▸'}</span>
      </button>
      {o && <div className="px-3 pb-3 text-[12px] leading-relaxed">{children}</div>}
    </div>
  );
}

function Modal({ title, onClose, children, lang }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} onClick={e => e.stopPropagation()}
        className={'w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border shadow-xl animate-in fade-in zoom-in-95 ' + SURF}>
        <div className={'sticky top-0 z-10 flex items-center justify-between gap-2 px-4 py-3 border-b ' + SURF}>
          <h2 className="text-base md:text-lg font-extrabold">{title}</h2>
          <button type="button" onClick={onClose} aria-label={TXT.close[lang === 'th' ? 1 : 0]} title={TXT.close[lang === 'th' ? 1 : 0]} className={'rounded-lg border px-2.5 py-1 text-sm font-bold ' + BTN_OFF}>✕</button>
        </div>
        <div className="p-4 space-y-3">{children}</div>
      </div>
    </div>
  );
}

/* ---------- Nephron diagram ---------- */
// geometry per segment: [path, stroke width] pieces
const GEO = {
  pct: [['M70 88 C36 106 104 124 70 144 C36 164 104 182 70 202', 16]],
  dl: [['M70 202 L70 360 Q70 392 110 392 Q150 392 150 360 L150 312', 8]],
  tal: [['M150 312 L150 214', 16]],
  dct: [['M150 214 C150 180 214 206 214 166 C214 138 250 150 262 128', 14]],
  cd: [['M262 118 L262 392', 18]],
};
const LABEL = {
  pct: { x: 106, y: 150, a: 'start', t: 'PCT' },
  dl: { x: 82, y: 300, a: 'start', t: 'Desc.', t2: 'limb' },
  tal: { x: 164, y: 268, a: 'start', t: 'TAL' },
  dct: { x: 160, y: 168, a: 'start', t: 'DCT' },
  cd: { x: 250, y: 330, a: 'end', t: 'Collecting', t2: 'duct' },
};

function Nephron({ ids, lang }) {
  const ds = ids.map(i => DRUG[i]);
  const hit = {};
  ds.forEach(d => d.sites.forEach(s => { (hit[s] = hit[s] || []).push(d); }));
  const any = ds.length > 0;
  return (
    <svg viewBox="0 0 340 430" className="w-full max-w-sm mx-auto" role="img" aria-label="Nephron">
      <rect x="0" y="0" width="340" height="236" rx="10" className="fill-rose-50 dark:fill-rose-950/30" />
      <rect x="0" y="236" width="340" height="194" rx="10" className="fill-slate-100 dark:fill-slate-800/40" />
      <text x="330" y="16" textAnchor="end" className="fill-slate-400 dark:fill-slate-500" fontSize="9" fontWeight="700">{TXT.cortex[lang === 'th' ? 1 : 0]}</text>
      <text x="330" y="252" textAnchor="end" className="fill-slate-400 dark:fill-slate-500" fontSize="9" fontWeight="700">{TXT.medulla[lang === 'th' ? 1 : 0]}</text>
      <circle cx="70" cy="62" r="28" className="fill-white dark:fill-[#151f32] stroke-slate-300 dark:stroke-slate-600" strokeWidth="2" />
      <circle cx="70" cy="62" r="14" className="fill-rose-300 dark:fill-rose-500/60" />
      <text x="104" y="58" className="fill-slate-500 dark:fill-slate-400" fontSize="10">{TXT.glom[lang === 'th' ? 1 : 0]}</text>
      {SEGS.map(s => {
        const hs = hit[s];
        const on = !!hs;
        const color = on ? CLS[hs[0].cls].hex : null;
        return (
          <g key={s} opacity={any && !on ? 0.3 : 1}>
            {GEO[s].map((p, i) => (
              <path key={i} d={p[0]} fill="none" strokeWidth={p[1]} strokeLinecap="round" strokeLinejoin="round"
                className={on ? '' : 'stroke-slate-300 dark:stroke-slate-600'}
                style={on ? { stroke: color, filter: 'drop-shadow(0 0 5px ' + color + ')' } : undefined} />
            ))}
          </g>
        );
      })}
      {SEGS.map(s => {
        const l = LABEL[s];
        return (
          <text key={s} x={l.x} y={l.y} textAnchor={l.a} fontSize="11" fontWeight="800" className="fill-slate-700 dark:fill-slate-200">
            {l.t}{l.t2 && <tspan x={l.x} dy="12" fontWeight="600" fontSize="10">{l.t2}</tspan>}
          </text>
        );
      })}
      {SEGS.filter(s => hit[s]).map(s => {
        const l = LABEL[s];
        const cx = l.a === 'end' ? l.x - 6 : l.x + 34;
        return hit[s].slice(0, 4).map((d, i) => <circle key={s + d.id} cx={cx + (l.a === 'end' ? -i * 10 : i * 10)} cy={l.y - 4 + (l.t2 ? 6 : 0)} r="4" fill={CLS[d.cls].hex} />);
      })}
    </svg>
  );
}

function MechanismModal({ sel, toggle, clear, onClose, lang }) {
  const t = (k) => TXT[k][lang === 'th' ? 1 : 0];
  const ids = [...sel];
  return (
    <Modal title={t('mech')} onClose={onClose} lang={lang}>
      <div className="grid md:grid-cols-2 gap-4 items-start">
        <Nephron ids={ids} lang={lang} />
        <div className="space-y-3">
          {ids.length === 0 && <p className={'text-[12px] ' + MUTED}>{t('mechHint')}</p>}
          {ids.map(id => {
            const d = DRUG[id];
            return (
              <div key={id} className={'rounded-xl border p-2.5 ' + INSET} style={{ borderLeft: '4px solid ' + CLS[d.cls].hex }}>
                <div className="flex items-center gap-1.5 flex-wrap"><span className="font-extrabold text-sm">{lang === 'th' ? d.th : d.name}</span><ClassChip c={d.cls} lang={lang} /></div>
                <div className="text-[11px] mt-1"><b>{t('site')}:</b> {d.sites.map(s => SEG_NAME[s][lang]).join(', ')}</div>
                <div className="text-[11px]"><b>{t('target')}:</b> {d.target}</div>
                <div className="text-[11px]"><b>{t('fena')}:</b> {d.fena}</div>
              </div>
            );
          })}
          <div>
            <div className={'text-[10px] font-bold uppercase tracking-wide mb-1 ' + MUTED}>{t('pickDrugs')}</div>
            <div className="flex flex-wrap gap-1">
              {DRUGS.map(d => <button key={d.id} type="button" onClick={() => toggle(d.id)} aria-pressed={sel.has(d.id)}
                className={'rounded border px-1.5 py-0.5 text-[10px] font-bold ' + (sel.has(d.id) ? BTN_ON : BTN_OFF)}>{d.name.split(' ')[0]}</button>)}
            </div>
            {ids.length > 0 && <button type="button" onClick={clear} className={'mt-2 rounded-lg border px-2 py-1 text-[11px] font-bold ' + BTN_OFF}>{t('clear')}</button>}
          </div>
        </div>
      </div>
      <div className={'rounded-xl border p-2.5 text-[11px] ' + INSET}>
        <div className={'text-[10px] font-bold uppercase tracking-wide mb-1 ' + MUTED}>{t('actsHere')}</div>
        {SEGS.map(s => (
          <div key={s} className="flex gap-2 py-0.5"><b className="shrink-0 w-24">{s.toUpperCase()}</b>
            <span className="flex flex-wrap gap-1">{[...new Set(DRUGS.filter(d => d.sites.includes(s)).map(d => d.cls))].map(c => <ClassChip key={c} c={c} lang={lang} />)}</span></div>
        ))}
      </div>
    </Modal>
  );
}

/* ---------- Diuretic resistance ---------- */
const R = {
  def: [
    ['Diuretic resistance = too little natriuresis or decongestion despite an adequate loop dose. A practical check after an IV loop dose: spot urine Na⁺ < 50–70 mmol/L at 2 h, or urine output < 100–150 mL/h over the first 6 h.',
     'ดื้อยาขับปัสสาวะ = ขับโซเดียมหรือลดบวมได้ไม่พอแม้ได้ยาลูปขนาดเหมาะสม วิธีเช็คหลังให้ลูป IV: Na⁺ ในปัสสาวะ (spot) < 50–70 mmol/L ที่ 2 ชม. หรือปัสสาวะ < 100–150 mL/ชม. ใน 6 ชม.แรก'],
  ],
  check: [
    ['Non-adherence; high Na⁺ intake (aim < 2 g Na⁺/day)', 'ไม่ได้กินยา / กินเค็ม (เป้า Na⁺ < 2 g/วัน)'],
    ['NSAIDs / COX-2 inhibitors (block prostaglandin-driven natriuresis)', 'NSAIDs / COX-2 (ลดการขับ Na⁺ ที่อาศัยพรอสตาแกลนดิน)'],
    ['Poor absorption (gut edema): switch to IV, bumetanide or torsemide', 'ดูดซึมไม่ดี (ลำไส้บวม): เปลี่ยนเป็น IV, bumetanide หรือ torsemide'],
    ['Dose below the ceiling or once-daily dosing → post-diuretic Na⁺ retention', 'ขนาดต่ำกว่า ceiling หรือให้วันละครั้ง → Na⁺ ถูกเก็บกลับหลังยาหมด'],
    ['Low eGFR, nephrotic syndrome (albumin binds drug), low-output state, hypotension', 'eGFR ต่ำ, nephrotic (อัลบูมินจับยา), cardiac output ต่ำ, ความดันต่ำ'],
    ['Distal nephron hypertrophy after chronic loop use (the "braking" phenomenon)', 'เนฟรอนส่วนปลายโตจากใช้ลูปนาน (braking phenomenon)'],
  ],
  steps: [
    { segs: ['tal'], c: 'border-l-blue-500', ids: ['furosemide'],
      t: ['Step 1: Optimise the loop (TAL)', 'ขั้น 1: ปรับยาลูป (TAL)'],
      b: ['Give IV; double the dose until the response threshold, e.g. furosemide 40 → 80 → 160 mg IV (bolus ceiling ≈ 160–200 mg). Split BID, or bolus then infusion 10–20 mg/h. Typical ceiling bolus: normal kidney 40 mg, CKD 80–160 mg, HF 40–160 mg IV furosemide. Reassess urine Na⁺ / output at 2 and 6 h.',
          'ให้ IV; เพิ่มขนาดเป็น 2 เท่าจนได้ผล เช่น furosemide 40 → 80 → 160 mg IV (ceiling ≈ 160–200 mg) แบ่งวันละ 2 ครั้ง หรือ bolus แล้วหยดต่อ 10–20 mg/ชม. ceiling โดยทั่วไป: ไตปกติ 40 mg, CKD 80–160 mg, HF 40–160 mg IV ประเมิน Na⁺ ปัสสาวะ/ปริมาณปัสสาวะที่ 2 และ 6 ชม.'] },
    { segs: ['tal', 'dct'], c: 'border-l-emerald-500', ids: ['furosemide', 'metolazone'],
      t: ['Step 2: Add a thiazide-type (DCT)', 'ขั้น 2: เพิ่มยาไทอาไซด์ (DCT)'],
      b: ['Metolazone 2.5–10 mg PO, or HCTZ 25–100 mg PO, or chlorothiazide 500–1000 mg IV, 30 min before the loop. Blocks the distal Na⁺ reabsorption that rises when the loop is blocked. Use for 1–3 days; check Na⁺, K⁺, Mg²⁺, creatinine daily (profound K⁺/Na⁺ loss is common).',
          'Metolazone 2.5–10 mg PO หรือ HCTZ 25–100 mg PO หรือ chlorothiazide 500–1000 mg IV ก่อนยาลูป 30 นาที ปิดกั้นการดูดกลับ Na⁺ ส่วนปลายที่เพิ่มขึ้นเมื่อลูปถูกกั้น ใช้ 1–3 วัน ตรวจ Na⁺, K⁺, Mg²⁺, creatinine ทุกวัน (เสีย K⁺/Na⁺ มากได้บ่อย)'] },
    { segs: ['pct'], c: 'border-l-violet-500', ids: ['furosemide', 'metolazone', 'acetazolamide'],
      t: ['Step 3: Add acetazolamide (PCT)', 'ขั้น 3: เพิ่ม acetazolamide (PCT)'],
      b: ['250–500 mg IV or PO daily for 1–3 days (ADVOR used 500 mg IV daily with the loop and improved decongestion). Most useful with metabolic alkalosis (HCO₃⁻ > 27). Watch for non-gap acidosis and hypokalemia.',
          '250–500 mg IV หรือ PO วันละครั้ง 1–3 วัน (ADVOR ใช้ 500 mg IV วันละครั้งร่วมกับลูป ลดบวมได้ดีขึ้น) เหมาะสุดเมื่อมีภาวะด่าง (HCO₃⁻ > 27) ระวังภาวะกรดชนิด non-gap และโพแทสเซียมต่ำ'] },
    { segs: ['cd'], c: 'border-l-orange-500', ids: ['furosemide', 'metolazone', 'acetazolamide', 'spironolactone'],
      t: ['Step 4: Add MRA (CD), consider SGLT2i', 'ขั้น 4: เพิ่ม MRA (CD) พิจารณา SGLT2i'],
      b: ['Spironolactone 25–100 mg daily (cirrhosis 100–400 mg). Counters K⁺ loss from the other blocks; check K⁺ and creatinine. SGLT2i adds mild natriuresis and outcome benefit in HF / CKD.',
          'Spironolactone 25–100 mg วันละครั้ง (ตับแข็ง 100–400 mg) ช่วยลดการเสีย K⁺ จากยาตัวอื่น ตรวจ K⁺ และ creatinine ส่วน SGLT2i ช่วยขับ Na⁺ เล็กน้อยและลดผลลัพธ์ร้ายใน HF/CKD'] },
    { segs: [], c: 'border-l-rose-500', ids: [],
      t: ['Step 5: Extracorporeal', 'ขั้น 5: การกรองนอกร่างกาย'],
      b: ['Ultrafiltration or renal replacement therapy when congestion persists despite sequential blockade, or with refractory hyperkalemia / acidosis / uremia.', 'Ultrafiltration หรือ RRT เมื่อยังบวมแม้ปิดกั้นตามลำดับแล้ว หรือมี K⁺ สูง/กรด/ยูเรียคั่งที่แก้ไม่ได้'] },
  ],
  mon: [
    ['Daily: weight, intake / output, Na⁺, K⁺ (keep ≥ 4.0), Mg²⁺ (keep ≥ 2.0 mg/dL in HF), HCO₃⁻, creatinine.', 'ทุกวัน: น้ำหนัก, intake/output, Na⁺, K⁺ (คง ≥ 4.0), Mg²⁺ (คง ≥ 2.0 mg/dL ใน HF), HCO₃⁻, creatinine'],
    ['Stop or reduce the added drug for Na⁺ < 125 mmol/L, K⁺ < 3.0, symptomatic hypotension or a rapid creatinine rise.', 'หยุดหรือลดยาที่เพิ่ม เมื่อ Na⁺ < 125 mmol/L, K⁺ < 3.0, ความดันต่ำมีอาการ หรือ creatinine ขึ้นเร็ว'],
  ],
  src: 'Mullens W et al. Eur J Heart Fail 2019;21:137 (ESC HFA position statement on diuretics); Mullens W et al. NEJM 2022;387:1185 (ADVOR); Brater DC. NEJM 1998;339:387. Doses are typical adult values; verify against your local protocol.',
};

function ResistanceModal({ onClose, lang, showCombo }) {
  const i = lang === 'th' ? 1 : 0;
  return (
    <Modal title={TXT.resist[i]} onClose={onClose} lang={lang}>
      <p className="text-[12px] leading-relaxed">{R.def[0][i]}</p>
      <Fold title={i ? 'ตรวจสอบก่อนเพิ่มยา' : 'Check first'} color="border-l-amber-500">
        <ul className="list-disc pl-4 space-y-1">{R.check.map((x, k) => <li key={k}>{x[i]}</li>)}</ul>
      </Fold>
      <div className={'text-[10px] font-bold uppercase tracking-wide ' + MUTED}>{i ? 'บันไดการปิดกั้นเนฟรอนตามลำดับ' : 'Sequential nephron blockade ladder'}</div>
      {R.steps.map((s, k) => (
        <Fold key={k} title={s.t[i]} color={s.c}>
          <div className="flex gap-1 mb-1.5">{s.segs.map(g => <span key={g} className="rounded border px-1 py-px text-[10px] font-bold bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-400/30">{g.toUpperCase()}</span>)}</div>
          <p>{s.b[i]}</p>
          {s.ids.length > 0 && <button type="button" onClick={() => showCombo(s.ids)} className="mt-2 rounded-lg border px-2.5 py-1 text-[11px] font-bold bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-400/30 dark:text-indigo-300">{TXT.showNeph[i]}</button>}
        </Fold>
      ))}
      <Fold title={i ? 'การติดตาม' : 'Monitoring and safety'} color="border-l-rose-500">
        <ul className="list-disc pl-4 space-y-1">{R.mon.map((x, k) => <li key={k}>{x[i]}</li>)}</ul>
      </Fold>
      <p className={'text-[10px] leading-snug ' + MUTED}><b>{TXT.source[i]}:</b> {R.src}</p>
    </Modal>
  );
}

/* ---------- Detail, Key, Changelog ---------- */
function DetailModal({ d, onClose, lang, showOne }) {
  const i = lang === 'th' ? 1 : 0;
  const t = (k) => TXT[k][i];
  return (
    <Modal title={i ? d.th : d.name} onClose={onClose} lang={lang}>
      <div className="flex flex-wrap items-center gap-1.5">
        <ClassChip c={d.cls} lang={lang} /><SiteChips d={d} lang={lang} />
        <span className={'text-[11px] ' + MUTED}>{i ? d.name : d.th}</span>
      </div>
      <Fold title={t('dose')} color="border-l-indigo-500">
        {d.dose.map((x, k) => <div key={k} className="py-0.5"><b>{x[0]}</b> {x[1]}</div>)}
      </Fold>
      <Fold title={t('site')} color="border-l-emerald-500">
        <div>{d.sites.map(s => SEG_NAME[s][lang]).join(', ')}</div>
        <div><b>{t('target')}:</b> {d.target}</div>
        <div><b>{t('fena')}:</b> {d.fena}</div>
        <button type="button" onClick={() => showOne(d.id)} className="mt-2 rounded-lg border px-2.5 py-1 text-[11px] font-bold bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-400/30 dark:text-indigo-300">{t('showNeph')}</button>
      </Fold>
      <Fold title={t('elec')} color="border-l-sky-500">
        <Effects d={d} showZero />
      </Fold>
      <Fold title={t('se')} color="border-l-rose-500">
        <ul className="list-disc pl-4 space-y-0.5">{d.se.map(s => <li key={s}>{SE[s][i]}</li>)}</ul>
      </Fold>
      <Fold title={t('pearl')} color="border-l-amber-500"><p>{d.pearl[lang]}</p></Fold>
      <Fold title={t('avail')} color="border-l-slate-400">
        <div className="flex flex-wrap gap-1"><NlemChip d={d} lang={lang} /><CountryChips d={d} lang={lang} /></div>
        <p className={'mt-1.5 text-[11px] ' + MUTED}><b>{t('brandsT')}:</b> {BRANDS[d.id] || (MIMS_UNCHECKED.has(d.id) ? t('brandUnchk') : t('noBrand'))}<br />{NLEM[d.id] ? 'NLEM 2569: ' + NLEM[d.id].f + '.' : t('nlemNote')} {NLEM_EXTRA[d.id] && NLEM_EXTRA[d.id][lang]} {REG_NOTE[d.id] && REG_NOTE[d.id][lang]} {t('ctryNote')}</p>
      </Fold>
    </Modal>
  );
}

function KeyModal({ onClose, lang }) {
  const i = lang === 'th' ? 1 : 0;
  return (
    <Modal title={TXT.key[i]} onClose={onClose} lang={lang}>
      <div className="space-y-1.5">
        {KEY_ROWS.map(r => <div key={r[0]} className="flex items-center gap-2 text-[12px]"><span className={'rounded border px-1 py-px text-[10px] font-bold ' + (r[2] === 'sky' ? FX_STYLE['-1'] : r[2] === 'orange' ? FX_STYLE['1'] : r[2] === 'violet' ? FX_STYLE.v : FX_STYLE['0'])}>{r[0]}</span>{r[1][lang]}</div>)}
        <div className="flex items-center gap-2 text-[12px]"><span className={'rounded border px-1 py-px text-[10px] font-bold ' + CTRY.th.chip}>TH</span><span className="rounded border px-1 py-px text-[10px] font-bold border-slate-200 text-slate-400 dark:border-[#263449]">US ?</span>{i ? 'สีเต็ม = ขึ้นทะเบียนอยู่, † = เคยมี, ⊘ = ไม่เคยมี, "?" = ยังไม่ตรวจสอบ (N/A)' : 'Coloured = registered now; † = previously registered; ⊘ = never; "?" = not verified (N/A)'}</div>
        <div className="flex items-center gap-2 text-[12px]"><NlemChip d={DRUG.furosemide} lang={lang} />{i ? 'หมวดบัญชียาหลักแห่งชาติ' : 'Thai NLEM category'}</div>
        <div className="flex items-center gap-2 text-[12px]"><span className="rounded border px-1 py-px text-[10px] font-bold bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-400/30">TAL</span>{i ? 'ตำแหน่งออกฤทธิ์บนเนฟรอน' : 'Nephron segment where the drug acts'}</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {CLS_ORDER.map(c => <div key={c} className="flex items-center gap-2 text-[12px]"><ClassChip c={c} lang={lang} /><span className={MUTED}>{CLS[c][lang]}</span></div>)}
      </div>
    </Modal>
  );
}

function ChangelogModal({ onClose, lang }) {
  return (
    <Modal title={lang === 'th' ? 'บันทึกการเปลี่ยนแปลง' : 'Changelog'} onClose={onClose} lang={lang}>
      {CHANGELOG.map(c => (
        <div key={c.v}>
          <div className="font-extrabold text-sm">{c.v} <span className={'font-medium text-[11px] ' + MUTED}>{c.date}</span></div>
          <ul className="list-disc pl-4 text-[12px] space-y-0.5 mt-1">{c[lang].map((x, k) => <li key={k}>{x}</li>)}</ul>
        </div>
      ))}
    </Modal>
  );
}

/* ---------- Views ---------- */
// Same pair of square icon buttons as the bronchodilator cards: Select (compare icon) and Details (info icon)
const ICON_BTN = 'w-9 h-9 shrink-0 rounded-lg border flex items-center justify-center transition-colors ';
function CardButtons({ d, on, toggle, open, lang }) {
  const i = lang === 'th' ? 1 : 0;
  return (
    <div className="flex flex-col gap-2 shrink-0">
      <button type="button" onClick={(e) => { e.stopPropagation(); toggle(); }} aria-pressed={on} aria-label={(on ? TXT.selected : TXT.select)[i]} title={(on ? TXT.selected : TXT.select)[i]}
        className={ICON_BTN + (on ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white dark:bg-[#151f32] border-slate-200 dark:border-[#263449] text-slate-500 hover:bg-slate-50 dark:hover:bg-[#101a2b]')}><CompareIcon className="w-4 h-4" /></button>
      <button type="button" onClick={(e) => { e.stopPropagation(); open(); }} aria-label={TXT.details[i]} title={TXT.details[i]}
        className={ICON_BTN + 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-400/30 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100'}><InfoIcon className="w-4 h-4" /></button>
    </div>
  );
}

function Tile({ d, lang, on, toggle, open }) {
  return (
    <div onClick={open} className={'rounded-xl md:rounded-2xl border shadow-sm p-3.5 md:p-5 cursor-pointer hover:shadow-md transition flex gap-3 ' + SURF + (on ? ' ring-2 ring-indigo-500' : '')}>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <h3 className={'text-lg font-extrabold leading-tight ' + CLS[d.cls].txt}>{d.name}</h3>
          <ClassChip c={d.cls} lang={lang} />
        </div>
        <div className={'text-[11px] ' + MUTED}>{d.th}</div>
        <div className="flex flex-wrap gap-1 mt-1.5"><SiteChips d={d} lang={lang} /><NlemChip d={d} lang={lang} /></div>
        <div className="mt-1.5 flex flex-wrap gap-1"><CountryChips d={d} lang={lang} /></div>
        <div className={'mt-2.5 rounded-lg border p-2 text-[12px] space-y-0.5 ' + INSET}>
          {d.dose.map((x, k) => <div key={k}><b>{x[0]}</b> {x[1]}</div>)}
        </div>
        <div className="mt-2"><Effects d={d} /></div>
        <div className={'mt-2 text-[11px] ' + MUTED}>{d.se.slice(0, 3).map(s => SE[s][lang === 'th' ? 1 : 0]).join(' · ')}</div>
      </div>
      <CardButtons d={d} on={on} toggle={toggle} open={open} lang={lang} />
    </div>
  );
}

function Row({ d, lang, on, toggle, open }) {
  return (
    <div onClick={open} className={'rounded-xl border shadow-sm p-3 cursor-pointer flex items-start gap-3 ' + SURF + (on ? ' ring-2 ring-indigo-500' : '')}>
      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-3">
        <div className="sm:w-56 shrink-0">
          <div className="flex flex-wrap items-center gap-1.5"><span className={'font-extrabold ' + CLS[d.cls].txt}>{d.name}</span><ClassChip c={d.cls} lang={lang} /></div>
          <div className="flex flex-wrap gap-1 mt-0.5"><SiteChips d={d} lang={lang} /><NlemChip d={d} lang={lang} /></div>
        </div>
        <div className="flex-1 min-w-0 text-[12px] mt-1.5 sm:mt-0">{doseLine(d)}<div className="flex flex-wrap gap-1 mt-1"><CountryChips d={d} lang={lang} /></div></div>
        <div className="sm:w-52 mt-1.5 sm:mt-0"><Effects d={d} /></div>
      </div>
      <CardButtons d={d} on={on} toggle={toggle} open={open} lang={lang} />
    </div>
  );
}

function TableView({ rows, lang, sel, toggle, open }) {
  const i = lang === 'th' ? 1 : 0;
  const th = 'px-2 py-2 text-left text-[10px] font-bold uppercase tracking-wide whitespace-nowrap ' + MUTED;
  return (
    <div className={'rounded-xl border shadow-sm overflow-x-auto ' + SURF}>
      <table className="w-full text-[12px] border-collapse">
        <thead className={INSET}><tr>
          <th className={th + ' sticky left-0 z-10 ' + INSET}>{TXT.drugs[i]}</th><th className={th}>{TXT.byClass[i]}</th><th className={th}>{TXT.bySite[i]}</th><th className={th + ' min-w-[200px]'}>{TXT.dose[i]}</th>
          {ELECTROLYTES.map(e => <th key={e.k} className={th}>{e.l}</th>)}<th className={th + ' min-w-[200px]'}>{TXT.se[i]}</th><th className={th}>{TXT.nlem[i]}</th><th className={th}>{TXT.avail[i]}</th><th className={th}></th>
        </tr></thead>
        <tbody>{rows.map(d => (
          <tr key={d.id} onClick={() => open(d.id)} className="border-t border-slate-200 dark:border-[#263449] cursor-pointer hover:bg-slate-50 dark:hover:bg-[#101a2b] align-top">
            <td className={'px-2 py-2 font-extrabold sticky left-0 z-10 whitespace-nowrap ' + SURF + ' ' + CLS[d.cls].txt}>{d.name}</td>
            <td className="px-2 py-2"><ClassChip c={d.cls} lang={lang} /></td>
            <td className="px-2 py-2"><div className="flex gap-1"><SiteChips d={d} lang={lang} /></div></td>
            <td className="px-2 py-2">{d.dose.map((x, k) => <div key={k}><b>{x[0]}</b> {x[1]}</div>)}</td>
            {ELECTROLYTES.map(e => <td key={e.k} className="px-2 py-2"><EffChip k={e.k} v={String(d.fx[e.k])} /></td>)}
            <td className="px-2 py-2">{d.se.slice(0, 4).map(s => SE[s][i]).join(', ')}</td>
            <td className="px-2 py-2"><NlemChip d={d} lang={lang} /></td>
            <td className="px-2 py-2"><div className="flex gap-1"><CountryChips d={d} lang={lang} /></div></td>
            <td className="px-2 py-2"><CardButtons d={d} on={sel.has(d.id)} toggle={() => toggle(d.id)} open={() => open(d.id)} lang={lang} /></td>
          </tr>))}</tbody>
      </table>
    </div>
  );
}

function DisclaimerModal({ onClose, lang }) {
  const i = lang === 'th' ? 1 : 0;
  return (
    <Modal title={TXT.discLink[i]} onClose={onClose} lang={lang}>
      <p className="text-[13px] leading-relaxed">{TXT.discBody[i]}</p>
    </Modal>
  );
}

/* ---------- App ---------- */
const store = {
  get: (k, f) => { try { return localStorage.getItem(k) || f; } catch (e) { return f; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} },
};

// A boxed group of toggle buttons, as in the bronchodilator filter panel
const GB = 'flex bg-white dark:bg-[#151f32] rounded-md border border-slate-200 dark:border-[#263449] p-0.5 shadow-sm shrink-0 items-center h-[26px] md:h-7 gap-0.5';
const GBTN = 'h-full px-1.5 md:px-2 rounded flex items-center justify-center gap-1 text-[10px] font-bold transition-all whitespace-nowrap ';
const GBW = GB.replace('h-[26px] md:h-7', 'min-h-[26px] md:min-h-[28px] flex-wrap max-w-full');
const ON = 'bg-indigo-600 text-white shadow-sm';
const OFF = 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#101a2b]';
const GICON = 'pl-1 pr-1 md:pl-1.5 md:pr-1.5 flex items-center pointer-events-none text-slate-400 border-r border-slate-100 dark:border-[#263449] mr-0.5';
const TOP_PILL = 'text-[10px] md:text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-[#151f32] shadow-sm px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-[#263449] flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-[#101a2b] transition-all cursor-pointer';

function App() {
  const [lang, setLang] = useState(() => store.get('dg-lang', 'en'));
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [view, setView] = useState(() => store.get('dg-view', 'tile'));
  const [q, setQ] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [fx, setFx] = useState(null);
  const [ctry, setCtry] = useState([]);
  const [stSel, setStSel] = useState([]);
  const [nlemOnly, setNlemOnly] = useState(false);
  const [sort, setSort] = useState('class');
  const [sel, setSel] = useState(new Set());
  const [modal, setModal] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(() => window.innerWidth >= 640);
  const [barH, setBarH] = useState(0);
  const barRef = React.useRef(null);
  const i = lang === 'th' ? 1 : 0;
  const t = (k) => TXT[k][i];

  useEffect(() => { document.documentElement.classList.toggle('dark', dark); store.set('dg-theme', dark ? 'dark' : 'light'); }, [dark]);
  useEffect(() => { store.set('dg-lang', lang); document.documentElement.lang = lang; document.title = t('title'); }, [lang]);
  useEffect(() => { store.set('dg-view', view); }, [view]);
  useEffect(() => {
    const el = barRef.current; if (!el) return;
    const f = () => setBarH(el.offsetHeight);
    f();
    const ro = window.ResizeObserver ? new ResizeObserver(f) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', f);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', f); };
  }, []);

  const toggleIn = (setter) => (v) => setter(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const toggleClass = toggleIn(setClasses), toggleCtry = toggleIn(setCtry), toggleSt = toggleIn(setStSel);

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    const cs = ctry.length ? ctry : (stSel.length ? ['th'] : []);
    const r = DRUGS.filter(d => (!classes.length || classes.includes(d.cls))
      && (!fx || d.fx[fx[0]] === fx[1])
      && (!nlemOnly || NLEM[d.id])
      && cs.every(c => stSel.length ? stSel.includes(stOf(d, c)) : stOf(d, c) === 'current')
      && (!s || (d.name + ' ' + d.th + ' ' + CLS[d.cls].en + ' ' + d.target).toLowerCase().includes(s)));
    const key = { name: (d) => d.name, class: (d) => CLS_ORDER.indexOf(d.cls), site: (d) => SEGS.indexOf(d.sites[0]) }[sort];
    return [...r].sort((a, b) => (key(a) > key(b) ? 1 : key(a) < key(b) ? -1 : a.name.localeCompare(b.name)));
  }, [q, classes, fx, ctry, stSel, nlemOnly, sort]);

  const toggle = (id) => setSel(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const fxLabel = (f) => ELECTROLYTES.find(e => e.k === f[0]).l + ARROW[String(f[1])];
  const showSet = (ids) => { setSel(new Set(ids)); setModal({ t: 'mech' }); };
  const open = (id) => setModal({ t: 'detail', id });
  const stName = (k) => (k === 'current' ? t('fCur') : k === 'past' ? t('fPast') : t('fNever'));

  // Active filters as removable chips (same pattern as the bronchodilator app)
  const chips = [
    ...classes.map(c => ({ key: 'c' + c, label: CLS[c].s[lang], off: () => toggleClass(c) })),
    ...(fx ? [{ key: 'fx', label: fxLabel(fx), off: () => setFx(null) }] : []),
    ...ctry.map(c => ({ key: 'k' + c, label: c.toUpperCase(), off: () => toggleCtry(c) })),
    ...stSel.map(k => ({ key: 's' + k, label: 'FDA: ' + stName(k), off: () => toggleSt(k) })),
    ...(nlemOnly ? [{ key: 'nl', label: t('nlemOnly'), off: () => setNlemOnly(false) }] : []),
    ...(q.trim() ? [{ key: 'q', label: '“' + q.trim() + '”', off: () => setQ('') }] : []),
  ];
  const clearAll = () => { setClasses([]); setFx(null); setQ(''); setCtry([]); setStSel([]); setNlemOnly(false); };

  const guides = [
    ['mech', t('mech'), 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 dark:border-blue-400/30 dark:text-blue-300', NephronIcon, () => setModal({ t: 'mech' })],
    ['resist', t('resist'), 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 dark:border-rose-400/30 dark:text-rose-300', LadderIcon, () => setModal({ t: 'resist' })],
  ];
  const views = [['tile', LayoutGrid], ['list', ListIcon], ['table', TableIcon]];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0b1220] text-slate-800 dark:text-slate-100 font-sans">
      <div id="main-app-container" className="max-w-6xl mx-auto relative pt-10 md:pt-0 px-3 md:px-6">

        <div className="absolute top-0 right-3 md:right-6 flex items-center gap-1.5 md:gap-2 z-20" data-top-controls>
          <button type="button" onClick={() => setModal({ t: 'log' })} className={TOP_PILL.replace('text-[10px] md:text-xs', 'text-[10px]')}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>{VERSION}
          </button>
          <button type="button" onClick={() => setLang(lang === 'th' ? 'en' : 'th')} aria-label="Language" title="ไทย / EN" className={TOP_PILL}>{lang === 'th' ? 'EN' : 'ไทย'}</button>
          <button type="button" onClick={() => setDark(!dark)} aria-label={t('theme')} title={t('theme')} className="w-7 h-7 text-slate-600 dark:text-slate-300 bg-white dark:bg-[#151f32] shadow-sm rounded-full border border-slate-200 dark:border-[#263449] flex items-center justify-center hover:bg-slate-50 dark:hover:bg-[#101a2b] transition-all cursor-pointer">
            {dark ? <SunIcon className="w-3.5 h-3.5" /> : <MoonIcon className="w-3.5 h-3.5" />}
          </button>
        </div>

        <header className="mb-3 md:mb-4">
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-1 md:mb-2 leading-tight sm:pr-32 md:pr-48">{t('title')}</h1>
          <p className="hidden sm:block text-xs md:text-sm text-slate-600 dark:text-slate-400">{t('sub')}</p>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 sm:block">
            <p className="text-[10px] md:text-xs font-semibold text-indigo-500 sm:mt-1">Made by Warodom Phaenthong, M.D.</p>
            <button type="button" onClick={() => setModal({ t: 'disc' })} className="block sm:mt-1 text-[11px] md:text-xs font-semibold text-amber-700 dark:text-amber-300 hover:underline">{t('discLink')}</button>
          </div>
        </header>

        <div ref={barRef} className="sticky top-0 z-30 pt-2 pb-2 md:pt-3 md:pb-2.5 -mt-2 md:-mt-3 bg-slate-100/95 dark:bg-[#0b1220]/95 backdrop-blur-md" data-search-bar>
          <div className="grid grid-cols-2 gap-1 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:gap-2 w-full mb-2" data-guide-buttons>
            {guides.map(([k, label, tone, Icon, go]) => (
              <button key={k} type="button" onClick={go} data-guide={k} aria-label={label} title={label}
                className={'flex flex-col sm:flex-row min-w-0 sm:flex-grow-0 items-center justify-center gap-0.5 sm:gap-1.5 md:gap-2 ' + tone + ' border px-0.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-lg font-bold shadow-sm transition-all active:scale-95 text-xs md:text-sm'}>
                <Icon className="w-4 h-4 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 shrink-0" />
                <span className="text-[10px] leading-[1.15] text-center sm:text-[length:inherit] sm:leading-normal sm:whitespace-nowrap min-w-0 max-w-full break-words">{label}{k === 'mech' && sel.size > 0 ? ' · ' + sel.size : ''}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-2 md:gap-3 w-full h-9 md:h-10">
            <button type="button" onClick={() => setSearchOpen(true)} aria-label={t('searchOpen')} title={t('searchOpen')} aria-expanded={searchOpen}
              className={(searchOpen ? 'hidden' : 'flex sm:hidden') + ' shrink-0 h-full w-9 items-center justify-center rounded-lg border shadow-sm transition-colors ' + (q !== '' ? 'bg-indigo-600 border-indigo-600 text-white' : BTN_OFF)}>
              <Search className="w-4 h-4" />
            </button>
            <div className={(searchOpen ? 'block flex-1' : 'hidden sm:block') + ' relative min-w-0 sm:flex-none sm:w-[45%] md:w-[35%] lg:w-1/3 h-full'}>
              <input type="text" value={q} onChange={e => setQ(e.target.value)} onBlur={() => setSearchOpen(false)} placeholder={t('search')} aria-label={t('search')} autoFocus={searchOpen}
                className={'w-full h-full pl-3 pr-9 md:pl-4 md:pr-10 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base sm:text-xs md:text-sm ' + SURF} />
              <Search className="hidden sm:block absolute right-2.5 md:right-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 md:w-4 md:h-4 pointer-events-none" />
              <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => { setQ(''); setSearchOpen(false); }} aria-label={t('close')} title={t('close')}
                className="flex sm:hidden absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 items-center justify-center rounded-md text-slate-500"><X className="w-4 h-4" /></button>
            </div>

            <div className={(searchOpen ? 'hidden sm:block' : 'block') + ' relative flex-1 min-w-0 sm:basis-auto h-full'}>
              <div className="absolute inset-y-0 left-0 pl-2 sm:pl-2.5 flex items-center pointer-events-none"><SortIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-400" /></div>
              <select value={sort} onChange={e => setSort(e.target.value)} aria-label={t('sort')}
                className={'w-full h-full pl-6 pr-1 sm:pl-8 sm:pr-6 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-600 dark:text-slate-300 text-[11px] md:text-xs font-bold appearance-none cursor-pointer ' + SURF}>
                <option value="class">{t('byClass')}</option><option value="name">{t('byName')}</option><option value="site">{t('bySite')}</option>
              </select>
            </div>

            <div className={(searchOpen ? 'hidden sm:flex' : 'flex') + ' bg-white dark:bg-[#151f32] rounded-lg border border-slate-200 dark:border-[#263449] p-0.5 shadow-sm shrink-0 items-center h-full'}>
              {views.map(([v, Icon]) => (
                <button key={v} type="button" onClick={() => setView(v)} aria-label={t(v)} title={t(v)} aria-pressed={view === v}
                  className={'h-full px-2 md:px-2.5 rounded-md transition-colors flex items-center justify-center ' + (view === v ? 'bg-slate-100 dark:bg-[#0b1220] text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600')}>
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  {view === v && <span className="hidden sm:inline ml-1.5 text-[10px] font-bold whitespace-nowrap">{t(v)}</span>}
                </button>
              ))}
            </div>

            <button type="button" onClick={() => setFiltersOpen(v => !v)} aria-expanded={filtersOpen} aria-controls="filter-bar" aria-label={t('filters')} title={t('filters')}
              className={'shrink-0 h-full px-2 md:px-3 rounded-lg border shadow-sm flex items-center gap-1 md:gap-1.5 text-[10px] md:text-xs font-bold whitespace-nowrap transition-colors ' + (chips.length ? 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-500' : filtersOpen ? 'bg-slate-100 dark:bg-[#0b1220] border-slate-300 dark:border-[#263449] text-slate-900 dark:text-white' : BTN_OFF)}>
              <FunnelIcon className="w-3 h-3 md:w-3.5 md:h-3.5" />
              <span className="max-[359px]:hidden">{t('filters')}</span>{chips.length > 0 && <span className="tabular-nums">{chips.length}</span>}
            </button>
          </div>
        </div>

        <div id="filter-bar" className={(filtersOpen ? 'flex' : 'hidden') + ' sticky z-20 max-h-[70vh] overflow-y-auto sm:max-h-none sm:overflow-visible pb-2 md:pb-3 mb-3 md:mb-6 bg-slate-100/95 dark:bg-[#0b1220]/95 backdrop-blur-md border-b border-slate-200/50 dark:border-[#263449]/50 flex-col gap-2 md:gap-2.5'} style={{ top: barH - 1 }}>
          <div className="flex flex-wrap items-center gap-1.5 md:gap-2 w-full min-w-0" data-filter-row="registration">
            <div className={GB} role="group" aria-label={t('countries')} title={t('countries')}>
              <span className="pl-1 pr-0.5 text-[10px] font-bold text-slate-400 whitespace-nowrap">{t('countries')}:</span>
              <button type="button" onClick={() => setCtry(ctry.length === COUNTRIES.length ? [] : [...COUNTRIES])} aria-pressed={ctry.length === COUNTRIES.length} className={GBTN + (ctry.length === COUNTRIES.length ? ON : OFF)}>{t('all')}</button>
              {COUNTRIES.map(c => <button key={c} type="button" onClick={() => toggleCtry(c)} aria-pressed={ctry.includes(c)} title={CTRY[c].name[i]} className={GBTN + (ctry.includes(c) ? CTRY[c].on : CTRY[c].off)}>{c.toUpperCase()}</button>)}
            </div>
            <div className={GB} role="group" aria-label={t('fdaStatus')} title={t('fdaStatus')}>
              <span className="pl-1 pr-0.5 text-[10px] font-bold text-slate-400 whitespace-nowrap inline-flex items-center gap-0.5">FDA<Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-emerald-600" /></span>
              {['current', 'past', 'never'].map(k => {
                const on = stSel.includes(k);
                const off = k === 'current' ? 'text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10' : k === 'past' ? 'text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-500/10' : OFF;
                return <button key={k} type="button" onClick={() => toggleSt(k)} aria-pressed={on} className={GBTN + (on ? ON : off)}>{k !== 'current' && <span aria-hidden="true">{k === 'past' ? '†' : '⊘'}</span>}{stName(k).replace(/ [†⊘]/, '')}</button>;
              })}
            </div>
            <div className={GB}>
              <button type="button" onClick={() => setNlemOnly(!nlemOnly)} aria-pressed={nlemOnly} title={t('nlemTitle')} className={GBTN + (nlemOnly ? ON : 'text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10')}><Check className="w-2.5 h-2.5 md:w-3 md:h-3" /> {t('nlemOnly')}</button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 md:gap-2 w-full min-w-0" data-filter-row="clinical">
            <div className={GBW} role="group" aria-label={t('byClass')}>
              <div className={GICON}><PillIcon className="h-2.5 w-2.5 md:h-3 md:w-3" /></div>
              {CLS_ORDER.map(c => <button key={c} type="button" onClick={() => toggleClass(c)} aria-pressed={classes.includes(c)} title={CLS[c][lang]} className={GBTN + 'py-0.5 ' + (classes.includes(c) ? ON : CLS[c].txt + ' hover:bg-slate-50 dark:hover:bg-[#101a2b]')}>{CLS[c].s[lang]}</button>)}
            </div>
            <div className={GBW} role="group" aria-label={t('elec')}>
              <div className={GICON}><ActivityIcon className="h-2.5 w-2.5 md:h-3 md:w-3" /></div>
              {FX_FILTERS.map(f => { const on = fx && fx[0] === f[0] && fx[1] === f[1]; return <button key={f.join()} type="button" onClick={() => setFx(on ? null : f)} aria-pressed={!!on} className={GBTN + (on ? ON : OFF)}>{fxLabel(f)}</button>; })}
            </div>
          </div>
        </div>

        <div className={(filtersOpen ? '-mt-1 md:-mt-3' : 'mt-1 md:mt-1.5') + ' mb-2 md:mb-3 px-0.5'}>
          {chips.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5" role="group" aria-label={t('filters')} data-active-filters>
              <button type="button" onClick={clearAll} title={t('clear')} className="shrink-0 min-h-[26px] px-2.5 rounded-full border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-300 shadow-sm inline-flex items-center gap-1 text-[11px] font-bold whitespace-nowrap transition-colors"><X className="w-3 h-3" /> {t('clear')}</button>
              {chips.map(c => (
                <button key={c.key} type="button" onClick={c.off} title={c.label} aria-label={c.label}
                  className="max-w-full min-h-[26px] inline-flex items-center gap-1 pl-2.5 pr-1.5 py-0.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-800 hover:bg-indigo-100 dark:border-indigo-400/30 dark:bg-indigo-500/10 dark:text-indigo-300 text-[11px] font-bold leading-tight text-left transition-colors">
                  <span className="break-words min-w-0">{c.label}</span><X className="w-3 h-3 shrink-0 opacity-60" />
                </button>
              ))}
            </div>
          )}
          <div className="flex items-start justify-between gap-2">
            <div className={'text-[11px] md:text-xs min-w-0 pt-0.5 ' + MUTED} aria-live="polite">
              {t('showing')} <span className="font-bold text-slate-800 dark:text-slate-100 tabular-nums">{rows.length}</span> {t('of')} <span className="font-bold text-slate-800 dark:text-slate-100 tabular-nums">{DRUGS.length}</span> {t('drugs')} <span className="text-slate-400">({DRUGS.length} {t('inDb')})</span>
            </div>
            <button type="button" onClick={() => setModal({ t: 'key' })} title={t('keyTitle')} aria-haspopup="dialog"
              className={'shrink-0 inline-flex items-center gap-1 h-6 md:h-7 px-2 rounded-md border shadow-sm text-[11px] font-bold whitespace-nowrap transition-colors ' + BTN_OFF}>
              <HelpIcon className="w-3 h-3" />{t('key')}
            </button>
          </div>
        </div>

        <main>
          {rows.length === 0 && (
            <div className={'py-12 md:py-16 text-center border-dashed rounded-xl md:rounded-2xl border ' + SURF + ' ' + MUTED}>
              <Search className="w-8 h-8 md:w-10 md:h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-base md:text-lg font-medium">{t('none')}</p>
              <button type="button" onClick={clearAll} className="mt-2 text-blue-600 dark:text-blue-300 hover:underline text-sm md:text-base">{t('clear')}</button>
            </div>
          )}
          {view === 'tile' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{rows.map(d => <Tile key={d.id} d={d} lang={lang} on={sel.has(d.id)} toggle={() => toggle(d.id)} open={() => open(d.id)} />)}</div>}
          {view === 'list' && <div className="space-y-2">{rows.map(d => <Row key={d.id} d={d} lang={lang} on={sel.has(d.id)} toggle={() => toggle(d.id)} open={() => open(d.id)} />)}</div>}
          {view === 'table' && rows.length > 0 && <TableView rows={rows} lang={lang} sel={sel} toggle={toggle} open={open} />}
        </main>
      </div>

      {sel.size > 0 && !modal && (
        <div className={'fixed bottom-0 left-0 right-0 z-40 border-t px-3 py-2 flex items-center justify-center gap-2 shadow-lg ' + SURF}>
          <span className="text-xs font-bold">{sel.size} {t('nsel')}</span>
          <button type="button" onClick={() => setModal({ t: 'mech' })} className="rounded-lg border px-3 py-1.5 text-xs font-bold bg-indigo-600 text-white border-indigo-600 inline-flex items-center gap-1.5"><NephronIcon className="w-3.5 h-3.5" />{t('mech')}</button>
          <button type="button" onClick={() => setSel(new Set())} className={'rounded-lg border px-3 py-1.5 text-xs font-bold ' + BTN_OFF}>{t('clear')}</button>
        </div>
      )}

      {modal && modal.t === 'detail' && <DetailModal d={DRUG[modal.id]} lang={lang} onClose={() => setModal(null)} showOne={(id) => showSet([id])} />}
      {modal && modal.t === 'mech' && <MechanismModal sel={sel} toggle={toggle} clear={() => setSel(new Set())} lang={lang} onClose={() => setModal(null)} />}
      {modal && modal.t === 'resist' && <ResistanceModal lang={lang} onClose={() => setModal(null)} showCombo={showSet} />}
      {modal && modal.t === 'key' && <KeyModal lang={lang} onClose={() => setModal(null)} />}
      {modal && modal.t === 'log' && <ChangelogModal lang={lang} onClose={() => setModal(null)} />}
      {modal && modal.t === 'disc' && <DisclaimerModal lang={lang} onClose={() => setModal(null)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
