import { solanaLogo } from "@assets/images"
import DisplayWrapper from "../Components/DisplayWrapper"
import CmdTokenInfo from "../Components/TokenInfo"
import ContractAddress from "../Components/ContractAddress"

const SendToken = () => {
  return (
    <DisplayWrapper>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 pt-1">
          <p className="font-semibold">Send</p>
          <CmdTokenInfo
            tokenAva={solanaLogo}
            networkAva={solanaLogo}
            amount={2}
            tokenName="SOL"
            usdPrice={500}
          />
          <p className="font-semibold">to</p>
          <ContractAddress />
        </div>
        <div className="cursor-pointer font-semibold text-brown-600 underline">
          Approve to do this
        </div>
      </div>
    </DisplayWrapper>
  )
}

export default SendToken
