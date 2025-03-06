import AlertBox from "@components/AlertBox"
import { CheckProtectedIcon, WarningIcon } from "@components/Icons"
import { DatabaseImportIcon } from "@components/Icons/DatabaseImportIcon"
import useFetchMyData from "@pages/MyData/useFetch"
import AddData from "./AddData"
import { RefreshIcon } from "@components/Icons/RefreshIcon"
// import TopicRestriction from "./TopicRestriction"

const Knowledge = () => {
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
        {/* <div className="flex items-center gap-1 rounded-full bg-mercury-70 px-2">
          <LockFilledIcon />
          <span className="font-medium uppercase text-mercury-700 max-md:text-14">
            private
          </span>
        </div> */}
      </div>
      {isFetched && (
        <AlertBox
          className="!mx-0 mt-5 w-full"
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
      <div className="mt-3 rounded-[8px] bg-[#FFE9A5] p-3">
        <div className="flex items-center gap-1 text-14 font-semibold text-orange-700">
          <WarningIcon color="#CC6502" />
          <span>To keep your agent updated, please click</span>
          <RefreshIcon color="#F78500" />
          <span>to sync its knowledge with new data.</span>
        </div>
      </div>
      <AddData />
      {/* <TopicRestriction /> */}
    </div>
  )
}

export default Knowledge
