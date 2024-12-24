import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { Button } from "@nextui-org/react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { updateAgentConfig } from "services/agent"
import { BadgeStepWrap, StepWrap } from "../BindYourBot"
import { InputField } from "./ManualSetup"

const AutoSetup: React.FC<{ methods: any; refetch: any }> = ({
  methods,
  refetch,
}) => {
  const { register, handleSubmit, watch, resetField, setValue } = methods
  const [loading, setLoading] = useState<boolean>(false)
  const [isBindSuccess, setIsBindSuccess] = useState<boolean>(false)
  const { agentId } = useParams()

  const consumerKeyValue = watch("consumerKey")
  const consumerSecretValue = watch("consumerSecret")
  const accessTokenValue = watch("accessToken")
  const accessTokenSecretValue = watch("accessTokenSecret")

  const isDisabled =
    consumerKeyValue &&
    consumerSecretValue &&
    accessTokenValue &&
    accessTokenSecretValue

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
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex">
        <div className="w-[50px] py-4">
          <div className="relative h-full">
            <div className="absolute left-1/2 top-1/2 h-[80%] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-mercury-400" />
            <BadgeStepWrap step="1" />
            <BadgeStepWrap step="2" stepClassName=" top-[80%]" />
          </div>
        </div>

        <form className="w-full">
          <StepWrap
            label="Sign in to the account you want to bind to your Autonomous Agent."
            stepClassName="my-4"
          >
            <InputField
              placeholder="Enter Twitter username"
              value={consumerKeyValue}
              fieldKey="consumerKey"
              register={register}
              resetField={resetField}
              setValue={setValue}
            />

            <InputField
              placeholder="Enter Password"
              value={consumerSecretValue}
              fieldKey="consumerSecret"
              register={register}
              resetField={resetField}
              setValue={setValue}
            />
          </StepWrap>

          <Button
            className="mb-4 w-full rounded-full bg-mercury-950"
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

          <StepWrap label="Please check your notifications to confirm the binding was successful. You may update your password if desired." />
        </form>
      </div>
    </>
  )
}

export default AutoSetup
