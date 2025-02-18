import { maxAvatarPlaceholder2 } from "@assets/images"
import { EditPenOutlineIcon } from "@components/Icons/Edit"
import { PlusIcon } from "@components/Icons/Plus"
import { WalletIcon } from "@components/Icons/Wallet"
import { PATH_NAMES, RoleUser } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

const MyAgentClanEmpty = () => {
  const navigate = useNavigate()
  const agent = useAppSelector((state) => state.agents.myAgent)
  const { user } = useAuthState()
  const { connectMultipleWallet, loading } = useConnectWallet()

  const isUserLogged = user.publicAddress && user.role !== RoleUser.ANONYMOUS

  const renderContent = () => {
    if (!agent) {
      return (
        <p className="text-18 font-semibold text-mercury-950">
          Please <span className="text-brown-500">Create Your First Agent</span>
        </p>
      )
    }

    return (
      <p className="text-18 font-semibold text-mercury-950">
        Please enable Clan on the{" "}
        <span className="text-brown-500">Edit Agent</span> page.
      </p>
    )
  }

  return (
    <div className="flex h-[calc(100dvh-68px)] w-full flex-col items-center justify-center">
      <p className="text-18 font-semibold text-mercury-950">
        Your Agent Clan is not enabled yet.
      </p>
      {renderContent()}

      <img
        src={agent?.avatar || maxAvatarPlaceholder2}
        className="mb-4 mt-10 h-[419px] w-auto rounded-3xl object-cover"
        alt="avatar placeholder"
      />

      {!isUserLogged ? (
        <Button
          className="h-14 rounded-full bg-mercury-950 text-white max-md:h-[36px]"
          isLoading={loading}
          onPress={connectMultipleWallet}
        >
          <div className="flex items-center gap-1 max-md:hidden">
            {!loading && <WalletIcon />} Connect Wallet
          </div>
          <span className="hidden max-md:block">Connect</span>
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          {!agent ? (
            <Button
              className="h-14 rounded-full bg-mercury-950 text-[16px] font-bold text-mercury-30"
              isLoading={loading}
              onPress={() => navigate(PATH_NAMES.CREATE_AGENT)}
            >
              <PlusIcon color="#FAFAFA" />
              Create Agent
            </Button>
          ) : (
            <Button
              className="h-14 rounded-full bg-brown-50 text-[16px] font-bold text-brown-600"
              isLoading={loading}
              onPress={() => navigate(`${PATH_NAMES.AGENT_DETAIL}/${agent.id}`)}
            >
              <EditPenOutlineIcon color="#83664B" size={20} />
              Edit Agent
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default MyAgentClanEmpty
