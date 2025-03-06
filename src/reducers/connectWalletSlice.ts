import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  isOpen: false,
  isConnectedWallet: false,
}

const connectWalletModalSlice = createSlice({
  name: "connect-wallet",
  initialState,
  reducers: {
    updateModalStatus: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isOpen: action.payload,
      }
    },
    updateConnectedWalletStatus: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isConnectedWallet: action.payload,
      }
    },
  },
})

export const { updateModalStatus, updateConnectedWalletStatus } =
  connectWalletModalSlice.actions

export default connectWalletModalSlice.reducer
