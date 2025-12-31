<template>
  <div
    class="min-h-screen bg-green-700 text-white p-6 flex flex-col justify-between"
  >
    <div v-if="players && players.length >= 4">
      <!-- Верхняя часть -->
      <div class="flex justify-center mb-10">
        <PlayerArea
          :player="players[1]"
          :isActive="currentPlayerIndex === 1"
          position="top"
        />
      </div>

      <!-- Средняя часть -->
      <div class="flex justify-between items-center">
        <PlayerArea
          :player="players[2]"
          :isActive="currentPlayerIndex === 2"
          position="left"
        />

        <div class="text-center">
          <p class="text-lg font-semibold mb-2">
            Ходит:
            <span class="text-yellow-300">{{ currentPlayer?.playerName }}</span>
            ({{ currentPlayer?.playerRole }})
          </p>

          <p class="text-sm mb-4">⏱ {{ timer }} сек</p>

          <!-- Кнопка взять карту -->
          <button
            v-if="isMyTurn"
            @click="takeCard"
            class="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-2 rounded-lg shadow-md transition-all"
          >
            Взять карту
          </button>

          <!-- Подсказка для других -->
          <p v-else class="text-gray-400 italic">Ожидание хода...</p>
        </div>

        <PlayerArea
          :player="players[3]"
          :isActive="currentPlayerIndex === 3"
          position="right"
        />
      </div>

      <!-- Нижняя часть -->
      <div class="flex justify-center mt-10">
        <PlayerArea
          :player="players[0]"
          :isActive="currentPlayerIndex === 0"
          position="bottom"
        />
      </div>
    </div>

    <!-- Пока игра не готова -->
    <div v-else class="text-center text-gray-300 text-lg mt-20">
      Загрузка игроков...
    </div>
  </div>
</template>

<script setup>
import { useGame } from "@/composables/useGame";
import PlayerArea from "@/components/PlayerArea.vue";
import { onMounted, computed } from "vue";

const {
  players,
  currentPlayer,
  currentPlayerIndex,
  timer,
  takeCard, // добавим в useGame()
  startGame,
  myIndex, // индекс текущего пользователя, если нужно
} = useGame();

// Проверяем, ход текущего ли игрока
const isMyTurn = computed(() => currentPlayerIndex.value === myIndex.value);

onMounted(() => {
  startGame(); // только на клиенте
});
</script>
