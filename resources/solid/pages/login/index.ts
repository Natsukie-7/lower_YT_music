import { render } from "solid-js/web";
import { createComponent, createSignal } from "solid-js";
import Login from "./Login";

const root = document.getElementById("root");

if (!root) {
  throw new Error("#app not found");
}

render(() => createComponent(Login, {}), root);