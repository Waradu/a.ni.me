<template>
  <div
    class="relative w-full h-full bg-neutral-800 bg-opacity-85 backdrop-blur-md flex flex-col"
  >
    <Titlebar hide-navigation />
    <main class="w-[calc(100%-4px)] h-full overflow-hidden overflow-y-scroll">
      <div
        class="min-h-screen flex flex-col items-center justify-center text-center p-12 px-4 gap-8"
      >
        <div class="flex flex-col gap-4 items-center">
          <h1 class="text-5xl font-bold">Oops! {{ error.statusCode }}</h1>
          <p class="text-lg text-neutral-500">{{ error.message }}</p>
          <UiButton text="Home" @click="home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-house-icon lucide-house size-4"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
              <path
                d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
              ></path>
            </svg>
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
