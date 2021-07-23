<template>
  <div
    class="dropdown-item dropdown-item-click"
    v-if="isVisible"
    :direction="direction"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "DropdownItem",
  props: {
    direction: {
      required: true,
      type: String as PropType<"left" | "right">,
      default: "right",
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    //Close dropdown when click out of dropdown element BEGIN
    const hasClickListener = ref<boolean>(false);
    const isVisible = ref<boolean>(props.visible);
    const onClickBg = function onClickBg(): void {
      isVisible.value = false;
    };
    onMounted(() => {
      if (!hasClickListener.value) {
        const clickHandler = (e: MouseEvent) => {
          if (isVisible.value) {
            if (
              !(e!.target as HTMLElement).classList.contains(
                "dropdown-item-click"
              )
            )
              return (isVisible.value = false);
          }
        };

        return document.addEventListener("click", clickHandler);
      }
      return;
    });
    //Close dropdown when click out of dropdown element END

    return {
      hasClickListener,
      isVisible,
      onClickBg,
    };
  },
});
</script>

<style lang="scss" scoped>
.dropdown-item-base {
  position: absolute;
  bottom: -15px;
  background-color: var(--dropdown-bg);
  z-index: 3;
}
.dropdown-item[direction="left"] {
  @extend .dropdown-item-base;
  right: 0;
}

.dropdown-item[direction="right"] {
  @extend .dropdown-item-base;
  left: 0;
}
</style>
