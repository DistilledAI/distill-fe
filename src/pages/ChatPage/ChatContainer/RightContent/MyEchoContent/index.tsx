import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledExclamationCircleIcon } from "@components/Icons/FilledExclamationCircleIcon"
import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"
import mainContentBg from "assets/images/main-content-bg.jpg"
import UploadDataButton from "../UploadDataButton"

const MyEchoContent: React.FC = () => {
  const isFirstMessage = true

  if (isFirstMessage) {
    return (
      <div
        className="h-full w-full flex-1 rounded-[22px] border border-white bg-mercury-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${mainContentBg})`,
        }}
      >
        <div className="flex-items-center relative h-full w-full flex-col justify-center">
          <div className="flex-items-center absolute top-1/2 max-w-[390px] -translate-y-[300px] flex-col">
            <FilledExclamationCircleIcon />
            <span className="text-center text-24 text-mercury-800">
              Please{" "}
              <span className="font-semibold text-mercury-950">
                Create a wallet
              </span>{" "}
              <br />
              to start your own intelligence agent.
            </span>
          </div>

          <UploadDataButton
            icon={<FilledBrainAIIcon />}
            label="Create your Private Agent"
            isDisable
          />
          <div className="absolute bottom-[60px] flex items-center gap-2">
            <FilledShieldCheckedIcon />
            <span className="text-base-md text-mercury-800">
              How Your Data is Secure in Private Intelligence?
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex-1 rounded-[22px] border border-white bg-mercury-30 py-6">
      hic
    </div>
  )
}
export default MyEchoContent
