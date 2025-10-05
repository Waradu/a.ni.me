<template>
  <div class="relative flex flex-col">
    <div
      class="flex h-8 cursor-pointer items-center gap-1 rounded-2xl border border-neutral-700 pr-2 text-sm transition-[background-color,border-radius] select-none hover:bg-neutral-700"
      :class="[
        model && model != props.default ? 'bg-neutral-700' : 'bg-neutral-800',
        model && model != props.default && showX ? 'pl-1' : 'pl-3',
        open ? 'z-40' : '',
      ]"
      @click="open = !open"
    >
      <div
        v-if="model && showX && model != props.default"
        class="flex size-6 items-center justify-center rounded-full transition-colors hover:bg-neutral-600"
        @click.stop="model = props.default"
      >
        <LucideX class="size-3 transition-transform" />
      </div>
      <span class="capitalize">{{ current?.label ?? placeholder }}</span>
      <LucideChevronDown
        class="ml-1 size-4 transition-transform"
        :class="open ? 'rotate-180' : ''"
      />
    </div>
    <div
      class="fixed inset-0 z-30 bg-neutral-800/50 transition-opacity"
      :class="open ? '' : 'pointer-events-none opacity-0'"
      @click="open = false"
    ></div>
    <Collapse
      :when="open"
      class="v-collapse absolute top-9 z-40 min-w-full cursor-default overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-800 text-sm select-none"
    >
      <template v-for="option in options" :key="option.value">
        <div
          v-if="model != option.value"
          class="flex h-9 w-max min-w-full items-center gap-2.5 pr-12 capitalize transition-colors hover:bg-neutral-700"
          :class="option.icon ? 'pl-2.5' : 'pl-3'"
          @click="
            model = option.value;
            open = false;
          "
        >
          <component
            :is="option.icon"
            v-if="option.icon"
            class="size-3.5 text-neutral-400"
          />
          <span>{{ option.label }}</span>
        </div>
      </template>
    </Collapse>
  </div>
</template>

<script lang="ts" setup generic="T extends string | number">
import { LucideChevronDown, LucideX, type LucideIcon } from "lucide-vue-next";
import { Collapse } from "vue-collapsed";

const model = defineModel<T | undefined>({
  default: undefined,
});

const props = defineProps<{
  options: {
    value: T;
    label: string;
    icon?: LucideIcon;
  }[];
  placeholder?: string;
  showX?: boolean;
  default?: T;
}>();

const current = computed(() => {
  return props.options.find((opt) => opt.value == model.value);
});

const open = ref(false);
</script>

<style scoped>
.v-collapse {
  --dur-easing: var(--vc-auto-duration) cubic-bezier(0.33, 1, 0.68, 1);
  transition:
    height var(--dur-easing),
    opacity var(--dur-easing);
}

.v-collapse[data-collapse="expanded"],
.v-collapse[data-collapse="expanding"] {
  opacity: 1;
}

.v-collapse[data-collapse="collapsed"],
.v-collapse[data-collapse="collapsing"] {
  opacity: 0;
}
</style>
