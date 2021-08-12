<template>
  <div class="card-options-button-container">
    <button href="#" class="card-options-button">
      <div class="card-options-button-left">
        <slot name="left" />
      </div>
      <div class="card-options-button-right">
        <slot name="right" />
        <base-icon v-show="showArrow" class="card-options-button-right-icon">
          <icon-right-arrow
        /></base-icon>
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import BaseIcon from "@/components/Icon/BaseIcon.vue";
import IconRightArrow from "@/components/Icon/Icons/RightArrow.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { BaseIcon, IconRightArrow },
  name: "CardOptionsButton",
  props: {
    showArrow: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<style lang="scss">
.card-options-button-container {
  width: 251px;

  &[border-top] {
    border-top: 1px solid var(--border-color);
  }

  &[border-bottom] {
    border-bottom: 1px solid var(--border-color);
  }

  &[margin-top] {
    & .card-options-button {
      margin-top: 8px;
    }
  }

  &[margin-bottom] {
    & .card-options-button {
      margin-bottom: 8px;
    }
  }
}

.card-options-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  text-decoration: none;
  background: initial;
  &:hover {
    background: var(--card-options-button-hover-bg);
  }

  & .card-options-button-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: var(--card-options-text-color);
    font-size: 13px;
    font-weight: 500;
    margin-left: 7px;
  }

  & .card-options-button-right {
    display: flex;
    align-items: center;
    color: var(--card-options-text-color);
    font-size: 12px;
    margin-right: 7px;
    & .card-options-button-right-icon {
      fill: var(--white-always);
    }
  }
}
</style>
