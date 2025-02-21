import { bgBtcPrediction, bitmaxAva, btcIconRote } from "@assets/images"
import { solanaCircleIcon } from "@assets/svg"
import AudioClanCustom from "@components/AudioClanCustom"
import { AgentDotLandIcon } from "@components/Icons/FilledSquareCircleIcon"
import VideoCustom from "@components/VideoCustom"
import { PATH_NAMES } from "@constants/index"
import { Skeleton } from "@nextui-org/react"
import {
  GroupConfig,
  UserGroup,
} from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"
import { StakeTokenAddress } from "@pages/Stake"
import { getInfoTokenByAddress } from "@pages/Stake/helpers"
import { useQueries, useQueryClient } from "@tanstack/react-query"
import React, { lazy, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import AgentDescription from "./AgentDescription"
import AgentSocials from "./AgentSocials"
import ContractDisplay from "./ContractDisplay"
import DaoButton from "./DaoButton"
import SkeletonInfo, { SkeletonDesc } from "./SkeletonInfo"
import TradeTokenButton from "./TradeTokenButton"
import VaultButton from "./VaultButton"

const BetModal = lazy(() => import("@components/BetModal"))

const LeftContent: React.FC<{
  groupDetail: UserGroup | null
  isFetched: boolean
}> = ({ groupDetail, isFetched }) => {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const prediction = searchParams.get("prediction")
  const [isOpenModal, setOpenModal] = useState<boolean>(false)

  const onOpenChange = () => {
    setOpenModal(!isOpenModal)
  }

  const onOpen = () => {
    setOpenModal(true)
  }

  const groupConfig: GroupConfig | null = groupDetail?.group?.config
    ? JSON.parse(groupDetail.group.config)
    : null

  useEffect(() => {
    if (!!prediction && groupConfig?.isPrediction) onOpen()
  }, [prediction, groupConfig?.isPrediction])

  const [agentLiveVolume, closeLiveChat, expandLiveChat] = useQueries({
    queries: [
      {
        initialData: true,
        queryKey: [QueryDataKeys.AGENT_LIVE_VOLUME],
        staleTime: Infinity,
      },
      {
        queryKey: [QueryDataKeys.CLOSE_LIVE_CHAT],
        staleTime: 0,
      },
      {
        queryKey: [QueryDataKeys.EXPAND_LIVE_CHAT],
        staleTime: 0,
      },
    ],
  })
  const isMuted = !!agentLiveVolume.data
  const isCloseChatLive = !!closeLiveChat.data
  const isExpandLiveChat = !!expandLiveChat.data

  return (
    <div
      className={twMerge(
        "relative flex w-full max-w-full flex-col overflow-y-auto transition-all duration-300 ease-linear scrollbar-hide max-md:px-4 lg:max-w-[320px]",
        isExpandLiveChat && "hidden",
        isCloseChatLive && "h-[calc(100%-230px)]",
      )}
    >
      {groupConfig?.tradeLink && !groupConfig?.isPrediction && (
        <div
          className="absolute right-0 top-0 z-50 flex cursor-pointer items-center gap-1 rounded-full border border-[#FC9880] bg-[#FF7A5A] px-3 py-[6px]"
          onClick={() => window.open("https://agents.land/", "_blank")}
        >
          <AgentDotLandIcon color="#363636" />
          <span className="text-base-14 font-semibold text-mercury-950">
            Agents.land
          </span>
        </div>
      )}

      <div className="flex h-full flex-col md:h-fit">
        {!isFetched || groupDetail === null ? (
          <Skeleton className="h-[300px] rounded-[32px] md:h-[400px]"></Skeleton>
        ) : groupConfig?.videoLive ? (
          <div className="relative">
            <VideoCustom
              videoSrc={groupConfig.videoLive}
              classNames={{
                video: twMerge(
                  "h-full min-h-[350px] w-full rounded-[32px] object-cover max-h-[350px] md:max-h-[400px] md:h-auto",
                ),
              }}
              skeletonPreview={
                <Skeleton className="h-[300px] rounded-[32px] md:h-[400px]"></Skeleton>
              }
              imgPreview={groupConfig.imageLive}
              isVolumeIcon
              onMuteToggle={(muted) =>
                queryClient.setQueryData<boolean>(
                  [QueryDataKeys.AGENT_LIVE_VOLUME],
                  () => muted,
                )
              }
              muted={isMuted}
            />

            {groupConfig.isPrediction && (
              <div
                onClick={onOpen}
                className="absolute bottom-2 left-3 right-3 flex cursor-pointer items-center justify-between rounded-full bg-[rgba(52,54,54,0.7)] px-2 py-2 backdrop-blur-[10px]"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-3 w-3 items-center justify-center rounded-full bg-[#A5DC004D]">
                    <div className="h-2 w-2 rounded-full bg-[#58DC00]"></div>
                  </div>
                  <p className="text-14 font-medium leading-4 text-white">
                    Play to <br /> Earn $MAX
                  </p>
                </div>
                <div
                  style={{
                    backgroundImage: `url(${bgBtcPrediction})`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="flex h-[50px] items-center gap-2 rounded-full px-3"
                >
                  <div className="relative">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={bitmaxAva}
                      loading="lazy"
                    />
                    <img
                      className="absolute bottom-[-2px] right-[-2px] h-4 w-4"
                      src={btcIconRote}
                      loading="lazy"
                    />
                  </div>
                  <p className="whitespace-nowrap font-extrabold italic text-white">
                    <span className="text-[#F7931A]">$BTC</span> Prediction
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <ImageLive groupConfig={groupConfig} />
        )}

        {isFetched && groupDetail !== null ? (
          <>
            <VaultButton
              key={groupConfig?.contractAddress}
              address={groupConfig?.contractAddress as StakeTokenAddress}
            />
            <div
              className={twMerge(
                "mt-3 hidden md:block",
                groupConfig?.contractAddress &&
                  getInfoTokenByAddress(
                    groupConfig?.contractAddress as StakeTokenAddress,
                  ) &&
                  "!grid grid-cols-2 gap-2 max-md:grid-cols-1",
              )}
            >
              <DaoButton
                address={groupConfig?.contractAddress as StakeTokenAddress}
              />
              <div className="max-md:hidden">
                <TradeTokenButton tradeLink={groupConfig?.tradeLink} />
              </div>
            </div>
            <ContractDisplay
              classNames={{
                wrapper: "mt-3 hidden md:flex",
              }}
              icon={groupConfig?.contractAddress ? solanaCircleIcon : ""}
              value={groupConfig?.contractAddress}
            />
          </>
        ) : (
          <SkeletonInfo />
        )}
      </div>

      <div className="mt-2 hidden md:block">
        {isFetched && groupDetail !== null ? (
          <AgentDescription description={groupConfig?.description} />
        ) : (
          <SkeletonDesc />
        )}
        <AgentSocials
          agentInfo={{
            username: groupDetail?.group?.name,
            xLink: groupConfig?.x as string,
            teleLink: groupConfig?.telegram as string,
            shareLink: `${window.location.origin}${PATH_NAMES.CLAN}/${groupDetail?.group?.label}`,
            contract: groupConfig?.contractAddress as string,
            website: groupConfig?.website as string,
          }}
          classNames={{
            wrapper: "mt-3 hidden md:flex",
            button: "p-0 !min-w-fit !w-fit !h-fit bg-transparent",
          }}
        />
      </div>

      {isOpenModal && (
        <BetModal onOpenChange={onOpenChange} isOpen={isOpenModal} />
      )}
    </div>
  )
}
export default LeftContent

const ImageLive = ({ groupConfig }: { groupConfig: GroupConfig | null }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="relative h-[300px] min-h-[300px] w-full overflow-hidden rounded-[32px] bg-mercury-70 md:h-[400px]">
      <img
        className={twMerge("h-full w-full object-cover", !isLoaded && "hidden")}
        src={groupConfig?.imageLive}
        alt="agent avatar clan"
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
      {!isLoaded && (
        <Skeleton className="h-[300px] rounded-[32px] md:h-[400px]" />
      )}
      {groupConfig?.audioLive && (
        <AudioClanCustom audioSrc={groupConfig.audioLive} />
      )}
    </div>
  )
}
