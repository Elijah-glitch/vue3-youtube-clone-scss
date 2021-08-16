import { Commit } from "vuex";

interface State {
  isFullscreen: boolean;
  viewMode: "large" | "default";
}

const state = (): State => ({
  isFullscreen: false,
  viewMode: "default",
});

// getters
const getters = {};

// actions
const actions = {
  changeFullscreenState(
    { commit, state }: { commit: Commit; state: State },
    newState: boolean
  ): void {
    commit("setFullscreenState", newState);
  },

  toggleViewModeState(
    { commit, state }: { commit: Commit; state: State },
    newState: "large" | "default"
  ): void {
    if (state.viewMode === "default") {
      commit("setViewModeState", "large");
      return;
    }

    commit("setViewModeState", "default");
  },
};

// mutations
const mutations = {
  setFullscreenState(state: State, newState: boolean): void {
    state.isFullscreen = newState;
  },
  setViewModeState(state: State, newState: "large" | "default"): void {
    state.viewMode = newState;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
