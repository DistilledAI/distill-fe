import { ExternalLink } from "@components/Icons/ExternalLink"
import { Button, ModalFooter } from "@nextui-org/react"
import { InputField } from "./BindYourAccount"

const Footer: React.FC<{
  stepNumber: number
  formState: any
  onNextStep: any
}> = ({ stepNumber, formState, onNextStep }) => {
  const { register, handleSubmit, watch, resetField, setValue } = formState
  const consumerKeyValue = watch("consumerKey")
  const consumerSecretValue = watch("consumerSecret")
  const accessTokenValue = watch("accessToken")
  const accessTokenSecretValue = watch("accessTokenSecret")

  const renderContent = () => {
    switch (stepNumber) {
      case 2:
        return (
          <div className="w-fit gap-4 rounded-lg bg-mercury-900 px-4 py-2">
            <span className="text-14 font-bold text-white">
              On the{" "}
              <span className="text-14 font-bold text-green-400">
                Dashboard
              </span>
              , find your Project App and click{" "}
              <span className="text-14 font-bold text-green-400">
                App Settings
              </span>{" "}
              icon button.
            </span>
          </div>
        )

      case 3:
        return (
          <div className="w-fit gap-4 rounded-lg bg-mercury-900 px-4 py-2">
            <span className="text-14 font-bold text-white">
              Click{" "}
              <span className="text-14 font-bold text-green-400">Setup</span> in
              the User Authentication Settings section, then fill in the details
              below:
            </span>
            <ul className="ml-6 list-disc">
              <li>
                <span className="text-14 font-bold text-white">
                  App permissions:{" "}
                  <span className="text-[#BCAA88]">Read and write</span>
                </span>
              </li>
              <li>
                <span className="text-14 font-bold text-white">
                  Type of App:{" "}
                  <span className="text-[#BCAA88]">Native App</span>
                </span>
              </li>
              <li>
                <span className="text-14 font-bold text-white">
                  App info (Callback URL & Website URL) :{" "}
                  <span className="text-[#BCAA88]">
                    https://mesh.distilled.ai
                  </span>
                </span>
              </li>
            </ul>
          </div>
        )

      case 4:
        return (
          <div className="w-[75%]">
            <div className="w-full gap-4 rounded-lg bg-mercury-900 px-4 py-2">
              <span className="text-14 font-bold text-white">
                On the
                <span className="text-14 font-bold text-green-400">
                  {" "}
                  Keys and tokens{" "}
                </span>
                tab, regenerate your{" "}
                <span className="text-14 font-bold text-green-400">
                  Consumer Keys.
                </span>
              </span>

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
            </div>
          </div>
        )

      case 5:
        return (
          <div className="w-[75%]">
            <div className="w-full gap-4 rounded-lg bg-mercury-900 px-4 py-2">
              <span className="text-14 font-bold text-white">
                <span className="text-14 font-bold text-green-400">
                  Generate your{" "}
                </span>
                Authentication Tokens: Access Token and Secret.
              </span>

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
            </div>
          </div>
        )

      default:
        return (
          <div
            className="flex w-fit items-center justify-between gap-4 rounded-lg bg-mercury-900 px-4 py-2 hover:cursor-pointer"
            onClick={() =>
              window.open(
                "https://developer.x.com/en/portal/dashboard ",
                "_blank",
              )
            }
          >
            <div className="">
              <span className="text-14 font-bold text-white">
                Choose a plan and submit the X agreement at:
              </span>
              <br />
              <span className="text-14 font-bold text-green-400">
                https://developer.x.com/en/portal/dashboard
              </span>
            </div>
            <ExternalLink color="#FAFAFA" />
          </div>
        )
    }
  }

  return (
    <ModalFooter className="bg-mercury-950">
      <div className="flex w-full items-center justify-between py-4">
        {renderContent()}
        <Button
          className="rounded-full bg-white"
          size="lg"
          onPress={onNextStep}
        >
          <span className="text-base-b">Next Step</span>
        </Button>
      </div>
    </ModalFooter>
  )
}
export default Footer
