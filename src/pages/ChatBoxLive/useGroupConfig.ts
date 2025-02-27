import { useMemo } from "react"
import { CLAN_CONFIG_KEYS } from "@pages/AgentDetail/AgentContent/ClanUtilities/types"
import { StakeTokenAddress } from "@pages/Stake"
import { IGroup } from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"

interface GroupConfig {
  [CLAN_CONFIG_KEYS.IMAGES_LIVE]?: string
  [CLAN_CONFIG_KEYS.AUDIO_LIVE]?: string
  [CLAN_CONFIG_KEYS.DESCRIPTION]?: string
  [CLAN_CONFIG_KEYS.CONTRACT_ADDRESS]?: StakeTokenAddress | null
  [CLAN_CONFIG_KEYS.TRADE_LINK]?: string
  [CLAN_CONFIG_KEYS.IS_PREDICTION]?: boolean
  [CLAN_CONFIG_KEYS.X]?: string
  [CLAN_CONFIG_KEYS.TELEGRAM]?: string
  [CLAN_CONFIG_KEYS.WEBSITE]?: string
}

interface GroupConfigItem {
  id: number
  groupId: number
  type: string | null
  key: string
  value: string
  createdAt: string
  updatedAt: string
}

export const useGroupConfig = (group: IGroup | undefined) => {
  return useMemo<GroupConfig>(() => {
    const config: GroupConfig = {
      [CLAN_CONFIG_KEYS.IMAGES_LIVE]: undefined,
      [CLAN_CONFIG_KEYS.AUDIO_LIVE]: undefined,
      [CLAN_CONFIG_KEYS.DESCRIPTION]: undefined,
      [CLAN_CONFIG_KEYS.CONTRACT_ADDRESS]: null,
      [CLAN_CONFIG_KEYS.TRADE_LINK]: undefined,
      [CLAN_CONFIG_KEYS.IS_PREDICTION]: false,
      [CLAN_CONFIG_KEYS.X]: undefined,
      [CLAN_CONFIG_KEYS.TELEGRAM]: undefined,
      [CLAN_CONFIG_KEYS.WEBSITE]: undefined,
    }

    group?.groupConfig?.forEach((item: GroupConfigItem) => {
      const key = item.key as keyof GroupConfig
      if (Object.values(CLAN_CONFIG_KEYS).includes(key)) {
        if (item.value !== undefined && item.value !== null) {
          config[key] = item.value as any
        }
      }
    })

    return config
  }, [group?.groupConfig])
}
