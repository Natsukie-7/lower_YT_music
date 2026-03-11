import { useNavigate, type RouteSectionProps } from "@solidjs/router";
import { Show, type Component } from "solid-js";
import { ApplicationContextProvider } from "./application.context";
import createApplicationServer from "./application.service";
import { createEffectOn } from "@/tools/createEffectOn";

const Application: Component<RouteSectionProps> = (props) => {
  const navigate = useNavigate();

  const { userQuery } = createApplicationServer();

  const localState = {
    get isLoading() {
      return userQuery.isLoading;
    },
    get user() {
      if (this.isLoading || !userQuery.data) {
        return null;
      }
      return userQuery.data.user;
    },
    get isRevoked() {
      if (this.isLoading) return false;
      return userQuery.data?.status == 401;
    },
  };

  createEffectOn(
    () => localState.isRevoked,
    (isRevoked) => {
      if (!isRevoked) {
        return;
      }

      navigate("/logout", { replace: true });
    }
  );

  return (
    <Show when={localState.user} keyed>
      {(user) => (
        <ApplicationContextProvider user={user}>{props.children}</ApplicationContextProvider>
      )}
    </Show>
  );
};

export default Application;
