import { Button } from "@nextui-org/react"
import React, { useRef, useState } from "react"
import { toast } from "react-toastify"
import { TYPE_DATA_KEY } from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/CreatePrivateAgent"
import { uploadMyData } from "services/user"
import { PlusIcon } from "@components/Icons/Plus"
import useOutsideClick from "@hooks/useOutSideClick"

const AddXSocial: React.FC<{
  moreCustomRequest: (data: any, callback: () => void) => void
}> = ({ moreCustomRequest }) => {
  const [isOpen, setIsOpen] = useState(false)
  const refAddLink = useRef<any>()
  const [link, setLink] = useState("")
  const [loading, setLoading] = useState(false)

  useOutsideClick(refAddLink, () => {
    setIsOpen(false)
    setLink("")
  })

  const getUserName = (url: string) => {
    if (!url) return null

    const match = url.match(/x\.com\/([^/]+)/)
    if (match && match[1] !== "home") {
      return match[1]
    }
    return null
  }

  const callGetProfileInfo = async (userName: string) => {
    if (loading || !link) return
    setLoading(true)

    try {
      const payload = {
        ["x"]: `https://x.com/${userName}`,
        key: TYPE_DATA_KEY.SOCIAL_MEDIA,
      }
      const response = await uploadMyData(payload)
      if (response) {
        const data = response.data?.[0]
        moreCustomRequest([data?.id], () => {
          setIsOpen(false)
          setLink("")
        })
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = () => {
    if (!link) return
    const userName = getUserName(link)

    if (!userName) {
      toast.error("Invalid profile link. Please provide a valid link.")
      return
    }
    callGetProfileInfo(userName)
  }

  return (
    <div ref={refAddLink} className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-[32px] cursor-pointer items-center gap-1 rounded-full bg-mercury-950 px-3 text-15 font-semibold text-white"
      >
        <PlusIcon color="white" /> Add single link
      </div>
      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+5px)] z-[11] flex w-[320px] items-center gap-2 rounded-lg border-1 border-mercury-400 bg-mercury-70 px-2 py-[5px]">
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="flex-1 border-none bg-transparent font-normal text-mercury-950 outline-none"
            placeholder="Enter X (Twitter) profile link"
          />
          <Button
            onPress={onSubmit}
            isLoading={loading}
            isDisabled={!link}
            className="h-[30px] rounded-full bg-mercury-950 text-white"
          >
            Add
          </Button>
        </div>
      )}
    </div>
  )
}

export default AddXSocial
