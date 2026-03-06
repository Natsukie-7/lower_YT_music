import { styled } from "solid-styled-components";

const Page = styled("main")`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Title = styled("h1")``;

const Form = styled("form")``;

const StyledLogin = Object.assign(Page, { Title, Form });

export default StyledLogin;
