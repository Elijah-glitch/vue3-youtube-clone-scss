<template>
  <div class="container">
    <div
      class="input"
      :class="{
        'input-active': values.active.value,
        'input-focus': values.focus.value,
        'input-hide-placeholder': !values.showPlaceholder.value,
      }"
      @focus="onFocusInput()"
      @blur="onBlurInput()"
      @input="(e) => onChangeInputValue(e)"
      @keydown="onInputKeydown()"
      contenteditable="true"
      ref="inputEl"
    ></div>
    <div
      class="input-bottom-line-container"
      :class="{
        'input-bottom-line-container-hide': !values.active.value,
      }"
    >
      <div
        class="input-iine"
        :class="{ 'input-focus-line': values.focus.value }"
      ></div>
    </div>
    <div v-show="values.showButtons.value" class="input-buttons">
      <transparent-button
        @click="onInputCancel()"
        :margin="'0 8px 0 0'"
        :padding="'10px 16px'"
        ><text-one>CANCEL</text-one></transparent-button
      >

      <primary-button blue :disable="values.showPlaceholder.value"
        >COMMENT</primary-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import TextOne from "@/components/Text/TextOne.vue";
import TransparentButton from "@/components/Input/Button/TransparentButton/TransparentButton.vue";
import PrimaryButton from "@/components/Input/Button/Primary/PrimaryButton.vue";

export default defineComponent({
  name: "TextInput",
  components: { TextOne, TransparentButton, PrimaryButton },
  setup() {
    interface Values {
      active: boolean;
      focus: boolean;
      showPlaceholder: boolean;
      showButtons: boolean;
    }
    const valuesR = reactive<Values>({
      active: false,
      focus: false,
      showPlaceholder: true,
      showButtons: false,
    });
    const values = toRefs<Values>(valuesR);

    const inputEl = ref<HTMLDivElement>();

    const onFocusInput = () => {
      if (!valuesR.active) {
        valuesR.active = true;
        valuesR.showButtons = true;
      }
      valuesR.focus = true;
    };

    const onBlurInput = () => {
      valuesR.focus = false;
    };

    const onChangeInputValue = () => {
      const input = inputEl.value as HTMLElement;
      if (input.innerText.length > 0) {
        valuesR.showPlaceholder = false;
      } else {
        valuesR.showPlaceholder = true;
      }
    };

    const onInputCancel = () => {
      const input = inputEl.value as HTMLDivElement;

      input.innerText = "";
      onChangeInputValue();
      valuesR.showButtons = false;
      valuesR.active = false;
      valuesR.focus = false;
    };

    const onEnter = () => {
      document.execCommand("insertHTML", false, "<br/>");
    };

    const onInputKeydown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === "13") {
        onEnter();
      }
    };
    return {
      values,
      onFocusInput,
      onBlurInput,
      onChangeInputValue,
      onInputCancel,
      onInputKeydown,
      inputEl,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  & .input {
    display: inline-block;
    align-items: center;
    width: 100%;
    min-height: 23px;
    font-size: 15px;
    border-bottom: 1px solid var(--text-input-border-bottom-color);
    outline: 0px solid transparent;
    overflow-wrap: break-word;
    word-break: break-all;

    &::before {
      content: "Add a public comment...";
      color: var(--textone-type-second-color);
      cursor: text;
      line-height: 17px;
    }

    &.input-hide-placeholder {
      &::before {
        content: none;
      }
    }

    &.input-active {
      border-bottom: none;
    }
  }

  & .input-bottom-line-container {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    height: 2px;
    width: 100%;
    background: var(--text-input-border-bottom-active-color);
    border-radius: 50%;
    visibility: visible;
    margin-top: 4px;

    &.input-bottom-line-container-hide {
      visibility: hidden;
    }
    & .input-iine {
      position: absolute;
      background: var(--text-input-border-bottom-focus-color);
      transition: width 0.2s;
      height: 2px;
      width: 0%;

      &.input-focus-line {
        width: 100%;
        // animation: widthTo100 0.2s;
        // @keyframes widthTo100 {
        //   0% {
        //     width: 5%;
        //   }

        //   100% {
        //     width: 100%;
        //   }
        // }
      }
    }
  }

  & .input-buttons {
    display: flex;
    margin-left: auto;
    margin-top: 8px;
  }
}
</style>
