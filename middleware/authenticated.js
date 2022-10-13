// Authentication middleware
export default function Authenticated({ app, redirect }) {
  // If the user hasn't logged in, redirect to login page.
  if (
    !app.$cookiz.get("selfprofile_token") &&
    app.router.history.current.fullPath !== "/login"
  ) {
    console.log("masuk login");
    redirect("/login");
  } else if (
    app.$cookiz.get("selfprofile_token") &&
    app.router.history.current.fullPath !== "/"
  ) {
    console.log("masuk home");
    redirect("/");
  }
}
