/* globals Tone, chrome */
let streamCookies;
let cookTone;
let sesh;
let noSesh;
let nonSecure;
const noiseVol = new Tone.Volume(-30);
const duoVol = new Tone.Volume(-10);
const getCookies = chrome.cookies.getAll;

const noiseSynth = new Tone.NoiseSynth({
  noise: { type: 'pink' },
  envelope: { attack: 0, decay: 0.1, sustain: 1 }
});

const duoSynth = new Tone.DuoSynth({
  harmonicity: sesh,
  voice0: { oscillator: { type: 'triangle' } }
});

const amSynth = new Tone.AMSynth({
  detune: noSesh,
  oscillator: { type: 'sine' }
});

function allCookies() {
  getCookies({}, cookies => {
    cookTone = Math.floor(cookies.length / 10);
    noiseSynth.triggerAttackRelease(cookTone);
    console.log(`there are ${cookies.length} cookies.`);
  });
  getCookies({ session: true }, isSession => {
    sesh = Math.floor(isSession.length / 2);
    duoSynth.triggerAttackRelease('C2', sesh);
    console.log(`there are ${isSession.length} cookies marked as session.`);
  });
  getCookies({ session: false }, notSession => {
    noSesh = Math.floor(notSession.length);
    amSynth.triggerAttackRelease('A5', noSesh / 10);
    console.log(`there are ${noSesh} cookies not marked as session cookies.`);
  });
  getCookies({ secure: false }, notSecure => {
    nonSecure = notSecure.length;
    function mapNotSec(nonSecure, 0, nonSecure, 0, 1) {
      nonSecure = (nonSecure - 0) / (nonSecure - 0);
      return 0 + nonSecure * (1 - 0);
      console.log(d);
    }

    // const pingPong = new Tone.PingPongDelay('4n', 0.5).toMaster();
    // let drum = new Tone.MembraneSynth().connect(pingPong);
    // drum.triggerAttackRelease('C3', '8n');
    console.log(`there are ${nonSecure} cookies that are not secure.`);
  });
}

const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');

startBtn.addEventListener('click', () => {
  noiseSynth.chain(noiseVol, Tone.Master);
  duoSynth.chain(duoVol, Tone.Master);
  amSynth.chain(duoVol, Tone.Master);
  streamCookies = setInterval(allCookies, 1000);
  console.log('sound');
  startBtn.disabled = true;
});

stopBtn.addEventListener('click', () => {
  clearInterval(streamCookies);
  startBtn.disabled = false;
});
