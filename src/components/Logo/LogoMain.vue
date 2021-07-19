<template>
  <div class="logo">
    <icon-base
      :width="`90px`"
      :height="`20px`"
      :iconName="Logo"
      :viewBox="`0 0 90 20`"
      ><logo-icon
    /></icon-base>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconBase from "@/components/Icon/BaseIcon.vue";
import LogoIcon from "@/components/Icon/Icons/Logo.vue";

export default defineComponent({
  name: "MainLogo",
  components: { IconBase, LogoIcon },
});
</script>

<style lang="scss" scoped>
.logo {
  height: 20px;
  & svg {
    fill: var(--logo-text-color);
  }
}
</style>
