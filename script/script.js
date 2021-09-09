document.addEventListener('DOMContentLoaded', function () {
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const burgerWhiteName = "Стандарт";
    const burgerWhiteSrc = "./image/burger.png";

    const question = [
      {
        question: "Какого цвета бургер вы хотите?",
        answers: [
          {
            title: "Стандарт",
            url: "./image/burger.png",
          },
          {
            title: "Черный",
            url: "./image/burgerBlack.png",
          }
        ]
      }
    ]

    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block')
        playTest()
    })

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block')
    })

    const playTest = () => {

      const renderAnswers = () => {
        question[0].answers.forEach((answer) => {
          const answerItem = document.createElement('div');

          answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

          answerItem.innerHTML = `
            <input type="radio" id="answerItem1" name="answer" class="d-none">
            <label for="answerItem1" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="burger">
            <span>${answer.title}</span>
            </label>
          `;
          formAnswers.appendChild(answerItem)
        })
      }

        const renderQuestion = () => {
            questionTitle.textContent = `${question[0].question}`;

            renderAnswers();
            
        }
        renderQuestion();

        
        
    }
})

