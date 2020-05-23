'use strict';

{
  const question = document.getElementById('question');
  const choises = document.getElementById('choises');
  const btn = document.getElementById('btn');
  
  const quizSet = [
    {q: 'what is A?', c: ['A0','A1','A2']},
    {q: 'what is B?', c: ['B0','B1','B2']},
    {q: 'what is C?', c: ['C0','C1','C2']},
  ];

  let currentNum = 0;

  question.textContent = quizSet[currentNum].q;

  quizSet[currentNum].c.forEach(choise => {
    const li = document.createElement('li');
    li.textContent = choise;
    choises.appendChild(li);
  });
}