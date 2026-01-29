import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logoutMutation, isPending, error } = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      // Clear all cached auth data
      queryClient.clear();

      // Force redirect to login
      navigate("/login", { replace: true });
    },

    onError: (err) => {
      console.log("Logout failed:", err);
    }
  });

  return { logoutMutation, isPending, error };
};

export default useLogout;
