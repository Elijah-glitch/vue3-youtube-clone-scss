<template>
  <div class="popup-detail-container"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "DetailPopupContainer",
});
</script>

<style lang="scss">
.popup-detail-container {
  display: inline-block;
  position: relative;

  &:hover {
    & .popup-detail-item-container {
      display: flex !important;
    }
  }
}
</style>
