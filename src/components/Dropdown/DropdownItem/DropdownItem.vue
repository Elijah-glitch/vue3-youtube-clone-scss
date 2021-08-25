<template>
  <div
    class="dropdown-item"
    :visible="visible"
    ref="dropdownItem"
    :direction="direction"
    :directionV="directionV"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from "@vue/runtime-core";

export default defineComponent({
  name: "DropdownItem",
  props: {
    direction: {
      required: true,
      type: String as PropType<"left" | "right">,
      default: "right",
    },
    directionV: {
      type: String as PropType<"top" | "bottom">,
      default: "bottom",
    },
    visible: {
      type: Boolean,
    },
    onclose: {
      type: Function,
      default: () => true,
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
.dropdown-item-base {
  position: absolute;
  background-color: var(--dropdown-bg);
  z-index: 5;
}
.dropdown-item[direction="left"] {
  @extend .dropdown-item-base;
  right: 0;
}

.dropdown-item[direction="right"] {
  @extend .dropdown-item-base;
  left: 0;
}

.dropdown-item[directionV="top"] {
  bottom: 100%;
}

.dropdown-item[directionV="bottom"] {
  top: 100%;
}

.dropdown-item[visible="true"] {
  visibility: visible;
}

.dropdown-item[visible="false"] {
  visibility: hidden;
}
</style>
