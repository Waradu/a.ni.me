<template>
  <Titlebar />
  <div class="page">
    <NuxtPage />
  </div>
</template>

<style lang="scss">
*  {
  letter-spacing: 0.1px;
}

html,
body,
#__nuxt,
.page {
  width: 100%;
  height: 100%;
  font-family: "Segoe UI", sans-serif;
  color: white;
  overflow: hidden;
}

html:not(:has(.reduced)) {
  --speed: 0.15s;
  --impact: 50px;

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all var(--speed) ease-in-out;
  }
  .slide-left-enter-from, .slide-right-leave-to {
    opacity: 0;
    filter: blur(2px);
    transform: translateX(var(--impact));
  }
  .slide-left-leave-to, .slide-right-enter-from {
    opacity: 0;
    filter: blur(2px);
    transform: translateX(calc(var(--impact) * -1));
  }

  .page-enter-active,
  .page-leave-active {
    transition: all var(--speed) ease-in-out;
  }

  .page-enter-from {
    opacity: 0;
    filter: blur(2px);
    transform: translateY(var(--impact));
  }

  .page-leave-to {
    opacity: 0;
    filter: blur(2px);
  }
}
</style>
