<template>
  <text
    ref="ref_text"
    :anchor="0.5"
    :x="width / 2"
    :y="height / 2"
    :style="{ fontFamily: 'Oswald', fontSize: 24, fill: 'white' }"
  >
    Добро пожаловать в HAVNO
  </text>
</template>

<script setup>
defineProps({
  width: { type: Number },
  height: { type: Number },
});
const ref_text = ref();
defineExpose({ ref_text });
</script>
