import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  Show,
  splitProps,
  type JSX,
  type Component,
  type ComponentProps,
  type Signal,
} from "solid-js";
import { createEffectOn } from "../../../tools/createEffectOn";
import BasicInput, { type BasicInputProps } from "../basic/basic";
import StyledBasicInput from "../basic/basic.styled";

interface TextProps extends BasicInputProps {}

const Text: Component<TextProps> = (props) => {
  return (
    <StyledBasicInput.InputWrapper>
      <BasicInput {...props} />
    </StyledBasicInput.InputWrapper>
  );
};

export default Text;
