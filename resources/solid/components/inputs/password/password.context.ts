import createGroupedContext from "@/tools/groupedContext";
import { createStore } from "solid-js/store";

const factory = () => {
  const [state, set] = createStore({
    encripted: true,
  });

  const Api = { set };

  const Config = {
    get inputType() {
      return state.encripted ? "password" : "text";
    },
  };

  return [state, Api, Config] as const;
};

export const [InputPasswordProvider, InputPasswordGroupProvider, useInputPassword] =
  createGroupedContext(factory);
