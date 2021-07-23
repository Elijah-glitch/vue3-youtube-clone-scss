<template>
  <a class="link">
    <slot />
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DropdownButtonMain",
});
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;

  & .dropdown-link-main-icon {
    margin: 0 16px;
  }

  & .dropdown-link-main-text {
    color: #ffffff;
    font-size: 14px;
  }
}
</style>
