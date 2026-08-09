/*
 * CloseDose — ABP General Pediatrics Board Prep
 * Content data, part 2: domains 13–24.
 * Loaded after board-prep-data.js and appended to the same DOMAINS array.
 */

/* global window */

const DOMAINS_B = [
  {
    id: 13,
    name: 'Gastroenterology',
    weight: 5,
    tag: 'gi',
    why:
      'Almost entirely about vomiting and abdominal pain sorted by age. The surgical emergencies are the ones that get tested hardest, ' +
      'and they are separated by a small number of discriminating features.',
    pearls: [
      {
        t: 'Vomiting — the age-and-character algorithm',
        items: [
          '<b>Bilious vomiting at any age is malrotation with midgut volvulus until proven otherwise.</b> The test is an <b>upper GI series</b> (abnormal position of the ligament of Treitz, "corkscrew" duodenum), and the treatment is emergent surgery. An abdominal radiograph and ultrasound are not sufficient to exclude it.',
          '<b>Hypertrophic pyloric stenosis:</b> 3–6 weeks old, firstborn male, <b>non-bilious projectile</b> vomiting in a hungry infant. <b>Hypochloremic, hypokalemic metabolic alkalosis</b> with paradoxical aciduria. Ultrasound is diagnostic. <b>Correct the electrolytes before the operating room</b> — this is a medical, not a surgical, emergency in the first hours.',
          '<b>Intussusception:</b> 6 months–3 years, sudden intermittent colicky pain with drawing up of the legs, lethargy between episodes, "currant jelly" stool <i>late</i>, a sausage-shaped mass. Ultrasound shows the <b>target/donut sign</b>; treat with an <b>air (pneumatic) enema</b>, which is both diagnostic and therapeutic. A pathologic lead point (Meckel, polyp, lymphoma, HSP) is more likely outside the typical age range.',
          '<b>Hirschsprung disease:</b> failure to pass meconium in the first 48 hours, abdominal distension, and explosive stool after rectal exam. <b>Suction rectal biopsy showing absent ganglion cells is diagnostic.</b> Beware <b>Hirschsprung-associated enterocolitis</b> — fever, distension, foul diarrhea, and sepsis.',
          '<b>Duodenal atresia:</b> "double bubble," bilious or non-bilious vomiting on day 1, strong association with <b>trisomy 21</b>.',
          '<b>Increased intracranial pressure</b> and <b>inborn errors of metabolism</b> both masquerade as vomiting — look for morning vomiting with headache, or vomiting with lethargy and acidosis after a fasting period.',
        ],
      },
      {
        t: 'Reflux, allergy, and infant feeding problems',
        items: [
          '<b>Physiologic reflux ("happy spitter"):</b> thriving infant, no distress → parental reassurance, upright positioning after feeds, smaller more frequent feeds. <b>No acid suppression, no formula change, no imaging.</b>',
          '<b>GERD (disease)</b> implies complications: poor weight gain, feeding refusal, esophagitis, or respiratory symptoms.',
          '<b>Acid suppression in infants is associated with increased rates of pneumonia, gastroenteritis, and necrotizing enterocolitis</b> — the exam wants you to avoid reflexively prescribing it.',
          '<b>Food protein-induced allergic proctocolitis:</b> a well, thriving, breastfed infant with streaks of blood and mucus in the stool → maternal elimination of cow\'s milk protein; resolves by 12 months.',
          '<b>FPIES:</b> <b>profuse repetitive vomiting 1–4 hours</b> after a trigger food (rice, oats, cow\'s milk, soy), with pallor and lethargy, sometimes shock. <b>Non-IgE mediated, so skin and specific IgE testing are negative.</b> Treat with fluids and ondansetron.',
          '<b>Infant colic:</b> the rule of 3s (>3 h/day, >3 days/week, >3 weeks) in a thriving infant. The intervention is caregiver support and reassurance about the natural resolution by 3–4 months.',
        ],
      },
      {
        t: 'Liver, pancreas, and lower GI bleeding',
        items: [
          '<b>Biliary atresia:</b> a jaundiced infant at 2–8 weeks with <b>conjugated</b> hyperbilirubinemia, acholic (pale) stools, and dark urine. <b>Any infant jaundiced beyond 2 weeks needs a fractionated bilirubin.</b> The Kasai portoenterostomy must be done <b>before 60 days</b> for the best outcome — timing is the answer.',
          '<b>Meckel diverticulum:</b> the rule of 2s; <b>painless</b> brisk rectal bleeding in a child <2 years → <b>technetium-99m pertechnetate ("Meckel") scan</b>.',
          '<b>Anal fissure</b> is the most common cause of scant bright red blood in a well infant or toddler with hard stools.',
          '<b>Acute pancreatitis</b> in children is most often from trauma, medications (valproate, L-asparaginase, steroids), gallstones, or a systemic illness — not alcohol.',
          '<b>Acute liver failure:</b> coagulopathy not corrected by vitamin K, with or without encephalopathy — acetaminophen, viral hepatitis, autoimmune, Wilson disease (look for hemolysis with a <i>low</i> alkaline phosphatase in an adolescent).',
        ],
      },
      {
        t: 'Chronic conditions',
        items: [
          '<b>Celiac disease:</b> screen with <b>tissue transglutaminase IgA plus a total IgA</b> (IgA deficiency is common and causes false negatives). The patient <b>must be eating gluten</b> when tested. Screen children with type 1 diabetes, trisomy 21, Turner syndrome, and selective IgA deficiency. Dermatitis herpetiformis is the skin finding.',
          '<b>Crohn disease:</b> anywhere from mouth to anus, skip lesions, transmural, perianal fistulas/tags, growth failure that may precede GI symptoms, non-caseating granulomas.',
          '<b>Ulcerative colitis:</b> continuous from the rectum, mucosal only, bloody diarrhea and tenesmus, associated with <b>primary sclerosing cholangitis</b>, and colectomy is curative.',
          '<b>Growth failure with a delayed bone age and anemia in an adolescent is IBD until excluded</b> — check ESR/CRP, albumin, and fecal calprotectin.',
          '<b>Functional constipation:</b> the vast majority. Retentive posturing, large-caliber painful stools, and <b>encopresis from overflow around a fecal mass</b>. Treatment is disimpaction followed by <b>maintenance polyethylene glycol for months</b>, plus toilet-sitting after meals. <b>Abdominal radiographs are not recommended</b> to diagnose it.',
          '<b>Red flags against functional constipation:</b> onset in the first month, delayed meconium, ribbon stools, absent anal wink or cremasteric reflex, sacral dimple/tuft, or failure to thrive → evaluate for Hirschsprung, spinal dysraphism, hypothyroidism.',
          '<b>Toddler\'s diarrhea:</b> a thriving 1–3 year old with several loose stools containing undigested food, often drinking excessive juice → reduce juice and increase dietary fat. No workup.',
        ],
      },
    ],
    traps: [
      'Bilious emesis given a benign-sounding frame ("the infant is feeding well otherwise"). It is still a volvulus workup.',
      'Rushing pyloric stenosis to surgery before correcting the alkalosis.',
      'Any option that stops breastfeeding — very rarely correct.',
      'Prolonged jaundice in a breastfed infant assumed to be breast milk jaundice without fractionating the bilirubin, missing biliary atresia.',
      'Ordering an abdominal radiograph to diagnose constipation.',
    ],
  },

  {
    id: 14,
    name: 'Neurology',
    weight: 4,
    tag: 'neuro',
    why:
      'Seizure classification and the neurocutaneous syndromes provide most of the questions, and both are pure pattern recognition.',
    pearls: [
      {
        t: 'Febrile seizures',
        items: [
          '<b>Simple febrile seizure:</b> age <b>6 months–5 years</b>, <b>generalized</b>, <b>&lt;15 minutes</b>, <b>one</b> in 24 hours, and a neurologically normal child.',
          '<b>After a simple febrile seizure with a normal exam, no testing is needed</b> — no EEG, no neuroimaging, no routine labs, and <b>no lumbar puncture</b> unless there are meningeal signs, the child is <12 months and under-immunized for Hib/pneumococcus, or is on antibiotics that could mask meningitis.',
          'Recurrence risk is ~30% overall, higher if the first seizure was before 12 months, there is a family history, a low peak temperature, or a short fever-to-seizure interval.',
          '<b>Risk of later epilepsy after a simple febrile seizure is only slightly above baseline (~1–2%).</b> Antipyretics do <b>not</b> prevent recurrence — say so rather than promising prevention.',
          '<b>Complex febrile seizure:</b> focal, prolonged (>15 min), or recurrent within 24 hours — this warrants more consideration and follow-up.',
        ],
      },
      {
        t: 'Epilepsy syndromes',
        items: [
          '<b>Childhood absence epilepsy:</b> ages 4–10, brief staring spells many times a day <b>provoked by hyperventilation</b>, no postictal state, <b>3-Hz generalized spike-and-wave</b>. First-line is <b>ethosuximide</b> (better cognitive profile than valproate; lamotrigine is less effective).',
          '<b>Infantile epileptic spasms (West syndrome):</b> clusters of brief flexor/extensor spasms on awakening in an infant 3–12 months, <b>hypsarrhythmia</b> on EEG, and developmental regression. <b>ACTH or high-dose prednisolone; vigabatrin is first-line if tuberous sclerosis is the cause.</b> Often mistaken for colic or reflux — the tell is clustering and regression.',
          '<b>Self-limited epilepsy with centrotemporal spikes (benign rolandic):</b> ages 5–10, nocturnal hemifacial twitching with drooling and speech arrest, centrotemporal spikes; often no treatment needed and it remits in adolescence.',
          '<b>Juvenile myoclonic epilepsy:</b> adolescence, early-morning myoclonic jerks (dropping the cereal bowl), generalized tonic-clonic seizures, provoked by sleep deprivation; lifelong treatment usually required.',
          '<b>Breath-holding spells:</b> ages 6 months–5 years, triggered by anger or injury, brief cyanotic or pallid spell with loss of tone. <b>Check a hemoglobin — iron deficiency is associated and iron supplementation reduces spells.</b> Otherwise benign and self-limited.',
        ],
      },
      {
        t: 'Headache and increased intracranial pressure',
        items: [
          '<b>Pediatric migraine</b> is often <b>bilateral</b> and shorter (2–72 h) than in adults, with photophobia/phonophobia inferred from behavior. Treat acutely with ibuprofen and, if needed, a triptan; the strongest preventive evidence in children favors lifestyle measures (sleep, hydration, regular meals) and CBT.',
          '<b>Headache red flags:</b> occipital location, worst on waking or awakening the child from sleep, worsened by lying down/Valsalva, associated vomiting, focal neurologic signs, <b>papilledema</b>, personality change, or a headache that is progressively worsening → neuroimaging (MRI).',
          '<b>Idiopathic intracranial hypertension:</b> headache with papilledema and a <b>sixth-nerve palsy</b>, normal imaging, elevated opening pressure. Associated with obesity, tetracyclines, vitamin A/retinoids, and steroid withdrawal. Acetazolamide plus weight management; urgent if vision is threatened.',
          '<b>VP shunt malfunction:</b> headache, vomiting, irritability, lethargy, upward-gaze palsy ("sunsetting") → shunt series and imaging urgently.',
        ],
      },
      {
        t: 'Neurocutaneous syndromes',
        items: [
          '<b>Neurofibromatosis type 1</b> (autosomal dominant, chromosome 17): ≥2 of — <b>≥6 café-au-lait macules</b> (>5 mm prepubertal, >15 mm postpubertal), <b>axillary or inguinal freckling</b>, ≥2 neurofibromas or 1 plexiform neurofibroma, <b>≥2 Lisch nodules</b>, <b>optic glioma</b>, a distinctive bony lesion (sphenoid dysplasia, tibial pseudarthrosis), or an affected first-degree relative. Follow with annual ophthalmology, blood pressure (pheochromocytoma, renal artery stenosis), scoliosis checks, and developmental screening.',
          '<b>Tuberous sclerosis</b> (chromosome 9/16): <b>hypopigmented "ash-leaf" macules</b> (use a Wood lamp), shagreen patch, facial angiofibromas, periungual fibromas, <b>cortical tubers and subependymal nodules</b>, <b>cardiac rhabdomyomas</b>, and renal angiomyolipomas. Presents with <b>infantile spasms</b> and developmental delay.',
          '<b>Sturge-Weber:</b> a <b>port-wine stain in the V1 (ophthalmic) distribution</b> with a leptomeningeal angioma → seizures, hemiparesis, developmental delay, and <b>glaucoma</b> (requires ophthalmology screening).',
          '<b>Neurofibromatosis type 2</b> (chromosome 22): <b>bilateral vestibular schwannomas</b>, hearing loss in adolescence — few skin findings.',
        ],
      },
      {
        t: 'Neuromuscular and acquired disease',
        items: [
          '<b>Duchenne muscular dystrophy:</b> X-linked, boys 2–5 years, <b>Gowers sign</b>, calf pseudohypertrophy, toe walking, and a <b>markedly elevated creatine kinase</b> (thousands). Confirm with genetic testing. Glucocorticoids prolong ambulation; cardiac and pulmonary surveillance are mandatory.',
          '<b>Spinal muscular atrophy:</b> profound hypotonia with <b>tongue fasciculations</b>, preserved alertness, and absent reflexes; now on many newborn screens with disease-modifying therapy available.',
          '<b>Infant botulism:</b> <b>constipation first</b>, then poor feeding, weak cry, ptosis, and <b>descending</b> symmetric flaccid paralysis with <b>dilated, poorly reactive pupils</b> in an infant <12 months. Honey and soil/construction dust are exposures. Treat with <b>human-derived botulism immune globulin (BabyBIG)</b>; antibiotics (especially aminoglycosides) can worsen it.',
          '<b>Guillain-Barré:</b> <b>ascending</b> symmetric weakness with <b>areflexia</b> after a viral or <i>Campylobacter</i> illness; CSF shows <b>albuminocytologic dissociation</b> (high protein, normal cell count). Monitor <b>negative inspiratory force and vital capacity</b>; treat with IVIG or plasmapheresis. <b>Steroids do not help.</b>',
          '<b>Transverse myelitis</b> gives a sensory <i>level</i> with bowel/bladder involvement — an MRI emergency.',
          '<b>Cerebral palsy:</b> a non-progressive disorder of movement and posture from an early brain insult. <b>If the deficits are progressive or regressing, it is not cerebral palsy</b> — pursue a metabolic or genetic diagnosis. Spastic diplegia is classic after prematurity/periventricular leukomalacia.',
          '<b>Acute cerebellar ataxia:</b> a toddler with sudden truncal ataxia 1–3 weeks after varicella or another viral illness — self-limited, but exclude ingestion, posterior fossa tumor, and <b>opsoclonus-myoclonus (neuroblastoma)</b>.',
        ],
      },
    ],
    traps: [
      'Ordering an EEG, MRI, or LP after a classic simple febrile seizure with a normal exam.',
      'Reading infantile spasms as colic or reflux — clustering plus developmental regression is the giveaway.',
      'Calling progressive weakness "cerebral palsy."',
      'Forgetting that antipyretics do not prevent febrile seizure recurrence — parents ask, and so does the exam.',
    ],
  },

  {
    id: 15,
    name: 'Skin / Dermatology',
    weight: 4,
    tag: 'derm',
    why:
      'Purely visual pattern recognition, which makes it fast to study and easy to lose points on if you skip it. Neonatal rashes and the "benign vs. refer" split dominate.',
    pearls: [
      {
        t: 'Neonatal rashes — nearly all benign',
        items: [
          '<b>Erythema toxicum neonatorum:</b> days 1–3, blotchy erythematous macules with a central papule/pustule sparing palms and soles; smear shows <b>eosinophils</b>. Resolves in a week.',
          '<b>Transient neonatal pustular melanosis:</b> present <i>at birth</i>, pustules that rupture leaving a collarette of scale and <b>hyperpigmented macules</b> lasting months; more common in darker skin; smear shows <b>neutrophils</b>.',
          '<b>Milia</b> (keratin cysts on the nose), <b>miliaria</b> (heat rash from occluded sweat ducts), and <b>neonatal cephalic pustulosis</b> ("baby acne," <i>Malassezia</i>) all resolve without treatment.',
          '<b>Seborrheic dermatitis / cradle cap:</b> greasy yellow scale on the scalp and in the folds; emollients and gentle removal; low-potency topicals if needed.',
          '<b>Congenital dermal melanocytosis:</b> blue-gray patches over the sacrum/buttocks, present at birth — <b>document them</b> so they are not later mistaken for bruising.',
        ],
      },
      {
        t: 'Vascular lesions',
        items: [
          '<b>Infantile hemangioma:</b> usually appears after birth, proliferates for 3–9 months, then involutes over years. <b>Treat with oral propranolol</b> when there is ulceration, functional impairment, or high-risk location.',
          'High-risk hemangioma locations: <b>periocular</b> (amblyopia), <b>"beard" distribution</b> (subglottic airway hemangioma — biphasic stridor), <b>lumbosacral/midline</b> (spinal dysraphism → imaging), <b>nasal tip and ear</b> (cosmetic), and <b>≥5 cutaneous hemangiomas</b> (screen for hepatic hemangiomas).',
          '<b>PHACE syndrome:</b> a large segmental facial hemangioma with posterior fossa malformations, arterial anomalies, cardiac defects/coarctation, eye anomalies, and sternal clefting.',
          '<b>Port-wine stain (capillary malformation):</b> present at birth, does <b>not</b> involute, darkens over time. In the <b>V1</b> distribution → evaluate for Sturge-Weber and glaucoma. Pulsed dye laser.',
        ],
      },
      {
        t: 'Eczema, infections, and infestations',
        items: [
          '<b>Atopic dermatitis by age:</b> infants — cheeks and extensor surfaces, sparing the diaper area; children — <b>flexural</b> (antecubital, popliteal); adolescents — hands, eyelids, flexures. Cornerstone therapy is <b>liberal emollients plus topical corticosteroids of appropriate potency for flares</b>; bleach baths and antihistamines are adjuncts. <b>Food allergy testing is not indicated for routine eczema.</b>',
          '<b>Eczema herpeticum:</b> abrupt worsening with <b>punched-out monomorphic vesicles/erosions</b>, fever, and pain in an atopic child → <b>systemic acyclovir</b>, urgently.',
          '<b>Impetigo:</b> honey-crusted lesions (non-bullous, <i>S. aureus</i> or GAS) — topical mupirocin for limited disease, oral antibiotics if extensive.',
          '<b>Staphylococcal scalded skin syndrome:</b> toxin-mediated, fever with tender erythroderma, <b>perioral crusting and radial fissures</b>, positive Nikolsky sign, mucous membranes <b>spared</b> — this distinguishes it from SJS/TEN, where mucosa <i>is</i> involved.',
          '<b>Tinea capitis:</b> scaly patch with alopecia and occipital lymphadenopathy, ± kerion. <b>Requires oral therapy</b> (griseofulvin or terbinafine) — topicals do not penetrate the hair shaft.',
          '<b>Tinea corporis</b> (annular with central clearing and a scaly advancing edge) and <b>tinea pedis</b> respond to topicals. <b>Tinea versicolor:</b> hypo- or hyperpigmented scaly macules on the trunk that fail to tan; topical selenium sulfide or azoles.',
          '<b>Scabies:</b> intensely pruritic, worse at night, burrows in web spaces and wrists — in infants, the <b>palms, soles, scalp, and face</b> are involved. <b>Permethrin 5% for the patient and all household contacts simultaneously</b>, plus laundering. Itching persists for weeks after successful treatment — do not re-treat reflexively.',
          '<b>Molluscum contagiosum:</b> umbilicated pearly papules; self-resolving over months to years — observation is a correct answer.',
        ],
      },
      {
        t: 'Reactive and inflammatory conditions',
        items: [
          '<b>Pityriasis rosea:</b> a <b>herald patch</b> followed by oval scaly plaques along skin lines in a <b>"Christmas tree"</b> pattern on the trunk; self-limited over 6–8 weeks. Consider testing for secondary syphilis in a sexually active adolescent, especially if palms and soles are involved.',
          '<b>Erythema multiforme:</b> <b>targetoid</b> lesions with three zones, acral and symmetric, typically triggered by <b>HSV</b>; mucosal involvement is limited. Self-limited.',
          '<b>Stevens-Johnson syndrome / TEN:</b> prodrome then painful dusky macules with <b>≥2 mucosal surfaces involved</b> and skin detachment (<10% SJS, >30% TEN). Most often drug-induced (sulfonamides, anticonvulsants, allopurinol) or from <i>Mycoplasma</i>. <b>Stop the drug and transfer to a burn center.</b>',
          '<b>Drug reaction with eosinophilia and systemic symptoms (DRESS):</b> 2–8 weeks after starting an anticonvulsant or sulfonamide, with fever, morbilliform rash, facial edema, eosinophilia, and hepatitis.',
          '<b>Acne ladder:</b> comedonal → topical retinoid; inflammatory → add benzoyl peroxide ± topical antibiotic (never as monotherapy, to limit resistance); moderate-severe → oral antibiotic (doxycycline) with a topical retinoid; severe nodulocystic or scarring → <b>isotretinoin</b> with iPLEDGE, two forms of contraception, and monitoring of lipids and transaminases.',
          '<b>Alopecia areata:</b> smooth, well-circumscribed round patches with <b>exclamation-point hairs</b> and no scale. <b>Tinea capitis</b> has scale and adenopathy. <b>Trichotillomania</b> has irregular borders with hairs of varying lengths.',
          '<b>Henoch-Schönlein purpura:</b> <b>palpable purpura on the buttocks and lower extremities</b> in a well-appearing child with arthralgia, abdominal pain, and possible renal involvement. <b>Normal platelet count</b> — the key lab that separates it from ITP and meningococcemia.',
        ],
      },
    ],
    traps: [
      'Confusing SSSS with SJS — mucosal sparing means staph.',
      'Treating tinea capitis topically.',
      'Ordering allergy testing for straightforward atopic dermatitis.',
      'Treating an itchy child again a week after permethrin because the itch persists — post-scabetic pruritus lasts weeks.',
      'Missing airway involvement in a beard-distribution hemangioma.',
    ],
  },

  {
    id: 16,
    name: 'Hematology-Oncology',
    weight: 3,
    tag: 'heme',
    why:
      'Anemia workup by MCV and the oncologic emergencies are the reliable question generators. Sickle cell complications appear year after year.',
    pearls: [
      {
        t: 'Anemia — sort by MCV first',
        items: [
          '<b>Iron deficiency anemia:</b> the most common; microcytic and hypochromic with a <b>high RDW</b>, low ferritin, high total iron-binding capacity, and elevated free erythrocyte protoporphyrin. Risk factors are excessive cow\'s milk, exclusive breastfeeding beyond 4 months without iron, prematurity, and adolescent menstrual loss. Treat with elemental iron 3–6 mg/kg/day and recheck; <b>a reticulocytosis within 5–7 days confirms the diagnosis</b>.',
          '<b>Thalassemia trait vs iron deficiency:</b> thalassemia has a <b>normal or high RBC count with a normal RDW</b> and a disproportionately low MCV. <b>Mentzer index (MCV ÷ RBC) <13 favors thalassemia; >13 favors iron deficiency.</b> Confirm with hemoglobin electrophoresis (elevated HbA₂ in β-thalassemia trait).',
          '<b>Lead poisoning:</b> microcytic anemia with basophilic stippling; screen at 12 and 24 months; chelate at higher levels; the main intervention is environmental abatement.',
          '<b>Transient erythroblastopenia of childhood:</b> 1–3 years, gradual pallor, <b>low reticulocytes with a normal MCV</b>, and spontaneous recovery. <b>Diamond-Blackfan anemia</b> presents in infancy with <b>macrocytosis</b>, elevated fetal hemoglobin and adenosine deaminase, thumb and craniofacial anomalies.',
          '<b>Hereditary spherocytosis:</b> anemia, jaundice, splenomegaly, <b>elevated MCHC</b>, spherocytes on smear, negative Coombs; diagnose with the EMA binding test or osmotic fragility.',
          '<b>G6PD deficiency:</b> X-linked; episodic hemolysis after oxidant stress (fava beans, sulfonamides, nitrofurantoin, naphthalene, infection) with <b>bite cells and Heinz bodies</b>. Test after the acute episode resolves — testing during hemolysis can be falsely normal.',
          '<b>Autoimmune hemolytic anemia:</b> anemia with reticulocytosis, elevated indirect bilirubin and LDH, low haptoglobin, and a <b>positive direct Coombs</b>.',
        ],
      },
      {
        t: 'Sickle cell disease — the tested complications',
        items: [
          '<b>Fever ≥38.5 °C in a child with sickle cell disease is an emergency</b> (functional asplenia) → immediate blood culture and <b>parenteral ceftriaxone</b> before other workup.',
          '<b>Acute chest syndrome:</b> a new pulmonary infiltrate with fever, chest pain, hypoxia, or respiratory symptoms — the leading cause of death. Treat with antibiotics covering atypicals, oxygen, analgesia, incentive spirometry, and transfusion.',
          '<b>Splenic sequestration:</b> a rapidly enlarging spleen with a falling hemoglobin and hypovolemia in a young child → transfuse and volume resuscitate.',
          '<b>Aplastic crisis:</b> <b>parvovirus B19</b> causes a sudden drop in hemoglobin with a <b>low reticulocyte count</b> — the reticulocyte count is the discriminator from sequestration and hemolysis.',
          '<b>Stroke:</b> screen with <b>transcranial Doppler annually from ages 2 to 16</b>; elevated velocities → chronic transfusion therapy for primary prevention.',
          '<b>Penicillin prophylaxis from 2 months until at least age 5</b>, plus pneumococcal and meningococcal immunization. <b>Hydroxyurea</b> reduces pain crises and acute chest syndrome.',
          '<b>Dactylitis</b> (hand-foot syndrome) is often the first manifestation in infancy. <b>Priapism</b> lasting >4 hours is a urologic emergency.',
        ],
      },
      {
        t: 'Bleeding and platelets',
        items: [
          '<b>Immune thrombocytopenia:</b> a <b>well</b> child 1–2 weeks after a viral illness with petechiae, bruising, and <b>isolated</b> thrombocytopenia — normal white count, normal hemoglobin, and no hepatosplenomegaly or lymphadenopathy. <b>Observation is appropriate for minimal bleeding regardless of the platelet count</b>; use IVIG, anti-D, or steroids for significant bleeding. Bone marrow examination is not required in a typical presentation.',
          '<b>Any additional cytopenia, blasts, bone pain, organomegaly, or adenopathy points to leukemia, not ITP.</b>',
          '<b>Hemophilia A (factor VIII) and B (factor IX):</b> X-linked, <b>prolonged PTT with a normal PT and normal platelets</b>, hemarthroses and deep muscle bleeds. Treat with factor replacement; desmopressin works for mild hemophilia A.',
          '<b>von Willebrand disease:</b> the most common inherited bleeding disorder — <b>mucocutaneous</b> bleeding, epistaxis, and heavy menstrual bleeding. Screening tests are often normal. Consider it in any adolescent with menorrhagia from menarche.',
          '<b>Vitamin K deficiency bleeding</b> — prolonged PT out of proportion to PTT in an exclusively breastfed infant whose parents declined vitamin K.',
        ],
      },
      {
        t: 'Malignancy — presentation and emergencies',
        items: [
          '<b>Acute lymphoblastic leukemia</b> is the most common childhood cancer: pallor, fatigue, bruising/petechiae, <b>bone pain and limp</b>, fever, lymphadenopathy, and hepatosplenomegaly. A <b>peripheral smear plus bone marrow</b> makes the diagnosis. Persistent or nocturnal bone pain with cytopenias is the tested pattern.',
          '<b>Neuroblastoma vs Wilms tumor:</b> neuroblastoma <b>crosses the midline</b>, is irregular and calcified, presents with a firm abdominal mass in a <b>systemically ill</b> child, with <b>periorbital ecchymoses ("raccoon eyes")</b>, <b>opsoclonus-myoclonus</b>, hypertension, and elevated urine VMA/HVA. <b>Wilms tumor</b> is smooth, <b>does not cross the midline</b>, occurs in a <b>well</b> child with hematuria and hypertension, and is associated with <b>WAGR, Beckwith-Wiedemann, and hemihypertrophy</b> — <b>do not palpate the abdomen repeatedly</b>.',
          '<b>Brain tumors:</b> most are <b>infratentorial</b> in children — morning headache with vomiting, ataxia, and cranial nerve findings. Medulloblastoma, pilocytic astrocytoma, ependymoma, and brainstem glioma.',
          '<b>Retinoblastoma:</b> leukocoria or strabismus; bilateral disease is heritable (RB1) and carries a risk of second malignancies.',
          '<b>Bone tumors:</b> <b>osteosarcoma</b> — metaphysis of long bones, "sunburst" periosteal reaction, adolescent growth spurt. <b>Ewing sarcoma</b> — diaphysis or flat bones, "onion-skinning," often with fever and elevated inflammatory markers (mimics osteomyelitis).',
          '<b>Tumor lysis syndrome:</b> <b>hyperkalemia, hyperphosphatemia, hyperuricemia, and hypocalcemia</b> with acute kidney injury — most common with ALL and Burkitt lymphoma. Hydrate aggressively and give allopurinol or <b>rasburicase</b>. <b>Do not give calcium</b> for asymptomatic hypocalcemia (it precipitates with phosphate).',
          '<b>Superior mediastinal syndrome:</b> facial swelling, distended neck veins, orthopnea, and stridor from an anterior mediastinal mass (T-cell lymphoma). <b>Sedation and general anesthesia can be fatal</b> — get imaging and a tissue diagnosis by the least invasive route.',
          '<b>Febrile neutropenia</b> (ANC <500 with fever) → blood cultures and broad-spectrum antipseudomonal antibiotics <b>within 60 minutes</b>. Do not delay for a workup, and avoid rectal temperatures or suppositories.',
        ],
      },
    ],
    traps: [
      'Ordering a bone marrow biopsy for classic ITP in a well child.',
      'Reassuring about "growing pains" when the pain is nocturnal, unilateral, or accompanied by a cytopenia or systemic sign.',
      'Repeated deep palpation of a Wilms tumor.',
      'Giving calcium in tumor lysis syndrome without symptoms.',
      'Missing that a low reticulocyte count in sickle cell disease means parvovirus, not sequestration.',
    ],
  },

  {
    id: 17,
    name: 'Allergy and Immunology',
    weight: 3,
    tag: 'allergy',
    why:
      'The immunodeficiency questions are pure pattern-matching: the type of organism tells you which arm of the immune system is broken. Learn that mapping and this domain is fast points.',
    pearls: [
      {
        t: 'Anaphylaxis and food allergy',
        items: [
          '<b>Anaphylaxis is a clinical diagnosis:</b> acute onset with skin/mucosal involvement <b>plus</b> either respiratory compromise or hypotension; <b>or</b> two or more organ systems after a likely allergen; <b>or</b> hypotension after a known allergen. <b>Skin findings are absent in up to 20%</b> — their absence does not exclude it.',
          '<b>IM epinephrine 0.01 mg/kg (max 0.3–0.5 mg) in the anterolateral thigh is the only first-line therapy</b>, repeated every 5–15 minutes as needed. There is no absolute contraindication.',
          'Observe for a <b>biphasic reaction</b>; discharge with <b>two</b> autoinjectors, an anaphylaxis action plan, and allergy referral.',
          '<b>Early introduction of peanut reduces peanut allergy</b> — introduce at 4–6 months for infants with severe eczema and/or egg allergy (after evaluation), and around 6 months for everyone else.',
          '<b>Do not order broad food allergy panels.</b> Specific IgE and skin testing have poor positive predictive value in the absence of a clinical history and generate false positives that lead to unnecessary elimination. <b>The oral food challenge is the gold standard.</b>',
          '<b>Oral allergy syndrome:</b> itching/tingling of the mouth with raw fruits and vegetables in a patient with pollen allergy, resolving with cooking; systemic reactions are rare.',
          '<b>Penicillin allergy:</b> more than 90% of children labeled penicillin-allergic are not — most reported reactions are viral exanthems or benign delayed rashes. Direct oral challenge for low-risk histories is the current approach; de-labeling is the tested goal.',
        ],
      },
      {
        t: 'Urticaria and angioedema',
        items: [
          '<b>Acute urticaria</b> is most often post-viral in children; second-generation H1 antihistamines are first-line. <b>Chronic urticaria</b> (>6 weeks) is usually spontaneous/autoimmune — extensive workup is low-yield; up-dose the antihistamine.',
          '<b>Hereditary angioedema:</b> recurrent non-pruritic, <b>non-urticarial</b> angioedema with abdominal pain attacks and no response to epinephrine, antihistamines, or steroids. <b>Low C4 is the screening test</b>; confirm with C1 inhibitor level and function. Triggers include trauma, dental work, and ACE inhibitors.',
        ],
      },
      {
        t: 'Immunodeficiency — the organism tells you the defect',
        items: [
          '<b>Antibody (B-cell) defects</b> → recurrent sinopulmonary infections with <b>encapsulated bacteria</b> beginning after <b>6 months</b> (when maternal IgG wanes), plus enteroviral and <i>Giardia</i> infections. <b>X-linked agammaglobulinemia (Bruton):</b> boys, <b>absent tonsils and lymph nodes</b>, all immunoglobulin classes low, absent B cells. <b>Common variable immunodeficiency</b> presents later with low IgG and poor vaccine responses.',
          '<b>Selective IgA deficiency</b> is the most common primary immunodeficiency — often asymptomatic, but associated with celiac disease, autoimmunity, and <b>anaphylactic reactions to blood products</b>.',
          '<b>T-cell / combined defects (SCID)</b> → onset in the <b>first months</b> with <b>thrombocytopenia-free</b> failure to thrive, chronic diarrhea, persistent <b>thrush</b>, <b><i>Pneumocystis jirovecii</i> pneumonia</b>, and an <b>absent thymic shadow</b>. Detected on the newborn screen by <b>low TRECs</b>. <b>Never give live vaccines; irradiate and CMV-screen all blood products.</b> Hematopoietic stem cell transplant is curative.',
          '<b>Phagocyte defects — chronic granulomatous disease:</b> recurrent abscesses and granulomas from <b>catalase-positive organisms</b> — <i>S. aureus</i>, <i>Serratia</i>, <i>Burkholderia cepacia</i>, <i>Nocardia</i>, and <i>Aspergillus</i>. Diagnose with the <b>dihydrorhodamine (DHR) flow cytometry</b> assay. Prophylaxis with TMP-SMX and itraconazole.',
          '<b>Leukocyte adhesion deficiency:</b> <b>delayed umbilical cord separation (>30 days)</b>, omphalitis, recurrent infections <b>without pus</b>, and a markedly elevated white blood cell count.',
          '<b>Complement deficiencies:</b> terminal complement (C5–C9) → <b>recurrent <i>Neisseria</i></b> infections; early classical pathway → lupus-like autoimmunity. Screen with <b>CH50</b>.',
          '<b>22q11.2 deletion (DiGeorge):</b> <b>C</b>ardiac conotruncal defects, <b>A</b>bnormal facies, <b>T</b>hymic hypoplasia, <b>C</b>left palate, <b>H</b>ypocalcemia — a hypocalcemic seizure in a newborn with a heart defect is the classic stem.',
          '<b>Wiskott-Aldrich:</b> X-linked triad of <b>eczema, thrombocytopenia with <i>small</i> platelets, and immunodeficiency</b>.',
          '<b>Ataxia-telangiectasia:</b> progressive cerebellar ataxia from toddlerhood, oculocutaneous telangiectasias, sinopulmonary infections, elevated alpha-fetoprotein, and radiation sensitivity with lymphoma risk.',
          '<b>Hyper-IgE (Job) syndrome:</b> eczema, <b>"cold" staphylococcal abscesses</b>, recurrent pneumonias with <b>pneumatoceles</b>, retained primary teeth, coarse facies, and a very high IgE.',
        ],
      },
    ],
    traps: [
      'Withholding epinephrine because there is no rash, or because the patient "only" has vomiting plus wheezing after a known allergen.',
      'Ordering food allergy panels in a child with eczema and no reaction history.',
      'Giving a live vaccine or non-irradiated blood to an infant with suspected SCID.',
      'Treating hereditary angioedema as anaphylaxis and concluding the patient is "refractory."',
    ],
  },

  {
    id: 18,
    name: 'Endocrinology',
    weight: 3,
    tag: 'endo',
    why:
      'Growth and puberty questions dominate. Bone age is the discriminating test in almost every short-stature vignette.',
    pearls: [
      {
        t: 'Short stature — bone age separates the causes',
        items: [
          '<b>Familial (genetic) short stature:</b> short parents, <b>normal growth velocity</b>, <b>bone age = chronologic age</b>, and a predicted adult height consistent with the midparental target. No workup, no treatment.',
          '<b>Constitutional delay of growth and puberty:</b> normal size at birth with deceleration in the first 2–3 years, then a normal velocity along a lower percentile, <b>delayed bone age</b>, delayed puberty, and a family history of late puberty. <b>Reaches a normal adult height.</b> Reassurance.',
          '<b>Growth hormone deficiency:</b> <b>decreased growth velocity</b> with a <b>delayed bone age</b>, and a child who is <b>overweight for height</b> (chubby with a doll-like face) — this contrasts with nutritional causes, where <b>weight falls before height</b>.',
          '<b>Hypothyroidism:</b> growth deceleration with weight gain, delayed bone age, and often the first sign is a falling height percentile. Check TSH and free T₄ in any child with unexplained growth failure.',
          '<b>Midparental target height:</b> for boys, (mother\'s height + 13 cm + father\'s height) ÷ 2; for girls, (father\'s height − 13 cm + mother\'s height) ÷ 2.',
          '<b>Turner syndrome must be excluded with a karyotype in any short girl</b> with an unexplained decline in height percentile, even without classic features.',
          'A <b>normal growth velocity</b> is the single most reassuring finding; a <b>falling height percentile</b> is the single most concerning one.',
        ],
      },
      {
        t: 'Puberty disorders',
        items: [
          '<b>Central (gonadotropin-dependent) precocious puberty:</b> normal but early pubertal sequence with an <b>advanced bone age</b> and pubertal LH. Idiopathic in most girls; <b>in boys, obtain a brain MRI</b> — CNS lesions are far more common.',
          '<b>Peripheral (gonadotropin-independent) precocious puberty:</b> suppressed LH/FSH. Causes include congenital adrenal hyperplasia, adrenal or gonadal tumors, exogenous hormones, and <b>McCune-Albright syndrome</b> (café-au-lait with irregular "coast of Maine" borders, polyostotic fibrous dysplasia, and precocious puberty).',
          '<b>Benign variants:</b> <b>premature thelarche</b> — isolated breast development in a girl <2–3 years with normal growth velocity and no bone age advancement; <b>premature adrenarche</b> — isolated pubic/axillary hair and body odor without breast or testicular development. Both are followed, not worked up aggressively.',
          '<b>In a girl with precocious puberty, breast development plus a growth spurt with an advanced bone age suggests true central precocity</b> → treat with a <b>GnRH agonist</b> to preserve adult height.',
          '<b>Congenital adrenal hyperplasia (21-hydroxylase deficiency):</b> virilized female genitalia at birth, or a male presenting at 1–3 weeks with <b>salt-wasting crisis</b> — vomiting, dehydration, shock, <b>hyponatremia with hyperkalemia</b>. Diagnose with elevated <b>17-hydroxyprogesterone</b> (on the newborn screen). Treat with hydrocortisone and fludrocortisone, and stress-dose steroids during illness.',
        ],
      },
      {
        t: 'Thyroid and diabetes',
        items: [
          '<b>Congenital hypothyroidism:</b> detected on the newborn screen and usually <b>asymptomatic at birth</b> (maternal T₄ crosses the placenta). Later signs are prolonged jaundice, constipation, hypotonia, a large fontanelle, and an umbilical hernia. <b>Start levothyroxine immediately — delay causes irreversible intellectual disability.</b> Do not wait for confirmatory testing.',
          '<b>Hashimoto thyroiditis</b> is the most common acquired thyroid disorder — goiter, elevated TSH, positive thyroid peroxidase antibodies. Screen children with trisomy 21, Turner syndrome, and type 1 diabetes.',
          '<b>Graves disease:</b> weight loss with a good appetite, tremor, tachycardia, heat intolerance, <b>declining school performance</b>, goiter with a bruit, and ophthalmopathy. Methimazole (never propylthiouracil in children, except in the first trimester of pregnancy, because of hepatotoxicity).',
          '<b>Type 1 diabetes:</b> polyuria, polydipsia, weight loss; new-onset nocturnal enuresis in a previously dry child is a classic tell. Check for DKA. Screen for celiac disease and thyroid autoimmunity at diagnosis.',
          '<b>Type 2 diabetes:</b> obese adolescent with acanthosis nigricans and a family history. <b>Metformin plus lifestyle</b>; add insulin if A1c is high or ketosis is present. Screen for it starting at age 10 or puberty in children with a BMI ≥85th percentile plus risk factors.',
        ],
      },
      {
        t: 'Adrenal, calcium, and water balance',
        items: [
          '<b>Adrenal insufficiency:</b> fatigue, weight loss, salt craving, hypotension, <b>hyperpigmentation</b> (primary only), with <b>hyponatremia and hyperkalemia</b> and hypoglycemia. Treat crisis with fluids, dextrose, and stress-dose hydrocortisone <i>before</i> confirmatory testing.',
          '<b>Diabetes insipidus:</b> dilute urine despite serum hypernatremia. <b>Central</b> DI responds to desmopressin; <b>nephrogenic</b> does not. In a child, central DI with growth failure suggests a hypothalamic lesion (craniopharyngioma, germinoma, Langerhans cell histiocytosis).',
          '<b>SIADH:</b> hyponatremia with <b>concentrated</b> urine (urine osmolality > serum) and clinical euvolemia → fluid restriction. Contrast with <b>cerebral salt wasting</b>, which is hypovolemic and requires salt and volume.',
          '<b>Nutritional rickets:</b> vitamin D deficiency in a breastfed infant without supplementation, or in darker-skinned children with limited sun. Bowing, widened wrists, rachitic rosary, craniotabes, <b>low/normal calcium, low phosphate, high alkaline phosphatase, high PTH</b>, and cupping/fraying of the metaphyses on radiograph.',
        ],
      },
    ],
    traps: [
      'A short child with a normal growth velocity being sent for an extensive endocrine workup — velocity is the key.',
      'Missing that a child who is overweight-for-height with poor growth points to an endocrine cause, while poor weight gain preceding poor height points to nutrition.',
      'Delaying levothyroxine in congenital hypothyroidism to confirm the diagnosis.',
      'Forgetting the brain MRI in a boy with central precocious puberty.',
    ],
  },

  {
    id: 19,
    name: 'Nephrology, Fluids, and Electrolytes',
    weight: 3,
    tag: 'renal',
    why:
      'Glomerular disease is tested through a small set of complement and timing patterns. Fluid management has changed and the exam checks whether you know the current answer.',
    pearls: [
      {
        t: 'Fluids and electrolytes',
        items: [
          '<b>Maintenance IV fluid in children should be isotonic</b> (0.9% saline or lactated Ringer with dextrose) — the 2018 AAP guideline changed this specifically because hypotonic fluids caused hospital-acquired hyponatremia. Hypotonic maintenance fluid is now a wrong answer.',
          '<b>Holliday-Segar:</b> 100 mL/kg/day for the first 10 kg, 50 for the next 10, 20 for each kg beyond (the 4-2-1 rule hourly).',
          '<b>Oral rehydration therapy is first-line for mild-to-moderate dehydration</b>, including with vomiting — give small frequent volumes; a single dose of ondansetron improves success.',
          '<b>Hyponatremia:</b> correct <b>no faster than 0.5 mEq/L/hour or ~10–12 mEq/L per 24 hours</b> to avoid osmotic demyelination. Symptomatic (seizing) hyponatremia gets hypertonic 3% saline.',
          '<b>Hypernatremic dehydration:</b> correct <b>slowly over 48 hours</b> — rapid correction causes cerebral edema. Aim to lower sodium by <0.5 mEq/L/hour.',
          '<b>Hyperkalemia:</b> get an ECG (peaked T waves → widened QRS → sine wave). <b>Calcium gluconate first to stabilize the myocardium</b>, then insulin with dextrose, albuterol, and bicarbonate to shift potassium intracellularly, then a binder or dialysis to remove it. Also rule out a hemolyzed specimen — a common trap.',
          '<b>Anion gap acidosis (MUDPILES)</b>: methanol, uremia, DKA, propylene glycol, isoniazid/iron, lactic acidosis, ethylene glycol, salicylates. A normal-gap acidosis suggests diarrhea or renal tubular acidosis.',
        ],
      },
      {
        t: 'Glomerular disease — timing and complement',
        items: [
          '<b>Post-streptococcal glomerulonephritis:</b> <b>1–2 weeks after pharyngitis</b> (or 3–6 weeks after impetigo) with edema, hypertension, and <b>cola-colored urine with RBC casts</b>. <b>C3 is low and returns to normal within 6–8 weeks</b> — a persistently low C3 suggests membranoproliferative GN or lupus. Supportive management; antibiotics do not prevent it.',
          '<b>IgA nephropathy:</b> gross hematuria <b>concurrent with</b> ("synpharyngitic") an upper respiratory infection, within 1–2 days — the timing is the discriminator from PSGN. <b>Normal complement.</b>',
          '<b>Nephrotic syndrome:</b> nephrotic-range proteinuria, hypoalbuminemia, edema, and hyperlipidemia. In children 1–10 years, <b>minimal change disease</b> predominates → <b>treat empirically with corticosteroids without a biopsy</b>. Biopsy for age <1 or >10 years, hematuria, hypertension, low complement, renal insufficiency, or steroid resistance. Complications: <b>spontaneous bacterial peritonitis</b> (pneumococcus), thrombosis, and infection.',
          '<b>Henoch-Schönlein purpura nephritis:</b> hematuria/proteinuria following the classic purpuric rash; monitor urinalysis and blood pressure for 6 months.',
          '<b>Alport syndrome:</b> hematuria with <b>sensorineural hearing loss</b> and ocular changes; X-linked in most.',
          '<b>Hemolytic uremic syndrome:</b> after bloody diarrhea from Shiga toxin-producing <i>E. coli</i> O157:H7 — the triad of <b>microangiopathic hemolytic anemia, thrombocytopenia, and acute kidney injury</b> with schistocytes and a <b>negative Coombs</b>. <b>Antibiotics and antimotility agents increase the risk</b> — avoid them in bloody diarrhea. Supportive care with careful fluid and transfusion management; most children recover renal function.',
        ],
      },
      {
        t: 'Hematuria, proteinuria, and hypertension',
        items: [
          '<b>Microscopic hematuria requires confirmation on 2–3 specimens.</b> RBC casts, dysmorphic RBCs, and proteinuria point glomerular; isolated hematuria with normal-shaped cells points to a urologic source, hypercalciuria, or stones.',
          '<b>Orthostatic (postural) proteinuria</b> is the most common cause of persistent proteinuria in adolescents — <b>a first-morning urine protein/creatinine ratio is normal</b> while daytime samples are abnormal. Benign; no treatment.',
          '<b>Renal tubular acidosis:</b> type 1 (distal) — cannot acidify urine, <b>urine pH >5.5</b>, hypokalemia, nephrocalcinosis and stones; type 2 (proximal) — bicarbonate wasting, associated with <b>Fanconi syndrome</b> (glycosuria, phosphaturia, aminoaciduria); type 4 — <b>hyperkalemic</b>, from aldosterone deficiency or resistance.',
          '<b>Nocturnal enuresis</b> is normal until age 5 and is usually primary and monosymptomatic. Evaluate with a history, exam, and urinalysis only. First-line is education, motivational measures, and an <b>enuresis alarm</b> (highest long-term cure rate); desmopressin for short-term needs like sleepovers. Daytime symptoms, secondary enuresis, or constipation change the approach.',
        ],
      },
    ],
    traps: [
      'Choosing hypotonic maintenance fluid.',
      'Giving antibiotics for bloody diarrhea and precipitating HUS.',
      'Biopsying a classic 4-year-old with nephrotic syndrome instead of starting steroids.',
      'Correcting chronic hyponatremia or hypernatremia too quickly.',
      'Confusing IgA nephropathy (hematuria <i>with</i> the illness) and PSGN (hematuria 1–2 weeks <i>after</i>).',
    ],
  },

  {
    id: 20,
    name: 'Genitourinary System',
    weight: 3,
    tag: 'gu',
    why:
      'UTI imaging rules and the acute scrotum are the two reliable question generators. Both have specific, memorizable answers.',
    pearls: [
      {
        t: 'Urinary tract infection',
        items: [
          '<b>Diagnosis requires both pyuria and ≥50,000 CFU/mL of a single organism</b> from a <b>catheterized or suprapubic specimen</b> in a non-toilet-trained child. <b>A bagged specimen can be used to rule out but never to rule in</b> a UTI.',
          '<b><i>E. coli</i></b> causes the great majority; also <i>Klebsiella</i>, <i>Proteus</i> (associated with struvite stones, more common in boys), and <i>Enterococcus</i>.',
          '<b>Imaging after a first febrile UTI in a child 2–24 months: renal and bladder ultrasound.</b> <b>VCUG is not routine</b> — obtain it if the ultrasound shows hydronephrosis, scarring, or findings suggesting high-grade reflux or obstruction, or after a <b>second</b> febrile UTI.',
          '<b>Vesicoureteral reflux</b> grades I–V; most low-grade reflux resolves spontaneously. Antibiotic prophylaxis reduces recurrent febrile UTIs but not renal scarring, and it increases resistant organisms.',
          '<b>Posterior urethral valves:</b> the most common cause of bladder outlet obstruction in boys — antenatal hydronephrosis with a thick-walled bladder, or a newborn boy with a weak urinary stream, a palpable bladder, and elevated creatinine. <b>VCUG is diagnostic.</b>',
          'Circumcision reduces the risk of UTI in infant boys roughly tenfold, though the absolute risk remains low.',
        ],
      },
      {
        t: 'The acute scrotum',
        items: [
          '<b>Testicular torsion:</b> <b>abrupt</b> severe pain, often waking the patient from sleep, with nausea and vomiting; the testis is <b>high-riding with a transverse lie</b> and an <b>absent cremasteric reflex</b>. Bimodal peaks in the neonatal period and early adolescence. <b>This is a surgical emergency — the salvage window is about 6 hours.</b> If the presentation is classic, <b>go to the operating room; do not delay for ultrasound.</b>',
          '<b>Torsion of the appendix testis:</b> more gradual pain, point tenderness at the upper pole, and the <b>"blue dot" sign</b>; the cremasteric reflex is <b>preserved</b>. Supportive care only.',
          '<b>Epididymitis:</b> gradual onset, dysuria, relief with elevation (Prehn sign), and a preserved cremasteric reflex; in sexually active adolescents, treat for chlamydia and gonorrhea.',
          '<b>Varicocele:</b> a painless <b>left-sided</b> "bag of worms" that decompresses when supine. <b>A right-sided or non-decompressing varicocele requires abdominal imaging</b> to rule out a retroperitoneal mass.',
          '<b>Cryptorchidism:</b> if the testis has not descended by <b>6 months corrected age</b>, refer for <b>orchiopexy between 6 and 18 months</b>. This reduces (but does not eliminate) the risk of infertility and malignancy. <b>Do not order imaging</b> to locate a nonpalpable testis — it does not change management. <b>Bilateral nonpalpable testes in a newborn requires urgent evaluation for congenital adrenal hyperplasia and a disorder of sex development.</b>',
          '<b>Hypospadias: do not circumcise</b> — the foreskin is needed for repair.',
        ],
      },
      {
        t: 'Adolescent gynecology',
        items: [
          '<b>Primary amenorrhea:</b> no menarche by <b>15</b>, or by <b>13 with no secondary sexual characteristics</b>, or >3 years after thelarche. Start with a <b>pregnancy test</b>, then FSH/LH, TSH, prolactin, and a pelvic ultrasound. Consider Turner syndrome, Müllerian agenesis, imperforate hymen (cyclic pain with a bulging blue membrane), and androgen insensitivity.',
          '<b>Secondary amenorrhea:</b> pregnancy first, always. Then consider functional hypothalamic amenorrhea (stress, energy deficit, athletics), PCOS, thyroid disease, and hyperprolactinemia.',
          '<b>Polycystic ovary syndrome:</b> irregular cycles beyond 2 years post-menarche plus clinical or biochemical hyperandrogenism. <b>Ultrasound is not used for diagnosis in adolescents</b> (multifollicular ovaries are normal in adolescence). Treat with lifestyle measures, combined hormonal contraception, and metformin for metabolic features.',
          '<b>Primary dysmenorrhea:</b> prostaglandin-mediated, begins with ovulatory cycles 6–12 months after menarche → <b>NSAIDs started before or at onset</b>, plus hormonal contraception. Failure to respond suggests endometriosis.',
          '<b>Heavy menstrual bleeding from menarche</b> → screen for a <b>bleeding disorder, especially von Willebrand disease</b>, before attributing it to anovulation.',
          '<b>Ovarian torsion:</b> sudden severe unilateral pelvic pain with vomiting and an adnexal mass → <b>Doppler ultrasound, but normal flow does not exclude it</b>; surgical detorsion preserves the ovary.',
          '<b>Prepubertal vulvovaginitis</b> is usually nonspecific from hypoestrogenized tissue and poor hygiene → sitz baths and hygiene measures. <b>A foul, bloody, or persistent discharge in a prepubertal girl suggests a vaginal foreign body</b> (often toilet paper) or, importantly, sexual abuse.',
          '<b>Labial adhesions</b> in prepubertal girls are asymptomatic and resolve with puberty; treat only if there is urinary obstruction or recurrent infection.',
        ],
      },
    ],
    traps: [
      'Ordering an ultrasound before urology in a classic torsion — the exam wants immediate surgical exploration.',
      'Diagnosing a UTI on a bagged specimen.',
      'Ordering a VCUG after every first febrile UTI.',
      'Imaging to locate an undescended testis.',
      'Using ovarian ultrasound to diagnose PCOS in an adolescent.',
    ],
  },

  {
    id: 21,
    name: 'Genetics, Dysmorphology, and Metabolic Disorders',
    weight: 2,
    tag: 'gen',
    why:
      'Low weight, but the inborn errors of metabolism questions are high-stakes and follow a clean decision tree based on three labs: glucose, ammonia, and the presence of acidosis or ketones.',
    pearls: [
      {
        t: 'Inheritance and imprinting',
        items: [
          '<b>Autosomal dominant</b> — vertical transmission, male-to-male transmission possible, variable expressivity and incomplete penetrance. <b>Autosomal recessive</b> — horizontal (siblings), consanguinity. <b>X-linked recessive</b> — affected males, carrier mothers, <b>no male-to-male transmission</b>.',
          '<b>Mitochondrial inheritance:</b> transmitted only by the <b>mother</b> to all children; heteroplasmy explains variable severity (MELAS, Leigh syndrome).',
          '<b>Imprinting:</b> <b>Prader-Willi</b> — loss of the <b>paternal</b> 15q11-13: neonatal hypotonia and poor feeding, then hyperphagia and obesity, short stature, small hands and feet, hypogonadism, and intellectual disability. <b>Angelman</b> — loss of the <b>maternal</b> copy: severe intellectual disability, absent speech, ataxic "puppet" gait, seizures, and inappropriate laughter.',
          '<b>Anticipation</b> (worsening severity across generations) occurs with trinucleotide repeat disorders: <b>fragile X</b>, myotonic dystrophy, Huntington disease.',
          '<b>Chromosomal microarray is the first-tier test</b> for a child with global developmental delay, intellectual disability, autism, or multiple congenital anomalies. Add <b>fragile X testing</b> — a karyotype is only first-line when a specific aneuploidy is suspected.',
        ],
      },
      {
        t: 'Syndromes worth recognizing on sight',
        items: [
          '<b>Trisomy 21:</b> hypotonia, upslanting palpebral fissures, single transverse palmar crease, sandal gap, and a <b>complete atrioventricular canal defect</b>. Surveillance: echo at birth, thyroid studies at birth/6/12 months then annually, hearing and vision, <b>cervical spine symptoms screening for atlantoaxial instability</b> (routine radiographs are <i>not</i> recommended in asymptomatic children), celiac screening if symptomatic, and increased leukemia risk.',
          '<b>Trisomy 18 (Edwards):</b> clenched hands with overlapping fingers, rocker-bottom feet, micrognathia, prominent occiput. <b>Trisomy 13 (Patau):</b> midline defects — holoprosencephaly, cleft lip/palate, <b>polydactyly</b>, and cutis aplasia.',
          '<b>Turner syndrome (45,X):</b> short stature, webbed neck, low posterior hairline, widely spaced nipples, lymphedema of the hands and feet in the newborn, <b>coarctation and bicuspid aortic valve</b>, streak gonads with primary amenorrhea, renal anomalies (horseshoe kidney), and normal intelligence with visuospatial weakness.',
          '<b>Klinefelter (47,XXY):</b> tall with long limbs, <b>small firm testes</b>, gynecomastia, learning and language difficulties, and infertility — often not diagnosed until adolescence.',
          '<b>Fragile X:</b> the most common inherited cause of intellectual disability — long face, large ears, <b>macroorchidism after puberty</b>, joint laxity, autism features, and a family history of intellectual disability.',
          '<b>Williams syndrome:</b> "elfin" facies, <b>supravalvular aortic stenosis</b>, <b>infantile hypercalcemia</b>, and an overly friendly "cocktail party" personality with relative strength in language.',
          '<b>Marfan syndrome:</b> tall with arachnodactyly, joint hypermobility, pectus deformity, <b>upward lens dislocation</b>, and <b>aortic root dilation</b> — screen with echo, restrict from contact and isometric sports. <b>Homocystinuria</b> mimics it but has <b>downward</b> lens dislocation, thrombosis, and intellectual disability.',
          '<b>Achondroplasia:</b> autosomal dominant (FGFR3), most from new mutations with advanced paternal age — rhizomelic shortening, macrocephaly with frontal bossing, trident hands, and risk of <b>foramen magnum stenosis</b> and central apnea.',
          '<b>VACTERL:</b> Vertebral, Anal atresia, Cardiac, Tracheo-Esophageal fistula, Renal, Limb. <b>CHARGE:</b> Coloboma, Heart defects, Atresia of the choanae, Retardation of growth, Genital hypoplasia, Ear anomalies with deafness.',
          '<b>Fetal alcohol spectrum disorder:</b> short palpebral fissures, a <b>smooth philtrum</b>, a thin vermilion border, growth restriction, microcephaly, and neurobehavioral impairment.',
        ],
      },
      {
        t: 'Inborn errors of metabolism — the decision tree',
        items: [
          '<b>Suspect an inborn error</b> in a previously well neonate or infant with vomiting, lethargy, poor feeding, seizures, or apparent sepsis, especially after a protein load, an illness, or prolonged fasting. Obtain <b>glucose, blood gas, ammonia, lactate, urine ketones, plasma amino acids, urine organic acids, and an acylcarnitine profile</b> — and get them <b>during the acute episode</b>.',
          '<b>High ammonia + respiratory alkalosis + normal glucose + no acidosis = urea cycle defect</b> (ornithine transcarbamylase deficiency is X-linked and the most common). Stop protein, give dextrose, and start nitrogen scavengers; hemodialysis for severe hyperammonemia.',
          '<b>Metabolic acidosis with an anion gap + ketosis + high ammonia = organic acidemia</b> (methylmalonic, propionic, isovaleric — "sweaty feet" odor).',
          '<b>Hypoketotic hypoglycemia after fasting = fatty acid oxidation defect</b> — <b>MCAD deficiency</b> is the classic, on the newborn screen; the child looks like Reye syndrome. Treatment is <b>avoiding fasting</b> and giving dextrose during illness.',
          '<b>Galactosemia:</b> jaundice, hepatomegaly, cataracts, and <b><i>E. coli</i> sepsis</b> in a newborn after starting milk feeds; reducing substances in the urine. Switch to a soy/lactose-free formula immediately.',
          '<b>Phenylketonuria:</b> on the newborn screen; untreated leads to intellectual disability, a musty odor, eczema, and hypopigmentation. <b>Maternal PKU</b> in pregnancy causes microcephaly and congenital heart disease in the fetus — dietary control before conception is the tested point.',
          '<b>Lysosomal storage disorders</b> present later with coarse facies, organomegaly, and regression: Hurler (corneal clouding), Hunter (X-linked, <i>no</i> corneal clouding), <b>Tay-Sachs</b> (cherry-red macula with <i>no</i> hepatosplenomegaly), Gaucher, Niemann-Pick.',
          '<b>Congenital hypothyroidism, CAH, CF, SCID, MCAD, PKU, galactosemia, sickle cell disease, and hearing loss</b> are all on the newborn screening panel — a "normal newborn screen" does not exclude a disorder if it was drawn too early or the child was transfused.',
        ],
      },
    ],
    traps: [
      'Attributing a "septic" neonate\'s presentation entirely to infection and never sending an ammonia level.',
      'Sending metabolic labs after the child has been stabilized on dextrose, when they will be normal.',
      'Ordering a karyotype instead of a chromosomal microarray for undifferentiated developmental delay.',
      'Ordering routine cervical spine films in an asymptomatic child with trisomy 21.',
    ],
  },

  {
    id: 22,
    name: 'Rheumatology',
    weight: 2,
    tag: 'rheum',
    why:
      'A small domain that reduces to a handful of fever-and-joint patterns. The uveitis screening rule for JIA is asked almost every year.',
    pearls: [
      {
        t: 'Juvenile idiopathic arthritis',
        items: [
          'Definition: arthritis in one or more joints for <b>≥6 weeks</b> beginning before age 16, with other causes excluded. <b>Morning stiffness that improves with activity</b> is the hallmark — the opposite of mechanical pain.',
          '<b>Oligoarticular JIA</b> (≤4 joints): the most common; young girls, often a single swollen knee, <b>ANA-positive</b>. This subtype has the <b>highest risk of chronic anterior uveitis, which is asymptomatic and can cause blindness</b> → <b>slit-lamp screening every 3 months</b> in ANA-positive young children. Asking for the eye exam is the answer.',
          '<b>Polyarticular JIA</b> (≥5 joints): symmetric small and large joints; RF-positive disease resembles adult rheumatoid arthritis and has a worse prognosis.',
          '<b>Systemic JIA (Still disease):</b> <b>daily "quotidian" spiking fevers</b> with an <b>evanescent salmon-colored rash appearing with the fever</b>, hepatosplenomegaly, serositis, and markedly elevated inflammatory markers with a high ferritin. Arthritis may appear later.',
          '<b>Macrophage activation syndrome</b> complicates systemic JIA: a <b>falling</b> ESR, white count, and platelet count with a <b>very high ferritin</b>, high triglycerides, and coagulopathy — a paradoxical improvement in labs with a worsening patient. This is life-threatening.',
        ],
      },
      {
        t: 'Vasculitis and connective tissue disease',
        items: [
          '<b>Henoch-Schönlein purpura (IgA vasculitis):</b> the most common childhood vasculitis — <b>palpable purpura on the buttocks and legs</b>, arthritis, colicky abdominal pain (with a risk of <b>intussusception</b>, typically ileoileal), and nephritis. <b>Platelet count is normal.</b> Supportive care; steroids for severe abdominal pain. Follow urinalysis and blood pressure for 6 months.',
          '<b>Systemic lupus erythematosus:</b> adolescent girls, disproportionately Black, Hispanic, and Asian. Malar rash sparing the nasolabial folds, photosensitivity, oral ulcers (painless), arthritis, serositis, nephritis, and cytopenias. <b>ANA is sensitive but not specific; anti-dsDNA and anti-Smith are specific</b>, and <b>low C3/C4 with rising anti-dsDNA tracks disease activity</b> (especially nephritis).',
          '<b>Juvenile dermatomyositis:</b> <b>heliotrope rash</b> (violaceous eyelids), <b>Gottron papules</b> over the knuckles, and symmetric <b>proximal</b> muscle weakness — difficulty climbing stairs or rising from the floor. Elevated CK, aldolase, and LDH; calcinosis is a late complication.',
          '<b>Kawasaki disease</b> is classified as a vasculitis and is covered under infectious diseases — remember the coronary aneurysm risk and that treatment within 10 days reduces it from ~25% to under 5%.',
        ],
      },
      {
        t: 'Fever syndromes and pain amplification',
        items: [
          '<b>Acute rheumatic fever — revised Jones criteria:</b> evidence of preceding group A strep plus 2 major or 1 major + 2 minor. Major: <b>carditis, polyarthritis (migratory), chorea, erythema marginatum, subcutaneous nodules</b>. Sydenham chorea alone is sufficient. Secondary prophylaxis with penicillin continues for years.',
          '<b>Post-streptococcal reactive arthritis:</b> arthritis <b>within 1–2 weeks</b> of strep (versus 2–4 weeks for ARF), <b>non-migratory</b>, poorly responsive to NSAIDs, and without carditis.',
          '<b>PFAPA:</b> <b>P</b>eriodic <b>F</b>ever, <b>A</b>phthous stomatitis, <b>P</b>haryngitis, and cervical <b>A</b>denitis — <b>strikingly regular</b> episodes every 3–6 weeks in a child who is entirely well between episodes and grows normally. <b>A single dose of prednisone aborts an episode</b> — this response is nearly diagnostic. Outgrown over years.',
          '<b>Familial Mediterranean fever:</b> irregular 1–3 day attacks of fever with <b>serositis</b> (peritonitis, pleuritis) and an erysipelas-like rash; risk of <b>amyloidosis</b>; treated with colchicine.',
          '<b>Amplified musculoskeletal pain / fibromyalgia:</b> diffuse pain with allodynia, sleep disturbance, and normal inflammatory markers and exam. <b>Treatment is intensive physical therapy and CBT, not immunosuppression or further testing.</b>',
          '<b>Benign nocturnal limb pains ("growing pains"):</b> bilateral, in the evening or at night, in the muscles (not joints), relieved by massage, with a completely normal exam and normal growth. <b>Unilateral, joint-centered, morning, or persistent pain with systemic signs is not growing pains</b> — think malignancy or arthritis.',
        ],
      },
    ],
    traps: [
      'Forgetting the slit-lamp exam in ANA-positive oligoarticular JIA because the eyes are asymptomatic.',
      'Reading a falling ESR in systemic JIA as improvement when it signals macrophage activation syndrome.',
      'Attributing a limp with nocturnal bone pain to growing pains.',
      'Diagnosing lupus from a positive ANA alone — it is common in healthy children.',
    ],
  },

  {
    id: 23,
    name: 'Ethics',
    weight: 2,
    tag: 'ethics',
    why:
      'Only about 7 questions, but they are among the most winnable on the exam because they follow a consistent moral framework rather than requiring recall.',
    pearls: [
      {
        t: 'Consent, assent, and decision-making',
        items: [
          '<b>Parents provide informed permission; children provide assent.</b> Assent should be sought from roughly <b>age 7</b> onward, developmentally adjusted.',
          '<b>A child\'s dissent should be respected when the intervention is not essential</b> (e.g., research participation, elective procedures). It may be overridden for necessary treatment — but the child should still be informed honestly.',
          '<b>Emancipated minors</b> (married, military, court-emancipated, financially independent and living apart, and in many states parenting) consent to their own care. <b>Mature minor</b> doctrines vary by state.',
          'Minors may consent independently in most states for <b>STI care, contraception, pregnancy-related care, substance use treatment, and often mental health care</b>.',
          '<b>The best-interest standard</b> governs decisions for children who cannot decide for themselves. When parents refuse a treatment that is <b>clearly life-saving and effective</b>, the state may intervene — but the threshold is <b>significant risk of serious harm</b>, not simply disagreement with the physician.',
          '<b>Jehovah\'s Witness parents refusing a life-saving transfusion for a child:</b> transfuse in an emergency and seek a court order when time permits. An adolescent\'s own religious objection carries moral weight but does not by itself permit foregoing life-saving therapy in a minor.',
          '<b>Vaccine refusal:</b> continue to engage, use presumptive language, revisit at each visit, and document. Dismissing families from the practice is discouraged by the AAP as a first response.',
        ],
      },
      {
        t: 'Confidentiality and professionalism',
        items: [
          'Confidentiality with adolescents must be discussed <b>proactively</b>, along with its limits: <b>danger to self, danger to others, and abuse</b>.',
          'Do not promise unconditional confidentiality before hearing the disclosure, and do not breach it reflexively when a mandatory trigger is absent.',
          '<b>Disclosure of medical error:</b> disclose promptly, honestly, and directly to the family — including errors that caused no harm — with an explanation, an apology, and a description of what will be done to prevent recurrence. Concealment is never acceptable.',
          '<b>Conflicts of interest:</b> decline gifts from industry and disclose relationships. Do not prescribe based on industry inducement.',
          '<b>Treating family members or friends</b> is discouraged outside of emergencies and minor problems.',
          '<b>The impaired or unsafe colleague:</b> the professional obligation is to report through institutional channels — not to cover, and not to confront alone in a way that leaves patients at risk.',
        ],
      },
      {
        t: 'End of life, communication, and grief',
        items: [
          '<b>Withholding and withdrawing life-sustaining treatment are ethically equivalent.</b> A trial of therapy that can be stopped is preferable to never starting.',
          '<b>Medically ineffective ("futile") interventions</b> need not be offered, but the conversation should focus on <b>goals of care</b> rather than on what will be withheld. Shift from "there is nothing more we can do" to "here is what we <i>will</i> do."',
          'The <b>doctrine of double effect</b>: providing opioids sufficient to relieve suffering at the end of life is ethical even if a foreseen (but unintended) effect is hastened death.',
          '<b>Adolescents should be included in end-of-life discussions</b> when developmentally able; excluding them is a common wrong answer.',
          '<b>Delivering serious news (SPIKES):</b> Setting, Perception (ask what they understand), Invitation (ask how much they want to know), Knowledge (warning shot, plain language, small chunks), Emotions (respond with empathy and silence rather than more data), Strategy and summary. <b>The first response to a parent\'s emotion is empathy, not information.</b>',
          '<b>Developmental understanding of death:</b> <b>preschool</b> — magical thinking, death seen as reversible, possible guilt that they caused it; <b>school-age (~7–10)</b> — understands permanence, universality, and irreversibility, often curious about biological detail; <b>adolescent</b> — adult understanding with strong concerns about meaning, identity, and being a burden.',
          'Use concrete words — <b>"died"</b>, not "passed away," "went to sleep," or "we lost him" — with young children, who take euphemisms literally.',
        ],
      },
    ],
    traps: [
      'Choosing an option that withholds information from a competent adolescent because a parent requests it.',
      'Responding to a parent\'s distress with more medical facts instead of empathy.',
      'Delaying emergency life-saving treatment to obtain a court order.',
      'Treating a request for confidentiality as automatically overriding a safety concern — or automatically breaking confidentiality when no mandatory trigger exists.',
    ],
  },

  {
    id: 24,
    name: 'Patient Safety, Quality Improvement, and Research Methods',
    weight: 2,
    tag: 'qi',
    why:
      'The most formulaic domain on the exam. Biostatistics questions in particular are worth practicing because the same four or five calculations recur, ' +
      'and they are the questions most often skipped in preparation.',
    pearls: [
      {
        t: 'Patient safety',
        items: [
          '<b>Active failures</b> are errors at the sharp end by frontline staff; <b>latent conditions</b> are system flaws (staffing, design, look-alike packaging) waiting to combine — the <b>Swiss cheese model</b>. <b>Safety questions almost always want the system-level answer, not the individual-blame answer.</b>',
          '<b>Error types:</b> a <b>slip/lapse</b> is a failure of execution of a correct plan (attention/memory); a <b>mistake</b> is a flawed plan carried out correctly (knowledge or rule-based).',
          '<b>Just culture</b> distinguishes human error (console), at-risk behavior (coach), and reckless behavior (discipline). Punishing honest reporting destroys the reporting system.',
          '<b>Root cause analysis</b> is <b>retrospective</b>, done after an event, asking "why" repeatedly. <b>Failure mode and effects analysis (FMEA)</b> is <b>prospective</b>, done before implementing a process to anticipate failures.',
          '<b>Hierarchy of intervention effectiveness</b> (weakest to strongest): education and reminders → checklists and double checks → standardization → automation and computerization → <b>forcing functions</b> and physical constraints. Education alone is the weakest intervention and is rarely the best answer.',
          '<b>I-PASS</b> handoff: Illness severity, Patient summary, Action list, Situation awareness/contingency planning, Synthesis by receiver. Structured handoffs measurably reduce preventable adverse events.',
          '<b>Read-back of verbal orders and critical results</b>, avoiding trailing zeros ("1 mg," never "1.0 mg") and always using a leading zero ("0.1 mg"), and weight-based dosing in kilograms only are core pediatric medication safety practices.',
        ],
      },
      {
        t: 'Quality improvement',
        items: [
          '<b>Model for Improvement:</b> What are we trying to accomplish (aim)? How will we know a change is an improvement (measures)? What changes can we make (change ideas)? Then <b>Plan-Do-Study-Act</b> cycles.',
          '<b>A good aim statement is SMART</b> — specific, measurable, achievable, relevant, and <b>time-bound</b>, including the magnitude and deadline ("increase HPV vaccination at the 11-year visit from 45% to 70% by June 2027").',
          '<b>Three measure types:</b> <b>outcome</b> (what matters to the patient — infection rate), <b>process</b> (steps that drive the outcome — hand hygiene compliance), and <b>balancing</b> (unintended consequences elsewhere — did length of stay rise?). Questions frequently ask you to classify a given measure.',
          '<b>Run charts and control charts</b> plot data <b>over time</b>. <b>Special cause variation</b> — a signal of real change — is suggested by a shift (≥6 consecutive points on one side of the median), a trend (≥5 consecutive increasing or decreasing points), or a point beyond the control limits. <b>Common cause variation</b> is the inherent noise of a stable system.',
          '<b>Quality improvement is not research:</b> QI aims to improve local care with rapid iterative cycles and generally does not require IRB review; research aims to generate generalizable knowledge and does.',
        ],
      },
      {
        t: 'Study design and biostatistics',
        items: [
          '<b>Study designs, strongest to weakest:</b> systematic review/meta-analysis → randomized controlled trial → prospective cohort → case-control → cross-sectional → case series/report.',
          '<b>Case-control</b> studies start with the outcome and look backward; they are efficient for <b>rare diseases</b> and yield an <b>odds ratio</b>. <b>Cohort</b> studies follow exposure forward and yield <b>relative risk and incidence</b>. <b>Cross-sectional</b> studies measure <b>prevalence</b> at one point and cannot establish temporality.',
          '<b>Sensitivity</b> = true positives ÷ all with disease — a <b>highly sensitive test, when negative, rules out</b> (SnNout); good for screening. <b>Specificity</b> = true negatives ÷ all without disease — a <b>highly specific test, when positive, rules in</b> (SpPin); good for confirmation.',
          '<b>Sensitivity and specificity do not change with prevalence. Predictive values do.</b> As prevalence falls, <b>PPV falls</b> and NPV rises — this is the single most-tested statistical concept in the domain, usually framed as screening a low-prevalence population.',
          '<b>Number needed to treat = 1 ÷ absolute risk reduction.</b> If an event rate falls from 20% to 15%, the ARR is 5% and the NNT is 20.',
          '<b>Relative risk reduction exaggerates benefit</b> relative to absolute risk reduction — a drop from 2% to 1% is a 50% relative reduction but only a 1% absolute reduction (NNT 100). Expect a question that offers the impressive relative number as a distractor.',
          '<b>A 95% confidence interval that crosses 1.0</b> for a ratio measure (RR or OR), or <b>crosses 0</b> for a difference, indicates a non-significant result. Wider intervals mean less precision, usually from a smaller sample.',
          '<b>Type I error (α)</b> = a false positive, concluding an effect exists when it does not. <b>Type II error (β)</b> = a false negative, missing a real effect — usually from inadequate <b>power</b> (1 − β), which is increased by a larger sample size.',
          '<b>Bias:</b> <b>selection</b> (how subjects entered), <b>recall</b> (classic in case-control studies — cases remember exposures better), <b>observer/measurement</b>, <b>lead-time</b> (screening appears to prolong survival only by diagnosing earlier), and <b>length-time</b> (screening preferentially detects slow-growing disease). <b>Confounding</b> is a third variable related to both exposure and outcome — addressed by randomization, restriction, matching, stratification, or multivariable adjustment.',
          '<b>Intention-to-treat analysis</b> keeps participants in their assigned groups regardless of adherence, preserving randomization and giving the more conservative, real-world estimate.',
          '<b>Incidence</b> is new cases over time (risk); <b>prevalence</b> is existing cases at a point (burden). A treatment that prolongs life without curing <b>increases prevalence while incidence is unchanged</b>.',
        ],
      },
    ],
    traps: [
      'Choosing "educate the staff" or "remind everyone to be careful" as the best safety intervention — the strong answer changes the system.',
      'Applying a screening test\'s excellent sensitivity and specificity to a low-prevalence population and forgetting the PPV collapses.',
      'Confusing relative and absolute risk reduction.',
      'Mixing up prospective FMEA with retrospective root cause analysis.',
    ],
  },
];

if (typeof window !== 'undefined') {
  window.CD_PREP = window.CD_PREP || {};
  window.CD_PREP.DOMAINS = (window.CD_PREP.DOMAINS || []).concat(DOMAINS_B);
}
