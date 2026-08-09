/*
 * CloseDose — ABP General Pediatrics Board Prep
 * Cram sheet + differentiation tables.
 *
 * CRAM: dense, pure-recall material — the numbers, ages, criteria, windows,
 *       and first-line drugs that are answers rather than reasoning.
 * DIFF: side-by-side discriminators. Each carries a "tell" — the single
 *       feature that decides the question when two diagnoses look alike.
 *
 * Educational use only. Verify against current guidelines.
 */

/* global window */

/* ================================================================== *
 * CRAM SHEET
 * Each section: { t: title, note?: string, blocks: [...] }
 * Block kinds: {k:'list', t?, items:[]} | {k:'table', t?, cols:[], rows:[[]]}
 * ================================================================== */

const CRAM = [
  {
    id: 'windows',
    t: 'Time windows — where delay is the wrong answer',
    note: 'When a stem gives you a clock, the clock is the question. These are the intervals ABP builds vignettes around.',
    blocks: [
      {
        k: 'table',
        cols: ['Window', 'Condition', 'What must happen'],
        rows: [
          ['<b>Immediately</b>', 'Anaphylaxis', 'IM epinephrine 0.01 mg/kg (max 0.5) anterolateral thigh — before antihistamine or steroid'],
          ['<b>Immediately</b>', 'Cerebral edema in DKA', 'Hypertonic saline or mannitol <i>before</i> imaging'],
          ['<b>Immediately</b>', 'Adrenal crisis', 'Fluids, dextrose, stress-dose hydrocortisone before confirmatory testing'],
          ['<b>Immediately</b>', 'Congenital hypothyroidism', 'Levothyroxine on the abnormal screen — do not wait for confirmation'],
          ['<b>&lt;1 hour</b>', 'Febrile neutropenia / septic shock', 'Blood culture then broad-spectrum antibiotics'],
          ['<b>&lt;2 hours</b>', 'Esophageal button battery', 'Emergent endoscopic removal (honey en route if &gt;12 mo, &lt;12 h)'],
          ['<b>&lt;6 hours</b>', 'Testicular torsion', 'OR — do not delay for ultrasound if classic'],
          ['<b>&lt;8 hours</b>', 'Acetaminophen overdose', 'N-acetylcysteine (level at ≥4 h on the nomogram)'],
          ['<b>&lt;12 hours</b>', 'Maternal HBsAg+', 'Hepatitis B vaccine <b>and</b> HBIG'],
          ['<b>&lt;24 hours</b>', 'Any jaundice', 'Jaundice in the first 24 h is always pathologic — Coombs, CBC, smear, retic'],
          ['<b>&lt;72 hours</b>', 'HIV PEP; forensic evidence', 'Start PEP within 72 h (28-day course); evidence collection generally ≤72 h'],
          ['<b>&lt;3–5 days</b>', 'Varicella exposure, healthy susceptible', 'Vaccine within 3–5 days (VariZIG ≤10 days if high-risk)'],
          ['<b>&lt;5 days</b>', 'Emergency contraception', 'Copper IUD most effective; ulipristal ≤120 h; levonorgestrel ≤72 h'],
          ['<b>&lt;10 days</b>', 'Kawasaki disease', 'IVIG + aspirin — drops aneurysm risk ~25% → &lt;5%'],
          ['<b>&lt;14 days</b>', 'Rabies PEP', 'Wound wash + RIG infiltrated into wound + vaccine series (start ASAP)'],
          ['<b>&lt;60 days</b>', 'Biliary atresia', 'Kasai portoenterostomy — best outcomes before 60 days of life'],
          ['<b>2 weeks</b>', 'Any jaundice persisting', 'Fractionate the bilirubin — direct &gt;1.0 is never physiologic'],
          ['<b>14 wk 6 d / 8 mo</b>', 'Rotavirus vaccine', 'First dose by 14 wk 6 d; final dose by 8 mo 0 d'],
          ['<b>6–18 months</b>', 'Cryptorchidism', 'Orchiopexy; refer if undescended at 6 months corrected'],
          ['<b>9 days</b>', 'Strep pharyngitis', 'Antibiotics started within 9 days of onset still prevent rheumatic fever']
        ]
      }
    ]
  },

  {
    id: 'milestones',
    t: 'Developmental milestones — by age',
    note: 'Correct for prematurity until 24 months. Loss of any acquired skill at any age is urgent.',
    blocks: [
      {
        k: 'table',
        cols: ['Age', 'Gross motor', 'Fine motor', 'Language', 'Social / cognitive'],
        rows: [
          ['<b>2 mo</b>', 'Lifts head 45°', 'Follows past midline', 'Coos', 'Social smile'],
          ['<b>4 mo</b>', 'Rolls front→back, head steady', 'Reaches, hands to midline', 'Laughs', 'Recognizes caregiver'],
          ['<b>6 mo</b>', 'Sits tripod, rolls both ways', 'Transfers hand to hand, raking', 'Babbles', 'Stranger awareness begins'],
          ['<b>9 mo</b>', 'Sits alone, crawls, pulls to stand', 'Immature pincer', '"Mama/dada" <i>non</i>specific', 'Object permanence, waves bye'],
          ['<b>12 mo</b>', 'Cruises, first steps', 'Mature pincer, releases', '1–3 words, "mama" specific', '1-step command <i>with</i> gesture'],
          ['<b>15 mo</b>', 'Walks well', 'Scribbles, 2-block tower', '4–6 words', 'Drinks from cup, points'],
          ['<b>18 mo</b>', 'Runs', '4-block tower, spoon', '10–25 words, body parts', 'Removes clothing, pretend play'],
          ['<b>24 mo</b>', 'Jumps, kicks, stairs 2/step', '6-block tower, copies line', '≥50 words, 2-word phrases, <b>50% intelligible</b>', 'Parallel play'],
          ['<b>3 yr</b>', 'Tricycle, stairs alternating', 'Copies <b>circle</b>, 3-part person', '3-word sentences, <b>75% intelligible</b>', 'Knows age &amp; sex, shares'],
          ['<b>4 yr</b>', 'Hops on one foot', 'Copies <b>cross</b>/square', '4-word sentences, <b>100% intelligible</b>', 'Cooperative play, tells stories'],
          ['<b>5 yr</b>', 'Skips', 'Copies <b>triangle</b>, prints name', 'Counts to 10, full sentences', 'Ties shoes (5–6 yr)']
        ]
      },
      {
        k: 'list', t: 'Red flags — treat as absolutes',
        items: [
          'No <b>social smile</b> by 3 months',
          'No <b>babbling</b> / no reciprocal vocalizing by 9 months',
          'No <b>single words</b> by 15–18 months',
          'No <b>2-word phrases</b> by 24 months',
          '<b>Loss of any previously acquired skill, at any age</b> — never "reassure and recheck"',
          'Hand preference <b>before 18 months</b> (suggests hemiparesis)',
          'Persistent fisting past 3 months; persistent primitive reflexes'
        ]
      }
    ]
  },

  {
    id: 'ages',
    t: 'Screening ages — the ages are the answer',
    blocks: [
      {
        k: 'table',
        cols: ['Screen', 'When'],
        rows: [
          ['Developmental (standardized tool)', '<b>9, 18, 30 months</b> (surveillance every visit)'],
          ['Autism (M-CHAT-R/F)', '<b>18 and 24 months</b>'],
          ['Lead', '<b>12 and 24 months</b> (universal if Medicaid / high-prevalence area)'],
          ['Hemoglobin (anemia)', '<b>12 months</b>'],
          ['Lipids — universal', '<b>9–11 years</b> and again <b>17–21 years</b>'],
          ['HIV', '<b>Once between 15 and 18 years</b>'],
          ['Depression (PHQ-A)', '<b>Annually, 12–21 years</b>'],
          ['Blood pressure', '<b>Annually from age 3</b> (every visit if obesity, renal, diabetes, coarctation)'],
          ['Vision — instrument/photoscreen', 'From <b>12 months</b>; formal acuity at <b>4–5 years</b>'],
          ['Hearing', 'Newborn, then <b>4, 5, 6, 8, 10 years</b>'],
          ['Maternal postpartum depression', '<b>1, 2, 4, and 6-month infant visits</b>'],
          ['Cervical cancer (Pap)', '<b>Age 21</b> — regardless of sexual debut'],
          ['Chlamydia / gonorrhea', 'Annually, all sexually active females &lt;25'],
          ['Type 2 diabetes', 'From <b>age 10 or puberty</b> if BMI ≥85th + risk factors'],
          ['Dyslipidemia — targeted', 'From age 2 if family history / risk factors'],
          ['Transcranial Doppler (sickle cell)', '<b>Annually, ages 2–16</b>'],
          ['Slit lamp (ANA+ oligoarticular JIA)', '<b>Every 3 months</b>']
        ]
      },
      {
        k: 'list', t: 'Supplements',
        items: [
          '<b>Vitamin D 400 IU/day</b> — all breastfed/partially breastfed infants from the first days; 600 IU/day from 12 months',
          '<b>Iron 1 mg/kg/day from 4 months</b> — exclusively breastfed term infants (preterm: 2 mg/kg/day from 1 month)',
          '<b>Fluoride</b> — from 6 months if water is deficient',
          '<b>No honey &lt;12 months</b> (botulism) · <b>no cow\'s milk &lt;12 months</b> · <b>no juice &lt;12 months</b>, ≤4 oz/day ages 1–3',
          'Whole milk 12–24 months, limited to <b>16–24 oz/day</b>'
        ]
      }
    ]
  },

  {
    id: 'vaccines',
    t: 'Immunization rules',
    blocks: [
      {
        k: 'list', t: 'True contraindications',
        items: [
          'Anaphylaxis to a prior dose or vaccine component',
          '<b>Live vaccines:</b> severe immunodeficiency, pregnancy, high-dose steroids (≥2 mg/kg/day or ≥20 mg/day prednisone for <b>≥14 days</b>)',
          '<b>Encephalopathy within 7 days</b> of a pertussis-containing vaccine → no further pertussis',
          '<b>Rotavirus:</b> history of intussusception, or SCID'
        ]
      },
      {
        k: 'list', t: 'Precautions to DTaP (weigh, do not reflexively withhold)',
        items: [
          'Temperature ≥40.5 °C within 48 h',
          'Hypotonic-hyporesponsive episode',
          'Persistent inconsolable crying ≥3 h within 48 h',
          'Seizure within 3 days of a prior dose'
        ]
      },
      {
        k: 'list', t: 'NOT contraindications — the tested half',
        items: [
          'Mild illness ± low-grade fever',
          'Current antibiotic use',
          'Breastfeeding',
          'Prematurity — vaccinate by <b>chronologic</b> age',
          '<b>Egg allergy of any severity + influenza vaccine</b> — give the age-appropriate vaccine, no special precautions',
          'Pregnant or immunosuppressed household contact',
          'Family history of an adverse event',
          'A seizure with a known, resolved cause and a normal neurologic exam'
        ]
      },
      {
        k: 'list', t: 'Spacing and special situations',
        items: [
          '<b>MMR and varicella:</b> same day, or separated by <b>≥28 days</b>',
          'After <b>IVIG / blood products:</b> defer MMR and varicella (up to 11 months depending on product)',
          '<b>Hepatitis B:</b> birth dose for all within 24 h. Mother HBsAg+ → vaccine <b>+ HBIG within 12 h</b>. Unknown → vaccine within 12 h, send serology, HBIG within 7 days if positive',
          '<b>Asplenia / sickle cell / complement deficiency / eculizumab</b> → meningococcal ACWY <i>and</i> B, pneumococcal, Hib per high-risk schedules',
          '<b>MenACWY</b> at 11–12 with booster at 16; <b>MenB</b> shared decision-making at 16–23'
        ]
      }
    ]
  },

  {
    id: 'criteria',
    t: 'Criteria sets — memorize as blocks',
    blocks: [
      {
        k: 'table',
        cols: ['Rule', 'Content'],
        rows: [
          ['<b>Kawasaki</b>', 'Fever ≥5 d + <b>4 of 5</b>: non-exudative conjunctivitis (limbal sparing) · oral changes · polymorphous rash · extremity changes · <b>unilateral</b> cervical node ≥1.5 cm. Fewer criteria + persistent fever + high inflammatory markers = <i>incomplete</i> KD — still treat.'],
          ['<b>Jones (ARF)</b>', 'Evidence of preceding strep + 2 major, or 1 major + 2 minor. Major: <b>J</b>oints (migratory) · <b>O</b> carditis · <b>N</b>odules · <b>E</b>rythema marginatum · <b>S</b>ydenham chorea (alone is sufficient).'],
          ['<b>Kocher (septic hip)</b>', 'Fever &gt;38.5 °C · non-weight-bearing · ESR ≥40 · WBC &gt;12,000. <b>3–4 criteria → aspirate.</b>'],
          ['<b>Lower-risk BRUE (all must be true)</b>', 'Age &gt;60 d · GA ≥32 wk and PCA ≥45 wk · <b>first</b> event · &lt;1 min · <b>no CPR by trained provider</b> · reassuring history and exam.'],
          ['<b>PECARN — CT not indicated</b>', '<b>&lt;2 yr:</b> normal mental status · no scalp hematoma except frontal · LOC &lt;5 s · non-severe mechanism · no palpable skull fracture · acting normally.<br><b>≥2 yr:</b> normal mental status · no LOC · no vomiting · non-severe mechanism · no basilar skull fracture signs · no severe headache.'],
          ['<b>Simple febrile seizure</b>', '6 mo–5 yr · <b>generalized</b> · &lt;15 min · <b>one</b> in 24 h · neurologically normal. → No LP, no EEG, no imaging, no routine labs.'],
          ['<b>Acute bacterial sinusitis</b> (any one)', '<b>Persistent</b> ≥10 d without improvement · <b>Severe</b> fever ≥39 °C + purulent discharge ≥3 d · <b>Worsening</b> ("double sickening"). No imaging needed.'],
          ['<b>Acute otitis media</b>', 'Moderate-severe <b>bulging</b> TM · <i>or</i> new otorrhea not from OE · <i>or</i> mild bulging + recent otalgia/intense erythema. <b>Effusion alone is not AOM.</b>'],
          ['<b>AOM observation option</b>', 'Allowed: ≥6 mo unilateral non-severe with reliable follow-up; ≥24 mo bilateral non-severe. <b>Always treat</b> if &lt;6 mo, severe (≥39 °C or moderate-severe otalgia), or otorrhea.'],
          ['<b>Tympanostomy tubes</b>', 'Bilateral OME ≥3 months <b>with hearing loss</b>; or recurrent AOM (≥3 in 6 mo, or ≥4 in 12 mo with one recent).'],
          ['<b>ADHD (DSM-5)</b>', '≥6 symptoms (≥5 if age ≥17) · onset <b>before age 12</b> · <b>≥2 settings</b> · <b>≥6 months</b> · functional impairment. Ages 4–5: behavioral therapy <b>first</b>.'],
          ['<b>Anorexia — admission triggers</b>', 'HR &lt;50 day / &lt;45 night · SBP &lt;90 · orthostatic change · temp &lt;96 °F · &lt;75% median BMI · arrhythmia · electrolyte derangement.'],
          ['<b>TEN-4-FACESp (bruising)</b>', 'Concerning if &lt;4 yr on <b>T</b>orso/<b>E</b>ar/<b>N</b>eck · <b>any</b> bruise &lt;4 months · <b>F</b>renulum, <b>A</b>ngle of jaw, <b>C</b>heek, <b>E</b>yelid, <b>S</b>ubconjunctiva · any <b>p</b>atterned bruise.'],
          ['<b>Anaphylaxis</b> (any one)', 'Skin/mucosa + (respiratory <i>or</i> hypotension) · <b>or</b> ≥2 organ systems after likely allergen · <b>or</b> hypotension after known allergen. <b>Skin findings absent in up to 20%.</b>'],
          ['<b>Delayed puberty</b>', 'No breast by <b>13</b> · no menarche by <b>15</b> (or &gt;3 yr after thelarche) · no testicular enlargement by <b>14</b>.'],
          ['<b>Precocious puberty</b>', 'Before <b>8 in girls</b>, <b>9 in boys</b>. In boys → brain MRI.'],
          ['<b>POTS</b>', 'HR rise <b>≥40 bpm</b> in adolescents within 10 min of standing <b>without</b> orthostatic hypotension.'],
          ['<b>Metabolic syndrome / obesity</b>', 'BMI ≥85th = overweight · ≥95th = obesity · ≥120% of 95th = severe obesity.']
        ]
      }
    ]
  },

  {
    id: 'firstline',
    t: 'First-line drug by condition',
    blocks: [
      {
        k: 'table',
        cols: ['Condition', 'First-line', 'Note'],
        rows: [
          ['Acute otitis media', 'Amoxicillin 80–90 mg/kg/day', 'Amox-clav if abx &lt;30 d, purulent conjunctivitis, or recurrent'],
          ['Strep pharyngitis', 'Penicillin or amoxicillin ×10 d', 'Prevents ARF, <b>not</b> PSGN'],
          ['Community-acquired pneumonia', 'High-dose amoxicillin', 'Macrolide for school-age <i>Mycoplasma</i>'],
          ['Sinusitis', 'Amoxicillin ± clavulanate', 'No imaging'],
          ['Croup', '<b>Dexamethasone — every severity</b>', 'Racemic epi if stridor at rest, then observe 2–4 h'],
          ['Bronchiolitis', '<b>Supportive only</b>', 'No bronchodilator, steroid, antibiotic, CXR, or continuous pulse ox'],
          ['Asthma — any persistent', 'Low-dose inhaled corticosteroid', 'LABA never as monotherapy; SMART for moderate-severe ≥4 yr'],
          ['Anaphylaxis', 'IM epinephrine', 'Antihistamine/steroid are adjuncts only'],
          ['Allergic rhinitis (persistent)', 'Intranasal corticosteroid', 'Most effective single agent'],
          ['Otitis externa', 'Topical drops ± wick', 'Systemic only if beyond the canal'],
          ['Pertussis', 'Azithromycin', 'Plus <b>all</b> household contacts regardless of immunization'],
          ['RMSF / Lyme', '<b>Doxycycline, any age</b>', 'Treat RMSF on suspicion — do not await serology'],
          ['Meningitis &gt;1 mo', 'Vancomycin + ceftriaxone', 'Dexamethasone proven for Hib'],
          ['Neonatal sepsis ≤28 d', 'Ampicillin + gentamicin', 'Add cefotaxime/ceftazidime for meningitis, ± acyclovir'],
          ['Bite (animal/human)', 'Amoxicillin-clavulanate', '<i>Pasteurella</i>, <i>Eikenella</i>'],
          ['Tinea capitis', '<b>Oral</b> griseofulvin or terbinafine', 'Topicals do not penetrate the hair shaft'],
          ['Scabies', 'Permethrin 5% — <b>patient + all contacts</b>', 'Itch persists 2–4 weeks after cure'],
          ['Eczema herpeticum', 'Systemic acyclovir', 'Urgent'],
          ['Absence epilepsy', '<b>Ethosuximide</b>', 'Better cognitive profile than valproate'],
          ['Infantile spasms', 'ACTH or high-dose prednisolone', '<b>Vigabatrin</b> if tuberous sclerosis'],
          ['Status epilepticus', 'Benzodiazepine → levetiracetam / fosphenytoin / valproate', 'Second-line agents equivalent (ESETT)'],
          ['Pediatric depression', '<b>Fluoxetine</b> (escitalopram ≥12)', 'SSRI + CBT beats either alone'],
          ['ADHD ≥6 yr', 'Stimulant + behavioral therapy', 'Ages 4–5: behavioral therapy first'],
          ['Anorexia nervosa', 'Family-based (Maudsley) treatment', 'Once medically stable; bupropion contraindicated'],
          ['Graves disease', '<b>Methimazole</b>', 'Never PTU in children — hepatotoxicity'],
          ['Nephrotic syndrome 1–10 yr', 'Empiric corticosteroids', 'No biopsy if typical'],
          ['Infantile hemangioma needing treatment', 'Oral propranolol', 'Ulceration, function, high-risk site'],
          ['Functional constipation', 'Disimpaction → <b>months</b> of PEG maintenance', 'No abdominal radiograph to diagnose'],
          ['Enuresis', 'Alarm (best long-term cure)', 'Desmopressin for short-term needs'],
          ['Adolescent contraception', '<b>LARC</b>', 'No exam, Pap, or STI test required first']
        ]
      }
    ]
  },

  {
    id: 'doses',
    t: 'Doses and numbers worth memorizing',
    blocks: [
      {
        k: 'table',
        cols: ['Drug / parameter', 'Number'],
        rows: [
          ['Epinephrine IM (anaphylaxis)', '<b>0.01 mg/kg</b> of 1 mg/mL, max 0.3–0.5 mg, anterolateral thigh'],
          ['Amoxicillin — AOM', '<b>80–90 mg/kg/day</b> divided BID'],
          ['Dexamethasone — croup', '0.6 mg/kg (0.15–0.6), single dose'],
          ['Insulin infusion — DKA', '<b>0.05–0.1 units/kg/h</b> after 1–2 h of fluids. <b>No bolus, ever.</b>'],
          ['Fluid bolus — shock', '10–20 mL/kg isotonic, reassess for hepatomegaly/rales each time'],
          ['Maintenance fluid', '<b>Isotonic</b> (0.9% NaCl or LR) + dextrose. Holliday-Segar 100/50/20; hourly 4-2-1'],
          ['Burn resuscitation', '3–4 mL/kg per %TBSA LR over 24 h, half in first 8 h <b>from injury</b>, plus maintenance'],
          ['Sodium correction', '<b>≤0.5 mEq/L/h</b>, ≤10–12 mEq/L per 24 h (both directions)'],
          ['Hypernatremic dehydration', 'Correct over <b>48 hours</b>'],
          ['Defibrillation / cardioversion', 'Defib 2 → 4 J/kg; synchronized cardioversion 0.5–1 J/kg'],
          ['CPR — start compressions', 'HR &lt;60 with poor perfusion <b>despite</b> oxygenation and ventilation'],
          ['Sweat chloride', '<b>≥60 mmol/L</b> diagnostic; 30–59 intermediate'],
          ['TST cutoffs', '<b>≥5 mm</b> immunosuppressed/contact/abnormal CXR · <b>≥10 mm</b> &lt;4 yr, endemic, high-risk · <b>≥15 mm</b> everyone else'],
          ['UTI diagnosis', 'Pyuria <b>+ ≥50,000 CFU/mL</b> from cath or SPA (bag can only rule <i>out</i>)'],
          ['Spirometry reversibility', 'FEV₁ increase <b>≥12%</b> post-bronchodilator'],
          ['Scoliosis', 'Cobb &gt;10° = scoliosis · brace 25–45° if immature · surgery &gt;45–50°'],
          ['Coarctation gradient', 'Arm-to-leg SBP difference <b>&gt;20 mm Hg</b>'],
          ['Long QT', 'QTc <b>&gt;470 ms</b>'],
          ['SVT rates', '<b>&gt;220/min</b> infants · <b>&gt;180/min</b> children · fixed, no variability'],
          ['CCHD pulse-ox screen', 'Fails if any &lt;90%, or 90–94% both limbs or &gt;3% difference ×3'],
          ['Testicular enlargement (puberty onset)', '<b>≥4 mL</b> volume or &gt;2.5 cm length'],
          ['Blood pressure ≥13 yr', 'Elevated 120–129/&lt;80 · stage 1 ≥130/80 · stage 2 ≥140/90'],
          ['Familial hypercholesterolemia', 'LDL ≥190, or ≥160 with family history'],
          ['Mentzer index', 'MCV ÷ RBC — <b>&lt;13 thalassemia, &gt;13 iron deficiency</b>']
        ]
      }
    ]
  },

  {
    id: 'tox',
    t: 'Toxidromes and antidotes',
    blocks: [
      {
        k: 'table',
        cols: ['Agent', 'Tell', 'Antidote / treatment'],
        rows: [
          ['Acetaminophen', 'Asymptomatic early; AST up at 24–48 h', '<b>N-acetylcysteine</b>, Rumack-Matthew nomogram at ≥4 h'],
          ['Salicylate', 'Tinnitus, hyperpnea; <b>respiratory alkalosis + AG acidosis</b>', 'Urinary alkalinization, dialysis'],
          ['Tricyclic', '<b>Wide QRS</b>, seizures, hypotension', '<b>Sodium bicarbonate</b>'],
          ['Organophosphate', 'DUMBELS, salivation, miosis, bradycardia', '<b>Atropine</b> (titrate to dry secretions) + <b>pralidoxime</b>'],
          ['Iron', 'Hematemesis → quiescent phase → shock; radiopaque', '<b>Deferoxamine</b>'],
          ['Carbon monoxide', 'Whole family ill; <b>pulse ox falsely normal</b>', 'Carboxyhemoglobin level, 100% O₂, hyperbaric'],
          ['Clonidine', 'Looks like opioid; <b>naloxone barely works</b>', 'Supportive, atropine for bradycardia'],
          ['Opioid', 'Miosis, respiratory depression, somnolence', '<b>Naloxone</b>'],
          ['Sulfonylurea', '<b>Recurrent</b> hypoglycemia', 'Dextrose + <b>octreotide</b>'],
          ['Anticholinergic', 'Mad, red, dry, hot, blind; <b>mydriasis, tachycardia</b>', 'Supportive; physostigmine selectively'],
          ['Methemoglobinemia', 'Cyanosis <b>unresponsive to O₂</b>, chocolate blood, saturation gap', '<b>Methylene blue</b>'],
          ['Caustic', 'Drooling, oral burns', '<b>No emesis, no neutralization</b>; endoscopy 12–24 h'],
          ['Button battery (esophagus)', '<b>Double-ring / halo</b> sign on film', '<b>Emergent endoscopic removal</b>']
        ]
      },
      {
        k: 'list', t: '"One pill can kill" a toddler',
        items: ['Calcium channel blockers · TCAs · opioids (esp. methadone) · sulfonylureas · <b>clonidine</b> · camphor · toxic alcohols · theophylline']
      }
    ]
  },

  {
    id: 'buzz',
    t: 'Buzzword → diagnosis',
    blocks: [
      {
        k: 'table',
        cols: ['Stem phrase', 'Diagnosis'],
        rows: [
          ['Bilious emesis, any age', '<b>Malrotation with volvulus</b> → upper GI series'],
          ['Non-bilious projectile emesis, 3–6 wk, hungry', 'Pyloric stenosis (hypochloremic hypokalemic <b>alkalosis</b>)'],
          ['Currant jelly stool, lethargy between episodes', 'Intussusception → US target sign, air enema'],
          ['Painless brisk rectal bleeding, &lt;2 yr', 'Meckel diverticulum → technetium-99m scan'],
          ['No meconium in 48 h, explosive stool after rectal exam', 'Hirschsprung → suction rectal biopsy'],
          ['Acholic stools + direct hyperbilirubinemia', 'Biliary atresia → Kasai &lt;60 days'],
          ['Double bubble', 'Duodenal atresia (trisomy 21)'],
          ['Scaphoid abdomen, bowel sounds in chest', 'Diaphragmatic hernia — <b>intubate, do not bag-mask</b>'],
          ['Cyanosis at rest relieved by crying', 'Choanal atresia (CHARGE)'],
          ['Barky cough + steeple sign', 'Croup'],
          ['Drooling, tripoding, no cough, thumbprint', 'Epiglottitis — keep calm, go to OR'],
          ['Widened prevertebral soft tissue, &lt;5 yr', 'Retropharyngeal abscess'],
          ['Trismus, hot potato voice, uvular deviation', 'Peritonsillar abscess'],
          ['Unilateral foul nasal discharge, toddler', 'Nasal foreign body'],
          ['Nasal polyps in a child', '<b>Cystic fibrosis</b> until excluded'],
          ['Recurrent unilateral epistaxis, adolescent male', 'Juvenile nasopharyngeal angiofibroma — <b>do not biopsy</b>'],
          ['Absent red reflex / leukocoria', 'Retinoblastoma, cataract, ROP — <b>urgent ophtho</b>'],
          ['Pain with eye movement + proptosis', 'Orbital cellulitis → CT + IV abx'],
          ['Midline neck mass elevating with tongue protrusion', 'Thyroglossal duct cyst'],
          ['Sandpaper rash, Pastia lines, circumoral pallor', 'Scarlet fever'],
          ['Koplik spots', 'Measles — give <b>vitamin A</b>'],
          ['High fever 3–5 d, rash <i>as fever breaks</i>', 'Roseola (HHV-6)'],
          ['Slapped cheek → lacy reticular rash', 'Parvovirus B19'],
          ['Rash on wrists/ankles → central, + palms', 'RMSF → doxycycline now'],
          ['Erythema migrans', 'Lyme → doxycycline, no serology needed'],
          ['Fever ≥5 d + conjunctivitis + cracked lips + rash', 'Kawasaki → IVIG + aspirin, echo'],
          ['Periventricular calcifications', 'Congenital <b>CMV</b> (SNHL)'],
          ['Diffuse intracranial calcifications + chorioretinitis', 'Congenital <b>toxoplasmosis</b>'],
          ['Cataracts + PDA + blueberry muffin', 'Congenital rubella'],
          ['Snuffles + rash on palms/soles', 'Congenital syphilis'],
          ['Delayed umbilical cord separation, no pus', 'Leukocyte adhesion deficiency'],
          ['Catalase-positive abscesses (Serratia, Burkholderia, Aspergillus)', 'CGD → DHR assay'],
          ['Absent tonsils and lymph nodes, boy', 'X-linked agammaglobulinemia'],
          ['Eczema + thrombocytopenia with <b>small</b> platelets', 'Wiskott-Aldrich'],
          ['Cold abscesses, retained teeth, pneumatoceles', 'Hyper-IgE (Job)'],
          ['Hypocalcemic seizure + conotruncal heart defect', '22q11 / DiGeorge'],
          ['Gowers sign + calf pseudohypertrophy + CK in thousands', 'Duchenne'],
          ['Constipation → weak cry, ptosis, dilated pupils, infant', 'Infant botulism → <b>BabyBIG</b>'],
          ['Ascending weakness + areflexia + high CSF protein', 'Guillain-Barré'],
          ['Clustered flexor spasms on waking + regression', 'Infantile spasms → hypsarrhythmia'],
          ['Staring spells provoked by hyperventilation', 'Absence → 3-Hz spike-wave, ethosuximide'],
          ['≥6 café-au-lait + axillary freckling', 'NF1 → annual ophtho for optic glioma'],
          ['Ash-leaf macules + infantile spasms', 'Tuberous sclerosis → vigabatrin'],
          ['V1 port-wine stain', 'Sturge-Weber → glaucoma screening'],
          ['Herald patch → Christmas tree', 'Pityriasis rosea'],
          ['Palpable purpura buttocks/legs + <b>normal platelets</b>', 'HSP (IgA vasculitis)'],
          ['Quotidian fever + evanescent salmon rash', 'Systemic JIA (Still)'],
          ['Clockwork fever q4wk aborted by one steroid dose', 'PFAPA'],
          ['Heliotrope + Gottron papules + proximal weakness', 'Juvenile dermatomyositis'],
          ['Bloody diarrhea → anemia + low platelets + AKI', 'HUS — <b>no antibiotics</b>'],
          ['Cola urine 1–2 wk after pharyngitis, low C3', 'PSGN'],
          ['Gross hematuria <i>during</i> a URI, normal complement', 'IgA nephropathy'],
          ['Abdominal mass crossing midline + raccoon eyes', 'Neuroblastoma (VMA/HVA)'],
          ['Smooth abdominal mass not crossing midline, well child', 'Wilms — <b>do not palpate repeatedly</b>'],
          ['Sunburst periosteal reaction, metaphysis', 'Osteosarcoma'],
          ['Onion-skinning, diaphysis, fever', 'Ewing sarcoma'],
          ['Obese adolescent, knee pain, normal knee exam', '<b>SCFE</b> → frog-leg lateral, non-weight-bearing'],
          ['Hot showers relieve vomiting', 'Cannabinoid hyperemesis'],
          ['Upward lens dislocation + tall + arachnodactyly', 'Marfan → echo aortic root'],
          ['Downward lens dislocation + thrombosis + ID', 'Homocystinuria'],
          ['Neonatal hypotonia → later hyperphagia and obesity', 'Prader-Willi'],
          ['Supravalvular AS + hypercalcemia + overly friendly', 'Williams syndrome']
        ]
      }
    ]
  },

  {
    id: 'labs',
    t: 'Lab patterns that are the whole question',
    blocks: [
      {
        k: 'table',
        cols: ['Pattern', 'Means'],
        rows: [
          ['Hypochloremic <b>hypokalemic metabolic alkalosis</b> + paradoxical aciduria', 'Pyloric stenosis'],
          ['Hyponatremia <b>with hyperkalemia</b> + hypoglycemia, newborn', 'CAH salt-wasting / adrenal insufficiency'],
          ['Hyperammonemia + <b>respiratory alkalosis</b>, normal glucose, no acidosis', 'Urea cycle defect'],
          ['Anion-gap acidosis + <b>ketosis</b> + high ammonia', 'Organic acidemia'],
          ['<b>Hypoketotic</b> hypoglycemia after fasting', 'Fatty acid oxidation defect (MCAD)'],
          ['Low C3, normal C4, normalizes in 6–8 wk', 'PSGN (persistently low → MPGN or lupus)'],
          ['Low <b>C4</b> between attacks, no urticaria', 'Hereditary angioedema'],
          ['Prolonged <b>PTT only</b>, normal PT and platelets', 'Hemophilia'],
          ['Prolonged <b>PT and PTT</b>, normal platelets and fibrinogen, breastfed newborn', 'Vitamin K deficiency bleeding'],
          ['Isolated thrombocytopenia, everything else normal, well child', 'ITP — no marrow needed'],
          ['Severe anemia + <b>low</b> reticulocytes in sickle cell', 'Parvovirus aplastic crisis'],
          ['Severe anemia + <b>high</b> reticulocytes + big spleen', 'Splenic sequestration'],
          ['Microcytosis + <b>high</b> RDW + low ferritin', 'Iron deficiency'],
          ['Microcytosis + <b>normal</b> RDW + high RBC count', 'Thalassemia trait'],
          ['Elevated MCHC + spherocytes + <b>negative</b> Coombs', 'Hereditary spherocytosis'],
          ['Schistocytes + thrombocytopenia + AKI, <b>negative</b> Coombs', 'HUS'],
          ['Falling ESR + falling platelets + <b>ferritin in the thousands</b>', 'Macrophage activation syndrome'],
          ['K⁺↑ PO₄↑ uric acid↑ Ca²⁺↓ after chemo', 'Tumor lysis — <b>no calcium</b> if asymptomatic'],
          ['Hyponatremia + <b>concentrated</b> urine, euvolemic', 'SIADH → fluid restrict'],
          ['Normal first-morning urine protein, abnormal daytime', 'Orthostatic proteinuria — benign'],
          ['Urine pH &gt;5.5 with acidosis + hypokalemia + stones', 'Type 1 (distal) RTA'],
          ['CSF: high protein, <b>normal</b> cell count', 'Guillain-Barré (albuminocytologic dissociation)'],
          ['CK in the thousands, boy 2–5 yr', 'Duchenne']
        ]
      }
    ]
  },

  {
    id: 'stats',
    t: 'Statistics — the five that recur',
    blocks: [
      {
        k: 'list',
        items: [
          '<b>Sensitivity</b> = TP ÷ all diseased. High sensitivity + <b>negative</b> result <b>rules out</b> (SnNout) → screening.',
          '<b>Specificity</b> = TN ÷ all non-diseased. High specificity + <b>positive</b> result <b>rules in</b> (SpPin) → confirmation.',
          '<b>Prevalence changes predictive values, never sensitivity or specificity.</b> Lower prevalence → <b>PPV falls</b>, NPV rises. This is the most-tested statistical concept in the domain.',
          '<b>NNT = 1 ÷ absolute risk reduction.</b> 4% → 3% is ARR 1%, NNT 100 — even though the <i>relative</i> reduction is an impressive-sounding 25%.',
          '<b>95% CI crossing 1.0</b> (ratio) or <b>0</b> (difference) = not significant. Wider = less precise = smaller sample.',
          '<b>Type I (α)</b> = false positive, claiming an effect that isn\'t there. <b>Type II (β)</b> = false negative, missing a real one; power = 1 − β, raised by sample size.',
          '<b>Case-control</b> → odds ratio, good for rare disease, prone to <b>recall bias</b>. <b>Cohort</b> → relative risk and incidence. <b>Cross-sectional</b> → prevalence, no temporality.',
          '<b>Lead-time bias</b>: screening only appears to prolong survival by diagnosing earlier. <b>Length-time bias</b>: screening preferentially catches indolent disease.',
          '<b>Intention-to-treat</b> keeps everyone in their assigned group — preserves randomization, gives the conservative estimate.',
          '<b>Incidence</b> = new cases over time. <b>Prevalence</b> = existing cases now. A treatment that prolongs life without curing <b>raises prevalence, incidence unchanged</b>.',
          '<b>QI measures:</b> outcome (what the patient feels) · process (the step you performed) · balancing (what you broke elsewhere).',
          '<b>Special cause variation:</b> shift = ≥6 points one side of the median · trend = ≥5 consecutively rising/falling · any point beyond control limits.',
          '<b>RCA is retrospective</b> (after an event); <b>FMEA is prospective</b> (before implementation).',
          '<b>Safety hierarchy, weakest → strongest:</b> education → reminders → checklists → standardization → automation → <b>forcing functions</b>. Never pick "educate the staff."'
        ]
      }
    ]
  },

  {
    id: 'reassure',
    t: 'The reassurance list vs. the emergency list',
    note: 'ABP rewards clinical restraint — except when it does not. Knowing which list a finding belongs to answers a large share of questions outright.',
    blocks: [
      {
        k: 'list', t: 'Reassure and do nothing (workup options are distractors)',
        items: [
          'Erythema toxicum · transient neonatal pustular melanosis · milia · miliaria · neonatal acne',
          'Congenital dermal melanocytosis (document it)',
          'Still murmur · venous hum · peripheral pulmonic stenosis in a newborn',
          'Physiologic gynecomastia at Tanner 3–4',
          'Premature thelarche / adrenarche with normal velocity and bone age',
          'Orthostatic proteinuria',
          'Breath-holding spells (but check a hemoglobin — iron deficiency)',
          'Toddler\'s diarrhea in a thriving child',
          'Molluscum contagiosum',
          'Labial adhesions without obstruction',
          'Umbilical hernia in an infant',
          'Nasolacrimal duct obstruction with a white eye (&lt;12 months)',
          'Regression after a new sibling or family stressor',
          'Simple febrile seizure with a normal exam',
          '"Happy spitter" reflux with normal growth',
          'Post-scabetic pruritus for weeks after permethrin'
        ]
      },
      {
        k: 'list', t: 'Act now (observation options are the trap)',
        items: [
          'Absent red reflex / leukocoria',
          'Bilious emesis at any age',
          'Jaundice in the first 24 hours, or any direct hyperbilirubinemia',
          'Jaundice persisting past 2 weeks → fractionate',
          'Testicular torsion',
          'Suspected SCFE — make non-weight-bearing before imaging',
          'Fever ≥38.5 °C in sickle cell disease',
          'Fever in an infant ≤28 days',
          'Any bruise in an infant &lt;4 months, or a sentinel injury',
          'Retinal hemorrhages, metaphyseal or posterior rib fractures',
          'Pain with eye movement or proptosis',
          'Esophageal button battery',
          'Infantile spasms',
          'Loss of a developmental milestone',
          'Exertional syncope',
          'Anaphylaxis — epinephrine before anything else',
          'Bilateral nonpalpable testes in a newborn (CAH / DSD)'
        ]
      }
    ]
  }
];

