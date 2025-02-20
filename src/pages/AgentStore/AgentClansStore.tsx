import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { IGroupDetail } from "types/group"
import useFetchClan from "@pages/Marketplace/useFetchClan"
import { PATH_NAMES } from "@constants/index"
import { ORCHESTRATION_LIST } from "@pages/ChatPage/ChatContainer/LeftBar/OrchestrationSlider"
import OrchestrationCard from "@pages/ChatPage/ChatContainer/LeftBar/OrchestrationSlider/OrchestrationCard"
import { AGENT_TYPE_KEY } from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/AgentInitialization/AgentType"
import { maxAvatarPlaceholder2 } from "@assets/images"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { BroadcastIcon } from "@components/Icons/Broadcast"
import { ClanIcon } from "@components/Icons/Clan"
import { UsersGroupOutlineIcon } from "@components/Icons/UserIcon"
import TotalMemberBadge from "@components/TotalMemberBadge"

const agentType = {
  [AGENT_TYPE_KEY.DEFAULT]: <FilledBrainAIIcon size={14} />,
  [AGENT_TYPE_KEY.DEFAI]: <FilledBrainAIIcon size={14} />,
}

const AgentClansStore = () => {
  const navigate = useNavigate()
  const {
    data,
    fetchMore,
    hasMore,
    loading: isLoading,
  } = useFetchClan({
    isFetchNow: true,
    limit: 10,
  })

  const parentRef = useRef<HTMLDivElement>(null)
  const columns = 2
  const rows = Math.ceil(data.length / columns)

  const virtualizer = useVirtualizer({
    count: rows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 164,
  })

  useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse()
    if (lastItem && lastItem.index >= rows - 1 && hasMore && !isLoading) {
      fetchMore()
    }
  }, [virtualizer.getVirtualItems(), rows, hasMore, isLoading, fetchMore])

  const handleChatAgentClan = (clan: IGroupDetail) => {
    const clanPathname = `${PATH_NAMES.CLAN}/${clan.label}`
    navigate(clanPathname)
  }

  const title = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
    <div className="mb-3 flex items-center gap-2">
      {icon}
      <h2 className="text-22 font-bold text-mercury-950">{title}</h2>
    </div>
  )

  const renderAgentType = () => (
    <div className="w-fit rounded-[4px] bg-[#FFCC00] p-[2px]">
      {agentType["0"]}
    </div>
  )

  const getRowClans = (rowIndex: number) => {
    const start = rowIndex * columns
    return data.slice(start, start + columns)
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
        <div ref={parentRef} style={{ height: "600px", overflow: "auto" }}>
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => (
              <div
                key={virtualRow.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  padding: "0px 16px",
                }}
              >
                <div className="flex gap-3">
                  {getRowClans(virtualRow.index).map((item) => {
                    const description = item?.groupConfig?.find(
                      (val) => val.key === "description" && val.type === "clan",
                    )

                    return (
                      <div key={item.id} className="w-1/2">
                        <div
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
                                  {description?.value || "-"}
                                </p>
                              </div>
                              <div>
                                <div className="w-fit rounded-[4px] border border-brown-400 bg-brown-50 px-2 text-14 font-medium text-brown-600">
                                  AI Agent Clan
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentClansStore
