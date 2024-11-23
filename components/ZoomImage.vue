<template>
  <div class="zoom-image-wrapper" @mousedown="startZoom">
    <img
      :src="src"
      alt="image"
      preload
      placeholder="true"
      loading="lazy"
      ref="image"
      :style="imageStyle"
      class="zoom-image"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});

const image = ref<HTMLImageElement | null>(null);
const isZooming = ref(false);
const zoomLevel = ref(1.5);
const offset = ref({ x: 0, y: 0 });

const startZoom = (event: MouseEvent) => {
  if (event.button != 0) return;

  event.preventDefault();
  zoomLevel.value = 1.5;
  isZooming.value = true;
  calculateOffset(event);
};

const stopZoom = () => {
  isZooming.value = false;
  setTimeout(() => {
    if (!isZooming.value) {
      offset.value = { x: 0, y: 0 };
    }
  }, 200);
};

const handleMouseMove = (event: MouseEvent) => {
  if (isZooming.value) {
    calculateOffset(event);
  }
};

const zoom = (event: WheelEvent) => {
  if (isZooming.value) {
    event.preventDefault();

    if (event.deltaY < 0) {
      zoomLevel.value += 0.4 * (Math.abs(event.deltaY) / 100);
    } else {
      zoomLevel.value -= 0.4 * (Math.abs(event.deltaY) / 100);
    }

    if (zoomLevel.value < 1.2) {
      zoomLevel.value = 1.2;
    }

    if (zoomLevel.value > 4) {
      zoomLevel.value = 4;
    }
  }
};

const calculateOffset = (event: MouseEvent) => {
  if (!image.value) return;
  const rect = image.value.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  offset.value = { x, y };
};

const imageStyle = computed(() => {
  if (isZooming.value) {
    return {
      transform: `scale(${zoomLevel.value})`,
      transformOrigin: `${offset.value.x}% ${offset.value.y}%`,
      transition: "transform 0.2s ease",
    };
  } else {
    return {
      transform: "scale(1)",
      transformOrigin: `${offset.value.x}% ${offset.value.y}%`,
      transition: "transform 0.2s ease",
    };
  }
});

onMounted(() => {
  document.addEventListener("mouseup", stopZoom);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("wheel", zoom, { passive: false });
});
</script>

<style scoped>
.zoom-image-wrapper {
  width: 100%;
  position: relative;
  overflow: hidden;
  height: max-content;
  display: flex;
  z-index: -1;
}

.zoom-image {
  width: 100%;
  user-select: none;
  transition: transform 0.2s ease;

  max-width: 400px;
  border-radius: 4px;
}
</style>