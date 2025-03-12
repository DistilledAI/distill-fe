const OnlySupportDesktop = () => {
  return (
    <div className="h-[calc(100dvh-54px)] bg-mercury-30 backdrop-blur">
      <div className="flex h-full flex-col items-center justify-center gap-6 rounded-[22px] bg-mercury-30 px-4">
        <div className="space-y-2">
          <h5 className="text-center text-28 font-semibold text-mercury-950 md:text-32">
            Welcome to Distilled AI
          </h5>
          <p className="text-center text-16 text-mercury-900 md:text-base">
            The current version of Distilled AI is only supported on desktop!
          </p>
        </div>
      </div>
    </div>
  )
}

export default OnlySupportDesktop
