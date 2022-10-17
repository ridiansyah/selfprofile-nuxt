import { set } from "@/utils";

const AxiosPlugin = ({ $axios, app, route, store, redirect }) => {
  // Handle Axios onRequest
  $axios.onRequest((config) => {
    if (route.fullPath === "/") {
      const token = app.$cookiz.get("selfprofile_token");
      if (!config.headers.hasOwnProperty("Authorization") && token) {
        set(config.headers, "Authorization", `${token}`);
      }
    }
  });

  // Handle Axios onError
  $axios.onError((err) => {
    const code = parseInt(err.response && err.response.status);
    console.log("code: ", code);
    if (code === 401) {
      app.$cookiz.remove("selfprofile_token");
      app.$router.push("/login");
      return;
    }

    //   if (code === 403 && route.name !== "/") {
    //     app.$logout("/403");
    //     return;
    //   }

    //   if (code === 404) {
    //     if (route.name.includes("admin")) {
    //       app.$logout("/404");
    //     } else {
    //       redirect("/404");
    //     }
    //     return;
    //   }

    // if (code !== 401 && code !== 403 && route.name.includes("admin")) {
    //   console.error(err);
    //   app.$logout("/maintenance");
    // } else {
    //   console.error(err);
    //   redirect("/maintenance");
    // }
  });
};

export default AxiosPlugin;
