<template>
  <Container :x="x" :y="y">
    <Container v-if="!faceUp && backTexture">
      <Sprite
        ref="backSprite"
        :texture="backTexture"
        :width="CARD_WIDTH"
        :height="CARD_HEIGHT"
      />
      <Graphics ref="backMask" />
    </Container>

    <Graphics v-if="faceUp" ref="cardGraphic" />

    <template v-if="faceUp">
      <Text :text="value" :style="cornerStyle" :x="10" :y="10" />
      <Text :text="suit" :style="cornerStyle" :x="10" :y="35" />

      <Text
        :text="suit"
        :style="centerStyle"
        :anchor="{ x: 0.5, y: 0.5 }"
        :x="CARD_WIDTH / 2"
        :y="CARD_HEIGHT / 2"
      />

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
    </template>
  </Container>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { Graphics, Assets } from "pixi.js";

const props = defineProps({
  x: Number,
  y: Number,
  value: String,
  suit: String,
  faceUp: { type: Boolean, default: true },
});

const CARD_WIDTH = 120;
const CARD_HEIGHT = 180;
const RADIUS = 12;

const backTexture = ref(null);
const backSprite = ref();
const backMask = ref();
const cardGraphic = ref();

const color = props.suit === "♥" || props.suit === "♦" ? 0xff0000 : 0x000000;

const cornerStyle = { fontFamily: "Roboto", fontSize: 24, fill: color };
const centerStyle = { fontFamily: "Roboto", fontSize: 52, fill: color };

onMounted(async () => {
  backTexture.value = await Assets.load("/img/flat.jpg");

  await nextTick();

  const mask = backMask.value;
  const sprite = backSprite.value;

  if (mask && sprite) {
    mask.clear();
    mask.beginFill(0xffffff);
    mask.drawRoundedRect(0, 0, CARD_WIDTH, CARD_HEIGHT, RADIUS);
    mask.endFill();

    sprite.mask = mask;
  }

  const g = cardGraphic.value;
  if (!g) return;

  g.clear();
  g.beginFill(0xffffff);
  g.lineStyle({ width: 2, color: 0x000000, alpha: 1 });
  g.drawRoundedRect(0, 0, CARD_WIDTH, CARD_HEIGHT, RADIUS);
  g.endFill();
});
</script>
