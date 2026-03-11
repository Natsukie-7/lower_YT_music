import {
  createContext as nativeCreateContext,
  useContext as nativeUseContext,
  type ParentProps,
  createComponent,
} from "solid-js";

type Factory<Props, T> = (props: Props) => T;

export default function createGroupedContext<Props extends Record<string, any> = {}, T = unknown>(
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

  function GroupProvider(props: ParentProps<Props>) {
    const existing = nativeUseContext(Context);

    if (existing) return props.children;

    return createComponent(Context.Provider, {
      value: factoryFn(props),
      get children() {
        return props.children;
      },
    });
  }

  function useContext() {
    const ctx = nativeUseContext(Context);

    if (!ctx) {
      throw new Error("Context must exist (missing OptionalProvider)");
    }

    return ctx;
  }

  return [Provider, GroupProvider, useContext] as const;
}
