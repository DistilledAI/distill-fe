import { InfoAction } from "@components/CommandChat/types"

export const setValueSend = (
  key: "amount" | "toAccountAddress" | "tokenAddress",
  value: any,
  setInfoAction: React.Dispatch<React.SetStateAction<InfoAction>>,
) => {
  setInfoAction((prev: any) => {
    if (prev !== null) {
      return {
        ...prev,
        data: {
          ...prev.data,
          send: {
            ...prev.data.send,
            [key]: value,
          },
        },
      }
    }
    return prev
  })
}
