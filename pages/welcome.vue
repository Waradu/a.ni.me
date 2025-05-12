<template>
  <div class="w-full h-full flex p-12 justify-center items-center">
    <div class="flex flex-col gap-8 max-w-96 items-center">
      <div class="flex flex-col gap-4 items-center">
        <img class="w-24 select-none" src="/icon.png" alt="" />
        <div class="flex flex-col gap-1 items-center">
          <h1 class="text-xl">Welcome to A • NI • ME</h1>
          <span class="text-sm text-neutral-400">Please login to Anilist to continue</span>
        </div>
      </div>
      <Account @login="confetti" />
      <UiButton text="Finish" v-slot="props" disabled>
        <IconCheck :class="props.class" />
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import JSConfetti from "js-confetti";
import Account from "~/components/Account.vue";

const title = usePageScopedState("title");
title.value = "Welcome";

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
