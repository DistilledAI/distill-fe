import { BrandLinkedInIcon } from "@components/Icons/BrandLinkedInIcon"
import { TwitterIcon } from "@components/Icons/Twitter"
import useWindowSize from "@hooks/useWindowSize"
import { Button, Checkbox, Input } from "@nextui-org/react"
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

const SOCIAL = [
  {
    key: PROFILE_TYPE.LINKEDIN,
    label: "LinkedIn",
    icon: <BrandLinkedInIcon size={24} />,
  },
  {
    key: PROFILE_TYPE.TWITTER,
    label: "Twitter",
    icon: <TwitterIcon />,
  },
]

const ProfileLinkForm: React.FC<{
  setContentStep: any
  setCollectedData: any
}> = ({ setContentStep, setCollectedData }) => {
  const { register, handleSubmit, watch, setValue, getValues } =
    useForm<Inputs>()
  const [selectedKey, setSelectedKey] = useState<string>(PROFILE_TYPE.LINKEDIN)
  const inputValue = watch(selectedKey as any)
  const [loading, setLoading] = useState<boolean>(false)
  const { isMobile } = useWindowSize()

  const getUserName = (url: string) => {
    if (!url) return null

    if (selectedKey === PROFILE_TYPE.LINKEDIN) {
      const match = url.match(/linkedin\.com\/in\/([^/]+)/)
      return match ? match[1] : null
    }

    if (selectedKey === PROFILE_TYPE.TWITTER) {
      const match = url.match(/x\.com\/([^/]+)/)
      if (match && match[1] !== "home") {
        return match[1]
      }
      return null
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

  const onChangeProfileType = (record: any) => {
    setSelectedKey(record.key)
    setValue(record.key, "")
  }

  const renderSocialSelect = () => {
    return (
      <div className="flex items-center gap-4 py-2">
        {SOCIAL.map((record) => {
          const isSelected = record.key === selectedKey
          return (
            <div
              key={record.key}
              onClick={() => onChangeProfileType(record)}
              aria-selected={isSelected}
              className="flex w-full cursor-pointer items-center justify-between rounded-lg p-2 delay-100 duration-500 hover:bg-white aria-selected:bg-white aria-selected:max-md:bg-mercury-100"
            >
              <div className="flex items-center gap-2">
                {record.icon}
                <span className="text-base-md text-mercury-900">
                  {record.label}
                </span>
              </div>
              <Checkbox radius="full" isSelected={isSelected} />
            </div>
          )
        })}
      </div>
    )
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
          Website Links/Social Media
        </h3>
        {renderSocialSelect()}
        <Input
          placeholder="Enter your profile link"
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
        Website Links/Social Media
      </h3>
      {renderSocialSelect()}
      <Input
        placeholder="Enter your profile link"
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
        <span className="text-18 text-mercury-30">Connect</span>
      </Button>
    </div>
  )
}
export default ProfileLinkForm
