const btnNext = document.querySelectorAll('[data-nav="next"]');
btnNext.forEach(button => {
  button.addEventListener('click', function () {
    const thisCard = this.closest('[data-card]');
    navigate('next', thisCard);
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