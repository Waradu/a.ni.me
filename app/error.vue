<template>
  <div
    class="relative w-full h-full bg-neutral-800/85 backdrop-blur-md flex flex-col"
  >
    <Titlebar hide-navigation />
    <main class="w-[calc(100%-4px)] h-full overflow-hidden overflow-y-scroll">
      <div
        class="min-h-screen flex flex-col items-center justify-center text-center p-12 px-4 gap-8"
      >
        <div class="flex flex-col gap-4 items-center">
          <h1 class="text-5xl font-bold">Oops! {{ error.statusCode }}</h1>
          <p class="text-lg text-neutral-500">{{ error.message }}</p>
          <div class="flex gap-2">
            <UiButton v-slot="props" text="Back to Library" @click="home">
              <LucideLibrary :class="props.class" />
            </UiButton>
            <CheckForUpdatesButton />
          </div>
        </div>
        <div
          v-if="error.stack && dev"
          class="max-w-xl text-left text-sm text-neutral-400 whitespace-pre-wrap"
        >
          <h2 class="text-neutral-600 font-semibold">Stack Trace:</h2>
          {{ error.stack }}
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { LucideLibrary } from "lucide-vue-next";

const dev = import.meta.dev;

const home = () => navigateTo("/");

const title = usePageScopedState("title");
title.value = "Error";

defineProps<{
  error: {
    statusCode: number;
    message: string;
    stack?: string;
  };
}>();
</script>
