<template>
  <div class="layout">
    <div class="navbar">
      <div class="navbar-left">
        <transparent-button :rippleEffect="true" :padding="`8px`">
          <icon-base class="icon"><bar-icon /></icon-base>
        </transparent-button>
        <transparent-button :padding="`16px 14px 16px 16px`">
          <main-logo />
        </transparent-button>
      </div>
      <div class="navbar-middle">
        <input placeholder="Search" class="search-bar" />
        <button class="search-button">
          <icon-base :width="`20px`" :height="`20px`" class="search-icon"
            ><icon-search
          /></icon-base>
        </button>
      </div>
      <div class="navbar-right">
        <dropdown-container>
          <transparent-button
            :rippleEffect="true"
            :padding="`8px`"
            :margin="`0 8px 0 0`"
            @click="changeDropdownValue('addVideoVisible', true)"
          >
            <icon-base class="icon"><icon-add-video /></icon-base>
          </transparent-button>
          <dropdown-item
            :visible="dropdownVisibleValues.addVideoVisible"
            :direction="'right'"
            class="dropdown-item-links"
            :onclose="() => changeDropdownValue('addVideoVisible', false)"
          >
            <dropdown-link-main margin-top>
              <icon-base class="dropdown-link-main-icon">
                <icon-youtube-tv />
              </icon-base>
              <span class="dropdown-link-main-text"> Upload video </span>
            </dropdown-link-main>
            <dropdown-link-main margin-bottom>
              <icon-base class="dropdown-link-main-icon">
                <icon-youtube-tv />
              </icon-base>
              <span class="dropdown-link-main-text"> Go live </span>
            </dropdown-link-main>
          </dropdown-item>
        </dropdown-container>
        <dropdown-container>
          <transparent-button
            :rippleEffect="true"
            :padding="`8px`"
            :margin="`0 8px 0 0`"
            @click="changeDropdownValue('appsVisible', true)"
          >
            <icon-base class="icon"><icon-apps /></icon-base>
          </transparent-button>
          <dropdown-item
            :visible="dropdownVisibleValues.appsVisible"
            :direction="'left'"
            class="dropdown-item-links"
            :onclose="() => changeDropdownValue('appsVisible', false)"
          >
            <dropdown-link-main margin-top margin-bottom>
              <icon-base class="dropdown-link-main-icon">
                <icon-youtube-tv />
              </icon-base>
              <span class="dropdown-link-main-text"> YouTube TV </span>
            </dropdown-link-main>
            <dropdown-link-main margin-top border-top>
              <icon-base class="dropdown-link-main-icon">
                <icon-youtube-music />
              </icon-base>
              <span class="dropdown-link-main-text"> YouTube Music </span>
            </dropdown-link-main>
            <dropdown-link-main margin-bottom border-bottom>
              <icon-base class="dropdown-link-main-icon">
                <icon-youtube-kids />
              </icon-base>
              <span class="dropdown-link-main-text"> YouTube Kids </span>
            </dropdown-link-main>
            <dropdown-link-main margin-top>
              <icon-base class="dropdown-link-main-icon">
                <icon-youtube />
              </icon-base>
              <span class="dropdown-link-main-text"> Creator Academy </span>
            </dropdown-link-main>
            <dropdown-link-main margin-bottom>
              <icon-base class="dropdown-link-main-icon">
                <icon-youtube />
              </icon-base>
              <span class="dropdown-link-main-text"> YouTube for Artists </span>
            </dropdown-link-main>
          </dropdown-item>
        </dropdown-container>
        <dropdown-container>
          <transparent-button
            :rippleEffect="true"
            :padding="`8px`"
            :margin="`0 8px 0 0`"
            @click="changeDropdownValue('notificationVisible', true)"
          >
            <icon-base class="icon"><icon-notification /></icon-base>
          </transparent-button>
          <dropdown-item
            :visible="dropdownVisibleValues.notificationVisible"
            :direction="'left'"
            class="dropdown-notification-container"
            :onclose="() => changeDropdownValue('notificationVisible', false)"
          >
            <div class="dropdown-notification-header">
              <h1>Notifications</h1>
              <transparent-button
                :rippleEffect="true"
                :padding="`8px`"
                :margin="`0 8px 0 0`"
              >
                <icon-base class="icon"><icon-settings /></icon-base>
              </transparent-button>
            </div>
            <div class="dropdown-notification-item-container">
              <a
                href="#"
                v-for="item in notificationTexts"
                :key="item"
                class="dropdown-notification-item"
              >
                <img
                  src="@/assets/pp2.jpg"
                  class="dropdown-notification-item-pp"
                />
                <span class="dropdown-notification-item-text">{{ item }}</span>
                <img
                  src="@/assets/thumbnail.jpeg"
                  class="dropdown-notification-item-thumb"
                />
              </a>
            </div>
          </dropdown-item>
        </dropdown-container>

        <transparent-button :padding="`0 14px`">
          <avatar-main />
        </transparent-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import IconBase from "@/components/Icon/BaseIcon.vue";
