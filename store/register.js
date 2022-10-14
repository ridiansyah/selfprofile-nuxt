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
        // dispatch("users/setData", response?.data?.data?.user, { root: true });
        localStorage.setItem(
          "selfprofile_userdata",
          JSON.stringify(response?.data?.data?.user)
        );
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
