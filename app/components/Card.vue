<template>
  <div
    class="w-20 h-28 rounded-xl shadow-md border border-gray-300 flex flex-col items-center justify-between p-2 transition-transform duration-200 bg-white hover:-translate-y-1 hover:shadow-lg select-none"
    :class="{
      'text-red-600': ['♥', '♦'].includes(card.suit),
      'text-black': ['♠', '♣'].includes(card.suit),
    }"
  >
    <!-- Верхний угол -->
    <div class="self-start text-sm font-bold">
      {{ card.rank }}<br />
      {{ card.suit }}
    </div>

    <!-- Большой символ масти -->
    <div class="text-3xl">
      {{ card.suit }}
    </div>

    <!-- Нижний угол (перевернутый) -->
    <div class="self-end text-sm font-bold rotate-180">
      {{ card.rank }}<br />
      {{ card.suit }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  card: {
    type: Object,
    required: true,
  },
});
</script>
