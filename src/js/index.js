const EMOJIS = ["🥑", "🍇", "🍒", "🌽", "🥕", "🍉", "🥔", "🍌", "🥭", "🍍"];

/**
 *
 * @param {strings[]} items - Абстрактные данные для перемешивания и сортировки.
 * @returns {strings[]} - Перемешанный массив с данными.
 */

/**
 *
 * @param {strings[]} items - Абстрактные данные для перемешивания и сортировки.
 * @returns {strings[]} - Перемешанный массив с данными.
 */
export const shuffleAndPickRandom = items => {
  if (!items || !Array.isArray(items)) throw new Error("Передайте эмодзи в виде массива!");

  // сортировка исходного массива в случайном порядке
  const sortedArr = items.sort(() => Math.random(items) - 0.5);

  // достаем из 10 элементов первые 8
  const dublicateArr = [...sortedArr].slice(0, 8);

  // из массива в 8 элементов, делаем 16
  const doubleArr = [...dublicateArr, ...dublicateArr];

  // сортировка массива из 16 элементов в случайном порядке
  const sortedDoubleArr = doubleArr.sort(() => Math.random(doubleArr) - 0.5);

  return sortedDoubleArr;
};

/**
 * Увеличивает счетчик перевернутых карт и общий счетчик ходов.
 */
export const increaseFlipCount = () => {
  STATE.flippedCards++;
  STATE.totalFlips++;
};

/**
 * Сбрасывает счетчик перевернутых карт.
 */
const resetFlipCount = () => STATE.flippedCards = 0;

/**
 * Проверяет, можно перевернуть карту или нет.
 * @returns {boolean} - Да/нет.
 */
export const canFlip = () => STATE.flippedCards <= 2;

/**
 * Проверяет, перевернута вторая карта или нет.
 * @returns {boolean} - Да/нет.
 */
export const isSecondCardFlipped = () => STATE.flippedCards === 2;

/**
 * Переворачивает карту.
 * @param {HTMLElement} card - Карта для переворачивания.
 */
export const flip = card => card.classList.add("flipped");

/**
 * Проверяет совпадение перевернутых карт.
 */
export const checkMatch = () => {
  const flippedCards = document.querySelectorAll(".flipped:not(.matched)");

  if (flippedCards[0].innerText === flippedCards[1].innerText) {
    markMatched(flippedCards);
  } else {
    setTimeout(() => {
      flipBack(); // Переворачиваем обратно все карты, которые не совпали.
    }, 1000);
  }
};

/**
 * Отмечает перевернутые карты как совпавшие.
 * @param {NodeList} cards - Перевернутые карты, которые совпали.
 */
export const markMatched = cards => {
  cards.forEach(card => card.classList.add("matched"));

  isSecondCardFlipped() && resetFlipCount(); // Если карточки совпали, обнуляем счетчик.
};

/**
 * Переворачивает обратно все карты, которые не совпали, обнуляет счетчик.
 */
export const flipBack = () => {
  const unmatchedCards = document.querySelectorAll(".card:not(.matched)");

  unmatchedCards.forEach(card => card.classList.remove("flipped"));

  resetFlipCount();
};

/**
 * Проверяет, выиграл игрок или нет.
 * @returns {boolean} - Да/нет.
 */
export const isGameWon = () => !document.querySelectorAll(".card:not(.flipped)").length;

/**
 * Отображает сообщение о выигрыше.
 */
export const displayWinMessage = () => {
  setTimeout(() => {
    SELECTORS.boardContainer.classList.add("flipped");

    SELECTORS.win.innerHTML = `
      <span class="win-text">
        Игра успешно пройдена!<br />
        количество шагов: <span class="highlight">${STATE.totalFlips}</span><br />
        Время в игре: <span class="highlight">${STATE.totalTime}</span> секунд
      </span>
    `;

    clearInterval(STATE.loop);
  }, 1000);
};

/**
 * Переворачивает карту и обрабатывает ход игрока
 * @param {HTMLDivElement} card - Карточка для переворачивания.
 */
