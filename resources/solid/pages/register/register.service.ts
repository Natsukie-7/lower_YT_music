import api from "@/api";
import { useLocalStorageContext } from "@/components/localStorage/localStorage.context";
import { useMutation } from "@tanstack/solid-query";

export default function createRegisterMutation() {
  const [state, { setItem }] = useLocalStorageContext();

  return useMutation(() => ({
    mutationFn: async function (params: { name: string; email: string; password: string }) {
      const response = await api.post<{ data: string }>("/register", params);

      return { token: response.data.data, status: response.status };
    },
    onSuccess(response, variable) {
      setItem("apiAuthorizationKey", response.token);
    },
  }));
}
