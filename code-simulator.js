/* =====================================================================
   CloseDose — PALS Code Simulator
   A first-person, real-time, voice-driven pediatric Cardiac Arrest
   team-leader trainer. Grounded in the AHA / PALS 2020–2025 Pediatric
   Cardiac Arrest Algorithm.

   Architecture
   ------------
   - Scene3D ........ Three.js resuscitation bay (first person at foot of bed)
   - Monitor ........ Canvas-texture cardiac monitor (ECG, HR, SpO2, EtCO2, BP)
   - Audio .......... WebAudio compression metronome + alarms
   - Voice .......... Web Speech API (recognition + synthesis), closed-loop
   - Commands ....... Natural-language intent parser for team-leader orders
   - Engine ......... Code state machine + scenario logic + scoring
   - UI ............. HUD overlays, dose card, log, debrief

   This file is framework-free except for Three.js (loaded via import map).
   ===================================================================== */

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/* =====================================================================
   1. SCENARIOS  (various ages / sizes)
   ===================================================================== */

const SCENARIOS = [
  {
    id: "infant-vf",
    name: "Aiden",
    ageLabel: "6-month-old infant",
    sizeKey: "infant",
    weightKg: 7,
    history:
      "Found unresponsive at home after a brief illness. Bystander CPR started. " +
      "Arrives apneic and pulseless. Monitor shows a shockable rhythm.",
    initialRhythm: "VF",
    reversibleCause: "Hypoxia",
    reversibleHint: "Airway/oxygenation was the trigger — secure the airway.",
  },
  {
    id: "toddler-pea",
    name: "Mia",
    ageLabel: "2-year-old toddler",
    sizeKey: "toddler",
    weightKg: 13,
    history:
      "Severe gastroenteritis with profound dehydration. Became bradycardic, " +
      "then lost pulses. Narrow organized complexes on the monitor, no pulse.",
    initialRhythm: "PEA",
    reversibleCause: "Hypovolemia",
    reversibleHint: "She's dry — a fluid bolus is the key intervention.",
  },
  {
    id: "child-pvt",
    name: "Eli",
    ageLabel: "7-year-old child",
    sizeKey: "child",
    weightKg: 23,
    history:
      "Sudden collapse during sports. CPR in progress on arrival. Wide-complex, " +
      "fast, regular rhythm with no pulse.",
    initialRhythm: "pVT",
    reversibleCause: "Hydrogen ion (acidosis)",
    reversibleHint: "Refractory VT — push the antiarrhythmic after the 3rd shock.",
  },
  {
    id: "child-asystole",
    name: "Noah",
    ageLabel: "5-year-old child",
    sizeKey: "child",
    weightKg: 18,
    history:
      "Prolonged seizure, then respiratory arrest, now pulseless. Flat line on " +
      "the monitor in two leads.",
    initialRhythm: "asystole",
    reversibleCause: "Hypoxia",
    reversibleHint: "Confirm asystole in another lead, oxygenate, epi early.",
  },
  {
    id: "adolescent-vf",
    name: "Sofia",
    ageLabel: "14-year-old adolescent",
    sizeKey: "adolescent",
    weightKg: 50,
    history:
      "Witnessed sudden cardiac arrest. AED advised a shock pre-arrival. " +
      "Coarse ventricular fibrillation on the monitor.",
    initialRhythm: "VF",
    reversibleCause: "Thrombosis (coronary)",
    reversibleHint: "Adult-size — cap energy at the adult dose; high-quality CPR.",
  },
];

/* Reversible causes — the H's and T's */
const HS_AND_TS = [
  "Hypovolemia",
  "Hypoxia",
  "Hydrogen ion (acidosis)",
  "Hypoglycemia",
  "Hypokalemia / Hyperkalemia",
  "Hypothermia",
  "Tension pneumothorax",
  "Tamponade (cardiac)",
  "Toxins",
  "Thrombosis (pulmonary)",
  "Thrombosis (coronary)",
];

/* =====================================================================
   2. DOSING  (weight-based, PALS)
   ===================================================================== */

const round = (n, d = 2) => {
  const f = Math.pow(10, d);
  return Math.round(n * f) / f;
};

function doseCard(kg) {
  // Epinephrine 0.01 mg/kg IV/IO (0.1 mL/kg of 0.1 mg/mL), max 1 mg
  const epiMg = Math.min(round(0.01 * kg, 2), 1);
  const epiMl = round(epiMg / 0.1, 1); // 0.1 mg/mL concentration
  // Amiodarone 5 mg/kg bolus, max 300 mg
  const amioMg = Math.min(round(5 * kg, 0), 300);
  // Lidocaine 1 mg/kg
  const lidoMg = round(1 * kg, 1);
  // Fluid bolus 20 mL/kg (10 mL/kg if cardiogenic/suspected cardiac)
  const bolus20 = Math.round(20 * kg);
  const bolus10 = Math.round(10 * kg);
  // Defibrillation energies (max 10 J/kg or adult dose ~200 J)
  const energy1 = Math.min(Math.round(2 * kg), 200);
  const energy2 = Math.min(Math.round(4 * kg), 200);
  const energyMax = Math.min(Math.round(10 * kg), 200);
  // Adult cap for adolescents
  const adultCap = kg >= 40;
  return {
    kg,
    epiMg,
    epiMl,
    amioMg,
    lidoMg,
    bolus20,
    bolus10,
    energy1: adultCap ? Math.min(energy1, 120) : energy1,
    energy2: adultCap ? Math.min(energy2, 200) : energy2,
    energyMax: adultCap ? 200 : energyMax,
  };
}

/* =====================================================================
   3. AUDIO  (metronome + alarms)
   ===================================================================== */

class Audio {
  constructor() {
    this.ctx = null;
    this.metroTimer = null;
    this.rate = 110; // compressions/min
    this.on = false;
  }
  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AC();
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
  }
  click(freq = 1000, dur = 0.04, gain = 0.18) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.frequency.value = freq;
    o.type = "square";
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.ctx.destination);
    o.start(t);
    o.stop(t + dur);
  }
  startMetronome() {
    this.ensure();
    if (this.on) return;
    this.on = true;
    const interval = 60000 / this.rate;
    this.metroTimer = setInterval(() => this.click(950, 0.035, 0.12), interval);
  }
  stopMetronome() {
    this.on = false;
    clearInterval(this.metroTimer);
    this.metroTimer = null;
  }
  charge() {
    // rising whine
    this.ensure();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(440, t);
    o.frequency.exponentialRampToValueAtTime(1600, t + 1.4);
    g.gain.setValueAtTime(0.08, t);
    g.gain.setValueAtTime(0.08, t + 1.4);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
    o.connect(g).connect(this.ctx.destination);
    o.start(t);
    o.stop(t + 1.6);
  }
  shock() {
    this.ensure();
    this.click(180, 0.18, 0.3);
  }
  alarm() {
    this.ensure();
    this.click(1500, 0.08, 0.12);
    setTimeout(() => this.click(1500, 0.08, 0.12), 140);
  }
}

/* =====================================================================
   4. VOICE  (recognition + synthesis)
   ===================================================================== */

