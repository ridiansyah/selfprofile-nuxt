// Authentication middleware
export default function Authenticated({ app, redirect }) {
  // If the user hasn't logged in, redirect to login page.
  if (process.server) {
    if (
      !app.$cookiz.get("selfprofile_token") &&
      app.router.history.current.fullPath === "/"
    ) {
      return redirect("/login");
    } else if (
      app.$cookiz.get("selfprofile_token") &&
      (app.router.history.current.fullPath === "/login" ||
        app.router.history.current.fullPath === "/register" ||
        app.router.history.current.fullPath === "/register/otp")
    ) {
      return redirect("/");
    }
    return true;
  }
  return true;
}
