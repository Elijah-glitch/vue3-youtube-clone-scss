<template>
  <button
    :class="{ dark: theme === 'dark' }"
    @click="onToggleTheme"
    v-if="isDev()"
    class="button"
  >
    {{ theme === "dark" ? "🌞" : "🌛" }}
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "DevLightDarkButton",
  setup() {
    const theme = ref<"light" | "dark">("light");
    const isDev = () => {
      const VUE_APP_MODE = process.env.VUE_APP_MODE;
      if (VUE_APP_MODE === "dev") return true;
      return false;
    };

    const onToggleTheme = () => {
      document.body.classList.toggle("dark-mode");

      if (theme.value === "dark") {
        return (theme.value = "light");
      }

      return (theme.value = "dark");
    };
    return { isDev, onToggleTheme, theme };
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
  height: 50px;
  width: 50px;
  font-size: 26px;
  background: #000;
  border-radius: 50%;

  &.dark {
    background: #fff;
  }
}
</style>
