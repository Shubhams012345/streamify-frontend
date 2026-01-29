import { useQuery } from "@tanstack/react-query"
import { getAuthUser } from "../lib/api"

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    staleTime: 0,
    cacheTime: 0
  });

  console.log("AUTH USER:", authUser.data);

  return {
    isLoading: authUser.isLoading,
    authUser: authUser.data?.success ? authUser.data.user : null
  };
};

export default useAuthUser;
