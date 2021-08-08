<template>
  <div class="searchBar-container">
    <input placeholder="Search" class="searchBar-input" />

    <detail-popup-container>
      <button class="searchBar-searchButton">
        <icon-base :width="`20px`" :height="`20px`" class="search-icon"
          ><icon-search
        /></icon-base>
      </button>
      <detail-popup-item :left="'10%'">Search</detail-popup-item>
    </detail-popup-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconSearch from "@/components/Icon/Icons/Search.vue";
import IconBase from "@/components/Icon/BaseIcon.vue";
import DetailPopupContainer from "@/components/Popup/DetailPopupContainer.vue";
import DetailPopupItem from "@/components/Popup/DetailPopupItem.vue";

export default defineComponent({
  name: "SearchBar",
  components: { IconSearch, IconBase, DetailPopupContainer, DetailPopupItem },
});
</script>

<style lang="scss" scoped>
.searchBar-container {
  --searchBar-inputHeight: 26px;
  display: flex;
  width: 100%;

  & .searchBar-input {
    height: var(--searchBar-inputHeight);
    width: 100%;
    padding: 2px 10px;
    max-width: 575px;
    border: 1px solid var(--searchbox-border-color);
    outline: none;
    background: var(--searchbox-bg-color);
    font-size: 16px;
    caret-color: var(--searchbox-caret-color);

    &:focus {
      border: 1px solid var(--searchbox-focus-border-color);
    }

    &::placeholder {
      color: var(--searchbox-placeholder-color);
    }
  }

  & .searchBar-searchButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72.5px;
    padding: 1px 6px;
    background: var(--searchbtn-bg-color);
    outline: none;
    border: 1px solid var(--searchbtn-border-color);
    cursor: pointer;
    height: calc(var(--searchBar-inputHeight) + 6px);
    & .search-icon g {
      fill: var(--search-icon-color);
    }

    &:hover {
      & .search-icon g {
        fill: var(--search-icon-hover-color);
      }

      background: var(--searchbtn-bg-hover-color);
      border: 1px solid var(--searchbtn-hover-border-color);
    }
    &:focus {
      background: var(--searchbtn-bg-focus-color);
    }
  }
}
</style>
