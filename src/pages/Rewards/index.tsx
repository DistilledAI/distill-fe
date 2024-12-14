import { creditBg } from "@assets/images"
import { CopyIcon } from "@components/Icons/Copy"
import { QRCodeIcon } from "@components/Icons/QRCode"
import {
  SpeakerPhoneIcon,
  UsersGroupIcon,
} from "@components/Icons/RewardsIcons"
import ShareModal from "@components/ShareQRModal"
import useAuthState from "@hooks/useAuthState"
import { Button, Divider, useDisclosure } from "@nextui-org/react"
import { copyClipboard } from "@utils/index"
import { useEffect, useState } from "react"
import { getTaskSuccess, getUserClaimTaskSuccess } from "services/agent"
import { getReferralCode } from "services/user"
import Objectives from "./Objectives"
import useFetchMe from "@hooks/useFetchMe"

export const XDSTL_TASK_KEY = {
  LOGIN: "LOGIN",
  CONNECT_X: "CONNECT_X",
  RETWEET_X: "RETWEET_X",
  CHAT_WITH_AGENT: "CHAT_WITH_AGENT",
  BUG_REPORT: "BUG_REPORT",

  PUBLISH_BOT: "PUBLISH_BOT",
  BIND_TELE_FOR_BOT: "BIND_TELE_FOR_BOT",
  BIND_X_FOR_BOT: "BIND_X_FOR_BOT",
  TOKENIZE_AGENT: "TOKENIZE_AGENT",

  JOIN_CLAN: "JOIN_CLAN",
}

const Rewards: React.FC = () => {
  const { user } = useAuthState()
  const referralCode = user?.code
  const totalxDstlPoint = user?.xDstlPoint || 0
  const refLink = `${window.location.origin}/?invite=${referralCode}` as any
  const [listTaskSuccess, setListTaskSuccess] = useState<any>([])
  const listActionTaskSuccess = listTaskSuccess?.map((item: any) => item.action)
  const [totalReferral, setTotalReferral] = useState<number>(0)
  const { fetchData } = useFetchMe(false)

  const {
    isOpen: isOpenQR,
    onOpen: onOpenQR,
    onClose: onCloseQR,
  } = useDisclosure()

  const callGetReferralCode = async () => {
    try {
      const res = await getReferralCode()
      setTotalReferral(res?.data?.total)
    } catch (error) {
      console.log("error", error)
    }
  }

  const callGetTaskSuccess = async () => {
    try {
      const res = await getTaskSuccess()
      if (res) {
        setListTaskSuccess(res?.data)
        fetchData()
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  const callGetUserClaimTaskSuccess = async () => {
    try {
      await getUserClaimTaskSuccess()
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    callGetUserClaimTaskSuccess()
    callGetTaskSuccess()
    callGetReferralCode()
  }, [])

  return (
    <>
      <div className="sticky top-[50px] z-[11] flex items-center justify-center bg-white bg-lgd-muted-beige p-3 max-sm:px-4 md:top-[68px]">
        <div className="flex w-full max-w-[800px] flex-wrap items-center justify-between px-4 max-sm:flex-col max-sm:items-start max-sm:px-0">
          <div className="flex flex-col">
            <span className="text-24 font-semibold text-mercury-950 max-sm:text-18">
              Mesh Rewards Hub
            </span>
            <span className="text-base font-medium text-mercury-500 max-sm:text-14">
              Earn xDSTL points by completing objectives and referring friends.
            </span>
          </div>
          <div className="flex gap-3 max-sm:mt-2 max-sm:flex-wrap max-sm:gap-1" />
        </div>
      </div>

      <div className="relative mx-auto max-w-[800px] px-4 py-5 max-md:min-h-dvh max-md:bg-mercury-70 max-md:pt-[70px] max-sm:pb-20 max-sm:pt-6">
        <div className="mb-6 mt-2 flex flex-col max-md:mb-4 max-md:mt-0">
          <div className="flex items-center gap-2">
            <SpeakerPhoneIcon />
            <span className="text-22 font-semibold text-mercury-950 max-sm:text-18">
              Share your code to Earn extra points!
            </span>
          </div>
          <span className="text-base font-medium text-mercury-800 max-sm:text-14">
            Earn 100 xDSTL per friend who joins and completes the
            <span className="font-bold text-brown-500"> Welcome Gift</span>{" "}
            objective.
            <br />
            Plus, your referred friend also earns 10 xDSTL!
          </span>
          <p className="mt-1 text-mercury-600">
            Note: Your friends must log in to Mesh using a Web3 wallet that has
            conducted at least one blockchain transaction
          </p>
        </div>
        <div
          style={{
            backgroundImage: `url(${creditBg})`,
          }}
          className="h-full w-[88%] rounded-[22px] border-1 bg-cover bg-center bg-no-repeat px-6 py-8 max-md:w-full max-md:p-4"
        >
          <div className="mb-2 flex items-center justify-between leading-none">
            <span className="font-medium text-mercury-300">My Referred</span>
            <div className="flex items-center gap-2">
              <UsersGroupIcon />
              <span className="text-[32px] font-bold text-white max-md:text-[22px]">
                {totalReferral}/1000
              </span>
            </div>
          </div>
          <div className="my-4 grid grid-cols-8 gap-3">
            <div
              className="col-span-6 flex cursor-pointer items-center justify-between rounded-lg border-1 border-mercury-900 bg-[rgba(84,84,84,0.20)] px-3 py-2"
              onClick={(e) => copyClipboard(e, refLink)}
            >
              <span className="text-base-md text-white">
                {window.location.origin}/?invite=
                <span className="text-[#BCAA88]">{referralCode}</span>
              </span>
              <div className="cursor-pointer">
                <CopyIcon color="#FFFFFF" />
              </div>
            </div>
            <Button
              className="col-span-2 w-full rounded-full !border !border-mercury-900 bg-[rgba(195,195,195,0.20)] text-[14px] font-medium text-white max-md:min-h-12 md:text-[16px]"
              onClick={onOpenQR}
            >
              <QRCodeIcon color="#FFFF" />
              <span className="text-base-md text-white">Share</span>
            </Button>
          </div>

          {/* <div className="flex items-center justify-between leading-none">
            <span className="text-base-md text-mercury-600">You got:</span>

            <div className="flex items-center gap-2">
              <img src={xDSTL} width={16} height={16} />
              <span className="text-base-md text-mercury-600">200 xDSTL</span>
            </div>
          </div> */}
        </div>
        <Divider className="my-8 max-md:my-4" />
        <Objectives
          listActionTaskSuccess={listActionTaskSuccess}
          callGetTaskSuccess={callGetTaskSuccess}
          totalxDstlPoint={totalxDstlPoint}
          listTaskSuccess={listTaskSuccess}
        />
        <ShareModal
          shareUrl={`${window.location.origin}/?invite=${referralCode}`}
          isOpen={isOpenQR}
          onClose={onCloseQR}
        />
      </div>
    </>
  )
}
export default Rewards
