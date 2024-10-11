import { envConfig } from "@configs/env"
import useAuthState from "@hooks/useAuthState"
import { getAccessToken } from "@utils/storage"
import React, { createContext, useContext, useEffect, useState } from "react"
import { Socket } from "socket.io-client"
import { io } from "socket.io-client"

type SocketProviderProps = {
  children: React.ReactNode
}

export interface SocketState {
  socket: Socket | undefined
}

export const initialState: SocketState = {
  socket: undefined,
}

const SocketProviderContext = createContext(initialState)

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { isLogin } = useAuthState()
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    if (isLogin) {
      const accessToken = getAccessToken()

      const initSocket = io(envConfig.socketUrl, {
        path: "/socket.io",
        transports: ["websocket"],
        rejectUnauthorized: false,
        agent: false,
        auth: {
          authorization: `Bearer ${accessToken}`,
        },
        reconnection: true,
        reconnectionAttempts: 3,
        reconnectionDelay: 2000,
        autoConnect: true,
      })

      initSocket.connect()
      initSocket.on("connect", () => {
        setSocket(initSocket)
        console.log("Socket connected")
      })
      initSocket.on("error", (error) => console.error(error))

      initSocket.on("disconnect", (reason) => {
        console.log(`Socket disconnected: ${reason}`)
        if (reason !== "io client disconnect") {
          initSocket.connect()
        }
      })

      initSocket.on("reconnect", (attempt) => {
        console.log(`Reconnected after ${attempt} attempts`)
      })

      initSocket.on("reconnect_attempt", (attempt) => {
        console.log(`Attempting to reconnect: Attempt ${attempt}`)
      })

      return () => {
        if (initSocket.connected) {
          initSocket.disconnect()
        }
      }
    }
  }, [isLogin])

  return (
    <SocketProviderContext.Provider value={{ socket }}>
      {children}
    </SocketProviderContext.Provider>
  )
}

export const useSocket = () => useContext(SocketProviderContext)
