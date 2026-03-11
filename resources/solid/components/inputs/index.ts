import Email from "./email/email";
import Password from "./password/password";
import { InputPasswordProvider } from "./password/password.context";
import Text from "./text/text";

export const InputGroup = { InputPasswordProvider };
const Input = Object.assign(Text, { Email, Password });

export default Input;
