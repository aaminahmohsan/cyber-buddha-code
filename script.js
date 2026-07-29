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
const questionScreen = document.getElementById('questionScreen');
const questionBackButton = document.getElementById('questionBackButton');
const questionList = document.getElementById('questionList');
const doneButton = document.getElementById('doneButton');
const thankYouMessage = document.getElementById('thankYouMessage');

const languageLocaleMap = {
  en: 'en-US',
  hi: 'hi-IN',
  pt: 'pt-PT',
  'es-AR': 'es-AR',
  es: 'es-ES',
  'en-NG': 'en-NG',
  'pt-BR': 'pt-BR',
  ar: 'ar-SA',
  'zh-CN': 'zh-CN',
  ja: 'ja-JP',
  ko: 'ko-KR',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  'es-MX': 'es-MX',
  ru: 'ru-RU',
  vi: 'vi-VN'
};

const fullEnglishStory = `Before I became known as the Buddha, I was Siddhartha Gautama, searching for the truth about suffering and the meaning of life. I believed that by denying myself food and comfort, I could become wiser. So, I went into the forest and lived as denying myself, eating only tiny amounts of food each day. I only ate one dish called the rice pudding (kheer) which was given to me by a village woman named Sujata. She came every day under the Bodhi tree where I used to sit.

As time passed, my body became extremely weak. My bones showed through my skin, and I hardly had the strength to walk or meditate. I thought that going through great suffering would bring me closer to truth, but instead, it left me exhausted and unable to think clearly.

Then I realized something important. Starving myself was not leading me to peace or understanding. I saw that both a life of luxury and a life of extreme suffering were unbalanced. The true path was the Middle Way—a life of balance, neither too strict nor too easy.

I accepted a simple meal to regain my strength. With a healthy body and a focused mind, I sat beneath the Bodhi tree and continued my meditation. There, I finally reached realization and became the Buddha.

From this experience, I learned that true wisdom comes not from hurting ourselves or looking for comfort, but from living with balance, kindness, and understanding. That is the lesson I continue to share with the world.

The end`;

