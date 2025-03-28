import { distilledAiPlaceholder } from "@assets/images"
import { EditPenOutlineIcon } from "@components/Icons/Edit"
import { PlusIcon } from "@components/Icons/Plus"
import HeaderBack from "@components/Layout/Header/HeaderBack"
import { VideoThumbnailWrapper } from "@components/VideoThumbnailWrapper"
import { PATH_NAMES, RoleUser, STATUS_AGENT } from "@constants/index"
import { useAppDispatch, useAppSelector } from "@hooks/useAppRedux"
import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import { Button } from "@nextui-org/react"
import { updateConnectedWalletStatus } from "@reducers/connectWalletSlice"
import { useCallback, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

interface Props {
  imageUrl?: string
}

const BUTTON_BASE_CLASS = "h-14 rounded-full text-[16px] font-bold"
const TEXT_BASE_CLASS = "text-16 font-semibold text-mercury-950 md:text-18"
const HIGHLIGHT_TEXT_CLASS = "text-brown-500"

const MyAgentClanEmpty: React.FC<Props> = ({ imageUrl }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const agent = useAppSelector((state) => state.agents.myAgent)
  const isConnectedWallet = useAppSelector(
    (state) => state.connectWalletReducer.isConnectedWallet,
  )
  const { user } = useAuthState()
  const { connectMultipleWallet, loading } = useConnectWallet()

  const isAgentActive = agent?.status === STATUS_AGENT.ACTIVE
  const isUserLogged = user?.publicAddress && user.role !== RoleUser.ANONYMOUS

  const queryParams = new URLSearchParams(location.search)
  const action = queryParams.get("action")

  const navigateToCreateAgent = useCallback(() => {
    navigate(PATH_NAMES.CREATE_AGENT)
  }, [navigate])

  const navigateToEditAgent = useCallback(() => {
    if (agent?.id) {
      navigate(`${PATH_NAMES.AGENT_DETAIL}/${agent.id}?tab=clan_utilities`)
    }
  }, [navigate, agent?.id])

  const handleNavCreateAgent = useCallback(() => {
    if (!isUserLogged) {
      navigate({ search: "action=create-agent" }, { replace: true })
      connectMultipleWallet()
    } else {
      navigateToCreateAgent()
    }
  }, [isUserLogged])

  useEffect(() => {
    if (isConnectedWallet) {
      if (!agent?.id && action === "create-agent") {
        navigateToCreateAgent()
      }
      dispatch(updateConnectedWalletStatus(false))
    }
  }, [isConnectedWallet, action, agent?.id])

  const renderContent = () => {
    if (!agent) {
      return (
        <p className={TEXT_BASE_CLASS}>
          Please{" "}
          <span className={HIGHLIGHT_TEXT_CLASS}>Create Your First Agent</span>
        </p>
      )
    }

    if (!isAgentActive) {
      return (
        <p className={TEXT_BASE_CLASS}>
          Please wait for your agent to be activated
        </p>
      )
    }

    return (
      <p className={TEXT_BASE_CLASS}>
        Please enable Clan on the{" "}
        <span className={HIGHLIGHT_TEXT_CLASS}>Edit Agent</span> page.
      </p>
    )
  }

  return (
    <div className="flex h-[calc(100dvh-68px)] w-full flex-col items-center justify-center">
      <HeaderBack onBack={() => navigate(PATH_NAMES.MY_AGENT_CLAN)} />
      <p className={TEXT_BASE_CLASS}>Your Agent Clan is not enabled yet.</p>
      {renderContent()}

      <VideoThumbnailWrapper videoUrl={imageUrl}>
        {(thumbnail, _, isVideo) =>
          isVideo ? (
            <video
              preload="auto"
              muted
              autoPlay
              playsInline
              loop
              controls={false}
              className="my-4 h-[300px] w-auto rounded-[32px] object-cover px-3 md:mt-10 md:h-[419px] md:w-[419px]"
            >
              <source src={imageUrl} type="video/mp4" />
              <track kind="captions" />
            </video>
          ) : (
            <img
              src={thumbnail || distilledAiPlaceholder}
              className="my-4 h-[300px] w-auto rounded-[32px] object-cover px-3 md:mt-10 md:h-[419px] md:w-[419px]"
              alt="avatar placeholder"
            />
          )
        }
      </VideoThumbnailWrapper>

      <div className="flex items-center gap-2">
        {!agent ? (
          <Button
            className={`${BUTTON_BASE_CLASS} bg-mercury-950 text-mercury-30`}
            isLoading={loading}
            onPress={handleNavCreateAgent}
            isDisabled={true}
          >
            <PlusIcon color="#FAFAFA" />
            Create Agent
          </Button>
        ) : (
          <Button
            className={`${BUTTON_BASE_CLASS} bg-brown-50 text-brown-600`}
            isLoading={loading}
            onPress={navigateToEditAgent}
            isDisabled={!isAgentActive}
          >
            <EditPenOutlineIcon color="#83664B" size={20} />
            Edit Agent
          </Button>
        )}
      </div>
    </div>
  )
}

export default MyAgentClanEmpty
