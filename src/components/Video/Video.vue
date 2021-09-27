<template>
  <div
    class="video-container"
    :class="{
      'video-container-fullscreen': isFullscreen,
      'video-container-default-view': viewMode === 'default',
    }"
    @click="(e) => onTogglePlay(e)"
    @mouseout="onMouseOutVideoContainer()"
    @mousemove="onHoverVideo()"
  >
    <div class="video-interaction-container">
      <span
        class="video-interaction-center"
        :class="{
          'video-play-progress': videoValues.isVideoPlaying.value,
        }"
      >
        <icon-base
          :viewBox="'0 0 36 36'"
          :height="'40px'"
          :width="'40px'"
          class="video-interaction-icon"
        >
          <icon-play />
        </icon-base>
      </span>
      <span
        class="video-interaction-center"
        :class="{
          'video-pause-progress': !videoValues.isVideoPlaying.value,
        }"
      >
        <icon-base
          :viewBox="'0 0 36 36'"
          :height="'40px'"
          :width="'40px'"
          class="video-interaction-icon"
        >
          <icon-pause />
        </icon-base>
      </span>
    </div>
    <div
      class="video-title"
      :class="{
        'video-title-visible': videoValues.showControls.value && isFullscreen,
        'video-title-hidden': !videoValues.showControls.value || !isFullscreen,
      }"
    >
      Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit
      aliquet elit, eget tincidunt nibh pulvinar a.
    </div>
    <div
      class="video-gradient-bottom"
      v-show="videoValues.showControls.value"
    ></div>
    <div
      class="video-menu-container"
      :class="{
        'video-menu-container-visible': videoValues.showControls.value,
        'video-menu-container-hidden': !videoValues.showControls.value,
      }"
    >
      <div
        class="video-progressbar-container"
        ref="videoProgressBarEl"
        @mousemove="(e) => onHoverProgressBar(e)"
        @click="(e) => onChangeTime(e)"
      >
        <span ref="videoProgressedBarEl" class="video-progressed"></span>
        <span ref="videoFetchedBarEl" class="video-fetched"></span>
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
              class="video-play-pause video-play-button"
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
              class="video-play-pause video-pause-button"
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
                  videoValues.volumeLevel.value === "mute" ? "Unmute" : "Mute"
                }}
              </detail-video-popup-item>
            </detail-video-popup-container>
            <div
              class="video-volume-input-container"
              :class="{
                'volume-mouseover-active': videoValues.volumeMouseOver.value,
                'volume-mouseover-deactive': !videoValues.volumeMouseOver.value,
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
          <card-options-container>
            <detail-video-popup-container>
              <button
                @click="onSettingsToggle(true)"
                class="video-controls-button"
              >
                <icon-base
                  :viewBox="'0 0 36 36'"
                  :width="'46px'"
                  :height="'40px'"
                  class="video-controls-icon video-settings"
                  :class="{
                    'video-settings-visible': videoValues.settingsVisible.value,
                  }"
                >
                  <icon-video-settings />
                </icon-base>
              </button>
              <detail-video-popup-item :left="'-12px'" :vDirection="'top'">
                Settings
              </detail-video-popup-item>
            </detail-video-popup-container>
            <card-options-item
              :left="'-100px'"
              :visible="videoValues.settingsVisible.value"
              :onclose="() => onSettingsToggle(false)"
              :contentLeft="
                settingsValues.isSubmenuOpen.value ? '-100%' : '0px'
              "
            >
              <card-options-button
                @click="onOpenPlaybackSpeedMenu()"
                margin-top
              >
                <template #left> Playback speed </template>
                <template #right>
                  {{
                    videoValues.playbackRate.value === 1
                      ? "Normal"
                      : videoValues.playbackRate.value
                  }}
                </template>
              </card-options-button>
              <card-options-button margin-bottom>
                <template #left> Quality </template>
                <template #right> 1080p </template>
              </card-options-button>
              <template #menu>
                <div v-show="settingsValues.isPlaybackSpeedMenuOpen.value">
                  <card-options-header-button
                    :onBack="() => onClosePlaybackSpeedMenu()"
                    >Playback speed</card-options-header-button
                  >
                  <card-options-button
                    @click="setVideoSpeed(0.25)"
                    margin-top
                    :showArrow="false"
                  >
                    <template #left>
                      <div class="card-speed-select-container">
                        <div
                          :style="{
                            visibility:
                              videoValues.playbackRate.value === 0.25
                                ? 'visible'
                                : 'hidden',
                          }"
                          class="card-speed-select-icon"
                        >
                          <icon-base :width="'20px'" :height="'20px'">
                            <icon-approved />
                          </icon-base>
                        </div>
                        <div class="card-speed-select-text">0.25</div>
                      </div>
                    </template>
                  </card-options-button>
                  <card-options-button
                    @click="setVideoSpeed(0.5)"
                    :showArrow="false"
                  >
                    <template #left>
                      <div class="card-speed-select-container">
                        <div
                          :style="{
                            visibility:
                              videoValues.playbackRate.value === 0.5
                                ? 'visible'
                                : 'hidden',
                          }"
                          class="card-speed-select-icon"
                        >
                          <icon-base :width="'20px'" :height="'20px'">
                            <icon-approved />
                          </icon-base>
                        </div>
                        <div class="card-speed-select-text">0.5</div>
                      </div>
                    </template>
                  </card-options-button>
                  <card-options-button
                    @click="setVideoSpeed(0.75)"
                    :showArrow="false"
                  >
                    <template #left>
                      <div class="card-speed-select-container">
                        <div
                          :style="{
                            visibility:
                              videoValues.playbackRate.value === 0.75
                                ? 'visible'
                                : 'hidden',
                          }"
                          class="card-speed-select-icon"
                        >
                          <icon-base :width="'20px'" :height="'20px'">
                            <icon-approved />
                          </icon-base>
                        </div>
                        <div class="card-speed-select-text">0.75</div>
                      </div>
                    </template>
                  </card-options-button>
                  <card-options-button
                    @click="setVideoSpeed(1)"
                    :showArrow="false"
                  >
                    <template #left>
                      <div class="card-speed-select-container">
                        <div
                          :style="{
                            visibility:
                              videoValues.playbackRate.value === 1
                                ? 'visible'
                                : 'hidden',
                          }"
                          class="card-speed-select-icon"
                        >
                          <icon-base :width="'20px'" :height="'20px'">
                            <icon-approved />
                          </icon-base>
                        </div>
                        <div class="card-speed-select-text">Normal</div>
                      </div>
                    </template>
                  </card-options-button>
                  <card-options-button
                    @click="setVideoSpeed(1.25)"
                    :showArrow="false"
                  >
                    <template #left>
                      <div class="card-speed-select-container">
                        <div
                          :style="{
                            visibility:
                              videoValues.playbackRate.value === 1.25
                                ? 'visible'
                                : 'hidden',
                          }"
                          class="card-speed-select-icon"
                        >
                          <icon-base :width="'20px'" :height="'20px'">
                            <icon-approved />
                          </icon-base>
                        </div>
                        <div class="card-speed-select-text">1.25</div>
                      </div>
                    </template>
                  </card-options-button>
                  <card-options-button
                    @click="setVideoSpeed(1.5)"
                    :showArrow="false"
                  >
                    <template #left>
                      <div class="card-speed-select-container">
                        <div
                          :style="{
                            visibility:
                              videoValues.playbackRate.value === 1.5
                                ? 'visible'
                                : 'hidden',
                          }"
                          class="card-speed-select-icon"
                        >
                          <icon-base :width="'20px'" :height="'20px'">
                            <icon-approved />
                          </icon-base>
                        </div>
                        <div class="card-speed-select-text">1.5</div>
                      </div>
                    </template>
                  </card-options-button>
                  <card-options-button
                    @click="setVideoSpeed(1.75)"
                    :showArrow="false"
                  >
                    <template #left>
                      <div class="card-speed-select-container">
                        <div
                          :style="{
                            visibility:
                              videoValues.playbackRate.value === 1.75
                                ? 'visible'
                                : 'hidden',
                          }"
                          class="card-speed-select-icon"
                        >
                          <icon-base :width="'20px'" :height="'20px'">
                            <icon-approved />
                          </icon-base>
                        </div>
                        <div class="card-speed-select-text">1.75</div>
                      </div>
                    </template>
                  </card-options-button>
                  <card-options-button
                    @click="setVideoSpeed(2)"
                    margin-bottom
                    :showArrow="false"
                  >
                    <template #left>
                      <div class="card-speed-select-container">
                        <div
                          :style="{
                            visibility:
                              videoValues.playbackRate.value === 2
                                ? 'visible'
                                : 'hidden',
                          }"
                          class="card-speed-select-icon"
                        >
                          <icon-base :width="'20px'" :height="'20px'">
                            <icon-approved />
                          </icon-base>
                        </div>
                        <div class="card-speed-select-text">2</div>
                      </div>
                    </template>
                  </card-options-button>
                </div>
              </template>
            </card-options-item>
          </card-options-container>
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
              @click="toggleViewMode()"
              v-show="viewMode === 'large'"
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
              v-show="viewMode === 'default'"
              class="video-controls-button"
              @click="toggleViewMode()"
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
              {{ viewMode === "large" ? "Large view" : "Default view" }}
            </detail-video-popup-item>
          </detail-video-popup-container>
          <!-- Full/Normal Screen -->
          <detail-video-popup-container>
            <button
              v-show="isFullscreen"
              class="video-controls-button video-screen-button"
              @click="toggleFullScreen(false)"
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
              v-show="!isFullscreen"
              class="video-controls-button video-screen-button"
              @click="toggleFullScreen(true)"
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
            <detail-video-popup-item :hDirection="'left'" :vDirection="'top'">
              {{ isFullscreen ? "Exit full screen" : "Full screen" }}
            </detail-video-popup-item>
          </detail-video-popup-container>
        </div>
      </div>
    </div>
    <video
      preload="metadata"
      ref="videoEl"
      autoplay
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
      class="video"
      @timeupdate="onTimeUpdate()"
      @dblclick="toggleFullScreen()"
      @progress="onProgress()"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import { useStore } from "vuex";

