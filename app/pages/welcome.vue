<template>
  <div class="flex h-full w-full items-center justify-center p-12">
    <div class="flex w-full max-w-96 flex-col items-center gap-8">
      <div class="flex flex-col items-center gap-4">
        <img class="w-24 select-none" src="/icon.png" alt="" />
        <div class="flex flex-col items-center gap-1">
          <h1 class="text-xl">Welcome to A • NI • ME</h1>
          <span class="text-sm text-neutral-400"
            >Please login to Anilist to continue</span
          >
        </div>
      </div>
      <div class="w-full rounded-xl border border-neutral-700 p-4">
        <AccountPart @login="confetti" />
      </div>
      <UiButton
        v-slot="props"
        text="Finish"
        :disabled="!authStore.user"
        @click="navigateTo('/')"
      >
        <LucideCheck :class="props.class" />
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import JSConfetti from "js-confetti";
import { LucideCheck } from "lucide-vue-next";

const hideNavbar = usePageScopedState("hideNavbar");
hideNavbar.value = true;

const authStore = useAuthStore();

const confetti = () => {
  const jsConfetti = new JSConfetti();
  jsConfetti
    .addConfetti({
      confettiRadius: 6,
      confettiNumber: 800,
    })
    .then(() => jsConfetti.destroyCanvas());
};
</script>
