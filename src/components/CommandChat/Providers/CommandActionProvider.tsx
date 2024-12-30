import { CommandActionKey } from "@components/CommandChat/types"
import React, { createContext, useContext, useState } from "react"

const CommandContext = createContext<{
  currentAction: CommandActionKey | null
  setCurrentAction: React.Dispatch<
    React.SetStateAction<CommandActionKey | null>
  >
}>({
  currentAction: null,
  setCurrentAction: () => null,
})

export const CommandActionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [currentAction, setCurrentAction] = useState<CommandActionKey | null>(
    null,
  )

  return (
    <CommandContext.Provider value={{ currentAction, setCurrentAction }}>
      {children}
    </CommandContext.Provider>
  )
}

export const useCommandActionChat = () => useContext(CommandContext)
