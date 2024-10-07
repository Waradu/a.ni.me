<template>
  <div class="info" id="text" ref="infoIconRef">
    <InfoIcon />
  </div>
</template>

<script lang="ts" setup>
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import InfoIcon from "@fluentui/svg-icons/icons/info_32_filled.svg";

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const infoIconRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (infoIconRef.value) {
    tippy(infoIconRef.value, {
      content: props.text,
    })
  }
})
</script>

<style lang="scss"></style>