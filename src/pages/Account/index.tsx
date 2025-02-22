import { PATH_NAMES } from "@constants/index"
import { lazy, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import AccountInfo from "./AccountInfo"
const MyAgent = lazy(() => import("./MyAgent"))
const MyStakedVault = lazy(() => import("./MyStakedVault"))

enum TabKey {
  MyAgent = "my-agent",
  MyVaultHolding = "my-vault-holdings",
}

const Account = () => {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab")
  const navigate = useNavigate()

  useEffect(() => {
    if (!tab) navigate(`${PATH_NAMES.ACCOUNT}?tab=${TabKey.MyAgent}`)
  }, [tab])

  const isActive = (key: TabKey) => tab === key

  const renderContent = () => {
    switch (tab) {
      case TabKey.MyAgent:
        return <MyAgent />

      default:
        return <MyStakedVault />
    }
  }

  return (
    <div className="mx-auto max-w-[1080px] px-4 pb-10 pt-5">
      <div className="flex flex-wrap">
        <div className="w-[calc(100%-300px)] pr-[64px]">
          <div className="flex items-center gap-2">
            <div
              onClick={() =>
                navigate(`${PATH_NAMES.ACCOUNT}?tab=${TabKey.MyAgent}`)
              }
              className={twMerge(
                "flex h-[60px] cursor-pointer items-center justify-center rounded-full border-1 border-transparent bg-mercury-30 px-6 text-22 font-bold text-mercury-700 duration-300 hover:opacity-70",
                isActive(TabKey.MyAgent) &&
                  "border-brown-500 bg-brown-50 text-brown-600",
              )}
            >
              My Agent
            </div>
            <div
              onClick={() =>
                navigate(`${PATH_NAMES.ACCOUNT}?tab=${TabKey.MyVaultHolding}`)
              }
              className={twMerge(
                "flex h-[60px] cursor-pointer items-center justify-center rounded-full border-1 border-transparent bg-mercury-30 px-6 text-22 font-bold text-mercury-700 duration-300 hover:opacity-70",
                isActive(TabKey.MyVaultHolding) &&
                  "border-brown-500 bg-brown-50 text-brown-600",
              )}
            >
              My Vault Holdings
            </div>
          </div>
          {renderContent()}
        </div>
        <div className="w-[300px]">
          <AccountInfo />
        </div>
      </div>
    </div>
  )
}

export default Account
