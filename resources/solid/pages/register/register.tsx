import { type Component } from "solid-js";
import { RegisterContextProvider, useRegisterContext } from "./register.context";
import Input from "../../components/inputs";
import createSignalAdapter from "../../tools/createSignalAdapter";
import StyledRegister from "./register.styled";
import Button, { ClickButtonEvent } from "@/components/button/button";
import { A, useNavigate } from "@solidjs/router";
import createRegisterMutation from "./register.service";

interface RegisterProps {}

const RegisterForm: Component = () => {
  const navigate = useNavigate();

  const registerMutation = createRegisterMutation();
  const [form, { setForm }] = useRegisterContext();

  const syncFormInputs = (key: keyof typeof form) =>
    createSignalAdapter<string>(
      () => form[key] ?? "",
      (value) => {
        setForm(key, value ?? null);
      }
    );

  const handleSubmit: ClickButtonEvent = async () => {
    if (!form.name || !form.email || !form.password) {
      return;
    }

    await registerMutation.mutateAsync({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    navigate("/");
  };

  return (
    <StyledRegister>
      <StyledRegister.Title>Faça o seu Register</StyledRegister.Title>

      <StyledRegister.Form>
        <Input.Email label="nome" signal={syncFormInputs("name")} />
        <Input.Email label="email" signal={syncFormInputs("email")} />
        <Input.Password label="senha" signal={syncFormInputs("password")} />
      </StyledRegister.Form>

      <Button onClick={handleSubmit}>Fazer Register</Button>
      <A href="/login">Tem uma conta? Faça o Register aqui</A>
    </StyledRegister>
  );
};

const Register: Component<RegisterProps> = (props) => {
  return (
    <RegisterContextProvider>
      <RegisterForm />
    </RegisterContextProvider>
  );
};

export default Register;
