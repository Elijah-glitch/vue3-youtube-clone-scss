<template>
  <div class="card-options-container"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "CardOptionsContainer",
});
</script>

<style lang="scss" scoped>
.card-options-container {
  position: relative;
  display: inline-block;
}
</style>
