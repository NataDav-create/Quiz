const btnNext = document.querySelectorAll('[data-nav="next"]');
btnNext.forEach(button => {
  button.addEventListener('click', function () {
    const thisCard = this.closest('[data-card]');
    let thisCardNumber = parseInt(thisCard.dataset.card);
    let nextCard = thisCardNumber + 1;

    thisCard.classList.add('hidden');
    document.querySelector(`[data-card="${nextCard}"]`).classList.remove('hidden');
  });
});



const btnPrev = document.querySelectorAll('[data-nav="prev"]');
btnPrev.forEach(button => {
  button.addEventListener('click', function () {
    const thisCard = this.closest('[data-card]');
    let thisCardNumber = parseInt(thisCard.dataset.card);
    let prevCard = thisCardNumber - 1;

    thisCard.classList.add('hidden');
    document.querySelector(`[data-card="${prevCard}"]`).classList.remove('hidden');
  })
})