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
    const thisCardNumber = parseInt(thisCard.dataset.card);

    if (thisCard.dataset.validate == 'novalidate') {
      console.log('novalidate');
      navigate('next', thisCard);
    } else {
      console.log('validate');
      saveAnswer(thisCardNumber, gatherCardData(thisCardNumber));

      if (isFilled(thisCardNumber) && checkOnRequired(thisCardNumber)) {
        navigate('next', thisCard);
      } else {
        alert('please answer before next step');
      }
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

  let checkBoxValues = currentCard.querySelectorAll('[type="checkbox"]');
  checkBoxValues.forEach(item => {
    if (item.checked) {
      result.push({
        name: item.name,
        value: item.value
      })
    }
  });

  let inputValues = currentCard.querySelectorAll('[type="text"], [type="number"], [type="email"]');
  inputValues.forEach(item => {
    let itemValue = item.value;
    if (itemValue.trim() != '') {
      result.push({
        name: item.name,
        value: item.value
      });
    }
  })

  let data = {
    question: question,
    answer: result
  }
  console.log(data)
  return data;
}

function saveAnswer(number, data) {
  answers[number] = data;
}

function isFilled(number) {
  if (answers[number].answer.length > 0) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  let pattern = /^[\w-\.]+@[\w]+\.[a-z]{2,4}$/i;
  return pattern.test(email);
}

function checkOnRequired(number) {
  let currentCard = document.querySelector(`[data-card="${number}"]`);
  let requiredFields = currentCard.querySelectorAll('[required]');
  let isValidArray = [];
  requiredFields.forEach(item => {
    if (item.type == 'checkbox' && item.checked == false) {
      isValidArray.push(false);
    } else if (item.type == 'email') {
      if (validateEmail(item.value)) {
        isValidArray.push(true);
      } else {
        isValidArray.push(false);
      }
    }
  });
  if (isValidArray.indexOf(false) == -1) {
    return true;
  } else {
    return false;
  }
}