const storiesByLanguage = {
  en: fullEnglishStory,
  hi: `मैं बुद्ध के रूप में जाने जाने से पहले, मैं सिद्धार्थ गौतम था, जो दुःख और जीवन का अर्थ जानने की सच्चाई की खोज में था। मैं मानता था कि खुद को भोजन और आराम से वंचित करके मैं अधिक समझदार बन सकता हूँ। इसलिए मैं जंगल में गया और अपने आपको त्यागते हुए रहा, हर दिन बहुत कम मात्रा में भोजन करता रहा। मैं सिर्फ एक पकवान खीर खाता था, जो मुझे सुजाता नाम की एक गाँव की महिला द्वारा दिया गया था। वह हर दिन उस बोधि वृक्ष के नीचे आती थी जहाँ मैं बैठा करता था।

जैसे-जैसे समय बीता, मेरा शरीर बहुत कमजोर हो गया। मेरी हड्डियाँ मेरी त्वचा के बाहर दिखाई देने लगीं, और मुझे चलने या ध्यान करने की बहुत कम ताकत रही। मुझे लगा कि बहुत अधिक दुःख झेलने से मैं सत्य के निकट पहुँच जाऊँगा, लेकिन इसके बजाय, यह मुझे थका हुआ और स्पष्ट रूप से सोचने में असमर्थ छोड़ गया।

फिर मुझे एक महत्वपूर्ण बात समझ आई। अपने आप को भूखा रखना मुझे शांति या समझ नहीं दे रहा था। मैंने देखा कि luxury वाली ज़िंदगी और extreme suffering वाली ज़िंदगी दोनों असंतुलित थीं। सच्चा मार्ग मध्य मार्ग था—एक संतुलित जीवन, न तो बहुत कड़ा और न ही बहुत आसान।

मैंने अपनी ताकत वापस पाने के लिए एक सरल भोजन स्वीकार किया। एक स्वस्थ शरीर और एक केंद्रित मन के साथ, मैं बोधि वृक्ष के नीचे बैठा और अपना ध्यान जारी रखा। वहाँ, अंततः मुझे realization प्राप्त हुआ और मैं बुद्ध बना।

इस अनुभव से, मैंने सीखा कि सच्ची बुद्धिमत्ता हमें चोट पहुँचाकर या आराम की तलाश करके नहीं मिलती, बल्कि संतुलन, करुणा और समझ के साथ जीकर मिलती है। यही सीख है जो मैं दुनिया के साथ साझा करता रहता हूँ।

अंत` ,
  ur: `میں بودہ کے نام سے مشہور ہونے سے پہلے، میں سیدارتھا گوتم تھا، جو درد اور زندگی کے معنی کی سچائی کی تلاش میں تھا۔ میں سمجھتا تھا کہ اپنے آپ کو غذا اور آرام سے محروم کر کے میں زیادہ دانا بن سکتا ہوں۔ اسی لیے میں جنگل میں گیا اور اپنے آپ کو انکار کرتے ہوئے رہا، ہر روز بہت کم مقدار میں غذا کھاتا رہا۔ میں صرف ایک پکوان کھیر کھاتا تھا، جو مجھے سوجاتا نامی ایک گاؤں کی عورت نے دیا تھا۔ وہ ہر روز اس بودی درخت کے نیچے آتی تھی جہاں میں بیٹھا کرتا تھا۔

جیسے جیسے وقت گزرا، میرا جسم بہت کمزور ہو گیا۔ میری ہڈیوں کے ڈھانچے میری جلد کے اوپر نظر آنے لگے، اور مجھے چلنے یا ध्यान کرنے کی بہت کم طاقت رہی۔ مجھے लगा کہ بہت زیادہ تکلیف کا سامنا کرنے سے میں سچ کے قریب پہنچ جاؤں گا، لیکن اس کے بجائے یہ مجھے تھکا ہوا اور واضح طور پر سوچنے سے قاصر چھوڑ گیا۔

پھر مجھے ایک اہم بات سمجھ آئی۔ اپنے آپ کو بھوکا رکھنا مجھے سکون یا سمجھ نہیں دے رہا تھا۔ میں نے دیکھا کہ دونوں، زندگی کا شوق اور شدید تکلیف والی زندگی، غیر متوازن تھیں۔ سچا راستہ درمیانی راستہ تھا—ایک متوازن زندگی، نہ بہت سخت اور نہ بہت آسان۔

میں نے اپنی طاقت واپس حاصل کرنے کے لیے ایک سادہ کھانا قبول کیا۔ ایک صحت مند جسم اور ایک مرکوز ذہن کے ساتھ، میں بودی درخت کے نیچے بیٹھا اور اپنا ध्यान جاری رکھا۔ وہاں، بالآخر مجھے روشنائی ملی اور میں بودہ بن گیا۔

اس تجربے سے، میں نے سیکھا کہ سچی دانائی ہمیں تکلیف دے کر یا آرام کی تلاش کر کے نہیں ملتی، بلکہ توازن، مہربانی اور تفہیم کے ساتھ زندگی گزار کر ملتی ہے۔ یہی سبق ہے جو میں دنیا کے ساتھ بانٹتا رہتا ہوں۔

اختتام` ,
  pt: `Antes de ser conhecido como o Buda, eu era Siddhartha Gautama, à procura da verdade sobre a dor e o sentido da vida. Eu acreditava que, negando a mim mesmo comida e conforto, poderia me tornar mais sábio. Por isso, fui para a floresta e vivi me negando, comendo apenas pequenas quantidades de alimento todos os dias. Eu comia apenas um prato chamado arroz doce (kheer), que me era dado por uma mulher do vilarejo chamada Sujata. Ela vinha todos os dias debaixo da árvore Bodhi, onde costumava sentar-me.

Com o passar do tempo, o meu corpo tornou-se extremamente fraco. Meus ossos apareciam através da pele, e mal tinha força para caminhar ou meditar. Achei que passar por grande sofrimento me aproximaria da verdade, mas, em vez disso, me deixou exausto e incapaz de pensar com clareza.

Então percebi algo importante. Passar fome não estava me levando à paz nem à compreensão. Eu vi que tanto uma vida de luxo quanto uma vida de sofrimento extremo eram desequilibradas. O verdadeiro caminho era o Caminho do Meio — uma vida de equilíbrio, nem muito rigorosa nem muito fácil.

Aceitei uma refeição simples para recuperar minhas forças. Com um corpo saudável e uma mente focada, sentei-me debaixo da árvore Bodhi e continuei minha meditação. Lá, finalmente alcancei a realização e tornei-me o Buda.

A partir dessa experiência, aprendi que a verdadeira sabedoria não vem de nos machucarmos nem de buscar conforto, mas de viver com equilíbrio, bondade e compreensão. Essa é a lição que continuo a compartilhar com o mundo.

O fim` ,
  'es-AR': `Antes de ser conocido como el Buda, yo era Siddhartha Gautama, buscando la verdad sobre el sufrimiento y el sentido de la vida. Creía que negándome comida y comodidad podría volverme más sabio. Por eso fui al bosque y viví negándome a mí mismo, comiendo solo pequeñas cantidades de alimento cada día. Yo solo comía un plato llamado arroz con leche (kheer), que me daba una mujer del pueblo llamada Sujata. Ella venía todos los días bajo el árbol Bodhi, donde solía sentarme.

Con el paso del tiempo, mi cuerpo se volvió extremadamente débil. Mis huesos se veían a través de la piel, y apenas tenía fuerzas para caminar o meditar. Pensé que pasar por un gran sufrimiento me acercaría a la verdad, pero, en cambio, me dejó exhausto e incapaz de pensar con claridad.

Entonces comprendí algo importante. Pasar hambre no me estaba acercando a la paz ni a la comprensión. Vi que tanto una vida de lujo como una vida de extrema sufrimiento estaban desequilibradas. El verdadero camino era el Camino del Medio: una vida de equilibrio, ni demasiado estricta ni demasiado fácil.

Acepté una comida sencilla para recuperar mis fuerzas. Con un cuerpo sano y una mente concentrada, me senté bajo el árbol Bodhi y continué mi meditación. Allí, por fin, alcancé la realización y me convertí en el Buda.

De esta experiencia aprendí que la verdadera sabiduría no nace de hacernos daño ni de buscar comodidad, sino de vivir con equilibrio, bondad y comprensión. Esa es la lección que sigo compartiendo con el mundo.

El fin` ,
  es: `Antes de ser conocido como el Buda, yo era Siddhartha Gautama, buscando la verdad sobre el sufrimiento y el sentido de la vida. Creía que negándome comida y comodidad podría volverme más sabio. Por eso fui al bosque y viví negándome a mí mismo, comiendo solo pequeñas cantidades de alimento cada día. Yo solo comía un plato llamado arroz con leche (kheer), que me daba una mujer del pueblo llamada Sujata. Ella venía todos los días bajo el árbol Bodhi, donde solía sentarme.

Con el paso del tiempo, mi cuerpo se volvió extremadamente débil. Mis huesos se veían a través de la piel, y apenas tenía fuerzas para caminar o meditar. Pensé que pasar por un gran sufrimiento me acercaría a la verdad, pero, en cambio, me dejó exhausto e incapaz de pensar con claridad.

Entonces comprendí algo importante. Pasar hambre no me estaba acercando a la paz ni a la comprensión. Vi que tanto una vida de lujo como una vida de extrema sufrimiento estaban desequilibradas. El verdadero camino era el Camino del Medio: una vida de equilibrio, ni demasiado estricta ni demasiado fácil.

Acepté una comida sencilla para recuperar mis fuerzas. Con un cuerpo sano y una mente concentrada, me senté bajo el árbol Bodhi y continué mi meditación. Allí, por fin, alcancé la realización y me convertí en el Buda.

De esta experiencia aprendí que la verdadera sabiduría no nace de hacernos daño ni de buscar comodidad, sino de vivir con equilibrio, bondad y comprensión. Esa es la lección que sigo compartiendo con el mundo.

El fin` ,
  'en-NG': fullEnglishStory,
  'pt-BR': `Antes de ser conhecido como o Buda, eu era Siddhartha Gautama, à procura da verdade sobre a dor e o sentido da vida. Eu acreditava que, negando a mim mesmo comida e conforto, poderia me tornar mais sábio. Por isso, fui para a floresta e vivi me negando, comendo apenas pequenas quantidades de alimento todos os dias. Eu comia apenas um prato chamado arroz doce (kheer), que me era dado por uma mulher do vilarejo chamada Sujata. Ela vinha todos os dias debaixo da árvore Bodhi, onde costumava me sentar.

Com o passar do tempo, o meu corpo tornou-se extremamente fraco. Meus ossos apareciam através da pele, e mal tinha forças para caminhar ou meditar. Achei que passar por grande sofrimento me aproximaria da verdade, mas, em vez disso, me deixou exausto e incapaz de pensar com clareza.

Então percebi algo importante. Passar fome não estava me levando à paz nem à compreensão. Eu vi que tanto uma vida de luxo quanto uma vida de sofrimento extremo eram desequilibradas. O verdadeiro caminho era o Caminho do Meio — uma vida de equilíbrio, nem muito rigorosa nem muito fácil.

Aceitei uma refeição simples para recuperar minhas forças. Com um corpo saudável e uma mente focada, sentei-me debaixo da árvore Bodhi e continuei minha meditação. Lá, finalmente alcancei a realização e tornei-me o Buda.

A partir dessa experiência, aprendi que a verdadeira sabedoria não vem de nos machucarmos nem de buscar conforto, mas de viver com equilíbrio, bondade e compreensão. Essa é a lição que continuo a compartilhar com o mundo.

O fim` ,
  ar: `قبل أن أُعرف باسم البوذا، كنتُ سيدهارثا غوتاما، أبحث عن حقيقة المعاناة ومعنى الحياة. كنت أؤمن أن إنكاري لنفسي الطعام والراحة قد يجعلني أكثر حكمة. لذلك ذهبتُ إلى الغابة وعشتُ منكرًا لنفسي، آخذُ فقط كمياتٍ قليلة من الطعام كل يوم. كنت آكلُ فقط طبقًا يُسمى حلوى الأرز (kheer)، والذي أعطته لي امرأةٌ من القرية اسمها سوجاتا. كانت تأتي كل يوم تحت شجرة بودي التي اعتدتُ أن أجلس عندها.

مع مرور الوقت، أصبح جسمي ضعيفًا جدًا. ظهرت عظامي من خلال جلدي، ولم أكن أملك القوة الكافية للمشي أو التأمل. كنت أظن أن الخوض في معاناة عظيمة سيقربني من الحقيقة، لكن بدلًا من ذلك، تركني منهكًا وغير قادر على التفكير بوضوح.

ثم أدركتُ شيئًا مهمًا. لم يكن الجوعُ المتواصل يقودني إلى السلام أو الفهم. رأيتُ أن الحياة المترفة وحياة المعاناة الشديدة كلاهما غير متوازن. كان الطريق الحقيقي هو الطريق الأوسط—حياةٌ متوازنة، ليست قاسية جدًا ولا سهلة جدًا.

قبلتُ وجبةً بسيطةً لاستعادة قوتي. ومع جسمٍ سليم وعقلٍ مركز، جلستُ تحت شجرة بودي وواصلتُ تأملي. هناك، وصلتُ في النهاية إلى الإدراك وصرتُ بوذا.

من هذه التجربة، تعلمتُ أن الحكمة الحقيقية لا تأتي من إيذاء أنفسنا أو البحث عن الراحة، بل من العيش في توازن، ورحمة، وفهم. هذه هي الرسالة التي أواصل مشاركتها مع العالم.

النهاية` ,
  'zh-CN': `在我被称为佛陀之前，我是悉达多·乔达摩，寻找关于痛苦和生命意义的真理。我相信，否定自己的食物和舒适，可以让我变得更有智慧。因此，我走进森林，过着自我克制的生活，每天只吃很少的食物。我只吃了一道叫做米饭布丁（kheer）的菜，那是一个叫苏加塔的村庄妇人给我的。她每天都会来到我常坐的菩提树下。

随着时间的推移，我的身体变得极度虚弱。我的骨头透过皮肤显现出来，我几乎没有力量走路或冥想。我原以为经历巨大的苦难会让我更接近真理，但结果却让我精疲力竭，无法清晰思考。

后来我意识到了一件重要的事。让自己挨饿并没有让我走向平静或理解。我看到，奢侈的生活和极端的苦难都不均衡。真正的道路是中道——一种平衡的生活，既不太严格，也不太轻松。

我接受了一顿简单的饭菜来恢复体力。怀着健康的身体和专注的心，我坐在菩提树下继续冥想。就在那里，我终于获得了觉悟，成为了佛陀。

从这次经历中，我学到真正的智慧并不是来自伤害自己或追求舒适，而是来自以平衡、善意和理解来生活。这是我一直想与世界分享的教训。

结束` ,
  ja: `私は仏陀として知られるようになる前、私は悉達多・ゴータマであり、苦しみと人生の意味について真理を求めていました。私は、自分自身の食べ物と快適さを否定することで、より賢くなれると信じていました。そこで、私は森に入り、自分を抑えつつ、毎日わずかな量の食べ物しか取らない生活を送りました。私は、スジャータという村の女性から与えられた、キールという一皿の料理だけを食べていました。彼女は、私がいつも座っていた菩提樹の下に毎日やってきました。

時が経つにつれ、私の体は極めて弱っていきました。骨が皮膚の下から浮き出し、歩くことも瞑想することもほとんどできませんでした。大きな苦しみを経験することで真理に近づけると考えましたが、逆に、私は疲れ切って、はっきりと考えることができなくなりました。

その後、私は大切なことに気づきました。自分を飢えさせることは、平和や理解へと導いてくれませんでした。私は、贅沢な生活も、極端な苦しみの生活も、どちらもバランスが取れていないことを知りました。真の道は中道であり、厳しすぎず、易しすぎない、バランスの取れた生き方でした。

私は力を取り戻すために、シンプルな食事を受け入れました。健康な身体と集中した心を持って、私は菩提樹の下に座り、瞑想を続けました。そこにおいて、私はついに覚醒を得て、仏陀となりました。

この経験から、私は真の知恵は、私たち自身を傷つけたり、快適さを求めたりすることからではなく、バランス、優しさ、理解をもって生きることから来ると学びました。これこそが、私は世界と共有し続ける教えです。

終わり` ,
  ko: `나는 부처로 알려지기 전에는 싯다르타 고타마였고, 고통과 삶의 의미에 대해 진리를 찾고 있었습니다. 나는 자신에게 음식과 편안함을 거부함으로써 더 현명해질 수 있다고 믿었습니다. 그래서 나는 숲으로 들어가 스스로를 절제하며, 매일 아주 적은 양의 음식만 먹으며 살았습니다. 나는 수자타라는 마을 여자가 준 키르라는 한 그릇의 음식을 먹었습니다. 그녀는 내가 자주 앉아 있던 보디 나무 아래로 매일 찾아왔습니다.

시간이 지나면서, 내 몸은 극도로 약해졌습니다. 뼈가 피부를 통해 드러나고, 걷거나 명상할 힘조차 거의 남지 않았습니다. 큰 고통을 겪는 것이 진리에 더 가깝게 해줄 것이라고 생각했지만, 오히려 나는 지쳐버렸고, 분명하게 생각하지 못하게 되었습니다.

그 뒤에 나는 중요한 것을 깨달았습니다. 스스로를 굶주리게 하는 것은 평화나 이해로 이끌지 않았습니다. 나는 사치스러운 삶과 극단적인 고통의 삶이 모두 균형이 없다는 것을 보았습니다. 진정한 길은 중도였고, 너무 엄격하지도 너무 쉬우지도 않은 균형 잡힌 삶이었습니다.

나는 힘을 되찾기 위해 간단한 식사를 받아들였습니다. 건강한 몸과 집중된 마음으로, 나는 보디 나무 아래에 앉아 명상을 계속했습니다. 그곳에서 나는 마침내 깨달음을 얻고 부처가 되었습니다.

이 경험을 통해 나는 진정한 지혜가 우리 자신을 해치거나 안락을 찾는 데서 오는 것이 아니라, 균형과 kindness, 이해를 가지고 사는 데서 온다는 것을 배웠습니다. 이것이 내가 세상과 계속 나누고 싶은 가르침입니다.

끝` ,
  fr: `Avant d’être connu sous le nom du Bouddha, j’étais Siddhartha Gautama, à la recherche de la vérité sur la souffrance et le sens de la vie. Je croyais qu’en me privant de nourriture et de confort, je pourrais devenir plus sage. C’est pourquoi je suis allé dans la forêt et j’ai vécu en me privant de tout, ne mangeant chaque jour que de très petites quantités de nourriture. Je ne mangeais qu’un seul plat appelé le kheer, qui m’avait été donné par une femme du village nommée Sujata. Elle venait chaque jour sous l’arbre Bodhi, là où j’avais l’habitude de m’asseoir.

Au fil du temps, mon corps devint extrêmement faible. Mes os se voyaient à travers ma peau, et j’avais à peine la force de marcher ou de méditer. Je pensais qu’affronter une grande souffrance me rapprocherait de la vérité, mais au lieu de cela, elle me laissait épuisé et incapable de penser clairement.

Puis je compris quelque chose d’important. Me priver de nourriture ne me conduisait ni à la paix ni à la compréhension. J’ai vu que tant une vie de luxe qu’une vie de souffrance extrême étaient déséquilibrées. Le vrai chemin était le Milieu — une vie d’équilibre, ni trop stricte ni trop facile.

J’ai accepté un simple repas pour retrouver mes forces. Avec un corps sain et un esprit concentré, je me suis assis sous l’arbre Bodhi et j’ai continué ma méditation. Là, j’ai finalement atteint la réalisation et suis devenu le Bouddha.

Grâce à cette expérience, j’ai appris que la vraie sagesse ne vient ni de nous blesser ni de chercher le confort, mais de vivre dans l’équilibre, la bonté et la compréhension. C’est la leçon que je continue de partager avec le monde.

La fin` ,
  de: `Bevor ich als der Buddha bekannt wurde, war ich Siddhartha Gautama und suchte nach der Wahrheit über das Leiden und den Sinn des Lebens. Ich glaubte, dass ich durch den Verzicht auf Nahrung und Komfort weiser werden könnte. Deshalb ging ich in den Wald und lebte in Selbstverleugnung, wobei ich jeden Tag nur sehr kleine Mengen an Nahrung zu mir nahm. Ich aß nur ein Gericht namens Kheer, das mir eine Frau aus dem Dorf namens Sujata gegeben hatte. Sie kam jeden Tag unter den Bodhi-Baum, wo ich zu sitzen pflegte.

Mit der Zeit wurde mein Körper extrem schwach. Meine Knochen traten durch meine Haut hervor, und ich hatte kaum noch die Kraft zum Gehen oder Meditieren. Ich dachte, dass großes Leid mich der Wahrheit näher bringen würde, aber stattdessen ließ es mich erschöpft und unfähig zurück, klar zu denken.

Dann erkannte ich etwas Wichtiges. Mich selbst hungern zu lassen führte mich weder zu Frieden noch zu Verständnis. Ich sah, dass sowohl ein Leben des Luxus als auch ein Leben extremen Leidens ungleichgewichtig waren. Der wahre Weg war der Mittlere Weg — ein Leben im Gleichgewicht, weder zu streng noch zu leicht.

Ich nahm eine einfache Mahlzeit an, um meine Kraft zurückzugewinnen. Mit einem gesunden Körper und einem fokussierten Geist saß ich unter dem Bodhi-Baum und setzte meine Meditation fort. Dort erreichte ich schließlich die Erkenntnis und wurde zum Buddha.

Durch diese Erfahrung lernte ich, dass wahre Weisheit nicht aus dem Verletzen selbst oder dem Suchen nach Komfort kommt, sondern aus dem Leben im Gleichgewicht, in Güte und im Verständnis. Das ist die Lehre, die ich weiter mit der Welt teile.

Das Ende` ,
  it: `Prima di essere conosciuto come il Buddha, ero Siddhartha Gautama, alla ricerca della verità sul dolore e sul significato della vita. Credevo che privandomi di cibo e comfort potessi diventare più saggio. Per questo entrai nella foresta e vissi in rinuncia a me stesso, mangiando solo piccole quantità di cibo ogni giorno. Mangiai solo un piatto chiamato kheer, che mi era stato dato da una donna del villaggio di nome Sujata. Lei veniva ogni giorno sotto l’albero di Bodhi, dove ero solito sedermi.

Col passare del tempo, il mio corpo divenne estremamente debole. Le mie ossa si vedevano attraverso la pelle e avevo a malapena la forza di camminare o meditare. Pensavo che sopportare grandi sofferenze mi avrebbe avvicinato alla verità, ma invece mi lasciò esausto e incapace di pensare chiaramente.

Poi capii qualcosa di importante. Farmi morire di fame non mi stava portando né alla pace né alla comprensione. Vidi che sia una vita di lusso sia una vita di sofferenza estrema erano sbilanciate. Il vero cammino era la Via di Mezzo — una vita di equilibrio, né troppo rigida né troppo facile.

Accettai un pasto semplice per recuperare le forze. Con un corpo sano e una mente concentrata, mi sedetti sotto l’albero di Bodhi e continuai la mia meditazione. Là, finalmente raggiunsi la realizzazione e divenni il Buddha.

Da questa esperienza, imparai che la vera saggezza non viene dal farci del male o dal cercare comfort, ma dal vivere con equilibrio, gentilezza e comprensione. Questa è la lezione che continuo a condividere con il mondo.

La fine` ,
  'es-MX': `Antes de ser conocido como el Buda, yo era Siddhartha Gautama, buscando la verdad sobre el sufrimiento y el sentido de la vida. Creía que negándome comida y comodidad podría volverme más sabio. Por eso fui al bosque y viví negándome a mí mismo, comiendo solo pequeñas cantidades de alimento cada día. Yo solo comía un platillo llamado arroz con leche (kheer), que me daba una mujer del pueblo llamada Sujata. Ella venía todos los días bajo el árbol Bodhi, donde solía sentarme.

Con el paso del tiempo, mi cuerpo se volvió extremadamente débil. Mis huesos se veían a través de la piel, y apenas tenía fuerzas para caminar o meditar. Pensé que pasar por un gran sufrimiento me acercaría a la verdad, pero, en cambio, me dejó exhausto e incapaz de pensar con claridad.

Entonces comprendí algo importante. Pasar hambre no me estaba acercando a la paz ni a la comprensión. Vi que tanto una vida de lujo como una vida de sufrimiento extremo estaban desequilibradas. El verdadero camino era el Camino del Medio: una vida de equilibrio, ni demasiado estricta ni demasiado fácil.

Acepté una comida sencilla para recuperar mis fuerzas. Con un cuerpo sano y una mente concentrada, me senté bajo el árbol Bodhi y continué mi meditación. Allí, por fin, alcancé la realización y me convertí en el Buda.

De esta experiencia aprendí que la verdadera sabiduría no nace de hacernos daño ni de buscar comodidad, sino de vivir con equilibrio, bondad y comprensión. Esa es la lección que sigo compartiendo con el mundo.
6
El fin` ,
  ru: `До того как меня стали называть Буддой, я был Сиддхартхой Гаутамой, ищущим истину о страдании и смысле жизни. Я верил, что отказав себе в пище и удобстве, смогу стать мудрее. Поэтому я ушёл в лес и жил в самоподавлении, принимая каждый день лишь очень небольшое количество пищи. Я ел только одно блюдо, называемое кхир, которое мне давала женщина из деревни по имени Суджата. Она приходила каждый день под дерево Бодхи, где я обычно сидел.

С течением времени моё тело стало чрезвычайно слабым. Кости проступали сквозь кожу, и у меня почти не оставалось сил идти или медитировать. Я думал, что переживание великого страдания приблизит меня к истине, но вместо этого оно оставило меня изнурённым и неспособным ясно мыслить.

Тогда я понял нечто важное. Голодание не вело меня ни к миру, ни к пониманию. Я увидел, что как жизнь в роскоши, так и жизнь в крайнем страдании были несбалансированны. Настоящий путь был Срединным путём — жизнью равновесия, не слишком строгой и не слишком лёгкой.

Я принял простую пищу, чтобы восстановить силы. Со здоровым телом и сосредоточенным умом я сел под дерево Бодхи и продолжил медитацию. Там я наконец достиг просветления и стал Буддой.

Из этого опыта я узнал, что истинная мудрость приходит не от причинения вреда себе или поиска комфорта, а от жизни в равновесии, доброте и понимании. Это урок, который я продолжаю передавать миру.

Конец` ,
  ta: `புத்தர் என்ற பெயரில் அறியப்படுவதற்கு முன், நான் சித்தார்த்த கௌதமன். துன்பம் மற்றும் வாழ்க்கையின் பொருள் பற்றிய உண்மையைத் தேடிக் கொண்டிருந்தேன். நான் தானே உணவு மற்றும் வசதியை மறுத்துக் கொண்டால், நான் அதிக ஞானியாகலாம் என்று நம்பினேன். ஆகவே, நான் காடுக்குள் சென்றேன்; தன்னை மறுத்து வாழ்ந்தேன்; ஒவ்வொரு நாளும் மிகச் சிறிய அளவு உணவை மட்டுமே உட்கொண்டேன். நான் கீர் என்ற ஒரு உணவை மட்டுமே சாப்பிட்டேன்; அது சுஜாதா என்ற கிராமத்து பெண்ணிடமிருந்து எனக்குக் கொடுக்கப்பட்டது. அவள் நான் வழக்கமாக அமர்ந்துகொண்டிருந்த போதி மரத்தின் கீழ் தினமும் வந்தாள்.

காலப்போக்கில், என் உடல் மிகவும் பலவீனமாகியது. என் எலும்புகள் தோலில் தெரியும் அளவுக்கு இருந்தன; நடக்கவோ தியானம் செய்யவோ எனக்கு பெரும்பாலும் சக்தி இல்லை. பெரிய துன்பத்தை அனுபவிப்பது உண்மைக்கு நெருக்கமாக கொண்டு வரும் என்று நினைத்தேன்; ஆனால் அதற்கு மாறாக அது என்னை மிகவும் சோர்வடையச் செய்து, தெளிவாக சிந்திக்க முடியாதவனாக்கியது.

பின்னர் நான் ஒரு முக்கியமான விஷயத்தை உணர்ந்தேன். என்னைச் சாகடித்துக் கொண்டிருப்பது அமைதி அல்லது புரிதலுக்கு கொண்டு செல்லவில்லை. ஆடம்பரமான வாழ்க்கையும் தீவிர துன்பத்தின் வாழ்க்கையும் சமச்சீரற்றவை என்பதைக் கண்டேன். உண்மையான பாதை நடுத்தர caminho — மிகக் கடுமையானதும் அல்ல, மிக இலகுவானதும் அல்ல, சமநிலையான வாழ்க்கை.

என் வலிமையை மீண்டும் பெறுவதற்காக நான் ஒரு எளிய உணவை ஏற்றுக்கொண்டேன். ஆரோக்கியமான உடலையும் 집중மான மனத்தையும் கொண்டவனாக, நான் போதி மரத்தின் கீழ் அமர்ந்து தியானத்தை தொடர்ந்தேன். அங்கே, இறுதியில் நான் ஞானத்தை அடைந்து புத்தரானேன்.

இந்த அனுபவத்திலிருந்து, உண்மையான ஞானம் நம்மைத் துன்புறுத்துவதிலோ அல்லது வசதியைத் தேடுவதிலோ இல்லை; சமநிலை, கிருபை, புரிதல் ஆகியவற்றுடன் வாழ்வதில்தான் உள்ளது என்பதைப் புரிந்துகொண்டேன். இது தான் நான் உலகத்துடன் பகிர்ந்து கொண்டிருக்கும் போதனை.

முடிவு` ,
  vi: `Trước khi được biết đến như Đức Phật, tôi là Siddhartha Gautama, tìm kiếm sự thật về nỗi đau và ý nghĩa của cuộc sống. Tôi tin rằng nếu tự mình từ chối thức ăn và sự thoải mái, tôi có thể trở nên khôn ngoan hơn. Vì thế, tôi đã đi vào rừng và sống trong sự tự kiềm chế, mỗi ngày chỉ ăn một lượng rất nhỏ thức ăn. Tôi chỉ ăn một món gọi là kheer, được một người phụ nữ làng tên Sujata đưa cho tôi. Bà ấy đến mỗi ngày dưới gốc cây Bodhi nơi tôi thường ngồi.

Theo thời gian, cơ thể tôi trở nên vô cùng yếu ớt. Xương của tôi lộ ra qua da, và tôi gần như không còn sức lực để đi lại hay thiền định. Tôi nghĩ rằng trải qua một nỗi đau lớn sẽ đưa tôi gần hơn đến sự thật, nhưng thay vào đó, nó khiến tôi kiệt sức và không thể suy nghĩ rõ ràng.

Sau đó, tôi nhận ra một điều quan trọng. Cứ làm mình đói khát không hề dẫn tôi đến bình an hay hiểu biết. Tôi thấy rằng cả cuộc sống xa hoa lẫn cuộc sống đầy đau khổ cực đoan đều thiếu cân bằng. Con đường thật sự là Con đường Trung dung — một cuộc sống hài hòa, không quá nghiêm khắc cũng không quá dễ dàng.

Tôi chấp nhận một bữa ăn đơn giản để phục hồi sức lực. Với một cơ thể khỏe mạnh và một tâm trí tập trung, tôi ngồi dưới gốc cây Bodhi và tiếp tục thiền định. Ở đó, cuối cùng tôi đạt được giác ngộ và trở thành Đức Phật.

Từ trải nghiệm này, tôi học được rằng trí tuệ thật sự không đến từ việc làm đau chính mình hay tìm kiếm sự thoải mái, mà đến từ việc sống với sự cân bằng, lòng tử tế và sự hiểu biết. Đó là bài học mà tôi tiếp tục chia sẻ với thế giới.

Kết thúc`
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
let highlightTimer = null;
let highlightStartTime = 0;
let currentQuestionIndex = null;
const questions = [
  {
    question: "Q1. For how long did Buddha fast?",
    answer: "For approximately six years."
  },
  {
    question: "Q2. At what age did the Buddha leave the palace?",
    answer: "He left the palace at the age of 29."
  },
  {
    question: "Q3. Why did the Buddha go to the forest?",
    answer: "Prince Siddhartha went to the forest in search of the truth and a way to end suffering."
  },
  {
    question: "Q4. Was Siddhartha Gautama married?",
    answer: "Yes. Siddhartha Gautama was married to Yashodhara and they had a son named Rahula."
  },
  {
    question: "Q5. what were the favorite sports of siidhartha gautama?",
    answer: "archery,chess,kabaddi,dice games,pick up sticks,hopscotch,and martial arts were his favorite sports."
  },
  {
    question: "Q6.who was siddhartha buddha ?",
    answer: "sidhartha gautama was the founder of the religion buddhisms."
  },
   {
    question: "Q7.Where was Siddhartha Buddha born ?",
    answer: "He was born in Lumbini in nepal."
  },
];

function buildStoryText() {
  const paragraphs = currentStory.trim().split(/\n\s*\n/);
  let globalIndex = 0;

  storyText.innerHTML = paragraphs
    .map((paragraph) => {
      const words = paragraph.trim().split(/\s+/);
      const wordMarkup = words
        .map((word) => `<span data-index="${globalIndex++}">${word}</span>`)
        .join(' ');
      return `<p>${wordMarkup}</p>`;
    })
    .join('');

  spanElements = Array.from(storyText.querySelectorAll('span'));
  resetHighlights();
  updateProgressBar();
  addWordClickListeners();
}
function addWordClickListeners() {
  spanElements.forEach((span) => {
    span.style.cursor = 'pointer';
    span.addEventListener('click', () => {
      const wordIndex = Number(span.dataset.index);
      playFromWordIndex(wordIndex);
    });
  });
}
function showScreen(screen) {
  introScreen.classList.toggle('active', screen === 'intro');
  storyScreen.classList.toggle('active', screen === 'story');
  questionScreen.classList.toggle('active', screen === 'question');
}

function resetHighlights() {
  spanElements.forEach((span) => span.classList.remove('active'));
}

function stopHighlightSync() {
  if (highlightTimer) {
    clearInterval(highlightTimer);
    highlightTimer = null;
  }
}
function startHighlightSync() {
  stopHighlightSync();

  // Fallback sync only if onboundary isn't firing
  // Use a longer interval for safety (don't interfere with onboundary)
  highlightTimer = window.setInterval(() => {
    if (!speechSynthesis.speaking || speechSynthesis.paused) {
      return;
    }
    updateProgressBar(); // Just update the progress bar, don't change word index
  }, 500);
}



function stopSpeech() {
  if (speechSynthesis.speaking || speechSynthesis.pending || speechSynthesis.paused) {
    speechSynthesis.cancel();
  }
  stopHighlightSync();
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

function showQuestionScreen() {
  showScreen('question');
  buildQuestionList();
  thankYouMessage.classList.add('hidden');
}

function buildQuestionList() {
  questionList.innerHTML = questions
    .map((item, index) => `
      <div class="question-card">
        <button type="button" data-index="${index}">${item.question}</button>
      </div>
    `)
    .join('');

  questionList.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.index);
      speakAnswer(index);
    });
  });
}

