<template>
  <button @click="onClick()" class="button">
    <span><slot /></span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PrimaryButton",
  props: {
    onClick: {
      type: Function,
      default: () => true,
    },
  },
});
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--yt-red);
  padding: 10px 16px;

  & span {
    display: inline-block;
    font-weight: 500;
  }

  &[blue] {
    background: var(--blue-bg);
    & span {
      color: var(--blue-text-color);
    }

    &[disable="true"] {
      background: var(--blue-disable-bg);
      & span {
        color: var(--blue-disable-text-color);
      }
    }
  }
}
</style>
