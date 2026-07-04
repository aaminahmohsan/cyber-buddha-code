const introScreen = document.getElementById('introScreen');
const storyScreen = document.getElementById('storyScreen');
const startButton = document.getElementById('startButton');
const backButton = document.getElementById('backButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const storyText = document.getElementById('storyText');
const progressSlider = document.getElementById('progressSlider');
const progressText = document.getElementById('progressText');
const speedLabel = document.getElementById('speedLabel');
const speedSelect = document.getElementById('speedSelect');
const voiceSelect = document.getElementById('voiceSelect');
const volumeSlider = document.getElementById('volumeSlider');

const story = `Before I became known as the Buddha, I was Siddhartha Gautama, searching for the truth about suffering and the meaning of life. I believed that by denying myself food and comfort, I could become wiser.

So, I went into the forest and lived denying myself, eating only tiny amounts of food each day.

I only ate one dish called rice pudding (kheer), which was given to me by a village woman named Sujata. She came every day under the Bodhi Tree where I used to sit.

As time passed, my body became extremely weak. My bones showed through my skin, and I hardly had the strength to walk or meditate.

I thought that going through great suffering would bring me closer to the truth, but instead it left me exhausted and unable to think clearly.

Then I realized something important.

Starving myself was not leading me to peace or understanding.

I saw that both a life of luxury and a life of extreme suffering were unbalanced.

The true path was the Middle Way—a life of balance, neither too strict nor too easy.

I accepted a simple meal to regain my strength.

With a healthy body and a focused mind, I sat beneath the Bodhi Tree and continued my meditation.

There I finally reached enlightenment and became the Buddha.

From this experience, I learned that true wisdom comes not from hurting ourselves or searching for comfort, but from living with balance, kindness, and understanding.

That is the lesson I continue to share with the world.`;

let words = [];
let wordElements = [];
let currentWordIndex = 0;
let voiceRate = 1;
let volume = 100;
let activeVoiceType = 'female';
let isPlaying = false;
let utterance = null;
let progressTimer = null;
let startTime = 0;
let accumulatedTime = 0;

function buildStoryText() {
  words = story.split(/\s+/).filter(Boolean);
  storyText.innerHTML = '';
  wordElements = [];

  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.dataset.index = index;
    storyText.appendChild(span);
    storyText.appendChild(document.createTextNode(' '));
    wordElements.push(span);
  });

  updateProgressLabel();
}

function showScreen(screen) {
  introScreen.classList.toggle('active', screen === 'intro');
  storyScreen.classList.toggle('active', screen === 'story');
}

function clearHighlights() {
  wordElements.forEach((span) => span.classList.remove('active'));
}

function highlightWord(index) {
  clearHighlights();
  currentWordIndex = Math.max(0, Math.min(index, words.length - 1));
  const span = wordElements[currentWordIndex];
  if (span) {
    span.classList.add('active');
    span.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
  }
}

function updatePlayState() {
  playButton.classList.toggle('hidden', isPlaying);
  pauseButton.classList.toggle('hidden', !isPlaying);
}

function formatTime(seconds) {
  const safeSeconds = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const secs = String(safeSeconds % 60).padStart(2, '0');
  return `${minutes}:${secs}`;
}

function getEstimatedDuration() {
  return words.length * 500 / voiceRate;
}

function updateProgressLabel() {
  const totalSeconds = getEstimatedDuration() / 1000;
  const elapsedSeconds = isPlaying ? (accumulatedTime + (Date.now() - startTime)) / 1000 : accumulatedTime / 1000;
  progressText.textContent = `${formatTime(elapsedSeconds)} / ${formatTime(totalSeconds)}`;
}

function startProgressTimer() {
  clearInterval(progressTimer);
  startTime = Date.now();
  progressTimer = window.setInterval(() => {
    if (!isPlaying) return;
    updateProgressLabel();
    const elapsed = accumulatedTime + (Date.now() - startTime);
    const percent = Math.min(100, (elapsed / getEstimatedDuration()) * 100);
    progressSlider.value = percent;
    const newIndex = Math.min(words.length - 1, Math.floor((percent / 100) * words.length));
    if (newIndex !== currentWordIndex) {
      highlightWord(newIndex);
    }
  }, 180);
}

function stopProgressTimer() {
  clearInterval(progressTimer);
  progressTimer = null;
}

function getPreferredVoice() {
  const voices = window.speechSynthesis.getVoices();
  const query = activeVoiceType === 'female' ? /female|woman|samantha|zira|victoria|susan/i : /male|man|david|daniel|mark|james|alex/i;
  return voices.find((voice) => query.test(voice.name)) || voices[0] || null;
}

