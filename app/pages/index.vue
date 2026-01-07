<template>
  <client-only>
    <div class="overflow-hidden" v-if="width && height">
      <Application :key="canvasKey" :width="width" :height="height">
        <Intro v-if="isIntro" ref="intro_ref" :width="width" :height="height" />
        <Game v-if="!isIntro" />
      </Application>
    </div>
  </client-only>
</template>

<script setup>
import gsap from "gsap";
import Game from "~/components/screens/Game.vue";
import Intro from "~/components/screens/Intro.vue";
const width = ref(0);
const height = ref(0);
const canvasKey = ref("0x0");

const intro_ref = ref();

const isIntro = ref(false);

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

watchEffect(() => {
  const text = intro_ref.value?.ref_text;

  if (!text) return;

  const tl = gsap.timeline({
    onComplete: () => {
      isIntro.value = false;
    },
  });

  tl.fromTo(
    text.scale,
    { x: 1.5, y: 1.5 },
    { x: 1, y: 1, duration: 2, ease: "power2.out" }
  )
    .to({}, { duration: 1 })
    .to(text, { alpha: 0, duration: 1, ease: "power1.in" });
});
</script>
