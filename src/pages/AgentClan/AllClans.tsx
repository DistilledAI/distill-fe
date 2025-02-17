import { maxAvatarPlaceholder } from "@assets/images"
import { AvatarClanByList } from "@components/AvatarContainer"
import { IconSearch } from "@components/Icons/DefiLens"
import useAuthState from "@hooks/useAuthState"
import useFetchClan from "@pages/Marketplace/useFetchClan"

const AllClans = () => {
  const { user, isLogin } = useAuthState()
  const { data } = useFetchClan({
    isFetchNow: true,
    userId: isLogin ? user.id : undefined,
    limit: 30,
  })

  return (
    <div className="-mx-3 mt-6 max-h-[calc(100dvh-180px)] space-y-3 overflow-y-auto overflow-x-hidden px-3 pb-4">
      <div className="flex items-center justify-between">
        <span className="text-14 font-medium text-mercury-800">All Clans</span>
        <div>
          <IconSearch color="#676767" />
        </div>
      </div>
      <div>
        {data.map((item) => (
          <div className="flex cursor-pointer items-center gap-2 p-2">
            <AvatarClanByList
              key={item.id}
              avatarUrl={item.image || maxAvatarPlaceholder}
              isNameDisplay={false}
              name=""
              className="h-8 w-8"
              member={item.groupMemberStats?.total}
            />

            <span className="line-clamp-1 text-16 font-bold text-mercury-950">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllClans
