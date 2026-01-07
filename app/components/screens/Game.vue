<template>
  <text
    ref="ref_text"
    :style="{ fontFamily: 'Oswald', fontSize: 24, fill: 'white' }"
  >
    GAME

    <Card x="200" y="100" value="A" suit="♥" />
    <Card x="350" y="100" value="K" suit="♠" />
    <Card x="500" y="100" value="6" suit="♦" />
    <Card x="650" y="100" value="10" suit="♠" />
  </text>
</template>

<script setup>
import Card from "../game/Card.vue";
</script>
