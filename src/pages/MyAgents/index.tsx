import AlertBox from "@components/AlertBox"
import HeaderMobileBack from "@components/HeaderMobileBack"
import { PATH_NAMES, STATUS_AGENT } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import MyAgents from "@pages/Account/MyAgents"
import AgentStatus from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent/AgentInitialization/AgentStatus"

const MyAgentPage = () => {
  const agents = useAppSelector((state) => state.agents.myAgents)
  const agent = agents[0]
  const isAgentActive = agent && agent?.status === STATUS_AGENT.ACTIVE

  return (
    <div className="mx-auto max-w-[860px] space-y-6 px-4 pb-5 max-md:min-h-dvh max-md:bg-mercury-70 max-md:pt-[50px]">
      <div className="md:hidden">
        <HeaderMobileBack title="My Agents" />
      </div>
      {!!agent && (
        <>
          <AgentStatus
            classNames={{
              wrapper: "flex-row justify-center gap-4",
              textWrapper: "flex-row gap-1 items-center",
            }}
            isAgentActive={isAgentActive}
          />
          <AlertBox
            isVisible={!isAgentActive}
            messages={[
              "Please join the whitelist to activate. You will receive an email from contact@distilled.ai once your Personal Agent has been approved.",
            ]}
            links={[
              {
                to: "https://forms.gle/qGWWAnt3nWWAkxeE9",
                label: "Enter waitlist",
                external: true,
              },
              { to: PATH_NAMES.MARKETPLACE, label: "Chat with other agents" },
            ]}
          />
        </>
      )}
      <MyAgents agents={agents} />
    </div>
  )
}

export default MyAgentPage
