<template>
  <div
    class="popup-detail-item-container"
    :vDirection="vDirection"
    :hDirection="hDirection"
    :style="hDirection === 'middle' ? `left: ${left}` : ''"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "DetailPopupItem",
  props: {
    vDirection: {
      type: String as PropType<"top" | "bottom">,
      default: "bottom",
    },
    hDirection: {
      type: String as PropType<"left" | "middle" | "right">,
      default: "middle",
    },
    // I was add left prop because when I try center of the element not centered properly. Like this working properly also we gain non spagetti code and cpu power.
    left: {
      type: String,
      default: "0",
    },
  },
});
</script>

<style lang="scss">
.popup-detail-item-container {
  position: absolute;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 8px;
  opacity: 0.9;
  background: var(--popup-detail-bg);
  color: var(--popup-detail-color);
  font-size: 14px;
  white-space: nowrap;
  border-radius: 2px;
  width: min-content;

  --margin-vertical-detail-popup: 50px;

  &[vDirection="top"] {
    bottom: var(--margin-vertical-detail-popup);
  }

  &[vDirection="bottom"] {
    top: var(--margin-vertical-detail-popup);
  }

  &[hDirection="left"] {
    right: 0;
  }

  &[hDirection="right"] {
    left: 0;
  }

  &[hDirection="middle"] {
    right: 0;
  }
}
</style>
