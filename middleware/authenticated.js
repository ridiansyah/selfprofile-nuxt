// Authentication middleware
export default function Authenticated({ app }) {
  // If the user hasn't logged in, redirect to login page.
  console.log("fullPath: ", app.router.history.current.fullPath);
  // if (
  //   !app.$cookies.get("token") &&
  //   app.router.history.current.fullPath !== "/login"
  // ) {
  //   console.log("masuk login");
  //   app.router.push("/login");
  // } else if (
  //   app.$cookies.get("token") &&
  //   app.router.history.current.fullPath !== "/"
  // ) {
  //   console.log("masuk home");
  //   app.router.push("/");
  // }
}
