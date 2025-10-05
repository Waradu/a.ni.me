<template>
  <div class="flex w-full gap-3 p-3">
    <UiDropdown
      v-model="filterStore.status"
      v-tippy="{ content: 'Filter By Status' }"
      placeholder="Status"
      :options="statusOptions"
      show-x
    />
    <UiDropdown
      v-model="filterStore.sort"
      v-tippy="{ content: 'Sort By' }"
      placeholder="Sort"
      :options="sortOptions"
      :default="MediaListSort.AddedTime"
      show-x
    />
    <UiToggleIcon
      v-slot="props"
      v-model="filterStore.desc"
      v-tippy="{ content: filterStore.desc ? 'Ascending' : 'Descending' }"
      class="border border-neutral-700"
    >
      <LucideArrowUp :class="props.true" />
      <LucideArrowDown :class="props.false" />
    </UiToggleIcon>
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
import { MediaListSort, MediaListStatus } from "~/gql/gen/types.generated";

const filterStore = useFiltersStore();

const iconMap: Record<MediaListStatus, LucideIcon> = {
  COMPLETED: LucideCheck,
  CURRENT: LucidePlay,
  DROPPED: LucideX,
  PAUSED: LucidePause,
  PLANNING: LucideCalendar,
  REPEATING: LucideRepeat,
};

const statusOptions = Object.values(MediaListStatus).map((status) => ({
  value: status,
  label: status.toLowerCase(),
  icon: iconMap[status],
}));

const sortOptions = Object.values(MediaListSort)
  .map((sort) => ({
    value: sort,
    label: sort.replaceAll("_", " ").toLowerCase(),
  }))
  .filter((sort) => !sort.label.includes("desc"));
</script>
