import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  Show,
  splitProps,
  type Component,
  type ComponentProps,
  type Signal,
} from "solid-js";

interface InputTextProps extends ComponentProps<"input"> {
  label?: string;
  signal?: Signal<string>;
  initialValue?: string;
  handleChange?: (this: InputEvent, value: string) => void;
}

const InputText: Component<InputTextProps> = (props) => {
  const [localProps, inputProps] = splitProps(props, [
    "label",
    "signal",
    "initialValue",
    "handleChange",
  ]);

  const [value, setValue] = localProps.signal || createSignal<string>("");

  function onInputMount(ref: HTMLInputElement) {
    if (typeof inputProps.ref == "function") {
      inputProps.ref(ref);
    }

    onMount(() => {
      const abortController = new AbortController();

      ref.addEventListener(
        "input",
        (ev) => {
          const event = ev as InputEvent;
          setValue(event.currentTarget?.value || "");
          if (typeof localProps.handleChange == "function") {
            localProps.handleChange.call(event, value());
          }
        },
        { signal: abortController.signal }
      );

      if (localProps.initialValue) {
        setValue(localProps.initialValue);
      }

      onCleanup(() => {
        abortController.abort();
      });
    });
  }

  return (
    <>
      <Show when={localProps.label} keyed>
        {(labelValue) => <label>{labelValue}</label>}
      </Show>

      <input {...inputProps} ref={onInputMount} value={value()} />
    </>
  );
};

export default InputText;
