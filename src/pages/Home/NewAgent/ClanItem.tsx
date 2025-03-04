import { distilledAiPlaceholder } from "@assets/images"
import { AvatarClanByList } from "@components/AvatarContainer"
import { PlusIcon } from "@components/Icons/Plus"
import { VideoThumbnailWrapper } from "@components/VideoThumbnailWrapper"
import { PATH_NAMES } from "@constants/index"
import { getConfigClanValue } from "@pages/AgentStore/AgentClansStore"
import { IGroup } from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"
import { useQueryClient } from "@tanstack/react-query"
import React from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"

const ClanItem: React.FC<{
  group: IGroup
  isJoined?: boolean
}> = ({ isJoined = false, group }) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { chatId } = useParams()
  const { pathname } = useLocation()
  const isActive = chatId === group.label
  const isNavClan = pathname.startsWith(PATH_NAMES.CLAN)

  return (
    <div
      onClick={() => {
        navigate(`${PATH_NAMES.CLAN}/${group.label}`)
        setTimeout(() => {
          queryClient.setQueryData(
            [QueryDataKeys.IS_REFRESH_CLANS],
            (oldData: boolean) => !oldData,
          )
        }, 500)
      }}
      className={twMerge(
        "relative cursor-pointer duration-300 hover:opacity-80",
        isNavClan && "opacity-50",
        isActive && "opacity-100",
      )}
    >
      <VideoThumbnailWrapper videoUrl={getConfigClanValue(group, "imageLive")}>
        {(thumbnail) => (
          <AvatarClanByList
            name={group.name}
            avatarUrl={thumbnail || distilledAiPlaceholder}
            member={group.groupMemberStats?.total}
          />
        )}
      </VideoThumbnailWrapper>
      {!isJoined && (
        <div className="absolute right-[6px] top-[-4px] flex h-5 w-5 items-center justify-center rounded-full bg-white max-md:right-[12px]">
          <PlusIcon size={14} color="#545454" />
        </div>
      )}
    </div>
  )
}

export default ClanItem
