const STORAGE_KEY = "7h-sound";
const MIN_GAP_MS = 140;

type Listener = () => void;
const listeners = new Set<Listener>();

let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;
let lastPlay = 0;

export function isSoundEnabled(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true; // storage unavailable
  }
}

export function setSoundEnabled(on: boolean) {
  try {
    window.localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    /* storage unavailable: preference lasts for this page only */
  }
  listeners.forEach((l) => l());
}

export function subscribeSound(listener: Listener) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** The AudioContext is created lazily, and only from a user gesture. */
function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function getNoise(c: AudioContext): AudioBuffer {
  if (!noise) {
    const length = Math.floor(c.sampleRate * 0.12);
    noise = c.createBuffer(1, length, c.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  }
  return noise;
}

function burst(c: AudioContext, when: number, freq: number, q: number, dur: number, gain: number) {
  const src = c.createBufferSource();
  src.buffer = getNoise(c);
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = freq;
  filter.Q.value = q;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(gain, when + 0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  src.connect(filter).connect(g).connect(c.destination);
  src.start(when);
  src.stop(when + dur + 0.02);
}

function thump(c: AudioContext, when: number, freq: number, dur: number, gain: number) {
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, when);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.5, when + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(gain, when + 0.003);
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  osc.connect(g).connect(c.destination);
  osc.start(when);
  osc.stop(when + dur + 0.02);
}

/** Short, quiet two-stage mechanical shutter: click, then snap. */
export function playShutterSound() {
  if (typeof window === "undefined" || !isSoundEnabled()) return;
  const now = performance.now();
  if (now - lastPlay < MIN_GAP_MS) return; // never stack
  lastPlay = now;

  const c = getContext();
  if (!c) return;
  const t = c.currentTime;
  burst(c, t, 3400, 1.3, 0.02, 0.16);
  thump(c, t, 210, 0.045, 0.14);
  burst(c, t + 0.055, 2100, 0.9, 0.032, 0.12);
  thump(c, t + 0.055, 140, 0.055, 0.1);
}
