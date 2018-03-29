import "whatwg-fetch";
import "babel-polyfill";
import "reset-css";
import "./index.css";

import App from "./components/app";

import { tween } from "popmotion";
import { h, render } from "preact";

document.addEventListener("DOMContentLoaded", () => {
  render(h(App, { defaultSearch: "Avocado" }), document.body);
});
// TODO: Host on firebase.
// TODO push code to github.
