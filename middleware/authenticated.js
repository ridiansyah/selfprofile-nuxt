// Authentication middleware
export default function Authenticated({ app }) {
  // If the user hasn't logged in, redirect to login page.
  if (!app.$cookies.get("token")) {
    console.log("masuk login");
    app.router.push("/login");
  } else {
    console.log("masuk home");
    app.router.push("/");
  }
}
