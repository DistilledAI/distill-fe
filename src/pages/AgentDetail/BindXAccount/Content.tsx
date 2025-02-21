import videoStep1 from "@assets/video/BindXAccount/step1.mp4"
import videoStep2 from "@assets/video/BindXAccount/step2.mp4"
import videoStep3 from "@assets/video/BindXAccount/step3.mp4"
import videoStep4 from "@assets/video/BindXAccount/step4.mp4"
import videoStep5 from "@assets/video/BindXAccount/step5.mp4"
import VideoCustom from "@components/VideoCustom"
import { useEffect } from "react"

const STEPS = [
  {
    stepNumber: 1,
    label: "Access X Developer Portal",
  },
  {
    stepNumber: 2,
    label: "Go to App Settings",
  },
  {
    stepNumber: 3,
    label: "Setup User authentication",
  },
  {
    stepNumber: 4,
    label: "Get Consumer Keys ",
  },
  {
    stepNumber: 5,
    label: "Get Authentication Tokens ",
  },
]

interface ContentProps {
  stepNumber: number
}

const Content: React.FC<ContentProps> = ({ stepNumber }) => {
  const mapVideoSrcToStepNumber = {
    1: videoStep1,
    2: videoStep2,
    3: videoStep3,
    4: videoStep4,
    5: videoStep5,
  } as any

  let videoSrc = videoStep1

  useEffect(() => {
    videoSrc = mapVideoSrcToStepNumber?.[stepNumber]
  }, [stepNumber])

  return (
    <div className="flex items-center justify-between gap-6">
      <div className="w-[70%] overflow-hidden rounded-lg">
        <VideoCustom videoSrc={videoSrc} isPlayIcon isFullScreenIcon />
      </div>

      <div className="relative w-[30%]">
        {STEPS.map((step: any) => {
          const isStepActive = step.stepNumber === stepNumber
          return (
            <div key={step.stepNumber}>
              <div
                className="flex items-center gap-2 rounded-lg p-2 aria-checked:bg-white"
                aria-checked={isStepActive}
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-mercury-950">
                  <span className="text-14 font-bold text-white">
                    {step.stepNumber}
                  </span>
                </div>
                <span className="text-14 font-medium text-mercury-950">
                  {step.label}
                </span>
              </div>
              {step.stepNumber < 5 && (
                <div className="ml-4 h-4 w-[1px] bg-mercury-950"></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Content
