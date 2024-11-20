import { CopyIcon } from "@components/Icons/Copy"
import { LogoutIcon } from "@components/Icons/OutputIcon"
import { PATH_NAMES } from "@constants/index"
import useAuthAction from "@hooks/useAuthAction"
import useAuthState from "@hooks/useAuthState"
import { useQuery } from "@tanstack/react-query"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import { useNavigate } from "react-router-dom"
import { QueryDataKeys } from "types/queryDataKeys"
import AgentInfo from "./AgentInfo"
import MyCredits from "./Credits"
import AuthorProfile from "./Profile"

const Account = () => {
  const { user } = useAuthState()
  const navigate = useNavigate()
  const { logout } = useAuthAction()
  const { data }: { data: any } = useQuery({
    queryKey: [QueryDataKeys.MY_BOT_LIST],
  })
  const agents = data ? data.data.items : []

  const renderLogoutBtn = () => {
    return (
      <div
        onClick={() => {
          logout()
          navigate(PATH_NAMES.HOME)
        }}
        className="ml-3 cursor-pointer"
      >
        <LogoutIcon color="#FF3B30" />
      </div>
    )
  }

  return (
    <div className="mx-auto w-[800px] max-w-full px-4 max-md:mt-4 max-md:pb-[80px]">
      <h3 className="mb-2 text-18 font-semibold md:text-24">My wallet</h3>
      <div className="inline-flex items-center">
        <div
          onClick={(e) => copyClipboard(e, user?.publicAddress ?? "")}
          className="flex cursor-pointer"
        >
          <span className="text-16 font-medium text-mercury-800">Address:</span>
          <span className="ml-1 text-16 font-bold text-mercury-800">
            {centerTextEllipsis(user?.publicAddress ?? "", 6)}
          </span>
        </div>
        <div
          onClick={(e) => copyClipboard(e, user?.publicAddress ?? "")}
          className="ml-3 cursor-pointer"
        >
          <CopyIcon />
        </div>
        {renderLogoutBtn()}
      </div>
      <div className="mt-10 flex flex-col gap-4 max-md:mt-7">
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <div>
            <MyCredits />
          </div>
          <div>
            <AuthorProfile />
          </div>
        </div>
        <div>
          <AgentInfo agent={agents[0]} />
        </div>
      </div>
    </div>
  )
}

export default Account
