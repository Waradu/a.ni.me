<template>
  <div
    class="w-full h-full flex p-12 justify-center items-center flex-col gap-4"
  >
    <img class="w-24 select-none" src="/icon.png" alt="" />
    <UiButton text="Confetti" @click="confetti" />
    <UiButton text="Finish" v-slot="props" disabled>
      <IconCheck :class="props.class" />
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
import JSConfetti from "js-confetti";

const confetti = () => {
  const jsConfetti = new JSConfetti();
  jsConfetti
    .addConfetti({
      confettiRadius: 6,
      confettiNumber: 800,
    })
    .then(jsConfetti.destroyCanvas);
};
</script>
