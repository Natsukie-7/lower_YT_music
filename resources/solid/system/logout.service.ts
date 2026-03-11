import api from "@/api";
import { useMutation } from "@tanstack/solid-query";

export default function revokeMutation() {
  return useMutation(() => ({
    mutationFn: async function () {
      return api.post("/revoke");
    },
  }));
}
