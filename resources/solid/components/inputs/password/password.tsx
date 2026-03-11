import { type Component } from "solid-js";
import BasicInput, { type BasicInputProps } from "../basic/basic";
import StyledBasicInput from "../basic/basic.styled";
import { InputPasswordGroupProvider, useInputPassword } from "./password.context";

interface PasswordProps extends BasicInputProps {}

const Password: Component<PasswordProps> = (props) => {
  return (
    <InputPasswordGroupProvider>
      <PasswordComponent {...props} />
    </InputPasswordGroupProvider>
  );
};

export default Password;

const PasswordComponent: Component<PasswordProps> = (props) => {
  const [, , Config] = useInputPassword();

  return (
    <StyledBasicInput.InputWrapper>
      <BasicInput {...props} regex={/[^\w@.+-]/g} type={Config.inputType} />
    </StyledBasicInput.InputWrapper>
  );
};
