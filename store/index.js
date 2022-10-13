import EasyAccess, { defaultMutations } from "vuex-easy-access";

export const state = () => ({
  index: "",
});

export const mutations = { ...defaultMutations(state()) };

export const plugins = [EasyAccess()];
