<template>
  <div class="layout">
    <div class="navbar">
      <div class="navbar-left">
        <transparent-button :rippleEffect="true" :padding="`8px`">
          <icon-base :iconName="Bar"><bar-icon /></icon-base>
        </transparent-button>
        <transparent-button :padding="`16px 14px 16px 16px`">
          <main-logo />
        </transparent-button>
      </div>
      <div class="navbar-middle">
        <input placeholder="Search" class="search-bar" />
      </div>
      <div class="navbar-right"></div>
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
    background: var(--layout-bg-color);

    & .navbar-left {
      display: flex;
      align-items: center;
      margin-left: 20px;
    }

    & .navbar-middle {
      max-width: 640px;
      min-width: 136px;

      flex: 0.8;

      & .search-bar {
        height: 26px;
        width: 100%;
        padding: 2px 6px;
        max-width: 575px;
        border: 1px solid var(--searchbox-border-color);
        outline: none;
        background: var(--searchbox-bg-color);
        font-size: 16px;
        caret-color: var(--searchbox-caret-color);

        &:focus {
          border: 1px solid var(--searchbox-focus-border-color);
        }

        &::placeholder {
          color: var(--searchbox-placeholder-color);
        }
      }
    }
  }
}
</style>
