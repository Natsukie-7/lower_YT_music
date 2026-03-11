import { type Component } from "solid-js";
import { LoginContextProvider, useLoginContext } from "./login.context";
import Input from "../../components/inputs";
import createSignalAdapter from "../../tools/createSignalAdapter";
import StyledLogin from "./login.styled";
import Button, { ClickButtonEvent } from "@/components/button/button";
import api from "@/api";
import { A } from "@solidjs/router";

interface LoginProps {}

const LoginForm: Component = () => {
  const [form, setForm] = useLoginContext();

  const syncFormInputs = (key: keyof typeof form) =>
    createSignalAdapter<string>(
      () => form[key] ?? "",
      (value) => {
        setForm(key, value ?? null);
      }
    );

  const handleSubmit: ClickButtonEvent = async () => {
    const response = await api.post("/login");

    console.log(response);
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
