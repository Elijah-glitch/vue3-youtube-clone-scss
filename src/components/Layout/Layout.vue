<template>
  <div class="layout">
    <div class="navbar">
      <div class="navbar-left">
        <transparent-button :padding="`8px`">
          <icon-base :iconName="Bar"><bar-icon /></icon-base>
        </transparent-button>
        <transparent-button :padding="`16px 14px 16px 16px`">
          <main-logo />
        </transparent-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconBase from "@/components/Icon/BaseIcon.vue";
import BarIcon from "@/components/Icon/Icons/Bar.vue";
import TransparentButton from "@/components/Input/Button/TransparentButton/TransparentButton.vue";
import MainLogo from "@/components/Logo/LogoMain.vue";

export default defineComponent({
  name: "Layout",
  components: { IconBase, BarIcon, TransparentButton, MainLogo },
});
</script>

<style lang="scss" scoped>
.layout {
  .navbar {
    height: 56px;
    width: 99vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .navbar-left {
      display: flex;
      align-items: center;
      margin-left: 20px;
    }
  }
}
</style>
