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
   4b. MICROPHONE  (explicit getUserMedia permission + live level meter)
   ---------------------------------------------------------------------
   The Web Speech API requests the mic on its own, but to give the user a
   clear permission moment and visible confirmation that audio is being
   captured, we open an explicit getUserMedia() stream and drive a live
   input-level meter from an AnalyserNode.
   ===================================================================== */

class Mic {
  constructor(onLevel, onStatus) {
    this.onLevel = onLevel || (() => {});
    this.onStatus = onStatus || (() => {});
    this.stream = null;
    this.ctx = null;
    this.analyser = null;
    this.raf = null;
    this.enabled = false;
    this.supported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  async enable() {
    if (!this.supported) {
      this.onStatus("unsupported");
      return false;
    }
    if (this.enabled) return true;
    this.onStatus("requesting");
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
    } catch (err) {
      this.onStatus(err && err.name === "NotAllowedError" ? "denied" : "error");
      return false;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AC();
    if (this.ctx.state === "suspended") await this.ctx.resume();
    const src = this.ctx.createMediaStreamSource(this.stream);
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 512;
    this.analyser.smoothingTimeConstant = 0.75;
    src.connect(this.analyser);
    this.buf = new Uint8Array(this.analyser.fftSize);
    this.enabled = true;
    this.onStatus("granted");
    this._loop();
    return true;
  }

  _loop() {
    this.analyser.getByteTimeDomainData(this.buf);
    let sum = 0;
    for (let i = 0; i < this.buf.length; i++) {
      const v = (this.buf[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / this.buf.length);
    // perceptual scaling 0..1
    this.onLevel(Math.min(1, rms * 3.2));
    this.raf = requestAnimationFrame(() => this._loop());
  }

  stop() {
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.stream) this.stream.getTracks().forEach((t) => t.stop());
    if (this.ctx) this.ctx.close();
    this.enabled = false;
    this.stream = this.ctx = this.analyser = null;
  }
}

/* =====================================================================
   5. 3D SCENE
   ===================================================================== */

class Scene3D {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    if ("outputColorSpace" in this.renderer) this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0e1c22);
    this.scene.fog = new THREE.Fog(0x0e1c22, 11, 28);

    this.camera = new THREE.PerspectiveCamera(58, 1, 0.1, 100);
    // First person: standing at the FOOT of the bed, ~eye height, looking
    // toward the patient's head.
    this.camera.position.set(0, 1.62, 4.2);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.target.set(0, 1.0, -0.2); // patient torso
    this.controls.enablePan = false;
    this.controls.minDistance = 1.6;
    this.controls.maxDistance = 6.5;
    this.controls.maxPolarAngle = Math.PI * 0.62;
    this.controls.minPolarAngle = Math.PI * 0.16;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;

    this.clock = new THREE.Clock();
    this.compressionsActive = false;
    this.compressor = null;
    this.patientGroup = null;
    this.chest = null;
    this.bvm = null;
    this.ventilating = false;
    this.avatars = {};            // keyed by engine role -> { group, body, head, ring, baseY }
    this._defibGlow = null;
    this._defibCharged = false;
    this._chargeFxUntil = 0;
    this._shockFxUntil = 0;

    this._resize();
    window.addEventListener("resize", () => this._resize());
    this.renderer.setAnimationLoop(() => this._tick());
  }

