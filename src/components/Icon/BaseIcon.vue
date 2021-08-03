<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    role="presentation"
  >
    <g>
      <slot />
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "IconBase",
  props: {
    width: {
      type: [Number, String],
      default: "24px",
    },
    height: {
      type: [Number, String],
      default: "24px",
    },
    viewBox: {
      type: String,
      default: "0 0 24 24",
    },
  },
});
</script>
