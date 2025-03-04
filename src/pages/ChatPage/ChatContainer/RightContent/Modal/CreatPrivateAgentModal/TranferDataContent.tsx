import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { Button } from "@nextui-org/react"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { uploadMyData } from "services/user"
import { v4 as uuidv4 } from "uuid"
import { TYPE_DATA_KEY } from "../../MyPrivateAgentContent/CreatePrivateAgent"
import { PROFILE_TYPE } from "./ProfileLinkForm"
import TextCreepingTranferData from "./TextCreepingTranferData"
import WordCloundContent from "./WordCloundContent"

const TranferDataContent: React.FC<{
  setContentStep: any
  collectedData: any
  setOpenPopup: any
  handlemSetSocialUrls: any
  moreCustomRequest: any
}> = ({
  collectedData,
  setContentStep,
  setOpenPopup,
  handlemSetSocialUrls,
  moreCustomRequest,
}) => {
  const profileType = collectedData?.profileType
  const userName = collectedData?.userName
  const aboutValue = collectedData?.about || ""
  const activitiesValue = collectedData?.activities || []
  const titleValues = activitiesValue
    ?.map((activity: any) => activity?.title)
    ?.join(" ")
  const paragraphValue = `${aboutValue} ${titleValues}`

  const profileLink =
    profileType === PROFILE_TYPE.LINKEDIN
      ? `https://linkedin.com/in/${userName}`
      : `https://x.com/${userName}`

  const handleSubmit = async () => {
    const uid = uuidv4()
    try {
      const payload = {
        [profileType]: profileLink,
        key: TYPE_DATA_KEY.SOCIAL_MEDIA,
      }
      const response = await uploadMyData(payload)
      if (response) {
        const data = response.data?.[0]
        handlemSetSocialUrls({
          status: "done",
          link: profileLink,
          id: data?.id,
          uid,
        })
        moreCustomRequest([data?.id])
      }
    } catch (error) {
      handlemSetSocialUrls({
        status: "error",
        link: profileLink,
        uid,
      })
      console.error(error)
      toast.error(`${profileLink} failed to upload.`)
    }
  }

  const onCloseModal = () => {
    setContentStep(1)
    setOpenPopup(false)
  }

  useEffect(() => {
    handleSubmit()
  }, [])

  return (
    <div className="grid h-fit w-[800px] grid-cols-2 max-md:w-full max-md:grid-cols-none">
      <div className="w-full">
        <div className="flex-items-center mb-2 w-full gap-4">
          <div className="flex-items-center h-9 w-9 justify-center rounded-full bg-yellow-10">
            <FilledBrainAIIcon />
          </div>
          <div className="flex flex-col">
            <span className="text-base-b">Data collected on:</span>
            <span className="text-base">{profileLink}</span>
          </div>
        </div>
        <div>
          <WordCloundContent paragraph={paragraphValue} />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <TextCreepingTranferData />
          <span className="text-base-14 text-mercury-800">
            Enter your email to{" "}
            <span className="font-bold">receive a notification</span> when your
            private intelligence is{" "}
            <span className="font-bold">ready on the pod.</span>
          </span>
        </div>

        <div className="pb-8 max-md:pb-0">
          <Button
            className="mt-4 w-full rounded-full bg-mercury-950"
            size="lg"
            onPress={() => onCloseModal()}
          >
            <span className="text-18 text-mercury-30">Got it!</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
export default TranferDataContent
