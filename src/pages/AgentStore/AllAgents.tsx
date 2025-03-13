import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { envConfig } from "@configs/env"
import { PATH_NAMES, Publish, RoleUser, STATUS_AGENT } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { IUser } from "@reducers/userSlice"
import { useQuery } from "@tanstack/react-query"
import { ConfigBotType } from "@types"
import { useNavigate, useLocation } from "react-router-dom"
import { searchUsers } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"
import { useMemo, useState } from "react"
import { Pagination, Skeleton } from "@nextui-org/react"
import PaginationItemCustom from "./PaginationItemCustom"
import AvatarCustom from "@components/AvatarCustom"

const AllAgents = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuthState()
  const limit = 9
  const [page, setPage] = useState(1)

  const searchParams = new URLSearchParams(location.search)
  const searchValue = searchParams.get("search") || ""
  const sortBy = searchParams.get("sortBy") || "Oldest"

  useMemo(() => {
    setPage(1)
    return 1
  }, [searchValue])

  const sort = useMemo(() => {
    if (sortBy === "Newest") {
      return { createdAt: "DESC" }
    }
    return { createdAt: "ASC" }
  }, [sortBy])

  const fetchPrivateAgents = async () => {
    const payloadData = {
      username: searchValue,
      status: STATUS_AGENT.ACTIVE,
      role: RoleUser.BOT,
      publish: Publish.Published,
    }

    const res = await searchUsers({
      filter: payloadData,
      sort,
      limit,
      offset: (page - 1) * limit,
    })
    return {
      agents: res?.data?.items as IUser[],
      total: res?.data?.total,
    }
  }

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryDataKeys.PRIVATE_AGENTS_MKL, page, searchValue, sort],
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

  const renderSkeleton = () => (
    <div className="flex flex-col justify-between gap-2 rounded-[22px] border border-mercury-100 bg-mercury-50 p-4">
      <div className="flex flex-col items-center">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="mt-2 h-4 w-3/4 rounded-md" />
        <Skeleton className="mt-2 h-8 w-full rounded-md" />
      </div>
      <div className="flex items-center justify-center gap-2">
        <Skeleton className="h-4 w-1/2 rounded-md" />
      </div>
    </div>
  )

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {isLoading ? (
          Array.from({ length: limit }).map((_, index) => (
            <div key={index}>{renderSkeleton()}</div>
          ))
        ) : data?.agents.length === 0 ? (
          <div className="col-span-full py-10 text-center">
            <p className="text-18 font-semibold text-mercury-950">
              No agents found
            </p>
          </div>
        ) : (
          data?.agents.map((item) => (
            <div
              key={item.id}
              className="flex cursor-pointer flex-col justify-between gap-2 rounded-[22px] border border-mercury-100 bg-mercury-50 p-2 hover:bg-mercury-100 md:p-4"
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

                <span className="text-14 font-bold text-mercury-950 md:text-16">
                  {item.username}
                </span>

                <p className="line-clamp-3 text-center text-12 font-medium text-mercury-800 md:text-14">
                  {item.description || "-"}
                </p>
              </div>
              <div className="line-clamp-1 flex items-center justify-center gap-2 text-12 font-medium text-mercury-600 md:text-14">
                Created by{" "}
                <AvatarCustom
                  src={item?.ownerInfo?.avatar}
                  publicAddress={item?.ownerInfo?.publicAddress}
                  className="h-[18px] w-[18px] rounded-full"
                />
                {item?.ownerInfo?.username || "-"}
              </div>
            </div>
          ))
        )}
      </div>

      {data && data.total > 0 && (
        <Pagination
          showControls
          initialPage={1}
          radius="full"
          renderItem={PaginationItemCustom}
          total={Math.ceil(data.total / limit)}
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

export default AllAgents