/* ================================================================== *
 * DIFFERENTIATION TABLES
 * { id, d: domainId, t, cols:[colA, colB, ...], rows:[[feature, a, b, ...]],
 *   tell: "the single deciding feature" }
 * ================================================================== */

const DIFFS = [
  /* --- Neonatal --- */
  {
    id: 'scalp', d: 2, t: 'Caput vs Cephalohematoma vs Subgaleal hemorrhage',
    cols: ['Caput succedaneum', 'Cephalohematoma', 'Subgaleal hemorrhage'],
    rows: [
      ['Crosses sutures?', '<b>Yes</b>', '<b>No</b> (subperiosteal)', '<b>Yes</b>'],
      ['Timing', 'Present at birth', 'Appears/enlarges after birth', 'Enlarges over hours'],
      ['Feel', 'Soft, pitting', 'Firm, fluctuant', '<b>Boggy, shifting, expanding</b>'],
      ['Danger', 'None', 'Jaundice', '<b>Hemorrhagic shock</b> — can hold entire blood volume'],
      ['Association', 'Vaginal delivery', 'Instrumented delivery', '<b>Vacuum extraction</b>']
    ],
    tell: 'Crossing sutures + expanding + tachycardia = subgaleal, the only one that kills. Crossing but stable and present at birth = caput. Not crossing = cephalohematoma.'
  },
  {
    id: 'jaundice', d: 2, t: 'Breastfeeding vs Breast milk jaundice vs Pathologic',
    cols: ['Breastfeeding ("not enough")', 'Breast milk', 'Pathologic'],
    rows: [
      ['Onset', 'First week (day 2–5)', '<b>Day 5–7</b>, peaks ~2 wk', '<b>&lt;24 h</b>, or direct at any time'],
      ['Mechanism', 'Inadequate intake, ↑ enterohepatic circulation', 'Milk factors inhibit conjugation', 'Hemolysis, sepsis, obstruction'],
      ['Infant', 'Losing weight, few stools', '<b>Thriving</b>', 'Variable, may be ill'],
      ['Bilirubin type', 'Unconjugated', 'Unconjugated', 'Unconjugated <i>or</i> <b>conjugated</b>'],
      ['Management', '<b>More frequent, more effective feeding</b> + lactation support', '<b>Continue breastfeeding</b>', 'Coombs/CBC/smear; fractionate']
    ],
    tell: 'Weight trajectory separates the first two: losing weight = not enough milk (feed more, never stop). Thriving at 2 weeks = breast milk jaundice. Any direct fraction >1.0 leaves this table entirely — think biliary atresia and the 60-day Kasai window.'
  },
  {
    id: 'respdistress', d: 2, t: 'Neonatal respiratory distress — by timing and film',
    cols: ['TTN', 'RDS', 'Meconium aspiration'],
    rows: [
      ['Gestation', 'Term / late preterm', '<b>Preterm</b>', 'Term / <b>post</b>-term'],
      ['Onset & course', 'Minutes–hours, <b>resolves 24–72 h</b>', 'Worsens over first hours', 'At birth, may worsen'],
      ['Film', 'Perihilar streaking, <b>fluid in fissures</b>', '<b>Ground glass + air bronchograms</b>, low volumes', 'Coarse patchy infiltrates, <b>hyperinflation</b>'],
      ['Risk factor', '<b>C-section</b>, no labor', 'Prematurity, no antenatal steroids', 'Meconium-stained fluid'],
      ['Treatment', 'Supportive O₂', 'CPAP, <b>surfactant</b>', 'Supportive; watch PPHN, pneumothorax']
    ],
    tell: 'Gestational age is the first discriminator, the film is the second. Preterm + ground glass = RDS. Term + resolves in a day or two = TTN. Post-term + stained fluid + hyperinflation = meconium.'
  },

  /* --- ID / rash --- */
  {
    id: 'rashfever', d: 4, t: 'Fever + rash — by the relationship between the two',
    cols: ['Roseola', 'Measles', 'Parvovirus B19', 'Scarlet fever'],
    rows: [
      ['Rash timing', '<b>Appears as fever breaks</b>', 'With peak illness', '<b>After</b> illness (already non-contagious)', 'With fever'],
      ['Prodrome', 'High fever 3–5 d, well-appearing', '<b>Cough, coryza, conjunctivitis</b> + Koplik', 'Mild or none', 'Sore throat'],
      ['Rash look', 'Blanching macules, trunk', 'Confluent, <b>cephalocaudal</b>', '<b>Slapped cheek</b> → lacy reticular', '<b>Sandpaper</b>, Pastia lines, circumoral pallor'],
      ['Complication', 'Febrile seizure', 'Pneumonia, encephalitis, SSPE', '<b>Aplastic crisis</b>, hydrops, arthritis', 'ARF (prevented by abx), PSGN (not)'],
      ['Treatment', 'Supportive', '<b>Vitamin A</b>', 'Supportive', 'Penicillin / amoxicillin']
    ],
    tell: 'Ask when the rash appeared relative to the fever. After defervescence in a well infant = roseola. With the 3 C\'s = measles. Slapped cheek with the fever already gone = parvovirus.'
  },
  {
    id: 'kdmisc', d: 4, t: 'Kawasaki vs MIS-C vs Toxic shock vs Scarlet fever',
    cols: ['Kawasaki', 'MIS-C', 'Toxic shock'],
    rows: [
      ['Typical age', '<b>&lt;5 years</b>', '<b>School-age / adolescent</b>', 'Any, often adolescent'],
      ['Blood pressure', 'Normal', 'Often <b>shock</b>', '<b>Hypotension required</b>'],
      ['GI symptoms', 'Uncommon', '<b>Prominent</b>', 'Vomiting/diarrhea'],
      ['Cardiac', 'Coronary <b>aneurysms</b>', '<b>Myocardial dysfunction</b>', 'Depression from shock'],
      ['Key clue', 'Fever ≥5 d + 4 of 5 criteria', 'Recent SARS-CoV-2 exposure', '<b>Minor staph focus</b> — furuncle, packing, wound'],
      ['Treatment', 'IVIG + aspirin &lt;10 d', 'IVIG ± steroids', 'Source control + antibiotics + pressors']
    ],
    tell: 'Age plus hemodynamics. Under 5 and normotensive → Kawasaki. Older with shock and GI symptoms → MIS-C. Hypotension with diffuse erythroderma and a trivial staph focus → TSS.'
  },
  {
    id: 'congenital', d: 4, t: 'Congenital infections — one finding each',
    cols: ['CMV', 'Toxoplasmosis', 'Rubella', 'Syphilis'],
    rows: [
      ['Calcifications', '<b>Peri</b>ventricular', '<b>Diffuse</b>/scattered', '—', '—'],
      ['Signature finding', '<b>Sensorineural hearing loss</b>', '<b>Chorioretinitis</b>, hydrocephalus', '<b>Cataracts, PDA</b>', '<b>Snuffles</b>, palms/soles rash'],
      ['Head size', 'Microcephaly', 'Macro (hydrocephalus) or micro', 'Microcephaly', 'Normal'],
      ['Skin', 'Petechiae, blueberry muffin', '—', 'Blueberry muffin', 'Desquamating, <b>palms and soles</b>'],
      ['Late findings', 'Progressive hearing loss', 'Recurrent chorioretinitis', 'Deafness, diabetes', 'Hutchinson teeth, saber shins'],
      ['Treatment', 'Valganciclovir if symptomatic', 'Pyrimethamine + sulfadiazine', 'Supportive', 'Penicillin G']
    ],
    tell: 'The calcification pattern decides CMV vs toxo: PERIventricular = CMV (and think hearing), diffuse = toxo (and think eyes). Palms and soles = syphilis. Cataracts + PDA = rubella.'
  },

  /* --- EENT --- */
  {
    id: 'orbital', d: 10, t: 'Preseptal vs Orbital cellulitis',
    cols: ['Preseptal (periorbital)', 'Orbital (postseptal)'],
    rows: [
      ['Visual acuity', '<b>Normal</b>', '<b>Decreased</b>'],
      ['Eye movement', 'Full, painless', '<b>Painful, restricted (ophthalmoplegia)</b>'],
      ['Proptosis', 'Absent', '<b>Present</b>'],
      ['Usual source', 'Skin break, insect bite, conjunctivitis', '<b>Ethmoid sinusitis</b>'],
      ['Imaging', 'None', '<b>CT orbits + sinuses with contrast</b>'],
      ['Treatment', 'Oral antibiotics', 'Admit, IV antibiotics, ophtho/ENT']
    ],
    tell: 'Three findings move it postseptal — pain with eye movement, proptosis, or reduced acuity. Any one of them means CT and admission. The stem buries them mid-exam on purpose.'
  },
  {
    id: 'stridor', d: 10, t: 'Croup vs Epiglottitis vs Bacterial tracheitis',
    cols: ['Croup', 'Epiglottitis', 'Bacterial tracheitis'],
    rows: [
      ['Onset', 'Gradual, at night', '<b>Hours</b>', 'Croup prodrome, then abrupt decline'],
      ['Cough', '<b>Barky</b>', '<b>Absent</b>', 'Present'],
      ['Drooling / posture', 'No', '<b>Drooling, tripoding</b>', 'No'],
      ['Toxicity', 'Non-toxic', '<b>Toxic</b>', '<b>Toxic, high fever</b>'],
      ['Film', '<b>Steeple</b> sign', '<b>Thumbprint</b> sign', 'Irregular tracheal membrane'],
      ['Response to racemic epi', 'Good', 'N/A', '<b>Poor</b>'],
      ['Management', 'Dexamethasone ± racemic epi', '<b>Keep calm → OR for airway</b>', 'Intubation, IV antibiotics']
    ],
    tell: 'Cough decides it: barky cough = croup; NO cough with drooling and tripoding = epiglottitis. A croup that looks toxic and fails racemic epinephrine is bacterial tracheitis.'
  },
  {
    id: 'neckmass', d: 10, t: 'Thyroglossal vs Branchial cleft vs Cystic hygroma',
    cols: ['Thyroglossal duct cyst', 'Branchial cleft cyst', 'Cystic hygroma'],
    rows: [
      ['Location', '<b>Midline</b>', '<b>Lateral</b>, anterior to SCM', 'Posterior triangle'],
      ['Movement', '<b>Elevates with swallowing and tongue protrusion</b>', 'No', 'No'],
      ['Transilluminates', 'No', 'No', '<b>Yes</b>'],
      ['Before surgery', '<b>Confirm a normal thyroid is present</b>', 'Image the tract', 'Consider Turner / trisomy 21 association']
    ],
    tell: 'Midline and moves with tongue protrusion = thyroglossal. Lateral = branchial cleft. Transilluminates = cystic hygroma.'
  },

  /* --- Ortho --- */
  {
    id: 'limp', d: 9, t: 'The limping child — by age',
    cols: ['Transient synovitis', 'Septic arthritis', 'Legg-Calvé-Perthes', 'SCFE'],
    rows: [
      ['Age', '3–8 yr', 'Any', '<b>4–8 yr</b>', '<b>10–16 yr</b>'],
      ['Fever', 'Low/none', '<b>&gt;38.5 °C</b>', 'None', 'None'],
      ['Weight bearing', '<b>Will bear weight</b>', '<b>Refuses</b>', 'Antalgic but walks', 'Antalgic'],
      ['Labs', 'Normal/mild', '<b>ESR ≥40, WBC &gt;12k</b>', 'Normal', 'Normal'],
      ['Body habitus', 'Any', 'Any', 'Small, active', '<b>Obese</b> or endocrinopathy'],
      ['Preceding', '<b>Viral illness</b>', '—', '—', '—'],
      ['Next step', 'NSAIDs, reassess', '<b>Aspirate</b> → drain + abx', 'Radiographs, ortho', '<b>Frog-leg lateral, non-weight-bearing, ortho</b>']
    ],
    tell: 'Kocher count decides synovitis vs septic (3–4 criteria → aspirate). Age decides Perthes vs SCFE. And an adolescent with knee pain plus a normal knee exam is a hip until you image the hip.'
  },

  /* --- Cards --- */
  {
    id: 'murmur', d: 11, t: 'Innocent vs Pathologic murmur (and the maneuvers)',
    cols: ['Innocent', 'Pathologic'],
    rows: [
      ['Timing', 'Systolic only', '<b>Any diastolic</b>, holosystolic, continuous'],
      ['Grade', '1–2', '<b>≥3, or a thrill</b>'],
      ['Quality', 'Musical, vibratory, soft', 'Harsh, blowing'],
      ['S2', 'Normal split', '<b>Fixed split (ASD)</b>, single, loud'],
      ['With standing', '<b>Softer</b> (Still murmur)', '<b>Louder = HCM</b>'],
      ['Other', 'Normal pulses and growth', 'Click, abnormal pulses, cyanosis, failure to thrive']
    ],
    tell: 'A murmur that gets LOUDER when the patient stands or does Valsalva is hypertrophic cardiomyopathy — the opposite of every innocent murmur, and the one you must not clear for sports. Fixed split S2 = ASD. Continuous machinery = PDA.'
  },
  {
    id: 'syncope', d: 11, t: 'Vasovagal vs Cardiac syncope vs POTS',
    cols: ['Vasovagal', 'Cardiac', 'POTS'],
    rows: [
      ['Timing', 'Standing, heat, pain, sight of blood', '<b>DURING exertion</b>, supine, or no warning', 'On standing, chronic'],
      ['Prodrome', 'Warmth, nausea, tunnel vision', '<b>None</b>, or palpitations/chest pain', 'Lightheaded, fatigue'],
      ['Family history', '—', '<b>Sudden death &lt;50, drowning</b>', '—'],
      ['Hemodynamics', 'Transient hypotension', 'Arrhythmia / obstruction', '<b>HR ↑≥40 without hypotension</b>'],
      ['Work-up', 'History + ECG', '<b>ECG + cardiology, no clearance</b>', 'Orthostatic vitals'],
      ['Treatment', 'Reassurance, hydration', 'Per diagnosis', 'Fluid/salt, <b>exercise reconditioning</b>, compression']
    ],
    tell: 'Syncope DURING exertion is never benign. Syncope after exertion stops is usually vasovagal. ECG is the first test in every first syncopal episode — never the echo.'
  },

  /* --- Pulm --- */
  {
    id: 'vcd', d: 12, t: 'Asthma vs Vocal cord dysfunction',
    cols: ['Exercise-induced asthma', 'Vocal cord dysfunction'],
    rows: [
      ['Phase', '<b>Expiratory</b> wheeze', '<b>Inspiratory</b> stridor'],
      ['Location', 'Chest', '<b>Throat</b> — patient points to the neck'],
      ['Timing', 'Peaks 5–10 min <b>after</b> exercise stops', '<b>At peak exertion</b>, abrupt on and off'],
      ['Oxygen saturation', 'May fall', '<b>Normal</b>'],
      ['Albuterol', 'Works', '<b>No response</b>'],
      ['Flow-volume loop', 'Expiratory obstruction', '<b>Flattened inspiratory limb</b>'],
      ['Treatment', 'ICS ± pre-exercise SABA', '<b>Speech therapy</b>, breathing retraining']
    ],
    tell: 'Inspiratory, localized to the throat, normal saturation, no albuterol response — that combination is VCD every time, and the answer is speech therapy, not escalating asthma therapy.'
  },
  {
    id: 'asthmasev', d: 12, t: 'Asthma severity — the classification table',
    cols: ['Intermittent', 'Mild persistent', 'Moderate persistent', 'Severe persistent'],
    rows: [
      ['Daytime symptoms', '≤2 days/wk', '<b>&gt;2 days/wk, not daily</b>', '<b>Daily</b>', 'Throughout the day'],
      ['Night awakenings (≥5 yr)', '≤2×/month', '3–4×/month', '<b>&gt;1×/week</b>', 'Often nightly'],
      ['SABA use', '≤2 days/wk', '&gt;2 days/wk', 'Daily', 'Several times/day'],
      ['FEV₁', 'Normal between', '≥80%', '<b>60–80%</b>', '<b>&lt;60%</b>'],
      ['Controller', 'None', '<b>Low-dose ICS</b>', 'Low-dose ICS-LABA / medium ICS', 'Medium-high ICS-LABA']
    ],
    tell: 'Anything beyond intermittent needs a daily controller, and the first controller is always an inhaled corticosteroid. Two oral steroid bursts in a year = poorly controlled regardless of the reported symptom frequency.'
  },

  /* --- GI --- */
  {
    id: 'vomit', d: 13, t: 'Infant vomiting — the four that matter',
    cols: ['Pyloric stenosis', 'Malrotation/volvulus', 'Intussusception', 'GER'],
    rows: [
      ['Age', '<b>3–6 weeks</b>', 'Any, often &lt;1 month', '<b>6 mo–3 yr</b>', '0–12 months'],
      ['Emesis', 'Non-bilious, <b>projectile</b>', '<b>BILIOUS</b>', 'Non-bilious then bilious', 'Effortless spit'],
      ['Between episodes', 'Hungry', 'Ill', '<b>Lethargic</b>', 'Happy, thriving'],
      ['Labs', '<b>Hypochloremic hypokalemic alkalosis</b>', 'Acidosis if ischemic', 'Normal early', 'Normal'],
      ['Test', 'Ultrasound', '<b>Upper GI series</b>', 'Ultrasound (target sign)', 'None'],
      ['Treatment', '<b>Fix electrolytes first</b>, then pyloromyotomy', '<b>Emergent surgery</b>', 'Air enema', 'Reassure']
    ],
    tell: 'Bilious means volvulus until an upper GI says otherwise — a benign abdominal exam is worthless because ischemia precedes peritonitis. Non-bilious and projectile at 3–6 weeks is pyloric, and the electrolytes come before the OR.'
  },
  {
    id: 'ibd', d: 13, t: 'Crohn vs Ulcerative colitis',
    cols: ['Crohn disease', 'Ulcerative colitis'],
    rows: [
      ['Distribution', 'Mouth to anus, <b>skip lesions</b>', '<b>Continuous from the rectum</b>'],
      ['Depth', '<b>Transmural</b>', 'Mucosal only'],
      ['Perianal disease', '<b>Fistulas, tags, fissures</b>', 'Rare'],
      ['Presenting sign', '<b>Growth failure may precede GI symptoms</b>', 'Bloody diarrhea, tenesmus'],
      ['Histology', '<b>Non-caseating granulomas</b>', 'Crypt abscesses'],
      ['Association', 'Kidney stones, gallstones', '<b>Primary sclerosing cholangitis</b>'],
      ['Surgery', 'Not curative', '<b>Colectomy is curative</b>']
    ],
    tell: 'Growth failure with a delayed bone age and anemia in an adolescent is Crohn until excluded — the GI symptoms can lag by years. PSC in the stem points to UC.'
  },
  {
    id: 'constip', d: 13, t: 'Functional constipation vs Hirschsprung',
    cols: ['Functional', 'Hirschsprung'],
    rows: [
      ['Onset', 'Toddler, around toilet training or diet change', '<b>Newborn — no meconium in 48 h</b>'],
      ['Stool size', '<b>Large caliber, painful</b>', 'Ribbon-like, small'],
      ['Withholding posture', '<b>Yes</b>', 'No'],
      ['Soiling', '<b>Overflow encopresis</b>', 'Rare'],
      ['Rectal exam', 'Stool in vault', '<b>Empty vault, explosive stool on withdrawal</b>'],
      ['Growth', 'Normal', 'Failure to thrive'],
      ['Diagnosis', 'Clinical — <b>no radiograph needed</b>', '<b>Suction rectal biopsy</b> (absent ganglion cells)']
    ],
    tell: 'Large painful stools with withholding and soiling = functional, and the treatment is months of PEG. Delayed meconium plus an empty rectal vault = biopsy.'
  },

  /* --- Neuro --- */
  {
    id: 'weakness', d: 14, t: 'Acute weakness — Guillain-Barré vs Botulism vs Transverse myelitis',
    cols: ['Guillain-Barré', 'Infant botulism', 'Transverse myelitis'],
    rows: [
      ['Direction', '<b>Ascending</b>', '<b>Descending</b>', 'Below a <b>sensory level</b>'],
      ['Pupils', 'Spared', '<b>Dilated, sluggish</b>', 'Spared'],
      ['First symptom', 'Leg weakness/paresthesia', '<b>Constipation</b>', 'Back pain, sensory change'],
      ['Reflexes', '<b>Absent</b>', 'Decreased', 'Absent then hyperreflexic'],
      ['Bowel/bladder', 'Usually spared', 'Constipation', '<b>Involved</b>'],
      ['Test', 'CSF <b>high protein, normal cells</b>', 'Stool toxin/culture', '<b>MRI spine — emergency</b>'],
      ['Treatment', 'IVIG or plasmapheresis (<b>not steroids</b>)', '<b>BabyBIG</b> (no aminoglycosides)', 'High-dose steroids']
    ],
    tell: 'Direction of spread plus pupils. Ascending with spared pupils = GBS. Descending with dilated pupils in an infant who was constipated first = botulism. A sensory level with bladder involvement = MRI now.'
  },
  {
    id: 'seizuretype', d: 14, t: 'Absence vs Focal impaired-awareness seizures',
    cols: ['Absence', 'Focal with impaired awareness'],
    rows: [
      ['Duration', '<b>Seconds (5–15)</b>', '<b>1–2 minutes</b>'],
      ['Frequency', '<b>Many per day</b>', 'Less frequent'],
      ['Postictal', '<b>None</b> — resumes instantly', '<b>Confusion, sleepiness</b>'],
      ['Provocation', '<b>Hyperventilation</b>', 'Not reproducible'],
      ['Aura', 'None', 'May have one'],
      ['EEG', '<b>3-Hz generalized spike-wave</b>', 'Focal discharges (often temporal)'],
      ['First-line', '<b>Ethosuximide</b>', 'Oxcarbazepine / levetiracetam']
    ],
    tell: 'Postictal state is the discriminator. None at all, with instant resumption of activity and reproducibility on hyperventilation, is absence.'
  },

  /* --- Derm --- */
  {
    id: 'sssssjs', d: 15, t: 'SSSS vs SJS/TEN',
    cols: ['Staph scalded skin', 'SJS / TEN'],
    rows: [
      ['Mucous membranes', '<b>SPARED</b>', '<b>≥2 surfaces involved</b>'],
      ['Perioral', '<b>Crusting, radial fissures</b>', 'Erosions, hemorrhagic crust'],
      ['Cause', 'Staph exotoxin', '<b>Drug</b> (sulfa, anticonvulsant) or <i>Mycoplasma</i>'],
      ['Age', 'Infants, young children', 'Any'],
      ['Level of split', 'Superficial (granular layer)', 'Full-thickness epidermal necrosis'],
      ['Treatment', 'Anti-staph antibiotics', '<b>Stop the drug, burn center</b>'],
      ['Prognosis', 'Good', 'Significant mortality in TEN']
    ],
    tell: 'Mucosal involvement is the whole question. Spared mucosa with perioral crusting = staph. Two or more mucosal surfaces = SJS/TEN, stop the drug.'
  },
  {
    id: 'neonatalrash', d: 15, t: 'Erythema toxicum vs Transient neonatal pustular melanosis',
    cols: ['Erythema toxicum', 'Pustular melanosis'],
    rows: [
      ['Timing', '<b>Days 1–3</b>', '<b>Present AT birth</b>'],
      ['Lesion', 'Erythematous macule with central papule', 'Pustule → <b>collarette of scale</b>'],
      ['Residual', 'None', '<b>Hyperpigmented macules for months</b>'],
      ['Smear', '<b>Eosinophils</b>', '<b>Neutrophils</b>'],
      ['Palms/soles', 'Spared', 'May involve'],
      ['Skin tone', 'Any', 'More common in darker skin']
    ],
    tell: 'Present at birth with residual hyperpigmentation = pustular melanosis. Appearing on day 2 with a blotchy erythematous base and no residua = erythema toxicum. Both need nothing.'
  },
  {
    id: 'alopecia', d: 15, t: 'Tinea capitis vs Alopecia areata vs Trichotillomania',
    cols: ['Tinea capitis', 'Alopecia areata', 'Trichotillomania'],
    rows: [
      ['Scale', '<b>Yes</b>', '<b>No</b> — smooth', 'No'],
      ['Border', 'Irregular, broken hairs', '<b>Well-circumscribed round</b>', '<b>Irregular, bizarre</b>'],
      ['Hair lengths', 'Broken at surface ("black dots")', '<b>Exclamation-point hairs</b>', '<b>Varying lengths</b>'],
      ['Lymph nodes', '<b>Occipital adenopathy</b>', 'None', 'None'],
      ['Treatment', '<b>Oral</b> griseofulvin/terbinafine', 'Topical/intralesional steroid', 'Behavioral therapy']
    ],
    tell: 'Scale plus occipital nodes = tinea, and it needs an oral agent. Smooth and round with exclamation-point hairs = alopecia areata. Hairs of many different lengths in an odd shape = pulling.'
  },

  /* --- Heme --- */
  {
    id: 'microcytic', d: 16, t: 'Iron deficiency vs Thalassemia trait vs Lead',
    cols: ['Iron deficiency', 'Thalassemia trait', 'Lead poisoning'],
    rows: [
      ['RDW', '<b>High</b>', '<b>Normal</b>', 'Normal/high'],
      ['RBC count', 'Low', '<b>Normal or high</b>', 'Normal'],
      ['Mentzer (MCV÷RBC)', '<b>&gt;13</b>', '<b>&lt;13</b>', '—'],
      ['Ferritin', '<b>Low</b>', 'Normal', 'Normal'],
      ['TIBC', '<b>High</b>', 'Normal', 'Normal'],
      ['Smear', 'Hypochromic, pencil cells', 'Target cells', '<b>Basophilic stippling</b>'],
      ['Confirm', 'Retic rise 5–7 d after iron', '<b>Electrophoresis (↑HbA₂)</b>', 'Blood lead level']
    ],
    tell: 'RDW plus RBC count separates the top two instantly: high RDW with a low RBC count is iron deficiency; normal RDW with a normal-to-high RBC count is thalassemia trait. Basophilic stippling adds lead.'
  },
  {
    id: 'sicklecrisis', d: 16, t: 'Sickle cell — sequestration vs aplastic crisis vs acute chest',
    cols: ['Splenic sequestration', 'Aplastic crisis', 'Acute chest syndrome'],
    rows: [
      ['Reticulocytes', '<b>HIGH</b>', '<b>LOW</b>', 'Variable'],
      ['Spleen', '<b>Rapidly enlarging</b>', 'Normal', 'Normal'],
      ['Cause', 'Splenic pooling', '<b>Parvovirus B19</b>', 'Infection, infarction, fat embolism'],
      ['Key sign', 'Hypovolemia, pallor', 'Pallor, no distress', '<b>New infiltrate + fever/hypoxia/chest pain</b>'],
      ['Treatment', 'Volume + transfusion', 'Transfusion, supportive', 'Antibiotics + O₂ + <b>transfusion</b>, incentive spirometry']
    ],
    tell: 'The reticulocyte count decides sequestration vs aplastic crisis — low retics means the marrow stopped, which means parvovirus.'
  },
  {
    id: 'purpura', d: 16, t: 'ITP vs HSP vs Leukemia vs Meningococcemia',
    cols: ['ITP', 'HSP', 'Leukemia', 'Meningococcemia'],
    rows: [
      ['Platelets', '<b>Low, isolated</b>', '<b>NORMAL</b>', 'Low + other cytopenias', 'Low (DIC)'],
      ['Appearance', '<b>Well</b>', '<b>Well</b>', 'Pale, ill over weeks', '<b>Toxic, rapidly worsening</b>'],
      ['Rash', 'Petechiae, bruises', '<b>Palpable purpura, buttocks/legs</b>', 'Petechiae, bruises', 'Petechiae → purpura fulminans'],
      ['Other findings', 'None', 'Arthritis, abdominal pain, nephritis', '<b>Bone pain, organomegaly, adenopathy</b>', 'Fever, shock'],
      ['Management', 'Observe if minimal bleeding', 'Supportive, follow UA/BP ×6 mo', 'Marrow, oncology', '<b>Antibiotics + resuscitation now</b>']
    ],
    tell: 'Check the platelet count and the rest of the CBC first. Normal platelets with palpable purpura = HSP. Isolated low platelets in a well child = ITP. Any second cytopenia, bone pain, or organomegaly = leukemia, not ITP.'
  },
  {
    id: 'abdmass', d: 16, t: 'Neuroblastoma vs Wilms tumor',
    cols: ['Neuroblastoma', 'Wilms tumor'],
    rows: [
      ['Crosses midline', '<b>Yes</b>', '<b>No</b>'],
      ['Surface', 'Irregular, <b>calcified</b>', 'Smooth'],
      ['Child appears', '<b>Systemically ill</b>', '<b>Well</b>'],
      ['Signature', '<b>Raccoon eyes, opsoclonus-myoclonus</b>', 'Hematuria, hypertension'],
      ['Markers', '<b>Urine VMA / HVA</b>', 'None'],
      ['Associations', 'MYCN amplification', '<b>WAGR, Beckwith-Wiedemann, hemihypertrophy</b>'],
      ['Caution', '—', '<b>Do not palpate repeatedly</b>']
    ],
    tell: 'Crossing the midline in an ill-appearing child = neuroblastoma. A smooth mass that stops at the midline in a well child = Wilms.'
  },

  /* --- Renal --- */
  {
    id: 'gn', d: 19, t: 'PSGN vs IgA nephropathy',
    cols: ['PSGN', 'IgA nephropathy'],
    rows: [
      ['Timing after illness', '<b>1–2 wk after pharyngitis</b> (3–6 wk after impetigo)', '<b>1–2 DAYS — during the illness</b>'],
      ['Complement C3', '<b>LOW</b>, normalizes in 6–8 wk', '<b>NORMAL</b>'],
      ['Course', 'Single episode, resolves', '<b>Recurrent</b> with each URI'],
      ['Hypertension/edema', 'Prominent', 'Less prominent'],
      ['Prognosis', 'Excellent in children', 'Can progress to CKD'],
      ['If C3 stays low &gt;8 wk', '<b>Rethink: MPGN or lupus → biopsy</b>', '—']
    ],
    tell: 'Timing and complement. Weeks after, with a low C3 = PSGN. Concurrent with the URI ("synpharyngitic") and a normal C3 = IgA. A C3 still low at 8 weeks means it was never PSGN.'
  },
  {
    id: 'nephro', d: 19, t: 'Nephrotic vs Nephritic',
    cols: ['Nephrotic', 'Nephritic'],
    rows: [
      ['Proteinuria', '<b>Massive (3–4+)</b>', 'Mild-moderate'],
      ['Hematuria', 'Absent/minimal', '<b>Present, with RBC casts</b>'],
      ['Blood pressure', 'Normal', '<b>Elevated</b>'],
      ['Albumin', '<b>Low</b>', 'Normal'],
      ['Lipids', '<b>High</b>', 'Normal'],
      ['Urine color', 'Frothy', '<b>Cola / tea-colored</b>'],
      ['Typical child', '1–10 yr, minimal change → <b>steroids, no biopsy</b>', 'Post-infectious, IgA, HSP, lupus']
    ],
    tell: 'RBC casts and hypertension push you nephritic. Massive proteinuria with hypoalbuminemia and a normal blood pressure in a 1–10 year old is minimal change — treat empirically, do not biopsy.'
  },
  {
    id: 'sodium', d: 19, t: 'SIADH vs Cerebral salt wasting vs Diabetes insipidus',
    cols: ['SIADH', 'Cerebral salt wasting', 'Diabetes insipidus'],
    rows: [
      ['Serum sodium', 'Low', 'Low', '<b>High</b>'],
      ['Volume status', '<b>Euvolemic</b>', '<b>HYPOvolemic</b>', 'Hypovolemic'],
      ['Urine output', 'Low', '<b>High</b>', '<b>High</b>'],
      ['Urine osmolality', '<b>High</b> (concentrated)', 'High', '<b>LOW</b> (dilute)'],
      ['Treatment', '<b>Fluid restriction</b>', '<b>Salt and volume replacement</b>', 'Desmopressin (central) / thiazide (nephrogenic)']
    ],
    tell: 'Volume status separates the two hyponatremias — euvolemic means restrict, hypovolemic means replace. Restricting fluids in cerebral salt wasting makes it worse.'
  },

  /* --- GU --- */
  {
    id: 'scrotum', d: 20, t: 'The acute scrotum',
    cols: ['Testicular torsion', 'Torsion of appendix testis', 'Epididymitis'],
    rows: [
      ['Onset', '<b>Abrupt, severe</b>, wakes from sleep', 'Gradual over days', 'Gradual'],
      ['Nausea/vomiting', '<b>Yes</b>', 'No', 'No'],
      ['Cremasteric reflex', '<b>ABSENT</b>', '<b>Present</b>', '<b>Present</b>'],
      ['Testis position', '<b>High-riding, transverse lie</b>', 'Normal', 'Normal'],
      ['Point tenderness', 'Whole testis', '<b>Upper pole, "blue dot"</b>', 'Epididymis; <b>relief with elevation</b>'],
      ['Management', '<b>OR — do not delay for ultrasound</b>', 'Supportive', 'Treat GC/CT if sexually active']
    ],
    tell: 'An absent cremasteric reflex with a high-riding transverse testis and abrupt pain is torsion — go to the OR. The six-hour salvage window is what makes "get an ultrasound first" the wrong answer.'
  },

  /* --- Endo --- */
  {
    id: 'shortstature', d: 18, t: 'Short stature — the three-way split',
    cols: ['Familial', 'Constitutional delay', 'Endocrine (GH def / hypothyroid)'],
    rows: [
      ['<b>Growth velocity</b>', '<b>Normal</b>', '<b>Normal</b>', '<b>DECREASED</b>'],
      ['<b>Bone age</b>', '<b>= chronologic</b>', '<b>DELAYED</b>', '<b>DELAYED</b>'],
      ['Weight for height', 'Proportionate', 'Proportionate', '<b>Overweight for height</b>'],
      ['Puberty', 'On time', '<b>Late</b>', 'Delayed'],
      ['Family history', 'Short parents', '<b>"Late bloomers"</b>', '—'],
      ['Adult height', 'Short (as predicted)', '<b>Normal</b>', 'Short if untreated'],
      ['Action', 'Reassure', 'Reassure ± short testosterone course', '<b>Work up</b>']
    ],
    tell: 'Growth velocity first, bone age second. A normal velocity is reassuring no matter how short the child is. A decreased velocity in a child who is heavy for height is endocrine until proven otherwise — and remember to karyotype any short girl.'
  },
  {
    id: 'precocious', d: 18, t: 'Central vs Peripheral precocious puberty',
    cols: ['Central (GnRH-dependent)', 'Peripheral (GnRH-independent)'],
    rows: [
      ['LH after GnRH stimulation', '<b>Rises (pubertal)</b>', '<b>Suppressed</b>'],
      ['Testes in boys', '<b>Enlarged</b> (bilateral)', 'Small, or asymmetric (tumor)'],
      ['Sequence', 'Normal, just early', 'Often <b>discordant</b>'],
      ['Causes', 'Idiopathic (girls); <b>CNS lesion (boys)</b>', 'CAH, adrenal/gonadal tumor, exogenous, McCune-Albright'],
      ['Imaging', '<b>Brain MRI — mandatory in boys</b>', 'Adrenal/pelvic imaging'],
      ['Treatment', '<b>GnRH agonist</b>', 'Treat the source']
    ],
    tell: 'Bilateral testicular enlargement means the axis is driving it — central, and in a boy that means MRI the brain. Virilization with small testes means the androgen is coming from somewhere else.'
  },

  /* --- Allergy/Immuno --- */
  {
    id: 'immunodef', d: 17, t: 'Immunodeficiency — the organism names the defect',
    noLabel: true,
    cols: ['Defect', 'Organisms / clues', 'Test'],
    rows: [
      ['<b>B cell / antibody</b>', 'Encapsulated sinopulmonary <b>after 6 months</b>; enterovirus; <i>Giardia</i>. XLA: <b>absent tonsils</b>', 'Quantitative immunoglobulins, vaccine titers'],
      ['<b>T cell / combined (SCID)</b>', '<b>First months</b>; thrush, <i>Pneumocystis</i>, chronic diarrhea, FTT, <b>absent thymic shadow</b>', '<b>Low TRECs</b> on newborn screen, lymphocyte subsets'],
      ['<b>Phagocyte (CGD)</b>', '<b>Catalase-positive</b>: <i>S. aureus</i>, <i>Serratia</i>, <i>Burkholderia</i>, <i>Nocardia</i>, <i>Aspergillus</i>', '<b>DHR flow cytometry</b>'],
      ['<b>Phagocyte (LAD)</b>', '<b>Delayed cord separation</b>, infections <b>without pus</b>, very high WBC', 'CD18 flow cytometry'],
      ['<b>Complement (terminal)</b>', '<b>Recurrent <i>Neisseria</i></b>', '<b>CH50</b>'],
      ['<b>Complement (early classical)</b>', 'Lupus-like autoimmunity', 'CH50, C3/C4']
    ],
    tell: 'Read the organism, not the symptom. Encapsulated after 6 months = antibody. Opportunists in the first months = T cell. Catalase-positive abscesses = CGD. Neisseria twice = complement.'
  },
  {
    id: 'foodreaction', d: 17, t: 'IgE food allergy vs FPIES vs Proctocolitis',
    cols: ['IgE-mediated', 'FPIES', 'Allergic proctocolitis'],
    rows: [
      ['Onset after ingestion', '<b>Minutes–2 h</b>', '<b>1–4 hours</b>', 'Days–weeks'],
      ['Symptoms', 'Urticaria, wheeze, angioedema, shock', '<b>Profuse repetitive vomiting</b>, pallor, lethargy, ± shock', '<b>Blood-streaked mucousy stool</b>'],
      ['Skin/respiratory findings', 'Present', '<b>ABSENT</b>', 'Absent'],
      ['Specific IgE / skin test', '<b>Positive</b>', '<b>NEGATIVE</b>', 'Negative'],
      ['Infant appears', 'Acutely ill', 'Ill, may look septic', '<b>Well and thriving</b>'],
      ['Treatment', '<b>IM epinephrine</b>, avoidance', 'Fluids + <b>ondansetron</b>, avoidance', 'Maternal dairy elimination, <b>continue breastfeeding</b>']
    ],
    tell: 'Negative allergy testing does not exclude a food reaction. Delayed profuse vomiting with no rash and negative IgE is FPIES — commonly misdiagnosed as sepsis or gastroenteritis.'
  },

  /* --- Rheum --- */
  {
    id: 'jiamas', d: 22, t: 'Systemic JIA flare vs Macrophage activation syndrome',
    cols: ['Systemic JIA flare', 'Macrophage activation syndrome'],
    rows: [
      ['ESR', 'High', '<b>FALLING</b> (fibrinogen consumed)'],
      ['Platelets / WBC', 'High', '<b>FALLING</b>'],
      ['Ferritin', 'Elevated', '<b>Extremely high (thousands)</b>'],
      ['Fibrinogen', 'High', '<b>Low</b>'],
      ['Triglycerides', 'Normal', '<b>High</b>'],
      ['Liver', 'Normal-ish', 'Transaminitis, coagulopathy'],
      ['Patient', 'Ill but stable', '<b>Deteriorating</b>']
    ],
    tell: 'Labs appear to improve while the patient gets worse. A falling ESR and falling counts with a soaring ferritin is MAS, not a response to therapy — and it is life-threatening.'
  },
  {
    id: 'arf', d: 22, t: 'Acute rheumatic fever vs Post-strep reactive arthritis',
    cols: ['Acute rheumatic fever', 'Post-strep reactive arthritis'],
    rows: [
      ['Latency after strep', '<b>2–4 weeks</b>', '<b>1–2 weeks</b>'],
      ['Arthritis pattern', '<b>Migratory</b>', '<b>Non-migratory, additive</b>'],
      ['NSAID response', '<b>Dramatic</b>', '<b>Poor</b>'],
      ['Carditis', 'Present in ~50%', 'Absent'],
      ['Follow-up', '<b>Long-term penicillin prophylaxis</b>', 'Echo; prophylaxis often given ~1 yr']
    ],
    tell: 'Migratory arthritis that melts away with NSAIDs, appearing 2–4 weeks out, is rheumatic fever. Persistent arthritis at 1–2 weeks that shrugs off NSAIDs is reactive.'
  },

  /* --- Mental health --- */
  {
    id: 'eating', d: 5, t: 'Anorexia vs Bulimia vs ARFID',
    cols: ['Anorexia nervosa', 'Bulimia nervosa', 'ARFID'],
    rows: [
      ['Body image disturbance', '<b>Yes</b>', '<b>Yes</b>', '<b>NO</b>'],
      ['Weight', 'Low', '<b>Normal or above</b>', 'Low or faltering'],
      ['Vitals', '<b>Bradycardia, hypotension, hypothermia</b>', 'Often normal', 'Variable'],
      ['Electrolytes', 'Varied; <b>hypophosphatemia on refeeding</b>', '<b>Hypokalemic hypochloremic alkalosis</b>', 'Nutritional deficiencies'],
      ['Exam clues', 'Lanugo, amenorrhea, prolonged QTc', '<b>Parotid swelling, dental erosion, Russell sign</b>', 'None specific'],
      ['Driver', 'Fear of weight gain', 'Binge–purge cycle', 'Sensory aversion, low interest, fear of choking']
    ],
    tell: 'Absence of body image disturbance makes it ARFID. Normal weight with parotid swelling and a hypokalemic alkalosis is bulimia. And in anorexia, the vitals are where the admission decision hides.'
  },
  {
    id: 'oddcd', d: 5, t: 'ODD vs Conduct disorder',
    cols: ['Oppositional defiant disorder', 'Conduct disorder'],
    rows: [
      ['Target', '<b>Authority figures</b>', '<b>Rights of others / societal norms</b>'],
      ['Behaviors', 'Argues, defies, annoys, blames, vindictive', '<b>Aggression to people or animals, destruction, deceit, theft, serious rule violation</b>'],
      ['Severity', 'Disruptive', 'Illegal / harmful'],
      ['Trajectory', 'May progress to CD', 'May progress to antisocial personality disorder']
    ],
    tell: 'Ask who is harmed. Defiance aimed at adults is ODD. Violating other people — or animals, or property — is conduct disorder.'
  },

  /* --- Metabolic --- */
  {
    id: 'iem', d: 21, t: 'Inborn errors — the three-lab decision tree',
    cols: ['Urea cycle defect', 'Organic acidemia', 'Fatty acid oxidation defect'],
    rows: [
      ['<b>Ammonia</b>', '<b>Very high</b>', 'High', 'Mildly high'],
      ['<b>Acidosis</b>', '<b>NONE</b> — respiratory <b>alkalosis</b>', '<b>Anion-gap acidosis</b>', 'Mild'],
      ['<b>Ketones</b>', 'Absent', '<b>Present (ketosis)</b>', '<b>ABSENT (hypoketotic)</b>'],
      ['<b>Glucose</b>', 'Normal', 'Low or normal', '<b>LOW</b>'],
      ['Trigger', 'Protein load, catabolism', 'Protein load, illness', '<b>Fasting</b>'],
      ['Classic', 'OTC deficiency (X-linked)', 'Methylmalonic, propionic, isovaleric ("sweaty feet")', '<b>MCAD</b>'],
      ['Treatment', 'Stop protein, dextrose, scavengers, dialysis', 'Stop protein, dextrose, cofactors', '<b>Avoid fasting</b>, dextrose during illness']
    ],
    tell: 'Three labs settle it: ammonia, blood gas, and ketones. High ammonia with respiratory alkalosis and no acidosis is a urea cycle defect. Acidosis with ketosis is an organic acidemia. Hypoglycemia WITHOUT ketones is a fatty acid oxidation defect. Draw them during the crisis — after dextrose they normalize.'
  },
  {
    id: 'imprint', d: 21, t: 'Prader-Willi vs Angelman',
    cols: ['Prader-Willi', 'Angelman'],
    rows: [
      ['Missing copy', '<b>PATERNAL</b> 15q11-13', '<b>MATERNAL</b> 15q11-13'],
      ['Infancy', '<b>Hypotonia, poor feeding, failure to thrive</b>', 'Feeding difficulty, developmental delay'],
      ['Later', '<b>Hyperphagia, obesity</b>', '<b>Absent speech, ataxic gait, seizures</b>'],
      ['Affect', 'Skin picking, temper outbursts', '<b>Inappropriate laughter, happy demeanor</b>'],
      ['Other', 'Short stature, small hands/feet, hypogonadism', 'Microcephaly, wide-based gait']
    ],
    tell: 'Paternal loss makes them Prader-Willi (think "P for paternal"). The biphasic course — floppy and feeding poorly, then insatiable and obese — is the giveaway.'
  },
  {
    id: 'marfan', d: 21, t: 'Marfan vs Homocystinuria',
    cols: ['Marfan', 'Homocystinuria'],
    rows: [
      ['<b>Lens dislocation</b>', '<b>UPWARD</b>', '<b>DOWNWARD</b>'],
      ['Inheritance', 'Autosomal dominant (FBN1)', 'Autosomal recessive'],
      ['Intellect', 'Normal', '<b>Intellectual disability</b>'],
      ['Vascular risk', '<b>Aortic root dilation/dissection</b>', '<b>Thrombosis</b>'],
      ['Joints', 'Hypermobile', 'Stiff'],
      ['Management', 'Echo, beta blocker/ARB, no contact sports', 'B₆, betaine, methionine-restricted diet']
    ],
    tell: 'The direction of the lens dislocation is the entire question — up is Marfan, down is homocystinuria. Marfan gets an echo; homocystinuria gets a diet.'
  },

  /* --- Adolescent --- */
  {
    id: 'puberty', d: 3, t: 'Puberty sequence — girls vs boys',
    cols: ['Girls', 'Boys'],
    rows: [
      ['First event', '<b>Thelarche</b> (breast bud), ~10–11 yr', '<b>Testicular enlargement</b> (≥4 mL), ~11–12 yr'],
      ['Peak height velocity', '<b>EARLY — Tanner 2–3, before menarche</b>', '<b>LATE — Tanner 3–4</b>'],
      ['Growth remaining at that point', 'Most of it', 'Most of it'],
      ['Menarche / spermarche', 'Tanner 4, ~2–2.5 yr after thelarche', 'Tanner 3–4'],
      ['Growth after menarche', '<b>Only 5–7 cm more</b>', 'N/A'],
      ['Precocious if before', '<b>8 years</b>', '<b>9 years</b> (→ brain MRI)'],
      ['Delayed if absent by', 'Breast 13, menarche 15', 'Testicular enlargement 14']
    ],
    tell: 'Girls peak BEFORE menarche; boys peak LATE. That single asymmetry answers most "how much more will she grow" and "what happens next" questions — and it is why boys end up taller.'
  },
  {
    id: 'delayedpub', d: 3, t: 'Delayed puberty — the three causes by gonadotropins',
    cols: ['Constitutional delay', 'Hypogonadotropic', 'Hypergonadotropic'],
    rows: [
      ['LH / FSH', '<b>Low (but appropriate for bone age)</b>', '<b>LOW</b>', '<b>HIGH</b>'],
      ['Problem is in the', 'Timing only', 'Hypothalamus / pituitary', '<b>Gonad</b>'],
      ['Bone age', '<b>Delayed</b>', 'Delayed', 'Delayed'],
      ['Growth velocity', '<b>Normal</b>', 'Often low', 'Normal until late'],
      ['Examples', 'Family history of late bloomers', 'Kallmann (<b>anosmia</b>), tumor, chronic illness, energy deficit', '<b>Turner, Klinefelter</b>, chemo/radiation'],
      ['Outcome', '<b>Normal adult height and puberty</b>', 'Needs hormone therapy', 'Needs hormone therapy']
    ],
    tell: 'Gonadotropins split it. High LH/FSH means the gonad has failed — karyotype (Turner in a short girl, Klinefelter in a tall boy with small firm testes). Low with a normal growth velocity and a positive family history is constitutional delay, and it needs reassurance, not treatment.'
  },

  /* --- Emergency --- */
  {
    id: 'shock', d: 7, t: 'Shock — cold vs warm vs cardiogenic vs anaphylactic',
    cols: ['Hypovolemic / cold septic', 'Warm septic', 'Cardiogenic', 'Anaphylactic'],
    rows: [
      ['Extremities', '<b>Cool, mottled</b>', '<b>Warm, flushed</b>', 'Cool', 'Warm then cool'],
      ['Capillary refill', '<b>Prolonged</b>', '<b>Flash (&lt;1 s)</b>', 'Prolonged', 'Variable'],
      ['Pulses', 'Thready, narrow pulse pressure', '<b>Bounding, wide pulse pressure</b>', 'Weak', 'Variable'],
      ['Liver', 'Normal', 'Normal', '<b>HEPATOMEGALY, gallop, rales</b>', 'Normal'],
      ['Fluid response', 'Improves', 'Improves', '<b>WORSENS</b>', 'Improves after epinephrine'],
      ['First drug', 'Fluids ± <b>epinephrine</b>', 'Fluids ± <b>norepinephrine</b>', '<b>Inotrope, small boluses only</b>', '<b>IM epinephrine</b>']
    ],
    tell: 'Hepatomegaly, a gallop, or rales means do not give a 20 mL/kg bolus — that is cardiogenic shock and fluids will sink the patient. And in every type, remember hypotension is a LATE sign in children; tachycardia with delayed refill is the early one.'
  },
  {
    id: 'brue', d: 7, t: 'Lower-risk BRUE vs everything that needs a workup',
    cols: ['Lower-risk BRUE', 'Requires evaluation'],
    rows: [
      ['Age', '<b>&gt;60 days</b>', '≤60 days'],
      ['Prematurity', 'GA ≥32 wk and PCA ≥45 wk', 'More preterm'],
      ['Number of events', '<b>First</b>', 'Recurrent / clustered'],
      ['Duration', '<b>&lt;1 minute</b>', '≥1 minute'],
      ['CPR', '<b>None by a trained provider</b>', '<b>CPR required</b>'],
      ['History / exam', 'Reassuring', 'Any concerning feature, bruising, or dysmorphism'],
      ['Action', 'Brief observation + pulse ox, <b>CPR training</b>, shared decision-making', 'Admit and investigate']
    ],
    tell: 'All six criteria must be true to call it lower-risk. Miss one — an event over a minute, a second episode, CPR by a trained provider — and the extensive workup that looks like a distractor becomes the answer. Also: an unexplained event plus a bruise is abuse until excluded.'
  },

  /* --- Child abuse --- */
  {
    id: 'fracture', d: 8, t: 'Fractures — high vs low specificity for abuse',
    cols: ['High specificity (abuse)', 'Low specificity (often accidental)'],
    rows: [
      ['Classic examples', '<b>Classic metaphyseal lesion (bucket-handle/corner)</b>, <b>posterior/posteromedial rib</b>, scapular, spinous process, sternal', 'Clavicle, linear skull, toddler tibial fracture, isolated spiral long bone in an <b>ambulatory</b> child'],
      ['Mechanism', 'Shaking, yanking, AP chest squeezing', 'Falls, twisting during play'],
      ['CPR explains it?', '<b>No — CPR does not cause posterior rib fractures</b>', 'N/A'],
      ['Any fracture in a non-ambulatory infant', '<b>Highly suspicious regardless of type</b>', '—'],
      ['Required workup &lt;2 yr', '<b>Skeletal survey + repeat in 2 weeks</b>', 'Clinical judgment']
    ],
    tell: 'Metaphyseal corner and posterior rib fractures are the two that essentially cannot be explained away — not by CPR, not by a short fall. And "if you don\'t cruise, you don\'t bruise" applies to fractures too: any fracture in a non-ambulatory infant needs a full evaluation.'
  },
  {
    id: 'abusemimic', d: 8, t: 'Abuse vs its mimics',
    noLabel: true,
    cols: ['Mimic', 'Distinguishing feature', 'Test'],
    rows: [
      ['<b>Osteogenesis imperfecta</b>', 'Blue sclerae, wormian bones, dentinogenesis imperfecta, family history', 'Genetic testing, skeletal survey'],
      ['<b>Congenital dermal melanocytosis</b>', 'Blue-gray, sacral/buttock, <b>present from birth, no color evolution</b>', 'Document at the newborn exam'],
      ['<b>Coining / cupping / moxibustion</b>', 'Patterned but culturally explained, over the back/chest', 'History; educate rather than report if isolated'],
      ['<b>ITP / hemophilia / vWD / leukemia</b>', 'Bruising without trauma, mucosal bleeding, other cytopenias', '<b>CBC, PT/PTT</b>, factor studies'],
      ['<b>Rickets</b>', 'Metaphyseal fraying/cupping, rachitic rosary', 'Ca, PO₄, alk phos, PTH, vitamin D'],
      ['<b>Ehlers-Danlos</b>', 'Hyperextensibility, easy bruising, atrophic scars', 'Clinical / genetic']
    ],
    tell: 'Screen for the mimics in parallel with reporting, never before it — mandated reporting requires reasonable suspicion, not a completed workup. And bruises cannot be dated by color, so any option offering an age from the color is wrong.'
  },

  /* --- Psychosocial --- */
  {
    id: 'death', d: 6, t: 'Understanding of death — by developmental stage',
    cols: ['Preschool (3–5)', 'School-age (~6–10)', 'Adolescent'],
    rows: [
      ['Sees death as', '<b>Reversible, temporary</b>', '<b>Permanent, universal, irreversible</b>', 'Adult understanding'],
      ['Typical question', '"When is Daddy coming home?"', 'Concrete, biological curiosity', 'Meaning, fairness, identity'],
      ['Emotional risk', '<b>Magical thinking — believes they caused it</b>', 'Fear for other caregivers; may personify death', 'Isolation, risk-taking, fear of being a burden'],
      ['Common expression', '<b>Regression</b> (enuresis, clinginess)', 'Somatic complaints, school problems', 'Withdrawal, anger, acting out'],
      ['What helps', 'Concrete words, routine, explicit "not your fault"', 'Honest facts, permission to grieve, inclusion in rituals', '<b>Include them in discussions</b>, peer support']
    ],
    tell: 'Preschoolers think it is reversible and that they caused it — so the answer includes concrete language ("died," never "went to sleep" or "we lost him") and explicit reassurance they are not to blame. Excluding an adolescent from the discussion is almost always the wrong option.'
  },

  /* --- Ethics --- */
  {
    id: 'consent', d: 23, t: 'Consent vs Assent vs Emancipated vs Mature minor',
    noLabel: true,
    cols: ['Concept', 'Who / when', 'What it permits'],
    rows: [
      ['<b>Informed permission</b>', 'Parent or guardian', 'Authorizes treatment for the child'],
      ['<b>Assent</b>', 'Child, from roughly <b>age 7</b>, developmentally adjusted', 'Child\'s agreement. <b>Dissent should be honored when the intervention is not essential</b> (research, elective)'],
      ['<b>Emancipated minor</b>', 'Married, military, court-emancipated, financially independent and living apart, often parenting', '<b>Consents to all of their own care</b>'],
      ['<b>Mature minor</b>', 'Varies by state; capacity-based', 'Consent for specified care'],
      ['<b>Condition-based consent</b>', 'Nearly all states, most adolescents', '<b>STI, contraception, pregnancy care, substance use treatment</b>, often mental health'],
      ['<b>Emergency exception</b>', 'Any child, life-threatening situation', '<b>Treat now</b>; seek court order concurrently, not first']
    ],
    tell: 'Parents give permission; children give assent. When parents refuse clearly life-saving treatment, the threshold for overriding them is significant risk of serious harm — and in an emergency you treat first and get the court order afterward. Delaying life-saving therapy for a court order is the trap.'
  },

  /* --- Safety / stats --- */
  {
    id: 'testchar', d: 24, t: 'Sensitivity vs Specificity vs PPV/NPV',
    noLabel: true,
    cols: ['Measure', 'Definition', 'Behavior'],
    rows: [
      ['<b>Sensitivity</b>', 'TP ÷ all with disease', '<b>Fixed</b> — does not change with prevalence. <b>SnNout</b>: negative rules out. Good for screening.'],
      ['<b>Specificity</b>', 'TN ÷ all without disease', '<b>Fixed</b>. <b>SpPin</b>: positive rules in. Good for confirmation.'],
      ['<b>PPV</b>', 'TP ÷ all who tested positive', '<b>FALLS as prevalence falls</b> — the whole point of the question'],
      ['<b>NPV</b>', 'TN ÷ all who tested negative', '<b>RISES as prevalence falls</b>']
    ],
    tell: 'Sensitivity and specificity are properties of the TEST; predictive values are properties of the test IN A POPULATION. Apply a great screening test to a low-prevalence group and PPV collapses — most positives become false positives. That single fact is the most-tested statistic on the exam.'
  },
  {
    id: 'qimeasure', d: 24, t: 'Outcome vs Process vs Balancing measures (and RCA vs FMEA)',
    noLabel: true,
    cols: ['Type', 'Asks', 'Example (reducing time to antibiotics)'],
    rows: [
      ['<b>Outcome</b>', 'Did the patient do better?', 'Sepsis mortality; time to antibiotic administration'],
      ['<b>Process</b>', 'Did we perform the step?', '% with an order placed within 15 min of triage'],
      ['<b>Balancing</b>', 'What did we break elsewhere?', 'Inappropriate antibiotic use in non-neutropenic patients; ED crowding'],
      ['<b>RCA</b>', '<b>Retrospective</b> — why did this happen?', 'After a sentinel event; repeated "why"'],
      ['<b>FMEA</b>', '<b>Prospective</b> — how could this fail?', 'Before rolling out a new process']
    ],
    tell: 'Process = the step you did. Outcome = what the patient experienced. Balancing = the unintended consequence. And RCA looks backward after an event while FMEA looks forward before one — the tense of the stem gives it away.'
  },

  /* --- Preventive --- */
  {
    id: 'growthfail', d: 1, t: 'Failure to thrive — which parameter fell first',
    cols: ['Inadequate nutrition', 'Endocrine', 'Genetic / prenatal insult'],
    rows: [
      ['Sequence', '<b>Weight → then length → then head</b>', '<b>Length falls, weight preserved</b>', '<b>All three low from birth</b>'],
      ['Weight for height', 'Low', '<b>High (overweight for height)</b>', 'Proportionate'],
      ['Head circumference', 'Preserved until late', 'Normal', '<b>Small early</b>'],
      ['Bone age', 'Mildly delayed', '<b>Delayed</b>', 'Variable'],
      ['Direction', 'Feed and it recovers', 'Treat the hormone', 'Genetic evaluation']
    ],
    tell: 'Order of decline is the diagnosis. Weight first = nutrition. Height falling while weight holds = endocrine. Head circumference small from the start = genetic or prenatal, and no amount of calories fixes it.'
  }
];

if (typeof window !== 'undefined') {
  window.CD_PREP = window.CD_PREP || {};
  window.CD_PREP.CRAM = CRAM;
  window.CD_PREP.DIFFS = DIFFS;
}
