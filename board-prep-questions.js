/*
 * CloseDose — ABP General Pediatrics Board Prep
 * Retrieval-practice question bank.
 *
 * Items are written in ABP style (clinical vignette stem → single best answer)
 * and distributed in proportion to the official content outline weights.
 * These are original teaching items, not actual exam questions.
 *
 * Schema: { id, d: domainId, q: stem, o: [options], a: correctIndex, e: explanation }
 */

/* global window */

const QUESTIONS = [
  /* ---------------- Domain 1 — Preventive / Well-Child (12%) ---------------- */
  {
    id: 101, d: 1,
    q: 'A 24-month-old boy is brought for a health supervision visit. His mother reports he says about 10 single words but has never combined two words. He follows one-step commands, points to what he wants, plays alongside other children, walks and runs well, and stacks 6 blocks. Hearing screening at birth was normal. Which of the following is the most appropriate next step?',
    o: [
      'Reassure the mother that late talking is common in boys and recheck in 6 months',
      'Refer for audiologic evaluation and early intervention services now',
      'Order a brain MRI',
      'Obtain chromosomal microarray and fragile X testing'
    ],
    a: 1,
    e: 'By 24 months a child should have ≥50 words and use 2-word phrases. This is an isolated expressive language delay, and the two immediate actions are formal audiologic testing (a normal newborn screen does not exclude acquired or progressive hearing loss) and referral to early intervention — done in parallel, not sequentially. "Boys talk late" is the classic wrong answer that delays diagnosis. Genetic testing is appropriate for global developmental delay, not isolated speech delay with otherwise normal motor, social, and problem-solving skills.'
  },
  {
    id: 102, d: 1,
    q: 'A 4-month-old girl is due for immunizations. She has a temperature of 38.1 °C, clear rhinorrhea, and a normal examination. She is taking amoxicillin, started 2 days ago for acute otitis media. Her mother is 8 weeks pregnant. Which of the following is the most appropriate action?',
    o: [
      'Defer all vaccines until the infant is afebrile and off antibiotics',
      'Defer only the live vaccines because of the mother\'s pregnancy',
      'Administer all scheduled vaccines today',
      'Administer inactivated vaccines today and reschedule the rest in 2 weeks'
    ],
    a: 2,
    e: 'None of these is a contraindication. Mild acute illness with or without low-grade fever, current antibiotic therapy, and a pregnant or immunosuppressed household contact are all explicitly listed as conditions that are NOT contraindications to vaccination. Deferring vaccines for minor illness is a leading cause of missed opportunities and under-immunization. (No live vaccines are even scheduled at 4 months.)'
  },
  {
    id: 103, d: 1,
    q: 'At which ages does the AAP recommend administering a standardized autism-specific screening instrument to all children?',
    o: ['9 and 18 months', '18 and 24 months', '24 and 30 months', '12 and 18 months'],
    a: 1,
    e: 'Autism-specific screening (M-CHAT-R/F) is recommended at 18 and 24 months. General developmental screening with a standardized tool is done at 9, 18, and 30 months. These two schedules overlap at 18 months, which is exactly why the exam asks — know both lists separately.'
  },
  {
    id: 104, d: 1,
    q: 'A 15-month-old boy is exclusively fed whole cow\'s milk (about 40 oz daily) and small amounts of table food. He appears pale. Hemoglobin is 8.4 g/dL, MCV 62 fL, RDW 18%. Which of the following is the most likely additional finding?',
    o: [
      'Elevated hemoglobin A2 on electrophoresis',
      'Low serum ferritin and elevated total iron-binding capacity',
      'Normal red cell distribution width with an elevated red cell count',
      'Basophilic stippling with an elevated blood lead level'
    ],
    a: 1,
    e: 'Excessive cow\'s milk intake is the classic cause of iron deficiency in toddlers — it is low in iron, inhibits iron absorption, and causes occult GI blood loss. Iron deficiency gives a low ferritin with a high TIBC, and characteristically an elevated RDW (anisocytosis), which is the single best discriminator from thalassemia trait. Thalassemia trait would show a normal RDW with a high RBC count and elevated HbA2. Milk should be limited to 16–24 oz/day after 12 months.'
  },
  {
    id: 105, d: 1,
    q: 'The parents of a healthy 2-year-old ask when their daughter can face forward in her car seat. She is 34 inches tall and weighs 28 lb. Which of the following is the most appropriate advice?',
    o: [
      'She may turn forward-facing now that she is 2 years old',
      'She should remain rear-facing until she reaches the maximum height or weight allowed by her convertible seat',
      'She may turn forward-facing once she reaches 30 lb',
      'She should remain rear-facing until age 4 regardless of the seat limits'
    ],
    a: 1,
    e: 'The AAP removed the specific age-based recommendation. Children should ride rear-facing as long as possible — until they reach the highest weight or height allowed by their convertible car safety seat, which for most current seats is well past age 2. Answers keyed to a specific age or weight are outdated.'
  },
  {
    id: 106, d: 1,
    q: 'A 9-year-old boy is seen for a health supervision visit. He is healthy, has a BMI at the 60th percentile, and has no family history of premature cardiovascular disease. Which of the following screening tests is recommended for him at this visit?',
    o: [
      'Fasting glucose',
      'Lipid panel',
      'Thyroid-stimulating hormone',
      'Urinalysis'
    ],
    a: 1,
    e: 'Universal lipid screening is recommended once between 9 and 11 years, and again between 17 and 21 years — regardless of risk factors. These ages were selected because they bracket puberty, during which lipid levels transiently fall. Routine urinalysis, TSH, and glucose screening are not recommended in an asymptomatic, normal-weight child.'
  },
  {
    id: 107, d: 1,
    q: 'A term 3-week-old exclusively breastfed infant is seen for a weight check. Which of the following supplements should be recommended?',
    o: [
      'Vitamin D 400 IU daily',
      'Vitamin D 400 IU daily and iron 1 mg/kg daily',
      'Iron 1 mg/kg daily only',
      'Multivitamin with fluoride'
    ],
    a: 0,
    e: 'All breastfed and partially breastfed infants need 400 IU/day of vitamin D beginning in the first days of life. Iron supplementation at 1 mg/kg/day for exclusively breastfed term infants begins at 4 months of age, not at birth. Fluoride supplementation begins at 6 months and only if the water supply is deficient.'
  },
  {
    id: 108, d: 1,
    q: 'A 6-month-old former 30-week preterm infant (now 4 months corrected) is evaluated. Which of the following would be most concerning for a developmental problem?',
    o: [
      'Not yet sitting without support',
      'Not yet rolling front to back',
      'Absence of a social smile',
      'Not yet transferring objects hand to hand'
    ],
    a: 2,
    e: 'Correct for prematurity until 2 years: this infant is developmentally 4 months. At 4 months a social smile should be well established (it appears by 2 months) — its absence is a red flag at any corrected age past 3 months. Sitting without support (6 mo), transferring (6 mo), and rolling front-to-back (4–6 mo) are not yet expected at 4 months corrected. The exam consistently tests whether you corrected the age.'
  },
  {
    id: 109, d: 1,
    q: 'A 3-year-old girl who was fully toilet trained for 8 months has begun wetting during the day since the birth of a sibling 3 weeks ago. She is otherwise well, with a normal examination and a normal urinalysis. Which of the following is the most appropriate management?',
    o: [
      'Reassurance, maintenance of routines, and positive reinforcement',
      'Renal and bladder ultrasonography',
      'A behavioral chart with loss of privileges for accidents',
      'Referral to pediatric urology'
    ],
    a: 0,
    e: 'Regression in a recently acquired skill after a major family stressor is normal and self-limited. Management is reassurance, maintaining routines, avoiding punishment, and positive reinforcement. Punitive approaches prolong the problem. With a normal exam and urinalysis, imaging and subspecialty referral are unnecessary.'
  },
  {
    id: 110, d: 1,
    q: 'A 12-month-old boy has a hemoglobin of 11.4 g/dL at his screening visit. His mother asks about starting whole cow\'s milk. Which of the following is the most appropriate counseling?',
    o: [
      'Cow\'s milk may be started now, limited to 16–24 oz per day',
      'Cow\'s milk should be delayed until 18 months',
      'Reduced-fat (2%) milk should be used until age 2',
      'Cow\'s milk may be given in unlimited quantities as the primary beverage'
    ],
    a: 0,
    e: 'Whole cow\'s milk may be introduced at 12 months and should be limited to 16–24 oz/day to prevent iron deficiency and displacement of solid foods. Whole milk (not reduced-fat) is recommended from 12 to 24 months for fat needed for neurodevelopment, unless there is a specific indication for lower fat.'
  },
  {
    id: 111, d: 1,
    q: 'A 4-year-old boy is brought for a preschool visit. His parents report he speaks in full sentences but strangers understand only about half of what he says. His hearing screen is normal and his development is otherwise appropriate. Which of the following is the most appropriate next step?',
    o: [
      'Reassure the parents that this is normal for age 4',
      'Refer for speech-language evaluation',
      'Repeat audiologic testing in 6 months',
      'Refer for autism evaluation'
    ],
    a: 1,
    e: 'Speech intelligibility to an unfamiliar listener should be about 50% at 2 years, 75% at 3 years, and essentially 100% at 4 years. Fifty percent intelligibility at age 4 is a significant articulation delay warranting speech-language evaluation. The intelligibility percentages by age are among the most commonly tested developmental facts.'
  },
  {
    id: 112, d: 1,
    q: 'Which of the following infants should receive hepatitis B immune globulin in addition to hepatitis B vaccine?',
    o: [
      'An infant whose mother is HBsAg-negative but whose father is a chronic carrier',
      'An infant whose mother is HBsAg-positive',
      'An infant born at 34 weeks to an HBsAg-negative mother',
      'An infant whose mother received the hepatitis B vaccine series during pregnancy'
    ],
    a: 1,
    e: 'Infants of HBsAg-positive mothers need both hepatitis B vaccine and HBIG within 12 hours of birth. If maternal status is unknown, give the vaccine within 12 hours, send maternal serology, and add HBIG within 7 days if the mother proves positive (within 12 hours if the infant weighs <2000 g). A positive paternal or household contact status does not by itself indicate HBIG for the newborn.'
  },
  {
    id: 113, d: 1,
    q: 'A 5-month-old infant with severe eczema and a known egg allergy is seen for a health supervision visit. He has not yet been introduced to peanut. Which of the following is the most appropriate recommendation?',
    o: [
      'Avoid all peanut products until at least 3 years of age',
      'Introduce peanut-containing foods now, after evaluation with peanut specific IgE or skin testing',
      'Avoid peanut until the eczema has been fully controlled for 6 months',
      'Introduce peanut only after successful introduction of tree nuts'
    ],
    a: 1,
    e: 'The LEAP trial and subsequent NIAID guidelines reversed prior avoidance advice. Infants at highest risk (severe eczema and/or egg allergy) should have peanut introduced early — at 4 to 6 months — after evaluation with peanut sIgE and/or skin prick testing, with the first feeding supervised if testing is positive. Delaying introduction increases the risk of peanut allergy.'
  },
  {
    id: 114, d: 1,
    q: 'A 2-month-old infant is due for immunizations. He had a seizure at 6 weeks of age attributed to hyponatremia from improperly mixed formula, and has been well since with a normal neurologic examination. Which of the following is the most appropriate action regarding DTaP?',
    o: [
      'Withhold DTaP permanently and give DT instead',
      'Administer DTaP today',
      'Defer DTaP until the child is seizure-free for 1 year',
      'Obtain an EEG before administering DTaP'
    ],
    a: 1,
    e: 'A seizure with a known, resolved cause and a normal neurologic examination is not a contraindication or precaution to DTaP. The precaution regarding seizures applies to a seizure occurring within 3 days of a prior pertussis-containing dose. The true contraindication is encephalopathy within 7 days of a previous pertussis-containing vaccine. Progressive or unstable neurologic disease is a reason to defer until stable.'
  },
  {
    id: 115, d: 1,
    q: 'A 6-year-old girl has a BMI at the 97th percentile. Her blood pressure is at the 80th percentile, and her examination is otherwise normal. Which of the following best classifies her weight status?',
    o: ['Overweight', 'Obesity', 'Severe obesity', 'Normal weight for a growing child'],
    a: 1,
    e: 'BMI ≥85th to <95th percentile is overweight; ≥95th percentile is obesity; ≥120% of the 95th percentile (or BMI ≥35) is severe obesity (class 2). At the 97th percentile she meets the criterion for obesity. Recommended evaluation includes a lipid panel, ALT, and glucose/A1c screening beginning at age 10, plus assessment for comorbidity and family-based lifestyle intervention.'
  },
  {
    id: 116, d: 1,
    q: 'A mother of a 2-week-old infant is being seen with her baby. Which of the following screening tools should be administered to the mother at this visit and again at the 2-, 4-, and 6-month visits?',
    o: [
      'Edinburgh Postnatal Depression Scale or an equivalent postpartum depression screen',
      'Ages and Stages Questionnaire',
      'M-CHAT-R/F',
      'CRAFFT'
    ],
    a: 0,
    e: 'The AAP recommends screening mothers for postpartum depression at the 1-, 2-, 4-, and 6-month infant visits. Untreated maternal depression harms infant development, attachment, and safety practices, which is why the pediatrician screens a person who is not technically the patient. This "who is the patient?" framing is a favorite exam construction.'
  },

  /* ---------------- Domain 2 — Fetal and Neonatal (4%) ---------------- */
  {
    id: 201, d: 2,
    q: 'A term newborn is noted to be jaundiced at 14 hours of age. He is breastfeeding well. Mother is blood type O-positive; the infant is A-positive. Total bilirubin is 9.2 mg/dL with a direct fraction of 0.4 mg/dL. Which of the following is the most appropriate next step?',
    o: [
      'Reassure and recheck the bilirubin in 24 hours',
      'Obtain a direct antiglobulin (Coombs) test, CBC with smear, and reticulocyte count, and begin phototherapy',
      'Encourage supplemental formula and recheck in 12 hours',
      'Obtain an abdominal ultrasound'
    ],
    a: 1,
    e: 'Jaundice within the first 24 hours of life is always pathologic. With a type O mother and a type A infant, ABO incompatibility with hemolysis is likely — obtain a direct Coombs, CBC with smear, and reticulocyte count, and start phototherapy given the level at this age. Reassurance and observation are never correct for jaundice in the first 24 hours.'
  },
  {
    id: 202, d: 2,
    q: 'A 6-week-old exclusively breastfed infant remains jaundiced. He is thriving, with a weight above birth weight and normal stools and urine. Total bilirubin is 9.0 mg/dL with a direct fraction of 3.4 mg/dL. Which of the following is the most appropriate next step?',
    o: [
      'Reassure the parents that this is breast milk jaundice',
      'Discontinue breastfeeding for 48 hours',
      'Obtain an abdominal ultrasound and refer urgently for evaluation of biliary atresia',
      'Begin phototherapy'
    ],
    a: 2,
    e: 'A direct bilirubin of 3.4 mg/dL is conjugated hyperbilirubinemia, which is never physiologic and never breast milk jaundice. The immediate concern is biliary atresia, where the Kasai portoenterostomy must be performed before 60 days of age for the best outcome — this infant is at 6 weeks and the window is closing. Any infant jaundiced beyond 2 weeks requires a fractionated bilirubin, precisely so this diagnosis is not missed.'
  },
  {
    id: 203, d: 2,
    q: 'A newborn is in respiratory distress in the delivery room with a scaphoid abdomen and heart sounds heard best on the right. Which of the following is the most appropriate immediate management?',
    o: [
      'Vigorous bag-mask ventilation',
      'Endotracheal intubation and placement of a nasogastric tube for decompression',
      'Needle decompression of the right chest',
      'Administration of surfactant via mask'
    ],
    a: 1,
    e: 'A scaphoid abdomen with mediastinal shift is congenital diaphragmatic hernia. Bag-mask ventilation forces air into the herniated bowel, worsening lung compression and cardiovascular compromise — it is contraindicated. Intubate immediately and place an NG tube to decompress the stomach and intestine.'
  },
  {
    id: 204, d: 2,
    q: 'A 3-week-old infant born at home presents with irritability, poor feeding, and a bulging fontanelle. CT shows an intracranial hemorrhage. He is exclusively breastfed. The parents declined all newborn interventions. PT and PTT are markedly prolonged; platelets and fibrinogen are normal. Which of the following is the most likely diagnosis?',
    o: [
      'Abusive head trauma',
      'Hemophilia A',
      'Late vitamin K deficiency bleeding',
      'Disseminated intravascular coagulation'
    ],
    a: 2,
    e: 'Late vitamin K deficiency bleeding occurs at 2–12 weeks in exclusively breastfed infants who did not receive vitamin K prophylaxis, and presents with intracranial hemorrhage roughly half the time. Both PT and PTT are prolonged (vitamin K–dependent factors II, VII, IX, X) with normal platelets and fibrinogen. Hemophilia prolongs only the PTT. Vitamin K refusal is an increasingly common exam stem.'
  },
  {
    id: 205, d: 2,
    q: 'A newborn of a mother with poorly controlled type 1 diabetes is large for gestational age. At 90 minutes of life, the infant is jittery. Point-of-care glucose is 28 mg/dL. Which of the following best explains this finding?',
    o: [
      'Glycogen storage disease',
      'Fetal hyperinsulinemia from maternal hyperglycemia',
      'Congenital adrenal hyperplasia',
      'Inadequate hepatic gluconeogenesis from prematurity'
    ],
    a: 1,
    e: 'Maternal hyperglycemia drives fetal hyperinsulinemia; after the cord is cut the glucose supply stops but insulin levels remain high, producing hypoglycemia in the first hours of life. Infants of diabetic mothers should also be evaluated for polycythemia, hypocalcemia, cardiac septal hypertrophy, small left colon syndrome, and caudal regression (the most specific anomaly).'
  },
  {
    id: 206, d: 2,
    q: 'A newborn has a boggy, fluctuant scalp swelling that crosses suture lines and appears to be enlarging 3 hours after a vacuum-assisted delivery. Heart rate is 180/min and capillary refill is 4 seconds. Which of the following is the most likely diagnosis?',
    o: ['Caput succedaneum', 'Cephalohematoma', 'Subgaleal hemorrhage', 'Cranial epidural hematoma'],
    a: 2,
    e: 'Subgaleal hemorrhage occupies the potential space between the galea aponeurotica and periosteum, crosses suture lines, and can accommodate the newborn\'s entire blood volume — hence the tachycardia and poor perfusion. It is strongly associated with vacuum-assisted delivery. Caput crosses sutures but is firm and does not expand; cephalohematoma is subperiosteal and does not cross sutures.'
  },

  /* ---------------- Domain 3 — Adolescent (5%) ---------------- */
  {
    id: 301, d: 3,
    q: 'A 12-year-old girl has Tanner stage 3 breast development. Her mother asks how much more she will grow. Which of the following is most accurate?',
    o: [
      'She has already reached her peak height velocity and will grow about 5–7 cm more after menarche',
      'Her peak height velocity will occur after menarche',
      'She is currently at or near her peak height velocity, and menarche typically follows',
      'Growth is essentially complete at Tanner 3'
    ],
    a: 2,
    e: 'In girls, peak height velocity occurs at Tanner stage 2–3, BEFORE menarche, which typically occurs at Tanner 4 (about 2–2.5 years after thelarche). After menarche, girls grow only about 5–7 cm more. In boys the peak occurs later, at Tanner 3–4, which is why boys end up taller. Getting the sequence right is essential for growth counseling questions.'
  },
  {
    id: 302, d: 3,
    q: 'A 16-year-old requests contraception. She is sexually active with one male partner, has regular periods, and has a normal blood pressure and BMI. She has never had a pelvic examination. Which of the following is required before initiating a combined oral contraceptive?',
    o: [
      'A pelvic examination and Papanicolaou test',
      'Testing for chlamydia and gonorrhea',
      'Reasonable certainty that she is not pregnant',
      'Parental consent'
    ],
    a: 2,
    e: 'Only a blood pressure measurement and reasonable certainty of non-pregnancy are needed before starting hormonal contraception. Pelvic examination, Pap testing (which does not begin until age 21), and STI testing are not prerequisites — requiring them creates barriers to care. Adolescents may consent to contraceptive care independently in nearly all states. Chlamydia/gonorrhea screening should be offered, but it is not a prerequisite.'
  },
  {
    id: 303, d: 3,
    q: 'A 14-year-old boy is concerned about tender breast tissue bilaterally. He is Tanner stage 3, with testicular volumes of 10 mL bilaterally, and is growing along the 60th percentile. Examination reveals 2 cm of firm subareolar tissue on each side. Which of the following is the most appropriate management?',
    o: [
      'Reassurance that this typically resolves within 1–2 years',
      'Karyotype to evaluate for Klinefelter syndrome',
      'Measurement of serum estradiol, testosterone, hCG, and LH',
      'Referral for surgical reduction'
    ],
    a: 0,
    e: 'Physiologic gynecomastia affects up to 65% of adolescent boys, typically at Tanner 3–4, is often tender and asymmetric, and resolves within 1–2 years. Reassurance is the answer when puberty and growth are otherwise normal. Workup is warranted if the testes are small and firm (Klinefelter), if there is rapid enlargement or a mass, if it occurs before puberty, or if there are signs of a hormone-secreting tumor.'
  },
  {
    id: 304, d: 3,
    q: 'A 15-year-old girl discloses during a confidential interview that she is sexually active and has been using alcohol at weekend parties. She asks that her parents not be told. She denies suicidal ideation, abuse, and drinking and driving. Which of the following is the most appropriate response?',
    o: [
      'Inform her that you must disclose substance use to her parents',
      'Maintain confidentiality, counsel her, and encourage her to involve her parents',
      'Inform her parents only about the sexual activity',
      'Discharge her from the practice unless she agrees to parental involvement'
    ],
    a: 1,
    e: 'Confidentiality must be broken only for danger to self, danger to others, or abuse — none of which is present. Maintaining confidentiality preserves the therapeutic relationship and the adolescent\'s willingness to disclose. The right approach is to counsel her directly, provide harm reduction, and encourage (but not compel) parental involvement.'
  },
  {
    id: 305, d: 3,
    q: 'A 17-year-old girl had unprotected intercourse 4 days ago and requests emergency contraception. Which of the following is the most effective option at this point?',
    o: [
      'Levonorgestrel 1.5 mg orally',
      'Ulipristal acetate 30 mg orally',
      'Copper intrauterine device insertion',
      'Combined oral contraceptive pills (Yuzpe method)'
    ],
    a: 2,
    e: 'The copper IUD is the most effective form of emergency contraception (>99%) and remains effective up to 5 days after intercourse, with the added benefit of ongoing contraception. Ulipristal is effective up to 120 hours and is superior to levonorgestrel, which is licensed to 72 hours and loses efficacy with time and higher BMI. At day 4, levonorgestrel is the weakest choice.'
  },
  {
    id: 306, d: 3,
    q: 'A 14-year-old boy has had no testicular enlargement. He is at the 5th percentile for height with a normal growth velocity of 5 cm/year. His father reports he did not begin puberty until age 15 and grew until college. Bone age is 12 years. Which of the following is the most likely diagnosis?',
    o: [
      'Growth hormone deficiency',
      'Constitutional delay of growth and puberty',
      'Klinefelter syndrome',
      'Kallmann syndrome'
    ],
    a: 1,
    e: 'Constitutional delay is the most common cause of delayed puberty: short stature with a NORMAL growth velocity, a DELAYED bone age (12 years at a chronologic age of 14), and a family history of late puberty. These children ultimately reach a normal adult height. The delayed bone age is the key — it means remaining growth potential. Growth hormone deficiency would show a decreased velocity; Klinefelter presents with tall stature and small firm testes.'
  },
  {
    id: 307, d: 3,
    q: 'A 16-year-old transgender boy (assigned female at birth) presents for routine care. He has been on testosterone for 1 year and has not had gender-affirming surgery. Which of the following is appropriate preventive care?',
    o: [
      'No cervical cancer screening is needed because he identifies as male',
      'Cervical cancer screening should begin at age 21 as for any patient with a cervix',
      'Cervical cancer screening should begin now because of testosterone therapy',
      'Annual pelvic ultrasonography'
    ],
    a: 1,
    e: 'Preventive screening follows the anatomy present, not gender identity. A patient with a cervix begins cervical cancer screening at age 21 regardless of gender identity or hormone therapy. Testosterone does not change the screening start age, though it can cause atrophic changes that make cytology harder to interpret. This "screen the organs present" principle is the tested concept.'
  },

  /* ---------------- Domain 4 — Infectious Diseases (7%) ---------------- */
  {
    id: 401, d: 4,
    q: 'A 3-year-old boy has had fever to 39.5 °C for 6 days. Examination shows bilateral bulbar conjunctival injection without exudate, cracked red lips, a diffuse maculopapular rash, and edema of the hands and feet. There is no lymphadenopathy. Which of the following is the most appropriate next step?',
    o: [
      'Obtain an echocardiogram and administer IVIG and aspirin',
      'Treat with amoxicillin for presumed streptococcal infection',
      'Await desquamation before initiating treatment',
      'Obtain a throat culture and observe for 48 hours'
    ],
    a: 0,
    e: 'This is Kawasaki disease: fever ≥5 days plus 4 of 5 criteria (conjunctivitis, oral changes, rash, extremity changes — cervical adenopathy is absent but only 4 of 5 are needed). Treatment with IVIG within 10 days of fever onset reduces coronary aneurysm risk from about 25% to under 5%, so waiting for desquamation (a late finding) squanders the treatment window. Obtain a baseline echocardiogram but do not delay IVIG for it.'
  },
  {
    id: 402, d: 4,
    q: 'A 6-year-old girl in North Carolina has had 4 days of fever, severe headache, and myalgia. A maculopapular rash began on her wrists and ankles and is spreading centrally; it involves the palms. She had a tick bite 10 days ago. Which of the following is the most appropriate treatment?',
    o: [
      'Doxycycline',
      'Amoxicillin',
      'Ceftriaxone',
      'Await serology before treating'
    ],
    a: 0,
    e: 'This is Rocky Mountain spotted fever. Doxycycline is the treatment of choice at ANY age — the old concern about dental staining does not apply to the short courses used, and delay past day 5 of illness sharply increases mortality. Treat empirically on clinical suspicion; serology is often negative early and should never delay therapy.'
  },
  {
    id: 403, d: 4,
    q: 'A 10-month-old infant has had 3 days of fever to 40 °C with no other symptoms and a normal examination. Today the fever resolved and a blanching maculopapular rash appeared on the trunk. Which of the following is the most likely causative agent?',
    o: ['Measles virus', 'Parvovirus B19', 'Human herpesvirus 6', 'Group A Streptococcus'],
    a: 2,
    e: 'Roseola infantum (exanthem subitum), caused by HHV-6, produces 3–5 days of high fever in a well-appearing infant, followed by a rash that appears exactly as the fever breaks. It is a leading cause of first febrile seizures. The temporal relationship — rash AFTER defervescence — is the discriminator from measles, where the rash accompanies peak illness.'
  },
  {
    id: 404, d: 4,
    q: 'A 3-week-old infant presents with poor feeding and a temperature of 38.4 °C. She appears well, with a normal examination. Which of the following is the most appropriate management?',
    o: [
      'Blood and urine cultures, observe without antibiotics if inflammatory markers are normal',
      'Blood, urine, and cerebrospinal fluid cultures, admit, and start parenteral antibiotics',
      'Urinalysis and urine culture; discharge with follow-up in 24 hours',
      'Reassurance and follow-up in 24 hours since the infant appears well'
    ],
    a: 1,
    e: 'Any febrile infant ≤28 days requires a full evaluation — blood, urine, and CSF — plus admission and empiric parenteral antibiotics, regardless of how well the infant appears. The 2021 AAP febrile infant guideline permits risk stratification with inflammatory markers only for infants 29–60 days. Well appearance is not protective in the first month.'
  },
  {
    id: 405, d: 4,
    q: 'A 5-year-old boy has a 3-week history of an enlarging, tender right axillary lymph node. He has a healing scratch on his right forearm. The family recently adopted a kitten. He has a low-grade fever. Which of the following is the most likely diagnosis?',
    o: [
      'Cat-scratch disease from Bartonella henselae',
      'Atypical mycobacterial lymphadenitis',
      'Tularemia',
      'Sporotrichosis'
    ],
    a: 0,
    e: 'Cat-scratch disease from Bartonella henselae presents 1–3 weeks after a scratch or bite from a kitten with regional lymphadenopathy proximal to the inoculation site, often with a papule at the site and low-grade fever. It is usually self-limited; azithromycin shortens the course in significant lymphadenopathy. Aspiration relieves a suppurative node, but incision and drainage is avoided (fistula risk).'
  },
  {
    id: 406, d: 4,
    q: 'A newborn has microcephaly, hepatosplenomegaly, petechiae, and periventricular calcifications on head ultrasound. Which of the following is the most likely diagnosis, and what is the most important long-term complication?',
    o: [
      'Congenital toxoplasmosis; chorioretinitis',
      'Congenital cytomegalovirus; sensorineural hearing loss',
      'Congenital rubella; cataracts',
      'Congenital syphilis; interstitial keratitis'
    ],
    a: 1,
    e: 'PERIventricular calcifications indicate congenital CMV, the most common congenital infection and the leading infectious cause of sensorineural hearing loss. Toxoplasmosis produces DIFFUSE (scattered) intracranial calcifications with chorioretinitis and hydrocephalus. Treating symptomatic congenital CMV with valganciclovir improves hearing and neurodevelopmental outcomes, which is why the distinction matters.'
  },
  {
    id: 407, d: 4,
    q: 'A 16-year-old has fever, sore throat, and fatigue for 10 days. Examination shows exudative tonsillitis, posterior cervical lymphadenopathy, and a spleen tip palpable 3 cm below the costal margin. Monospot is positive. He plays varsity soccer and asks when he can return. Which of the following is the most appropriate advice?',
    o: [
      'He may return as soon as the fever resolves',
      'He should avoid contact and collision sports for at least 3–4 weeks from symptom onset',
      'He should avoid all sports for 6 months',
      'He may return once the spleen is no longer palpable on examination'
    ],
    a: 1,
    e: 'Splenic rupture is the feared complication of infectious mononucleosis, occurring most often in the first 3 weeks. Avoid contact, collision, and strenuous activity for at least 3–4 weeks from symptom onset. Physical examination is unreliable for determining splenomegaly resolution, and routine serial imaging is not recommended. Also note: ampicillin or amoxicillin produces a characteristic non-allergic rash in EBV.'
  },
  {
    id: 408, d: 4,
    q: 'A 4-year-old unimmunized child is bitten on the hand by a bat found in his bedroom. The bat flew away. The wound is superficial. Which of the following is the most appropriate management?',
    o: [
      'Wound care only; bats rarely transmit rabies',
      'Wound cleansing, rabies immune globulin infiltrated into the wound, and the rabies vaccine series',
      'Observe the child for 10 days for signs of rabies',
      'Rabies vaccine series alone'
    ],
    a: 1,
    e: 'Bats are the leading source of human rabies in the United States, and bat bites can be trivial or unnoticed — a bat found in the room of a sleeping or unattended child counts as an exposure even without a recognized bite. Post-exposure prophylaxis in a previously unvaccinated person is thorough wound cleansing PLUS rabies immune globulin infiltrated around the wound PLUS the vaccine series. Observation applies only to healthy dogs, cats, and ferrets.'
  },
  {
    id: 409, d: 4,
    q: 'A 7-year-old girl has a 2-day history of fever and sore throat. She has tonsillar exudates, tender anterior cervical adenopathy, and no cough or rhinorrhea. Rapid antigen detection testing is negative. Which of the following is the most appropriate next step?',
    o: [
      'Send a throat culture and withhold antibiotics pending the result',
      'Treat empirically with amoxicillin',
      'No further testing; treat symptomatically',
      'Test for infectious mononucleosis'
    ],
    a: 0,
    e: 'In children, a negative rapid antigen test should be backed up by a throat culture because of the lower sensitivity of rapid testing and the higher stakes of missed rheumatic fever. Antibiotics can safely be withheld pending culture, since treatment started within 9 days of symptom onset still prevents acute rheumatic fever. In adults, back-up culture is not recommended.'
  },
  {
    id: 410, d: 4,
    q: 'A 2-month-old infant has 2 weeks of worsening cough occurring in paroxysms, followed by post-tussive emesis and an occasional whoop. WBC is 26,000/µL with 70% lymphocytes. Which of the following is the most appropriate management for the household contacts?',
    o: [
      'No prophylaxis if they are fully immunized',
      'Azithromycin prophylaxis for all household contacts regardless of immunization status',
      'Tdap booster only',
      'Amoxicillin prophylaxis for children under 5 only'
    ],
    a: 1,
    e: 'Pertussis immunity wanes, so all household and close contacts receive post-exposure prophylaxis with azithromycin regardless of age or immunization status. The lymphocyte-predominant leukocytosis is characteristic. In infants under 1 month, azithromycin is preferred over erythromycin because of the association between erythromycin and hypertrophic pyloric stenosis.'
  },
  {
    id: 411, d: 4,
    q: 'A 6-year-old presents with a 5-cm annular erythematous lesion on the thigh, present for 5 days, following a camping trip in Connecticut. He is afebrile and well. Which of the following is the most appropriate management?',
    o: [
      'Obtain Lyme serology and treat if positive',
      'Treat with doxycycline without serologic testing',
      'Treat with amoxicillin only if serology is positive',
      'Topical antifungal therapy'
    ],
    a: 1,
    e: 'Erythema migrans is a clinical diagnosis in a patient with appropriate exposure — treat immediately without serology, which is frequently negative in early localized disease and would only delay care. Doxycycline is now recommended for Lyme disease at any age. Central clearing is not required for the diagnosis; many lesions are uniformly erythematous.'
  },

  /* ---------------- Domain 5 — Mental and Behavioral Health (6%) ---------------- */
  {
    id: 501, d: 5,
    q: 'A 5-year-old boy has hyperactivity, impulsivity, and inattention at home and in preschool for the past year, causing significant impairment. Vanderbilt scales from parents and teacher are consistent with ADHD. Which of the following is the most appropriate initial treatment?',
    o: [
      'Methylphenidate',
      'Evidence-based parent training in behavior management',
      'Atomoxetine',
      'Guanfacine extended release'
    ],
    a: 1,
    e: 'For children aged 4 and 5 years, the AAP recommends evidence-based parent training in behavior management and/or classroom behavioral interventions as FIRST-line treatment, before medication. Methylphenidate is reserved for preschoolers whose symptoms persist with moderate-to-severe impairment after behavioral therapy. From age 6 onward, medication plus behavioral therapy is first-line. Age drives this question.'
  },
  {
    id: 502, d: 5,
    q: 'A 16-year-old girl with a 3-month history of depressed mood, anhedonia, and declining grades has a PHQ-A score consistent with moderate major depressive disorder. She denies suicidal ideation. Which of the following is the most appropriate initial pharmacotherapy if medication is indicated?',
    o: ['Sertraline', 'Fluoxetine', 'Bupropion', 'Amitriptyline'],
    a: 1,
    e: 'Fluoxetine has the strongest evidence in pediatric depression and is FDA-approved from age 8; escitalopram is approved from age 12. Combined SSRI plus CBT is superior to either alone. Bupropion is not first-line and is contraindicated with eating disorders or seizure risk. Tricyclics are ineffective for pediatric depression and are dangerous in overdose. Monitor closely for emerging suicidality after starting.'
  },
  {
    id: 503, d: 5,
    q: 'A 15-year-old girl with anorexia nervosa has a BMI at the 3rd percentile. Vital signs show a heart rate of 42/min while asleep, blood pressure of 84/50 mm Hg, and a temperature of 35.8 °C. Which of the following is the most appropriate management?',
    o: [
      'Outpatient family-based treatment with weekly weight checks',
      'Hospital admission for medical stabilization and monitored refeeding',
      'Referral to an outpatient dietitian',
      'Start fluoxetine and follow up in 2 weeks'
    ],
    a: 1,
    e: 'This patient meets multiple admission criteria: bradycardia <45/min at night, hypotension, hypothermia, and severe malnutrition. Refeeding must be monitored because of refeeding syndrome, whose hallmark is HYPOPHOSPHATEMIA (with hypokalemia, hypomagnesemia, and thiamine depletion). Family-based treatment is first-line for adolescent anorexia but only once the patient is medically stable. SSRIs are ineffective for the core symptoms of anorexia.'
  },
  {
    id: 504, d: 5,
    q: 'The parents of a 20-month-old are concerned that he does not respond to his name, does not point to show them things, has no words, and lines up his toy cars repetitively. M-CHAT-R/F is positive. Which of the following is the most appropriate next step?',
    o: [
      'Refer for a diagnostic autism evaluation and wait for results before other referrals',
      'Refer simultaneously for a diagnostic evaluation, early intervention services, and audiologic testing',
      'Repeat the M-CHAT-R/F at 24 months',
      'Obtain a brain MRI and EEG'
    ],
    a: 1,
    e: 'A positive M-CHAT-R/F after follow-up interview should trigger three referrals at once: a comprehensive diagnostic evaluation, early intervention services (which do not require a confirmed diagnosis), and audiologic assessment to exclude hearing loss. Waiting for the diagnostic evaluation — often months long — wastes the window in which early intensive intervention is most effective. This "all three simultaneously" structure is heavily tested.'
  },
  {
    id: 505, d: 5,
    q: 'A 9-year-old girl has begun refusing to attend school. She has daily morning abdominal pain and headaches that resolve by mid-morning on days she stays home, and she is asymptomatic on weekends and holidays. Physical examination and screening laboratory studies are normal. Which of the following is the most appropriate management?',
    o: [
      'Abdominal ultrasound and celiac serology',
      'Prompt return to school with a graded reentry plan and evaluation for an anxiety disorder',
      'Home schooling until symptoms resolve',
      'Trial of a proton pump inhibitor'
    ],
    a: 1,
    e: 'Symptoms that occur only on school days and remit on weekends indicate school refusal driven by anxiety, not organic disease. The evidence-based approach is a prompt, graded return to school, coordination with the school, and treatment of the underlying anxiety with CBT (adding an SSRI for moderate-severe cases). Allowing continued absence reinforces avoidance and worsens outcomes.'
  },
  {
    id: 506, d: 5,
    q: 'A 17-year-old boy is brought after a friend reported that he posted about "not wanting to be here anymore." He acknowledges passive suicidal thoughts but denies a plan. There are firearms in the home used for hunting. Which of the following is the most important intervention?',
    o: [
      'Reassure the family that passive ideation without a plan is low risk',
      'Counsel the family to remove firearms from the home or store them locked and unloaded with ammunition stored separately',
      'Start an SSRI and follow up in 4 weeks',
      'Obtain a urine toxicology screen'
    ],
    a: 1,
    e: 'Lethal means restriction is the single most effective intervention for reducing suicide deaths. Firearms account for a large share of adolescent suicide deaths and have by far the highest case fatality, so removal from the home — or at minimum locked, unloaded storage with separately stored ammunition — is the priority counseling point. Passive ideation is not low risk, and asking about suicide does not increase risk.'
  },
  {
    id: 507, d: 5,
    q: 'A 12-year-old boy with ADHD has been taking methylphenidate for 1 year. His parents report good school performance but note that he has fallen from the 50th to the 25th percentile for weight and eats almost nothing at lunch. Which of the following is the most appropriate management?',
    o: [
      'Discontinue stimulant therapy permanently',
      'Address appetite suppression with dietary timing strategies and consider dose or formulation adjustment',
      'Add cyproheptadine',
      'Switch to an antipsychotic'
    ],
    a: 1,
    e: 'Appetite suppression is the most common stimulant side effect. It is managed by eating a substantial breakfast before the medication takes effect, offering calorie-dense foods and an evening snack when the medication wears off, and adjusting the dose or formulation — not by abandoning effective therapy. Growth should be monitored; the modest height effect is generally small and partially attenuates over time.'
  },
  {
    id: 508, d: 5,
    q: 'A 14-year-old girl is brought for evaluation of episodes in which she suddenly becomes unresponsive with generalized shaking lasting 10 minutes. The episodes occur only at school, she has never been injured, her eyes are tightly closed during events, and she recalls conversations that occurred during them. EEG during an event is normal. Which of the following is the most likely diagnosis?',
    o: [
      'Generalized tonic-clonic seizures',
      'Functional (psychogenic non-epileptic) seizures',
      'Absence epilepsy',
      'Cardiac syncope'
    ],
    a: 1,
    e: 'Forced eye closure, situational occurrence, preserved awareness with recall of events, prolonged duration without injury or postictal state, and a normal ictal EEG all point to functional neurologic symptom disorder. The correct approach is a clear, non-pejorative explanation that the events are real but not epileptic, avoidance of antiseizure medication, and referral for psychological treatment — often with an identifiable stressor. Framing this as "faking" is both wrong and harmful.'
  },
  {
    id: 509, d: 5,
    q: 'A 16-year-old presents with 2 months of daily cannabis use. He reports recurrent episodes of severe vomiting relieved only by prolonged hot showers. Which of the following is the most likely diagnosis?',
    o: [
      'Cyclic vomiting syndrome',
      'Cannabinoid hyperemesis syndrome',
      'Gastroparesis',
      'Increased intracranial pressure'
    ],
    a: 1,
    e: 'Compulsive hot bathing that relieves nausea and vomiting in a chronic cannabis user is essentially pathognomonic for cannabinoid hyperemesis syndrome. The definitive treatment is cannabis cessation; topical capsaicin and haloperidol have been used acutely. It is frequently misdiagnosed as cyclic vomiting syndrome, and adolescents often deny the connection because cannabis initially relieved their nausea.'
  },

  /* ---------------- Domain 6 — Psychosocial (3%) ---------------- */
  {
    id: 601, d: 6,
    q: 'A 6-year-old girl is brought for a visit by her Spanish-speaking mother, who has limited English proficiency. The child speaks fluent English. Which of the following is the most appropriate way to communicate?',
    o: [
      'Ask the child to interpret for her mother',
      'Use a professional medical interpreter',
      'Use the clinic receptionist who speaks some Spanish',
      'Communicate in simplified English with gestures'
    ],
    a: 1,
    e: 'A trained professional medical interpreter is required. Using children as interpreters is inappropriate — it produces clinically significant errors, burdens the child with adult content, and inverts the family hierarchy. Ad hoc interpreters, including bilingual staff without interpreter training, have substantially higher error rates. This is one of the most reliably tested items in the psychosocial domain.'
  },
  {
    id: 602, d: 6,
    q: 'During a health supervision visit, a mother of a 3-year-old answers affirmatively to "Within the past 12 months we worried whether our food would run out before we got money to buy more." Which of the following is the most appropriate response?',
    o: [
      'Document the response and readdress it at the next annual visit',
      'Connect the family with WIC, SNAP, and local food resources at this visit',
      'Refer to child protective services for neglect',
      'Obtain a nutritional laboratory panel'
    ],
    a: 1,
    e: 'This is a positive Hunger Vital Sign screen for food insecurity. Screening is only recommended when paired with a resource pathway — the correct action is immediate connection with concrete supports (WIC, SNAP, food pantries, school meal programs). Food insecurity is not neglect and should not be reported as such. Screening and then deferring action is the tested wrong answer.'
  },
  {
    id: 603, d: 6,
    q: 'A 4-year-old boy\'s father died 2 months ago. His mother reports he has asked repeatedly when his father is coming home and has begun wetting the bed. He plays normally and eats well. Which of the following is the most appropriate guidance?',
    o: [
      'This suggests complicated grief and warrants immediate psychiatric referral',
      'Explain that preschoolers view death as reversible; advise concrete language, maintained routines, and reassurance that he did not cause it',
      'Advise avoiding all discussion of the father to prevent distress',
      'Recommend a sleep study for the enuresis'
    ],
    a: 1,
    e: 'Preschool children use magical thinking and understand death as reversible, so repeatedly asking when a parent is returning is developmentally normal. Regression such as enuresis is a normal grief response. Guidance is concrete language ("died," not "passed away" or "went to sleep," which young children take literally), maintained routines, reassurance that they did not cause the death, and permission to participate in rituals.'
  },
  {
    id: 604, d: 6,
    q: 'A 10-year-old boy in foster care presents for an initial visit after placement 2 weeks ago. Which of the following is most appropriate?',
    o: [
      'Defer evaluation until records arrive from the previous provider',
      'Perform a comprehensive health, developmental, and mental health evaluation now',
      'Address only acute concerns at this visit',
      'Order a routine screening laboratory panel and follow up in 6 months'
    ],
    a: 1,
    e: 'Children entering foster care should have a comprehensive evaluation within 30 days of placement — including developmental, mental health, dental, and vision assessment plus medication reconciliation — because they carry high rates of unrecognized chronic disease, trauma exposure, and interrupted care. Waiting for records (which are frequently incomplete or delayed) is not appropriate.'
  },

  /* ---------------- Domain 7 — Emergency and Critical Care (4%) ---------------- */
  {
    id: 701, d: 7,
    q: 'A 7-year-old boy develops generalized urticaria, vomiting, and wheezing 10 minutes after eating a cookie containing peanut. Blood pressure is normal. Which of the following is the most appropriate immediate treatment?',
    o: [
      'Intramuscular epinephrine 0.01 mg/kg into the anterolateral thigh',
      'Oral diphenhydramine and observation',
      'Intravenous methylprednisolone',
      'Nebulized albuterol and reassessment in 15 minutes'
    ],
    a: 0,
    e: 'This meets anaphylaxis criteria — acute onset with skin involvement PLUS respiratory compromise, plus a second organ system (GI) after a likely allergen. A normal blood pressure does not exclude anaphylaxis. IM epinephrine into the anterolateral thigh is the only first-line treatment and has no absolute contraindication; antihistamines and steroids are adjuncts that do nothing for airway or circulatory compromise. Delay in giving epinephrine is the strongest predictor of fatal outcome.'
  },
  {
    id: 702, d: 7,
    q: 'A 14-year-old girl is brought 6 hours after ingesting an unknown number of acetaminophen tablets in a suicide attempt. She is alert with normal vital signs and mild nausea. Which of the following is the most appropriate next step?',
    o: [
      'Administer activated charcoal',
      'Obtain a 4-hour post-ingestion acetaminophen level, plot on the Rumack-Matthew nomogram, and start N-acetylcysteine if indicated',
      'Await transaminase elevation before treating',
      'Perform gastric lavage'
    ],
    a: 1,
    e: 'The serum acetaminophen level drawn at or after 4 hours post-ingestion is plotted on the Rumack-Matthew nomogram to determine the need for N-acetylcysteine, which is most effective within 8 hours of ingestion. Waiting for transaminase elevation means waiting 24–48 hours and losing the treatment window. Charcoal is useful within about 1–2 hours; gastric lavage is essentially obsolete. Also obtain a salicylate level and pregnancy test, and address the psychiatric emergency.'
  },
  {
    id: 703, d: 7,
    q: 'A 12-year-old with type 1 diabetes presents in diabetic ketoacidosis. After 90 minutes of isotonic fluid resuscitation and initiation of an insulin infusion, he develops a severe headache, becomes confused, and has a heart rate of 58/min with a blood pressure of 138/88 mm Hg. Which of the following is the most appropriate immediate action?',
    o: [
      'Obtain an emergent head CT',
      'Administer hypertonic saline or mannitol immediately',
      'Increase the insulin infusion rate',
      'Give a normal saline bolus'
    ],
    a: 1,
    e: 'Headache, altered mental status, bradycardia with hypertension (the Cushing response), and deterioration during DKA treatment indicate cerebral edema — the leading cause of death in pediatric DKA. Treat immediately with hypertonic saline or mannitol; imaging comes AFTER treatment because delay to obtain a CT increases mortality. Additional fluid boluses would worsen the edema.'
  },
  {
    id: 704, d: 7,
    q: 'A 3-month-old former term infant had a 20-second episode of color change and decreased tone while awake in a car seat, with return to baseline. He has never had a similar event, has a normal examination, and no CPR was performed. Which of the following is the most appropriate management?',
    o: [
      'Admission for 24-hour cardiorespiratory monitoring and a full sepsis evaluation',
      'Brief monitoring with pulse oximetry, caregiver education and CPR training, and shared decision-making about follow-up',
      'Electroencephalography and brain MRI',
      'Upper GI series and pH probe study'
    ],
    a: 1,
    e: 'This meets all lower-risk BRUE criteria: age >60 days, term birth, first event, duration <1 minute, no CPR by a trained provider, and a reassuring history and examination. Lower-risk infants need brief observation with pulse oximetry, caregiver education including CPR training, and shared decision-making — not extensive testing or admission. Extensive workup in lower-risk BRUE produces false positives and no benefit.'
  },
  {
    id: 705, d: 7,
    q: 'A 2-year-old is found with an open bottle of his grandmother\'s medication. He is somnolent with a heart rate of 52/min, blood pressure of 70/40 mm Hg, respiratory rate of 10/min, and pinpoint pupils. Naloxone produces minimal improvement. Which of the following ingestions is most likely?',
    o: ['Oxycodone', 'Clonidine', 'Diphenhydramine', 'Metformin'],
    a: 1,
    e: 'Clonidine toxicity mimics opioid poisoning almost exactly — miosis, bradycardia, hypotension, respiratory depression, and somnolence — but responds poorly or only transiently to naloxone. It is a classic "one pill can kill" ingestion in toddlers. Management is supportive with atropine for symptomatic bradycardia and fluids/vasopressors for hypotension. Diphenhydramine would produce anticholinergic findings (mydriasis, tachycardia, dry skin).'
  },
  {
    id: 706, d: 7,
    q: 'A 3-year-old swallowed a coin-shaped object 1 hour ago. Radiograph shows a round radiopaque object in the mid-esophagus with a "double ring" or halo appearance on the frontal view. He is drooling but has no respiratory distress. Which of the following is the most appropriate management?',
    o: [
      'Observe for 24 hours to allow spontaneous passage',
      'Emergent endoscopic removal',
      'Administer a carbonated beverage and repeat the radiograph',
      'Give glucagon and repeat imaging in 12 hours'
    ],
    a: 1,
    e: 'The double-ring or halo sign identifies a button battery, not a coin. An esophageal button battery causes caustic injury within 2 hours through generation of hydroxide at the negative pole, and can perforate into the aorta. This requires emergent endoscopic removal — never observation. Honey (in children >12 months, within 12 hours of ingestion) may be given en route to mitigate injury. A battery past the esophagus in an asymptomatic child can generally be observed.'
  },

  /* ---------------- Domain 8 — Child Abuse (3%) ---------------- */
  {
    id: 801, d: 8,
    q: 'A 4-month-old infant is brought for irritability. Radiographs obtained for a swollen thigh show a distal femoral metaphyseal corner fracture and healing posterior rib fractures. The parents report the infant rolled off a couch. Which of the following is the most appropriate next step?',
    o: [
      'Obtain a skeletal survey and report to child protective services',
      'Obtain genetic testing for osteogenesis imperfecta before reporting',
      'Reassure the family that these fractures are consistent with the reported fall',
      'Repeat imaging in 2 weeks to assess healing'
    ],
    a: 0,
    e: 'Classic metaphyseal lesions (corner/bucket-handle fractures) and posterior rib fractures are both highly specific for abusive trauma, and neither is produced by a short fall or by CPR. A skeletal survey is mandatory in children under 2 with suspected abuse, and a report must be made on reasonable suspicion — not after excluding every mimic. Osteogenesis imperfecta workup proceeds in parallel with, not before, reporting.'
  },
  {
    id: 802, d: 8,
    q: 'A 6-week-old infant has a 1-cm bruise on the left cheek. The parents cannot explain it. The infant is otherwise well with a normal examination. Which of the following is the most appropriate action?',
    o: [
      'Reassure the parents; bruising is common at this age',
      'Evaluate for abuse, including skeletal survey, neuroimaging, and laboratory studies, and report',
      'Obtain a CBC and repeat the examination in 1 week',
      'Advise the parents to be more careful with handling'
    ],
    a: 1,
    e: 'Any bruise in an infant under 4 months old is a sentinel injury: "those who don\'t cruise rarely bruise." Cheek bruising also falls within the TEN-4-FACESp rule. Sentinel injuries precede severe abusive injury in a substantial proportion of cases, and recognizing one is the single best opportunity for prevention. Evaluation includes a skeletal survey, neuroimaging, hepatic enzymes, and coagulation studies, plus a report.'
  },
  {
    id: 803, d: 8,
    q: 'A 7-year-old girl discloses to her teacher that her mother\'s boyfriend touched her genitals 3 months ago. She is brought for evaluation. The anogenital examination is entirely normal. Which of the following is the most accurate statement?',
    o: [
      'A normal examination effectively rules out sexual abuse',
      'A normal examination is expected and does not exclude sexual abuse',
      'The absence of findings means forensic evidence collection should be performed now',
      'Colposcopy should be performed to detect microscopic injury'
    ],
    a: 1,
    e: 'The great majority of examinations after child sexual abuse are normal — mucosal injuries heal rapidly and completely, and most abuse does not produce injury. A normal examination must never be used to reassure or to discount a disclosure. The child needs a specialized forensic interview (not repeated questioning by multiple providers), a report, and mental health support. Forensic evidence collection is only useful within roughly 72 hours to 5 days.'
  },
  {
    id: 804, d: 8,
    q: 'A 9-month-old presents with lethargy and vomiting. CT shows subdural hemorrhages of different ages. Dilated ophthalmologic examination reveals numerous multilayered retinal hemorrhages extending to the periphery in both eyes. The father reports the child fell 3 feet from a bed. Which of the following is the most likely explanation?',
    o: [
      'Accidental head injury consistent with the history',
      'Abusive head trauma',
      'Retinal hemorrhages from vigorous crying',
      'Benign external hydrocephalus with subdural collections'
    ],
    a: 1,
    e: 'Numerous, multilayered retinal hemorrhages extending to the periphery are highly specific for abusive head trauma and are not produced by short falls, crying, seizures, or CPR. Combined with subdural hemorrhages of differing ages and a history inconsistent with the severity of injury, this is abusive head trauma. Short household falls essentially never cause severe intracranial injury.'
  },
  {
    id: 805, d: 8,
    q: 'A 2-year-old boy is brought with a sharply demarcated burn involving both feet and lower legs in a stocking distribution, with sparing of the soles and popliteal creases. The caregiver states he climbed into a hot bath himself. Which of the following features most strongly suggests inflicted injury?',
    o: [
      'The involvement of both lower extremities',
      'The sharp line of demarcation with sparing of flexural creases',
      'The child\'s age',
      'The absence of blistering'
    ],
    a: 1,
    e: 'A sharp demarcation without splash or satellite marks indicates forced immersion — a child who climbs in accidentally splashes and withdraws irregularly. Sparing of the flexural creases and soles occurs when the child is held flexed against a cool tub surface. Symmetric stocking-glove distributions are the classic pattern of inflicted immersion burns and warrant a full abuse evaluation and report.'
  },

  /* ---------------- Domain 9 — Ortho and Sports (4%) ---------------- */
  {
    id: 901, d: 9,
    q: 'A 13-year-old boy with a BMI at the 97th percentile has had 6 weeks of left knee pain and a limp. Knee examination is normal. Hip examination shows limited internal rotation with obligate external rotation on passive hip flexion. Which of the following is the most appropriate next step?',
    o: [
      'MRI of the knee',
      'Anteroposterior and frog-leg lateral radiographs of both hips, and keep the patient non-weight-bearing',
      'Physical therapy for patellofemoral pain',
      'Radiographs of the knee and follow up in 4 weeks'
    ],
    a: 1,
    e: 'This is slipped capital femoral epiphysis. Knee pain is referred from the hip via the obturator nerve, so any adolescent with knee pain and a normal knee exam needs a hip examination and hip radiographs, including a frog-leg lateral (the slip may be invisible on the AP view). Both hips are imaged because the contralateral side slips in up to 40%. The patient must be made non-weight-bearing immediately — continued walking risks progression and avascular necrosis.'
  },
  {
    id: 902, d: 9,
    q: 'A 4-year-old refuses to bear weight on the right leg. Temperature is 39.0 °C. He holds the hip in flexion, abduction, and external rotation and resists any movement. ESR is 60 mm/h and WBC is 16,500/µL. Which of the following is the most appropriate next step?',
    o: [
      'NSAIDs and reassessment in 48 hours for presumed transient synovitis',
      'Ultrasound-guided hip aspiration',
      'MRI of the pelvis before any intervention',
      'Empiric oral antibiotics and outpatient follow-up'
    ],
    a: 1,
    e: 'All four Kocher criteria are present (fever >38.5 °C, non-weight-bearing, ESR ≥40, WBC >12,000), giving a very high probability of septic arthritis. Joint aspiration is both diagnostic and the necessary first step before antibiotics, followed by surgical drainage. Delay causes irreversible cartilage destruction and femoral head necrosis. Transient synovitis children are afebrile or low-grade and will bear weight.'
  },
  {
    id: 903, d: 9,
    q: 'A 2-year-old girl is brought after her arm was pulled while crossing the street. She holds the arm slightly flexed and pronated and will not use it. There is no swelling, deformity, or bruising, and she is not tender over the clavicle or the shaft of any long bone. Which of the following is the most appropriate management?',
    o: [
      'Radiographs of the elbow and forearm',
      'Reduction by hyperpronation or supination-flexion of the elbow',
      'Sling immobilization and orthopedic referral',
      'Skeletal survey to evaluate for abuse'
    ],
    a: 1,
    e: 'This is a classic nursemaid\'s elbow (radial head subluxation) from axial traction on a pronated arm. With a typical history and no swelling, deformity, or focal bony tenderness, radiographs are unnecessary — proceed directly to reduction. Hyperpronation has a higher success rate and is less painful than supination-flexion. The child typically uses the arm within minutes.'
  },
  {
    id: 904, d: 9,
    q: 'A 15-year-old football player sustains a helmet-to-helmet collision, is dazed for 30 seconds without loss of consciousness, and reports headache and difficulty concentrating. His neurologic examination is normal. Which of the following is the most appropriate management?',
    o: [
      'He may return to play if symptoms resolve within 15 minutes',
      'Remove from play for the remainder of the day, then a graduated stepwise return after symptoms resolve',
      'Strict dark-room rest with no school or screens for 1 week',
      'Head CT before any return-to-play decision'
    ],
    a: 1,
    e: 'No athlete with a suspected concussion returns to play the same day, regardless of symptom resolution. After a brief (24–48 hour) period of relative rest, a graduated stepwise return-to-play protocol proceeds with at least 24 hours at each stage, and return to LEARN precedes return to PLAY. Prolonged strict rest and dark-room isolation delay recovery and are no longer recommended. Imaging is reserved for red flags such as focal deficits or deteriorating mental status.'
  },
  {
    id: 905, d: 9,
    q: 'A newborn girl was born in breech presentation. On examination at 2 days of life, the Ortolani maneuver produces a palpable clunk on the left. Which of the following is the most appropriate next step?',
    o: [
      'Hip ultrasonography today',
      'Anteroposterior pelvic radiograph today',
      'Refer to orthopedics and obtain hip ultrasonography at approximately 4–6 weeks of age',
      'Double diapering and reexamination at the 2-month visit'
    ],
    a: 2,
    e: 'A positive Ortolani requires orthopedic referral. Ultrasound before about 4–6 weeks yields many false positives from physiologic laxity, so imaging is timed accordingly; radiographs are not useful until the femoral head ossifies at about 4–6 months. Breech presentation, female sex, family history, and firstborn status are the classic risk factors. Double diapering is not effective treatment — a Pavlik harness is.'
  },
  {
    id: 906, d: 9,
    q: 'A 13-year-old girl is seen for a preparticipation evaluation. She reports two episodes of syncope, both occurring while running during soccer practice. Her cardiovascular examination is normal at rest. Which of the following is the most appropriate action?',
    o: [
      'Clear her for participation; syncope during exertion is common in adolescent athletes',
      'Withhold clearance and refer for cardiology evaluation with an ECG',
      'Advise increased fluid and salt intake and clear her',
      'Obtain an EEG'
    ],
    a: 1,
    e: 'Syncope DURING exertion is never benign — it suggests hypertrophic cardiomyopathy, anomalous coronary artery, long QT syndrome, or catecholaminergic polymorphic ventricular tachycardia. Do not clear the athlete; obtain an ECG and refer to cardiology. Syncope AFTER exertion stops is more commonly vasovagal. Fluid and salt loading is appropriate advice for neurocardiogenic syncope only, after cardiac causes are excluded.'
  },

  /* ---------------- Domain 10 — EENT (6%) ---------------- */
  {
    id: 1001, d: 10,
    q: 'A 2-month-old infant has an absent red reflex in the right eye on routine examination. The eye appears otherwise normal and the infant is well. Which of the following is the most appropriate next step?',
    o: [
      'Reassure and reexamine at the 4-month visit',
      'Urgent referral to pediatric ophthalmology',
      'Obtain a brain MRI',
      'Treat for presumed nasolacrimal duct obstruction'
    ],
    a: 1,
    e: 'Leukocoria or an absent red reflex requires urgent ophthalmology referral. The differential includes retinoblastoma (life-threatening), congenital cataract (where delayed surgery causes irreversible deprivation amblyopia), retinopathy of prematurity, and Coats disease. There is no scenario in which observation is appropriate — this is among the most consistently tested "do not wait" findings in pediatrics.'
  },
  {
    id: 1002, d: 10,
    q: 'A 5-year-old has 4 days of fever, left eyelid swelling, and erythema. He has pain with eye movement, mild proptosis, and limited lateral gaze. Visual acuity is 20/40 on the left and 20/20 on the right. Which of the following is the most appropriate management?',
    o: [
      'Oral amoxicillin-clavulanate and follow-up in 24 hours',
      'CT of the orbits and sinuses with contrast, and admission for intravenous antibiotics',
      'Warm compresses and topical erythromycin',
      'Ophthalmology referral for outpatient follow-up in 1 week'
    ],
    a: 1,
    e: 'Pain with eye movement, proptosis, ophthalmoplegia, and decreased visual acuity indicate ORBITAL (postseptal) cellulitis, usually from contiguous ethmoid sinusitis. This requires contrast CT of the orbits and sinuses to evaluate for subperiosteal abscess, admission, IV antibiotics, and ophthalmology/ENT involvement. Preseptal cellulitis, by contrast, has normal vision, normal extraocular movement, and no proptosis, and can be managed orally.'
  },
  {
    id: 1003, d: 10,
    q: 'A 20-month-old has 2 days of fever and ear pain. Examination shows a moderately bulging, erythematous right tympanic membrane with impaired mobility. He received amoxicillin 3 weeks ago for another episode of otitis media. Which of the following is the most appropriate treatment?',
    o: [
      'High-dose amoxicillin',
      'Amoxicillin-clavulanate',
      'Azithromycin',
      'Observation with analgesia for 48–72 hours'
    ],
    a: 1,
    e: 'Amoxicillin-clavulanate is indicated when the child has received amoxicillin within the preceding 30 days, has concurrent purulent conjunctivitis, or has recurrent AOM unresponsive to amoxicillin — all situations favoring beta-lactamase-producing nontypeable H. influenzae or M. catarrhalis. Azithromycin has poor activity against resistant pneumococcus and is not preferred. Observation is not appropriate here given the recent treatment failure pattern.'
  },
  {
    id: 1004, d: 10,
    q: 'A 3-year-old has had nasal congestion with purulent discharge and daytime cough for 12 days without improvement. He is afebrile and well-appearing. Which of the following is the most appropriate next step?',
    o: [
      'CT of the sinuses',
      'Begin amoxicillin or amoxicillin-clavulanate',
      'Plain sinus radiographs',
      'Nasal saline and observation for another 2 weeks'
    ],
    a: 1,
    e: 'Persistent symptoms for ≥10 days without improvement meets the criteria for acute bacterial sinusitis (the other qualifying patterns being severe onset with fever ≥39 °C and purulent discharge for ≥3 days, or a worsening "double-sickening" course). Imaging is not indicated for uncomplicated sinusitis — sinus films and CT cannot distinguish viral from bacterial disease and expose the child to radiation.'
  },
  {
    id: 1005, d: 10,
    q: 'A 3-year-old girl has had unilateral foul-smelling purulent nasal discharge from the right naris for 3 weeks. She is afebrile. The left side is clear. Which of the following is the most likely diagnosis?',
    o: ['Acute bacterial sinusitis', 'Nasal foreign body', 'Allergic rhinitis', 'Adenoid hypertrophy'],
    a: 1,
    e: 'Unilateral, foul-smelling purulent nasal discharge in a toddler is a nasal foreign body until proven otherwise. Sinusitis and allergic rhinitis are bilateral processes. The management is removal, with attention to the possibility of a button battery, which requires emergent removal because of rapid septal necrosis and perforation.'
  },
  {
    id: 1006, d: 10,
    q: 'A 4-year-old presents with 3 days of fever, refusal to eat, drooling, and a muffled voice. He holds his neck stiffly and resists extension. A lateral neck radiograph shows widening of the prevertebral soft tissue. Which of the following is the most likely diagnosis?',
    o: ['Peritonsillar abscess', 'Retropharyngeal abscess', 'Epiglottitis', 'Croup'],
    a: 1,
    e: 'Retropharyngeal abscess occurs in children under about 5 years (the retropharyngeal nodes involute thereafter) and presents with fever, neck stiffness or refusal to extend the neck, drooling, and a muffled voice, with widened prevertebral soft tissue on lateral neck film. Confirm with contrast CT and treat with IV antibiotics ± drainage. Peritonsillar abscess occurs in adolescents with trismus and uvular deviation.'
  },
  {
    id: 1007, d: 10,
    q: 'A 6-year-old girl has a 2-cm midline neck mass just above the thyroid cartilage that moves upward when she swallows and when she protrudes her tongue. It is nontender. Which of the following is the most likely diagnosis?',
    o: ['Branchial cleft cyst', 'Thyroglossal duct cyst', 'Reactive lymphadenopathy', 'Cystic hygroma'],
    a: 1,
    e: 'A midline neck mass that elevates with swallowing and tongue protrusion is a thyroglossal duct cyst, arising along the embryologic descent of the thyroid. Before excision (Sistrunk procedure), confirm the presence of a normally located thyroid gland — in a small number of cases the cyst contains the only functioning thyroid tissue. A branchial cleft cyst is lateral, anterior to the sternocleidomastoid.'
  },
  {
    id: 1008, d: 10,
    q: 'A 10-day-old infant has bilateral copious purulent eye discharge with marked eyelid edema and chemosis. The mother had no prenatal care. Gram stain of the discharge shows gram-negative intracellular diplococci. Which of the following is the most appropriate management?',
    o: [
      'Topical erythromycin ointment',
      'Oral erythromycin for 14 days',
      'Hospitalization, saline irrigation, and a single dose of parenteral ceftriaxone or cefotaxime',
      'Observation, as most neonatal conjunctivitis is chemical'
    ],
    a: 2,
    e: 'Gram-negative intracellular diplococci indicate gonococcal ophthalmia neonatorum, a sight-threatening emergency that can perforate the cornea within 24 hours. Management is hospitalization, frequent saline irrigation, and systemic ceftriaxone (or cefotaxime if hyperbilirubinemic); topical therapy alone is inadequate. Also evaluate for disseminated gonococcal infection and concurrent chlamydia, and evaluate the mother and her partners.'
  },
  {
    id: 1009, d: 10,
    q: 'A 3-year-old has had bilateral middle ear effusions documented on three visits over the past 4 months. Audiometry shows a 30-dB conductive hearing loss bilaterally. He has mild speech delay. Which of the following is the most appropriate management?',
    o: [
      'Continue watchful waiting for another 3 months',
      'Prescribe an oral antihistamine and nasal steroid',
      'Refer for tympanostomy tube placement',
      'Prescribe a 10-day course of amoxicillin'
    ],
    a: 2,
    e: 'Bilateral otitis media with effusion persisting ≥3 months with documented hearing loss and associated speech delay is an indication for tympanostomy tubes. Antihistamines, decongestants, and intranasal or systemic steroids are explicitly not recommended for OME — they do not hasten resolution and carry side effects. Antibiotics do not provide lasting benefit for OME either.'
  },

  /* ---------------- Domain 11 — Cardiology (5%) ---------------- */
  {
    id: 1101, d: 11,
    q: 'A 5-year-old boy has a grade 2/6 vibratory, musical systolic murmur at the left lower sternal border. It is loudest when he is supine and diminishes when he stands. S2 splits normally with respiration, pulses are normal, and he is asymptomatic. Which of the following is the most appropriate management?',
    o: [
      'Reassurance; this is an innocent Still murmur',
      'Echocardiography',
      'Electrocardiography and cardiology referral',
      'Chest radiograph'
    ],
    a: 0,
    e: 'This is a classic Still murmur: vibratory/musical quality, grade ≤2, left lower sternal border, ages 2–7, louder supine and softer with standing, with an otherwise normal cardiovascular examination. No testing is needed. Features that would demand evaluation are any diastolic murmur, holosystolic or continuous murmur, grade ≥3, a thrill, an abnormal S2, a click, or a murmur that INCREASES with standing (suggesting hypertrophic cardiomyopathy).'
  },
  {
    id: 1102, d: 11,
    q: 'A 6-day-old infant presents with poor feeding, tachypnea, and mottling. Femoral pulses are weak, right arm blood pressure is 88/54 mm Hg, and lower extremity blood pressure is 58/32 mm Hg. Which of the following is the most appropriate immediate treatment?',
    o: [
      'Intravenous furosemide',
      'Prostaglandin E1 infusion',
      'Normal saline bolus of 20 mL/kg',
      'Intravenous antibiotics alone'
    ],
    a: 1,
    e: 'A greater than 20 mm Hg upper-to-lower extremity gradient with weak femoral pulses and decompensation as the ductus closes indicates coarctation of the aorta — a ductal-dependent lesion. Prostaglandin E1 reopens the ductus and restores lower body perfusion. Anticipate apnea as the tested side effect. Presentation in the first 1–2 weeks as the ductus closes is characteristic; also check for a bicuspid aortic valve and consider Turner syndrome in a girl.'
  },
  {
    id: 1103, d: 11,
    q: 'A 14-year-old boy collapses during basketball practice and is resuscitated. His father died suddenly at age 38. Examination now shows a harsh systolic murmur at the left sternal border that increases with standing and Valsalva and decreases with squatting. Which of the following is the most likely diagnosis?',
    o: [
      'Aortic stenosis',
      'Hypertrophic cardiomyopathy',
      'Ventricular septal defect',
      'Mitral valve prolapse'
    ],
    a: 1,
    e: 'A murmur that INCREASES with standing and Valsalva (which reduce preload and left ventricular volume, worsening outflow obstruction) and decreases with squatting is characteristic of hypertrophic cardiomyopathy. Combined with exertional syncope and a family history of sudden death, this is HCM until disproven. Most murmurs behave in the opposite direction, which is why this maneuver is such a reliable discriminator on the exam.'
  },
  {
    id: 1104, d: 11,
    q: 'An 8-month-old has had 4 days of fever, poor feeding, and increasing tachypnea. Heart rate is 190/min, temperature is 38.2 °C, and there is a gallop with hepatomegaly 4 cm below the costal margin. Chest radiograph shows cardiomegaly with pulmonary edema. Which of the following is the most appropriate immediate management?',
    o: [
      'A 20 mL/kg normal saline bolus',
      'Nebulized albuterol and systemic corticosteroids',
      'Careful management of preload with inotropic support and cardiology consultation',
      'Broad-spectrum antibiotics alone'
    ],
    a: 2,
    e: 'Tachycardia out of proportion to fever, a gallop, hepatomegaly, and cardiomegaly with pulmonary edema indicate myocarditis with cardiogenic shock. A standard 20 mL/kg fluid bolus can precipitate decompensation — give small boluses (5–10 mL/kg) with frequent reassessment, or none at all, and start inotropic support. Myocarditis is commonly misdiagnosed as asthma, pneumonia, or gastroenteritis, which is exactly why it is tested.'
  },
  {
    id: 1105, d: 11,
    q: 'A previously healthy 4-month-old infant presents with a heart rate of 280/min, poor feeding, and irritability. Blood pressure is 78/45 mm Hg with adequate perfusion. The rate does not vary. Which of the following is the most appropriate initial management?',
    o: [
      'Synchronized cardioversion at 0.5–1 J/kg',
      'Vagal maneuvers with an ice bag to the face, then rapid intravenous adenosine',
      'Intravenous verapamil',
      'Intravenous amiodarone'
    ],
    a: 1,
    e: 'A fixed rate of 280/min without beat-to-beat variability in an infant is supraventricular tachycardia. In a hemodynamically stable patient, try vagal maneuvers (ice to the face in infants) and then rapid IV adenosine with a rapid saline flush. Synchronized cardioversion is reserved for unstable patients. Verapamil is contraindicated in infants — it can cause profound hypotension and cardiac arrest.'
  },
  {
    id: 1106, d: 11,
    q: 'A 16-year-old girl reports recurrent lightheadedness on standing, fatigue, and palpitations. On standing, her heart rate rises from 72 to 118/min within 8 minutes with no fall in blood pressure. Which of the following is the most appropriate initial management?',
    o: [
      'Fludrocortisone',
      'Increased fluid and sodium intake, a graded exercise reconditioning program, and compression garments',
      'Beta-blocker therapy',
      'Implantable loop recorder'
    ],
    a: 1,
    e: 'This is postural orthostatic tachycardia syndrome — a sustained heart rate increase of ≥40 bpm in adolescents within 10 minutes of standing WITHOUT orthostatic hypotension. First-line management is non-pharmacologic: increased fluid (2–3 L/day) and salt intake, a progressive recumbent-to-upright exercise reconditioning program (the intervention with the best evidence), and compression garments. Medications are reserved for refractory symptoms.'
  },
  {
    id: 1107, d: 11,
    q: 'A 10-year-old boy presents with 3 weeks of migratory arthritis affecting the knees and ankles, fever, and a new holosystolic murmur at the apex. Antistreptolysin O titer is elevated. Which of the following is the most important long-term management?',
    o: [
      'A 10-day course of penicillin only',
      'Long-term secondary antibiotic prophylaxis with penicillin',
      'Daily aspirin indefinitely',
      'Annual echocardiography with no other therapy'
    ],
    a: 1,
    e: 'This is acute rheumatic fever (migratory polyarthritis plus carditis, with evidence of preceding streptococcal infection — two major criteria). Beyond treating the acute episode, the essential long-term intervention is secondary prophylaxis with penicillin to prevent recurrent ARF and progressive rheumatic heart disease. Duration depends on carditis and residual valve disease, often continuing for 10 years or into adulthood.'
  },

  /* ---------------- Domain 12 — Pulmonology (5%) ---------------- */
  {
    id: 1201, d: 12,
    q: 'A 9-year-old with asthma uses his albuterol inhaler 4 days per week and wakes at night with cough about 3 times per month. He is currently on no controller medication. Spirometry shows FEV1 85% predicted. Which of the following is the most appropriate management?',
    o: [
      'Continue albuterol as needed only',
      'Start a low-dose inhaled corticosteroid daily',
      'Start a long-acting beta agonist alone',
      'Start oral montelukast alone'
    ],
    a: 1,
    e: 'Daytime symptoms more than 2 days per week but not daily, with nocturnal awakenings 3–4 times per month, define mild persistent asthma. All persistent asthma requires a daily controller, and low-dose inhaled corticosteroid is first-line. A long-acting beta agonist must never be used as monotherapy (increased risk of severe exacerbation and death). Montelukast is less effective than ICS and carries a boxed warning for neuropsychiatric effects.'
  },
  {
    id: 1202, d: 12,
    q: 'A 7-month-old has 3 days of cough, congestion, and wheezing with a respiratory rate of 52/min, mild retractions, and oxygen saturation of 94% on room air. He is feeding at about 75% of normal. Which of the following is the most appropriate management?',
    o: [
      'Nebulized albuterol and oral dexamethasone',
      'Chest radiograph and oral amoxicillin',
      'Supportive care with nasal suctioning and hydration; discharge with return precautions',
      'Admission for continuous pulse oximetry'
    ],
    a: 2,
    e: 'This is bronchiolitis. The AAP guideline recommends against routine bronchodilators, corticosteroids, antibiotics, chest physiotherapy, and chest radiographs. Management is supportive: suctioning, hydration, and oxygen if saturation falls persistently below 90%. Continuous pulse oximetry is not recommended in stable non-hypoxemic infants because it prolongs hospitalization without benefit. The domain question is usually about what NOT to do.'
  },
  {
    id: 1203, d: 12,
    q: 'A 20-month-old had a sudden choking episode while eating peanuts 2 days ago, followed by persistent cough. Examination shows decreased breath sounds and wheezing over the right lung. Inspiratory and expiratory chest radiographs are read as normal. Which of the following is the most appropriate next step?',
    o: [
      'Reassure and treat with albuterol for reactive airway disease',
      'Rigid bronchoscopy',
      'CT of the chest',
      'Repeat radiographs in 1 week'
    ],
    a: 1,
    e: 'Most aspirated foreign bodies (organic material such as nuts) are radiolucent, so normal radiographs never exclude aspiration. With a witnessed choking episode plus unilateral findings, rigid bronchoscopy is both diagnostic and therapeutic and should proceed. Delay leads to granulation tissue, post-obstructive pneumonia, and bronchiectasis. The tested principle: history plus asymmetric exam trumps a normal film.'
  },
  {
    id: 1204, d: 12,
    q: 'A 4-year-old with a 2-year history of nasal polyps, chronic loose greasy stools, and weight at the 3rd percentile despite a voracious appetite is evaluated. Which of the following is the most appropriate diagnostic test?',
    o: ['Sweat chloride testing', 'Celiac serology', 'Stool elastase alone', 'Allergy skin testing'],
    a: 0,
    e: 'Nasal polyps in a young child are highly suggestive of cystic fibrosis and are rare otherwise. Combined with steatorrhea and failure to thrive despite a good appetite (pancreatic insufficiency), CF is the leading diagnosis. Sweat chloride ≥60 mmol/L is diagnostic (30–59 intermediate). Note that a normal newborn screen does not exclude CF — screens miss some genotypes, and a compatible clinical picture warrants sweat testing regardless.'
  },
  {
    id: 1205, d: 12,
    q: 'A 16-year-old competitive runner reports episodes of noisy breathing and throat tightness during peak exertion. She localizes the difficulty to her throat, symptoms begin and end abruptly, oxygen saturation is normal during episodes, and albuterol has not helped. Which of the following is the most likely diagnosis?',
    o: [
      'Exercise-induced bronchoconstriction',
      'Vocal cord dysfunction (inducible laryngeal obstruction)',
      'Exercise-induced anaphylaxis',
      'Cardiac arrhythmia'
    ],
    a: 1,
    e: 'Inspiratory stridor localized to the throat, abrupt onset and resolution, normal oxygen saturation, and failure to respond to albuterol characterize vocal cord dysfunction. Spirometry may show flattening of the inspiratory limb of the flow-volume loop; laryngoscopy during an episode is definitive. Treatment is speech therapy with breathing retraining. Exercise-induced bronchoconstriction produces expiratory wheeze that responds to albuterol and typically peaks 5–10 minutes AFTER exercise stops.'
  },
  {
    id: 1206, d: 12,
    q: 'A 15-month-old has a barky cough, hoarse voice, and inspiratory stridor audible only when crying. He is well-appearing, without retractions at rest. Which of the following is the most appropriate management?',
    o: [
      'Cool mist alone and discharge',
      'A single dose of oral dexamethasone',
      'Nebulized racemic epinephrine and admission',
      'Oral amoxicillin'
    ],
    a: 1,
    e: 'Every child with croup — including mild disease with stridor only when agitated — should receive a single dose of dexamethasone (0.6 mg/kg, often 0.15–0.6 mg/kg), which reduces return visits and symptom duration. Nebulized racemic epinephrine is added for stridor AT REST, followed by 2–4 hours of observation for rebound. Cool mist has no proven benefit and antibiotics have no role in viral croup.'
  },
  {
    id: 1207, d: 12,
    q: 'A 12-year-old with a severe asthma exacerbation has been treated with continuous albuterol, ipratropium, and systemic corticosteroids for 1 hour. He is now less audibly wheezy but is sleepy, with a respiratory rate of 20/min. Arterial blood gas shows pH 7.32 and PaCO2 45 mm Hg. Which of the following best describes this situation?',
    o: [
      'He is improving; wheezing has decreased and the PaCO2 is normal',
      'He has impending respiratory failure and requires escalation of care',
      'He has metabolic acidosis from albuterol and needs bicarbonate',
      'He should be discharged after a period of observation'
    ],
    a: 1,
    e: 'A "quiet chest," decreasing respiratory rate, somnolence, and a normalizing or rising PaCO2 in a severe asthma exacerbation signal impending respiratory failure, not improvement. Severe asthmatics should be hyperventilating with a LOW PaCO2; a normal value means the patient is tiring. Escalate immediately — magnesium sulfate, ICU care, and preparation for noninvasive or invasive ventilation. This is a classic exam trap built to reward pattern recognition over surface reassurance.'
  },

  /* ---------------- Domain 13 — Gastroenterology (5%) ---------------- */
  {
    id: 1301, d: 13,
    q: 'A 3-week-old infant has forceful, non-bloody, non-bilious vomiting after every feeding for 5 days. He is hungry immediately afterward. Serum chemistry shows sodium 134, potassium 3.1, chloride 92, bicarbonate 34 mEq/L. Which of the following is the most appropriate next step?',
    o: [
      'Immediate surgical pyloromyotomy',
      'Fluid and electrolyte correction, then pyloromyotomy',
      'Trial of a hydrolyzed formula',
      'Upper GI series'
    ],
    a: 1,
    e: 'This is hypertrophic pyloric stenosis with the classic hypochloremic, hypokalemic metabolic alkalosis. It is a MEDICAL emergency first: the metabolic derangement must be corrected with isotonic fluid and potassium before anesthesia, because alkalosis increases the risk of postoperative apnea. Ultrasound confirms the diagnosis; an upper GI series is not needed with a typical presentation and ultrasound.'
  },
  {
    id: 1302, d: 13,
    q: 'A 5-day-old infant has two episodes of green emesis. He is feeding otherwise and has a soft, nondistended abdomen with a normal examination. Which of the following is the most appropriate next step?',
    o: [
      'Observation and reassessment in 12 hours',
      'Upper gastrointestinal contrast series',
      'Abdominal ultrasound',
      'Trial of a hypoallergenic formula'
    ],
    a: 1,
    e: 'Bilious emesis at any age — but especially in a neonate — is malrotation with midgut volvulus until proven otherwise, and a benign abdominal examination provides no reassurance because bowel ischemia precedes peritoneal signs. The upper GI series is the study of choice, demonstrating an abnormally positioned ligament of Treitz or a corkscrew duodenum. Delay of even hours can cost the entire midgut.'
  },
  {
    id: 1303, d: 13,
    q: 'A 14-month-old has intermittent episodes of severe crying with drawing up of the legs, lasting 5 minutes and recurring every 20 minutes, with lethargy between episodes. He has vomited twice and passed one stool with blood and mucus. Which of the following is the most appropriate next step?',
    o: [
      'Abdominal ultrasound followed by air enema if confirmed',
      'Stool culture and oral rehydration',
      'Upper GI series',
      'Abdominal radiograph and observation'
    ],
    a: 0,
    e: 'This is intussusception: paroxysmal colicky pain with lethargy between episodes and currant-jelly stool (a late finding). Ultrasound is the diagnostic test of choice, showing a target/donut sign, and pneumatic (air) enema is both diagnostic and therapeutic in most cases. Lethargy between episodes is a notoriously misleading feature that leads to workups for sepsis or neurologic disease.'
  },
  {
    id: 1304, d: 13,
    q: 'A 6-week-old exclusively breastfed infant has streaks of blood and mucus in his stools. He is thriving, gaining 35 g/day, and appears well with a normal examination. Which of the following is the most appropriate management?',
    o: [
      'Switch to an amino acid–based formula',
      'Maternal elimination of cow\'s milk protein and continued breastfeeding',
      'Abdominal ultrasound and surgical consultation',
      'Begin a proton pump inhibitor'
    ],
    a: 1,
    e: 'A well, thriving breastfed infant with blood-streaked mucousy stools has food protein-induced allergic proctocolitis. Management is maternal elimination of cow\'s milk protein (and sometimes soy) with continued breastfeeding — options that stop breastfeeding are almost always wrong. The condition resolves by about 12 months, and most children tolerate milk protein thereafter.'
  },
  {
    id: 1305, d: 13,
    q: 'A 5-year-old has a 1-year history of large-caliber painful stools every 4–5 days and, for 3 months, daily soiling of his underwear. He withholds and postures. Abdominal examination reveals a palpable suprapubic mass. Which of the following is the most appropriate management?',
    o: [
      'Abdominal radiograph to confirm stool burden, then dietary fiber',
      'Disimpaction followed by several months of maintenance polyethylene glycol plus behavioral toileting',
      'Refer for anorectal manometry and rectal biopsy',
      'Behavioral therapy for encopresis alone'
    ],
    a: 1,
    e: 'This is functional constipation with overflow (retentive) encopresis. The soiling is involuntary leakage around impacted stool, so treatment is disimpaction followed by MONTHS of maintenance polyethylene glycol with scheduled post-meal toilet sitting and demystification for the family. Stopping maintenance too early is the leading cause of relapse. Abdominal radiographs are not recommended to diagnose constipation, and rectal biopsy is reserved for red flags suggesting Hirschsprung disease.'
  },
  {
    id: 1306, d: 13,
    q: 'A 13-year-old girl has 8 months of intermittent abdominal pain, a 5-kg weight loss, and a height velocity that has fallen off her curve. Hemoglobin is 10.1 g/dL, ESR is 42 mm/h, and albumin is 3.0 g/dL. Which of the following is the most likely diagnosis?',
    o: [
      'Functional abdominal pain',
      'Inflammatory bowel disease',
      'Irritable bowel syndrome',
      'Peptic ulcer disease'
    ],
    a: 1,
    e: 'Growth failure with anemia, elevated inflammatory markers, and hypoalbuminemia points to inflammatory bowel disease, particularly Crohn disease, where growth failure may precede GI symptoms by years. Functional abdominal pain and IBS are diagnoses of exclusion characterized by normal growth and normal laboratory studies — any "alarm feature" (weight loss, growth failure, nocturnal symptoms, blood, abnormal labs) excludes them.'
  },
  {
    id: 1307, d: 13,
    q: 'A 2-year-old boy passes a large volume of painless dark red blood per rectum. He is pale with a hemoglobin of 7.8 g/dL but has a soft, nontender abdomen. Which of the following is the most appropriate diagnostic test?',
    o: [
      'Technetium-99m pertechnetate scan',
      'Upper endoscopy',
      'Abdominal ultrasound',
      'Colonoscopy'
    ],
    a: 0,
    e: 'Painless, brisk lower GI bleeding in a child under 2 years is Meckel diverticulum until proven otherwise. The technetium-99m pertechnetate ("Meckel") scan detects ectopic gastric mucosa, which secretes acid and ulcerates the adjacent ileum. The rule of 2s: 2% of the population, 2 feet from the ileocecal valve, 2 inches long, presenting before age 2, with 2 types of ectopic tissue.'
  },

  /* ---------------- Domain 14 — Neurology (4%) ---------------- */
  {
    id: 1401, d: 14,
    q: 'An 18-month-old previously healthy child has a 3-minute generalized tonic-clonic seizure during a febrile illness with a temperature of 39.4 °C. He is now alert with a normal neurologic examination and no meningeal signs. He is fully immunized. Which of the following is the most appropriate next step?',
    o: [
      'Lumbar puncture',
      'Electroencephalography',
      'Brain MRI',
      'Identify and treat the source of fever; provide parental education and reassurance'
    ],
    a: 3,
    e: 'This is a simple febrile seizure: age 6 months to 5 years, generalized, under 15 minutes, one in 24 hours, in a neurologically normal child. No EEG, no neuroimaging, no routine laboratory studies, and no lumbar puncture are indicated with a normal examination in a fully immunized child. Evaluate for the source of fever as you would in any febrile child. Also counsel that antipyretics do NOT prevent recurrence.'
  },
  {
    id: 1402, d: 14,
    q: 'A 7-year-old girl has episodes of staring lasting 8 seconds, occurring 20 or more times daily, with immediate return to baseline and no postictal confusion. Hyperventilation in the office reproduces an episode. Which of the following EEG findings and treatments are most likely appropriate?',
    o: [
      'Hypsarrhythmia; ACTH',
      '3-Hz generalized spike-and-wave; ethosuximide',
      'Centrotemporal spikes; no treatment',
      'Focal temporal discharges; oxcarbazepine'
    ],
    a: 1,
    e: 'Childhood absence epilepsy shows generalized 3-Hz spike-and-wave discharges, is reliably provoked by hyperventilation, and features frequent brief staring spells with no postictal state. Ethosuximide is first-line — it was superior to lamotrigine and equal to valproate in efficacy but with fewer attentional side effects than valproate in the head-to-head trial.'
  },
  {
    id: 1403, d: 14,
    q: 'A 5-month-old infant has clusters of sudden flexion of the neck, trunk, and arms occurring on awakening, 10–20 in a row, for 3 weeks. His parents report he has stopped smiling and babbling. Which of the following is the most appropriate next step?',
    o: [
      'Reassurance; these are benign myoclonus of infancy',
      'Urgent EEG and evaluation for infantile epileptic spasms',
      'Trial of anti-reflux therapy',
      'Abdominal ultrasound for colic'
    ],
    a: 1,
    e: 'Clustered flexor spasms on awakening with developmental regression are infantile epileptic spasms (West syndrome). The EEG shows hypsarrhythmia. This is a neurologic emergency — delay in treatment worsens developmental outcome. Treat with ACTH or high-dose prednisolone, or vigabatrin if tuberous sclerosis is the cause (so examine the skin with a Wood lamp for ash-leaf macules). Spasms are frequently misattributed to colic or reflux, which is precisely the tested error.'
  },
  {
    id: 1404, d: 14,
    q: 'A 4-year-old boy has 8 café-au-lait macules greater than 5 mm in diameter and freckling in both axillae. His neurologic examination is normal. Which of the following screening evaluations is most important?',
    o: [
      'Annual ophthalmologic examination for optic pathway glioma',
      'Annual echocardiography',
      'Annual renal ultrasonography',
      'Annual thyroid function testing'
    ],
    a: 0,
    e: 'Six or more café-au-lait macules (>5 mm prepubertal) plus axillary freckling meets diagnostic criteria for neurofibromatosis type 1. Annual ophthalmologic examination is essential for optic pathway gliomas, which peak in early childhood and can cause vision loss before symptoms appear. Also monitor blood pressure annually (renal artery stenosis, pheochromocytoma), screen for scoliosis, and assess development and learning.'
  },
  {
    id: 1405, d: 14,
    q: 'A 4-year-old boy has difficulty climbing stairs and rises from the floor by pushing on his thighs. He has enlarged calves. Serum creatine kinase is 12,000 U/L. Which of the following is the most likely diagnosis?',
    o: [
      'Spinal muscular atrophy',
      'Duchenne muscular dystrophy',
      'Juvenile dermatomyositis',
      'Guillain-Barré syndrome'
    ],
    a: 1,
    e: 'The Gowers sign (using the hands to "climb up" the legs), calf pseudohypertrophy, proximal weakness in a boy aged 2–5, and a creatine kinase in the thousands are classic for Duchenne muscular dystrophy. Confirm with genetic testing for dystrophin gene deletions/duplications. Glucocorticoids prolong ambulation, and cardiac and pulmonary surveillance are mandatory. Dermatomyositis would have a heliotrope rash and Gottron papules with a much lower CK.'
  },
  {
    id: 1406, d: 14,
    q: 'A 5-month-old has 1 week of worsening constipation followed by poor feeding, a weak cry, ptosis, and decreased movement. Pupils are dilated and sluggishly reactive. Deep tendon reflexes are diminished. Which of the following is the most appropriate treatment?',
    o: [
      'Intravenous immunoglobulin (standard)',
      'Human-derived botulism immune globulin (BabyBIG)',
      'Penicillin G and gentamicin',
      'Plasmapheresis'
    ],
    a: 1,
    e: 'Constipation preceding a descending, symmetric flaccid paralysis with cranial nerve involvement (ptosis, weak cry, poor suck) and dilated poorly reactive pupils in an infant under 12 months is infant botulism. Treat with human-derived botulism immune globulin (BabyBIG), which shortens hospitalization. Aminoglycosides potentiate the neuromuscular blockade and should be avoided. Guillain-Barré is ASCENDING and spares pupils.'
  },

  /* ---------------- Domain 15 — Dermatology (4%) ---------------- */
  {
    id: 1501, d: 15,
    q: 'A 2-day-old term newborn has scattered erythematous macules with central 1–2 mm yellow papules over the trunk and extremities, sparing the palms and soles. He is well and feeding normally. Which of the following is the most appropriate management?',
    o: [
      'Reassurance; this is erythema toxicum neonatorum',
      'Topical mupirocin',
      'Bacterial culture and empiric antibiotics',
      'Antifungal cream'
    ],
    a: 0,
    e: 'Erythema toxicum neonatorum appears on days 1–3 as blotchy erythematous macules with a central papule or pustule, spares palms and soles, and resolves within a week. A Wright stain of the pustule content shows eosinophils. No treatment is needed. Transient neonatal pustular melanosis, the main alternative, is present AT BIRTH, shows neutrophils, and leaves hyperpigmented macules with a collarette of scale.'
  },
  {
    id: 1502, d: 15,
    q: 'A 6-year-old girl with atopic dermatitis develops the abrupt onset of fever and painful, monomorphic punched-out erosions and vesicles clustered over her eczematous areas. Which of the following is the most appropriate management?',
    o: [
      'Increase the potency of her topical corticosteroid',
      'Systemic acyclovir',
      'Oral cephalexin alone',
      'Topical mupirocin and observation'
    ],
    a: 1,
    e: 'This is eczema herpeticum — disseminated HSV infection of eczematous skin — recognized by abrupt onset, fever, pain, and monomorphic punched-out erosions. It requires prompt systemic acyclovir; ocular involvement warrants urgent ophthalmology evaluation. Bacterial superinfection often coexists and may need coverage, but increasing topical steroid potency without treating the virus can worsen dissemination.'
  },
  {
    id: 1503, d: 15,
    q: 'A 5-year-old boy has a 4-cm scaly patch of alopecia on the occipital scalp with broken hairs and tender posterior cervical lymphadenopathy. Which of the following is the most appropriate treatment?',
    o: [
      'Topical ketoconazole shampoo alone',
      'Oral griseofulvin or terbinafine',
      'Topical clobetasol',
      'Oral cephalexin'
    ],
    a: 1,
    e: 'Tinea capitis requires ORAL antifungal therapy — griseofulvin or terbinafine — because topical agents cannot penetrate the hair follicle. Antifungal shampoo is useful only as an adjunct to reduce spore shedding and transmission. Occipital lymphadenopathy with a scaly alopecic patch is the classic combination; the absence of scale would suggest alopecia areata instead.'
  },
  {
    id: 1504, d: 15,
    q: 'A 3-month-old infant has a 3-cm raised bright red vascular lesion on the left upper eyelid that has grown over the past 6 weeks and now partially obstructs the visual axis. Which of the following is the most appropriate management?',
    o: [
      'Observation; infantile hemangiomas involute spontaneously',
      'Oral propranolol',
      'Surgical excision',
      'Topical corticosteroid'
    ],
    a: 1,
    e: 'Although most infantile hemangiomas involute without treatment, periocular lesions that obstruct the visual axis cause deprivation amblyopia during the critical period of visual development. Oral propranolol is first-line and works best when started during the proliferative phase (before about 5 months). Other treatment indications include ulceration, airway involvement (beard distribution), and significant disfigurement.'
  },
  {
    id: 1505, d: 15,
    q: 'A 7-year-old boy has an intensely pruritic rash worse at night, with small papules and linear burrows in the finger web spaces and wrists. Two siblings have similar symptoms. Which of the following is the most appropriate management?',
    o: [
      'Permethrin 5% for the patient only',
      'Permethrin 5% for the patient and all household members simultaneously, plus laundering of bedding and clothing',
      'Oral antihistamine and topical corticosteroid alone',
      'Oral ivermectin for the patient only'
    ],
    a: 1,
    e: 'Scabies requires simultaneous treatment of the patient AND all household and close contacts, whether or not they are symptomatic, because untreated contacts reinfest the household. Bedding and clothing from the prior 3 days should be laundered in hot water or bagged for 72 hours. Counsel that post-scabetic pruritus persists 2–4 weeks after successful treatment — re-treating for itch alone is a common error.'
  },
  {
    id: 1506, d: 15,
    q: 'A 6-year-old boy has palpable purpura on the buttocks and lower extremities, arthralgia of the ankles, and colicky abdominal pain. He is afebrile and well-appearing. Platelet count is 380,000/µL and coagulation studies are normal. Which of the following is the most appropriate ongoing management?',
    o: [
      'Serial urinalysis and blood pressure monitoring for 6 months',
      'Platelet transfusion',
      'Immediate renal biopsy',
      'Broad-spectrum intravenous antibiotics'
    ],
    a: 0,
    e: 'This is Henoch-Schönlein purpura (IgA vasculitis). The NORMAL platelet count distinguishes it from ITP and meningococcemia. Management is supportive, with steroids for severe abdominal pain. The essential follow-up is serial urinalysis and blood pressure monitoring for about 6 months, because nephritis may appear weeks after the rash resolves and determines long-term prognosis. Also watch for ileoileal intussusception.'
  },

  /* ---------------- Domain 16 — Heme-Onc (3%) ---------------- */
  {
    id: 1601, d: 16,
    q: 'A 4-year-old boy with sickle cell disease (HbSS) presents with a temperature of 39.2 °C. He appears well with a normal examination. Which of the following is the most appropriate immediate management?',
    o: [
      'Obtain a blood culture and administer parenteral ceftriaxone',
      'Reassure and follow up in 24 hours since he appears well',
      'Obtain a CBC and reticulocyte count and await results before treating',
      'Prescribe oral amoxicillin'
    ],
    a: 0,
    e: 'Functional asplenia makes children with sickle cell disease vulnerable to fulminant sepsis from encapsulated organisms, particularly S. pneumoniae. Any temperature ≥38.5 °C requires immediate blood culture followed without delay by parenteral ceftriaxone — well appearance is not reassuring, and awaiting laboratory results before treating costs critical time. Also evaluate for acute chest syndrome, sequestration, and aplastic crisis.'
  },
  {
    id: 1602, d: 16,
    q: 'A 3-year-old girl has a 1-week history of petechiae and easy bruising following a viral illness. She is well-appearing with no hepatosplenomegaly or lymphadenopathy. Platelet count is 14,000/µL; hemoglobin, white blood cell count, and differential are normal. She has no active bleeding. Which of the following is the most appropriate management?',
    o: [
      'Bone marrow aspiration before any treatment',
      'Observation with activity restriction and close follow-up',
      'Platelet transfusion',
      'Splenectomy'
    ],
    a: 1,
    e: 'This is typical immune thrombocytopenia: an isolated thrombocytopenia in a well child after a viral illness, with a normal hemoglobin, white count, and no organomegaly. Observation is appropriate for minimal or no bleeding regardless of the platelet count. Bone marrow examination is not required in a typical presentation. Any additional cytopenia, blasts, bone pain, organomegaly, or adenopathy would instead point toward leukemia.'
  },
  {
    id: 1603, d: 16,
    q: 'A 2-year-old boy has an abdominal mass. On examination it is firm, irregular, and crosses the midline. He has periorbital ecchymoses and appears ill. Urine catecholamine metabolites (VMA and HVA) are elevated. Which of the following is the most likely diagnosis?',
    o: ['Wilms tumor', 'Neuroblastoma', 'Hepatoblastoma', 'Rhabdomyosarcoma'],
    a: 1,
    e: 'Neuroblastoma crosses the midline, is irregular and often calcified, occurs in a systemically ill child, and produces elevated urinary VMA and HVA. Periorbital ecchymoses ("raccoon eyes") from orbital metastases and opsoclonus-myoclonus are characteristic paraneoplastic findings. Wilms tumor, by contrast, is smooth, does NOT cross the midline, and occurs in a well-appearing child, often with hematuria and hypertension.'
  },
  {
    id: 1604, d: 16,
    q: 'A 6-year-old with sickle cell disease presents with pallor and fatigue. Hemoglobin is 4.2 g/dL (baseline 8.5) and the reticulocyte count is 0.2%. The spleen is not enlarged. Which of the following is the most likely precipitant?',
    o: ['Parvovirus B19 infection', 'Splenic sequestration', 'Acute chest syndrome', 'Hyperhemolysis from an ongoing vaso-occlusive crisis'],
    a: 0,
    e: 'A LOW reticulocyte count with severe anemia indicates a failure of red cell production — an aplastic crisis, which in sickle cell disease is almost always caused by parvovirus B19 infecting erythroid progenitors. Splenic sequestration produces an enlarging spleen with an ELEVATED reticulocyte count. The reticulocyte count is the single discriminating value in this classic question.'
  },
  {
    id: 1605, d: 16,
    q: 'A 5-year-old newly diagnosed with acute lymphoblastic leukemia develops, 24 hours after starting chemotherapy, a potassium of 6.4 mEq/L, phosphorus of 8.1 mg/dL, calcium of 6.8 mg/dL, and uric acid of 12 mg/dL, with a rising creatinine. Which of the following is the most appropriate management?',
    o: [
      'Aggressive intravenous hydration and rasburicase',
      'Intravenous calcium gluconate for the hypocalcemia',
      'Fluid restriction to protect the kidneys',
      'Oral phosphate binders alone'
    ],
    a: 0,
    e: 'This is tumor lysis syndrome. Management is aggressive hydration to maintain urine output plus rasburicase (or allopurinol) to lower uric acid, with dialysis for refractory cases. Calcium should NOT be given for asymptomatic hypocalcemia — with a high phosphate, administered calcium precipitates as calcium phosphate in the kidneys and worsens renal injury. Treat calcium only for symptomatic hypocalcemia such as tetany or arrhythmia.'
  },

  /* ---------------- Domain 17 — Allergy / Immunology (3%) ---------------- */
  {
    id: 1701, d: 17,
    q: 'A 9-month-old boy has had three episodes of pneumonia, chronic oral thrush, and persistent diarrhea with failure to thrive. Chest radiograph shows an absent thymic shadow. Absolute lymphocyte count is 900/µL. Which of the following is most important in his immediate management?',
    o: [
      'Administer live vaccines to establish immunity before immunosuppression',
      'Avoid live vaccines and use only irradiated, CMV-negative blood products',
      'Begin monthly immunoglobulin replacement and continue routine vaccines',
      'Start prophylactic antibiotics and continue routine care'
    ],
    a: 1,
    e: 'This presentation — early onset, thrush, chronic diarrhea, failure to thrive, absent thymic shadow, and lymphopenia — is severe combined immunodeficiency. Live vaccines (rotavirus, MMR, varicella, BCG) can cause fatal disseminated infection, and non-irradiated blood products cause transfusion-associated graft-versus-host disease. SCID is detected on newborn screening by low TRECs, and hematopoietic stem cell transplantation is curative, with best outcomes before 3.5 months of age.'
  },
  {
    id: 1702, d: 17,
    q: 'A 5-year-old boy has recurrent skin abscesses and a liver abscess, plus a history of pneumonia caused by Serratia marcescens and Aspergillus. Which of the following diagnostic tests is most appropriate?',
    o: [
      'Quantitative immunoglobulins',
      'Dihydrorhodamine flow cytometry assay',
      'CH50 total hemolytic complement',
      'Lymphocyte subset enumeration'
    ],
    a: 1,
    e: 'Recurrent abscesses caused by CATALASE-POSITIVE organisms — S. aureus, Serratia, Burkholderia cepacia, Nocardia, and Aspergillus — define chronic granulomatous disease, a defect of the NADPH oxidase respiratory burst. The dihydrorhodamine flow cytometry assay is the diagnostic test of choice. Management includes TMP-SMX and itraconazole prophylaxis and interferon-gamma.'
  },
  {
    id: 1703, d: 17,
    q: 'A 15-year-old girl has recurrent episodes of non-pruritic swelling of the lips and hands lasting 2–3 days, sometimes with severe abdominal pain. There is no urticaria. Epinephrine, antihistamines, and corticosteroids have not helped. Her father has similar episodes. Which of the following is the best initial screening test?',
    o: ['Serum tryptase', 'C4 level', 'Total IgE', 'CH50'],
    a: 1,
    e: 'Recurrent non-pruritic angioedema WITHOUT urticaria, unresponsive to epinephrine, antihistamines, and steroids, with a positive family history, indicates hereditary angioedema. C4 is the best screening test — it is low both during and between attacks. Confirm with C1 inhibitor level and function. Treatment uses C1 inhibitor concentrate, icatibant, or ecallantide; ACE inhibitors must be avoided.'
  },
  {
    id: 1704, d: 17,
    q: 'A 4-month-old infant has severe eczema. His mother asks for "allergy testing for everything" so she can remove trigger foods. He has never had an immediate reaction to any food. Which of the following is the most appropriate response?',
    o: [
      'Order a broad food-specific IgE panel',
      'Explain that broad panels have poor positive predictive value and recommend optimizing skin care, with targeted testing only for a suspected reaction',
      'Recommend maternal elimination of the top 8 allergens',
      'Refer for immediate oral food challenges to all major allergens'
    ],
    a: 1,
    e: 'Broad food allergy panels in the absence of a clinical reaction history generate false positives, leading to unnecessary elimination diets, nutritional deficiency, and — importantly — an INCREASED risk of developing true allergy through avoidance. The evidence-based approach is aggressive eczema management (emollients and appropriate topical steroids), with targeted testing only when there is a convincing history of an immediate reaction.'
  },
  {
    id: 1705, d: 17,
    q: 'A 10-month-old develops profuse repetitive vomiting, pallor, and lethargy 2 hours after his first serving of rice cereal. He has no rash, no wheeze, and no hypotension initially. Skin prick testing to rice is negative. Which of the following is the most likely diagnosis?',
    o: [
      'IgE-mediated rice allergy',
      'Food protein-induced enterocolitis syndrome (FPIES)',
      'Viral gastroenteritis',
      'Pyloric stenosis'
    ],
    a: 1,
    e: 'FPIES presents with profuse repetitive vomiting 1–4 hours after ingestion of a trigger (rice, oats, cow\'s milk, soy are classic), with pallor and lethargy and sometimes hypovolemic shock, and NO cutaneous or respiratory findings. It is non-IgE mediated, so skin prick and specific IgE testing are negative — a fact that leads to frequent misdiagnosis as sepsis or gastroenteritis. Treatment is fluid resuscitation and ondansetron, plus avoidance.'
  },

  /* ---------------- Domain 18 — Endocrinology (3%) ---------------- */
  {
    id: 1801, d: 18,
    q: 'An 8-year-old boy is at the 3rd percentile for height and the 50th percentile for weight. His height velocity over the past 2 years has been 3 cm/year. Bone age is 6 years. Which of the following is the most likely diagnosis?',
    o: [
      'Familial short stature',
      'Constitutional delay of growth and puberty',
      'Growth hormone deficiency',
      'Normal variant requiring no evaluation'
    ],
    a: 2,
    e: 'A DECREASED growth velocity (normal is 5–6 cm/year at this age) combined with a delayed bone age and a child who is heavy for his height points to an endocrine cause — growth hormone deficiency or hypothyroidism. In familial short stature the bone age equals chronologic age and the velocity is normal. In constitutional delay the bone age is delayed but the velocity is NORMAL. Growth velocity is the single most discriminating variable in short stature questions.'
  },
  {
    id: 1802, d: 18,
    q: 'A 6-year-old boy has pubic hair, an enlarged phallus, testicular volumes of 8 mL bilaterally, and a growth spurt. Bone age is 9 years. LH rises with GnRH stimulation. Which of the following is the most appropriate next step?',
    o: [
      'Reassurance; this is benign premature adrenarche',
      'Brain MRI',
      'Adrenal ultrasound only',
      'Observation with repeat examination in 6 months'
    ],
    a: 1,
    e: 'Testicular enlargement with a pubertal LH response indicates CENTRAL precocious puberty. In boys, central precocious puberty is pathologic far more often than in girls, so a brain MRI is mandatory to look for a hypothalamic hamartoma, glioma, or germinoma. Premature adrenarche would show pubic hair WITHOUT testicular enlargement or growth acceleration. Treatment of confirmed central precocity is a GnRH agonist.'
  },
  {
    id: 1803, d: 18,
    q: 'A 12-day-old male infant presents with vomiting, poor feeding, and lethargy. He is dehydrated with a blood pressure of 58/30 mm Hg. Sodium is 122 mEq/L, potassium is 7.2 mEq/L, and glucose is 44 mg/dL. Which of the following is the most likely diagnosis?',
    o: [
      'Pyloric stenosis',
      'Congenital adrenal hyperplasia with salt wasting',
      'Urinary tract infection with sepsis',
      'Inborn error of metabolism (urea cycle defect)'
    ],
    a: 1,
    e: 'Hyponatremia WITH hyperkalemia plus hypoglycemia and shock in a 1–3 week old is a salt-wasting adrenal crisis from 21-hydroxylase deficiency. Males have normal genitalia at birth and so are not detected on examination — they present in crisis, which is why newborn screening measures 17-hydroxyprogesterone. Treat immediately with normal saline, dextrose, and stress-dose hydrocortisone; do not delay for confirmatory testing. Pyloric stenosis produces hypokalemic alkalosis instead.'
  },
  {
    id: 1804, d: 18,
    q: 'A newborn screening result returns showing an elevated TSH and low T4 in a 5-day-old infant who appears entirely well. Which of the following is the most appropriate next step?',
    o: [
      'Repeat the newborn screen in 2 weeks and treat if still abnormal',
      'Obtain confirmatory serum studies and start levothyroxine immediately',
      'Obtain a thyroid ultrasound before treating',
      'Observe; most infants normalize by 1 month'
    ],
    a: 1,
    e: 'Congenital hypothyroidism causes irreversible intellectual disability if treatment is delayed, and affected infants appear normal at birth because maternal T4 crosses the placenta. Draw confirmatory serum TSH and free T4 and START LEVOTHYROXINE IMMEDIATELY — do not wait for confirmation, imaging, or a repeat screen. Imaging (scintigraphy or ultrasound) can be obtained to determine etiology but must never delay therapy.'
  },
  {
    id: 1805, d: 18,
    q: 'A 15-year-old girl reports a 6-kg weight loss despite increased appetite, heat intolerance, palpitations, and declining school performance. She has a diffusely enlarged, non-tender thyroid with a bruit and mild proptosis. Which of the following is the most appropriate initial pharmacologic therapy?',
    o: ['Propylthiouracil', 'Methimazole', 'Levothyroxine', 'Radioactive iodine as first-line'],
    a: 1,
    e: 'This is Graves disease. Methimazole is the antithyroid drug of choice in children. Propylthiouracil is avoided because of the risk of fulminant hepatic failure — its only pediatric-adjacent indication is the first trimester of pregnancy. A beta blocker may be added for symptomatic relief. Radioactive iodine and surgery are second-line after failure of or intolerance to medical therapy.'
  },

  /* ---------------- Domain 19 — Nephrology / Fluids (3%) ---------------- */
  {
    id: 1901, d: 19,
    q: 'A 5-year-old boy presents with periorbital edema, and urinalysis shows 4+ protein with no blood. Serum albumin is 1.8 g/dL, cholesterol is 340 mg/dL, complement levels are normal, blood pressure is normal, and creatinine is normal. Which of the following is the most appropriate management?',
    o: [
      'Renal biopsy before initiating therapy',
      'Empiric corticosteroid therapy',
      'Intravenous furosemide alone',
      'Angiotensin-converting enzyme inhibitor alone'
    ],
    a: 1,
    e: 'In a child aged 1–10 with nephrotic syndrome, normal complement, normal blood pressure, normal renal function, and no hematuria, minimal change disease is overwhelmingly likely and empiric corticosteroids are given without a biopsy. Biopsy is reserved for age <1 or >10 years, hematuria, hypertension, low complement, renal insufficiency, or steroid resistance. Watch for spontaneous bacterial peritonitis (pneumococcal) and thrombosis.'
  },
  {
    id: 1902, d: 19,
    q: 'An 8-year-old girl develops cola-colored urine, periorbital edema, and a blood pressure of 132/86 mm Hg. She had impetigo 4 weeks ago. Urinalysis shows red blood cell casts and 2+ protein. C3 is low and C4 is normal. Which of the following is the most likely diagnosis?',
    o: [
      'IgA nephropathy',
      'Post-streptococcal glomerulonephritis',
      'Membranoproliferative glomerulonephritis',
      'Lupus nephritis'
    ],
    a: 1,
    e: 'Nephritic syndrome 3–6 weeks after impetigo (or 1–2 weeks after pharyngitis) with a LOW C3 and normal C4 is post-streptococcal glomerulonephritis. The key follow-up point: C3 should normalize within 6–8 weeks — persistent hypocomplementemia beyond that suggests membranoproliferative GN or lupus and requires biopsy. IgA nephropathy has NORMAL complement and hematuria occurring concurrently with an upper respiratory infection, not weeks later.'
  },
  {
    id: 1903, d: 19,
    q: 'A 4-year-old develops bloody diarrhea after eating at a barbecue. Five days later he has pallor, decreased urine output, and petechiae. Hemoglobin is 7.2 g/dL with schistocytes, platelets are 42,000/µL, and creatinine is 2.4 mg/dL. Direct Coombs is negative. Which of the following is most appropriate?',
    o: [
      'Begin ciprofloxacin to eradicate the organism',
      'Supportive care with careful fluid and electrolyte management',
      'Begin loperamide to reduce stool losses',
      'Plasma exchange as first-line therapy'
    ],
    a: 1,
    e: 'This is hemolytic uremic syndrome from Shiga toxin-producing E. coli O157:H7 — microangiopathic hemolytic anemia (schistocytes, negative Coombs), thrombocytopenia, and acute kidney injury. Management is supportive. Antibiotics and antimotility agents INCREASE the risk of HUS by promoting toxin release and retention, and should be avoided in suspected Shiga toxin-associated bloody diarrhea. Most children recover renal function.'
  },
  {
    id: 1904, d: 19,
    q: 'A 6-year-old is admitted with pneumonia and needs maintenance intravenous fluids. Which of the following is the most appropriate maintenance fluid?',
    o: [
      '0.45% sodium chloride with 5% dextrose',
      '0.9% sodium chloride with 5% dextrose and potassium chloride as indicated',
      '0.2% sodium chloride with 5% dextrose',
      '5% dextrose in water'
    ],
    a: 1,
    e: 'The 2018 AAP clinical practice guideline recommends ISOTONIC maintenance fluid (0.9% saline or lactated Ringer) with appropriate potassium and dextrose for children aged 28 days to 18 years. Hypotonic fluids caused a substantial burden of hospital-acquired hyponatremia, including deaths from cerebral edema, particularly in children with non-osmotic ADH release from illness, pain, or nausea. Hypotonic maintenance fluid is now a wrong answer.'
  },
  {
    id: 1905, d: 19,
    q: 'A 15-year-old boy has 1+ protein on a routine urinalysis. He is asymptomatic with a normal blood pressure and examination. A first-morning urine protein-to-creatinine ratio is 0.1 mg/mg (normal), while an afternoon sample is 0.6 mg/mg. Which of the following is the most likely diagnosis?',
    o: [
      'Orthostatic (postural) proteinuria',
      'Focal segmental glomerulosclerosis',
      'IgA nephropathy',
      'Minimal change disease'
    ],
    a: 0,
    e: 'Orthostatic proteinuria is the most common cause of persistent proteinuria in adolescents. Protein excretion is normal in a first-morning (recumbent) specimen and elevated during upright activity. It is entirely benign, requires no treatment or referral, and needs only periodic monitoring. Demonstrating a normal first-morning ratio is the diagnostic step that prevents an unnecessary nephrology workup.'
  },

  /* ---------------- Domain 20 — Genitourinary (3%) ---------------- */
  {
    id: 2001, d: 20,
    q: 'A 14-year-old boy awakens with sudden severe left scrotal pain and vomiting. The left testis is high-riding with a transverse lie, and the cremasteric reflex is absent on the left. Symptoms began 3 hours ago. Which of the following is the most appropriate next step?',
    o: [
      'Scrotal Doppler ultrasonography before any intervention',
      'Immediate urologic consultation for surgical exploration',
      'Urinalysis and empiric antibiotics for epididymitis',
      'Ice, elevation, and reassessment in 4 hours'
    ],
    a: 1,
    e: 'The presentation is classic testicular torsion, and the salvage rate falls sharply after about 6 hours. When the history and examination are classic, go directly to the operating room — obtaining an ultrasound consumes the salvage window and a normal-appearing study can be falsely reassuring. Imaging is appropriate only when the diagnosis is genuinely uncertain and would not delay surgery.'
  },
  {
    id: 2002, d: 20,
    q: 'A 10-month-old girl has her first febrile urinary tract infection, treated successfully. Renal and bladder ultrasound is normal. Which of the following is the most appropriate next step?',
    o: [
      'Voiding cystourethrogram now',
      'No further imaging; monitor for recurrent febrile UTI',
      'DMSA renal scan',
      'Antibiotic prophylaxis regardless of imaging'
    ],
    a: 1,
    e: 'After a first febrile UTI in a child aged 2–24 months, the AAP recommends renal and bladder ultrasound only. VCUG is NOT routine — it is reserved for an abnormal ultrasound (hydronephrosis, scarring, findings suggesting high-grade reflux or obstruction) or a SECOND febrile UTI. Routine VCUG after a first infection exposes children to radiation and catheterization without improving outcomes.'
  },
  {
    id: 2003, d: 20,
    q: 'A 9-month-old boy has a nonpalpable right testis; the left is descended normally. Which of the following is the most appropriate management?',
    o: [
      'Ultrasound to locate the testis, then referral',
      'Referral to pediatric urology for evaluation and orchiopexy',
      'Observation until age 2, since spontaneous descent is common',
      'Human chorionic gonadotropin therapy'
    ],
    a: 1,
    e: 'Spontaneous descent is unlikely after 6 months of corrected age, and orchiopexy is recommended between 6 and 18 months to optimize fertility and permit examination for malignancy. Imaging should NOT be ordered to locate a nonpalpable testis — it has poor sensitivity and does not change management, since the surgeon will perform diagnostic laparoscopy regardless. Hormonal therapy is not recommended. Note: BILATERAL nonpalpable testes in a newborn requires urgent evaluation for CAH and a disorder of sex development.'
  },
  {
    id: 2004, d: 20,
    q: 'A 16-year-old girl has had heavy menstrual bleeding since menarche at age 12, soaking a pad every hour on her heaviest days, with frequent epistaxis. Hemoglobin is 9.4 g/dL. Which of the following evaluations is most important?',
    o: [
      'Pelvic ultrasound for structural abnormalities',
      'Evaluation for a bleeding disorder, including von Willebrand testing',
      'Thyroid function testing alone',
      'Endometrial biopsy'
    ],
    a: 1,
    e: 'Heavy menstrual bleeding present FROM MENARCHE, especially with other mucocutaneous bleeding such as epistaxis, strongly suggests an inherited bleeding disorder — most commonly von Willebrand disease, the most prevalent inherited bleeding disorder. Up to 20% of adolescents with heavy menstrual bleeding have one. Anovulatory bleeding is common in the first 2 years after menarche, but the bleeding-disorder workup should not be skipped when this pattern is present.'
  },
  {
    id: 2005, d: 20,
    q: 'A 4-year-old girl has a 3-week history of malodorous, blood-tinged vaginal discharge. She is otherwise well, with normal growth and no signs of puberty. Which of the following is the most likely diagnosis?',
    o: [
      'Nonspecific vulvovaginitis',
      'Vaginal foreign body',
      'Precocious puberty',
      'Candidal vaginitis'
    ],
    a: 1,
    e: 'A persistent, malodorous, blood-tinged discharge in a prepubertal girl suggests a vaginal foreign body — most often small pieces of toilet paper. Nonspecific vulvovaginitis produces a scant, non-bloody discharge with irritation. Any prepubertal vaginal discharge or bleeding also warrants consideration of sexual abuse. Candidal vaginitis is uncommon in prepubertal girls outside of diabetes, recent antibiotics, or diapers.'
  },

  /* ---------------- Domain 21 — Genetics / Metabolic (2%) ---------------- */
  {
    id: 2101, d: 21,
    q: 'A previously well 3-day-old term infant becomes lethargic and tachypneic with poor feeding after establishing breastfeeding. Blood gas shows pH 7.51, PCO2 24 mm Hg. Glucose is 76 mg/dL, and there is no anion gap. Ammonia is 620 µmol/L. Which of the following is the most likely diagnosis?',
    o: [
      'Organic acidemia',
      'Urea cycle defect',
      'Fatty acid oxidation defect',
      'Galactosemia'
    ],
    a: 1,
    e: 'Marked hyperammonemia with RESPIRATORY ALKALOSIS (ammonia stimulates the respiratory center), a normal glucose, and NO metabolic acidosis is the signature of a urea cycle defect — most commonly ornithine transcarbamylase deficiency, which is X-linked. Organic acidemias produce an anion-gap metabolic ACIDOSIS with ketosis. Treatment is stopping protein, giving high-dose dextrose to halt catabolism, nitrogen scavengers, and hemodialysis for severe hyperammonemia.'
  },
  {
    id: 2102, d: 21,
    q: 'A 3-year-old boy is evaluated for global developmental delay, autism features, and dysmorphic features. Which of the following is the most appropriate first-tier genetic test?',
    o: [
      'Karyotype',
      'Chromosomal microarray, plus fragile X testing',
      'Whole-genome sequencing',
      'Methylation studies for Prader-Willi syndrome'
    ],
    a: 1,
    e: 'Chromosomal microarray is the recommended first-tier test for global developmental delay, intellectual disability, autism spectrum disorder, and multiple congenital anomalies — it detects copy number variants far smaller than a karyotype can resolve, with a diagnostic yield of about 15–20%. Fragile X testing is added because triplet repeat expansions are not detected by microarray. A karyotype is first-line only when a specific aneuploidy such as trisomy 21 or Turner syndrome is suspected.'
  },
  {
    id: 2103, d: 21,
    q: 'A 2-year-old with hypotonia and poor feeding in infancy now has hyperphagia with rapid weight gain, short stature, small hands and feet, and developmental delay. Which of the following is the most likely diagnosis?',
    o: ['Angelman syndrome', 'Prader-Willi syndrome', 'Bardet-Biedl syndrome', 'Down syndrome'],
    a: 1,
    e: 'Prader-Willi syndrome results from loss of the PATERNALLY expressed region of 15q11-13 (deletion, maternal uniparental disomy, or imprinting defect). The biphasic course — neonatal hypotonia and feeding difficulty followed by hyperphagia and obesity in early childhood — is characteristic, along with short stature, small hands and feet, hypogonadism, and intellectual disability. Angelman syndrome, from loss of the MATERNAL copy, features severe intellectual disability, absent speech, ataxia, and inappropriate laughter.'
  },
  {
    id: 2104, d: 21,
    q: 'A 15-year-old boy is 193 cm tall with long thin fingers, a pectus excavatum, joint hypermobility, and an upward lens dislocation. Which of the following is the most important immediate evaluation?',
    o: [
      'Plasma homocysteine level',
      'Echocardiography to assess aortic root diameter',
      'Skeletal survey',
      'Karyotype for Klinefelter syndrome'
    ],
    a: 1,
    e: 'The features indicate Marfan syndrome, where the life-threatening complication is progressive aortic root dilation with dissection or rupture. Echocardiography to measure the aortic root is the essential evaluation, followed by beta-blocker or angiotensin receptor blocker therapy and restriction from contact and isometric sports. Note the lens direction: UPWARD dislocation is Marfan, DOWNWARD dislocation suggests homocystinuria, which also causes thrombosis and intellectual disability.'
  },

  /* ---------------- Domain 22 — Rheumatology (2%) ---------------- */
  {
    id: 2201, d: 22,
    q: 'A 3-year-old girl has had a swollen, stiff right knee for 8 weeks, worse in the morning and improving with activity. She is afebrile and well. ANA is positive. Which of the following is the most important additional evaluation?',
    o: [
      'Slit-lamp ophthalmologic examination',
      'Lyme serology only',
      'Bone marrow aspiration',
      'Muscle biopsy'
    ],
    a: 0,
    e: 'Young, ANA-positive girls with oligoarticular JIA have the highest risk of chronic anterior uveitis, which is ASYMPTOMATIC — the eye is white and painless — and can progress to cataract, glaucoma, and blindness before it is noticed. Slit-lamp screening every 3 months is required. This is one of the most reliably repeated rheumatology questions on the exam.'
  },
  {
    id: 2202, d: 22,
    q: 'A 6-year-old with systemic JIA on treatment develops persistent fever, and laboratory studies now show a falling ESR (from 90 to 20 mm/h), a platelet count falling from 550,000 to 110,000/µL, ferritin of 18,000 ng/mL, and elevated triglycerides. Which of the following is the most likely diagnosis?',
    o: [
      'Response to therapy',
      'Macrophage activation syndrome',
      'Sepsis',
      'Disease flare of systemic JIA'
    ],
    a: 1,
    e: 'Macrophage activation syndrome is a life-threatening complication of systemic JIA. The paradox is that inflammatory markers appear to IMPROVE — the ESR falls (from consumption of fibrinogen) and cell counts drop — while the patient deteriorates, with a markedly elevated ferritin, hypertriglyceridemia, hypofibrinogenemia, and coagulopathy. Interpreting the falling ESR as improvement is the fatal error the question is built around.'
  },
  {
    id: 2203, d: 22,
    q: 'A 5-year-old boy has had episodes of fever to 40 °C occurring every 4 weeks with remarkable regularity for 8 months. Each episode lasts 4 days with aphthous ulcers, pharyngitis, and cervical adenitis. He is completely well between episodes and growing normally. Which of the following supports the diagnosis?',
    o: [
      'Response of an episode to a single dose of prednisone',
      'Elevated IgD level',
      'Positive ANA',
      'Sustained response to daily colchicine'
    ],
    a: 0,
    e: 'PFAPA (Periodic Fever, Aphthous stomatitis, Pharyngitis, Adenitis) is characterized by strikingly clockwork-regular episodes with complete wellness and normal growth between them. A single dose of prednisone aborts an episode within hours — a response so characteristic it is nearly diagnostic. The condition is self-limited over years. Familial Mediterranean fever, by contrast, has irregular attacks with serositis and responds to daily colchicine.'
  },
  {
    id: 2204, d: 22,
    q: 'A 14-year-old girl has a malar rash sparing the nasolabial folds, painless oral ulcers, arthritis of the hands, and fatigue. Laboratory studies show a positive ANA at 1:1280, anti-double-stranded DNA antibodies, low C3 and C4, and proteinuria. Which of the following findings is most specific for her diagnosis?',
    o: [
      'Positive antinuclear antibody',
      'Anti-double-stranded DNA antibodies',
      'Elevated erythrocyte sedimentation rate',
      'Arthritis'
    ],
    a: 1,
    e: 'ANA is highly SENSITIVE for SLE but poorly specific — it is positive in a substantial share of healthy children and in many other conditions, so a positive ANA alone never establishes the diagnosis. Anti-dsDNA and anti-Smith antibodies are the specific markers. Anti-dsDNA titers and complement levels also track disease activity, particularly lupus nephritis, which the proteinuria here suggests.'
  },

  /* ---------------- Domain 23 — Ethics (2%) ---------------- */
  {
    id: 2301, d: 23,
    q: 'A 10-year-old with newly diagnosed leukemia asks directly whether he could die. His parents have asked you not to discuss prognosis with him. Which of the following is the most appropriate response?',
    o: [
      'Tell the child to discuss it with his parents',
      'Explore with the parents their concerns, and support developmentally appropriate, honest communication with the child',
      'Answer the child\'s question fully without involving the parents',
      'Tell the child he will be fine'
    ],
    a: 1,
    e: 'Children who ask direct questions generally already sense the seriousness of their illness, and deception damages trust and increases anxiety and isolation. The correct approach is neither to override the parents unilaterally nor to lie to the child — it is to meet with the parents, explore the fears behind their request (often a wish to protect), and guide the family toward honest, developmentally appropriate disclosure. Deflecting or falsely reassuring the child is not acceptable.'
  },
  {
    id: 2302, d: 23,
    q: 'The parents of a 4-year-old with life-threatening anemia from trauma refuse blood transfusion on religious grounds. The child is hemodynamically unstable and will likely die without transfusion. Which of the following is the most appropriate action?',
    o: [
      'Honor the parents\' refusal as an exercise of parental authority',
      'Transfuse the child now and seek a court order concurrently or afterward',
      'Delay transfusion until a court order is obtained',
      'Transfer the child to another facility'
    ],
    a: 1,
    e: 'Parental authority is broad but not unlimited: it does not extend to refusing clearly life-saving, effective treatment for a child. In an emergency, treat immediately under the emergency exception and pursue judicial authorization concurrently or afterward. Delaying life-saving therapy to obtain a court order is the wrong answer when death is imminent. Continue to engage the family respectfully, and use blood-conserving techniques where feasible.'
  },
  {
    id: 2303, d: 23,
    q: 'You discover that a medication error occurred overnight: a child received a tenfold dose of a medication. She has had no adverse effects and is clinically well. The overnight team did not inform the family. Which of the following is the most appropriate action?',
    o: [
      'Do not disclose, since no harm occurred',
      'Disclose the error to the family promptly, explain what happened and the monitoring plan, and file an incident report',
      'Disclose only if the family asks',
      'Document in the chart but do not inform the family'
    ],
    a: 1,
    e: 'Errors should be disclosed promptly and honestly even when no harm resulted. Disclosure includes what happened, why, what is being done to monitor and mitigate, an apology, and what will be done to prevent recurrence. Non-disclosure erodes trust and, when discovered later, is far more damaging. Filing an incident report supports system-level analysis — the safety response focuses on the system, not on punishing the individual.'
  },
  {
    id: 2304, d: 23,
    q: 'The parents of an infant with a lethal condition ask, "Is there anything more you can do?" after a decision to transition to comfort care. Which of the following responses is most appropriate?',
    o: [
      '"There is nothing more we can do."',
      '"We will continue to care for her — we will keep her comfortable, free of pain, and with you."',
      '"We could try more aggressive treatment if you want us to."',
      '"That is a decision you need to make as a family."'
    ],
    a: 1,
    e: 'Never say "there is nothing more we can do" — it is untrue and abandons the family at the moment of greatest need. Reframe from what will be withheld to what WILL be provided: symptom management, comfort, dignity, presence, and support. Offering aggressive treatment that is medically ineffective misrepresents the situation and shifts an unfair burden onto the parents, and deflecting the question abandons the shared decision-making role.'
  },

  /* ---------------- Domain 24 — Safety / QI / Research (2%) ---------------- */
  {
    id: 2401, d: 24,
    q: 'A screening test for a condition has 95% sensitivity and 90% specificity. It is applied to a population in which the prevalence is 0.1% rather than the 10% population in which it was validated. Which of the following will occur?',
    o: [
      'Sensitivity will decrease',
      'Positive predictive value will decrease substantially',
      'Specificity will decrease',
      'Negative predictive value will decrease'
    ],
    a: 1,
    e: 'Sensitivity and specificity are properties of the test and do not change with prevalence. Predictive values DO change: as prevalence falls, the pool of true positives shrinks while false positives (drawn from the much larger disease-free population) stay proportionally constant, so PPV falls sharply while NPV rises. This is the single most-tested statistical concept in the domain, and it is the reason universal screening for rare conditions generates so many false positives.'
  },
  {
    id: 2402, d: 24,
    q: 'In a trial, the rate of a serious outcome was 4% in the control group and 3% in the treatment group. Which of the following is the number needed to treat?',
    o: ['4', '25', '75', '100'],
    a: 3,
    e: 'Absolute risk reduction = 4% − 3% = 1% = 0.01. NNT = 1 ÷ ARR = 1 ÷ 0.01 = 100. Note that the RELATIVE risk reduction is 25% (1 ÷ 4), which sounds far more impressive and is the classic distractor. Expect the exam to present the relative reduction prominently and ask you to compute or interpret the absolute benefit.'
  },
  {
    id: 2403, d: 24,
    q: 'A hospital wants to reduce central line-associated bloodstream infections. Which of the following interventions is most likely to be durably effective?',
    o: [
      'An email reminding staff to follow sterile technique',
      'An annual educational in-service on line care',
      'A standardized insertion checklist with an empowered observer who can stop the procedure',
      'Posting infection rates on a bulletin board'
    ],
    a: 2,
    e: 'On the hierarchy of intervention effectiveness, education, reminders, and posted data are the WEAKEST interventions because they rely on individual vigilance. Standardization with a forcing function — a checklist plus an observer empowered to halt the procedure for a breach — constrains the system so the correct action is the default. Safety questions almost always reward the system-level answer over the exhort-people-to-try-harder answer.'
  },
  {
    id: 2404, d: 24,
    q: 'A quality improvement team is reducing time to antibiotics in febrile oncology patients. They track "percentage of patients with an order placed within 15 minutes of triage." Which type of measure is this?',
    o: ['Outcome measure', 'Process measure', 'Balancing measure', 'Structural measure'],
    a: 1,
    e: 'This is a process measure — it tracks whether a step in the care pathway is reliably performed. The OUTCOME measure would be time to antibiotic administration or sepsis-related mortality. A BALANCING measure would look for unintended consequences elsewhere, such as increased inappropriate antibiotic use in non-neutropenic patients or ED crowding. Classifying a given measure into these three categories is a recurring question format.'
  },
  {
    id: 2405, d: 24,
    q: 'On a run chart tracking monthly hand hygiene compliance, eight consecutive data points fall above the median after an intervention. Which of the following does this represent?',
    o: [
      'Common cause variation',
      'Special cause variation indicating a real change',
      'Random measurement error',
      'Regression to the mean'
    ],
    a: 1,
    e: 'A shift — six or more consecutive points on one side of the median — is a signal of special cause variation, meaning something has genuinely changed in the system rather than reflecting inherent noise. Other special cause rules include a trend (five or more consecutive increasing or decreasing points), too few or too many runs, and an astronomical data point. Common cause variation is the ordinary fluctuation of a stable process.'
  },
];

if (typeof window !== 'undefined') {
  window.CD_PREP = window.CD_PREP || {};
  window.CD_PREP.QUESTIONS = QUESTIONS;
}
