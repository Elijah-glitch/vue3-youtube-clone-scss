<template>
  <layout :sidebarBlock="true">
    <div class="container">
      <card-video-container class="video-card-container">
        <card-video
          v-for="(item, index) in videos"
          :key="item.title"
          class="video-card-item"
        >
          <img
            :src="`https://source.unsplash.com/random/1280x720?sig=${
              index + 1
            }`"
            :alt="item.title"
          />
          <div class="video-card-title">
            <avatar-main
              :height="'36px'"
              :width="'36px'"
              :src="item.photo"
              :alt="item.title"
            />
            <h4>
              {{ item.title }}
            </h4>
            <dropdown-container>
              <transparent-button
                :rippleEffect="true"
                :padding="`7px 8px 7px 4px`"
                class="options-button"
                @click="toggleVideoOptionsVisible()"
              >
                <base-icon> <icon-three-dot-v /></base-icon>
              </transparent-button>
              <dropdown-item
                class="video-options-dropdown"
                :visible="videoOptionsVisible"
                :direction="'left'"
                :onclose="() => toggleVideoOptionsVisible()"
              >
                <dropdown-link-main margin-top>
                  <icon-base class="dropdown-link-main-icon"
                    ><icon-add-to-queue />
                  </icon-base>
                  <span class="dropdown-link-main-text"> Add to queue </span>
                </dropdown-link-main>
                <dropdown-link-main>
                  <icon-base class="dropdown-link-main-icon"
                    ><icon-watch />
                  </icon-base>
                  <span class="dropdown-link-main-text">
                    Save to Watch later
                  </span>
                </dropdown-link-main>
                <dropdown-link-main border-bottom margin-bottom>
                  <icon-base class="dropdown-link-main-icon"
                    ><icon-save-to-playlist />
                  </icon-base>
                  <span class="dropdown-link-main-text">
                    Save to playlist
                  </span>
                </dropdown-link-main>
                <dropdown-link-main>
                  <icon-base class="dropdown-link-main-icon"
                    ><icon-forbidden />
                  </icon-base>
                  <span class="dropdown-link-main-text"> Not interested </span>
                </dropdown-link-main>
                <dropdown-link-main>
                  <icon-base class="dropdown-link-main-icon"
                    ><icon-minus-in-circle />
                  </icon-base>
                  <span class="dropdown-link-main-text">
                    Don't recommend channel
                  </span>
                </dropdown-link-main>
                <dropdown-link-main margin-bottom>
                  <icon-base class="dropdown-link-main-icon"
                    ><icon-flag />
                  </icon-base>
                  <span class="dropdown-link-main-text"> Report </span>
                </dropdown-link-main>
              </dropdown-item>
            </dropdown-container>
          </div>
        </card-video>
      </card-video-container>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Layout from "@/components/Layout/Layout.vue";
import CardVideoContainer from "@/components/Card/CardVideo/CardVideoContainer.vue";
import CardVideo from "@/components/Card/CardVideo/CardVideo.vue";
import AvatarMain from "@/components/Avatar/AvatarMain/AvatarMain.vue";
import TransparentButton from "@/components/Input/Button/TransparentButton/TransparentButton.vue";
import DropdownContainer from "@/components/Dropdown/DropdownContainer/DropdownContainer.vue";
import DropdownItem from "@/components/Dropdown/DropdownItem/DropdownItem.vue";
import DropdownLinkMain from "@/components/Input/Button/Dropdown/DropdownLinkMain.vue";
// ICONS
import BaseIcon from "@/components/Icon/BaseIcon.vue";
import IconThreeDotV from "@/components/Icon/Icons/ThreeDotV.vue";
import IconAddToQueue from "@/components/Icon/Icons/AddToQueue.vue";
import IconForbidden from "@/components/Icon/Icons/Forbidden.vue";
import IconMinusInCircle from "@/components/Icon/Icons/MinusInCircle.vue";
import IconSaveToPlaylist from "@/components/Icon/Icons/SaveToPlaylist.vue";
import IconWatch from "@/components/Icon/Icons/Watch.vue";
import IconFlag from "@/components/Icon/Icons/Flag.vue";

interface Videos {
  title: string;
  photo: string;
}

export default defineComponent({
  name: "Home",
  components: {
    Layout,
    CardVideoContainer,
    CardVideo,
    AvatarMain,
    TransparentButton,
    DropdownContainer,
    DropdownItem,
    DropdownLinkMain,
    // ICONS
    BaseIcon,
    IconThreeDotV,
    IconAddToQueue,
    IconForbidden,
    IconMinusInCircle,
    IconSaveToPlaylist,
    IconWatch,
    IconFlag,
  },
  setup() {
    const videos = ref<Array<Videos>>([
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "charles-darwin.jpg",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "dennis-ritchie.jpg",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "galileo-galilei.jpg",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "isaac-newton.jpg",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "marie-curie.png",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "nikola-tesla.jpg",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "charles-darwin.jpg",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "dennis-ritchie.jpg",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "galileo-galilei.jpg",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "isaac-newton.jpg",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "marie-curie.png",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "nikola-tesla.jpg",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "charles-darwin.jpg",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "dennis-ritchie.jpg",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "galileo-galilei.jpg",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "isaac-newton.jpg",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "marie-curie.png",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "nikola-tesla.jpg",
      },
    ]);
    // VIDEO OPTIONS
    const videoOptionsVisible = ref<boolean>(false);
    const toggleVideoOptionsVisible = () => {
      return (videoOptionsVisible.value = !videoOptionsVisible.value);
    };
    return { videos, videoOptionsVisible, toggleVideoOptionsVisible };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
  & .video-card-container {
    // THESE VALUES SET IN STYLES BREAKPOINTS FILE
    margin: 24px 0 0 0;
    justify-content: var(--videos-container-justify-content);
    width: calc(100% - 16px * 2);
    max-width: calc(var(--videos-per-item-row) * 320px + 16);
    & .video-card-item {
      width: calc(100% / var(--videos-per-item-row) - 16px - 0.01px);
      margin: 0 8px 40px 8px;
      max-width: var(--videos-item-max-width);

      &:hover {
        .options-button {
          visibility: visible !important;
        }
      }

      & img {
        width: 100%;
      }

      & .video-card-title {
        display: flex;
        align-items: flex-start;
        margin-top: 12px;
        position: relative;

        & img {
          margin-right: 12px;
        }

        & h4 {
          display: inline-block;
          font-weight: 500;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 20px;
          max-height: 40px;
          max-width: 80%;
        }

        & .video-options-dropdown {
          width: 258px;
        }

        & .options-button {
          visibility: hidden;
          position: absolute;
          right: -12px;
        }
      }
    }
  }
}
</style>
