import { xDSTL } from "@assets/images"
import AvatarCustom from "@components/AvatarCustom"
import ChatInfoCurrent from "@components/ChatInfoCurrent"
import { WalletIcon } from "@components/Icons/Wallet"
import { PATH_NAMES, RoleUser } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import useGroupDetail from "@pages/ChatPage/hooks/useGroupDetail"
import {
  centerTextEllipsis,
  copyClipboard,
  getActiveColorRandomById,
} from "@utils/index"
import { useLocation, useNavigate } from "react-router-dom"
import LoginPhantom from "./LoginPhantom"
import { numberWithCommas } from "@utils/format"
import { CopyIcon } from "@components/Icons/Copy"
import { LogoutIcon } from "@components/Icons/OutputIcon"
import { UserIcon } from "@components/Icons/UserIcon"
import useAuthAction from "@hooks/useAuthAction"

interface UserAuthProps {
  connectWallet: any
  loading?: boolean
}
const UserAuth: React.FC<UserAuthProps> = ({ connectWallet, loading }) => {
  const { user } = useAuthState()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { groupDetail, groupId } = useGroupDetail()
  const { logout } = useAuthAction()

  const { textColor } = getActiveColorRandomById(groupId)
  const isShowInfo =
    user && user.publicAddress && user.role !== RoleUser.ANONYMOUS
  const totalxDstlPoint = user?.xDstlPoint || 0

  const isActionWeb3 =
    pathname.startsWith(PATH_NAMES.STAKING) ||
    pathname.startsWith(PATH_NAMES.DAO)

  if (isActionWeb3) return <LoginPhantom />

  return (
    <div className="flex items-center justify-between">
      <div className="max-md:hidden">
        <ChatInfoCurrent groupDetail={groupDetail} textColor={textColor} />
      </div>
      {isShowInfo ? (
        <div className="inline-flex items-center gap-3">
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

          <Dropdown placement="bottom">
            <DropdownTrigger>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white bg-mercury-30 !outline-none"
              >
                <AvatarCustom
                  publicAddress={user.publicAddress}
                  src={user.avatar}
                  className="h-8 w-8"
                />
              </button>
            </DropdownTrigger>
            <DropdownMenu className="items-start p-4">
              <DropdownItem
                key="user-info"
                className="p-0 hover:!bg-transparent"
              >
                <div className="flex gap-3">
                  <AvatarCustom
                    publicAddress={user.publicAddress}
                    src={user.avatar}
                  />
                  <div>
                    <span className="text-14 font-bold text-mercury-950">
                      {user.username}
                    </span>
                    <div
                      onClick={(e) => {
                        copyClipboard(e, user?.publicAddress ?? "")
                      }}
                      className="flex cursor-pointer items-center gap-1"
                    >
                      <span className="text-16 text-mercury-900">
                        {centerTextEllipsis(user?.publicAddress ?? "", 4)}
                      </span>
                      <CopyIcon color="#545454" size={20} />
                    </div>
                  </div>
                </div>

                <div className="my-4 h-[1px] w-full bg-mercury-200" />
              </DropdownItem>
              <DropdownItem
                key="my-profile"
                onPress={() => {
                  navigate(PATH_NAMES.ACCOUNT)
                }}
                className="p-0 hover:!bg-transparent"
              >
                <div className="mb-2 flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-mercury-70">
                  <UserIcon />
                  <span className="text-16 font-bold text-mercury-900">
                    My Profile
                  </span>
                </div>
              </DropdownItem>
              <DropdownItem
                key="logout"
                onPress={() => {
                  logout()
                }}
                className="p-0 hover:!bg-transparent"
              >
                <div className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-mercury-70">
                  <LogoutIcon color="#FF3B30" />
                  <span className="text-16 font-bold text-[#FF3B30]">
                    Log out
                  </span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
