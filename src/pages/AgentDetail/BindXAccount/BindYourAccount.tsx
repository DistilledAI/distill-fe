import CloseButton from "@components/CloseButton"
import { LinkAccountIcon, XboxXFilled } from "@components/Icons"
import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { ExternalLink } from "@components/Icons/ExternalLink"
import { BookIcon } from "@components/Icons/SocialLinkIcon"
import { TwitterOnlineIcon } from "@components/Icons/Twitter"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import { refreshFetchMyAgent } from "@reducers/agentSlice"
import { copyClipboard } from "@utils/index"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { updateAgentConfig } from "services/agent"
import { twMerge } from "tailwind-merge"
import { BadgeStepWrap, StepWrap } from "../BindYourBot"
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
  const [isBindSuccess, setIsBindSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const formState = useForm({
    defaultValues: {
      consumerKey: "",
      consumerSecret: "",
      accessToken: "",
      accessTokenSecret: "",
    },
  })
  const { register, handleSubmit, watch, resetField, setValue } = formState
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
        setIsBindSuccess(true)
        refetch()
        dispatch(refreshFetchMyAgent())
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  let hide = true

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
        isOpen={true}
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

            {!hide && (
              <div className="flex">
                <div className="w-[50px] py-4">
                  <div className="relative h-full">
                    <div className="absolute left-1/2 top-1/2 h-[90%] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-mercury-400" />
                    <BadgeStepWrap step="1" />
                    <BadgeStepWrap step="2" stepClassName=" top-[12%]" />
                    <BadgeStepWrap step="3" stepClassName=" top-[38%]" />
                    <BadgeStepWrap step="4" stepClassName=" top-[63%]" />
                  </div>
                </div>

                <form className="w-full">
                  <StepWrap
                    label={
                      <span>
                        <span className="text-green-500">Create Project </span>
                        and App on
                        <span className="text-green-500">
                          {" "}
                          X Developer Portal
                        </span>
                      </span>
                    }
                    desc="https://developer.x.com/en/portal/dashboard"
                    icon={<ExternalLink />}
                    onClick={() =>
                      window.open(
                        "https://developer.x.com/en/portal/dashboard",
                        "_blank",
                      )
                    }
                    stepClassName="cursor-pointer"
                  />

                  <StepWrap
                    label={
                      <span>
                        Input your App{" "}
                        <span className="text-green-500">
                          Keys & Tokens (Consumer Keys)
                        </span>
                      </span>
                    }
                    stepClassName="my-4"
                  >
                    <InputField
                      placeholder="Enter API Key"
                      value={consumerKeyValue}
                      fieldKey="consumerKey"
                      register={register}
                      resetField={resetField}
                      setValue={setValue}
                    />

                    <InputField
                      placeholder="Enter API Key Secret"
                      value={consumerSecretValue}
                      fieldKey="consumerSecret"
                      register={register}
                      resetField={resetField}
                      setValue={setValue}
                    />
                  </StepWrap>

                  <StepWrap
                    stepClassName="my-4"
                    label={
                      <div className="flex items-center gap-2">
                        <span>Go to App Settings </span>
                        <div className="rotate-180">
                          <ArrowLeftFilledIcon />
                        </div>
                        <span>User authentication settings</span>
                      </div>
                    }
                    desc={
                      <div>
                        <span className="text-base-14">
                          Set exactly as shown below and save:
                        </span>
                        <ul className="list-disc pl-6 leading-6">
                          <li>
                            <span className="text-base-14-b">
                              App permissions:{" "}
                              <span className="text-[#F78500]">
                                Read and write
                              </span>
                            </span>
                          </li>
                          <li>
                            <span className="text-base-14-b">
                              Type of App:
                              <span className="text-[#F78500]">Native App</span>
                            </span>
                          </li>
                          <li>
                            <span className="text-base-14-b">
                              App info:
                              <span className="text-base-14 font-normal !text-mercury-900">
                                Fill in both the Callback URL/Redirect URL and
                                Website URL
                              </span>
                            </span>
                          </li>
                        </ul>

                        <Input
                          classNames={{
                            inputWrapper: twMerge(
                              "!bg-white rounded-2 mt-1 !border !border-mercury-400 px-2 ",
                            ),
                            innerWrapper: "!bg-white rounded-full",
                            input: "text-14 !text-[#F78500] !font-bold",
                          }}
                          size="lg"
                          value="https://mesh.distilled.ai"
                          endContent={
                            <div
                              onClick={(e) =>
                                copyClipboard(e, "https://mesh.distilled.ai")
                              }
                              className="cursor-pointer rounded-lg bg-mercury-70 px-2 py-1"
                            >
                              <span className="text-base-14 uppercase">
                                Copy
                              </span>
                            </div>
                          }
                        />
                      </div>
                    }
                  />

                  <StepWrap
                    label={
                      <div className="flex items-center gap-2">
                        <span>Go to App Settings </span>
                        <div className="rotate-180">
                          <ArrowLeftFilledIcon />
                        </div>
                        <span>Keys and tokens</span>
                      </div>
                    }
                    stepClassName="my-4"
                  />

                  <StepWrap
                    label={
                      <span>
                        Generate your App{" "}
                        <span className="text-green-500">
                          Access Token and Secret
                        </span>
                      </span>
                    }
                  >
                    <InputField
                      placeholder="Enter Access Token"
                      value={accessTokenValue}
                      fieldKey="accessToken"
                      register={register}
                      resetField={resetField}
                      setValue={setValue}
                    />

                    <InputField
                      placeholder="Enter Access Token Secret"
                      value={accessTokenSecretValue}
                      fieldKey="accessTokenSecret"
                      register={register}
                      resetField={resetField}
                      setValue={setValue}
                    />
                  </StepWrap>

                  <Button
                    className="mt-4 w-full rounded-full bg-mercury-950"
                    size="lg"
                    onClick={handleSubmit(onBindYourAccount)}
                    isDisabled={!isDisabled || isBindSuccess}
                    isLoading={loading}
                  >
                    {isBindSuccess && <CheckFilledIcon />}
                    <span className="text-18 text-mercury-30">
                      {isBindSuccess ? "Account bound successfully" : "Bind"}
                    </span>
                  </Button>
                </form>
              </div>
            )}
          </ModalBody>
          <Footer
            stepNumber={stepNumber}
            formState={formState}
            onNextStep={onNextStep}
          />
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
