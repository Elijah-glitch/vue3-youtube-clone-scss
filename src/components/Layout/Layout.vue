<template>
  <div class="layout">
    <div class="navbar">
      <div class="navbar-left">
        <transparent-button>
          <icon-base :iconName="Bar"><bar-icon /></icon-base>
        </transparent-button>
        <main-logo />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconBase from "@/components/Icon/BaseIcon.vue";
import BarIcon from "@/components/Icon/Icons/Bar.vue";
import TransparentButton from "@/components/Input/Button/TransparentButton.vue";
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
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .navbar-left {
      margin-left: 20px;
    }
  }
}
</style>
