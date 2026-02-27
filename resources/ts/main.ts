type Listener<T, K extends keyof T> = (
  newValue: T[K],
  oldValue: T[K],
  key: K,
  state: T
) => void;

type State<T extends object> = T & {
  listen<K extends keyof T>(
    keys: K | K[],
    callback: Listener<T, K>
  ): () => void;
};

export function createState<T extends object>(
  initial: T
): State<T> {
  const listeners = new Map<keyof T, Set<Function>>();

  const notify = <K extends keyof T>(
    key: K,
    newValue: T[K],
    oldValue: T[K]
  ) => {
    listeners.get(key)?.forEach((fn) =>
      (fn as Listener<T, K>)(newValue, oldValue, key, proxy)
    );
  };

  const proxy = new Proxy(initial, {
    set(target, p, value, receiver) {
      if (typeof p !== "string") {
        return Reflect.set(target, p, value, receiver);
      }

      const key = p as keyof T;
      const oldValue = target[key];

      if (oldValue === value) return true;

      const result = Reflect.set(target, key, value, receiver);
      notify(key, value, oldValue);

      return result;
    }
  });

  function listen<K extends keyof T>(
    keys: K | K[],
    callback: Listener<T, K>
  ) {
    const keyArray = Array.isArray(keys) ? keys : [keys];

    keyArray.forEach((key) => {
      if (!listeners.has(key)) {
        listeners.set(key, new Set());
      }

      listeners.get(key)!.add(callback);
    });

    return () => {
      keyArray.forEach((key) => {
        listeners.get(key)?.delete(callback);
      });
    };
  }

  return Object.assign(proxy, { listen }) as State<T>;
}