import useWindowSize from "@hooks/useWindowSize"
import { Button, Input } from "@nextui-org/react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { getProfileInfo } from "services/chat"
import CollectingContent from "./CollectingContent"
import IntroVideo from "./IntroVideo"

type Inputs = {
  linkedin: string
}

export const PROFILE_TYPE = {
  LINKEDIN: "linkedin",
  TWITTER: "x",
}

const ProfileLinkForm: React.FC<{
  setContentStep: any
  setCollectedData: any
}> = ({ setContentStep, setCollectedData }) => {
  const { register, handleSubmit, watch, getValues } = useForm<Inputs>()
  const [selectedKey, _] = useState<string>(PROFILE_TYPE.TWITTER)
  const inputValue = watch(selectedKey as any)
  const [loading, setLoading] = useState<boolean>(false)
  const { isMobile } = useWindowSize()

  const getUserName = (url: string) => {
    if (!url) return null

    const match = url.match(/x\.com\/([^/]+)/)
    if (match && match[1] !== "home") {
      return match[1]
    }
    return null
  }

  const callGetProfileInfo = async (data: any) => {
    if (loading) return
    setLoading(true)
    const profileLink = data?.[selectedKey]
    const userName = getUserName(profileLink) as any

    try {
      const res = await getProfileInfo({
        type: selectedKey,
        userName,
      })
      if (res) {
        setCollectedData({ ...res?.data, profileType: selectedKey, userName })
        setLoading(false)
        setContentStep(2)
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    const profileLink = data[selectedKey]
    const userName = getUserName(profileLink)

    if (!userName) {
      toast.error("Invalid profile link. Please provide a valid link.")
      return
    }

    if (data) callGetProfileInfo(data)
  }

  if (loading) {
    if (isMobile)
      return (
        <div>
          <IntroVideo />
          <CollectingContent />
        </div>
      )

    return <CollectingContent />
  }

  if (isMobile) {
    return (
      <>
        <IntroVideo />
        <h3 className="flex items-center justify-center text-center text-[24px] font-semibold text-mercury-950">
          X account links:
        </h3>
        <span className="text-14 font-medium text-mercury-900">
          Provide the X (Twitter) account links from which your agents can
          consistently learn. Once saved, your agents will mimic and absorb data
          from these sources.
        </span>
        <Input
          placeholder="https://x.com/username"
          labelPlacement="outside"
          classNames={{
            inputWrapper:
              "!bg-mercury-200 rounded-full mt-4 !border !border-mercury-400 px-2",
            innerWrapper: "!bg-mercury-200 rounded-full",
            input: "text-18 !text-mercury-950 caret-[#363636]",
          }}
          size="lg"
          value={getValues(selectedKey as any)}
          {...register(selectedKey as any)}
        />
        <Button
          className="mt-4 w-full rounded-full bg-mercury-950"
          size="lg"
          onClick={handleSubmit(onSubmit)}
          isDisabled={!inputValue}
        >
          <span className="text-18 text-mercury-30">Connect</span>
        </Button>
      </>
    )
  }

  return (
    <div className="min-w-[400px]">
      <h3 className="text-[24px] font-semibold text-mercury-950">
        X account links:
      </h3>
      <span className="text-14 font-medium text-mercury-900">
        Provide the X (Twitter) account links from which your agents can
        consistently learn. Once saved, your agents will mimic and absorb <br />{" "}
        data from these sources.
      </span>
      <Input
        placeholder="https://x.com/username"
        labelPlacement="outside"
        classNames={{
          inputWrapper:
            "!bg-mercury-200 rounded-full mt-2 !border !border-mercury-400 px-2",
          innerWrapper: "!bg-mercury-200 rounded-full",
          input: "text-18 !text-mercury-950 caret-[#363636]",
        }}
        size="lg"
        value={getValues(selectedKey as any)}
        {...register(selectedKey as any)}
      />
      <Button
        className="mt-4 w-full rounded-full bg-mercury-950"
        size="lg"
        onClick={handleSubmit(onSubmit)}
        isDisabled={!inputValue || loading}
      >
        <span className="text-base-b text-mercury-300">Connect</span>
      </Button>
    </div>
  )
}
export default ProfileLinkForm