// COMPONENTS
import Layout from "@/components/Layout/Layout.vue";
import DetailVideoPopupContainer from "@/components/Popup/DetailVideoPopupContainer.vue";
import DetailVideoPopupItem from "@/components/Popup/DetailVideoPopupItem.vue";
import CardOptionsContainer from "@/components/Card/CardOptions/CardOptionsContainer.vue";
import CardOptionsItem from "@/components/Card/CardOptions/CardOptionsItem.vue";
import CardOptionsButton from "@/components/Input/Button/Card/CardOptions/CardOptionsButton.vue";
import CardOptionsHeaderButton from "@/components/Input/Button/Card/CardOptions/CardOptionsHeaderButton.vue";

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
import IconApproved from "@/components/Icon/Icons/Approved.vue";

// UTILS
import { secondsToHMS } from "@/utils/secondsToHMS";

export default defineComponent({
  name: "Video",
  components: {
    // COMPONENTS
    Layout,
    DetailVideoPopupContainer,
    DetailVideoPopupItem,
    CardOptionsContainer,
    CardOptionsItem,
    CardOptionsButton,
    CardOptionsHeaderButton,
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
    IconApproved,
  },
  setup() {
    const store = useStore();

    interface VideoValues {
      currentTime: string;
      durationTime: string;
      videoHoverTime: string;
      volumeLevel: "max" | "min" | "mute";
      isVideoPlaying: boolean;
      volume: number;
      volumeMouseOver: boolean;
      settingsVisible: boolean;
      playbackRate: 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 2;
      showControls: boolean;
    }
    const videoValuesReactive = reactive<VideoValues>({
      currentTime: "",
      durationTime: "",
      videoHoverTime: "",
      isVideoPlaying: true,
      volumeLevel: "max",
      volume: 50,
      volumeMouseOver: false,
      settingsVisible: false,
      playbackRate: 1,
      showControls: true,
    });
    const videoValues = toRefs<VideoValues>(videoValuesReactive);

    interface SettingsValues {
      isSubmenuOpen: boolean;
      isPlaybackSpeedMenuOpen: boolean;
    }

    const settingsValuesReactive = reactive<SettingsValues>({
      isSubmenuOpen: false,
      isPlaybackSpeedMenuOpen: false,
    });
    const settingsValues = toRefs<SettingsValues>(settingsValuesReactive);

    const videoEl = ref<HTMLVideoElement>();
    const videoProgressedBarEl = ref<HTMLSpanElement>();
    const videoFetchedBarEl = ref<HTMLSpanElement>();
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

    const onProgress = () => {
      const video = videoEl.value as HTMLVideoElement;
      var range = 0;
      var bf = video.buffered;
      var time = video.currentTime;

      while (!(bf.start(range) <= time && time <= bf.end(range))) {
        range += 1;
      }
      var loadedPercentage = ((bf.end(range) / video.duration) * 100).toFixed(
        2
      );

      videoFetchedBarEl.value!.style.width = `${loadedPercentage}%`;
    };

    const onHoverProgressBar = (e: MouseEvent) => {
      const offsetLeftProgress =
        videoProgressBarEl.value!.getBoundingClientRect().left;
      const leftX = e.screenX - offsetLeftProgress;
      const seconds =
        (leftX / videoProgressBarEl.value!.clientWidth) *
        videoEl.value!.duration;

      const hms = secondsToHMS(seconds);
      videoValuesReactive.videoHoverTime = hms;

      // Set left value of progress bar time show element
      videoProgressTime.value!.style.left = `${
        leftX - videoProgressTime.value!.offsetWidth / 2
      }px`;
    };

    // PROGRESS BAR AND TIME END

    const onTogglePlay = (e: MouseEvent) => {
      if ((e.target as HTMLElement).className !== "video") {
        return;
      }
      if (videoValuesReactive.isVideoPlaying) {
        videoEl.value?.pause();
        onHoverVideo();
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

      videoEl.value!.volume = newVolume / 100;

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

    // SETTINGS BEGIN
    const onSettingsToggle = (visible: boolean) => {
      settingsValuesReactive.isSubmenuOpen = false;
      settingsValuesReactive.isPlaybackSpeedMenuOpen = false;
      return (videoValuesReactive.settingsVisible = visible);
    };

    // SETTINGS END

    // PLAYBACK SPEED BEGIN
    const onOpenPlaybackSpeedMenu = () => {
      settingsValuesReactive.isSubmenuOpen = true;
      settingsValuesReactive.isPlaybackSpeedMenuOpen = true;
      return;
    };
    const onClosePlaybackSpeedMenu = () => {
      settingsValuesReactive.isSubmenuOpen = false;
      settingsValuesReactive.isPlaybackSpeedMenuOpen = false;
      return;
    };

    const setVideoSpeed = (
      speed: 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 2
    ): void => {
      const video = videoEl.value as HTMLVideoElement;
      video.playbackRate = speed;
      videoValuesReactive.playbackRate = speed;
    };
    // PLAYBACK SPEED END

    // LARGE/DEFAULT VIEW BEGIN
    const toggleViewMode = () => {
      store?.dispatch("toggleViewModeState");
      onTimeUpdate();
    };
    // LARGE/DEFAULT VIEW END

    // FULL/NORMAL SCREEN BEGIN

    // If esc pressed, fullscreen state not changing.
    var isNotEscPressed = false;

    const toggleFullScreen = (value: boolean | undefined) => {
      isNotEscPressed = true;
      const fullscreenState = store?.state["video"].isFullscreen;
      if (value !== undefined) {
        if (value) {
          document.body.style.overflow = "hidden";
          document.body.requestFullscreen();
        } else {
          document.body.style.overflow = "inherit";
          document.exitFullscreen();
        }
        store?.dispatch("changeFullscreenState", value);
        return;
      }
      if (fullscreenState) {
        document.body.style.overflow = "inherit";
        document.exitFullscreen();
      } else {
        document.body.style.overflow = "hidden";
        document.body.requestFullscreen();
      }
      store.dispatch("changeFullscreenState", !fullscreenState);
      return;
    };

    const toggleFullScreenEvent = (): void => {
      if (!isNotEscPressed) {
        document.body.style.overflow = "inherit";
        store?.dispatch("changeFullscreenState", false);
      }
      onTimeUpdate();
      isNotEscPressed = false;
    };

    onMounted(() => {
      document.addEventListener("fullscreenchange", toggleFullScreenEvent);
    });

    onUnmounted(() => {
      document.removeEventListener("fullscreenchange", toggleFullScreenEvent);
    });
    // FULL/NORMAL SCREEN END

    // SHOW/HIDE VIDEO CONTROL BEGIN
    var timeOut: any;
    var onStopDelay = 3000;

    const showCursor = () => {
      return (document.body.style.cursor = "initial");
    };

    const hideCursor = () => {
      return (document.body.style.cursor = "none");
    };

    const toggleVisibleVideoControls = () => {
      if (!videoValuesReactive.isVideoPlaying) {
        showCursor();
        return (videoValuesReactive.showControls = true);
      }
      hideCursor();
      return (videoValuesReactive.showControls = false);
    };

    onMounted(() => {
      timeOut = setTimeout(() => {
        toggleVisibleVideoControls();
      }, onStopDelay);
    });

    const onHoverVideo = () => {
      clearTimeout(timeOut);

      if (!videoValuesReactive.showControls) {
        showCursor();
        videoValuesReactive.showControls = true;
      }

      // on stop mouse moving
      timeOut = setTimeout(() => {
        toggleVisibleVideoControls();
      }, onStopDelay);
    };

    const onMouseOutVideoContainer = () => {
      clearTimeout(timeOut);
      showCursor();
      if (videoValuesReactive.isVideoPlaying) {
        return (videoValuesReactive.showControls = false);
      }

      return (videoValuesReactive.showControls = true);
    };
    // SHOW/HIDE VIDEO CONTROL END
    return {
      onTimeUpdate,
      videoEl,
      videoProgressBarEl,
      videoProgressedBarEl,
      videoFetchedBarEl,
      videoProgressPoint,
      videoProgressTime,
      videoVolumeTrackEl,
      videoVolumeThumbEl,
      videoValues,
      settingsValues,
      onTogglePlay,
      onChangeTime,
      onHoverProgressBar,
      onProgress,
      onChangeVolume,
      setVolumeLevel,
      setVolumeInputValue,
      onToggleMute,
      onVolumeMouseOver,
      onVolumeMouseOut,
      onTogglePlayWithButton,
      onSettingsToggle,
      onOpenPlaybackSpeedMenu,
      onClosePlaybackSpeedMenu,
      onHoverVideo,
      onMouseOutVideoContainer,
      setVideoSpeed,
      toggleFullScreen,
      toggleViewMode,

      // STORE
      isFullscreen: computed(() => store?.state["video"].isFullscreen),
      viewMode: computed(() => store?.state["video"].viewMode),
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mediaQueries/mediaQueries.scss";
.video-container {
  position: relative;
  width: 100%;
  height: calc((9 / 16) * 100vw);
  max-height: calc(100vh - 169px);
  background: var(--video-bg);
  min-height: 360px;

  &.video-container-default-view {
    // max-height: calc(100vh - (56px + 24px + 136px + 54px));
    // max-width: calc((100vh - (56px + 24px + 136px)) * (16 / 9));
    height: 100%;
    min-width: 436px;
    @include MQ1020 {
      width: 100%;
    }
  }

  &.video-container-fullscreen {
    height: 100vh !important;
    width: 100vw !important;
    max-height: unset !important;
    max-width: unset !important;
  }

  & .video-interaction-container {
    width: 100%;
    position: absolute;
    top: 48%;

    & .video-interaction-icon {
      fill: var(--video-icon-color);
    }

    & .video-interaction-center {
      position: absolute;
      left: 49%;
      display: none;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      background: var(--video-interaction-bg);
      opacity: 0;

      &.video-play-progress {
        display: flex;
        animation: scaleOpacity 0.7s;
      }

      &.video-pause-progress {
        display: flex;
        animation: scaleOpacity 0.7s;
      }

      @keyframes scaleOpacity {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        100% {
          transform: scale(2.2);
          opacity: 0;
        }
      }
    }
  }

  & .video-gradient-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 145px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAACSCAYAAACE56BkAAAAAXNSR0IArs4c6QAAAWBJREFUKFM90Psr3nEYxvHPZ2wOm5mzGTPmbHM+nxkzx5TWSpKSlNZSkpKk1lpJWklKklpaLX+kXg+PX67nuu7rfd+fb0+IIYQQw8NPCDEmwhOSoktIKnlKniUlpkHSLWdwGXYzxefiC1xCssSX2mwPZXvvFZejyH2UPC6fFLhSACkkRa4UK167QkKJ+EZRmpRYBn4rlmvLce+8VsFVaisdeK+twlVz1ZAaUhtiDHWKOnC9WYPYaK1R/CB+tNYEaTJrttYCaVW0QtpIu3c7cB1iJ9fFdScl9kB6/et9TvW50q8dIINkCDLEDUNG7iWGMGo2Rj6ZjZuNOzBh9tna5L3EEL5wU7hpr02LM2SWzEHmtQviIvfV537jlrTLjq5wq4o1D62DN9zbVHwnP3Bbim27O+BdcU+7Dz6AHDrwE/JL8ZsckWPtieKPtVPcmeJcvOAuza7Ea/Bfb9xw/8z+c7d3tQ0kbe55nG0AAAAASUVORK5CYII=");
  }

  & .video-title {
    font-size: 27px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 35px;
    margin: 18px 0 0 16px;
    position: absolute;
    top: 0;
    width: 95%;

    color: var(--white-always);

    &.video-title-visible {
      opacity: 1 !important;
    }

    &.video-title-hidden {
      opacity: 0 !important;
    }
  }

  & .video-menu-container {
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: var(--video-menu-z);
    transition: opacity 0.2s;

    &.video-menu-container-visible {
      opacity: 1 !important;
    }
    &.video-menu-container-hidden {
      opacity: 0 !important;
    }

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
        z-index: 2;
      }
      & .video-fetched {
        position: absolute;
        top: 0;
        left: 0;
        height: var(--progressbar-height);
        background: var(--video-fetched-bar-color);
        z-index: 1;
      }
      & .video-progress-point {
        display: none;
        position: absolute;
        top: -4px;
        height: 13px;
        width: 13px;
        border-radius: 50%;
        z-index: 3;
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
      flex-wrap: nowrap;
      background: var(--video-controls-bg);

      & .video-controls-left,
      &.video-controls-right {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
      }

      & .video-controls-icon {
        fill: var(--video-icon-color);
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
        flex-wrap: nowrap;
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

      & .video-settings {
        transition: transform 0.2s;
        transform: rotateZ(0deg);
      }

      & .video-settings-visible {
        transform: rotateZ(37deg);
      }

      & .card-speed-select-container {
        display: flex;
        align-items: center;

        & .card-speed-select-icon {
          margin: 0 7px 0 0;
          & svg {
            fill: var(--white-always);
          }
        }

        & .card-speed-select-text {
          color: var(--card-options-text-color);
          font-size: 13px;
          font-weight: 500;
        }
      }
    }
  }

  & .video {
    width: 100%;
    height: 100%;
    &::-webkit-media-controls-enclosure {
      display: none !important;
    }
  }
}
</style>
