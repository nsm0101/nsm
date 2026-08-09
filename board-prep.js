/*
 * CloseDose — ABP General Pediatrics Board Prep
 * Application logic: countdown, weighted domain tracker, 9-week plan,
 * high-yield browser, and the timed retrieval-practice engine.
 *
 * All progress is stored in localStorage on this device only.
 */

(function () {
  'use strict';

  var PREP = window.CD_PREP || {};
  var EXAM = PREP.EXAM;
  var DOMAINS = PREP.DOMAINS || [];
  var QUESTIONS = PREP.QUESTIONS || [];
  var CRAM = PREP.CRAM || [];
  var DIFFS = PREP.DIFFS || [];

  var TOTAL_QS = 340; // midpoint of the ABP's stated 330–350
  var STORE = 'cd-prep-v1';

  /* ------------------------------------------------------------------ *
   * Storage
   * ------------------------------------------------------------------ */
  var state = { conf: {}, weeks: {}, hist: {} };

  function load() {
    try {
      var raw = window.localStorage.getItem(STORE);
      if (raw) {
        var parsed = JSON.parse(raw);
        state.conf = parsed.conf || {};
        state.weeks = parsed.weeks || {};
        state.hist = parsed.hist || {};
      }
    } catch (e) { /* private mode or corrupt data — run with defaults */ }
  }

  function save() {
    try { window.localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) { /* quota or private mode */ }
  }

  /* ------------------------------------------------------------------ *
   * Small helpers
   * ------------------------------------------------------------------ */
  function el(id) { return document.getElementById(id); }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function qCount(weight) { return Math.round(TOTAL_QS * weight / 100); }

  function confOf(id) {
    var v = state.conf[id];
    return (v === 0 || v) ? v : null;
  }

  function riskOf(d) {
    var c = confOf(d.id);
    var effective = (c === null) ? 2 : c; // unrated counts as neutral
    return qCount(d.weight) * (1 - effective / 4);
  }

  function domainById(id) {
    for (var i = 0; i < DOMAINS.length; i++) if (DOMAINS[i].id === id) return DOMAINS[i];
    return null;
  }

  /* ------------------------------------------------------------------ *
   * Countdown
   * ------------------------------------------------------------------ */
  function renderCountdown() {
    var box = el('countdown');
    if (!box) return;
    var target = new Date(EXAM.date).getTime();

    function tick() {
      var diff = target - Date.now();
      if (diff < 0) diff = 0;
      var days = Math.floor(diff / 86400000);
      var hours = Math.floor((diff % 86400000) / 3600000);
      var weeks = Math.floor(days / 7);
      var studyHours = Math.round(days / 7 * 12.5); // midpoint of the 10–15 h/wk budget

      box.innerHTML =
        cdBox(days, days === 1 ? 'day left' : 'days left') +
        cdBox(weeks + 'w ' + (days % 7) + 'd', 'to go') +
        cdBox(hours, 'hours') +
        cdBox('~' + studyHours, 'study hrs left');
    }

    function cdBox(n, label) {
      return '<div class="cd-box"><span class="cd-num">' + esc(n) + '</span><span class="cd-lab">' + esc(label) + '</span></div>';
    }

    tick();
    window.setInterval(tick, 60000);
  }

  /* ------------------------------------------------------------------ *
   * Tabs
   * ------------------------------------------------------------------ */
  function initTabs() {
    var tabs = document.querySelectorAll('.tab');
    Array.prototype.forEach.call(tabs, function (t) {
      t.addEventListener('click', function () {
        Array.prototype.forEach.call(tabs, function (x) { x.setAttribute('aria-selected', 'false'); });
        t.setAttribute('aria-selected', 'true');
        Array.prototype.forEach.call(document.querySelectorAll('.panel'), function (p) { p.classList.remove('active'); });
        var panel = el(t.dataset.panel);
        if (panel) panel.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * The 9-week plan
   * ------------------------------------------------------------------ */
  var WEEKS = [
    {
      n: 1, dates: 'Aug 10 – 16',
      focus: 'Baseline + Preventive Pediatrics / Well-Child Care (12%)',
      items: [
        '<strong>Day 1: take a 60-question mixed diagnostic block, timed.</strong> Do not study first. The score is not the point — the per-domain breakdown is. Use it to set your initial confidence ratings on the <em>Where the Points Are</em> tab. (If you have an ABP performance profile from a prior attempt, use that too — it is better data than any self-rating.)',
        'Start the error log today. Every miss for the next nine weeks goes in it with a categorized reason.',
        'Preventive Pediatrics is the largest domain on the exam (~41 questions) and is being covered first so it gets the most spaced revisits. Cover: developmental milestones and red flags, the immunization schedule with contraindications vs. precautions, screening ages, nutrition and supplementation, growth norms, and anticipatory guidance.',
        'Drill milestones until you can produce them by age, not just recognize them. Same for the screening ages — these are pure recall and they are free points.',
        '<strong>Target: 150–200 questions this week.</strong>'
      ]
    },
    {
      n: 2, dates: 'Aug 17 – 23',
      focus: 'EENT (6%) + Infectious Diseases (7%)',
      items: [
        'These two together are 13% of the exam — more than any other pairing. EENT is the domain most commonly under-studied relative to its weight.',
        'EENT: AOM diagnostic criteria and the observation option, sinusitis\' three qualifying patterns, preseptal vs. orbital cellulitis, leukocoria, neonatal conjunctivitis by timing, OME and tube indications, croup vs. epiglottitis vs. tracheitis, retropharyngeal vs. peritonsillar abscess, and neck masses.',
        'ID: the fever-and-rash differential as a single table you can reproduce, congenital infections (one distinguishing finding each), empiric therapy by age and syndrome, and post-exposure prophylaxis.',
        'Interleave 20 Preventive questions into every session this week — first spaced revisit.',
        '<strong>Target: 200 questions.</strong>'
      ]
    },
    {
      n: 3, dates: 'Aug 24 – 30',
      focus: 'Mental & Behavioral Health (6%) + Cardiology (5%) — timed blocks begin',
      items: [
        '<strong>Switch to strictly timed blocks this week and stay there.</strong> 40 questions at 70 seconds each, no pausing, no lookups mid-block. Review only after the block ends. This is where pacing and anxiety training actually begins.',
        'Mental & Behavioral Health has been weighted up in the current blueprint and is now larger than cardiology. Cover ADHD treatment by age, autism screening and the simultaneous-referral rule, SSRI facts and the black box warning, eating disorder admission criteria and refeeding syndrome, and substance use screening.',
        'Cardiology: innocent vs. pathologic murmurs (including which maneuvers change which murmur), cyanotic lesions, ductal-dependent lesions and PGE1, syncope red flags, and the BP and lipid screening rules.',
        'Revisit: 20 EENT + 20 ID questions interleaved.',
        '<strong>Target: 200 questions.</strong>'
      ]
    },
    {
      n: 4, dates: 'Aug 31 – Sep 6',
      focus: 'Pulmonology (5%) + Gastroenterology (5%) + Adolescent (5%)',
      items: [
        'Pulmonology: asthma classification and stepwise therapy (know the 2020 NAEPP updates), the bronchiolitis "do not do" list, croup, CAP, cystic fibrosis, and foreign body aspiration.',
        'GI: the vomiting algorithm by age and character — bilious vs. non-bilious is the highest-yield fork on the exam — plus constipation/encopresis, celiac, IBD, and biliary atresia\'s 60-day window.',
        'Adolescent: Tanner staging and the sequence of puberty, confidentiality rules, contraception (LARC first-line, no exam required), and delayed/precocious puberty.',
        'Revisit: 20 Preventive + 20 Mental Health questions.',
        '<strong>Target: 200 questions. Halfway checkpoint — review your error log\'s reason categories. If most misses are not knowledge gaps, shift hours from content to technique.</strong>'
      ]
    },
    {
      n: 5, dates: 'Sep 7 – 13',
      focus: 'Neurology (4%) + Dermatology (4%) + Orthopedics & Sports (4%)',
      items: [
        'Neurology: simple vs. complex febrile seizures and the "no workup" rule, epilepsy syndromes with their EEG findings and first-line drugs, headache red flags, and the neurocutaneous syndromes.',
        'Dermatology: this is pure visual pattern recognition and is fast to study — neonatal rashes, hemangioma treatment indications, eczema and eczema herpeticum, tinea, scabies, and the SSSS vs. SJS distinction.',
        'Ortho: the limping child by age (DDH → transient synovitis vs. septic arthritis → Perthes → SCFE), supracondylar fractures, concussion return-to-play, and preparticipation cardiac screening.',
        'Revisit: 20 Cardiology + 20 Pulmonology questions.',
        '<strong>Target: 200 questions.</strong>'
      ]
    },
    {
      n: 6, dates: 'Sep 14 – 20',
      focus: 'Fetal & Neonatal (4%) + Emergency (4%) + Child Abuse (3%) + Psychosocial (3%)',
      items: [
        'Neonatal: jaundice (first 24 hours, direct fraction, breastfeeding vs. breast milk), respiratory distress by timing and film, cyanosis and the hyperoxia test, and birth injuries.',
        'Emergency: shock recognition and the fact that hypotension is late, anaphylaxis, the toxidromes and antidotes, BRUE lower-risk criteria, status epilepticus, and DKA including cerebral edema.',
        'Child Abuse is only 3% but is the highest points-per-hour domain on the exam — the findings are specific and repeatedly tested. Learn the high-specificity fractures, TEN-4-FACESp, sentinel injuries, and the reporting threshold.',
        'Psychosocial: interpreter rules, food insecurity screening plus resource connection, ACEs, foster care, and developmental understanding of death.',
        'Revisit: 20 Neuro + 20 GI questions.',
        '<strong>Target: 200 questions.</strong>'
      ]
    },
    {
      n: 7, dates: 'Sep 21 – 27',
      focus: 'Heme-Onc + Allergy/Immunology + Endocrinology + Nephrology (3% each) — FULL SIMULATION #1',
      items: [
        '<strong>Set aside one full day for simulation #1: four 105-minute blocks with 15-minute breaks, in one sitting, starting at your real exam start time.</strong> The purpose is the fourth block. Do not split it across days.',
        'Heme-Onc: anemia sorted by MCV, sickle cell complications (the reticulocyte count is the discriminator), ITP vs. leukemia, and the oncologic emergencies.',
        'Allergy/Immunology: anaphylaxis criteria and IM epinephrine first, and the immunodeficiency-by-organism mapping — this mapping alone answers most questions in the domain.',
        'Endocrine: short stature sorted by growth velocity and bone age, precocious puberty (MRI in boys), CAH salt-wasting crisis, and congenital hypothyroidism.',
        'Nephrology: isotonic maintenance fluids, PSGN vs. IgA nephropathy by timing and complement, nephrotic syndrome without biopsy, and HUS.',
        '<strong>Spend the day after the simulation doing nothing but reviewing it.</strong> Note where in the four blocks your accuracy dropped — that number drives Week 8.',
        '<strong>Target: 150 questions plus the simulation.</strong>'
      ]
    },
    {
      n: 8, dates: 'Sep 28 – Oct 4',
      focus: 'GU (3%) + Genetics, Rheumatology, Ethics, QI/Statistics (2% each) — FULL SIMULATION #2',
      items: [
        'These five small domains total 11% — about 37 questions — and they are the most formulaic content on the exam. Ethics and QI/statistics in particular reward a couple of focused hours far more than any subspecialty would.',
        'GU: UTI diagnosis and the imaging rules, testicular torsion (operate, don\'t image), cryptorchidism timing, and adolescent gynecology.',
        'Genetics: inheritance patterns, the recognizable syndromes, and the inborn-errors decision tree built on glucose, ammonia, and acidosis.',
        'Rheumatology: JIA subtypes and the uveitis screening rule, macrophage activation syndrome, HSP, SLE serologies, and PFAPA.',
        'Ethics: assent and consent, best-interest standard, error disclosure, and end-of-life communication.',
        'QI/Statistics: sensitivity vs. specificity vs. predictive values and prevalence, NNT, study designs, bias types, PDSA, and measure classification. Drill the calculations until they\'re automatic.',
        '<strong>Full simulation #2 at the end of the week.</strong> Compare block-4 accuracy against simulation #1.',
        '<strong>Target: 150 questions plus the simulation.</strong>'
      ]
    },
    {
      n: 9, dates: 'Oct 5 – 11',
      focus: 'Data-driven weak-area blitz and consolidation',
      items: [
        '<strong>No new material this week.</strong> Sort the <em>Where the Points Are</em> table by risk and work strictly from the top down.',
        'Re-drill every domain where your question accuracy is below 70%, weighted by exam percentage — a 60% in Preventive Pediatrics costs roughly four times what a 60% in Rheumatology costs.',
        'Read your entire error log twice this week. By now it is a better study guide than any review book, because it is a map of your specific failure modes.',
        'Re-read the trap lists at the bottom of each domain in the <em>High-Yield</em> tab, and the recurring answer patterns in <em>Question Technique</em>.',
        'Do two or three timed 85-question blocks to hold your pace, but taper total volume through the week.',
        'Confirm all test-day logistics — ID, appointment, route, parking. Nothing logistical should be unresolved after this week.',
        '<strong>Target: 150 questions, tapering.</strong>'
      ]
    },
    {
      n: 10, dates: 'Oct 12 – 14', final: true,
      focus: 'Taper and execute',
      items: [
        '<strong>Mon Oct 12:</strong> Error log only, 2 hours maximum. No new material. Confirm the route and lay out your ID.',
        '<strong>Tue Oct 13:</strong> Error log and trap lists, 2 hours, finished by early afternoon. Something unrelated in the evening. Two alarms. Protect this night\'s sleep — and remember the night before <em>that</em> mattered too.',
        '<strong>Wed Oct 14 — exam day:</strong> Normal breakfast. Arrive early. Planned snacks for each break. No studying in the parking lot. Check the clock at questions 20, 40, and 60 only. Flag and move. Answer every question.',
        'You have prepared for this in proportion to how the exam is actually built. Trust the pacing rules and work the procedure.'
      ]
    }
  ];

  function renderWeeks() {
    var host = el('weeks');
    if (!host) return;
    host.innerHTML = WEEKS.map(function (w) {
      var done = !!state.weeks[w.n];
      return '<div class="week' + (done ? ' done' : '') + '" data-week="' + w.n + '">' +
        '<div class="week-head">' +
          '<span class="week-num">' + (w.final ? 'Final days' : 'Week ' + w.n) + '</span>' +
          '<span class="week-dates">' + esc(w.dates) + '</span>' +
          '<span class="week-focus">' + esc(w.focus) + '</span>' +
        '</div>' +
        '<ul>' + w.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>' +
        '<label class="chk"><input type="checkbox" data-week-chk="' + w.n + '"' + (done ? ' checked' : '') + '> Completed</label>' +
      '</div>';
    }).join('');

    Array.prototype.forEach.call(host.querySelectorAll('[data-week-chk]'), function (cb) {
      cb.addEventListener('change', function () {
        state.weeks[cb.dataset.weekChk] = cb.checked;
        save();
        var block = cb.closest('.week');
        if (block) block.classList.toggle('done', cb.checked);
        weekProgress();
      });
    });
    weekProgress();
  }

  function weekProgress() {
    var p = el('weekProgress');
    if (!p) return;
    var done = WEEKS.filter(function (w) { return state.weeks[w.n]; }).length;
    p.textContent = done + ' of ' + WEEKS.length + ' blocks completed.';
  }

  /* ------------------------------------------------------------------ *
   * Domain table
   * ------------------------------------------------------------------ */
  function sortedDomains(mode) {
    var list = DOMAINS.slice();
    if (mode === 'weight') list.sort(function (a, b) { return b.weight - a.weight || a.id - b.id; });
    else if (mode === 'id') list.sort(function (a, b) { return a.id - b.id; });
    else if (mode === 'conf') {
      list.sort(function (a, b) {
        var ca = confOf(a.id), cb = confOf(b.id);
        ca = (ca === null) ? -1 : ca;
        cb = (cb === null) ? -1 : cb;
        return ca - cb || b.weight - a.weight;
      });
    } else list.sort(function (a, b) { return riskOf(b) - riskOf(a) || b.weight - a.weight; });
    return list;
  }

  function renderDomTable() {
    var body = el('domTable');
    if (!body) return;
    var mode = el('sortBy') ? el('sortBy').value : 'risk';
    var maxW = Math.max.apply(null, DOMAINS.map(function (d) { return d.weight; }));

    body.innerHTML = sortedDomains(mode).map(function (d) {
      var qs = qCount(d.weight);
      var c = confOf(d.id);
      var risk = riskOf(d);
      var cls = risk >= 12 ? 'risk-hi' : (risk >= 6 ? 'risk-md' : 'risk-lo');

      var buttons = '';
      for (var i = 0; i <= 4; i++) {
        buttons += '<button type="button" data-conf="' + d.id + '" data-val="' + i + '" ' +
          'aria-pressed="' + (c === i ? 'true' : 'false') + '" ' +
          'aria-label="' + esc(d.name) + ' confidence ' + i + ' of 4">' + i + '</button>';
      }

      return '<tr>' +
        '<td><strong>' + d.id + '. ' + esc(d.name) + '</strong></td>' +
        '<td class="num">' + d.weight + '%</td>' +
        '<td class="num">~' + qs + '</td>' +
        '<td><span class="bar"><span style="width:' + Math.round(d.weight / maxW * 100) + '%"></span></span></td>' +
        '<td><div class="conf">' + buttons + '</div></td>' +
        '<td class="num ' + cls + '">' + risk.toFixed(1) + '</td>' +
      '</tr>';
    }).join('');

    Array.prototype.forEach.call(body.querySelectorAll('[data-conf]'), function (b) {
      b.addEventListener('click', function () {
        var id = parseInt(b.dataset.conf, 10);
        var val = parseInt(b.dataset.val, 10);
        if (confOf(id) === val) delete state.conf[id]; else state.conf[id] = val;
        save();
        renderDomTable();
        renderRiskStats();
      });
    });
  }

  function renderRiskStats() {
    var host = el('riskStats');
    if (!host) return;
    var totalRisk = DOMAINS.reduce(function (s, d) { return s + riskOf(d); }, 0);
    var rated = DOMAINS.filter(function (d) { return confOf(d.id) !== null; }).length;
    var top = sortedDomains('risk')[0];
    var projected = Math.max(0, Math.round((TOTAL_QS - totalRisk) / TOTAL_QS * 100));

    host.innerHTML =
      stat(Math.round(totalRisk), 'Questions at risk') +
      stat(projected + '%', 'Rough projected score') +
      stat(rated + '/' + DOMAINS.length, 'Domains rated') +
      stat(top ? ('#' + top.id) : '—', 'Highest-risk domain');
  }

  function stat(v, label) {
    return '<div class="stat"><b>' + esc(v) + '</b><span>' + esc(label) + '</span></div>';
  }

  /* ------------------------------------------------------------------ *
   * High-yield browser
   * ------------------------------------------------------------------ */
  function renderHighYield() {
    var host = el('hyList');
    if (!host) return;
    var mode = el('hySort') ? el('hySort').value : 'weight';

    host.innerHTML = sortedDomains(mode).map(function (d) {
      var groups = (d.pearls || []).map(function (g) {
        return '<div class="pearl-group"><h4>' + esc(g.t) + '</h4><ul>' +
          g.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') +
        '</ul></div>';
      }).join('');

      var traps = (d.traps && d.traps.length)
        ? '<div class="traps"><h4>How this domain is disguised on the exam</h4><ul>' +
          d.traps.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></div>'
        : '';

      return '<details class="dom" data-dom="' + d.id + '">' +
        '<summary><span class="wt">' + d.weight + '%</span> ' + d.id + '. ' + esc(d.name) +
          '<span class="qcount">~' + qCount(d.weight) + ' questions</span></summary>' +
        '<div class="dom-body">' +
          '<p class="why">' + esc(d.why) + '</p>' + groups + traps +
        '</div>' +
      '</details>';
    }).join('');
  }

  /* ------------------------------------------------------------------ *
   * Cram sheet
   * ------------------------------------------------------------------ */
  function renderCram() {
    var host = el('cramList');
    if (!host) return;

    host.innerHTML = CRAM.map(function (s) {
      var body = (s.note ? '<p class="sec-note">' + s.note + '</p>' : '') +
        s.blocks.map(function (b) {
          var title = b.t ? '<h4 class="blk-title">' + esc(b.t) + '</h4>' : '';
          if (b.k === 'list') {
            return title + '<ul>' + b.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>';
          }
          return title + '<div class="table-scroll"><table><thead><tr>' +
            b.cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') +
            '</tr></thead><tbody>' +
            b.rows.map(function (r) {
              return '<tr>' + r.map(function (cell) { return '<td>' + cell + '</td>'; }).join('') + '</tr>';
            }).join('') +
            '</tbody></table></div>';
        }).join('');

      return '<details class="sec" data-cram="' + s.id + '">' +
        '<summary>' + esc(s.t) + '</summary>' +
        '<div class="sec-body">' + body + '</div>' +
      '</details>';
    }).join('');

    updateCramCount();
  }

  function updateCramCount() {
    var p = el('cramCount');
    if (!p) return;
    var shown = document.querySelectorAll('#cramList details.sec:not(.hidden)').length;
    p.textContent = shown + ' of ' + CRAM.length + ' sections shown.';
  }

  /* ------------------------------------------------------------------ *
   * Discriminator tables
   * ------------------------------------------------------------------ */
  function sortedDiffs(mode) {
    var list = DIFFS.slice();
    if (mode === 'az') {
      list.sort(function (a, b) { return a.t.localeCompare(b.t); });
    } else {
      list.sort(function (a, b) {
        var da = domainById(a.d), db = domainById(b.d);
        var wa = da ? da.weight : 0, wb = db ? db.weight : 0;
        return wb - wa || a.d - b.d || a.t.localeCompare(b.t);
      });
    }
    return list;
  }

  function renderDiffs() {
    var host = el('diffList');
    if (!host) return;
    var mode = el('diffSort') ? el('diffSort').value : 'weight';

    host.innerHTML = sortedDiffs(mode).map(function (x) {
      var d = domainById(x.d);
      // Default shape: each row starts with a feature label, so the header gets a
      // leading blank cell. `noLabel` tables are plain lookups with no label column.
      var head = '<tr>' + (x.noLabel ? '' : '<th></th>') +
        x.cols.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr>';
      var body = x.rows.map(function (r) {
        return '<tr>' + r.map(function (cell, i) {
          return i === 0 ? '<td>' + cell + '</td>' : '<td>' + cell + '</td>';
        }).join('') + '</tr>';
      }).join('');

      return '<details class="sec" data-diff="' + x.id + '">' +
        '<summary>' + esc(x.t) +
          '<span class="diff-tag">' + esc(d ? d.name : '') + ' &middot; ' + (d ? d.weight : '?') + '%</span>' +
        '</summary>' +
        '<div class="sec-body">' +
          '<div class="table-scroll"><table><thead>' + head + '</thead><tbody>' + body + '</tbody></table></div>' +
          '<div class="tell"><b class="lab">The tell</b>' + x.tell + '</div>' +
        '</div>' +
      '</details>';
    }).join('');

    updateDiffCount();
  }

  function updateDiffCount() {
    var p = el('diffCount');
    if (!p) return;
    var shown = document.querySelectorAll('#diffList details.sec:not(.hidden)').length;
    p.textContent = shown + ' of ' + DIFFS.length + ' tables shown.';
  }

  /* Condensed view: every "tell" as a single scannable list — the final-week read. */
  var tellsOnly = false;
  function showTellsOnly() {
    var host = el('diffList');
    var btn = el('diffTells');
    if (!host) return;
    tellsOnly = !tellsOnly;

    if (!tellsOnly) {
      if (btn) btn.textContent = 'Tells only';
      renderDiffs();
      return;
    }

    if (btn) btn.textContent = 'Back to tables';
    var mode = el('diffSort') ? el('diffSort').value : 'weight';
    host.innerHTML = '<div class="card"><h2>Every tell, in one list</h2>' +
      '<p class="lede">' + DIFFS.length + ' discriminators, condensed. If you read one thing the morning of the exam, read this.</p>' +
      sortedDiffs(mode).map(function (x) {
        var d = domainById(x.d);
        return '<div class="tell"><b class="lab">' + esc(x.t) +
          ' &middot; ' + esc(d ? d.name : '') + '</b>' + x.tell + '</div>';
      }).join('') +
    '</div>';
    var p = el('diffCount');
    if (p) p.textContent = DIFFS.length + ' tells shown.';
  }

  /* Filter <details> blocks by a plain-text query over their rendered text. */
  function filterSections(listId, query, after) {
    var q = (query || '').trim().toLowerCase();
    var nodes = document.querySelectorAll('#' + listId + ' details.sec');
    Array.prototype.forEach.call(nodes, function (n) {
      if (!q) {
        n.classList.remove('hidden');
        n.open = false;
        return;
      }
      var match = n.textContent.toLowerCase().indexOf(q) !== -1;
      n.classList.toggle('hidden', !match);
      n.open = match;
    });
    if (after) after();
  }

  /* ------------------------------------------------------------------ *
   * One-line summaries (Test Day tab)
   * ------------------------------------------------------------------ */
  var ONE_LINERS = {
    1: 'Milestones by age with red flags; contraindication vs. precaution; the exact screening ages.',
    2: 'Jaundice &lt;24 h is always pathologic; fractionate the bilirubin past 2 weeks; bilious emesis is a volvulus.',
    3: 'Girls peak before menarche, boys peak late; LARC first-line, no exam required; confidentiality breaks only for harm or abuse.',
    4: 'The fever-and-rash table; congenital infections one finding each; doxycycline at any age for RMSF and Lyme.',
    5: 'Behavioral therapy first at ages 4–5; three simultaneous referrals for a positive autism screen; bradycardia admits the eating disorder.',
    6: 'Professional interpreter always; screening is paired with a resource; preschoolers think death is reversible.',
    7: 'IM epinephrine first; hypotension is late in shock; no insulin bolus, and treat cerebral edema before imaging.',
    8: 'Metaphyseal and posterior rib fractures; any bruise under 4 months; report on suspicion, not proof.',
    9: 'Knee pain plus a normal knee exam means image the hip; Kocher criteria; no same-day return to play.',
    10: 'Bulging drum makes the AOM; three patterns qualify sinusitis; pain with eye movement means orbital.',
    11: 'A murmur louder on standing is HCM; PGE1 for ductal-dependent lesions; ECG first in syncope.',
    12: 'All persistent asthma needs a controller; the bronchiolitis do-not-do list; a normal film never excludes aspiration.',
    13: 'Bilious emesis is a volvulus; fix the alkalosis before pyloromyotomy; Kasai before 60 days.',
    14: 'Simple febrile seizure needs no workup; hypsarrhythmia means spasms and urgency; progressive weakness is not cerebral palsy.',
    15: 'Mucosal sparing means SSSS, not SJS; tinea capitis needs oral therapy; normal platelets separate HSP from ITP.',
    16: 'Fever in sickle cell is ceftriaxone now; a low reticulocyte count means parvovirus; no calcium in tumor lysis.',
    17: 'The organism names the defect; epinephrine even without a rash; never a live vaccine in suspected SCID.',
    18: 'Growth velocity and bone age sort short stature; MRI for central precocity in boys; treat congenital hypothyroidism immediately.',
    19: 'Isotonic maintenance fluid; PSGN follows by weeks with a low C3, IgA is concurrent with normal complement; no antibiotics in bloody diarrhea.',
    20: 'Classic torsion goes to the OR, not to ultrasound; RBUS only after a first febrile UTI; heavy menses from menarche means von Willebrand.',
    21: 'Ammonia with respiratory alkalosis is a urea cycle defect; microarray plus fragile X first-tier; echo the aortic root in Marfan.',
    22: 'Slit-lamp screening in ANA-positive oligoarticular JIA; a falling ESR with a rising ferritin is MAS; a positive ANA alone is not lupus.',
    23: 'Assent from about age 7; treat first and seek the court order concurrently; disclose errors even without harm.',
    24: 'Prevalence moves predictive values, not sensitivity or specificity; NNT is 1 over the absolute risk reduction; fix the system, not the person.'
  };

  function renderOneLiners() {
    var body = el('oneLiners');
    if (!body) return;
    body.innerHTML = DOMAINS.slice().sort(function (a, b) { return b.weight - a.weight || a.id - b.id; })
      .map(function (d) {
        return '<tr><td class="num"><strong>' + d.weight + '%</strong></td>' +
          '<td><strong>' + esc(d.name) + '</strong></td>' +
          '<td>' + (ONE_LINERS[d.id] || '') + '</td></tr>';
      }).join('');
  }

  /* ------------------------------------------------------------------ *
   * Quiz engine
   * ------------------------------------------------------------------ */
  var quiz = { queue: [], idx: 0, current: null, answered: false, t0: 0, timer: null };

  function hist(qid) {
    return state.hist[qid] || { seen: 0, right: 0, wrong: 0 };
  }

  function weightedPickDomain(pool) {
    // Choose a domain in proportion to blueprint weight, restricted to domains
    // that still have questions available in the pool.
    var avail = {};
    pool.forEach(function (q) { avail[q.d] = true; });
    var candidates = DOMAINS.filter(function (d) { return avail[d.id]; });
    if (!candidates.length) return null;
    var total = candidates.reduce(function (s, d) { return s + d.weight; }, 0);
    var r = Math.random() * total;
    for (var i = 0; i < candidates.length; i++) {
      r -= candidates[i].weight;
      if (r <= 0) return candidates[i].id;
    }
    return candidates[candidates.length - 1].id;
  }

  function buildQueue(mode, domainId) {
    var pool = QUESTIONS.slice();

    if (mode === 'single' && domainId) {
      pool = pool.filter(function (q) { return q.d === domainId; });
      return shuffle(pool);
    }
    if (mode === 'missed') {
      pool = pool.filter(function (q) { return hist(q.id).wrong > 0; });
      return shuffle(pool);
    }
    if (mode === 'unseen') {
      pool = pool.filter(function (q) { return hist(q.id).seen === 0; });
      return shuffle(pool);
    }
    if (mode === 'weak') {
      var order = sortedDomains('risk').map(function (d) { return d.id; });
      return pool.sort(function (a, b) {
        var da = order.indexOf(a.d), db = order.indexOf(b.d);
        if (da !== db) return da - db;
        return Math.random() - 0.5;
      });
    }

    // Weighted mixed: draw domains by blueprint weight, preferring questions
    // that are unseen or previously missed.
    var out = [];
    var remaining = pool.slice();
    while (remaining.length) {
      var dId = weightedPickDomain(remaining);
      if (dId === null) break;
      var inDomain = remaining.filter(function (q) { return q.d === dId; });
      inDomain.sort(function (a, b) {
        return priority(b) - priority(a) || Math.random() - 0.5;
      });
      var chosen = inDomain[0];
      out.push(chosen);
      remaining = remaining.filter(function (q) { return q.id !== chosen.id; });
    }
    return out;
  }

  function priority(q) {
    var h = hist(q.id);
    if (h.seen === 0) return 2;      // never seen — highest value
    if (h.wrong > h.right) return 3; // missed more than hit — highest of all
    if (h.wrong > 0) return 1;
    return 0;                        // reliably correct — lowest
  }

  function shuffle(a) {
    var arr = a.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function startQuiz() {
    var mode = el('quizMode').value;
    var dId = parseInt(el('quizDomain').value, 10) || null;
    quiz.queue = buildQueue(mode, dId);
    quiz.idx = 0;

    if (!quiz.queue.length) {
      el('quizArea').innerHTML = '<div class="callout warn"><p>No questions match that filter yet. ' +
        (mode === 'missed' ? 'You have not missed any questions — try mixed mode.' :
         mode === 'unseen' ? 'You have seen every question in the bank. Try mixed mode or "questions I\'ve missed."' :
         'Try a different mode.') + '</p></div>';
      return;
    }
    showQuestion();
  }

  function showQuestion() {
    if (quiz.idx >= quiz.queue.length) { showQuizDone(); return; }
    var q = quiz.queue[quiz.idx];
    quiz.current = q;
    quiz.answered = false;
    quiz.t0 = Date.now();

    var d = domainById(q.d);
    var letters = ['A', 'B', 'C', 'D', 'E'];

    // Shuffle option order on every presentation. Explanations describe the
    // content of the correct answer rather than its position, so this is safe —
    // and it stops position from becoming a cue on repeat exposure.
    quiz.order = shuffle(q.o.map(function (_, i) { return i; }));
    quiz.correctIdx = quiz.order.indexOf(q.a);

    el('quizArea').innerHTML =
      '<div class="q-meta">' +
        '<span>Question ' + (quiz.idx + 1) + ' of ' + quiz.queue.length + '</span>' +
        '<span>' + esc(d ? d.name : '') + ' &middot; ' + (d ? d.weight : '?') + '% of exam</span>' +
        '<span class="q-timer" id="qTimer">0:00</span>' +
      '</div>' +
      '<p class="q-stem">' + esc(q.q) + '</p>' +
      '<ul class="opts" id="opts">' +
        quiz.order.map(function (origIdx, i) {
          return '<li><button class="opt" type="button" data-opt="' + i + '">' +
            '<span class="letter">' + letters[i] + '</span><span>' + esc(q.o[origIdx]) + '</span></button></li>';
        }).join('') +
      '</ul>' +
      '<div id="afterAnswer"></div>';

    Array.prototype.forEach.call(document.querySelectorAll('#opts .opt'), function (b) {
      b.addEventListener('click', function () { answer(parseInt(b.dataset.opt, 10)); });
    });

    startTimer();
  }

  function startTimer() {
    stopTimer();
    if (!el('timerOn') || !el('timerOn').checked) {
      var t0 = el('qTimer'); if (t0) t0.style.display = 'none';
      return;
    }
    quiz.timer = window.setInterval(function () {
      var node = el('qTimer');
      if (!node) { stopTimer(); return; }
      var s = Math.floor((Date.now() - quiz.t0) / 1000);
      node.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
      node.classList.toggle('over', s > 70);
    }, 250);
  }

  function stopTimer() {
    if (quiz.timer) { window.clearInterval(quiz.timer); quiz.timer = null; }
  }

  function answer(choice) {
    if (quiz.answered) return;
    quiz.answered = true;
    stopTimer();

    var q = quiz.current;
    var correct = choice === quiz.correctIdx;
    var secs = Math.round((Date.now() - quiz.t0) / 1000);

    var h = state.hist[q.id] || { seen: 0, right: 0, wrong: 0 };
    h.seen++;
    if (correct) h.right++; else h.wrong++;
    state.hist[q.id] = h;
    save();

    Array.prototype.forEach.call(document.querySelectorAll('#opts .opt'), function (b) {
      var i = parseInt(b.dataset.opt, 10);
      b.disabled = true;
      if (i === quiz.correctIdx) b.classList.add('correct');
      else if (i === choice) b.classList.add('wrong');
    });

    var pace = secs > 74
      ? ' <span class="muted">(' + secs + 's — over the 74-second exam average)</span>'
      : ' <span class="muted">(' + secs + 's)</span>';

    el('afterAnswer').innerHTML =
      '<div class="expl">' +
        '<strong class="verdict ' + (correct ? 'ok' : 'no') + '">' +
          (correct ? 'Correct' : 'Incorrect') + pace + '</strong>' +
        esc(q.e).replace(/\n/g, '<br>') +
      '</div>' +
      (correct ? '' : '<div class="callout warn"><p><strong>Log this one.</strong> Write the fact, the reason you missed it (knowledge gap / misread the stem / answered a different question / second-guessed / rushed), and the one-sentence correction.</p></div>') +
      '<button class="btn primary" id="nextQ" type="button">Next question</button>';

    el('nextQ').addEventListener('click', function () {
      quiz.idx++;
      showQuestion();
    });

    renderQuizStats();
    renderPerf();
  }

  function showQuizDone() {
    stopTimer();
    el('quizArea').innerHTML = '<div class="callout"><p><strong>Set complete.</strong> ' +
      'Before you start another set, go through your error log for this block — the review is where the learning happens, not the answering.</p></div>' +
      '<button class="btn primary" id="againBtn" type="button">Start another set</button>';
    el('againBtn').addEventListener('click', startQuiz);
    renderQuizStats();
    renderPerf();
  }

  function renderQuizStats() {
    var host = el('quizStats');
    if (!host) return;
    var seen = 0, right = 0, attempts = 0;
    Object.keys(state.hist).forEach(function (k) {
      var h = state.hist[k];
      if (h.seen > 0) seen++;
      right += h.right;
      attempts += h.seen;
    });
    var pct = attempts ? Math.round(right / attempts * 100) : 0;

    host.innerHTML =
      stat(attempts, 'Questions answered') +
      stat(pct + '%', 'Overall accuracy') +
      stat(seen + '/' + QUESTIONS.length, 'Bank covered') +
      stat(QUESTIONS.length - seen, 'Never attempted');
  }

  function renderPerf() {
    var body = el('perfTable');
    if (!body) return;

    var byDom = {};
    QUESTIONS.forEach(function (q) {
      var h = state.hist[q.id];
      if (!h || !h.seen) return;
      if (!byDom[q.d]) byDom[q.d] = { a: 0, c: 0 };
      byDom[q.d].a += h.seen;
      byDom[q.d].c += h.right;
    });

    var rows = Object.keys(byDom).map(function (k) {
      var d = domainById(parseInt(k, 10));
      var s = byDom[k];
      var pct = Math.round(s.c / s.a * 100);
      return { d: d, a: s.a, c: s.c, pct: pct };
    }).sort(function (x, y) { return x.pct - y.pct; });

    if (!rows.length) {
      body.innerHTML = '<tr><td colspan="5" class="muted">No questions answered yet.</td></tr>';
      return;
    }

    body.innerHTML = rows.map(function (r) {
      var cls = r.pct < 60 ? 'risk-hi' : (r.pct < 75 ? 'risk-md' : 'risk-lo');
      return '<tr>' +
        '<td><strong>' + esc(r.d ? r.d.name : '?') + '</strong> <span class="muted">(' + (r.d ? r.d.weight : '?') + '%)</span></td>' +
        '<td class="num">' + r.a + '</td>' +
        '<td class="num">' + r.c + '</td>' +
        '<td class="num ' + cls + '">' + r.pct + '%</td>' +
        '<td><span class="bar"><span style="width:' + r.pct + '%"></span></span></td>' +
      '</tr>';
    }).join('');
  }

  /* ------------------------------------------------------------------ *
   * Wiring
   * ------------------------------------------------------------------ */
  function initControls() {
    if (el('sortBy')) el('sortBy').addEventListener('change', renderDomTable);
    if (el('hySort')) el('hySort').addEventListener('change', renderHighYield);

    if (el('resetConf')) el('resetConf').addEventListener('click', function () {
      if (!window.confirm('Clear all of your confidence ratings?')) return;
      state.conf = {}; save(); renderDomTable(); renderRiskStats(); renderHighYield();
    });

    if (el('expandAll')) el('expandAll').addEventListener('click', function () {
      Array.prototype.forEach.call(document.querySelectorAll('details.dom'), function (d) { d.open = true; });
    });
    if (el('collapseAll')) el('collapseAll').addEventListener('click', function () {
      Array.prototype.forEach.call(document.querySelectorAll('details.dom'), function (d) { d.open = false; });
    });

    /* --- Cram sheet --- */
    if (el('cramFind')) el('cramFind').addEventListener('input', function () {
      filterSections('cramList', this.value, updateCramCount);
    });
    if (el('cramExpand')) el('cramExpand').addEventListener('click', function () {
      Array.prototype.forEach.call(document.querySelectorAll('#cramList details.sec'), function (d) { d.open = true; });
    });
    if (el('cramCollapse')) el('cramCollapse').addEventListener('click', function () {
      Array.prototype.forEach.call(document.querySelectorAll('#cramList details.sec'), function (d) { d.open = false; });
    });
    if (el('cramPrint')) el('cramPrint').addEventListener('click', function () {
      Array.prototype.forEach.call(document.querySelectorAll('#cramList details.sec'), function (d) { d.open = true; });
      window.print();
    });

    /* --- Discriminators --- */
    if (el('diffFind')) el('diffFind').addEventListener('input', function () {
      filterSections('diffList', this.value, updateDiffCount);
    });
    if (el('diffSort')) el('diffSort').addEventListener('change', renderDiffs);
    if (el('diffExpand')) el('diffExpand').addEventListener('click', function () {
      Array.prototype.forEach.call(document.querySelectorAll('#diffList details.sec'), function (d) { d.open = true; });
    });
    if (el('diffCollapse')) el('diffCollapse').addEventListener('click', function () {
      Array.prototype.forEach.call(document.querySelectorAll('#diffList details.sec'), function (d) { d.open = false; });
    });
    if (el('diffTells')) el('diffTells').addEventListener('click', showTellsOnly);

    var sel = el('quizDomain');
    if (sel) {
      sel.innerHTML = DOMAINS.slice().sort(function (a, b) { return a.id - b.id; })
        .map(function (d) { return '<option value="' + d.id + '">' + esc(d.id + '. ' + d.name) + '</option>'; }).join('');
    }
    if (el('quizMode')) {
      el('quizMode').addEventListener('change', function () {
        sel.style.display = (el('quizMode').value === 'single') ? '' : 'none';
      });
    }
    if (el('startQuiz')) el('startQuiz').addEventListener('click', startQuiz);
    if (el('resetQuiz')) el('resetQuiz').addEventListener('click', function () {
      if (!window.confirm('Clear all of your question history? This cannot be undone.')) return;
      state.hist = {}; save(); renderQuizStats(); renderPerf();
      el('quizArea').innerHTML = '';
    });
  }

  function init() {
    load();
    renderCountdown();
    initTabs();
    renderWeeks();
    renderDomTable();
    renderRiskStats();
    renderHighYield();
    renderCram();
    renderDiffs();
    renderOneLiners();
    renderQuizStats();
    renderPerf();
    initControls();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
