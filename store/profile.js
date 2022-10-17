import EasyAccess, { defaultMutations } from "vuex-easy-access";

export const state = () => ({
  data: {},
  show_alert: false,
  loading: false,
  status: "",
  message: "",
  about_loading: false,
});

export const mutations = { ...defaultMutations(state()) };

export const plugins = [EasyAccess()];

export const actions = {
  getProfile({ dispatch }) {
    this.$axios
      .get(`/api/v1/profile/me`, {
        params: { access_token: this.$cookiz.get("selfprofile_token") },
      })
      .then((response) => {
        dispatch("set/loading", false);
        dispatch("set/show_alert", true);
        dispatch("set/status", "success");
        dispatch("set/message", "Load Data Success");
        dispatch("set/data", response?.data?.data?.user);

        return true;
      })
      .catch((err) => {
        console.error(err);
        dispatch("set/loading", false);
        dispatch("set/show_alert", true);
        dispatch("set/status", "error");
        if (err.response.data.error) {
          dispatch("set/message", err.response?.data?.msg);
        } else {
          dispatch(
            "set/message",
            "Something went wrong. Please try again later..."
          );
        }
        return false;
      });
  },
  postProfile({ dispatch }, params) {
    dispatch("set/about_loading", true);

    return this.$axios
      .post(`api/v1/profile`, params)
      .then((response) => {
        dispatch("set/about_loading", false);
        dispatch("set/show_alert", true);
        dispatch("set/status", "success");
        dispatch("set/message", "Edit Profile Success");
        dispatch("getProfile");
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
