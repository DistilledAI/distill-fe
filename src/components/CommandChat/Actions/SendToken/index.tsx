import { maxIcon, solanaLogo } from "@assets/images"
import ButtonCommand from "@components/CommandChat/Components/ButtonCommand"
import InputCmd from "@components/CommandChat/Components/InputCmd"
import SelectTokenCmd from "@components/CommandChat/Components/SelectTokenCmd"
import { useState } from "react"

const LIST_TOKEN = [
  {
    id: 1,
    avatar: solanaLogo,
    title: "SOL",
  },
  {
    id: 2,
    avatar: maxIcon,
    title: "MAX",
  },
]

const CmdSendToken = () => {
  const [fromToken, setFromToken] = useState(1)
  const [amount, setAmount] = useState("")
  const [toAddress, setToAddress] = useState("")

  return (
    <div className="flex items-center gap-2">
      <ButtonCommand title="/send" />
      <InputCmd
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        placeholder="Enter amount"
        className="w-[120px]"
      />
      <SelectTokenCmd
        value={fromToken}
        onChangeValue={(token) => setFromToken(token.id)}
        list={LIST_TOKEN}
      />
      <span>to</span>
      <InputCmd
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        placeholder="Enter recipient address"
        className="w-[180px]"
      />
    </div>
  )
}

export default CmdSendToken
