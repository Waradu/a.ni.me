<template>
  <div class="relative w-full h-full bg-neutral-800 bg-opacity-85 backdrop-blur-md flex flex-col">
    <Titlebar />
    <main class="w-[calc(100%-4px)] h-full overflow-hidden overflow-y-scroll">
      <div
        class="min-h-screen flex flex-col items-center justify-center text-center p-12 px-4 gap-8"
      >
        <div class="flex flex-col gap-4 items-center">
          <h1 class="text-5xl font-bold">Oops! {{ error.statusCode }}</h1>
          <p class="text-lg text-neutral-500">{{ error.message }}</p>
          <UiButton text="Home" v-slot="props" @click="home">
            <IconHome :class="props.class" />
          </UiButton>
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
    <Statusbar />
  </div>
</template>

<script setup lang="ts">
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
