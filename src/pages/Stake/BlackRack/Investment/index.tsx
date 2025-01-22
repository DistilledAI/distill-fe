import useConnectPhantom from "@pages/Stake/useConnectPhantom"
import AumInfo from "./AumInfo"
import BoxInvest from "./BoxInvest"
import InvestTable from "./InvestTable"
import useGetUnbondingList from "./InvestTable/useGetUnbondingList"
// import InvestTable from "./InvestTable"
import InvestShareUser from "./ShareUser"
import TotalShare from "./TotalShare"
import useGetShareValue from "./useGetShareValue"

const InvestmentVault = () => {
  const { list, getListUnbonding } = useGetUnbondingList()
  const { isConnectWallet } = useConnectPhantom()
  const {
    total: totalShare,
    loading,
    nav,
    getStakedAmount,
  } = useGetShareValue()

  return (
    <div className="pb-10">
      <p className="text-[36px] font-semibold max-md:text-[22px]">
        AI Fund II Vault
      </p>
      <div className="mt-10 flex flex-wrap gap-8 max-md:mt-6 max-md:flex-col-reverse">
        <div className="w-[calc(60%-16px)] max-md:w-full">
          <InvestShareUser nav={nav} total={totalShare} loading={loading} />
          <div className="mt-8">
            <p className="mb-4 text-24 font-semibold text-mercury-950 max-md:text-20">
              How Does AI Fund II Work?
            </p>
            <p className="text-16 font-medium text-mercury-800">
              When depositing into the RACKS vault, you’ll receive a token{" "}
              <span className="text-orange-600">(AIFII)</span> that represents
              your share of the vault’s pooled holdings in return for your
              deposit. As BlackRack’s investments generate profits, the value of
              the share price <span className="text-orange-600">(AIFII)</span>{" "}
              you received increases.
            </p>
            <p className="my-4 font-bold italic text-mercury-950">
              Share Price = AUM / Total Shares
            </p>
            <p className="text-16 font-medium text-mercury-800">
              To withdraw your share, you must activate a{" "}
              <span className="text-orange-600">3-day unbonding period</span>.
              Your share will be converted into USDC value. While you may
              initiate withdrawal at any time, your tokens will only become
              available after this duration.
            </p>
          </div>
          {list.length > 0 && isConnectWallet ? (
            <InvestTable list={list} getListUnbonding={getListUnbonding} />
          ) : (
            ""
          )}
          <TotalShare />
        </div>
        <div className="w-[calc(40%-16px)] max-md:w-full">
          <AumInfo />
          <BoxInvest
            callback={() => {
              getStakedAmount()
              getListUnbonding()
            }}
            totalShare={totalShare}
            loadingTotalShare={loading}
            nav={nav}
          />
        </div>
      </div>
    </div>
  )
}

export default InvestmentVault
