<template>
  <layout
    :hideLayoutScrollBar="isFullscreen"
    :showNavbar="!isFullscreen"
    :sidebarBlock="false"
  >
    <div class="container">
      <video-comp />
    </div>
  </layout>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

import Layout from "@/components/Layout/Layout.vue";
import AvatarMain from "@/components/Avatar/AvatarMain/AvatarMain.vue";
import TransparentButton from "@/components/Input/Button/TransparentButton/TransparentButton.vue";
import DropdownContainer from "@/components/Dropdown/DropdownContainer/DropdownContainer.vue";
import DropdownItem from "@/components/Dropdown/DropdownItem/DropdownItem.vue";
import DropdownLinkMain from "@/components/Input/Button/Dropdown/DropdownLinkMain.vue";
import DetailPopupContainer from "@/components/Popup/DetailPopupContainer.vue";
import DetailPopupItem from "@/components/Popup/DetailPopupItem.vue";
import VideoComp from "@/components/Video/Video.vue";
import { isRightBlankHaveEnoughSpace } from "@/utils/spaceCheck";
import { generateNumber } from "@/utils/numberGenerators";
// ICONS
import BaseIcon from "@/components/Icon/BaseIcon.vue";
import IconThreeDotV from "@/components/Icon/Icons/ThreeDotV.vue";

export default defineComponent({
  name: "Home",
  methods: {
    generateNumber,
  },
  components: {
    Layout,
    AvatarMain,
    TransparentButton,
    DropdownContainer,
    DropdownItem,
    DropdownLinkMain,
    DetailPopupContainer,
    DetailPopupItem,
    VideoComp,
    // ICONS
    BaseIcon,
    IconThreeDotV,
  },
  setup() {
    const store = useStore();

    return {
      isFullscreen: computed(() => store.state["video"].isFullscreen),
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
