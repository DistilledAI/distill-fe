import { xDSTL } from "@assets/images"
import AvatarCustom from "@components/AvatarCustom"
import ChatInfoCurrent from "@components/ChatInfoCurrent"
import { WarningIcon } from "@components/Icons"
import { DatabaseSearchIcon } from "@components/Icons/DatabaseImportIcon"
import { SearchUserIconOutline } from "@components/Icons/UserIcon"
import { WalletIcon } from "@components/Icons/Wallet"
import { PATH_NAMES, RoleUser } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import useAuthState from "@hooks/useAuthState"
import { Button } from "@nextui-org/react"
import useGroupDetail from "@pages/ChatPage/hooks/useGroupDetail"
import { getActiveColorRandomById } from "@utils/index"
import { useLocation, useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import LoginPhantom from "./LoginPhantom"
import { numberWithCommas } from "@utils/format"

interface UserAuthProps {
  connectWallet: any
  loading?: boolean
}
const UserAuth: React.FC<UserAuthProps> = ({ connectWallet, loading }) => {
  const { user } = useAuthState()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { groupDetail, groupId } = useGroupDetail()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const hasBot = !!myAgent

  const { textColor } = getActiveColorRandomById(groupId)
  const isHiddenMyData = !hasBot
  const isShowInfo =
    user && user.publicAddress && user.role !== RoleUser.ANONYMOUS
  const totalxDstlPoint = user?.xDstlPoint || 0

  const isStakePage = pathname.startsWith(PATH_NAMES.STAKING)

  if (isStakePage) return <LoginPhantom />

  return (
    <div className="flex items-center justify-between">
      <div className="max-md:hidden">
        <ChatInfoCurrent groupDetail={groupDetail} textColor={textColor} />
      </div>
      {isShowInfo ? (
        <div className="inline-flex items-center gap-2">
          <Button
            onPress={() => navigate(PATH_NAMES.MY_DATA)}
            className={twMerge(
              "btn-primary hidden h-11 md:block",
              isHiddenMyData && "!hidden",
            )}
          >
            <div className="flex items-center gap-1">
              <DatabaseSearchIcon />
              <span className="text-base">My Data</span>
            </div>
          </Button>
          <Button
            onPress={() => navigate(PATH_NAMES.MY_AGENTS)}
            className={twMerge("btn-primary hidden h-11 md:block")}
          >
            <div className="flex items-center gap-1">
              <SearchUserIconOutline />
              <span className="text-base">My Agents</span>
            </div>
          </Button>

          <div
            className="relative flex cursor-pointer items-center gap-1"
            onClick={() => navigate(PATH_NAMES.REWARDS)}
          >
            <img src={xDSTL} width={24} height={24} />
            <span className="text-base text-mercury-900">
              <span className="font-bold">
                {numberWithCommas(totalxDstlPoint)}
              </span>{" "}
              xDSTL
            </span>
            <div className="absolute -right-2 -top-2 h-3 w-3 rounded-full bg-[#FF3B30] max-md:hidden" />
          </div>

          <Button
            onPress={() => navigate(PATH_NAMES.ACCOUNT)}
            className="btn-primary h-11 w-fit max-md:!h-auto max-md:!w-auto max-md:min-w-0 max-md:gap-0 max-md:p-0"
          >
            <AvatarCustom
              publicAddress={user.publicAddress}
              src={user.avatar}
              className="h-8 w-8"
            />
            {user.walletActive ? (
              <span className="line-clamp-1 block max-w-[150px] text-base max-md:hidden">
                {user.username}
              </span>
            ) : (
              <div className="hidden items-center gap-1 md:flex">
                <div className="flex items-center gap-1 text-[#F78500]">
                  <WarningIcon color="#F78500" /> Inactive
                </div>
              </div>
            )}
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <div
            onClick={connectWallet}
            className="mr-1 flex cursor-pointer items-center gap-1"
          >
            <img src={xDSTL} width={24} height={24} />
            <span className="text-13 font-semibold">Earn xDSTL</span>
          </div>
          <Button
            className="h-[44px] rounded-full bg-mercury-950 text-white max-md:h-[36px]"
            isLoading={loading}
            onPress={connectWallet}
          >
            <div className="flex items-center gap-1 max-md:hidden">
              {!loading && <WalletIcon />} Connect Wallet
            </div>
            <span className="hidden max-md:block">Connect</span>
          </Button>
        </div>
      )}
    </div>
  )
}

export default UserAuth
