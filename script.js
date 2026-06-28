const introScreen = document.getElementById('introScreen');
const storyScreen = document.getElementById('storyScreen');
const startButton = document.getElementById('startButton');
const backButton = document.getElementById('backButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const speedButton = document.getElementById('speedButton');
const speedOptions = document.getElementById('speedOptions');
const volumeButton = document.getElementById('volumeButton');
const volumeControl = document.getElementById('volumeControl');
const volumeSlider = document.getElementById('volumeSlider');
const storyText = document.getElementById('storyText');
const voiceGenderRadios = document.querySelectorAll('input[name="voiceGender"]');
const speedOptionButtons = document.querySelectorAll('.speed-option');

const story = `Long ago, in a quiet valley, there was a gentle monk who walked beneath the trees. He listened to birdsong, watched the river flow, and learned that every small moment can become a source of peace. One day he shared a story with a traveler, teaching that kindness and stillness are the truest blessings.`;

let utterance = null;
let currentWordIndex = 0;
let voiceRate = 1;
let volume = 1;
let activeGender = 'female';
let isPlaying = false;
let spanElements = [];

function buildStoryText() {
  const words = story.split(' ');
  storyText.innerHTML = words
    .map((word, index) => `<span data-index="${index}">${word}</span>`)
    .join(' ');
  spanElements = Array.from(storyText.querySelectorAll('span'));
}

function showScreen(screen) {
  introScreen.classList.toggle('active', screen === 'intro');
  storyScreen.classList.toggle('active', screen === 'story');
}

function resetHighlights() {
  spanElements.forEach((span) => span.classList.remove('active'));
  currentWordIndex = 0;
}

function stopSpeech() {
  if (speechSynthesis.speaking || speechSynthesis.pending) {
    speechSynthesis.cancel();
  }
  isPlaying = false;
  playButton.classList.remove('hidden');
  pauseButton.classList.add('hidden');
}

function updatePlayState() {
  playButton.classList.toggle('hidden', isPlaying);
  pauseButton.classList.toggle('hidden', !isPlaying);
}

function makeUtterance() {
  if (utterance) {
    speechSynthesis.cancel();
  }

  utterance = new SpeechSynthesisUtterance(story);
  utterance.rate = voiceRate;
  utterance.volume = volume;
  utterance.pitch = activeGender === 'female' ? 1.2 : 0.82;

  const voices = speechSynthesis.getVoices();
  if (voices.length) {
    const chosenVoice = voices.find((voice) => {
      const name = voice.name.toLowerCase();
      return activeGender === 'female'
        ? name.includes('female') || name.includes('woman') || name.includes('samantha') || name.includes('alloy')
        : name.includes('male') || name.includes('man') || name.includes('daniel') || name.includes('matthew');
    }) || voices[0];
    utterance.voice = chosenVoice;
  }

  utterance.onboundary = (event) => {
    if (event.name !== 'word') return;
    const charIndex = event.charIndex;
    const textBefore = story.slice(0, charIndex);
    currentWordIndex = textBefore.split(' ').length - 1;
    highlightWord(currentWordIndex);
  };

  utterance.onend = () => {
    isPlaying = false;
    updatePlayState();
  };

  utterance.onerror = () => {
    isPlaying = false;
    updatePlayState();
  };
}

function highlightWord(index) {
  resetHighlights();
  const span = spanElements[index];
  if (span) {
    span.classList.add('active');
    span.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }
}

function playStory() {
  if (!('speechSynthesis' in window)) {
    alert('Speech synthesis is not supported in this browser.');
    return;
  }

  if (speechSynthesis.speaking) {
    return;
  }

  resetHighlights();
  makeUtterance();
  speechSynthesis.speak(utterance);
  isPlaying = true;
  updatePlayState();
}

function pauseStory() {
  if (speechSynthesis.speaking) {
    speechSynthesis.pause();
  }
  isPlaying = false;
  updatePlayState();
}

function toggleSpeedOptions() {
  speedOptions.classList.toggle('hidden');
}

function setSpeed(value) {
  voiceRate = Number(value);
  speedButton.textContent = `Speed: ${voiceRate.toFixed(2)}x`;
  speedOptionButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.speed === value.toString());
  });
}

function toggleVolumeControl() {
  volumeControl.classList.toggle('hidden');
}

function updateVolume(value) {
  volume = Number(value);
  volumeButton.textContent = volume === 0 ? '🔇' : '🔊';
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

startButton.addEventListener('click', () => {
  showScreen('story');
  resetHighlights();
});

backButton.addEventListener('click', () => {
  stopSpeech();
  showScreen('intro');
});

fullscreenButton.addEventListener('click', toggleFullScreen);
playButton.addEventListener('click', playStory);
pauseButton.addEventListener('click', pauseStory);
speedButton.addEventListener('click', toggleSpeedOptions);
volumeButton.addEventListener('click', toggleVolumeControl);
volumeSlider.addEventListener('input', (event) => updateVolume(event.target.value));

speedOptionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setSpeed(button.dataset.speed);
    toggleSpeedOptions();
  });
});

voiceGenderRadios.forEach((radio) => {
  radio.addEventListener('change', (event) => {
    activeGender = event.target.value;
  });
});

window.addEventListener('beforeunload', () => {
  stopSpeech();
});

window.speechSynthesis?.addEventListener('voiceschanged', () => {
  buildStoryText();
});

buildStoryText();
setSpeed(1);
updateVolume(1);
