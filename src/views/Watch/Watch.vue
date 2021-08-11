<template>
  <layout :sidebarBlock="false">
    <div class="container">
      <div class="video-container" @click="(e) => onTogglePlay(e)">
        <div class="video-menu-container">
          <div
            class="video-progressbar-container"
            ref="videoProgressBarEl"
            @mousemove="(e) => onHoverProgressBar(e)"
            @click="(e) => onChangeTime(e)"
          >
            <span ref="videoProgressedBarEl" class="video-progressed"></span>
            <span ref="videoProgressPoint" class="video-progress-point"></span>
            <span ref="videoProgressTime" class="video-progress-time">{{
              videoValues.videoHoverTime.value
            }}</span>
          </div>

          <div class="video-controls">
            <div class="video-controls-left">
              <!-- PLAY PAUSE BUTTON -->
              <detail-video-popup-container>
                <button
                  v-show="!videoValues.isVideoPlaying.value"
                  class="video-play-pause"
                  @click="onTogglePlayWithButton()"
                >
                  <icon-base
                    :viewBox="'0 0 36 36'"
                    :width="'46px'"
                    :height="'40px'"
                    class="video-controls-icon"
                  >
                    <icon-play />
                  </icon-base>
                </button>
                <button
                  v-show="videoValues.isVideoPlaying.value"
                  class="video-play-pause"
                  @click="onTogglePlayWithButton()"
                >
                  <icon-base
                    :viewBox="'0 0 36 36'"
                    :width="'46px'"
                    :height="'40px'"
                    class="video-controls-icon"
                  >
                    <icon-pause />
                  </icon-base>
                </button>
                <detail-video-popup-item :left="'8px'" :vDirection="'top'">
                  {{ videoValues.isVideoPlaying.value ? "Pause" : "Play" }}
                </detail-video-popup-item>
              </detail-video-popup-container>
              <!-- NEXT VIDEO BUTTON -->
              <detail-video-popup-container>
                <button class="video-controls-button">
                  <icon-base
                    :viewBox="'0 0 36 36'"
                    :width="'46px'"
                    :height="'40px'"
                    class="video-controls-icon"
                  >
                    <icon-next-video />
                  </icon-base>
                </button>
                <detail-video-popup-item :left="'-8px'" :vDirection="'top'">
                  Next video
                </detail-video-popup-item>
              </detail-video-popup-container>
              <!-- VOLUME -->
              <div
                @mouseover="onVolumeMouseOver()"
                @mouseout="onVolumeMouseOut()"
                class="video-volume-container"
              >
                <detail-video-popup-container>
                  <button
                    class="video-controls-button"
                    v-show="videoValues.volumeLevel.value === 'max'"
                    @click="onToggleMute()"
                  >
                    <icon-base
                      :viewBox="'0 0 36 36'"
                      :width="'46px'"
                      :height="'40px'"
                      class="video-controls-icon"
                    >
                      <icon-volume-max />
                    </icon-base>
                  </button>
                  <button
                    class="video-controls-button"
                    v-show="videoValues.volumeLevel.value === 'min'"
                    @click="onToggleMute()"
                  >
                    <icon-base
                      :viewBox="'0 0 36 36'"
                      :width="'46px'"
                      :height="'40px'"
                      class="video-controls-icon"
                    >
                      <icon-volume-min />
                    </icon-base>
                  </button>
                  <button
                    class="video-controls-button"
                    v-show="videoValues.volumeLevel.value === 'mute'"
                    @click="onToggleMute()"
                  >
                    <icon-base
                      :viewBox="'0 0 36 36'"
                      :width="'46px'"
                      :height="'40px'"
                      class="video-controls-icon"
                    >
                      <icon-volume-mute />
                    </icon-base>
                  </button>
                  <detail-video-popup-item :left="'-8px'" :vDirection="'top'">
                    {{
                      videoValues.volumeLevel.value === "mute"
                        ? "Unmute"
                        : "Mute"
                    }}
                  </detail-video-popup-item>
                </detail-video-popup-container>
                <div
                  class="video-volume-input-container"
                  :class="{
                    'volume-mouseover-active':
                      videoValues.volumeMouseOver.value,
                    'volume-mouseover-deactive':
                      !videoValues.volumeMouseOver.value,
                  }"
                >
                  <input
                    class="video-volume-input-track"
                    ref="videoVolumeTrackEl"
                    type="range"
                    :value="videoValues.volume.value"
                  />
                  <input
                    class="video-volume-input-thumb"
                    @input="(e) => onChangeVolume(e)"
                    type="range"
                    ref="videoVolumeThumbEl"
                    min="0"
                    max="100"
                    :value="videoValues.volume.value"
                  />
                </div>
              </div>

              <!-- TIME -->
              <span class="video-time">
                {{ videoValues.currentTime.value || "00:00" }} /
                {{ videoValues.durationTime.value || "00:00" }}
              </span>
            </div>

            <div class="video-controls-right">
              <!-- SETTINGS -->
              <detail-video-popup-container>
                <button class="video-controls-button">
                  <icon-base
                    :viewBox="'0 0 36 36'"
                    :width="'46px'"
                    :height="'40px'"
                    class="video-controls-icon"
                  >
                    <icon-video-settings />
                  </icon-base>
                </button>
                <detail-video-popup-item :left="'-12px'" :vDirection="'top'">
                  Settings
                </detail-video-popup-item>
              </detail-video-popup-container>
              <!-- Mini Player -->
              <detail-video-popup-container>
                <button class="video-controls-button">
                  <icon-base
                    :viewBox="'0 0 36 36'"
                    :width="'46px'"
                    :height="'40px'"
                    class="video-controls-icon"
                  >
                    <icon-mini-player />
                  </icon-base>
                </button>
                <detail-video-popup-item :left="'-18px'" :vDirection="'top'">
                  Miniplayer
                </detail-video-popup-item>
              </detail-video-popup-container>
              <!-- Small/Large View -->
              <detail-video-popup-container>
                <button
                  v-show="videoValues.viewMode.value === 'large'"
                  class="video-controls-button"
                >
                  <icon-base
                    :viewBox="'0 0 36 36'"
                    :width="'46px'"
                    :height="'40px'"
                    class="video-controls-icon"
                  >
                    <icon-small-view />
                  </icon-base>
                </button>
                <button
                  v-show="videoValues.viewMode.value === 'default'"
                  class="video-controls-button"
                >
                  <icon-base
                    :viewBox="'0 0 36 36'"
                    :width="'46px'"
                    :height="'40px'"
                    class="video-controls-icon"
                  >
                    <icon-large-view />
                  </icon-base>
                </button>
                <detail-video-popup-item :left="'-25px'" :vDirection="'top'">
                  {{
                    videoValues.viewMode.value === "large"
                      ? "Large view"
                      : "Default view"
                  }}
                </detail-video-popup-item>
              </detail-video-popup-container>
              <!-- Full/Normal Screen -->
              <detail-video-popup-container>
                <button
                  v-show="videoValues.fullscreen.value"
                  class="video-controls-button video-screen-button"
                >
                  <icon-base
                    :viewBox="'0 0 36 36'"
                    :width="'46px'"
                    :height="'40px'"
                    class="video-controls-icon"
                  >
                    <icon-normal-screen />
                  </icon-base>
                </button>
                <button
                  v-show="!videoValues.fullscreen.value"
                  class="video-controls-button video-screen-button"
                >
                  <icon-base
                    :viewBox="'0 0 36 36'"
                    :width="'46px'"
                    :height="'40px'"
                    class="video-controls-icon"
                  >
                    <icon-full-screen />
                  </icon-base>
                </button>
                <detail-video-popup-item
                  :hDirection="'left'"
                  :vDirection="'top'"
                >
                  {{
                    videoValues.fullscreen.value
                      ? "Exit full screen"
                      : "Full screen"
                  }}
                </detail-video-popup-item>
              </detail-video-popup-container>
            </div>
          </div>
        </div>
        <video
          ref="videoEl"
          autoplay
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          class="video"
          @timeupdate="onTimeUpdate()"
        />
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";

