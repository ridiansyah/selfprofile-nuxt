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
  getCredentials({ dispatch }, token) {
    this.$axios
      .get(`api/v1/oauth/credentials`, {
        params: { access_token: token },
      })
      .then((response) => {
        console.log("response: ", response?.data?.data?.user);
        dispatch("set/loading", false);
        dispatch("set/show_alert", true);
        dispatch("set/status", "success");
        dispatch("set/message", "Login Success");
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
        this.$cookiz.remove("selfprofile_token");
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

  handleLogin({ dispatch }, params) {
    dispatch("set/loading", true);

    return this.$axios
      .post(`api/v1/oauth/sign_in`, params)
      .then((response) => {
        // dispatch("set/loading", false);
        // dispatch("set/show_alert", true);
        // dispatch("set/status", "success");
        // dispatch("set/message", "Login Success");
        this.$cookiz.set(
          "selfprofile_token",
          response?.data?.data?.user?.access_token,
          {
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          }
        );
        return {
          status: true,
          token: response?.data?.data?.user?.access_token,
        };
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
        return {
          status: false,
          token: null,
        };
      });
  },
};