function speakAnswer(index) {
  const answerText = questions[index]?.answer;
  if (!answerText) return;

  currentQuestionIndex = index;
  stopSpeech();
  const responseUtterance = new SpeechSynthesisUtterance(answerText);
  responseUtterance.lang = languageLocaleMap[currentLanguage] || 'en-US';
  responseUtterance.rate = voiceRate;
  responseUtterance.volume = volume;
  responseUtterance.pitch = activeVoice === 'female' ? 1.15 : 0.85;
  const selectedVoice = getVoiceForLanguage(currentLanguage);
  if (selectedVoice) responseUtterance.voice = selectedVoice;

  responseUtterance.onend = () => {
    currentQuestionIndex = null;
    thankYouMessage.classList.add('hidden');
  };

  responseUtterance.onerror = () => {
    currentQuestionIndex = null;
  };

  speechSynthesis.speak(responseUtterance);
}

function finishQuestions() {
  stopSpeech();
  thankYouMessage.classList.remove('hidden');
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
  utterance.lang = languageLocaleMap[currentLanguage] || 'en-US';
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
    stopHighlightSync();
    currentWordIndex = Math.max(1, currentStory.trim().split(/\s+/).length);
    updateProgressBar();
    isPlaying = false;
    updatePlayState();
    showQuestionScreen();
  };

  utterance.onerror = () => {
    isPlaying = false;
    updatePlayState();
  };
}

