import EasyAccess, { defaultMutations } from "vuex-easy-access";

export const state = () => ({
  data: {},
  show_alert: false,
  loading: false,
  status: "",
  message: "",
  about_loading: false,
  career_loading: false,
  education_loading: false,
  upload_loading: false,
  avatar_loading: false,
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
  postCareer({ dispatch }, params) {
    dispatch("set/career_loading", true);

    return this.$axios
      .post(`api/v1/profile/career`, params)
      .then((response) => {
        dispatch("set/career_loading", false);
        dispatch("set/show_alert", true);
        dispatch("set/status", "success");
        dispatch("set/message", "Edit Career Success");
        dispatch("getProfile");
        return true;
      })
      .catch((err) => {
        console.error(err);
        dispatch("set/career_loading", false);
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
  postEducation({ dispatch }, params) {
    dispatch("set/education_loading", true);

    return this.$axios
      .post(`api/v1/profile/education`, params)
      .then((response) => {
        dispatch("set/education_loading", false);
        dispatch("set/show_alert", true);
        dispatch("set/status", "success");
        dispatch("set/message", "Edit Career Success");
        dispatch("getProfile");
        return true;
      })
      .catch((err) => {
        console.error(err);
        dispatch("set/education_loading", false);
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
  uploadCover({ dispatch }, params) {
    dispatch("set/upload_loading", true);

    return this.$axios
      .post(`api/v1/uploads/cover`, params)
      .then((response) => {
        dispatch("set/upload_loading", false);
        dispatch("set/show_alert", true);
        dispatch("set/status", "success");
        dispatch("set/message", "Upload Cover Success");
        dispatch("getProfile");
        return true;
      })
      .catch((err) => {
        console.error(err);
        dispatch("set/upload_loading", false);
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
  uploadGallery({ dispatch }, params) {
    dispatch("set/upload_loading", true);

    return this.$axios
      .post(`api/v1/uploads/profile`, params)
      .then((response) => {
        dispatch("set/upload_loading", false);
        dispatch("set/show_alert", true);
        dispatch("set/status", "success");
        dispatch("set/message", "Upload Cover Success");
        dispatch("getProfile");
        return true;
      })
      .catch((err) => {
        console.error(err);
        dispatch("set/upload_loading", false);
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
  chooseAvatar({ dispatch }, params) {
    dispatch("set/avatar_loading", true);

    return this.$axios
      .post(`api/v1/uploads/profile/default`, params)
      .then((response) => {
        dispatch("set/avatar_loading", false);
        dispatch("set/show_alert", true);
        dispatch("set/status", "success");
        dispatch("set/message", "Upload Cover Success");
        dispatch("getProfile");
        return true;
      })
      .catch((err) => {
        console.error(err);
        dispatch("set/avatar_loading", false);
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
