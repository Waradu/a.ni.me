<template>
  <div class="data disableOnModal" data-tauri-drag-region>
    <div class="icons" data-tauri-drag-region>
      <NuxtLink class="wrapper" @click.prevent="router.back()">
        <ArrowBackIcon class="icon" />
      </NuxtLink>
      <NuxtLink :key="route.fullPath" class="wrapper" to="/" @click.prevent="navigateHome">
        <HomeIcon class="icon" />
      </NuxtLink>
    </div>
    <h3 :title="mounted ? titlebarStore.getTitle() : ''" data-tauri-drag-region v-if="mounted">
      {{ titlebarStore.getTitle() }}
    </h3>
  </div>
</template>

<script lang="ts" setup>
import ArrowBackIcon from "@fluentui/svg-icons/icons/arrow_left_32_regular.svg";
import HomeIcon from "@fluentui/svg-icons/icons/home_32_regular.svg";

const titlebarStore = useTitlebarStore();
const router = useRouter();
const route = useRoute();

const mounted = ref(false);

const navigateHome = async () => {
  titlebarStore.setSearch('');

  if (route.path === '/') {
    await router.replace({ path: '/redirect' });
    await router.replace({ path: '/' });
  } else {
    await router.push('/');
  }
};

onMounted(async () => {
  mounted.value = true;
});

const keyboard = useKeyboard();

keyboard.up("h", (e) => {
  if (e.ctrlKey) {
    navigateHome();
  }
});
</script>

<style lang="scss">
.data {
  display: flex;
  gap: 10px;
  align-items: center;
  white-space: nowrap;
  width: 100%;
  min-width: 0;

  h3 {
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>