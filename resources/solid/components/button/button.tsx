import { Component, ComponentProps, type JSX, Show, splitProps } from "solid-js";
import StyledButton from "./button.styled";
import { createStore } from "solid-js/store";

type ClickButtonParams = Record<"finish", () => void>;
export type ClickButtonEvent = ButtonProps["onClick"];

interface ButtonProps extends Omit<ComponentProps<"button">, "onClick"> {
  onClick?: (params: ClickButtonParams) => void | Promise<void>;
}

const Button: Component<ButtonProps> = (props) => {
  const [localProps, buttonProps] = splitProps(props, ["onClick", "children"]);

  const [state, set] = createStore({
    isLoading: false,
  });

  const localState = {
    get isLoading() {
      return !!state.isLoading;
    },
  };

  const onClick: JSX.EventHandlerUnion<
    HTMLButtonElement,
    MouseEvent,
    JSX.EventHandler<HTMLButtonElement, MouseEvent>
  > = async (e) => {
    if (typeof localProps.onClick != "function") {
      return;
    }

    if (localState.isLoading) {
      return;
    }

    set("isLoading", true);

    const finish = () => {
      if (!localState.isLoading) {
        return;
      }

      set("isLoading", false);
    };

    try {
      await localProps.onClick({ finish });
    } finally {
      finish();
    }
  };

  return (
    <StyledButton.Button {...buttonProps} disabled={localState.isLoading} onClick={onClick}>
      {localProps.children}

      <Show when={localState.isLoading}>...</Show>
    </StyledButton.Button>
  );
};

export default Button;
