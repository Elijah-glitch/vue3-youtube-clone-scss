<template>
  <button :style="paddingValue" class="button">
    <div v-if="rippleEffect" class="ripple"></div>
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TransparentButton",
  props: {
    padding: {
      type: String,
      default: "0",
    },
    rippleEffect: {
      type: Boolean,
      default: false,
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
  cursor: pointer;
  position: relative;

  & .ripple {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    z-index: -1;
  }

  &:not(:active) .ripple {
    animation: borderEffect 0.3s;
  }

  &:active .ripple {
    background: rgba($color: gray, $alpha: 0.3);
  }

  @keyframes borderEffect {
    0% {
      border: 2px solid rgba($color: gray, $alpha: 0.3);
      background: rgba($color: gray, $alpha: 0.3);
    }
    15% {
      background: rgba($color: gray, $alpha: 0);
    }
    100% {
      border: 2px solid rgba($color: gray, $alpha: 0);
    }
  }
}
</style>
