import { useMutation,useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";

const useLogout = () => {
  const querryClient=useQueryClient();
  
      const {mutate:logoutMutation,isPending,error}=useMutation({
           mutationFn:logout,
           onSuccess:()=>querryClient.invalidateQueries({queryKey:["authUser"]})
      });
      return{logoutMutation,isPending,error};
}

export default useLogout