import { createStore } from "solid-js/store";
import createContext from "../../tools/context";

interface Form {
  name: string | null;
  email: string | null;
  password: string | null;
}
const factory = () => {
  const [form, setForm] = createStore<Form>({
    name: null,
    email: null,
    password: null,
  });

  const Api = { setForm };

  return [form, Api] as const;
};

export const [RegisterContextProvider, useRegisterContext] = createContext(factory);
