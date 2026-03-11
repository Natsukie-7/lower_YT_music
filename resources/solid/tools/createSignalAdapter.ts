import type { Setter, Signal } from "solid-js";

export default function createSignalAdapter<T>(
  getter: () => T,
  setter: (value: T) => void
): Signal<T> {
  const set = ((value: T | ((prev: T) => T)) => {
    const next = typeof value === "function" ? (value as (prev: T) => T)(getter()) : value;

    setter(next);
    return next;
  }) as Setter<T>;

  return [getter, set];
}
