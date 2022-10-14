import EasyAccess, { defaultMutations } from "vuex-easy-access";

export const state = () => ({
  show_alert: false,
  loading: false,
  status: "",
  message: "",

  logout_loading: false,
});

export const mutations = { ...defaultMutations(state()) };

export const plugins = [EasyAccess()];

export const actions = {
  handleLogout({ dispatch }, params) {
    dispatch("set/logout_loading", true);

    return this.$axios
      .post(`/api/v1/oauth/revoke`, params)
      .then((response) => {
        dispatch("set/logout_loading", false);
        dispatch("set/show_alert", true);
        dispatch("set/status", "success");
        dispatch("set/message", "Login Success");
        this.$cookiz.remove("selfprofile_token");
        return true;
      })
      .catch((err) => {
        console.error(err);
        dispatch("set/logout_loading", false);
        dispatch("set/show_alert", true);
        dispatch("set/status", "error");

        if (err.response?.data?.error?.errors) {
          dispatch("set/message", err.response?.data?.error?.errors);
        } else {
          dispatch(
            "set/message",
            "Something went wrong. Please try again later..."
          );
        }
        return {
          status: false,
          token: null,
        };
      });
  },
};
