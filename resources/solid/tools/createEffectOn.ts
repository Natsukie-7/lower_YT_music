import { createEffect, on, type Accessor, type OnOptions } from "solid-js";

type ExtractDeps<T> =
  T extends Array<Accessor<infer U>>
    ? { [K in keyof T]: T[K] extends Accessor<infer V> ? V : never }
    : T extends Accessor<infer U>
      ? U
      : never;

export function createEffectOn<T extends Accessor<any> | Accessor<any>[], U>(
  deps: T,
  fn: (input: ExtractDeps<T>, prevInput: ExtractDeps<T>, prevValue?: U) => U,
  options: OnOptions = {}
) {
  return createEffect(on(deps as any, fn as any, options));
}
