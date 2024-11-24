<template>
  <div class="input disableOnModal" data-tauri-drag-region>
    <input type="text" placeholder="Search" ref="input" :value="mounted ? titlebarStore.search : ''" @input="search"
      v-if="mounted">
  </div>
</template>

<script lang="ts" setup>
const mounted = ref(false);
const titlebarStore = useTitlebarStore();
const router = useRouter();
const route = useRoute();

const search = (event: Event) => {
  titlebarStore.setSearch((event.target as HTMLInputElement).value);
  if (route.path != '/') {
    router.replace({ path: '/' });
  }
};

onMounted(async () => {
  mounted.value = true;
});
</script>

<style lang="scss">
.input {
  width: 100%;
  display: flex;
  justify-content: center;

  input {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    padding: 6px;
    padding-inline: 12px;
    width: 100%;
    max-width: 500px;
    outline: none;
    border: 1px solid #ffffff10;
    border-radius: 4px;
    background-color: transparent;
    color: #ffffffaa;
  }
}
</style>