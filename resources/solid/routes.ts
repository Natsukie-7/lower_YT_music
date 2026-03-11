import { Router, type RouteDefinition } from "@solidjs/router";
import { createComponent } from "solid-js";
import Authorization from "./components/application/application";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import System from "./components/system/system";
import Home from "./pages/home/home";

const publicRoutes: RouteDefinition[] = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
];

const appRoutes: RouteDefinition[] = [
  { path: "", component: Authorization, children: [{ path: "/", component: Home }] },
];

const routes: RouteDefinition[] = [
  { path: "", component: System, children: [...publicRoutes, ...appRoutes] },
];

export default function solidJsRouter() {
  return createComponent(Router, { children: routes });
}
