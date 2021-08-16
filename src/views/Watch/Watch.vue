<template>
  <layout
    :hideLayoutScrollBar="isFullscreen"
    :showNavbar="!isFullscreen"
    :sidebarBlock="false"
  >
    <div
      class="container"
      :class="{
        'container-large-view': viewMode === 'large' || isFullscreen,
      }"
    >
      <div class="grid-container">
        <div class="grid-video-container">
          <video-comp />
        </div>
        <div class="grid-video-details">s</div>
        <div class="grid-comment-container">s</div>
        <div class="grid-recommend-container">s</div>
      </div>
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
      // STORE
      isFullscreen: computed(() => store.state["video"].isFullscreen),
      viewMode: computed(() => store.state["video"].viewMode),
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mediaQueries/mediaQueries.scss";
.container {
  display: flex;
  overflow: hidden;
  margin: 0 20px;

  &.container-large-view {
    width: 100%;
    margin: 0;
    & .grid-container {
      grid-template-areas:
        "video video"
        "details recommend"
        "comment recommend";

      & .grid-video-container {
        width: 100vw;
        justify-self: center;
        padding: 0;
        margin: 0;
      }

      & .grid-comment-container,
      .grid-recommend-container,
      .grid-video-details {
        margin: 0 24px;
      }
    }
  }

  & .grid-video-container {
    grid-area: video;
    margin: 24px 24px 0 0;
  }

  & .grid-video-details {
    grid-area: details;
    margin: 24px 24px 0 0;
  }

  & .grid-recommend-container {
    grid-area: recommend;
    margin: 24px 24px 0 0;
  }

  & .grid-comment-container {
    grid-area: comment;
    margin: 24px 24px 0 0;
  }

  & .grid-container {
    display: grid;
    width: 100%;
    grid-template-columns:
      minmax(436px, calc((100vh - (136px + 25px + 24px)) * (16 / 9)))
      minmax(300px, 402px);
    justify-content: center;

    grid-template-rows: auto;
    grid-template-areas:
      "video recommend"
      "details recommend"
      "comment recommend";
  }

  @include MQ1020 {
    .grid-container {
      display: grid;
      grid-template-columns: 1fr;

      grid-template-rows: auto;
      grid-template-areas:
        "video"
        "details"
        "recommend"
        "comment" !important;
    }

    .grid-video-container,
    .grid-video-details,
    .grid-comment-container {
      margin: 0;
      padding: 0;
    }
    .grid-recommend-container {
      padding: none;
    }

    .grid-video-container {
      justify-self: center;
      margin-right: 0;
      margin-top: 24px;
    }
  }
}
</style>
