import {
  createContext as nativeCreateContext,
  useContext as nativeUseContext,
  type ParentProps,
  createComponent,
} from "solid-js";

type Factory<Props, T> = (props: Props) => T;

export default function createContext<Props extends Record<string, any> = {}, T = unknown>(
  factoryFn: Factory<Props, T>
) {
  const Context = nativeCreateContext<T>();

  function Provider(props: ParentProps<Props>) {
    return createComponent(Context.Provider, {
      value: factoryFn(props),
      get children() {
        return props.children;
      },
    });
  }

  function useContext() {
    const context = nativeUseContext(Context);

    if (!context) {
      throw new Error("hook must be used inside a Provider");
    }

    return context;
  }

  return [Provider, useContext] as const;
}
