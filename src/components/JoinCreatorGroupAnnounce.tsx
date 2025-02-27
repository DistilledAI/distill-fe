import { distilledAiCircleLogo } from "@assets/images"
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
        "fixed right-4 top-0 z-[49] flex w-[calc(100%-114px)] flex-col gap-2 rounded-b-[22px] border border-t-0 border-brown-500 bg-orange-100 px-2 py-1 duration-300 max-sm:right-0 max-sm:w-full md:flex-row md:px-6",
      )}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 max-md:justify-center">
          <img
            src={distilledAiCircleLogo}
            alt="distilled ai logo"
            className="h-4 w-4 object-cover"
          />
          <h4 className="text-16 font-medium leading-[125%]">
            You’re Invited to{" "}
            <span className="font-bold">Our Creator Community!</span>
          </h4>
        </div>
        <p className="text-14 font-medium leading-[110%] max-md:text-center">
          Not everyone gets this chance —{" "}
          <span className="font-bold">
            your contributions have earned you a spot.{" "}
          </span>
          Join our exclusive group to{" "}
          <span className="font-bold">
            connect directly with the Distilled AI team
          </span>
          , share feedback & ideas, and shape the future of AI.
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <Link
          to="https://t.me/+05p4nHkoL6RmMmJl"
          target="_blank"
          className="rounded-full border border-mercury-900 bg-mercury-950 px-4 py-[2px] text-center text-16 font-medium text-white"
        >
          Join us here
        </Link>
        <button
          type="button"
          className="text-13 font-medium text-mercury-900 underline"
          onClick={() => dispatch(updateTopChatAnnounce("dontShowAgain"))}
        >
          Don’t show this again
        </button>
      </div>
    </div>
  )
}

export default JoinCreatorGroupAnnounce