// COMPONENTS
import Layout from "@/components/Layout/Layout.vue";
import DetailVideoPopupContainer from "@/components/Popup/DetailVideoPopupContainer.vue";
import DetailVideoPopupItem from "@/components/Popup/DetailVideoPopupItem.vue";

// ICONS
import IconBase from "@/components/Icon/BaseIcon.vue";
import IconPlay from "@/components/Icon/Icons/Play.vue";
import IconPause from "@/components/Icon/Icons/Pause.vue";
import IconNextVideo from "@/components/Icon/Icons/NextVideo.vue";
import IconVolumeMax from "@/components/Icon/Icons/VolumeMax.vue";
import IconVolumeMin from "@/components/Icon/Icons/VolumeMin.vue";
import IconVolumeMute from "@/components/Icon/Icons/VolumeMute.vue";
import IconVideoSettings from "@/components/Icon/Icons/VideoSettings.vue";
import IconMiniPlayer from "@/components/Icon/Icons/MiniPlayer.vue";
import IconSmallView from "@/components/Icon/Icons/SmallView.vue";
import IconLargeView from "@/components/Icon/Icons/LargeView.vue";
import IconFullScreen from "@/components/Icon/Icons/FullScreen.vue";
import IconNormalScreen from "@/components/Icon/Icons/NormalScreen.vue";

