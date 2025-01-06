import { RefreshIcon } from "@components/Icons/RefreshIcon"
import { HexagonIcon } from "@components/Icons/RewardsIcons"
import { PATH_NAMES } from "@constants/index"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { XDSTL_TASK_KEY } from "."

const GrowClan: React.FC = () => {
  const navigate = useNavigate()

  const MISSION_LIST = [
    {
      label: (
        <>
          <HexagonIcon />
          <span className="text-base-sb text-mercury-950">
            Explore AI Agent Clan
          </span>
        </>
      ),
      desc: "Explore Clans on the Marketplace. Grow the community by chatting and aiming to rank high on the EXP Leaderboard.",
      point: "Earn EXP to gain xDSTL ",
      key: XDSTL_TASK_KEY.JOIN_CLAN,
    },
  ]

  const onGoToEarn = () => {
    navigate(PATH_NAMES.MARKETPLACE)
  }

  return (
    <div className="w-full">
      {MISSION_LIST.map((item: any) => {
        return (
          <div
            className="flex items-center justify-between border-b-1 border-mercury-100 px-4 py-[14px] pr-0 max-md:px-0"
            key={item.key}
          >
            <div className="w-full">
              <div className="flex items-center gap-2">{item.label}</div>
              <span className="text-base text-mercury-700">{item.desc}</span>

              <div className="mt-2 flex items-center gap-2">
                <div className="flex min-w-[44px] items-center justify-center rounded-full bg-brown-500 px-2">
                  <span className="text-[13px] font-bold text-white">
                    {item.point}
                  </span>
                </div>

                {item.repeatable && (
                  <div className="flex items-center gap-1">
                    <RefreshIcon />
                    <span className="text-base-14 text-mercury-950">
                      Repeatable:
                    </span>
                    <span className="text-base-14-b text-mercury-950">
                      {item.repeatable}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Button
                className="h-[34px] bg-mercury-950 px-6"
                radius="full"
                onPress={onGoToEarn}
              >
                <span className="text-base-14 text-mercury-30">Go to Earn</span>
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default GrowClan
