interface SoundConfig {
  id: string;
  name: string;
  default: boolean;
  key_define_type: string;
  includes_numpad: boolean;
  sound: string;
  defines: Record<string, [number, number]>;
  tags: string[];
}

let audioContext: AudioContext | null = null;
let audioBuffer: AudioBuffer | null = null;
let config: SoundConfig | null = null;

export async function initKeyboardSound() {
  if (audioContext) return;

  audioContext = new AudioContext();

  // Load config
  const configResponse = await fetch(
    "/keyboard-sounds/cherrymx-black-abs/config.json",
    {
      cache: "force-cache",
    },
  );
  config = await configResponse.json();

  // Load sound file
  const soundResponse = await fetch(
    "/keyboard-sounds/cherrymx-black-abs/sound.ogg",
    {
      cache: "force-cache",
    },
  );
  const arrayBuffer = await soundResponse.arrayBuffer();
  audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
}

export function playKeySound(
  keyCode: string,
  part: "first" | "second" | "full" = "full",
) {
  if (!audioContext || !audioBuffer || !config) return;

  const keyDef = config.defines[keyCode];
  if (!keyDef) return;

  const [startTime, duration] = keyDef;
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);

  // Convert milliseconds to seconds
  const startTimeInSeconds = startTime / 1000;
  const durationInSeconds = duration / 1000;

  switch (part) {
    case "first":
      source.start(0, startTimeInSeconds, durationInSeconds / 2);
      break;
    case "second":
      source.start(
        0,
        startTimeInSeconds + durationInSeconds / 2,
        durationInSeconds / 2,
      );
      break;
    case "full":
      source.start(0, startTimeInSeconds, durationInSeconds);
      break;
  }
}

// Map of characters to key codes
const charToKeyCode: Record<string, string> = {
  a: "65",
  b: "66",
  c: "67",
  d: "68",
  e: "69",
  f: "70",
  g: "71",
  h: "72",
  i: "73",
  j: "74",
  k: "75",
  l: "76",
  m: "77",
  n: "78",
  o: "79",
  p: "80",
  q: "81",
  r: "82",
  s: "83",
  t: "84",
  u: "85",
  v: "86",
  w: "87",
  x: "88",
  y: "89",
  z: "90",
  " ": "32",
  ".": "190",
  ",": "188",
  "!": "49",
  "?": "191",
  "'": "222",
  '"': "222",
  "-": "189",
  _: "189",
  "0": "48",
  "1": "49",
  "2": "50",
  "3": "51",
  "4": "52",
  "5": "53",
  "6": "54",
  "7": "55",
  "8": "56",
  "9": "57",
};

export function playCharSound(char: string) {
  const keyCode = charToKeyCode[char.toLowerCase()];
  if (keyCode) {
    playKeySound(keyCode);
  }
}

export function playBackspaceSound() {
  // Using key code 8 for backspace
  playKeySound("8");
}

export function playBackspaceDownSound() {
  // play backspace sound but only first half
  playKeySound("8", "first");
}

export function playBackspaceUpSound() {
  // play backspace sound but only second half
  playKeySound("8", "second");
}

export function playEnterSound() {
  // Using key code 13 for enter
  playKeySound("13");
}
