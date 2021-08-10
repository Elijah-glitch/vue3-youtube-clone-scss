<template>
  <div class="popup-detail-video-container"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "DetailVideoPopupContainer",
});
</script>

<style lang="scss">
.popup-detail-video-container {
  display: inline-block;
  position: relative;

  &:hover {
    & .popup-detail-video-item-container {
      display: flex !important;
    }
  }
}
</style>
