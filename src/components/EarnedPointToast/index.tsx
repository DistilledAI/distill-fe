import { useSocket } from "providers/SocketProvider"
import { useEffect } from "react"
import { toast } from "react-toastify"
import SuccessEarn from "@components/SuccessEarn"
import useAuthState from "@hooks/useAuthState"
import { useAppDispatch, useAppSelector } from "@hooks/useAppRedux"
import { getUserClaimTaskSuccess } from "services/agent"
import { updateFirstLogin } from "@reducers/firstLoginSlice"
import useFetchMe from "@hooks/useFetchMe"
import "./index.css"

const EarnedPointToast = () => {
  const { socket } = useSocket()
  const { isLogin, isAnonymous } = useAuthState()
  const firstLogin = useAppSelector((state) => state.firstLogin)
  const dispatch = useAppDispatch()
  const { fetchData } = useFetchMe(false)

  const convertToTitleCase = (title?: string) => {
    if (!title) return ""
    return title
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  useEffect(() => {
    let timeout: any = null
    ;(async () => {
      if (isLogin && !firstLogin && !isAnonymous && socket) {
        timeout = setTimeout(async () => {
          const res = await getUserClaimTaskSuccess()
          dispatch(updateFirstLogin(true))
          if (res?.status === 200) {
            fetchData()
          }
        }, 750)
      }
    })()

    return () => clearTimeout(timeout)
  }, [isLogin, firstLogin, isAnonymous, socket])

  useEffect(() => {
    if (socket && isLogin && !isAnonymous) {
      const event = "xDSTL"
      socket.on(event, (e) => {
        toast(
          <SuccessEarn
            title={convertToTitleCase(e?.action)}
            point={e?.point || 0}
          />,
          {
            style: {
              overflow: "visible",
              width: "100%",
              height: "100%",
              borderRadius: 22,
            },
            className: "earned-point-toast",
            autoClose: 2000,
          },
        )
      })

      return () => {
        socket.off(event)
      }
    }
  }, [socket, isLogin, isAnonymous])

  return null
}

export default EarnedPointToast
