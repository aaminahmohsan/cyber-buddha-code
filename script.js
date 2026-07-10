const introScreen = document.getElementById('introScreen');
const storyScreen = document.getElementById('storyScreen');
const startButton = document.getElementById('startButton');
const backButton = document.getElementById('backButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const voiceSelect = document.getElementById('voiceSelect');
const languageSelect = document.getElementById('languageSelect');
const speedSelect = document.getElementById('speedSelect');
const volumeSlider = document.getElementById('volumeSlider');
const progressSlider = document.getElementById('progressSlider');
const progressText = document.getElementById('progressText');
const speedLabel = document.getElementById('speedLabel');
const storyText = document.getElementById('storyText');

const storiesByLanguage = {
  en: `Before I became known as the Buddha, I was Siddhartha Gautama, searching for the truth about suffering and the meaning of life. I believed that by denying myself food and comfort, I could become wiser. So I went into the forest and lived in deep meditation, taking only small amounts of food each day.`,
  hi: `मैं Buddha के रूप में जाने जाने से पहले सिद्धार्थ गौतम था, जो दुख और जीवन का अर्थ जानने की खोज में था। मैंने सोचा कि अपने लिए भोजन और आराम से इंकार करके मैं अधिक समझदार बन सकता हूँ। इसलिए मैं जंगल में चला गया और गहन ध्यान में रहा, हर दिन केवल थोड़ी मात्रा में भोजन लेता रहा।`,
  ur: `میں بودہ کے نام سے مشہور ہونے سے پہلے سیدہارتھا گوتم تھا، جو درد اور زندگی کے معنی کو سمجھنے کی تلاش میں تھا۔ میں نے سوچا کہ خود سے غذا اور آرام کا انکار کر کے میں زیادہ باوقار بن سکتا ہوں۔ اس لیے میں جنگل میں گیا اور گہری meditati میں رہا، ہر روز صرف تھوڑی مقدار میں کھانا لیتا رہا۔`,
  pt: `Antes de ser conhecido como o Buda, eu era Siddhartha Gautama, buscando a verdade sobre o sofrimento e o sentido da vida. Acreditava que, negando a mim mesmo comida e conforto, poderia me tornar mais sábio. Por isso, fui para a floresta e vivi em profunda meditação, recebendo apenas pequenas quantidades de alimento por dia.`,
  'es-AR': `Antes de ser conocido como el Buda, yo era Siddhartha Gautama, buscando la verdad sobre el sufrimiento y el sentido de la vida. Creía que negándome comida y comodidad podría volverme más sabio. Por eso fui al bosque y viví en profunda meditación, tomando solo pequeñas cantidades de alimento cada día.`,
  es: `Antes de ser conocido como el Buda, yo era Siddhartha Gautama, buscando la verdad sobre el sufrimiento y el sentido de la vida. Creía que negándome comida y comodidad podría volverme más sabio. Por eso fui al bosque y viví en profunda meditación, tomando solo pequeñas cantidades de alimento cada día.`,
  'en-NG': `Before I became known as the Buddha, I was Siddhartha Gautama, searching for the truth about suffering and the meaning of life. I believed that by denying myself food and comfort, I could become wiser. So I went into the forest and lived in deep meditation, taking only small amounts of food each day.`,
  'pt-BR': `Antes de ser conhecido como o Buda, eu era Siddhartha Gautama, buscando a verdade sobre o sofrimento e o sentido da vida. Acreditava que, negando a mim mesmo comida e conforto, poderia me tornar mais sábio. Por isso, fui para a floresta e vivi em profunda meditação, recebendo apenas pequenas quantidades de alimento por dia.`,
  ar: `قبل أن أُعرف باسم البوذا، كنت سيدهارثا غوتاما، أبحث عن الحقيقة حول المعاناة ومعنى الحياة. كنت أؤمن أن إنكاري لنفسي الطعام والراحة يمكن أن يجعلني أكثر حكمة. لذلك ذهبت إلى الغابة وعشت في تأمل عميق، آخذ فقط كميات صغيرة من الطعام كل يوم.`,
  'zh-CN': `在我被称为佛陀之前，我是悉达多·乔达摩，寻找关于痛苦和生命意义的真理。我相信，拒绝食物和舒适，可以让我变得更有智慧。所以我走进森林，沉浸在深度冥想中，每天只摄取很少的食物。`,
  ja: `私は仏陀として知られる前、悉達多・ゴータマであり、苦しみと人生の意味について真理を求めていました。私は、食べ物と快適さを自分から奪うことで、より賢くなれると信じていました。そこで私は森へ入り、深い瞑想の中で毎日少量の食べ物だけを取って暮らしました。`,
  ko: `나는 부처로 알려지기 전에는 싯다르타 고타마였고, 고통과 삶의 의미에 대해 진리를 찾고 있었습니다. 나는 음식과 편안함을 스스로 거부함으로써 더 현명해질 수 있다고 믿었습니다. 그래서 나는 숲으로 들어가 깊은 명상 속에서 매일 아주 적은 양의 음식만 섭취하며 살았습니다.`,
  fr: `Avant d’être connu sous le nom du Bouddha, j’étais Siddhartha Gautama, à la recherche de la vérité sur la souffrance et le sens de la vie. Je croyais qu’en me privant de nourriture et de confort, je pourrais devenir plus sage. C’est pourquoi je suis allé dans la forêt et j’ai vécu dans une profonde méditation, ne prenant chaque jour que de petites quantités de nourriture.`,
  de: `Bevor ich als der Buddha bekannt wurde, war ich Siddhartha Gautama und suchte nach der Wahrheit über Leiden und den Sinn des Lebens. Ich glaubte, dass ich durch den Verzicht auf Nahrung und Komfort weiser werden könnte. Deshalb ging ich in den Wald und lebte in tiefer Meditation, wobei ich jeden Tag nur kleine Mengen an Nahrung zu mir nahm.`,
  it: `Prima di essere conosciuto come il Buddha, ero Siddhartha Gautama, alla ricerca della verità sul dolore e sul significato della vita. Credevo che privandomi di cibo e comfort potessi diventare più saggio. Per questo entrai nella foresta e vissi in profonda meditazione, assumendo ogni giorno solo piccole quantità di cibo.`,
  'es-MX': `Antes de ser conocido como el Buda, yo era Siddhartha Gautama, buscando la verdad sobre el sufrimiento y el sentido de la vida. Creía que negándome comida y comodidad podría volverme más sabio. Por eso fui al bosque y viví en profunda meditación, tomando solo pequeñas cantidades de alimento cada día.`,
  ru: `До того как меня стали называть Буддой, я был Сиддхартхой Гаутамой, ищущим истину о страдании и смысле жизни. Я верил, что отказав себе в пище и удобстве, смогу стать мудрее. Поэтому я ушёл в лес и жил в глубокой медитации, принимая каждый день лишь небольшое количество пищи.`,
  ta: `புத்தர் என்ற பெயரில் அறியப்படுவதற்கு முன், நான் சித்தார்த்த கௌதமன். துன்பம் மற்றும் வாழ்க்கையின் பொருள் பற்றிய உண்மையைத் தேடிக் கொண்டிருந்தேன். உணவையும் வசதியையும் நான் மறுக்கும்போது நான் அதிக ஞானியாகலாம் என்று நினைத்தேன். அதனால் நான் காடுக்குள் சென்றேன், ஆழ்ந்த தியானத்தில் இருந்தேன்; ஒவ்வொரு நாளும் சிறிய அளவு உணவை மட்டுமே எடுத்தேன்.`,
  vi: `Trước khi được biết đến như Đức Phật, tôi là Siddhartha Gautama, tìm kiếm sự thật về nỗi đau và ý nghĩa của cuộc sống. Tôi tin rằng nếu tự mình từ chối thức ăn và sự thoải mái, tôi có thể trở nên khôn ngoan hơn. Vì thế, tôi vào rừng và sống trong thiền định sâu sắc, mỗi ngày chỉ ăn một lượng nhỏ thức ăn.`
};

let utterance = null;
let currentWordIndex = 0;
let voiceRate = 1;
let volume = 1;
let activeVoice = 'female';
let currentLanguage = 'en';
let isPlaying = false;
let spanElements = [];
let currentStory = storiesByLanguage[currentLanguage];

function buildStoryText() {
  const words = currentStory.trim().split(/\s+/);
  storyText.innerHTML = words
    .map((word, index) => `<span data-index="${index}">${word}</span>`)
    .join(' ');
  spanElements = Array.from(storyText.querySelectorAll('span'));
  resetHighlights();
  updateProgressBar();
}

function showScreen(screen) {
  introScreen.classList.toggle('active', screen === 'intro');
  storyScreen.classList.toggle('active', screen === 'story');
}

function resetHighlights() {
  spanElements.forEach((span) => span.classList.remove('active'));
}

function stopSpeech() {
  if (speechSynthesis.speaking || speechSynthesis.pending || speechSynthesis.paused) {
    speechSynthesis.cancel();
  }
  isPlaying = false;
  updatePlayState();
}

function updatePlayState() {
  playButton.classList.toggle('hidden', isPlaying);
  pauseButton.classList.toggle('hidden', !isPlaying);
}

function formatTime(seconds) {
  const safeSeconds = Math.max(0, Math.round(seconds));
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateProgressBar() {
  const words = currentStory.trim().split(/\s+/);
  const totalWords = Math.max(1, words.length);
  const progressPercent = (currentWordIndex / totalWords) * 100;
  progressSlider.value = Math.min(100, Math.max(0, progressPercent));
  const estimatedTotalSeconds = totalWords / (voiceRate * 2.2);
  const estimatedCurrentSeconds = currentWordIndex / (voiceRate * 2.2);
  progressText.textContent = `${formatTime(estimatedCurrentSeconds)} / ${formatTime(estimatedTotalSeconds)}`;
  speedLabel.textContent = `${voiceRate.toFixed(2)}x`;
}

function getVoiceForLanguage(languageCode) {
  const voices = speechSynthesis.getVoices();
  const normalized = String(languageCode).toLowerCase();
  const hints = [normalized, normalized.split('-')[0]];

  if (normalized.includes('pt')) hints.push('pt');
  if (normalized.includes('es')) hints.push('es');
  if (normalized.includes('zh')) hints.push('zh');
  if (normalized.includes('ar')) hints.push('ar');
  if (normalized.includes('hi')) hints.push('hi');
  if (normalized.includes('ur')) hints.push('ur');
  if (normalized.includes('ja')) hints.push('ja');
  if (normalized.includes('ko')) hints.push('ko');
  if (normalized.includes('fr')) hints.push('fr');
  if (normalized.includes('de')) hints.push('de');
  if (normalized.includes('it')) hints.push('it');
  if (normalized.includes('ru')) hints.push('ru');
  if (normalized.includes('ta')) hints.push('ta');
  if (normalized.includes('vi')) hints.push('vi');
  if (normalized.includes('en')) hints.push('en');

  const preferredVoice = voices.find((voice) => {
    const lang = voice.lang.toLowerCase();
    const matchesLanguage = hints.some((hint) => hint && lang.startsWith(hint));
    if (!matchesLanguage) return false;

    const name = `${voice.name} ${voice.lang}`.toLowerCase();
    if (activeVoice === 'female') {
      return /female|woman|samantha|zira|victoria|jessa|susan|anna|maya|alloy|jenny/i.test(name);
    }

    return /male|man|daniel|alex|david|mark|matthew|hans|paul|quinn/i.test(name);
  });

  return preferredVoice || voices.find((voice) => hints.some((hint) => hint && voice.lang.toLowerCase().startsWith(hint))) || voices[0] || null;
}

function makeUtterance() {
  if (utterance) {
    speechSynthesis.cancel();
  }

  utterance = new SpeechSynthesisUtterance(currentStory);
  utterance.lang = currentLanguage === 'en' ? 'en-US' : currentLanguage;
  utterance.rate = voiceRate;
  utterance.volume = volume;
  utterance.pitch = activeVoice === 'female' ? 1.15 : 0.85;

  const selectedVoice = getVoiceForLanguage(currentLanguage);
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.onboundary = (event) => {
    if (event.name !== 'word') return;
    const spokenSoFar = currentStory.slice(0, event.charIndex);
    const wordsSoFar = spokenSoFar.split(/\s+/).filter(Boolean).length;
    currentWordIndex = wordsSoFar;
    highlightWord(currentWordIndex);
    updateProgressBar();
  };

  utterance.onend = () => {
    currentWordIndex = Math.max(1, currentStory.trim().split(/\s+/).length);
    updateProgressBar();
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

  if (speechSynthesis.paused) {
    speechSynthesis.resume();
    isPlaying = true;
    updatePlayState();
    return;
  }

  if (speechSynthesis.speaking) {
    return;
  }

  currentWordIndex = 0;
  resetHighlights();
  makeUtterance();
  speechSynthesis.speak(utterance);
  isPlaying = true;
  updatePlayState();
  updateProgressBar();
}

function pauseStory() {
  if (speechSynthesis.speaking) {
    speechSynthesis.pause();
  }
  isPlaying = false;
  updatePlayState();
}

function setLanguage(languageCode) {
  currentLanguage = languageCode;
  currentStory = storiesByLanguage[languageCode] || storiesByLanguage.en;
  currentWordIndex = 0;
  buildStoryText();
  if (speechSynthesis.speaking || speechSynthesis.paused) {
    stopSpeech();
  }
}

function setSpeed(value) {
  voiceRate = Number(value);
  updateProgressBar();
  if (speechSynthesis.speaking || speechSynthesis.paused) {
    stopSpeech();
    playStory();
  }
}

function updateVolume(value) {
  volume = Number(value) / 100;
  if (utterance) {
    utterance.volume = volume;
  }
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
voiceSelect.addEventListener('change', (event) => {
  activeVoice = event.target.value;
  if (speechSynthesis.speaking || speechSynthesis.paused) {
    stopSpeech();
    playStory();
  }
});
languageSelect.addEventListener('change', (event) => {
  setLanguage(event.target.value);
});
speedSelect.addEventListener('change', (event) => {
  setSpeed(event.target.value);
});
volumeSlider.addEventListener('input', (event) => updateVolume(event.target.value));
progressSlider.addEventListener('input', (event) => {
  const words = currentStory.trim().split(/\s+/);
  const totalWords = Math.max(1, words.length);
  currentWordIndex = Math.round((Number(event.target.value) / 100) * totalWords);
  highlightWord(currentWordIndex);
  updateProgressBar();
});

window.addEventListener('beforeunload', () => {
  stopSpeech();
});

window.speechSynthesis?.addEventListener('voiceschanged', () => {
  buildStoryText();
});

buildStoryText();
setSpeed(1);
updateVolume(100);