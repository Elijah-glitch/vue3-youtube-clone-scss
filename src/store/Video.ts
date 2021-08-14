import { Commit } from "vuex";

interface State {
  isFullscreen: boolean;
}

const state = (): State => ({
  isFullscreen: false,
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
};

// mutations
const mutations = {
  setFullscreenState(state: State, newState: boolean): void {
    state.isFullscreen = newState;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
