import { xDSTL } from "@assets/images"
import AvatarCustom from "@components/AvatarCustom"
import ChatInfoCurrent from "@components/ChatInfoCurrent"
import { DatabaseSearchIcon } from "@components/Icons/DatabaseImportIcon"
import { SearchUserIconOutline } from "@components/Icons/UserIcon"
import { WalletIcon } from "@components/Icons/Wallet"
import { PATH_NAMES, RoleUser } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { Button } from "@nextui-org/react"
import useFetchDetail from "@pages/ChatPage/Mobile/ChatDetail/useFetch"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getActiveColorRandomById } from "@utils/index"
import { useNavigate } from "react-router-dom"
import { getMyPrivateAgent } from "services/chat"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"

interface UserAuthProps {
  connectWallet: any
  loading?: boolean
}
const UserAuth: React.FC<UserAuthProps> = ({ connectWallet, loading }) => {
  const { isAnonymous, user, isLogin } = useAuthState()
  const navigate = useNavigate()
  const { groupDetail, chatId } = useFetchDetail()
  const queryClient = useQueryClient()
  const cachedData = queryClient.getQueryData([QueryDataKeys.MY_BOT_LIST])
  const { data } = useQuery<any>({
    queryKey: [QueryDataKeys.MY_BOT_LIST],
    queryFn: async () => {
      if (!cachedData) {
        return await getMyPrivateAgent()
      }
      return cachedData
    },
    enabled: !isAnonymous && isLogin,
  })
  const hasBot = data ? data?.data?.items?.length > 0 : false

  const { textColor } = getActiveColorRandomById(chatId)
  const isHiddenMyData = !hasBot
  const isShowInfo =
    user && user.publicAddress && user.role !== RoleUser.ANONYMOUS
  const totalxDstlPoint = user?.xDstlPoint || 0

  return (
    <div className="flex items-center justify-between">
      <div className="max-md:hidden">
        <ChatInfoCurrent groupDetail={groupDetail} textColor={textColor} />
      </div>
      {isShowInfo ? (
        <div className="inline-flex items-center gap-2">
          <Button
            onClick={() => navigate(PATH_NAMES.MY_DATA)}
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
            onClick={() => navigate(PATH_NAMES.MY_AGENTS)}
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
              <span className="font-bold">{totalxDstlPoint}</span> xDSTL
            </span>
            <div className="absolute -right-2 -top-2 h-3 w-3 rounded-full bg-[#FF3B30] max-md:hidden" />
          </div>

          <Button
            onClick={() => navigate(PATH_NAMES.ACCOUNT)}
            className="btn-primary h-11 w-fit max-md:!h-auto max-md:!w-auto max-md:min-w-0 max-md:gap-0 max-md:p-0"
          >
            <AvatarCustom
              publicAddress={user.publicAddress}
              src={user.avatar}
              className="h-8 w-8"
            />
            <span className="line-clamp-1 block max-w-[150px] text-base max-md:hidden">
              {user.username}
            </span>
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
            onClick={connectWallet}
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
