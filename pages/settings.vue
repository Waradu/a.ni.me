<template>
  <div class="p-4">
    <div @click="auth" class="cursor-pointer">Login</div>
  </div>
</template>

<script lang="ts" setup>
import { openUrl } from "@tauri-apps/plugin-opener";

const client_id = 26677;
const redirect_uri = "a.ni.me://callback";

const auth = () => {
  openUrl(
    `https://anilist.co/api/v2/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`
  );
};

definePageMeta({
  pageTransition: {
    name: "slide-right",
    mode: "out-in",
  },
});
</script>
