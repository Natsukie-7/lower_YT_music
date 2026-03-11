import { useLocalStorageContext } from "@/components/localStorage/localStorage.context";
import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

export default function Logout() {
  const navigate = useNavigate();
  const [, { clear }] = useLocalStorageContext();

  onMount(() => {
    clear();

    navigate("/login");
  });

  return <></>;
}
