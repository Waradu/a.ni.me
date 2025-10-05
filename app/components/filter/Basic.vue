<template>
  <div class="flex w-full justify-between gap-3 p-3">
    <div class="flex gap-3">
      <UiDropdown
        v-model="filterStore.status"
        v-tippy="{ content: 'Filter By Status' }"
        placeholder="Status"
        :options="statusOptions"
        show-x
      />
      <UiToggleIcon
        v-slot="props"
        v-model="filterStore.singleCompletedList"
        v-tippy="{
          content: filterStore.singleCompletedList
            ? 'Show completd lists seperate'
            : 'Combine completed lists',
        }"
        class="border border-neutral-700"
      >
        <LucideListChevronsUpDown :class="props.true" />
        <LucideListChevronsDownUp :class="props.false" />
      </UiToggleIcon>
    </div>
    <div class="flex gap-3">
      <UiDropdown
        v-model="filterStore.sort"
        v-tippy="{ content: 'Sort By' }"
        placeholder="Sort"
        :options="sortOptions"
        :default="MediaListSort.AddedTime"
        right-aligned
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
  </div>
</template>

<script setup lang="ts">
import {
  LucideArrowDown,
  LucideArrowUp,
  LucideCalendar,
  LucideCalendarCheck,
  LucideCalendarClock,
  LucideCalendarPlus,
  LucideCalendarSync,
  LucideCaseUpper,
  LucideCheck,
  LucideHash,
  LucideListChevronsDownUp,
  LucideListChevronsUpDown,
  LucideListOrdered,
  LucideLoader,
  LucidePause,
  LucidePlay,
  LucideRepeat,
  LucideSparkles,
  LucideTrendingUp,
  LucideX,
  type LucideIcon,
} from "lucide-vue-next";
import { MediaListSort, MediaListStatus } from "~/gql/gen/types.generated";

const filterStore = useFiltersStore();

const statusIconMap: Record<MediaListStatus, LucideIcon> = {
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
  icon: statusIconMap[status],
}));

const sortIconMap: Partial<Record<MediaListSort, LucideIcon>> = {
  ADDED_TIME: LucideCalendarPlus,
  FINISHED_ON: LucideCalendarCheck,
  MEDIA_ID: LucideHash,
  MEDIA_POPULARITY: LucideTrendingUp,
  MEDIA_TITLE_ENGLISH: LucideCaseUpper,
  MEDIA_TITLE_NATIVE: LucideCaseUpper,
  MEDIA_TITLE_ROMAJI: LucideCaseUpper,
  PRIORITY: LucideSparkles,
  PROGRESS: LucideLoader,
  PROGRESS_VOLUMES: LucideLoader,
  REPEAT: LucideRepeat,
  SCORE: LucideListOrdered,
  STARTED_ON: LucideCalendarClock,
  STATUS: LucideCalendarPlus,
  UPDATED_TIME: LucideCalendarSync,
};

const sortOptions = Object.values(MediaListSort)
  .filter((sort) => !sort.toLowerCase().includes("desc"))
  .map((sort) => ({
    value: sort,
    label: sort.replaceAll("_", " ").toLowerCase(),
    icon: sortIconMap[sort],
  }));
</script>
