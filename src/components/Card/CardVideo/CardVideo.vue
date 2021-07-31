<template>
  <li class="card-video-item-container"><slot /></li>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "CardVideo",
});
</script>
