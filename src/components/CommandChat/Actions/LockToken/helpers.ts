import { InfoAction } from "@components/CommandChat/types"

export const setValueLock = (
  key: "amount" | "duration" | "fromToken" | "key",
  value: any,
  setInfoAction: React.Dispatch<React.SetStateAction<InfoAction>>,
) => {
  setInfoAction((prev) => {
    if (prev !== null) {
      return {
        ...prev,
        data: {
          ...prev.data,
          [key]: value,
        },
      }
    }
    return prev
  })
}
