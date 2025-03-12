import { bannerConnectWallet } from "@assets/images"
import CloseButton from "@components/CloseButton"
import { useAppDispatch, useAppSelector } from "@hooks/useAppRedux"
import useAuthState from "@hooks/useAuthState"
import useWindowSize from "@hooks/useWindowSize"
import { updateInstructBanner } from "@reducers/instructBannerSlice"
import { useEffect } from "react"

const InstructionBanner = () => {
  const dispatch = useAppDispatch()
  const { isAnonymous, isLogin } = useAuthState()
  const instructBanner = useAppSelector((state) => state.instructBanner)
  const { isMobile } = useWindowSize()

  useEffect(() => {
    if (!isAnonymous && isLogin) {
      dispatch(updateInstructBanner(false))
    }
  }, [isAnonymous, isLogin])

  if (isMobile || !instructBanner || (!isAnonymous && isLogin)) {
    return null
  }

  return (
    <div className="absolute right-12 top-16">
      <div className="relative">
        <CloseButton
          className="absolute -left-3 -top-3 border border-mercury-300 !bg-mercury-100"
          onClose={() => dispatch(updateInstructBanner(false))}
        />

        <img
          src={bannerConnectWallet}
          className="h-[145px] w-[258px] rounded-lg border border-mercury-300"
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default InstructionBanner
