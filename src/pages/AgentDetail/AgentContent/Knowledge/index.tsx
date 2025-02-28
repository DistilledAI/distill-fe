import AgentSetupStatus from "@components/AgentSetupStatus"
import AlertBox from "@components/AlertBox"
import { CheckProtectedIcon } from "@components/Icons"
import { LockFilledIcon } from "@components/Icons/AgentDetailIcon"
import { DatabaseImportIcon } from "@components/Icons/DatabaseImportIcon"
import { STATUS_AGENT } from "@constants/index"
import { useAppSelector } from "@hooks/useAppRedux"
import useFetchMyData from "@pages/MyData/useFetch"
import AddData from "./AddData"
import TopicRestriction from "./TopicRestriction"

const Knowledge = () => {
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const isAgentActive = myAgent?.status === STATUS_AGENT.ACTIVE
  const { list, isFetched } = useFetchMyData()

  const isShowAddData = list.length === 0 && isFetched

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <DatabaseImportIcon />
          <span className="text-[22px] font-semibold max-md:text-18">
            Connected Sources
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-mercury-70 px-2">
          <LockFilledIcon />
          <span className="font-medium uppercase text-mercury-700 max-md:text-14">
            private
          </span>
        </div>
      </div>
      <div className="mt-5">
        <AgentSetupStatus isAgentActive={isAgentActive} />
      </div>
      {isFetched && (
        <AlertBox
          className="!mx-0 w-full"
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
      <TopicRestriction />
    </div>
  )
}

export default Knowledge
