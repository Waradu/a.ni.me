<template>
  <div v-if="authStore.user" class="flex w-full items-center gap-4">
    <NuxtImg
      :src="authStore.user.avatar?.large ?? undefined"
      alt="pb"
      class="size-20 rounded-full"
    />
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <div class="text-xl">{{ authStore.user.name }}</div>
        <div
          v-if="authStore.user.options?.displayAdultContent"
          v-tippy
          class="flex items-center rounded-full bg-red-400/50 p-0.5 px-2 text-[10px] select-none"
          title="Change this on the Anilist website"
        >
          NSFW
        </div>
      </div>
      <UiButton v-slot="props" text="Logout" @click="authStore.logout">
        <LucideLogOut :class="props.class" />
      </UiButton>
    </div>
    <UiIcon
      v-if="authStore.user.siteUrl"
      v-tippy
      class="ml-auto cursor-pointer"
      title="Open profile on Anilist"
      @click="openUrl(authStore.user.siteUrl)"
    >
      <Anilist class="size-5" />
    </UiIcon>
  </div>
  <div v-else class="flex flex-col items-center gap-2">
    <div class="flex items-center justify-center gap-4">
      <UiIcon
        v-tippy
        class="cursor-pointer"
        title="Go to Anilist"
        @click="openUrl('https://anilist.co')"
      >
        <Anilist class="size-5" />
      </UiIcon>
      <UiButton
        v-slot="props"
        text="Login"
        class="cursor-pointer"
        :loading="loading"
        @click="login"
      >
        <LucideLogIn :class="props.class" />
      </UiButton>
    </div>
    <div
      v-if="loading"
      class="flex cursor-pointer items-center gap-2 text-sm text-neutral-400 select-none"
      @click="copy"
    >
      <span>Copy link if it does not open in the browser</span>
      <LucideCopy v-if="!copied" class="size-4" />
      <LucideCheck v-else class="size-4" />
    </div>
    <div v-if="loading" class="flex flex-col gap-2">
      <input v-model="token" placeholder="Enter token manually" />
      <UiButton text="Login" @click="manualLogin"></UiButton>
    </div>
    <UiError v-if="authStore.errorMessage">
      {{ authStore.errorMessage }}
    </UiError>
  </div>
</template>

<script lang="ts" setup>
import Anilist from "~/assets/svg/anilist.svg";
import { openUrl } from "@tauri-apps/plugin-opener";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import {
  LucideCheck,
  LucideCopy,
  LucideLogIn,
  LucideLogOut,
} from "lucide-vue-next";

const authStore = useAuthStore();
const loading = ref(false);
const copied = ref(false);

const token = ref("");

const manualLogin = () => {
  authStore.token = token.value;
  authStore.refreshUser();
};

const copy = async () => {
  if (copied.value) return;
  copied.value = true;
  await writeText(authStore.redirectUri);
  setTimeout(() => (copied.value = false), 500);
};

const login = () => {
  loading.value = true;
  authStore.openInBrowser();
};

const compProps = defineProps<{
  onLogin?: () => void;
}>();

watch(
  () => authStore.user,
  () => {
    if (authStore.user) {
      loading.value = false;
      if (compProps.onLogin) compProps.onLogin();
    }
  },
);

watch(
  () => authStore.errorMessage,
  () => {
    if (authStore.errorMessage) loading.value = false;
  },
);
</script>
