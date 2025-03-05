import { updateFirstLogin } from "@reducers/firstLoginSlice"
import { useAppDispatch } from "./useAppRedux"
import { logout as logoutSlice } from "@reducers/userSlice"
import { useQueryClient } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"
import { useLocation, useNavigate } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"
import { updateMyAgent } from "@reducers/agentSlice"

const useAuthAction = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(logoutSlice())
    dispatch(updateMyAgent(null))

    if (
      pathname.startsWith(PATH_NAMES.CHAT) ||
      pathname.startsWith(PATH_NAMES.PRIVATE_AGENT)
    ) {
      navigate(PATH_NAMES.PRIVATE_AGENT)
    }

    const ignoreKeys = [QueryDataKeys.PRIVATE_AGENTS_MKL]
    const removeList = Object.values(QueryDataKeys).filter(
      (key) => !ignoreKeys.includes(key),
    )
    removeList.forEach((key) => queryClient.removeQueries({ queryKey: [key] }))
    dispatch(updateFirstLogin(false))
    queryClient.setQueryData([QueryDataKeys.IS_LOGGED_OUT], () => true)

    queryClient.setQueryData([QueryDataKeys.IS_LOGGED_OUT], () => false)
  }

  return { logout }
}

export default useAuthAction
