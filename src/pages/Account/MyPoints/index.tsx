import { creditBg, xDSTL } from "@assets/images"
import {
  AccountInfo,
  CircleCheckFilled,
  GoogleLogo,
  WarningIcon,
} from "@components/Icons"
import { TwitterIcon } from "@components/Icons/Twitter"
import KycModal from "@components/KycModal"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import useFetchMe from "@hooks/useFetchMe"
import { Button, Spinner, Tooltip, useDisclosure } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import { postCodeKYC } from "services/user"
import { twMerge } from "tailwind-merge"

const MyPoints = () => {
  const { user } = useAuthState()
  const { fetchData } = useFetchMe(false)
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchParams] = useSearchParams()
  const code = searchParams.get("code")
  const [loading, setLoading] = useState(false)
  const totalxDstlPoint = user?.xDstlPoint || 0

  const isVerified = !!user.kycEmail || !!user.kycTwitter

  const handleUserKYC = async (code: string) => {
    try {
      setLoading(true)
      const redirectUri = `${window.location.origin}/account`
      const res = await postCodeKYC({
        code,
        redirectUri,
        kycPlatform: "x",
        targetId: "1819330112082661378",
      })
      if (res.data) fetchData()
    } catch (error: any) {
      console.error(error)
      if (error.response.data.error_description) {
        toast.error(error.response.data.error_description)
      } else if (error.response.data.message) {
        toast.error(error.response.data.message)
      } else toast.error("Something went wrong, please try again!")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (code && !isVerified) handleUserKYC(code)
  }, [code, isVerified])

  return (
    <div
      style={{
        backgroundImage: `url(${creditBg})`,
      }}
      className="h-full rounded-[22px] border-1 bg-cover bg-center bg-no-repeat p-4 md:px-6 md:py-8"
    >
      <div className="mb-2 flex items-center justify-between leading-none">
        <span className="font-medium text-mercury-300">My Points</span>
        <div className="flex items-center gap-2">
          <img src={xDSTL} width={24} height={24} />
          <span className="text-[32px] font-bold text-white">
            {totalxDstlPoint}
          </span>
        </div>
      </div>
      {user.kycEmail || user.kycTwitter ? (
        <>
          <div className="mb-6 flex items-center justify-between leading-none">
            <span className="font-medium text-mercury-600">Balance:</span>
            <span className="font-medium text-mercury-600">
              {totalxDstlPoint} xDSTL ($-)
            </span>
          </div>

          <div className="mb-7 mt-3 flex items-center justify-between leading-none">
            <span className="font-medium text-mercury-600">
              KYC Verification:
            </span>
            <div className="flex items-center gap-1 text-[#2CB34E]">
              {user.kycEmail && <GoogleLogo size={15} />}
              {user.kycTwitter && (
                <Tooltip
                  content={`@${JSON.parse(user.kycTwitter).username}`}
                  placement="top"
                >
                  <div>
                    <TwitterIcon size={15} color="#c8c8c8" />
                  </div>
                </Tooltip>
              )}
              <CircleCheckFilled /> Verified
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-3 flex items-center justify-between leading-none">
            <span className="font-medium text-mercury-600">
              KYC Verification:
            </span>
            <div className="flex items-center gap-1 text-[#F78500]">
              <WarningIcon color="#F78500" /> Unverified
            </div>
          </div>

          <p className="mb-3 mt-1 text-[#F78500]">
            Complete your KYC verification to earn xDSTL and farm EXP on Clan.
          </p>
        </>
      )}

      <div className="flex items-center justify-between gap-1">
        <Button
          className="w-full rounded-full border border-mercury-900 bg-mercury-900/20 text-[14px] font-medium text-white max-md:min-h-12 md:text-[16px]"
          onClick={() => navigate(PATH_NAMES.REWARDS)}
        >
          Earn more points
        </Button>
        <Button
          onClick={onOpen}
          isDisabled={isVerified}
          className={twMerge(
            "w-full rounded-full !border !border-mercury-900 bg-[rgba(195,195,195,0.20)] text-[14px] font-medium text-white max-md:min-h-12 md:text-[16px]",
            loading && "opacity-60",
          )}
        >
          <div className="flex items-center gap-1">
            {loading ? <Spinner size="sm" /> : <AccountInfo />}
            Verify Account
          </div>
        </Button>
      </div>
      <KycModal isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export default MyPoints
