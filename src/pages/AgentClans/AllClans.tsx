import { maxAvatarPlaceholder } from "@assets/images"
import { AvatarClanByList } from "@components/AvatarContainer"
// import { IconSearch } from "@components/Icons/DefiLens"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { getConfigClanValue } from "@pages/AgentStore/AgentClansStore"
import useFetchClan from "@pages/Marketplace/useFetchClan"
import { useNavigate, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const AllClans = () => {
  const { chatId } = useParams()
  const { user, isLogin } = useAuthState()
  const navigate = useNavigate()
  const { data } = useFetchClan({
    isFetchNow: true,
    userId: isLogin ? user.id : undefined,
    limit: 30,
  })

  return (
    <div className="-mx-3 mt-6 max-h-[calc(100dvh-180px)] space-y-3 overflow-y-auto overflow-x-hidden px-3 pb-4">
      <div className="flex items-center justify-between">
        <span className="text-14 font-medium text-mercury-800">All Clans</span>
        {/* <div>
          <IconSearch color="#676767" />
        </div> */}
      </div>
      <div className="space-y-2">
        {data.map((item) => {
          const imageUrl = getConfigClanValue(item, "imageLive")

          return (
            <div
              key={item.id}
              className={twMerge(
                "flex cursor-pointer items-center gap-4 rounded-full px-3 py-2 hover:bg-mercury-100",
                chatId === item.label && "md:bg-mercury-100",
              )}
              onClick={() => navigate(`${PATH_NAMES.CLAN}/${item.label}`)}
            >
              <AvatarClanByList
                key={item.id}
                avatarUrl={imageUrl || maxAvatarPlaceholder}
                isNameDisplay={false}
                name=""
                className="h-8 w-8"
                member={item.groupMemberStats?.total}
              />

              <span className="line-clamp-1 text-16 font-bold text-mercury-950">
                {item.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllClans
