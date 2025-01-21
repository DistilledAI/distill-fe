import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type TopChatAnnounceState = "open" | "close" | "dontShowAgain"

const createInitialState = (): TopChatAnnounceState => "close"
const initialState = createInitialState()

const topChatAnnounceSlice = createSlice({
  name: "top-chat-announce",
  initialState,
  reducers: {
    updateTopChatAnnounce: (_, action: PayloadAction<TopChatAnnounceState>) => {
      return action.payload
    },
  },
})

export const { updateTopChatAnnounce } = topChatAnnounceSlice.actions

export default topChatAnnounceSlice.reducer
