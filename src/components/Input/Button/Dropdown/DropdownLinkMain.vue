<template>
  <div class="dropdown-link-container">
    <a
      @focus="onUserFocusLink"
      @blur="onUserBlurLink"
      href="#"
      :class="{ 'dropdown-link-focus': isUserFocusLink }"
      class="dropdown-link"
    >
      <div class="dropdown-link-left">
        <slot />
      </div>
      <div v-show="showArrow" class="dropdown-link-right">
        <base-icon class="dropdown-link-right-icon">
          <icon-right-arrow
        /></base-icon>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
import BaseIcon from "@/components/Icon/BaseIcon.vue";
import IconRightArrow from "@/components/Icon/Icons/RightArrow.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: { BaseIcon, IconRightArrow },
  name: "DropdownButtonMain",
  props: {
    showArrow: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const isUserFocusLink = ref<boolean>(false);
    const onUserFocusLink = () => {
      isUserFocusLink.value = true;
    };
    const onUserBlurLink = () => {
      isUserFocusLink.value = false;
    };
    return {
      isUserFocusLink,
      onUserFocusLink,
      onUserBlurLink,
    };
  },
});
</script>

<style lang="scss">
.dropdown-link-container {
  width: 100%;

  &[border-top] {
    border-top: 1px solid var(--border-color);
  }

  &[border-bottom] {
    border-bottom: 1px solid var(--border-color);
  }

  &[margin-top] {
    & .dropdown-link {
      margin-top: 8px;
    }
  }

  &[margin-bottom] {
    & .dropdown-link {
      margin-bottom: 8px;
    }
  }
}

.dropdown-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  text-decoration: none;
  background: initial;
  &:hover {
    background: var(--dropdown-link-main-bg-hover);
  }

  &.dropdown-link-focus:hover {
    background: var(--dropdown-link-main-bg-focus-hover);
  }

  &:focus {
    background: var(--dropdown-link-main-bg-focus);
  }

  &:active {
    background: var(--dropdown-link-main-bg-active);
  }

  & .dropdown-link-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    & .dropdown-link-main-icon {
      margin: 0 16px;
    }

    & .dropdown-link-main-text {
      color: var(--text-color);
      font-size: 15px;
      font-family: var(--font-roboto);
    }
    & .dropdown-link-main-just-text {
      color: var(--text-color);
      font-size: 15px;
      margin: 0 0 0 16px;
      font-family: var(--font-roboto);
    }
  }

  & .dropdown-link-right-icon {
    fill: var(--icon-color);
    margin-right: 16px;
  }
}
</style>
