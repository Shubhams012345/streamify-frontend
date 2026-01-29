import { axiosInstance } from "./axios";
export const signup=async(signupData)=>{
            const response=await axiosInstance.post("/auth/signup",signupData)
            return response.data;
        };

        export const login=async(loginData)=>{
            const response=await axiosInstance.post("/auth/login",loginData)
            return response.data;
        };
        export const logout=async()=>{
            const response=await axiosInstance.post("/auth/logout")
            return response.data;
        };

        export const getAuthUser=async()=>{
      try{
          const res=await axiosInstance.get("/auth/me");
          return res.data;
      }
      catch(error){
          console.log("Error in getAuthUser:",error);
          return null;
      }
}        
      export const completeOnboarding=async(formData)=>{
    const result=await axiosInstance.post("/auth/onBoarding",formData)
    return result.data;
}
     export const getUserFriends=async()=>{
    const result=await axiosInstance.get("/users/friends")
    return result.data;
}
     export const getRecommendedUsers=async()=>{
    const result=await axiosInstance.get("/users")
    return result.data;
}
     export const getOutgoingFriendReqs=async()=>{
    const result=await axiosInstance.get("/users/outgoing-friend-requests")
    return result.data;
}
     export const sendFriendRequest=async(userId)=>{
    const result=await axiosInstance.post(`/users/friend-request/${userId}`)
    return result.data;
}

export const getFriendRequest=async()=>{
    const result=await axiosInstance.get("/users/friend-request")
    return result.data;
}
     export const acceptFriendRequest=async(requestId)=>{
    const result=await axiosInstance.put(`/users/friend-request/${requestId}/accept`)
    return result.data;
}

export const getStreamToken=async()=>{
    const result=await axiosInstance.get("/chat/token")
    return result.data;
}