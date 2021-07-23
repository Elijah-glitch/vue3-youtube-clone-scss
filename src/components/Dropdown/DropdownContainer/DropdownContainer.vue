<template>
  <div class="dropdown-container"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "DropdownContainer",
});
</script>

<style lang="scss" scoped>
.dropdown-container {
  position: relative;
}
</style>
