// ── Questions ────────────────────────────────────────────
const QUESTIONS = [
  {
    category: 'JavaScript',
    text: 'Which method is used to add an element to the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'splice()'],
    answer: 0
  },
  {
    category: 'HTML',
    text: 'Which HTML tag is used to define an internal style sheet?',
    options: ['<script>', '<css>', '<style>', '<link>'],
    answer: 2
  },
  {
    category: 'CSS',
    text: 'Which CSS property controls the text size?',
    options: ['font-weight', 'text-size', 'font-size', 'text-style'],
    answer: 2
  },
  {
    category: 'JavaScript',
    text: 'What does "DOM" stand for?',
    options: ['Document Object Model', 'Data Object Map', 'Display Output Mode', 'Document Oriented Module'],
    answer: 0
  },
  {
    category: 'CSS',
    text: 'Which value of the `position` property places an element relative to the viewport?',
    options: ['relative', 'absolute', 'fixed', 'sticky'],
    answer: 2
  },
  {
    category: 'JavaScript',
    text: 'Which keyword declares a block-scoped variable in modern JavaScript?',
    options: ['var', 'let', 'define', 'set'],
    answer: 1
  },
  {
    category: 'HTML',
    text: 'What attribute specifies an alternate text for an image if the image cannot be displayed?',
    options: ['title', 'src', 'alt', 'href'],
    answer: 2
  },
  {
    category: 'JavaScript',
    text: 'What does `===` check in JavaScript?',
    options: ['Value only', 'Type only', 'Value and type', 'Neither'],
    answer: 2
  },
  {
    category: 'CSS',
    text: 'Which CSS display value makes children align in a row by default?',
    options: ['block', 'inline', 'flex', 'grid'],
    answer: 2
  },
  {
    category: 'JavaScript',
    text: 'Which built-in method calls a function for each element in an array?',
    options: ['map()', 'filter()', 'forEach()', 'reduce()'],
    answer: 2
  }
];

const TIMER_MAX = 20;
const LETTERS   = ['A', 'B', 'C', 'D'];

// ── State ────────────────────────────────────────────────
let currentQ  = 0;
let score     = 0;
let answered  = false;
let timerVal  = TIMER_MAX;
let timerInt  = null;
let results   = []; // { correct, skipped, chosen }

// ── DOM refs ─────────────────────────────────────────────
const startScreen  = document.getElementById('startScreen');
const quizScreen   = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');

const startBtn     = document.getElementById('startBtn');
const nextBtn      = document.getElementById('nextBtn');
const retryBtn     = document.getElementById('retryBtn');

const progressFill = document.getElementById('progressFill');
const progressLabel= document.getElementById('progressLabel');
const timerNum     = document.getElementById('timerNum');
const timerRing    = document.getElementById('timerRing');
const scorePill    = document.getElementById('scorePill');

const qCategory    = document.getElementById('qCategory');
const qNum         = document.getElementById('qNum');
const qText        = document.getElementById('qText');
const optionsGrid  = document.getElementById('optionsGrid');
const qFeedback    = document.getElementById('qFeedback');
const qcard        = document.getElementById('qcard');

const scoreBig     = document.getElementById('scoreBig');
const scoreRingFill= document.getElementById('scoreRingFill');
const resultTitle  = document.getElementById('resultTitle');
const resultSub    = document.getElementById('resultSub');
const rsCorrect    = document.getElementById('rsCorrect');
const rsWrong      = document.getElementById('rsWrong');
const rsSkipped    = document.getElementById('rsSkipped');
const rsAccuracy   = document.getElementById('rsAccuracy');
const reviewList   = document.getElementById('reviewList');

// ── Helpers ──────────────────────────────────────────────
function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach(s => s.classList.add('hidden'));
  screen.classList.remove('hidden');
}

function updateProgress() {
  const pct = ((currentQ) / QUESTIONS.length) * 100;
  progressFill.style.width = pct + '%';
  progressLabel.textContent = `${currentQ + 1} / ${QUESTIONS.length}`;
  qNum.textContent = `Q${currentQ + 1}`;
}

function updateTimerRing(val) {
  const pct    = (val / TIMER_MAX) * 100;
  const circ   = 100;
  timerRing.setAttribute('stroke-dasharray', `${pct} ${circ}`);
  timerNum.textContent = val;
  timerRing.classList.toggle('warning', val <= 10 && val > 5);
  timerRing.classList.toggle('danger',  val <= 5);
}

function bumpScore(pts) {
  score += pts;
  scorePill.textContent = `${score} pts`;
  scorePill.classList.add('bump');
  setTimeout(() => scorePill.classList.remove('bump'), 600);
}

// ── Timer ────────────────────────────────────────────────
function startTimer() {
  clearInterval(timerInt);
  timerVal = TIMER_MAX;
  updateTimerRing(timerVal);

  timerInt = setInterval(() => {
    timerVal--;
    updateTimerRing(timerVal);
    if (timerVal <= 0) {
      clearInterval(timerInt);
      handleTimeout();
    }
  }, 1000);
}

function handleTimeout() {
  if (answered) return;
  answered = true;
  results.push({ correct: false, skipped: true, chosen: -1 });

  // Reveal correct answer
  const q = QUESTIONS[currentQ];
  const btns = optionsGrid.querySelectorAll('.option-btn');
  btns.forEach(b => b.disabled = true);
  btns[q.answer].classList.add('correct');

  showFeedback('timeout', `⏱ Time's up! The answer was: ${LETTERS[q.answer]}. ${q.options[q.answer]}`);
  nextBtn.classList.remove('hidden');
}

