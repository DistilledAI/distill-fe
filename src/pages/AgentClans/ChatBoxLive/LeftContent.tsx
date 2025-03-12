import { bgBtcPrediction, bitmaxAva, btcIconRote } from "@assets/images"
import { solanaCircleIcon } from "@assets/svg"
import AudioClanCustom from "@components/AudioClanCustom"
import { AgentDotLandIcon } from "@components/Icons/FilledSquareCircleIcon"
import VideoCustom from "@components/VideoCustom"
import { PATH_NAMES } from "@constants/index"
import { Skeleton } from "@nextui-org/react"
import {
  IGroup,
  UserGroup,
} from "@pages/ChatPageOld/ChatContainer/LeftBar/useFetchGroups"
import { StakeTokenAddress } from "@pages/Stake"
import { getInfoTokenByAddress } from "@pages/Stake/helpers"
import { useQueries, useQueryClient } from "@tanstack/react-query"
import React, { lazy, useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import AgentDescription from "./AgentDescription"
import AgentSocials from "./AgentSocials"
import ContractDisplay from "./ContractDisplay"
import DaoButton from "./DaoButton"
import TradeTokenButton from "./TradeTokenButton"
import VaultButton from "./VaultButton"
import { ArrowsMaximizeIcon, ArrowsMinimizeIcon } from "@components/Icons/Arrow"
import { SkeletonDesc } from "./SkeletonInfo"
import { CLAN_CONFIG_KEYS } from "@pages/AgentDetail/AgentContent/ClanUtilities/types"
import { useGroupConfig } from "./useGroupConfig"
import { MessagePlusIcon } from "@components/Icons/Message"

const BetModal = lazy(() => import("@components/BetModal"))

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

const LeftContent: React.FC<{
  groupDetail: UserGroup | null
  isFetched: boolean
}> = ({ groupDetail, isFetched }) => {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const prediction = searchParams.get("prediction")
  const [isOpenModal, setOpenModal] = useState<boolean>(false)
  const [maximizeImage, setMaximizeImage] = useState<boolean>(false)

  const onOpenChange = () => setOpenModal(!isOpenModal)
  const onOpen = () => setOpenModal(true)

  const groupConfig = useGroupConfig(groupDetail?.group as IGroup)

  useEffect(() => {
    if (prediction && groupConfig[CLAN_CONFIG_KEYS.IS_PREDICTION]) onOpen()
  }, [prediction, groupConfig[CLAN_CONFIG_KEYS.IS_PREDICTION]])

  const [agentLiveVolume] = useQueries({
    queries: [
      {
        initialData: true,
        queryKey: [QueryDataKeys.AGENT_LIVE_VOLUME],
        staleTime: Infinity,
      },
    ],
  })
  const isMuted = !!agentLiveVolume.data

  const renderAgentLandButton = () => (
    <div
      className="absolute -top-3 right-[1px] z-50 flex h-7 cursor-pointer items-center gap-1 rounded-full border border-[#FC9880] bg-[#FF7A5A] px-3 py-[6px]"
      onClick={() => window.open("https://agents.land/", "_blank")}
    >
      <AgentDotLandIcon color="#363636" size={16} />
      <span className="text-14 font-semibold text-mercury-950">
        Agents.land
      </span>
    </div>
  )

  const renderVideoContent = () => (
    <div className="relative">
      <VideoCustom
        videoSrc={groupConfig[CLAN_CONFIG_KEYS.IMAGES_LIVE] ?? ""}
        classNames={{
          video: twMerge(
            "h-full w-full rounded-lg md:rounded-[32px] object-cover md:max-h-[400px] md:h-[400px]",
          ),
        }}
        skeletonPreview={
          <Skeleton className="h-[300px] rounded-lg md:h-[400px] md:rounded-[32px]" />
        }
        imgPreview={groupConfig[CLAN_CONFIG_KEYS.IMAGES_LIVE] ?? ""}
        isVolumeIcon
        onMuteToggle={(muted) =>
          queryClient.setQueryData<boolean>(
            [QueryDataKeys.AGENT_LIVE_VOLUME],
            () => muted,
          )
        }
        muted={isMuted}
      />
      {groupConfig[CLAN_CONFIG_KEYS.IS_PREDICTION] && (
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
  )

  const renderImageContent = () => <ImageLive groupConfig={groupConfig} />

  const isVideo = (url?: string) => /\.(mp4|webm|ogg)$/i.test(url || "")

  return (
    <div
      className={twMerge(
        "max-md:max-h-auto flex max-h-[calc(100dvh-68px)] w-full max-w-full flex-col overflow-y-auto transition-all duration-300 ease-linear scrollbar-hide md:relative md:pt-3 lg:max-w-[320px]",
        "max-md:absolute max-md:right-2 max-md:top-3 max-md:z-50 max-md:h-[182px] max-md:w-[146px]",
        maximizeImage &&
          "max-md:bottom-20 max-md:h-[calc(100%-80px)] max-md:w-[calc(100%-16px)]",
      )}
    >
      <div className="relative h-full w-full">
        {!groupConfig[CLAN_CONFIG_KEYS.TRADE_LINK] &&
          !groupConfig[CLAN_CONFIG_KEYS.IS_PREDICTION] &&
          renderAgentLandButton()}
        <div className="flex h-full flex-col md:h-fit">
          {isFetched && groupDetail !== null ? (
            isVideo(groupConfig[CLAN_CONFIG_KEYS.IMAGES_LIVE]) ? (
              renderVideoContent()
            ) : (
              renderImageContent()
            )
          ) : (
            <Skeleton className="h-[300px] rounded-lg md:h-[400px] md:rounded-[32px]" />
          )}
          {isFetched && groupDetail !== null ? (
            <div className="hidden md:block">
              <VaultButton
                key={groupConfig[CLAN_CONFIG_KEYS.CONTRACT_ADDRESS]}
                address={groupConfig[CLAN_CONFIG_KEYS.CONTRACT_ADDRESS] || null}
              />
              <div
                className={twMerge(
                  "mt-3 hidden md:block",
                  groupConfig[CLAN_CONFIG_KEYS.CONTRACT_ADDRESS] &&
                    getInfoTokenByAddress(
                      groupConfig[
                        CLAN_CONFIG_KEYS.CONTRACT_ADDRESS
                      ] as StakeTokenAddress,
                    ) &&
                    "!grid grid-cols-2 gap-2 max-md:grid-cols-1",
                )}
              >
                <DaoButton
                  address={
                    groupConfig[CLAN_CONFIG_KEYS.CONTRACT_ADDRESS] || null
                  }
                />
                <div className="max-md:hidden">
                  <TradeTokenButton
                    tradeLink={groupConfig[CLAN_CONFIG_KEYS.TRADE_LINK] ?? ""}
                  />
                </div>
              </div>
              <ContractDisplay
                classNames={{ wrapper: "mt-3 hidden md:flex" }}
                icon={
                  groupConfig[CLAN_CONFIG_KEYS.CONTRACT_ADDRESS]
                    ? solanaCircleIcon
                    : ""
                }
                value={groupConfig[CLAN_CONFIG_KEYS.CONTRACT_ADDRESS] || ""}
              />
            </div>
          ) : null}
        </div>
        <div className="mt-2 hidden md:block">
          {isFetched && groupDetail !== null ? (
            <AgentDescription
              description={groupConfig[CLAN_CONFIG_KEYS.DESCRIPTION] ?? ""}
            />
          ) : (
            <SkeletonDesc />
          )}
          <div className="mt-3 flex items-center justify-between">
            <AgentSocials
              agentInfo={{
                username: groupDetail?.group?.name ?? "",
                xLink: groupConfig[CLAN_CONFIG_KEYS.X] ?? "",
                teleLink: groupConfig[CLAN_CONFIG_KEYS.TELEGRAM] ?? "",
                shareLink: `${window.location.origin}${PATH_NAMES.CLAN}/${groupDetail?.group?.label ?? ""}`,
                contract: groupConfig[CLAN_CONFIG_KEYS.CONTRACT_ADDRESS] ?? "",
                website: groupConfig[CLAN_CONFIG_KEYS.WEBSITE] ?? "",
              }}
              classNames={{
                wrapper: "hidden md:flex",
                button: "p-0 !min-w-fit !w-fit !h-fit bg-transparent",
              }}
            />
            <Link
              className="flex items-center gap-2 rounded-full bg-mercury-950 px-3 py-1 text-15 font-medium text-white hover:opacity-70"
              to={`${PATH_NAMES.INVITE}/${groupDetail?.group?.clanOfAgentId}`}
            >
              <MessagePlusIcon color="white" />
              <span>Chat private now</span>
            </Link>
          </div>
        </div>
        {isOpenModal && (
          <BetModal onOpenChange={onOpenChange} isOpen={isOpenModal} />
        )}
        <button
          className="absolute bottom-3 right-3 md:hidden"
          onClick={() => setMaximizeImage(!maximizeImage)}
        >
          {!maximizeImage ? (
            <ArrowsMaximizeIcon color="#FFFFFF" />
          ) : (
            <ArrowsMinimizeIcon color="#FFFFFF" />
          )}
        </button>
      </div>
    </div>
  )
}

export default LeftContent

const ImageLive = ({ groupConfig }: { groupConfig: GroupConfig }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-mercury-70 md:h-[400px] md:rounded-[32px]">
      {groupConfig[CLAN_CONFIG_KEYS.IMAGES_LIVE] && (
        <img
          className={twMerge(
            "h-full w-full object-cover",
            !isLoaded && "hidden",
          )}
          src={groupConfig[CLAN_CONFIG_KEYS.IMAGES_LIVE]}
          alt="agent avatar clan"
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
      {!isLoaded && (
        <Skeleton className="h-[300px] rounded-lg md:h-[400px] md:rounded-[32px]" />
      )}
      {groupConfig[CLAN_CONFIG_KEYS.AUDIO_LIVE] && (
        <AudioClanCustom audioSrc={groupConfig[CLAN_CONFIG_KEYS.AUDIO_LIVE]!} />
      )}
    </div>
  )
}
