import createContext from "../../tools/context";

interface ApplicationProps {
  user: User;
}

const factory = (props: ApplicationProps) => {
  const state = {
    get user() {
      return props.user;
    },
  };

  return [state] as const;
};

export const [ApplicationContextProvider, useApplication] = createContext(factory);
