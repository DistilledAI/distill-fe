import DotLoading from "@components/DotLoading"
import { Skeleton } from "@nextui-org/react"

const LoadingMobile = () => {
  return (
    <div className="flex h-[calc(100dvh-110px)] items-center justify-center">
      <DotLoading />
    </div>
  )
}

export const ChatDetailLoadingPage = () => {
  return (
    <div className="min-h-dvh pt-[60px]">
      <div className="fixed left-0 top-0 z-[1] flex h-[55px] w-full items-center justify-between bg-white px-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-[34px] w-[34px] rounded-full" />
          <Skeleton className="h-5 w-[100px] rounded-full" />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-mercury-30 px-3 py-2">
        <Skeleton className="h-[53px] w-full rounded-full bg-mercury-200" />
      </div>
    </div>
  )
}

export default LoadingMobile
