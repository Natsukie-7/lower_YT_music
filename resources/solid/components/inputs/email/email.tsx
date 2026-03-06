import { type Component } from "solid-js";
import BasicInput, { type BasicInputProps } from "../basic/basic";
import StyledBasicInput from "../basic/basic.styled";

interface EmailProps extends BasicInputProps {}

const Email: Component<EmailProps> = (props) => {
  return (
    <StyledBasicInput.InputWrapper>
      <BasicInput {...props} regex={/[^\w@.+-]/g} />
    </StyledBasicInput.InputWrapper>
  );
};

export default Email;
