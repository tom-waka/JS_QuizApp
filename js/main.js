'use strict';

{
  const question = document.getElementById('question');
  const q_text = document.getElementById('q_text');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');
  
  const quizSet = shuffle([
    {q: '【？】に入る言葉はどれでしょう。', q_text: 'サンタ　砂　那覇　【？】' , c: ['銃','剣','槍']},
    {q: '【？】に入る数字はどれでしょう。', q_text: ' ２　→→　４　→↓ 【？】' , c: ['9','6','3']},
    {q: 'この3つの単語はある共通点を持っています。\n同じ共通点をもった単語はどれでしょう。', q_text: '質　　鳩　　地図' , c: ['琴','笛','鈴']},
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

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;
    question.innerText = quizSet[currentNum].q;
    q_text.textContent = quizSet[currentNum].q_text;

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