  _light() {
    // Cool clinical ambient
    const amb = new THREE.AmbientLight(0xcfe7ef, 0.5);
    this.scene.add(amb);
    const hemi = new THREE.HemisphereLight(0xeaf6ff, 0x223033, 0.55);
    this.scene.add(hemi);
    // Ceiling fluorescent fill
    const fill = new THREE.DirectionalLight(0xffffff, 0.55);
    fill.position.set(-4, 7, 4);
    this.scene.add(fill);
    // Key with shadows
    const key = new THREE.DirectionalLight(0xffffff, 0.85);
    key.position.set(3, 8, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 24;
    key.shadow.camera.left = -8;
    key.shadow.camera.right = 8;
    key.shadow.camera.top = 8;
    key.shadow.camera.bottom = -8;
    key.shadow.bias = -0.0005;
    this.scene.add(key);

    // Surgical overhead light cluster directly over the bed
    const lightGroup = new THREE.Group();
    const spot = new THREE.SpotLight(0xffffff, 2.2, 16, Math.PI / 5, 0.45, 1.1);
    spot.position.set(0, 5.2, -0.4);
    spot.target.position.set(0, 0.9, -0.4);
    spot.castShadow = true;
    this.scene.add(spot);
    this.scene.add(spot.target);
    // Twin lamp heads on an articulated arm
    const lampMat = new THREE.MeshStandardMaterial({ color: 0xf2f6f7, metalness: 0.6, roughness: 0.35, emissive: 0x9fb9bd, emissiveIntensity: 0.5 });
    const armMat = new THREE.MeshStandardMaterial({ color: 0xb8c4c6, metalness: 0.7, roughness: 0.4 });
    for (const dx of [-0.55, 0.55]) {
      const head = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.16, 28), lampMat);
      head.position.set(dx, 4.78, -0.4);
      lightGroup.add(head);
      const lens = new THREE.Mesh(new THREE.CircleGeometry(0.4, 28), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      lens.rotation.x = Math.PI / 2;
      lens.position.set(dx, 4.69, -0.4);
      lightGroup.add(lens);
    }
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.08, 0.08), armMat);
    arm.position.set(0, 4.85, -0.4);
    lightGroup.add(arm);
    const drop = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.4, 16), armMat);
    drop.position.set(0, 5.5, -0.4);
    lightGroup.add(drop);
    this.scene.add(lightGroup);
  }

  _room() {
    // --- Tiled vinyl floor (canvas texture) ---
    const floorTex = makeTileTexture();
    floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(12, 12);
    const floorMat = new THREE.MeshStandardMaterial({ map: floorTex, color: 0xcfe0dc, roughness: 0.55, metalness: 0.05 });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    // --- Ceiling with recessed light panels ---
    const ceilMat = new THREE.MeshStandardMaterial({ color: 0xeaf2f1, roughness: 1 });
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), ceilMat);
    ceil.rotation.x = Math.PI / 2;
    ceil.position.y = 6;
    this.scene.add(ceil);
    const panelMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xdff3ff, emissiveIntensity: 0.8 });
    for (const [px, pz] of [[-2.4, -1.5], [2.4, -1.5], [-2.4, 1.5], [2.4, 1.5]]) {
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.8), panelMat);
      panel.rotation.x = Math.PI / 2;
      panel.position.set(px, 5.98, pz);
      this.scene.add(panel);
    }

    // --- Walls ---
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xdfeae8, roughness: 0.95 });
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x2a4d48, roughness: 0.8 });
    const back = new THREE.Mesh(new THREE.PlaneGeometry(24, 6), wallMat);
    back.position.set(0, 3, -3.4);
    back.receiveShadow = true;
    this.scene.add(back);
    // skirting / bumper rail on back wall
    const rail = new THREE.Mesh(new THREE.BoxGeometry(24, 0.18, 0.06), baseMat);
    rail.position.set(0, 0.9, -3.37);
    this.scene.add(rail);
    const left = new THREE.Mesh(new THREE.PlaneGeometry(14, 6), wallMat);
    left.rotation.y = Math.PI / 2;
    left.position.set(-5.5, 3, 0);
    left.receiveShadow = true;
    this.scene.add(left);
    const right = left.clone();
    right.rotation.y = -Math.PI / 2;
    right.position.set(5.5, 3, 0);
    this.scene.add(right);

    this._headwall();
    this._curtain();
    this._counter();
  }

  // Headwall behind the patient: medical gas outlets, O2 flowmeter, suction.
  _headwall() {
    const g = new THREE.Group();
    // Stainless headwall console strip
    const stripMat = new THREE.MeshStandardMaterial({ color: 0xc8d2d3, metalness: 0.65, roughness: 0.35 });
    const strip = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.7, 0.08), stripMat);
    strip.position.set(0, 2.15, -3.33);
    g.add(strip);
    // Gas outlets: O2 (green), Air (yellow), Vacuum (white)
    const gasColors = [0x2ecc71, 0xf1c40f, 0xecf0f1];
    gasColors.forEach((c, i) => {
      const outlet = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.08, 16),
        new THREE.MeshStandardMaterial({ color: c, metalness: 0.4, roughness: 0.5 })
      );
      outlet.rotation.x = Math.PI / 2;
      outlet.position.set(-0.9 + i * 0.42, 2.15, -3.27);
      g.add(outlet);
    });
    // O2 flowmeter (glass tube + green ball)
    const flowBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.34, 12),
      new THREE.MeshStandardMaterial({ color: 0xbfe9ff, transparent: true, opacity: 0.6 })
    );
    flowBody.position.set(0.7, 2.2, -3.25);
    g.add(flowBody);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 10), new THREE.MeshStandardMaterial({ color: 0x2ecc71, emissive: 0x125c2c }));
    ball.position.set(0.7, 2.16, -3.23);
    g.add(ball);
    // Wall suction canister
    const canister = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.09, 0.34, 16),
      new THREE.MeshStandardMaterial({ color: 0xeaf6f8, transparent: true, opacity: 0.85 })
    );
    canister.position.set(1.25, 2.0, -3.22);
    g.add(canister);
    // Backlit "BAY 4" sign
    const sign = makeSignSprite("RESUS · BAY 4");
    sign.position.set(-1.4, 2.75, -3.2);
    sign.scale.set(1.1, 0.28, 1);
    g.add(sign);
    this.scene.add(g);
  }

  // Privacy curtain on a ceiling track along the right side.
  _curtain() {
    const g = new THREE.Group();
    const trackMat = new THREE.MeshStandardMaterial({ color: 0xaab4b6, metalness: 0.6, roughness: 0.4 });
    const track = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 5.2), trackMat);
    track.position.set(3.4, 4.4, -0.6);
    g.add(track);
    const curtainMat = new THREE.MeshStandardMaterial({ color: 0x3aa3a0, roughness: 1, side: THREE.DoubleSide });
    // pleated curtain via several panels
    for (let i = 0; i < 14; i++) {
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 2.6), curtainMat);
      panel.position.set(3.4, 3.0, -2.7 + i * 0.32);
      panel.rotation.y = (i % 2 ? 1 : -1) * 0.5;
      g.add(panel);
    }
    this.scene.add(g);
  }

  // Supply counter + sink along the left wall.
  _counter() {
    const g = new THREE.Group();
    const topMat = new THREE.MeshStandardMaterial({ color: 0xdfe7e7, roughness: 0.5 });
    const cabMat = new THREE.MeshStandardMaterial({ color: 0xe8eded, roughness: 0.7 });
    const counter = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.06, 3.2), topMat);
    counter.position.set(-4.7, 0.92, -0.6);
    counter.castShadow = counter.receiveShadow = true;
    g.add(counter);
    const cab = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.9, 3.1), cabMat);
    cab.position.set(-4.72, 0.45, -0.6);
    g.add(cab);
    // Sink basin
    const sink = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.12, 0.4), new THREE.MeshStandardMaterial({ color: 0xb9c6c7, metalness: 0.7, roughness: 0.3 }));
    sink.position.set(-4.62, 0.9, 0.5);
    g.add(sink);
    const faucet = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.012, 8, 16, Math.PI), new THREE.MeshStandardMaterial({ color: 0x9fb0b1, metalness: 0.8, roughness: 0.2 }));
    faucet.position.set(-4.62, 0.98, 0.62);
    faucet.rotation.y = Math.PI / 2;
    g.add(faucet);
    // Glove boxes + supply bins on the counter
    const binColors = [0x2f80ed, 0x6fcf97, 0xf2994a];
    binColors.forEach((c, i) => {
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.3), new THREE.MeshStandardMaterial({ color: c, roughness: 0.6 }));
      box.position.set(-4.66, 1.03, -1.6 + i * 0.34);
      g.add(box);
    });
    // Wall-mounted sharps container (red)
    const sharps = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.3, 0.18), new THREE.MeshStandardMaterial({ color: 0xc0392b, roughness: 0.5 }));
    sharps.position.set(-5.35, 1.5, -1.8);
    g.add(sharps);
    this.scene.add(g);
  }

  _bed() {
    const g = new THREE.Group();
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x9fb0b2, metalness: 0.6, roughness: 0.4 });
    const matMat = new THREE.MeshStandardMaterial({ color: 0xeaf4f2, roughness: 0.85 });
    const sheetMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
    // Mattress — long axis along Z (head at -Z, foot at +Z)
    const mattress = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.16, 2.4), matMat);
    mattress.position.set(0, 0.83, 0.1);
    mattress.castShadow = mattress.receiveShadow = true;
    g.add(mattress);
    // White draw sheet over the mattress
    const sheet = new THREE.Mesh(new THREE.BoxGeometry(0.97, 0.04, 1.9), sheetMat);
    sheet.position.set(0, 0.92, 0.25);
    sheet.receiveShadow = true;
    g.add(sheet);
    // Pillow at head
    const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.34), sheetMat);
    pillow.position.set(0, 0.95, -1.0);
    g.add(pillow);
    // Frame base
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.4, 2.5), frameMat);
    base.position.set(0, 0.6, 0.1);
    base.castShadow = true;
    g.add(base);
    // Head + foot boards
    const boardMat = new THREE.MeshStandardMaterial({ color: 0xdfe7e7, roughness: 0.6 });
    const headBoard = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.5, 0.06), boardMat);
    headBoard.position.set(0, 1.05, -1.18);
    g.add(headBoard);
    const footBoard = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.45, 0.06), boardMat);
    footBoard.position.set(0, 1.0, 1.35);
    g.add(footBoard);
    // Side rails (both sides)
    const railMat = new THREE.MeshStandardMaterial({ color: 0xc4d0d1, metalness: 0.7, roughness: 0.3 });
    for (const sx of [-0.52, 0.52]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.28, 1.4), railMat);
      rail.position.set(sx, 1.08, 0.1);
      g.add(rail);
      for (const rz of [-0.5, 0.1, 0.7]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.28, 8), railMat);
        post.position.set(sx, 1.0, rz);
        g.add(post);
      }
    }
    // Casters
    for (const [x, z] of [[-0.42, -0.95], [0.42, -0.95], [-0.42, 1.15], [0.42, 1.15]]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.42, 10), frameMat);
      leg.position.set(x, 0.21, z);
      g.add(leg);
      const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.025, 8, 16), new THREE.MeshStandardMaterial({ color: 0x2b2b2b }));
      wheel.rotation.y = Math.PI / 2;
      wheel.position.set(x, 0.06, z);
      g.add(wheel);
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

  _avatar(color, x, z, label, faceCenter = true, skinTone = 0xe8c9a8) {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0.0 });
    const skin = new THREE.MeshStandardMaterial({ color: skinTone, roughness: 0.6 });

    const bodyGroup = new THREE.Group();
    // Torso (scrub top)
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.21, 0.5, 6, 14), mat);
    body.position.y = 1.02;
    body.castShadow = true;
    bodyGroup.add(body);
    // Hips / scrub pants
    const hips = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.17, 0.5, 14), new THREE.MeshStandardMaterial({ color: 0x46545a, roughness: 0.8 }));
    hips.position.y = 0.55;
    hips.castShadow = true;
    bodyGroup.add(hips);
    // Shoulders + arms (slightly forward, working posture)
    for (const sx of [-1, 1]) {
      const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 0.42, 4, 8), skin);
      arm.position.set(sx * 0.26, 0.92, 0.08);
      arm.rotation.x = -0.5;
      arm.castShadow = true;
      bodyGroup.add(arm);
    }
    // Head + face
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.165, 22, 22), skin);
    head.position.y = 1.5;
    head.castShadow = true;
    bodyGroup.add(head);
    // Surgical mask
    const mask = new THREE.Mesh(new THREE.SphereGeometry(0.168, 18, 12, 0, Math.PI * 2, Math.PI * 0.55, Math.PI * 0.32), new THREE.MeshStandardMaterial({ color: 0xeaf2f4, roughness: 0.9 }));
    mask.position.y = 1.5;
    mask.rotation.x = 0.1;
    bodyGroup.add(mask);
    // Scrub cap (color-matched to role)
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.178, 18, 16, 0, Math.PI * 2, 0, Math.PI / 2), mat);
    cap.position.y = 1.52;
    bodyGroup.add(cap);
    g.add(bodyGroup);

    // Speaking glow ring at the feet
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.32, 0.03, 10, 28),
      new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0, transparent: true, opacity: 0.0 })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.05;
    g.add(ring);

    g.position.set(x, 0, z);
    if (faceCenter) g.lookAt(0, 1.05, -0.2);
    g.add(this._label(label, color));
    this.scene.add(g);
    return { group: g, bodyGroup, body, head, ring, baseY: 0, color: new THREE.Color(color) };
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
    // Each is keyed by its engine role so the engine's spoken events can
    // light up the right person (highlightRole).
    this.avatars.compressor = this._avatar(0x2f80ed, -0.95, -0.45, "Compressor", true, 0xe8c9a8);
    this.avatars.coach = this._avatar(0x6fcf97, -1.75, 0.1, "CPR Coach", true, 0xd9b48f);
    this.avatars.airway = this._avatar(0xeb5757, 0.0, -1.95, "Airway / MD", false, 0xc9a07a);
    this.avatars.rt = this._avatar(0xf2994a, 0.85, -1.7, "Resp Therapist", true, 0xe8c9a8);
    this.avatars.medNurse = this._avatar(0xbb6bd9, 1.6, -0.45, "Med Nurse", true, 0xb98a64);
    this.avatars.bedsideNurse = this._avatar(0x9b51e0, 1.5, 0.55, "Bedside RN", true, 0xe8c9a8);
    this.avatars.recorder = this._avatar(0x56ccf2, 1.95, 1.5, "Recorder", true, 0xd9b48f);

    // keep legacy references used by the animation loop
    this.compressor = this.avatars.compressor;
    this.airway = this.avatars.airway;
    // airway/MD stands at the head, facing down toward the patient's head
    this.airway.group.lookAt(0, 0.95, -0.95);
    // compressor leans in over the chest
    this.compressor.bodyGroup.rotation.x = 0.35;

    this._bvm();
  }

  // Bag-valve-mask in the airway provider's hands; squeezes when ventilating.
  _bvm() {
    const g = new THREE.Group();
    const bag = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 18, 14),
      new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.6 })
    );
    bag.scale.set(1, 1.5, 1);
    g.add(bag);
    this._bvmBag = bag;
    // mask cone toward the patient's face
    const mask = new THREE.Mesh(
      new THREE.ConeGeometry(0.07, 0.12, 16, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x9fd6cc, transparent: true, opacity: 0.7, side: THREE.DoubleSide })
    );
    mask.position.set(0, 0, -0.18);
    mask.rotation.x = -Math.PI / 2;
    g.add(mask);
    // reservoir tail
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, 0.2, 10), new THREE.MeshStandardMaterial({ color: 0x1c2833 }));
    tail.position.set(0, 0, 0.18);
    tail.rotation.x = Math.PI / 2;
    g.add(tail);
    g.position.set(0, 0.95, -0.92); // over the patient's face
    this.scene.add(g);
    this.bvm = g;
  }

  _crashCart() {
    const g = new THREE.Group();
    const red = new THREE.MeshStandardMaterial({ color: 0xc0392b, roughness: 0.55, metalness: 0.1 });
    const steel = new THREE.MeshStandardMaterial({ color: 0xbfc9ca, metalness: 0.7, roughness: 0.35 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.92, 0.5), red);
    body.position.y = 0.5;
    body.castShadow = true;
    g.add(body);
    // Drawers with handles + colored labels
    const drawerColors = [0xe74c3c, 0xe67e22, 0xf1c40f, 0x27ae60, 0x2980b9];
    for (let i = 0; i < 5; i++) {
      const drawer = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.15, 0.03), new THREE.MeshStandardMaterial({ color: drawerColors[i], roughness: 0.5 }));
      drawer.position.set(0, 0.18 + i * 0.165, 0.26);
      g.add(drawer);
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.02, 0.03), steel);
      handle.position.set(0, 0.18 + i * 0.165, 0.29);
      g.add(handle);
    }
    // Cart top
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.04, 0.54), steel);
    top.position.y = 0.98;
    g.add(top);
    // Push handle
    const ph = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.5, 8), steel);
    ph.rotation.z = Math.PI / 2;
    ph.position.set(0, 1.2, -0.24);
    g.add(ph);
    for (const sx of [-0.24, 0.24]) {
      const up = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.24, 8), steel);
      up.position.set(sx, 1.1, -0.24);
      g.add(up);
    }
    // O2 tank strapped to the side
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.5, 16), new THREE.MeshStandardMaterial({ color: 0x2ecc71, metalness: 0.4, roughness: 0.4 }));
    tank.position.set(-0.34, 0.5, -0.1);
    g.add(tank);
    // Casters
    for (const [x, z] of [[-0.24, -0.2], [0.24, -0.2], [-0.24, 0.2], [0.24, 0.2]]) {
      const w = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.02, 8, 14), new THREE.MeshStandardMaterial({ color: 0x222 }));
      w.rotation.y = Math.PI / 2;
      w.position.set(x, 0.05, z);
      g.add(w);
    }
    // Defibrillator sitting on top of the cart
    this._defib(g);

    g.position.set(2.35, 0, 0.1);
    g.rotation.y = -0.25;
    this.scene.add(g);
  }

  // Manual defibrillator / monitor with a live charge indicator.
  _defib(parent) {
    const g = new THREE.Group();
    const caseMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.5 });
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.3, 0.34), caseMat);
    box.position.y = 1.16;
    box.castShadow = true;
    g.add(box);
    // Screen
    const screenTex = makeDefibScreenTexture();
    this._defibScreenTex = screenTex;
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.2), new THREE.MeshBasicMaterial({ map: screenTex }));
    screen.position.set(-0.04, 1.18, 0.171);
    g.add(screen);
    // Charge-ready glow lamp
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.03, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xff3b30, emissive: 0x000000, emissiveIntensity: 1 })
    );
    glow.position.set(0.16, 1.26, 0.18);
    g.add(glow);
    this._defibGlow = glow;
    // Two paddles resting on top
    for (const sx of [-0.1, 0.1]) {
      const paddle = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.04, 16), new THREE.MeshStandardMaterial({ color: 0x2b2b2b }));
      paddle.position.set(sx, 1.33, -0.05);
      g.add(paddle);
    }
    parent.add(g);
  }

  // IV pole carrying two infusion pumps + fluid bags.
  _ivPole() {
    const g = new THREE.Group();
    const poleMat = new THREE.MeshStandardMaterial({ color: 0xc4d0d1, metalness: 0.75, roughness: 0.3 });
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2.1, 12), poleMat);
    pole.position.y = 1.05;
    g.add(pole);
    // hooks
    const hookBar = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 0.02), poleMat);
    hookBar.position.y = 2.05;
    g.add(hookBar);
    // Fluid bags
    const bagColors = [0xbfe9ff, 0xffe6a8];
    bagColors.forEach((c, i) => {
      const bag = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.04), new THREE.MeshStandardMaterial({ color: c, transparent: true, opacity: 0.8 }));
      bag.position.set(-0.18 + i * 0.36, 1.85, 0);
      g.add(bag);
    });
    // Infusion pumps
    for (let i = 0; i < 2; i++) {
      const pump = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.12), new THREE.MeshStandardMaterial({ color: 0x34495e, roughness: 0.5 }));
      pump.position.set(0, 1.2 - i * 0.18, 0.08);
      g.add(pump);
      const led = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.05), new THREE.MeshBasicMaterial({ color: 0x39ff88 }));
      led.position.set(0, 1.2 - i * 0.18, 0.141);
      g.add(led);
    }
    // base + casters
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.03, 16), poleMat);
    base.position.y = 0.05;
    g.add(base);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.3), poleMat);
      leg.position.set(Math.cos(a) * 0.13, 0.04, Math.sin(a) * 0.13);
      leg.rotation.y = -a;
      g.add(leg);
    }
    g.position.set(1.75, 0, -1.25);
    this.scene.add(g);
  }

  // Mechanical ventilator beside the head of the bed.
  _ventilator() {
    const g = new THREE.Group();
    const cabinet = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.6, 0.4), new THREE.MeshStandardMaterial({ color: 0xdfe7e7, roughness: 0.6 }));
    cabinet.position.y = 1.25;
    cabinet.castShadow = true;
    g.add(cabinet);
    // screen
    this._ventScreenTex = makeVentScreenTexture();
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.26), new THREE.MeshBasicMaterial({ map: this._ventScreenTex }));
    scr.position.set(0, 1.32, 0.201);
    g.add(scr);
    // pole
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.0, 12), new THREE.MeshStandardMaterial({ color: 0xb8c4c6, metalness: 0.6, roughness: 0.4 }));
    pole.position.y = 0.5;
    g.add(pole);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.05, 20), new THREE.MeshStandardMaterial({ color: 0x6d7b7d }));
    base.position.y = 0.03;
    g.add(base);
    // breathing circuit tubing (suggested with a torus)
    const tube = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.02, 8, 20, Math.PI), new THREE.MeshStandardMaterial({ color: 0xbfd8e0, transparent: true, opacity: 0.8 }));
    tube.position.set(0, 1.0, 0.2);
    g.add(tube);
    g.position.set(-1.85, 0, -1.35);
    g.rotation.y = 0.5;
    this.scene.add(g);
  }

  // Mayo stand with airway equipment near the head.
  _mayoStand() {
    const g = new THREE.Group();
    const steel = new THREE.MeshStandardMaterial({ color: 0xc4d0d1, metalness: 0.7, roughness: 0.3 });
    const tray = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 0.32), steel);
    tray.position.y = 1.0;
    g.add(tray);
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.0, 10), steel);
    post.position.set(-0.2, 0.5, 0);
    g.add(post);
    // laryngoscope (handle + blade)
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.12, 8), new THREE.MeshStandardMaterial({ color: 0x2b2b2b }));
    handle.position.set(-0.1, 1.02, -0.05);
    handle.rotation.z = 0.4;
    g.add(handle);
    // ET tubes (slim translucent cylinders)
    for (let i = 0; i < 3; i++) {
      const ett = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.22, 8), new THREE.MeshStandardMaterial({ color: 0xeaf6f8, transparent: true, opacity: 0.7 }));
      ett.position.set(0.02 + i * 0.03, 1.02, 0.05);
      ett.rotation.z = Math.PI / 2;
      ett.rotation.y = 0.1 * i;
      g.add(ett);
    }
    // syringe
    const syr = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.1, 10), new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 }));
    syr.position.set(0.16, 1.02, -0.04);
    syr.rotation.z = Math.PI / 2;
    g.add(syr);
    g.position.set(-0.7, 0, -1.95);
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

  // Light up the avatar whose role is currently speaking.
  highlightRole(role, ms = 2600) {
    const a = this.avatars[role];
    if (!a) return;
    a.speakUntil = performance.now() + ms;
  }

  // Defibrillator just charged: turn on the ready lamp + screen.
  defibCharge(joules) {
    this._defibCharged = true;
    this._defibJoules = joules || 0;
    this._chargeFxUntil = performance.now() + 6000;
    if (this._defibScreenTex) this._defibScreenTex.userData.update?.({ charged: true, joules });
  }
  // Shock delivered: brief flash, clear the charge.
  defibShock() {
    this._defibCharged = false;
    this._shockFxUntil = performance.now() + 350;
    if (this._defibScreenTex) this._defibScreenTex.userData.update?.({ charged: false, joules: 0 });
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
    const now = performance.now();

    // Compression animation: chest depresses, compressor leans/bobs in time.
    if (this.compressionsActive) {
      const phase = (t * (110 / 60)) % 1; // 110/min
      const depth = Math.max(0, Math.sin(phase * Math.PI * 2)) * 0.05;
      if (this.chest) this.chest.position.y = this._chestY - depth;
      if (this.compressor) {
        this.compressor.bodyGroup.position.y = -depth * 1.4;
        this.compressor.bodyGroup.rotation.x = 0.35 + depth * 0.6;
      }
    } else {
      if (this.chest) this.chest.position.y += (this._chestY - this.chest.position.y) * 0.2;
      if (this.compressor) {
        this.compressor.bodyGroup.position.y += (0 - this.compressor.bodyGroup.position.y) * 0.2;
        this.compressor.bodyGroup.rotation.x += (0.35 - this.compressor.bodyGroup.rotation.x) * 0.2;
      }
    }

    // BVM squeeze when ventilating (~20–30/min)
    if (this._bvmBag) {
      if (this.ventilating) {
        const sq = 1 - Math.max(0, Math.sin(t * 2.6)) * 0.35;
        this._bvmBag.scale.set(sq, 1.5 * sq, sq);
      } else {
        this._bvmBag.scale.set(1, 1.5, 1);
      }
    }

    // Idle breathing bob + speaking glow rings for every team member
    for (const key in this.avatars) {
      const a = this.avatars[key];
      const bob = Math.sin(t * 1.6 + a.group.position.x) * 0.012;
      if (key !== "compressor") a.bodyGroup.position.y = bob;
      const speaking = a.speakUntil && now < a.speakUntil;
      const target = speaking ? 0.9 : 0.0;
      const m = a.ring.material;
      m.emissiveIntensity += (target - m.emissiveIntensity) * 0.18;
      m.opacity += ((speaking ? 0.85 : 0.0) - m.opacity) * 0.18;
      const s = speaking ? 1 + Math.sin(t * 8) * 0.06 : 1;
      a.ring.scale.setScalar(s);
    }

    // Defibrillator ready lamp + screen pulse
    if (this._defibGlow) {
      const charged = this._defibCharged && now < this._chargeFxUntil;
      const shockFlash = now < this._shockFxUntil;
      const lit = shockFlash ? 1 : charged ? 0.6 + Math.sin(t * 10) * 0.4 : 0.0;
      this._defibGlow.material.emissive.setRGB(lit, lit * 0.25, 0);
      this._defibGlow.material.emissiveIntensity = lit;
    }
    if (this._defibScreenTex?.userData.tick) this._defibScreenTex.userData.tick(t);
    if (this._ventScreenTex?.userData.tick) this._ventScreenTex.userData.tick(t, this.ventilating);

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
    this._ivPole();
    this._ventilator();
    this._mayoStand();
  }
}

