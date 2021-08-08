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
import Layout from "@/components/Layout/Layout.vue";
import { secondsToHMS } from "@/utils/secondsToHMS";

export default defineComponent({
  name: "Home",
  components: {
    Layout,
  },
  setup() {
    interface VideoValues {
      currentTime: string;
      durationTime: string;
      videoHoverTime: string;
      isVideoPlaying: boolean;
    }
    const videoValuesReactive = reactive<VideoValues>({
      currentTime: "",
      durationTime: "",
      videoHoverTime: "",
      isVideoPlaying: true,
    });
    const videoValues = toRefs<VideoValues>(videoValuesReactive);

    const videoEl = ref<HTMLVideoElement>();
    const videoProgressedBarEl = ref<HTMLSpanElement>();
    const videoProgressBarEl = ref<HTMLElement>();
    const videoProgressPoint = ref<HTMLElement>();
    const videoProgressTime = ref<HTMLElement>();

    // PROGRESS BAR AND TIME BEGIN

    const currentTime = () => {
      let currentMinutes = Math.floor(videoEl.value!.currentTime / 60);
      let currentSeconds = Math.floor(
        videoEl.value!.currentTime - currentMinutes * 60
      );
      let durationMinutes = Math.floor(videoEl.value!.currentTime / 60);
      let durationSeconds = Math.floor(
        videoEl.value!.currentTime - durationMinutes * 60
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
      const left =
        (videoEl.value!.currentTime / videoEl.value!.duration) * 1498;

      videoProgressPoint.value!.style.transform = `translateX(${left}px)`;
    };

    const onTimeUpdate = () => {
      currentTime();
      progressedBarWidth();
      progressBarPoint();
    };

    const onHoverProgressBar = (e: MouseEvent) => {
      const seconds =
        (e.clientX / (videoProgressBarEl.value!.offsetWidth - 24)) *
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

    const onChangeTime = (e: MouseEvent) => {
      e.preventDefault();
      const progressTime =
        (e.offsetX / videoProgressBarEl.value!.offsetWidth) *
        videoEl.value!.duration;
      videoEl.value!.currentTime = progressTime;
    };
    return {
      onTimeUpdate,
      videoEl,
      videoProgressBarEl,
      videoProgressedBarEl,
      videoProgressPoint,
      videoProgressTime,
      videoValues,
      onTogglePlay,
      onChangeTime,
      onHoverProgressBar,
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
    }

    & .video {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
