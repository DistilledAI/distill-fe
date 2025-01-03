import { InfoAction } from "@components/CommandChat/types"

export const setValueSwap = (
  key: "amount" | "toToken" | "fromToken",
  value: any,
  setInfoAction: React.Dispatch<React.SetStateAction<InfoAction>>,
) => {
  setInfoAction((prev: any) => {
    if (prev !== null) {
      return {
        ...prev,
        data: {
          ...prev.data,
          swap: {
            ...prev.data.swap,
            [key]: value,
          },
        },
      }
    }
    return prev
  })
}
