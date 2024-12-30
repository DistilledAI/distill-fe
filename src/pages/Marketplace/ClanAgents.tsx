import AvatarCustom from "@components/AvatarCustom"
import { LiveIcon } from "@components/Icons"
import { MessageDots } from "@components/Icons/Message"
import { PATH_NAMES } from "@constants/index"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { IGroupDetail } from "types/group"
import useFetchClan from "./useFetchClan"
import { useQueryClient } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"

const ClanAgents = () => {
  const navigate = useNavigate()
  const { data } = useFetchClan()
  const queryClient = useQueryClient()

  const handleChatWithClan = async (clan: IGroupDetail) => {
    const inviteUrl = `${PATH_NAMES.CLAN}/${clan.label}`
    navigate(inviteUrl)
    setTimeout(() => {
      queryClient.setQueryData(
        [QueryDataKeys.IS_REFRESH_CLANS],
        (oldData: boolean) => !oldData,
      )
    }, 500)
  }

  return data.map((clan: IGroupDetail, index: number) => (
    <div
      className="flex h-fit cursor-pointer justify-between gap-2 rounded-[22px] border-b border-b-mercury-70 p-2 last:border-none hover:bg-mercury-200 md:border-b-[0px]"
      key={index}
      onClick={() => handleChatWithClan(clan)}
    >
      <div className="flex gap-4">
        <AvatarCustom
          badgeClassName="bg-lgd-code-hot-ramp"
          src={clan.image || undefined}
          publicAddress={clan.name}
          badgeIcon={<LiveIcon />}
          isLive
        />
        <div>
          <h4 className="text-base-b line-clamp-1 text-mercury-800">
            {clan.name}
          </h4>
          <p className="line-clamp-2 text-13 font-medium text-mercury-600">
            {clan.description}
          </p>
        </div>
      </div>
      <Button
        className="min-w-[52px] rounded-full border border-mercury-50 bg-mercury-100 px-4 py-2"
        onPress={() => handleChatWithClan(clan)}
      >
        <MessageDots />
      </Button>
    </div>
  ))
}

export default ClanAgents
