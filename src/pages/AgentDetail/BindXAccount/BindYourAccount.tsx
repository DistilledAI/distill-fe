import CloseButton from "@components/CloseButton"
import { LinkAccountIcon, XboxXFilled } from "@components/Icons"
import { BookIcon } from "@components/Icons/SocialLinkIcon"
import { TwitterOnlineIcon } from "@components/Icons/Twitter"
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import { refreshFetchMyAgent } from "@reducers/agentSlice"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { updateAgentConfig } from "services/agent"
import { twMerge } from "tailwind-merge"
import { AgentConfig } from "../useFetchAgentConfig"
import Content from "./Content"
import Footer from "./Footer"

const BindYourAccount: React.FC<{
  agentConfigs: AgentConfig[]
  refetch: any
}> = ({ agentConfigs, refetch }) => {
  const xBotData = agentConfigs?.find(
    (agent: any) => agent.key === "bindTwitterKey",
  )
  const bindTwitterValue = xBotData?.value ? JSON.parse(xBotData.value) : null
  const twitterUsername = bindTwitterValue?.info?.data?.username
  const dispatch = useDispatch()
  const { agentId } = useParams()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [loading, setLoading] = useState<boolean>(false)
  const methods = useForm({
    defaultValues: {
      consumerKey: "",
      consumerSecret: "",
      accessToken: "",
      accessTokenSecret: "",
    },
  })
  const { watch } = methods
  const [stepNumber, setStepNumber] = useState<number>(1)

  const consumerKeyValue = watch("consumerKey")
  const consumerSecretValue = watch("consumerSecret")
  const accessTokenValue = watch("accessToken")
  const accessTokenSecretValue = watch("accessTokenSecret")

  const isDisabled =
    consumerKeyValue &&
    consumerSecretValue &&
    accessTokenValue &&
    accessTokenSecretValue
  console.log("🚀 ~ isDisabled:", isDisabled)

  const onNextStep = () => {
    setStepNumber(stepNumber + 1)
  }

  const onBindYourAccount = async (data: any) => {
    try {
      setLoading(true)
      const agentIdNumber = Number(agentId)
      const payload = {
        botId: agentIdNumber,
        data: [
          {
            key: "bindTwitterKey",
            value: JSON.stringify(data),
          },
        ],
      }
      const res = await updateAgentConfig(payload)
      if (res?.data) {
        toast.success("Account bound successfully")
        onClose()
        refetch()
        dispatch(refreshFetchMyAgent())
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {xBotData ? (
        <div className="flex items-center gap-2">
          <TwitterOnlineIcon />
          <span className="text-base-b">{twitterUsername}</span>
          <span
            className="text-base-md cursor-pointer text-brown-10 hover:underline"
            onClick={onOpen}
          >
            Change
          </span>
        </div>
      ) : (
        <div
          className="flex cursor-pointer items-center gap-2 hover:underline"
          onClick={onOpen}
        >
          <LinkAccountIcon />
          <span className="text-base-md text-brown-500">Bind your Account</span>
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        classNames={{
          base: "bg-mercury-100 ",
        }}
        size="3xl"
        id="bind-your-account-modal"
        scrollBehavior="inside"
      >
        <ModalContent>
          <form className="w-full">
            <ModalHeader className="relative px-6">
              <h3 className="m-auto flex text-24 font-semibold text-mercury-950">
                Bind X Account
              </h3>
              <CloseButton
                onClose={onClose}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              />
            </ModalHeader>
            <ModalBody className="gap-4 px-6 py-4 pb-10">
              <div
                className="-mx-6 flex cursor-pointer items-center gap-2 bg-brown-50 px-4 py-3 hover:underline"
                onClick={() =>
                  window.open(
                    "https://distilled.foundation/developer-resources/how-to-bind-your-twitter-and-telegram-account",
                    "_blank",
                  )
                }
              >
                <BookIcon />
                <span className="text-base-b text-brown-600">
                  Watch the tutorial for each step to easily complete binding.
                </span>
              </div>

              <Content stepNumber={stepNumber} />
            </ModalBody>
            <Footer
              stepNumber={stepNumber}
              methods={methods}
              onNextStep={onNextStep}
              onBindYourAccount={onBindYourAccount}
              loading={loading}
            />
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

interface InputFieldProps {
  placeholder: string
  value: string
  fieldKey: string
  register: any
  resetField: any
  setValue: any
}

export const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  fieldKey,
  register,
  resetField,
  setValue,
}) => {
  const onRestTokenKey = () => {
    resetField(fieldKey)
  }

  const onPaste = async () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        setValue(fieldKey, text)
      })
      .catch((err) => {
        console.error("Failed to read clipboard contents: ", err)
      })
  }

  return (
    <Input
      placeholder={placeholder}
      classNames={{
        inputWrapper: twMerge(
          "!bg-white rounded-lg mt-2 !border !border-mercury-400 px-2 ",
        ),
        innerWrapper: "!bg-white rounded-full",
        input: "text-16 !text-mercury-950 caret-[#363636]",
      }}
      size="lg"
      value={value}
      {...register(fieldKey)}
      endContent={
        value ? (
          <div onClick={onRestTokenKey} className="cursor-pointer">
            <XboxXFilled color="#545454" />
          </div>
        ) : (
          <div
            onClick={onPaste}
            className="cursor-pointer rounded-lg bg-mercury-70 px-2 py-1"
          >
            <span className="text-14 font-medium uppercase text-mercury-950">
              Paste
            </span>
          </div>
        )
      }
    />
  )
}

export default BindYourAccount
