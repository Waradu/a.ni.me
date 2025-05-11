<template>
  <div class="flex justify-center p-8">
    <div class="max-w-96 min-w-96 flex flex-col gap-8">
      <div class="flex gap-4 items-center" v-if="auth?.user">
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
        <UiError v-if="errorMessage">
          {{ errorMessage }}
        </UiError>
      </div>
      <div v-if="settings" class="flex flex-col gap-4 select-none">
        <SettingsLabel
          text="Check updates automatically"
          id="checkForUpdatesAutomatically"
          v-model="settings.checkForUpdatesAutomatically"
        />
        <SettingsLabel
          text="Reduce Animations"
          id="reducedAnimations"
          v-model="settings.reducedAnimations"
        />
        <SettingsLabel
          text="Join Beta"
          id="betaChannel"
          v-model="settings.betaChannel"
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

const { settings } = useSettings();
const { auth, browser, logout, errorMessage } = useAuth();
const loading = ref(false);

const login = () => {
  loading.value = true;
  browser();
};

watch(
  () => auth.value?.user,
  () => {
    if (auth.value?.user) loading.value = false;
  }
);

watch(errorMessage, () => {
  if (errorMessage.value) loading.value = false;
});

definePageMeta({
  pageTransition: {
    name: "slide-right",
    mode: "out-in",
  },
});
</script>
