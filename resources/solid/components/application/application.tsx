import { useNavigate, type RouteSectionProps } from "@solidjs/router";
import { Show, type Component } from "solid-js";
import { useLocalStorageContext } from "../localStorage/localStorage.context";
import { ApplicationContextProvider } from "./application.context";
import createApplicationServer from "./application.service";

const Application: Component<RouteSectionProps> = (props) => {
  const navigate = useNavigate();
  const [localStorage] = useLocalStorageContext();

  const { userQuery } = createApplicationServer();

  const localState = {
    get isLoading() {
      return userQuery.isLoading;
    },
    get user() {
      if (this.isLoading) {
        return null;
      }

      return userQuery.data || null;
    },
  };

  if (!localStorage.apiAuthorizationKey) {
    navigate("/login", { replace: true });
  }

  return (
    <Show when={localState.user} keyed>
      {(user) => (
        <ApplicationContextProvider user={user}>{props.children}</ApplicationContextProvider>
      )}
    </Show>
  );
};

export default Application;
