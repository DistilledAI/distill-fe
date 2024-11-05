import AvatarCustom from "@components/AvatarCustom"
import useAuthState from "@hooks/useAuthState"
import ShareProfile from "./ShareProfile"
import AuthorUsername from "./Username"

const AuthorProfile: React.FC = () => {
  const { user } = useAuthState()

  return (
    <div className="flex flex-col gap-4 rounded-[22px] border-1 border-white bg-mercury-30 p-4 max-md:bg-white">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-mercury-950">
          Author profile:
        </span>
        <div className="relative flex items-center gap-1">
          <AvatarCustom
            src={user?.avatar}
            publicAddress={user?.publicAddress}
          />
          {/* <Button className="absolute -bottom-1 -right-1 flex h-5 w-5 min-w-0 items-center justify-center rounded-full bg-white p-0">
            <EditPenOutlineIcon />
          </Button> */}
        </div>
      </div>
      <AuthorUsername />
      <div className="flex items-center justify-between">
        <span className="text-mercury-600">Bio:</span>
        <div className="flex items-center gap-2">
          <span className="line-clamp-1 block max-w-36 text-ellipsis whitespace-nowrap text-mercury-900 focus:border-none focus:outline-none">
            {user?.description ?? "-"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <div>
          <ShareProfile />
        </div>
      </div>
    </div>
  )
}

export default AuthorProfile
