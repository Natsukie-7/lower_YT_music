import { useApplication } from "@/components/application/application.context";
import { Component } from "solid-js";

interface HomeProps {}

const Home: Component<HomeProps> = (props) => {
  const [app] = useApplication();

  return <div>Bem vindo {app.user.name}</div>;
};

export default Home;
