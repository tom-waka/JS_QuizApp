'use strict';

{
  const question = document.getElementById('question');
  const q_text = document.getElementById('q_text');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');

  const hint_btn = document.getElementById('hint_btn');
  const hint = document.getElementById('hint');
  const hintLabel = document.querySelector('#hint > p');

  const explanation_btn = document.getElementById('explanation_btn');
  const explanation = document.getElementById('explanation');
  const explanationLabel = document.querySelector('#explanation > p');

  const close_hint = document.getElementById('close_hint');
  const close_exp = document.getElementById('close_exp');

  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');
  

  const quizSet = shuffle([
    {q: '【？】に入る言葉はどれでしょう。', q_text: 'サンタ　砂　那覇　【？】' , c: ['銃','剣','槍'],
                                            h: '平仮名に変換してみよう',
                                            e: '正解は「銃」\n\n平仮名にすると「さんた　すな　なは」となり、「３＋７＝」と読める。\nつまり「３＋７＝１０(銃)」'},
    {q: '【？】に入る数字はどれでしょう。', q_text: ' ２　→→　４　→↓ 【？】' , c: ['9','6','3'],
                                            h: '2は「に」、4は「し」と読んでみよう',
                                            e: '正解は「９」\n\n2は「に」、4は「し」と変換すると、\n「に　→→　し　→↓【？】」となる。\n\nこれを５０音表に当てはめると、\n「に」の２個右は「し」。\n\nつまり「し(４)」の右下は「く(９)」'},
    {q: 'この3つの単語はある共通点を持っています。\n同じ共通点をもった単語はどれでしょう。',
                                            q_text: '質　　鳩　　地図' , c: ['琴','笛','鈴'],
                                            h: 'ゆっくりと声に出して読んでみよう',
                                            e: '正解は「琴」\n\n問題文の単語は間に「ー」を入れると別のモノになる。\n「シーツ、ハート、チーズ」\n\nつまり、「コート」になる琴が正解。'},
  ]);

  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered === true) {
      return;
    }
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    }else{
      li.classList.add('wrong');
    }

    hint_btn.classList.add('disabled');
    btn.classList.remove('disabled');
    explanation_btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;
    question.innerText = quizSet[currentNum].q;
    q_text.textContent = quizSet[currentNum].q_text;
    hint.classList.add('hidden');
    hint_btn.classList.remove('disabled');
    hintLabel.textContent = `${quizSet[currentNum].h}`;
    explanation.classList.add('hidden');
    explanation_btn.classList.add('disabled');
    explanationLabel.innerText = `${quizSet[currentNum].e}`;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = '結果を見る';
    }
  }

  setQuiz();

  hint_btn.addEventListener('click', () => {
    if (isAnswered){
      return;
    }
    hint_btn.classList.add('disabled');
    hint.classList.remove('hidden');
  });

  explanation_btn.addEventListener('click', () => {
    if (explanation_btn.classList.contains('disabled')) {
      return;
    }
    if (!hint.classList.contains('hidden')){
      hint.classList.add('hidden');
    }
    explanation_btn.classList.add('disabled');
    explanation.classList.remove('hidden');
  });

  close_hint.addEventListener('click', () => {
    hint_btn.classList.remove('disabled');
    hint.classList.add('hidden');
  });

  close_exp.addEventListener('click', () => {
    explanation.classList.add('hidden');
    explanation_btn.classList.remove('disabled');
  });

  btn.addEventListener('click', () =>{
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length -1) {
      scoreLabel.textContent = `${quizSet.length}問中、${score}問正解でした！`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}