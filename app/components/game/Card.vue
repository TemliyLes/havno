<template>
  <Container :x="x" :y="y" ref="root">
    <!-- Карта -->
    <Graphics ref="cardGraphic" />

    <!-- Верхний левый угол: значение + масть -->
    <Text :text="value" :style="cornerStyle" :x="10" :y="10" />
    <Text :text="suit" :style="cornerStyle" :x="10" :y="35" />

    <!-- Центр карты: большая масть -->
    <Text
      :text="suit"
      :style="centerStyle"
      :anchor="{ x: 0.5, y: 0.5 }"
      :x="CARD_WIDTH / 2"
      :y="CARD_HEIGHT / 2"
    />

    <!-- Нижний правый угол: перевернутый -->
    <Text
      :text="value"
      :style="cornerStyle"
      :anchor="{ x: 0, y: 0 }"
      :x="CARD_WIDTH - 10"
      :y="CARD_HEIGHT - 10"
      :rotation="Math.PI"
    />
    <Text
      :text="suit"
      :style="cornerStyle"
      :anchor="{ x: 0, y: 0 }"
      :x="CARD_WIDTH - 10"
      :y="CARD_HEIGHT - 35"
      :rotation="Math.PI"
    />
  </Container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Graphics } from "pixi.js";

const props = defineProps({
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  value: { type: String, required: true },
  suit: { type: String, required: true },
});

const CARD_WIDTH = 120;
const CARD_HEIGHT = 180;

const root = ref();
const cardGraphic = ref();

// Цвет масти
const color = props.suit === "♥" || props.suit === "♦" ? 0xff0000 : 0x000000;

// Стиль текста
const cornerStyle = {
  fontFamily: "Roboto",
  fontSize: 24,
  fill: color,
};
const centerStyle = {
  fontFamily: "Roboto",
  fontSize: 42,
  fill: color,
};

onMounted(() => {
  const g = cardGraphic.value;

  g.clear();
  g.beginFill(0xffffff); // белая карта
  g.lineStyle(2, 0x000000); // черная рамка
  g.drawRoundedRect(0, 0, CARD_WIDTH, CARD_HEIGHT, 12);
  g.endFill();
});
</script>
