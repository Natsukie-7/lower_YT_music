import { createStore } from "solid-js/store";
import createContext from "../../tools/context";

interface LocalStorageState {
  apiAuthorizationKey: string | null;
}

const factory = () => {
  const initial: LocalStorageState = {
    apiAuthorizationKey: localStorage.getItem("apiAuthorizationKey"),
  };

  const [state, setState] = createStore<LocalStorageState>(initial);

  const Api = {
    setItem<K extends keyof LocalStorageState>(key: K, value: string | null) {
      setState(key, value);
      if (!value) {
        localStorage.removeItem(key);
        return;
      }

      localStorage.setItem(key, value);
    },

    getItem<K extends keyof LocalStorageState>(key: K): string | null {
      return state[key];
    },

    clear() {
      (Object.keys(state) as (keyof LocalStorageState)[]).forEach((key) => {
        setState(key, null);
        localStorage.removeItem(key);
      });
    },
  };

  return [state, Api] as const;
};

export const [LocalStorageContextProvider, useLocalStorageContext] = createContext(factory);