class Voice {
  constructor(onResult, onState) {
    this.onResult = onResult;
    this.onState = onState;
    this.rec = null;
    this.listening = false;
    this.continuous = false;
    this.supported = false;
    this.synth = window.speechSynthesis || null;
    this.queue = [];
    this.speaking = false;

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      this.supported = true;
      this.rec = new SR();
      this.rec.lang = "en-US";
      this.rec.interimResults = false;
      this.rec.maxAlternatives = 3;
      this.rec.continuous = false;
      this.rec.onresult = (e) => {
        const alts = [];
        for (let i = e.resultIndex; i < e.results.length; i++) {
          for (let j = 0; j < e.results[i].length; j++) {
            alts.push(e.results[i][j].transcript);
          }
        }
        this.onResult(alts);
      };
      this.rec.onend = () => {
        if (this.continuous && this.listening) {
          try {
            this.rec.start();
          } catch (_) {}
        } else {
          this.listening = false;
          this.onState();
        }
      };
      this.rec.onerror = (e) => {
        if (e.error === "not-allowed" || e.error === "service-not-allowed") {
          this.continuous = false;
          this.listening = false;
          this.onState("denied");
        }
      };
    }
  }
  start(continuous = false) {
    if (!this.supported) return;
    this.continuous = continuous;
    this.listening = true;
    try {
      this.rec.start();
    } catch (_) {}
    this.onState();
  }
  stop() {
    this.continuous = false;
    this.listening = false;
    try {
      this.rec.stop();
    } catch (_) {}
    this.onState();
  }
  // Speak with a chosen voice profile (pitch/rate) per role
  say(text, profile = {}) {
    if (!this.synth) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = profile.rate ?? 1.05;
    u.pitch = profile.pitch ?? 1.0;
    u.volume = profile.volume ?? 1.0;
    if (this._voices && this._voices.length) {
      const v = profile.female
        ? this._voices.find((v) => /female|samantha|victoria|zira|google us english/i.test(v.name))
        : this._voices.find((v) => /male|david|daniel|alex|google uk english male/i.test(v.name));
      if (v) u.voice = v;
    }
    this.synth.speak(u);
  }
  loadVoices() {
    if (!this.synth) return;
    this._voices = this.synth.getVoices();
    if (!this._voices.length) {
      this.synth.onvoiceschanged = () => (this._voices = this.synth.getVoices());
    }
  }
}

/* Role voice profiles for varied team voices */
const ROLE_VOICE = {
  coach: { female: true, pitch: 1.15, rate: 1.08 },
  medNurse: { female: true, pitch: 1.25, rate: 1.05 },
  bedsideNurse: { female: false, pitch: 0.95, rate: 1.0 },
  airway: { female: false, pitch: 0.85, rate: 1.0 },
  rt: { female: false, pitch: 1.0, rate: 1.02 },
  recorder: { female: true, pitch: 1.0, rate: 1.0 },
  compressor: { female: false, pitch: 0.8, rate: 1.1 },
};

/* =====================================================================
   5. 3D SCENE
   ===================================================================== */

