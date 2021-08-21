<template>
  <button @click="onClick()" class="button"><slot /></button>
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
}
</style>
