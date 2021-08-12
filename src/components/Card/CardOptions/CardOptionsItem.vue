<template>
  <div
    class="card-options-item"
    v-show="visible"
    ref="dropdownItem"
    :style="{ left: left, right: right }"
  >
    <div
      :style="{ transform: `translateX(${contentLeft})` }"
      class="card-options-item-main"
    >
      <slot />
    </div>
    <div
      :style="{ transform: `translateX(${contentLeft})` }"
      class="card-options-item-menus"
    >
      <slot name="menu" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/runtime-core";

export default defineComponent({
  name: "CardOptionsItem",
  props: {
    left: {
      type: String,
      default: "unset",
    },
    right: {
      type: String,
      default: "unset",
    },
    visible: {
      type: Boolean,
    },
    onclose: {
      type: Function,
      default: () => true,
    },
    contentLeft: {
      type: String,
      default: "0px",
    },
  },
  setup(props) {
    //Close dropdown when click out of dropdown element BEGIN
    const hasClickListener = ref<boolean>(false);
    const dropdownItem = ref<HTMLElement>();

    const clickHandler = (e: MouseEvent) => {
      if (props.visible) {
        if (!e.composedPath().includes(dropdownItem.value as HTMLElement))
          return props.onclose();
      }
    };

    watch(
      props,
      (newValue) => {
        if (newValue.visible && !hasClickListener.value) {
          hasClickListener.value = true;
          setTimeout(() => {
            return document.addEventListener("click", clickHandler);
          }, 0);
        } else if (!newValue.visible) {
          hasClickListener.value = false;
          return document.removeEventListener("click", clickHandler);
        }
      },
      { immediate: true }
    );
    //Close dropdown when click out of dropdown element END

    return {
      hasClickListener,
      dropdownItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-options-item {
  display: flex;
  overflow-x: hidden;
  position: absolute;
  bottom: 130%;
  background-color: var(--card-options-bg);
  z-index: 3;
  max-width: 251px;

  & .card-options-item-main,
  & .card-options-item-menus {
    transition: all 0.3s;
  }
}
</style>