/* --- Procedural textures / sprites for the bay --------------------------- */
function makeTileTexture() {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 128;
  const c = cv.getContext("2d");
  c.fillStyle = "#dfeae8";
  c.fillRect(0, 0, 128, 128);
  c.strokeStyle = "rgba(120,150,148,0.45)";
  c.lineWidth = 2;
  c.strokeRect(0, 0, 128, 128);
  // subtle speckle
  for (let i = 0; i < 120; i++) {
    c.fillStyle = `rgba(150,170,168,${Math.random() * 0.18})`;
    c.fillRect(Math.random() * 128, Math.random() * 128, 2, 2);
  }
  return new THREE.CanvasTexture(cv);
}

function makeSignSprite(text) {
  const cv = document.createElement("canvas");
  cv.width = 256; cv.height = 64;
  const c = cv.getContext("2d");
  c.fillStyle = "#0e3a36";
  roundRect(c, 2, 2, 252, 60, 10); c.fill();
  c.strokeStyle = "#39ffae"; c.lineWidth = 3;
  roundRect(c, 2, 2, 252, 60, 10); c.stroke();
  c.fillStyle = "#aef7e3";
  c.font = "bold 26px Nunito, sans-serif";
  c.textAlign = "center"; c.textBaseline = "middle";
  c.fillText(text, 128, 34);
  const tex = new THREE.CanvasTexture(cv);
  return new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false }));
}

