import DotLoading from "@components/DotLoading"
import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import useTextCreeping from "@hooks/useTextCreeping"
import { Link } from "react-router-dom"

const LIST_TEXT_DEFAULT_1 = ["Your own private agent starts from here."]
const LIST_TEXT_DEFAULT_2 = [
  "Your data is transferred to your own confidential pod.",
]

const CollectingContent: React.FC<{
  isCollected?: boolean
}> = ({ isCollected = false }) => {
  const listText = isCollected ? LIST_TEXT_DEFAULT_2 : LIST_TEXT_DEFAULT_1
  const { text } = useTextCreeping({ listText })

  return (
    <div className="w-[400px] max-w-full max-sm:w-[300px]">
      <div className="relative text-base transition-all duration-500 ease-linear">
        <span className="text-[24px] font-semibold text-mercury-950">
          {text}
        </span>
      </div>
      {isCollected ? (
        <div className="mt-4">
          <p className="text-14">
            Fill out the form for a chance to join the MESH whitelist and
            activate your own AI agent. You will <b>receive a notification</b>{" "}
            when your private intelligence is <b>ready on the pod.</b>
          </p>
          <Link
            to="https://forms.gle/qGWWAnt3nWWAkxeE9"
            target="_blank"
            className="mt-4 flex h-14 items-center justify-center rounded-full bg-mercury-950 hover:opacity-70"
          >
            <span className="text-16 font-medium text-white">
              Enter waitlist
            </span>
            <div className="ml-1 rotate-180">
              <ArrowLeftFilledIcon color="white" />
            </div>
          </Link>
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-1">
          <DotLoading />
          <span className="text-base-m text-mercury-700">
            Collecting data in progress
          </span>
        </div>
      )}
    </div>
  )
}

export default CollectingContent
