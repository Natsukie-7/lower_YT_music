import api from "@/api";
import { useLocalStorageContext } from "@/components/localStorage/localStorage.context";
import { useMutation } from "@tanstack/solid-query";

export default function createRegisterMutation() {
  const [state, { setItem }] = useLocalStorageContext();

  return useMutation(() => ({
    mutationFn: async function (params: { name: string; email: string; password: string }) {
      const { data } = await api.post<{ data: string }>("/register", params);

      return data;
    },
    onSuccess(data, variable) {
      setItem("apiAuthorizationKey", data);

      console.log(state.apiAuthorizationKey);
    },
  }));
}
