import { logout, updateUser } from "@reducers/user/UserSlice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getUser } from "services/user"
import useAuthState from "./useAuthState"
import { RoleUser } from "@constants/index"

const useFetchMe = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { isLogin, sessionAccessToken } = useAuthState()

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await getUser()
      if (res.data) {
        if (sessionAccessToken) {
          dispatch(
            updateUser({
              user: {
                id: res?.data?.id,
                createdAt: "",
                publicAddress: "",
                role: RoleUser.ANONYMOUS,
                status: 0,
                typeLogin: "",
                username: "",
                avatar: "",
              },
            }),
          )
        } else {
          dispatch(updateUser({ user: res.data }))
        }
      } else {
        dispatch(logout())
      }
    } catch (error: any) {
      console.error(error)
      if (error.response.data.message === "Unauthorized") {
        dispatch(logout())
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLogin) fetchData()
  }, [isLogin, sessionAccessToken])

  return { loading, fetchData }
}

export default useFetchMe
