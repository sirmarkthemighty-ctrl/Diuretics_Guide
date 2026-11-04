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
const ConvertIcon = mk(<><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></>);
const WarnIcon = mk(<><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>, 2.2);
const LadderIcon = mk(<path d="M8 3v18M16 3v18M8 8h8M8 13h8M8 18h8" />);


/* ---------- Data ---------- */
const VERSION = 'v1.2.0';
const CHANGELOG = [
  { v: 'v1.2.0', date: '2026-11-04',
    en: ['First release: 24 diuretics (18 core plus 6 sold in the UK, EU or Japan) with doses, electrolyte effects and side effects.', 'Tile, list and table views.', 'Mechanism button: highlights where selected drugs act on the nephron.', 'Diuretic resistance: sequential nephron blockade guide.', 'Electrolyte filter in two rows (increased on top, decreased below, same electrolyte stacked): pick several electrolytes, one direction each; the other arrow switches it.', 'Warning triangle on serious side effects (hyperkalemia, ototoxicity, liver injury, ODS, DKA, blood-count drops, AKI, pulmonary edema) on cards, table and detail view; filters open with FDA status “Current” selected by default.', 'Key clinical trials in each drug’s detail view, summarised from the PubMed abstracts with PubMed and DOI links (drugs with no landmark outcome trial say so).', 'References section at the bottom of the page (collapsible, as in the bronchodilator guide).', 'Mechanism diagram redrawn on the ScienceDirect Topics nephron layout (glomerulus, macula densa, cortex / medulla, osmolality gradient, water / salt / urea flow, ADH and aldosterone), with the source listed.', 'Kidney / liver dosing and key interactions on every drug (from labels and guidelines), and a loop dose conversion table.', 'Thai NLEM 2569 chip checked against the official list (5 Basic drugs, the rest Non-NLEM) and TH / US / UK / EU / JP availability filter (all five checked 2026-11-04: UK on emc, EU on Spain AEMPS, EMA lists and national sources, JP on KEGG / JAPIC). FDA status per country (current / past † / never ⊘) with a filter; US checked against openFDA. Doses and Thai brands checked against MIMS Thailand.'],
    th: ['เปิดตัวครั้งแรก: ยาขับปัสสาวะ 24 ชนิด (หลัก 18 ชนิด และอีก 6 ชนิดที่มีใน UK, EU หรือญี่ปุ่น) พร้อมขนาดยา ผลต่ออิเล็กโทรไลต์ และผลข้างเคียง', 'มุมมองการ์ด รายการ และตาราง', 'ปุ่มกลไก: แสดงตำแหน่งที่ยาที่เลือกออกฤทธิ์บนเนฟรอน', 'ภาวะดื้อยาขับปัสสาวะ: แนวทางการปิดกั้นเนฟรอนตามลำดับ', 'ตัวกรองอิเล็กโทรไลต์สองแถว (เพิ่มขึ้นแถวบน ลดลงแถวล่าง อิเล็กโทรไลต์เดียวกันซ้อนกัน) เลือกได้หลายตัว ตัวละหนึ่งทิศทาง กดลูกศรอีกด้านเพื่อสลับ', 'สัญลักษณ์เตือนรูปสามเหลี่ยมที่ผลข้างเคียงสำคัญ (โพแทสเซียมสูง พิษต่อหู ตับ ODS DKA เม็ดเลือดผิดปกติ AKI ปอดบวมน้ำ) ในการ์ด ตาราง และหน้ารายละเอียด ตัวกรองเปิดไว้และเลือกสถานะ อย. “ปัจจุบัน” เป็นค่าเริ่มต้น', 'การศึกษาทางคลินิกสำคัญในหน้ารายละเอียดของแต่ละยา (ตรวจกับบทคัดย่อใน PubMed พร้อมลิงก์ PubMed และ DOI)', 'ส่วนเอกสารอ้างอิงท้ายหน้า (พับ/เปิดได้ เหมือนแอปยาขยายหลอดลม)', 'แผนภาพกลไกวาดใหม่ตามผังเนฟรอนของ ScienceDirect Topics (โกลเมอรูลัส แมคูลาเดนซา เปลือก/ไขสันหลังไต ความเข้มข้นออสโมลาลิตี การเคลื่อนของน้ำ/เกลือ/ยูเรีย ADH และอัลโดสเตอโรน) พร้อมแหล่งอ้างอิง', 'ขนาดยาตามการทำงานของไต/ตับ และยาที่ต้องระวังเมื่อใช้ร่วมในทุกตัวยา (จากฉลากและแนวทางเวชปฏิบัติ) พร้อมตารางเทียบขนาดยาลูป', 'ป้าย NLEM 2569 ตรวจกับบัญชียาหลักฯ ฉบับจริง (หมวดพื้นฐาน 5 ชนิด ที่เหลือไม่อยู่ใน NLEM) และตัวกรองประเทศ TH / US / UK / EU / JP (ตรวจครบทั้งห้าเมื่อ 2026-11-04: UK ใน emc, EU ใน AEMPS สเปน รายการ EMA และแหล่งระดับประเทศ, JP ใน KEGG / JAPIC) สถานะ อย. รายประเทศ (ปัจจุบัน / เคยมี † / ไม่เคยมี ⊘) พร้อมตัวกรอง ตรวจสหรัฐฯ กับ openFDA ตรวจขนาดยาและยี่ห้อในไทยกับ MIMS Thailand'] },
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

/* ---------- Strings ---------- */
const TXT = {
  title: ['Diuretics Guide', 'คู่มือยาขับปัสสาวะ'],
  sub: ['Doses, electrolyte effects and sites of action', 'ขนาดยา ผลต่ออิเล็กโทรไลต์ และตำแหน่งออกฤทธิ์'],
  made: ['Made with ❤️ by Wardom', 'สร้างด้วย ❤️ โดย Wardom'],
  disc: ['For clinician reference. Check local protocols and the patient before prescribing.', 'ใช้อ้างอิงสำหรับบุคลากรทางการแพทย์ ตรวจสอบแนวปฏิบัติของโรงพยาบาลและผู้ป่วยก่อนสั่งยา'],
  search: ['Search drug, class or target…', 'ค้นหายา กลุ่มยา หรือเป้าหมาย…'],
  mech: ['Mechanism', 'กลไก'], incr: ['increased', 'เพิ่มขึ้น'], decr: ['decreased', 'ลดลง'], trials: ['Key clinical trials', 'การศึกษาทางคลินิกสำคัญ'], noTrial: ['No landmark outcome trial is included for this drug (N/A).', 'ไม่ได้รวมการศึกษาผลลัพธ์สำคัญของยานี้ (N/A)'], design: ['Design', 'รูปแบบ'], result: ['Result', 'ผล'], caution: ['Serious side effect: check before prescribing', 'ผลข้างเคียงที่สำคัญ: ตรวจก่อนสั่งยา'], conv: ['Dose conversion', 'เทียบขนาดยา'], renal: ['Kidney / liver dosing', 'ขนาดยาตามไต/ตับ'], ddi: ['Key interactions', 'ยาที่ต้องระวังเมื่อใช้ร่วม'], resist: ['Diuretic resistance', 'ดื้อยาขับปัสสาวะ'], key: ['Key', 'คำอธิบาย'],
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
  glom: ['Glomerulus', 'โกลเมอรูลัส'], macula: ['Macula densa', 'แมคูลาเดนซา'], aldo: ['Aldosterone', 'อัลโดสเตอโรน'], urine: ['Urine', 'ปัสสาวะ'], osm: ['Interstitial osmolality, mOsm/kg', 'ความเข้มข้นออสโมลาลิตีของเนื้อเยื่อ mOsm/kg'], figSrc: ['Nephron layout redrawn from the ScienceDirect Topics figure "Nephron" (Medicine and Dentistry): sciencedirect.com/topics/medicine-and-dentistry/nephron', 'ผังเนฟรอนวาดใหม่ตามภาพ "Nephron" ของ ScienceDirect Topics (Medicine and Dentistry): sciencedirect.com/topics/medicine-and-dentistry/nephron'], cortex: ['CORTEX', 'เปลือกไต'], medulla: ['MEDULLA', 'ไขสันหลังไต'],
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
// Side effects that can be serious: shown with a warning triangle on cards, the table and the detail view
const CAUTION = new Set(['hyperK', 'ototox', 'liver', 'ods', 'dka', 'wbc', 'aki', 'pulm']);
const WARN_CHIP = 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-400/40';
function Cautions({ d, lang }) {
  const i = lang === 'th' ? 1 : 0;
  const list = d.se.filter(x => CAUTION.has(x));
  if (!list.length) return null;
  return <div className="flex flex-wrap gap-1">{list.map(x => <span key={x} title={TXT.caution[i]} className={'inline-flex items-center gap-1 rounded border px-1.5 py-px text-[10px] font-bold ' + WARN_CHIP}><WarnIcon className="w-3 h-3 shrink-0" />{SE[x][i]}</span>)}</div>;
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
// Layout follows the ScienceDirect Topics "Nephron" figure (glomerulus top left, PCT and descending limb down the left, loop at
// the bottom, thick ascending limb back up to the macula densa, DCT over the top, collecting duct down the right); redrawn here.
// geometry per segment: [path, stroke width] pieces; cortex ends at y = 222
const GEO = {
  pct: [['M62 76 L62 88 C34 104 90 120 62 136 C34 152 90 168 62 184 L62 222', 16]],
  dl: [['M62 222 L62 372 Q62 402 106 402 Q150 402 150 372', 8]],
  tal: [['M150 250 L150 122', 16]],
  dct: [['M150 122 C150 56 270 56 270 118', 14]],
  cd: [['M270 118 L270 396', 18]],
};
const THIN_ASC = 'M150 372 L150 250'; // thin ascending limb: no diuretic acts here
const LABEL = {
  pct: { x: 84, y: 150, a: 'start', t: 'PCT' },
  dl: { x: 86, y: 270, a: 'start', t: 'Desc.', t2: 'limb' },
  tal: { x: 164, y: 196, a: 'start', t: 'TAL' },
  dct: { x: 200, y: 40, a: 'start', t: 'DCT' },
  cd: { x: 256, y: 318, a: 'end', t: 'Collecting', t2: 'duct' },
};
const OSM = [[212, '300'], [244, '400'], [286, '600'], [326, '800'], [362, '1000'], [394, '1200']];

const BOWMAN = ["Bowman's capsule", 'แคปซูลโบว์แมน'];
const AFF = [['Afferent', 'arteriole'], ['หลอดเลือดแดง', 'ขาเข้า']];
const EFF = [['Efferent', 'arteriole'], ['หลอดเลือดแดง', 'ขาออก']];
function Nephron({ ids, lang }) {
  const ds = ids.map(i => DRUG[i]);
  const hit = {};
  ds.forEach(d => d.sites.forEach(s => { (hit[s] = hit[s] || []).push(d); }));
  const any = ds.length > 0;
  const th = lang === 'th' ? 1 : 0;
  const mut = 'fill-slate-500 dark:fill-slate-400';
  return (
    <svg viewBox="0 0 360 440" className="w-full max-w-sm mx-auto" role="img" aria-label="Nephron">
      <rect x="0" y="0" width="360" height="222" rx="10" className="fill-rose-50 dark:fill-rose-950/30" />
      <rect x="0" y="222" width="360" height="218" rx="10" className="fill-slate-100 dark:fill-slate-800/40" />
      <line x1="0" y1="222" x2="360" y2="222" strokeWidth="1.5" strokeDasharray="5 4" className="stroke-slate-400 dark:stroke-slate-500" />
      <text x="352" y="16" textAnchor="end" className="fill-slate-400 dark:fill-slate-500" fontSize="9" fontWeight="700">{TXT.cortex[th]}</text>
      <text x="352" y="238" textAnchor="end" className="fill-slate-400 dark:fill-slate-500" fontSize="9" fontWeight="700">{TXT.medulla[th]}</text>
      <circle cx="84" cy="58" r="30" className="fill-amber-100 stroke-amber-300 dark:fill-amber-500/15 dark:stroke-amber-400/50" strokeWidth="2.5" />
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" className="stroke-blue-600 dark:stroke-blue-400">
        <path d="M4 50 L58 50" strokeWidth="5" />
        <path d="M4 70 L60 70" strokeWidth="5" />
        <path d="M58 50 C66 36 98 36 104 52 C110 66 94 78 80 74 C66 70 68 56 82 54 C94 52 100 62 90 68" />
        <path d="M60 70 C70 62 78 66 86 62 C96 58 96 48 86 46 C76 44 70 52 74 58" />
      </g>
      <ellipse cx="114" cy="80" rx="7" ry="5" className="fill-green-200 stroke-green-600 dark:fill-green-500/30 dark:stroke-green-400" strokeWidth="1.5" />
      <path d="M119 84 L144 120" fill="none" strokeWidth="1.5" strokeDasharray="3 3" className="stroke-green-600 dark:stroke-green-400" />
      <g fontSize="8" className={mut}>
        <text x="4" y="12">{BOWMAN[th]}</text>
        <path d="M66 15 L74 29" strokeWidth="1" className="stroke-slate-400" />
        <text x="4" y="34">{AFF[th][0]}<tspan x="4" dy="9">{AFF[th][1]}</tspan></text>
        <text x="4" y="84">{EFF[th][0]}<tspan x="4" dy="9">{EFF[th][1]}</tspan></text>
      </g>
      <text x="124" y="28" className={mut} fontSize="10">{TXT.glom[th]}</text>
      <ellipse cx="150" cy="124" rx="9" ry="6" className="fill-green-200 stroke-green-600 dark:fill-green-500/30 dark:stroke-green-400" strokeWidth="1.5" />
      <text x="164" y="146" fontSize="9" fontWeight="700" className="fill-green-700 dark:fill-green-400">{TXT.macula[th]}</text>
      <path d={THIN_ASC} fill="none" strokeWidth="8" strokeLinecap="round" className="stroke-slate-300 dark:stroke-slate-600" opacity={any ? 0.3 : 1} />
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
      {OSM.map(([y, v]) => <text key={v} x="40" y={y} textAnchor="end" fontSize="9" className={mut}>{v}</text>)}
      <text x="4" y="432" fontSize="8" className={mut}>{TXT.osm[th]}</text>
      <g fontSize="9" fontWeight="700">
        <text x="82" y="168" className="fill-sky-600 dark:fill-sky-400">→ H₂O</text>
        <text x="76" y="352" className="fill-sky-600 dark:fill-sky-400">→ H₂O</text>
        <text x="164" y="286" className="fill-red-500 dark:fill-red-400">→ Na⁺Cl⁻</text>
        <text x="256" y="372" textAnchor="end" className="fill-sky-600 dark:fill-sky-400">H₂O ←</text>
        <text x="256" y="390" textAnchor="end" className="fill-fuchsia-700 dark:fill-fuchsia-400">Urea ←</text>
        <text x="284" y="196" className="fill-orange-600 dark:fill-orange-400">{TXT.aldo[th]}</text>
        <text x="284" y="296" className="fill-rose-600 dark:fill-rose-400">ADH</text>
        <text x="270" y="420" textAnchor="middle" className={mut}>{TXT.urine[th]} ↓</text>
      </g>
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
      <p className={'text-[10px] leading-snug ' + MUTED}><b>{t('source')}:</b> {t('figSrc')}</p>
    </Modal>
  );
}

/* ---------- Kidney / liver dosing and key interactions (labels and guidelines; verify against the local label) ---------- */
// Per drug: what changes with kidney and liver function. Only items found on a label, SmPC or guideline are listed.
const RENAL = {
  acetazolamide: { en: 'Kidney: avoid in severe impairment (not if GFR < 10; with moderate–severe impairment halve the dose or give every 12 h); it loses effect and worsens acidosis. Liver: avoid in liver disease.', th: 'ไต: หลีกเลี่ยงในไตเสื่อมรุนแรง (ห้ามใช้เมื่อ GFR < 10; ไตเสื่อมปานกลาง–รุนแรง ลดขนาดครึ่งหนึ่งหรือให้ทุก 12 ชม.) ฤทธิ์ลดลงและกรดเมตาบอลิกแย่ลง ตับ: หลีกเลี่ยงในโรคตับ' },
  mannitol: { en: 'Kidney: contraindicated in anuria or severe renal failure that does not respond to a test dose; stop if urine output falls or creatinine rises.', th: 'ไต: ห้ามใช้ในภาวะไม่มีปัสสาวะหรือไตวายรุนแรงที่ไม่ตอบสนองต่อ test dose หยุดเมื่อปัสสาวะลดลงหรือ creatinine สูงขึ้น' },
  furosemide: { en: 'Kidney: no dose reduction, but a higher dose is needed as eGFR falls (IV bolus ceiling 80–160 mg in CKD, see the resistance guide); no effect in anuria. Liver: in cirrhosis start low and pair with spironolactone; hypokalemia or alkalosis can precipitate encephalopathy.', th: 'ไต: ไม่ต้องลดขนาด แต่ต้องใช้ขนาดสูงขึ้นเมื่อ eGFR ลดลง (ceiling IV bolus 80–160 mg ใน CKD ดูหัวข้อดื้อยา) ไม่ได้ผลเมื่อไม่มีปัสสาวะ ตับ: ตับแข็งเริ่มขนาดต่ำและให้คู่ spironolactone โพแทสเซียมต่ำหรือภาวะด่างอาจกระตุ้นสมองเสื่อมจากตับ' },
  bumetanide: { en: 'Kidney: higher doses are needed as eGFR falls (1 mg ≈ furosemide 40 mg PO); no effect in anuria. Liver: avoid in hepatic coma; titrate carefully in cirrhosis.', th: 'ไต: ต้องใช้ขนาดสูงขึ้นเมื่อ eGFR ลดลง (1 mg ≈ furosemide 40 mg PO) ไม่ได้ผลเมื่อไม่มีปัสสาวะ ตับ: หลีกเลี่ยงในภาวะโคม่าจากตับ ตับแข็งปรับขนาดอย่างระมัดระวัง' },
  torsemide: { en: 'Kidney: mostly cleared by the liver, so it does not accumulate in CKD; higher doses may still be needed at low eGFR. Liver: half-life is longer in cirrhosis; contraindicated in hepatic coma.', th: 'ไต: ส่วนใหญ่ถูกกำจัดทางตับ จึงไม่สะสมใน CKD แต่ eGFR ต่ำอาจต้องใช้ขนาดสูงขึ้น ตับ: ครึ่งชีวิตยาวขึ้นในตับแข็ง ห้ามใช้ในภาวะโคม่าจากตับ' },
  ethacrynic: { en: 'Kidney: contraindicated in anuria; larger doses are needed as eGFR falls. Liver: use with caution in cirrhosis (electrolyte shifts can precipitate hepatic coma).', th: 'ไต: ห้ามใช้เมื่อไม่มีปัสสาวะ ต้องใช้ขนาดสูงขึ้นเมื่อ eGFR ลดลง ตับ: ระวังในตับแข็ง (อิเล็กโทรไลต์เปลี่ยนอาจกระตุ้นโคม่าจากตับ)' },
  hctz: { en: 'Kidney: much less effective at eGFR < 30 (add or switch to a loop); contraindicated in anuria and severe renal impairment on most labels. Liver: in cirrhosis small fluid or electrolyte shifts can precipitate hepatic coma.', th: 'ไต: ได้ผลน้อยลงมากเมื่อ eGFR < 30 (เพิ่มหรือเปลี่ยนเป็นยาลูป) ห้ามใช้ในภาวะไม่มีปัสสาวะและไตเสื่อมรุนแรงตามฉลากส่วนใหญ่ ตับ: ในตับแข็ง การเปลี่ยนของน้ำหรืออิเล็กโทรไลต์เล็กน้อยอาจกระตุ้นโคม่าจากตับ' },
  chlorthalidone: { en: 'Kidney: still lowers BP in stage 4 CKD (CLICK; watch K⁺ and creatinine). Liver: as for HCTZ, small electrolyte shifts can precipitate hepatic coma in cirrhosis.', th: 'ไต: ยังลดความดันได้ใน CKD ระยะ 4 (CLICK ติดตาม K⁺ และ creatinine) ตับ: เช่นเดียวกับ HCTZ อิเล็กโทรไลต์เปลี่ยนเล็กน้อยอาจกระตุ้นโคม่าจากตับในตับแข็ง' },
  indapamide: { en: 'Kidney: contraindicated in severe renal failure (CrCl < 30 mL/min on the UK SmPC). Liver: contraindicated in hepatic encephalopathy or severe liver impairment.', th: 'ไต: ห้ามใช้ในไตวายรุนแรง (CrCl < 30 mL/min ตาม UK SmPC) ตับ: ห้ามใช้ในสมองเสื่อมจากตับหรือตับบกพร่องรุนแรง' },
  metolazone: { en: 'Kidney: keeps working at low GFR, which is why it pairs with a loop; contraindicated in anuria; check K⁺, Na⁺ and creatinine daily. Liver: contraindicated in hepatic coma or pre-coma.', th: 'ไต: ยังออกฤทธิ์ได้เมื่อ GFR ต่ำ จึงใช้คู่กับยาลูป ห้ามใช้เมื่อไม่มีปัสสาวะ ตรวจ K⁺, Na⁺, creatinine ทุกวัน ตับ: ห้ามใช้ในภาวะโคม่าหรือก่อนโคม่าจากตับ' },
  chlorothiazide: { en: 'Kidney: contraindicated in anuria; check electrolytes and creatinine daily when added to a loop. Liver: caution in cirrhosis (hepatic coma).', th: 'ไต: ห้ามใช้เมื่อไม่มีปัสสาวะ ตรวจอิเล็กโทรไลต์และ creatinine ทุกวันเมื่อเสริมยาลูป ตับ: ระวังในตับแข็ง (โคม่าจากตับ)' },
  spironolactone: { en: 'Kidney: HF guidance: use only if eGFR > 30 and K⁺ < 5.0; at eGFR 30–49 start 12.5 mg daily or on alternate days. Liver: first-line for cirrhotic ascites (100–400 mg/day); check K⁺ and creatinine.', th: 'ไต: แนวทาง HF: ใช้เมื่อ eGFR > 30 และ K⁺ < 5.0 ถ้า eGFR 30–49 เริ่ม 12.5 mg ทุกวันหรือวันเว้นวัน ตับ: ยาเลือกแรกในท้องมานจากตับแข็ง (100–400 mg/วัน) ตรวจ K⁺ และ creatinine' },
  eplerenone: { en: 'Kidney: contraindicated if eGFR < 30 or K⁺ > 5.0 at start (EU SmPC). Liver: contraindicated in severe impairment (Child-Pugh C).', th: 'ไต: ห้ามใช้ถ้า eGFR < 30 หรือ K⁺ > 5.0 ตอนเริ่ม (EU SmPC) ตับ: ห้ามใช้ในตับบกพร่องรุนแรง (Child-Pugh C)' },
  amiloride: { en: 'Kidney: contraindicated in anuria, acute or severe progressive renal failure, diabetic nephropathy and hyperkalemia. Liver: not metabolised by the liver; may accumulate in hepatorenal syndrome.', th: 'ไต: ห้ามใช้ในภาวะไม่มีปัสสาวะ ไตวายเฉียบพลันหรือไตวายรุนแรงที่ลุกลาม โรคไตจากเบาหวาน และโพแทสเซียมสูง ตับ: ไม่ถูกเผาผลาญที่ตับ อาจสะสมใน hepatorenal syndrome' },
  triamterene: { en: 'Kidney: contraindicated in anuria, severe or progressive kidney disease and hyperkalemia. Liver: caution in cirrhosis (folate antagonist effect).', th: 'ไต: ห้ามใช้ในภาวะไม่มีปัสสาวะ โรคไตรุนแรงหรือลุกลาม และโพแทสเซียมสูง ตับ: ระวังในตับแข็ง (ฤทธิ์ต้านโฟเลต)' },
  tolvaptan: { en: 'Kidney: contraindicated in anuria; no benefit when there is no urine output. Liver: can cause serious liver injury: avoid with underlying liver disease and stop if ALT / AST rise. Start in hospital with Na⁺ checks.', th: 'ไต: ห้ามใช้เมื่อไม่มีปัสสาวะ ไม่ได้ประโยชน์เมื่อไม่มีปัสสาวะ ตับ: อาจทำให้ตับอักเสบรุนแรง หลีกเลี่ยงในโรคตับเดิมและหยุดเมื่อ ALT / AST สูงขึ้น เริ่มในโรงพยาบาลและตรวจ Na⁺' },
  dapagliflozin: { en: 'Kidney: for HF / CKD it can be started at eGFR ≥ 15 (UK) and continued below that; the glucose-lowering effect falls at eGFR < 45. Liver: severe impairment: start 5 mg.', th: 'ไต: ใน HF / CKD เริ่มได้เมื่อ eGFR ≥ 15 (UK) และใช้ต่อได้แม้ต่ำกว่านั้น ฤทธิ์ลดน้ำตาลลดลงเมื่อ eGFR < 45 ตับ: ตับบกพร่องรุนแรง เริ่ม 5 mg' },
  empagliflozin: { en: 'Kidney: for HF / CKD it can be started at eGFR ≥ 20 (UK) and continued below that; the glucose-lowering effect falls at low eGFR. Liver: no dose adjustment.', th: 'ไต: ใน HF / CKD เริ่มได้เมื่อ eGFR ≥ 20 (UK) และใช้ต่อได้แม้ต่ำกว่านั้น ฤทธิ์ลดน้ำตาลลดลงเมื่อ eGFR ต่ำ ตับ: ไม่ต้องปรับขนาด' },
  bendroflumethiazide: { en: 'Kidney: contraindicated in severe renal insufficiency. Liver: contraindicated in severe hepatic insufficiency.', th: 'ไต: ห้ามใช้ในไตเสื่อมรุนแรง ตับ: ห้ามใช้ในตับบกพร่องรุนแรง' },
  xipamide: { en: 'Kidney: the leaflet allows up to 60 mg/day in advanced kidney impairment; do not go higher. Liver: contraindicated in severe liver dysfunction; dose by severity in milder impairment.', th: 'ไต: เอกสารกำกับยาอนุญาตสูงสุด 60 mg/วันในไตเสื่อมระยะรุนแรง ไม่ควรสูงกว่านี้ ตับ: ห้ามใช้ในตับบกพร่องรุนแรง ในระดับเบากว่าให้ปรับตามความรุนแรง' },
  canrenoate: { en: 'Kidney: do not give in renal failure (Japan label): K⁺ excretion is low and hyperkalemia worsens. Check K⁺ regularly.', th: 'ไต: ห้ามใช้ในไตวาย (ฉลากญี่ปุ่น) เพราะขับ K⁺ ได้น้อยและโพแทสเซียมสูงแย่ลง ตรวจ K⁺ สม่ำเสมอ' },
  trichlormethiazide: { en: 'Kidney: contraindicated in anuria and acute renal failure; start low in older adults.', th: 'ไต: ห้ามใช้ในภาวะไม่มีปัสสาวะและไตวายเฉียบพลัน ผู้สูงอายุเริ่มขนาดต่ำ' },
  azosemide: { en: 'Kidney: contraindicated in anuria. Liver: contraindicated in hepatic coma.', th: 'ไต: ห้ามใช้ในภาวะไม่มีปัสสาวะ ตับ: ห้ามใช้ในภาวะโคม่าจากตับ' },
  esaxerenone: { en: 'Kidney: contraindicated at eGFR < 30 or K⁺ > 5.0 at start (Japan label); check K⁺ more often in diabetes with albuminuria.', th: 'ไต: ห้ามใช้เมื่อ eGFR < 30 หรือ K⁺ > 5.0 ตอนเริ่ม (ฉลากญี่ปุ่น) ตรวจ K⁺ ถี่ขึ้นในเบาหวานที่มีอัลบูมินในปัสสาวะ' },
};
const DDI_KS = [
  ['ACEi / ARB / ARNI, potassium supplements, trimethoprim, heparin and other K-sparing drugs: hyperkalemia. Check K⁺ and creatinine after any change.', 'ACEi / ARB / ARNI, โพแทสเซียมเสริม, trimethoprim, heparin และยาประหยัดโพแทสเซียมอื่น: โพแทสเซียมสูง ตรวจ K⁺ และ creatinine หลังเปลี่ยนยา'],
  ['NSAIDs: hyperkalemia and AKI.', 'NSAIDs: โพแทสเซียมสูงและ AKI'],
  ['Lithium: levels can rise.', 'Lithium: ระดับยาอาจสูงขึ้น'],
];
// Key interactions by class, plus extras for single drugs
const DDI = {
  loop: [
    ['NSAIDs blunt the diuretic effect and raise AKI risk, especially with an ACEi / ARB ("triple whammy").', 'NSAIDs ลดฤทธิ์ขับปัสสาวะและเพิ่มความเสี่ยง AKI โดยเฉพาะเมื่อใช้ร่วม ACEi / ARB ("triple whammy")'],
    ['Aminoglycosides, cisplatin: additive ototoxicity and nephrotoxicity.', 'Aminoglycosides, cisplatin: พิษต่อหูและไตเสริมกัน'],
    ['Digoxin, QT-prolonging drugs: hypokalemia and hypomagnesemia raise toxicity and arrhythmia risk.', 'Digoxin, ยาที่ยืด QT: K⁺ และ Mg²⁺ ต่ำเพิ่มความเสี่ยงพิษและหัวใจเต้นผิดจังหวะ'],
    ['Lithium: levels can rise; monitor.', 'Lithium: ระดับยาอาจสูงขึ้น ควรติดตาม'],
  ],
  thz: [
    ['Lithium: clearance falls and toxicity can follow; avoid or monitor levels.', 'Lithium: การขับออกลดลงและเกิดพิษได้ ควรหลีกเลี่ยงหรือติดตามระดับยา'],
    ['NSAIDs blunt the diuretic and antihypertensive effect.', 'NSAIDs ลดฤทธิ์ขับปัสสาวะและลดความดัน'],
    ['Digoxin, QT-prolonging drugs: hypokalemia and hypomagnesemia raise toxicity and arrhythmia risk.', 'Digoxin, ยาที่ยืด QT: K⁺ และ Mg²⁺ ต่ำเพิ่มความเสี่ยงพิษและหัวใจเต้นผิดจังหวะ'],
    ['Calcium or vitamin D supplements: hypercalcemia.', 'แคลเซียมหรือวิตามินดีเสริม: แคลเซียมสูง'],
    ['Glucose-lowering drugs: thiazides can raise glucose, so doses may need to go up.', 'ยาลดน้ำตาล: ไทอาไซด์อาจทำให้น้ำตาลสูงขึ้น อาจต้องเพิ่มขนาดยา'],
  ],
  mra: DDI_KS,
  enac: DDI_KS,
  cai: [
    ['High-dose aspirin (salicylates): accumulation and toxicity, especially in renal impairment.', 'Aspirin ขนาดสูง (salicylates): ยาสะสมและเกิดพิษ โดยเฉพาะในไตเสื่อม'],
    ['Other diuretics and corticosteroids: additive hypokalemia.', 'ยาขับปัสสาวะอื่นและคอร์ติโคสเตียรอยด์: โพแทสเซียมต่ำเสริมกัน'],
  ],
  v2: [
    ['Strong CYP3A4 inhibitors (ketoconazole, itraconazole, clarithromycin) are contraindicated: ketoconazole raised exposure about 5-fold.', 'ยายับยั้ง CYP3A4 แรง (ketoconazole, itraconazole, clarithromycin) ห้ามใช้ร่วม: ketoconazole เพิ่มระดับยาราว 5 เท่า'],
    ['CYP3A4 inducers (rifampin): weaker effect.', 'ตัวกระตุ้น CYP3A4 (rifampin): ฤทธิ์ลดลง'],
    ['Avoid hypertonic saline; keep the Na⁺ rise ≤ 8–10 mmol/L per 24 h (ODS).', 'หลีกเลี่ยง hypertonic saline และคุมการเพิ่ม Na⁺ ≤ 8–10 mmol/L ต่อ 24 ชม. (ODS)'],
  ],
  sglt: [
    ['Insulin and sulfonylureas: hypoglycemia; the dose may need to be lowered.', 'Insulin และ sulfonylureas: น้ำตาลต่ำ อาจต้องลดขนาดยา'],
    ['Loop or thiazide diuretics: additive volume depletion and hypotension.', 'ยาลูปหรือไทอาไซด์: ขาดน้ำและความดันต่ำเสริมกัน'],
  ],
};
const DDI_X = {
  eplerenone: [['Contraindicated: strong CYP3A4 inhibitors (itraconazole, ketoconazole, ritonavir, clarithromycin) and other K-sparing diuretics or K⁺ supplements. With moderate inhibitors (amiodarone, diltiazem, verapamil) the dose is capped at 25 mg.', 'ห้ามใช้ร่วม: ยายับยั้ง CYP3A4 แรง (itraconazole, ketoconazole, ritonavir, clarithromycin) และยาขับปัสสาวะประหยัดโพแทสเซียมหรือโพแทสเซียมเสริม ถ้าใช้กับตัวยับยั้งปานกลาง (amiodarone, diltiazem, verapamil) จำกัดไม่เกิน 25 mg']],
  canrenoate: [['Contraindicated with eplerenone and tacrolimus (Japan label).', 'ห้ามใช้ร่วมกับ eplerenone และ tacrolimus (ฉลากญี่ปุ่น)']],
  esaxerenone: [['Contraindicated with eplerenone, K-sparing diuretics and K⁺ supplements (Japan label).', 'ห้ามใช้ร่วมกับ eplerenone ยาขับปัสสาวะประหยัดโพแทสเซียม และโพแทสเซียมเสริม (ฉลากญี่ปุ่น)']],
};
const ddiOf = (d) => [...(DDI[d.cls] || []), ...(DDI_X[d.id] || [])];

/* ---------- Loop dose conversion ---------- */
const CONV = {
  head: [['Drug', 'ยา'], ['Equivalent dose', 'ขนาดเทียบเท่า'], ['Oral bioavailability', 'การดูดซึมทางปาก']],
  rows: [
    ['Furosemide PO', 'furosemide กิน', '40 mg', '≈ 50% (10–100%)'],
    ['Furosemide IV', 'furosemide ฉีด', '20 mg', '—'],
    ['Bumetanide PO / IV', 'bumetanide กิน / ฉีด', '1 mg', '80–100%'],
    ['Torsemide PO / IV', 'torsemide กิน / ฉีด', '20 mg', '80–100%'],
    ['Ethacrynic acid PO', 'ethacrynic acid กิน', '≈ 50 mg', 'N/A'],
  ],
  notes: [
    ['Equivalence is for natriuretic potency at usual doses: start from the equivalent dose and titrate to urine output.', 'ขนาดเทียบเท่าคิดจากฤทธิ์ขับโซเดียมที่ขนาดปกติ ให้เริ่มจากขนาดเทียบเท่าแล้วปรับตามปริมาณปัสสาวะ'],
    ['Furosemide IV : PO is about 1 : 2. Switch to bumetanide or torsemide when gut edema makes furosemide absorption unreliable.', 'furosemide IV : PO ประมาณ 1 : 2 เปลี่ยนเป็น bumetanide หรือ torsemide เมื่อลำไส้บวมทำให้การดูดซึม furosemide ไม่แน่นอน'],
    ['Furosemide IV bolus ceiling: normal kidney 40 mg, CKD 80–160 mg, HF 40–160 mg; a higher dose then needs a shorter interval, not a larger bolus (see the resistance guide).', 'ceiling ของ furosemide IV bolus: ไตปกติ 40 mg, CKD 80–160 mg, HF 40–160 mg เกินนี้ให้ลดช่วงห่างระหว่างโดส ไม่ใช่เพิ่ม bolus (ดูหัวข้อดื้อยา)'],
    ['Thiazide-type: chlorthalidone is roughly 1.5–2 times as potent per mg as HCTZ and acts 40–60 h (approximate).', 'ไทอาไซด์: chlorthalidone แรงกว่า HCTZ ต่อ mg ราว 1.5–2 เท่า และออกฤทธิ์ 40–60 ชม. (โดยประมาณ)'],
  ],
  src: 'Brater DC. NEJM 1998;339:387; Mullens W et al. Eur J Heart Fail 2019;21:137 (ESC HFA). Approximate values: check the local protocol.',
};
function ConvertModal({ onClose, lang }) {
  const i = lang === 'th' ? 1 : 0;
  return (
    <Modal title={TXT.conv[i]} onClose={onClose} lang={lang}>
      <div className="overflow-x-auto">
        <table className="w-full text-[12px] border-collapse">
          <thead><tr>{CONV.head.map((h, k) => <th key={k} className={'text-left py-1 pr-2 border-b border-slate-200 dark:border-[#263449] font-bold ' + MUTED}>{h[i]}</th>)}</tr></thead>
          <tbody>{CONV.rows.map((r, k) => (
            <tr key={k} className="border-b border-slate-100 dark:border-[#1c2a40]">
              <td className="py-1.5 pr-2 font-semibold">{r[i]}</td><td className="py-1.5 pr-2 tabular-nums font-bold text-blue-700 dark:text-blue-300">{r[2]}</td><td className="py-1.5 tabular-nums">{r[3]}</td>
            </tr>))}</tbody>
        </table>
      </div>
      <ul className="list-disc pl-4 space-y-1 text-[12px]">{CONV.notes.map((n, k) => <li key={k}>{n[i]}</li>)}</ul>
      <p className={'text-[10px] leading-snug ' + MUTED}><b>{TXT.source[i]}:</b> {CONV.src}</p>
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
  src: 'Mullens W et al. Eur J Heart Fail 2019;21:137 (ESC HFA position statement on diuretics); Mullens W et al. NEJM 2022;387:1185 (ADVOR); Brater DC. NEJM 1998;339:387; ScienceDirect Topics, "Nephron" (Medicine and Dentistry), sciencedirect.com/topics/medicine-and-dentistry/nephron. Doses are typical adult values; verify against your local protocol.',
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

/* ---------- Key clinical trials per drug (abstracts checked on PubMed, 2026-11-04) ---------- */
// T(name, citation, PMID, DOI, design [en, th], result [en, th])
const T = (n, cite, pm, doi, d, r) => ({ n, cite, pm, doi, d, r });
const TR = {
  dose: T('DOSE', 'Felker GM, et al. N Engl J Med 2011;364:797', '21366472', '10.1056/NEJMoa1005419',
    ['308 patients with acute decompensated HF: IV furosemide as bolus every 12 h vs continuous infusion, and low vs high dose (2.5 × the oral dose).', '308 รายที่หัวใจล้มเหลวเฉียบพลัน: furosemide IV แบบ bolus ทุก 12 ชม. เทียบกับหยดต่อเนื่อง และขนาดต่ำเทียบขนาดสูง (2.5 เท่าของขนาดกินเดิม)'],
    ['No significant difference in symptoms or creatinine change for bolus vs infusion, or high vs low dose. High dose: trend to better symptom score (P = 0.06) and more diuresis, but transient worsening of renal function.', 'ไม่ต่างกันอย่างมีนัยสำคัญด้านอาการหรือการเปลี่ยนแปลง creatinine ระหว่าง bolus กับหยดต่อเนื่อง หรือขนาดสูงกับขนาดต่ำ ขนาดสูงมีแนวโน้มอาการดีกว่า (P = 0.06) ขับปัสสาวะมากกว่า แต่ไตเสื่อมชั่วคราว']),
  transform: T('TRANSFORM-HF', 'Mentz RJ, et al. JAMA 2023;329:214', '36648467', '10.1001/jama.2022.23924',
    ['2,859 patients discharged after a heart failure hospitalisation: torsemide vs furosemide, 12 months.', '2,859 รายหลังออกจากโรงพยาบาลจากหัวใจล้มเหลว: torsemide เทียบกับ furosemide ติดตาม 12 เดือน'],
    ['All-cause death 26.1% vs 26.2% (HR 1.02, 95% CI 0.89–1.18). Death or hospitalisation 47.3% vs 49.3% (HR 0.92, 0.83–1.02). Limited by loss to follow-up and crossover.', 'เสียชีวิตจากทุกสาเหตุ 26.1% เทียบ 26.2% (HR 1.02, 95% CI 0.89–1.18) เสียชีวิตหรือนอนโรงพยาบาล 47.3% เทียบ 49.3% (HR 0.92, 0.83–1.02) ข้อจำกัด: ผู้ป่วยติดตามไม่ครบและมีการเปลี่ยนกลุ่มยา']),
  dcp: T('Diuretic Comparison Project', 'Ishani A, et al. N Engl J Med 2022;387:2401', '36516076', '10.1056/NEJMoa2212270',
    ['13,523 veterans aged ≥ 65 taking HCTZ 25–50 mg: continue HCTZ or switch to chlorthalidone 12.5–25 mg (pragmatic trial).', 'ทหารผ่านศึก 13,523 ราย อายุ ≥ 65 ปี ที่ใช้ HCTZ 25–50 mg: ใช้ HCTZ ต่อหรือเปลี่ยนเป็น chlorthalidone 12.5–25 mg (pragmatic trial)'],
    ['Primary outcome (MI, stroke, HF hospitalisation, urgent revascularisation, non-cancer death) 10.4% vs 10.0% (HR 1.04, 0.94–1.16): no difference. Hypokalemia 6.0% vs 4.4% (chlorthalidone vs HCTZ).', 'ผลลัพธ์หลัก (MI, stroke, นอนโรงพยาบาลจาก HF, revascularisation เร่งด่วน, เสียชีวิตที่ไม่ใช่มะเร็ง) 10.4% เทียบ 10.0% (HR 1.04, 0.94–1.16) ไม่ต่างกัน โพแทสเซียมต่ำ 6.0% เทียบ 4.4% (chlorthalidone เทียบ HCTZ)']),
  clorotic: T('CLOROTIC', 'Trullàs JC, et al. Eur Heart J 2023;44:411', '36423214', '10.1093/eurheartj/ehac689',
    ['230 patients (mean age 83) with acute HF: HCTZ or placebo added to IV furosemide.', '230 ราย (อายุเฉลี่ย 83 ปี) หัวใจล้มเหลวเฉียบพลัน: เพิ่ม HCTZ หรือยาหลอกร่วมกับ furosemide IV'],
    ['Weight loss at 72 h 2.3 vs 1.5 kg (P = 0.002) and more 24-h diuresis; no difference in dyspnea score. Worse renal function more often with HCTZ (46.5% vs 17.2%). No difference in mortality or rehospitalisation.', 'น้ำหนักลดที่ 72 ชม. 2.3 เทียบ 1.5 กก. (P = 0.002) ปัสสาวะ 24 ชม. มากกว่า คะแนนเหนื่อยไม่ต่างกัน ไตเสื่อมพบบ่อยกว่าในกลุ่ม HCTZ (46.5% เทียบ 17.2%) การเสียชีวิตและการนอนโรงพยาบาลซ้ำไม่ต่างกัน']),
  click: T('CLICK', 'Agarwal R, et al. N Engl J Med 2021;385:2507', '34739197', '10.1056/NEJMoa2110730',
    ['Stage 4 CKD with poorly controlled hypertension: chlorthalidone (12.5 mg, up to 50 mg) vs placebo for 12 weeks.', 'CKD ระยะ 4 ที่ความดันคุมไม่ดี: chlorthalidone (เริ่ม 12.5 mg สูงสุด 50 mg) เทียบกับยาหลอก 12 สัปดาห์'],
    ['24-h systolic BP −10.5 mm Hg vs placebo (95% CI −14.6 to −6.4). Albumin-to-creatinine ratio 50 percentage points lower. More hypokalemia, reversible creatinine rise, hyperglycemia and hyperuricemia.', 'ความดันตัวบน 24 ชม. ลดลงมากกว่ายาหลอก 10.5 mm Hg (95% CI −14.6 ถึง −6.4) อัตราส่วนอัลบูมิน/ครีเอตินินลดลงมากกว่า 50 จุดร้อยละ พบโพแทสเซียมต่ำ creatinine ขึ้นชั่วคราว น้ำตาลสูง และยูริกสูงบ่อยกว่า']),
  allhat: T('ALLHAT', 'ALLHAT Collaborative Research Group. JAMA 2002;288:2981', '12479763', '10.1001/jama.288.23.2981',
    ['33,357 high-risk hypertensive patients aged ≥ 55: chlorthalidone vs amlodipine vs lisinopril.', 'ผู้ป่วยความดันสูงเสี่ยงสูง 33,357 ราย อายุ ≥ 55 ปี: chlorthalidone เทียบ amlodipine เทียบ lisinopril'],
    ['Fatal CHD or non-fatal MI: amlodipine RR 0.98 (0.90–1.07) and lisinopril RR 0.99 (0.91–1.08) vs chlorthalidone. Heart failure was higher with amlodipine (RR 1.38) and lisinopril (RR 1.19).', 'โรคหลอดเลือดหัวใจเสียชีวิตหรือ MI ไม่เสียชีวิต: amlodipine RR 0.98 (0.90–1.07) และ lisinopril RR 0.99 (0.91–1.08) เทียบกับ chlorthalidone หัวใจล้มเหลวพบมากกว่าด้วย amlodipine (RR 1.38) และ lisinopril (RR 1.19)']),
  hyvet: T('HYVET', 'Beckett NS, et al. N Engl J Med 2008;358:1887', '18378519', '10.1056/NEJMoa0801369',
    ['3,845 patients aged ≥ 80 with systolic BP ≥ 160 mm Hg: indapamide SR 1.5 mg (perindopril added if needed) vs placebo.', '3,845 ราย อายุ ≥ 80 ปี ความดันตัวบน ≥ 160 mm Hg: indapamide SR 1.5 mg (เพิ่ม perindopril ถ้าจำเป็น) เทียบกับยาหลอก'],
    ['BP 15.0/6.1 mm Hg lower. Stroke −30% (P = 0.06), all-cause death −21% (P = 0.02), heart failure −64% (P < 0.001). Fewer serious adverse events.', 'ความดันลดลง 15.0/6.1 mm Hg stroke ลด 30% (P = 0.06) เสียชีวิตทุกสาเหตุลด 21% (P = 0.02) หัวใจล้มเหลวลด 64% (P < 0.001) เหตุการณ์ไม่พึงประสงค์รุนแรงน้อยกว่า']),
  progress: T('PROGRESS', 'PROGRESS Collaborative Group. Lancet 2001;358:1033', '11589932', '10.1016/S0140-6736(01)06178-5',
    ['6,105 patients with previous stroke or TIA: perindopril-based regimen (indapamide added at the physician’s discretion) vs placebo.', '6,105 ราย เคยเป็น stroke หรือ TIA: สูตรที่ใช้ perindopril เป็นหลัก (เพิ่ม indapamide ตามดุลยพินิจแพทย์) เทียบกับยาหลอก'],
    ['Stroke reduced 28% (95% CI 17–38). Perindopril + indapamide: BP −12/5 mm Hg and stroke −43%; perindopril alone: no clear stroke reduction.', 'stroke ลด 28% (95% CI 17–38) perindopril + indapamide: ความดันลด 12/5 mm Hg และ stroke ลด 43% perindopril เดี่ยว: ไม่เห็นการลด stroke ชัดเจน']),
  advance: T('ADVANCE', 'Patel A, et al. Lancet 2007;370:829', '17765963', '10.1016/S0140-6736(07)61303-8',
    ['11,140 patients with type 2 diabetes: fixed perindopril–indapamide vs placebo on top of usual therapy.', '11,140 ราย เบาหวานชนิดที่ 2: perindopril–indapamide แบบรวมเม็ดเทียบกับยาหลอก เสริมจากการรักษาเดิม'],
    ['Major macro- or microvascular event HR 0.91 (0.83–1.00); CV death HR 0.82 (0.68–0.98); all-cause death HR 0.86 (0.75–0.98).', 'หลอดเลือดขนาดใหญ่หรือเล็กผิดปกติรุนแรง HR 0.91 (0.83–1.00) เสียชีวิตจากหัวใจและหลอดเลือด HR 0.82 (0.68–0.98) เสียชีวิตทุกสาเหตุ HR 0.86 (0.75–0.98)']),
  rales: T('RALES', 'Pitt B, et al. N Engl J Med 1999;341:709', '10471456', '10.1056/NEJM199909023411001',
    ['1,663 patients with severe HF (LVEF ≤ 35%) on an ACE inhibitor and a loop diuretic: spironolactone 25 mg vs placebo.', '1,663 ราย หัวใจล้มเหลวรุนแรง (LVEF ≤ 35%) ที่ได้ ACEi และยาลูป: spironolactone 25 mg เทียบกับยาหลอก'],
    ['Death 35% vs 46% (RR 0.70, 0.60–0.82). Stopped early after a mean of 24 months.', 'เสียชีวิต 35% เทียบ 46% (RR 0.70, 0.60–0.82) หยุดการศึกษาก่อนกำหนดที่เฉลี่ย 24 เดือน']),
  topcat: T('TOPCAT', 'Pitt B, et al. N Engl J Med 2014;370:1383', '24716680', '10.1056/NEJMoa1313731',
    ['3,445 patients with HF and LVEF ≥ 45%: spironolactone 15–45 mg vs placebo, mean 3.3 years.', '3,445 ราย หัวใจล้มเหลวที่ LVEF ≥ 45%: spironolactone 15–45 mg เทียบกับยาหลอก เฉลี่ย 3.3 ปี'],
    ['CV death, aborted cardiac arrest or HF hospitalisation 18.6% vs 20.4% (HR 0.89, 0.77–1.04, P = 0.14): not significant.', 'เสียชีวิตจากหัวใจ หัวใจหยุดเต้นที่กู้ได้ หรือนอนโรงพยาบาลจาก HF 18.6% เทียบ 20.4% (HR 0.89, 0.77–1.04, P = 0.14) ไม่มีนัยสำคัญ']),
  athena: T('ATHENA-HF', 'Butler J, et al. JAMA Cardiol 2017', '28700781', '10.1001/jamacardio.2017.2198',
    ['360 patients with acute HF: high-dose spironolactone for 96 h vs usual care.', '360 ราย หัวใจล้มเหลวเฉียบพลัน: spironolactone ขนาดสูง 96 ชม. เทียบกับการรักษาปกติ'],
    ['NT-proBNP fall did not differ (−0.55 vs −0.49 log units, P = 0.57); no difference in day-30 death or HF hospitalisation. Well tolerated, similar potassium and eGFR changes.', 'NT-proBNP ลดลงไม่ต่างกัน (−0.55 เทียบ −0.49 log, P = 0.57) การเสียชีวิตหรือนอนโรงพยาบาลจาก HF ที่ 30 วันไม่ต่างกัน ทนยาได้ดี โพแทสเซียมและ eGFR เปลี่ยนใกล้เคียงกัน']),
  pathway2: T('PATHWAY-2', 'Williams B, et al. Lancet 2015;386:2059', '26414968', '10.1016/S0140-6736(15)00257-3',
    ['Resistant hypertension despite 3 drugs: crossover of spironolactone 25–50 mg, bisoprolol, doxazosin and placebo, 12 weeks each.', 'ความดันสูงดื้อยาแม้ได้ยา 3 ชนิด: crossover spironolactone 25–50 mg, bisoprolol, doxazosin และยาหลอก ชนิดละ 12 สัปดาห์'],
    ['Home systolic BP −8.70 mm Hg vs placebo (95% CI −9.72 to −7.69), superior to the mean of the other two active drugs.', 'ความดันตัวบนที่บ้านลด 8.70 mm Hg เทียบกับยาหลอก (95% CI −9.72 ถึง −7.69) ดีกว่าค่าเฉลี่ยของยาออกฤทธิ์อีกสองชนิด']),
  ephesus: T('EPHESUS', 'Pitt B, et al. N Engl J Med 2003;348:1309', '12668699', '10.1056/NEJMoa030207',
    ['6,632 patients with MI complicated by LV dysfunction and HF: eplerenone 25–50 mg vs placebo.', '6,632 ราย MI ที่มี LV dysfunction และ HF: eplerenone 25–50 mg เทียบกับยาหลอก'],
    ['Deaths 478 vs 554 over a mean of 16 months. CV death or CV hospitalisation RR 0.87 (0.79–0.95); sudden cardiac death RR 0.79 (0.64–0.97). Serious hyperkalemia 5.5% vs 3.9%.', 'เสียชีวิต 478 เทียบ 554 ราย ที่เฉลี่ย 16 เดือน เสียชีวิตจากหัวใจหรือนอนโรงพยาบาลจากหัวใจ RR 0.87 (0.79–0.95) เสียชีวิตเฉียบพลันจากหัวใจ RR 0.79 (0.64–0.97) โพแทสเซียมสูงรุนแรง 5.5% เทียบ 3.9%']),
  emphasis: T('EMPHASIS-HF', 'Zannad F, et al. N Engl J Med 2011;364:11', '21073363', '10.1056/NEJMoa1009492',
    ['2,737 patients with NYHA II HFrEF (LVEF ≤ 35%): eplerenone up to 50 mg vs placebo.', '2,737 ราย HFrEF NYHA II (LVEF ≤ 35%): eplerenone สูงสุด 50 mg เทียบกับยาหลอก'],
    ['CV death or HF hospitalisation 18.3% vs 25.9% (HR 0.63). Stopped early after a median of 21 months.', 'เสียชีวิตจากหัวใจหรือนอนโรงพยาบาลจาก HF 18.3% เทียบ 25.9% (HR 0.63) หยุดการศึกษาก่อนกำหนดที่มัธยฐาน 21 เดือน']),
  salt: T('SALT-1 / SALT-2', 'Schrier RW, et al. N Engl J Med 2006;355:2099', '17105757', '10.1056/NEJMoa065181',
    ['Euvolemic or hypervolemic hyponatremia (including HF and cirrhosis): tolvaptan vs placebo for 30 days.', 'โซเดียมต่ำชนิด euvolemic หรือ hypervolemic (รวม HF และตับแข็ง): tolvaptan เทียบกับยาหลอก 30 วัน'],
    ['Serum Na⁺ rose more than with placebo at day 4 and day 30 (P < 0.001); hyponatremia recurred after stopping. Thirst, dry mouth and urination were the common effects.', 'Na⁺ ในเลือดสูงขึ้นมากกว่ายาหลอกที่วันที่ 4 และ 30 (P < 0.001) โซเดียมต่ำกลับมาเมื่อหยุดยา ผลข้างเคียงที่พบบ่อยคือกระหายน้ำ ปากแห้ง ปัสสาวะบ่อย']),
  tempo: T('TEMPO 3:4', 'Torres VE, et al. N Engl J Med 2012;367:2407', '23121377', '10.1056/NEJMoa1205511',
    ['1,445 patients aged 18–50 with ADPKD: tolvaptan vs placebo for 3 years.', '1,445 ราย อายุ 18–50 ปี โรค ADPKD: tolvaptan เทียบกับยาหลอก 3 ปี'],
    ['Slower rise in total kidney volume and slower fall in kidney function (−2.61 vs −3.81 per year, P < 0.001). More aquaresis and liver adverse events; discontinuation 23% vs 14%.', 'ปริมาตรไตรวมเพิ่มช้าลงและการทำงานของไตลดช้าลง (−2.61 เทียบ −3.81 ต่อปี, P < 0.001) พบ aquaresis และผลต่อตับมากกว่า หยุดยา 23% เทียบ 14%']),
  everest: T('EVEREST', 'Konstam MA, et al. JAMA 2007;297:1319', '17384437', '10.1001/jama.297.12.1319',
    ['Patients hospitalised for worsening HF: tolvaptan vs placebo added to standard care (median follow-up 9.9 months).', 'ผู้ป่วยนอนโรงพยาบาลจาก HF กำเริบ: tolvaptan เทียบกับยาหลอก เสริมการรักษามาตรฐาน (ติดตามมัธยฐาน 9.9 เดือน)'],
    ['All-cause death 25.9% vs 26.3% (HR 0.98); CV death or HF hospitalisation HR 1.04 (0.95–1.14). Early benefit for dyspnea, weight and edema, but no long-term benefit.', 'เสียชีวิตทุกสาเหตุ 25.9% เทียบ 26.3% (HR 0.98) เสียชีวิตจากหัวใจหรือนอนโรงพยาบาลจาก HF HR 1.04 (0.95–1.14) อาการเหนื่อย น้ำหนัก และบวมดีขึ้นช่วงแรก แต่ไม่มีประโยชน์ระยะยาว']),
  advor: T('ADVOR', 'Mullens W, et al. N Engl J Med 2022;387:1185', '36027559', '10.1056/NEJMoa2203094',
    ['519 patients with acute decompensated HF and volume overload: IV acetazolamide 500 mg added to a loop diuretic vs placebo.', '519 ราย หัวใจล้มเหลวเฉียบพลันที่มีน้ำเกิน: acetazolamide IV 500 mg เสริมยาลูปเทียบกับยาหลอก'],
    ['Successful decongestion 42.2% vs 30.5% (risk ratio 1.46, 1.17–1.82). Death or HF rehospitalisation 29.7% vs 27.8% (HR 1.07, 0.78–1.48). Worsening kidney function, hypokalemia and hypotension were similar.', 'ลดบวมสำเร็จ 42.2% เทียบ 30.5% (risk ratio 1.46, 1.17–1.82) เสียชีวิตหรือนอนโรงพยาบาลซ้ำจาก HF 29.7% เทียบ 27.8% (HR 1.07, 0.78–1.48) ไตเสื่อม โพแทสเซียมต่ำ และความดันต่ำไม่ต่างกัน']),
  dapahf: T('DAPA-HF', 'McMurray JJV, et al. N Engl J Med 2019;381:1995', '31535829', '10.1056/NEJMoa1911303',
    ['4,744 patients with HFrEF: dapagliflozin 10 mg vs placebo, median 18.2 months.', '4,744 ราย HFrEF: dapagliflozin 10 mg เทียบกับยาหลอก มัธยฐาน 18.2 เดือน'],
    ['Worsening HF or CV death 16.3% vs 21.2% (HR 0.74, P < 0.001); CV death HR 0.82.', 'HF กำเริบหรือเสียชีวิตจากหัวใจ 16.3% เทียบ 21.2% (HR 0.74, P < 0.001) เสียชีวิตจากหัวใจ HR 0.82']),
  dapackd: T('DAPA-CKD', 'Heerspink HJL, et al. N Engl J Med 2020;383:1436', '32970396', '10.1056/NEJMoa2024816',
    ['4,304 patients with CKD, with or without diabetes: dapagliflozin 10 mg vs placebo, median 2.4 years.', '4,304 ราย CKD ทั้งมีและไม่มีเบาหวาน: dapagliflozin 10 mg เทียบกับยาหลอก มัธยฐาน 2.4 ปี'],
    ['Primary kidney composite 9.2% vs 14.5% (HR 0.61, P < 0.001); sustained ≥ 50% eGFR decline, end-stage kidney disease or renal death HR 0.56 (0.45–0.68).', 'ผลลัพธ์รวมด้านไต 9.2% เทียบ 14.5% (HR 0.61, P < 0.001) eGFR ลด ≥ 50% ต่อเนื่อง ไตวายระยะสุดท้าย หรือเสียชีวิตจากไต HR 0.56 (0.45–0.68)']),
  deliver: T('DELIVER', 'Solomon SD, et al. N Engl J Med 2022;387:1089', '36027570', '10.1056/NEJMoa2206286',
    ['6,263 patients with HF and LVEF > 40%: dapagliflozin vs placebo, median 2.3 years.', '6,263 ราย HF ที่ LVEF > 40%: dapagliflozin เทียบกับยาหลอก มัธยฐาน 2.3 ปี'],
    ['Worsening HF or CV death 16.4% vs 19.5% (HR 0.82, P < 0.001).', 'HF กำเริบหรือเสียชีวิตจากหัวใจ 16.4% เทียบ 19.5% (HR 0.82, P < 0.001)']),
  emperorr: T('EMPEROR-Reduced', 'Packer M, et al. N Engl J Med 2020;383:1413', '32865377', '10.1056/NEJMoa2022190',
    ['3,730 patients with HFrEF: empagliflozin 10 mg vs placebo, median 16 months.', '3,730 ราย HFrEF: empagliflozin 10 mg เทียบกับยาหลอก มัธยฐาน 16 เดือน'],
    ['CV death or HF hospitalisation 19.4% vs 24.7% (HR 0.75, P < 0.001); slower decline in eGFR.', 'เสียชีวิตจากหัวใจหรือนอนโรงพยาบาลจาก HF 19.4% เทียบ 24.7% (HR 0.75, P < 0.001) eGFR ลดช้าลง']),
  emperorp: T('EMPEROR-Preserved', 'Anker SD, et al. N Engl J Med 2021;385:1451', '34449189', '10.1056/NEJMoa2107038',
    ['5,988 patients with HF and LVEF > 40%: empagliflozin vs placebo, median 26.2 months.', '5,988 ราย HF ที่ LVEF > 40%: empagliflozin เทียบกับยาหลอก มัธยฐาน 26.2 เดือน'],
    ['CV death or HF hospitalisation 13.8% vs 17.1% (HR 0.79, P < 0.001).', 'เสียชีวิตจากหัวใจหรือนอนโรงพยาบาลจาก HF 13.8% เทียบ 17.1% (HR 0.79, P < 0.001)']),
  empakidney: T('EMPA-KIDNEY', 'Herrington WG, et al. N Engl J Med 2023;388:117', '36331190', '10.1056/NEJMoa2204233',
    ['6,609 patients with CKD (eGFR 20–45, or 45–90 with urinary ACR ≥ 200): empagliflozin 10 mg vs placebo, median 2.0 years.', '6,609 ราย CKD (eGFR 20–45 หรือ 45–90 ที่ ACR ปัสสาวะ ≥ 200): empagliflozin 10 mg เทียบกับยาหลอก มัธยฐาน 2.0 ปี'],
    ['Kidney disease progression or CV death 13.1% vs 16.9% (HR 0.72, P < 0.001); fewer hospitalisations for any cause.', 'ไตเสื่อมลงหรือเสียชีวิตจากหัวใจ 13.1% เทียบ 16.9% (HR 0.72, P < 0.001) นอนโรงพยาบาลจากทุกสาเหตุน้อยกว่า']),
  mrc: T('MRC mild hypertension trial', 'MRC Working Party. Br Med J 1985;291:97', '2861880', '10.1136/bmj.291.6488.97',
    ['Mild hypertension (diastolic 90–109 mm Hg), ages 35–64: bendroflumethiazide vs propranolol vs placebo.', 'ความดันสูงเล็กน้อย (diastolic 90–109 mm Hg) อายุ 35–64 ปี: bendroflumethiazide เทียบ propranolol เทียบยาหลอก'],
    ['Treatment reduced stroke; the reduction in stroke on bendroflumethiazide was greater than on propranolol (P = 0.002).', 'การรักษาลด stroke ได้ การลด stroke ด้วย bendroflumethiazide มากกว่า propranolol (P = 0.002)']),
  esaxhtn: T('ESAX-HTN', 'Ito S, et al. Hypertension 2020 (esaxerenone vs eplerenone)', '31786983', '10.1161/HYPERTENSIONAHA.119.13569',
    ['Japanese patients with essential hypertension: esaxerenone 2.5 or 5 mg vs eplerenone 50 mg, double-blind phase 3.', 'ผู้ป่วยญี่ปุ่นที่ความดันสูงไม่ทราบสาเหตุ: esaxerenone 2.5 หรือ 5 mg เทียบ eplerenone 50 mg แบบ double-blind phase 3'],
    ['Target BP (< 140/90 mm Hg) reached by 31.5% (2.5 mg) and 41.2% (5 mg) vs 27.5% with eplerenone 50 mg.', 'ความดันถึงเป้า (< 140/90 mm Hg) ใน 31.5% (2.5 mg) และ 41.2% (5 mg) เทียบ 27.5% ด้วย eplerenone 50 mg']),
  esaxdn: T('ESAX-DN', 'Ito S, et al. Clin J Am Soc Nephrol 2020;15:1715', '33239409', '10.2215/CJN.06870520',
    ['Type 2 diabetes with microalbuminuria: esaxerenone vs placebo.', 'เบาหวานชนิดที่ 2 ที่มีอัลบูมินในปัสสาวะเล็กน้อย: esaxerenone เทียบกับยาหลอก'],
    ['Albuminuria remission HR 5.13 (3.27–8.04); progression to ACR ≥ 300 mg/g HR 0.23. Serum K⁺ ≥ 5.5 mEq/L on two consecutive measurements in 9% vs 2% with placebo.', 'อัลบูมินในปัสสาวะหายไป HR 5.13 (3.27–8.04) ก้าวไป ACR ≥ 300 mg/g HR 0.23 K⁺ ≥ 5.5 mEq/L สองครั้งติดกัน 9% เทียบ 2% ในกลุ่มยาหลอก']),
};
// Trials per drug; a drug with no entry shows "no landmark trial included" (N/A)
const TRIALS_OF = {
  acetazolamide: ['advor'], furosemide: ['dose', 'transform'], torsemide: ['transform'], hctz: ['dcp', 'clorotic'],
  chlorthalidone: ['click', 'dcp', 'allhat'], indapamide: ['hyvet', 'progress', 'advance'], spironolactone: ['rales', 'topcat', 'athena', 'pathway2'],
  eplerenone: ['ephesus', 'emphasis'], tolvaptan: ['salt', 'tempo', 'everest'], dapagliflozin: ['dapahf', 'dapackd', 'deliver'],
  empagliflozin: ['emperorr', 'emperorp', 'empakidney'], bendroflumethiazide: ['mrc'], esaxerenone: ['esaxhtn', 'esaxdn'],
};
function Trials({ d, lang }) {
  const i = lang === 'th' ? 1 : 0;
  const list = (TRIALS_OF[d.id] || []).map(k => TR[k]);
  if (!list.length) return <p className={MUTED}>{TXT.noTrial[i]}</p>;
  return (
    <div className="space-y-2.5">
      {list.map(x => (
        <div key={x.n} className={'rounded-lg border p-2 ' + INSET}>
          <div className="font-extrabold">{x.n}</div>
          <div className={'text-[10px] ' + MUTED}>{x.cite}</div>
          <p className="mt-1"><b>{TXT.design[i]}:</b> {x.d[i]}</p>
          <p className="mt-0.5"><b>{TXT.result[i]}:</b> {x.r[i]}</p>
          <div className="mt-1 flex gap-3 text-[10px]">
            <a href={'https://pubmed.ncbi.nlm.nih.gov/' + x.pm + '/'} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">PubMed {x.pm}</a>
            <a href={'https://doi.org/' + x.doi} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline break-all">DOI</a>
          </div>
        </div>
      ))}
    </div>
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
      {RENAL[d.id] && <Fold title={t('renal')} color="border-l-teal-500"><p>{RENAL[d.id][lang]}</p></Fold>}
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
        <ul className="space-y-0.5">{d.se.map(x => <li key={x} className="flex items-start gap-1.5">{CAUTION.has(x) ? <WarnIcon className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" /> : <span className="w-3.5 shrink-0 text-center text-slate-400">•</span>}<span className={CAUTION.has(x) ? 'font-bold' : ''}>{SE[x][i]}</span></li>)}</ul>
      </Fold>
      {ddiOf(d).length > 0 && <Fold title={t('ddi')} color="border-l-fuchsia-500"><ul className="list-disc pl-4 space-y-1">{ddiOf(d).map((x, k) => <li key={k}>{x[i]}</li>)}</ul></Fold>}
      <Fold title={t('pearl')} color="border-l-amber-500"><p>{d.pearl[lang]}</p></Fold>
      <Fold title={t('trials')} color="border-l-violet-500"><Trials d={d} lang={lang} /></Fold>
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
        <div className="flex items-center gap-2 text-[12px]"><span className={'inline-flex items-center gap-1 rounded border px-1.5 py-px text-[10px] font-bold ' + WARN_CHIP}><WarnIcon className="w-3 h-3" />{SE.hyperK[i]}</span>{TXT.caution[i]}</div>
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

/* ---------- References (same collapsible section as the bronchodilator guide) ---------- */
const REFS = [
  { cite: 'คณะกรรมการพัฒนาระบบยาแห่งชาติ. ประกาศคณะกรรมการพัฒนาระบบยาแห่งชาติ เรื่อง บัญชียาหลักแห่งชาติ พ.ศ. 2569. ราชกิจจานุเบกษา (30 มีนาคม 2569).', url: 'https://ndp.fda.moph.go.th/nlem/69-1',
    en: 'Thai NLEM 2569 status, category and forms (checked row by row against the official list).', th: 'สถานะ หมวด และรูปแบบยาในบัญชียาหลักแห่งชาติ 2569 (ตรวจทีละรายการกับบัญชีฉบับจริง)' },
  { cite: 'MIMS Thailand. Drug monographs and brand listings (accessed 4 November 2026).', url: 'https://www.mims.com/thailand',
    en: 'Thai brands and Thai dosing.', th: 'ยี่ห้อและขนาดยาในประเทศไทย' },
  { cite: 'U.S. Food and Drug Administration. openFDA Drugs@FDA API (accessed 4 November 2026).', url: 'https://open.fda.gov/apis/drug/drugsfda/',
    en: 'US status (current, past, never).', th: 'สถานะในสหรัฐฯ (ปัจจุบัน เคยมี ไม่เคยมี)' },
  { cite: 'Electronic Medicines Compendium (emc). UK summaries of product characteristics (accessed 4 November 2026).', url: 'https://www.medicines.org.uk/emc',
    en: 'UK status, UK dosing (bendroflumethiazide, indapamide, eplerenone) and SGLT2 inhibitor eGFR limits.', th: 'สถานะและขนาดยาใน UK (bendroflumethiazide, indapamide, eplerenone) และเกณฑ์ eGFR ของ SGLT2i' },
  { cite: 'Agencia Española de Medicamentos y Productos Sanitarios (AEMPS). CIMA medicines database (accessed 4 November 2026).', url: 'https://cima.aemps.es',
    en: 'EU status: marketed products in Spain.', th: 'สถานะใน EU: ยาที่จำหน่ายในสเปน' },
  { cite: 'European Medicines Agency. Metolazone: list of nationally authorised medicinal products (PSUSA/00002037/202506).', url: 'https://www.ema.europa.eu/en/documents/psusa/metolazone-list-nationally-authorised-medicinal-products-psusa-00002037-202506_en.pdf',
    en: 'EU status of metolazone (Denmark, Italy).', th: 'สถานะ metolazone ใน EU (เดนมาร์ก อิตาลี)' },
  { cite: 'Läkemedelsverket (Swedish Medical Products Agency). Bendroflumetiazid Evolan 2.5 mg tablets: summary of product characteristics.', url: 'https://docetp.mpa.se/LMF/Bendroflumetiazid%20Evolan%20tablet%20ENG%20SmPC_09001bee807a0c7b.pdf',
    en: 'EU status of bendroflumethiazide (Sweden).', th: 'สถานะ bendroflumethiazide ใน EU (สวีเดน)' },
  { cite: 'Bioindustria L.I.M. Reomax (ethacrynic acid) 50 mg tablets, Italy: product information (Codifa).', url: 'https://www.codifa.it/farmaci/r/reomax-compresse-acido-etacrinico--acido-etacrinico-diuretici',
    en: 'EU status of ethacrynic acid (Italy).', th: 'สถานะ ethacrynic acid ใน EU (อิตาลี)' },
  { cite: 'Kanrenol (potassium canrenoate), Italy: product information (MyPersonalTrainer).', url: 'https://www.my-personaltrainer.it/farmaci/kanrenol.html',
    en: 'EU status of potassium canrenoate (Italy); a secondary source, not an official register.', th: 'สถานะ potassium canrenoate ใน EU (อิตาลี) เป็นแหล่งรอง ไม่ใช่ทะเบียนทางการ' },
  { cite: 'Aquaphoril (xipamide) tablets, Austria: patient leaflet, September 2020 (Medikamio).', url: 'https://medikamio.com/de-at/medikamente/aquaphoril-tabletten/pil',
    en: 'Xipamide dosing, contraindications and electrolyte effects.', th: 'ขนาดยา ข้อห้ามใช้ และผลต่ออิเล็กโทรไลต์ของ xipamide' },
  { cite: 'KEGG MEDICUS. Japanese prescription drug products (JAPIC) (accessed 4 November 2026).', url: 'https://www.kegg.jp/medicus/',
    en: 'Japan status and Japanese brands.', th: 'สถานะและยี่ห้อในญี่ปุ่น' },
  { cite: 'Pharmaceuticals and Medical Devices Agency (PMDA). Japanese package inserts: Fluitran (trichlormethiazide), Diart (azosemide), Soldactone (canrenoate), Minebro (esaxerenone).', url: 'https://www.pmda.go.jp/PmdaSearch/iyakuSearch/',
    en: 'Japan doses, contraindications and warnings for these four drugs.', th: 'ขนาดยา ข้อห้ามใช้ และคำเตือนของยา 4 ชนิดนี้ในญี่ปุ่น' },
  { cite: 'Otsuka. Samsca (tolvaptan) prescribing information.', url: 'https://www.drugs.com/pro/samsca.html',
    en: 'Tolvaptan contraindications and CYP3A4 interactions.', th: 'ข้อห้ามใช้และปฏิกิริยาระหว่างยา CYP3A4 ของ tolvaptan' },
  { cite: 'Mullens W, Damman K, Harjola VP, et al. The use of diuretics in heart failure with congestion: a position statement from the Heart Failure Association of the ESC. Eur J Heart Fail. 2019;21(2):137–155.', url: 'https://doi.org/10.1002/ejhf.1369',
    en: 'Diuretic resistance, sequential nephron blockade, loop dose ceilings, monitoring.', th: 'ภาวะดื้อยาขับปัสสาวะ การปิดกั้นเนฟรอนตามลำดับ ขนาดยาลูปสูงสุด และการติดตาม' },
  { cite: 'Mullens W, Dauw J, Martens P, et al. Acetazolamide in acute decompensated heart failure with volume overload. N Engl J Med. 2022;387(13):1185–1195.', url: 'https://doi.org/10.1056/NEJMoa2203094',
    en: 'Acetazolamide added to a loop diuretic (ADVOR).', th: 'การเสริม acetazolamide ร่วมกับยาลูป (ADVOR)' },
  { cite: 'Brater DC. Diuretic therapy. N Engl J Med. 1998;339(6):387–395.', url: 'https://doi.org/10.1056/NEJM199808063390607',
    en: 'Loop diuretic pharmacology, bioavailability and dose equivalence.', th: 'เภสัชวิทยาของยาลูป การดูดซึม และขนาดยาเทียบเท่า' },
  { cite: 'Heidenreich PA, Bozkurt B, Aguilar D, et al. 2022 AHA/ACC/HFSA guideline for the management of heart failure. Circulation. 2022;145(18):e895–e1032.', url: 'https://doi.org/10.1161/CIR.0000000000001063',
    en: 'MRA use by eGFR and potassium in heart failure.', th: 'การใช้ MRA ตาม eGFR และโพแทสเซียมในภาวะหัวใจล้มเหลว' },
  { cite: 'Beckett NS, Peters R, Fletcher AE, et al. Treatment of hypertension in patients 80 years of age or older (HYVET). N Engl J Med. 2008;358(18):1887–1898.', url: 'https://doi.org/10.1056/NEJMoa0801369',
    en: 'Indapamide outcome trial in very old patients.', th: 'การศึกษาผลลัพธ์ของ indapamide ในผู้สูงอายุมาก' },
  { cite: 'Patel A, ADVANCE Collaborative Group. Effects of a fixed combination of perindopril and indapamide on macrovascular and microvascular outcomes in patients with type 2 diabetes mellitus (ADVANCE). Lancet. 2007;370(9590):829–840.', url: 'https://doi.org/10.1016/S0140-6736(07)61303-8',
    en: 'Indapamide combination outcome trial in type 2 diabetes.', th: 'การศึกษาผลลัพธ์ของ indapamide แบบรวมเม็ดในเบาหวานชนิดที่ 2' },
  { cite: 'Mentz RJ, Anstrom KJ, Eisenstein EL, et al. Effect of torsemide vs furosemide after discharge on all-cause mortality in patients hospitalized with heart failure (TRANSFORM-HF). JAMA. 2023;329(3):214–223.', url: 'https://doi.org/10.1001/jama.2022.23924',
    en: 'Torsemide vs furosemide mortality.', th: 'อัตราการเสียชีวิต torsemide เทียบ furosemide' },
  { cite: 'Agarwal R, Sinha AD, Cramer AE, et al. Chlorthalidone for hypertension in advanced chronic kidney disease (CLICK). N Engl J Med. 2021;385(27):2507–2519.', url: 'https://doi.org/10.1056/NEJMoa2110730',
    en: 'Chlorthalidone in stage 4 CKD.', th: 'chlorthalidone ใน CKD ระยะ 4' },
  { cite: 'ScienceDirect Topics. Nephron (Medicine and Dentistry).', url: 'https://www.sciencedirect.com/topics/medicine-and-dentistry/nephron',
    en: 'Layout of the nephron diagram in the Mechanism guide (redrawn).', th: 'รูปแบบของแผนภาพเนฟรอนในหัวข้อกลไก (วาดใหม่)' },
];
const REF_TXT = {
  title: ['References', 'เอกสารอ้างอิง'], used: ['Used for', 'ใช้สำหรับ'],
  note: ["Trial summaries in each drug's detail view were checked against the PubMed abstracts (4 November 2026) and link to PubMed and the DOI. Author's content without an external reference: the “Filtered Na⁺ blocked” percentages are typical class values, and the diagram annotations follow standard renal physiology.", 'เนื้อหาของผู้จัดทำที่ไม่มีเอกสารอ้างอิงภายนอก: ค่าร้อยละ “Na⁺ ที่ถูกกั้น” เป็นค่าทั่วไปของแต่ละกลุ่มยา และคำอธิบายในแผนภาพเป็นไปตามสรีรวิทยาไตมาตรฐาน'],
};
const ReferencesSection = ({ lang }) => {
  const [open, setOpen] = useState(false);
  const i = lang === 'th' ? 1 : 0;
  return (
    <section className="mt-10 md:mt-14 pt-6 border-t border-slate-200 dark:border-[#263449] print:hidden" aria-labelledby="refs-heading">
      <h2 id="refs-heading" className="text-sm font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
        <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="refs-list" className={'w-full flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors ' + SURF + ' hover:bg-slate-50 dark:hover:bg-[#101a2b]'}>
          <span className="uppercase tracking-wider">{REF_TXT.title[i]} <span className="text-slate-400 font-bold normal-case tracking-normal">({REFS.length})</span></span>
          <span className={'text-slate-400 transition-transform ' + (open ? 'rotate-180' : '')} aria-hidden="true">▾</span>
        </button>
      </h2>
      {open && <div id="refs-list" className="mt-3">
        <ol className="flex flex-col gap-2.5">
          {REFS.map((r, k) => (
            <li key={k} className="flex gap-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <span className="shrink-0 font-bold text-slate-400 tabular-nums w-5 text-right">{k + 1}.</span>
              <span className="min-w-0">
                {r.cite}{' '}
                {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline break-all">{r.url}</a>}
                <span className={'block text-[11px] mt-0.5 ' + MUTED}><span className="font-bold">{REF_TXT.used[i]}:</span> {i ? r.th : r.en}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className={'mt-4 text-[11px] leading-relaxed ' + MUTED}>{REF_TXT.note[i]}</p>
      </div>}
    </section>
  );
};

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
        <div className="mt-2"><Cautions d={d} lang={lang} /></div>
        <div className={'mt-1.5 text-[11px] ' + MUTED}>{d.se.filter(x => !CAUTION.has(x)).slice(0, 3).map(x => SE[x][lang === 'th' ? 1 : 0]).join(' · ')}</div>
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
        <div className="sm:w-52 mt-1.5 sm:mt-0"><Effects d={d} /><div className="mt-1"><Cautions d={d} lang={lang} /></div></div>
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
            <td className="px-2 py-2"><div className="flex flex-wrap gap-x-2 gap-y-0.5">{d.se.map(x => CAUTION.has(x) ? <span key={x} title={TXT.caution[i]} className="inline-flex items-center gap-0.5 font-bold text-amber-700 dark:text-amber-300"><WarnIcon className="w-3 h-3 shrink-0" />{SE[x][i]}</span> : <span key={x}>{SE[x][i]}</span>)}</div></td>
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
  const [fx, setFx] = useState({});
  const [ctry, setCtry] = useState([]);
  const [stSel, setStSel] = useState(['current']);
  const [nlemOnly, setNlemOnly] = useState(false);
  const [sort, setSort] = useState('class');
  const [sel, setSel] = useState(new Set());
  const [modal, setModal] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(true);
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
  // electrolyte filter: click the same arrow again to clear it; the other arrow of the same electrolyte replaces it
  const toggleFx = (k, v) => setFx(p => { const n = { ...p }; if (n[k] === v) delete n[k]; else n[k] = v; return n; });
  const toggleClass = toggleIn(setClasses), toggleCtry = toggleIn(setCtry), toggleSt = toggleIn(setStSel);

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    const cs = ctry.length ? ctry : (stSel.length ? ['th'] : []);
    const r = DRUGS.filter(d => (!classes.length || classes.includes(d.cls))
      && Object.entries(fx).every(([k, v]) => d.fx[k] === v)
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
    ...Object.entries(fx).map(([k, v]) => ({ key: 'fx' + k, label: fxLabel([k, v]), off: () => toggleFx(k, v) })),
    ...ctry.map(c => ({ key: 'k' + c, label: c.toUpperCase(), off: () => toggleCtry(c) })),
    ...stSel.map(k => ({ key: 's' + k, label: 'FDA: ' + stName(k), off: () => toggleSt(k) })),
    ...(nlemOnly ? [{ key: 'nl', label: t('nlemOnly'), off: () => setNlemOnly(false) }] : []),
    ...(q.trim() ? [{ key: 'q', label: '“' + q.trim() + '”', off: () => setQ('') }] : []),
  ];
  const clearAll = () => { setClasses([]); setFx({}); setQ(''); setCtry([]); setStSel([]); setNlemOnly(false); };

  const guides = [
    ['mech', t('mech'), 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 dark:border-blue-400/30 dark:text-blue-300', NephronIcon, () => setModal({ t: 'mech' })],
    ['conv', t('conv'), 'bg-teal-50 hover:bg-teal-100 border-teal-200 text-teal-700 dark:bg-teal-500/10 dark:hover:bg-teal-500/20 dark:border-teal-400/30 dark:text-teal-300', ConvertIcon, () => setModal({ t: 'conv' })],
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
          <div className="grid grid-cols-3 gap-1 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:gap-2 w-full mb-2" data-guide-buttons>
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
            <div className="flex bg-white dark:bg-[#151f32] rounded-md border border-slate-200 dark:border-[#263449] p-0.5 shadow-sm shrink-0 items-center gap-0.5 max-w-full" role="group" aria-label={t('elec')}>
              <div className={GICON + ' self-stretch'}><ActivityIcon className="h-2.5 w-2.5 md:h-3 md:w-3" /></div>
              <div className="grid grid-cols-5 grid-rows-2 gap-0.5">
                {[1, -1].map(v => ELECTROLYTES.map(e => {
                  const on = fx[e.k] === v;
                  return <button key={e.k + v} type="button" onClick={() => toggleFx(e.k, v)} aria-pressed={on} aria-label={e.l + ' ' + (v > 0 ? t('incr') : t('decr'))} title={e.l + ' ' + (v > 0 ? t('incr') : t('decr'))}
                    className={'h-[22px] px-1.5 md:px-2 rounded flex items-center justify-center text-[10px] font-bold transition-all whitespace-nowrap ' + (on ? ON : (v > 0 ? 'text-orange-700 dark:text-orange-300' : 'text-sky-700 dark:text-sky-300') + ' hover:bg-slate-50 dark:hover:bg-[#101a2b]')}>{fxLabel([e.k, v])}</button>;
                }))}
              </div>
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
          <ReferencesSection lang={lang} />
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
      {modal && modal.t === 'conv' && <ConvertModal lang={lang} onClose={() => setModal(null)} />}
      {modal && modal.t === 'key' && <KeyModal lang={lang} onClose={() => setModal(null)} />}
      {modal && modal.t === 'log' && <ChangelogModal lang={lang} onClose={() => setModal(null)} />}
      {modal && modal.t === 'disc' && <DisclaimerModal lang={lang} onClose={() => setModal(null)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
