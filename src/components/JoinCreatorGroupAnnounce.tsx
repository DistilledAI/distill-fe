import { creatorCommunityBg, distilledAiCircleLogo } from "@assets/images"
import { useAppDispatch, useAppSelector } from "@hooks/useAppRedux"
import useAuthState from "@hooks/useAuthState"
import {
  TopChatAnnounceState,
  updateTopChatAnnounce,
} from "@reducers/userTopChatAnnounceSlice"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { getUserPaidCreateAgent } from "services/user"
import { twMerge } from "tailwind-merge"
import { CloseFilledIcon } from "./Icons/DefiLens"
import { TelegramOutlineIcon } from "./Icons/SocialLinkIcon"

const USER_ID_LIST = [
  6649, 9503, 152261, 44602, 50626, 6037, 51452, 65953, 2760, 72209, 19398,
  45113, 144820, 48749, 84786, 54894, 11476, 2511, 54979, 2023, 45952, 72217,
  131481, 56585, 2540, 130483, 59652, 2723, 44352, 55825, 54453, 82207, 46486,
  66030, 124047, 48454, 61978, 40811, 139000, 66294, 61967, 129105, 131466,
  66589, 47539, 66296, 80986, 44746, 9363, 66064, 66101, 66204, 66618, 67142,
  66048, 66278, 66935, 66193, 66211, 67118, 66205, 66226, 66713, 66129, 66375,
  43748, 66069, 66276, 66456, 66113, 66124, 66179, 66207, 66271, 66280, 66059,
  66079, 66139, 66160, 66837, 66960, 66065, 66082, 66105, 66219, 66349, 66484,
  67008, 67018, 67029, 67182, 66131, 66248, 66275, 66287, 66444, 66716, 67098,
  67139, 67226, 1698, 1519, 98345,
]

const JoinCreatorGroupAnnounce = () => {
  const dispatch = useAppDispatch()
  const topChatAnnounce: TopChatAnnounceState = useAppSelector(
    (state) => state.topChatAnnounce,
  )
  const { user, isAnonymous } = useAuthState()

  useEffect(() => {
    let timeout: any = null
    timeout = setTimeout(() => {
      ;(async () => {
        if (user?.id && !isAnonymous && topChatAnnounce !== "dontShowAgain") {
          const res = await getUserPaidCreateAgent()

          if (USER_ID_LIST.includes(Number(user?.id)) || res?.data?.result) {
            dispatch(updateTopChatAnnounce("open"))
          } else {
            dispatch(updateTopChatAnnounce("close"))
          }
        }
      })()
    }, 2000)

    return () => clearTimeout(timeout)
  }, [user?.id, isAnonymous, topChatAnnounce, USER_ID_LIST])

  if (topChatAnnounce === "close" || topChatAnnounce === "dontShowAgain")
    return null

  return (
    <div
      className={twMerge(
        "fixed bottom-[60px] right-4 z-[51] flex h-[120px] w-[550px] flex-col items-center gap-2 rounded-[18px] bg-mercury-950 bg-cover bg-center bg-no-repeat p-4 duration-300 max-sm:right-3 max-sm:h-fit max-sm:w-[calc(100%-24px)] md:flex-row",
      )}
      style={{
        backgroundImage: `url(${creatorCommunityBg})`,
      }}
    >
      <div
        className="absolute right-4 top-2 flex cursor-pointer justify-end"
        onClick={() => dispatch(updateTopChatAnnounce("dontShowAgain"))}
      >
        <CloseFilledIcon color="#FFFF" size={18} />
      </div>
      <div className="flex-1 max-sm:mt-2">
        <div className="mb-2 flex items-center gap-2 max-md:justify-center">
          <img
            src={distilledAiCircleLogo}
            alt="distilled ai logo"
            className="h-6 w-6 object-cover"
          />
          <h4 className="text-base-md text-[#BCAA88]">
            You’re Invited to our{" "}
            <span className="font-bold">Creator Community!</span>
          </h4>
        </div>
        <p className="max-w-[80%] text-[12px] font-medium leading-5 text-white max-md:text-center max-sm:max-w-full">
          Join our exclusive group to{" "}
          <span className="font-bold">connect directly with the </span>
          <span className="font-bold">Distilled AI team</span>, share feedback &
          ideas, and shape the future of AI.
        </p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Link
          to="https://t.me/+05p4nHkoL6RmMmJl"
          target="_blank"
          className="flex h-[32px] items-center gap-1 rounded-full border border-mercury-900 bg-white px-4 text-center text-14 font-bold text-mercury-950"
        >
          <TelegramOutlineIcon />
          Join us here
        </Link>
        <button
          type="button"
          className="text-13 font-medium text-white underline"
          onClick={() => dispatch(updateTopChatAnnounce("dontShowAgain"))}
        >
          Don’t show this again
        </button>
      </div>
    </div>
  )
}

export default JoinCreatorGroupAnnounce
