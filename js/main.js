'use strict';

{
  const question = document.getElementById('question');
  const qText = document.getElementById('qText');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');

  const hint = document.getElementById('hint');
  const hintBtn = document.getElementById('hintBtn');
  const hintLabel = document.querySelector('#hint > p');

  const explanation = document.getElementById('explanation');
  const expBtn = document.getElementById('expBtn');
  const expLabel = document.querySelector('#explanation > p');

  const hintClose = document.getElementById('hintClose');
  const expClose = document.getElementById('expClose');

  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: '【？】に入る言葉はどれでしょう。', qText: 'サンタ　砂　那覇　【？】' , c: ['銃','剣','槍'],
                                            h: '平仮名に変換してみよう',
                                            e: '正解は「銃」\n\n平仮名にすると「さんた　すな　なは」となり、「３＋７＝」と読める。\nつまり「３＋７＝１０(銃)」'},
    {q: '【？】に入る数字はどれでしょう。', qText: ' ２　→→　４　→↓ 【？】' , c: ['9','6','3'],
                                            h: '2は「に」、4は「し」と読んでみよう',
                                            e: '正解は「９」\n\n2は「に」、4は「し」と変換すると、\n「に　→→　し　→↓【？】」となる。\n\nこれを５０音表に当てはめると、\n「に」の２個右は「し」。\n\nつまり「し(４)」の右下は「く(９)」'},
    {q: 'この3つの単語はある共通点を持っています。\n同じ共通点をもった単語はどれでしょう。',
                                            qText: '質　　鳩　　地図' , c: ['琴','笛','鈴'],
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
    
	hint.classList.add('hidden');
    hintBtn.classList.add('disabled');
    expBtn.classList.remove('disabled');
    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;
    question.innerText = quizSet[currentNum].q;
    qText.textContent = quizSet[currentNum].qText;
    hintLabel.textContent = quizSet[currentNum].h;
	  expLabel.innerText = quizSet[currentNum].e;
	  
    hint.classList.add('hidden');
    hintBtn.classList.remove('disabled');
    explanation.classList.add('hidden');
    expBtn.classList.add('disabled');

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

  hintBtn.addEventListener('click', () => {
    if (isAnswered){
      return;
    }
    hintBtn.classList.add('disabled');
    hint.classList.remove('hidden');
  });

  expBtn.addEventListener('click', () => {
    if (isAnswered === false) {
      return;
    }
    expBtn.classList.add('disabled');
    explanation.classList.remove('hidden');
  });

  hintClose.addEventListener('click', () => {
	if (isAnswered === false) {
      hintBtn.classList.remove('disabled');
	}
    hint.classList.add('hidden');
  });

  expClose.addEventListener('click', () => {
	expBtn.classList.remove('disabled');
    explanation.classList.add('hidden');
  });

  btn.addEventListener('click', () =>{
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length -1) {
      scoreLabel.textContent = `${quizSet.length}問中、${score}問正解でした！`;
      explanation.classList.add('hidden');
	  result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}