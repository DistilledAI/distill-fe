import { distilledAiCircleLogo } from "@assets/images"
import { useAppDispatch, useAppSelector } from "@hooks/useAppRedux"
import useAuthState from "@hooks/useAuthState"
import {
  TopChatAnnounceState,
  updateTopChatAnnounce,
} from "@reducers/userTopChatAnnounceSlice"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { getUserTopChat } from "services/user"
import { twMerge } from "tailwind-merge"

const TopChatAnnounce = () => {
  const dispatch = useAppDispatch()
  const topChatAnnounce: TopChatAnnounceState = useAppSelector(
    (state) => state.topChatAnnounce,
  )
  const { user, isAnonymous } = useAuthState()

  useEffect(() => {
    ;(async () => {
      if (user?.id && !isAnonymous && topChatAnnounce !== "dontShowAgain") {
        const res = await getUserTopChat()
        if (res?.data[user?.id]) {
          dispatch(updateTopChatAnnounce("open"))
        }
      }
    })()
  }, [user?.id, isAnonymous, topChatAnnounce])

  if (topChatAnnounce === "close" || topChatAnnounce === "dontShowAgain")
    return null

  return (
    <div
      className={twMerge(
        "absolute inset-x-4 top-[-68px] flex rounded-b-[22px] border border-t-0 border-brown-500 bg-orange-100 px-6 py-1",
      )}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
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
        <p className="text-14 font-medium leading-[110%]">
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
          className="rounded-full border border-mercury-900 bg-mercury-950 px-4 py-[2px] text-16 font-medium text-white"
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

export default TopChatAnnounce
