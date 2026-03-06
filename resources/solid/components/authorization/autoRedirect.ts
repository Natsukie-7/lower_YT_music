import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

export function useAuthRedirect() {
  const navigate = useNavigate();

  onMount(() => {
    if (!window.__APP__.user) {
      navigate("/login", { replace: true });
    }
  });
}
