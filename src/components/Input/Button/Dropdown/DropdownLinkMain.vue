<template>
  <div class="dropdown-link-container">
    <a
      @focus="onUserFocusLink"
      @blur="onUserBlurLink"
      href="#"
      :class="{ 'dropdown-link-focus': isUserFocusLink }"
      class="dropdown-link"
    >
      <slot />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "DropdownButtonMain",
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
  justify-content: flex-start;
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

  & .dropdown-link-main-icon {
    margin: 0 16px;
  }

  & .dropdown-link-main-text {
    color: var(--text-color);
    font-size: 16px;
    font-family: var(--font-roboto);
  }
}
</style>
