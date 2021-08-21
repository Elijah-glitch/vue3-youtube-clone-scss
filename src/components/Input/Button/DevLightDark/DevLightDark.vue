<template>
  <button @click="onToggleTheme" v-if="isDev()" class="button">CHANGE</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DevLightDarkButton",
  setup() {
    const isDev = () => {
      const VUE_APP_MODE = process.env.VUE_APP_MODE;
      if (VUE_APP_MODE === "dev") return true;
      return false;
    };

    const onToggleTheme = () => {
      return document.body.classList.toggle("dark-mode");
    };
    return { isDev, onToggleTheme };
  },
});
</script>

<style lang="scss" scoped>
.button {
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: red;
  padding: 8px;
}
</style>
