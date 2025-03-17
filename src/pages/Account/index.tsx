import { PATH_NAMES } from "@constants/index"
import { lazy, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import AccountInfo from "./AccountInfo"
import DynamicTitleMeta from "@components/DynamicTitleMeta"
const MyAgent = lazy(() => import("./MyAgent"))
const MyStakedVault = lazy(() => import("./MyStakedVault"))

enum TabKey {
  MyAgent = "my-agent",
  MyVaultHolding = "my-vault-holdings",
}

const TABS = {
  [TabKey.MyAgent]: "My Agent",
  [TabKey.MyVaultHolding]: "My Vault Holdings",
} as const

const Account = () => {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab") as TabKey | null
  const navigate = useNavigate()

  useEffect(() => {
    if (!tab) navigate(`${PATH_NAMES.ACCOUNT}?tab=${TabKey.MyAgent}`)
  }, [tab])

  const isActive = (key: TabKey) => tab === key

  const renderContent = () => {
    switch (tab) {
      case TabKey.MyAgent:
        return <MyAgent />
      case TabKey.MyVaultHolding:
        return <MyStakedVault />
      default:
        return <MyAgent />
    }
  }

  const pageTitleMeta = tab && tab in TABS ? TABS[tab] : TABS[TabKey.MyAgent]

  return (
    <>
      <DynamicTitleMeta title={pageTitleMeta} />
      <div className="mx-auto max-w-[1080px] px-4 pb-10 pt-5 max-md:pb-[70px]">
        <div className="flex flex-wrap max-md:flex-col-reverse">
          <div className="w-[calc(100%-300px)] pr-[64px] max-md:w-full max-md:pr-0">
            <div className="flex items-center gap-2">
              <div
                onClick={() =>
                  navigate(`${PATH_NAMES.ACCOUNT}?tab=${TabKey.MyAgent}`, {
                    replace: true,
                  })
                }
                className={twMerge(
                  "flex h-[60px] cursor-pointer items-center justify-center rounded-full border-1 border-transparent bg-mercury-30 px-6 text-22 font-bold text-mercury-700 duration-300 hover:opacity-70 max-md:h-[44px] max-md:text-14",
                  isActive(TabKey.MyAgent) &&
                    "border-brown-500 bg-brown-50 text-brown-600",
                )}
              >
                {TABS[TabKey.MyAgent]}
              </div>
              <div
                onClick={() =>
                  navigate(
                    `${PATH_NAMES.ACCOUNT}?tab=${TabKey.MyVaultHolding}`,
                    {
                      replace: true,
                    },
                  )
                }
                className={twMerge(
                  "flex h-[60px] cursor-pointer items-center justify-center rounded-full border-1 border-transparent bg-mercury-30 px-6 text-22 font-bold text-mercury-700 duration-300 hover:opacity-70 max-md:h-[44px] max-md:text-14",
                  isActive(TabKey.MyVaultHolding) &&
                    "border-brown-500 bg-brown-50 text-brown-600",
                )}
              >
                {TABS[TabKey.MyVaultHolding]}
              </div>
            </div>
            {renderContent()}
          </div>
          <div className="w-[300px] max-md:mb-6 max-md:w-full">
            <AccountInfo />
          </div>
        </div>
      </div>
    </>
  )
}

export default Account
