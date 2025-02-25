import AgentSetupStatus from "@components/AgentSetupStatus"
import AlertBox from "@components/AlertBox"
import { CheckProtectedIcon } from "@components/Icons"
import { DatabaseImportIcon } from "@components/Icons/DatabaseImportIcon"
import { STATUS_AGENT } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import useFetchMyData from "@pages/MyData/useFetch"
import AddData from "./AddData"

const Knowledge = () => {
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const isAgentActive = myAgent?.status === STATUS_AGENT.ACTIVE
  const { list, isFetched } = useFetchMyData()

  const isShowAddData = list.length === 0 && isFetched

  return (
    <div>
      <div className="flex items-center gap-1">
        <DatabaseImportIcon />
        <span className="text-[22px] font-semibold">Connected Sources</span>
      </div>
      <div className="mt-5">
        <AgentSetupStatus isAgentActive={isAgentActive} />
      </div>
      {isFetched && (
        <AlertBox
          className="mx-auto max-w-[768px]"
          isVisible={true}
          icon={<CheckProtectedIcon />}
          messages={[
            <p>
              {isShowAddData && (
                <span>
                  Since no data has been added, your agent lacks personalized
                  intelligence.
                </span>
              )}
              Your data is protected through <b>Confidential Computing (CC)</b>{" "}
              within a <b>Trusted Execution Environment (TEE)</b>.
            </p>,
          ]}
        />
      )}
      <AddData />
    </div>
  )
}

export default Knowledge
