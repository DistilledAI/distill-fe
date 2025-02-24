import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { envConfig } from "@configs/env"
import { PATH_NAMES, Publish, RoleUser, STATUS_AGENT } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { IUser } from "@reducers/userSlice"
import { useQuery } from "@tanstack/react-query"
import { ConfigBotType } from "@types"
import { useNavigate } from "react-router-dom"
import { searchUsers } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"
import { useState } from "react"
import { Pagination } from "@nextui-org/react"
import PaginationItemCustom from "./PaginationItemCustom"
import AvatarCustom from "@components/AvatarCustom"
import { maxAvatarPlaceholder } from "@assets/images"

const AIAgentList = () => {
  const navigate = useNavigate()
  const { user } = useAuthState()
  const limit = 9
  const [page, setPage] = useState(1)

  const fetchPrivateAgents = async () => {
    const payloadData = {
      username: "",
      status: STATUS_AGENT.ACTIVE,
      role: RoleUser.BOT,
      publish: Publish.Published,
    }
    const res = await searchUsers(
      JSON.stringify(payloadData),
      limit,
      (page - 1) * limit,
    )
    return {
      agents: res?.data?.items as IUser[],
      total: res?.data?.total,
    }
  }

  const { data, error } = useQuery({
    queryKey: [QueryDataKeys.PRIVATE_AGENTS_MKL, page],
    queryFn: fetchPrivateAgents,
    refetchOnWindowFocus: false,
  })

  if (error) {
    console.error(error)
  }

  const onPageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleChatWithAgent = async (agent: IUser) => {
    const isBotLive = agent?.configBot === ConfigBotType.LIVE
    if (isBotLive) {
      const groupId = envConfig.groupIdMax
      return navigate(`${PATH_NAMES.CLAN}/${groupId}`)
    }
    if (user && user.id === agent.owner) {
      navigate(`${PATH_NAMES.HOME}`)
    } else {
      const inviteUrl = `${PATH_NAMES.INVITE}/${agent?.id}`
      navigate(inviteUrl)
    }
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {data?.agents.map((item) => (
          <div
            key={item.id}
            className="flex cursor-pointer flex-col justify-between gap-2 rounded-[22px] border border-mercury-100 bg-mercury-50 p-4 hover:bg-mercury-100"
            onClick={() => handleChatWithAgent(item)}
          >
            <div className="flex flex-col items-center">
              <div>
                <AvatarCustom
                  src={item.avatar}
                  badgeIcon={<FilledBrainAIIcon size={14} />}
                  badgeClassName="bg-[#FC0]"
                />
              </div>

              <span className="text-16 font-bold text-mercury-950">
                {item.username}
              </span>

              <p className="line-clamp-3 text-center text-14 font-medium text-mercury-800">
                {item.description || "-"}
              </p>
            </div>
            <div className="line-clamp-1 flex items-center justify-center gap-2 text-14 font-medium text-mercury-600">
              Created by{" "}
              <img
                src={item?.ownerInfo?.avatar || maxAvatarPlaceholder}
                className="h-[18px] w-[18px] rounded-full"
              />{" "}
              {item?.ownerInfo?.username || "-"}
            </div>
          </div>
        ))}
      </div>

      {data && (
        <Pagination
          showControls
          initialPage={1}
          radius="full"
          renderItem={PaginationItemCustom}
          total={data.total ? Math.ceil(data.total / limit) : 1}
          variant="light"
          classNames={{
            base: "flex justify-center mt-4",
            cursor: "bg-mercury-950 font-bold",
          }}
          onChange={onPageChange}
          page={page}
        />
      )}
    </>
  )
}

export default AIAgentList
