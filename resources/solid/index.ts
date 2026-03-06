import { render } from "solid-js/web";
import { createComponent, createSignal } from "solid-js";
import solidJsRouter from "./routes";

const root = document.getElementById("root");

if (!root) {
  throw new Error("#app not found");
}

render(() => createComponent(solidJsRouter, {}), root);
