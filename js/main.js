'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');
  
  const quizSet = shuffle([
    {q: 'what is A?', c: ['A0','A1','A2']},
    {q: 'what is B?', c: ['B0','B1','B2']},
    {q: 'what is C?', c: ['C0','C1','C2']},
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
    question.textContent = quizSet[currentNum].q;

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