import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginMutation, isPending, error } = useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      // Store auth user in cache
      queryClient.setQueryData(["authUser"], data);

      // Redirect after successful login
      navigate("/");
    },

    onError: (err) => {
      console.log("Login error:", err);
    }
  });

  return { error, isPending, loginMutation };
};

export default useLogin;
