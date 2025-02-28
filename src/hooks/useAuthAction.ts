import { updateFirstLogin } from "@reducers/firstLoginSlice"
import { useAppDispatch } from "./useAppRedux"
import { logout as logoutSlice } from "@reducers/userSlice"
import { useQueryClient } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"

const useAuthAction = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const logout = () => {
    dispatch(logoutSlice())
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
