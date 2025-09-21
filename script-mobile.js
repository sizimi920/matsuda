const pc = document.getElementById("pc-element");
const sp = document.getElementById("sp-element");

// 画面幅が768px以下をスマホとみなす
const mediaQuery = window.matchMedia("(max-width: 768px)");

function update(e) {
  if (e.matches) {
    // スマホ幅
    sp.classList.remove("hidden");
    pc.classList.add("hidden");
  } else {
    // PC幅
    pc.classList.remove("hidden");
    sp.classList.add("hidden");
  }
}

update(mediaQuery);

mediaQuery.addEventListener("change", update);

const correctOrder = [
  "馬鹿野郎ーっ!!",
  "松田",
  "誰を撃ってる!?",
  "ふざけるなーっ!!"
];

let words = [...correctOrder];
// シャッフル
words.sort(() => Math.random() - 0.5);

const container = document.getElementById('wordContainer');
const sentenceBox = document.getElementById('sentenceBox');
const checkBtn = document.getElementById('checkBtn');
const resetBtn = document.getElementById('resetBtn');
const resultDiv = document.getElementById('result');

let selected = []; // 選択された順を保持

function renderWords() {
  container.innerHTML = '';
  words.forEach(text => {
    const d = document.createElement('div');
    d.className = 'word';
    d.textContent = text;
    if (selected.includes(text)) d.classList.add('used');

    d.addEventListener('click', () => {
      if (selected.length >= 4) return; // 4つまで
      if (selected.includes(text)) return; // すでに選択済み
      selected.push(text);
      d.classList.add('used');
      updateSentence();
    });

    container.appendChild(d);
  });
}

function updateSentence() {
  // スペースなしで連結（原文通り）
  const s = selected.join('');
  sentenceBox.textContent = s || 'ここに文章が表示されます';
}

checkBtn.addEventListener('click', () => {
  if (selected.length < 4) {
    resultDiv.textContent = '4つすべて選んでください！';
    return;
  }
  const ok = JSON.stringify(selected) === JSON.stringify(correctOrder);
  if (ok) {
    resultDiv.textContent = '正解！🎉';
    // confetti
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  } else {
    resultDiv.textContent = '残念！😢';
    showXMark();
  }
});

resetBtn.addEventListener('click', () => {
  selected = [];
  renderWords();
  updateSentence();
  resultDiv.textContent = '';
});

function showXMark() {
  const x = document.createElement('div');
  x.className = 'x-mark';
  x.textContent = '✖';
  document.body.appendChild(x);
  setTimeout(() => x.remove(), 800);
}

// 初期表示
renderWords();
updateSentence();
