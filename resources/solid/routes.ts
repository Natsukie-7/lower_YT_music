import { Router, type RouteDefinition, type RouteProps, type RouterProps } from "@solidjs/router";
import { createComponent, lazy } from "solid-js";
import Authorization from "./components/authorization/authorization";
import Login from "./pages/login/login";

const publicRoutes: RouteDefinition[] = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
  },
];

const appRoutes: RouteDefinition[] = [{ path: "", component: Authorization, children: [] }];

const routes: RouteDefinition[] = [...publicRoutes, ...appRoutes];

export default function solidJsRouter() {
  return createComponent(Router, { children: routes });
}
