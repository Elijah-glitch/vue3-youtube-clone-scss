<template>
  <router-view />
  <dev-light-dark-button />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DevLightDarkButton from "@/components/Input/Button/DevLightDark/DevLightDark.vue";

export default defineComponent({
  name: "Home",
  components: {
    DevLightDarkButton,
  },
});
</script>

<style lang="scss">
@import "@/styles/index.scss";
</style>
