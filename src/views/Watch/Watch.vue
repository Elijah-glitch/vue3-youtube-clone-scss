<template>
  <layout
    :hideLayoutScrollBar="isFullscreen"
    :showNavbar="!isFullscreen"
    :sidebarBlock="false"
  >
    <div
      class="container-watch"
      :class="{
        'container-large-view': viewMode === 'large' || isFullscreen,
      }"
    >
      <div class="grid-container">
        <div class="grid-video-container">
          <video-comp />
        </div>
        <div class="grid-video-details">
          <div class="video-details-title">
            Vivamus suscipit tortor eget felis porttitor volutpat. Mauris
            blandit aliquet elit, eget tincidunt nibh pulvinar a.
          </div>
          <div class="video-date-options-container">
            <div class="video-date-watch">
              <div class="video-watch">97.801 views</div>
              <div class="video-date">Aug 18, 2021</div>
            </div>
            <div class="video-date-watch-small">
              <div class="video-watch">97K views</div>
            </div>
            <div class="video-options">
              <div class="video-like-dislike-container">
                <div class="video-like-dislike">
                  <div class="video-like">
                    <base-icon class="video-icon-gray">
                      <icon-like-video />
                    </base-icon>
                    <span>3.2K</span>
                  </div>
                  <div class="video-dislike">
                    <base-icon class="video-icon-gray">
                      <icon-dislike-video />
                    </base-icon>
                    <span>125</span>
                  </div>
                </div>
                <div class="video-like-dislike-sentiment-bar"></div>
              </div>
              <div class="video-share video-options-item">
                <base-icon class="video-icon-gray">
                  <icon-share />
                </base-icon>
                <span>SHARE</span>
              </div>
              <div class="video-save video-options-item">
                <base-icon class="video-icon-gray">
                  <icon-save-to-playlist />
                </base-icon>
                <span>SAVE</span>
              </div>
              <div class="video-more">
                <dropdown-container>
                  <transparent-button
                    :rippleEffect="true"
                    :padding="`8px 8px 8px 8px`"
                    @click="videoMoreOpen()"
                  >
                    <base-icon class="video-icon-gray"
                      ><icon-three-dot-h
                    /></base-icon>
                  </transparent-button>
                  <dropdown-item
                    :onclose="() => videoMoreClose()"
                    :directionV="videoOptionsValues.moreMenuDirectionV.value"
                    :direction="videoOptionsValues.moreMenuDirectionH.value"
                    :visible="videoOptionsValues.moreMenuVisible.value"
                    class="video-dropdown video-more-dropdown"
                  >
                    <dropdown-link-main margin-top>
                      <base-icon class="dropdown-link-main-icon">
                        <icon-flag />
                      </base-icon>
                      <span class="dropdown-link-main-text"> Report </span>
                    </dropdown-link-main>
                    <dropdown-link-main margin-bottom>
                      <base-icon class="dropdown-link-main-icon">
                        <icon-transcript />
                      </base-icon>
                      <span class="dropdown-link-main-text">
                        Open transcript
                      </span>
                    </dropdown-link-main>
                  </dropdown-item>
                </dropdown-container>
              </div>
            </div>
          </div>
          <div class="video-detail-channel">
            <div class="video-channel">
              <div class="video-channel-left">
                <div class="video-channel-pp">
                  <img src="@/assets/pp2.jpg" />
                </div>
                <div class="video-channel-name-sub">
                  <span class="video-channel-name">Albert Einstein</span>
                  <span class="video-channel-sub">3.14K subscribers</span>
                </div>
              </div>
              <div class="video-channel-right">
                <primary-button>
                  <text-one type-first>SUBSCRIBE</text-one>
                </primary-button>
              </div>
            </div>
            <div class="video-channel-desc">
              <span class="video-desc">
                Albert Einstein, (born March 14, 1879, Ulm, Württemberg,
                Germany—died April 18, 1955, Princeton, New Jersey, U.S.),
                German-born physicist who developed the special and general
                theories of relativity and won the Nobel Prize for Physics in
                1921 for his explanation of the photoelectric effect. Einstein
                is generally considered the most influential physicist of the
                20th century.
              </span>

              <span class="video-desc-show"> SHOW MORE </span>
            </div>
          </div>
        </div>
        <div class="grid-comment-container">
          <div class="video-comment-container">
            <div class="comment-count-sort">
              <div class="comment-count">4 Comments</div>
              <div class="comment-sort">
                <base-icon><icon-sort /></base-icon> SORT BY
              </div>
            </div>
            <div class="comment-input">
              <img src="@/assets/pp.png" />
              <text-input />
            </div>
          </div>

          <div class="video-comments">
            <comment />
            <div class="spacer"></div>
            <comment
              :comment="'Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Proin eget tortor risus. Cras ultricies ligula sed magna dictum porta.'"
              :ppName="'isaac-newton'"
              :name="'Isaac Newton'"
            />
            <div class="spacer"></div>
            <comment :ppName="'dennis-ritchie'" :name="'Dennis Ritchie'" />
            <div class="spacer"></div>
            <comment
              :comment="'Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'"
              :ppName="'galileo-galilei'"
              :name="'Galileo Galilei'"
            />
            <div class="spacer"></div>
          </div>
        </div>

        <div class="grid-recommend-container">
          <div
            v-for="(item, index) in videos"
            :key="index"
            class="recommend-item"
          >
            <card-video-img
              :src="`https://source.unsplash.com/random/1280x720?sig=${
                index + 1
              }`"
              :time="`${generateNumber(1, 15)}:${generateNumber(10, 59)}`"
              class="recommend-video-img"
            />
            <div class="recommend-item-middle">
              <span class="recommend-item-title">
                {{ item.title }}
              </span>
              <span class="recommend-item-channel">
                {{ item.channelName }}
              </span>
              <div class="recommend-item-watch-date">
                <span class="recommend-item-watch">
                  {{ generateNumber(1, 850) }}K views
                </span>
                <span class="recommend-item-date">
                  {{ generateNumber(12, 28) }} days ago
                </span>
              </div>
            </div>
            <div class="recommend-options">
              <dropdown-container>
                <transparent-button
                  class="recommend-options-button"
                  :rippleEffect="true"
                  @click="recommendOptionsOpen(index)"
                >
                  <base-icon><icon-three-dot-v /></base-icon>
                </transparent-button>
                <dropdown-item
                  :onclose="() => recommendOptionsClose(index)"
                  :visible="
                    recommendOptionsValues.recommendMenuVisible.value[index]
                  "
                  :direction="'left'"
                  :directionV="
                    recommendOptionsValues.recommendMenuDirectionV.value
                  "
                  class="recommend-options-dropdown"
                >
                  <dropdown-link-main margin-top>
                    <base-icon class="dropdown-link-main-icon"
                      ><icon-add-to-queue />
                    </base-icon>
                    <span class="dropdown-link-main-text"> Add to queue </span>
                  </dropdown-link-main>
                  <dropdown-link-main>
                    <base-icon class="dropdown-link-main-icon"
                      ><icon-clock />
                    </base-icon>
                    <span class="dropdown-link-main-text">
                      Save to Watch later
                    </span>
                  </dropdown-link-main>
                  <dropdown-link-main margin-bottom border-bottom>
                    <base-icon class="dropdown-link-main-icon"
                      ><icon-save-to-playlist />
                    </base-icon>
                    <span class="dropdown-link-main-text">
                      Save to playlist
                    </span>
                  </dropdown-link-main>
                  <dropdown-link-main margin-top>
                    <base-icon class="dropdown-link-main-icon"
                      ><icon-forbidden />
                    </base-icon>
                    <span class="dropdown-link-main-text">
                      Not interested
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
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import { useStore } from "vuex";

// COMPONENTS
import Layout from "@/components/Layout/Layout.vue";
import AvatarMain from "@/components/Avatar/AvatarMain/AvatarMain.vue";
import TransparentButton from "@/components/Input/Button/TransparentButton/TransparentButton.vue";
import DropdownContainer from "@/components/Dropdown/DropdownContainer/DropdownContainer.vue";
import DropdownItem from "@/components/Dropdown/DropdownItem/DropdownItem.vue";
import DropdownLinkMain from "@/components/Input/Button/Dropdown/DropdownLinkMain.vue";
import DetailPopupContainer from "@/components/Popup/DetailPopupContainer.vue";
import DetailPopupItem from "@/components/Popup/DetailPopupItem.vue";
import VideoComp from "@/components/Video/Video.vue";
import TextOne from "@/components/Text/TextOne.vue";
import PrimaryButton from "@/components/Input/Button/Primary/PrimaryButton.vue";
import TextInput from "@/components/Input/TextInput/TextInput.vue";
import Comment from "@/components/Comment/Comment.vue";
import CardVideoImg from "@/components/Card/CardVideo/CardVideoImg.vue";

// UTILS
import {
  isRightBlankHaveEnoughSpace,
  isBottomBlankHaveEnoughSpace,
} from "@/utils/spaceCheck";
import { generateNumber } from "@/utils/numberGenerators";
// ICONS
import BaseIcon from "@/components/Icon/BaseIcon.vue";
import IconThreeDotV from "@/components/Icon/Icons/ThreeDotV.vue";
import IconThreeDotH from "@/components/Icon/Icons/ThreeDotH.vue";
import IconLikeVideo from "@/components/Icon/Icons/LikeVideo.vue";
import IconDislikeVideo from "@/components/Icon/Icons/DislikeVideo.vue";
import IconFlag from "@/components/Icon/Icons/Flag.vue";
import IconTranscript from "@/components/Icon/Icons/Transcript.vue";
import IconSaveToPlaylist from "@/components/Icon/Icons/SaveToPlaylist.vue";
import IconShare from "@/components/Icon/Icons/Share.vue";
import IconSort from "@/components/Icon/Icons/Sort.vue";
import IconAddToQueue from "@/components/Icon/Icons/AddToQueue.vue";
import IconClock from "@/components/Icon/Icons/Clock.vue";
import IconForbidden from "@/components/Icon/Icons/Forbidden.vue";

export default defineComponent({
  name: "Watch",
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
    TextOne,
    PrimaryButton,
    TextInput,
    Comment,
    CardVideoImg,
    // ICONS
    BaseIcon,
    IconThreeDotV,
    IconThreeDotH,
    IconLikeVideo,
    IconDislikeVideo,
    IconFlag,
    IconTranscript,
    IconSaveToPlaylist,
    IconShare,
    IconSort,
    IconAddToQueue,
    IconClock,
    IconForbidden,
  },
  setup() {
    const store = useStore();

    interface Videos {
      title: string;
      photo: string;
      channelName: string;
    }
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

    interface IVideoOptionsValues {
      moreMenuDirectionH: "left" | "right";
      moreMenuDirectionV: "top" | "bottom";
      moreMenuVisible: boolean;
    }
    const videoOptionsValuesR = reactive<IVideoOptionsValues>({
      moreMenuDirectionH: "right",
      moreMenuDirectionV: "top",
      moreMenuVisible: false,
    });

    const videoOptionsValues = toRefs<IVideoOptionsValues>(videoOptionsValuesR);

    // VIDEO OPTIONS BEGIN
    const videoMoreOpen = () => {
      videoOptionsValuesR.moreMenuVisible = true;

      setTimeout(() => {
        const videoMoreDropdownEl = document.getElementsByClassName(
          "video-more-dropdown"
        )[0];
        const isHaveRightSpace = isRightBlankHaveEnoughSpace(
          videoMoreDropdownEl as HTMLElement
        );
        const isHaveBottomSpace = isBottomBlankHaveEnoughSpace(
          videoMoreDropdownEl as HTMLElement
        );

        videoOptionsValuesR.moreMenuDirectionH = isHaveRightSpace
          ? "right"
          : "left";
        videoOptionsValuesR.moreMenuDirectionV = isHaveBottomSpace
          ? "bottom"
          : "top";
      }, 0);
    };
    const videoMoreClose = () => {
      videoOptionsValuesR.moreMenuVisible = false;
    };
    // VIDEO OPTIONS END

    // RECOMMEND OPTIONS BEGIN
    interface IRecommendOptionsValues {
      recommendMenuDirectionV: "top" | "bottom";
      recommendMenuVisible: Array<boolean>;
    }
    const recommendOptionsValuesR = reactive<IRecommendOptionsValues>({
      recommendMenuDirectionV: "bottom",
      recommendMenuVisible: Array(videos.value.length).fill(false),
    });

    const recommendOptionsValues = toRefs<IRecommendOptionsValues>(
      recommendOptionsValuesR
    );

    const recommendOptionsOpen = (index: number) => {
      recommendOptionsValuesR.recommendMenuVisible[index] = true;

      const recommendOptionsDropdownEl = document.getElementsByClassName(
        "recommend-options-dropdown"
      )[index];
      const recommendOptionsButtonEl = document.getElementsByClassName(
        "recommend-options-button"
      )[index];
      recommendOptionsValuesR.recommendMenuDirectionV =
        isBottomBlankHaveEnoughSpace(
          recommendOptionsDropdownEl as HTMLElement,
          recommendOptionsButtonEl as HTMLElement
        )
          ? "bottom"
          : "top";
    };
    const recommendOptionsClose = (index: number) => {
      recommendOptionsValuesR.recommendMenuVisible[index] = false;
    };
    // RECOMMEND OPTIONS END

    return {
      videoOptionsValues,
      videoMoreOpen,
      videoMoreClose,
      videos,
      recommendOptionsValues,
      recommendOptionsOpen,
      recommendOptionsClose,
      // STORE
      isFullscreen: computed(() => store.state["video"].isFullscreen),
      viewMode: computed(() => store.state["video"].viewMode),
    };
  },
});
</script>

<style lang="scss">
@import "@/styles/mediaQueries/mediaQueries.scss";
.container-watch {
  display: flex;
  overflow: hidden;
  // margin: 0 20px;

  &::before,
  &::after {
    content: "";
    height: 100%;
  }

  &::before {
    padding-left: 20px;
  }

  &::after {
    padding-right: 20px;
  }

  & .video-icon-gray {
    fill: var(--textone-type-second-color);
  }

  & .video-dropdown {
    width: 190px;
  }

  &.container-large-view {
    width: 100%;
    margin: 0;
    & .grid-container {
      grid-template-areas:
        "video video"
        "details recommend"
        "comment recommend";

      & .grid-video-container {
        width: calc(100vw - 8px);
        justify-self: center;
        padding: 0;
        margin: 0;
      }

      & .grid-comment-container,
      .grid-recommend-container,
      .grid-video-details {
        margin: 0 24px;
      }

      & .grid-comment-container {
        margin: 0 24px 0 0;
        height: 1500px;
      }

      & .grid-video-details {
        margin: 20px 0 0 0;
      }
    }

    @include MQ1020 {
      & .grid-comment-container,
      & .grid-recommend-container,
      & .grid-video-details {
        margin: 0 20px !important;
      }

      & .grid-video-details {
        margin: 20px 20px 0 20px !important;
      }
    }
  }

  & .grid-container {
    display: grid;
    width: 100%;
    grid-template-columns:
      minmax(640px, calc((100vh - (136px + 25px + 24px)) * (16 / 9)))
      minmax(300px, 402px);
    place-content: center;
    grid-template-areas:
      "video recommend"
      "details recommend"
      "comment recommend";
  }

  & .grid-video-container {
    grid-area: video;
    margin: 24px 24px 0 0;
    height: fit-content;
    align-self: start;
  }

  & .grid-video-details {
    grid-area: details;
    margin: 24px 24px 0 0;
    align-self: start;

    & .video-details-title {
      font-size: 19px;
      line-height: 26px;
    }

    & .video-date-options-container {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-color);
      & .video-date-watch,
      & .video-date-watch-small {
        display: flex;
        & .video-watch {
          color: var(--textone-type-second-color);
          overflow: hidden;
          white-space: nowrap;
        }

        & .video-date {
          color: var(--textone-type-second-color);
          white-space: nowrap;
          &::before {
            content: "•";
            margin: 0 4px;
          }
        }
      }

      & .video-date-watch {
        @include MQ585 {
          display: none;
        }
      }

      & .video-date-watch-small {
        display: none;

        @include MQ585 {
          display: flex;
        }
      }

      & .video-options {
        display: flex;
        align-items: center;
        & .video-like-dislike-container {
          display: flex;
          flex-direction: column;
          & .video-like-dislike {
            display: flex;
            align-items: center;
            & .video-like,
            & .video-dislike {
              display: flex;
              align-items: center;
              & svg {
                padding: 8px;
              }

              & span {
                display: inline-block;
                font-size: 15px;
                font-weight: 500;
                color: var(--textone-type-second-color);
              }
            }

            & .video-like {
              padding-right: 6px;
            }

            & .video-dislike {
              margin-left: 8px;
              padding-right: 6px;
            }
          }

          & .video-like-dislike-sentiment-bar {
            height: 2px;
            width: 100%;
            background: var(--textone-type-second-color);
            margin-top: 3px;
          }
        }

        & .video-options-item {
          display: flex;
          align-items: center;
          margin-left: 8px;

          & svg {
            padding: 8px;
          }

          & span {
            font-size: 15px;
            font-weight: 500;
            color: var(--textone-type-second-color);
          }
        }

        & .video-more {
          margin-left: 8px;
        }
      }
    }

    & .video-detail-channel {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid var(--border-color);

      & .video-channel {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 16px 0 12px 0;

        & .video-channel-left {
          display: flex;
          align-items: center;
          & .video-channel-pp {
            padding-right: 16px;
            & img {
              width: 48px;
              height: 48px;
              border-radius: 50%;
            }
          }
          & .video-channel-name-sub {
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            & span {
              display: inline-block;
            }

            & .video-channel-name {
              font-size: 15px;
              font-weight: 500;
            }

            & .video-channel-sub {
              margin-top: 3px;
              font-size: 13px;
              color: var(--textone-type-second-color);
            }
          }
        }
      }

      & .video-channel-desc {
        display: flex;
        flex-direction: column;
        margin: 0 0 16px 64px;

        & .video-desc {
          max-height: 60px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: pre-line;
          font-size: 15px;
          line-height: 20px;
        }

        & .video-desc-show {
          margin-top: 8px;
          font-size: 13px;
          font-weight: 500;
          color: var(--textone-type-second-color);
        }
      }
    }
  }

  & .grid-recommend-container {
    grid-area: recommend;
    margin: 24px 24px 0 0;

    & .recommend-item {
      display: flex;
      margin-top: 8px;

      &:hover {
        & .recommend-options {
          & .recommend-options-button {
            visibility: visible;
          }
        }
      }

      & .recommend-video-img {
        & img {
          width: 168px;
          height: 94px;
        }
        width: 168px;
        height: 94px;
        margin-right: 8px;
      }

      & .recommend-item-middle {
        display: flex;
        flex-direction: column;
        margin-top: 4px;
        width: 100%;
        & .recommend-item-title {
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          line-height: 20px;
          height: 40px;
          margin-bottom: 4px;
        }

        & .recommend-item-channel,
        & .recommend-item-watch,
        & .recommend-item-date {
          font-size: 13px;
          color: var(--textone-type-second-color);
        }

        & .recommend-item-watch-date {
          display: flex;
          margin-top: 4px;

          & .recommend-item-watch::after {
            content: "•";
            margin: 0 4px;
          }
        }
      }

      & .recommend-options {
        & .recommend-options-button {
          visibility: hidden;

          &:focus {
            visibility: visible;
          }
        }

        & .recommend-options-dropdown {
          width: 215px;
        }
      }
    }
  }

  & .grid-comment-container {
    grid-area: comment;
    margin: 24px 24px 0 0;
    align-self: start;
    height: 1200px;

    & .video-comment-container {
      & .comment-count-sort {
        display: flex;
        align-items: center;
        margin: 0 0 24px 0;

        & .comment-count {
          font-size: 17px;
          margin-right: 32px;
        }

        & .comment-sort {
          display: flex;
          align-items: center;

          & svg {
            fill: var(--icon-color-two);
          }
        }
      }

      & .comment-input {
        display: flex;
        align-items: flex-start;
        width: 100%;

        & img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 16px;
        }
      }
    }
    & .video-comments {
      margin-top: 30px;

      & .spacer {
        margin-top: 10px;
      }
    }
  }

  @include MQ1020 {
    .grid-container {
      display: grid;
      grid-template-columns: 1fr;
      width: calc(100% - 40px);

      grid-template-rows: max-content max-content;
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
      margin-top: 24px;
    }

    .grid-video-container {
      justify-self: center;
      margin: 0;
      margin-top: 24px;
      width: 100%;
      height: 100%;
    }

    .grid-video-details {
      margin-top: 22px;
    }

    & .grid-comment-container {
      margin-top: 15px;
      height: 100%;
    }
  }
}
</style>
