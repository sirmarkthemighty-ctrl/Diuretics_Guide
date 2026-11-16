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
const DropIcon = mk(<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />);
const CompareIcon = mk(<><rect x="3" y="4" width="7" height="16" rx="1.5" /><rect x="14" y="4" width="7" height="16" rx="1.5" /></>);
const InfoIcon = mk(<><circle cx="12" cy="12" r="9.5" /><path d="M12 16v-4" /><path d="M12 8h.01" /></>);
const PillIcon = mk(<><path d="M10.5 20.5a5 5 0 0 1-7-7l10-10a5 5 0 0 1 7 7z" /><path d="M8.5 8.5l7 7" /></>);
const NephronIcon = mk(<><circle cx="6" cy="5" r="2.5" /><path d="M6 7.5c-2.5 1.5 2.5 3 0 4.5" /><path d="M6 12v8h6V9h3v6h3V4" /></>);
const ConvertIcon = mk(<><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></>);
const WarnIcon = mk(<><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>, 2.2);
const ClipboardIcon = mk(<><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /></>);
const LadderIcon = mk(<path d="M8 3v18M16 3v18M8 8h8M8 13h8M8 18h8" />);


/* ---------- Data ---------- */
const VERSION = 'v1.2.0';
const CHANGELOG = [
  { v: 'v1.2.0', date: '2026-11-04',
    en: ['First release: 24 diuretics (18 core plus 6 sold in the UK, EU or Japan) with doses, electrolyte effects and side effects.', 'Tile, list and table views.', 'Mechanism button: highlights where selected drugs act on the nephron.', 'Diuretic resistance: sequential nephron blockade guide.', 'References grouped by topic (Thai lists, country registration, labels, heart failure, hypertension and kidney, pharmacology).', 'The “Never” status is renamed “Not found”: it means no registration was found in that register, not proof that the drug was never registered. UK cancellation history checked in NHS dm+d (Dytac discontinued; chlorothiazide and canrenoate only unlicensed supplies; Edecrin withdrawn in Ireland 1998). UK rechecked on the MHRA register: xipamide (Diurexan) is licensed; Italy AIFA confirms canrenoate (Kanrenol). Thailand status checked against the Thai FDA drug register: five drugs are past (all registrations cancelled) and eight have no registration found. UK/EU rechecked (emc, Spain CIMA, German product information): xipamide confirmed in Germany; the other gaps stay “?” with the check noted. Japan status rechecked on PMDA: triamterene is current (Triteren), bumetanide is past, five drugs have no PMDA entry; new trials for bumetanide, triamterene, xipamide and canrenoate.', 'The Donate button and its pop-up now follow dark mode like the other header buttons. Light mode is now the default on a first visit (the sun / moon button still saves your choice). New Donate button (a heart) in the header: it opens a pop-up with the PromptPay QR code to support the guide; donations are voluntary and change nothing in the content. New Which diuretic for what guide (heart failure, cirrhosis with ascites, hypertension, CKD, nephrotic oedema, hyponatremia, acute angle-closure glaucoma, altitude illness, raised intracranial pressure), every line with its source and class/level; every line shows its source, class and level. The guide is now a table (recommendation | source and level) that stacks on phones, with topic sub-headings, a quick-answer box, jump chips, and one row for lines several sources agree on; chips coloured by recommendation strength, doses and thresholds in bold, coloured topic headings with a topic filter, and a larger quick-answer box and all listed guidelines have been read: also the WMS 2024 altitude update, ESH 2023, AHA/ASA ICH 2022, the AAO open-angle glaucoma pattern, the 2013 hyponatremia panel, the Brain Trauma Foundation 4th edition and the Neurocritical Care Society 2020 guideline. On a phone the filter panel now starts closed (open on larger screens). Drug cards re-ordered: dose first, then electrolytes, serious and common side effects, and a separate availability block (countries and NLEM, NLEM now an outlined tag); brands sit directly under the name; the site became a plain line under the name and the trial-evidence tag was removed from the main-page cards (it stays in the detail view and the comparison); the dose lines are a small table; chips are a little larger. The Dose conversion tool is renamed Loop dose conversion (button and window title). A small route icon (tablet for oral, drop for intravenous) now sits before each dose line that names PO or IV, on cards, in the detail view, the comparison and the table. Drug cards: brands are a labelled text line (no second country chip), the site and evidence chips carry a label (full site name on hover), registered countries share one colour, the Compare and Details buttons have words and sit in the top-right corner of the card, serious and common side effects are labelled, and acetazolamide’s resistance dose sits under a divider. New Compact switch hides the site, evidence, NLEM, country and common side-effect rows. New Check interactions button in each drug’s detail view: it opens the Interactions screen for that drug, listing the medicines flagged for it (Avoid first) that you tap to add. Interactions screen: medicines grouped with a search box, a selected row with Clear all, a count of Avoid / Caution / None listed, results split by severity, and the no-interaction list folded; larger tap targets on phones. Filters are remembered between visits; Copy summary button in each drug’s detail view; disclaimer now covers the new tools.', 'Four more PubMed trials (azosemide, ethacrynic acid, torasemide vs azosemide, esaxerenone vs trichlormethiazide); UK status of triamterene is now “past” (Dytac discontinued).', 'Thai drug names removed (drugs are shown by their international names). Evidence level: each trial is tagged by design, endpoint and result, and each card shows the best trial evidence. The Mechanism diagram now shares the electrolyte filter: pick K⁺↓ (or any effect) and the sites of every matching drug light up.', 'New tools: Kidney check (eGFR, K⁺ and liver sort the drugs into avoid / caution / no restriction), Interactions (pick the patient’s other drugs), Compare (select 2 or more drugs), and a next-step helper in the resistance guide.', 'Thai brands checked in MIMS for every drug (dapagliflozin has three; the six added drugs have none); two more PubMed trials (DAPA-RESIST, chlorthalidone / HCTZ / amiloride).', 'Market (brand) names on every card, in a Brands column and by country in the detail view; search also finds brand names.', 'Electrolyte filter in two rows (increased on top, decreased below, same electrolyte stacked): pick several electrolytes, one direction each; the other arrow switches it.', 'Warning triangle on serious side effects (hyperkalemia, ototoxicity, liver injury, ODS, DKA, blood-count drops, AKI, pulmonary edema) on cards, table and detail view; filters open with FDA status “Current” selected by default.', 'Key clinical trials in each drug’s detail view, summarised from the PubMed abstracts with PubMed and DOI links (drugs with no landmark outcome trial say so).', 'References section at the bottom of the page (collapsible, as in the bronchodilator guide).', 'Mechanism diagram redrawn on the ScienceDirect Topics nephron layout (glomerulus, macula densa, cortex / medulla, osmolality gradient, water / salt / urea flow, ADH and aldosterone), with the source listed.', 'Kidney / liver dosing and key interactions on every drug (from labels and guidelines), and a loop dose conversion table.', 'Thai NLEM 2569 chip checked against the official list (5 Basic drugs, the rest Non-NLEM) and TH / US / UK / EU / JP availability filter (all five checked 2026-11-04: UK on emc, EU on Spain AEMPS, EMA lists and national sources, JP on KEGG / JAPIC). FDA status per country (current / past † / not found ⊘) with a filter; US checked against openFDA. Doses and Thai brands checked against MIMS Thailand.'],
    th: ['เปิดตัวครั้งแรก: ยาขับปัสสาวะ 24 ชนิด (หลัก 18 ชนิด และอีก 6 ชนิดที่มีใน UK, EU หรือญี่ปุ่น) พร้อมขนาดยา ผลต่ออิเล็กโทรไลต์ และผลข้างเคียง', 'มุมมองการ์ด รายการ และตาราง', 'ปุ่มกลไก: แสดงตำแหน่งที่ยาที่เลือกออกฤทธิ์บนเนฟรอน', 'ภาวะดื้อยาขับปัสสาวะ: แนวทางการปิดกั้นเนฟรอนตามลำดับ', 'เอกสารอ้างอิงจัดกลุ่มตามหัวข้อ (บัญชียาไทย การขึ้นทะเบียนรายประเทศ ฉลากยา หัวใจล้มเหลว ความดันและไต เภสัชวิทยา)', 'สถานะ “ไม่เคยมี” เปลี่ยนชื่อเป็น “ไม่พบ” หมายถึงไม่พบทะเบียนในแหล่งนั้น ไม่ใช่หลักฐานว่าไม่เคยขึ้นทะเบียน ตรวจประวัติเลิกจำหน่ายใน UK ด้วย NHS dm+d (Dytac เลิกแล้ว chlorothiazide และ canrenoate มีเฉพาะยาไม่มีทะเบียน Edecrin ถูกถอนในไอร์แลนด์ปี 2541) ตรวจ UK กับทะเบียน MHRA: xipamide (Diurexan) มีใบอนุญาต และ AIFA อิตาลียืนยัน canrenoate (Kanrenol) ตรวจสถานะไทยกับทะเบียนยาของ อย.: 5 ตัวเคยมีแต่ยกเลิกทั้งหมด และ 8 ตัวไม่พบทะเบียน ตรวจ UK/EU ซ้ำ (emc, CIMA สเปน, เอกสารกำกับยาเยอรมัน): ยืนยัน xipamide ในเยอรมนี ช่องว่างอื่นยังเป็น “?” พร้อมบันทึกการตรวจ ตรวจสถานะญี่ปุ่นซ้ำกับ PMDA: triamterene มีจำหน่าย (Triteren) bumetanide เคยมีแต่เลิกแล้ว 5 ตัวไม่พบใน PMDA และเพิ่มการศึกษาของ bumetanide, triamterene, xipamide, canrenoate', 'ปุ่มสนับสนุนและหน้าต่าง QR ใช้โหมดมืดเหมือนปุ่มอื่นที่ส่วนหัวแล้ว โหมดสว่างเป็นค่าเริ่มต้นเมื่อเข้าใช้ครั้งแรก (ปุ่มดวงอาทิตย์ / พระจันทร์ยังจำค่าที่เลือก) ปุ่มสนับสนุนใหม่ที่ส่วนหัว (รูปหัวใจ): เปิดหน้าต่างแสดง QR พร้อมเพย์เพื่อสนับสนุนคู่มือ การสนับสนุนเป็นความสมัครใจและไม่มีผลต่อเนื้อหา คู่มือเลือกยาขับปัสสาวะตามข้อบ่งใช้ใหม่ (หัวใจล้มเหลว ตับแข็งที่มีท้องมาน ความดันโลหิตสูง โรคไตเรื้อรัง ภาวะบวมจากไตเนโฟรติก โซเดียมต่ำ ต้อหินมุมปิดเฉียบพลัน โรคแพ้ที่สูง ความดันในกะโหลกศีรษะสูง) แต่ละบรรทัดมีแหล่งที่มา ระดับคำแนะนำและหลักฐาน ตอนนี้แสดงเป็นตาราง (ข้อแนะนำ | แหล่งและระดับ) ที่เรียงซ้อนบนมือถือ มีหัวข้อย่อยตามหัวเรื่อง กล่องสรุปเร็ว ปุ่มข้ามไปยังข้อบ่งใช้ และรวมบรรทัดที่หลายแหล่งตรงกันเป็นแถวเดียว ชิปสีตามความแรงของคำแนะนำ ขนาดยาและค่าเกณฑ์เป็นตัวหนา หัวข้อย่อยมีสีและตัวกรองหัวข้อ และกล่องสรุปเร็วใหญ่ขึ้น และอ่านครบทุกแนวทางที่ระบุไว้แล้ว รวมถึง WMS 2024 ESH 2023 AHA/ASA ICH 2022 แนวทางต้อหินมุมเปิดของ AAO แนวทางโซเดียมต่ำปี 2013 Brain Trauma Foundation ฉบับที่ 4 และ Neurocritical Care Society 2020 บนมือถือแผงตัวกรองเริ่มต้นแบบปิด (หน้าจอใหญ่ยังเปิดอยู่) จัดการ์ดยาใหม่: ขนาดยาก่อน ตามด้วยอิเล็กโทรไลต์ ผลข้างเคียงที่สำคัญและที่พบบ่อย และส่วนการจำหน่ายแยกต่างหาก (ประเทศและ NLEM โดย NLEM เป็นป้ายขอบเส้น) และยี่ห้ออยู่ใต้ชื่อยาโดยตรง ตำแหน่งเป็นบรรทัดข้อความใต้ชื่อ และเอาป้ายหลักฐานจากการศึกษาออกจากการ์ดหน้าหลัก (ยังอยู่ในหน้ารายละเอียดและการเปรียบเทียบ) บรรทัดขนาดยาเป็นตารางเล็ก และชิปใหญ่ขึ้นเล็กน้อย เครื่องมือเทียบขนาดยาเปลี่ยนชื่อเป็นเทียบขนาดยากลุ่มลูป (ปุ่มและหัวหน้าต่าง) ไอคอนทางให้ยาขนาดเล็ก (เม็ดยาสำหรับรับประทาน หยดน้ำสำหรับฉีดเข้าหลอดเลือดดำ) อยู่หน้าบรรทัดขนาดยาที่ระบุ PO หรือ IV บนการ์ด หน้ารายละเอียด การเปรียบเทียบ และตาราง การ์ดยา: ยี่ห้อเป็นข้อความมีป้ายกำกับ (ไม่มีชิปประเทศซ้ำ) ชิปตำแหน่งและหลักฐานมีป้ายกำกับ (ชื่อเต็มเมื่อชี้) ประเทศที่ขึ้นทะเบียนใช้สีเดียวกัน ปุ่มเปรียบเทียบและรายละเอียดมีข้อความและอยู่มุมขวาบนของการ์ด ผลข้างเคียงที่สำคัญและที่พบบ่อยมีป้ายกำกับ และขนาดยากรณีดื้อยาของ acetazolamide อยู่ใต้เส้นแบ่ง สวิตช์แบบย่อใหม่ซ่อนแถวตำแหน่ง หลักฐาน NLEM ประเทศ และผลข้างเคียงที่พบบ่อย ปุ่มตรวจปฏิกิริยายาใหม่ในหน้ารายละเอียดของแต่ละยา: เปิดหน้าปฏิกิริยายาของยานั้น แสดงรายการยาที่ถูกระบุ (หลีกเลี่ยงก่อน) แตะเพื่อเพิ่มได้ หน้าปฏิกิริยายา: จัดกลุ่มยา มีช่องค้นหา แถวยาที่เลือกพร้อมปุ่มล้างทั้งหมด สรุปจำนวนหลีกเลี่ยง/ระวัง/ไม่มีที่ระบุ แยกผลตามความรุนแรง พับรายการที่ไม่พบปฏิกิริยา และปุ่มใหญ่ขึ้นบนมือถือ จำค่าตัวกรองไว้ระหว่างการใช้งาน ปุ่มคัดลอกสรุปในหน้ารายละเอียดของแต่ละยา และข้อจำกัดครอบคลุมเครื่องมือใหม่', 'เพิ่มการศึกษาจาก PubMed อีก 4 รายการ (azosemide, ethacrynic acid, torasemide เทียบ azosemide, esaxerenone เทียบ trichlormethiazide) สถานะ triamterene ใน UK เป็น “เคยมี” (Dytac เลิกจำหน่าย)', 'เอาชื่อยาภาษาไทยออก (แสดงชื่อสากล) ระดับหลักฐาน: แต่ละการศึกษามีป้ายรูปแบบ ตัวชี้วัด และผลหลัก และการ์ดแสดงหลักฐานที่ดีที่สุด แผนภาพกลไกใช้ตัวกรองอิเล็กโทรไลต์ร่วมกัน เลือก K⁺↓ (หรือผลอื่น) แล้วตำแหน่งออกฤทธิ์ของยาที่ตรงกันทั้งหมดจะสว่าง', 'เครื่องมือใหม่: ตรวจไต/ตับ (eGFR, K⁺ และโรคตับ แบ่งยาเป็นหลีกเลี่ยง/ระวัง/ไม่พบข้อจำกัด) ปฏิกิริยายา (เลือกยาอื่นของผู้ป่วย) เปรียบเทียบ (เลือก 2 ตัวยาขึ้นไป) และตัวช่วยเลือกขั้นถัดไปในหัวข้อดื้อยา', 'ตรวจยี่ห้อในไทยกับ MIMS ครบทุกตัวยา (dapagliflozin มี 3 ยี่ห้อ ยา 6 ตัวที่เพิ่มไม่มียี่ห้อในไทย) เพิ่มการศึกษาจาก PubMed อีก 2 รายการ (DAPA-RESIST, chlorthalidone / HCTZ / amiloride)', 'ชื่อทางการค้าในทุกการ์ด คอลัมน์ชื่อการค้าในตาราง และแยกตามประเทศในหน้ารายละเอียด ค้นหาด้วยชื่อการค้าได้', 'ตัวกรองอิเล็กโทรไลต์สองแถว (เพิ่มขึ้นแถวบน ลดลงแถวล่าง อิเล็กโทรไลต์เดียวกันซ้อนกัน) เลือกได้หลายตัว ตัวละหนึ่งทิศทาง กดลูกศรอีกด้านเพื่อสลับ', 'สัญลักษณ์เตือนรูปสามเหลี่ยมที่ผลข้างเคียงสำคัญ (โพแทสเซียมสูง พิษต่อหู ตับ ODS DKA เม็ดเลือดผิดปกติ AKI ปอดบวมน้ำ) ในการ์ด ตาราง และหน้ารายละเอียด ตัวกรองเปิดไว้และเลือกสถานะ อย. “ปัจจุบัน” เป็นค่าเริ่มต้น', 'การศึกษาทางคลินิกสำคัญในหน้ารายละเอียดของแต่ละยา (ตรวจกับบทคัดย่อใน PubMed พร้อมลิงก์ PubMed และ DOI)', 'ส่วนเอกสารอ้างอิงท้ายหน้า (พับ/เปิดได้ เหมือนแอปยาขยายหลอดลม)', 'แผนภาพกลไกวาดใหม่ตามผังเนฟรอนของ ScienceDirect Topics (โกลเมอรูลัส แมคูลาเดนซา เปลือก/ไขสันหลังไต ความเข้มข้นออสโมลาลิตี การเคลื่อนของน้ำ/เกลือ/ยูเรีย ADH และอัลโดสเตอโรน) พร้อมแหล่งอ้างอิง', 'ขนาดยาตามการทำงานของไต/ตับ และยาที่ต้องระวังเมื่อใช้ร่วมในทุกตัวยา (จากฉลากและแนวทางเวชปฏิบัติ) พร้อมตารางเทียบขนาดยาลูป', 'ป้าย NLEM 2569 ตรวจกับบัญชียาหลักฯ ฉบับจริง (หมวดพื้นฐาน 5 ชนิด ที่เหลือไม่อยู่ใน NLEM) และตัวกรองประเทศ TH / US / UK / EU / JP (ตรวจครบทั้งห้าเมื่อ 4 พ.ย. 2569: UK ใน emc, EU ใน AEMPS สเปน รายการ EMA และแหล่งระดับประเทศ, JP ใน KEGG / JAPIC) สถานะ อย. รายประเทศ (ปัจจุบัน / เคยมี † / ไม่พบ ⊘) พร้อมตัวกรอง ตรวจสหรัฐฯ กับ openFDA ตรวจขนาดยาและยี่ห้อในไทยกับ MIMS Thailand'] },
];

// Nephron segments, in flow order
const SEGS = ['pct', 'dl', 'tal', 'dct', 'cd'];
const SEG_NAME = {
  pct: { en: 'Proximal tubule (PCT)', th: 'ท่อไตส่วนต้น (PCT)' },
  dl: { en: 'Descending limb', th: 'ห่วงเฮนเลส่วนขาลง' },
  tal: { en: 'Thick ascending limb (TAL)', th: 'ห่วงเฮนเลส่วนขาขึ้นช่วงหนา (TAL)' },
  dct: { en: 'Distal convoluted tubule (DCT)', th: 'ท่อไตส่วนปลาย (DCT)' },
  cd: { en: 'Collecting duct (CD)', th: 'ท่อรวม (CD)' },
};

