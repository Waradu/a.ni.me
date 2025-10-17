<template>
  <div
    class="relative flex h-full w-full flex-col bg-neutral-800/85 backdrop-blur-md"
  >
    <Titlebar hide-navigation />
    <main class="h-full w-[calc(100%-4px)] overflow-hidden overflow-y-scroll">
      <div
        class="flex min-h-screen flex-col items-center justify-center gap-8 p-12 px-4 text-center"
      >
        <div class="flex flex-col items-center gap-4">
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
          class="max-w-xl text-left text-sm whitespace-pre-wrap text-neutral-400"
        >
          <h2 class="font-semibold text-neutral-600">Stack Trace:</h2>
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
