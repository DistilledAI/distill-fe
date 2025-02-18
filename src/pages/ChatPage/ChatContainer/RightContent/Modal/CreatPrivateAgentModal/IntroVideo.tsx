import distilledAiPrivateAgent from "@assets/video/distilled-ai-private-agent-3d.mp4"
import VideoCustom from "@components/VideoCustom"

const IntroVideo: React.FC = () => {
  return (
    <div className="mb-7 w-full overflow-hidden rounded-lg">
      <VideoCustom videoSrc={distilledAiPrivateAgent} />
    </div>
  )
}

export default IntroVideo
