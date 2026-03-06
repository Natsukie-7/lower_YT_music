import {
  createSignal,
  Show,
  splitProps,
  type JSX,
  type Component,
  type ComponentProps,
  type Signal,
  createUniqueId,
  mergeProps,
} from "solid-js";
import { createEffectOn } from "../../../tools/createEffectOn";
import StyledBasicInput from "./basic.styled";
export interface BasicInputProps extends ComponentProps<"input"> {
  label?: string;
  signal?: Signal<string>;
  initialValue?: string;
  handleChange?: (this: HTMLInputElement, value: string) => void;
  regex?: RegExp;
}

const BasicInput: Component<BasicInputProps> = (props) => {
  const defaultProps: BasicInputProps = {
    id: createUniqueId(),
  };

  const mergedProps = mergeProps(defaultProps, props);
  const [localProps, inputProps] = splitProps(mergedProps, [
    "label",
    "signal",
    "initialValue",
    "handleChange",
    "regex",
  ]);

  let inputRef!: HTMLInputElement;

  const [value, setValue] =
    localProps.signal || createSignal<string>(localProps.initialValue || "");

  const onInput: JSX.InputEventHandlerUnion<HTMLInputElement, InputEvent> | undefined = (e) => {
    if (localProps.regex) {
      e.currentTarget.value = e.currentTarget.value.replace(localProps.regex, "");
    }

    setValue(e.currentTarget.value);

    if (typeof inputProps.onInput != "function") {
      return;
    }

    inputProps.onInput(e);
  };

  createEffectOn(value, (val) => {
    if (typeof localProps.handleChange != "function") {
      return;
    }

    localProps.handleChange.call(inputRef, val);
  });

  return (
    <>
      <Show when={localProps.label} keyed>
        {(labelValue) => (
          <StyledBasicInput.Label for={inputProps.id}>{labelValue}</StyledBasicInput.Label>
        )}
      </Show>

      <StyledBasicInput {...inputProps} onInput={onInput} value={value()} ref={inputRef} />
    </>
  );
};

export default BasicInput;
