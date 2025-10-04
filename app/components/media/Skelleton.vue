<template>
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
</template>
