const answers = {
  2: null,
  3: null,
  4: null,
  5: null,
  6: null
}

const btnNext = document.querySelectorAll('[data-nav="next"]');
btnNext.forEach(button => {
  button.addEventListener('click', function () {
    const thisCard = this.closest('[data-card]');

    if (thisCard.dataset.validate == 'novalidate') {
      console.log('novalidate');
      navigate('next', thisCard);
    } else {
      console.log('validate');
      navigate('next', thisCard);
    }
  });
});



const btnPrev = document.querySelectorAll('[data-nav="prev"]');
btnPrev.forEach(button => {
  button.addEventListener('click', function () {
    const thisCard = this.closest('[data-card]');
    navigate('prev', thisCard);
  })
});

function navigate(direction, thisCard) {
  let thisCardNumber = parseInt(thisCard.dataset.card);
  let nextCard;

  if (direction == 'next') {
    nextCard = thisCardNumber + 1;
  } else {
    nextCard = thisCardNumber - 1;
  }

  thisCard.classList.add('hidden');
  document.querySelector(`[data-card="${nextCard}"]`).classList.remove('hidden');
}

function gatherCardData(number) {
  let question,
    result = [];

  let currentCard = document.querySelector(`[data-card="${number}"]`);

  question = currentCard.querySelector('[data-question]').innerText;

  let radioValues = currentCard.querySelectorAll('[type="radio"]');
  radioValues.forEach(item => {

    if (item.checked) {
      result.push({
        name: item.name,
        value: item.value
      })
    }
  })

  let data = {
    question: question,
    answer: result
  }
  return data;
}