const CLS = {
  cai: { hex: '#8b5cf6', en: 'Carbonic anhydrase inhibitor', th: 'ยายับยั้งคาร์บอนิกแอนไฮเดรส', s: { en: 'CA inhibitor', th: 'CA inhibitor' }, chip: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-400/30', txt: 'text-violet-700 dark:text-violet-300' },
  osm: { hex: '#64748b', en: 'Osmotic diuretic', th: 'ยาขับปัสสาวะออสโมติก', s: { en: 'Osmotic', th: 'ออสโมติก' }, chip: 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-500/10 dark:text-slate-300 dark:border-slate-400/30', txt: 'text-slate-700 dark:text-slate-300' },
  loop: { hex: '#2563eb', en: 'Loop diuretic', th: 'ยาขับปัสสาวะกลุ่มลูป', s: { en: 'Loop', th: 'ลูป' }, chip: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-400/30', txt: 'text-blue-700 dark:text-blue-300' },
  thz: { hex: '#059669', en: 'Thiazide / thiazide-like', th: 'ไทอะไซด์ / คล้ายไทอะไซด์', s: { en: 'Thiazide', th: 'ไทอะไซด์' }, chip: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-400/30', txt: 'text-emerald-700 dark:text-emerald-300' },
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
const D = (id, name, cls, sites, target, fena, dose, fx, se, pearl) => ({ id, name, cls, sites, target, fena, dose, fx, se, pearl });
const DRUGS = [
  D('acetazolamide', 'Acetazolamide', 'cai', ['pct'], 'Carbonic anhydrase', '≈3–5%',
    [['PO/IV', 'Edema 250–375 mg OD or alternate days; glaucoma 250–1,000 mg/day divided'], ['Resistance', '250–500 mg IV/PO OD × 1–3 days']],
    { na: 0, k: -1, mg: 0, ca: 0, hco3: -1 }, ['metAcid', 'hypoK', 'paresth', 'stones', 'sulfa'],
    { en: 'Self-limiting: bicarbonate loss stops the effect in 2–3 days. Useful when HCO₃⁻ is high from loop therapy (ADVOR: 500 mg IV daily added to loop).', th: 'ออกฤทธิ์จำกัดตัวเอง เพราะเสีย HCO₃⁻ แล้วฤทธิ์ลดลงใน 2–3 วัน ใช้ได้ดีเมื่อ HCO₃⁻ สูงจากยาลูป (ADVOR: 500 mg IV วันละครั้งเสริมยาลูป)' }),
  D('mannitol', 'Mannitol', 'osm', ['pct', 'dl'], 'Osmotic force (not a transporter)', 'Variable',
    [['IV', '0.25–2 g/kg over 30–60 min (10–20% solution); may repeat q6–8 h']],
    { na: 'v', k: -1, mg: 0, ca: 0, hco3: 0 }, ['pulm', 'hypoNa', 'hyperNa', 'aki', 'hypoK'],
    { en: 'Used for raised ICP / ICP crises, not for routine edema. Avoid in anuria and in pulmonary edema; early dilutional hyponatremia then water loss.', th: 'ใช้ลดความดันในกะโหลกศีรษะ ไม่ใช้รักษาบวมทั่วไป หลีกเลี่ยงในภาวะไม่มีปัสสาวะและปอดบวมน้ำ' }),
  D('furosemide', 'Furosemide', 'loop', ['tal'], 'NKCC2 (Na⁺-K⁺-2Cl⁻)', '≈20–25%',
    [['PO', '20–80 mg OD–BID (max ≈ 600 mg/day)'], ['IV', '20–50 mg slow IV (label max 1,500 mg/day); infusion 5–40 mg/h']],
    { na: -1, k: -1, mg: -1, ca: -1, hco3: 1 }, ['hypoK', 'hypoMg', 'metAlk', 'hypoV', 'ototox', 'uric', 'sulfa'],
    { en: 'Oral bioavailability ≈ 50% (10–100%, lower with gut edema): 40 mg PO ≈ 20 mg IV. Short action (≈ 6 h) → post-diuretic Na retention; give BID.', th: 'การดูดซึมทางปากประมาณ 50% (ผันแปร 10–100% และลดลงเมื่อลำไส้บวม): 40 mg PO ≈ 20 mg IV ออกฤทธิ์สั้น (~6 ชม.) จึงมีการเก็บโซเดียมกลับหลังยาหมดฤทธิ์ ควรให้วันละ 2 ครั้ง' }),
  D('bumetanide', 'Bumetanide', 'loop', ['tal'], 'NKCC2 (Na⁺-K⁺-2Cl⁻)', '≈20–25%',
    [['PO/IV', '0.5–2 mg OD–BID (max ≈ 10 mg/day)']],
    { na: -1, k: -1, mg: -1, ca: -1, hco3: 1 }, ['hypoK', 'hypoMg', 'metAlk', 'hypoV', 'ototox', 'sulfa'],
    { en: '1 mg ≈ 40 mg PO furosemide. Bioavailability 80–100%, so it is more predictable than furosemide in gut edema.', th: '1 mg ≈ furosemide 40 mg PO การดูดซึม 80–100% คาดเดาผลได้ดีกว่า furosemide เมื่อลำไส้บวม' }),
  D('torsemide', 'Torsemide (torasemide)', 'loop', ['tal'], 'NKCC2 (Na⁺-K⁺-2Cl⁻)', '≈20–25%',
    [['PO/IV', '10–20 mg OD (up to 100–200 mg in resistance)']],
    { na: -1, k: -1, mg: -1, ca: -1, hco3: 1 }, ['hypoK', 'hypoMg', 'metAlk', 'hypoV', 'ototox', 'sulfa'],
    { en: '20 mg ≈ 40 mg PO furosemide. Bioavailability 80–100%, half-life 3–4 h, once-daily. TRANSFORM-HF: no mortality difference vs furosemide.', th: '20 mg ≈ furosemide 40 mg PO การดูดซึม 80–100% ครึ่งชีวิต 3–4 ชม. วันละครั้ง TRANSFORM-HF: อัตราตายไม่ต่างจาก furosemide' }),
  D('ethacrynic', 'Ethacrynic acid', 'loop', ['tal'], 'NKCC2 (Na⁺-K⁺-2Cl⁻)', '≈20–25%',
    [['PO', '25–50 mg OD–BID'], ['IV', '50 mg (or 0.5–1 mg/kg)']],
    { na: -1, k: -1, mg: -1, ca: -1, hco3: 1 }, ['hypoK', 'hypoMg', 'metAlk', 'hypoV', 'ototox'],
    { en: 'The only non-sulfonamide loop diuretic: option for true sulfa allergy. Highest ototoxicity of the loops.', th: 'เป็นยาลูปตัวเดียวที่ไม่ใช่ซัลฟา ใช้ได้เมื่อแพ้ซัลฟาจริง มีพิษต่อหูสูงสุดในกลุ่มลูป' }),
  D('hctz', 'Hydrochlorothiazide', 'thz', ['dct'], 'NCC (Na⁺-Cl⁻)', '≈5–8%',
    [['PO', 'HTN 12.5–50 mg OD; edema 25–100 mg OD–BID']],
    { na: -1, k: -1, mg: -1, ca: 1, hco3: 1 }, ['hypoNa', 'hypoK', 'hypoMg', 'hyperCa', 'uric', 'gluc', 'lipid', 'rash'],
    { en: 'Thiazide hyponatremia can be severe in older adults. Less effective at low eGFR (classically < 30). Raises serum Ca: useful in calcium stones.', th: 'โซเดียมต่ำจากไทอะไซด์อาจรุนแรงในผู้สูงอายุ ได้ผลน้อยลงเมื่อ eGFR ต่ำ (< 30) ทำให้แคลเซียมในเลือดสูง ใช้ประโยชน์ในนิ่วแคลเซียม' }),
  D('chlorthalidone', 'Chlorthalidone', 'thz', ['dct'], 'NCC (Na⁺-Cl⁻)', '≈5–8%',
    [['PO', 'HTN 12.5–25 mg OD; edema 25–50 mg OD, up to 100–200 mg in severe cases']],
    { na: -1, k: -1, mg: -1, ca: 1, hco3: 1 }, ['hypoNa', 'hypoK', 'hypoMg', 'hyperCa', 'uric', 'gluc'],
    { en: 'Half-life 40–60 h; more potent per mg than HCTZ. CLICK trial: lowers BP in stage 4 CKD.', th: 'ครึ่งชีวิต 40–60 ชม. แรงกว่า HCTZ ต่อ mg การศึกษา CLICK: ลดความดันได้ใน CKD ระยะ 4' }),
  D('indapamide', 'Indapamide', 'thz', ['dct'], 'NCC (Na⁺-Cl⁻)', '≈5–8%',
    [['PO', 'HTN 1.25–2.5 mg OD (SR 1.5 mg OD); CHF edema 2.5–5 mg OD']],
    { na: -1, k: -1, mg: -1, ca: 1, hco3: 1 }, ['hypoNa', 'hypoK', 'hypoMg', 'uric'],
    { en: 'Thiazide-like with a vasodilating effect; proven outcome benefit in HYVET and ADVANCE. Less glucose / lipid effect.', th: 'คล้ายไทอะไซด์ มีฤทธิ์ขยายหลอดเลือด มีหลักฐานผลลัพธ์ใน HYVET และ ADVANCE ผลต่อน้ำตาลและไขมันน้อยกว่า' }),
  D('metolazone', 'Metolazone', 'thz', ['dct'], 'NCC (Na⁺-Cl⁻)', '≈5–8%',
    [['PO', '2.5–10 mg OD, 30 min before the loop dose']],
    { na: -1, k: -1, mg: -1, ca: 1, hco3: 1 }, ['hypoK', 'hypoNa', 'hypoMg', 'hypoV', 'aki'],
    { en: 'Keeps working at low GFR. Add to a loop for sequential blockade for 1–3 days only; check K⁺, Mg²⁺, Na⁺ and creatinine daily.', th: 'ยังออกฤทธิ์ได้เมื่อ GFR ต่ำ ใช้เสริมยาลูปเพื่อปิดกั้นต่อเนื่อง 1–3 วัน ตรวจ K⁺, Mg²⁺, Na⁺, creatinine ทุกวัน' }),
  D('chlorothiazide', 'Chlorothiazide IV', 'thz', ['dct'], 'NCC (Na⁺-Cl⁻)', '≈5–8%',
    [['IV', '500–1000 mg OD–BID, 30 min before the loop dose']],
    { na: -1, k: -1, mg: -1, ca: 1, hco3: 1 }, ['hypoK', 'hypoNa', 'hypoMg', 'hypoV', 'aki'],
    { en: 'The IV option for sequential blockade when gut absorption is poor. Often not stocked: HCTZ or metolazone PO is the usual substitute.', th: 'ทางเลือกแบบฉีดสำหรับการปิดกั้นต่อเนื่องเมื่อการดูดซึมทางลำไส้ไม่ดี มักไม่มีในโรงพยาบาล ใช้ HCTZ หรือ metolazone ชนิดกินแทนได้' }),
  D('spironolactone', 'Spironolactone', 'mra', ['cd'], 'Mineralocorticoid receptor', '≈2%',
    [['PO', 'HF (guideline) 12.5–50 mg OD; edema 25–200 mg/day; cirrhotic ascites 100–400 mg/day']],
    { na: -1, k: 1, mg: 0, ca: 0, hco3: -1 }, ['hyperK', 'gyn', 'metAcid', 'aki'],
    { en: 'Slow onset (days). Cirrhotic ascites: start 100 mg, usually with furosemide 40 mg (100:40). Check K⁺ and creatinine at 1 and 4 weeks.', th: 'ออกฤทธิ์ช้า (เป็นวัน) ท้องมานจากตับแข็ง: เริ่ม 100 mg มักให้คู่กับ furosemide 40 mg (100:40) ตรวจ K⁺ และ creatinine ที่ 1 และ 4 สัปดาห์' }),
  D('eplerenone', 'Eplerenone', 'mra', ['cd'], 'Mineralocorticoid receptor', '≈2%',
    [['PO', '25–50 mg OD']],
    { na: -1, k: 1, mg: 0, ca: 0, hco3: -1 }, ['hyperK', 'aki'],
    { en: 'Selective MRA: far less gynecomastia than spironolactone. Avoid with strong CYP3A4 inhibitors.', th: 'MRA แบบจำเพาะ ทำให้เต้านมโตน้อยกว่า spironolactone มาก หลีกเลี่ยงร่วมกับยายับยั้ง CYP3A4 ที่แรง' }),
  D('amiloride', 'Amiloride', 'enac', ['cd'], 'ENaC (Na⁺ channel)', '≈2%',
    [['PO', '5–10 mg OD (max 20 mg)']],
    { na: -1, k: 1, mg: 0, ca: 0, hco3: -1 }, ['hyperK', 'metAcid', 'gi'],
    { en: 'Also treats lithium-induced nephrogenic diabetes insipidus (enters through ENaC). Do not combine with MRA / ACEi / ARB without K⁺ monitoring.', th: 'ใช้รักษา nephrogenic DI จากลิเทียมได้ (ลิเทียมเข้าเซลล์ผ่าน ENaC) ห้ามใช้ร่วม MRA / ACEi / ARB โดยไม่ติดตามค่า K⁺' }),
  D('triamterene', 'Triamterene', 'enac', ['cd'], 'ENaC (Na⁺ channel)', '≈2%',
    [['PO', '150–250 mg/day in 2 doses (max 300 mg/day); alternate days for maintenance']],
    { na: -1, k: 1, mg: 0, ca: 0, hco3: -1 }, ['hyperK', 'stones', 'blood', 'aki'],
    { en: 'Usually combined with HCTZ to offset hypokalemia. Can form kidney stones and a weak folate antagonist effect.', th: 'มักให้คู่กับ HCTZ เพื่อลดโพแทสเซียมต่ำ อาจทำให้เกิดนิ่วและต้านโฟเลตเล็กน้อย' }),
  D('tolvaptan', 'Tolvaptan', 'v2', ['cd'], 'Vasopressin V2 receptor (aquaporin-2)', 'Water only (aquaresis)',
    [['PO', 'Hyponatremia: start 15 mg OD, titrate to 30–60 mg']],
    { na: 1, k: 0, mg: 0, ca: 0, hco3: 0 }, ['ods', 'thirst', 'liver', 'hypoV'],
    { en: 'Start in hospital and check Na⁺ every 6–8 h; keep the rise ≤ 8–10 mmol/L per 24 h. Do not restrict fluids. Avoid > 30 days in non-ADPKD use (liver injury).', th: 'เริ่มในโรงพยาบาล เจาะ Na⁺ ทุก 6–8 ชม. ให้ Na⁺ เพิ่มไม่เกิน 8–10 mmol/L ใน 24 ชม. ไม่ต้องจำกัดน้ำ ไม่ควรใช้เกิน 30 วันในข้อบ่งชี้อื่นที่ไม่ใช่ ADPKD (พิษต่อตับ)' }),
  D('dapagliflozin', 'Dapagliflozin', 'sglt', ['pct'], 'SGLT2 (Na⁺-glucose)', 'Mild natriuresis',
    [['PO', 'HF / CKD 10 mg OD']],
    { na: 0, k: 0, mg: 0, ca: 0, hco3: 0 }, ['gu', 'dka', 'hypoV'],
    { en: 'Used for HF / CKD outcomes; the diuretic effect is mild but additive. Hold when acutely ill, fasting or before surgery (DKA).', th: 'ใช้เพื่อผลลัพธ์ในโรคหัวใจล้มเหลว/โรคไต ฤทธิ์ขับปัสสาวะไม่มากแต่เสริมกัน งดเมื่อป่วยหนัก อดอาหาร หรือก่อนผ่าตัด (DKA)' }),
  D('empagliflozin', 'Empagliflozin', 'sglt', ['pct'], 'SGLT2 (Na⁺-glucose)', 'Mild natriuresis',
    [['PO', 'HF / CKD 10 mg OD']],
    { na: 0, k: 0, mg: 0, ca: 0, hco3: 0 }, ['gu', 'dka', 'hypoV'],
    { en: 'Used for HF / CKD outcomes; the diuretic effect is mild but additive. Hold when acutely ill, fasting or before surgery (DKA).', th: 'ใช้เพื่อผลลัพธ์ในโรคหัวใจล้มเหลว/โรคไต ฤทธิ์ขับปัสสาวะไม่มากแต่เสริมกัน งดเมื่อป่วยหนัก อดอาหาร หรือก่อนผ่าตัด (DKA)' }),
  D('bendroflumethiazide', 'Bendroflumethiazide', 'thz', ['dct'], 'NCC (Na⁺-Cl⁻)', '≈5–8%',
    [['PO', 'HTN 2.5 mg every morning (more is rarely needed); edema 5–10 mg every morning at first, then 2.5–5 mg on 2–3 days a week']],
    { na: -1, k: -1, mg: -1, ca: 1, hco3: 1 }, ['hypoNa', 'hypoK', 'hypoMg', 'hyperCa', 'uric', 'gluc', 'rash'],
    { en: 'Long-standing UK thiazide. NICE NG136 now prefers a thiazide-like drug (indapamide, chlortalidone) for new hypertension. Contraindicated in Addison disease, hypercalcemia, hyponatremia and refractory hypokalemia.', th: 'ไทอะไซด์ที่ใช้มานานในสหราชอาณาจักร ปัจจุบัน NICE NG136 แนะนำยาคล้ายไทอะไซด์ (indapamide, chlortalidone) สำหรับความดันสูงรายใหม่ ห้ามใช้ในโรค Addison แคลเซียมสูง โซเดียมต่ำ และโพแทสเซียมต่ำที่แก้ไม่ได้' }),
  D('xipamide', 'Xipamide', 'thz', ['dct'], 'NCC (Na⁺-Cl⁻)', '≈5–8%',
    [['PO', 'HTN 20 mg OD; edema 20 mg OD, up to 40 mg; up to 60 mg/day in advanced kidney impairment (German leaflet)']],
    { na: -1, k: -1, mg: -1, ca: 1, hco3: 1 }, ['hypoK', 'hypoNa', 'hypoMg', 'hyperCa', 'uric', 'sulfa'],
    { en: 'Thiazide-like sulfonamide sold in Germany (generics). Hypokalemia is very common. Contraindicated in gout / high uric acid, refractory hypokalemia, hypercalcemia, severe liver disease and pregnancy.', th: 'ยาซัลฟาคล้ายไทอะไซด์ มีจำหน่ายในเยอรมนี (ยาสามัญ) โพแทสเซียมต่ำพบบ่อยมาก ห้ามใช้ในเก๊าท์/ยูริกสูง โพแทสเซียมต่ำที่แก้ไม่ได้ แคลเซียมสูง โรคตับรุนแรง และการตั้งครรภ์' }),
  D('trichlormethiazide', 'Trichlormethiazide', 'thz', ['dct'], 'NCC (Na⁺-Cl⁻)', '≈5–8%',
    [['PO', '2–8 mg/day in 1–2 doses (Japan label); start low in older adults']],
    { na: -1, k: -1, mg: -1, ca: 1, hco3: 1 }, ['hypoNa', 'hypoK', 'hypoMg', 'uric', 'gluc'],
    { en: 'Thiazide used in Japan (Fluitran, generics) for hypertension and edema. Contraindicated in anuria and acute renal failure.', th: 'ไทอะไซด์ที่ใช้ในญี่ปุ่น (Fluitran และยาสามัญ) สำหรับความดันสูงและบวม ห้ามใช้ในภาวะไม่มีปัสสาวะและไตวายเฉียบพลัน' }),
  D('azosemide', 'Azosemide', 'loop', ['tal'], 'NKCC2 (Na⁺-K⁺-2Cl⁻)', '≈20–25%',
    [['PO', '60 mg OD (Japan label); adjust to age and symptoms']],
    { na: -1, k: -1, mg: -1, ca: -1, hco3: 1 }, ['hypoK', 'metAlk', 'hypoV', 'wbc'],
    { en: 'Long-acting loop diuretic used in Japan (Diart) for cardiac, renal and hepatic edema. The label warns of electrolyte abnormalities and of agranulocytosis / leukopenia; contraindicated in anuria and hepatic coma.', th: 'ยาลูปออกฤทธิ์นานที่ใช้ในญี่ปุ่น (Diart) สำหรับบวมจากหัวใจ ไต และตับ ฉลากเตือนเรื่องอิเล็กโทรไลต์ผิดปกติและเม็ดเลือดขาวต่ำ/แอกรานูโลไซโทซิส ห้ามใช้ในภาวะไม่มีปัสสาวะและโคม่าจากตับ' }),
  D('canrenoate', 'Potassium canrenoate', 'mra', ['cd'], 'Mineralocorticoid receptor', '≈2%',
    [['IV', '100–200 mg slowly IV 1–2 times/day (Japan label); max 600 mg/day, usually ≤ 2 weeks']],
    { na: -1, k: 1, mg: 0, ca: 0, hco3: -1 }, ['hyperK', 'gyn', 'aki'],
    { en: 'IV mineralocorticoid antagonist (prodrug of canrenone) sold in Japan, Italy and Germany. Contraindicated in renal failure, risk of hyperkalemia, Addison disease and with eplerenone. Check K⁺ regularly.', th: 'ยาต้านมิเนอรัลโลคอร์ติคอยด์ชนิดฉีด (prodrug ของ canrenone) มีจำหน่ายในญี่ปุ่น อิตาลี และเยอรมนี ห้ามใช้ในไตวาย เสี่ยงโพแทสเซียมสูง โรค Addison และร่วมกับ eplerenone ตรวจ K⁺ สม่ำเสมอ' }),
  D('esaxerenone', 'Esaxerenone', 'mra', ['cd'], 'Mineralocorticoid receptor', 'Minimal',
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
  dapagliflozin: 'Forxiga, Edistride, Dflozin-10',
  empagliflozin: 'Jardiance, Emdiance, Emflodiaz, Empabit, Emze, Goempa',
};
// Registration status per country: 'current' | 'past' (was registered, now withdrawn) | 'never' (shown as “Not found”: no registration found in that register, not proof it never existed); missing = N/A (not found
// in the source below, or not checked). Sources, all checked 2026-11-04: TH = NLEM 2569, a MIMS Thailand brand or the Thai FDA register;
// US = openFDA drugsfda (the original 18 all have a Prescription product; Discontinued only = past; no FDA record = never);
// UK = emc (medicines.org.uk); EU = Spain AEMPS CIMA, the EMA lists of nationally authorised products and German / Italian /
// Swedish sources (EU current = marketed in at least one member state); JP = KEGG MEDICUS (JAPIC prescription products).
// A drug with no UK / EU / JP entry was not found there; it may have been withdrawn.
const C = 'current', ALL = { uk: C, eu: C, jp: C };
const REG_X = {
  acetazolamide: ALL, mannitol: ALL, furosemide: ALL, torsemide: ALL, indapamide: ALL, spironolactone: ALL, eplerenone: ALL, tolvaptan: ALL, dapagliflozin: ALL, empagliflozin: ALL,
  bumetanide: { uk: C, eu: C, jp: 'past' }, ethacrynic: { eu: C }, hctz: { eu: C, jp: C }, chlorthalidone: { uk: C, eu: C, jp: 'never' }, metolazone: { uk: C, eu: C },
  chlorothiazide: { jp: 'never' },
  amiloride: { uk: C, eu: C, jp: 'never' }, triamterene: { uk: 'past', eu: C, jp: C },
  bendroflumethiazide: { us: 'past', uk: C, eu: C }, xipamide: { us: 'never', uk: C, eu: C, jp: 'never' }, canrenoate: { us: 'never', eu: C, jp: C },
  trichlormethiazide: { us: 'past', jp: C }, azosemide: { us: 'never', jp: C }, esaxerenone: { us: 'never', jp: C },
};
// Thai FDA drug register (pertento.fda.moph.go.th, searched by active ingredient on 2026-11-05; cancelled entries are included):
// all registrations cancelled or expired = past; no registration found = 'never' (shown as Not found). Modern-medicine registrations only.
const TH_FDA = { bumetanide: 'past', torsemide: 'past', metolazone: 'past', eplerenone: 'past', triamterene: 'past', ethacrynic: 'never', chlorothiazide: 'never', bendroflumethiazide: 'never', xipamide: 'never', canrenoate: 'never', trichlormethiazide: 'never', azosemide: 'never', esaxerenone: 'never' };
Object.entries(TH_FDA).forEach(([id, v]) => { REG_X[id] = { ...(REG_X[id] || {}), th: v }; });
// Extra caveats per drug (shown under Availability)
const REG_NOTE = {
  chlorthalidone: { en: 'JP: no entry in PMDA diuretic classes (checked 2026-11-05); a catalogue without history, so shown as not found.', th: 'JP: ไม่พบในหมวดยาขับปัสสาวะของ PMDA (ตรวจ 5 พ.ย. 2569) เป็นรายการที่ไม่มีประวัติ จึงแสดงว่าไม่พบ' },
  bendroflumethiazide: { en: 'Thai FDA register: no registration found.', th: 'ทะเบียนยา อย.: ไม่พบทะเบียน' },
  eplerenone: { en: 'Thai FDA register: Inspra 25 and 50 mg cancelled in 2010.', th: 'ทะเบียนยา อย.: Inspra 25 และ 50 มก. ยกเลิกปี 2553' },
  torsemide: { en: 'Thai FDA register: 12 registrations (e.g. Unat), all cancelled.', th: 'ทะเบียนยา อย.: 12 ทะเบียน (เช่น Unat) ยกเลิกทั้งหมด' },
  bumetanide: { en: 'JP: PMDA lists the ingredient (Lunetoron tablets existed) but no marketed product now (checked 2026-11-05). Thai FDA register: Burinex, 3 registrations, all cancelled (1994–2006).', th: 'JP: PMDA มีรายการตัวยาแต่ไม่มียาที่จำหน่ายอยู่ในปัจจุบัน (เคยมี Lunetoron) ตรวจเมื่อ 5 พ.ย. 2569 ทะเบียนยา อย.: Burinex 3 ทะเบียน ยกเลิกทั้งหมด (2537–2549)' },
  ethacrynic: { en: 'JP: PMDA lists the ingredient with no marketed product (checked 2026-11-05). UK: not on emc or in the MHRA substance index; no record in NHS dm+d, which includes discontinued products. Ireland: the Edecrin licence was withdrawn in 1998 (HPRA). Italy (AIFA): Reomax. Thai FDA register: no registration found.', th: 'JP: PMDA มีรายการตัวยาแต่ไม่มียาที่จำหน่าย (ตรวจ 5 พ.ย. 2569) UK: ไม่พบใน emc และทะเบียน MHRA และไม่มีในฐานข้อมูล NHS dm+d ซึ่งรวมยาที่เลิกจำหน่าย ไอร์แลนด์: ยกเลิกใบอนุญาต Edecrin ปี 2541 (HPRA) ทะเบียนยา อย.: ไม่พบทะเบียน' },
  metolazone: { en: 'JP: PMDA lists the ingredient with no marketed product (checked 2026-11-05). Thai FDA register: Zaroxolyn, 3 registrations, cancelled in 1994.', th: 'JP: PMDA มีรายการตัวยาแต่ไม่มียาที่จำหน่าย (ตรวจ 5 พ.ย. 2569) ทะเบียนยา อย.: Zaroxolyn 3 ทะเบียน ยกเลิกปี 2537' },
  chlorothiazide: { en: 'JP: no entry in PMDA diuretic classes (shown as not found; checked 2026-11-05). UK: not on emc or in the MHRA register; NHS dm+d lists only unlicensed special-order and imported US (Diuril) supplies; Italy (AIFA) and Spain (CIMA): none. IV form is a US product. Thai FDA register: no registration found (chlorothiazide sodium, Diuril).', th: 'JP: ไม่พบในหมวดยาขับปัสสาวะของ PMDA (ตรวจ 5 พ.ย. 2569) UK: ไม่พบใน emc และทะเบียน MHRA NHS dm+d มีเฉพาะยานำเข้าหรือสั่งพิเศษที่ไม่มีทะเบียน ยาฉีดนี้เป็นผลิตภัณฑ์ของสหรัฐฯ ทะเบียนยา อย.: ไม่พบทะเบียน (chlorothiazide sodium, Diuril)' },
  xipamide: { en: 'EU: Xipamid-ratiopharm 10/20/40 mg tablets in Germany (product information July 2020); not in Spain (AEMPS CIMA). JP: no entry in PMDA diuretic classes. UK: Diurexan 20 mg tablets (PL 46302/0127) are on the MHRA register and not marked discontinued in NHS dm+d (Viatris), but not on emc; not in Italy (AIFA) (checked 2026-11-05). Thai FDA register: no registration found.', th: 'EU: มี Xipamid-ratiopharm 10/20/40 มก. ในเยอรมนี (เอกสารกำกับยา ก.ค. 2563) ไม่มีในสเปนและอิตาลี (AEMPS CIMA, AIFA) JP: ไม่พบในหมวดยาขับปัสสาวะของ PMDA UK: มี Diurexan 20 มก. (PL 46302/0127) ในทะเบียน MHRA และ NHS dm+d ไม่ระบุว่าเลิกจำหน่าย (Viatris) แต่ไม่พบใน emc (ตรวจ 5 พ.ย. 2569) ทะเบียนยา อย.: ไม่พบทะเบียน' },
  esaxerenone: { en: 'UK: not on emc or in the MHRA register; EU: none in Spain (AEMPS CIMA) or Italy (AIFA) (checked 2026-11-05). NHS dm+d (includes discontinued products): no record. An old authorisation is not excluded. Thai FDA register: no registration found.', th: 'UK: ไม่พบใน emc และทะเบียน MHRA EU: ไม่พบในสเปน (AEMPS CIMA) และอิตาลี (AIFA) (ตรวจ 5 พ.ย. 2569) ไม่มีในฐานข้อมูล NHS dm+d (รวมยาที่เลิกจำหน่าย) ยังไม่ตัดความเป็นไปได้ที่เคยได้รับอนุมัติในอดีต ทะเบียนยา อย.: ไม่พบทะเบียน' },
  azosemide: { en: 'UK: not on emc or in the MHRA register; EU: none in Spain (AEMPS CIMA) or Italy (AIFA) (checked 2026-11-05). NHS dm+d (includes discontinued products): no record. An old authorisation is not excluded. Thai FDA register: no registration found.', th: 'UK: ไม่พบใน emc และทะเบียน MHRA EU: ไม่พบในสเปน (AEMPS CIMA) และอิตาลี (AIFA) (ตรวจ 5 พ.ย. 2569) ไม่มีในฐานข้อมูล NHS dm+d (รวมยาที่เลิกจำหน่าย) ยังไม่ตัดความเป็นไปได้ที่เคยได้รับอนุมัติในอดีต ทะเบียนยา อย.: ไม่พบทะเบียน' },
  trichlormethiazide: { en: 'UK: not on emc or in the MHRA register; EU: none in Spain (AEMPS CIMA) or Italy (AIFA) (checked 2026-11-05). NHS dm+d (includes discontinued products): no record. An old authorisation is not excluded. Thai FDA register: no registration found.', th: 'UK: ไม่พบใน emc และทะเบียน MHRA EU: ไม่พบในสเปน (AEMPS CIMA) และอิตาลี (AIFA) (ตรวจ 5 พ.ย. 2569) ไม่มีในฐานข้อมูล NHS dm+d (รวมยาที่เลิกจำหน่าย) ยังไม่ตัดความเป็นไปได้ที่เคยได้รับอนุมัติในอดีต ทะเบียนยา อย.: ไม่พบทะเบียน' },
  amiloride: { en: 'JP: no entry in PMDA diuretic classes (shown as not found). EU: sold as a combination with HCTZ (Spain). UK: single-ingredient tablet and oral solution too.', th: 'JP: ไม่พบในหมวดยาขับปัสสาวะของ PMDA (แสดงว่าไม่พบ) EU: จำหน่ายเป็นยาผสมกับ HCTZ (สเปน) UK: มีทั้งยาเดี่ยวชนิดเม็ดและน้ำ' },
  triamterene: { en: 'EU: combination with HCTZ only (Spain, Germany). UK: Dytac capsules were discontinued (NHS dm+d, 2014); no single-ingredient product is listed now. JP: Triteren capsules 50 mg are current (PMDA). UK: the MHRA register lists only the triamterene/chlortalidone combination; NHS dm+d marks Dytac and the triamterene 50 mg capsules as discontinued. Thai FDA register: only combinations (Dyazide, Hyazide, Triamzide), all cancelled or expired.', th: 'EU: มีเฉพาะยาผสมกับ HCTZ (สเปน เยอรมนี) UK: แคปซูล Dytac เลิกจำหน่ายแล้ว (NHS dm+d ปี 2014) ปัจจุบันไม่มียาเดี่ยว JP: มี Triteren แคปซูล 50 มก. (PMDA) UK: ทะเบียน MHRA มีเฉพาะยาผสม triamterene/chlortalidone และ NHS dm+d ระบุว่า Dytac กับแคปซูล triamterene 50 มก. เลิกจำหน่ายแล้ว ทะเบียนยา อย.: มีเฉพาะยาผสม (Dyazide, Hyazide, Triamzide) ยกเลิกหรือหมดอายุทั้งหมด' },
  hctz: { en: 'UK: only combinations on emc; no licensed single-ingredient tablet was found.', th: 'UK: พบเฉพาะยาผสมใน emc ไม่พบยาเดี่ยวที่ขึ้นทะเบียน' },
  canrenoate: { en: 'Japan: IV (Soldactone). Italy: Kanrenol (Teofarma) tablets and vials plus generics are in the AIFA database; also Germany. Not in Spain (AEMPS CIMA), not in the MHRA register or on emc (UK); NHS dm+d lists only an imported German injection (checked 2026-11-05). Thai FDA register: no registration found.', th: 'ญี่ปุ่น: ชนิดฉีด (Soldactone) อิตาลี: Kanrenol (Teofarma) ทั้งยาเม็ดและยาฉีด และยาสามัญ อยู่ในฐานข้อมูล AIFA รวมทั้งเยอรมนี ไม่พบในสเปน (AEMPS CIMA) ไม่พบในทะเบียน MHRA และ emc (UK) NHS dm+d มีเฉพาะยาฉีดนำเข้าจากเยอรมนี (ตรวจ 5 พ.ย. 2569) ทะเบียนยา อย.: ไม่พบทะเบียน' },
};
const TH_OK = new Set([...Object.keys(NLEM), ...Object.keys(BRANDS)]);
const REG = Object.fromEntries(DRUGS.map(d => [d.id, { us: C, ...(TH_OK.has(d.id) ? { th: C } : {}), ...REG_X[d.id] }]));
const MKT = {
  us: { mannitol: 'Osmitrol', furosemide: 'Lasix ONYU, Furoscix', bumetanide: 'Bumex, Enbumyst', torsemide: 'Soaanz', ethacrynic: 'Edecrin', hctz: 'Microzide, Inzirqo',
    chlorthalidone: 'Thalitone, Hemiclor', spironolactone: 'Aldactone, CaroSpir', eplerenone: 'Inspra', amiloride: 'Midamor', triamterene: 'Dyrenium',
    tolvaptan: 'Samsca, Jynarque', dapagliflozin: 'Farxiga', empagliflozin: 'Jardiance' },
  uk: { xipamide: 'Diurexan', furosemide: 'Frusol', torsemide: 'Torem', chlorthalidone: 'Hylaton', indapamide: 'Natrilix SR (discontinued)', metolazone: 'Xaqua',
    spironolactone: 'Aldactone, Qaialdo, Urospir', eplerenone: 'Inspra', tolvaptan: 'Jinarc, Samsca', acetazolamide: 'Diamox', dapagliflozin: 'Forxiga', empagliflozin: 'Jardiance' },
  eu: { acetazolamide: 'Edemox (ES)', mannitol: 'Manitol Mein (ES)', furosemide: 'Seguril (ES)', bumetanide: 'Fordiuran (ES)', torsemide: 'Dilutol, Isodur, Sutril (ES)',
    ethacrynic: 'Reomax (IT)', chlorthalidone: 'Higrotona (ES)', indapamide: 'Tertensif (ES)', metolazone: 'Zaroxolyn (IT)', spironolactone: 'Aldactone (ES)',
    eplerenone: 'Elecor, Inspra (ES)', amiloride: 'Ameride, Diuzine (ES, with HCTZ)', triamterene: 'Salidur (ES, with HCTZ)', tolvaptan: 'Jinarc, Samsca',
    dapagliflozin: 'Forxiga, Edistride (ES)', empagliflozin: 'Jardiance', bendroflumethiazide: 'Evolan (SE)', xipamide: 'Xipamid-ratiopharm (DE)', canrenoate: 'Kanrenol (IT)' },
  jp: { triamterene: 'Triteren (トリテレン)', acetazolamide: 'Diamox (ダイアモックス)', mannitol: 'Mannit-T (マンニットT), Mannitol-S (マンニットールS)', furosemide: 'Lasix (ラシックス)', torsemide: 'Lupirac (ルプラック)',
    indapamide: 'Natrix (ナトリックス)', spironolactone: 'Aldactone-A (アルダクトンA)', eplerenone: 'Selara (セララ)', tolvaptan: 'Samsca (サムスカ)', dapagliflozin: 'Forxiga (フォシーガ)',
    empagliflozin: 'Jardiance (ジャディアンス)', trichlormethiazide: 'Fluitran (フルイトラン)', azosemide: 'Diart (ダイアート)', canrenoate: 'Soldactone (ソルダクトン)', esaxerenone: 'Minebro (ミネブロ)' },
};
const brandsOf = (d, c) => (c === 'th' ? BRANDS[d.id] : MKT[c] && MKT[c][d.id]) || null;
// first country with brand names (TH first), for the card line
const marketLine = (d) => { for (const c of COUNTRIES) { const b = brandsOf(d, c); if (b) return { c, b }; } return null; };
const shortBrands = (b) => { const a = b.split(', '); return a.slice(0, 4).join(', ') + (a.length > 4 ? ' +' + (a.length - 4) : ''); };
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
  made: ['Made by Warodom Phaenthong, M.D.', 'Made by Warodom Phaenthong, M.D.'],
  disc: ['For clinician reference. Check local protocols and the patient before prescribing.', 'ใช้อ้างอิงสำหรับบุคลากรทางการแพทย์ ตรวจสอบแนวปฏิบัติของโรงพยาบาลและข้อมูลผู้ป่วยก่อนสั่งยา'],
  search: ['Search drug, class or target…', 'ค้นหายา กลุ่มยา หรือเป้าหมาย…'],
  mech: ['Mechanism', 'กลไก'], copy: ['Copy summary', 'คัดลอกสรุป'], copied: ['Copied', 'คัดลอกแล้ว'], fxLinkT: ['Show drugs by electrolyte effect', 'แสดงยาตามผลต่ออิเล็กโทรไลต์'], fxLink: ['Lit on the nephron: drugs with this effect. Tap one to select it.', 'ยาที่มีผลนี้จะสว่างบนเนฟรอน แตะเพื่อเลือกยา'], evTitle: ['Best trial evidence listed for this drug', 'หลักฐานจากการศึกษาที่ดีที่สุดที่แสดงไว้สำหรับยานี้'], kid: ['Kidney check', 'ตรวจไต/ตับ'], inter: ['Interactions', 'ปฏิกิริยายา'], cmp: ['Compare', 'เปรียบเทียบ'],
  kidneyT: ['Kidney / liver check', 'ตรวจไต/ตับก่อนเลือกยา'], liverSev: ['Severe liver disease', 'โรคตับรุนแรง'],
  kidneyHint: ['Enter an eGFR, or tick a condition, to sort the drugs into avoid, caution and no restriction found.', 'ใส่ eGFR หรือเลือกภาวะ เพื่อแบ่งยาเป็น หลีกเลี่ยง ระวัง และไม่พบข้อจำกัด'],
  kidneyNote: ['A screen built from the labels and guidelines in each drug’s Kidney / liver dosing section. Tap a drug for the wording. It does not replace the label or clinical judgement.', 'เป็นตัวคัดกรองจากฉลากและแนวทางในหัวข้อขนาดยาตามไต/ตับของแต่ละตัวยา แตะชื่อยาเพื่อดูรายละเอียด ไม่ได้ทดแทนฉลากยาหรือดุลยพินิจทางคลินิก'],
  interT: ['Interactions with other drugs', 'ปฏิกิริยากับยาอื่น'], interPick: ['Patient also takes (tap to add / remove)', 'ผู้ป่วยใช้ยาอื่นด้วย (แตะเพื่อเพิ่ม/ลบ)'],
  interHint: ['Pick the other drugs the patient takes to see which diuretics are flagged.', 'เลือกยาอื่นที่ผู้ป่วยใช้ เพื่อดูว่ายาขับปัสสาวะตัวใดต้องระวัง'],
  interAvoid: ['Avoid (contraindicated or not recommended)', 'หลีกเลี่ยง (ห้ามหรือไม่แนะนำให้ใช้ร่วม)'], interCaution: ['Caution', 'ระวัง'], interNone: ['No interaction listed in the sources checked', 'ไม่มีปฏิกิริยาที่ระบุไว้ในแหล่งที่ตรวจ'], interSel: ['Selected', 'ที่เลือก'], interFor: ['Interactions of', 'ปฏิกิริยาของ'], interAll: ['Show all drugs', 'ดูทุกตัว'], interNoFor: ['No medicine in this list is flagged for this drug in the sources checked.', 'ไม่มียาในรายการนี้ที่ถูกระบุว่าทำปฏิกิริยากับยานี้ในแหล่งที่ตรวจ'], interCheck: ['Check interactions', 'ตรวจปฏิกิริยายา'], interClearAll: ['Clear all', 'ล้างทั้งหมด'], interSearch: ['Search medicines', 'ค้นหายา'], interHide: ['Hide list', 'ซ่อนรายการ'], interChoose: ['Choose more', 'เลือกเพิ่ม'], interNoMatch: ['No medicine matches this search.', 'ไม่มียาที่ตรงกับคำค้นนี้'], interAvoidS: ['Avoid', 'หลีกเลี่ยง'], interNoneS: ['None listed', 'ไม่มีที่ระบุ'], interRemove: ['Remove', 'เอาออก'],
  interNote: ['Covers the main interactions summarised in each drug’s Key interactions section, not every possible pair. Check the label for the full list.', 'ครอบคลุมปฏิกิริยาหลักที่สรุปไว้ในแต่ละตัวยา ไม่ครบทุกคู่ ตรวจรายการเต็มจากฉลากยา'], brandsH: ['Market names (brands)', 'ชื่อทางการค้า'], brandsCol: ['Brands', 'ชื่อการค้า'], incr: ['increased', 'เพิ่มขึ้น'], decr: ['decreased', 'ลดลง'], trials: ['Key clinical trials', 'การศึกษาทางคลินิกสำคัญ'], noTrial: ['No landmark outcome trial is included for this drug (N/A).', 'ไม่ได้รวมการศึกษาผลลัพธ์สำคัญของยานี้ (N/A)'], design: ['Design', 'รูปแบบ'], result: ['Result', 'ผล'], caution: ['Serious side effect: check before prescribing', 'ผลข้างเคียงที่สำคัญ: ตรวจก่อนสั่งยา'], conv: ['Loop dose conversion', 'เทียบขนาดยากลุ่มลูป'], renal: ['Kidney / liver dosing', 'ขนาดยาตามไต/ตับ'], ddi: ['Key interactions', 'ยาที่ต้องระวังเมื่อใช้ร่วม'], resist: ['Diuretic resistance', 'ดื้อยาขับปัสสาวะ'], key: ['Key', 'คำอธิบาย'],
  all: ['All', 'ทั้งหมด'], any: ['Any effect', 'ทุกผล'],
  tile: ['Tile', 'การ์ด'], list: ['List', 'รายการ'], table: ['Table', 'ตาราง'],
  sort: ['Sort', 'เรียง'], byClass: ['Class', 'กลุ่มยา'], byName: ['Name', 'ชื่อยา'], bySite: ['Site', 'ตำแหน่ง'],
  showing: ['Showing', 'แสดง'], of: ['of', 'จาก'], drugs: ['drugs', 'ชนิด'], clear: ['Clear', 'ล้าง'],
  select: ['Select', 'เลือก'], compareB: ['Compare', 'เปรียบเทียบ'], ind: ['Which diuretic for what', 'เลือกยาขับปัสสาวะตามข้อบ่งใช้'], indIntro: ['Diuretic choices by indication, each line with its source and, where the source gives one, its class and level. Tap a drug to open its card. A screening aid, not a replacement for clinical judgement.', 'การเลือกยาขับปัสสาวะตามข้อบ่งใช้ ทุกบรรทัดระบุแหล่งที่มา และระดับคำแนะนำกับหลักฐานเมื่อแหล่งนั้นมี แตะชื่อยาเพื่อเปิดการ์ด เป็นเครื่องมือช่วยคัดกรอง ไม่ใช่ตัวแทนวิจารณญาณทางคลินิก'], indDrugs: ['Drugs', 'ยา'], indShow: ['Show', 'แสดง'], indAll: ['All', 'ทั้งหมด'], indJump: ['Jump to an indication', 'ข้ามไปยังข้อบ่งใช้'], indQA: ['Quick answer', 'สรุปเร็ว'], indQAnote: ['summarises the rows below', 'สรุปจากแถวด้านล่าง'], indRec: ['Recommendation', 'ข้อแนะนำ'], indSrcCol: ['Source and level', 'แหล่งและระดับ'], indNA: ['Not covered yet: source not read (N/A)', 'ยังไม่ครอบคลุม: ยังไม่ได้อ่านแหล่งข้อมูล (N/A)'], indSrcNote: ['Class / level are the source’s own (for example I C = class I, level C). Chip colour shows the strength: green = strong (class I, strong), blue = moderate (IIa, conditional), amber = weak (IIb, weak), red = against (III). Lines without a chip are text or trial summaries from the source.', 'ระดับคำแนะนำ / หลักฐานเป็นของแหล่งข้อมูลนั้น (เช่น I C = ระดับ I หลักฐาน C) สีของชิปบอกความแรง: เขียว = แรง (class I, strong) ฟ้า = ปานกลาง (IIa, conditional) เหลือง = อ่อน (IIb, weak) แดง = แนะนำไม่ใช้ (III) บรรทัดที่ไม่มีชิปเป็นข้อความหรือสรุปการศึกษาจากแหล่งนั้น'], fxS: ['Electrolytes', 'อิเล็กโทรไลต์'], routePO: ['Oral', 'รับประทาน'], routeIV: ['Intravenous', 'ฉีดเข้าหลอดเลือดดำ'], siteS: ['Site', 'ตำแหน่ง'], evS: ['Evidence', 'หลักฐาน'], brandsOf: ['Brands', 'ยี่ห้อ'], seSerious: ['Serious', 'สำคัญ'], seCommon: ['Common', 'ที่พบบ่อย'], compactT: ['Compact', 'แบบย่อ'], compactTitle: ['Hide the site, evidence, NLEM, country and common side-effect rows on cards', 'ซ่อนแถวตำแหน่ง หลักฐาน NLEM ประเทศ และผลข้างเคียงที่พบบ่อยบนการ์ด'], selected: ['Selected', 'เลือกแล้ว'], nsel: ['selected', 'รายการที่เลือก'],
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
  discLink: ['Decision support only: read the disclaimer', 'เป็นเครื่องมือช่วยตัดสินใจเท่านั้น: อ่านข้อจำกัด'], discBody: ['For adult clinicians only. This guide supports decisions and does not replace clinical judgement, the product label or your local protocol. Check doses, renal function and electrolytes for each patient before prescribing. The Kidney check, Interactions and Next-step helper are screening aids built from labels and guidelines and do not cover every case. Trial summaries are brief: read the source paper before applying a result. The Which diuretic for what guide summarises the sources named on each line and covers only the indications listed; it is not a prescribing rule.', 'สำหรับบุคลากรทางการแพทย์ที่ดูแลผู้ใหญ่เท่านั้น คู่มือนี้ช่วยการตัดสินใจ ไม่ได้แทนวิจารณญาณทางคลินิก ฉลากยา หรือแนวปฏิบัติของโรงพยาบาล ตรวจขนาดยา การทำงานของไต และอิเล็กโทรไลต์ของผู้ป่วยทุกครั้งก่อนสั่งยา ตัวตรวจไต/ตับ ปฏิกิริยายา และตัวช่วยเลือกขั้นถัดไปเป็นเครื่องมือคัดกรองจากฉลากยาและแนวทางเวชปฏิบัติ ไม่ครอบคลุมทุกกรณี สรุปการศึกษามีเนื้อหาสั้น ควรอ่านบทความต้นฉบับก่อนนำผลไปใช้ คู่มือเลือกยาขับปัสสาวะตามข้อบ่งใช้สรุปจากแหล่งที่ระบุในแต่ละบรรทัด และครอบคลุมเฉพาะข้อบ่งใช้ที่แสดงไว้ ไม่ใช่กฎการสั่งยา'],
  keyTitle: ['Explains every chip, mark and colour', 'อธิบายป้าย สัญลักษณ์ และสี'], inDb: ['in database', 'ในฐานข้อมูล'],
  nlem: ['NLEM', 'บัญชียาหลักฯ'], avail: ['Availability', 'การจดทะเบียน/มีจำหน่าย'],
  ctryNote: ['Checked 2026-11-04: Thailand (NLEM or MIMS brand), US (openFDA), UK (emc), EU (Spain AEMPS, EMA lists, national sources), JP (KEGG / JAPIC). N/A = not found there or not checked; it may have been withdrawn.', 'ตรวจเมื่อ 4 พ.ย. 2569: ไทย (NLEM หรือยี่ห้อ MIMS) สหรัฐฯ (openFDA) UK (emc) EU (สเปน AEMPS รายการ EMA และแหล่งระดับประเทศ) ญี่ปุ่น (KEGG / JAPIC) N/A = ไม่พบหรือยังไม่ได้ตรวจ อาจถูกถอนทะเบียนแล้ว'],
  st_current: ['Registered now', 'ขึ้นทะเบียนอยู่'], st_past: ['Previously registered', 'เคยขึ้นทะเบียน'], st_never: ['Not found in this register', 'ไม่พบในทะเบียนนี้'], st_unk: ['Not verified (N/A)', 'ยังไม่ตรวจสอบ (N/A)'],
  fdaStatus: ['FDA status', 'สถานะ อย.'], fCur: ['Current', 'ปัจจุบัน'], fPast: ['Past †', 'เคยมี †'], fNever: ['Not found ⊘', 'ไม่พบ ⊘'],
  brandsT: ['Thai brands (MIMS Thailand)', 'ยี่ห้อในประเทศไทย (MIMS Thailand)'], noBrand: ['No Thai brand listed in MIMS Thailand.', 'MIMS Thailand ไม่มียี่ห้อในไทยที่ระบุ'],
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
  return <span title={e.l + ' ' + ARROW[v]} className={'inline-flex items-center gap-0.5 rounded border px-1 py-px text-[11px] font-bold whitespace-nowrap ' + FX_STYLE[v]}>{e.l}{ARROW[v]}</span>;
}
function ClassChip({ c, lang }) {
  return <span className={'inline-flex rounded border px-1 py-px text-[10px] font-bold whitespace-nowrap ' + CLS[c].chip}>{CLS[c].s[lang]}</span>;
}
function SiteChips({ d, lang, lbl }) {
  const i = lang === 'th' ? 1 : 0;
  return <>{d.sites.map((s, k) => <span key={s} title={SEG_NAME[s][lang]} className="inline-flex rounded border px-1 py-px text-[10px] font-bold whitespace-nowrap bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-400/30">{lbl && k === 0 ? TXT.siteS[i] + ': ' : ''}{s.toUpperCase()}</span>)}</>;
}
function NlemChip({ d, lang }) {
  const c = NLEM[d.id];
  return <span title={c ? 'NLEM 2569: ' + c.f : TXT.nlemNote[lang === 'th' ? 1 : 0]} className={'inline-flex rounded border px-1 py-px text-[11px] font-bold whitespace-nowrap ' + (c ? 'border-indigo-300 text-indigo-700 dark:border-indigo-400/50 dark:text-indigo-300' : 'border-slate-200 text-slate-500 dark:border-[#263449] dark:text-slate-400')}>{c ? (lang === 'th' ? 'NLEM · พื้นฐาน (b)' : 'NLEM · Basic (b)') : (lang === 'th' ? 'ไม่อยู่ใน NLEM' : 'Non-NLEM')}</span>;
}
function CountryChips({ d, lang }) {
  return <>{COUNTRIES.map(c => {
    const st = stOf(d, c);
    const cls = st === 'current' ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-300' : st === 'past' ? 'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-300' : 'border-slate-200 text-slate-400 dark:border-[#263449] dark:text-slate-500';
    return <span key={c} title={CTRY[c].name[lang === 'th' ? 1 : 0] + ': ' + TXT['st_' + (st || 'unk')][lang === 'th' ? 1 : 0]} className={'text-[11px] font-bold rounded border px-1 py-px leading-none whitespace-nowrap ' + cls}>{c.toUpperCase()}{st === 'past' ? ' †' : st === 'never' ? ' ⊘' : st ? '' : ' ?'}</span>;
  })}</>;
}
// Side effects that can be serious: shown with a warning triangle on cards, the table and the detail view
const CAUTION = new Set(['hyperK', 'ototox', 'liver', 'ods', 'dka', 'wbc', 'aki', 'pulm']);
const WARN_CHIP = 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-400/40';
function Cautions({ d, lang }) {
  const i = lang === 'th' ? 1 : 0;
  const list = d.se.filter(x => CAUTION.has(x));
  if (!list.length) return null;
  return <div className="flex flex-wrap gap-1">{list.map(x => <span key={x} title={TXT.caution[i]} className={'inline-flex items-center gap-1 rounded border px-1.5 py-px text-[11px] font-bold ' + WARN_CHIP}><WarnIcon className="w-3 h-3 shrink-0" />{SE[x][i]}</span>)}</div>;
}
function Effects({ d, showZero }) {
  const items = ELECTROLYTES.filter(e => showZero || d.fx[e.k] !== 0);
  if (!items.length) return null;
  return <div className="flex flex-wrap gap-1">{items.map(e => <EffChip key={e.k} k={e.k} v={String(d.fx[e.k])} />)}</div>;
}
// Route of a dose line from its label ('PO', 'IV', 'PO/IV'); other labels such as 'Resistance' have none
const routeOf = (label) => label.split('/').filter(r => r === 'PO' || r === 'IV');
function RouteIcons({ label, lang }) {
  const i = lang === 'th' ? 1 : 0;
  return <>{routeOf(label).map(r => {
    const name = (r === 'PO' ? TXT.routePO : TXT.routeIV)[i];
    return <span key={r} role="img" aria-label={name} title={name} className="inline-flex align-middle mr-0.5 text-slate-500 dark:text-slate-400">{r === 'PO' ? <PillIcon className="w-3.5 h-3.5" /> : <DropIcon className="w-3.5 h-3.5" />}</span>;
  })}</>;
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

// <donate>
// Bedside UI donation button + PromptPay QR pop-up (source: shared/donate/Donate.jsx; installed by shared/donate/install.js).
// Self-contained: own open state, own Escape handling (it closes only itself), pop-up rendered in a portal so no parent
// stacking context can hide it. Needs React hooks (useState, useEffect) and ReactDOM in scope. Usage: <DonateButton isTh={lang === 'th'} />
const DONATE = {
  qr: 'data:image/jpeg;base64,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n/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8qOK/4U98Pv8AoSPDn/gqh/8AiaP+FPfD7/oSPDn/AIKof/ia7Wij2tT+Z/eHsqf8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',
  en: {
    btn: 'Donate', title: 'Support this guide', close: 'Close', alt: 'PromptPay QR code for donations',
    intro: 'This guide is free to use. If it helps your practice, you can support its development by scanning this PromptPay QR code with your banking app.',
    scan: 'Scan with a Thai banking app (PromptPay / Thai QR Payment).',
    note: 'Donations are voluntary and do not change the content of the guide.',
  },
  th: {
    btn: 'สนับสนุน', title: 'สนับสนุนคู่มือนี้', close: 'ปิด', alt: 'QR พร้อมเพย์สำหรับสนับสนุนผู้พัฒนา',
    intro: 'คู่มือนี้ใช้ได้ฟรี หากเป็นประโยชน์ต่อการทำงาน สามารถสนับสนุนการพัฒนาได้โดยสแกน QR พร้อมเพย์นี้ด้วยแอปธนาคาร',
    scan: 'สแกนด้วยแอปธนาคารของไทย (พร้อมเพย์ / Thai QR Payment)',
    note: 'การสนับสนุนเป็นความสมัครใจ และไม่มีผลต่อเนื้อหาของคู่มือ',
  },
};
const DonateButton = ({ isTh = false, className = '' }) => {
  const [open, setOpen] = useState(false);
  const d = DONATE[isTh ? 'th' : 'en'];
  useEffect(() => {
    if (!open) return;
    // capture phase: the page's own Escape handler never sees this key press, so only this pop-up closes
    const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); setOpen(false); } };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open]);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} title={d.title} aria-label={d.title} aria-haspopup="dialog" data-donate-btn
        className={`text-[10px] md:text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-[#151f32] shadow-sm px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-[#263449] flex items-center gap-1.5 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-300 hover:border-rose-200 dark:hover:border-rose-400/30 transition-all cursor-pointer ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-rose-500" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>
        <span className="hidden sm:inline">{d.btn}</span>
      </button>
      {open && ReactDOM.createPortal(
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 print:hidden" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }} data-donate-modal>
          <div className="bg-white dark:bg-[#151f32] dark:border dark:border-[#263449] w-full max-w-sm rounded-2xl shadow-2xl flex flex-col max-h-[95vh] animate-in fade-in zoom-in-95 duration-200" role="dialog" aria-modal="true" aria-label={d.title}>
            <div className="flex items-center justify-between gap-3 p-4 border-b border-slate-100 dark:border-[#263449] bg-slate-50 dark:bg-[#101a2b] rounded-t-2xl shrink-0">
              <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 leading-tight flex items-center gap-2 min-w-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-rose-500 shrink-0" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>
                <span className="break-words min-w-0">{d.title}</span>
              </h2>
              <button type="button" onClick={() => setOpen(false)} className="p-2 -m-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-100 hover:bg-white dark:hover:bg-[#151f32] rounded-full transition-colors shrink-0" aria-label={d.close}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-4 flex-grow overflow-y-auto flex flex-col items-center gap-3 bg-white dark:bg-[#151f32]">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-center">{d.intro}</p>
              {/* the QR keeps a white card in dark mode so it scans reliably */}
              <div className="light-lock rounded-xl border border-slate-200 bg-white p-1.5 max-w-full">
                <img src={DONATE.qr} alt={d.alt} className="block mx-auto w-auto max-w-full rounded-lg" style={{ maxHeight: '52vh' }} data-donate-qr />
              </div>
              <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 text-center">{d.scan}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug text-center">{d.note}</p>
            </div>
            <div className="flex items-center justify-end p-3 border-t border-slate-100 dark:border-[#263449] shrink-0">
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-800 dark:bg-indigo-600 text-white hover:bg-slate-700 dark:hover:bg-indigo-500 transition-colors">{d.close}</button>
            </div>
          </div>
        </div>, document.body)}
    </>
  );
};
// </donate>

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

function MechanismModal({ sel, toggle, clear, onClose, lang, fx, toggleFx }) {
  const t = (k) => TXT[k][lang === 'th' ? 1 : 0];
  const ids = [...sel];
  const matched = fxMatch(fx);
  const shown = [...new Set([...ids, ...matched.map(d => d.id)])];
  return (
    <Modal title={t('mech')} onClose={onClose} lang={lang}>
      <div className="grid md:grid-cols-2 gap-4 items-start">
        <Nephron ids={shown} lang={lang} />
        <div className="space-y-3">
          <div>
            <div className={'text-[10px] font-bold uppercase tracking-wide mb-1 ' + MUTED}>{t('fxLinkT')}</div>
            <FxGrid fx={fx} toggleFx={toggleFx} t={t} />
            {matched.length > 0 && <div className="mt-1.5"><p className={'text-[11px] ' + MUTED}>{t('fxLink')} ({matched.length})</p>
              <div className="mt-1 flex flex-wrap gap-1">{matched.map(d => <button key={d.id} type="button" onClick={() => toggle(d.id)} aria-pressed={sel.has(d.id)} className={'rounded border px-1.5 py-0.5 text-[10px] font-bold ' + (sel.has(d.id) ? BTN_ON : BTN_OFF)}>{d.name.split(' ')[0]}</button>)}</div></div>}
          </div>
          {ids.length === 0 && matched.length === 0 && <p className={'text-[12px] ' + MUTED}>{t('mechHint')}</p>}
          {ids.map(id => {
            const d = DRUG[id];
            return (
              <div key={id} className={'rounded-xl border p-2.5 ' + INSET} style={{ borderLeft: '4px solid ' + CLS[d.cls].hex }}>
                <div className="flex items-center gap-1.5 flex-wrap"><span className="font-extrabold text-sm">{d.name}</span><ClassChip c={d.cls} lang={lang} /></div>
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
  tolvaptan: { en: 'Kidney: contraindicated in anuria; no benefit when there is no urine output. Liver: can cause serious liver injury: avoid with underlying liver disease and stop if ALT / AST rise. Start in hospital with Na⁺ checks.', th: 'ไต: ห้ามใช้เมื่อไม่มีปัสสาวะ ตับ: อาจทำให้ตับอักเสบรุนแรง หลีกเลี่ยงในโรคตับเดิมและหยุดเมื่อ ALT / AST สูงขึ้น เริ่มในโรงพยาบาลและตรวจ Na⁺' },
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
    ['Glucose-lowering drugs: thiazides can raise glucose, so doses may need to go up.', 'ยาลดน้ำตาล: ไทอะไซด์อาจทำให้น้ำตาลสูงขึ้น อาจต้องเพิ่มขนาดยา'],
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
    ['Loop or thiazide diuretics: additive volume depletion and hypotension.', 'ยาลูปหรือไทอะไซด์: ขาดน้ำและความดันต่ำเสริมกัน'],
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
    ['Thiazide-type: chlorthalidone is roughly 1.5–2 times as potent per mg as HCTZ and acts 40–60 h (approximate).', 'ไทอะไซด์: chlorthalidone แรงกว่า HCTZ ต่อ mg ราว 1.5–2 เท่า และออกฤทธิ์ 40–60 ชม. (โดยประมาณ)'],
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
     'ดื้อยาขับปัสสาวะ = ขับโซเดียมหรือลดบวมได้ไม่พอแม้ได้ยาลูปขนาดเหมาะสม วิธีตรวจหลังให้ลูป IV: Na⁺ ในปัสสาวะ (spot) < 50–70 mmol/L ที่ 2 ชม. หรือปัสสาวะ < 100–150 mL/ชม. ใน 6 ชม. แรก'],
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
      t: ['Step 2: Add a thiazide-type (DCT)', 'ขั้น 2: เพิ่มยาไทอะไซด์ (DCT)'],
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
      <Fold title={i ? 'ตัวช่วยเลือกขั้นถัดไป' : 'Next-step helper'} color="border-l-indigo-500" open={false}><ResistanceHelper lang={lang} /></Fold>
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
  konecke: T('Bumetanide vs furosemide (heart failure)', 'Konecke LL. J Clin Pharmacol 1981;21:688', '7040496', '10.1002/j.1552-4604.1981.tb05684.x',
    ['42 outpatients with edema from congestive heart failure, open randomised parallel comparison of bumetanide and furosemide for 6 months.', '42 ราย ผู้ป่วยนอกที่บวมจากหัวใจล้มเหลว เปรียบเทียบ bumetanide กับ furosemide แบบ open randomised parallel นาน 6 เดือน'],
    ['No significant difference in weight, edema, abdominal girth or other signs; blood pressure fell with both. Effective dose ratio bumetanide : furosemide 1 : 25. No drug-related clinical adverse reactions.', 'น้ำหนัก อาการบวม รอบเอว และอาการอื่นไม่ต่างกันอย่างมีนัยสำคัญ ความดันลดลงทั้งสองกลุ่ม อัตราส่วนขนาดยาที่ได้ผล bumetanide : furosemide = 1 : 25 ไม่พบเหตุการณ์ไม่พึงประสงค์ที่เกี่ยวข้องกับยา']),
  tabansadeghi: T('Triamterene add-on (HF diuretic resistance)', 'Taban-Sadeghi M, et al. J Clin Pharmacol 2023;63:1352', '37493211', '10.1002/jcph.2321',
    ['45 hospitalised patients with HFrEF and diuretic resistance, randomised to triamterene 50 mg + HCTZ 25 mg (n = 23) or HCTZ 50 mg alone (n = 22) until discharge.', '45 ราย ผู้ป่วยในหัวใจล้มเหลว EF ต่ำและดื้อยาขับปัสสาวะ สุ่มให้ triamterene 50 mg + HCTZ 25 mg (n = 23) หรือ HCTZ 50 mg อย่างเดียว (n = 22) จนจำหน่าย'],
    ['Weight change −6.3 vs −4.8 kg (P = 0.1) and input-to-output change not different (P = 0.4); secondary outcomes similar. The study did not support triamterene as add-on.', 'น้ำหนักเปลี่ยน −6.3 เทียบ −4.8 กก. (P = 0.1) และอัตราส่วนน้ำเข้า-ออกไม่ต่างกัน (P = 0.4) ผลรองใกล้เคียงกัน การศึกษานี้ไม่สนับสนุนการเสริม triamterene']),
  knauf: T('Xipamide vs spironolactone + furosemide (cirrhotic ascites)', 'Knauf H, et al. Klin Wochenschr 1990;68:545', '2198378', '10.1007/BF01667146',
    ['22 patients with cirrhotic ascites after salt and water restriction, randomised to xipamide 20 mg/day or spironolactone 200 mg + furosemide 40 mg on alternate days.', '22 ราย ตับแข็งมีท้องมานหลังจำกัดเกลือและน้ำ สุ่มให้ xipamide 20 มก./วัน หรือ spironolactone 200 มก. + furosemide 40 มก. วันเว้นวัน'],
    ['Response in the first 4 days 7/11 vs 3/11; 7/11 of the combination group responded by day 8. Response depended on pretreatment FENa (resistance if < 0.2%). Xipamide often caused hypokalemia; the combination caused hyperkalemia. Kidney function stable.', 'ตอบสนองใน 4 วันแรก 7/11 เทียบ 3/11 กลุ่มยาผสมตอบสนอง 7/11 เมื่อครบ 8 วัน การตอบสนองขึ้นกับ FENa ก่อนรักษา (ดื้อถ้า < 0.2%) xipamide ทำให้โพแทสเซียมต่ำบ่อย ส่วนยาผสมทำให้โพแทสเซียมสูง การทำงานของไตคงที่']),
  bolondi: T('Potassium canrenoate in pre-ascitic cirrhosis', 'Bolondi L, et al. Clin Gastroenterol Hepatol 2006;4:1395', '16931172', '10.1016/j.cgh.2006.06.005',
    ['120 patients with Child-Pugh A viral cirrhosis and portal hypertension without ascites, double-blind: potassium canrenoate 100 mg/day (n = 66) or placebo (n = 54) for 52 weeks (13 Italian centres).', '120 ราย ตับแข็ง Child-Pugh A จากไวรัสที่มีความดันพอร์ทัลสูงแต่ไม่มีท้องมาน double-blind: potassium canrenoate 100 มก./วัน (n = 66) หรือยาหลอก (n = 54) นาน 52 สัปดาห์ (13 ศูนย์ในอิตาลี)'],
    ['Ascites (1.5% vs 9.2%) and variceal progression (12.1% vs 24.1%) were not significantly different alone; the combined endpoint was lower on canrenoate (17.6% vs 38.3%, P < 0.05). Well tolerated. Authors call it preliminary.', 'ท้องมาน (1.5% เทียบ 9.2%) และหลอดอาหารโป่งพองลุกลาม (12.1% เทียบ 24.1%) ไม่ต่างกันเมื่อแยกวิเคราะห์ แต่จุดรวมต่ำกว่าในกลุ่ม canrenoate (17.6% เทียบ 38.3%, P < 0.05) ทนยาได้ดี ผู้วิจัยระบุว่าเป็นผลเบื้องต้น']),
  azoRct: T('Azosemide vs furosemide (edema)', 'Zhang Y, et al. Zhejiang Da Xue Xue Bao Yi Xue Ban 2005;34:459', '16216060', '10.3785/j.issn.1008-9292.2005.05.016',
    ['223 patients with cardiac, hepatic or renal edema: azosemide 30–60 mg/day vs furosemide 20–40 mg/day for 2 weeks (multicentre, randomised, double-blind).', '223 ราย บวมจากหัวใจ ตับ หรือไต: azosemide 30–60 mg/วัน เทียบ furosemide 20–40 mg/วัน 2 สัปดาห์ (หลายศูนย์ randomised double-blind)'],
    ['Weight loss 2.87 vs 2.81 kg; edema response 89.2% vs 89.8%; adverse events 23.0% vs 21.0% (hypokalemia, hyperuricemia, hypertriglyceridemia, thirst): similar efficacy.', 'น้ำหนักลด 2.87 เทียบ 2.81 กก. ตอบสนองต่อบวม 89.2% เทียบ 89.8% เหตุการณ์ไม่พึงประสงค์ 23.0% เทียบ 21.0% (โพแทสเซียมต่ำ ยูริกสูง ไตรกลีเซอไรด์สูง กระหายน้ำ) ประสิทธิผลใกล้เคียงกัน']),
  harada: T('Torasemide vs azosemide (chronic HF)', 'Harada K, et al. J Cardiovasc Pharmacol 2009;53:468', '19430310', '10.1097/FJC.0b013e3181a717f7',
    ['30 patients with chronic HF (asymptomatic or mildly symptomatic), crossover: torasemide 8 mg/day vs azosemide 60 mg/day, 3 months each.', '30 ราย หัวใจล้มเหลวเรื้อรัง (ไม่มีอาการหรืออาการน้อย) crossover: torasemide 8 mg/วัน เทียบ azosemide 60 mg/วัน ชนิดละ 3 เดือน'],
    ['Torasemide lowered LV systolic wall stress (259 to 232 kdyn/cm²) and plasma aldosterone (133 to 95 pg/mL) with no change in norepinephrine; with azosemide norepinephrine rose (370 to 481 pg/mL) and wall stress did not change.', 'torasemide ลดความเครียดผนังหัวใจห้องล่างซ้ายช่วงซิสโทลี (259 เป็น 232 kdyn/cm²) และอัลโดสเตอโรน (133 เป็น 95 pg/mL) โดย norepinephrine ไม่เปลี่ยน ส่วน azosemide ทำให้ norepinephrine เพิ่ม (370 เป็น 481 pg/mL) และความเครียดผนังหัวใจไม่เปลี่ยน']),
  ricci: T('Furosemide vs ethacrynic acid (infants)', 'Ricci Z, et al. Crit Care 2015;19:2', '25563826', '10.1186/s13054-014-0724-5',
    ['74 infants after surgery for congenital heart disease: continuous infusion of furosemide vs ethacrynic acid (0.2 mg/kg/h, up to 0.8), double-blind.', '74 ราย ทารกหลังผ่าตัดหัวใจพิการแต่กำเนิด: furosemide เทียบ ethacrynic acid หยดต่อเนื่อง (0.2 mg/kg/ชม. สูงสุด 0.8) double-blind'],
    ['Urine output on day 0 6.9 vs 4.6 mL/kg/h in favour of ethacrynic acid (P = 0.002) with a smaller dose; kidney-injury markers and AKI did not differ; metabolic alkalosis was more intense with ethacrynic acid.', 'ปัสสาวะวันที่ 0 6.9 เทียบ 4.6 mL/kg/ชม. เป็นผลดีต่อ ethacrynic acid (P = 0.002) ด้วยขนาดยาน้อยกว่า ตัวชี้วัดไตบาดเจ็บและ AKI ไม่ต่างกัน ภาวะด่างเมตาบอลิกรุนแรงกว่าด้วย ethacrynic acid']),
  excite: T('EXCITE-HT (T2DM subanalysis)', 'Ohishi M, et al. Hypertens Res 2026;49:444', '41436637', '10.1038/s41440-025-02437-z',
    ['Subanalysis of the open-label randomised EXCITE-HT study in Japanese patients with type 2 diabetes and uncontrolled hypertension: esaxerenone vs trichlormethiazide.', 'การวิเคราะห์กลุ่มย่อยของ EXCITE-HT (open-label randomised) ในผู้ป่วยญี่ปุ่นที่เป็นเบาหวานชนิดที่ 2 และความดันคุมไม่ได้: esaxerenone เทียบ trichlormethiazide'],
    ['Morning home SBP/DBP difference −2.5 (−4.8 to −0.2) / −0.7 (−2.0 to 0.6) mm Hg: similar BP lowering. Urinary ACR fell. Serum K⁺ ≥ 5.5 mEq/L in 2.5% vs 0.9%, none ≥ 6.0.', 'ผลต่างความดันตัวบน/ตัวล่างที่บ้านตอนเช้า −2.5 (−4.8 ถึง −0.2) / −0.7 (−2.0 ถึง 0.6) mm Hg ลดความดันใกล้เคียงกัน ACR ปัสสาวะลดลง K⁺ ≥ 5.5 mEq/L 2.5% เทียบ 0.9% ไม่มีรายใด ≥ 6.0']),
  dapaResist: T('DAPA-RESIST', 'Yeoh SE, et al. Eur Heart J 2023;44:2966', '37210742', '10.1093/eurheartj/ehad341',
    ['61 patients hospitalised for HF and resistant to IV furosemide: dapagliflozin 10 mg vs metolazone 5–10 mg once daily for 3 days (open-label).', '61 ราย นอนโรงพยาบาลจาก HF และดื้อต่อ furosemide IV: dapagliflozin 10 mg เทียบ metolazone 5–10 mg วันละครั้ง 3 วัน (open-label)'],
    ['Weight loss at 96 h 3.0 vs 3.6 kg (difference 0.65 kg, 95% CI −0.12 to 1.41; P = 0.11): dapagliflozin was not more effective. Smaller falls in Na⁺ and K⁺ and smaller rises in urea and creatinine with dapagliflozin; serious adverse events similar.', 'น้ำหนักลดที่ 96 ชม. 3.0 เทียบ 3.6 กก. (ต่างกัน 0.65 กก., 95% CI −0.12 ถึง 1.41; P = 0.11) dapagliflozin ไม่ได้ผลดีกว่า Na⁺ และ K⁺ ลดน้อยกว่า ยูเรียและ creatinine ขึ้นน้อยกว่าด้วย dapagliflozin เหตุการณ์ไม่พึงประสงค์รุนแรงใกล้เคียงกัน']),
  bottino: T('Chlorthalidone vs HCTZ; amiloride doses', 'Bottino LG, et al. J Am Heart Assoc 2026;15:e047583', '42669885', '10.1161/JAHA.125.047583',
    ['Factorial randomised trial, 12 weeks: chlorthalidone 25 mg vs HCTZ 50 mg, and amiloride 5 mg vs 10 mg, on office and ambulatory BP and laboratory values.', 'การทดลองแบบ factorial 12 สัปดาห์: chlorthalidone 25 mg เทียบ HCTZ 50 mg และ amiloride 5 mg เทียบ 10 mg ต่อความดันที่คลินิกและแบบ ambulatory และค่าตรวจเลือด'],
    ['Chlorthalidone 25 mg and HCTZ 50 mg (1:2) lowered BP and changed laboratory values similarly (24-h systolic difference −1.1 mm Hg, 95% CI −8.0 to 5.9). Amiloride 5 and 10 mg had similar BP effects; serum Na⁺ fell more with 10 mg; no clear dose-response.', 'chlorthalidone 25 mg และ HCTZ 50 mg (1:2) ลดความดันและเปลี่ยนค่าตรวจเลือดใกล้เคียงกัน (ต่างกันของความดันตัวบน 24 ชม. −1.1 mm Hg, 95% CI −8.0 ถึง 5.9) amiloride 5 และ 10 mg ลดความดันใกล้เคียงกัน Na⁺ ลดมากกว่าที่ 10 mg ไม่เห็น dose-response ชัดเจน']),
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
const EV = {
  dose: ['dbrct', 'sur', 'neu'], transform: ['rct', 'out', 'neu'], dcp: ['prag', 'out', 'neu'], clorotic: ['rct', 'sur', 'mix'], click: ['rct', 'sur', 'pos'],
  allhat: ['dbrct', 'out', 'neu'], hyvet: ['rct', 'out', 'mix'], progress: ['rct', 'out', 'pos'], advance: ['rct', 'out', 'pos'], rales: ['dbrct', 'out', 'pos'],
  topcat: ['dbrct', 'out', 'neu'], athena: ['rct', 'sur', 'neu'], pathway2: ['xover', 'sur', 'pos'], ephesus: ['dbrct', 'out', 'pos'], emphasis: ['dbrct', 'out', 'pos'],
  salt: ['rct', 'sur', 'pos'], tempo: ['dbrct', 'sur', 'pos'], everest: ['rct', 'out', 'neu'], advor: ['rct', 'sur', 'pos'], dapahf: ['rct', 'out', 'pos'],
  dapackd: ['rct', 'out', 'pos'], deliver: ['rct', 'out', 'pos'], emperorr: ['rct', 'out', 'pos'], emperorp: ['rct', 'out', 'pos'], empakidney: ['rct', 'out', 'pos'],
  dapaResist: ['open', 'sur', 'neu'], konecke: ['open', 'sur', 'neu'], tabansadeghi: ['rct', 'sur', 'neu'], knauf: ['rct', 'sur', 'mix'], bolondi: ['dbrct', 'out', 'mix'], azoRct: ['dbrct', 'sur', 'neu'], harada: ['xover', 'sur', 'pos'], ricci: ['dbrct', 'sur', 'pos'], excite: ['open', 'sur', 'neu'], bottino: ['fact', 'sur', 'neu'], mrc: ['rct', 'out', 'pos'], esaxhtn: ['dbrct', 'sur', 'pos'], esaxdn: ['rct', 'sur', 'pos'],
};
const EV_TXT = {
  dbrct: ['Double-blind RCT', 'RCT แบบ double-blind'], rct: ['RCT', 'RCT'], open: ['Open-label RCT', 'RCT แบบ open-label'], prag: ['Pragmatic RCT', 'RCT แบบ pragmatic'],
  xover: ['Crossover RCT', 'RCT แบบ crossover'], fact: ['Factorial RCT', 'RCT แบบ factorial'],
  out: ['Clinical outcome', 'ผลลัพธ์ทางคลินิก'], sur: ['Surrogate endpoint', 'ตัวชี้วัดทดแทน'],
  pos: ['Primary result positive', 'ผลหลักเป็นบวก'], neu: ['Primary result neutral', 'ผลหลักไม่ต่างกัน'], mix: ['Mixed result', 'ผลผสม'],
};
const EV_STYLE = {
  dbrct: 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-500/10 dark:text-slate-300 dark:border-slate-400/30', out: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-400/30',
  sur: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-400/30', pos: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-400/30',
  neu: 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-500/10 dark:text-slate-300 dark:border-slate-400/30', mix: 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-400/40',
};
// Trials per drug; a drug with no entry shows "no landmark trial included" (N/A)
const TRIALS_OF = {
  acetazolamide: ['advor'], bumetanide: ['konecke'], triamterene: ['tabansadeghi'], xipamide: ['knauf'], canrenoate: ['bolondi'], azosemide: ['azoRct'], ethacrynic: ['ricci'], trichlormethiazide: ['excite'], metolazone: ['dapaResist'], amiloride: ['bottino'], furosemide: ['dose', 'transform'], torsemide: ['transform', 'harada'], hctz: ['dcp', 'clorotic', 'bottino'],
  chlorthalidone: ['click', 'dcp', 'allhat', 'bottino'], indapamide: ['hyvet', 'progress', 'advance'], spironolactone: ['rales', 'topcat', 'athena', 'pathway2'],
  eplerenone: ['ephesus', 'emphasis'], tolvaptan: ['salt', 'tempo', 'everest'], dapagliflozin: ['dapahf', 'dapackd', 'deliver', 'dapaResist'],
  empagliflozin: ['emperorr', 'emperorp', 'empakidney'], bendroflumethiazide: ['mrc'], esaxerenone: ['esaxhtn', 'esaxdn', 'excite'],
};
// Best evidence level for a drug: 'out' (a clinical-outcome RCT), 'sur' (surrogate-endpoint RCTs only) or null
const evOf = (d) => { const l = (TRIALS_OF[d.id] || []).map(k => EV[k][1]); return l.includes('out') ? 'out' : l.length ? 'sur' : null; };
const evName = (d, i) => ({ out: ['Outcome RCT', 'RCT ผลลัพธ์ทางคลินิก'], sur: ['Surrogate RCT', 'RCT ตัวชี้วัดทดแทน'] }[evOf(d)] || ['No trial listed', 'ไม่มีการศึกษาในแอป'])[i];
function EvChip({ d, lang, lbl }) {
  const i = lang === 'th' ? 1 : 0;
  const e = evOf(d);
  return <span title={TXT.evTitle[i]} className={'inline-flex items-center rounded border px-1.5 py-px text-[10px] font-bold ' + (e ? EV_STYLE[e] : 'border-slate-200 text-slate-400 dark:border-[#263449]')}>{lbl ? TXT.evS[i] + ': ' : ''}{evName(d, i)}</span>;
}
function Trials({ d, lang }) {
  const i = lang === 'th' ? 1 : 0;
  const list = (TRIALS_OF[d.id] || []).map(k => ({ ...TR[k], k }));
  if (!list.length) return <p className={MUTED}>{TXT.noTrial[i]}</p>;
  return (
    <div className="space-y-2.5">
      {list.map(x => (
        <div key={x.n} className={'rounded-lg border p-2 ' + INSET}>
          <div className="font-extrabold">{x.n}</div>
          <div className={'text-[10px] ' + MUTED}>{x.cite}</div>
          <div className="mt-1 flex flex-wrap gap-1">{[EV[x.k][0], EV[x.k][1], EV[x.k][2]].map((e, j) => <span key={e} className={'rounded border px-1.5 py-px text-[10px] font-bold ' + (EV_STYLE[e] || EV_STYLE.dbrct)}>{EV_TXT[e][i]}</span>)}</div>
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

/* ---------- Kidney / liver / potassium check ---------- */
// Per drug: [avoid below eGFR, caution below eGFR, liver ('a' avoid | 'c' caution | ''), avoid if K⁺ > 5.0]. Values come from the labels and guidelines
// summarised in each drug's "Kidney / liver dosing" section; 0 means no threshold. It is a screen: open the drug for the label wording.
const SCREEN = {
  acetazolamide: [10, 30, 'a', 0], mannitol: [0, 15, '', 0], furosemide: [0, 30, 'c', 0], bumetanide: [0, 30, 'a', 0], torsemide: [0, 30, 'a', 0], ethacrynic: [0, 30, 'c', 0],
  hctz: [0, 30, 'c', 0], chlorthalidone: [0, 30, 'c', 0], indapamide: [30, 30, 'a', 0], metolazone: [0, 30, 'a', 0], chlorothiazide: [0, 30, 'c', 0],
  spironolactone: [30, 50, 'c', 1], eplerenone: [30, 0, 'a', 1], amiloride: [30, 50, 'c', 1], triamterene: [30, 60, 'c', 1], tolvaptan: [0, 0, 'a', 0],
  dapagliflozin: [0, 15, '', 0], empagliflozin: [0, 20, '', 0], bendroflumethiazide: [30, 0, 'a', 0], xipamide: [0, 30, 'a', 0], canrenoate: [30, 60, '', 1],
  trichlormethiazide: [0, 0, '', 0], azosemide: [0, 30, 'a', 0], esaxerenone: [30, 0, '', 1],
};
const screenOf = (d, egfr, liver, hyperK) => {
  const [av, ca, lv, kk] = SCREEN[d.id];
  const why = [];
  let lvl = 0;
  const add = (l, en, th) => { lvl = Math.max(lvl, l); why.push([en, th]); };
  if (egfr != null) { if (av && egfr < av) add(2, 'eGFR < ' + av, 'eGFR < ' + av); else if (ca && egfr < ca) add(1, 'eGFR < ' + ca, 'eGFR < ' + ca); }
  if (liver && lv) add(lv === 'a' ? 2 : 1, 'Severe liver disease', 'โรคตับรุนแรง');
  if (hyperK && kk) add(2, 'K⁺ > 5.0 mmol/L', 'K⁺ > 5.0 mmol/L');
  return { lvl, why };
};
const LVL_STYLE = {
  2: 'border-l-rose-500', 1: 'border-l-amber-500', 0: 'border-l-emerald-500',
};
const INPUT = 'w-full rounded-lg border px-2 py-1.5 text-sm bg-white dark:bg-[#151f32] border-slate-200 dark:border-[#263449]';
const STAGES = [['≥ 60', 75], ['45–59', 52], ['30–44', 37], ['15–29', 22], ['< 15', 10]];

function KidneyModal({ onClose, lang, open, st, setSt }) {
  const i = lang === 'th' ? 1 : 0;
  const egfr = st.eg === '' ? null : Number(st.eg);
  const any = egfr != null || st.liver || st.hk;
  const rows = DRUGS.map(d => ({ d, ...screenOf(d, egfr, st.liver, st.hk) }));
  const groups = [
    [2, ['Avoid: contraindicated or not recommended', 'หลีกเลี่ยง: ห้ามใช้หรือไม่แนะนำ']],
    [1, ['Caution: weaker effect or closer monitoring', 'ระวัง: ฤทธิ์ลดลงหรือต้องติดตามใกล้ชิด']],
    [0, ['No restriction found in the sources checked', 'ไม่พบข้อจำกัดในแหล่งที่ตรวจ']],
  ];
  const tog = (k) => setSt(p => ({ ...p, [k]: !p[k] }));
  return (
    <Modal title={TXT.kidneyT[i]} onClose={onClose} lang={lang}>
      <div className="space-y-2">
        <label className="block text-[11px] font-bold">{i ? 'eGFR (mL/min/1.73 m²)' : 'eGFR (mL/min/1.73 m²)'}
          <input type="number" min="0" max="150" inputMode="decimal" value={st.eg} onChange={(e) => setSt(p => ({ ...p, eg: e.target.value }))} className={INPUT + ' mt-1'} placeholder={i ? 'ใส่ค่า eGFR' : 'Enter eGFR'} />
        </label>
        <div className="flex flex-wrap gap-1">{STAGES.map(([l, v]) => <button key={l} type="button" onClick={() => setSt(p => ({ ...p, eg: String(v) }))} aria-pressed={st.eg === String(v)} className={'rounded border px-1.5 py-0.5 text-[10px] font-bold ' + (st.eg === String(v) ? BTN_ON : BTN_OFF)}>{l}</button>)}</div>
        <div className="flex flex-wrap gap-1.5">
          <button type="button" onClick={() => tog('hk')} aria-pressed={st.hk} className={'rounded-lg border px-2 py-1 text-[11px] font-bold ' + (st.hk ? BTN_ON : BTN_OFF)}>K⁺ &gt; 5.0 mmol/L</button>
          <button type="button" onClick={() => tog('liver')} aria-pressed={st.liver} className={'rounded-lg border px-2 py-1 text-[11px] font-bold ' + (st.liver ? BTN_ON : BTN_OFF)}>{TXT.liverSev[i]}</button>
          {any && <button type="button" onClick={() => setSt({ eg: '', liver: false, hk: false })} className={'rounded-lg border px-2 py-1 text-[11px] font-bold ' + BTN_OFF}>{TXT.clear[i]}</button>}
        </div>
      </div>
      {!any && <p className={'text-[12px] ' + MUTED}>{TXT.kidneyHint[i]}</p>}
      {any && groups.map(([lvl, title]) => {
        const list = rows.filter(r => r.lvl === lvl);
        if (!list.length) return null;
        return (
          <div key={lvl} className={'rounded-xl border border-l-4 p-2.5 ' + SURF + ' ' + LVL_STYLE[lvl]}>
            <div className="text-[12px] font-extrabold mb-1">{title[i]} <span className="text-slate-400 font-bold">({list.length})</span></div>
            <div className="flex flex-col gap-1">
              {list.map(r => (
                <button key={r.d.id} type="button" onClick={() => open(r.d.id)} className="text-left rounded-lg px-1.5 py-1 hover:bg-slate-50 dark:hover:bg-[#101a2b] flex flex-wrap items-center gap-1.5">
                  <span className={'font-bold text-[12px] ' + CLS[r.d.cls].txt}>{r.d.name}</span>
                  {r.why.map((w, k) => <span key={k} className={'rounded border px-1 text-[10px] font-bold ' + (lvl === 2 ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-400/30' : WARN_CHIP)}>{w[i]}</span>)}
                </button>
              ))}
            </div>
          </div>
        );
      })}
      <p className={'text-[10px] leading-snug ' + MUTED}>{TXT.kidneyNote[i]}</p>
    </Modal>
  );
}

/* ---------- Indication guide ---------- */
// Which diuretic for which indication. Every line carries its source (IND_SRC) and, where the source gives one, its class / level.
// Sources read in full: the four PDFs below. The hypertension lines come from the Thai HT CPG 2024 as already carried in this suite's HT guide (not re-read here).
const IND_SRC = {
  esc21: { s: "ESC 2021", full: "McDonagh TA, et al. 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure. Eur Heart J 2021;42:3599" },
  esc23: { s: "ESC 2023 update", full: "McDonagh TA, et al. 2023 Focused Update of the 2021 ESC Guidelines for heart failure. Eur Heart J 2023;44:3627" },
  hfa19: { s: "HFA 2019", full: "Seferovic PM, et al. Clinical practice update on heart failure 2019 (HFA consensus). Eur J Heart Fail 2019;21:1169" },
  thhf: { s: "HFCT 2019 (Thai)", full: "Heart Failure Council of Thailand. 2019 HFCT Heart Failure Guideline (Thai version)" },
  aasld: { s: "AASLD 2021", full: "Biggins SW, et al. Ascites, spontaneous bacterial peritonitis and hepatorenal syndrome: 2021 AASLD practice guidance. Hepatology 2021;74:1014" },
  kdigo: { s: "KDIGO 2024 CKD", full: "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of CKD. Kidney Int 2024;105(4S):S117" },
  thht: { s: "Thai HT CPG 2024", full: "Thai Hypertension Society. 2024 Thai Guidelines on the Treatment of Hypertension (Thai text, read in full). English version: Asian Biomed 2025;19:316" },
  esc24: { s: "ESC 2024 HTN", full: "McEvoy JW, et al. 2024 ESC Guidelines for the management of elevated blood pressure and hypertension. Eur Heart J 2024;45:3912" },
  esh24: { s: "ESH 2024", full: "Kreutz R, et al. 2024 European Society of Hypertension clinical practice guidelines for the management of arterial hypertension. Eur J Intern Med 2024;126:1" },
  kdigogd: { s: "KDIGO 2021 GD", full: "KDIGO 2021 Clinical Practice Guideline for the Management of Glomerular Diseases. Kidney Int 2021;100(4S):S1" },
  eje14: { s: "EJE 2014 hyponatraemia", full: "Spasovski G, et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia. Eur J Endocrinol 2014;170:G1" },
  egs6: { s: "EGS 6th ed.", full: "European Glaucoma Society. Terminology and Guidelines for Glaucoma, 6th edition. Br J Ophthalmol 2025" },
  cdc: { s: "CDC Yellow Book", full: "Hackett PH, Shlim DR. High-altitude travel and altitude illness. CDC Yellow Book (page dated 23 April 2025)" },
  btf4: { s: "BTF 4th ed.", full: "Carney N, et al. Guidelines for the Management of Severe Traumatic Brain Injury, Fourth Edition. Neurosurgery 2017;80:6 (hyperosmolar therapy, chapter 3, pages 49-50)" },
  ncs20: { s: "NCS 2020", full: "Cook AM, et al. Guidelines for the Acute Treatment of Cerebral Edema in Neurocritical Care Patients. Neurocrit Care 2020;32:647" },
  wms24: { s: "WMS 2024", full: "Luks AM, et al. Wilderness Medical Society Clinical Practice Guidelines for the Prevention, Diagnosis, and Treatment of Acute Altitude Illness: 2024 Update. Wilderness Environ Med 2024" },
  esh23: { s: "ESH 2023", full: "Mancia G, et al. 2023 ESH Guidelines for the management of arterial hypertension. J Hypertens 2023;41:1874" },
  ich22: { s: "AHA/ASA ICH 2022", full: "Greenberg SM, et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage. Stroke 2022;53:e282" },
  aao20: { s: "AAO POAG PPP 2020", full: "Gedde SJ, et al. Primary Open-Angle Glaucoma Preferred Practice Pattern. Ophthalmology 2021;128:P71" },
  verb13: { s: "Hyponatremia panel 2013", full: "Verbalis JG, et al. Diagnosis, evaluation, and treatment of hyponatremia: expert panel recommendations. Am J Med 2013;126(10 Suppl 1):S1" },
  ccsap: { s: "CCSAP 2022 (review)", full: "May CC, Smetana KS. Treatment of elevated intracranial pressure. ACCP CCSAP 2022 Book 1 (a review that summarises the Brain Trauma Foundation 4th ed. and the Neurocritical Care Society 2020 guideline)" },
};
const IND_TOPICS = {
  over: ['Overview', 'ภาพรวม'], first: ['First choice', 'ยาแรก'], tx: ['Treatment by situation', 'การรักษาตามสถานการณ์'], dose: ['Dose and how to give', 'ขนาดและวิธีให้ยา'],
  titr: ['Response and escalation', 'การตอบสนองและการเพิ่มยา'], add: ['Add-on and alternatives', 'ยาเสริมและทางเลือก'], trial: ['Trial results', 'ผลการศึกษา'], mon: ['Monitoring', 'การติดตาม'],
  safe: ['Safety and side effects', 'ความปลอดภัยและผลข้างเคียง'], stop: ['Stop or avoid', 'หยุดหรือหลีกเลี่ยง'], after: ['After decongestion', 'หลังหายบวม'], ref: ['Refractory disease', 'ภาวะดื้อต่อการรักษา'],
};
const IND_TOPIC_ORDER = Object.keys(IND_TOPICS);
const IND_QA_LBL = { first: ['First choice', 'ยาแรก'], add: ['Add-on', 'ยาเสริม'], watch: ['Watch', 'ติดตาม'], avoid: ['Avoid or stop', 'หลีกเลี่ยงหรือหยุด'] };
const INDICATIONS = [
  { k: "hf_acute", n: ["Heart failure: acute congestion","หัวใจล้มเหลวเฉียบพลันที่มีภาวะน้ำเกิน"], color: "border-l-rose-500", ids: ["furosemide","torsemide","bumetanide","metolazone","hctz","acetazolamide","tolvaptan","spironolactone"], sh: ["Acute HF","HF เฉียบพลัน"], qa: {"first":["IV loop diuretic: furosemide 20–40 mg IV if new, or 1–2 times the oral daily dose","ยาลูปฉีด: furosemide 20–40 มก. ถ้าเริ่มใหม่ หรือ 1–2 เท่าของขนาดยากินต่อวัน"],"add":["Thiazide-type (ESC IIa B); metolazone or acetazolamide may be considered","ไทอะไซด์ (ESC IIa B) พิจารณา metolazone หรือ acetazolamide"],"watch":["Urine Na above 50–70 mEq/L at 2 h or output above 100–150 mL/h in 6 h; creatinine and electrolytes every 24 h","โซเดียมปัสสาวะมากกว่า 50–70 mEq/L ที่ 2 ชม. หรือปัสสาวะมากกว่า 100–150 mL/ชม. ใน 6 ชม. และ creatinine กับเกลือแร่ทุก 24 ชม."],"avoid":["A single daily IV bolus; discharge with congestion left","ฉีดวันละครั้งเดียว และให้กลับบ้านทั้งที่ยังมีน้ำเกินค้าง"]},
    items: [
      {"t":["Intravenous loop diuretic is the first choice for signs or symptoms of fluid overload.","ยาขับปัสสาวะกลุ่มลูปชนิดฉีดเข้าหลอดเลือดดำเป็นยาแรกเมื่อมีอาการหรืออาการแสดงของภาวะน้ำเกิน"],"s":"esc21","c":"I C","also":[{"s":"thhf","c":"I C"}],"h":"first"},
      {"t":["Not on a diuretic before: furosemide 20–40 mg IV, or a torsemide 10–20 mg IV bolus. Already on an oral diuretic: IV dose of 1–2 times the daily oral dose.","ไม่เคยได้ยาขับปัสสาวะ: furosemide 20–40 มก. ฉีดเข้าหลอดเลือดดำ หรือ torsemide 10–20 มก. ฉีดครั้งเดียว ถ้าได้ยากินอยู่แล้ว: ฉีดขนาด 1–2 เท่าของขนาดยากินต่อวัน"],"s":"esc21","h":"dose"},
      {"t":["Thai guideline: not on a diuretic before: furosemide 20–40 mg IV; already on one: first IV dose equal to the oral dose.","แนวทางไทย: ไม่เคยได้ยา: furosemide 20–40 มก. ฉีดเข้าหลอดเลือดดำ ถ้าได้ยาอยู่แล้ว: ฉีดครั้งแรกขนาดเทียบเท่าขนาดยากินเดิม"],"s":"thhf","c":"I B","h":"dose"},
      {"t":["Give as 2–3 boluses a day or a continuous infusion. A single daily bolus is discouraged because sodium is retained after the dose.","ให้เป็นการฉีดวันละ 2–3 ครั้ง หรือหยดต่อเนื่อง ไม่แนะนำให้ฉีดวันละครั้งเดียวเพราะหลังหมดฤทธิ์ยาจะมีการเก็บโซเดียมกลับ"],"s":"esc21","h":"dose"},
      {"t":["Bolus or continuous infusion are both acceptable; consider changing bolus to continuous infusion if the response is poor.","ฉีดครั้งหรือหยดต่อเนื่องได้ทั้งสองแบบ และพิจารณาเปลี่ยนจากฉีดเป็นครั้งเป็นหยดต่อเนื่องเมื่อตอบสนองไม่ดี"],"s":"thhf","c":"I C / IIa C","h":"dose"},
      {"t":["Check the response early: spot urine sodium above 50–70 mEq/L at 2 h and/or urine output above 100–150 mL/h in the first 6 h. If not reached, double the IV dose.","ประเมินการตอบสนองเร็ว: โซเดียมในปัสสาวะครั้งเดียวมากกว่า 50–70 mEq/L ที่ 2 ชั่วโมง และ/หรือปัสสาวะมากกว่า 100–150 mL/ชม. ใน 6 ชั่วโมงแรก ถ้าไม่ถึงให้เพิ่มขนาดยาฉีดเป็น 2 เท่า"],"s":"esc21","p":"Fig. 13","h":"titr"},
      {"t":["If there is no response, increase the dose and reassess volume status and tissue perfusion.","ถ้าไม่ตอบสนอง ให้เพิ่มขนาดยา และประเมิน volume status และ tissue perfusion ซ้ำ"],"s":"thhf","c":"I B","h":"titr"},
      {"t":["Usual ceiling for IV furosemide: 400–600 mg a day; up to 1,000 mg may be considered in severe kidney impairment.","ขนาดสูงสุดทั่วไปของ furosemide ฉีด: 400–600 มก./วัน และอาจถึง 1,000 มก. ในผู้ป่วยไตเสื่อมรุนแรง"],"s":"esc21","p":"Fig. 13","h":"titr"},
      {"t":["Add a thiazide-type diuretic for resistant oedema that does not respond to a higher loop dose.","เพิ่มยากลุ่มไทอะไซด์เมื่อบวมดื้อและไม่ตอบสนองต่อการเพิ่มขนาดยาลูป"],"s":"esc21","c":"IIa B","h":"add"},
      {"t":["A second diuretic acting elsewhere (thiazide, metolazone or acetazolamide) may be considered; this needs careful monitoring of electrolytes and kidney function. The step-by-step algorithm is expert opinion.","อาจพิจารณายาอีกตัวที่ออกฤทธิ์คนละตำแหน่ง (ไทอะไซด์ metolazone หรือ acetazolamide) ต้องติดตามเกลือแร่และการทำงานของไตอย่างใกล้ชิด ขั้นตอนนี้เป็นความเห็นผู้เชี่ยวชาญ"],"s":"esc21","h":"add"},
      {"t":["Add a thiazide or spironolactone when the response is less than expected.","พิจารณาเพิ่มยากลุ่มไทอะไซด์หรือ spironolactone เมื่อตอบสนองน้อยกว่าที่ควร"],"s":"thhf","c":"IIa C","h":"add"},
      {"t":["Tolvaptan may be considered in volume overload and/or hyponatremia.","พิจารณาใช้ tolvaptan เมื่อมีภาวะน้ำเกินและ/หรือโซเดียมในเลือดต่ำ"],"s":"thhf","c":"IIa B","h":"add"},
      {"t":["Sodium under 2 g a day if congestion is hard to control or keeps returning despite diuretics.","จำกัดโซเดียมต่ำกว่า 2 กรัม/วัน เมื่อควบคุมภาวะน้ำเกินยากหรือเป็นซ้ำบ่อยแม้ได้ยาขับปัสสาวะเหมาะสมแล้ว"],"s":"thhf","c":"I C","h":"add"},
      {"t":["Acetazolamide 500 mg IV once a day added to the loop diuretic (ADVOR): decongestion within 3 days in 42.2% vs 30.5% (RR 1.46); hospital stay 8.8 vs 9.9 days; no difference in other outcomes or adverse events. More outcome and safety data are needed, so no new recommendation was made.","การเพิ่ม acetazolamide 500 มก. ฉีดวันละครั้งร่วมกับยาลูป (ADVOR): ขจัดภาวะน้ำเกินใน 3 วันได้ 42.2% เทียบ 30.5% (RR 1.46) นอนโรงพยาบาล 8.8 เทียบ 9.9 วัน ผลลัพธ์อื่นและเหตุการณ์ไม่พึงประสงค์ไม่ต่างกัน ยังต้องการข้อมูลผลลัพธ์และความปลอดภัยเพิ่ม จึงยังไม่มีข้อแนะนำใหม่"],"s":"esc23","h":"trial"},
      {"t":["Hydrochlorothiazide 25–100 mg a day (by eGFR) added to IV furosemide (CLOROTIC): weight change −2.3 vs −1.5 kg at 72 h; dyspnoea similar; creatinine rose in 46.5% vs 17.2%. No effect on clinical outcomes, so no recommendation was made.","การเพิ่ม hydrochlorothiazide 25–100 มก./วัน (ตาม eGFR) ร่วมกับ furosemide ฉีด (CLOROTIC): น้ำหนักลด 2.3 เทียบ 1.5 กก. ที่ 72 ชั่วโมง อาการเหนื่อยไม่ต่างกัน creatinine เพิ่มใน 46.5% เทียบ 17.2% ไม่มีผลต่อผลลัพธ์ทางคลินิก จึงไม่มีข้อแนะนำ"],"s":"esc23","h":"trial"},
      {"t":["While on IV diuretics, check urine output, weight, kidney function and electrolytes every day (Thai); creatinine and electrolytes at least every 24 h (ESC).","ระหว่างให้ยาขับปัสสาวะทางหลอดเลือดดำ ติดตามปริมาณปัสสาวะ น้ำหนัก การทำงานของไต และเกลือแร่ทุกวัน (แนวทางไทย) และ creatinine กับเกลือแร่อย่างน้อยทุก 24 ชั่วโมง (ESC)"],"s":"thhf","c":"I C","h":"mon"},
      {"t":["After decongestion, continue an oral loop diuretic at the lowest dose that avoids congestion, and lower the IV dose as the fluid balance turns negative. Do not discharge with persistent congestion.","เมื่อหายน้ำเกินแล้วให้ยาลูปชนิดกินขนาดต่ำที่สุดที่ไม่ทำให้กลับมาบวม และลดขนาดยาฉีดลงเมื่อสมดุลน้ำเป็นลบ ไม่ควรให้กลับบ้านทั้งที่ยังมีภาวะน้ำเกินค้าง"],"s":"esc21","h":"after"},
    ] },
  { k: "hf_chronic", n: ["Heart failure: long-term treatment","หัวใจล้มเหลวเรื้อรัง"], color: "border-l-orange-500", ids: ["furosemide","torsemide","bumetanide","spironolactone","eplerenone","dapagliflozin","empagliflozin","hctz"], sh: ["Chronic HF","HF เรื้อรัง"], qa: {"first":["Loop diuretic for congestion (I C), at the lowest dose that keeps euvolaemia","ยาลูปเมื่อมีน้ำเกิน (I C) ขนาดต่ำสุดที่ยังไม่บวม"],"add":["MRA in HFrEF (I A); loop plus thiazide for resistance, with care","MRA ใน HFrEF (I A) ยาลูปร่วมไทอะไซด์เมื่อดื้อยา ด้วยความระมัดระวัง"],"watch":["Potassium 7 days after an MRA dose increase, then every 3 months","โพแทสเซียม 7 วันหลังเพิ่มขนาด MRA แล้วตรวจทุก 3 เดือน"],"avoid":["Spironolactone 50 mg a day or more; MRA with ACEI and ARB together; starting at K above 5.0 or eGFR below 30","spironolactone ตั้งแต่ 50 มก./วัน ใช้ MRA ร่วมกับ ACEI และ ARB พร้อมกัน และเริ่มเมื่อ K สูงกว่า 5.0 หรือ eGFR ต่ำกว่า 30"]},
    items: [
      {"t":["High blood pressure in HFrEF: a thiazide diuretic is one of the safe options.","ความดันโลหิตสูงใน HFrEF: ยากลุ่มไทอะไซด์เป็นตัวเลือกที่ปลอดภัยตัวหนึ่ง"],"s":"thhf","p":"p. 37","h":"over"},
      {"t":["Diuretics are recommended in HFrEF with signs or symptoms of congestion, to relieve symptoms, improve exercise capacity and reduce HF hospitalizations.","แนะนำให้ใช้ยาขับปัสสาวะใน HFrEF ที่มีอาการหรืออาการแสดงของภาวะน้ำเกิน เพื่อลดอาการ เพิ่มความสามารถในการออกกำลัง และลดการนอนโรงพยาบาล"],"s":"esc21","c":"I C","h":"first"},
      {"t":["Also recommended in congested HFmrEF and HFpEF to relieve symptoms and signs.","แนะนำเช่นเดียวกันใน HFmrEF และ HFpEF ที่มีภาวะน้ำเกิน"],"s":"esc21","c":"I C","h":"first"},
      {"t":["Aim for euvolaemia with the lowest diuretic dose; in some euvolaemic or hypovolaemic patients the diuretic can be reduced or stopped. Teach patients to adjust the dose from symptoms and daily weight.","เป้าหมายคือไม่มีน้ำเกินด้วยยาขนาดต่ำที่สุด ผู้ป่วยบางรายที่ไม่มีน้ำเกินหรือขาดน้ำอาจลดหรือหยุดยาได้ ควรสอนให้ปรับขนาดยาเองตามอาการและน้ำหนักที่ชั่งทุกวัน"],"s":"esc21","h":"dose"},
      {"t":["Loop and thiazide diuretics act together (sequential nephron blockade) and can treat diuretic resistance, but adverse effects are more likely, so use the combination with care.","ยาลูปและไทอะไซด์ออกฤทธิ์เสริมกัน (sequential nephron blockade) ใช้แก้ภาวะดื้อยาได้ แต่ผลข้างเคียงมากขึ้น จึงควรใช้ด้วยความระมัดระวัง"],"s":"esc21","h":"add"},
      {"t":["An MRA is recommended in HFrEF to reduce HF hospitalization and death. Spironolactone: start 25 mg once a day, target 50 mg once a day. Eplerenone: start 25 mg, target 50 mg once a day.","แนะนำ MRA ใน HFrEF เพื่อลดการนอนโรงพยาบาลและการเสียชีวิต spironolactone: เริ่ม 25 มก. วันละครั้ง เป้าหมาย 50 มก. วันละครั้ง eplerenone: เริ่ม 25 มก. เป้าหมาย 50 มก. วันละครั้ง"],"s":"esc21","c":"I A","also":[{"s":"thhf","c":"I A"}],"h":"add"},
      {"t":["MRA safety (Thai): check potassium at least 7 days after a dose increase and at least every 3 months when stable; avoid spironolactone 50 mg a day or more; do not combine MRA with both ACEI and ARB; do not start if creatinine is above 2.5 mg/dL (men) or 2.0 mg/dL (women), eGFR is below 30, or potassium is above 5.0 mmol/L; check potassium more often if a potassium supplement is needed.","ความปลอดภัยของ MRA (แนวทางไทย): ตรวจโพแทสเซียมอย่างช้า 7 วันหลังเพิ่มขนาดยา และทุก 3 เดือนเป็นอย่างต่ำเมื่อคงที่ หลีกเลี่ยง spironolactone ตั้งแต่ 50 มก./วัน ห้ามใช้ MRA ร่วมกับ ACEI และ ARB พร้อมกัน ไม่เริ่มยาถ้า creatinine สูงกว่า 2.5 มก./ดล. (ชาย) หรือ 2.0 มก./ดล. (หญิง) eGFR ต่ำกว่า 30 หรือโพแทสเซียมสูงกว่า 5.0 มิลลิโมล/ลิตร และตรวจโพแทสเซียมถี่ขึ้นเมื่อจำเป็นต้องให้โพแทสเซียมเสริม"],"s":"thhf","p":"p. 23","h":"safe"},
      {"t":["SGLT2 inhibitors can interact with loop diuretics: the doses of either may need adjusting. Stop SGLT2 inhibitors and diuretics temporarily, and give fluid and sodium, in clinical hypovolaemia or ketoacidosis.","ยากลุ่ม SGLT2 inhibitors อาจมีปฏิกิริยากับยาลูป อาจต้องปรับขนาดยาทั้งสองกลุ่ม ให้หยุด SGLT2 inhibitors และยาขับปัสสาวะชั่วคราวและให้น้ำและโซเดียมเมื่อมีภาวะขาดน้ำหรือ ketoacidosis"],"s":"hfa19","h":"safe"},
    ] },
  { k: "ascites", n: ["Cirrhosis with ascites","ตับแข็งที่มีท้องมาน"], color: "border-l-amber-500", ids: ["spironolactone","furosemide","torsemide","bumetanide","eplerenone","amiloride"], sh: ["Ascites","ท้องมาน"], qa: {"first":["Sodium 2 g a day plus spironolactone with or without furosemide (start 100 mg and 40 mg)","โซเดียม 2 กรัม/วัน ร่วมกับ spironolactone และ/หรือ furosemide (เริ่ม 100 มก. และ 40 มก.)"],"add":["Torsemide or bumetanide if furosemide response is poor; large-volume paracentesis with albumin for tense ascites","torsemide หรือ bumetanide เมื่อตอบสนองต่อ furosemide ไม่ดี และเจาะระบายปริมาณมากพร้อมอัลบูมินเมื่อท้องตึง"],"watch":["Weight (up to 0.5 kg a day without oedema), creatinine, sodium; spot urine Na/K ratio","น้ำหนัก (ไม่เกิน 0.5 กก./วันถ้าไม่บวม) creatinine โซเดียม และอัตราส่วน Na/K ในปัสสาวะ"],"avoid":["NSAIDs, ACE inhibitors, ARBs; diuretics in AKI or hypovolaemic hyponatremia","NSAIDs, ACE inhibitors, ARBs และยาขับปัสสาวะเมื่อมีไตวายเฉียบพลันหรือโซเดียมต่ำจากขาดน้ำ"]},
    items: [
      {"t":["Moderate sodium restriction (2 g or 90 mmol a day) plus diuretics are first-line for grade 2 ascites. Fluid restriction is not needed unless serum sodium is 125 mmol/L or less.","จำกัดโซเดียมปานกลาง (2 กรัม หรือ 90 mmol/วัน) ร่วมกับยาขับปัสสาวะเป็นการรักษาแรกของท้องมานระดับ 2 ไม่ต้องจำกัดน้ำ เว้นแต่โซเดียมในเลือด 125 mmol/L หรือต่ำกว่า"],"s":"aasld","p":"p. 1018–1019","h":"first"},
      {"t":["Spironolactone with or without furosemide. A first episode may respond to an aldosterone antagonist alone; long-standing ascites responds better to the combination.","spironolactone ร่วมกับ furosemide หรือไม่ก็ได้ ท้องมานครั้งแรกอาจตอบสนองต่อยากลุ่มต้านอัลโดสเตอโรนอย่างเดียว ส่วนท้องมานเรื้อรังตอบสนองดีกว่าด้วยยาร่วมกัน"],"s":"aasld","h":"first"},
      {"t":["Spironolactone: start 100 mg a day, raise stepwise up to 400 mg a day, at least 72 hours between steps (long half-life).","spironolactone: เริ่ม 100 มก./วัน ปรับเพิ่มทีละขั้นได้ถึง 400 มก./วัน ห่างกันอย่างน้อย 72 ชั่วโมง (ครึ่งชีวิตยาว)"],"s":"aasld","h":"dose"},
      {"t":["Furosemide: start 40 mg a day, raise according to response up to 160 mg a day, the usual threshold for calling the ascites refractory. Torsemide or bumetanide may improve natriuresis if the response to furosemide is poor.","furosemide: เริ่ม 40 มก./วัน ปรับเพิ่มตามการตอบสนองได้ถึง 160 มก./วัน ซึ่งเป็นเกณฑ์ที่ใช้บอกว่าท้องมานดื้อต่อการรักษา torsemide หรือ bumetanide อาจช่วยเพิ่มการขับโซเดียมเมื่อตอบสนองต่อ furosemide ไม่ดี"],"s":"aasld","h":"dose"},
      {"t":["In chronic kidney disease use higher loop-diuretic and lower aldosterone-antagonist doses.","ในโรคไตเรื้อรังใช้ยาลูปขนาดสูงขึ้นและยาต้านอัลโดสเตอโรนขนาดต่ำลง"],"s":"aasld","h":"dose"},
      {"t":["Weight loss target: up to 0.5 kg a day without peripheral oedema, up to 1 kg a day with oedema. Faster loss risks volume contraction, kidney failure and hyponatremia.","เป้าหมายน้ำหนักลด: ไม่เกิน 0.5 กก./วันถ้าไม่มีบวมที่ขา และไม่เกิน 1 กก./วันถ้ามีบวม ลดเร็วกว่านี้เสี่ยงขาดน้ำในหลอดเลือด ไตวาย และโซเดียมต่ำ"],"s":"aasld","h":"titr"},
      {"t":["Once the ascites is controlled, taper to the lowest dose that keeps it minimal or absent.","เมื่อควบคุมท้องมานได้แล้ว ลดยาลงเหลือขนาดต่ำที่สุดที่ยังคุมได้"],"s":"aasld","h":"titr"},
      {"t":["Tense (grade 3) ascites: large-volume paracentesis with albumin first, then start sodium restriction and diuretics.","ท้องมานตึง (ระดับ 3): เจาะระบายปริมาณมากพร้อมให้อัลบูมินก่อน แล้วจึงเริ่มจำกัดโซเดียมและให้ยาขับปัสสาวะ"],"s":"aasld","h":"add"},
      {"t":["Monitor body weight, serum creatinine and sodium, especially in the first weeks. A spot urine Na/K ratio above 1 means the patient should be losing fluid; 1 or less means too little natriuresis, so consider more diuretic.","ติดตามน้ำหนัก creatinine และโซเดียมในเลือด โดยเฉพาะช่วงสัปดาห์แรก อัตราส่วน Na/K ในปัสสาวะครั้งเดียวมากกว่า 1 แสดงว่าควรสูญเสียน้ำ ถ้า 1 หรือต่ำกว่าแสดงว่าขับโซเดียมน้อยไป ให้พิจารณาเพิ่มยา"],"s":"aasld","h":"mon"},
      {"t":["Adverse effects (20–40% of patients): AKI and hyponatremia and hypokalemia (mainly loops), hyperkalemia (mainly aldosterone antagonists), hepatic encephalopathy, muscle cramps. Painful gynecomastia from spironolactone: switch to amiloride or eplerenone (spironolactone 100 mg is about eplerenone 50 mg or amiloride 10 mg).","ผลข้างเคียง (พบ 20–40% ของผู้ป่วย): ไตวายเฉียบพลัน โซเดียมต่ำ โพแทสเซียมต่ำ (พบบ่อยกับยาลูป) โพแทสเซียมสูง (พบบ่อยกับยาต้านอัลโดสเตอโรน) สมองเสื่อมจากตับ ตะคริว เต้านมโตเจ็บจาก spironolactone ให้เปลี่ยนเป็น amiloride หรือ eplerenone (spironolactone 100 มก. เทียบเท่า eplerenone ราว 50 มก. หรือ amiloride ราว 10 มก.)"],"s":"aasld","p":"Table 6","h":"safe"},
      {"t":["Avoid NSAIDs, ACE inhibitors and ARBs; avoid aminoglycosides when possible.","หลีกเลี่ยง NSAIDs, ACE inhibitors และ ARBs และหลีกเลี่ยง aminoglycosides ถ้าเป็นไปได้"],"s":"aasld","h":"stop"},
      {"t":["Stop diuretics when AKI is diagnosed; diuretic withdrawal and albumin are part of the work-up before calling it HRS-AKI. In hypovolaemic hyponatremia stop diuretics; in hypervolaemic hyponatremia reduce or stop them.","หยุดยาขับปัสสาวะเมื่อวินิจฉัยไตวายเฉียบพลัน การหยุดยาและให้อัลบูมินเป็นส่วนหนึ่งก่อนวินิจฉัย HRS-AKI ในโซเดียมต่ำจากการขาดน้ำให้หยุดยา และในโซเดียมต่ำจากน้ำเกินให้ลดหรือหยุดยา"],"s":"aasld","h":"stop"},
      {"t":["Refractory ascites: diuretic-resistant (persists on maximal doses, typically furosemide 160 mg and spironolactone 400 mg) or diuretic-intractable (side effects stop maximal doses). Continuing diuretics in resistant ascites is ineffective and risks kidney injury.","ท้องมานดื้อต่อการรักษา: ดื้อยาขับปัสสาวะ (ยังมีท้องมานทั้งที่ได้ยาขนาดสูงสุด โดยทั่วไป furosemide 160 มก. และ spironolactone 400 มก.) หรือไม่สามารถทนยาได้ (ผลข้างเคียงทำให้ใช้ขนาดสูงสุดไม่ได้) การให้ยาขับปัสสาวะต่อในกลุ่มดื้อยาไม่ได้ผลและเสี่ยงไตเสื่อม"],"s":"aasld","p":"p. 1020–1021","h":"ref"},
    ] },
  { k: "htn", n: ["Hypertension","ความดันโลหิตสูง"], color: "border-l-emerald-500", ids: ["hctz","chlorthalidone","indapamide","spironolactone","eplerenone","amiloride","furosemide"], sh: ["Hypertension","ความดันสูง"], qa: {"first":["ACEi, ARB, DHP-CCB or thiazide / thiazide-like (chlorthalidone, indapamide) (ESC I A)","ACEi, ARB, DHP-CCB หรือไทอะไซด์ / ไทอะไซด์ไลค์ (chlorthalidone, indapamide) (ESC I A)"],"add":["Three drugs, then spironolactone as the fourth (ESC IIa B, Thai I B)","ยา 3 ชนิด แล้วเพิ่ม spironolactone เป็นลำดับที่ 4 (ESC IIa B, ไทย I B)"],"watch":["Potassium and kidney function closely in the first 8 weeks of spironolactone","โพแทสเซียมและการทำงานของไตอย่างใกล้ชิดใน 8 สัปดาห์แรกของ spironolactone"],"avoid":["Spironolactone at eGFR below 30; caution at eGFR below 45 or K above 4.5","spironolactone เมื่อ eGFR ต่ำกว่า 30 และระวังเมื่อ eGFR ต่ำกว่า 45 หรือ K สูงกว่า 4.5"]},
    items: [
      {"t":["Thiazide / thiazide-like diuretics prevent CV events about as well as the other major classes. Chlorthalidone and indapamide are more potent and longer-acting than hydrochlorothiazide, though more side effects have been reported for chlorthalidone in some studies.","ยาไทอะไซด์ / ไทอะไซด์ไลค์ป้องกันเหตุการณ์หัวใจและหลอดเลือดได้ใกล้เคียงกับยากลุ่มหลักอื่น chlorthalidone และ indapamide แรงกว่าและออกฤทธิ์นานกว่า hydrochlorothiazide แต่บางการศึกษารายงานผลข้างเคียงของ chlorthalidone มากกว่า"],"s":"esh23","h":"over"},
      {"t":["In CKD, a dihydropyridine CCB and/or a diuretic if needed to reach the blood-pressure target; a steroidal MRA for resistant hypertension if eGFR is 45 or more.","ในโรคไตเรื้อรังใช้ DHP-CCB และ/หรือยาขับปัสสาวะเมื่อจำเป็นเพื่อให้ถึงเป้าหมายความดัน และใช้ steroidal MRA สำหรับความดันสูงดื้อยาเมื่อ eGFR ตั้งแต่ 45"],"s":"kdigo","p":"Fig. 18","h":"over"},
      {"t":["High blood pressure with HFrEF: a thiazide diuretic is one of the safe options.","ความดันสูงร่วมกับ HFrEF: ยาไทอะไซด์เป็นตัวเลือกที่ปลอดภัยตัวหนึ่ง"],"s":"thhf","p":"p. 37","h":"over"},
      {"t":["ACE inhibitors, ARBs, dihydropyridine CCBs and thiazide / thiazide-like diuretics (chlorthalidone, indapamide) are the recommended first-line classes.","ACE inhibitors, ARBs, DHP-CCB และยาขับปัสสาวะกลุ่มไทอะไซด์ / ไทอะไซด์ไลค์ (chlorthalidone, indapamide) เป็นยากลุ่มแรกที่แนะนำ"],"s":"esc24","c":"I A","also":[{"s":"esh24"}],"h":"first"},
      {"t":["To prevent stroke: a RAS blocker plus a CCB or a thiazide-like diuretic.","เพื่อป้องกันโรคหลอดเลือดสมอง: RAS blocker ร่วมกับ CCB หรือยาไทอะไซด์ไลค์"],"s":"esc24","c":"I A","h":"first"},
      {"t":["If two drugs do not control BP, use three: usually a RAS blocker, a dihydropyridine CCB and a thiazide / thiazide-like diuretic, preferably in a single pill.","ถ้ายา 2 ชนิดคุมความดันไม่ได้ ให้ใช้ 3 ชนิด โดยทั่วไปคือ RAS blocker, DHP-CCB และยาไทอะไซด์ / ไทอะไซด์ไลค์ ควรเป็นยาเม็ดรวม"],"s":"esc24","c":"I B","h":"titr"},
      {"t":["Resistant hypertension needs at least three drugs: a RAS blocker, a CCB and a diuretic. If the patient has CKD with eGFR below 30–45, change the diuretic to a loop diuretic.","ความดันสูงดื้อยาต้องใช้ยาอย่างน้อย 3 ชนิด ได้แก่ RAS blocker, CCB และยาขับปัสสาวะ ถ้ามีโรคไตเรื้อรังที่ eGFR ต่ำกว่า 30–45 ให้เปลี่ยนยาขับปัสสาวะเป็นยากลุ่มลูป"],"s":"thht","c":"IIa B","p":"p. 115","h":"titr"},
      {"t":["If the diuretic is a thiazide, change it to a long-acting thiazide-like diuretic (chlorthalidone or indapamide).","ถ้ายาขับปัสสาวะที่ใช้เป็นไทอะไซด์ ให้เปลี่ยนเป็นไทอะไซด์ไลค์ออกฤทธิ์ยาว (chlorthalidone หรือ indapamide)"],"s":"thht","c":"IIa B","p":"p. 115","h":"titr"},
      {"t":["Fourth drug: an MRA, especially spironolactone (PATHWAY-2), 25–50 mg a day, with caution when eGFR is below 45 or potassium is high. Figure 6 allows spironolactone or eplerenone only at eGFR 30 or more.","ยาตัวที่ 4: MRA โดยเฉพาะ spironolactone (PATHWAY-2) ขนาด 25–50 มก./วัน ด้วยความระมัดระวังเมื่อ eGFR ต่ำกว่า 45 หรือโพแทสเซียมสูง ภาพที่ 6 ให้ใช้ spironolactone หรือ eplerenone เฉพาะเมื่อ eGFR ตั้งแต่ 30"],"s":"thht","c":"I B","p":"p. 113, 115","h":"add"},
      {"t":["Chlorthalidone for resistant hypertension at eGFR 15–30 if not yet used.","chlorthalidone สำหรับความดันสูงดื้อยาที่ eGFR 15–30 ถ้ายังไม่เคยใช้"],"s":"thht","c":"IIa B","p":"p. 116","h":"add"},
      {"t":["If spironolactone cannot be used: high-dose amiloride 10–20 mg works as well but is not sold in Thailand, so consider chlorthalidone instead, after stopping the previous diuretic.","ถ้าใช้ spironolactone ไม่ได้: amiloride ขนาดสูง 10–20 มก. ได้ผลใกล้เคียงกันแต่ไม่มีจำหน่ายในไทย จึงพิจารณา chlorthalidone แทน โดยหยุดยาขับปัสสาวะเดิมก่อน"],"s":"thht","c":"IIa C","p":"p. 116","h":"add"},
      {"t":["Resistant hypertension (ESC): add spironolactone to the existing treatment. Restrict it to eGFR 30 or more and potassium 4.5 mmol/L or less; steroidal MRAs are contraindicated at eGFR below 30. Check electrolytes and kidney function soon after the start and often afterwards.","ความดันสูงดื้อยา (ESC): เพิ่ม spironolactone ในยาเดิม ใช้เฉพาะเมื่อ eGFR ตั้งแต่ 30 และโพแทสเซียมไม่เกิน 4.5 มิลลิโมล/ลิตร ห้ามใช้ MRA ชนิดสเตียรอยด์เมื่อ eGFR ต่ำกว่า 30 ตรวจเกลือแร่และการทำงานของไตหลังเริ่มยาทันทีและบ่อยหลังจากนั้น"],"s":"esc24","c":"IIa B","p":"Table 30, p. 3981","h":"add"},
      {"t":["If spironolactone is not tolerated: eplerenone (50–200 mg a day, twice-daily dosing may be needed), or amiloride; other options are a beta-blocker, an alpha-blocker or a potassium-sparing diuretic. Patiromer helped CKD patients (eGFR 25–45) stay on spironolactone.","ถ้าทน spironolactone ไม่ได้: eplerenone (50–200 มก./วัน อาจต้องแบ่งให้วันละ 2 ครั้ง) หรือ amiloride ตัวเลือกอื่นคือ beta-blocker, alpha-blocker หรือยาขับปัสสาวะประหยัดโพแทสเซียม patiromer ช่วยให้ผู้ป่วย CKD (eGFR 25–45) ใช้ spironolactone ต่อได้"],"s":"esc24","c":"IIa B","p":"p. 3980","h":"add"},
      {"t":["Resistant hypertension, fourth line: spironolactone (PATHWAY-2). The 2018 advice to use it with caution at eGFR below 45 or potassium above 4.5 mmol/L reflected PATHWAY-2 exclusion criteria; safety beyond that is not established. Hyperkalaemia risk is higher in CKD, so check potassium and eGFR after starting and at least yearly, or every 3–6 months depending on risk. Patiromer or sodium zirconium cyclosilicate can lower the risk.","ความดันสูงดื้อยา ยาลำดับที่ 4: spironolactone (PATHWAY-2) คำแนะนำปี 2018 ให้ใช้ด้วยความระมัดระวังเมื่อ eGFR ต่ำกว่า 45 หรือโพแทสเซียมสูงกว่า 4.5 มิลลิโมล/ลิตร มาจากเกณฑ์คัดออกของ PATHWAY-2 ยังไม่ยืนยันความปลอดภัยนอกเหนือจากนั้น ความเสี่ยงโพแทสเซียมสูงมากขึ้นใน CKD จึงต้องตรวจโพแทสเซียมและ eGFR หลังเริ่มยา และอย่างน้อยปีละครั้งหรือทุก 3–6 เดือนตามความเสี่ยง patiromer หรือ sodium zirconium cyclosilicate ช่วยลดความเสี่ยง"],"s":"esh23","p":"Section 12.4","h":"add"},
      {"t":["If spironolactone is not tolerated: eplerenone (less potent), or high-dose amiloride 10–20 mg (as effective as spironolactone 25–50 mg in the PATHWAY-2 extension, but the marketed dose is 5 mg and it is not sold as a single agent in many places, so pill burden rises). If MRAs are not tolerated or contraindicated (eGFR below 30): bisoprolol 5–10 mg, doxazosin XL 4–8 mg or clonidine 0.1–0.3 mg twice a day.","ถ้าทน spironolactone ไม่ได้: eplerenone (แรงน้อยกว่า) หรือ amiloride ขนาดสูง 10–20 มก. (ได้ผลเทียบเท่า spironolactone 25–50 มก. ในช่วงต่อเนื่องของ PATHWAY-2 แต่ขนาดที่จำหน่ายคือ 5 มก. และหลายประเทศไม่มียาเดี่ยว ทำให้ต้องกินยาหลายเม็ด) ถ้าใช้ MRA ไม่ได้หรือห้ามใช้ (eGFR ต่ำกว่า 30): bisoprolol 5–10 มก. doxazosin XL 4–8 มก. หรือ clonidine 0.1–0.3 มก. วันละ 2 ครั้ง"],"s":"esh23","p":"Section 12.4","h":"add"},
      {"t":["Chlorthalidone lowers BP more than hydrochlorothiazide; 12.5–50 mg a day helped patients with CKD whose BP was not controlled on 3–4 drugs.","chlorthalidone ลดความดันได้ดีกว่า hydrochlorothiazide และขนาด 12.5–50 มก./วัน ช่วยผู้ป่วยโรคไตเรื้อรังที่คุมความดันไม่ได้แม้ใช้ยา 3–4 ชนิด"],"s":"thht","p":"p. 116","h":"trial"},
      {"t":["DCP trial (US Veterans over 65 already on hydrochlorothiazide, switched to chlorthalidone 12.5 or 25 mg for HCTZ 25 or 50 mg): no difference in CV outcomes, except more benefit with chlorthalidone after a prior stroke.","การศึกษา DCP (ทหารผ่านศึกสหรัฐฯ อายุเกิน 65 ปีที่ใช้ hydrochlorothiazide อยู่ สลับเป็น chlorthalidone 12.5 หรือ 25 มก. แทน HCTZ 25 หรือ 50 มก.): ผลลัพธ์หัวใจและหลอดเลือดไม่ต่างกัน ยกเว้นผู้ที่เคยเป็นโรคหลอดเลือดสมองได้ประโยชน์จาก chlorthalidone มากกว่า"],"s":"esh23","h":"trial"},
      {"t":["After starting spironolactone check kidney function and potassium closely in the first 8 weeks.","หลังเริ่ม spironolactone ตรวจการทำงานของไตและโพแทสเซียมอย่างใกล้ชิดใน 8 สัปดาห์แรก"],"s":"thht","p":"p. 116","h":"mon"},
    ] },
  { k: "ckd", n: ["Chronic kidney disease","โรคไตเรื้อรัง"], color: "border-l-teal-500", ids: ["furosemide","chlorthalidone","spironolactone","eplerenone"], sh: ["CKD","CKD"], qa: {"first":["No loop-diuretic dosing in this guideline; a diuretic and/or DHP-CCB to reach the BP target","แนวทางนี้ไม่มีขนาดยาลูป ใช้ยาขับปัสสาวะและ/หรือ DHP-CCB เพื่อให้ถึงเป้าหมายความดัน"],"add":["Steroidal MRA for resistant hypertension if eGFR is 45 or more","steroidal MRA สำหรับความดันสูงดื้อยาเมื่อ eGFR ตั้งแต่ 45"],"watch":["Creatinine and potassium 2–4 weeks after starting an ACEi or ARB","creatinine และโพแทสเซียมภายใน 2–4 สัปดาห์หลังเริ่ม ACEi หรือ ARB"],"avoid":["Diuretics during a dehydrating illness, before elective surgery, and around contrast in AKI or eGFR below 30","ยาขับปัสสาวะเมื่อป่วยจนขาดน้ำ ก่อนผ่าตัดแบบนัดหมาย และรอบการฉีดสารทึบรังสีเมื่อมีไตวายเฉียบพลันหรือ eGFR ต่ำกว่า 30"]},
    items: [
      {"t":["The guideline text has no loop-diuretic dosing for oedema (checked by searching its text). Its diuretic statements are about blood pressure, potassium and safety, listed here.","ข้อความในแนวทางไม่มีขนาดยาลูปสำหรับภาวะบวม (ตรวจด้วยการค้นข้อความ) ข้อความเกี่ยวกับยาขับปัสสาวะเกี่ยวกับความดัน โพแทสเซียม และความปลอดภัย ดังรายการนี้"],"s":"kdigo","h":"over"},
      {"t":["Blood pressure: a dihydropyridine CCB and/or a diuretic if needed to reach the individual target; ACEi or ARB first when albuminuria is present.","ความดันโลหิต: DHP-CCB และ/หรือยาขับปัสสาวะเมื่อจำเป็นเพื่อให้ถึงเป้าหมายรายบุคคล และ ACEi หรือ ARB ก่อนเมื่อมีอัลบูมินในปัสสาวะ"],"s":"kdigo","p":"Fig. 18","h":"first"},
      {"t":["After starting an ACEi or ARB, check creatinine and potassium within 2–4 weeks. If eGFR falls by 30% or more, review diuretics and NSAIDs.","หลังเริ่ม ACEi หรือ ARB ตรวจ creatinine และโพแทสเซียมภายใน 2–4 สัปดาห์ ถ้า eGFR ลดลง 30% ขึ้นไปให้ทบทวนยาขับปัสสาวะและ NSAIDs"],"s":"kdigo","p":"Fig. 21","h":"mon"},
      {"t":["Hyperkalemia (potassium above 5.5 mmol/L): consider appropriate use of diuretics, alongside bicarbonate and potassium binders.","โพแทสเซียมสูง (มากกว่า 5.5 มิลลิโมล/ลิตร): พิจารณาใช้ยาขับปัสสาวะอย่างเหมาะสม ร่วมกับโซเดียมไบคาร์บอเนตและยาจับโพแทสเซียม"],"s":"kdigo","p":"Fig. 32","h":"safe"},
      {"t":["Observational data: thiazide and loop diuretics raise serum uric acid.","ข้อมูลเชิงสังเกต: ยาไทอะไซด์และยาลูปทำให้กรดยูริกในเลือดสูงขึ้น"],"s":"kdigo","h":"safe"},
      {"t":["Sick-day rules usually say to pause diuretics in a dehydrating illness, with a clear plan to restart; the evidence for this is thin. Consider pausing diuretics before elective surgery (volume depletion, AKI).","กฎวันป่วยมักให้หยุดยาขับปัสสาวะชั่วคราวเมื่อป่วยจนขาดน้ำ พร้อมแผนเริ่มยาใหม่ที่ชัดเจน แต่หลักฐานยังน้อย พิจารณาหยุดยาขับปัสสาวะชั่วคราวก่อนผ่าตัดแบบนัดหมาย (ขาดน้ำ ไตวายเฉียบพลัน)"],"s":"kdigo","p":"Practice Point 4.3.2, Table 32","h":"stop"},
      {"t":["Before radiocontrast in AKI or eGFR below 30, withdraw non-essential nephrotoxic drugs including diuretics for 24–48 hours before and 48 hours after.","ก่อนฉีดสารทึบรังสีในผู้ที่มีไตวายเฉียบพลันหรือ eGFR ต่ำกว่า 30 ให้งดยาที่ไม่จำเป็นและเป็นพิษต่อไต รวมถึงยาขับปัสสาวะ 24–48 ชั่วโมงก่อน และ 48 ชั่วโมงหลังฉีด"],"s":"kdigo","h":"stop"},
    ] },
  { k: "nephrotic", n: ["Nephrotic oedema","ภาวะบวมจากไตเนโฟรติก"], color: "border-l-cyan-500", ids: ["furosemide","torsemide","bumetanide","hctz","metolazone","chlorthalidone","amiloride","spironolactone","acetazolamide"], sh: ["Nephrotic","เนโฟรติก"], qa: {"first":["Loop diuretic, usually twice a day and at higher doses; sodium 1.5–2 g a day","ยาลูป มักวันละ 2 ครั้ง ขนาดสูงขึ้น และโซเดียม 1.5–2 กรัม/วัน"],"add":["Thiazide-like 2–5 h before the loop; amiloride; IV loop; albumin if albumin is below 2.0 g/dL","ไทอะไซด์ไลค์ก่อนยาลูป 2–5 ชม. amiloride ยาลูปฉีด และอัลบูมินเมื่อต่ำกว่า 2.0 ก./ดล."],"watch":["N/A: no monitoring schedule in this section","N/A: ส่วนนี้ไม่มีตารางติดตาม"],"avoid":["A rapid IV push of loop diuretics (hearing loss, tinnitus)","การฉีดยาลูปเข้าหลอดเลือดดำอย่างเร็ว (หูหนวก หูอื้อ)"]},
    items: [
      {"t":["Mainstay: diuretics with moderate sodium restriction (1.5–2 g or 60–90 mmol a day). Nephrotic patients are often diuretic-resistant, even with a normal GFR.","หลักของการรักษา: ยาขับปัสสาวะร่วมกับจำกัดโซเดียมปานกลาง (1.5–2 กรัม หรือ 60–90 mmol/วัน) ผู้ป่วยเนโฟรติกมักดื้อต่อยาขับปัสสาวะแม้ GFR ปกติ"],"s":"kdigogd","p":"p. S95","h":"over"},
      {"t":["Loop diuretics are first-line, usually twice a day. Higher doses are needed (less drug reaches the loop of Henle). Torsemide and bumetanide may have more consistent absorption than furosemide (from heart-failure studies).","ยากลุ่มลูปเป็นยาแรก มักให้วันละ 2 ครั้ง ต้องใช้ขนาดสูงขึ้น (ยาไปถึงห่วงเฮนเลได้น้อยลง) torsemide และ bumetanide อาจดูดซึมสม่ำเสมอกว่า furosemide (จากการศึกษาในหัวใจล้มเหลว)"],"s":"kdigogd","p":"p. S95","h":"first"},
      {"t":["If maximal oral loop therapy fails, switch to IV loop diuretic, bolus or infusion. Do not give a rapid IV push (hearing loss, tinnitus); an infusion may lessen toxicity.","ถ้ายาลูปชนิดกินขนาดสูงสุดไม่ได้ผล ให้เปลี่ยนเป็นยาลูปชนิดฉีดแบบครั้งหรือหยดต่อเนื่อง ไม่ฉีดเร็ว (หูหนวก หูอื้อ) การหยดต่อเนื่องอาจลดความเป็นพิษ"],"s":"kdigogd","p":"p. S95","h":"titr"},
      {"t":["Add a thiazide-like diuretic (hydrochlorothiazide, metolazone or chlorthalidone) to a loop diuretic to overcome resistance; give the thiazide 2–5 hours before a loop infusion.","เพิ่มยากลุ่มไทอะไซด์ไลค์ (hydrochlorothiazide, metolazone หรือ chlorthalidone) ร่วมกับยาลูปเพื่อแก้ภาวะดื้อยา และให้ไทอะไซด์ก่อนหยดยาลูป 2–5 ชั่วโมง"],"s":"kdigogd","p":"p. S95","h":"add"},
      {"t":["Amiloride may help as an add-on for oedema, hypertension and hypokalaemia (not validated in RCTs). Acetazolamide is a weaker diuretic but may help if there is severe metabolic alkalosis.","amiloride อาจช่วยเสริมสำหรับอาการบวม ความดันสูง และโพแทสเซียมต่ำ (ยังไม่มี RCT ยืนยัน) acetazolamide ขับปัสสาวะอ่อนกว่า แต่อาจช่วยเมื่อมีภาวะด่างเมตาบอลิกรุนแรง"],"s":"kdigogd","p":"p. S95","h":"add"},
      {"t":["For diuretic-resistant patients with serum albumin below 2.0 g/dL, IV albumin (25–50 g given 30–60 minutes before the loop diuretic, or premixed) can be considered; the effect is transient and the evidence in adults is thin.","ผู้ป่วยดื้อยาขับปัสสาวะที่อัลบูมินต่ำกว่า 2.0 ก./ดล. พิจารณาให้อัลบูมินทางหลอดเลือดดำ (25–50 กรัม ก่อนยาลูป 30–60 นาที หรือผสมกับยา) ผลเกิดชั่วคราวและหลักฐานในผู้ใหญ่ยังน้อย"],"s":"kdigogd","p":"p. S96","h":"add"},
      {"t":["Potassium-sparing diuretics (spironolactone, amiloride) help keep potassium normal and can add to the natriuresis. Water restriction is usually not needed unless hyponatremia develops. Ultrafiltration or dialysis is occasionally needed, especially with AKI.","ยาขับปัสสาวะประหยัดโพแทสเซียม (spironolactone, amiloride) ช่วยรักษาระดับโพแทสเซียมและเสริมการขับโซเดียม โดยทั่วไปไม่ต้องจำกัดน้ำเว้นแต่มีโซเดียมต่ำ บางรายต้องทำ ultrafiltration หรือฟอกเลือด โดยเฉพาะเมื่อมีไตวายเฉียบพลัน"],"s":"kdigogd","p":"p. S96","h":"add"},
    ] },
  { k: "hypona", n: ["Hyponatremia","โซเดียมในเลือดต่ำ"], color: "border-l-sky-500", ids: ["tolvaptan","furosemide","hctz","spironolactone"], sh: ["Hyponatremia","โซเดียมต่ำ"], qa: {"first":["Treat by volume status: reduced volume: saline; expanded: fluid restriction; SIAD: fluid restriction first","รักษาตามปริมาตรน้ำ: ขาดน้ำให้ saline น้ำเกินจำกัดน้ำ SIAD จำกัดน้ำก่อน"],"add":["SIAD second line: urea or low-dose loop plus oral salt","SIAD ลำดับสอง: urea หรือยาลูปขนาดต่ำร่วมกับเกลือชนิดกิน"],"watch":["Sodium rise no more than 10 mmol/L in 24 h and 8 mmol/L in each 24 h after","โซเดียมเพิ่มไม่เกิน 10 mmol/L ใน 24 ชม. และไม่เกิน 8 mmol/L ในทุก 24 ชม.ถัดไป"],"avoid":["Overcorrection: demyelination has followed correction of severe thiazide-induced hyponatremia","แก้โซเดียมเร็วเกิน: มีรายงาน demyelination หลังแก้โซเดียมต่ำรุนแรงจากไทอะไซด์"]},
    items: [
      {"t":["Diuretics, and especially thiazides, are frequently implicated in hyponatraemia; loop diuretics are less likely to cause it. A recent thiazide prescription is listed among causes of acute hyponatraemia.","ยาขับปัสสาวะ โดยเฉพาะไทอะไซด์ เป็นสาเหตุที่พบบ่อยของโซเดียมต่ำ ยากลุ่มลูปทำให้เกิดน้อยกว่า และการเพิ่งได้รับไทอะไซด์ถูกจัดเป็นสาเหตุของโซเดียมต่ำแบบเฉียบพลัน"],"s":"eje14","p":"G14, G17, G18","h":"over"},
      {"t":["If urine sodium is above 30 mmol/L, assess extracellular fluid status and diuretic use to tell the causes apart. In patients on diuretics, urine sodium must be read with caution.","ถ้าโซเดียมในปัสสาวะมากกว่า 30 mmol/L ให้ประเมิน extracellular fluid และการใช้ยาขับปัสสาวะเพื่อแยกสาเหตุ และควรแปลผลโซเดียมในปัสสาวะด้วยความระมัดระวังในผู้ที่ใช้ยาขับปัสสาวะ"],"s":"eje14","c":"2D","p":"G22, G25","h":"over"},
      {"t":["Thiazides are the main cause of diuretic-induced hyponatremia: in a literature review 73% of cases were thiazides alone, 20% thiazides with an anti-kaliuretic agent and 8% furosemide. Typical patients are elderly women, and a previous episode raises the risk of recurrence.","ไทอะไซด์เป็นสาเหตุหลักของโซเดียมต่ำจากยาขับปัสสาวะ จากการทบทวนวรรณกรรม 73% เกิดจากไทอะไซด์อย่างเดียว 20% จากไทอะไซด์ร่วมกับยาประหยัดโพแทสเซียม และ 8% จาก furosemide ผู้ป่วยทั่วไปเป็นหญิงสูงอายุ และเคยเป็นมาก่อนเพิ่มโอกาสกลับเป็นซ้ำ"],"s":"verb13","p":"PDF p. 12","h":"over"},
      {"t":["Expanded extracellular fluid (heart failure, cirrhosis): fluid restriction (2D); vasopressin receptor antagonists are recommended against (1C).","extracellular fluid มากเกิน (หัวใจล้มเหลว ตับแข็ง): จำกัดน้ำ (2D) และแนะนำไม่ใช้ vasopressin receptor antagonists (1C)"],"s":"eje14","c":"2D / 1C","p":"G34","h":"tx"},
      {"t":["SIAD: fluid restriction first. Equal second-line options: urea 0.25–0.50 g/kg a day, or low-dose loop diuretic plus oral sodium chloride. Vasopressin receptor antagonists are not recommended in moderate and recommended against in profound hyponatraemia.","SIAD: จำกัดน้ำก่อน ตัวเลือกลำดับสองเท่ากัน คือ urea 0.25–0.50 ก./กก./วัน หรือยาลูปขนาดต่ำร่วมกับโซเดียมคลอไรด์ชนิดกิน ไม่แนะนำ vasopressin receptor antagonists ในโซเดียมต่ำระดับปานกลาง และแนะนำไม่ใช้ในระดับรุนแรง"],"s":"eje14","c":"2D / 1C","p":"G34","h":"tx"},
      {"t":["Reduced circulating volume: restore volume with 0.9% saline or a balanced crystalloid at 0.5–1.0 mL/kg per hour.","ปริมาตรหมุนเวียนลดลง: ให้สารน้ำ 0.9% saline หรือ balanced crystalloid 0.5–1.0 mL/กก./ชม. เพื่อชดเชยปริมาตร"],"s":"eje14","c":"1B","p":"G34","h":"tx"},
      {"t":["Tolvaptan (oral V2 antagonist) and conivaptan (IV: 20 mg load over 30 minutes, then 20–40 mg a day) are FDA-approved for euvolaemic and hypervolaemic hyponatremia. Aquaretics remove water without the neurohormonal activation of loop diuretics: only one third of the water lost comes from extracellular fluid, two thirds from intracellular water.","tolvaptan (ยากิน ต้านตัวรับ V2) และ conivaptan (ฉีด: 20 มก. ใน 30 นาที ตามด้วย 20–40 มก./วัน) ได้รับอนุมัติจาก FDA สำหรับโซเดียมต่ำชนิด euvolaemic และ hypervolaemic ยากลุ่ม aquaretic ขับน้ำโดยไม่กระตุ้น neurohormonal เหมือนยาลูป น้ำที่สูญเสียมาจาก extracellular fluid เพียงหนึ่งในสาม และอีกสองในสามมาจากน้ำในเซลล์"],"s":"verb13","p":"PDF p. 22–23","h":"tx"},
      {"t":["Heart failure with volume overload and/or hyponatremia: tolvaptan may be considered (the Thai heart-failure guideline; the European hyponatraemia guideline above advises against vaptans when extracellular fluid is expanded).","หัวใจล้มเหลวที่มีภาวะน้ำเกินและ/หรือโซเดียมต่ำ: พิจารณาใช้ tolvaptan (แนวทางหัวใจล้มเหลวของไทย ส่วนแนวทางโซเดียมต่ำของยุโรปข้างต้นแนะนำไม่ใช้ vaptans เมื่อ extracellular fluid มากเกิน)"],"s":"thhf","c":"IIa B","h":"tx"},
      {"t":["Cirrhosis, hypovolaemic hyponatremia: stop diuretics (and laxatives) and give fluid: 5% albumin or a crystalloid (lactated Ringer’s preferred).","ตับแข็งที่โซเดียมต่ำจากการขาดน้ำ: หยุดยาขับปัสสาวะ (และยาระบาย) และให้สารน้ำ เป็นอัลบูมิน 5% หรือ crystalloid (แนะนำ lactated Ringer’s)"],"s":"aasld","p":"p. 1025","h":"tx"},
      {"t":["Cirrhosis, hypervolaemic hyponatremia: fluid restriction, reduce or stop diuretics and laxatives, hyperoncotic albumin and/or vaptans. Correct chronic hyponatremia slowly to avoid osmotic demyelination.","ตับแข็งที่โซเดียมต่ำจากน้ำเกิน: จำกัดน้ำ ลดหรือหยุดยาขับปัสสาวะและยาระบาย ให้อัลบูมินความเข้มข้นสูง และ/หรือ vaptans แก้โซเดียมต่ำเรื้อรังอย่างช้าๆ เพื่อเลี่ยง osmotic demyelination"],"s":"aasld","p":"p. 1025","h":"tx"},
      {"t":["Raise sodium by no more than 10 mmol/L in the first 24 hours and no more than 8 mmol/L in each 24 hours after; the osmotic demyelination risk is higher with thiazide use among other factors.","ไม่ให้โซเดียมเพิ่มเกิน 10 mmol/L ใน 24 ชั่วโมงแรก และไม่เกิน 8 mmol/L ในทุก 24 ชั่วโมงถัดไป การใช้ไทอะไซด์เป็นปัจจัยหนึ่งที่เพิ่มความเสี่ยง osmotic demyelination"],"s":"eje14","c":"1D","p":"G33","h":"safe"},
      {"t":["Stopping a thiazide and correcting volume depletion can be followed by a rapid water diuresis that raises sodium very quickly; osmotic demyelination has been reported after correction of severe thiazide-induced hyponatremia.","การหยุดไทอะไซด์และแก้ภาวะขาดน้ำอาจตามด้วยการขับน้ำปริมาณมากอย่างรวดเร็วทำให้โซเดียมสูงขึ้นเร็วมาก มีรายงาน osmotic demyelination หลังแก้โซเดียมต่ำรุนแรงที่เกิดจากไทอะไซด์"],"s":"verb13","p":"PDF p. 25","h":"safe"},
      {"t":["Tolvaptan and the liver: in the TEMPO trial (ADPKD, doses up to 120 mg a day versus a 60 mg maximum for hyponatremia) ALT above 3 times normal occurred in 4.4% vs 1.0%, and the FDA warned of possible irreversible, fatal liver injury. No liver damage was reported at approved doses in the hyponatremia trials, including the long-term SALTWATER and EVEREST.","tolvaptan กับตับ: ในการศึกษา TEMPO (ADPKD ขนาดสูงสุด 120 มก./วัน เทียบกับขนาดสูงสุด 60 มก./วันสำหรับโซเดียมต่ำ) ALT เกิน 3 เท่าของค่าปกติพบ 4.4% เทียบ 1.0% และ FDA เตือนว่าอาจเกิดตับบาดเจ็บถาวรและถึงชีวิต ในการศึกษาโซเดียมต่ำที่ใช้ขนาดที่อนุมัติไม่พบตับเสียหาย รวมถึง SALTWATER และ EVEREST ที่ใช้ระยะยาว"],"s":"verb13","p":"PDF p. 23","h":"safe"},
    ] },
  { k: "angle", n: ["Acute angle-closure glaucoma","ต้อหินมุมปิดเฉียบพลัน"], color: "border-l-violet-500", ids: ["acetazolamide","mannitol"], sh: ["Angle-closure","มุมปิด"], qa: {"first":["Acetazolamide at once if IOP is 40 mmHg or more (IV 10 mg/kg if vomiting)","acetazolamide ทันทีเมื่อความดันตา 40 mmHg ขึ้นไป (ฉีด 10 มก./กก. ถ้าอาเจียน)"],"add":["IV mannitol 0.5–1.5 g/kg if the response is inadequate","mannitol ทางหลอดเลือดดำ 0.5–1.5 ก./กก. เมื่อตอบสนองไม่เพียงพอ"],"watch":["Check for heart or kidney disease before mannitol","ประเมินโรคหัวใจและไตก่อนให้ mannitol"],"avoid":["Acetazolamide with sulphonamide allergy or severe kidney disease; repeated mannitol","acetazolamide เมื่อแพ้ซัลฟาหรือโรคไตรุนแรง และการให้ mannitol ซ้ำ"]},
    items: [
      {"t":["Immediate acetazolamide is recommended if IOP is 40 mmHg or more; give it IV (10 mg/kg) if the patient is vomiting or a rapid effect is needed. It reduces aqueous production.","ให้ acetazolamide ทันทีเมื่อความดันตา 40 mmHg ขึ้นไป ให้ทางหลอดเลือดดำ (10 มก./กก.) ถ้าผู้ป่วยอาเจียนหรือต้องการผลเร็ว ยานี้ลดการสร้างน้ำในลูกตา"],"s":"egs6","p":"p. 147","h":"first"},
      {"t":["IV mannitol 0.5–1.5 g/kg as a 15% or 20% solution at 3–5 mL/minute can be considered if the response to acetazolamide is inadequate. Check for heart or kidney disease first; risks include dehydration, fluid overload, pulmonary oedema, electrolyte imbalance and AKI. Repeated use is not advisable.","พิจารณา mannitol ทางหลอดเลือดดำ 0.5–1.5 ก./กก. ความเข้มข้น 15% หรือ 20% อัตรา 3–5 mL/นาที เมื่อตอบสนองต่อ acetazolamide ไม่เพียงพอ ต้องประเมินโรคหัวใจและไตก่อน ความเสี่ยงได้แก่ ขาดน้ำ น้ำเกิน ปอดบวมน้ำ เกลือแร่ผิดปกติ และไตวายเฉียบพลัน ไม่ควรให้ซ้ำหลายครั้ง"],"s":"egs6","p":"p. 147","h":"add"},
      {"t":["Acetazolamide, IV mannitol or oral hyperosmotics may be needed to clear the cornea before laser iridotomy.","อาจต้องใช้ acetazolamide, mannitol ทางหลอดเลือดดำ หรือยาออสโมติกชนิดกิน เพื่อให้กระจกตาใสก่อนทำ laser iridotomy"],"s":"egs6","p":"p. 187","h":"add"},
      {"t":["Avoid acetazolamide with a history of sulphonamide allergy or severe kidney disease. Serious side effects include hypokalaemia, metabolic acidosis and dyspnoea; Stevens-Johnson syndrome is extremely rare.","หลีกเลี่ยง acetazolamide เมื่อมีประวัติแพ้ซัลฟาหรือโรคไตรุนแรง ผลข้างเคียงสำคัญ ได้แก่ โพแทสเซียมต่ำ กรดเมตาบอลิก และหายใจลำบาก ส่วน Stevens-Johnson พบได้น้อยมาก"],"s":"egs6","p":"p. 147","h":"safe"},
    ] },
  { k: "poag", n: ["Open-angle glaucoma (oral carbonic anhydrase inhibitors)","ต้อหินมุมเปิด (ยายับยั้ง carbonic anhydrase ชนิดกิน)"], color: "border-l-purple-500", ids: ["acetazolamide"], sh: ["Open-angle","มุมเปิด"], qa: {"first":["Oral acetazolamide or methazolamide lowers IOP about 20–30%; not first-line","acetazolamide หรือ methazolamide ชนิดกินลดความดันตาราว 20–30% ไม่ใช่ยาขนานแรก"],"add":["Hyperosmotic agents (glycerol, mannitol) dehydrate the vitreous","ยา hyperosmotic (glycerol, mannitol) ทำให้วุ้นตาขาดน้ำ"],"watch":["N/A: no monitoring advice in the medication table","N/A: ตารางยาไม่มีคำแนะนำการติดตาม"],"avoid":["Sulfonamide allergy, kidney stones, aplastic anaemia, thrombocytopenia, sickle cell disease","แพ้ซัลโฟนาไมด์ นิ่วในไต aplastic anaemia เกล็ดเลือดต่ำ โรคเม็ดเลือดแดงรูปเคียว"]},
    items: [
      {"t":["Oral carbonic anhydrase inhibitors (acetazolamide, methazolamide) lower IOP by about 20–30% by decreasing aqueous production. They sit with the other glaucoma medications, not as first-line.","ยายับยั้ง carbonic anhydrase ชนิดกิน (acetazolamide, methazolamide) ลดความดันตาได้ราว 20–30% โดยลดการสร้างน้ำในลูกตา ใช้ร่วมกับยาต้อหินกลุ่มอื่นและไม่ใช่ยาขนานแรก"],"s":"aao20","p":"PDF p. 29","h":"over"},
      {"t":["Hyperosmotic agents (glycerol, mannitol) dehydrate the vitreous; cautions: heart failure, renal failure, diabetic complications, confusion.","ยา hyperosmotic (glycerol, mannitol) ทำให้วุ้นตาขาดน้ำ ข้อควรระวัง: หัวใจล้มเหลว ไตวาย ภาวะแทรกซ้อนของเบาหวาน สับสน"],"s":"aao20","p":"PDF p. 29","h":"add"},
      {"t":["Possible side effects: Stevens-Johnson syndrome, malaise, anorexia, depression, electrolyte imbalance, renal calculi, blood dyscrasias (aplastic anaemia, thrombocytopenia), metallic taste, enuresis, paraesthesia, diarrhoea, abdominal cramps.","ผลข้างเคียงที่อาจเกิด: Stevens-Johnson syndrome อ่อนเพลีย เบื่ออาหาร ซึมเศร้า เกลือแร่ผิดปกติ นิ่วในไต เม็ดเลือดผิดปกติ (aplastic anaemia, เกล็ดเลือดต่ำ) รสโลหะ ปัสสาวะราด ชาปลายมือเท้า ท้องเสีย ปวดเกร็งท้อง"],"s":"aao20","p":"PDF p. 29","h":"safe"},
      {"t":["Contraindications: sulfonamide allergy, kidney stones, aplastic anaemia, thrombocytopenia, sickle cell disease. FDA pregnancy category C; high doses were teratogenic in animals.","ข้อห้าม: แพ้ซัลโฟนาไมด์ นิ่วในไต aplastic anaemia เกล็ดเลือดต่ำ และโรคเม็ดเลือดแดงรูปเคียว FDA pregnancy category C และขนาดสูงทำให้เกิดความพิการในสัตว์ทดลอง"],"s":"aao20","p":"PDF p. 29, 31","h":"safe"},
    ] },
  { k: "altitude", n: ["Altitude illness","โรคแพ้ที่สูง"], color: "border-l-lime-500", ids: ["acetazolamide"], sh: ["Altitude","ที่สูง"], qa: {"first":["Acetazolamide 125 mg every 12 h to prevent AMS at moderate or high risk","acetazolamide 125 มก. ทุก 12 ชม. เพื่อป้องกัน AMS เมื่อเสี่ยงปานกลางถึงสูง"],"add":["Dexamethasone as the adult alternative; acetazolamide 250 mg every 12 h to treat AMS","dexamethasone เป็นทางเลือกในผู้ใหญ่ และ acetazolamide 250 มก. ทุก 12 ชม. เพื่อรักษา AMS"],"watch":["Paraesthesia is common; altitude illness can trigger ketoacidosis in diabetes","ชาปลายมือเท้าพบบ่อย และโรคแพ้ที่สูงอาจกระตุ้น ketoacidosis ในเบาหวาน"],"avoid":["Diuretics and acetazolamide for treating HAPE","ยาขับปัสสาวะและ acetazolamide เพื่อรักษา HAPE"]},
    items: [
      {"t":["Acetazolamide should be strongly considered for travellers at moderate or high risk of acute mountain sickness (AMS). Dexamethasone is the alternative in adults.","ควรพิจารณา acetazolamide อย่างจริงจังในผู้เดินทางที่เสี่ยงปานกลางถึงสูงต่อโรคแพ้ที่สูงเฉียบพลัน (AMS) ผู้ใหญ่ใช้ dexamethasone แทนได้"],"s":"wms24","c":"strong, high","h":"first"},
      {"t":["Prevention (AMS and HACE): acetazolamide 125 mg every 12 h for low-to-moderate-risk ascent profiles; consider 250 mg twice a day for high-risk profiles. Children: 1.25 mg/kg every 12 h (maximum 125 mg a dose).","ป้องกัน (AMS และ HACE): acetazolamide 125 มก. ทุก 12 ชั่วโมงสำหรับการขึ้นที่สูงที่เสี่ยงต่ำถึงปานกลาง ถ้าเสี่ยงสูงพิจารณา 250 มก. วันละ 2 ครั้ง เด็ก: 1.25 มก./กก. ทุก 12 ชั่วโมง (สูงสุด 125 มก./ครั้ง)"],"s":"wms24","p":"Table 1","h":"dose"},
      {"t":["Start the night before ascent; day-of-ascent dosing still helps. Continue 2 days after arrival if you ascend at the recommended rate, 2–4 days if faster. If you go up and straight back down, stop once descent starts.","เริ่มก่อนขึ้นที่สูงหนึ่งคืน ถ้าเริ่มวันที่ขึ้นก็ยังได้ประโยชน์ ให้ต่อ 2 วันหลังถึงถ้าขึ้นตามอัตราที่แนะนำ และ 2–4 วันถ้าขึ้นเร็วกว่านั้น ถ้าขึ้นแล้วลงทันทีให้หยุดเมื่อเริ่มลง"],"s":"wms24","p":"Table 1","h":"dose"},
      {"t":["Treating AMS: acetazolamide 250 mg every 12 h (children 2.5 mg/kg every 12 h, maximum 250 mg a dose) can be considered.","รักษา AMS: พิจารณา acetazolamide 250 มก. ทุก 12 ชั่วโมง (เด็ก 2.5 มก./กก. ทุก 12 ชั่วโมง สูงสุด 250 มก./ครั้ง)"],"s":"wms24","c":"strong, low","p":"Table 1","h":"dose"},
      {"t":["Prevention (adults): acetazolamide 125 mg twice a day, 250 mg twice a day if over 100 kg. Start the day before ascent and continue for the first two days at altitude, longer if the ascent continues.","ป้องกัน (ผู้ใหญ่): acetazolamide 125 มก. วันละ 2 ครั้ง หรือ 250 มก. วันละ 2 ครั้งถ้าน้ำหนักเกิน 100 กก. เริ่มก่อนขึ้นที่สูงหนึ่งวันและให้ต่อ 2 วันแรกที่ระดับความสูงนั้น นานกว่านั้นถ้ายังขึ้นต่อ"],"s":"cdc","h":"dose"},
      {"t":["Treating acute mountain sickness (adults): 250 mg twice a day; the only studied treatment dose is 250 mg twice, 8 hours apart. For children: 2.5 mg/kg every 12 hours, up to 250 mg.","รักษาโรคแพ้ที่สูงเฉียบพลัน (ผู้ใหญ่): 250 มก. วันละ 2 ครั้ง ขนาดรักษาที่เคยศึกษามีเพียง 250 มก. 2 ครั้ง ห่างกัน 8 ชั่วโมง เด็ก: 2.5 มก./กก. ทุก 12 ชั่วโมง สูงสุด 250 มก."],"s":"cdc","h":"dose"},
      {"t":["Children, prevention: 1.25 mg/kg every 12 hours up to 125 mg (table), or 2.5–5 mg/kg a day divided up to 125 mg twice a day (text); the page states the two slightly differently.","เด็ก ป้องกัน: 1.25 มก./กก. ทุก 12 ชั่วโมง สูงสุด 125 มก. (ตาราง) หรือ 2.5–5 มก./กก./วัน แบ่งให้ สูงสุด 125 มก. วันละ 2 ครั้ง (ข้อความ) ซึ่งหน้าเว็บระบุไว้ต่างกันเล็กน้อย"],"s":"cdc","h":"dose"},
      {"t":["People allergic to sulfa antibiotics can take acetazolamide (cross-sensitivity has not been reported), but a history of anaphylaxis to any drug or multiple drug allergies needs caution. Paresthesia is common; the 125 mg dose helps limit it.","ผู้ที่แพ้ยาปฏิชีวนะกลุ่มซัลฟาใช้ acetazolamide ได้ (ยังไม่มีรายงานการแพ้ข้ามกลุ่ม) แต่ประวัติ anaphylaxis ต่อยาใดๆ หรือแพ้ยาหลายชนิดต้องระวัง อาการชาปลายมือเท้าพบบ่อย ขนาด 125 มก. ช่วยลดอาการนี้"],"s":"cdc","h":"safe"},
      {"t":["Altitude illness can trigger diabetic ketoacidosis, which may be harder to treat in people taking acetazolamide. HACE treatment is oxygen, dexamethasone and descent; the page lists acetazolamide for HACE prevention only, and does not list it for HAPE.","โรคแพ้ที่สูงอาจกระตุ้นภาวะ ketoacidosis ในเบาหวาน ซึ่งรักษายากขึ้นในผู้ที่ใช้ acetazolamide การรักษา HACE คือออกซิเจน dexamethasone และลงจากที่สูง หน้าเว็บระบุ acetazolamide สำหรับป้องกัน HACE เท่านั้น และไม่ได้ระบุสำหรับ HAPE"],"s":"cdc","h":"safe"},
      {"t":["HAPE: acetazolamide is not recommended for prevention in people with HAPE on prior trips, but may be considered to prevent re-entry HAPE. Diuretics and acetazolamide are both recommended against for treating HAPE (diuretic effect may cause hypotension in volume-depleted patients).","HAPE: ไม่แนะนำ acetazolamide เพื่อป้องกันในผู้ที่เคยเป็น HAPE จากการเดินทางครั้งก่อน แต่พิจารณาได้เพื่อป้องกัน re-entry HAPE ไม่แนะนำยาขับปัสสาวะและ acetazolamide สำหรับรักษา HAPE (ฤทธิ์ขับปัสสาวะอาจทำให้ความดันต่ำในผู้ที่ขาดน้ำในหลอดเลือด)"],"s":"wms24","c":"strong, moderate / weak, moderate","p":"HAPE sections","h":"stop"},
    ] },
  { k: "icp", n: ["Raised intracranial pressure","ความดันในกะโหลกศีรษะสูง"], color: "border-l-fuchsia-500", ids: ["mannitol","furosemide"], sh: ["ICP","ICP"], qa: {"first":["No agent is proven; hyperosmolar therapy may lower ICP (BTF)","ยังไม่มียาที่พิสูจน์ว่าดีที่สุด ยา hyperosmolar อาจลด ICP (BTF)"],"add":["TBI: hypertonic saline suggested over mannitol; mannitol if hypertonic saline cannot be given (NCS)","บาดเจ็บศีรษะ: แนะนำ hypertonic saline มากกว่า mannitol และใช้ mannitol เมื่อให้ hypertonic saline ไม่ได้ (NCS)"],"watch":["Osmolar gap and renal function during mannitol; hypotension if given in under 5 minutes","osmolar gap และการทำงานของไตระหว่างให้ mannitol และความดันต่ำถ้าให้เร็วกว่า 5 นาที"],"avoid":["Scheduled prophylactic mannitol in ischaemic stroke; mannitol pre-hospital in TBI","mannitol ป้องกันตามเวลาในโรคหลอดเลือดสมองขาดเลือด และ mannitol นอกโรงพยาบาลในบาดเจ็บศีรษะ"]},
    items: [
      {"t":["Severe TBI: hyperosmolar therapy may lower ICP, but there was not enough evidence on clinical outcomes to recommend any specific agent. The 3rd-edition statements (mannitol 0.25–1 g/kg; avoid systolic BP below 90 mmHg; before ICP monitoring, use mannitol only with signs of herniation or progressive deterioration) were not carried forward because their evidence no longer met the standard.","บาดเจ็บศีรษะรุนแรง: ยา hyperosmolar อาจลด ICP ได้ แต่หลักฐานด้านผลลัพธ์ทางคลินิกไม่พอที่จะแนะนำยาตัวใดตัวหนึ่ง ข้อความในฉบับที่ 3 (mannitol 0.25–1 ก./กก. หลีกเลี่ยงความดันซิสโตลิกต่ำกว่า 90 mmHg และก่อนมี ICP monitoring ให้ใช้ mannitol เฉพาะเมื่อมีสัญญาณ herniation หรืออาการทรุดลงต่อเนื่อง) ไม่ได้ยกมาในฉบับที่ 4 เพราะหลักฐานไม่ถึงเกณฑ์ปัจจุบัน"],"s":"btf4","p":"p. 49–50","h":"over"},
      {"t":["TBI: hypertonic saline is suggested over mannitol for initial management of raised ICP or cerebral oedema; mannitol is an effective alternative when hypertonic saline cannot be given; neither should be used expecting better neurological outcomes; against mannitol in the pre-hospital setting.","บาดเจ็บศีรษะ: แนะนำ hypertonic saline มากกว่า mannitol เป็นการรักษาเริ่มแรกของ ICP สูงหรือสมองบวม mannitol เป็นทางเลือกที่ได้ผลเมื่อให้ hypertonic saline ไม่ได้ ไม่ควรใช้ทั้งสองอย่างโดยหวังให้ผลลัพธ์ทางระบบประสาทดีขึ้น และแนะนำไม่ใช้ mannitol นอกโรงพยาบาล"],"s":"ncs20","c":"conditional, low (pre-hospital: very low)","h":"tx"},
      {"t":["Ischaemic stroke: either hypertonic saline or mannitol for initial management; consider hypertonic saline if the response to mannitol is inadequate; against scheduled prophylactic mannitol because of possible harm.","โรคหลอดเลือดสมองขาดเลือด: ใช้ hypertonic saline หรือ mannitol เป็นการรักษาเริ่มแรกก็ได้ พิจารณา hypertonic saline เมื่อตอบสนองต่อ mannitol ไม่เพียงพอ และแนะนำไม่ใช้ mannitol ป้องกันตามเวลาเพราะอาจเป็นอันตราย"],"s":"ncs20","c":"conditional, low","h":"tx"},
      {"t":["Intracerebral haemorrhage: hypertonic saline is suggested over mannitol (very low-quality evidence). Hepatic encephalopathy: either agent (very low-quality evidence).","เลือดออกในเนื้อสมอง: แนะนำ hypertonic saline มากกว่า mannitol (หลักฐานคุณภาพต่ำมาก) ภาวะสมองเสื่อมจากตับ: ใช้ได้ทั้งสองชนิด (หลักฐานคุณภาพต่ำมาก)"],"s":"ncs20","c":"conditional, very low","h":"tx"},
      {"t":["Spontaneous intracerebral haemorrhage: the benefit of early prophylactic hyperosmolar therapy for outcome is not well established (COR 2b, LOE B-NR); bolus hyperosmolar therapy may be considered to reduce ICP transiently (COR 2b, LOE C-LD).","เลือดออกในเนื้อสมองที่เกิดเอง: ประโยชน์ของการให้ยา hyperosmolar ป้องกันตั้งแต่ต้นต่อผลลัพธ์ยังไม่ชัดเจน (COR 2b, LOE B-NR) และอาจพิจารณาให้แบบฉีดเป็นครั้งเพื่อลด ICP ชั่วคราว (COR 2b, LOE C-LD)"],"s":"ich22","c":"2b B-NR / 2b C-LD","p":"Section 5.5","h":"tx"},
      {"t":["Mannitol dose: below 0.5 g/kg works less well and for a shorter time; 0.5–2.5 g/kg gave a larger, more lasting ICP fall. Give as a rapid IV bolus, not a continuous infusion; over 10–20 minutes to avoid hypotension (more likely if given in under 5 minutes).","ขนาด mannitol: ต่ำกว่า 0.5 ก./กก. ได้ผลน้อยและสั้นกว่า ขนาด 0.5–2.5 ก./กก. ลด ICP ได้มากและนานกว่า ให้แบบฉีดเร็วเป็นครั้ง ไม่ให้หยดต่อเนื่อง และให้ในเวลา 10–20 นาทีเพื่อเลี่ยงความดันต่ำ (พบบ่อยขึ้นถ้าให้เร็วกว่า 5 นาที)"],"s":"ccsap","p":"PDF p. 16","h":"dose"},
      {"t":["Mannitol also acts as a diuretic, which is undesirable in a hypotensive patient, so replace lost intravascular volume; hypertonic saline can be hazardous in a hyponatremic patient.","mannitol มีฤทธิ์ขับปัสสาวะซึ่งไม่เหมาะกับผู้ป่วยความดันต่ำ จึงต้องชดเชยปริมาตรในหลอดเลือดที่สูญเสียไป ส่วน hypertonic saline อาจเป็นอันตรายในผู้ป่วยโซเดียมต่ำ"],"s":"btf4","p":"p. 49","h":"safe"},
      {"t":["During mannitol, use the osmolar gap rather than serum osmolarity thresholds to watch for AKI (very low-quality evidence), and monitor renal function closely (good practice statement).","ระหว่างให้ mannitol ใช้ osmolar gap แทนค่า serum osmolarity ในการเฝ้าระวังไตวายเฉียบพลัน (หลักฐานคุณภาพต่ำมาก) และติดตามการทำงานของไตอย่างใกล้ชิด (good practice statement)"],"s":"ncs20","c":"conditional, very low","h":"safe"},
      {"t":["Mannitol-induced AKI occurs in about 6–12%, more with age, hypertension, sepsis, hypovolaemia, nephrotoxins or kidney disease. Monitor the osmolar gap (below 20 is the most reliable sign of clearance; AKI risk is highest above 60–75 and rare below 55) rather than serum osmolality alone.","ไตวายเฉียบพลันจาก mannitol พบประมาณ 6–12% และมากขึ้นเมื่ออายุมาก ความดันสูง ติดเชื้อรุนแรง ขาดน้ำ ได้รับยาที่เป็นพิษต่อไต หรือมีโรคไต ควรติดตาม osmolar gap (ต่ำกว่า 20 เป็นสัญญาณที่เชื่อถือได้ว่ายาถูกขับออก ความเสี่ยงไตวายสูงสุดเมื่อเกิน 60–75 และพบน้อยเมื่อต่ำกว่า 55) แทนการดู serum osmolality อย่างเดียว"],"s":"ccsap","p":"PDF p. 17","h":"safe"},
    ] },
];
// Sources not read for this app would be listed here as N/A; every source on the author\u2019s list has now been read
const IND_NA = [];

// Strength of a recommendation, from the source's own class / level text, for the chip colour
const IND_TONE = {
  hi: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-400/30',
  mid: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-400/30',
  lo: 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-400/40',
  no: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-400/30',
  none: 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-500/10 dark:text-slate-300 dark:border-slate-400/30',
};
const indTone = (c) => {
  if (/^(III|3)/.test(c)) return 'no';
  if (/^(IIb|2b)/.test(c) || /^weak/.test(c)) return 'lo';
  if (/^(IIa|2a|2[A-D])/.test(c) || /^conditional/.test(c)) return 'mid';
  if (/^(I|1)([ A-D]|$)/.test(c) || /^strong/.test(c)) return 'hi';
  return 'none';
};
// Numbers with a unit (doses, thresholds, times) are shown in bold; the text itself is never changed
const IND_NUM = /(\d+(?:[.,]\d+)?(?:\s?[–-]\s?\d+(?:[.,]\d+)?)?\s?(?:mg\/kg\/h|mg\/kg|g\/kg|mg\/dL|mg\/day|mg|mcg|g|mL\/kg|mL\/h|mL\/minute|mL|mEq\/L|mmol\/L|mOsm\/kg|mmHg|kg|%|hours|hour|days|day|weeks|week|minutes|minute|h\b|มก\.\/กก\.|มก\.\/วัน|มก\.|กรัม|ก\.\/กก\.|ก\.\/ดล\.|ชั่วโมง|ชม\.|นาที|วัน|สัปดาห์))/g;
const boldNums = (txt) => txt.split(IND_NUM).map((p, k) => (k % 2 ? <b key={k} className="font-bold text-slate-900 dark:text-white">{p}</b> : p));
const IND_TOPIC_TONE = {
  over: ['border-l-slate-400', 'text-slate-700 dark:text-slate-200', 'bg-slate-100/70 dark:bg-slate-500/10'],
  first: ['border-l-emerald-500', 'text-emerald-700 dark:text-emerald-300', 'bg-emerald-50/70 dark:bg-emerald-500/10'],
  tx: ['border-l-sky-500', 'text-sky-700 dark:text-sky-300', 'bg-sky-50/70 dark:bg-sky-500/10'],
  dose: ['border-l-indigo-500', 'text-indigo-700 dark:text-indigo-300', 'bg-indigo-50/70 dark:bg-indigo-500/10'],
  titr: ['border-l-violet-500', 'text-violet-700 dark:text-violet-300', 'bg-violet-50/70 dark:bg-violet-500/10'],
  add: ['border-l-teal-500', 'text-teal-700 dark:text-teal-300', 'bg-teal-50/70 dark:bg-teal-500/10'],
  trial: ['border-l-fuchsia-500', 'text-fuchsia-700 dark:text-fuchsia-300', 'bg-fuchsia-50/70 dark:bg-fuchsia-500/10'],
  mon: ['border-l-cyan-500', 'text-cyan-700 dark:text-cyan-300', 'bg-cyan-50/70 dark:bg-cyan-500/10'],
  safe: ['border-l-amber-500', 'text-amber-800 dark:text-amber-300', 'bg-amber-50/70 dark:bg-amber-500/10'],
  stop: ['border-l-rose-500', 'text-rose-700 dark:text-rose-300', 'bg-rose-50/70 dark:bg-rose-500/10'],
  after: ['border-l-lime-500', 'text-lime-700 dark:text-lime-300', 'bg-lime-50/70 dark:bg-lime-500/10'],
  ref: ['border-l-orange-500', 'text-orange-700 dark:text-orange-300', 'bg-orange-50/70 dark:bg-orange-500/10'],
};
const IND_QA_TONE = {
  first: ['bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-400/30', 'text-emerald-700 dark:text-emerald-300'],
  add: ['bg-sky-50 border-sky-200 dark:bg-sky-500/10 dark:border-sky-400/30', 'text-sky-700 dark:text-sky-300'],
  watch: ['bg-amber-50 border-amber-200 dark:bg-amber-500/10 dark:border-amber-400/30', 'text-amber-800 dark:text-amber-300'],
  avoid: ['bg-rose-50 border-rose-200 dark:bg-rose-500/10 dark:border-rose-400/30', 'text-rose-700 dark:text-rose-300'],
};

function IndicationModal({ onClose, lang, open }) {
  const i = lang === 'th' ? 1 : 0;
  const [jump, setJump] = useState(null);
  const [flt, setFlt] = useState({});
  useEffect(() => {
    if (!jump) return;
    const el = document.getElementById('ind-' + jump.k);
    if (el) el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [jump]);
  const srcCell = (x, k) => (
    <div key={k} className="flex flex-wrap items-center gap-1">
      <span title={IND_SRC[x.s].full} className="rounded border px-1 py-px text-[10px] font-bold leading-snug bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-400/30">{IND_SRC[x.s].s}{x.p ? ' · ' + x.p : ''}</span>
      {x.c && x.c.split(' / ').map((c, n) => <span key={n} className={'rounded border px-1 py-px text-[10px] font-bold leading-snug ' + IND_TONE[indTone(c)]}>{c}</span>)}
    </div>
  );
  return (
    <Modal title={TXT.ind[i]} onClose={onClose} lang={lang}>
      <p className={'text-[12px] ' + MUTED}>{TXT.indIntro[i]}</p>
      <nav aria-label={TXT.indJump[i]} className="flex flex-wrap gap-1.5">
        {INDICATIONS.map(g => <button key={g.k} type="button" onClick={() => setJump(p => ({ k: g.k, n: (p ? p.n : 0) + 1 }))} className={'rounded-lg border px-2 py-1 text-[11px] font-bold ' + BTN_OFF}>{g.sh[i]}</button>)}
      </nav>
      {INDICATIONS.map((g, gi) => {
        const jumped = jump && jump.k === g.k;
        const sel = flt[g.k] || null;
        const topics = IND_TOPIC_ORDER.filter(h => g.items.some(x => x.h === h));
        const rows = sel ? g.items.filter(x => x.h === sel) : g.items;
        let prev = null;
        return (
          <div key={g.k + (jumped ? '-j' + jump.n : '')} id={'ind-' + g.k} className="scroll-mt-14">
            <Fold title={g.n[i]} color={g.color} open={gi === 0 || !!jumped}>
              <div className="flex flex-wrap items-center gap-1 mb-2">
                <span className={'text-[10px] font-bold uppercase tracking-wide ' + MUTED}>{TXT.indDrugs[i]}:</span>
                {g.ids.map(id => <button key={id} type="button" onClick={() => open(id)} className={'rounded-lg border px-2 py-1 text-[11px] font-bold ' + BTN_OFF}>{DRUG[id].name.split(' ')[0]}</button>)}
              </div>
              <div className="mb-3">
                <div className={'mb-1 text-[10px] font-bold uppercase tracking-wide ' + MUTED}>{TXT.indQA[i]} · {TXT.indQAnote[i]}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.keys(IND_QA_LBL).map(q => (
                    <div key={q} className={'rounded-lg border p-2.5 ' + IND_QA_TONE[q][0]}>
                      <div className={'text-[10px] font-extrabold uppercase tracking-wide ' + IND_QA_TONE[q][1]}>{IND_QA_LBL[q][i]}</div>
                      <div className="mt-0.5 text-[13px] leading-snug">{boldNums(g.qa[q][i])}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-2 flex flex-wrap items-center gap-1" role="group" aria-label={TXT.indShow[i]}>
                <span className={'text-[10px] font-bold uppercase tracking-wide ' + MUTED}>{TXT.indShow[i]}:</span>
                {[null, ...topics].map(h => (
                  <button key={h || 'all'} type="button" aria-pressed={sel === h} onClick={() => setFlt(p => ({ ...p, [g.k]: h }))}
                    className={'rounded-lg border px-2 py-1 text-[11px] font-bold ' + (sel === h ? BTN_ON : BTN_OFF)}>{h ? IND_TOPICS[h][i] : TXT.indAll[i]}</button>
                ))}
              </div>
              <table className="block sm:table w-full sm:table-fixed border-collapse text-left text-[12px] sm:text-[13px] leading-relaxed">
                <thead className="hidden sm:table-header-group">
                  <tr className={'text-[10px] font-bold uppercase tracking-wide ' + MUTED}>
                    <th scope="col" className="pb-1 pr-2 font-bold">{TXT.indRec[i]}</th>
                    <th scope="col" className="pb-1 w-[30%] font-bold">{TXT.indSrcCol[i]}</th>
                  </tr>
                </thead>
                <tbody className="block sm:table-row-group">
                  {rows.map((x, k) => {
                    const head = x.h !== prev;
                    prev = x.h;
                    const tn = IND_TOPIC_TONE[x.h];
                    return (
                      <React.Fragment key={k}>
                        {head && <tr className="block sm:table-row"><th scope="colgroup" colSpan={2} className={'block sm:table-cell mt-3 mb-1 border-l-4 px-2 py-1 text-left text-[11px] font-extrabold uppercase tracking-wide ' + tn[0] + ' ' + tn[1] + ' ' + tn[2]}>{IND_TOPICS[x.h][i]}</th></tr>}
                        <tr className="block sm:table-row align-top border-t border-slate-200 dark:border-[#263449]">
                          <td className="block sm:table-cell pt-2.5 pb-1 sm:py-3 sm:pr-3 break-words">{boldNums(x.t[i])}</td>
                          <td className="block sm:table-cell pb-2.5 sm:py-3"><div className="flex flex-row flex-wrap sm:flex-col items-start gap-1">{[x, ...(x.also || [])].map(srcCell)}</div></td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </Fold>
          </div>
        );
      })}
      {IND_NA.length > 0 && <div className={'rounded-xl border border-l-4 border-l-slate-400 dark:border-l-slate-400 p-3 ' + SURF}>
        <div className="text-sm font-extrabold mb-1">{TXT.indNA[i]}</div>
        <ul className={'text-[12px] space-y-0.5 ' + MUTED}>{IND_NA.map((x, k) => <li key={k}><b className="text-slate-700 dark:text-slate-200">{x.n[i]}</b> · {x.src}</li>)}</ul>
      </div>}
      <p className={'text-[10px] leading-snug ' + MUTED}>{TXT.indSrcNote[i]}</p>
    </Modal>
  );
}

/* ---------- Interaction checker ---------- */
// Each co-medication lists what it does to a drug or a whole class: [drug id or class id, severity (2 = contraindicated, 1 = caution), reason]
const CO_MEDS = [
  { k: 'nsaid', n: ['NSAIDs / COX-2 inhibitors', 'NSAIDs / COX-2 inhibitors'], hits: [['loop', 1, 'Blunts diuresis; AKI risk', 'ลดการขับปัสสาวะ เสี่ยง AKI'], ['thz', 1, 'Blunts the diuretic and BP effect', 'ลดฤทธิ์ขับปัสสาวะและลดความดัน'], ['mra', 1, 'Hyperkalemia and AKI', 'โพแทสเซียมสูงและ AKI'], ['enac', 1, 'Hyperkalemia and AKI', 'โพแทสเซียมสูงและ AKI']] },
  { k: 'li', n: ['Lithium', 'Lithium'], hits: [['thz', 2, 'Lithium clearance falls: toxicity; avoid or monitor levels', 'ขับ lithium ลดลง เกิดพิษได้ หลีกเลี่ยงหรือติดตามระดับยา'], ['loop', 1, 'Lithium level can rise', 'ระดับ lithium อาจสูงขึ้น'], ['mra', 1, 'Lithium level can rise', 'ระดับ lithium อาจสูงขึ้น'], ['enac', 1, 'Lithium level can rise', 'ระดับ lithium อาจสูงขึ้น']] },
  { k: 'dig', n: ['Digoxin', 'Digoxin'], hits: [['loop', 1, 'Low K⁺ / Mg²⁺ raise digoxin toxicity', 'K⁺ / Mg²⁺ ต่ำเพิ่มพิษ digoxin'], ['thz', 1, 'Low K⁺ / Mg²⁺ raise digoxin toxicity', 'K⁺ / Mg²⁺ ต่ำเพิ่มพิษ digoxin']] },
  { k: 'qt', n: ['QT-prolonging drugs', 'ยาที่ยืด QT'], hits: [['loop', 1, 'Low K⁺ / Mg²⁺: arrhythmia risk', 'K⁺ / Mg²⁺ ต่ำ เสี่ยงหัวใจเต้นผิดจังหวะ'], ['thz', 1, 'Low K⁺ / Mg²⁺: arrhythmia risk', 'K⁺ / Mg²⁺ ต่ำ เสี่ยงหัวใจเต้นผิดจังหวะ']] },
  { k: 'raas', n: ['ACEi / ARB / ARNI', 'ACEi / ARB / ARNI'], hits: [['mra', 1, 'Hyperkalemia: check K⁺ and creatinine', 'โพแทสเซียมสูง ตรวจ K⁺ และ creatinine'], ['enac', 1, 'Hyperkalemia: check K⁺ and creatinine', 'โพแทสเซียมสูง ตรวจ K⁺ และ creatinine']] },
  { k: 'ksup', n: ['K⁺ supplements, trimethoprim, heparin', 'โพแทสเซียมเสริม, trimethoprim, heparin'], hits: [['eplerenone', 2, 'Contraindicated with K⁺ supplements', 'ห้ามใช้ร่วมกับโพแทสเซียมเสริม'], ['esaxerenone', 2, 'Contraindicated with K⁺ supplements (Japan label)', 'ห้ามใช้ร่วมกับโพแทสเซียมเสริม (ฉลากญี่ปุ่น)'], ['mra', 1, 'Hyperkalemia', 'โพแทสเซียมสูง'], ['enac', 1, 'Hyperkalemia', 'โพแทสเซียมสูง']] },
  { k: 'ksp', n: ['Another K-sparing diuretic or MRA', 'ยาขับปัสสาวะประหยัดโพแทสเซียมหรือ MRA อีกตัว'], hits: [['eplerenone', 2, 'Contraindicated with other K-sparing diuretics', 'ห้ามใช้ร่วมกับยาขับปัสสาวะประหยัดโพแทสเซียมอื่น'], ['esaxerenone', 2, 'Contraindicated with K-sparing diuretics (Japan label)', 'ห้ามใช้ร่วมกับยาขับปัสสาวะประหยัดโพแทสเซียม (ฉลากญี่ปุ่น)'], ['mra', 1, 'Hyperkalemia', 'โพแทสเซียมสูง'], ['enac', 1, 'Hyperkalemia', 'โพแทสเซียมสูง']] },
  { k: 'aminog', n: ['Aminoglycosides, cisplatin', 'Aminoglycosides, cisplatin'], hits: [['loop', 1, 'Additive ototoxicity and nephrotoxicity', 'พิษต่อหูและไตเสริมกัน']] },
  { k: 'dm', n: ['Insulin / sulfonylureas', 'Insulin / sulfonylureas'], hits: [['sglt', 1, 'Hypoglycemia: the dose may need lowering', 'น้ำตาลต่ำ อาจต้องลดขนาดยา'], ['thz', 1, 'Glucose can rise: the dose may need raising', 'น้ำตาลอาจสูงขึ้น อาจต้องเพิ่มขนาดยา']] },
  { k: 'cavd', n: ['Calcium or vitamin D supplements', 'แคลเซียมหรือวิตามินดีเสริม'], hits: [['thz', 1, 'Hypercalcemia', 'แคลเซียมสูง']] },
  { k: 'asa', n: ['High-dose aspirin', 'Aspirin ขนาดสูง'], hits: [['cai', 1, 'Accumulation and toxicity, especially in renal impairment', 'ยาสะสมและเกิดพิษ โดยเฉพาะในไตเสื่อม']] },
  { k: 'cyp', n: ['Strong CYP3A4 inhibitors (ketoconazole, itraconazole, clarithromycin, ritonavir)', 'ยายับยั้ง CYP3A4 แรง (ketoconazole, itraconazole, clarithromycin, ritonavir)'], hits: [['v2', 2, 'Contraindicated: exposure rose about 5-fold with ketoconazole', 'ห้ามใช้ร่วม: ระดับยาเพิ่มราว 5 เท่าเมื่อใช้ ketoconazole'], ['eplerenone', 2, 'Contraindicated', 'ห้ามใช้ร่วม']] },
  { k: 'tac', n: ['Tacrolimus', 'Tacrolimus'], hits: [['canrenoate', 2, 'Contraindicated (Japan label)', 'ห้ามใช้ร่วม (ฉลากญี่ปุ่น)']] },
];

// Co-medications grouped so the list can be scanned
const CO_GROUPS = [
  { n: ['Potassium and kidney', 'โพแทสเซียมและไต'], ks: ['ksup', 'ksp', 'raas', 'nsaid', 'li'] },
  { n: ['Heart rhythm', 'จังหวะหัวใจ'], ks: ['dig', 'qt'] },
  { n: ['Sugar and minerals', 'น้ำตาลและแร่ธาตุ'], ks: ['dm', 'cavd'] },
  { n: ['Other', 'อื่นๆ'], ks: ['aminog', 'asa', 'cyp', 'tac'] },
];
const CO_BY_K = Object.fromEntries(CO_MEDS.map(m => [m.k, m]));

function InteractionModal({ onClose, lang, open, meds, setMeds, focus }) {
  const i = lang === 'th' ? 1 : 0;
  const [q, setQ] = useState('');
  const [foc, setFoc] = useState(focus || null);
  const fd = foc ? DRUG[foc] : null;
  const [listOpen, setListOpen] = useState(!focus);
  const [showNone, setShowNone] = useState(false);
  const pick = CO_MEDS.filter(m => meds.has(m.k));
  const rows = DRUGS.filter(d => !fd || d.id === fd.id).map(d => {
    const hits = [];
    pick.forEach(m => m.hits.forEach(h => { if (h[0] === d.id || h[0] === d.cls) hits.push({ m, sev: h[1], r: h[2 + i] }); }));
    // a drug-level hit replaces a class-level hit of the same co-medication
    const best = new Map();
    hits.forEach(h => { const o = best.get(h.m.k); if (!o || h.sev > o.sev) best.set(h.m.k, h); });
    const list = [...best.values()];
    return { d, list, sev: list.reduce((a, h) => Math.max(a, h.sev), 0) };
  });
  // Opened from a drug's detail view: the co-medications that are flagged for that drug (a drug-level hit replaces a class-level one)
  const fHits = fd ? CO_MEDS.map(m => {
    const hs = m.hits.filter(h => h[0] === fd.id || h[0] === fd.cls);
    if (!hs.length) return null;
    const h = hs.find(x => x[0] === fd.id) || hs[0];
    return { m, sev: h[1], r: h[2 + i] };
  }).filter(Boolean).sort((a, b) => b.sev - a.sev) : [];
  const avoid = rows.filter(r => r.sev === 2);
  const caution = rows.filter(r => r.sev === 1);
  const clear = rows.filter(r => r.sev === 0);
  const toggle = (k) => setMeds(p => { const n = new Set(p); n.has(k) ? n.delete(k) : n.add(k); return n; });
  const ql = q.trim().toLowerCase();
  const groups = CO_GROUPS.map(g => ({ g, items: g.ks.map(k => CO_BY_K[k]).filter(m => !ql || (m.n[0] + ' ' + m.n[1]).toLowerCase().includes(ql)) })).filter(x => x.items.length);
  const card = (r) => (
    <button key={r.d.id} type="button" onClick={() => open(r.d.id)} className={'text-left rounded-xl border border-l-4 p-2 ' + SURF + ' ' + (r.sev === 2 ? 'border-l-rose-500 dark:border-l-rose-500' : 'border-l-amber-500 dark:border-l-amber-500')}>
      <div className="flex flex-wrap items-center gap-1.5"><span className={'font-extrabold text-[12px] ' + CLS[r.d.cls].txt}>{r.d.name}</span>
        <span className={'rounded border px-1 text-[10px] font-bold ' + (r.sev === 2 ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-400/30' : WARN_CHIP)}>{r.sev === 2 ? TXT.interAvoidS[i] : TXT.interCaution[i]}</span></div>
      <ul className="mt-1 text-[11px] space-y-0.5">{r.list.map(h => <li key={h.m.k}><b>{h.m.n[i]}:</b> {h.r}</li>)}</ul>
    </button>
  );
  const section = (list, title, cls) => list.length > 0 && (
    <section className="flex flex-col gap-1.5"><h3 className={'text-[11px] font-extrabold ' + cls}>{title} ({list.length})</h3>{list.map(card)}</section>
  );
  const pill = (n, label, cls) => <span className={'rounded-lg border px-2 py-1 text-[11px] font-bold ' + cls}>{label} <b>{n}</b></span>;
  return (
    <Modal title={TXT.interT[i]} onClose={onClose} lang={lang}>
      {fd && (
        <div className={'rounded-xl border border-l-4 border-l-fuchsia-500 dark:border-l-fuchsia-500 p-2.5 flex flex-col gap-1.5 ' + SURF}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-extrabold">{TXT.interFor[i]} <span className={CLS[fd.cls].txt}>{fd.name}</span></span>
            <button type="button" onClick={() => setFoc(null)} className="shrink-0 text-[11px] font-bold underline text-indigo-600 dark:text-indigo-300 px-1 py-1">{TXT.interAll[i]}</button>
          </div>
          {fHits.length === 0 ? <p className={'text-[11px] ' + MUTED}>{TXT.interNoFor[i]}</p> : (
            <div className="flex flex-col gap-1">{fHits.map(h => (
              <button key={h.m.k} type="button" onClick={() => toggle(h.m.k)} aria-pressed={meds.has(h.m.k)}
                className={'text-left rounded-lg border border-l-4 px-2 py-1.5 text-[11px] ' + (meds.has(h.m.k) ? BTN_ON : BTN_OFF + (h.sev === 2 ? ' border-l-rose-500 dark:border-l-rose-500' : ' border-l-amber-500 dark:border-l-amber-500'))}>
                <b>{h.m.n[i]}</b> · {h.sev === 2 ? TXT.interAvoidS[i] : TXT.interCaution[i]}<div className="font-normal">{h.r}</div>
              </button>))}</div>
          )}
        </div>
      )}
      {meds.size > 0 && (
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={'text-[10px] font-bold uppercase tracking-wide ' + MUTED}>{TXT.interSel[i]} ({meds.size})</span>
            {pick.map(m => <button key={m.k} type="button" onClick={() => toggle(m.k)} aria-label={TXT.interRemove[i] + ': ' + m.n[i]} className={'max-w-full rounded-lg border px-2 py-1 text-[11px] font-bold text-left ' + BTN_ON}>{m.n[i]} <span aria-hidden="true">✕</span></button>)}
            <button type="button" onClick={() => setMeds(new Set())} className="ml-auto text-[11px] font-bold underline text-indigo-600 dark:text-indigo-300 px-1 py-1">{TXT.interClearAll[i]}</button>
          </div>
          <div className="flex flex-wrap gap-1.5" aria-live="polite">
            {pill(avoid.length, TXT.interAvoidS[i], 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-400/30')}
            {pill(caution.length, TXT.interCaution[i], WARN_CHIP)}
            {pill(clear.length, TXT.interNoneS[i], 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-400/30')}
          </div>
        </div>
      )}
      <div className="flex items-center justify-between gap-2">
        <div className={'text-[10px] font-bold uppercase tracking-wide ' + MUTED}>{TXT.interPick[i]}</div>
        {(meds.size > 0 || fd) && <button type="button" onClick={() => setListOpen(v => !v)} aria-expanded={listOpen} className={'shrink-0 rounded-lg border px-2 py-1 text-[11px] font-bold ' + BTN_OFF}>{listOpen ? TXT.interHide[i] : TXT.interChoose[i]}</button>}
      </div>
      {(listOpen || (meds.size === 0 && !fd)) && (
        <>
          <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder={TXT.interSearch[i]} aria-label={TXT.interSearch[i]} className={INPUT} />
          {groups.length === 0 && <p className={'text-[12px] ' + MUTED}>{TXT.interNoMatch[i]}</p>}
          {groups.map(({ g, items }) => (
            <div key={g.n[0]} className="flex flex-col gap-1">
              <div className={'text-[10px] font-bold ' + MUTED}>{g.n[i]}</div>
              <div className="flex flex-wrap gap-1.5">
                {items.map(m => <button key={m.k} type="button" onClick={() => toggle(m.k)} aria-pressed={meds.has(m.k)} className={'max-w-full rounded-lg border px-2.5 py-2 sm:px-2 sm:py-1 text-[11px] font-bold text-left ' + (meds.has(m.k) ? BTN_ON : BTN_OFF)}>{m.n[i]}</button>)}
              </div>
            </div>
          ))}
        </>
      )}
      {meds.size === 0 && !fd && <p className={'text-[12px] ' + MUTED}>{TXT.interHint[i]}</p>}
      {meds.size > 0 && (
        <>
          {section(avoid, TXT.interAvoid[i], 'text-rose-700 dark:text-rose-300')}
          {section(caution, TXT.interCaution[i], 'text-amber-800 dark:text-amber-300')}
          <div className={'rounded-xl border border-l-4 border-l-emerald-500 p-2.5 ' + SURF}>
            <button type="button" onClick={() => setShowNone(v => !v)} aria-expanded={showNone} className="w-full flex items-center justify-between gap-2 text-left">
              <span className="text-[12px] font-extrabold">{TXT.interNone[i]} <span className="text-slate-400 font-bold">({clear.length})</span></span>
              <span aria-hidden="true" className={MUTED}>{showNone ? '▲' : '▼'}</span>
            </button>
            {showNone && <div className={'mt-1 text-[11px] ' + MUTED}>{clear.map(r => r.d.name.split(' ')[0]).join(' · ')}</div>}
          </div>
        </>
      )}
      <p className={'text-[10px] leading-snug ' + MUTED}>{TXT.interNote[i]}</p>
    </Modal>
  );
}

/* ---------- Compare selected drugs ---------- */
function CompareModal({ ids, onClose, lang }) {
  const i = lang === 'th' ? 1 : 0;
  const ds = ids.map(id => DRUG[id]);
  const rows = [
    [TXT.byClass[i], d => <ClassChip c={d.cls} lang={lang} />],
    [TXT.bySite[i], d => <div className="flex flex-wrap gap-1"><SiteChips d={d} lang={lang} /></div>],
    [TXT.dose[i], d => d.dose.map((x, k) => <div key={k}><RouteIcons label={x[0]} lang={lang} /><b>{x[0]}</b> {x[1]}</div>)],
    [TXT.elec[i], d => <Effects d={d} showZero />],
    [TXT.se[i], d => <><Cautions d={d} lang={lang} /><div className={'mt-1 ' + MUTED}>{d.se.filter(x => !CAUTION.has(x)).map(x => SE[x][i]).join(' · ')}</div></>],
    [TXT.renal[i], d => (RENAL[d.id] ? RENAL[d.id][lang] : 'N/A')],
    [TXT.ddi[i], d => <ul className="list-disc pl-3.5 space-y-0.5">{ddiOf(d).map((x, k) => <li key={k}>{x[i]}</li>)}</ul>],
    [TXT.brandsCol[i], d => { const m = marketLine(d); return m ? m.c.toUpperCase() + ': ' + m.b : 'N/A'; }],
    [TXT.trials[i], d => <><EvChip d={d} lang={lang} /><div className="mt-1">{(TRIALS_OF[d.id] || []).map(k => TR[k].n).join(', ')}</div></>],
    [TXT.nlem[i], d => <NlemChip d={d} lang={lang} />],
  ];
  return (
    <Modal title={TXT.cmp[i] + ' · ' + ds.length} onClose={onClose} lang={lang}>
      <div className="overflow-x-auto -mx-1">
        <table className="text-[11px] border-collapse" style={{ minWidth: 110 + ds.length * 190 }}>
          <thead><tr><th className={'sticky left-0 z-10 w-[100px] ' + SURF}></th>{ds.map(d => <th key={d.id} className={'text-left align-bottom px-2 py-1.5 min-w-[190px] text-[13px] font-extrabold ' + CLS[d.cls].txt}>{d.name}</th>)}</tr></thead>
          <tbody>{rows.map(([label, fn]) => (
            <tr key={label} className="border-t border-slate-200 dark:border-[#263449] align-top">
              <td className={'sticky left-0 z-10 px-2 py-1.5 font-bold ' + SURF + ' ' + MUTED}>{label}</td>
              {ds.map(d => <td key={d.id} className="px-2 py-1.5">{fn(d)}</td>)}
            </tr>))}</tbody>
        </table>
      </div>
    </Modal>
  );
}

/* ---------- Resistance next-step helper ---------- */
const FURO_CEIL = 160; // IV furosemide bolus ceiling in HF / CKD (mg)
function ResistanceHelper({ lang }) {
  const i = lang === 'th' ? 1 : 0;
  const [v, setV] = useState({ dose: '', na: '', uo: '' });
  const set = (k) => (e) => setV(p => ({ ...p, [k]: e.target.value }));
  const dose = Number(v.dose);
  const na = v.na === '' ? null : Number(v.na);
  const uo = v.uo === '' ? null : Number(v.uo);
  let out = null;
  if (na != null || uo != null) {
    const poor = (na != null && na < 50) || (uo != null && uo < 100);
    const border = !poor && ((na != null && na < 70) || (uo != null && uo < 150));
    const w = poor ? ['Inadequate', 'ไม่เพียงพอ'] : ['Borderline', 'กึ่งเพียงพอ'];
    if (!poor && !border) out = [0, ['Response adequate: keep the same dose and reassess urine output and weight each day.', 'ตอบสนองเพียงพอ: คงขนาดเดิมและประเมินปริมาณปัสสาวะกับน้ำหนักทุกวัน']];
    else if (!(dose > 0)) out = [1, [w[0] + ' response: double the IV loop dose. Enter the current dose to see the number.', 'ตอบสนอง' + w[1] + ': เพิ่มขนาดยาลูป IV เป็น 2 เท่า ใส่ขนาดปัจจุบันเพื่อดูตัวเลข']];
    else if (dose < FURO_CEIL) out = [1, [w[0] + ' response: double the IV furosemide dose to ' + Math.min(dose * 2, FURO_CEIL) + ' mg (ceiling ' + FURO_CEIL + ' mg), twice daily or a bolus then 10–20 mg/h. Reassess urine Na⁺ at 2 h and output at 6 h.', 'ตอบสนอง' + w[1] + ': เพิ่ม furosemide IV เป็น ' + Math.min(dose * 2, FURO_CEIL) + ' mg (ceiling ' + FURO_CEIL + ' mg) วันละ 2 ครั้ง หรือ bolus แล้วหยด 10–20 mg/ชม. ประเมิน Na⁺ ปัสสาวะที่ 2 ชม. และปริมาณปัสสาวะที่ 6 ชม.']];
    else out = [2, [w[0] + ' response at or above the ' + FURO_CEIL + ' mg ceiling: go to Step 2 and add a thiazide-type drug (metolazone 2.5–10 mg PO, 30 min before the loop), then acetazolamide (Step 3) and an MRA (Step 4).', 'ตอบสนอง' + w[1] + 'ทั้งที่ถึง ceiling ' + FURO_CEIL + ' mg: ไปขั้น 2 เพิ่มไทอะไซด์ (metolazone 2.5–10 mg PO ก่อนยาลูป 30 นาที) แล้ว acetazolamide (ขั้น 3) และ MRA (ขั้น 4)']];
  }
  const f = (k, label, ph) => <label className="block text-[11px] font-bold">{label}<input type="number" min="0" inputMode="decimal" value={v[k]} onChange={set(k)} className={INPUT + ' mt-1'} placeholder={ph} /></label>;
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2">
        {f('dose', i ? 'furosemide IV (mg)' : 'IV furosemide (mg)', 'mg')}
        {f('na', i ? 'Na⁺ ปัสสาวะ 2 ชม.' : 'Urine Na⁺ at 2 h', 'mmol/L')}
        {f('uo', i ? 'ปัสสาวะ 6 ชม.' : 'Urine output, 6 h', 'mL/h')}
      </div>
      {out ? <div className={'rounded-lg border border-l-4 p-2 ' + SURF + ' ' + (out[0] === 0 ? 'border-l-emerald-500' : out[0] === 1 ? 'border-l-amber-500' : 'border-l-rose-500')}>{out[1][i]}</div> : <p className={MUTED}>{i ? 'ใส่ Na⁺ ในปัสสาวะที่ 2 ชม. หรือปริมาณปัสสาวะที่ 6 ชม. อย่างน้อยหนึ่งค่า' : 'Enter urine Na⁺ at 2 h or urine output at 6 h (at least one).'}</p>}
      <p className={'text-[10px] leading-snug ' + MUTED}>{i ? 'เกณฑ์: Na⁺ ปัสสาวะ < 50 ชัดเจนว่าไม่เพียงพอ 50–70 กึ่งเพียงพอ ปัสสาวะ < 100 mL/ชม. ไม่เพียงพอ 100–150 กึ่งเพียงพอ (ESC HFA 2019) ใช้ช่วยตัดสินใจ ไม่ใช่คำสั่งการรักษา' : 'Thresholds: urine Na⁺ < 50 clearly inadequate, 50–70 borderline; output < 100 mL/h inadequate, 100–150 borderline (ESC HFA 2019). A decision aid, not an order.'}</p>
    </div>
  );
}

/* ---------- Detail, Key, Changelog ---------- */
// Plain-text summary of one drug for pasting into notes or a message
const summaryText = (d, lang) => {
  const i = lang === 'th' ? 1 : 0;
  const el = ELECTROLYTES.filter(e => d.fx[e.k] !== 0).map(e => e.l + ARROW[String(d.fx[e.k])]).join(' ');
  const L = [d.name + ' (' + CLS[d.cls][lang] + ')'];
  d.dose.forEach(x => L.push(x[0] + ': ' + x[1]));
  L.push(TXT.site[i] + ': ' + d.sites.map(x => SEG_NAME[x][lang]).join(', ') + ' · ' + d.target);
  if (el) L.push(TXT.elec[i] + ': ' + el);
  L.push(TXT.se[i] + ': ' + d.se.map(x => (CAUTION.has(x) ? '⚠ ' : '') + SE[x][i]).join(', '));
  if (RENAL[d.id]) L.push(RENAL[d.id][lang]);
  const di = ddiOf(d); if (di.length) L.push(TXT.ddi[i] + ': ' + di.map(x => x[i]).join(' | '));
  const m = marketLine(d); if (m) L.push(TXT.brandsCol[i] + ' (' + m.c.toUpperCase() + '): ' + m.b);
  L.push('Diuretics Guide ' + VERSION + ' · ' + TXT.discLink[i]);
  return L.join('\n');
};
function DetailModal({ d, onClose, lang, showOne, onInter }) {
  const i = lang === 'th' ? 1 : 0;
  const t = (k) => TXT[k][i];
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const txt = summaryText(d, lang);
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1800); };
    try { navigator.clipboard.writeText(txt).then(done, () => {}); } catch (e) {
      try { const a = document.createElement('textarea'); a.value = txt; document.body.appendChild(a); a.select(); document.execCommand('copy'); a.remove(); done(); } catch (e2) {}
    }
  };
  return (
    <Modal title={d.name} onClose={onClose} lang={lang}>
      <div className="flex flex-wrap items-center gap-1.5">
        <ClassChip c={d.cls} lang={lang} /><SiteChips d={d} lang={lang} />
        <button type="button" onClick={() => onInter(d.id)} className="ml-auto inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-bold bg-fuchsia-50 hover:bg-fuchsia-100 border-fuchsia-200 text-fuchsia-700 dark:bg-fuchsia-500/10 dark:hover:bg-fuchsia-500/20 dark:border-fuchsia-400/30 dark:text-fuchsia-300"><WarnIcon className="w-3.5 h-3.5" />{t('interCheck')}</button>
        <button type="button" onClick={copy} className={'inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-bold ' + BTN_OFF}><ClipboardIcon className="w-3.5 h-3.5" />{copied ? t('copied') : t('copy')}</button>
      </div>
      <Fold title={t('dose')} color="border-l-indigo-500">
        {d.dose.map((x, k) => <div key={k} className="py-0.5"><RouteIcons label={x[0]} lang={lang} /><b>{x[0]}</b> {x[1]}</div>)}
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
      <Fold title={t('brandsH')} color="border-l-cyan-500">
        {COUNTRIES.map(c => <div key={c} className="flex items-start gap-2 py-0.5"><span className={'shrink-0 w-7 text-center rounded border px-1 text-[10px] font-bold ' + CTRY[c].chip}>{c.toUpperCase()}</span><span className={brandsOf(d, c) ? 'font-semibold' : MUTED}>{brandsOf(d, c) || 'N/A'}</span></div>)}
      </Fold>
      <Fold title={t('avail')} color="border-l-slate-400">
        <div className="flex flex-wrap gap-1"><NlemChip d={d} lang={lang} /><CountryChips d={d} lang={lang} /></div>
        <p className={'mt-1.5 text-[11px] ' + MUTED}><b>{t('brandsT')}:</b> {BRANDS[d.id] || t('noBrand')}<br />{NLEM[d.id] ? 'NLEM 2569: ' + NLEM[d.id].f + '.' : t('nlemNote')} {NLEM_EXTRA[d.id] && NLEM_EXTRA[d.id][lang]} {REG_NOTE[d.id] && REG_NOTE[d.id][lang]} {t('ctryNote')}</p>
      </Fold>
    </Modal>
  );
}

const fxLabel = (f) => ELECTROLYTES.find(e => e.k === f[0]).l + ARROW[String(f[1])];
const fxMatch = (fx) => (Object.keys(fx).length ? DRUGS.filter(d => Object.entries(fx).every(([k, v]) => d.fx[k] === v)) : []);
// Electrolyte filter: two rows (increased on top, decreased below), the same electrolyte stacked; one direction per electrolyte
function FxGrid({ fx, toggleFx, t }) {
  return (
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
  );
}

function KeyModal({ onClose, lang }) {
  const i = lang === 'th' ? 1 : 0;
  return (
    <Modal title={TXT.key[i]} onClose={onClose} lang={lang}>
      <div className="space-y-1.5">
        {KEY_ROWS.map(r => <div key={r[0]} className="flex items-center gap-2 text-[12px]"><span className={'rounded border px-1 py-px text-[10px] font-bold ' + (r[2] === 'sky' ? FX_STYLE['-1'] : r[2] === 'orange' ? FX_STYLE['1'] : r[2] === 'violet' ? FX_STYLE.v : FX_STYLE['0'])}>{r[0]}</span>{r[1][lang]}</div>)}
        <div className="flex items-center gap-2 text-[12px]"><span className={'rounded border px-1 py-px text-[10px] font-bold ' + CTRY.th.chip}>TH</span><span className="rounded border px-1 py-px text-[10px] font-bold border-slate-200 text-slate-400 dark:border-[#263449]">US ?</span>{i ? 'สีเต็ม = ขึ้นทะเบียนอยู่, † = เคยมี, ⊘ = ไม่พบ, "?" = ยังไม่ตรวจสอบ (N/A)' : 'Coloured = registered now; † = previously registered; ⊘ = not found; "?" = not verified (N/A)'}</div>
        <div className="flex items-center gap-2 text-[12px]"><span className={'inline-flex items-center gap-1 rounded border px-1.5 py-px text-[10px] font-bold ' + WARN_CHIP}><WarnIcon className="w-3 h-3" />{SE.hyperK[i]}</span>{TXT.caution[i]}</div>
        <div className="flex items-center gap-2 text-[12px]"><EvChip d={DRUG.spironolactone} lang={lang} />{i ? 'หลักฐานที่ดีที่สุดที่แสดงไว้: RCT ผลลัพธ์ทางคลินิก หรือ RCT ตัวชี้วัดทดแทน (หน้ารายละเอียดมีรายการ)' : 'Best trial evidence listed: outcome RCT or surrogate-endpoint RCT (the detail view lists each trial)'}</div>
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
  { cite: 'McDonagh TA, et al. 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure. Eur Heart J 2021;42:3599-3726.', url: 'https://doi.org/10.1093/eurheartj/ehab368', g: 'ind',
    en: 'Indication guide: IV loop diuretic dosing and response checks, add-on diuretics, diuretics and MRA in chronic HF (read in full text).', th: 'คู่มือตามข้อบ่งใช้: ขนาดและการประเมินการตอบสนองของยาลูปชนิดฉีด ยาเสริม และยาขับปัสสาวะ/MRA ในหัวใจล้มเหลวเรื้อรัง (อ่านจากฉบับเต็ม)' },
  { cite: 'McDonagh TA, et al. 2023 Focused Update of the 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure. Eur Heart J 2023;44:3627-3639.', url: 'https://doi.org/10.1093/eurheartj/ehad195', g: 'ind',
    en: 'Indication guide: ADVOR (acetazolamide) and CLOROTIC (hydrochlorothiazide) summaries.', th: 'คู่มือตามข้อบ่งใช้: สรุป ADVOR (acetazolamide) และ CLOROTIC (hydrochlorothiazide)' },
  { cite: 'Seferovic PM, et al. Clinical practice update on heart failure 2019: pharmacotherapy, procedures, devices and patient management. Eur J Heart Fail 2019;21:1169-1186.', url: 'https://doi.org/10.1002/ejhf.1531', g: 'ind',
    en: 'Indication guide: SGLT2 inhibitors and loop diuretics.', th: 'คู่มือตามข้อบ่งใช้: SGLT2 inhibitors กับยาขับปัสสาวะกลุ่มลูป' },
  { cite: 'Heart Failure Council of Thailand. 2019 HFCT Heart Failure Guideline (Thai version). Thai Heart Association, 2019 (PDF supplied by the author).', url: '', g: 'ind',
    en: 'Indication guide: Thai recommendations for diuretics in acute HF (Table 23, with class and level), MRA safety (Table 14 and text), hypertension in HFrEF.', th: 'คู่มือตามข้อบ่งใช้: ข้อแนะนำของไทยเรื่องยาขับปัสสาวะในหัวใจล้มเหลวเฉียบพลัน (ตารางที่ 23 พร้อมระดับ) ความปลอดภัยของ MRA และความดันสูงใน HFrEF' },
  { cite: 'Biggins SW, et al. Diagnosis, evaluation, and management of ascites, spontaneous bacterial peritonitis and hepatorenal syndrome: 2021 practice guidance by the AASLD. Hepatology 2021;74:1014-1048.', url: 'https://doi.org/10.1002/hep.31884', g: 'ind',
    en: 'Indication guide: diuretic doses, monitoring and limits in cirrhotic ascites; hyponatremia and AKI in cirrhosis.', th: 'คู่มือตามข้อบ่งใช้: ขนาดยา การติดตาม และข้อจำกัดของยาขับปัสสาวะในท้องมานจากตับแข็ง โซเดียมต่ำและไตวายเฉียบพลันในตับแข็ง' },
  { cite: 'KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int 2024;105(4S):S117-S314.', url: 'https://doi.org/10.1016/j.kint.2023.10.018', g: 'ind',
    en: 'Indication guide: diuretics in CKD (blood pressure, potassium, sick-day and perioperative advice).', th: 'คู่มือตามข้อบ่งใช้: ยาขับปัสสาวะในโรคไตเรื้อรัง (ความดัน โพแทสเซียม คำแนะนำวันป่วยและก่อนผ่าตัด)' },
  { cite: 'Thai Hypertension Society. 2024 Thai guidelines on the treatment of hypertension. Asian Biomed 2025;19(6):316-357.', url: 'https://doi.org/10.2478/abm-2025-0034', g: 'ind',
    en: 'Indication guide: resistant hypertension and diuretic choice by eGFR (Thai text read in full; printed pages 113, 115 and 116, with class and level).', th: 'คู่มือตามข้อบ่งใช้: ความดันสูงดื้อยาและการเลือกยาขับปัสสาวะตาม eGFR (อ่านจากฉบับภาษาไทยเต็ม หน้า 113, 115 และ 116 พร้อมระดับคำแนะนำ)' },
  { cite: 'McEvoy JW, et al. 2024 ESC Guidelines for the management of elevated blood pressure and hypertension. Eur Heart J 2024;45:3912-4018.', url: 'https://doi.org/10.1093/eurheartj/ehae178', g: 'ind',
    en: 'Indication guide: first-line classes, three-drug combination, resistant hypertension and spironolactone (Recommendation Table 30).', th: 'คู่มือตามข้อบ่งใช้: ยากลุ่มแรก ยา 3 ชนิด ความดันสูงดื้อยา และ spironolactone (Recommendation Table 30)' },
  { cite: 'Kreutz R, et al. 2024 European Society of Hypertension clinical practice guidelines for the management of arterial hypertension. Eur J Intern Med 2024;126:1-15.', url: 'https://doi.org/10.1016/j.ejim.2024.05.033', g: 'ind',
    en: 'Indication guide: thiazide / thiazide-like diuretics among the major classes (concise guideline).', th: 'คู่มือตามข้อบ่งใช้: ยาไทอะไซด์ / ไทอะไซด์ไลค์เป็นยากลุ่มหลัก (ฉบับย่อ)' },
  { cite: 'KDIGO 2021 Clinical Practice Guideline for the Management of Glomerular Diseases. Kidney Int 2021;100(4S):S1-S276.', url: 'https://doi.org/10.1016/j.kint.2021.05.021', g: 'ind',
    en: 'Indication guide: management of nephrotic oedema (pages S95 and S96).', th: 'คู่มือตามข้อบ่งใช้: การรักษาภาวะบวมจากไตเนโฟรติก (หน้า S95 และ S96)' },
  { cite: 'Spasovski G, et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia. Eur J Endocrinol 2014;170:G1-G47.', url: 'https://doi.org/10.1530/EJE-13-1020', g: 'ind',
    en: 'Indication guide: diuretics and hyponatraemia, vaptans, loop diuretic with sodium chloride in SIAD, correction limits (graded recommendations).', th: 'คู่มือตามข้อบ่งใช้: ยาขับปัสสาวะกับโซเดียมต่ำ vaptans ยาลูปร่วมกับโซเดียมคลอไรด์ใน SIAD และข้อจำกัดการแก้โซเดียม (พร้อมระดับคำแนะนำ)' },
  { cite: 'European Glaucoma Society. Terminology and Guidelines for Glaucoma, 6th edition. Br J Ophthalmol 2025.', url: 'https://doi.org/10.1136/bjophthalmol-2025-egsguidelines', g: 'ind',
    en: 'Indication guide: acetazolamide and mannitol in acute angle closure (page 147).', th: 'คู่มือตามข้อบ่งใช้: acetazolamide และ mannitol ในต้อหินมุมปิดเฉียบพลัน (หน้า 147)' },
  { cite: 'Hackett PH, Shlim DR. High-altitude travel and altitude illness. CDC Yellow Book (page dated 23 April 2025).', url: 'https://www.cdc.gov/yellow-book/hcp/environmental-hazards-risks/high-altitude-travel-and-altitude-illness.html', g: 'ind',
    en: 'Indication guide: acetazolamide doses for preventing and treating altitude illness.', th: 'คู่มือตามข้อบ่งใช้: ขนาด acetazolamide สำหรับป้องกันและรักษาโรคแพ้ที่สูง' },
  { cite: 'Carney N, et al. Guidelines for the Management of Severe Traumatic Brain Injury, Fourth Edition. Neurosurgery 2017;80:6-15.', url: 'https://doi.org/10.1227/NEU.0000000000001432', g: 'ind',
    en: 'Indication guide: hyperosmolar therapy in severe TBI (chapter 3, read in the official PDF, pages 49-50).', th: 'คู่มือตามข้อบ่งใช้: ยา hyperosmolar ในบาดเจ็บศีรษะรุนแรง (บทที่ 3 อ่านจาก PDF ทางการ หน้า 49-50)' },
  { cite: 'Cook AM, et al. Guidelines for the Acute Treatment of Cerebral Edema in Neurocritical Care Patients. Neurocrit Care 2020;32:647-666.', url: 'https://doi.org/10.1007/s12028-020-00959-7', g: 'ind',
    en: 'Indication guide: mannitol versus hypertonic saline by condition, osmolar gap (graded recommendations, open-access full text).', th: 'คู่มือตามข้อบ่งใช้: mannitol เทียบกับ hypertonic saline ตามโรค และ osmolar gap (พร้อมระดับคำแนะนำ ฉบับเต็มแบบเปิด)' },
  { cite: 'Luks AM, et al. Wilderness Medical Society Clinical Practice Guidelines for the Prevention, Diagnosis, and Treatment of Acute Altitude Illness: 2024 Update. Wilderness Environ Med 2024.', url: 'https://doi.org/10.1016/j.wem.2023.05.013', g: 'ind',
    en: 'Indication guide: acetazolamide doses, timing and the HAPE advice (Table 1 and recommendation statements, with strength and evidence quality).', th: 'คู่มือตามข้อบ่งใช้: ขนาด เวลาให้ยา และคำแนะนำเรื่อง HAPE ของ acetazolamide (Table 1 และข้อแนะนำ พร้อมระดับความแรงและคุณภาพหลักฐาน)' },
  { cite: 'Mancia G, et al. 2023 ESH Guidelines for the management of arterial hypertension. J Hypertens 2023;41:1874-2071.', url: 'https://doi.org/10.1097/HJH.0000000000003480', g: 'ind',
    en: 'Indication guide: thiazide-like diuretics, the DCP trial and the fourth-line spironolactone advice (Sections 11.3 and 12.4).', th: 'คู่มือตามข้อบ่งใช้: ยาไทอะไซด์ไลค์ การศึกษา DCP และคำแนะนำ spironolactone ลำดับที่ 4 (หัวข้อ 11.3 และ 12.4)' },
  { cite: 'Greenberg SM, et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage. Stroke 2022;53:e282-e361.', url: 'https://doi.org/10.1161/STR.0000000000000407', g: 'ind',
    en: 'Indication guide: hyperosmolar therapy in intracerebral haemorrhage (Section 5.5, with class and level).', th: 'คู่มือตามข้อบ่งใช้: ยา hyperosmolar ในเลือดออกในเนื้อสมอง (หัวข้อ 5.5 พร้อมระดับคำแนะนำ)' },
  { cite: 'Gedde SJ, et al. Primary Open-Angle Glaucoma Preferred Practice Pattern. Ophthalmology 2021;128:P71-P150.', url: 'https://doi.org/10.1016/j.ophtha.2020.10.022', g: 'ind',
    en: 'Indication guide: oral carbonic anhydrase inhibitors and hyperosmotic agents in open-angle glaucoma (medication table).', th: 'คู่มือตามข้อบ่งใช้: ยายับยั้ง carbonic anhydrase ชนิดกินและยา hyperosmotic ในต้อหินมุมเปิด (ตารางยา)' },
  { cite: 'Verbalis JG, et al. Diagnosis, evaluation, and treatment of hyponatremia: expert panel recommendations. Am J Med 2013;126(10 Suppl 1):S1-S42.', url: 'https://doi.org/10.1016/j.amjmed.2013.07.006', g: 'ind',
    en: 'Indication guide: thiazide-induced hyponatremia, vaptans and aquaretics versus loop diuretics.', th: 'คู่มือตามข้อบ่งใช้: โซเดียมต่ำจากไทอะไซด์ vaptans และ aquaretics เทียบกับยาลูป' },
  { cite: 'May CC, Smetana KS. Treatment of elevated intracranial pressure. ACCP Critical Care Self-Assessment Program (CCSAP) 2022, Book 1: Neurocritical Care (PDF supplied by the author).', url: '', g: 'ind',
    en: 'Indication guide: mannitol dose, infusion time and AKI monitoring detail in raised ICP (a review chapter; the two guidelines it summarises are cited separately).', th: 'คู่มือตามข้อบ่งใช้: ขนาด เวลาให้ยา และการเฝ้าระวังไตวายจาก mannitol ในความดันในกะโหลกศีรษะสูง (บทความทบทวน ส่วนแนวทางสองฉบับที่สรุปไว้อ้างแยกต่างหาก)' },
  { cite: 'คณะกรรมการพัฒนาระบบยาแห่งชาติ. ประกาศคณะกรรมการพัฒนาระบบยาแห่งชาติ เรื่อง บัญชียาหลักแห่งชาติ พ.ศ. 2569. ราชกิจจานุเบกษา (30 มีนาคม 2569).', url: 'https://ndp.fda.moph.go.th/nlem/69-1', g: 'th',
    en: 'Thai NLEM 2569 status, category and forms (checked row by row against the official list).', th: 'สถานะ หมวด และรูปแบบยาในบัญชียาหลักแห่งชาติ 2569 (ตรวจทีละรายการกับบัญชีฉบับจริง)' },
  { cite: 'MIMS Thailand. Drug monographs and brand listings (accessed 4 November 2026).', url: 'https://www.mims.com/thailand', g: 'th',
    en: 'Thai brands and Thai dosing.', th: 'ยี่ห้อและขนาดยาในประเทศไทย' },
  { cite: 'U.S. Food and Drug Administration. openFDA Drugs@FDA API (accessed 4 November 2026).', url: 'https://open.fda.gov/apis/drug/drugsfda/', g: 'reg',
    en: 'US status (current, past, not found).', th: 'สถานะในสหรัฐฯ (ปัจจุบัน เคยมี ไม่พบ)' },
  { cite: 'Electronic Medicines Compendium (emc). UK summaries of product characteristics (accessed 4 November 2026).', url: 'https://www.medicines.org.uk/emc', g: 'reg',
    en: 'UK status, UK dosing (bendroflumethiazide, indapamide, eplerenone) and SGLT2 inhibitor eGFR limits.', th: 'สถานะและขนาดยาใน UK (bendroflumethiazide, indapamide, eplerenone) และเกณฑ์ eGFR ของ SGLT2i' },
  { cite: 'Agencia Española de Medicamentos y Productos Sanitarios (AEMPS). CIMA medicines database (accessed 4 November 2026).', url: 'https://cima.aemps.es', g: 'reg',
    en: 'EU status: marketed products in Spain.', th: 'สถานะใน EU: ยาที่จำหน่ายในสเปน' },
  { cite: 'European Medicines Agency. Metolazone: list of nationally authorised medicinal products (PSUSA/00002037/202506).', url: 'https://www.ema.europa.eu/en/documents/psusa/metolazone-list-nationally-authorised-medicinal-products-psusa-00002037-202506_en.pdf', g: 'reg',
    en: 'EU status of metolazone (Denmark, Italy).', th: 'สถานะ metolazone ใน EU (เดนมาร์ก อิตาลี)' },
  { cite: 'Läkemedelsverket (Swedish Medical Products Agency). Bendroflumetiazid Evolan 2.5 mg tablets: summary of product characteristics.', url: 'https://docetp.mpa.se/LMF/Bendroflumetiazid%20Evolan%20tablet%20ENG%20SmPC_09001bee807a0c7b.pdf', g: 'reg',
    en: 'EU status of bendroflumethiazide (Sweden).', th: 'สถานะ bendroflumethiazide ใน EU (สวีเดน)' },
  { cite: 'Bioindustria L.I.M. Reomax (ethacrynic acid) 50 mg tablets, Italy: product information (Codifa).', url: 'https://www.codifa.it/farmaci/r/reomax-compresse-acido-etacrinico--acido-etacrinico-diuretici', g: 'reg',
    en: 'EU status of ethacrynic acid (Italy).', th: 'สถานะ ethacrynic acid ใน EU (อิตาลี)' },
  { cite: 'Kanrenol (potassium canrenoate), Italy: product information (MyPersonalTrainer).', url: 'https://www.my-personaltrainer.it/farmaci/kanrenol.html', g: 'reg',
    en: 'EU status of potassium canrenoate (Italy); a secondary source, not an official register.', th: 'สถานะ potassium canrenoate ใน EU (อิตาลี) เป็นแหล่งรอง ไม่ใช่ทะเบียนทางการ' },
  { cite: 'Aquaphoril (xipamide) tablets, Austria: patient leaflet, September 2020 (Medikamio).', url: 'https://medikamio.com/de-at/medikamente/aquaphoril-tabletten/pil', g: 'label',
    en: 'Xipamide dosing, contraindications and electrolyte effects.', th: 'ขนาดยา ข้อห้ามใช้ และผลต่ออิเล็กโทรไลต์ของ xipamide' },
  { cite: 'KEGG MEDICUS. Japanese prescription drug products (JAPIC) (accessed 4 November 2026).', url: 'https://www.kegg.jp/medicus/', g: 'reg',
    en: 'Japan status and Japanese brands.', th: 'สถานะและยี่ห้อในญี่ปุ่น' },
  { cite: 'Pharmaceuticals and Medical Devices Agency (PMDA). Japanese package inserts: Fluitran (trichlormethiazide), Diart (azosemide), Soldactone (canrenoate), Minebro (esaxerenone).', url: 'https://www.pmda.go.jp/PmdaSearch/iyakuSearch/', g: 'label',
    en: 'Japan doses, contraindications and warnings for these four drugs.', th: 'ขนาดยา ข้อห้ามใช้ และคำเตือนของยา 4 ชนิดนี้ในญี่ปุ่น' },
  { cite: 'Otsuka. Samsca (tolvaptan) prescribing information.', url: 'https://www.drugs.com/pro/samsca.html', g: 'label',
    en: 'Tolvaptan contraindications and CYP3A4 interactions.', th: 'ข้อห้ามใช้และปฏิกิริยาระหว่างยา CYP3A4 ของ tolvaptan' },
  { cite: 'Mullens W, Damman K, Harjola VP, et al. The use of diuretics in heart failure with congestion: a position statement from the Heart Failure Association of the ESC. Eur J Heart Fail. 2019;21(2):137–155.', url: 'https://doi.org/10.1002/ejhf.1369', g: 'hf',
    en: 'Diuretic resistance, sequential nephron blockade, loop dose ceilings, monitoring.', th: 'ภาวะดื้อยาขับปัสสาวะ การปิดกั้นเนฟรอนตามลำดับ ขนาดยาลูปสูงสุด และการติดตาม' },
  { cite: 'Mullens W, Dauw J, Martens P, et al. Acetazolamide in acute decompensated heart failure with volume overload. N Engl J Med. 2022;387(13):1185–1195.', url: 'https://doi.org/10.1056/NEJMoa2203094', g: 'hf',
    en: 'Acetazolamide added to a loop diuretic (ADVOR).', th: 'การเสริม acetazolamide ร่วมกับยาลูป (ADVOR)' },
  { cite: 'Brater DC. Diuretic therapy. N Engl J Med. 1998;339(6):387–395.', url: 'https://doi.org/10.1056/NEJM199808063390607', g: 'phys',
    en: 'Loop diuretic pharmacology, bioavailability and dose equivalence.', th: 'เภสัชวิทยาของยาลูป การดูดซึม และขนาดยาเทียบเท่า' },
  { cite: 'Heidenreich PA, Bozkurt B, Aguilar D, et al. 2022 AHA/ACC/HFSA guideline for the management of heart failure. Circulation. 2022;145(18):e895–e1032.', url: 'https://doi.org/10.1161/CIR.0000000000001063', g: 'hf',
    en: 'MRA use by eGFR and potassium in heart failure.', th: 'การใช้ MRA ตาม eGFR และโพแทสเซียมในภาวะหัวใจล้มเหลว' },
  { cite: 'Beckett NS, Peters R, Fletcher AE, et al. Treatment of hypertension in patients 80 years of age or older (HYVET). N Engl J Med. 2008;358(18):1887–1898.', url: 'https://doi.org/10.1056/NEJMoa0801369', g: 'htn',
    en: 'Indapamide outcome trial in very old patients.', th: 'การศึกษาผลลัพธ์ของ indapamide ในผู้สูงอายุมาก' },
  { cite: 'Patel A, ADVANCE Collaborative Group. Effects of a fixed combination of perindopril and indapamide on macrovascular and microvascular outcomes in patients with type 2 diabetes mellitus (ADVANCE). Lancet. 2007;370(9590):829–840.', url: 'https://doi.org/10.1016/S0140-6736(07)61303-8', g: 'htn',
    en: 'Indapamide combination outcome trial in type 2 diabetes.', th: 'การศึกษาผลลัพธ์ของ indapamide แบบรวมเม็ดในเบาหวานชนิดที่ 2' },
  { cite: 'Mentz RJ, Anstrom KJ, Eisenstein EL, et al. Effect of torsemide vs furosemide after discharge on all-cause mortality in patients hospitalized with heart failure (TRANSFORM-HF). JAMA. 2023;329(3):214–223.', url: 'https://doi.org/10.1001/jama.2022.23924', g: 'hf',
    en: 'Torsemide vs furosemide mortality.', th: 'อัตราการเสียชีวิต torsemide เทียบ furosemide' },
  { cite: 'Agarwal R, Sinha AD, Cramer AE, et al. Chlorthalidone for hypertension in advanced chronic kidney disease (CLICK). N Engl J Med. 2021;385(27):2507–2519.', url: 'https://doi.org/10.1056/NEJMoa2110730', g: 'htn',
    en: 'Chlorthalidone in stage 4 CKD.', th: 'chlorthalidone ใน CKD ระยะ 4' },
  { cite: 'ScienceDirect Topics. Nephron (Medicine and Dentistry).', url: 'https://www.sciencedirect.com/topics/medicine-and-dentistry/nephron', g: 'phys',
    en: 'Layout of the nephron diagram in the Mechanism guide (redrawn).', th: 'รูปแบบของแผนภาพเนฟรอนในหัวข้อกลไก (วาดใหม่)' },
];
const REF_GROUPS = [
  { k: 'th', t: ['Thai drug list and brands', 'บัญชียาและยี่ห้อในไทย'] },
  { k: 'reg', t: ['Registration status and products by country', 'สถานะการขึ้นทะเบียนและผลิตภัณฑ์รายประเทศ'] },
  { k: 'label', t: ['Product labels and leaflets', 'ฉลากและเอกสารกำกับยา'] },
  { k: 'hf', t: ['Heart failure and diuretic resistance', 'ภาวะหัวใจล้มเหลวและภาวะดื้อยาขับปัสสาวะ'] },
  { k: 'htn', t: ['Hypertension and kidney outcomes', 'ความดันโลหิตสูงและผลลัพธ์ด้านไต'] },
  { k: 'phys', t: ['Diuretic pharmacology and nephron diagram', 'เภสัชวิทยาของยาขับปัสสาวะและแผนภาพเนฟรอน'] },
  { k: 'ind', t: ['Indication guide', 'คู่มือตามข้อบ่งใช้'] },
];
const REF_ORDER = REF_GROUPS.flatMap(g => REFS.filter(r => r.g === g.k));
const REF_TXT = {
  title: ['References', 'เอกสารอ้างอิง'], used: ['Used for', 'ใช้สำหรับ'],
  note: ["Brand names: TH from MIMS Thailand, US from openFDA, UK from emc, EU from Spain AEMPS and national sources, JP from KEGG / JAPIC; N/A = none found or not checked. Trial summaries in each drug's detail view were checked against the PubMed abstracts (4 November 2026) and link to PubMed and the DOI. Author's content without an external reference: the “Filtered Na⁺ blocked” percentages are typical class values, and the diagram annotations follow standard renal physiology.", 'ชื่อทางการค้า: ไทยจาก MIMS สหรัฐฯ จาก openFDA UK จาก emc EU จาก AEMPS สเปนและแหล่งระดับประเทศ ญี่ปุ่นจาก KEGG / JAPIC N/A = ไม่พบหรือยังไม่ได้ตรวจ สรุปการศึกษาในหน้ารายละเอียดของแต่ละยาตรวจกับบทคัดย่อใน PubMed (4 พฤศจิกายน 2569) พร้อมลิงก์ PubMed และ DOI เนื้อหาของผู้จัดทำที่ไม่มีเอกสารอ้างอิงภายนอก: ค่าร้อยละ “Na⁺ ที่ถูกกั้น” เป็นค่าทั่วไปของแต่ละกลุ่มยา และคำอธิบายในแผนภาพเป็นไปตามสรีรวิทยาไตมาตรฐาน'],
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
        {REF_GROUPS.map(g => (
          <div key={g.k} className="mt-4 first:mt-0">
            <h3 className={'mb-1.5 text-[11px] font-extrabold uppercase tracking-wide ' + MUTED}>{g.t[i]} <span className="font-bold normal-case tracking-normal text-slate-400">({REFS.filter(r => r.g === g.k).length})</span></h3>
            <ol className="flex flex-col gap-2.5">
              {REFS.filter(r => r.g === g.k).map(r => (
                <li key={r.cite} className="flex gap-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span className="shrink-0 font-bold text-slate-400 tabular-nums w-5 text-right">{REF_ORDER.indexOf(r) + 1}.</span>
                  <span className="min-w-0">
                    {r.cite}{' '}
                    {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline break-all">{r.url}</a>}
                    <span className={'block text-[11px] mt-0.5 ' + MUTED}><span className="font-bold">{REF_TXT.used[i]}:</span> {i ? r.th : r.en}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ))}
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

function BrandLine({ d, lang, flat }) {
  const m = marketLine(d);
  if (!m) return null;
  const i = lang === 'th' ? 1 : 0;
  return <div className={'text-[11px] leading-snug ' + (flat ? '' : 'mt-1')}><span className={MUTED}>{TXT.brandsOf[i]} ({m.c.toUpperCase()}):</span> <span className="font-semibold">{shortBrands(m.b)}</span></div>;
}

function Tile({ d, lang, on, toggle, open, compact }) {
  const i = lang === 'th' ? 1 : 0;
  const serious = d.se.filter(x => CAUTION.has(x));
  const common = d.se.filter(x => !CAUTION.has(x)).slice(0, 3);
  const hasFx = ELECTROLYTES.some(e => d.fx[e.k] !== 0);
  const lab = 'text-[10px] font-bold uppercase tracking-wide pt-0.5 ' + MUTED;
  const act = 'inline-flex items-center justify-start gap-1.5 h-7 px-2 rounded-lg border text-[11px] font-bold whitespace-nowrap transition-colors ';
  return (
    <div onClick={open} className={'rounded-xl md:rounded-2xl border shadow-sm p-3.5 md:p-5 cursor-pointer hover:shadow-md transition flex flex-col gap-2.5 ' + SURF + (on ? ' ring-2 ring-indigo-500' : '')}>
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <h3 className={'text-lg font-extrabold leading-tight ' + CLS[d.cls].txt}>{d.name}</h3>
            <ClassChip c={d.cls} lang={lang} />
          </div>
          <BrandLine d={d} lang={lang} />
          {!compact && <div className="mt-1 text-[12px] leading-snug text-slate-600 dark:text-slate-300">{d.sites.map(x => SEG_NAME[x][lang]).join(' · ')}</div>}
        </div>
        <div className="shrink-0 flex flex-col gap-1.5">
          <button type="button" onClick={(e) => { e.stopPropagation(); toggle(); }} aria-pressed={on}
            className={act + (on ? 'bg-indigo-600 border-indigo-600 text-white' : BTN_OFF)}><CompareIcon className="w-3.5 h-3.5" />{on ? TXT.selected[i] : TXT.compareB[i]}</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); open(); }}
            className={act + 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-400/30 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100'}><InfoIcon className="w-3.5 h-3.5" />{TXT.details[i]}</button>
        </div>
      </div>
      <div className={'rounded-lg border p-2 text-[12px] grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 ' + INSET}>
        {d.dose.map((x, k) => {
          const res = /^Resist/.test(x[0]);
          return (
            <React.Fragment key={k}>
              {res && <div className="col-span-2 border-t border-dashed border-slate-300 dark:border-slate-600" />}
              <div className={'whitespace-nowrap font-bold ' + (res ? MUTED : '')}>{!res && <RouteIcons label={x[0]} lang={lang} />}{x[0]}</div>
              <div>{x[1]}</div>
            </React.Fragment>
          );
        })}
      </div>
      {hasFx && <div className="flex flex-wrap items-start gap-1.5"><span className={lab}>{TXT.fxS[i]}:</span><Effects d={d} /></div>}
      {serious.length > 0 && <div className="flex flex-wrap items-start gap-1.5"><span className={lab}>{TXT.seSerious[i]}:</span><Cautions d={d} lang={lang} /></div>}
      {!compact && common.length > 0 && <div className="text-[12px] text-slate-600 dark:text-slate-300"><span className={lab}>{TXT.seCommon[i]}:</span> {common.map(x => SE[x][i]).join(' · ')}</div>}
      {!compact && (
        <div className="pt-2.5 border-t border-slate-200 dark:border-[#263449] flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-1"><span className={lab + ' mr-0.5'}>{TXT.avail[i]}:</span><CountryChips d={d} lang={lang} /><NlemChip d={d} lang={lang} /></div>
        </div>
      )}
    </div>
  );
}

function Row({ d, lang, on, toggle, open }) {
  return (
    <div onClick={open} className={'rounded-xl border shadow-sm p-3 cursor-pointer flex items-start gap-3 ' + SURF + (on ? ' ring-2 ring-indigo-500' : '')}>
      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-3">
        <div className="sm:w-56 shrink-0">
          <div className="flex flex-wrap items-center gap-1.5"><span className={'font-extrabold ' + CLS[d.cls].txt}>{d.name}</span><ClassChip c={d.cls} lang={lang} /></div>
          <BrandLine d={d} lang={lang} />
          <div className="flex flex-wrap gap-1 mt-0.5"><SiteChips d={d} lang={lang} lbl /><NlemChip d={d} lang={lang} /></div>
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
          <th className={th + ' sticky left-0 z-10 ' + INSET}>{TXT.drugs[i]}</th><th className={th}>{TXT.byClass[i]}</th><th className={th}>{TXT.bySite[i]}</th><th className={th}>{TXT.brandsCol[i]}</th><th className={th + ' min-w-[200px]'}>{TXT.dose[i]}</th>
          {ELECTROLYTES.map(e => <th key={e.k} className={th}>{e.l}</th>)}<th className={th + ' min-w-[200px]'}>{TXT.se[i]}</th><th className={th}>{TXT.nlem[i]}</th><th className={th}>{TXT.avail[i]}</th><th className={th}></th>
        </tr></thead>
        <tbody>{rows.map(d => (
          <tr key={d.id} onClick={() => open(d.id)} className="border-t border-slate-200 dark:border-[#263449] cursor-pointer hover:bg-slate-50 dark:hover:bg-[#101a2b] align-top">
            <td className={'px-2 py-2 font-extrabold sticky left-0 z-10 whitespace-nowrap ' + SURF + ' ' + CLS[d.cls].txt}>{d.name}</td>
            <td className="px-2 py-2"><ClassChip c={d.cls} lang={lang} /></td>
            <td className="px-2 py-2"><div className="flex gap-1"><SiteChips d={d} lang={lang} /></div></td>
            <td className="px-2 py-2 min-w-[120px]"><BrandLine d={d} lang={lang} /></td>
            <td className="px-2 py-2">{d.dose.map((x, k) => <div key={k}><RouteIcons label={x[0]} lang={lang} /><b>{x[0]}</b> {x[1]}</div>)}</td>
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

// Filters are remembered between visits (guarded: storage can be blocked, and saved values are checked before use)
const SAVED = (() => { try { return JSON.parse(store.get('dg-filters', '{}')) || {}; } catch (e) { return {}; } })();
const savedList = (k, allowed, d) => (Array.isArray(SAVED[k]) ? SAVED[k].filter(x => allowed.includes(x)) : d);
const SAVED_FX = (() => { const o = {}; if (SAVED.fx && typeof SAVED.fx === 'object') ELECTROLYTES.forEach(e => { if (SAVED.fx[e.k] === 1 || SAVED.fx[e.k] === -1) o[e.k] = SAVED.fx[e.k]; }); return o; })();

function App() {
  const [lang, setLang] = useState(() => store.get('dg-lang', 'en'));
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [view, setView] = useState(() => store.get('dg-view', 'tile'));
  const [compact, setCompact] = useState(() => store.get('dg-compact', '0') === '1');
  const [q, setQ] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [classes, setClasses] = useState(() => savedList('classes', CLS_ORDER, []));
  const [fx, setFx] = useState(SAVED_FX);
  const [kid, setKid] = useState({ eg: '', liver: false, hk: false });
  const [meds, setMeds] = useState(() => new Set());
  const [ctry, setCtry] = useState(() => savedList('ctry', COUNTRIES, []));
  const [stSel, setStSel] = useState(() => savedList('st', ['current', 'past', 'never'], ['current']));
  const [nlemOnly, setNlemOnly] = useState(SAVED.nlem === true);
  const [sort, setSort] = useState(['name', 'class', 'site'].includes(SAVED.sort) ? SAVED.sort : 'class');
  const [sel, setSel] = useState(new Set());
  const [modal, setModal] = useState(null);
  // Closed on first load on a phone (under 640 px, Tailwind's sm); open on larger screens
  const [filtersOpen, setFiltersOpen] = useState(() => window.innerWidth >= 640);
  const [barH, setBarH] = useState(0);
  const barRef = React.useRef(null);
  const i = lang === 'th' ? 1 : 0;
  const t = (k) => TXT[k][i];

  useEffect(() => { document.documentElement.classList.toggle('dark', dark); store.set('dg-theme', dark ? 'dark' : 'light'); }, [dark]);
  useEffect(() => { store.set('dg-lang', lang); document.documentElement.lang = lang; document.title = t('title'); }, [lang]);
  useEffect(() => { store.set('dg-view', view); }, [view]);
  useEffect(() => { store.set('dg-compact', compact ? '1' : '0'); }, [compact]);
  useEffect(() => { store.set('dg-filters', JSON.stringify({ classes, fx, ctry, st: stSel, nlem: nlemOnly, sort })); }, [classes, fx, ctry, stSel, nlemOnly, sort]);
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
      && (!s || (d.name + ' ' + CLS[d.cls].en + ' ' + d.target + ' ' + COUNTRIES.map(c => brandsOf(d, c) || '').join(' ')).toLowerCase().includes(s)));
    const key = { name: (d) => d.name, class: (d) => CLS_ORDER.indexOf(d.cls), site: (d) => SEGS.indexOf(d.sites[0]) }[sort];
    return [...r].sort((a, b) => (key(a) > key(b) ? 1 : key(a) < key(b) ? -1 : a.name.localeCompare(b.name)));
  }, [q, classes, fx, ctry, stSel, nlemOnly, sort]);

  const toggle = (id) => setSel(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
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
    ['kid', t('kid'), 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 dark:border-amber-400/30 dark:text-amber-300', ActivityIcon, () => setModal({ t: 'kid' })],
    ['inter', t('inter'), 'bg-fuchsia-50 hover:bg-fuchsia-100 border-fuchsia-200 text-fuchsia-700 dark:bg-fuchsia-500/10 dark:hover:bg-fuchsia-500/20 dark:border-fuchsia-400/30 dark:text-fuchsia-300', WarnIcon, () => setModal({ t: 'inter' })],
    ['ind', t('ind'), 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 dark:border-indigo-400/30 dark:text-indigo-300', ClipboardIcon, () => setModal({ t: 'ind' })],
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
          <DonateButton isTh={lang === 'th'} />
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
            <FxGrid fx={fx} toggleFx={toggleFx} t={t} />
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
            <div className="shrink-0 flex items-center gap-1.5">
            {view === 'tile' && <button type="button" onClick={() => setCompact(v => !v)} aria-pressed={compact} title={t('compactTitle')}
              className={'inline-flex items-center h-6 md:h-7 px-2 rounded-md border shadow-sm text-[11px] font-bold whitespace-nowrap transition-colors ' + (compact ? BTN_ON : BTN_OFF)}>{t('compactT')}</button>}
            <button type="button" onClick={() => setModal({ t: 'key' })} title={t('keyTitle')} aria-haspopup="dialog"
              className={'shrink-0 inline-flex items-center gap-1 h-6 md:h-7 px-2 rounded-md border shadow-sm text-[11px] font-bold whitespace-nowrap transition-colors ' + BTN_OFF}>
              <HelpIcon className="w-3 h-3" />{t('key')}
            </button>
            </div>
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
          {view === 'tile' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{rows.map(d => <Tile key={d.id} d={d} lang={lang} compact={compact} on={sel.has(d.id)} toggle={() => toggle(d.id)} open={() => open(d.id)} />)}</div>}
          {view === 'list' && <div className="space-y-2">{rows.map(d => <Row key={d.id} d={d} lang={lang} on={sel.has(d.id)} toggle={() => toggle(d.id)} open={() => open(d.id)} />)}</div>}
          {view === 'table' && rows.length > 0 && <TableView rows={rows} lang={lang} sel={sel} toggle={toggle} open={open} />}
          <ReferencesSection lang={lang} />
        </main>
      </div>

      {sel.size > 0 && !modal && (
        <div className={'fixed bottom-0 left-0 right-0 z-40 border-t px-3 py-2 flex items-center justify-center gap-2 shadow-lg ' + SURF}>
          <span className="text-xs font-bold">{sel.size} {t('nsel')}</span>
          <button type="button" onClick={() => setModal({ t: 'mech' })} className="rounded-lg border px-3 py-1.5 text-xs font-bold bg-indigo-600 text-white border-indigo-600 inline-flex items-center gap-1.5"><NephronIcon className="w-3.5 h-3.5" />{t('mech')}</button>
          {sel.size > 1 && <button type="button" onClick={() => setModal({ t: 'cmp' })} className="rounded-lg border px-3 py-1.5 text-xs font-bold bg-indigo-600 text-white border-indigo-600 inline-flex items-center gap-1.5"><CompareIcon className="w-3.5 h-3.5" />{t('cmp')}</button>}
          <button type="button" onClick={() => setSel(new Set())} className={'rounded-lg border px-3 py-1.5 text-xs font-bold ' + BTN_OFF}>{t('clear')}</button>
        </div>
      )}

      {modal && modal.t === 'detail' && <DetailModal d={DRUG[modal.id]} lang={lang} onClose={() => setModal(null)} showOne={(id) => showSet([id])} onInter={(id) => setModal({ t: 'inter', focus: id })} />}
      {modal && modal.t === 'mech' && <MechanismModal sel={sel} toggle={toggle} clear={() => setSel(new Set())} lang={lang} fx={fx} toggleFx={toggleFx} onClose={() => setModal(null)} />}
      {modal && modal.t === 'resist' && <ResistanceModal lang={lang} onClose={() => setModal(null)} showCombo={showSet} />}
      {modal && modal.t === 'kid' && <KidneyModal lang={lang} onClose={() => setModal(null)} open={open} st={kid} setSt={setKid} />}
      {modal && modal.t === 'inter' && <InteractionModal key={modal.focus || 'all'} focus={modal.focus} lang={lang} onClose={() => setModal(null)} open={open} meds={meds} setMeds={setMeds} />}
      {modal && modal.t === 'cmp' && <CompareModal ids={[...sel]} lang={lang} onClose={() => setModal(null)} />}
      {modal && modal.t === 'ind' && <IndicationModal lang={lang} onClose={() => setModal(null)} open={open} />}
      {modal && modal.t === 'conv' && <ConvertModal lang={lang} onClose={() => setModal(null)} />}
      {modal && modal.t === 'key' && <KeyModal lang={lang} onClose={() => setModal(null)} />}
      {modal && modal.t === 'log' && <ChangelogModal lang={lang} onClose={() => setModal(null)} />}
      {modal && modal.t === 'disc' && <DisclaimerModal lang={lang} onClose={() => setModal(null)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
