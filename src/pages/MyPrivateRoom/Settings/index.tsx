import {
  chatIconAgent,
  chatIconSetting,
  chatIconTelegram,
  chatIconX,
} from "@assets/svg"

const RoomSetting = () => {
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2">
      <div className="inline-flex flex-col gap-3">
        <div className="group h-[64px] w-[64px] cursor-pointer rounded-[22px] border-1 border-mercury-200 bg-mercury-50 p-1 duration-300 hover:border-mercury-300">
          <div
            style={{
              boxShadow:
                "0px 16px 32px -4px rgba(24, 24, 25, 0.05), 0px 2px 4px 0px rgba(24, 24, 25, 0.08)",
            }}
            className="flex h-full w-full items-center justify-center rounded-[18px] border-mercury-70 bg-mercury-30"
          >
            <img
              className="duration-300 group-hover:scale-110"
              src={chatIconSetting}
            />
          </div>
        </div>
        <div className="group h-[64px] w-[64px] cursor-pointer rounded-[22px] border-1 border-mercury-200 bg-mercury-50 p-1 duration-300 hover:border-mercury-300">
          <div
            style={{
              boxShadow:
                "0px 16px 32px -4px rgba(24, 24, 25, 0.05), 0px 2px 4px 0px rgba(24, 24, 25, 0.08)",
            }}
            className="flex h-full w-full items-center justify-center rounded-[18px] border-mercury-70 bg-mercury-30"
          >
            <img
              className="duration-300 group-hover:scale-110"
              src={chatIconX}
            />
          </div>
        </div>
        <div className="group h-[64px] w-[64px] cursor-pointer rounded-[22px] border-1 border-mercury-200 bg-mercury-50 p-1 duration-300 hover:border-mercury-300">
          <div
            style={{
              boxShadow:
                "0px 16px 32px -4px rgba(24, 24, 25, 0.05), 0px 2px 4px 0px rgba(24, 24, 25, 0.08)",
            }}
            className="flex h-full w-full items-center justify-center rounded-[18px] border-mercury-70 bg-mercury-30"
          >
            <img
              className="duration-300 group-hover:scale-110"
              src={chatIconTelegram}
            />
          </div>
        </div>
        <div className="group h-[64px] w-[64px] cursor-pointer rounded-[22px] border-1 border-mercury-200 bg-mercury-50 p-1 duration-300 hover:border-mercury-300">
          <div
            style={{
              boxShadow:
                "0px 16px 32px -4px rgba(24, 24, 25, 0.05), 0px 2px 4px 0px rgba(24, 24, 25, 0.08)",
            }}
            className="flex h-full w-full items-center justify-center rounded-[18px] border-mercury-70 bg-mercury-30"
          >
            <img
              className="duration-300 group-hover:scale-110"
              src={chatIconAgent}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomSetting
