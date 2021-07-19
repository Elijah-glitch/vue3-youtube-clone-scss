<template>
  <button :style="paddingValue" class="button">
    <slot />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "TransparentButton",
  props: {
    padding: {
      type: String,
      default: "0",
    },
  },
  computed: {
    paddingValue(): String {
      return `padding:${this.padding};`;
    },
  },
});
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
}
</style>
