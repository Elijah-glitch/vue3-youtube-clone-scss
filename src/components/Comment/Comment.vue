<template>
  <div class="comment-container">
    <div class="left">
      <img
        :src="require(`../../assets/${ppName}.jpg`)"
        alt="Profil Picture"
        class="pp"
      />
      <div class="middle">
        <div class="name-time-container">
          <span class="name">{{ name }}</span>
          <span class="time">1 day ago</span>
        </div>
        <div class="comment">{{ comment }}</div>
        <div class="like-reply">
          <div class="like">
            <base-icon :viewBox="'0 0 24 24'" :width="'16px'" :height="'16px'">
              <icon-like-video />
            </base-icon>
            <span class="like-count">
              {{ generateNumber(5, 200) }}
            </span>
          </div>
          <div class="dislike">
            <base-icon :viewBox="'0 0 24 24'" :width="'16px'" :height="'16px'">
              <icon-dislike-video />
            </base-icon>
          </div>

          <transparent-button :padding="'8px 16px'"
            ><text-one type-second>REPLY</text-one></transparent-button
          >
        </div>
      </div>
    </div>
    <div class="right">
      <div class="options">
        <dropdown-container>
          <transparent-button
            @click="onOpenOptions()"
            :rippleEffect="true"
            :padding="'8px'"
            class="options-button"
            ><base-icon><icon-three-dot-v /></base-icon
          ></transparent-button>
          <dropdown-item
            :onclose="() => onCloseOptions()"
            :visible="optionsValues.visible.value"
            :direction="optionsValues.directionH.value"
            :directionV="optionsValues.directionV.value"
            class="comment-options-dropdown"
          >
            <dropdown-link-main margin-top margin-bottom>
              <base-icon class="dropdown-link-main-icon">
                <icon-flag />
              </base-icon>
              <span class="dropdown-link-main-text"> Report </span>
            </dropdown-link-main>
          </dropdown-item>
        </dropdown-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";

// COMPONENTS
import TransparentButton from "@/components/Input/Button/TransparentButton/TransparentButton.vue";
import TextOne from "@/components/Text/TextOne.vue";
import DropdownContainer from "@/components/Dropdown/DropdownContainer/DropdownContainer.vue";
import DropdownItem from "@/components/Dropdown/DropdownItem/DropdownItem.vue";
import DropdownLinkMain from "@/components/Input/Button/Dropdown/DropdownLinkMain.vue";
import DetailPopupContainer from "@/components/Popup/DetailPopupContainer.vue";
import DetailPopupItem from "@/components/Popup/DetailPopupItem.vue";

// ICONS
import BaseIcon from "@/components/Icon/BaseIcon.vue";
import IconLikeVideo from "@/components/Icon/Icons/LikeVideo.vue";
import IconDislikeVideo from "@/components/Icon/Icons/DislikeVideo.vue";
import IconThreeDotV from "@/components/Icon/Icons/ThreeDotV.vue";
import IconFlag from "@/components/Icon/Icons/Flag.vue";

// UTILS
import { generateNumber } from "@/utils/numberGenerators";
import {
  isRightBlankHaveEnoughSpace,
  isBottomBlankHaveEnoughSpace,
} from "@/utils/spaceCheck";

export default defineComponent({
  name: "Comment",
  components: {
    // COMPONENTS
    TransparentButton,
    TextOne,
    DropdownContainer,
    DropdownItem,
    DropdownLinkMain,
    DetailPopupContainer,
    DetailPopupItem,

    // ICONS
    BaseIcon,
    IconLikeVideo,
    IconDislikeVideo,
    IconThreeDotV,
    IconFlag,
  },
  props: {
    ppName: {
      type: String,
      default: "charles-darwin",
    },
    comment: {
      type: String,
      default:
        "Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
    },
    name: {
      type: String,
      default: "Charles Darwin",
    },
  },
  setup() {
    interface OptionsValues {
      directionH: "right" | "left";
      directionV: "top" | "bottom";
      visible: boolean;
    }
    const optionsValuesR = reactive<OptionsValues>({
      directionH: "left",
      directionV: "top",
      visible: false,
    });
    const optionsValues = toRefs<OptionsValues>(optionsValuesR);

    const onCloseOptions = (): void => {
      optionsValuesR.visible = false;
    };
    const onOpenOptions = (): void => {
      const dropdownEl = document.querySelector(
        ".comment-options-dropdown"
      ) as HTMLElement;
      optionsValuesR.visible = true;
      optionsValuesR.directionH = isRightBlankHaveEnoughSpace(dropdownEl)
        ? "right"
        : "left";
      optionsValuesR.directionV = isBottomBlankHaveEnoughSpace(dropdownEl)
        ? "bottom"
        : "top";
    };
    return {
      generateNumber: generateNumber,
      optionsValues,
      onCloseOptions,
      onOpenOptions,
    };
  },
});
</script>

<style lang="scss" scoped>
.comment-container {
  display: flex;
  justify-content: space-between;
  width: 100%;

  &:hover {
    & .right {
      & .options {
        & .options-button {
          visibility: visible;
        }
      }
    }
  }

  & .left {
    display: flex;

    & .pp {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    & .middle {
      margin-left: 16px;
      & .name-time-container {
        display: flex;

        & span {
          display: inline-block;
        }

        & .name {
          font-size: 14px;
          font-weight: 500;
          margin-right: 4px;
        }

        & .time {
          font-size: 13px;
          color: var(--textone-type-second-color);
        }
      }

      & .comment {
        margin-top: 5px;
        font-size: 15px;
        line-height: 20px;
      }

      & .like-reply {
        display: flex;
        & .like {
          display: flex;
          align-items: center;

          & svg {
            padding: 8px 8px 8px 0;
          }

          & .like-count {
            display: inline-block;
            font-size: 12px;
            color: var(--textone-type-second-color);
            margin-right: 8px;
          }
        }
        & .dislike {
          & svg {
            padding: 8px;
          }
        }
      }
    }
  }

  & .right {
    & .options {
      & .options-button {
        visibility: hidden;
        &:focus {
          visibility: visible !important;
        }
      }
    }

    & .comment-options-dropdown {
      width: 134px;
    }
  }
}
</style>
