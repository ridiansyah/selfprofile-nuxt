import EasyAccess, { defaultMutations } from "vuex-easy-access";

export const state = () => ({
  selector_data: [],

  show_alert: false,
  loading: false,
  status: "",
  message: "",
});

export const mutations = { ...defaultMutations(state()) };

export const plugins = [EasyAccess()];

export const actions = {
  getCountry({ dispatch }) {
    dispatch("set/loading", true);

    this.$axios
      .get(`https://countriesnow.space/api/v0.1/countries/positions`)
      .then((res) => {
        dispatch("set/loading", false);
        dispatch("set/status", "success");
        dispatch(
          "set/selector_data",
          res.data?.data?.map((obj) => ({
            iso2: obj.iso2,
            name: obj?.name,
            lat: obj?.lat,
            long: obj?.long,
            latlong: obj?.lat + "," + obj?.long,
          }))
        );
      })
      .catch((err) => {
        console.error(err);
        dispatch("set/loading", false);
        dispatch("set/show_alert", true);
        dispatch("set/status", "error");
        dispatch("set/selector_data", []);
        if (err.response.data.error) {
          dispatch("set/message", err.response?.data?.msg);
        } else {
          dispatch(
            "set/message",
            "Something went wrong. Please try again later..."
          );
        }
      });
  },
};
