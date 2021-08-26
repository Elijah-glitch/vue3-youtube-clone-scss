<template>
  <div class="card-video-img-container">
    <div class="card-video-time">{{ time }}</div>
    <img ref="cardVideoImgRef" v-show="!imgIsLoading" :src="src" />
    <div class="card-video-skeleton" v-show="imgIsLoading"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { isImgLoading } from "@/utils/isImgLoading";
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
  setup() {
    const cardVideoImgRef = ref<HTMLImageElement>();
    const imgIsLoading = ref<boolean>(false);
    onMounted(() => {
      const imgEl = cardVideoImgRef.value as HTMLImageElement;

      const checkImg = () => {
        isImgLoading(imgEl)
          ? (imgIsLoading.value = true)
          : (imgIsLoading.value = false);
      };

      checkImg();

      imgEl.addEventListener("load", () => {
        checkImg();
      });
    });
    return { cardVideoImgRef, imgIsLoading };
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

  & .card-video-skeleton {
    width: 100%;
    background: var(--border-color);
    height: 180px;
  }
}
</style>
