import { createEffect, type Component, type JSX } from "solid-js";
import { LoginContextProvider, useLoginContext } from "./Login.context";

interface LoginProps {}

const LoginForm: Component = () => {
  const [form, setForm] = useLoginContext();

  const handleChange =
    (field: keyof typeof form): JSX.ChangeEventHandlerUnion<HTMLInputElement, Event> =>
    (e) => {
      setForm(field, e.currentTarget.value || null);
    };

  createEffect(() => {
    console.log(form.email);
    console.log(form.password);
  });

  return (
    <form>
      <input onChange={handleChange("email")} />
      <input onChange={handleChange("password")} />
    </form>
  );
};

const Login: Component<LoginProps> = (props) => {
  return (
    <LoginContextProvider>
      <LoginForm />
    </LoginContextProvider>
  );
};

export default Login;
