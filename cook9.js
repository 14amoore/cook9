/* globals Tone, chrome */
let streamCookies;
let cookTone;
let fauxSession;
const noiseVol = new Tone.Volume(-30);
const duoVol = new Tone.Volume(-10);
const getCookies = chrome.cookies.getAll;

const noiseSynth = new Tone.NoiseSynth({
  noise: { type: 'pink' },
  envelope: { attack: 0, decay: 0.1, sustain: 1 }
});

const duoSynth = new Tone.DuoSynth({
  harmonicity: fauxSession,
  voice0: { oscillator: { type: 'triangle' } }
});

function allCookies() {
  getCookies({}, cookies => {
    cookTone = Math.floor(cookies.length / 10);
    noiseSynth.triggerAttackRelease(cookTone);
    console.log(cookTone);
  });
  getCookies({ session: true }, notSession => {
    fauxSession = notSession.length;
    duoSynth.triggerAttackRelease('C2', fauxSession);
    console.log(fauxSession);
  });
}

const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');

startBtn.addEventListener('click', () => {
  noiseSynth.chain(noiseVol, Tone.Master);
  duoSynth.chain(duoVol, Tone.Master);
  streamCookies = setInterval(allCookies, 1000);
  console.log('sound');
  startBtn.disabled = true;
});

stopBtn.addEventListener('click', () => {
  clearInterval(streamCookies);
  startBtn.disabled = false;
});
