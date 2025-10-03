<template>
  <div class="flex justify-center p-8">
    <div class="flex max-w-96 min-w-96 flex-col gap-8">
      <div v-if="auth.user" class="flex items-center gap-4">
        <NuxtImg
          :src="auth.user.avatar.large"
          alt="pb"
          class="size-20 rounded-full"
        />
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <div class="text-xl">{{ auth.user.name }}</div>
            <div
              v-if="auth.user.options.displayAdultContent"
              v-tippy
              class="flex items-center rounded-full bg-red-400/50 p-0.5 px-2 text-[10px] select-none"
              title="Change this on the Anilist website"
            >
              NSFW
            </div>
          </div>
          <UiButton v-slot="props" text="Logout" @click="auth.logout">
            <LucideLogOut :class="props.class" />
          </UiButton>
        </div>
        <UiIcon
          v-tippy
          title="Open profile on Anilist"
          class="ml-auto cursor-pointer"
          @click="openUrl(auth.user.siteUrl)"
        >
          <Anilist class="size-5" />
        </UiIcon>
      </div>
      <div v-else class="flex flex-col items-center gap-2">
        <div class="flex items-center justify-center gap-4">
          <UiIcon
            v-tippy
            title="Go to Anilist"
            @click="openUrl('https://anilist.co')"
          >
            <Anilist class="size-5" />
          </UiIcon>
          <UiButton
            v-slot="props"
            text="Login"
            :loading="loading"
            class="cursor-pointer"
            @click="login"
          >
            <LucideLogIn :class="props.class" />
          </UiButton>
        </div>
        <UiError v-if="auth.errorMessage">
          {{ auth.errorMessage }}
        </UiError>
      </div>
      <div v-if="settings" class="flex flex-col gap-4 select-none">
        <SettingsLabel
          id="checkForUpdatesAutomatically"
          v-model="settings.checkForUpdatesAutomatically"
          text="Check updates automatically"
        />
        <SettingsLabel
          id="reducedAnimations"
          v-model="settings.reducedAnimations"
          text="Reduce Animations"
        />
        <SettingsLabel
          id="betaChannel"
          v-model="settings.betaChannel"
          text="Join Beta"
          tag="Soon"
          disabled
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Anilist from "~/assets/svg/anilist.svg";
import { openUrl } from "@tauri-apps/plugin-opener";
import { LucideLogIn, LucideLogOut } from "lucide-vue-next";

const { settings } = useSettings();
const auth = useAuthStore();
const loading = ref(false);

const login = () => {
  loading.value = true;
  auth.openInBrowser();
};

watch(
  () => auth.user,
  () => {
    if (auth.user) loading.value = false;
  },
);

watch(
  () => auth.errorMessage,
  () => {
    if (auth.errorMessage) loading.value = false;
  },
);

definePageMeta({
  pageTransition: {
    name: "slide-right",
    mode: "out-in",
  },
});
</script>
