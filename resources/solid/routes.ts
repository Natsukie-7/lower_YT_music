import { Router, type RouteDefinition } from "@solidjs/router";
import { createComponent } from "solid-js";
import Authorization from "./components/authorization/authorization";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

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

const appRoutes: RouteDefinition[] = [{ path: "", component: Authorization, children: [] }];

const routes: RouteDefinition[] = [...publicRoutes, ...appRoutes];

export default function solidJsRouter() {
  return createComponent(Router, { children: routes });
}
