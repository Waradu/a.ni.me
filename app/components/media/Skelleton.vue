<template>
  <div class="flex w-full flex-col gap-3 p-3 pt-0">
    <div class="pointer-events-none flex w-full flex-col">
      <div
        class="mb-3 flex w-full cursor-pointer items-center gap-1 text-sm text-neutral-400 transition-colors select-none hover:text-white"
      >
        <LucideChevronDown class="size-4" />
        <div class="flex w-full justify-between gap-1">
          <span>loading...</span>
          <span>0</span>
        </div>
      </div>
      <div
        class="grid h-max w-full grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-3 pt-0 pl-5 select-none"
      >
        <div
          v-for="x in 100"
          :key="x"
          class="flex w-[1fr] max-w-[260px] animate-pulse flex-col items-center gap-1 text-center"
        >
          <div
            class="group relative flex aspect-[2/3] w-full items-center justify-center overflow-hidden rounded-md border border-solid border-neutral-200/20 transition select-none"
          >
            <div
              class="absolute inset-0 z-0 h-full w-full bg-neutral-700/50 transition"
            ></div>
          </div>
          <div class="flex w-[80%] flex-col items-center gap-1">
            <span
              class="w-full overflow-hidden rounded-md bg-neutral-700/40 text-base overflow-ellipsis whitespace-nowrap text-white/0"
            >
              -
            </span>
            <span
              class="w-[60%] rounded-md bg-neutral-700/30 text-xs text-white capitalize"
              >-</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LucideChevronDown } from "lucide-vue-next";
</script>