function makeDefibScreenTexture() {
  const cv = document.createElement("canvas");
  cv.width = 256; cv.height = 170;
  const c = cv.getContext("2d");
  const tex = new THREE.CanvasTexture(cv);
  let state = { charged: false, joules: 0 };
  const draw = (t = 0) => {
    c.fillStyle = "#05140f"; c.fillRect(0, 0, 256, 170);
    // mini ECG trace
    c.strokeStyle = "#39ff88"; c.lineWidth = 2; c.beginPath();
    for (let x = 0; x < 256; x++) {
      const p = ((x / 256) * 4 + t * 1.5) % 1;
      let y = 120;
      if (p > 0.2 && p < 0.23) y = 120 + 22;
      else if (p >= 0.23 && p < 0.27) y = 120 - 55;
      else if (p >= 0.27 && p < 0.3) y = 120 + 30;
      x === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
    }
    c.stroke();
    c.fillStyle = state.charged ? "#ff3b30" : "#9fe8d8";
    c.font = "bold 30px monospace"; c.textAlign = "left";
    c.fillText(state.charged ? `${state.joules} J` : "DEFIB", 12, 34);
    if (state.charged) {
      c.fillStyle = "#ff3b30"; c.font = "bold 18px monospace";
      c.fillText("CHARGED", 130, 34);
    }
    tex.needsUpdate = true;
  };
  draw(0);
  tex.userData.update = (s) => { Object.assign(state, s); draw(0); };
  tex.userData.tick = (t) => draw(t);
  return tex;
}

