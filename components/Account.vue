<template>
  <div class="flex gap-4 items-center w-full" v-if="auth?.user">
    <NuxtImg
      :src="auth.user.avatar.large"
      alt="pb"
      class="size-20 rounded-full"
    />
    <div class="flex flex-col gap-2">
      <div class="flex gap-2 items-center">
        <div class="text-xl">{{ auth.user.name }}</div>
        <div
          class="text-[10px] flex items-center p-0.5 px-2 select-none rounded-full bg-red-400 bg-opacity-50"
          v-if="auth.user.options.displayAdultContent"
          title="Change this on the Anilist website"
          v-tippy
        >
          NSFW
        </div>
      </div>
      <UiButton v-slot="props" text="Logout" @click="logout">
        <IconLogOut :class="props.class" />
      </UiButton>
    </div>
    <UiIcon
      class="cursor-pointer ml-auto"
      @click="openUrl(auth.user.siteUrl)"
      title="Open profile on Anilist"
      v-tippy
    >
      <Anilist class="size-5" />
    </UiIcon>
  </div>
  <div class="flex flex-col gap-2 items-center" v-else>
    <div class="flex gap-4 items-center justify-center">
      <UiIcon
        class="cursor-pointer"
        @click="openUrl('https://anilist.co')"
        title="Go to Anilist"
        v-tippy
      >
        <Anilist class="size-5" />
      </UiIcon>
      <UiButton
        v-slot="props"
        text="Login"
        @click="login"
        class="cursor-pointer"
        :loading="loading"
      >
        <IconLogIn :class="props.class" />
      </UiButton>
    </div>
    <div
      v-if="loading"
      class="text-sm text-neutral-400 flex gap-2 items-center select-none cursor-pointer"
      @click="copy"
    >
      <span>Copy link if it does not open in the browser</span>
      <IconCopy class="size-4" v-if="!copied" />
      <IconCheck class="size-4" v-else />
    </div>
    <UiError v-if="errorMessage">
      {{ errorMessage }}
    </UiError>
  </div>
</template>

<script lang="ts" setup>
import Anilist from "~/assets/svg/anilist.svg";
import { openUrl } from "@tauri-apps/plugin-opener";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";

const { auth, browser, logout, errorMessage, redirectUri } = useAuth();
const loading = ref(false);
const copied = ref(false);

const copy = async () => {
  if (copied.value) return;
  copied.value = true;
  await writeText(redirectUri);
  setTimeout(() => (copied.value = false), 500);
};

const login = () => {
  loading.value = true;
  browser();
};

const props = defineProps<{
  onLogin?: () => void;
}>();

watch(
  () => auth.value?.user,
  () => {
    if (auth.value?.user) {
      loading.value = false;
      if (props.onLogin) props.onLogin();
    }
  }
);

watch(errorMessage, () => {
  if (errorMessage.value) loading.value = false;
});
</script>