// UTILS
import { secondsToHMS } from "@/utils/secondsToHMS";

export default defineComponent({
  name: "Watch",
  components: {
    // COMPONENTS
    Layout,
    DetailVideoPopupContainer,
    DetailVideoPopupItem,
    // ICONS
    IconBase,
    IconPlay,
    IconPause,
    IconNextVideo,
    IconVolumeMax,
    IconVolumeMin,
    IconVolumeMute,
    IconVideoSettings,
    IconMiniPlayer,
    IconSmallView,
    IconLargeView,
    IconFullScreen,
    IconNormalScreen,
  },
  setup() {
    interface VideoValues {
      currentTime: string;
      durationTime: string;
      videoHoverTime: string;
      volumeLevel: "max" | "min" | "mute";
      isVideoPlaying: boolean;
      volume: number;
      volumeMouseOver: boolean;
      viewMode: "large" | "default";
      fullscreen: boolean;
    }
    const videoValuesReactive = reactive<VideoValues>({
      currentTime: "",
      durationTime: "",
      videoHoverTime: "",
      isVideoPlaying: true,
      volumeLevel: "max",
      volume: 50,
      volumeMouseOver: false,
      viewMode: "default",
      fullscreen: false,
    });
    const videoValues = toRefs<VideoValues>(videoValuesReactive);

    const videoEl = ref<HTMLVideoElement>();
    const videoProgressedBarEl = ref<HTMLSpanElement>();
    const videoProgressBarEl = ref<HTMLElement>();
    const videoProgressPoint = ref<HTMLElement>();
    const videoProgressTime = ref<HTMLElement>();
    const videoVolumeTrackEl = ref<HTMLInputElement>();
    const videoVolumeThumbEl = ref<HTMLInputElement>();

    // PROGRESS BAR AND TIME BEGIN

    const currentTime = () => {
      let currentMinutes = Math.floor(videoEl.value!.currentTime / 60);
      let currentSeconds = Math.floor(
        videoEl.value!.currentTime - currentMinutes * 60
      );
      let durationMinutes = Math.floor(videoEl.value!.duration / 60);
      let durationSeconds = Math.floor(
        videoEl.value!.duration - durationMinutes * 60
      );

      videoValuesReactive.currentTime = `${currentMinutes}:${
        currentSeconds < 10 ? "0" + currentSeconds : currentSeconds
      }`;
      videoValuesReactive.durationTime = `${durationMinutes}:${durationSeconds}`;
    };

    const progressedBarWidth = () => {
      const percentage =
        (videoEl.value!.currentTime / videoEl.value!.duration) * 100;
      videoProgressedBarEl.value!.style.width = `${percentage}%`;
    };

    const progressBarPoint = () => {
      // const left =
      //   (videoEl.value!.currentTime / videoEl.value!.duration) * 1498;

      const left = videoProgressedBarEl.value!.offsetWidth - 6.5;

      videoProgressPoint.value!.style.transform = `translateX(${left}px)`;
    };

    const onTimeUpdate = () => {
      currentTime();
      progressedBarWidth();
      progressBarPoint();
    };

    const onHoverProgressBar = (e: MouseEvent) => {
      const seconds =
        ((e.clientX - 12) / videoProgressBarEl.value!.clientWidth) *
        videoEl.value!.duration;

      const hms = secondsToHMS(seconds);
      videoValuesReactive.videoHoverTime = hms;

      // Set left value of progress bar time show element
      videoProgressTime.value!.style.left = `${
        e.clientX - videoProgressTime.value!.offsetWidth
      }px`;
    };

    // PROGRESS BAR AND TIME END

    const onTogglePlay = (e: MouseEvent) => {
      if ((e.target as HTMLElement).className !== "video") {
        return;
      }
      if (videoValuesReactive.isVideoPlaying) {
        videoEl.value?.pause();
        return (videoValuesReactive.isVideoPlaying = false);
      }
      videoEl.value?.play();
      return (videoValuesReactive.isVideoPlaying = true);
    };

    const onTogglePlayWithButton = () => {
      if (videoValuesReactive.isVideoPlaying) {
        videoEl.value?.pause();
        return (videoValuesReactive.isVideoPlaying = false);
      }
      videoEl.value?.play();
      return (videoValuesReactive.isVideoPlaying = true);
    };

    const onChangeTime = (e: MouseEvent) => {
      e.preventDefault();
      const progressTime =
        (e.offsetX / videoProgressBarEl.value!.offsetWidth) *
        videoEl.value!.duration;
      return (videoEl.value!.currentTime = progressTime);
    };

    // VOLUME BEGIN

    const onChangeVolume = () => {
      setVolumeLevel();
    };

    const setVolumeLevel = () => {
      const videoVolumeThumb = <HTMLInputElement>videoVolumeThumbEl.value;
      const newVolume = Number(videoVolumeThumb.value);
      videoValuesReactive.volume = newVolume;

      // volumeLevel value change bug fix
      setTimeout(() => {
        return (videoEl.value!.volume = newVolume / 100);
      }, 0);

      if (newVolume >= 50) {
        return (videoValuesReactive.volumeLevel = "max");
      }
      if (newVolume < 50 && newVolume !== 0) {
        return (videoValuesReactive.volumeLevel = "min");
      }
      return (videoValuesReactive.volumeLevel = "mute");
    };

    const setVolumeInputValue = (newValue: number | string) => {
      const videoVolumeThumb = <HTMLInputElement>videoVolumeThumbEl.value;
      const videoVolumeTrack = <HTMLInputElement>videoVolumeTrackEl.value;
      const newVolume = String(newValue);

      videoVolumeThumb.value = newVolume;
      videoVolumeTrack.value = newVolume;
    };

    onMounted(() => {
      return (videoEl.value!.volume =
        Number(videoVolumeTrackEl.value!.value) / 100);
    });

    const onToggleMute = () => {
      const video = videoEl.value as HTMLVideoElement;
      const volume = video.volume;
      if (videoValuesReactive.volumeLevel !== "mute") {
        localStorage.setItem("muteBeforeVolumeLevel", String(volume));
        video.volume = 0;
        setVolumeInputValue(0);
        onChangeVolume();
        return;
      }
      video.volume = Number(localStorage.getItem("muteBeforeVolumeLevel"));
      const newVolumeInputValue = String(
        Number(localStorage.getItem("muteBeforeVolumeLevel")) * 100
      );
      setVolumeInputValue(newVolumeInputValue);
      localStorage.removeItem("muteBeforeVolumeLevel");
      onChangeVolume();
      return;
    };

    const onVolumeMouseOver = () => {
      return (videoValuesReactive.volumeMouseOver = true);
    };

    const onVolumeMouseOut = () => {
      return (videoValuesReactive.volumeMouseOver = false);
    };

    // VOLUME END
    return {
      onTimeUpdate,
      videoEl,
      videoProgressBarEl,
      videoProgressedBarEl,
      videoProgressPoint,
      videoProgressTime,
      videoVolumeTrackEl,
      videoVolumeThumbEl,
      videoValues,
      onTogglePlay,
      onChangeTime,
      onHoverProgressBar,
      onChangeVolume,
      onToggleMute,
      onVolumeMouseOver,
      onVolumeMouseOut,
      onTogglePlayWithButton,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  & .video-container {
    position: relative;
    width: 100%;
    height: calc((9 / 16) * 100vw);
    max-height: calc(100vh - 169px);
    background: var(--video-bg);

    & .video-menu-container {
      position: absolute;
      width: 100%;
      bottom: 0;
      z-index: var(--video-menu-z);

      & .video-progressbar-container {
        --progressbar-height: 3px;
        position: relative;
        cursor: pointer;
        width: calc(100% - 24px);
        margin: 0 auto;
        height: var(--progressbar-height);
        background: var(--video-pb-bg);

        &:hover {
          --progressbar-height: 5px;

          & .video-progress-point,
          & .video-progress-time {
            display: inherit;
          }
        }

        & .video-progressed {
          position: absolute;
          top: 0;
          left: 0;
          height: var(--progressbar-height);
          background: var(--yt-red);
        }
        & .video-progress-point {
          display: none;
          position: absolute;
          top: -4px;
          height: 13px;
          width: 13px;
          border-radius: 50%;
          background: var(--yt-red);
        }

        & .video-progress-time {
          display: none;
          position: absolute;
          top: -30px;
          color: var(--video-hover-time-color);
          font-weight: 500;
          font-size: 13px;
        }
      }

      & .video-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;

        & .video-controls-left,
        &.video-controls-right {
          display: flex;
          align-items: center;
        }

        & .video-controls-icon {
          fill: var(--video-controls-icon-color);
        }

        & .video-play-pause {
          width: 46px;
          height: 40px;
          margin-left: 6px;
        }

        .base-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          padding: 0;
        }

        & .video-controls-button {
          @extend .base-button;
        }

        & .video-volume-container {
          display: flex;
          align-items: center;
          & .video-volume-input-container {
            position: relative;
            margin-bottom: 10px;
            transition: width 0.2s;

            & input {
              -webkit-appearance: none;
              height: 5px;
              background: transparent;
              position: absolute;
              top: 0;
              left: 0;
              transition: width 0.2s;
            }

            &.volume-mouseover-active {
              width: 64px;
              visibility: visible;
              & input {
                width: 100%;
              }
            }
            &.volume-mouseover-deactive {
              width: 0px;
              visibility: hidden;
              & input {
                width: 100%;
              }
            }

            & input::-webkit-slider-thumb {
              -webkit-appearance: none;
            }

            & input::-webkit-slider-runnable-track {
              width: 100%;
              height: 3px;
            }
            & input::-webkit-slider-thumb {
              -webkit-appearance: none;
            }

            & input::-moz-range-track {
              width: 100%;
              height: 3px;
            }

            & input:focus {
              outline: none;
            }

            & .video-volume-input-track {
              pointer-events: none;
            }

            & .video-volume-input-track::-webkit-slider-runnable-track {
              background: var(--video-pb-bg);
              border-radius: 6px;
              overflow: hidden;
            }

            & .video-volume-input-track::-moz-range-track {
              background: var(--video-pb-bg);
              border-radius: 6px;
              overflow: hidden;
            }

            & .video-volume-input-track::-webkit-slider-thumb {
              -webkit-appearance: none;
              background: transparent;
              height: 1px;
              width: 1px;
              box-shadow: -600px 0 0 600px var(--video-volume-range);
            }

            & .video-volume-input-thumb::-webkit-slider-runnable-track {
              background: transparent;
              cursor: pointer;
            }
            & .video-volume-input-thumb::-moz-range-track {
              cursor: pointer;
            }

            & .video-volume-input-thumb::-webkit-slider-thumb {
              -webkit-appearance: none;
              border-radius: 20px;
              height: 13px;
              width: 13px;
              background: var(--video-volume-range);
              cursor: pointer;
              margin: -5px 0px 0px 0px;
            }
          }
        }

        & .video-time {
          display: inline-block;
          color: var(--video-time-color);
          font-size: 13px;
          line-height: 39px;
          margin-left: 10px;
          transition: transform 0.2s;
        }

        & .video-screen-button {
          margin-right: 15px;
        }
      }
    }

    & .video {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
