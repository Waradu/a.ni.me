<template>
  <div class="relative flex flex-col">
    <div
      class="flex h-8 cursor-pointer items-center gap-1 rounded-full border border-neutral-700 pr-2 text-sm transition-colors select-none hover:bg-neutral-700"
      :class="model ? 'bg-neutral-700 pl-1' : 'pl-3'"
      @click="open = !open"
    >
      <div
        v-if="model"
        class="flex size-6 items-center justify-center rounded-full transition-colors hover:bg-neutral-600"
        @click.stop="model = undefined"
      >
        <LucideX class="size-3 transition-transform" />
      </div>
      <span>{{ current?.label ?? placeholder }}</span>
      <LucideChevronDown
        class="ml-1 size-4 transition-transform"
        :class="open ? 'rotate-180' : ''"
      />
    </div>
    <div v-if="open" class="fixed inset-0 z-40" @click="open = false"></div>
    <Collapse
      :when="open"
      class="v-collapse absolute top-9 z-50 min-w-32 cursor-default rounded-md border border-neutral-700 bg-neutral-800 text-sm select-none"
    >
      <template v-for="option in options" :key="option.value">
        <div
          v-if="model != option.value"
          class="flex h-8 w-max min-w-full items-center px-2 transition-colors hover:bg-neutral-700"
          @click="
            model = option.value;
            open = false;
          "
        >
          {{ option.label }}
        </div>
      </template>
    </Collapse>
  </div>
</template>

<script lang="ts" setup generic="T extends string | number">
import { LucideChevronDown, LucideX } from "lucide-vue-next";
import { Collapse } from "vue-collapsed";

const model = defineModel<T | undefined>({
  default: undefined,
});

const props = defineProps<{
  options: {
    value: T;
    label: string;
  }[];
  placeholder: string;
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