class Scene3D {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0c1f1d);
    this.scene.fog = new THREE.Fog(0x0c1f1d, 9, 22);

    this.camera = new THREE.PerspectiveCamera(58, 1, 0.1, 100);
    // First person: standing at the FOOT of the bed, ~eye height, looking
    // toward the patient's head.
    this.camera.position.set(0, 1.65, 4.2);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.target.set(0, 1.0, 0.4); // patient torso
    this.controls.enablePan = false;
    this.controls.minDistance = 2.0;
    this.controls.maxDistance = 6.0;
    this.controls.maxPolarAngle = Math.PI * 0.62;
    this.controls.minPolarAngle = Math.PI * 0.18;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;

    this.clock = new THREE.Clock();
    this.compressionsActive = false;
    this.compressor = null;
    this.patientGroup = null;
    this.chest = null;
    this.bagSqueeze = null;
    this.ventilating = false;

    this._build();
    this._resize();
    window.addEventListener("resize", () => this._resize());
    this.renderer.setAnimationLoop(() => this._tick());
  }

  _light() {
    const amb = new THREE.AmbientLight(0xbfeee6, 0.55);
    this.scene.add(amb);
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(3, 8, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    this.scene.add(key);
    // Surgical overhead light above the bed
    const spot = new THREE.SpotLight(0xffffff, 1.6, 14, Math.PI / 5, 0.5, 1.2);
    spot.position.set(0, 5.2, 0.4);
    spot.target.position.set(0, 0.9, 0.4);
    this.scene.add(spot);
    this.scene.add(spot.target);
    const lampGeo = new THREE.CylinderGeometry(0.55, 0.7, 0.22, 24);
    const lamp = new THREE.Mesh(lampGeo, new THREE.MeshStandardMaterial({ color: 0xeeeeee, emissive: 0x666666 }));
    lamp.position.set(0, 4.9, 0.4);
    this.scene.add(lamp);
  }

  _room() {
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x16403b, roughness: 0.9 });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    const wallMat = new THREE.MeshStandardMaterial({ color: 0x123733, roughness: 1 });
    const back = new THREE.Mesh(new THREE.PlaneGeometry(20, 8), wallMat);
    back.position.set(0, 4, -3.2);
    this.scene.add(back);
    const left = new THREE.Mesh(new THREE.PlaneGeometry(12, 8), wallMat);
    left.rotation.y = Math.PI / 2;
    left.position.set(-5, 4, 0);
    this.scene.add(left);
    const right = left.clone();
    right.rotation.y = -Math.PI / 2;
    right.position.set(5, 4, 0);
    this.scene.add(right);
  }

  _bed() {
    const g = new THREE.Group();
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x2a4d48, metalness: 0.4, roughness: 0.5 });
    const matMat = new THREE.MeshStandardMaterial({ color: 0xd6eeea, roughness: 0.8 });
    // Mattress — long axis along Z (head at -Z, foot at +Z)
    const mattress = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.18, 2.4), matMat);
    mattress.position.set(0, 0.82, 0.2);
    mattress.castShadow = mattress.receiveShadow = true;
    g.add(mattress);
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.5, 2.5), frameMat);
    base.position.set(0, 0.5, 0.2);
    g.add(base);
    // legs
    for (const [x, z] of [[-0.42, -0.95], [0.42, -0.95], [-0.42, 1.3], [0.42, 1.3]]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5), frameMat);
      leg.position.set(x, 0.25, z + 0.2);
      g.add(leg);
    }
    this.scene.add(g);
  }

  _patient(sizeKey) {
    if (this.patientGroup) {
      this.scene.remove(this.patientGroup);
    }
    const scaleMap = { infant: 0.5, toddler: 0.68, child: 0.82, adolescent: 1.0 };
    const s = scaleMap[sizeKey] ?? 0.8;
    const g = new THREE.Group();
    const skin = new THREE.MeshStandardMaterial({ color: 0xe8c9a8, roughness: 0.7 });
    const gown = new THREE.MeshStandardMaterial({ color: 0x9fd6cc, roughness: 0.9 });
    // Head at -Z end
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.14 * s, 24, 24), skin);
    head.position.set(0, 0.95, -0.95 * s);
    g.add(head);
    // Torso (chest) — animated for compressions
    const chest = new THREE.Mesh(new THREE.BoxGeometry(0.34 * s, 0.18 * s, 0.6 * s), gown);
    chest.position.set(0, 0.95, -0.45 * s);
    g.add(chest);
    this.chest = chest;
    this._chestY = chest.position.y;
    // Abdomen / legs
    const abd = new THREE.Mesh(new THREE.BoxGeometry(0.3 * s, 0.16 * s, 0.5 * s), gown);
    abd.position.set(0, 0.93, 0.05 * s);
    g.add(abd);
    const legL = new THREE.Mesh(new THREE.CylinderGeometry(0.07 * s, 0.06 * s, 0.7 * s), gown);
    legL.position.set(-0.1 * s, 0.9, 0.55 * s);
    legL.rotation.x = Math.PI / 2;
    g.add(legL);
    const legR = legL.clone();
    legR.position.x = 0.1 * s;
    g.add(legR);
    const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.05 * s, 0.05 * s, 0.55 * s), skin);
    armL.position.set(-0.26 * s, 0.92, -0.45 * s);
    armL.rotation.z = Math.PI / 2;
    g.add(armL);
    const armR = armL.clone();
    armR.position.x = 0.26 * s;
    g.add(armR);

    g.castShadow = true;
    this.scene.add(g);
    this.patientGroup = g;
  }

  _avatar(color, x, z, label, faceCenter = true) {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.6, 6, 12), mat);
    body.position.y = 1.05;
    body.castShadow = true;
    g.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 20, 20), new THREE.MeshStandardMaterial({ color: 0xe8c9a8 }));
    head.position.y = 1.55;
    g.add(head);
    // simple scrub cap
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.19, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), mat);
    cap.position.y = 1.58;
    g.add(cap);
    g.position.set(x, 0, z);
    if (faceCenter) g.lookAt(0, 1.05, 0.2);
    g.add(this._label(label, color));
    this.scene.add(g);
    return { group: g, body, head };
  }

  _label(text, color) {
    const cv = document.createElement("canvas");
    cv.width = 256;
    cv.height = 64;
    const ctx = cv.getContext("2d");
    ctx.fillStyle = "rgba(12,31,29,0.85)";
    roundRect(ctx, 4, 4, 248, 56, 14);
    ctx.fill();
    ctx.strokeStyle = "#" + new THREE.Color(color).getHexString();
    ctx.lineWidth = 3;
    roundRect(ctx, 4, 4, 248, 56, 14);
    ctx.stroke();
    ctx.fillStyle = "#eafdf8";
    ctx.font = "bold 28px Nunito, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 128, 34);
    const tex = new THREE.CanvasTexture(cv);
    const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false }));
    spr.scale.set(0.9, 0.225, 1);
    spr.position.set(0, 2.0, 0);
    return spr;
  }

  _team() {
    // Positions around bed. Head of bed = -Z, foot (camera) = +Z.
    // Compressor on patient's right (screen-left from foot), at chest level.
    this.compressor = this._avatar(0x2f80ed, -0.95, -0.5, "Compressor");
    this._avatar(0x6fcf97, -1.7, 0.0, "CPR Coach");
    this.airway = this._avatar(0xeb5757, 0.0, -1.8, "Airway", false);
    this._avatar(0xf2994a, 0.8, -1.6, "RT");
    this._avatar(0xbb6bd9, 1.5, -0.4, "Med Nurse");
    this._avatar(0x9b51e0, 1.4, 0.5, "Bedside RN");
    this._avatar(0x56ccf2, 1.9, 1.4, "Recorder");
    // make airway face the patient head
    this.airway.group.lookAt(0, 0.95, -0.95);
  }

  _crashCart() {
    const g = new THREE.Group();
    const red = new THREE.MeshStandardMaterial({ color: 0xc0392b, roughness: 0.5 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.9, 0.5), red);
    body.position.y = 0.45;
    g.add(body);
    for (let i = 0; i < 4; i++) {
      const drawer = new THREE.Mesh(
        new THREE.BoxGeometry(0.48, 0.16, 0.02),
        new THREE.MeshStandardMaterial({ color: 0xe74c3c })
      );
      drawer.position.set(0, 0.2 + i * 0.18, 0.26);
      g.add(drawer);
    }
    g.position.set(2.1, 0, 0.0);
    this.scene.add(g);
  }

  attachMonitor(monitorTexture) {
    // Monitor on a pole at head of bed, screen facing the foot (camera).
    const g = new THREE.Group();
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.8),
      new THREE.MeshStandardMaterial({ color: 0x333 })
    );
    pole.position.set(0, 0.9, 0);
    g.add(pole);
    const bezel = new THREE.Mesh(
      new THREE.BoxGeometry(1.25, 0.78, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x0a0a0a })
    );
    bezel.position.set(0, 1.85, 0);
    g.add(bezel);
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.15, 0.68),
      new THREE.MeshBasicMaterial({ map: monitorTexture })
    );
    screen.position.set(0, 1.85, 0.045);
    screen.rotation.y = Math.PI; // face +Z (camera at foot)
    g.add(screen);
    // place at head of bed, slightly to patient's left, angled toward foot
    g.position.set(0.9, 0, -1.7);
    g.rotation.y = Math.PI; // turn whole rig to face the foot of bed
    this.scene.add(g);
  }

  setCompressions(on) {
    this.compressionsActive = on;
  }
  setVentilating(on) {
    this.ventilating = on;
  }

  _resize() {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  _tick() {
    const t = this.clock.getElapsedTime();
    // Compression animation: chest depresses, compressor's body bobs
    if (this.compressionsActive) {
      const phase = (t * (110 / 60)) % 1; // 110/min
      const depth = Math.max(0, Math.sin(phase * Math.PI * 2)) * 0.05;
      if (this.chest) this.chest.position.y = this._chestY - depth;
      if (this.compressor) this.compressor.body.position.y = 1.05 - depth * 1.5;
    } else {
      if (this.chest) this.chest.position.y += (this._chestY - this.chest.position.y) * 0.2;
      if (this.compressor) this.compressor.body.position.y += (1.05 - this.compressor.body.position.y) * 0.2;
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  build(sizeKey) {
    this._light();
    this._room();
    this._bed();
    this._patient(sizeKey);
    this._team();
    this._crashCart();
  }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* =====================================================================
   6. MONITOR  (canvas-texture cardiac monitor)
   ===================================================================== */

class Monitor {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 1024;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext("2d");
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.x = 0;
    this.lastSample = this.canvas.height * 0.32;
    this.rhythm = "asystole";
    this.hr = 0;
    this.spo2 = 0;
    this.etco2 = 0;
    this.bp = "--/--";
    this.compressions = false;
    this.lead = "II";
    this.tt = 0;
    requestAnimationFrame(() => this._draw());
    // mirror HUD canvas
    this.hudCanvas = null;
  }

  setHudCanvas(c) {
    this.hudCanvas = c;
  }

  set(state) {
    Object.assign(this, state);
  }

  _ecgSample(rhythm, p) {
    // p is phase 0..1 within a beat; returns vertical offset (-1..1)
    switch (rhythm) {
      case "VF": {
        // chaotic
        return (
          0.5 * Math.sin(p * 53) +
          0.3 * Math.sin(p * 91 + 1) +
          0.2 * Math.sin(p * 130 + 2)
        );
      }
      case "pVT": {
        // wide, regular, sine-ish
        return Math.sin(p * Math.PI * 2) * 0.9;
      }
      case "asystole":
        return (Math.random() - 0.5) * 0.02;
      case "PEA":
      case "sinus":
      case "ROSC": {
        // PQRST-ish complex
        if (p < 0.1) return Math.sin((p / 0.1) * Math.PI) * 0.12; // P
        if (p < 0.18) return 0;
        if (p < 0.2) return -0.15; // Q
        if (p < 0.23) return 1.0; // R
        if (p < 0.26) return -0.3; // S
        if (p < 0.45) return 0;
        if (p < 0.6) return Math.sin(((p - 0.45) / 0.15) * Math.PI) * 0.2; // T
        return 0;
      }
      case "cpr": {
        // compression artifact
        return Math.sin(p * Math.PI * 2 * 3) * 0.4;
      }
      default:
        return 0;
    }
  }

  _draw() {
    const ctx = this.ctx;
    const W = this.canvas.width;
    const H = this.canvas.height;
    ctx.fillStyle = "#04110f";
    ctx.fillRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = "rgba(40,90,80,0.25)";
    ctx.lineWidth = 1;
    for (let gx = 0; gx < W; gx += 32) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, H);
      ctx.stroke();
    }
    for (let gy = 0; gy < H; gy += 32) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(W, gy);
      ctx.stroke();
    }

    // ECG trace region (top 55%)
    const traceH = H * 0.5;
    const baseY = traceH * 0.55;
    // scrolling waveform
    const speed = 5;
    const beatHz = this.hr > 0 ? this.hr / 60 : 1;
    for (let i = 0; i < speed; i++) {
      this.x = (this.x + 1) % W;
      this.tt += 1 / 60 / speed;
      // erase ahead
      ctx.fillStyle = "#04110f";
      ctx.fillRect(this.x, 0, 14, traceH);

      let r = this.rhythm;
      // If compressions active and underlying is non-perfusing, show CPR artifact blended
      if (this.compressions && (r === "asystole" || r === "PEA" || r === "VF" || r === "pVT")) {
        r = "cpr";
      }
      let p;
      if (r === "VF" || r === "asystole") {
        p = this.tt;
      } else {
        p = (this.tt * beatHz) % 1;
      }
      const amp = traceH * 0.32;
      const y = baseY - this._ecgSample(r, p) * amp;
      ctx.strokeStyle = "#39ff88";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(this.x - 1, this.lastSample);
      ctx.lineTo(this.x, y);
      ctx.stroke();
      this.lastSample = y;
    }

    // SpO2 pleth + EtCO2 capnograph regions (lower)
    // dividers
    ctx.strokeStyle = "rgba(120,200,180,0.18)";
    ctx.beginPath();
    ctx.moveTo(0, traceH);
    ctx.lineTo(W * 0.7, traceH);
    ctx.stroke();

    // Numeric panel (right column)
    const px = W * 0.72;
    ctx.fillStyle = "#071a17";
    ctx.fillRect(px, 0, W - px, H);
    const drawNum = (label, val, unit, color, y) => {
      ctx.fillStyle = color;
      ctx.font = "bold 26px Nunito, monospace";
      ctx.textAlign = "left";
      ctx.fillText(label, px + 18, y);
      ctx.font = "bold 64px Nunito, monospace";
      ctx.fillText(String(val), px + 18, y + 64);
      ctx.font = "bold 22px Nunito, monospace";
      ctx.fillText(unit, px + 18 + ctx.measureText(String(val)).width + 8, y + 64);
    };
    drawNum("HR", this.hr > 0 ? this.hr : "--", "bpm", "#39ff88", 40);
    drawNum("SpO₂", this.spo2 > 0 ? this.spo2 : "--", "%", "#56ccf2", 175);
    drawNum("EtCO₂", this.etco2 > 0 ? this.etco2 : "--", "", "#f2c94c", 310);
    ctx.fillStyle = "#eb5757";
    ctx.font = "bold 26px Nunito, monospace";
    ctx.fillText("NIBP", px + 18, 470);
    ctx.font = "bold 46px Nunito, monospace";
    ctx.fillText(this.bp, px + 18, 520);

    // Lead label + rhythm
    ctx.fillStyle = "#9fe8d8";
    ctx.font = "bold 22px Nunito, monospace";
    ctx.textAlign = "left";
    ctx.fillText("Lead " + this.lead, 16, 28);

    this.texture.needsUpdate = true;

    // mirror to HUD
    if (this.hudCanvas) {
      const hc = this.hudCanvas.getContext("2d");
      hc.drawImage(this.canvas, 0, 0, this.hudCanvas.width, this.hudCanvas.height);
    }

    requestAnimationFrame(() => this._draw());
  }
}

