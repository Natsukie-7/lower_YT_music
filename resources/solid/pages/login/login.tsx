import { type Component } from "solid-js";
import { LoginContextProvider, useLoginContext } from "./login.context";
import Input from "../../components/inputs";
import createSignalAdapter from "../../tools/createSignalAdapter";
import StyledLogin from "./login.styled";
import Button, { ClickButtonEvent } from "@/components/button/button";
import { A, useNavigate } from "@solidjs/router";
import createLoginMutation from "./login.service";

interface LoginProps {}

const LoginForm: Component = () => {
  const navigate = useNavigate();

  const [form, setForm] = useLoginContext();

  const loginMutation = createLoginMutation();

  const syncFormInputs = (key: keyof typeof form) =>
    createSignalAdapter<string>(
      () => form[key] ?? "",
      (value) => {
        setForm(key, value ?? null);
      }
    );

  const handleSubmit: ClickButtonEvent = async () => {
    if (!form.email || !form.password) {
      return;
    }

    await loginMutation.mutateAsync({ email: form.email, password: form.password });

    navigate("/");
  };

  return (
    <StyledLogin>
      <StyledLogin.Title>Faça o seu login</StyledLogin.Title>

      <StyledLogin.Form>
        <Input.Email label="email" signal={syncFormInputs("email")} />
        <Input.Password label="senha" signal={syncFormInputs("password")} />
      </StyledLogin.Form>

      <Button onClick={handleSubmit}>Fazer login</Button>
      <A href="/register">Não tem uma conta? Faça o registro aqui</A>
    </StyledLogin>
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
