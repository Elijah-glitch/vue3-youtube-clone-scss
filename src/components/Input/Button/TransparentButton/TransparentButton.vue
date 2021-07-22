<template>
  <button :style="style" class="button">
    <div v-if="rippleEffect" class="ripple"></div>
    <span class="icon">
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TransparentButton",
  data() {
    return {
      style: `padding:${this.padding}; margin:${this.margin};`,
    };
  },
  props: {
    padding: {
      type: String,
      default: "0",
    },
    margin: {
      type: String,
      default: "0",
    },
    rippleEffect: {
      type: Boolean,
      default: false,
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

  & .icon {
    z-index: 1;
  }

  & .ripple {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    z-index: 0;
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
