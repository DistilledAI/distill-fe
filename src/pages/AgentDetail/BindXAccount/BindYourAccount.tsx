import { LinkAccountIcon } from "@components/Icons"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { TwitterOnlineIcon } from "@components/Icons/Twitter"
import {
  Button,
  Modal,
  ModalContent,
  Spinner,
  useDisclosure,
} from "@nextui-org/react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getXLogin, unBindXLogin, verifyXLogin } from "services/agent"
import { AgentConfig } from "../useFetchAgentConfig"

const BindYourAccount: React.FC<{
  agentConfigs: AgentConfig[]
  refetch: any
}> = ({ agentConfigs, refetch }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [loading, setLoading] = useState<boolean>(false)
  const [isVerifiedXLogin, setIsVerifiedXLogin] = useState(
    localStorage.getItem("isVerifiedXLogin"),
  )
  const [xLoginInfo, setXLoginInfo] = useState<any>(null)
  const xBotData = agentConfigs?.find(
    (agent: any) => agent.key === "bindTwitterKey",
  )
  const bindTwitterValue = xBotData?.value ? JSON.parse(xBotData.value) : null
  const twitterUsername =
    bindTwitterValue?.info?.data?.username || bindTwitterValue?.name
  const tokenSecret = xLoginInfo?.oauth_token_secret

  const callUnBindXLogin = async () => {
    try {
      const res = await unBindXLogin()
      if (res) {
        refetch()
        onClose()
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  }

  const callGetXLogin = async () => {
    try {
      const res = await getXLogin()
      if (res) {
        setXLoginInfo(res.data)
        return res.data
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  }

  const onLogin = async () => {
    setLoading(true)
    const xLoginInfoRes = await callGetXLogin()
    if (!xLoginInfoRes) {
      return setLoading(false)
    }
    const authorizeUrl = xLoginInfoRes?.authorizeUrl

    const width = 650
    const height = 730
    const screenWidth = window.screen.width || 1920
    const screenHeight = window.screen.height || 1080
    const left = Math.round((screenWidth - width) / 2)
    const top = Math.round((screenHeight - height) / 2)
    const safeTop = Math.max(0, top)
    const safeLeft = Math.max(0, left)

    const popup = window.open(
      authorizeUrl,
      "twitter",
      `menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=${width},height=${height},top=${safeTop},left=${safeLeft}`,
    )

    if (!popup) {
      toast.error(
        "Unable to open the popup window. Please check the browser's popup blocker settings.",
      )
    }

    const interval = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(interval)
        setLoading(false)
      }
    }, 500)
  }

  useEffect(() => {
    const onStorage = () => {
      setIsVerifiedXLogin(localStorage.getItem("isVerifyXLoginSuccess"))
    }
    window.addEventListener("storage", onStorage)
    return () => {
      window.removeEventListener("storage", onStorage)
    }
  }, [])

  useEffect(() => {
    if (isVerifiedXLogin) {
      setLoading(true)
      const verifyXLoginInfo = localStorage.getItem("verifyXLoginInfo")
      const verifyXLoginInfoParsed =
        verifyXLoginInfo && JSON.parse(verifyXLoginInfo)
      const oauthVerifier = verifyXLoginInfoParsed?.oauthVerifier
      const oauthToken = verifyXLoginInfoParsed?.oauthToken

      const callVerifyXLogin = async () => {
        try {
          const payload = {
            oauthToken,
            oauthVerifier,
            tokenSecret,
          }
          const res = await verifyXLogin(payload)
          if (res) {
            refetch()
            localStorage.removeItem("isVerifyXLoginSuccess")
            localStorage.removeItem("verifyXLoginInfo")
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message)
        } finally {
          setLoading(false)
        }
      }

      callVerifyXLogin()
    }
  }, [isVerifiedXLogin])

  return (
    <>
      {xBotData ? (
        <div className="flex items-center gap-2">
          <TwitterOnlineIcon />
          <span className="text-base-b">{twitterUsername}</span>
          <span
            className="text-base-b cursor-pointer text-[#FF3B30] hover:underline"
            onClick={onOpen}
          >
            Unbind
          </span>
        </div>
      ) : (
        <div
          className="flex cursor-pointer items-center gap-2 hover:underline"
          onClick={() => onLogin()}
        >
          {loading ? <Spinner size="sm" /> : <LinkAccountIcon />}
          <span className="text-base-b text-brown-500">
            {loading ? "Binding your Account" : "Bind your Account"}
          </span>
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        size="xl"
        classNames={{
          base: "bg-mercury-100 py-6 max-md:py-4 max-w-[450px]",
          wrapper: "z-[99]",
          backdrop: "z-[99]",
        }}
      >
        <ModalContent>
          <div className="px-4">
            <div className="relative flex items-center justify-center">
              <p className="mb-2 text-20 font-semibold">Unbind This Account?</p>
              <div
                onClick={onClose}
                className="absolute right-0 top-0 cursor-pointer"
              >
                <CloseFilledIcon />
              </div>
            </div>
            <div className="text-center text-mercury-900">
              <p>Do you want to cancel the creation?</p>
              <p>Leaving without saving will delete it permanently.</p>
            </div>
            <div className="mt-5 grid grid-cols-2 items-center gap-2">
              <Button
                onPress={onClose}
                className="w-full rounded-full bg-mercury-950 font-bold text-white"
              >
                No
              </Button>
              <Button
                onPress={callUnBindXLogin}
                className="w-full rounded-full bg-[#FF3B30] font-bold text-white"
              >
                Yes
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BindYourAccount
