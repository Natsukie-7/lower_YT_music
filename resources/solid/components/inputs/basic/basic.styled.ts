import { styled } from "solid-styled-components";

const InputWrapper = styled("div")`
  display: inline-grid;
`;

const Label = styled("label")``;

const Input = styled("input")``;

const StyledBasicInput = Object.assign(Input, { Label, InputWrapper });

export default StyledBasicInput;
