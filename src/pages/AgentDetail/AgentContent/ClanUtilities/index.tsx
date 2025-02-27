import { useFormContext } from "react-hook-form"
import useGroupDetail from "@pages/ChatPage/hooks/useGroupDetail"
import ClanAppearance from "./ClanAppearance"
import TokenInfo from "./TokenInfo"
import { useEffect } from "react"

interface Props {
  clanIdOfAgent: string
}

interface ClanFormData {
  clan: {
    description: string
    name: string
    imageLive: string | null
    isEnableClan: number
  }
}

const ClanUtilities = ({ clanIdOfAgent }: Props) => {
  const { groupDetail } = useGroupDetail(clanIdOfAgent)
  const { setValue } = useFormContext<ClanFormData>()

  useEffect(() => {
    if (groupDetail) {
      const { group } = groupDetail

      setValue("clan.name", group.name.replace(".Clan", "") || "")
      setValue("clan.isEnableClan", group.status || 2)

      group.groupConfig?.forEach((config: any) => {
        switch (config.key) {
          case "description":
            setValue("clan.description", config.value || "")
            break
          case "imageLive":
            setValue("clan.imageLive", config.value || null)
            break
          default:
            break
        }
      })
    }
  }, [groupDetail])

  return (
    <div className="space-y-10">
      <ClanAppearance />
      <TokenInfo />
    </div>
  )
}

export default ClanUtilities
