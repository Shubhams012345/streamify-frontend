import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../lib/axios"
import useAuthUser from "./useAuthUser"

const useLogout = () => {
  const navigate = useNavigate()
  const { setAuthUser } = useAuthUser()

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout")
      queryClient.clear()
      setAuthUser(null)
      localStorage.removeItem("authUser")

      navigate("/login", { replace: true })

      window.location.reload()
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  return { logout }
}

export default useLogout
