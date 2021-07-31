<template>
  <layout :sidebarBlock="true">
    <div class="container">
      <card-video-container class="video-card-container">
        <card-video v-for="item in titles" :key="item" class="video-card-item">
          <img src="https://picsum.photos/1280/720" alt="item" />
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

export default defineComponent({
  name: "Home",
  components: {
    Layout,
    CardVideoContainer,
    CardVideo,
  },
  setup() {
    const titles = ref<Array<string>>([
      "Title 1",
      "Title 1",
      "Title 1",
      "Title 1",
      "Title 1",
      "Title 1",
      "Title 1",
      "Title 1",
    ]);
    return { titles };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
  & .video-card-container {
    justify-content: flex-start;
    & .video-card-item {
      width: calc(100% / var(--videos-per-item-row) - 16px - 0.01px);
      max-width: 320px;
      margin: 0 8px 40px 8px;
      & img {
        width: 100%;
      }
    }
  }
}
</style>
