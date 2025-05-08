<template>
  <div class="flex justify-center p-8">
    <div class="max-w-96 min-w-96 flex flex-col gap-8">
      <div class="flex gap-4 items-center">
        <img
          src="https://s4.anilist.co/file/anilistcdn/user/avatar/large/b7311169-YLe8MdNYaak8.jpg"
          alt="pb"
          class="size-20 rounded-full"
        />
        <div class="flex flex-col gap-2">
          <div class="flex gap-1 items-center">
            <div class="text-xl">Waradu</div>
          </div>
          <UiButton v-slot="props" text="Logout">
            <IconLogOut :class="props.class" />
          </UiButton>
        </div>
        <UiIcon
          class="cursor-pointer ml-auto"
          @click="openUrl('https://anilist.co/user/Waradu')"
          title="Open profile on Anilist"
          v-tippy
        >
          <Anilist class="size-5" />
        </UiIcon>
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
        />
      </div>
      <div @click="browser" class="cursor-pointer">Login</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Anilist from "~/assets/svg/anilist.svg";
import { openUrl } from "@tauri-apps/plugin-opener";

const { settings } = useSettings();
const { auth, browser } = useAuth();

definePageMeta({
  pageTransition: {
    name: "slide-right",
    mode: "out-in",
  },
});
</script>
