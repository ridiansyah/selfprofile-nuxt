import EasyAccess, { defaultMutations } from "vuex-easy-access";

export const state = () => ({
  show_alert: false,
  loading: false,
  status: "",
  message: "",

  resend_show_alert: false,
  resend_loading: false,
  resend_status: "",
  resend_message: "",
});

export const mutations = { ...defaultMutations(state()) };

export const plugins = [EasyAccess()];

export const actions = {
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
    dispatch("set/loading", true);

    return this.$axios
      .post(`api/v1/register/otp/match`, params)
      .then((response) => {
        dispatch("set/loading", false);
        dispatch("set/show_alert", true);
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
