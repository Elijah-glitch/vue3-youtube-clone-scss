<template>
  <div class="card-options-header-button-container">
    <button @click="onBack()" href="#" class="card-options-header-button">
      <div class="card-options-header-button-left">
        <base-icon class="card-options-header-button-left-icon">
          <icon-right-arrow
        /></base-icon>
      </div>
      <div class="card-options-header-button-right">
        <slot />
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
  name: "CardOptionsHeaderButton",
  props: {
    onBack: {
      type: Function,
      default: () => true,
    },
  },
});
</script>

<style lang="scss">
.card-options-header-button-container {
  width: 251px;

  border-bottom: 1px solid var(--border-color);

  & .card-options-header-button {
    margin-top: 8px;
  }
  & .card-options-header-button {
    margin-bottom: 8px;
  }
}

.card-options-header-button {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  text-decoration: none;
  background: initial;

  & .card-options-header-button-right {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: var(--card-options-text-color);
    font-size: 13px;
    font-weight: 500;
  }

  & .card-options-header-button-left {
    display: flex;
    align-items: center;
    color: var(--card-options-text-color);
    font-size: 12px;
    & .card-options-header-button-left-icon {
      fill: var(--white-always);
      transform: rotateZ(180deg);
    }
  }
}
</style>