import IconYoutubeMusic from "@/components/Icon/Icons/YoutubeMusic.vue";
import IconYoutubeKids from "@/components/Icon/Icons/YoutubeKids.vue";
import IconYoutube from "@/components/Icon/Icons/Youtube.vue";
import IconYoutubeTv from "@/components/Icon/Icons/YoutubeTV.vue";
import IconApps from "@/components/Icon/Icons/Apps.vue";
import IconAddVideo from "@/components/Icon/Icons/AddVideo.vue";
import IconNotification from "@/components/Icon/Icons/Notification.vue";
import IconSettings from "@/components/Icon/Icons/Settings.vue";
import BarIcon from "@/components/Icon/Icons/Bar.vue";
import IconSearch from "@/components/Icon/Icons/Search.vue";
import TransparentButton from "@/components/Input/Button/TransparentButton/TransparentButton.vue";
import DropdownLinkMain from "@/components/Input/Button/Dropdown/DropdownLinkMain.vue";
import AvatarMain from "@/components/Avatar/AvatarMain/AvatarMain.vue";
import DropdownContainer from "@/components/Dropdown/DropdownContainer/DropdownContainer.vue";
import DropdownItem from "@/components/Dropdown/DropdownItem/DropdownItem.vue";
import MainLogo from "@/components/Logo/LogoMain.vue";

interface DropdownVisibleValues {
  appsVisible: boolean;
  addVideoVisible: boolean;
  notificationVisible: boolean;
}

export default defineComponent({
  name: "Layout",
  components: {
    IconBase,
    BarIcon,
    TransparentButton,
    MainLogo,
    IconSearch,
    IconApps,
    IconAddVideo,
    IconNotification,
    AvatarMain,
    DropdownContainer,
    DropdownItem,
    DropdownLinkMain,
    IconYoutubeTv,
    IconYoutube,
    IconYoutubeMusic,
    IconYoutubeKids,
    IconSettings,
  },
  setup() {
    const dropdownVisibleValues = reactive({
      appsVisible: false,
      addVideoVisible: false,
      notificationVisible: false,
    } as DropdownVisibleValues);

    const notificationTexts = ref<Array<String>>([
      "Albert Einstein just uploaded a video: Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that is stupid.",
      "Albert Einstein just uploaded a video: Logic will get you from A to B. Imagination will take you everywhere.”",
      "Albert Einstein just uploaded a video: I found out atom for the benefit of humanity but they kill each other with it.",
      "Albert Einstein just uploaded a video: Strive not to be a success, but rather to be of value.",
      "Albert Einstein just uploaded a video: Do you wonder what the difference between ignorance and genius is ? A Genius has limits but an ignorant doesn’t have any.",
      "Albert Einstein just uploaded a video: I going holiday to Istanbul with Heisenberg.",
    ]);

    const changeDropdownValue = (
      valueName: "appsVisible" | "addVideoVisible" | "notificationVisible",
      newValue: boolean
    ) => {
      dropdownVisibleValues[valueName] = newValue;
    };
    return { dropdownVisibleValues, changeDropdownValue, notificationTexts };
  },
});
</script>

<style lang="scss" scoped>
.layout {
  overflow-x: hidden;
  min-height: 100vh;
  & .icon {
    z-index: 1;
  }
  .navbar {
    height: 56px;
    width: 100vw;
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
      display: flex;
      width: 100%;
      max-width: 640px;
      min-width: 136px;

      & .search-bar {
        height: 26px;
        width: 100%;
        padding: 2px 10px;
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

      & .search-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 72.5px;
        padding: 1px 6px;
        background: var(--searchbtn-bg-color);
        outline: none;
        border: 1px solid var(--searchbtn-border-color);
        cursor: pointer;
        & .search-icon g {
          fill: var(--search-icon-color);
        }

        &:hover {
          & .search-icon g {
            fill: var(--search-icon-hover-color);
          }

          background: var(--searchbtn-bg-hover-color);
          border: 1px solid var(--searchbtn-hover-border-color);
        }
        &:focus {
          background: var(--searchbtn-bg-focus-color);
        }
      }
    }

    & .navbar-right {
      display: flex;
      margin-right: 20px;

      & .dropdown-item-links {
        width: 220px;
      }

      & button {
        margin-right: 8px;
      }

      & g {
        fill: var(--white);
      }

      & .dropdown-notification-container {
        width: 478px;
        max-height: 642px;
        height: 100vh;
        & .dropdown-notification-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 49px;
          border-bottom: 1px solid var(--border-color);
          & h1 {
            margin-left: 16px;
          }
        }

        & .dropdown-notification-item-container {
          overflow-y: scroll;
          max-height: 592px;
          height: 100%;
          & .dropdown-notification-item {
            padding: 16px 16px 16px 0;
            display: flex;

            &:hover {
              background: var(--bg-hover);
            }

            & .dropdown-notification-item-pp {
              width: 48px;
              height: 48px;
              margin: 0 16px;
              border-radius: 50%;
            }

            & .dropdown-notification-item-text {
              display: inline-block;
              letter-spacing: 0.2px;
              padding-bottom: 8px;
              line-height: 20px;
              font-size: 15px;
              width: 232px;
            }

            & .dropdown-notification-item-thumb {
              margin: 0 16px;
              width: 86px;
              max-height: 64.5px;
              object-fit: contain;
            }
          }
        }
      }
    }
  }
}
</style>
