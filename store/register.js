import EasyAccess, { defaultMutations } from "vuex-easy-access";

export const state = () => ({
  show_alert: false,
  loading: false,
  status: "",
  message: "",
});

export const mutations = { ...defaultMutations(state()) };

export const plugins = [EasyAccess()];

export const actions = {
  createRegister({ dispatch }, params) {
    dispatch("set/loading", true);

    return this.$axios
      .post(`api/v1/register`, params)
      .then((response) => {
        dispatch("set/loading", false);
        dispatch("set/show_alert", true);
        dispatch("set/status", "success");
        dispatch("set/message", "Registration Success");
        this.$cookiz.set("selfprofile_userdata", response?.data?.data?.user, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
        return true;
      })
      .catch((err) => {
        console.error(err);
        dispatch("set/loading", false);
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
        return false;
      });
  },
};
