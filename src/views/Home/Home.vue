<template>
  <layout :sidebarBlock="true">
    <div class="container">
      <card-video-container class="video-card-container">
        <card-video
          v-for="(item, index) in videos"
          :key="item.title"
          class="video-card-item"
        >
          <router-link to="/watch">
            <card-video-img
              :src="`https://source.unsplash.com/random/1280x720?sig=${
                index + 1
              }`"
              :time="`${generateNumber(1, 15)}:${generateNumber(10, 59)}`"
            />
          </router-link>
          <div class="video-card-title">
            <router-link to="/watch">
              <div class="video-card-title-left">
                <avatar-main
                  :height="'36px'"
                  :width="'36px'"
                  :src="item.photo"
                  :alt="item.title"
                />
              </div>
            </router-link>

            <div class="video-card-title-right">
              <div class="video-card-title-right-row1">
                <router-link to="/watch">
                  <h4>
                    {{ item.title }}
                  </h4>
                </router-link>

                <dropdown-container>
                  <transparent-button
                    :rippleEffect="true"
                    :padding="`7px 8px 7px 4px`"
                    class="options-button"
                    @click="(e) => openVideoOptions(e.target, index)"
                  >
                    <base-icon> <icon-three-dot-v /></base-icon>
                  </transparent-button>
                  <dropdown-item
                    class="video-options-dropdown"
                    :visible="videoOptionsValues[index].visible"
                    :direction="videoOptionsValues[index].dropdownDirection"
                    :onclose="() => closeVideoOptions(index)"
                  >
                    <dropdown-link-main margin-top>
                      <base-icon class="dropdown-link-main-icon"
                        ><icon-add-to-queue />
                      </base-icon>
                      <span class="dropdown-link-main-text">
                        Add to queue
                      </span>
                    </dropdown-link-main>
                    <dropdown-link-main>
                      <base-icon class="dropdown-link-main-icon"
                        ><icon-watch />
                      </base-icon>
                      <span class="dropdown-link-main-text">
                        Save to Watch later
                      </span>
                    </dropdown-link-main>
                    <dropdown-link-main border-bottom margin-bottom>
                      <base-icon class="dropdown-link-main-icon"
                        ><icon-save-to-playlist />
                      </base-icon>
                      <span class="dropdown-link-main-text">
                        Save to playlist
                      </span>
                    </dropdown-link-main>
                    <dropdown-link-main>
                      <base-icon class="dropdown-link-main-icon"
                        ><icon-forbidden />
                      </base-icon>
                      <span class="dropdown-link-main-text">
                        Not interested
                      </span>
                    </dropdown-link-main>
                    <dropdown-link-main>
                      <base-icon class="dropdown-link-main-icon"
                        ><icon-minus-in-circle />
                      </base-icon>
                      <span class="dropdown-link-main-text">
                        Don't recommend channel
                      </span>
                    </dropdown-link-main>
                    <dropdown-link-main margin-bottom>
                      <base-icon class="dropdown-link-main-icon"
                        ><icon-flag />
                      </base-icon>
                      <span class="dropdown-link-main-text"> Report </span>
                    </dropdown-link-main>
                  </dropdown-item>
                </dropdown-container>
              </div>
              <div class="video-card-title-right-row2">
                <detail-popup-container>
                  <a class="video-channelName" href="#">
                    {{ item.channelName }}
                  </a>
                  <detail-popup-item
                    :left="'-4px'"
                    :hDirection="'middle'"
                    :vDirection="'top'"
                  >
                    {{ item.channelName }}
                  </detail-popup-item>
                </detail-popup-container>
                <div class="video-card-title-right-row2-bottom">
                  <span class="video-card-title-right-row2-bottom-text1">
                    {{ generateNumber(1, 100) }}K views</span
                  >
                  <span class="video-card-title-right-row2-bottom-text2">
                    {{ generateNumber(1, 59) }} minutes ago</span
                  >
                </div>
              </div>
            </div>
          </div>
        </card-video>
      </card-video-container>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import RouterLink from "vue-router";
import Layout from "@/components/Layout/Layout.vue";
import CardVideoContainer from "@/components/Card/CardVideo/CardVideoContainer.vue";
import CardVideo from "@/components/Card/CardVideo/CardVideo.vue";
import AvatarMain from "@/components/Avatar/AvatarMain/AvatarMain.vue";
import TransparentButton from "@/components/Input/Button/TransparentButton/TransparentButton.vue";
import DropdownContainer from "@/components/Dropdown/DropdownContainer/DropdownContainer.vue";
import DropdownItem from "@/components/Dropdown/DropdownItem/DropdownItem.vue";
import DropdownLinkMain from "@/components/Input/Button/Dropdown/DropdownLinkMain.vue";
import CardVideoImg from "@/components/Card/CardVideo/CardVideoImg.vue";
import DetailPopupContainer from "@/components/Popup/DetailPopupContainer.vue";
import DetailPopupItem from "@/components/Popup/DetailPopupItem.vue";
import { isRightBlankHaveEnoughSpace } from "@/utils/spaceCheck";
import { generateNumber } from "@/utils/numberGenerators";
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
  channelName: string;
}

interface VideosOptionsValues {
  visible: boolean;
  dropdownDirection: "right" | "left";
}

export default defineComponent({
  name: "Home",
  methods: {
    generateNumber,
  },
  components: {
    Layout,
    CardVideoContainer,
    CardVideo,
    AvatarMain,
    TransparentButton,
    DropdownContainer,
    DropdownItem,
    DropdownLinkMain,
    CardVideoImg,
    DetailPopupContainer,
    DetailPopupItem,
    // ICONS
    BaseIcon,
    IconThreeDotV,
    IconAddToQueue,
    IconForbidden,
    IconMinusInCircle,
    IconSaveToPlaylist,
    IconWatch,
    IconFlag,

    // ROUTER
    RouterLink,
  },
  setup() {
    const videos = ref<Array<Videos>>([
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "charles-darwin.jpg",
        channelName: "Charles Darwin",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "dennis-ritchie.jpg",
        channelName: "Dennis Ritchie",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "galileo-galilei.jpg",
        channelName: "Galileo Galilei",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "isaac-newton.jpg",
        channelName: "Isaac Newton",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "marie-curie.png",
        channelName: "Marie Curie",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "nikola-tesla.jpg",
        channelName: "Nikola Tesla",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "charles-darwin.jpg",
        channelName: "Charles Darwin",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "dennis-ritchie.jpg",
        channelName: "Dennis Ritchie",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "galileo-galilei.jpg",
        channelName: "Galileo Galilei",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "isaac-newton.jpg",
        channelName: "Isaac Newton",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "marie-curie.png",
        channelName: "Marie Curie",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "nikola-tesla.jpg",
        channelName: "Nikola Tesla",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "charles-darwin.jpg",
        channelName: "Charles Darwin",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "dennis-ritchie.jpg",
        channelName: "Dennis Ritchie",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "galileo-galilei.jpg",
        channelName: "Galileo Galilei",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "isaac-newton.jpg",
        channelName: "Isaac Newton",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "marie-curie.png",
        channelName: "Marie Curie",
      },
      {
        title:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
        photo: "nikola-tesla.jpg",
        channelName: "Nikola Tesla",
      },
    ]);
    // VIDEO OPTIONS
    const videoOptionsValues = ref<Array<VideosOptionsValues>>(
      videos.value.map(() => {
        return { visible: false, dropdownDirection: "left" };
      })
    );
    const openVideoOptions = (e: HTMLElement, index: number) => {
      const isDirectionRight = isRightBlankHaveEnoughSpace(e, 258);
      videoOptionsValues.value[index].dropdownDirection = isDirectionRight
        ? "right"
        : "left";

      videoOptionsValues.value[index].visible = true;
      return;
    };
    const closeVideoOptions = (index: number) => {
      return (videoOptionsValues.value[index].visible = false);
    };
    return { videos, videoOptionsValues, openVideoOptions, closeVideoOptions };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;

  & > a {
    display: contents;
  }

  & .video-card-container {
    // THESE VALUES SET IN STYLES BREAKPOINTS FILE
    margin: 24px 0 0 0;
    width: calc(100% - 16px * 2);
    max-width: calc(var(--videos-per-item-row) * 320px + 16);
    justify-content: center;
    max-width: 2256px;

    & .video-card-item {
      width: calc(100% / var(--videos-per-item-row) - 16px - 0.01px);
      margin: 0 8px 40px 8px;
      max-width: var(--videos-item-max-width);

      &:hover {
        .options-button {
          visibility: visible !important;
        }
      }

      & .video-card-title {
        display: flex;
        align-items: flex-start;
        margin-top: 12px;
        position: relative;
        width: calc(100% + 15px);
        justify-content: space-between;

        & .video-card-title-left {
          display: flex;
          & img {
            margin-right: 12px;
          }
        }

        & .video-card-title-right {
          & .video-card-title-right-row1 {
            display: flex;
            justify-content: space-between;
            & h4 {
              display: inline-block;
              font-weight: 500;
              font-size: 15px;
              white-space: normal;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 20px;
              max-height: 40px;
            }
          }
          & .video-card-title-right-row2 {
            margin-top: 6px;
            & .video-channelName {
              font-size: 15px;
              color: var(--text-link-primary-color);

              &:hover {
                color: var(--text-link-primary-hover-color);
              }
            }

            & .video-card-title-right-row2-bottom {
              display: flex;
              margin-top: 3px;

              & span {
                display: inline-block;
                font-size: 15px;
                color: var(--text-link-primary-color);
              }

              .video-card-title-right-row2-bottom-text1 {
                &::after {
                  content: "•";
                  margin: 0 5px;
                }
              }
            }
          }

          & .video-options-dropdown {
            width: 258px;
          }

          & .options-button {
            visibility: hidden;

            &:focus {
              visibility: visible !important;
            }
          }
        }
      }
    }
  }
}
</style>
