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
              <button class="video-next-video">
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
            <!-- VOLUME BUTTON -->
            <detail-video-popup-container>
              <button
                class="video-volume"
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
                class="video-volume"
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
                class="video-volume"
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
                  videoValues.volumeLevel.value === "mute" ? "Unmute" : "Mute"
                }}
              </detail-video-popup-item>
            </detail-video-popup-container>
            <div class="video-volume-input-container">
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
            <!-- TIME -->
            <span class="video-time">
              {{ videoValues.currentTime.value || "00:00" }} /
              {{ videoValues.durationTime.value || "00:00" }}
            </span>
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
import { defineComponent, reactive, ref, toRefs } from "vue";

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
  },
  setup() {
    interface VideoValues {
      currentTime: string;
      durationTime: string;
      videoHoverTime: string;
      volumeLevel: "max" | "min" | "mute";
      isVideoPlaying: boolean;
      volume: number;
    }
    const videoValuesReactive = reactive<VideoValues>({
      currentTime: "",
      durationTime: "",
      videoHoverTime: "",
      isVideoPlaying: true,
      volumeLevel: "max",
      volume: 50,
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

    const onToggleMute = () => {
      const video = videoEl.value as HTMLVideoElement;
      const volume = video.volume;
      if (videoValuesReactive.volumeLevel !== "mute") {
        localStorage.setItem("muteBeforeVolumeLevel", String(video.volume));
        video.volume = 0;
        onChangeVolume();
        return;
      }
      if (!localStorage.getItem("muteBeforeVolumeLevel")) {
        return;
      }
      video.volume = Number(localStorage.getItem("muteBeforeVolumeLevel"));
      localStorage.removeItem("muteBeforeVolumeLevel");
      onChangeVolume();
      return;
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
        & .video-controls-icon {
          fill: var(--video-controls-icon-color);
        }

        & .video-play-pause {
          width: 46px;
          height: 40px;
          margin-left: 6px;
        }

        .base-button {
          width: 40px;
          height: 40px;
          padding: 0;
        }

        & .video-volume,
        & .video-next-video {
          @extend .base-button;
        }

        & .video-volume-input-container {
          position: relative;
          width: 64px;
          margin-bottom: 10px;

          & input {
            -webkit-appearance: none;
            width: 64px;
            height: 5px;
            background: transparent;
            position: absolute;
            top: 0;
            left: 0;
          }

          & input::-webkit-slider-thumb {
            -webkit-appearance: none;
          }

          & input:focus {
            outline: none;
          }

          & input::-webkit-slider-runnable-track {
            width: 100%;
            height: 3px;
          }

          & .video-volume-input-track {
            pointer-events: none;
          }

          & .video-volume-input-track::-webkit-slider-runnable-track {
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

        & .video-time {
          display: inline-block;
          color: var(--video-time-color);
          font-size: 13px;
          line-height: 39px;
          margin-left: 10px;
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
