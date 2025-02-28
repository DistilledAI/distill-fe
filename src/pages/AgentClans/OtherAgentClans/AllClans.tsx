import { maxAvatarPlaceholder } from "@assets/images"
import { AvatarClanByList } from "@components/AvatarContainer"
// import { IconSearch } from "@components/Icons/DefiLens"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { getConfigClanValue } from "@pages/AgentStore/AgentClansStore"
import useFetchGroups, {
  TypeGroup,
  UserGroup,
} from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"
import { useNavigate, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const AllClans = () => {
  const { chatId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthState()

  const { groups } = useFetchGroups({
    initialLimit: 100,
    initialFilter: { typeGroup: TypeGroup.PUBLIC_GROUP },
  })

  return (
    <div className="-mx-3 mt-6 space-y-3 overflow-x-hidden px-3 pb-4">
      <div className="flex items-center justify-between">
        <span className="text-14 font-medium text-mercury-800">All Clans</span>
        {/* <div>
          <IconSearch color="#676767" />
        </div> */}
      </div>
      <div className="max-h-[calc(100dvh-240px)] space-y-2 overflow-y-auto scrollbar-hide md:max-h-[calc(100dvh-212px)]">
        {groups.map((item: UserGroup) => {
          const group = item.group
          const imageUrl = getConfigClanValue(group, "imageLive")

          if (user?.id === group.createBy) {
            return null
          }

          return (
            <div
              key={group.id}
              className={twMerge(
                "flex cursor-pointer items-center gap-4 rounded-full px-3 py-2 hover:bg-mercury-100",
                chatId === group.label && "md:bg-mercury-100",
              )}
              onClick={() => navigate(`${PATH_NAMES.CLAN}/${group.label}`)}
            >
              <AvatarClanByList
                key={group.id}
                avatarUrl={imageUrl || maxAvatarPlaceholder}
                isNameDisplay={false}
                name=""
                className="h-8 w-8"
                member={group.groupMemberStats?.total}
              />

              <span className="line-clamp-1 text-16 font-bold text-mercury-950">
                {group.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllClans
