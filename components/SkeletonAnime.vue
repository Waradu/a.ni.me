<template>
  <div class="skeleton-card">
    <NuxtLink class="image" @click.prevent="">
      <OpenIcon class="open" />
      <div class="cover">
      </div>
    </NuxtLink>
    <div class="text">
      <span class="title"></span>
      <p class="info"></p>
    </div>
  </div>
</template>

<style lang="scss">
.skeleton-card {
  max-width: 260px;
  width: 1fr;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;

  .image {
    width: 100%;
    border-radius: 8px;
    aspect-ratio: 2 / 3;
    transition: .2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    color: white;
    user-select: none;

    .cover {
      background-color: #ffffff10;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 0;
      transition: .2s ease-in-out;
      animation: flicker 1s infinite;
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 4px;
    align-items: center;

    span {
      height: 24px;
      width: 80%;
      background-color: #ffffff10;
      border-radius: 4px;
    }

    p {
      height: 18px;
      width: 40%;
      background-color: #ffffff05;
      border-radius: 4px;
    }
  }
}

@keyframes flicker {
  0% {
    background-color: #ffffff10;
  }

  50% {
    background-color: #ffffff12;
  }

  100% {
    background-color: #ffffff10;
  }
}
</style>