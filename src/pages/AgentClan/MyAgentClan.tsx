import { maxAvatarPlaceholder } from "@assets/images"
import { AvatarClanByList } from "@components/AvatarContainer"
import ActiveEffect from "@pages/ChatPage/ChatBox/LeftBar/ActiveEffect"

const MyAgentClan = () => {
  return (
    <button
      type="button"
      className="relative flex h-[64px] w-full items-center gap-4 rounded-full bg-mercury-100 px-4"
    >
      <AvatarClanByList
        avatarUrl={maxAvatarPlaceholder}
        isNameDisplay={false}
        name=""
        className="h-8 w-8"
      />
      <span className="text-16 font-bold text-mercury-950">Clan name</span>
      <ActiveEffect isActive className="-left-3 bg-lgd-code-hot-ramp" />
    </button>
  )
}

export default MyAgentClan
