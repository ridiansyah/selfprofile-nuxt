import EasyAccess, { defaultMutations } from "vuex-easy-access";

export const state = () => ({
  status: "",
  message: "",
  logout_show_alert: false,
  logout_loading: false,
  login_show_alert: false,
  login_loading: false,
  register_show_alert: false,
  register_loading: false,
  otp_show_alert: false,
  otp_loading: false,
  resend_show_alert: false,
  resend_loading: false,
  resend_status: "",
  resend_message: "",
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
        dispatch("set/logout_show_alert", true);
        dispatch("set/status", "success");
        dispatch("set/message", "Login Success");
        this.$cookiz.remove("selfprofile_token");
        return true;
      })
      .catch((err) => {
        console.error(err);
        dispatch("set/logout_loading", false);
        dispatch("set/logout_show_alert", true);
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

  getCredentials({ dispatch }, token) {
    this.$axios
      .get(`api/v1/oauth/credentials`, {
        params: { access_token: token },
      })
      .then((response) => {
        console.log("response: ", response?.data?.data?.user);
        dispatch("set/login_loading", false);
        dispatch("set/login_show_alert", true);
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
        dispatch("set/login_loading", false);
        dispatch("set/login_show_alert", true);
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
        // dispatch("set/login_loading", false);
        // dispatch("set/login_show_alert", true);
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
        dispatch("set/login_loading", false);
        dispatch("set/login_show_alert", true);
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

  createRegister({ dispatch }, params) {
    dispatch("set/register_loading", true);

    return this.$axios
      .post(`api/v1/register`, params)
      .then((response) => {
        dispatch("set/register_loading", false);
        dispatch("set/register_show_alert", true);
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
        dispatch("set/register_loading", false);
        dispatch("set/register_show_alert", true);
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

  resendOTP({ dispatch }, params) {
    dispatch("set/resend_loading", true);

    return this.$axios
      .post(`api/v1/register/otp/request`, params)
      .then((response) => {
        dispatch("set/resend_loading", false);
        dispatch("set/resend_show_alert", true);
        dispatch("set/resend_status", "success");
        dispatch("set/resend_message", "Resend OTP Success");
        // dispatch("users/setData", response?.data?.data?.user, { root: true });
        localStorage.setItem(
          "selfprofile_userdata",
          JSON.stringify(response?.data?.data?.user)
        );
        return true;
      })
      .catch((err) => {
        console.error(err);
        dispatch("set/resend_loading", false);
        dispatch("set/resend_show_alert", true);
        dispatch("set/resend_status", "error");

        if (err.response?.data?.error?.errors) {
          dispatch("set/resend_message", err.response?.data?.error?.errors);
        } else {
          dispatch(
            "set/resend_message",
            "Something went wrong. Please try again later..."
          );
        }
        return false;
      });
  },
  verificationOTP({ dispatch }, params) {
    dispatch("set/otp_loading", true);

    return this.$axios
      .post(`api/v1/register/otp/match`, params)
      .then((response) => {
        dispatch("set/otp_loading", false);
        dispatch("set/otp_show_alert", true);
        dispatch("set/status", "success");
        dispatch("set/message", "Resend OTP Success");
        this.$cookiz.set(
          "selfprofile_token",
          response?.data?.data?.user?.access_token,
          {
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          }
        );
        return true;
      })
      .catch((err) => {
        console.error(err);
        dispatch("set/otp_loading", false);
        dispatch("set/otp_show_alert", true);
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
