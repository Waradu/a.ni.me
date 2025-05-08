<template>
  <div class="flex justify-center p-8">
    <div class="max-w-96 min-w-96 flex flex-col gap-4">
      <div class="flex gap-4 items-center">
        <img
          src="https://s4.anilist.co/file/anilistcdn/user/avatar/large/b7311169-YLe8MdNYaak8.jpg"
          alt="pb"
          class="size-20 rounded-full"
        />
        <div class="flex flex-col gap-1">
          <div class="flex gap-1 items-center">
            <div class="text-xl">Waradu</div>
          </div>
          <UiButton v-slot="props" text="Logout">
            <IconLogOut :class="props.class" />
          </UiButton>
        </div>
        <UiIcon class="cursor-pointer ml-auto" @click="openUrl('https://anilist.co/user/Waradu')" title="Open profile on Anilist" v-tippy>
          <Anilist class="size-5" />
        </UiIcon>
      </div>
      <div @click="auth" class="cursor-pointer w-min">Login</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Anilist from "~/assets/svg/anilist.svg";
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
