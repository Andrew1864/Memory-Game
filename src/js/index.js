const EMOJIS = ["🥑", "🍇", "🍒", "🌽", "🥕", "🍉", "🥔", "🍌", "🥭", "🍍"];

/**
 *
 * @param {strings[]} items - Абстрактные данные для перемешивания и сортировки.
 * @returns {strings[]} - Перемешанный массив с данными.
 */
function shuffleAndPickRandom(items) {
  if (items && Array.isArray(items)) {
    // сортировка исходного массива в случайном порядке
    const sortedArr = items.sort(() => Math.random(items) - 0.5);

    // достаем из 10 элементов первые 8
    const dublicateArr = [...sortedArr].slice(0, 8);

    // из массива в 8 элементов, делаем 16
    const doubleArr = [...dublicateArr, ...dublicateArr];

    // сортировка массива из 16 элементов в случайном порядке
    const sortedDoubleArr = doubleArr.sort(() => Math.random(doubleArr) - 0.5);

    return sortedDoubleArr;
  } else {
    throw new Error("Передайте эмодзи в виде массива!");
  }
}
/**
 * Переворачивает карту и обрабатывает ход игрока
 * @param {HTMLDivElement} card - Карточка для переворачивания.
 */
const flipCard = (card) => {
  console.log("родитель карточки получен", card);
};
