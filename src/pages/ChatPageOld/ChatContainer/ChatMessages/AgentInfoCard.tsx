import AvatarCustom from "@components/AvatarCustom"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { ShareWithQrIcon } from "@components/Icons/Share"
import { PATH_NAMES, RoleUser } from "@constants/index"
import { getBadgeColor, IMessageBox } from "./helpers"
// import { ThreeDotsCircleIcon } from "@components/Icons/SocialLinkIcon"
import { Button, Skeleton, useDisclosure } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import { getUserPublicDetail } from "services/user"
import { QueryDataKeys } from "types/queryDataKeys"
import ShareQRModal from "@components/ShareQRModal"
import useGroupDetail from "@pages/ChatPageOld/hooks/useGroupDetail"

interface AgentInfoCardProps {
  groupId: string
  messages: IMessageBox[]
  getAgentOwner?: (agentOwner: any) => void
  isLoading?: boolean
}

const AgentInfoCard = ({ messages, isLoading }: AgentInfoCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { chatId } = useParams()
  const { groupDetail } = useGroupDetail(chatId)

  const userBId = groupDetail?.group?.userBId
  const isAgent = groupDetail?.group?.userB?.role === RoleUser.BOT

  const { data } = useQuery<any>({
    queryKey: [QueryDataKeys.USER_PUBLIC_DETAIL, userBId?.toString()],
    queryFn: async () => {
      const agentIdOfUserB = messages.find(
        (message) => message.ownerId === userBId,
      )?.agentId
      return agentIdOfUserB ? await getUserPublicDetail(agentIdOfUserB) : {}
    },
    enabled: !!userBId && !isAgent && messages.length > 0,
    staleTime: 60 * 60 * 1000,
  })

  const agentOwner = isAgent
    ? groupDetail?.group?.userB?.ownerInfo
    : groupDetail?.group?.userB
  const agentInfo = isAgent ? groupDetail?.group?.userB : data?.data

  if (!agentInfo && isLoading) {
    return (
      <div className="h-fit md:p-4">
        <Skeleton className="mx-auto min-h-[111px] max-w-[768px] md:rounded-[14px]" />
      </div>
    )
  }

  return (
    <>
      <div className="mx-auto min-h-[111px] w-full max-w-[768px] border border-mercury-100 bg-mercury-50 px-3 py-2 max-md:border-x-0 md:rounded-[14px] md:px-2">
        <div className="flex gap-x-3 md:gap-x-4">
          <AvatarCustom
            publicAddress={agentInfo?.publicAddress}
            src={agentInfo?.avatar}
            badgeClassName={getBadgeColor(RoleUser.BOT)}
            badgeIcon={<FilledBrainAIIcon size={14} />}
          />
          <div className="flex-1">
            <div className="flex justify-between gap-x-2 md:gap-x-4">
              <div>
                <h4 className="text-16 font-bold text-mercury-950">
                  {agentInfo?.username || "-"}
                </h4>
                <div className="flex items-center gap-x-1 max-[320px]:flex-wrap md:gap-x-2">
                  <span className="text-14 font-medium text-mercury-600">
                    Created by
                  </span>
                  <Link
                    to={`${PATH_NAMES.AUTHOR_PROFILE}/${agentOwner?.id}`}
                    className="group/item flex items-center gap-x-1"
                  >
                    <AvatarCustom
                      publicAddress={agentOwner?.publicAddress}
                      src={agentOwner?.avatar}
                      className="h-[18px] w-[18px]"
                    />
                    <span className="line-clamp-1 text-14 font-bold text-brown-10 group-hover/item:text-brown-10/70 md:text-16">
                      {agentOwner?.username}
                    </span>
                  </Link>
                </div>
              </div>

              <div className="flex gap-x-1 md:gap-x-2">
                <Button
                  isIconOnly
                  isDisabled={!agentInfo}
                  onPress={onOpen}
                  className="rounded-full border border-mercury-50 bg-mercury-100 md:h-9 md:min-w-[52px]"
                >
                  <ShareWithQrIcon />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-x-2 md:gap-x-4">
              <p className="line-clamp-2 text-14 font-medium text-mercury-600 md:line-clamp-3">
                {agentInfo?.description || "Distilled AI Agent"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ShareQRModal
        isOpen={isOpen}
        onClose={onClose}
        shareUrl={`${window.location.origin}${PATH_NAMES.INVITE}/${agentInfo?.id}`}
        title="Agent QR"
      />
    </>
  )
}

export default AgentInfoCard
