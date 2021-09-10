// обработчик событий, отслеживающий загрузку контента
document.addEventListener('DOMContentLoaded', function () {
  const btnOpenModal = document.querySelector('#btnOpenModal');
  const modalBlock = document.querySelector('#modalBlock');
  const closeModal = document.querySelector('#closeModal');
  const questionTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const nextButton = document.querySelector('#next');
  const prevButton = document.querySelector('#prev');
  const sendButton = document.querySelector('#send');


  //объект содержщий вопросы
  const questions = [
    {
      question: "Какого цвета бургер?",
      answers: [
        {
          title: 'Стандарт',
          url: './image/burger.png'
        },
        {
          title: 'Черный',
          url: './image/burgerBlack.png'
        }
      ],
      type: 'radio'
    },
    {
      question: "Из какого мяса котлета?",
      answers: [
        {
          title: 'Курица',
          url: './image/chickenMeat.png'
        },
        {
          title: 'Говядина',
          url: './image/beefMeat.png'
        },
        {
          title: 'Свинина',
          url: './image/porkMeat.png'
        }
      ],
      type: 'radio'
    },
    {
      question: "Дополнительные ингредиенты?",
      answers: [
        {
          title: 'Помидор',
          url: './image/tomato.png'
        },
        {
          title: 'Огурец',
          url: './image/cucumber.png'
        },
        {
          title: 'Салат',
          url: './image/salad.png'
        },
        {
          title: 'Лук',
          url: './image/onion.png'
        }
      ],
      type: 'checkbox'
    },
    {
      question: "Добавить соус?",
      answers: [
        {
          title: 'Чесночный',
          url: './image/sauce1.png'
        },
        {
          title: 'Томатный',
          url: './image/sauce2.png'
        },
        {
          title: 'Горчичный',
          url: './image/sauce3.png'
        }
      ],
      type: 'radio'
    }
  ];
  //обработчики событий на закрытие и открытие  модального онна
  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block')
    playTest()
  })

  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block')
  })
  // фунция начала тестирования
  const playTest = () => {

    const finalAnswers = [];
    let numberQuestion = 0;

    //функция рендера ответов
    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement('div');

        answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

        answerItem.innerHTML = `
            <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
            <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="burger">
            <span>${answer.title}</span>
            </label>
          `;
        formAnswers.appendChild(answerItem)
      })
    }
    //функция рендера вопросов и ответов
    const renderQuestion = (indexQestion) => {

      formAnswers.innerHTML = '';

      if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
        questionTitle.textContent = `${questions[indexQestion].question}`;
        renderAnswers(indexQestion);
        nextButton.classList.remove('d-none');
        prevButton.classList.remove('d-none');
        sendButton.classList.add('d-none');
      }

      if (numberQuestion === 0) {
        prevButton.classList.add('d-none');
      }

      if (numberQuestion === questions.length) {
        nextButton.classList.add('d-none');
        prevButton.classList.add('d-none');
        sendButton.classList.remove('d-none');
        formAnswers.innerHTML = `
          <div class="form-group">
            <label for="numberPhone">Введите телефон</label>
            <input type="phone" class="form-control" id="numberPhone">
          </div>
        `;
      }

      if (numberQuestion === questions.length + 1) {
        formAnswers.textContent = 'Спасибо за пройденный тест';
        setTimeout(() => {
          modalBlock.classList.remove('d-block')
        }, 2000)
      }
    }

    //запуск функции рендеринга
    renderQuestion(numberQuestion);


    const checkAnswer = () => {
      const obj = {};
      const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id ==='numberPhone')
      console.log(inputs);
      inputs.forEach((input, index) => {
        if(numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        }

        if(numberQuestion === questions.length) {
          obj['Номер телефона'] = input.value;
        }
      })

      finalAnswers.push(obj);
    }

    //обработчик событий кнопок
    nextButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestion(numberQuestion);
    }

    prevButton.onclick = () => {
      numberQuestion--;
      renderQuestion(numberQuestion);
    }

    sendButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestion(numberQuestion);
      console.log(finalAnswers);
    }
  }

})

