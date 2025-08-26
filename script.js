const correctOrder = [
  "馬鹿野郎ーっ!!",
  "松田",
  "誰を撃ってる!?",
  "ふざけるなーっ!!"
];
let words = [...correctOrder];

// シャッフル
words.sort(() => Math.random() - 0.5);

const container = document.getElementById("wordContainer");
const slots = [
  document.getElementById("slot1"),
  document.getElementById("slot2"),
  document.getElementById("slot3"),
  document.getElementById("slot4")
];
let selected = Array(4).fill(null); // 4枠の内容を保持

// 番号ラベル（①②③④）
const slotLabels = ["①", "②", "③", "④"];

// 入力された文章を表示する枠
const sentenceBox = document.getElementById("sentenceBox");

function renderWords() {
  container.innerHTML = "";
  words.forEach(text => {
    const div = document.createElement("div");
    div.className = "word";
    div.textContent = text;

    if (selected.includes(text)) {
      div.classList.add("used");
    }

    div.addEventListener("click", () => {
      if (!div.classList.contains("used")) {
        const emptyIndex = selected.findIndex(v => v === null);
        if (emptyIndex !== -1) {
          selected[emptyIndex] = text;
          div.classList.add("used");
          slots[emptyIndex].textContent = text;
          updateSentence();
        }
      }
    });

    container.appendChild(div);
  });
}

function renderSlots() {
  slots.forEach((slot, i) => {
    if (selected[i]) {
      slot.textContent = selected[i];
    } else {
      slot.textContent = slotLabels[i]; // 番号に戻す
    }
  });
  updateSentence();
}

// 入力文章を更新する
function updateSentence() {
  // スペースを入れずに連結
  const sentence = selected.filter(v => v !== null).join("");
  sentenceBox.textContent = sentence || "ここに文章が表示されます";
}

// 取り消すボタン
document.querySelectorAll(".cancel-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const index = parseInt(btn.dataset.index);
    if (selected[index]) {
      const removed = selected[index];
      selected[index] = null;
      slots[index].textContent = slotLabels[index]; // 番号に戻す
      // 元の候補を再び使えるように
      const wordDiv = [...container.querySelectorAll(".word")].find(d => d.textContent === removed);
      if (wordDiv) wordDiv.classList.remove("used");
      updateSentence();
    }
  });
});

document.getElementById("checkBtn").addEventListener("click", () => {
  if (selected.includes(null)) {
    document.getElementById("result").textContent = "4つすべて選んでください！⚠️";
    return;
  }
  const isCorrect = JSON.stringify(selected) === JSON.stringify(correctOrder);

  if (isCorrect) {
    document.getElementById("result").textContent = "正解！🎉";
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 }
    });
  } else {
    document.getElementById("result").textContent = "残念！😢";
    showXMark();
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  selected = Array(4).fill(null);
  renderSlots();
  renderWords();
  document.getElementById("result").textContent = "";
  updateSentence();
});

// ✖印を一瞬表示する関数
function showXMark() {
  const x = document.createElement("div");
  x.className = "x-mark";
  x.textContent = "✖";
  document.body.appendChild(x);
  setTimeout(() => x.remove(), 800);
}

// 初期表示
renderSlots();
renderWords();
updateSentence();
