// Authentication middleware
export default function Authenticated({ app, redirect }) {
  // If the user hasn't logged in, redirect to login page.
  if (process.server) {
    if (
      app.$cookiz.get("selfprofile_token") === false &&
      (app.router.history.current.fullPath !== "/login" ||
        app.router.history.current.fullPath !== "/register" ||
        app.router.history.current.fullPath !== "/register/otp")
    ) {
      console.log("masuk login");
      return redirect("/login");
    } else if (
      app.$cookiz.get("selfprofile_token") &&
      app.router.history.current.fullPath !== "/"
    ) {
      console.log("masuk home");
      return redirect("/");
    }
    return true;
  }
  return true;
}
