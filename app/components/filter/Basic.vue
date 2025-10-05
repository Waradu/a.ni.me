<template>
  <div class="flex w-full gap-3 p-3">
    <UiDropdown
      v-model="filterStore.status"
      placeholder="Status"
      :options="options"
    />
    <UiToggleIcon
      v-slot="props"
      v-model="filterStore.desc"
      v-tippy
      :title="filterStore.desc ? 'Ascending' : 'Descending'"
      class="border border-neutral-700"
    >
      <LucideArrowDown :class="props.true" />
      <LucideArrowUp :class="props.false" />
    </UiToggleIcon>
  </div>
</template>

<script setup lang="ts">
import { LucideArrowDown, LucideArrowUp } from "lucide-vue-next";
import { MediaListStatus } from "~/gql/gen/types.generated";

const filterStore = useFiltersStore();

const options = Object.values(MediaListStatus).map((status) => ({
  value: status,
  label: status.slice(0, 1).toUpperCase() + status.slice(1).toLowerCase(),
}));
</script>
