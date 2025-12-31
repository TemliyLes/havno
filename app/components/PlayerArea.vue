<template>
  <div
    class="flex flex-col items-center"
    :class="{
      'opacity-100': isActive,
      'opacity-70': !isActive,
    }"
  >
    <!-- Имя и роль -->
    <div class="mb-2 text-center">
      <p class="font-bold text-lg">{{ player?.playerName }}</p>
      <p class="text-sm text-gray-200">{{ player?.playerRole }}</p>
    </div>

    <!-- Карты игрока -->
    <div
      class="flex gap-1"
      :class="{
        'flex-row': position === 'bottom' || position === 'top',
        'flex-col': position === 'left' || position === 'right',
      }"
    >
      <div
        v-for="card in player?.hand"
        :key="card.name"
        class="w-12 h-18 bg-white text-black rounded-md shadow-sm flex items-center justify-center font-bold"
      >
        {{ card.rank }}{{ card.suit }}
      </div>

      <!-- Если карт нет -->
      <div
        v-if="!player?.hand?.length"
        class="w-12 h-18 bg-gray-300/20 border border-gray-400 rounded-md flex items-center justify-center text-sm"
      >
        🂠
      </div>
    </div>

    <!-- Подсветка активного игрока -->
    <div v-if="isActive" class="mt-2 text-yellow-300 text-sm animate-pulse">
      Ваш ход
    </div>
  </div>
</template>

<script setup>
defineProps({
  player: Object,
  isActive: Boolean,
  position: {
    type: String,
    default: "bottom",
  },
});
</script>
