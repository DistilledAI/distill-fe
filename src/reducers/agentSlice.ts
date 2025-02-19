import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { IAgentData } from "types/user"

export const AGENT_TYPE = {
  MY_ECHO: "MY_ECHO",
} as any

export interface IMyAgent {
  id: number
  username: string
  description: string | null
  status: number
  publicAddress: string | null
  avatar: string | null
  contractAddress?: string | null
}

export interface AgentState {
  agentType: string
  myAgent: IMyAgent | null
  myAgents: IAgentData[]
  isStatusFetchMyAgent: "fetching" | "fetched" | null
  isRefresh: boolean
}

const initStateValues: AgentState = {
  agentType: AGENT_TYPE.MY_ECHO,
  isStatusFetchMyAgent: null,
  myAgents: [],
  myAgent: null,
  isRefresh: false,
}

const initialState: AgentState = initStateValues

const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    updateAgentType: (state, action: PayloadAction<AgentState>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    updateStatusFetchMyAgent: (
      state,
      action: PayloadAction<"fetching" | "fetched" | null>,
    ) => {
      state.isStatusFetchMyAgent = action.payload
    },
    updateMyAgent: (state, action: PayloadAction<IMyAgent | null>) => {
      state.myAgent = action.payload
    },
    updateMyAgents: (state, action: PayloadAction<IAgentData[]>) => {
      state.myAgents = action.payload
    },
    refreshFetchMyAgent: (state) => {
      state.isRefresh = !state.isRefresh
    },
  },
})

export const {
  updateAgentType,
  updateMyAgent,
  updateMyAgents,
  updateStatusFetchMyAgent,
  refreshFetchMyAgent,
} = agentSlice.actions

export default agentSlice.reducer
