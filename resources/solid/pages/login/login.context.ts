import { createStore } from "solid-js/store";
import createContext from "../../tools/context";

interface Form {
  email: string | null;
  password: string | null;
}
const factory = () => {
  const [form, setForm] = createStore<Form>({
    email: null,
    password: null,
  });

  const Api = { setForm };

  return [form, setForm] as const;
};

export const [LoginContextProvider, useLoginContext] = createContext(factory);
