import { distilledAiPlaceholder } from "@assets/images"
import { IGroup } from "@pages/ChatPageOld/ChatContainer/LeftBar/useFetchGroups"

export const getConfigClanValue = (
  item: IGroup,
  key: string,
  defaultValue: string = distilledAiPlaceholder,
) => {
  const config = item?.groupConfig?.find((val) => val.key === key)
  return config?.value || defaultValue
}
