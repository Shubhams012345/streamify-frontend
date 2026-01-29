import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginMutation, isPending, error } = useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], data);
      navigate("/");
    }
  });

  return { loginMutation, isPending, error };
};

export default useLogin;
