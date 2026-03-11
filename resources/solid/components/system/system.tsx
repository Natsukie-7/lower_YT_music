import { RouteSectionProps } from "@solidjs/router";
import { Component } from "solid-js";
import { LocalStorageContextProvider } from "../localStorage/localStorage.context";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

const App: Component<RouteSectionProps> = (props) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <LocalStorageContextProvider>{props.children}</LocalStorageContextProvider>
    </QueryClientProvider>
  );
};

export default App;
