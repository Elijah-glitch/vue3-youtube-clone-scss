<template>
  <span :style="style" class="text-one-component">
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TextOneComponent",
  props: {
    padding: {
      type: String,
      default: "0",
    },
    margin: {
      type: String,
      default: "0",
    },
  },

  setup(props) {
    const style = ref(`padding:${props.padding}; margin:${props.margin};`);
    return { style };
  },
});
</script>

<style lang="scss">
.text-one-component {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 500;

  &[type-first] {
    color: var(--textone-type-first-color);
  }
  &[type-second] {
    color: var(--textone-type-second-color);
  }
}
</style>