function makeVentScreenTexture() {
  const cv = document.createElement("canvas");
  cv.width = 220; cv.height = 170;
  const c = cv.getContext("2d");
  const tex = new THREE.CanvasTexture(cv);
  const draw = (t = 0, venting = false) => {
    c.fillStyle = "#0a1622"; c.fillRect(0, 0, 220, 170);
    c.fillStyle = "#7fd3ff"; c.font = "bold 16px monospace"; c.textAlign = "left";
    c.fillText("VENT", 8, 22);
    c.fillStyle = "#cfe9ff"; c.font = "12px monospace";
    c.fillText("Vt 6 mL/kg", 8, 120);
    c.fillText("RR 20  PEEP 5", 8, 138);
    c.fillText("FiO2 100%", 8, 156);
    // pressure waveform
    c.strokeStyle = "#39ff88"; c.lineWidth = 2; c.beginPath();
    for (let x = 0; x < 220; x++) {
      const p = ((x / 220) * 3 + t * 0.8) % 1;
      const y = 90 - (venting ? (p < 0.4 ? Math.sin((p / 0.4) * Math.PI) * 40 : 0) : 0);
      x === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
    }
    c.stroke();
    tex.needsUpdate = true;
  };
  draw(0, false);
  tex.userData.tick = (t, v) => draw(t, v);
  return tex;
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

  // SpO2 plethysmograph (0..1), pulse-synchronous
  _plethSample(p) {
    // sharp systolic upstroke + dicrotic notch
    if (p < 0.12) return Math.sin((p / 0.12) * (Math.PI / 2));
    if (p < 0.34) return Math.cos(((p - 0.12) / 0.22) * (Math.PI / 2)) * 0.55 + 0.45;
    if (p < 0.42) return 0.45 + Math.sin(((p - 0.34) / 0.08) * Math.PI) * 0.12; // dicrotic
    if (p < 0.85) return 0.45 * (1 - (p - 0.42) / 0.43);
    return 0;
  }

  // EtCO2 capnograph (0..1), respiration-synchronous square-ish plateau
  _capnoSample(p) {
    if (p < 0.55) return 0;                                   // inspiratory baseline
    if (p < 0.62) return ((p - 0.55) / 0.07);                 // rapid expiratory upstroke
    if (p < 0.92) return 0.85 + ((p - 0.62) / 0.3) * 0.15;    // alveolar plateau (slight rise)
    return Math.max(0, 1 - (p - 0.92) / 0.08);               // inspiratory downstroke
  }

  // Paint background + grid into a vertical strip of the waveform column.
  _paintStrip(ctx, x, w, H, Wt) {
    ctx.fillStyle = "#04110f";
    ctx.fillRect(x, 0, w, H);
    ctx.strokeStyle = "rgba(40,90,80,0.22)";
    ctx.lineWidth = 1;
    for (let gx = Math.floor(x / 32) * 32; gx <= x + w; gx += 32) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
    }
    for (let gy = 0; gy <= H; gy += 32) {
      ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x + w, gy); ctx.stroke();
    }
    // lane dividers
    const laneH = H / 3;
    ctx.strokeStyle = "rgba(120,200,180,0.16)";
    for (const ly of [laneH, laneH * 2]) {
      ctx.beginPath(); ctx.moveTo(x, ly); ctx.lineTo(x + w, ly); ctx.stroke();
    }
  }

  _drawSeg(ctx, key, color, sampleFn, lane, laneH, active) {
    const x = this.x;
    const base = lane + laneH * 0.78;
    const amp = laneH * 0.62;
    const last = this[key] ?? base;
    const y = active ? base - sampleFn() * amp : base;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(x - 1, last);
    ctx.lineTo(x, y);
    ctx.stroke();
    this[key] = y;
  }

  _draw() {
    const ctx = this.ctx;
    const W = this.canvas.width;
    const H = this.canvas.height;
    const Wt = Math.floor(W * 0.7);   // waveform column width
    const laneH = H / 3;              // three stacked lanes

    // One-time: paint the persistent waveform background.
    if (!this._mInit) {
      this._paintStrip(ctx, 0, Wt, H, Wt);
      this._mInit = true;
    }

    const perfusing = this.rhythm === "ROSC" || this.rhythm === "sinus";
    const beatHz = this.hr > 0 ? this.hr / 60 : 1;
    const speed = 5;

    for (let i = 0; i < speed; i++) {
      this.x = (this.x + 1) % Wt;
      this.tt += 1 / 60 / speed;
      // erase a strip just ahead of the cursor (keeps a persistent sweep)
      this._paintStrip(ctx, this.x, 16, H, Wt);

      // --- ECG lane ---
      let r = this.rhythm;
      if (this.compressions && (r === "asystole" || r === "PEA" || r === "VF" || r === "pVT")) r = "cpr";
      const pE = (r === "VF" || r === "asystole") ? this.tt : (this.tt * beatHz) % 1;
      this._drawSeg(ctx, "_lastE", "#39ff88", () => this._ecgSample(r, pE), 0, laneH, true);

      // --- Pleth lane (only with a perfusing pulse) ---
      const plethActive = this.spo2 > 0 && perfusing;
      const pP = (this.tt * beatHz) % 1;
      this._drawSeg(ctx, "_lastP", "#56ccf2", () => this._plethSample(pP), laneH, laneH, plethActive);

      // --- Capnography lane (whenever there's exhaled CO2) ---
      const capnoActive = this.etco2 > 0;
      const respHz = this.compressions && !perfusing ? 0.18 : 0.33; // ~10–20/min
      const pC = (this.tt * respHz) % 1;
      this._drawSeg(ctx, "_lastC", "#f2c94c", () => this._capnoSample(pC), laneH * 2, laneH, capnoActive);
    }

    // sweep cursor highlight
    if (this.x + 17 < Wt) {
      ctx.fillStyle = "rgba(180,255,220,0.25)";
      ctx.fillRect(this.x + 16, 0, 2, H);
    }

    // lane labels (repainted each frame with a small backing so they persist)
    ctx.textAlign = "left";
    ctx.font = "bold 20px Nunito, monospace";
    const label = (text, color, y) => {
      const w = ctx.measureText(text).width + 12;
      ctx.fillStyle = "rgba(4,17,15,0.85)";
      ctx.fillRect(6, y - 18, w, 24);
      ctx.fillStyle = color; ctx.fillText(text, 12, y);
    };
    label("ECG · Lead " + this.lead, "#39ff88", 26);
    label("SpO₂ Pleth", "#56ccf2", laneH + 26);
    label("EtCO₂ Capnography", "#f2c94c", laneH * 2 + 26);

    // Numeric panel (right column) — repainted every frame
    const px = W * 0.72;
    ctx.fillStyle = "#071a17";
    ctx.fillRect(px, 0, W - px, H);
    const alarm = (cond) => (cond ? "#eb5757" : null);
    const drawNum = (label, val, unit, color, y, alarmColor) => {
      ctx.fillStyle = alarmColor || color;
      ctx.font = "bold 26px Nunito, monospace";
      ctx.textAlign = "left";
      ctx.fillText(label, px + 18, y);
      ctx.font = "bold 64px Nunito, monospace";
      ctx.fillText(String(val), px + 18, y + 64);
      ctx.font = "bold 22px Nunito, monospace";
      ctx.fillText(unit, px + 18 + ctx.measureText(String(val)).width + 8, y + 64);
    };
    const blink = Math.floor(this.tt * 2) % 2 === 0;
    drawNum("HR", this.hr > 0 ? this.hr : "--", "bpm", "#39ff88", 40,
      alarm((this.hr === 0 || this.hr > 200) && blink));
    drawNum("SpO₂", this.spo2 > 0 ? this.spo2 : "--", "%", "#56ccf2", 175,
      alarm(this.spo2 > 0 && this.spo2 < 90 && blink));
    drawNum("EtCO₂", this.etco2 > 0 ? this.etco2 : "--", "mmHg", "#f2c94c", 310,
      alarm(this.etco2 > 0 && this.etco2 < 10 && blink));
    ctx.fillStyle = "#eb5757";
    ctx.font = "bold 26px Nunito, monospace";
    ctx.fillText("NIBP", px + 18, 470);
    ctx.font = "bold 46px Nunito, monospace";
    ctx.fillText(this.bp, px + 18, 520);

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
    this.ui.charge(this.chargedJoules);
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
    this.mic = new Mic(
      (level) => this.onMicLevel(level),
      (status) => this.onMicStatus(status)
    );
    this.bindSetup();
    this.bindMicSetup();
  }

  /* ---- microphone permission flow (setup screen) ---- */
  bindMicSetup() {
    const btn = document.getElementById("enableMic");
    if (!btn) return;
    if (!this.mic.supported) {
      this.onMicStatus("unsupported");
      return;
    }
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      await this.mic.enable();
      btn.disabled = false;
    });
  }

  onMicStatus(status) {
    const el = document.getElementById("micSetupState");
    const btn = document.getElementById("enableMic");
    const map = {
      idle: ["Microphone not yet enabled", ""],
      requesting: ["Requesting microphone access…", ""],
      granted: ["✓ Microphone live — you're ready to run the code", "ok"],
      denied: ["Microphone blocked. Allow it in your browser's site settings, then retry.", "bad"],
      error: ["Couldn't open the microphone. Check your device and retry.", "bad"],
      unsupported: ["This browser can't capture the microphone — you can still type orders.", "bad"],
    };
    const [text, cls] = map[status] || map.idle;
    if (el) {
      el.textContent = text;
      el.className = "mic-setup-state " + cls;
    }
    if (btn && status === "granted") btn.textContent = "Microphone enabled ✓";
    if (btn && (status === "unsupported")) btn.disabled = true;
    // reflect in the in-sim meter label too
    const live = document.getElementById("micMeterWrap");
    if (live) live.classList.toggle("hidden", status !== "granted");
  }

  onMicLevel(level) {
    const bar = document.getElementById("micMeterBar");
    if (bar) bar.style.transform = `scaleX(${level.toFixed(3)})`;
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
    // The card click is a valid user gesture — request the mic now if the
    // user didn't already enable it on the briefing screen.
    if (this.mic.supported && !this.mic.enabled) this.mic.enable();
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
    // light up whoever is talking, scaled to utterance length
    if (this.scene) this.scene.highlightRole(role, Math.min(7000, 1400 + text.length * 45));
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
  charge(joules) {
    this.audio.charge();
    if (this.scene) this.scene.defibCharge(joules);
  }
  shock() {
    this.audio.shock();
    if (this.scene) this.scene.defibShock();
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
