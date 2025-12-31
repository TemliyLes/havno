import { ref, computed, onMounted } from "vue";

export const useGame = () => {
  // ⚙️ Параметры игры
  const gameParams = ref({
    playersCount: 4,
    moveTime: 60, // секунд на ход
    cardsPerPlayer: 6, // карт каждому игроку
  });

  // 🎭 Роли
  const ROLES = ["king", "prophet", "jocker", "sweeper", "havno"];

  // 🃏 Колода карт
  const suits = ["♠", "♥", "♦", "♣"];
  const ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  const deck = ref([]);
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.value.push({ rank, suit, name: `${rank}${suit}` });
    }
  }

  // 👥 Игроки
  const players = ref([]);
  const currentPlayerIndex = ref(0);
  const timer = ref(gameParams.value.moveTime);

  const myIndex = ref(0); // индекс локального игрока (клиента)

  const currentPlayer = computed(() => players.value[currentPlayerIndex.value]);

  let intervalId = null;

  // 🔹 Функция раздачи ролей
  const assignRoles = (count) => {
    let selectedRoles = [];
    if (count < ROLES.length) {
      let i = 0;
      let j = ROLES.length - 1;
      while (selectedRoles.length < count && i <= j) {
        if (selectedRoles.length < count) selectedRoles.push(ROLES[i++]);
        if (selectedRoles.length < count) selectedRoles.push(ROLES[j--]);
      }
    } else {
      selectedRoles = [...ROLES];
    }
    // перемешиваем роли случайным образом
    return selectedRoles.sort(() => Math.random() - 0.5);
  };

  // 🔹 Старт игры
  const startGame = () => {
    if (process.server) return; // не запускаем на сервере

    const count = gameParams.value.playersCount;
    const cardsPerPlayer = gameParams.value.cardsPerPlayer;
    const names = ["Иван", "Олег", "Мария", "Даша", "Антон", "Сергей"];

    // распределяем роли
    const selectedRoles = assignRoles(count);

    // перемешиваем колоду
    const shuffledDeck = [...deck.value].sort(() => Math.random() - 0.5);

    // создаём игроков и раздаём карты
    players.value = Array.from({ length: count }, (_, i) => {
      const playerCards = shuffledDeck.splice(0, cardsPerPlayer);
      return {
        playerName: names[i] ?? `Игрок ${i + 1}`,
        playerRole: selectedRoles[i],
        hand: playerCards,
      };
    });

    startTurnTimer();
  };

  // 🔹 Таймер хода
  const startTurnTimer = () => {
    timer.value = gameParams.value.moveTime;
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      timer.value--;
      if (timer.value <= 0) {
        nextTurn();
      }
    }, 1000);
  };

  // 🔹 Переход к следующему ходу
  const nextTurn = () => {
    currentPlayerIndex.value =
      (currentPlayerIndex.value + 1) % players.value.length;
    timer.value = gameParams.value.moveTime;
  };

  // 🔹 Взять карту
  const takeCard = () => {
    if (!currentPlayer.value || deck.value.length === 0) return;

    const card = deck.value.pop();
    currentPlayer.value.hand.push(card);
    nextTurn();
  };

  // 🔹 Остановить игру (чистка таймера)
  const stopGame = () => {
    clearInterval(intervalId);
  };

  return {
    gameParams,
    players,
    currentPlayer,
    currentPlayerIndex,
    timer,
    myIndex,
    startGame,
    takeCard,
    nextTurn,
    stopGame,
  };
};