function stopSpeech() {
  window.speechSynthesis.cancel();
  stopProgressTimer();
  isPlaying = false;
  updatePlayState();
}

function playStory(startIndex = currentWordIndex) {
  if (!('speechSynthesis' in window)) {
    alert('Speech synthesis is not supported in this browser.');
    return;
  }

  if (window.speechSynthesis.paused && utterance) {
    window.speechSynthesis.resume();
    isPlaying = true;
    startTime = Date.now();
    updatePlayState();
    startProgressTimer();
    updateProgressLabel();
    return;
  }

  if (window.speechSynthesis.speaking) {
    return;
  }

  const safeIndex = Math.max(0, Math.min(startIndex, words.length - 1));
  currentWordIndex = safeIndex;
  highlightWord(safeIndex);

  const textToSpeak = words.slice(safeIndex).join(' ');
  utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.rate = voiceRate;
  utterance.volume = volume / 100;
  utterance.pitch = activeVoiceType === 'female' ? 1.1 : 0.95;
  utterance.voice = getPreferredVoice();

  let spokenWordCount = 0;
  utterance.onboundary = (event) => {
    if (event.name === 'word') {
      const absoluteIndex = safeIndex + spokenWordCount;
      spokenWordCount += 1;
      currentWordIndex = absoluteIndex;
      highlightWord(currentWordIndex);
    }
  };

  utterance.onend = () => {
    isPlaying = false;
    accumulatedTime = getEstimatedDuration();
    stopProgressTimer();
    updatePlayState();
    updateProgressLabel();
    progressSlider.value = 100;
  };

  utterance.onerror = () => {
    isPlaying = false;
    stopProgressTimer();
    updatePlayState();
  };

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  isPlaying = true;
  accumulatedTime = (safeIndex / Math.max(1, words.length)) * getEstimatedDuration();
  startTime = Date.now();
  updatePlayState();
  startProgressTimer();
  updateProgressLabel();
}

function pauseStory() {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.pause();
    accumulatedTime += Date.now() - startTime;
    isPlaying = false;
    stopProgressTimer();
    updatePlayState();
    updateProgressLabel();
  }
}

function setSpeed(value) {
  voiceRate = Number(value);
  speedLabel.textContent = `${voiceRate.toFixed(2).replace(/\.0+$/, '')}x`;
  if (isPlaying || window.speechSynthesis.paused) {
    const currentStart = currentWordIndex;
    stopSpeech();
    playStory(currentStart);
  }
}

function setVoice(type) {
  activeVoiceType = type;
  if (isPlaying || window.speechSynthesis.paused) {
    const currentStart = currentWordIndex;
    stopSpeech();
    playStory(currentStart);
  }
}

function setVolume(value) {
  volume = Number(value);
  if (utterance) {
    utterance.volume = volume / 100;
  }
}

function seekTo(percent) {
  const targetIndex = Math.min(words.length - 1, Math.floor((percent / 100) * words.length));
  currentWordIndex = targetIndex;
  highlightWord(targetIndex);
  accumulatedTime = (targetIndex / Math.max(1, words.length)) * getEstimatedDuration();

  if (window.speechSynthesis.speaking || window.speechSynthesis.paused) {
    stopSpeech();
    playStory(targetIndex);
  }

  updateProgressLabel();
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
  highlightWord(0);
});

backButton.addEventListener('click', () => {
  stopSpeech();
  showScreen('intro');
});

fullscreenButton.addEventListener('click', toggleFullScreen);
playButton.addEventListener('click', () => {
  if (isPlaying) {
    pauseStory();
  } else {
    playStory(currentWordIndex);
  }
});
pauseButton.addEventListener('click', pauseStory);
speedSelect.addEventListener('change', (event) => setSpeed(event.target.value));
voiceSelect.addEventListener('change', (event) => setVoice(event.target.value));
volumeSlider.addEventListener('input', (event) => setVolume(event.target.value));
progressSlider.addEventListener('input', (event) => seekTo(Number(event.target.value)));

window.addEventListener('beforeunload', () => {
  stopSpeech();
});

window.speechSynthesis?.addEventListener('voiceschanged', () => {
  if (utterance) {
    utterance.voice = getPreferredVoice();
  }
});

buildStoryText();
setSpeed(1);
setVoice('female');
setVolume(100);
updatePlayState();
updateProgressLabel();
