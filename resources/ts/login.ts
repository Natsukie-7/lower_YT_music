import { createState } from "./main.js";

interface LoginState {
    email: string;
    password: string;
}

class Login {
    private element: HTMLFormElement;
    private emailInput: HTMLInputElement;
    private passwordInput: HTMLInputElement;
    private state = createState<LoginState>({
        email: "",
        password: ""
    });

    constructor(formNode: HTMLFormElement) {
        this.element = formNode;

        const email = formNode.querySelector("input[name='email']");
        const password = formNode.querySelector("input[name='password']");

        if (!email || !(email instanceof HTMLInputElement)) {
            throw new Error("email input not found");
        }

        if (!password || !(password instanceof HTMLInputElement)) {
            throw new Error("password input not found");
        }

        this.emailInput = email;
        this.passwordInput = password;
    }

    boot() {
        this.emailInput.addEventListener("input", () => {
            this.state.email = this.emailInput.value;
        });

        this.passwordInput.addEventListener("input", () => {
            this.state.password = this.passwordInput.value;
        });

        this.state.listen(["email", 'password'], (elements) => {
            console.log("Loading mudou:", elements);
        });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const formNode = document.getElementById("login-form");

    if (!(formNode instanceof HTMLFormElement)) {
        throw new Error("Form not found");
    }

    const pageInstance = new Login(formNode);
    pageInstance.boot();
});