// ── Render question ──────────────────────────────────────
function loadQuestion(index) {
  answered = false;
  qFeedback.classList.add('hidden');
  qFeedback.className = 'q-feedback hidden';
  nextBtn.classList.add('hidden');

  const q = QUESTIONS[index];
  qCategory.textContent = q.category;
  qText.textContent     = q.text;

  optionsGrid.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-letter">${LETTERS[i]}</span><span>${opt}</span>`;
    btn.addEventListener('click', () => handleAnswer(i));
    optionsGrid.appendChild(btn);
  });

  updateProgress();
  startTimer();
}

// ── Answer handling ──────────────────────────────────────
function handleAnswer(chosen) {
  if (answered) return;
  answered = true;
  clearInterval(timerInt);

  const q    = QUESTIONS[currentQ];
  const btns = optionsGrid.querySelectorAll('.option-btn');
  btns.forEach(b => b.disabled = true);

  const isCorrect = chosen === q.answer;
  results.push({ correct: isCorrect, skipped: false, chosen });

  btns[q.answer].classList.add('correct');

  if (isCorrect) {
    bumpScore(10);
    showFeedback('correct', `✓ Correct! +10 points`);
  } else {
    btns[chosen].classList.add('wrong');
    btns[chosen].classList.add('shake');
    showFeedback('wrong', `✗ Wrong. The answer was: ${LETTERS[q.answer]}. ${q.options[q.answer]}`);
  }

  nextBtn.classList.remove('hidden');
}

function showFeedback(type, msg) {
  qFeedback.textContent = msg;
  qFeedback.className   = `q-feedback ${type}-fb`;
}

// ── Navigation ───────────────────────────────────────────
function goNext() {
  if (currentQ >= QUESTIONS.length - 1) {
    showResult();
    return;
  }

  // Slide out → increment → slide in
  qcard.classList.add('slide-out');
  setTimeout(() => {
    qcard.classList.remove('slide-out');
    currentQ++;
    loadQuestion(currentQ);
    qcard.classList.add('slide-in');
    setTimeout(() => qcard.classList.remove('slide-in'), 350);
  }, 220);
}

// ── Result ───────────────────────────────────────────────
function showResult() {
  clearInterval(timerInt);
  showScreen(resultScreen);

  const correctCount = results.filter(r => r.correct).length;
  const wrongCount   = results.filter(r => !r.correct && !r.skipped).length;
  const skipCount    = results.filter(r => r.skipped).length;
  const accuracy     = Math.round((correctCount / QUESTIONS.length) * 100);

  // Animate score ring
  const circ = 326.7;
  setTimeout(() => {
    scoreRingFill.style.strokeDashoffset = circ - (circ * score / 100);
    if (score >= 80) scoreRingFill.style.stroke = '#27ae60';
    else if (score >= 50) scoreRingFill.style.stroke = '#e67e22';
    else scoreRingFill.style.stroke = '#c0392b';
  }, 100);

  // Animate score number
  let displayed = 0;
  const step = Math.ceil(score / 30);
  const counter = setInterval(() => {
    displayed = Math.min(displayed + step, score);
    scoreBig.textContent = displayed;
    if (displayed >= score) clearInterval(counter);
  }, 35);

  // Title & subtitle
  if (score === 100) {
    resultTitle.textContent = 'Perfect Score!';
    resultSub.textContent   = 'Outstanding! You answered everything correctly.';
  } else if (score >= 80) {
    resultTitle.textContent = 'Great Job!';
    resultSub.textContent   = 'You really know your stuff.';
  } else if (score >= 50) {
    resultTitle.textContent = 'Not Bad!';
    resultSub.textContent   = 'A solid attempt. Review the ones you missed.';
  } else {
    resultTitle.textContent = 'Keep Practicing';
    resultSub.textContent   = 'Don\'t give up — try again to improve your score.';
  }

  rsCorrect.textContent  = correctCount;
  rsWrong.textContent    = wrongCount;
  rsSkipped.textContent  = skipCount;
  rsAccuracy.textContent = accuracy + '%';

  // Build review list
  reviewList.innerHTML = '';
  QUESTIONS.forEach((q, i) => {
    const r    = results[i];
    const item = document.createElement('div');
    item.style.animationDelay = `${i * 50}ms`;

    if (r.correct) {
      item.className = 'review-item rv-correct';
      item.innerHTML = `<span class="rv-icon">✓</span><div><div class="rv-q">${q.text}</div><div class="rv-a">${q.options[q.answer]}</div></div>`;
    } else if (r.skipped) {
      item.className = 'review-item rv-skip';
      item.innerHTML = `<span class="rv-icon">⏱</span><div><div class="rv-q">${q.text}</div><div class="rv-a">Timed out · ${q.options[q.answer]}</div></div>`;
    } else {
      item.className = 'review-item rv-wrong';
      item.innerHTML = `<span class="rv-icon">✗</span><div><div class="rv-q">${q.text}</div><div class="rv-a">You: ${q.options[r.chosen]} · Correct: ${q.options[q.answer]}</div></div>`;
    }

    reviewList.appendChild(item);
  });
}

// ── Reset ────────────────────────────────────────────────
function resetQuiz() {
  currentQ = 0;
  score    = 0;
  answered = false;
  results  = [];
  scorePill.textContent = '0 pts';
  timerRing.classList.remove('warning', 'danger');
}

// ── Events ───────────────────────────────────────────────
startBtn.addEventListener('click', () => {
  resetQuiz();
  showScreen(quizScreen);
  loadQuestion(0);
});

nextBtn.addEventListener('click', goNext);

retryBtn.addEventListener('click', () => {
  resetQuiz();
  showScreen(quizScreen);
  loadQuestion(0);
});