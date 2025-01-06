import { distilledAIIcon } from "@assets/svg"

const LoadingFallback = () => {
  return (
    <div className="flex h-dvh w-dvw items-center justify-center bg-white">
      <img
        src={distilledAIIcon}
        className="h-14 w-14"
        alt="distilled ai logo"
      />
    </div>
  )
}

export default LoadingFallback
