import { ref, computed } from "vue";
import { useGame } from "./useGame";

export const usePlayer = (name = "Player", role = "havno") => {
  const { deck } = useGame(); // получаем доступ к колоде
  const hand = ref([]); // карты игрока
  const score = ref(0);
  const playerName = ref(name);
  const playerRole = ref(role);

  // 🔹 Выдать карту
  const drawCard = () => {
    if (deck.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck.splice(randomIndex, 1)[0];
    hand.value.push(card);
    return card;
  };

  // 🔹 Выдать несколько карт
  const drawCards = (count = 1) => {
    for (let i = 0; i < count; i++) drawCard();
  };

  // 🔹 Сбросить карту
  const discardCard = (cardName) => {
    hand.value = hand.value.filter((c) => c.name !== cardName);
  };

  // 🔹 Очистить руку
  const clearHand = () => {
    hand.value = [];
  };

  // 🔹 Текущее количество карт
  const cardsCount = computed(() => hand.value.length);

  // 🔹 Информация об игроке
  const info = computed(() => ({
    name: playerName.value,
    role: playerRole.value,
    cards: hand.value,
    score: score.value,
  }));

  return {
    playerName,
    playerRole,
    hand,
    score,
    cardsCount,
    info,
    drawCard,
    drawCards,
    discardCard,
    clearHand,
  };
};
