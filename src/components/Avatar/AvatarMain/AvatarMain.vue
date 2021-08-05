<template>
  <img :style="style" class="avatar" :src="getAvatarImg()" :alt="alt" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AvatarMain",
  data() {
    return {
      style: `width: ${this.width}; height: ${this.height};`,
    };
  },
  props: {
    width: {
      type: String,
      default: "32px",
    },
    height: {
      type: String,
      default: "32px",
    },
    src: {
      type: String,
      default: "pp.png",
    },
    alt: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    function getAvatarImg() {
      return require("@/assets/" + props.src);
    }
    return { getAvatarImg };
  },
});
</script>

<style lang="scss" scoped>
.avatar {
  object-fit: cover;
  border-radius: 50%;
}
</style>
