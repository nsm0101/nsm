/*
 * CloseDose — ABP General Pediatrics Board Prep
 * Content data: blueprint domains, high-yield pearls, traps, and retrieval-practice items.
 *
 * Domain weights are taken verbatim from the American Board of Pediatrics
 * "General Pediatrics Content Outline," effective for all examinations
 * administered October 15, 2024 and after (minor revisions December 2024).
 * https://www.abp.org/content/general-pediatrics-content-outline
 *
 * Educational use only. Verify all management decisions against current
 * guidelines and your own clinical judgment.
 */

/* global window */

const EXAM = {
  date: '2026-10-14T08:00:00',
  label: 'ABP General Pediatrics Certifying Exam',
  sections: 4,
  minutesPerSection: 105,
  questionsLow: 330,
  questionsHigh: 350,
  breakMinutes: 15,
};

/* ------------------------------------------------------------------ *
 * DOMAINS — weights are the official ABP exam blueprint percentages.
 * `pearls` are grouped high-yield facts. `traps` are the specific ways
 * these topics are made to look like something else on the exam.
 * ------------------------------------------------------------------ */

const DOMAINS = [
  {
    id: 1,
    name: 'Preventive Pediatrics / Well-Child Care',
    weight: 12,
    tag: 'prev',
    why:
      'The single largest block on the exam — roughly one question in eight. This is also the domain most often ' +
      'under-studied by residents who spend their prep time on subspecialty content. Points here are the cheapest ' +
      'on the entire test: the answers are protocolized and knowable.',
    pearls: [
      {
        t: 'Developmental milestones — the highest-frequency well-child topic',
        items: [
          '<b>2 mo:</b> social smile, lifts head 45°, coos, fixes and follows past midline.',
          '<b>4 mo:</b> rolls front→back, laughs, holds head steady, reaches for objects, hands to midline.',
          '<b>6 mo:</b> sits tripod, rolls both ways, transfers hand-to-hand, babbles, stranger awareness begins.',
          '<b>9 mo:</b> sits without support, crawls, pulls to stand, immature pincer, "mama/dada" <i>non</i>specific, object permanence, waves bye-bye.',
          '<b>12 mo:</b> cruises / first steps, mature pincer, 1–3 words, "mama/dada" <i>specific</i>, follows 1-step command <i>with</i> gesture.',
          '<b>15 mo:</b> walks well, 4–6 words, scribbles, drinks from cup, stacks 2 blocks.',
          '<b>18 mo:</b> runs, 10–25 words, points to body parts, removes clothing, feeds self with spoon, stacks 4 blocks.',
          '<b>24 mo:</b> 2-word phrases, ≥50 words, <b>50% intelligible</b>, jumps, kicks ball, stairs 2-feet-per-step, parallel play, stacks 6.',
          '<b>3 yr:</b> 3-word sentences, <b>75% intelligible</b>, tricycle, copies a circle, stairs alternating feet, knows age/sex.',
          '<b>4 yr:</b> <b>100% intelligible</b>, copies a cross then a square, hops on one foot, cooperative play, draws person with 3 parts.',
          '<b>5 yr:</b> skips, copies a triangle, prints name, counts to 10, draws person with 6 parts, ties shoes (5–6 yr).',
        ],
      },
      {
        t: 'Milestone red flags — memorize these as absolutes',
        items: [
          'No social smile by <b>3 months</b>.',
          'No babbling / no reciprocal vocalizing by <b>9 months</b>.',
          'No single words by <b>15–18 months</b>.',
          'No 2-word meaningful phrases by <b>24 months</b>.',
          '<b>Any loss of previously acquired skills at any age</b> — this is the single most urgent stem in the whole domain. Think Rett, Landau-Kleffner, a metabolic/neurodegenerative disorder, or abuse. The answer is essentially never "reassure and recheck."',
          'Persistent primitive reflexes, hand preference before 18 months (suggests hemiparesis), or persistent fisting past 3 months.',
        ],
      },
      {
        t: 'Immunization contraindications vs. precautions vs. non-issues',
        items: [
          '<b>True contraindications:</b> anaphylaxis to a prior dose or vaccine component; severe immunodeficiency or pregnancy for <i>live</i> vaccines; encephalopathy within 7 days of a pertussis-containing vaccine (→ contraindicates further pertussis); history of intussusception or SCID (→ rotavirus).',
          '<b>Precautions to DTaP</b> (weigh risk/benefit, do not reflexively withhold): temp ≥40.5 °C within 48 h, hypotonic-hyporesponsive episode, persistent inconsolable crying ≥3 h within 48 h, seizure within 3 days.',
          '<b>NOT contraindications</b> — this is the tested half: mild illness ± low-grade fever, current antibiotic use, breastfeeding, prematurity (vaccinate by chronologic age), family history of adverse events, non-anaphylactic egg allergy, a household contact who is pregnant or immunosuppressed (exception: household contact should not receive oral polio — not used in the US).',
          '<b>Egg allergy of any severity is no longer a contraindication to influenza vaccine</b> — give the age-appropriate vaccine with no special precautions. This is a favorite update-check question.',
          'High-dose steroids = ≥2 mg/kg/day or ≥20 mg/day of prednisone equivalent for <b>≥14 days</b> → defer live vaccines for 1 month after stopping. Inhaled, topical, or short courses do not count.',
          '<b>Rotavirus windows:</b> first dose must be given by 14 weeks 6 days; final dose by 8 months 0 days. If the first dose is missed past that window, the series is not started.',
          '<b>Live vaccine spacing:</b> MMR and varicella must be given on the same day or separated by ≥28 days. After IVIG or blood products, defer MMR/varicella (interval depends on product, up to 11 months).',
          '<b>Hepatitis B:</b> all newborns get a birth dose within 24 h. If mother is HBsAg-positive → vaccine <b>and</b> HBIG within 12 h. If mother\'s status is unknown → vaccine within 12 h, send maternal serology, add HBIG within 7 days if positive.',
          '<b>Asplenia, sickle cell, complement deficiency, or eculizumab</b> → meningococcal (ACWY <i>and</i> B), pneumococcal, and Hib per high-risk schedules.',
        ],
      },
      {
        t: 'Screening — the ages are the answer',
        items: [
          '<b>Developmental screening</b> with a standardized tool: <b>9, 18, and 30 months</b> (surveillance at every visit).',
          '<b>Autism-specific screening (M-CHAT-R/F): 18 and 24 months.</b>',
          '<b>Lead:</b> 12 and 24 months (universal for Medicaid-enrolled or high-prevalence areas; risk-based otherwise).',
          '<b>Hemoglobin for anemia: 12 months.</b>',
          '<b>Lipids: universal once at 9–11 years and again at 17–21 years</b> (targeted screening earlier if family history or risk factors).',
          '<b>HIV: once between 15 and 18 years.</b>',
          '<b>Depression (PHQ-A or similar): annually from 12 through 21 years.</b>',
          '<b>Blood pressure: annually starting at age 3</b> (every visit if obesity, renal disease, diabetes, coarctation repair, or on BP-raising medication).',
          '<b>Vision:</b> instrument-based photoscreening acceptable from 12 months; formal acuity beginning at 4–5 years. <b>Hearing:</b> newborn screen, then at 4, 5, 6, 8, and 10 years.',
          '<b>Maternal postpartum depression screening at the 1-, 2-, 4-, and 6-month infant visits</b> — a favorite "who is the patient?" question.',
          'Dyslipidemia, HIV, and depression screening ages are among the most commonly missed facts on this exam because they changed relatively recently.',
        ],
      },
      {
        t: 'Nutrition, growth, and obesity',
        items: [
          '<b>Vitamin D 400 IU/day</b> for all breastfed and partially breastfed infants starting shortly after birth; 600 IU/day from 12 months.',
          '<b>Iron:</b> exclusively breastfed term infants need 1 mg/kg/day supplemental iron starting at 4 months until iron-rich solids. Preterm: 2 mg/kg/day from 1 month.',
          '<b>Whole cow\'s milk not before 12 months</b> (occult GI blood loss, iron deficiency, renal solute load). Limit to 16–24 oz/day after 12 months.',
          '<b>No honey before 12 months</b> (infant botulism). <b>No juice before 12 months</b>; ≤4 oz/day for ages 1–3.',
          'Complementary foods at ~6 months; <b>early introduction of allergenic foods (peanut at 4–6 months for high-risk infants)</b> reduces peanut allergy — the LEAP data. Delaying is the wrong answer.',
          '<b>Weight:</b> regains birth weight by 10–14 days, doubles by 4–5 months, triples by 12 months. <b>Length</b> increases 50% by 12 months. <b>Head circumference</b> grows ~2 cm/month for the first 3 months.',
          '<b>BMI:</b> ≥85th percentile = overweight; ≥95th = obesity; ≥120% of the 95th percentile = severe obesity.',
          '<b>Failure to thrive:</b> weight crossing 2 major percentile lines, or weight-for-length <5th. Weight drops first, then length, then head circumference. Head circumference falling <i>first</i> points away from nutrition and toward a neurologic or genetic cause.',
        ],
      },
      {
        t: 'Anticipatory guidance and safety',
        items: [
          '<b>Rear-facing car seat as long as possible</b> — until the child reaches the maximum height or weight for the convertible seat (AAP no longer names a specific age). Then forward-facing with harness, then belt-positioning booster until ~4\'9" and 8–12 years, then rear seat until age 13.',
          '<b>Safe sleep:</b> supine, on a firm flat non-inclined surface, in the parents\' room (not bed) ideally for 6 months, no soft bedding/bumpers, avoid overheating, consider a pacifier at sleep onset, breastfeeding is protective.',
          '<b>Toilet training</b> readiness typically 18–30 months; regression with a new sibling is normal — the answer is reassurance and avoiding punishment.',
          '<b>Screen media:</b> avoid screens other than video chat before 18 months; 18–24 months only high-quality co-viewed content; ≤1 h/day of high-quality programming for ages 2–5.',
          '<b>Firearms:</b> the only evidence-based counseling is that the safest home for a child has no gun; if present, store unloaded and locked with ammunition locked separately.',
          '<b>Water safety:</b> touch supervision, 4-sided isolation fencing with self-latching gate, swim lessons from ~1 year.',
        ],
      },
    ],
    traps: [
      'A stem that describes a normal variant in loving detail and offers four "workup" options — the answer is reassurance. ABP rewards the physician who does not over-test.',
      'Vaccine questions almost always hinge on distinguishing a <i>precaution</i> from a <i>contraindication</i>. If the option "administer the vaccine today" exists, ask hard whether the finding is truly a contraindication — usually it is not.',
      'Milestone questions plant the child\'s <b>corrected</b> age for preemies (correct until 2 years). Read the gestational age.',
      'Screening questions give a plausible age that is off by one visit. Know the exact ages, not the approximate ones.',
    ],
  },

  {
    id: 2,
    name: 'Fetal and Neonatal Care',
    weight: 4,
    tag: 'neo',
    why:
      'Small weight, but extremely predictable content — jaundice, respiratory distress, and congenital infection account for most of it. ' +
      'High points-per-hour if you drill the discriminators.',
    pearls: [
      {
        t: 'Neonatal jaundice',
        items: [
          '<b>Jaundice in the first 24 hours of life is always pathologic</b> until proven otherwise → hemolysis (ABO/Rh incompatibility, G6PD, spherocytosis), sepsis, or congenital infection. Get a direct Coombs, CBC with smear, and total/direct bilirubin.',
          '<b>Physiologic jaundice</b> peaks at 3–5 days (later and higher in breastfed and in East Asian infants) and is unconjugated.',
          '<b>Breastfeeding ("not enough") jaundice:</b> first week, from inadequate intake and increased enterohepatic circulation — the answer is <i>more effective and more frequent breastfeeding</i>, plus lactation support, not stopping.',
          '<b>Breast milk jaundice:</b> starts later (day 5–7), peaks at 2 weeks, can persist to 12 weeks; infant is thriving; continue breastfeeding.',
          '<b>Conjugated (direct) hyperbilirubinemia is never physiologic.</b> Direct >1.0 mg/dL (or >20% of total) → evaluate urgently for biliary atresia, and remember the Kasai portoenterostomy window is <b>before 60 days</b> of life.',
          '<b>Kernicterus</b> risk factors: prematurity, hemolysis, sepsis, acidosis, hypoalbuminemia, and drugs that displace bilirubin (ceftriaxone, sulfonamides).',
          'Prolonged unconjugated jaundice beyond 2 weeks → check a thyroid study and consider hypothyroidism, galactosemia, pyloric stenosis, and Gilbert/Crigler-Najjar.',
        ],
      },
      {
        t: 'Neonatal respiratory distress — separate by timing and film',
        items: [
          '<b>TTN:</b> term or late-preterm, often after C-section, tachypnea beginning within minutes to hours, resolves in 24–72 h. Film shows perihilar streaking and fluid in the fissures.',
          '<b>RDS:</b> preterm, worsens over the first hours, grunting/retracting, ground-glass with air bronchograms and low lung volumes. Surfactant, CPAP. Antenatal steroids are the prevention answer.',
          '<b>Meconium aspiration:</b> term/post-term, meconium-stained fluid, coarse patchy infiltrates with hyperinflation; risk of PPHN and pneumothorax.',
          '<b>Congenital diaphragmatic hernia:</b> scaphoid abdomen, bowel sounds in the chest, mediastinal shift. <b>Do not bag-mask ventilate</b> — intubate and place an NG tube to decompress.',
          '<b>Choanal atresia:</b> cyanosis at rest that improves with crying; cannot pass a catheter through the nares. Think CHARGE.',
          '<b>Pneumothorax:</b> sudden decompensation, asymmetric breath sounds, transillumination.',
        ],
      },
      {
        t: 'Cyanosis and ductal-dependent lesions',
        items: [
          '<b>Hyperoxia test:</b> 100% O₂ for 10 min. PaO₂ >150–250 mm Hg suggests pulmonary disease; failure to rise (<100) suggests cyanotic congenital heart disease.',
          '<b>Start prostaglandin E1</b> for suspected ductal-dependent lesions; the tested side effect is <b>apnea</b> (also fever, hypotension) — be prepared to intubate.',
          'Cyanotic lesions — the 5 T\'s: <b>T</b>ransposition, <b>T</b>etralogy, <b>T</b>runcus arteriosus, <b>T</b>otal anomalous pulmonary venous return, <b>T</b>ricuspid atresia (plus pulmonary atresia and Ebstein).',
          '<b>Pulse oximetry CCHD screening</b> at ≥24 h: right hand and either foot; fails if any reading <90%, or 90–94% in both or >3% difference on 3 measurements an hour apart.',
        ],
      },
      {
        t: 'Birth injuries and the newborn exam',
        items: [
          '<b>Caput succedaneum:</b> crosses suture lines, present at birth, resolves in days. <b>Cephalohematoma:</b> subperiosteal, <i>does not cross</i> sutures, may enlarge after birth, risk of jaundice. <b>Subgaleal hemorrhage:</b> crosses sutures, boggy and expanding, can hold the entire blood volume — this is the emergency.',
          '<b>Erb palsy (C5–C6):</b> "waiter\'s tip," intact grasp. <b>Klumpke (C8–T1):</b> claw hand, absent grasp, ± Horner. Most resolve; refer if no recovery by 3–6 months.',
          '<b>Clavicle fracture:</b> most common birth fracture; crepitus, asymmetric Moro; no treatment needed.',
          '<b>Single umbilical artery</b> → association with renal anomalies (obtain renal ultrasound if other anomalies present).',
          '<b>Delayed passage of meconium beyond 48 hours</b> → Hirschsprung disease, cystic fibrosis (meconium ileus), hypothyroidism.',
          '<b>Vitamin K refusal</b> → late hemorrhagic disease of the newborn, classically intracranial hemorrhage at 2–12 weeks in an exclusively breastfed infant.',
        ],
      },
      {
        t: 'Maternal conditions and neonatal consequences',
        items: [
          '<b>Infant of a diabetic mother:</b> macrosomia, hypoglycemia (hyperinsulinism), polycythemia, hypocalcemia, small left colon, cardiac septal hypertrophy, and <b>caudal regression</b> (most specific).',
          '<b>Maternal SSRI:</b> transient neonatal adaptation syndrome (jitteriness, irritability, feeding difficulty) in the first days.',
          '<b>Neonatal abstinence syndrome:</b> onset 24–72 h for opioids (later for methadone/buprenorphine); first-line is <b>non-pharmacologic care and rooming-in (Eat, Sleep, Console)</b>, then morphine if needed.',
          '<b>Maternal GBS:</b> adequate intrapartum prophylaxis = penicillin, ampicillin, or cefazolin ≥4 h before delivery. Clindamycin is <i>not</i> considered adequate.',
          '<b>Maternal Graves disease:</b> transplacental TSI can cause neonatal thyrotoxicosis even if the mother is euthyroid post-ablation.',
          '<b>Maternal SLE with anti-Ro/SSA:</b> neonatal lupus — annular rash and <b>congenital complete heart block</b>.',
        ],
      },
    ],
    traps: [
      'A well-appearing jaundiced newborn at 36 hours with a normal exam still needs the bilirubin plotted on a nomogram against <i>hours of life</i>, not against a single cutoff number.',
      'Bilious emesis in a newborn is malrotation with volvulus until an upper GI series says otherwise — never observation.',
      'The scaphoid abdomen in a distressed newborn is the tell for diaphragmatic hernia; the wrong answer is bag-mask ventilation.',
    ],
  },

  {
    id: 3,
    name: 'Adolescent Care',
    weight: 5,
    tag: 'adol',
    why:
      'Consistently under-prepared and mixed with ethics and gynecology questions. Tanner staging and confidentiality rules are near-guaranteed appearances.',
    pearls: [
      {
        t: 'Puberty — sequence and timing',
        items: [
          '<b>Girls:</b> thelarche (breast bud) is first, average 10–11 years → pubarche → <b>peak height velocity at Tanner 2–3</b> → menarche at Tanner 4, about 2–2.5 years after thelarche. Growth after menarche averages only 5–7 cm more.',
          '<b>Boys:</b> <b>testicular enlargement is first</b> (≥4 mL volume or >2.5 cm length), average 11–12 years → pubarche → penile growth → <b>peak height velocity later, at Tanner 3–4</b>. This later growth spurt is why boys end up taller.',
          '<b>Precocious puberty:</b> secondary sexual characteristics before <b>8 in girls, 9 in boys</b>. Precocious puberty in a <i>boy</i> is far more likely to be pathologic — image the CNS.',
          '<b>Delayed puberty:</b> no breast development by <b>13</b> in girls, no menarche by <b>15</b> (or >3 years after thelarche), no testicular enlargement by <b>14</b> in boys.',
          '<b>Constitutional delay of growth and puberty:</b> the most common cause of delayed puberty — short but growing at a normal velocity, <b>delayed bone age</b>, positive family history of "late bloomers." Reassurance ± short testosterone course.',
          '<b>Physiologic gynecomastia</b> occurs in up to 65% of adolescent boys at Tanner 3–4, is often asymmetric and tender, and resolves within 1–2 years. Reassure. Consider Klinefelter if it persists or the testes are small and firm.',
        ],
      },
      {
        t: 'Confidentiality and consent',
        items: [
          'In nearly every US state, minors may consent independently to care for <b>STIs, contraception, pregnancy, substance use treatment, and (variably) mental health</b>.',
          'Confidentiality must be <b>broken</b> for: intent to harm self, intent to harm others, and suspected abuse. Anything else is generally protected.',
          'The tested move is to interview the adolescent <b>alone for part of every visit</b> from early adolescence onward, and to state the limits of confidentiality up front, before sensitive questions.',
          '<b>Emancipated minor:</b> married, in the military, financially independent/living apart, or emancipated by a court — may consent to all care. <b>Mature minor</b> doctrine varies by state.',
        ],
      },
      {
        t: 'Contraception and sexual health',
        items: [
          '<b>LARC (implant and IUD) is first-line for adolescents</b> per AAP and ACOG — highest efficacy, best continuation. Nulliparity is not a contraindication to an IUD.',
          '<b>No pelvic exam, Pap, or STI test is required before starting hormonal contraception</b> — only a blood pressure for combined methods, and reasonable certainty the patient is not pregnant.',
          'Combined hormonal contraception is contraindicated in <b>migraine with aura</b>, history of VTE, uncontrolled hypertension, and <30 days postpartum.',
          '<b>Emergency contraception:</b> levonorgestrel up to 72 h (less effective with higher BMI), ulipristal up to 120 h, and the <b>copper IUD is the most effective</b>, up to 5 days.',
          '<b>Cervical cancer screening starts at 21</b> regardless of sexual debut — a common trap.',
          'Annual chlamydia and gonorrhea screening for all sexually active females <25; screen sexually active males in high-prevalence settings; <b>HIV once between 15 and 18</b>. Offer <b>PrEP</b> to adolescents at substantial risk.',
        ],
      },
      {
        t: 'Gender-diverse and transgender care',
        items: [
          'Use the patient\'s stated name and pronouns; ask, do not assume. Documented affirmation is associated with reduced depression and suicidality.',
          'GnRH agonists ("puberty blockers") may be offered at Tanner 2 and are reversible; gender-affirming hormones are typically considered in mid-adolescence with multidisciplinary involvement.',
          'Screen for depression, suicidality, victimization, and housing instability — risk is substantially elevated relative to cisgender peers.',
        ],
      },
      {
        t: 'Adolescent-specific screening',
        items: [
          '<b>HEEADSSS</b> psychosocial interview: Home, Education/employment, Eating, Activities, Drugs, Sexuality, Suicide/depression, Safety.',
          '<b>CRAFFT</b> for substance use; <b>PHQ-A</b> for depression annually 12–21; <b>SCOFF</b> considerations for eating disorders.',
          'Leading causes of adolescent death: <b>unintentional injury (mostly motor vehicle), suicide, and homicide</b> — anticipatory guidance follows this list, and firearm access screening is part of suicide prevention.',
        ],
      },
    ],
    traps: [
      'A question that offers "discuss with the parents" as an option for a confidential adolescent concern — read carefully whether one of the mandatory-disclosure triggers is actually present.',
      'Tanner staging questions frequently ask which event comes <i>next</i> or whether growth is still expected. Anchor on: girls peak <i>before</i> menarche, boys peak <i>late</i>.',
      'Requiring a pelvic exam or STI testing before contraception is always the wrong answer.',
    ],
  },

  {
    id: 4,
    name: 'Infectious Diseases',
    weight: 7,
    tag: 'id',
    why:
      'Second-largest domain. ABP tests it as pattern recognition: a vignette with a specific constellation maps to one organism and one drug. ' +
      'The rash-plus-fever differential alone is worth several questions.',
    pearls: [
      {
        t: 'Fever and rash — the classic discriminators',
        items: [
          '<b>Kawasaki disease:</b> fever ≥5 days plus 4 of 5 — bilateral <i>non-exudative</i> conjunctivitis with limbal sparing, oral changes (cracked lips, strawberry tongue), polymorphous rash, extremity changes (edema then periungual desquamation), and <b>unilateral</b> cervical node ≥1.5 cm. Treat with IVIG + aspirin, echo at diagnosis, 2 weeks, and 6–8 weeks.',
          '<b>Scarlet fever:</b> sandpaper rash, circumoral pallor, Pastia lines in the flexures, strawberry tongue, desquamation later. Group A strep.',
          '<b>Toxic shock syndrome:</b> fever, <b>hypotension</b>, diffuse macular erythroderma, multi-organ involvement, desquamation of palms and soles at 1–2 weeks. Look for a minor staph focus (furuncle, packing, wound).',
          '<b>Measles:</b> 3 C\'s — cough, coryza, conjunctivitis — plus <b>Koplik spots</b> before a cephalocaudal confluent rash. Give <b>vitamin A</b>. Complications: otitis, pneumonia, encephalitis, and SSPE years later.',
          '<b>Roseola (HHV-6):</b> 3–5 days of <i>high</i> fever in a well-appearing infant, then rash appears <b>as the fever breaks</b>. Common cause of a first febrile seizure.',
          '<b>Erythema infectiosum (parvovirus B19):</b> "slapped cheek" then lacy reticular rash; <b>no longer contagious once the rash appears</b>. Causes aplastic crisis in hemolytic anemias, hydrops fetalis in pregnancy, and arthritis in adolescents/adults.',
          '<b>Hand-foot-and-mouth (coxsackie A16, enterovirus 71):</b> oral ulcers plus vesicles on palms, soles, and buttocks. Nail shedding weeks later.',
          '<b>Rocky Mountain spotted fever:</b> fever, headache, rash starting on <b>wrists and ankles</b> moving centrally, including palms and soles. <b>Doxycycline regardless of age</b> — treat on suspicion, do not wait for serology.',
          '<b>Lyme disease:</b> erythema migrans (may lack central clearing). Early disseminated: multiple EM lesions, <b>cranial nerve VII palsy</b>, carditis with heart block. Late: monoarticular knee arthritis. <b>Doxycycline is now recommended at any age</b> for Lyme.',
          '<b>Meningococcemia:</b> rapidly progressive petechiae/purpura with shock. Droplet precautions and chemoprophylaxis for close contacts.',
        ],
      },
      {
        t: 'Congenital infections — one finding each',
        items: [
          '<b>CMV:</b> <i>peri</i>ventricular calcifications, microcephaly, petechiae/"blueberry muffin," and <b>sensorineural hearing loss</b> (most common infectious cause). Treat symptomatic disease with valganciclovir to preserve hearing.',
          '<b>Toxoplasmosis:</b> <i>diffuse</i> intracranial calcifications, <b>chorioretinitis</b>, hydrocephalus.',
          '<b>Rubella:</b> cataracts, <b>PDA</b> and peripheral pulmonic stenosis, "blueberry muffin" rash, deafness.',
          '<b>Syphilis:</b> snuffles, desquamating rash <b>including palms and soles</b>, hepatosplenomegaly, long-bone metaphyseal changes; later Hutchinson teeth, saber shins, interstitial keratitis.',
          '<b>Neonatal HSV:</b> three forms — SEM (skin/eye/mouth), CNS (seizures at 2–3 weeks), and disseminated (sepsis, hepatitis, DIC). Most mothers have no known history. <b>High-dose IV acyclovir.</b>',
          '<b>Zika:</b> severe microcephaly with a collapsed skull and subcortical calcifications.',
        ],
      },
      {
        t: 'Empiric therapy by syndrome and age',
        items: [
          '<b>Neonatal sepsis/meningitis (<28 days):</b> GBS, <i>E. coli</i>, <i>Listeria</i> → ampicillin + gentamicin (add cefotaxime/ceftazidime for meningitis) ± acyclovir.',
          '<b>Meningitis >1 month:</b> <i>S. pneumoniae</i>, <i>N. meningitidis</i> → vancomycin + ceftriaxone. <b>Dexamethasone</b> has proven benefit for <i>H. influenzae</i> type b (hearing preservation) and is debated for pneumococcus; give before or with the first antibiotic dose.',
          '<b>Febrile infant:</b> ≤28 days — full evaluation (blood, urine, CSF) and admit on empiric antibiotics, no exceptions. 29–60 days — risk stratification by inflammatory markers (procalcitonin, CRP, ANC) may permit deferring LP and observing, per the 2021 AAP clinical practice guideline.',
          '<b>Osteomyelitis/septic arthritis:</b> <i>S. aureus</i> at all ages; add <b><i>Kingella kingae</i></b> for children <4 years (indolent, often culture-negative, PCR-diagnosed) and <b><i>Salmonella</i></b> in sickle cell disease.',
          '<b>Acute otitis media:</b> high-dose amoxicillin 80–90 mg/kg/day. Use amoxicillin-clavulanate if amoxicillin in the last 30 days, concurrent purulent conjunctivitis, or recurrent AOM.',
          '<b>Group A strep pharyngitis:</b> penicillin or amoxicillin. Treatment prevents <b>acute rheumatic fever but not post-streptococcal glomerulonephritis</b> — a perennial question.',
          '<b>Pertussis:</b> azithromycin for the patient <i>and</i> all household contacts regardless of immunization status. Infants <1 month get azithromycin (erythromycin is linked to pyloric stenosis).',
        ],
      },
      {
        t: 'Tuberculosis and travel',
        items: [
          '<b>TST cutoffs:</b> ≥5 mm for HIV/immunosuppressed, close contacts, or those with clinical/radiographic evidence; ≥10 mm for children <4 years, high-risk exposure, or those from endemic areas; ≥15 mm for everyone else.',
          '<b>IGRA</b> is preferred for children ≥2 years who received BCG, since it is not confounded by BCG.',
          '<b>Latent TB:</b> 3 months of isoniazid + rifapentine weekly, or 4 months of rifampin daily — shorter regimens are now favored over 9 months of INH.',
          '<b>Malaria prophylaxis and fever in the returning traveler:</b> any fever after travel to an endemic area requires thick and thin smears, repeated up to 3 times. <i>P. falciparum</i> is the one that kills.',
        ],
      },
      {
        t: 'Post-exposure and infection control',
        items: [
          '<b>Varicella exposure in a susceptible high-risk patient</b> (immunocompromised, pregnant, neonate whose mother had varicella 5 days before to 2 days after delivery): VariZIG within 10 days. Healthy susceptible contacts: vaccine within 3–5 days.',
          '<b>Rabies:</b> bites from bats, raccoons, skunks, foxes → immediate wound washing, RIG infiltrated into the wound, plus vaccine series. <b>A bat in the room of a sleeping or unattended child counts as an exposure.</b> Dogs/cats/ferrets can be observed 10 days.',
          '<b>Animal and human bites:</b> amoxicillin-clavulanate — covers <i>Pasteurella</i> (cat/dog) and <i>Eikenella</i> (human). Cat bites are the ones that get infected.',
          '<b>Needlestick/sexual assault HIV PEP:</b> start within 72 hours, continue 28 days.',
          'Isolation basics: droplet for pertussis, influenza, meningococcus; airborne for measles, varicella, TB; contact for RSV, rotavirus, MRSA, scabies.',
        ],
      },
    ],
    traps: [
      'Doxycycline age restrictions — the modern answer is that <b>doxycycline is given at any age</b> for RMSF and Lyme; short courses do not stain teeth.',
      'A "negative" rapid strep in a classic case still needs a back-up culture in children; in adults it does not.',
      'ABP loves asking what treatment <i>prevents</i>. Antibiotics for strep prevent rheumatic fever, not PSGN. Antibiotics in HUS-associated <i>E. coli</i> O157:H7 make things worse.',
      'Kawasaki with only 2–3 criteria plus persistent fever and elevated inflammatory markers = <i>incomplete</i> Kawasaki, and still requires an echo and treatment. Do not require all 5 criteria.',
    ],
  },

  {
    id: 5,
    name: 'Mental and Behavioral Health',
    weight: 6,
    tag: 'mh',
    why:
      'Deliberately weighted up in the current blueprint and now larger than cardiology or GI. This is where recent exams have added questions, ' +
      'and where older review books are weakest. Do not skip it.',
    pearls: [
      {
        t: 'ADHD',
        items: [
          '<b>DSM-5 criteria:</b> ≥6 symptoms of inattention and/or hyperactivity-impulsivity (≥5 if age ≥17), present <b>before age 12</b>, in <b>≥2 settings</b>, for <b>≥6 months</b>, causing functional impairment.',
          'Diagnosis requires information from <b>both home and school</b> using validated rating scales (Vanderbilt, Conners). Neuroimaging and EEG have no role.',
          '<b>Ages 4–5: evidence-based parent training in behavior management is first-line</b>, before medication. Methylphenidate only if behavioral therapy fails and impairment is moderate-severe.',
          '<b>Ages ≥6: FDA-approved medication plus behavioral therapy.</b> Stimulants (methylphenidate or amphetamine class) are first-line; atomoxetine, guanfacine ER, and clonidine ER are second-line.',
          '<b>Stimulant side effects:</b> appetite suppression and weight loss, insomnia, headache, irritability, rebound in the late afternoon, and a small height decrement. Tics are a precaution, not an absolute contraindication.',
          'Screen for cardiac symptoms and family history of sudden death before stimulants — but <b>a routine ECG is not required</b> in an asymptomatic child with a negative history.',
        ],
      },
      {
        t: 'Autism spectrum disorder',
        items: [
          'Two core domains: persistent deficits in <b>social communication and social interaction</b>, plus <b>restricted, repetitive patterns</b> of behavior, interests, or activities (including sensory differences).',
          '<b>M-CHAT-R/F at 18 and 24 months.</b> A positive screen requires the follow-up interview, then referral for diagnostic evaluation, early intervention, and audiology — <b>all simultaneously, not sequentially</b>.',
          'Early red flags: no joint attention or pointing to share interest by 18 months, no response to name by 12 months, loss of language or social skills at any age.',
          'Evaluate for hearing loss and consider genetic testing (chromosomal microarray, fragile X). Early intensive behavioral intervention is the intervention with the best evidence.',
        ],
      },
      {
        t: 'Depression, anxiety, and suicide',
        items: [
          '<b>Universal annual depression screening from age 12</b> (PHQ-A). Screening without a treatment pathway is not recommended.',
          '<b>Fluoxetine and escitalopram are the SSRIs with pediatric FDA approval for depression</b>; fluoxetine has the strongest evidence. Combined SSRI + CBT beats either alone.',
          '<b>Black box warning:</b> increased suicidal ideation in children/adolescents. Follow up closely in the first weeks. The warning is not a reason to withhold treatment from a depressed adolescent.',
          '<b>Asking about suicide does not increase risk.</b> Ask directly, assess plan and access to means, and <b>counsel on lethal means restriction — especially firearms</b>, which is the highest-yield intervention.',
          'Anxiety disorders: CBT is first-line for mild-moderate; SSRIs added for moderate-severe.',
          'New-onset psychosis, catatonia, or a first manic episode is a psychiatric emergency requiring medical workup (substances, autoimmune encephalitis, thyroid, CNS lesion).',
        ],
      },
      {
        t: 'Eating disorders',
        items: [
          '<b>Anorexia nervosa:</b> restriction leading to low weight, intense fear of weight gain, body image disturbance. Medical findings: <b>bradycardia, hypotension, hypothermia</b>, orthostasis, lanugo, amenorrhea, prolonged QTc, low bone density.',
          '<b>Admission criteria</b> include heart rate <50 daytime (<45 at night), systolic BP <90, orthostatic changes, temperature <96 °F, <75% median BMI, arrhythmia, electrolyte disturbance, or failure of outpatient treatment.',
          '<b>Refeeding syndrome: hypophosphatemia is the hallmark</b> (also hypokalemia, hypomagnesemia, thiamine depletion, fluid overload). Start low, advance slowly, monitor phosphorus daily.',
          '<b>Bulimia nervosa:</b> normal or above-normal weight, parotid hypertrophy, dental erosion, <b>Russell sign</b> (knuckle calluses), and <b>hypokalemic hypochloremic metabolic alkalosis</b> from vomiting.',
          '<b>ARFID:</b> restriction from sensory aversion, lack of interest, or fear of aversive consequences — <b>without</b> body image disturbance.',
          '<b>Family-based treatment (Maudsley)</b> is first-line for adolescent anorexia. Fluoxetine helps bulimia; <b>bupropion is contraindicated</b> in eating disorders (seizure risk).',
        ],
      },
      {
        t: 'Substance use, vaping, and behavior disorders',
        items: [
          '<b>CRAFFT</b> is the validated adolescent screen; ≥2 positive answers warrants further assessment. Use SBIRT (screening, brief intervention, referral to treatment).',
          '<b>Nicotine vaping</b> is the most common form of tobacco use in adolescents; it is a gateway to combustible cigarettes. <b>EVALI</b> (vitamin E acetate in THC products) presents with dyspnea, GI symptoms, and bilateral infiltrates.',
          'Cannabis in adolescence: impaired attention/memory, association with psychosis in vulnerable individuals, cannabinoid hyperemesis syndrome (relieved by hot showers).',
          '<b>Oppositional defiant disorder:</b> angry/irritable mood, argumentative/defiant behavior, vindictiveness — directed at authority. <b>Conduct disorder:</b> violation of the rights of others or major societal norms (aggression to people/animals, destruction, deceit, serious rule violation).',
          '<b>Tourette syndrome:</b> multiple motor <i>and</i> ≥1 vocal tic for >1 year, onset before 18. Tics wax and wane and are suppressible. Treat only if impairing — habit reversal therapy first, then alpha-agonists.',
          '<b>School refusal</b> with somatic complaints that vanish on weekends → underlying anxiety. The answer is prompt return to school with a graded plan, not a medical workup.',
        ],
      },
    ],
    traps: [
      'For a 4- or 5-year-old with ADHD symptoms, the answer is <b>behavioral parent training</b>, not a stimulant. Age drives this question.',
      'A positive autism screen does not mean "refer and wait" — start early intervention and audiology at the same time as the diagnostic referral.',
      'The SSRI black box warning is offered as a reason to withhold treatment. It is not. Treat and monitor.',
      'Eating disorder questions hide the admission criterion in the vitals. Scan for bradycardia and orthostatic change before choosing "outpatient follow-up."',
    ],
  },

  {
    id: 6,
    name: 'Psychosocial Issues',
    weight: 3,
    tag: 'psy',
    why:
      'Low weight but very low effort — the answers follow a consistent philosophy: screen, validate, connect to resources, and do not moralize. ' +
      'Learn the framework and you will get most of these without content knowledge.',
    pearls: [
      {
        t: 'Adverse childhood experiences and toxic stress',
        items: [
          '<b>ACEs</b> (abuse, neglect, household dysfunction) show a dose-response relationship with adult heart disease, COPD, depression, substance use, and early death.',
          '<b>Toxic stress</b> = prolonged activation of the stress response <i>without</i> a buffering adult relationship. The protective factor — and the correct answer in most stems — is a <b>safe, stable, nurturing relationship</b>.',
          'Positive childhood experiences and caregiver support buffer risk; interventions target the caregiver-child dyad, not the child alone.',
        ],
      },
      {
        t: 'Social determinants and screening',
        items: [
          'AAP recommends screening for <b>food insecurity</b> (the validated 2-question Hunger Vital Sign), housing instability, and utility/transportation needs, with referral to concrete resources (WIC, SNAP, medical-legal partnership).',
          'Screening without a resource pathway is not recommended — the tested answer always pairs identification with a specific connection.',
          '<b>Racism is a social determinant of health</b> with measurable effects on birth outcomes and chronic disease. The professional response is to address it explicitly, not to attribute disparities to race as biology.',
          'Use professional <b>medical interpreters</b>, never family members and never children, for any patient with limited English proficiency. This is a near-guaranteed question.',
        ],
      },
      {
        t: 'Family structure, loss, and foster care',
        items: [
          '<b>Children in foster care</b> need a comprehensive health evaluation within 30 days, developmental and mental health screening, and careful medication reconciliation; they have high rates of unrecognized chronic disease and trauma.',
          '<b>Developmental understanding of death:</b> preschoolers see it as reversible and may feel magically responsible; school-age children (~7–10) grasp permanence and universality; adolescents understand it as adults do but may take risks despite it.',
          'After a death or divorce, the tested guidance is honest, concrete, developmentally appropriate language ("died," not "went to sleep" or "lost"), maintaining routines, and permitting the child to attend rituals if they wish.',
          '<b>Regression</b> (in toileting, sleep, speech) after a stressor is normal and self-limited; the answer is support and routine, not workup.',
        ],
      },
      {
        t: 'Bullying, media, and chronic illness',
        items: [
          '<b>Bullying</b> requires an imbalance of power, intent, and repetition. Victims and bully-victims have the highest risk of depression and suicidality. Screen victims for suicidality.',
          '<b>Cyberbullying</b> is distinguished by anonymity, permanence, and 24-hour reach. Counsel documenting, not retaliating, and reporting.',
          'A <b>family media use plan</b>, screen-free zones (bedrooms, meals), and no screens for 1 hour before bed are the concrete recommendations.',
          '<b>Chronic illness/disability:</b> promote the child\'s participation and self-management, plan transition to adult care starting at 12–14 years, and screen siblings and caregivers for stress.',
        ],
      },
    ],
    traps: [
      'If an option involves a family member interpreting, it is wrong.',
      'Questions about disparities that offer a biologic/racial explanation are testing whether you attribute the difference to <i>racism and structural factors</i> rather than to race itself.',
      'The right answer for a psychosocial stressor is rarely a laboratory test.',
    ],
  },

  {
    id: 7,
    name: 'Emergency and Critical Care',
    weight: 4,
    tag: 'em',
    why:
      'Algorithmic and therefore very learnable. Toxicology and shock recognition carry most of the weight, and the answers are protocol-driven.',
    pearls: [
      {
        t: 'Shock and resuscitation',
        items: [
          '<b>Compensated shock in children maintains blood pressure</b> — tachycardia, delayed capillary refill, cool extremities, and narrowed pulse pressure come first. <b>Hypotension is a late and ominous sign.</b>',
          '<b>Septic shock:</b> recognize within minutes, obtain cultures, give <b>antibiotics within 1 hour</b>, and start 10–20 mL/kg isotonic boluses reassessing for hepatomegaly and rales after each. Start <b>epinephrine</b> for fluid-refractory cold shock and <b>norepinephrine</b> for warm shock.',
          '<b>Anaphylaxis:</b> <b>IM epinephrine 0.01 mg/kg (max 0.5 mg) into the anterolateral thigh</b> is first and immediate. Antihistamines and steroids are adjuncts and never the first answer. Observe for <b>biphasic reactions</b>, and discharge with two autoinjectors and an action plan.',
          '<b>Cardiogenic shock</b> (myocarditis) worsens with aggressive fluids — the tell is hepatomegaly, gallop, and rales. Give small boluses and inotropes.',
          '<b>Pediatric bradycardia with poor perfusion:</b> oxygenate and ventilate first — most pediatric arrest is <b>respiratory</b> in origin. Chest compressions if HR <60 with poor perfusion despite oxygenation; then epinephrine.',
        ],
      },
      {
        t: 'Toxicology — antidotes and tells',
        items: [
          '<b>Acetaminophen:</b> plot the 4-hour level on the Rumack-Matthew nomogram; <b>N-acetylcysteine</b>, ideally within 8 hours. Elevated AST at 24–48 h.',
          '<b>Salicylates:</b> tinnitus, hyperpnea, and a mixed <b>respiratory alkalosis + anion-gap metabolic acidosis</b>. Alkalinize the urine.',
          '<b>Tricyclics:</b> wide QRS, seizures, hypotension, anticholinergic signs → <b>sodium bicarbonate</b>.',
          '<b>Organophosphates:</b> DUMBELS/cholinergic excess → <b>atropine</b> (titrate to drying of secretions) plus <b>pralidoxime</b>.',
          '<b>Iron:</b> vomiting/hematemesis, then a quiescent phase, then shock and metabolic acidosis; radiopaque tablets → <b>deferoxamine</b>.',
          '<b>Carbon monoxide:</b> headache and nausea in multiple family members; pulse oximetry is <b>falsely normal</b> → carboxyhemoglobin level, 100% O₂, hyperbaric for severe cases.',
          '<b>Clonidine:</b> mimics opioid toxicity — miosis, bradycardia, hypotension, somnolence.',
          '<b>Sulfonylureas:</b> hypoglycemia that recurs → octreotide.',
          '<b>Anticholinergic:</b> "mad as a hatter, red as a beet, dry as a bone, hot as a hare, blind as a bat" → physostigmine only in select cases.',
          '<b>Button battery in the esophagus: emergent endoscopic removal</b> — necrosis begins within 2 hours. Honey may be given en route if >12 months and within 12 hours. A battery <i>past</i> the esophagus in an asymptomatic child can be observed.',
          '<b>Caustic ingestion:</b> do <b>not</b> induce emesis or neutralize; endoscopy within 12–24 h.',
          'One-pill killers in a toddler: calcium channel blockers, TCAs, opioids (especially methadone), sulfonylureas, camphor, clonidine, and toxic alcohols.',
        ],
      },
      {
        t: 'BRUE and head injury rules',
        items: [
          '<b>Lower-risk BRUE (all must be true):</b> age >60 days; gestational age ≥32 weeks and postconceptional age ≥45 weeks; <b>first</b> event; duration <1 minute; <b>no CPR by a trained provider</b>; no concerning history or physical exam findings. Lower-risk infants need brief observation, pulse oximetry, education, and shared decision-making — <b>not</b> an extensive workup or admission.',
          '<b>PECARN head injury rules — CT is not indicated</b> in the very-low-risk group. For <b>&lt;2 years</b>: normal mental status, no scalp hematoma except frontal, LOC <5 s, non-severe mechanism, no palpable skull fracture, acting normally per parent. For <b>≥2 years</b>: normal mental status, no LOC, no vomiting, non-severe mechanism, no signs of basilar skull fracture, no severe headache.',
          '<b>Concussion:</b> no return to play the same day. Brief (24–48 h) relative rest, then a <b>graduated stepwise return</b> with 24 hours at each stage; return to <i>learn</i> precedes return to <i>play</i>. Complete darkened-room rest is outdated and harmful.',
        ],
      },
      {
        t: 'Status epilepticus and DKA',
        items: [
          '<b>Status epilepticus:</b> benzodiazepine at 5 minutes (may repeat once), then a second-line agent at ~20 minutes — <b>levetiracetam, fosphenytoin, or valproate are equivalent</b> (ESETT). Check glucose immediately.',
          '<b>DKA:</b> fluid resuscitate cautiously, then start an insulin <b>infusion at 0.05–0.1 units/kg/h after 1–2 hours of fluids</b>. <b>Never give an insulin bolus.</b> Add dextrose when glucose reaches ~250–300 while continuing insulin to clear ketosis.',
          '<b>Cerebral edema</b> is the leading cause of death in pediatric DKA — headache, recurrent vomiting, bradycardia with hypertension, and declining mental status, usually 4–12 hours into treatment. Treat with <b>hypertonic saline or mannitol immediately</b>; imaging comes after treatment.',
        ],
      },
      {
        t: 'Burns, drowning, and environmental',
        items: [
          '<b>Burn TBSA</b> by the rule of nines modified for children (a child\'s head is proportionally larger — 18% in an infant), or the patient\'s palm ≈ 1%. Superficial (first-degree) burns are <b>not</b> counted.',
          '<b>Parkland-type resuscitation:</b> 3–4 mL/kg per %TBSA of lactated Ringer over 24 h, half in the first 8 hours from the <i>time of injury</i>, plus maintenance fluids in children.',
          '<b>Circumferential burns</b> risk compartment syndrome → escharotomy. Suspect <b>inhalation injury</b> with facial burns, singed nares, carbonaceous sputum, or stridor → intubate early.',
          '<b>Immersion/scald burns with sharp demarcation, stocking-glove distribution, or sparing of flexural creases are abuse</b> until proven otherwise.',
          '<b>Drowning:</b> prognosis is driven by duration of submersion and the initial neurologic exam. There is no such entity as "dry drowning" or "secondary drowning" — an asymptomatic child with a normal exam after 4–6 hours of observation may go home.',
        ],
      },
    ],
    traps: [
      'Antihistamines or steroids offered as the first step in anaphylaxis. Epinephrine IM, always, first.',
      'A normal blood pressure offered as evidence that a tachycardic, poorly perfused child is not in shock.',
      'In DKA, options that include an insulin bolus or rapid correction — both wrong.',
      'A "lower-risk BRUE" stem loaded with reassuring details, with an extensive workup as a distractor.',
    ],
  },

  {
    id: 8,
    name: 'Child Abuse and Neglect',
    weight: 3,
    tag: 'abuse',
    why:
      'Small weight, exceptionally high yield per hour: the findings are specific, memorable, and repeatedly tested. ' +
      'Also the domain where the exam most reliably rewards recognizing a pattern rather than ordering a test.',
    pearls: [
      {
        t: 'Fractures with high specificity for abuse',
        items: [
          '<b>Classic metaphyseal lesion</b> (bucket-handle / corner fracture) — from shaking or yanking; essentially pathognomonic in an infant.',
          '<b>Posterior and posteromedial rib fractures</b> — from anteroposterior chest compression by squeezing hands. <b>CPR does not cause posterior rib fractures.</b>',
          '<b>Scapular, spinous process, and sternal fractures.</b>',
          'Any fracture in a <b>non-ambulatory infant</b> is highly suspicious — "if you don\'t cruise, you don\'t bruise" applies to fractures too.',
          'Multiple fractures in <b>different stages of healing</b>.',
          '<b>Skeletal survey is mandatory for all children <2 years</b> with suspected physical abuse, with a repeat survey in 2 weeks to catch healing injuries missed acutely.',
          'Low-specificity (common accidental) fractures: clavicle, linear skull, isolated long-bone spiral fracture in an ambulatory child, toddler fracture of the tibia.',
        ],
      },
      {
        t: 'Bruising — the TEN-4-FACESp rule',
        items: [
          'Bruising is concerning in children <4 years on the <b>T</b>orso, <b>E</b>ars, or <b>N</b>eck; <b>any</b> bruise in an infant <b>&lt;4 months</b>; or bruising of the <b>F</b>renulum, <b>A</b>ngle of jaw, <b>C</b>heek, <b>E</b>yelid, or <b>S</b>ubconjunctiva; or any <b>p</b>atterned bruise.',
          '<b>Sentinel injuries</b> — a small bruise, oral injury, or subconjunctival hemorrhage in a pre-mobile infant — precede severe abuse and are the single best opportunity for prevention. Recognizing one is often the answer.',
          'Bruises <b>cannot be reliably dated by color</b>. If an option offers an age estimate from color, it is wrong.',
        ],
      },
      {
        t: 'Abusive head trauma',
        items: [
          'The triad classically taught is <b>subdural hemorrhage, retinal hemorrhages, and encephalopathy</b>, often with no external signs of injury.',
          'The specific retinal finding is <b>numerous, multilayered hemorrhages extending to the periphery</b>, frequently with retinoschisis — this pattern is not produced by CPR, seizures, or ordinary falls. A dilated exam by ophthalmology is required.',
          'Short household falls essentially never cause severe intracranial injury or death.',
          'Workup: neuroimaging, skeletal survey, dilated fundoscopy, hepatic and pancreatic enzymes, coagulation studies, and a report to child protective services.',
        ],
      },
      {
        t: 'Mimics you must exclude — and not over-call',
        items: [
          '<b>Osteogenesis imperfecta</b> — blue sclerae, wormian bones, dentinogenesis imperfecta, family history.',
          '<b>Congenital dermal melanocytosis</b> ("Mongolian spots") — blue-gray, sacral/buttock, present from birth, no color evolution.',
          '<b>Coining, cupping, and moxibustion</b> — cultural practices producing patterned lesions; educate rather than report if no other concern.',
          '<b>ITP, hemophilia, von Willebrand, leukemia, vitamin K deficiency</b> — obtain CBC, PT/PTT, and appropriate factor studies when bruising is the finding.',
          '<b>Rickets</b> and copper deficiency can mimic metaphyseal changes.',
        ],
      },
      {
        t: 'Reporting, sexual abuse, and neglect',
        items: [
          '<b>Mandated reporting requires reasonable suspicion, not proof or certainty.</b> You do not need to identify the perpetrator, complete the workup, or inform the family first. "Report now" is nearly always the correct option when suspicion exists.',
          '<b>A normal anogenital exam does not exclude sexual abuse</b> — most examinations after sexual abuse are normal. Do not reassure based on a normal exam.',
          'Forensic evidence collection is generally indicated within 72 hours (some centers extend to 5 days in adolescents). A non-acute disclosure needs a specialized forensic interview, not repeated questioning by the pediatrician.',
          '<b>Gonorrhea, syphilis, HIV, and chlamydia beyond the perinatal period are diagnostic of sexual contact.</b> Anogenital warts and herpes are suggestive but less specific.',
          '<b>Caregiver-fabricated illness (medical child abuse):</b> symptoms observed only by the caregiver, discordant with objective findings, resolving when the caregiver is absent, and an extensive medical history with multiple providers.',
          '<b>Neglect</b> is the most common form of maltreatment and the most lethal in aggregate. Failure to thrive from neglect classically improves rapidly with feeding in hospital.',
        ],
      },
    ],
    traps: [
      'Options that delay reporting to "confirm" the diagnosis, obtain more imaging, or discuss with the family first.',
      'Attributing posterior rib fractures to CPR, or extensive retinal hemorrhages to a seizure or a short fall.',
      'Reassuring a family after a normal genital exam in a sexual abuse evaluation.',
      'Dating a bruise by its color.',
    ],
  },

  {
    id: 9,
    name: 'Orthopedics and Sports Medicine',
    weight: 4,
    tag: 'ortho',
    why:
      'Age plus location almost always determines the diagnosis. A handful of "cannot-miss" conditions (SCFE, septic arthritis, testicular torsion\'s orthopedic cousins) appear repeatedly.',
    pearls: [
      {
        t: 'The limping child, by age',
        items: [
          '<b>Developmental dysplasia of the hip (newborn–infant):</b> risk factors are breech position, female sex, family history, and firstborn. <b>Ortolani</b> reduces a dislocated hip (clunk in), <b>Barlow</b> dislocates a reducible hip (clunk out). <b>Ultrasound after 4–6 weeks</b> (before that there are too many false positives); <b>radiographs after 4–6 months</b> once the femoral head ossifies. Pavlik harness.',
          '<b>Transient synovitis (3–8 yr):</b> follows a viral illness, low-grade or no fever, child is comfortable at rest and will bear weight. Resolves with NSAIDs.',
          '<b>Septic arthritis:</b> <b>Kocher criteria</b> — fever >38.5 °C, non-weight-bearing, ESR ≥40, WBC >12,000. Three or four criteria make septic arthritis highly likely → <b>joint aspiration</b>, then surgical drainage and antibiotics. The hip held in flexion, abduction, and external rotation is the classic posture.',
          '<b>Legg-Calvé-Perthes (4–8 yr, boys):</b> idiopathic avascular necrosis of the femoral head; insidious painless limp; radiographs show a small, sclerotic, then fragmented femoral head.',
          '<b>Slipped capital femoral epiphysis (10–16 yr, obese, or with endocrinopathy):</b> hip, thigh, or <b>referred knee pain</b> with an <b>obligate external rotation on hip flexion</b> and limited internal rotation. <b>Frog-leg lateral radiographs of both hips.</b> Make the patient <b>non-weight-bearing immediately</b> and call orthopedics for in situ pinning — walking risks avascular necrosis. The contralateral hip slips in up to 40%.',
          '<b>Any adolescent with knee pain and a normal knee exam needs a hip examination and hip films.</b> This is one of the most reliably repeated concepts in the domain.',
        ],
      },
      {
        t: 'Upper extremity and spine',
        items: [
          '<b>Nursemaid\'s elbow (radial head subluxation, 1–4 yr):</b> axial traction on a pronated arm; the child holds the arm pronated and slightly flexed and refuses to use it. Reduce by <b>hyperpronation</b> (higher success) or supination-flexion. <b>No imaging needed</b> if the history is classic.',
          '<b>Supracondylar humerus fracture:</b> the most common pediatric elbow fracture. Look for a <b>posterior fat pad sign</b> or displacement of the <b>anterior humeral line</b> (should intersect the middle third of the capitellum). Check the <b>anterior interosseous nerve</b> — ask the child to make an "OK" sign. Watch for compartment syndrome.',
          '<b>Scoliosis:</b> Adam\'s forward bend test with a scoliometer; a Cobb angle >10° defines scoliosis. Braces for 25–45° in a skeletally immature patient (bracing works — it prevents progression); surgery generally >45–50°. <b>Left thoracic curves, pain, or a neurologic deficit are red flags for a syndromic or neurologic cause → MRI.</b>',
          '<b>Spondylolysis:</b> adolescent athlete in an extension sport (gymnastics, football linemen, divers) with back pain worse on extension; pars defect.',
        ],
      },
      {
        t: 'Overuse and apophysitis',
        items: [
          '<b>Osgood-Schlatter:</b> tibial tubercle pain and swelling in a jumping athlete during the growth spurt. Activity modification, not restriction.',
          '<b>Sever disease:</b> calcaneal apophysitis, heel pain in a running child, positive squeeze test.',
          '<b>Little League elbow</b> (medial epicondyle apophysitis) and <b>Little League shoulder</b> (proximal humeral physeal stress) → pitch counts and rest. <b>Osteochondritis dissecans of the capitellum</b> is the more worrisome lateral lesion.',
          '<b>Salter-Harris</b> classification: <b>S</b>traight across (I), <b>A</b>bove (II, most common), <b>L</b>ower (III), <b>T</b>hrough (IV), <b>ER</b>asure/crush (V, worst prognosis). Types III–V involve the articular surface or crush the physis and risk growth arrest.',
          '<b>Tenderness over the physis with normal radiographs in a skeletally immature athlete = Salter-Harris I</b> — immobilize and treat as a fracture.',
        ],
      },
      {
        t: 'Sports participation and safety',
        items: [
          'The <b>preparticipation evaluation</b> is driven by a 14-element history and exam. The cardiac screen looks for exertional syncope or chest pain, unexplained sudden death in a relative <50, and a murmur that <b>increases with standing or Valsalva</b> (hypertrophic cardiomyopathy). Routine ECG screening is <i>not</i> recommended in the US.',
          '<b>Exertional syncope is never benign</b> — it requires cardiac evaluation before clearance.',
          '<b>Absence of one paired organ</b> (single kidney, single eye with best-corrected acuity <20/40) requires individualized counseling; a single testicle is not a contraindication with a protective cup.',
          '<b>Female athlete triad / relative energy deficiency in sport (RED-S):</b> low energy availability, menstrual dysfunction, and low bone density → stress fractures. Treatment is increasing caloric intake, not oral contraceptives.',
          '<b>Exertional heat stroke:</b> core temperature >40 °C with CNS dysfunction → <b>immediate cold-water immersion first</b>, transport second ("cool first, transport second").',
          'Athletes with <b>sickle cell trait</b> are at risk of exertional rhabdomyolysis and sudden death with maximal exertion, dehydration, and altitude.',
        ],
      },
    ],
    traps: [
      'Referred knee pain in an obese adolescent — if you examine only the knee, you miss the SCFE.',
      'Allowing a child with suspected SCFE to walk to radiology.',
      '"Transient synovitis" offered for a febrile, non-weight-bearing child with elevated inflammatory markers — that is septic arthritis until aspirated.',
      'Ordering a hip ultrasound in the first 2–4 weeks of life, or a radiograph before the femoral head ossifies.',
    ],
  },

  {
    id: 10,
    name: 'Eye, Ear, Nose, and Throat',
    weight: 6,
    tag: 'eent',
    why:
      'Tied for the third-largest domain and almost always underestimated — most candidates budget cardiology-level time for cardiology and almost none for ENT, ' +
      'even though ENT is worth more questions. This is the highest-leverage correction most repeat test-takers can make.',
    pearls: [
      {
        t: 'Eye — the cannot-miss list',
        items: [
          '<b>Leukocoria (absent red reflex) is an emergency</b> → retinoblastoma, congenital cataract, retinopathy of prematurity, or Coats disease. Immediate ophthalmology referral, never observation.',
          '<b>Nasolacrimal duct obstruction:</b> tearing and crusting with a <i>white</i> eye and normal conjunctiva; massage; >90% resolve by 12 months; probe if persistent past 12 months.',
          '<b>Neonatal conjunctivitis by timing:</b> chemical <24 h; <b>gonococcal 2–5 days</b> (hyperacute, copious purulence, corneal perforation risk → IV/IM ceftriaxone and admission); <b>chlamydial 5–14 days</b> (→ <b>oral erythromycin</b>, which also treats the associated pneumonia — topical alone is inadequate); HSV 1–2 weeks with vesicles.',
          '<b>Periorbital (preseptal) cellulitis:</b> lid swelling and erythema with <b>normal</b> vision, normal extraocular movements, and no proptosis → oral antibiotics.',
          '<b>Orbital (postseptal) cellulitis:</b> <b>proptosis, pain with eye movement, ophthalmoplegia, or decreased vision</b> → CT of the orbits with contrast, IV antibiotics, and ophthalmology/ENT. Usually spreads from ethmoid sinusitis.',
          '<b>Strabismus:</b> any constant deviation at any age, or any deviation after 4 months, requires referral. <b>Pseudostrabismus</b> from prominent epicanthal folds has a <i>symmetric</i> corneal light reflex. Untreated strabismus causes <b>amblyopia</b>; treatment is patching or atropine penalization of the better eye, most effective before age 7.',
          '<b>Chemical eye injury: irrigate immediately and copiously before anything else</b>, including before checking acuity. Alkali burns are worse than acid.',
          '<b>Hyphema</b> → elevate the head, shield (do not patch), avoid NSAIDs, and screen for sickle cell disease, which dramatically raises the risk of complications.',
        ],
      },
      {
        t: 'Ear',
        items: [
          '<b>Acute otitis media requires</b> moderate-to-severe bulging of the tympanic membrane, or new otorrhea not from otitis externa, or mild bulging with recent ear pain or intense erythema. <b>An effusion alone is not AOM.</b>',
          '<b>Observation option:</b> permitted for non-severe unilateral AOM in children ≥6 months with reliable follow-up (and for bilateral non-severe in children ≥24 months). <b>Always treat</b> if <6 months, severe (temp ≥39 °C or moderate/severe otalgia), or with otorrhea.',
          '<b>Amoxicillin 80–90 mg/kg/day</b> is first-line. Use <b>amoxicillin-clavulanate</b> if amoxicillin within 30 days, concurrent purulent conjunctivitis (nontypeable <i>H. influenzae</i>), or recurrent AOM. For type I penicillin allergy, use a macrolide only reluctantly (high pneumococcal resistance) — prefer cefdinir/cefuroxime for non-anaphylactic allergy.',
          '<b>Otitis media with effusion:</b> watchful waiting for 3 months from onset; <b>tympanostomy tubes for bilateral effusion ≥3 months with documented hearing loss</b>, or recurrent AOM (≥3 in 6 months, ≥4 in 12 months with one recent). Antihistamines, decongestants, and steroids do <b>not</b> help OME.',
          '<b>Acute mastoiditis:</b> postauricular erythema, tenderness, and swelling with a <b>protruding auricle</b> → CT and IV antibiotics ± drainage.',
          '<b>Otitis externa:</b> pain with tragal traction, canal edema → <b>topical</b> antibiotic drops; add a wick if the canal is swollen shut. Systemic antibiotics only if it extends beyond the canal.',
          '<b>Cholesteatoma:</b> chronic painless malodorous drainage with a retraction pocket or white mass behind the TM → surgical.',
        ],
      },
      {
        t: 'Nose and sinuses',
        items: [
          '<b>Acute bacterial sinusitis requires one of three patterns:</b> (1) <b>persistent</b> symptoms ≥10 days without improvement, (2) <b>severe</b> onset with fever ≥39 °C and purulent discharge for ≥3 consecutive days, or (3) <b>worsening</b> course — "double sickening" after initial improvement. <b>Imaging is not needed</b> for uncomplicated sinusitis.',
          '<b>Unilateral foul-smelling purulent nasal discharge in a toddler = nasal foreign body</b> until removed.',
          '<b>Epistaxis</b> almost always arises from Kiesselbach plexus anteriorly → pinch the <i>soft</i> part of the nose for 10 minutes leaning forward. Recurrent unilateral epistaxis in an adolescent male with obstruction suggests <b>juvenile nasopharyngeal angiofibroma</b> — do not biopsy.',
          '<b>Allergic rhinitis:</b> <b>intranasal corticosteroids are the single most effective therapy</b> and are first-line for persistent symptoms; oral antihistamines for mild/intermittent. Allergic shiners, Dennie-Morgan lines, and the transverse nasal crease are the exam findings.',
        ],
      },
      {
        t: 'Throat and neck',
        items: [
          '<b>Group A strep pharyngitis:</b> test only if the presentation is compatible (do <b>not</b> test children with cough, coryza, hoarseness, or ulcers — those are viral), and generally do not test children <3 years. Treat with penicillin or amoxicillin for 10 days.',
          '<b>Peritonsillar abscess:</b> adolescent, trismus, "hot potato" voice, <b>uvular deviation away from the affected side</b> → drainage plus antibiotics.',
          '<b>Retropharyngeal abscess:</b> child <5 years, fever, neck stiffness or refusal to extend the neck, drooling, muffled voice; lateral neck film shows <b>widened prevertebral soft tissue</b> → CT with contrast and IV antibiotics.',
          '<b>Croup vs epiglottitis vs bacterial tracheitis:</b> croup — barky cough, inspiratory stridor, steeple sign, gradual onset; <b>epiglottitis</b> — rapid onset, high fever, drooling, tripoding, <i>no</i> cough, thumbprint sign, <b>keep the child calm and go to the OR</b>; <b>bacterial tracheitis</b> — croup-like prodrome then toxic appearance with high fever and thick purulent secretions, poor response to racemic epinephrine.',
          '<b>Neck masses:</b> <b>thyroglossal duct cyst</b> is <i>midline</i> and <b>elevates with swallowing and tongue protrusion</b>; <b>branchial cleft cyst</b> is <i>lateral</i>, anterior to the sternocleidomastoid; <b>cystic hygroma</b> transilluminates and is often posterior triangle. Reactive lymphadenopathy is the most common cause overall.',
          '<b>Lymphadenopathy red flags:</b> supraclavicular location, >2 cm and enlarging, fixed/hard, no infectious signs, systemic B symptoms, or an abnormal CBC → imaging and biopsy, think lymphoma.',
          '<b>Congenital muscular torticollis:</b> head tilted <i>toward</i> and chin rotated <i>away from</i> the affected sternocleidomastoid; treat with stretching; evaluate the hips (associated DDH).',
        ],
      },
    ],
    traps: [
      'Diagnosing AOM from an effusion or an erythematous drum alone — bulging is the key finding, and a crying child has a red drum.',
      'Ordering sinus imaging for uncomplicated sinusitis.',
      'Treating chlamydial conjunctivitis with topical erythromycin — it must be oral, to eradicate nasopharyngeal carriage and prevent pneumonia.',
      'Missing orbital cellulitis because the stem buries "pain with eye movement" in the middle of the exam.',
      'Treating OME with antihistamines or steroids.',
    ],
  },

  {
    id: 11,
    name: 'Cardiology',
    weight: 5,
    tag: 'cards',
    why:
      'Well-defined and finite. Murmur characterization, cyanotic lesions, and syncope evaluation cover most of the questions.',
    pearls: [
      {
        t: 'Innocent vs pathologic murmurs',
        items: [
          '<b>Still murmur:</b> the classic innocent murmur — musical/vibratory, grade 1–2, mid-systolic, left lower sternal border, ages 2–7, <b>louder supine and softer with standing</b>.',
          '<b>Venous hum:</b> continuous, infraclavicular, <b>disappears when supine or with head turning or jugular compression</b>.',
          '<b>Peripheral pulmonic stenosis:</b> newborn, soft systolic murmur radiating to <b>both axillae and the back</b>, resolves by 3–6 months.',
          '<b>Features that make a murmur pathologic:</b> any <b>diastolic</b> murmur, holosystolic, continuous (other than a venous hum), grade ≥3, harsh quality, a <b>thrill</b>, an abnormal S2, a click, or an <b>increase with standing/Valsalva</b>.',
          '<b>Fixed, widely split S2 = atrial septal defect.</b> <b>Continuous "machinery" murmur = patent ductus arteriosus.</b> <b>Harsh holosystolic at the left lower sternal border = ventricular septal defect</b> — and a <i>smaller</i> VSD is <i>louder</i>.',
          '<b>Hypertrophic cardiomyopathy</b> murmur <b>increases</b> with standing and Valsalva (less preload) and decreases with squatting — the opposite of most murmurs.',
        ],
      },
      {
        t: 'Congenital heart disease',
        items: [
          '<b>Transposition of the great arteries:</b> cyanosis within hours of birth, often with a <i>single</i> loud S2 and no murmur; "egg on a string" heart. Needs PGE1 and often balloon atrial septostomy.',
          '<b>Tetralogy of Fallot:</b> VSD, overriding aorta, RV outflow obstruction, RVH; boot-shaped heart. <b>Tet spells</b> → knee-to-chest position, oxygen, fluids, morphine, and phenylephrine — all of which increase systemic vascular resistance or preload. The murmur <i>softens</i> during a spell.',
          '<b>Coarctation of the aorta:</b> upper-extremity hypertension with <b>diminished, delayed femoral pulses</b> and a >20 mm Hg arm-leg gradient; rib notching and the "3 sign" in older children. Associated with <b>bicuspid aortic valve and Turner syndrome</b>.',
          '<b>Total anomalous pulmonary venous return, obstructed type:</b> severe cyanosis and respiratory distress with a <i>small</i> heart and pulmonary edema — the one cyanotic lesion made <i>worse</i> by prostaglandin.',
          '<b>Ebstein anomaly</b> → associated with maternal lithium; massive right atrium.',
          '<b>Syndromic associations:</b> Down — AV canal defect; Turner — coarctation and bicuspid aortic valve; Williams — <b>supravalvular</b> aortic stenosis; 22q11/DiGeorge — conotruncal (truncus, interrupted arch, TOF); Marfan — aortic root dilation and mitral prolapse; maternal diabetes — TGA and septal hypertrophy; congenital rubella — PDA and peripheral pulmonic stenosis.',
        ],
      },
      {
        t: 'Arrhythmias and syncope',
        items: [
          '<b>SVT:</b> rate typically >220 in infants and >180 in children, with a <i>fixed</i> rate and no beat-to-beat variability. Stable → <b>vagal maneuvers, then adenosine</b>. Unstable → synchronized cardioversion.',
          '<b>WPW:</b> short PR with a <b>delta wave</b>. Avoid AV nodal blockers if there is atrial fibrillation with pre-excitation.',
          '<b>Long QT:</b> syncope or seizure triggered by <b>exertion (especially swimming), startle (alarm clock), or emotion</b>; family history of sudden death or drowning. QTc >470 ms. Beta blockers; avoid QT-prolonging drugs.',
          '<b>Vasovagal syncope</b> (benign): prodrome of warmth, nausea, tunnel vision; triggered by standing, heat, pain, or the sight of blood; quick recovery.',
          '<b>Red-flag syncope:</b> occurring <b>during exertion</b>, without prodrome, while supine, associated with chest pain or palpitations, or with a family history of sudden death — obtain an ECG and refer to cardiology.',
          '<b>An ECG is the single most useful test in a first syncopal episode</b>; routine echo, EEG, and head CT are low-yield in classic vasovagal syncope.',
          '<b>POTS:</b> sustained heart rate increase ≥40 bpm in adolescents within 10 minutes of standing <b>without</b> orthostatic hypotension. Treat with fluid and salt loading, exercise reconditioning, and compression.',
        ],
      },
      {
        t: 'Acquired disease and prevention',
        items: [
          '<b>Myocarditis:</b> viral prodrome then tachycardia out of proportion to fever, gallop, hepatomegaly, and respiratory distress often misread as asthma or pneumonia. Elevated troponin and BNP; cardiomegaly on film. Fluids can precipitate decompensation.',
          '<b>Pericarditis:</b> sharp pleuritic chest pain <b>improved by sitting forward</b>, friction rub, diffuse ST elevation with PR depression. Tamponade → pulsus paradoxus, muffled sounds, JVD.',
          '<b>Acute rheumatic fever — Jones criteria.</b> Major: <b>J</b>oints (migratory polyarthritis), <b>O</b> carditis, <b>N</b>odules, <b>E</b>rythema marginatum, <b>S</b>ydenham chorea. Requires evidence of preceding strep infection. Long-term penicillin prophylaxis is the tested management.',
          '<b>MIS-C:</b> fever, multi-system involvement, markedly elevated inflammatory markers, and recent SARS-CoV-2 exposure — overlaps Kawasaki but is older, with more GI symptoms, shock, and myocardial dysfunction.',
          '<b>Blood pressure:</b> the 2017 AAP guideline uses normative tables in children <13, and adult-style thresholds ≥13 (elevated 120–129/&lt;80; stage 1 ≥130/80; stage 2 ≥140/90). Confirm with repeated measurements and an appropriately sized cuff — <b>a cuff that is too small falsely elevates</b> the reading.',
          '<b>Lipid screening universally at 9–11 and 17–21 years.</b> Suspect familial hypercholesterolemia with LDL ≥190, or ≥160 with a family history — statins are indicated in children as young as 8–10 years.',
          '<b>Infective endocarditis prophylaxis</b> is now limited to the highest-risk lesions (prosthetic valves/material, prior endocarditis, unrepaired cyanotic CHD, repaired CHD with residual defect near prosthetic material, cardiac transplant valvulopathy) and only for dental procedures involving gingival manipulation or the periapical region.',
        ],
      },
    ],
    traps: [
      'A murmur that gets louder when the patient stands is the one you must not clear for sports.',
      'Myocarditis presenting as "asthma" or "gastroenteritis" — look for tachycardia disproportionate to fever plus hepatomegaly.',
      'Treating "asthma" in an infant with a murmur, poor feeding, and sweating with feeds — that is heart failure.',
      'Choosing echocardiography as the first test in syncope. The ECG comes first.',
    ],
  },

  {
    id: 12,
    name: 'Pulmonology',
    weight: 5,
    tag: 'pulm',
    why:
      'Asthma alone can account for several questions. The guideline-based step therapy and the "do not do this in bronchiolitis" list are must-knows.',
    pearls: [
      {
        t: 'Asthma — classification and stepwise therapy',
        items: [
          '<b>Intermittent:</b> symptoms ≤2 days/week, nighttime awakenings ≤2/month, SABA use ≤2 days/week, no interference with activity, normal FEV₁ between exacerbations.',
          '<b>Mild persistent:</b> >2 days/week but not daily. <b>Moderate persistent:</b> daily symptoms, nighttime >1/week, FEV₁ 60–80%. <b>Severe persistent:</b> throughout the day, frequent nighttime, FEV₁ <60%.',
          '<b>Any persistent asthma requires a daily controller — a low-dose inhaled corticosteroid is first-line.</b> Escalating SABA use is not a treatment plan.',
          'The 2020 NAEPP update endorses <b>SMART therapy</b> (single maintenance and reliever therapy with an ICS-formoterol inhaler) for moderate-severe persistent asthma in patients ≥4 years, and <b>intermittent ICS with as-needed SABA</b> for mild persistent disease.',
          '<b>Two or more oral steroid bursts in a year indicates poorly controlled asthma</b> — step up therapy and reassess adherence and technique.',
          '<b>Spirometry:</b> obstruction is a reduced FEV₁/FVC ratio; <b>reversibility is a ≥12% increase in FEV₁</b> after a bronchodilator. Check inhaler technique and adherence <i>before</i> stepping up.',
          '<b>Acute exacerbation:</b> oxygen, repeated albuterol (± ipratropium for moderate-severe), and <b>systemic corticosteroids early</b>. Magnesium sulfate for severe exacerbations. A "quiet chest" with a rising CO₂ signals impending respiratory failure — a normal or rising PaCO₂ in a tachypneic asthmatic is an ominous sign, not reassurance.',
        ],
      },
      {
        t: 'Bronchiolitis — mostly a list of what not to do',
        items: [
          'Diagnosis is clinical in a child <2 years with a viral prodrome, tachypnea, wheezing, and crackles. Management is <b>supportive: hydration, suctioning, and oxygen</b>.',
          '<b>Do not routinely use</b> bronchodilators, systemic or inhaled corticosteroids, antibiotics, chest physiotherapy, or nebulized hypertonic saline in the outpatient/emergency setting. <b>Do not routinely obtain</b> a chest radiograph or viral testing.',
          '<b>Continuous pulse oximetry is not required</b> for stable non-hypoxemic infants; supplement oxygen when saturation falls persistently below 90%.',
          '<b>Prevention:</b> nirsevimab (a long-acting monoclonal antibody) for all infants entering their first RSV season and for high-risk infants in their second, or maternal RSV vaccination in pregnancy. Palivizumab remains an option for select high-risk infants.',
          'Apnea risk is highest in young (<2 months) and former preterm infants.',
        ],
      },
      {
        t: 'Upper and lower airway infections',
        items: [
          '<b>Croup:</b> <b>a single dose of dexamethasone for every severity, including mild.</b> Add <b>nebulized racemic epinephrine for stridor at rest</b>, then observe 2–4 hours for rebound.',
          '<b>Community-acquired pneumonia:</b> <i>S. pneumoniae</i> is the leading bacterial cause at all ages; <b>high-dose amoxicillin is first-line outpatient therapy</b>. <b><i>Mycoplasma</i></b> in school-age children and adolescents (gradual onset, prominent cough, diffuse findings, ± bullous myringitis) → a macrolide. <b>Viruses predominate under 5.</b>',
          '<b>Chest radiographs are not required</b> for outpatient management of uncomplicated pneumonia; consider imaging for hypoxia, distress, treatment failure, or suspected complication.',
          '<b>Parapneumonic effusion/empyema:</b> persistent fever on appropriate antibiotics → ultrasound, then drainage for large or loculated effusions.',
          '<b>Foreign body aspiration:</b> classic in a 1–3 year old with a sudden choking episode, then unilateral wheeze and decreased breath sounds. <b>Radiographs are frequently normal</b> (most objects are radiolucent); inspiratory/expiratory or decubitus films may show air trapping. <b>Rigid bronchoscopy is both diagnostic and therapeutic</b> — a normal film does not exclude it.',
        ],
      },
      {
        t: 'Chronic lung disease',
        items: [
          '<b>Cystic fibrosis:</b> on the newborn screen via immunoreactive trypsinogen plus DNA analysis; confirm with a <b>sweat chloride ≥60 mmol/L</b> (30–59 is intermediate). ΔF508 is the most common variant.',
          'CF manifestations: <b>meconium ileus</b> at birth, pancreatic insufficiency with steatorrhea and failure to thrive despite a good appetite, fat-soluble vitamin (A, D, E, K) deficiency, <b>nasal polyps in a child</b> (always think CF), rectal prolapse, hypochloremic hypokalemic <b>metabolic alkalosis</b> with hyponatremia from salt loss, and chronic infection progressing from <i>S. aureus</i> to <b><i>Pseudomonas aeruginosa</i></b>.',
          '<b>Obstructive sleep apnea:</b> snoring with witnessed pauses, restless sleep, mouth breathing, and daytime <b>hyperactivity or inattention</b> (not sleepiness) in children. <b>Polysomnography is the gold standard; adenotonsillectomy is first-line</b> when adenotonsillar hypertrophy is present.',
          '<b>Vocal cord dysfunction:</b> adolescent athlete, <b>inspiratory</b> stridor localized to the throat, abrupt onset and offset, no response to albuterol, normal oxygen saturation, and flattening of the inspiratory limb of the flow-volume loop. Treat with speech therapy.',
          '<b>Bronchopulmonary dysplasia:</b> oxygen requirement at 36 weeks postmenstrual age in a preterm infant.',
        ],
      },
    ],
    traps: [
      'Adding a long-acting beta agonist as monotherapy, or continuing SABA-only for persistent asthma.',
      'A "normal" PaCO₂ in a severely tachypneic asthmatic being read as improvement.',
      'Steroids, albuterol, or antibiotics for classic bronchiolitis.',
      'A normal chest radiograph offered as reason to exclude foreign body aspiration.',
      'Missing CF in a child with nasal polyps, rectal prolapse, or an unexplained metabolic alkalosis.',
    ],
  },
];

if (typeof window !== 'undefined') {
  window.CD_PREP = window.CD_PREP || {};
  window.CD_PREP.EXAM = EXAM;
  window.CD_PREP.DOMAINS = DOMAINS;
}
