<template>
  <client-only>
    <div class="overflow-hidden" v-if="width && height">
      <Application :key="canvasKey" :width="width" :height="height">
        <text
          :anchor="0.5"
          :x="width / 2"
          :y="height / 2"
          :style="{ fontFamily: 'Oswald', fontSize: 24, fill: 'white' }"
        >
          Добро пожаловать в HAVNO
        </text>
      </Application>
    </div>
  </client-only>
</template>

<script setup>
const width = ref(0);
const height = ref(0);
const canvasKey = ref("0x0");

const updateSize = () => {
  width.value = window.innerWidth;
  height.value = window.innerHeight;
  canvasKey.value = `${width.value}x${height.value}`;
};

onMounted(() => {
  updateSize();
  window.addEventListener("resize", updateSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateSize);
});
</script>