const flipCard = (card) => {
  console.log("родитель карточки получен", card);
};
/**
 * Состояние игры
 * @property {boolean} isGameStarted - Игра началась или нет.
 * @property {number} totalTime - Общее время в игре.
 * @property {number} flippedCards - Количество перевернутых карточек.
 * @property {number} totalFlips - Общее количество перевернутых карточек.
 */
const STATE = {
  isGameStarted: false,
  totalTime: 0,
  flippedCards: 0,
  totalFlips: 0,
};

/**
 * Контролы игры
 * @property {HTMLDivElement} boardContainer - Контейнер игрового поля.
 * @property {HTMLDivElement} board - Основное содержимое поля (4x4).
 * @property {HTMLDivElement} moves - Контрол для учета шагов.
 * @property {HTMLDivElement} timer - Контрол для учета времени.
 * @property {HTMLButtonElement} start - Кнопка для старта игры.
 */
const SELECTORS = {
  boardContainer: document.querySelector(".board-container"),
  board: document.querySelector(".board"),
  moves: document.querySelector(".moves"),
  timer: document.querySelector(".timer"),
  start: document.querySelector("button"),
  win: document.querySelector(".win"),
};

/**
 * Генерация игрового поля
 */
const generateGame = () => {
  // Получение data атрибута
  const dimensions = SELECTORS.board.dataset.dimension;

  if (dimensions % 2 !== 0) {
    throw new Error("Размер игрового поля должен быть четным!");
  }

  // Вызываем функцию перемешивания и получения случайной карточки для эмодзи
  const shuffleAndPickEmoji = shuffleAndPickRandom(EMOJIS);

  const cardsHtML = shuffleAndPickEmoji 
    .map((imodji) =>{
      return `
      <div class="card">
      <div class="card-front"></div>
      <div class="card-back">${imodji}</div>
    </div>`
    })
    .join("");
    //Вставка карточек в игровое поле
    SELECTORS.board.insertAdjacentHTML("beforeend", cardsHtML);
};

const startGame = () => {

  STATE.isGameStarted = true;
 // отключение кнопки старта игры 
  SELECTORS.start.classList.add("disabled");
 // Обновляем время каждую секунду 
  STATE.loop = setInterval(() => {
    // Увеличиваем общее время игры на 1 секунду.
    STATE.totalTime++;

    // Обновляем информацию о ходах и времени на экране.
    SELECTORS.moves.innerText = `${STATE.totalFlips} ходов`;
    SELECTORS.timer.innerText = `время: ${STATE.totalTime} сек`;
  }, 1000);
};

const handleCardActions = card => {
  canFlip() && flip(card); // Переворачиваем карту, если возможно.

  increaseFlipCount(); // Увеличиваем счетчик ходов.

  isSecondCardFlipped() && checkMatch(); // Проверяем совпадение перевернутых карт (возвращаем в исходную позицию).

  isGameWon() && displayWinMessage(); // Если игрок выиграл, отображаем сообщение о прохождении игры.
};

 /**
 * Обрабатывает событие клика по карточке.
 * @param {Event} event - Объект события click.
 */
 const handleClick = event => {
  // Получаем цель события (элемент, по которому произошел клик) и его родительский элемент.
  const eventTarget = event.target;
  const eventParent = eventTarget.parentElement;

  // Является ли цель события элемент с классом "card" и он еще не перевернут.
  const isCardAndNotFlipped = eventParent.classList.contains("card") && !eventParent.classList.contains("flipped");

  isCardAndNotFlipped && handleCardActions(eventParent);

  // Является ли цель события кнопкой, которая не отключена.
  const isInitializedGame = eventTarget.nodeName === "BUTTON" && !eventTarget.classList.contains("disabled");

  isInitializedGame && startGame();
};


// Вызов необходимых функций при загрузке страниц 

document.addEventListener("DOMContentLoaded", ()=>{
  generateGame(); // Генерация игры 
  document.addEventListener("click", handleClick); // Прикрепление обработчиков событий
});


