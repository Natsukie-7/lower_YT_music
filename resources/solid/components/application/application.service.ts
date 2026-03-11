import { useQuery } from "@tanstack/solid-query";
import { useLocalStorageContext } from "../localStorage/localStorage.context";
import api from "@/api";

export default function createApplicationServer() {
  const [localStorage] = useLocalStorageContext();

  return {
    userQuery: useQuery(() => ({
      queryKey: ["authorization-user", localStorage.apiAuthorizationKey],
      queryFn: async function () {
        const response = await api.get<{ data: User }>("/sync");

        return { user: response.data.data, status: response.status };
      },
      retry: false,
    })),
  };
}
