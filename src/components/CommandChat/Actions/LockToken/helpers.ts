import { InfoAction } from "@components/CommandChat/types"

export const setValueLock = (
  key: "amount" | "duration" | "fromToken",
  value: any,
  setInfoAction: React.Dispatch<React.SetStateAction<InfoAction>>,
) => {
  setInfoAction((prev: any) => {
    if (prev !== null) {
      return {
        ...prev,
        data: {
          ...prev.data,
          lock: {
            ...prev.data.lock,
            [key]: value,
          },
        },
      }
    }
    return prev
  })
}