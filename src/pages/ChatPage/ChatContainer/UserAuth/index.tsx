import { xDSTL } from "@assets/images"
import AvatarCustom from "@components/AvatarCustom"
import ChatInfoCurrent from "@components/ChatInfoCurrent"
import { CopyIcon } from "@components/Icons/Copy"
import { LogoutIcon } from "@components/Icons/OutputIcon"
import { CoinsOutlineIcon } from "@components/Icons/Sidebar"
import { UserIcon } from "@components/Icons/UserIcon"
import { WalletIcon } from "@components/Icons/Wallet"
import { PATH_NAMES, RoleUser } from "@constants/index"
import useAuthAction from "@hooks/useAuthAction"
import useAuthState from "@hooks/useAuthState"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import useGroupDetail from "@pages/ChatPage/hooks/useGroupDetail"
import { numberWithCommas } from "@utils/format"
import {
  centerTextEllipsis,
  copyClipboard,
  getActiveColorRandomById,
} from "@utils/index"
import { useLocation, useNavigate } from "react-router-dom"
import LoginPhantom from "./LoginPhantom"
import useWindowSize from "@hooks/useWindowSize"
import SidebarMobile from "@components/Layout/SidebarMobile"

interface UserAuthProps {
  connectWallet: any
  loading?: boolean
}
const UserAuth: React.FC<UserAuthProps> = ({ connectWallet, loading }) => {
  const { user } = useAuthState()
  const navigate = useNavigate()
  const { isMobile } = useWindowSize()
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
        <div className="inline-flex items-center gap-2 md:gap-3">
          {isMobile ? (
            <SidebarMobile />
          ) : (
            <Dropdown placement="bottom" className="w-[250px]">
              <DropdownTrigger>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-mercury-30 p-1 !outline-none md:h-12 md:w-12"
                >
                  <AvatarCustom
                    publicAddress={user.publicAddress}
                    src={user.avatar}
                    className="h-full w-full"
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
                </DropdownItem>

                <DropdownItem
                  key="x-dstl"
                  className="mb-2 mt-2 h-12 bg-[#F6F4EC] p-2"
                >
                  <div className="flex items-center gap-2">
                    <img src={xDSTL} width={24} height={24} />
                    <span className="text-13 text-mercury-900 md:text-16">
                      <span className="font-bold">
                        {numberWithCommas(totalxDstlPoint)}
                      </span>{" "}
                      xDSTL
                    </span>
                  </div>
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
                  key="my-staked-vaults"
                  onPress={() => {
                    navigate("/account?tab=my-vault-holdings")
                  }}
                  className="p-0 hover:!bg-transparent"
                >
                  <div className="mb-2 flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-mercury-70">
                    <CoinsOutlineIcon />
                    <span className="text-16 font-bold text-mercury-900">
                      My Staked Vaults
                    </span>
                  </div>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  onPress={() => {
                    logout(true)
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
          )}
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