function highlightWord(index) {
  resetHighlights();
  const safeIndex = Math.min(Math.max(0, index), spanElements.length - 1);
  const span = spanElements[safeIndex];
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
    startHighlightSync();
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
  startHighlightSync();
  isPlaying = true;
  updatePlayState();
  updateProgressBar();
}
function playFromWordIndex(startIndex) {
  if (!('speechSynthesis' in window)) {
    alert('Speech synthesis is not supported in this browser.');
    return;
  }

  stopSpeech(); // Stop any current playback

  // Get all words and calculate substring from clicked position
  const words = currentStory.trim().split(/\s+/);
  const startingWords = words.slice(startIndex);
  const substoryFromClick = startingWords.join(' ');

  // Create utterance from the clicked position onwards
  utterance = new SpeechSynthesisUtterance(substoryFromClick);
  utterance.lang = languageLocaleMap[currentLanguage] || 'en-US';
  utterance.rate = voiceRate;
  utterance.volume = volume;
  utterance.pitch = activeVoice === 'female' ? 1.15 : 0.85;

  const selectedVoice = getVoiceForLanguage(currentLanguage);
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  let offsetWordIndex = startIndex; // Track offset from start

  utterance.onboundary = (event) => {
    if (event.name !== 'word') return;
    try {
      const spokenSoFar = substoryFromClick.slice(0, event.charIndex);
      const wordsSoFar = spokenSoFar.split(/\s+/).filter(Boolean).length;
      if (wordsSoFar > 0 && wordsSoFar <= spanElements.length) {
        currentWordIndex = Math.max(0, offsetWordIndex + wordsSoFar - 1);
        highlightWord(currentWordIndex);
        updateProgressBar();
      }
    } catch (e) {
      console.error('Boundary event error:', e);
    }
  };

  utterance.onend = () => {
    stopHighlightSync();
    currentWordIndex = Math.max(1, currentStory.trim().split(/\s+/).length);
    updateProgressBar();
    isPlaying = false;
    updatePlayState();
    showQuestionScreen();
  };

  utterance.onerror = () => {
    isPlaying = false;
    updatePlayState();
  };

  speechSynthesis.speak(utterance);
  startHighlightSync();
  isPlaying = true;
  updatePlayState();
  updateProgressBar();
}

function pauseStory() {
  if (speechSynthesis.speaking) {
    speechSynthesis.pause();
  }
  stopHighlightSync();
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

questionBackButton.addEventListener('click', () => {
  showScreen('story');
});

doneButton.addEventListener('click', finishQuestions);

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
  const clickedWordIndex = Math.round((Number(event.target.value) / 100) * totalWords);

  // If already playing, play from clicked position
  if (isPlaying) {
    playFromWordIndex(clickedWordIndex);
  } else {
    // If not playing, just update visual position
    currentWordIndex = clickedWordIndex;
    highlightWord(currentWordIndex);
    updateProgressBar();
  }
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