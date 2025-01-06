import { CircleCheckFilled, CloudXIcon } from "@components/Icons"
import { CloudUpload } from "@components/Icons/CloudUpload"
import { CircleXFilledIcon } from "@components/Icons/DefiLens"
import { ShareArrowIcon } from "@components/Icons/Share"
import PublishedOnMarket from "@components/PublishedOnMarket"
import ShareQRModal from "@components/ShareQRModal"
import { PATH_NAMES, Publish, STATUS_AGENT } from "@constants/index"
import { Button, useDisclosure } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { IAgentData } from "types/user"
import usePublishOnMarket from "./usePublishOnMarket"

const Header: React.FC<{ agentData: IAgentData; submitLoading: boolean }> = ({
  agentData,
  submitLoading,
}) => {
  const userNameData = agentData?.username
  const isActive = agentData?.status === STATUS_AGENT.ACTIVE
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [isPublished, setIsPublished] = useState(
    agentData?.publish === Publish.Published,
  )

  useEffect(() => {
    setIsPublished(agentData?.publish === Publish.Published)
  }, [agentData?.publish])

  const {
    isOpen: isOpenPublished,
    onClose: onClosePublished,
    onOpen: onOpenPublished,
  } = useDisclosure()

  const callbackPublishDone = () => {
    setIsPublished(!isPublished)
    if (!isPublished) onOpenPublished()
  }
  const { onPublishOnMarket, loading } = usePublishOnMarket(callbackPublishDone)

  return (
    <div className="sticky top-[50px] z-[11] flex items-center justify-center bg-lgd-muted-beige p-3 backdrop-blur-3xl max-sm:px-4 md:top-[68px] md:ml-[24px]">
      <div className="ml-auto w-[calc(100%-352px)] max-sm:w-full">
        <div className="mx-auto flex w-full max-w-[800px] flex-wrap items-center justify-between px-4 max-sm:flex-col max-sm:items-start max-sm:px-0">
          <div className="flex flex-col">
            <span className="text-24 font-semibold text-mercury-950 max-sm:text-18">
              {userNameData}
            </span>
            {isPublished ? (
              <div className="flex items-center gap-1">
                <CircleCheckFilled />
                <span className="text-base font-medium text-green-500 max-sm:text-14">
                  Published
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <CircleXFilledIcon />
                <span className="text-base font-medium text-mercury-500 max-sm:text-14">
                  No publish yet
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-3 max-sm:mt-2 max-sm:flex-wrap max-sm:gap-1">
            <Button
              isDisabled={!isActive}
              onPress={onOpen}
              className="h-[44px] w-fit !min-w-[50px] rounded-full border border-mercury-50 bg-mercury-100 !p-0 max-sm:h-[38px]"
            >
              <ShareArrowIcon />
            </Button>
            <Button
              onPress={() => {
                if (isActive) onPublishOnMarket(agentData?.id)
              }}
              isDisabled={!isActive || loading}
              className="h-[44px] rounded-full border border-mercury-50 bg-mercury-100 max-sm:h-[38px]"
            >
              {isPublished ? <CloudXIcon /> : <CloudUpload />}
              <span className="text-base text-mercury-950 max-sm:text-[14px]">
                {isPublished ? "Unpublish" : "Publish"}
              </span>
            </Button>
            <Button
              isDisabled={!isActive}
              isLoading={submitLoading}
              className="h-[44px] rounded-full border border-mercury-50 bg-mercury-950 max-sm:h-[38px]"
              type="submit"
            >
              <span className="text-base text-mercury-30 max-sm:text-[14px]">
                Save
              </span>
            </Button>
          </div>
        </div>
      </div>
      <ShareQRModal
        shareUrl={`${window.location.origin}${PATH_NAMES.INVITE}/${agentData?.id}`}
        isOpen={isOpen}
        onClose={onClose}
      />
      <PublishedOnMarket
        isOpen={isOpenPublished}
        onClose={() => {
          onClosePublished()
        }}
        data={{
          avatar: agentData?.avatar ?? undefined,
          nameDisplay: agentData?.username,
          username: agentData?.username,
          description: agentData?.description ?? "",
          publicAddress: agentData?.publicAddress ?? agentData?.username,
          id: agentData?.id,
        }}
      />
    </div>
  )
}
export default Header