/* =====================================================================
   7. COMMAND PARSER  (natural-language intent recognition)
   ===================================================================== */

const INTENTS = [
  { id: "monitor", re: /(attach|place|put on|apply|hook up).*(monitor|pads|leads|defib)|monitor on|pads on/i },
  { id: "startCPR", re: /(start|begin|resume|continue|initiate).*(compress|cpr|chest)|push hard|let'?s start cpr/i },
  { id: "stopCPR", re: /(stop|hold|pause|clear).*(compress|cpr)|hold (cpr|compressions)/i },
  { id: "rhythmCheck", re: /(check|analyze|look at|whats|what'?s).*(rhythm)|rhythm check|pulse check|check.*pulse|check for a pulse/i },
  { id: "switch", re: /(switch|rotate|change|swap).*(compress|provider)|new compressor|next compressor/i },
  { id: "charge", re: /(charge|charging|prepare).*(defib|joule|pads|to \d)|charge it|charge the (defib|monitor)|charge/i },
  { id: "shock", re: /(deliver|give|push the button).*(shock)|^shock|shock now|defibrillate|clear.*shock|everybody clear/i },
  { id: "epi", re: /(give|push|administer|another).*(epi|epinephrine|adrenaline)|epi now/i },
  { id: "amio", re: /(give|push|administer).*(amio|amiodarone)|amiodarone/i },
  { id: "lido", re: /(give|push|administer).*(lido|lidocaine)|lidocaine/i },
  { id: "fluid", re: /(give|push|hang|bolus|run).*(fluid|saline|bolus|crystalloid|lr|normal saline)|fluid bolus|push fluids/i },
  { id: "access", re: /(get|establish|place|start|obtain|need).*(iv|io|access|line|intraosseous)|drill an io|place an io|i\.o\./i },
  { id: "airway", re: /(place|insert|advanced|secure|drop).*(airway|tube|et tube|ett)|intubate|intubation/i },
  { id: "bag", re: /(bag|ventilate|start).*(patient|ventilation|breaths|bvm)|bag the patient|bag mask|start ventilating/i },
  { id: "capno", re: /(attach|place|connect|get).*(capno|end.?tidal|et co2|etco2)|capnography/i },
  { id: "reversible", re: /(reversible|h'?s and t'?s|hs and ts|causes|why|what'?s causing|differential)/i },
  { id: "labs", re: /(draw|get|send|check).*(labs|gas|glucose|sugar|potassium|istat|i-stat|point of care)/i },
  { id: "status", re: /(status|how long|time|update|where are we|sit rep|recap|how many)/i },
  { id: "rosc", re: /(check.*rosc|do we have a pulse|return of spontaneous|got a pulse)/i },
  { id: "callIt", re: /(call it|time of death|pronounce|stop the code|terminate|end the code|cease efforts)/i },
  { id: "help", re: /(help|what can i say|commands|orders)/i },
];

function parseIntent(transcripts) {
  for (const t of transcripts) {
    for (const intent of INTENTS) {
      if (intent.re.test(t)) {
        // capture an explicit joules number for charge
        let arg = null;
        const j = t.match(/(\d+)\s*(joule|j\b)/i);
        if (j) arg = parseInt(j[1], 10);
        return { id: intent.id, arg, raw: t };
      }
    }
  }
  return { id: null, raw: transcripts[0] || "" };
}

/* =====================================================================
   8. ENGINE  (state machine + scenario logic + scoring)
   ===================================================================== */

class Engine {
  constructor(ui) {
    this.ui = ui;
  }

  start(scenario) {
    this.s = scenario;
    this.dose = doseCard(scenario.weightKg);
    this.t0 = performance.now();
    this.cycleStart = null; // set when CPR starts
    this.rhythm = scenario.initialRhythm;
    this.compressions = false;
    this.monitorOn = false;
    this.ventilating = false;
    this.airwaySecured = false;
    this.capno = false;
    this.access = null; // 'IV' | 'IO'
    this.defibCharged = false;
    this.chargedJoules = 0;
    this.shocks = 0;
    this.epiCount = 0;
    this.lastEpi = null;
    this.amioCount = 0;
    this.lidoGiven = false;
    this.fluidGiven = false;
    this.reversibleAddressed = false;
    this.labsDrawn = false;
    this.rosc = false;
    this.ended = false;
    this.compressorSwaps = 0;
    this.lastSwap = null;
    this.cycleNumber = 0;
    this.rhythmCheckDue = false;
    this.awaitingRhythmDecision = false;
    this.log = [];
    this.metrics = {
      tFirstCompression: null,
      tFirstShock: null,
      tFirstEpi: null,
      tMonitor: null,
      tAirway: null,
      compressionTimeMs: 0,
      lastCompToggle: null,
      rhythmChecks: 0,
      shockableShocksDelivered: 0,
    };

    this.shockable = this.rhythm === "VF" || this.rhythm === "pVT";

    this.event(
      "recorder",
      `Code started. ${scenario.ageLabel}, weight ${scenario.weightKg} kilograms. ` +
        `Monitor shows ${rhythmName(this.rhythm)}.`,
      true
    );
    this.ui.refresh();
    this._loop = setInterval(() => this.tick(), 250);
  }

  clockMs() {
    return performance.now() - this.t0;
  }
  cycleMs() {
    return this.cycleStart == null ? 0 : performance.now() - this.cycleStart;
  }

  event(role, text, speak = false) {
    const ts = fmtTime(this.clockMs());
    this.log.push({ ts, role, text });
    this.ui.appendLog(ts, role, text);
    if (speak) this.ui.speak(role, text);
  }

  perfusing() {
    return this.rhythm === "sinus" || this.rhythm === "ROSC";
  }

  /* --- main real-time loop --- */
  tick() {
    if (this.ended) return;
    // accumulate compression time
    if (this.compressions) {
      const now = performance.now();
      if (this.metrics.lastCompToggle) {
        this.metrics.compressionTimeMs += now - this.metrics.lastCompToggle;
      }
      this.metrics.lastCompToggle = now;
    }

    // 2-minute cycle prompt
    if (this.compressions && !this.awaitingRhythmDecision && this.cycleMs() >= 120000 && !this.rhythmCheckDue) {
      this.rhythmCheckDue = true;
      this.event(
        "recorder",
        "Two minutes of CPR complete. Prepare for a rhythm and pulse check.",
        true
      );
      this.ui.flashCycle();
    }
    // gentle nudge if leader doesn't check by 2:20
    if (this.rhythmCheckDue && this.cycleMs() >= 140000 && !this._nudged) {
      this._nudged = true;
      this.event("coach", "Team leader — we're past two minutes, do you want a rhythm check?", true);
    }

    // compressor fatigue reminder ~ every 2 min if no swap
    if (
      this.compressions &&
      (this.lastSwap == null ? this.cycleMs() : performance.now() - this.lastSwap) >= 120000 &&
      !this._swapNudged
    ) {
      this._swapNudged = true;
      this.event("coach", "Compressor's been going two minutes — consider rotating to keep compressions strong.", true);
    }

    // epi interval reminder for ongoing arrest
    if (
      !this.perfusing() &&
      this.lastEpi != null &&
      performance.now() - this.lastEpi >= 4 * 60000 &&
      !this._epiNudged
    ) {
      this._epiNudged = true;
      this.event("medNurse", "It's been about four minutes since the last epinephrine — ready for the next dose when you call it.", true);
    }

    this.ui.refresh();
  }

  /* --- command handlers --- */
  handle(intent) {
    if (this.ended) return;
    const id = intent.id;
    switch (id) {
      case "monitor":
        return this.cmdMonitor();
      case "startCPR":
        return this.cmdStartCPR();
      case "stopCPR":
        return this.cmdStopCPR();
      case "rhythmCheck":
        return this.cmdRhythmCheck();
      case "switch":
        return this.cmdSwitch();
      case "charge":
        return this.cmdCharge(intent.arg);
      case "shock":
        return this.cmdShock();
      case "epi":
        return this.cmdEpi();
      case "amio":
        return this.cmdAmio();
      case "lido":
        return this.cmdLido();
      case "fluid":
        return this.cmdFluid();
      case "access":
        return this.cmdAccess();
      case "airway":
        return this.cmdAirway();
      case "bag":
        return this.cmdBag();
      case "capno":
        return this.cmdCapno();
      case "reversible":
        return this.cmdReversible();
      case "labs":
        return this.cmdLabs();
      case "status":
        return this.cmdStatus();
      case "rosc":
        return this.cmdRhythmCheck();
      case "callIt":
        return this.cmdCallIt();
      case "help":
        return this.ui.toggleHelp();
      default:
        this.event("recorder", `Unrecognized order: “${intent.raw}”. Say “help” for the order list.`);
    }
  }

  cmdMonitor() {
    if (this.monitorOn) return this.event("bedsideNurse", "Monitor's already on.", true);
    this.monitorOn = true;
    this.metrics.tMonitor = this.clockMs();
    this.event("bedsideNurse", `Monitor and pads on. Rhythm is ${rhythmName(this.rhythm)}.`, true);
    this.ui.setRhythm(this.rhythm, this.compressions);
  }

  cmdStartCPR() {
    if (!this.monitorOn) this.cmdMonitor();
    if (this.compressions) return this.event("compressor", "Already doing compressions.", true);
    this.compressions = true;
    this.metrics.lastCompToggle = performance.now();
    if (this.metrics.tFirstCompression == null) this.metrics.tFirstCompression = this.clockMs();
    if (this.cycleStart == null) this.cycleStart = performance.now();
    this.rhythmCheckDue = false;
    this._nudged = false;
    this._swapNudged = false;
    this.event("compressor", "Starting compressions — hard and fast, center of the chest.", true);
    this.event("coach", "Metronome's on, 110 a minute. I'll coach rate and recoil.", true);
    this.ui.startCPR();
  }

  cmdStopCPR() {
    if (!this.compressions) return;
    this.compressions = false;
    if (this.metrics.lastCompToggle) {
      this.metrics.compressionTimeMs += performance.now() - this.metrics.lastCompToggle;
      this.metrics.lastCompToggle = null;
    }
    this.event("compressor", "Holding compressions.", true);
    this.ui.stopCPR();
  }

  cmdSwitch() {
    this.compressorSwaps++;
    this.lastSwap = performance.now();
    this._swapNudged = false;
    this.event("coach", "Switching compressors — quick swap, minimize the pause.", true);
    this.event("compressor", "New compressor in, resuming.", true);
  }

  cmdRhythmCheck() {
    // Pause compressions, reveal rhythm, evaluate scenario transition.
    const wasCompressing = this.compressions;
    if (wasCompressing) this.cmdStopCPR();
    this.metrics.rhythmChecks++;
    this.rhythmCheckDue = false;
    this._nudged = false;
    this.awaitingRhythmDecision = true;
    this.cycleNumber++;

    // Determine outcome of this rhythm check based on therapy delivered
    this._evaluateRhythm();

    this.ui.setRhythm(this.rhythm, false);

    if (this.rosc) {
      return this._roscAchieved();
    }

    if (this.rhythm === "VF" || this.rhythm === "pVT") {
      this.shockable = true;
      this.event(
        "bedsideNurse",
        `Rhythm check: still ${rhythmName(this.rhythm)}, no pulse. Shockable rhythm.`,
        true
      );
      this.event("coach", "Shockable — charge the defibrillator and resume compressions while it charges.", true);
    } else if (this.rhythm === "asystole") {
      this.shockable = false;
      this.event("bedsideNurse", "Rhythm check: asystole, no pulse. Not shockable.", true);
      this.event("coach", "Not shockable — resume CPR immediately and give epinephrine.", true);
    } else if (this.rhythm === "PEA") {
      this.shockable = false;
      this.event(
        "bedsideNurse",
        "Rhythm check: organized complexes but no pulse — PEA. Not shockable.",
        true
      );
      this.event("coach", "PEA — resume CPR, epinephrine, and hunt for the reversible cause.", true);
    }
    this.awaitingRhythmDecision = false;
  }

  _evaluateRhythm() {
    // Educational deterministic logic:
    // Shockable cases convert to ROSC once high-quality therapy delivered:
    //   >=3 shocks AND >=1 epi AND antiarrhythmic given.
    // Non-shockable convert once epi given AND the correct reversible cause
    //   addressed AND >=2 cycles completed.
    if (this.shockable || this.rhythm === "VF" || this.rhythm === "pVT") {
      const refractoryHandled = this.shocks >= 3 && this.epiCount >= 1 && (this.amioCount >= 1 || this.lidoGiven);
      if (refractoryHandled) {
        this.rhythm = "ROSC";
        this.rosc = true;
      }
      // else stays shockable
    } else {
      const causeHandled =
        (this.s.reversibleCause.startsWith("Hypovolemia") && this.fluidGiven) ||
        (this.s.reversibleCause.startsWith("Hypoxia") && this.airwaySecured) ||
        this.reversibleAddressed;
      if (this.epiCount >= 1 && causeHandled && this.cycleNumber >= 2) {
        this.rhythm = "ROSC";
        this.rosc = true;
      }
    }
  }

  _roscAchieved() {
    this.event(
      "bedsideNurse",
      "I've got a pulse! Strong central pulse — we have return of spontaneous circulation.",
      true
    );
    this.event("rt", "End-tidal jumped up too — EtCO₂ is climbing, consistent with ROSC.", true);
    this.event(
      "recorder",
      "ROSC achieved. Moving to post-cardiac-arrest care: airway, oxygenation, blood pressure, 12-lead, and targeted temperature management.",
      true
    );
    this.ui.setRhythm("ROSC", false);
    this.endCode("rosc");
  }

  cmdCharge(joules) {
    if (this.rhythm !== "VF" && this.rhythm !== "pVT") {
      return this.event("coach", "This rhythm isn't shockable — hold the charge and keep up CPR.", true);
    }
    const idx = this.shocks;
    const target = idx === 0 ? this.dose.energy1 : idx === 1 ? this.dose.energy2 : this.dose.energyMax;
    this.chargedJoules = joules || target;
    this.defibCharged = true;
    this.event(
      "bedsideNurse",
      `Charging to ${this.chargedJoules} joules${joules ? "" : ` (${energyLabel(idx)} dose)`}. Continue compressions while I charge.`,
      true
    );
    this.ui.charge();
  }

  cmdShock() {
    if (this.rhythm !== "VF" && this.rhythm !== "pVT") {
      return this.event("coach", "Not a shockable rhythm — don't shock. Resume CPR.", true);
    }
    if (!this.defibCharged) {
      return this.event("bedsideNurse", "Defibrillator isn't charged yet — say “charge” first.", true);
    }
    if (this.compressions) this.cmdStopCPR();
    this.shocks++;
    this.metrics.shockableShocksDelivered++;
    if (this.metrics.tFirstShock == null) this.metrics.tFirstShock = this.clockMs();
    this.defibCharged = false;
    this.event(
      "bedsideNurse",
      `Clear — everyone off the patient. Shock number ${this.shocks} delivered at ${this.chargedJoules} joules.`,
      true
    );
    this.ui.shock();
    // Resume CPR immediately for 2 minutes
    setTimeout(() => {
      if (!this.ended) {
        this.event("coach", "Immediately resume compressions — don't wait to reassess.", true);
        this.cycleStart = performance.now();
        this.cmdStartCPR();
      }
    }, 900);
  }

  cmdEpi() {
    if (!this.access) {
      return this.event("medNurse", "I don't have access yet — I need an IV or IO before I can push epi.", true);
    }
    this.epiCount++;
    this.lastEpi = performance.now();
    this._epiNudged = false;
    if (this.metrics.tFirstEpi == null) this.metrics.tFirstEpi = this.clockMs();
    this.event(
      "medNurse",
      `Epinephrine ${this.dose.epiMg} milligrams — that's ${this.dose.epiMl} mLs of the 0.1 milligram per mL — ${this.access}, in. Time noted.`,
      true
    );
    this.event("recorder", `Epinephrine dose #${this.epiCount} recorded.`, false);
  }

  cmdAmio() {
    if (this.rhythm !== "VF" && this.rhythm !== "pVT") {
      return this.event("coach", "Amiodarone is for refractory shockable rhythms — not indicated right now.", true);
    }
    if (!this.access) {
      return this.event("medNurse", "Need access first for amiodarone.", true);
    }
    if (this.amioCount >= 3) {
      return this.event("medNurse", "We've given the maximum three doses of amiodarone.", true);
    }
    this.amioCount++;
    this.event(
      "medNurse",
      `Amiodarone ${this.dose.amioMg} milligrams rapid bolus ${this.access}, in.`,
      true
    );
  }

  cmdLido() {
    if (this.rhythm !== "VF" && this.rhythm !== "pVT") {
      return this.event("coach", "Lidocaine is an alternative for shockable rhythms — not indicated now.", true);
    }
    if (!this.access) return this.event("medNurse", "Need access first.", true);
    this.lidoGiven = true;
    this.event("medNurse", `Lidocaine ${this.dose.lidoMg} milligrams ${this.access}, in.`, true);
  }

  cmdFluid() {
    if (!this.access) return this.event("medNurse", "I need access before I can run fluids.", true);
    this.fluidGiven = true;
    this.event(
      "bedsideNurse",
      `Pushing a ${this.dose.bolus20} mL normal saline bolus — 20 per kilo — wide open via pressure bag.`,
      true
    );
    if (this.s.reversibleCause.startsWith("Hypovolemia")) {
      this.reversibleAddressed = true;
      this.event("coach", "Good call — volume is exactly what this patient needs.", true);
    }
  }

  cmdAccess() {
    if (this.access) return this.event("bedsideNurse", `Already have ${this.access} access.`, true);
    // IO is fast and reliable in arrest
    this.access = "IO";
    this.event(
      "bedsideNurse",
      "Drilling an IO in the proximal tibia… IO is in, good flush, secure. Access established.",
      true
    );
  }

  cmdAirway() {
    this.airwaySecured = true;
    this.event(
      "airway",
      "Placing an advanced airway… tube's through the cords, good fogging, equal breath sounds bilaterally.",
      true
    );
    this.event("rt", "Confirming with waveform capnography — good square waveform, tube is in.", true);
    this.capno = true;
    this.metrics.tAirway = this.clockMs();
    if (this.s.reversibleCause.startsWith("Hypoxia")) {
      this.reversibleAddressed = true;
      this.event("coach", "Securing oxygenation is the key fix for this patient.", true);
    }
    this.event("coach", "Advanced airway in — switch to continuous compressions with a breath every 2 to 3 seconds.", true);
  }

  cmdBag() {
    this.ventilating = true;
    this.ui.setVentilating(true);
    this.event(
      "rt",
      this.airwaySecured
        ? "Ventilating through the tube, one breath every 2 to 3 seconds, watching for chest rise."
        : "Bag-mask ventilation, two-person technique, one breath every 6 seconds with 15-to-2 compressions.",
      true
    );
  }

  cmdCapno() {
    this.capno = true;
    this.event("rt", "Capnography connected — I'll call out the EtCO₂; keep it above 10 to 15 for good CPR.", true);
  }

  cmdReversible() {
    this.event(
      "recorder",
      "Reviewing reversible causes — the H's and T's: " + HS_AND_TS.join(", ") + ".",
      true
    );
    this.event("coach", `For this patient, think hard about: ${this.s.reversibleCause}. ${this.s.reversibleHint}`, true);
    if (!this.reversibleAddressed) {
      // verbally acknowledging counts as partial; the actual fix (fluid/airway) confirms it
      this.reversibleAddressed = false;
    }
  }

  cmdLabs() {
    this.labsDrawn = true;
    this.event(
      "bedsideNurse",
      "Drawing a blood gas and point-of-care labs — glucose, potassium, and ionized calcium back shortly.",
      true
    );
  }

  cmdStatus() {
    const since = this.lastEpi ? `${Math.round((performance.now() - this.lastEpi) / 60000 * 10) / 10} min since last epi` : "no epi yet";
    this.event(
      "recorder",
      `Status: ${fmtTime(this.clockMs())} elapsed, cycle ${this.cycleNumber + 1}, ` +
        `${this.shocks} shock${this.shocks === 1 ? "" : "s"}, ${this.epiCount} epi (${since}), ` +
        `rhythm ${rhythmName(this.rhythm)}, access ${this.access || "none"}, ` +
        `airway ${this.airwaySecured ? "secured" : "bag-mask"}.`,
      true
    );
  }

  cmdCallIt() {
    this.event("recorder", "Team leader has called the code.", true);
    this.endCode("called");
  }

  endCode(reason) {
    if (this.ended) return;
    this.ended = true;
    this.compressions = false;
    clearInterval(this._loop);
    this.ui.stopCPR();
    this.ui.showDebrief(this.score(reason), reason);
  }

  /* --- scoring / debrief --- */
  score(reason) {
    const m = this.metrics;
    const totalMs = this.clockMs();
    const items = [];
    const add = (label, pass, detail, tip) => items.push({ label, pass, detail, tip });

    add(
      "Early high-quality CPR",
      m.tFirstCompression != null && m.tFirstCompression < 20000,
      m.tFirstCompression != null ? `Compressions began at ${fmtTime(m.tFirstCompression)}` : "Compressions were never started",
      "Start compressions within ~10 seconds of recognizing arrest."
    );
    add(
      "Monitor / pads applied",
      m.tMonitor != null,
      m.tMonitor != null ? `Monitor on at ${fmtTime(m.tMonitor)}` : "Monitor never attached",
      "Attach the monitor/defibrillator as soon as it arrives to identify the rhythm."
    );
    const cprFraction = totalMs > 0 ? Math.round((m.compressionTimeMs / totalMs) * 100) : 0;
    add(
      "Chest-compression fraction ≥ 60%",
      cprFraction >= 60,
      `CCF ≈ ${cprFraction}% of the code`,
      "Minimize pauses — aim for a compression fraction above 60%, ideally 80%."
    );

    if (this.s.initialRhythm === "VF" || this.s.initialRhythm === "pVT") {
      add(
        "Defibrillation delivered",
        m.shockableShocksDelivered > 0,
        m.tFirstShock != null ? `First shock at ${fmtTime(m.tFirstShock)} (${m.shockableShocksDelivered} total)` : "No shock delivered",
        "Shock VF/pVT as soon as the charged defibrillator is ready. First 2 J/kg, then 4 J/kg, then ≥4 J/kg (max 10 J/kg / adult dose)."
      );
      add(
        "Antiarrhythmic for refractory rhythm",
        this.amioCount > 0 || this.lidoGiven,
        this.amioCount > 0 ? `Amiodarone ×${this.amioCount}` : this.lidoGiven ? "Lidocaine given" : "None given",
        "Give amiodarone 5 mg/kg (or lidocaine 1 mg/kg) for VF/pVT refractory to shocks + epi."
      );
    } else {
      add(
        "Reversible cause addressed",
        this.reversibleAddressed,
        this.reversibleAddressed ? `Treated ${this.s.reversibleCause}` : `Cause (${this.s.reversibleCause}) not treated`,
        "In PEA/asystole, the reversible cause IS the treatment — work the H's and T's."
      );
    }

    add(
      "Vascular access (IV/IO)",
      this.access != null,
      this.access ? `${this.access} established` : "No access obtained",
      "Get IV/IO access early — IO is fast and reliable in arrest."
    );
    add(
      "Epinephrine given",
      this.epiCount > 0,
      this.epiCount > 0 ? `${this.epiCount} dose(s), first at ${m.tFirstEpi != null ? fmtTime(m.tFirstEpi) : "?"}` : "No epinephrine",
      "Epi 0.01 mg/kg IV/IO every 3–5 min. In non-shockable rhythms, give it ASAP."
    );
    add(
      "Compressor rotation",
      this.compressorSwaps > 0 || totalMs < 130000,
      `${this.compressorSwaps} rotation(s)`,
      "Rotate compressors about every 2 minutes to prevent fatigue."
    );
    add(
      "Advanced airway / oxygenation",
      this.airwaySecured || this.ventilating,
      this.airwaySecured ? "Advanced airway placed" : this.ventilating ? "Effective bag-mask ventilation" : "Airway not managed",
      "Ensure oxygenation/ventilation; capnography confirms tube placement and CPR quality."
    );

    const passed = items.filter((i) => i.pass).length;
    const pct = Math.round((passed / items.length) * 100);
    return { items, passed, total: items.length, pct, reason, totalTime: fmtTime(totalMs), cprFraction };
  }
}

/* helpers */
function rhythmName(r) {
  return (
    {
      VF: "ventricular fibrillation",
      pVT: "pulseless ventricular tachycardia",
      asystole: "asystole",
      PEA: "pulseless electrical activity",
      ROSC: "an organized perfusing rhythm",
      sinus: "normal sinus rhythm",
    }[r] || r
  );
}
function energyLabel(idx) {
  return idx === 0 ? "first / 2 J·kg" : idx === 1 ? "second / 4 J·kg" : "≥4 J·kg";
}
function fmtTime(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/* =====================================================================
   9. UI  / wiring
   ===================================================================== */

class App {
  constructor() {
    this.scenario = null;
    this.scene = null;
    this.monitor = null;
    this.audio = new Audio();
    this.engine = new Engine(this);
    this.voice = new Voice(
      (alts) => this.onVoice(alts),
      (state) => this.onVoiceState(state)
    );
    this.voice.loadVoices();
    this.bindSetup();
  }

  /* ---- setup screen ---- */
  bindSetup() {
    const grid = document.getElementById("scenarioGrid");
    SCENARIOS.forEach((sc) => {
      const d = doseCard(sc.weightKg);
      const card = document.createElement("button");
      card.className = "scn-card";
      card.innerHTML = `
        <div class="scn-head">
          <span class="scn-name">${sc.name}</span>
          <span class="scn-rhythm rhythm-${sc.initialRhythm}">${sc.initialRhythm}</span>
        </div>
        <div class="scn-age">${sc.ageLabel} · ${sc.weightKg} kg</div>
        <p class="scn-hist">${sc.history}</p>
        <div class="scn-doses">
          <span><b>Epi</b> ${d.epiMg} mg</span>
          <span><b>Defib</b> ${d.energy1}→${d.energy2} J</span>
          <span><b>Amio</b> ${d.amioMg} mg</span>
        </div>
        <span class="scn-go">Run this code →</span>`;
      card.addEventListener("click", () => this.launch(sc));
      grid.appendChild(card);
    });
  }

  launch(scenario) {
    this.scenario = scenario;
    document.getElementById("setup").classList.add("hidden");
    document.getElementById("sim").classList.remove("hidden");

    // build 3D scene + monitor
    this.scene = new Scene3D(document.getElementById("scene"));
    this.scene.build(scenario.sizeKey);
    this.monitor = new Monitor();
    this.monitor.set({ rhythm: scenario.initialRhythm, hr: 0, spo2: 0, etco2: 0, bp: "--/--" });
    this.scene.attachMonitor(this.monitor.texture);
    const hud = document.getElementById("hudMonitor");
    if (hud) this.monitor.setHudCanvas(hud);

    this.renderDoseCard();
    this.engine.start(scenario);
    this.bindSim();
  }

  renderDoseCard() {
    const dose = doseCard(this.scenario.weightKg);
    document.getElementById("doseCard").innerHTML = `
      <h3>${this.scenario.name} — ${this.scenario.ageLabel}</h3>
      <div class="dose-weight">${this.scenario.weightKg} kg</div>
      <table>
        <tr><td>Epinephrine</td><td><b>${dose.epiMg} mg</b> <span>(${dose.epiMl} mL of 0.1 mg/mL)</span></td></tr>
        <tr><td>Defibrillation</td><td><b>${dose.energy1} J</b> → ${dose.energy2} J → up to ${dose.energyMax} J</td></tr>
        <tr><td>Amiodarone</td><td><b>${dose.amioMg} mg</b> bolus (×3 max)</td></tr>
        <tr><td>Lidocaine</td><td><b>${dose.lidoMg} mg</b></td></tr>
        <tr><td>Fluid bolus</td><td><b>${dose.bolus20} mL</b> (20 mL/kg) · ${dose.bolus10} mL if cardiac</td></tr>
      </table>
      <p class="dose-note">Epi 0.01 mg/kg IV/IO q3–5min · Push hard ≥⅓ AP chest, 100–120/min · Ratio 15:2 (2 rescuers) → continuous once airway secured.</p>`;
  }

  bindSim() {
    // push-to-talk
    const ptt = document.getElementById("ptt");
    const startPtt = (e) => {
      e.preventDefault();
      this.audio.ensure();
      this.voice.start(false);
    };
    ptt.addEventListener("mousedown", startPtt);
    ptt.addEventListener("touchstart", startPtt, { passive: false });
    const endPtt = () => this.voice.stop();
    ptt.addEventListener("mouseup", endPtt);
    ptt.addEventListener("mouseleave", endPtt);
    ptt.addEventListener("touchend", endPtt);

    // hands-free toggle
    document.getElementById("handsFree").addEventListener("change", (e) => {
      this.audio.ensure();
      if (e.target.checked) this.voice.start(true);
      else this.voice.stop();
    });

    // text command fallback
    const form = document.getElementById("cmdForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inp = document.getElementById("cmdInput");
      if (inp.value.trim()) {
        this.runCommand([inp.value.trim()]);
        inp.value = "";
      }
    });

    // quick action buttons
    document.querySelectorAll("[data-cmd]").forEach((b) =>
      b.addEventListener("click", () => this.engine.handle({ id: b.dataset.cmd, raw: b.textContent }))
    );

    document.getElementById("helpBtn").addEventListener("click", () => this.toggleHelp());
    document.getElementById("endBtn").addEventListener("click", () => this.engine.cmdCallIt());
    document.getElementById("restartBtn").addEventListener("click", () => location.reload());

    // mic support note
    if (!this.voice.supported) {
      document.getElementById("micNote").textContent =
        "Voice recognition isn't supported in this browser. Use Chrome/Edge for voice, or type orders below.";
      ptt.disabled = true;
      document.getElementById("handsFree").disabled = true;
    }
  }

  runCommand(alts) {
    const intent = parseIntent(alts);
    document.getElementById("heard").textContent = `“${alts[0]}”`;
    this.engine.handle(intent);
  }

  onVoice(alts) {
    this.runCommand(alts);
  }
  onVoiceState(state) {
    const el = document.getElementById("micState");
    if (state === "denied") {
      el.textContent = "Mic blocked";
      el.className = "mic-state denied";
      return;
    }
    const listening = this.voice.listening;
    el.textContent = listening ? "Listening…" : "Mic idle";
    el.className = "mic-state " + (listening ? "live" : "");
    document.getElementById("ptt").classList.toggle("active", listening);
  }

  /* ---- engine callbacks ---- */
  speak(role, text) {
    this.voice.say(text, ROLE_VOICE[role] || {});
  }
  appendLog(ts, role, text) {
    const feed = document.getElementById("logFeed");
    const row = document.createElement("div");
    row.className = "log-row role-" + role;
    row.innerHTML = `<span class="log-ts">${ts}</span><span class="log-role">${roleLabel(role)}</span><span class="log-text">${text}</span>`;
    feed.appendChild(row);
    feed.scrollTop = feed.scrollHeight;
  }
  setRhythm(r, compressions) {
    const vit = vitalsFor(r, compressions);
    this.monitor.set({ rhythm: r, compressions, ...vit });
  }
  startCPR() {
    this.scene.setCompressions(true);
    this.audio.startMetronome();
    this.monitor.set({ compressions: true });
  }
  stopCPR() {
    this.scene && this.scene.setCompressions(false);
    this.audio.stopMetronome();
    this.monitor && this.monitor.set({ compressions: false });
  }
  setVentilating(on) {
    this.scene && this.scene.setVentilating(on);
  }
  charge() {
    this.audio.charge();
  }
  shock() {
    this.audio.shock();
    const sc = document.getElementById("scene");
    sc.classList.add("shock-flash");
    setTimeout(() => sc.classList.remove("shock-flash"), 250);
  }
  flashCycle() {
    this.audio.alarm();
    const el = document.getElementById("cycleTimer");
    el.classList.add("due");
    setTimeout(() => el.classList.remove("due"), 4000);
  }
  refresh() {
    const e = this.engine;
    if (!e.s) return;
    document.getElementById("codeTimer").textContent = fmtTime(e.clockMs());
    document.getElementById("cycleTimer").textContent = e.cycleStart ? fmtTime(e.cycleMs()) : "00:00";
    document.getElementById("statShocks").textContent = e.shocks;
    document.getElementById("statEpi").textContent = e.epiCount;
    document.getElementById("statRhythm").textContent = e.rhythm;
    document.getElementById("statRhythm").className = "stat-val rhythm-" + e.rhythm;
    document.getElementById("statAccess").textContent = e.access || "none";
    document.getElementById("statAirway").textContent = e.airwaySecured ? "advanced" : "BVM";
    // live vitals on monitor reflecting CPR
    if (!e.perfusing()) {
      const v = vitalsFor(e.rhythm, e.compressions);
      this.monitor.set(v);
    }
  }
  toggleHelp() {
    document.getElementById("helpPanel").classList.toggle("hidden");
  }
  showDebrief(score, reason) {
    const modal = document.getElementById("debrief");
    modal.classList.remove("hidden");
    const verdict =
      reason === "rosc"
        ? `<span class="verdict good">ROSC achieved</span>`
        : `<span class="verdict end">Code terminated</span>`;
    let rows = score.items
      .map(
        (i) => `
      <div class="db-item ${i.pass ? "pass" : "fail"}">
        <span class="db-mark">${i.pass ? "✓" : "✕"}</span>
        <div class="db-body">
          <div class="db-label">${i.label}</div>
          <div class="db-detail">${i.detail}</div>
          ${i.pass ? "" : `<div class="db-tip">PALS: ${i.tip}</div>`}
        </div>
      </div>`
      )
      .join("");
    document.getElementById("debriefBody").innerHTML = `
      <div class="db-summary">
        ${verdict}
        <div class="db-score"><span>${score.pct}%</span><small>${score.passed}/${score.total} objectives</small></div>
        <div class="db-meta">Code length ${score.totalTime} · CPR fraction ≈ ${score.cprFraction}%</div>
      </div>
      <div class="db-list">${rows}</div>`;
  }
}

function roleLabel(role) {
  return (
    {
      recorder: "Recorder",
      coach: "CPR Coach",
      medNurse: "Med Nurse",
      bedsideNurse: "Bedside RN",
      airway: "Airway",
      rt: "RT",
      compressor: "Compressor",
    }[role] || role
  );
}

/* Vitals shown on the monitor for a given rhythm/CPR state */
function vitalsFor(r, compressions) {
  switch (r) {
    case "VF":
    case "pVT":
      return { hr: r === "pVT" ? 220 : 0, spo2: compressions ? 70 : 0, etco2: compressions ? 14 : 0, bp: compressions ? "—(CPR)" : "--/--" };
    case "asystole":
      return { hr: 0, spo2: compressions ? 65 : 0, etco2: compressions ? 11 : 0, bp: compressions ? "—(CPR)" : "--/--" };
    case "PEA":
      return { hr: 70, spo2: compressions ? 72 : 0, etco2: compressions ? 13 : 0, bp: "--/--" };
    case "ROSC":
    case "sinus":
      return { hr: 124, spo2: 96, etco2: 38, bp: "92/58" };
    default:
      return {};
  }
}

/* boot */
window.addEventListener("DOMContentLoaded", () => new App());
