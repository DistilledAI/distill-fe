import HistoryTable from "./History"
import ShareInfo from "./ShareInfo"

const InvestInformation = () => {
  return (
    <div className="pb-10">
      <p className="text-[36px] font-semibold max-md:text-[22px]">
        AI Fund 1 Vault
      </p>
      <div className="mt-10 flex flex-wrap gap-8 max-md:mt-6 max-md:flex-col-reverse">
        <div className="w-[calc(60%-16px)] max-md:w-full">
          <ShareInfo />
          <div className="mt-8">
            <p className="mb-4 text-24 font-semibold text-mercury-950 max-md:text-20">
              Balance History
            </p>
            <HistoryTable />
          </div>
        </div>
        <div className="w-[calc(40%-16px)] max-md:w-full">
          <p className="mb-4 text-24 font-semibold text-mercury-950 max-md:text-20">
            How Does AI Fund 1 Work?
          </p>
          <p className="text-mercury-800">
            AI Agent Fund I is the first vault of BlackRack Agent. It manages
            80,000 ORAI funded by Oraichain DAO to invest and generate profits.
          </p>
        </div>
      </div>
    </div>
  )
}

export default InvestInformation
