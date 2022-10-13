import EasyAccess, { defaultMutations } from "vuex-easy-access";

export const state = () => ({
  data: {},
});

export const mutations = { ...defaultMutations(state()) };

export const plugins = [EasyAccess()];

export const actions = {
  setData({ dispatch }, value) {
    dispatch("set/data", value);
  },
};
