import { TYPE_BOT } from "@constants/index"
import { createSlice } from "@reduxjs/toolkit"
import {
  cachedLocalStorage,
  cachedSessionStorage,
  getAccessToken,
  storageKey,
} from "@utils/storage"

export interface IUser {
  id: number
  createdAt: string
  publicAddress: string
  role: number
  status: number
  typeLogin: string
  username: string
  avatar?: string
  description?: string
  owner?: number
  typeBot?: TYPE_BOT
  configBot?: string
  xDstlPoint?: number
  code?: string
  kycTwitter?: string
  kycEmail?: string
  walletActive?: number
  totalMax?: number
}

interface LoginSuccessPayload {
  user: IUser
  accessToken: string
  expiry: number
}

interface UpdateUserPayload {
  user: IUser
}

export interface IUserState {
  user: IUser
  isLogin: boolean
  isWalletActive: boolean
}

const userInitState: IUser = {
  id: 0,
  createdAt: "",
  publicAddress: "",
  role: 5,
  status: -1,
  typeLogin: "",
  username: "",
  avatar: "",
  description: "",
  owner: -1,
  typeBot: -1,
  configBot: "",
}

const initStateValues = {
  user: userInitState,
  isLogin: !!getAccessToken(),
  isWalletActive: false,
}

const initialState: IUserState = initStateValues

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: { payload: LoginSuccessPayload }) => {
      cachedSessionStorage.removeItem(storageKey.ACCESS_TOKEN)
      setTimeout(() => {
        cachedSessionStorage.removeItem("persist:root")
      }, 1000)

      const { user, accessToken, expiry } = action.payload
      state.user = user
      state.isLogin = true
      cachedLocalStorage.setWithExpiry(
        storageKey.ACCESS_TOKEN,
        accessToken,
        expiry,
      )
    },
    loginSuccessByAnonymous: (
      state,
      action: { payload: LoginSuccessPayload },
    ) => {
      const { user, accessToken, expiry } = action.payload

      setTimeout(() => {
        cachedLocalStorage.removeItem("persist:root")
      }, 1000)

      state.user = user
      state.isLogin = true
      cachedSessionStorage.setWithExpiry(
        storageKey.ACCESS_TOKEN,
        accessToken,
        expiry,
      )
    },
    logout: (state) => {
      state.user = userInitState
      state.isLogin = false
      cachedLocalStorage.removeItem(storageKey.ACCESS_TOKEN)
      cachedLocalStorage.removeItem(storageKey.DISCLAIMER)
      cachedSessionStorage.removeItem(storageKey.ACCESS_TOKEN)
      cachedLocalStorage.removeItem("persist:root")
      cachedSessionStorage.removeItem("persist:root")
    },
    updateUser: (state, action: { payload: UpdateUserPayload }) => {
      state.user = action.payload.user
    },
    updateWalletActive: (state, action: { payload: boolean }) => {
      state.isWalletActive = action.payload
    },
  },
})

export const {
  loginSuccess,
  logout,
  updateUser,
  loginSuccessByAnonymous,
  updateWalletActive,
} = userSlice.actions
export default userSlice.reducer
