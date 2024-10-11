<template>
  <div class="infoTooltip" id="text" ref="infoIconRef" :title="text">
    <InfoIcon />
  </div>
</template>

<script lang="ts" setup>
import InfoIcon from "@fluentui/svg-icons/icons/info_32_filled.svg";
import tippy from "tippy.js";

defineProps({
  text: {
    type: String,
    required: true
  }
})

onMounted(() => {
  tippy(".infoTooltip")
})
</script>