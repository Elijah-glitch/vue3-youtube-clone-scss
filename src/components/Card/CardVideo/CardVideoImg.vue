<template>
  <div class="card-video-img-container">
    <div class="card-video-time">{{ time }}</div>
    <img :src="src" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  name: "CardVideoImg",
  props: {
    src: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.card-video-img-container {
  position: relative;
  & .card-video-time {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: 5px;
    margin-bottom: 7px;
    padding: 3px 4px;
    font-size: 13px;
    font-weight: 500;
    background: var(--card-img-time-bg);
    color: var(--card-img-time-color);
  }

  & img {
    width: 100%;
  }
}
</style>
