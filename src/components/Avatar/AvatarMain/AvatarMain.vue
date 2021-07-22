<template>
  <img :style="style" class="avatar" src="@/assets/pp.png" />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

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
  },
});
</script>

<style lang="scss" scoped>
.avatar {
  object-fit: contain;
  border-radius: 50%;
}
</style>
