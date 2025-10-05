<template>
  <div class="flex w-full gap-3 p-3">
    <UiToggleIcon
      v-slot="props"
      v-model="filterStore.desc"
      v-tippy
      :title="filterStore.desc ? 'Ascending' : 'Descending'"
      class="border border-neutral-700"
    >
      <LucideArrowUp :class="props.true" />
      <LucideArrowDown :class="props.false" />
    </UiToggleIcon>
    <UiDropdown
      v-model="filterStore.status"
      placeholder="Status"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
import {
  LucideArrowDown,
  LucideArrowUp,
  LucideCalendar,
  LucideCheck,
  LucidePause,
  LucidePlay,
  LucideRepeat,
  LucideX,
  type LucideIcon,
} from "lucide-vue-next";
import { MediaListStatus } from "~/gql/gen/types.generated";

const filterStore = useFiltersStore();

const iconMap: Record<MediaListStatus, LucideIcon> = {
  COMPLETED: LucideCheck,
  CURRENT: LucidePlay,
  DROPPED: LucideX,
  PAUSED: LucidePause,
  PLANNING: LucideCalendar,
  REPEATING: LucideRepeat
};

const options = Object.values(MediaListStatus).map((status) => ({
  value: status,
  label: status.slice(0, 1).toUpperCase() + status.slice(1).toLowerCase(),
  icon: iconMap[status],
}));
</script>
