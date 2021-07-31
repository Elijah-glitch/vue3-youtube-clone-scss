<template>
  <ul class="card-video-container">
    <slot />
    <li class="card-video-item-container"></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "CardVideoContainer",
});
</script>

<style lang="scss">
.card-video-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
