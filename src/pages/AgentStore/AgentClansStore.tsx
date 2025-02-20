import { maxAvatarPlaceholder2 } from "@assets/images"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { BroadcastIcon } from "@components/Icons/Broadcast"
import { ClanIcon } from "@components/Icons/Clan"
import { UsersGroupOutlineIcon } from "@components/Icons/UserIcon"
import TotalMemberBadge from "@components/TotalMemberBadge"
import { PATH_NAMES } from "@constants/index"
import { ORCHESTRATION_LIST } from "@pages/ChatPage/ChatContainer/LeftBar/OrchestrationSlider"
import OrchestrationCard from "@pages/ChatPage/ChatContainer/LeftBar/OrchestrationSlider/OrchestrationCard"
import { AGENT_TYPE_KEY } from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/AgentInitialization/AgentType"
import useFetchClan from "@pages/Marketplace/useFetchClan"
import React from "react"
import { useNavigate } from "react-router-dom"
import { IGroupDetail } from "types/group"

const agentType = {
  [AGENT_TYPE_KEY.DEFAULT]: <FilledBrainAIIcon size={14} />,
  [AGENT_TYPE_KEY.DEFAI]: <FilledBrainAIIcon size={14} />,
}

const AgentClansStore = () => {
  const navigate = useNavigate()
  const { data } = useFetchClan({
    isFetchNow: true,
    limit: 100,
  })

  const handleChatAgentClan = async (clan: IGroupDetail) => {
    const clanPathname = `${PATH_NAMES.CLAN}/${clan.label}`
    navigate(clanPathname)
    // setTimeout(() => {
    //   queryClient.setQueryData(
    //     [QueryDataKeys.IS_REFRESH_CLANS],
    //     (oldData: boolean) => !oldData,
    //   )
    // }, 500)
  }

  const title = ({ icon, title }: { icon: React.ReactNode; title: string }) => {
    return (
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h2 className="text-22 font-bold text-mercury-950">{title}</h2>
      </div>
    )
  }

  const renderAgentType = () => {
    return (
      <div className="w-fit rounded-[4px] bg-[#FFCC00] p-[2px]">
        {agentType["0"]}
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        {title({
          icon: <UsersGroupOutlineIcon />,
          title: "Multi-agent Chatrooms",
        })}
        <div className="flex items-center gap-2">
          {ORCHESTRATION_LIST.map((item: any, index) => (
            <div
              key={item.conversationId}
              className="w-[200px]"
              onClick={() =>
                navigate(`${PATH_NAMES.ORCHESTRATION}/${item.conversationId}`)
              }
            >
              <OrchestrationCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div>
        {title({
          icon: <ClanIcon />,
          title: "Clans",
        })}
        <div className="grid grid-cols-2 gap-3">
          {data.map((item: IGroupDetail) => (
            <div
              key={item.id}
              className="cursor-pointer rounded-[22px] border border-mercury-100 bg-mercury-50 p-4 hover:bg-mercury-100"
              onClick={() => handleChatAgentClan(item)}
            >
              <div className="flex gap-4">
                <div
                  className="relative h-[120px] w-[100px] flex-shrink-0 overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${item.image || maxAvatarPlaceholder2})`,
                  }}
                >
                  <div className="absolute inset-0 z-10 rounded-lg border-[2px] border-white/20" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0.70) 0%, #000 100%)",
                      opacity: 0.1,
                    }}
                  />
                  <div
                    className="absolute inset-0 top-[21.05%] h-[78.95%] w-full"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 28.5%, #000 100%)",
                    }}
                  />

                  <div className="absolute left-3 top-3 z-10">
                    <BroadcastIcon />
                  </div>
                  <div className="absolute bottom-[10px] left-[10px] z-10">
                    <TotalMemberBadge
                      groupId={item?.id?.toString()}
                      iconSize={10}
                      textClassName="text-[11px] leading-[110%]"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-16 font-bold text-mercury-950">
                        {item.name}
                      </span>
                      {renderAgentType()}
                    </div>

                    <p className="text-13 font-medium text-mercury-800">
                      {item.description || "-"}
                    </p>
                  </div>
                  <div>
                    <div className="w-fit rounded-[4px] border border-brown-400 bg-brown-50 px-2 text-14 font-medium text-brown-600">
                      AI agent
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AgentClansStore
