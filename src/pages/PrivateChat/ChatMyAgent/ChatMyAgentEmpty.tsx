import { maxAvatarPlaceholder } from "@assets/images"
import { PlusIcon } from "@components/Icons/Plus"
import { WalletIcon } from "@components/Icons/Wallet"
import { PATH_NAMES, RoleUser } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

const ChatMyAgentEmpty = () => {
  const navigate = useNavigate()
  const { user } = useAuthState()
  const { connectMultipleWallet, loading } = useConnectWallet()

  const isUserLogged = user.publicAddress && user.role !== RoleUser.ANONYMOUS

  return (
    <div className="flex h-[calc(100dvh-112px)] w-full flex-col md:h-full">
      <div className="mx-auto min-h-[111px] w-full max-w-[768px] border border-mercury-100 bg-mercury-50 p-4 max-md:border-x-0 max-md:px-4 md:rounded-[14px]">
        <div className="flex gap-x-3 md:gap-x-4">
          <img
            src={maxAvatarPlaceholder}
            className="h-[72px] w-[72px] object-cover"
          />
          <div className="flex-1 space-y-3">
            <div className="flex justify-between gap-x-2 md:gap-x-4">
              <div>
                <span className="text-16 font-bold text-mercury-950">
                  Agent name
                </span>
                <div className="flex items-center gap-x-1 max-[320px]:flex-wrap md:gap-x-2">
                  <span className="text-14 font-medium text-mercury-600">
                    Created by -
                  </span>
                </div>
              </div>
            </div>

            <p className="text-14 font-medium text-mercury-600">
              A short bio will be displayed here.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <p className="text-16 font-semibold text-mercury-950 md:text-18">
          Your Agent is not created yet.
        </p>
        <p className="text-16 font-semibold text-mercury-950 md:text-18">
          Please{" "}
          <span className="text-brown-500">Create Your First Agent.</span>
        </p>

        {!isUserLogged ? (
          <Button
            className="mt-4 h-14 rounded-full bg-mercury-950 text-white max-md:h-[36px] md:mt-8"
            isLoading={loading}
            onPress={connectMultipleWallet}
          >
            <div className="flex items-center gap-1 max-md:hidden">
              {!loading && <WalletIcon />} Connect Wallet
            </div>
            <span className="hidden max-md:block">Connect</span>
          </Button>
        ) : (
          <Button
            className="mt-4 h-14 rounded-full bg-mercury-950 text-[16px] font-bold text-mercury-30 md:mt-8"
            isLoading={loading}
            onPress={() => navigate(PATH_NAMES.CREATE_AGENT)}
          >
            <PlusIcon color="#FAFAFA" />
            Create Agent
          </Button>
        )}
      </div>
    </div>
  )
}

export default ChatMyAgentEmpty
