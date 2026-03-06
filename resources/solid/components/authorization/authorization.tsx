import { useNavigate, type RouteSectionProps } from "@solidjs/router";
import type { Component, ParentComponent } from "solid-js";
import { useAuthRedirect } from "./autoRedirect";

const Authorization: Component<RouteSectionProps> = (props) => {
  useAuthRedirect();

  return <>{props.children}</>;
};

export default Authorization;
