import { maxIcon, solanaLogo } from "@assets/images"
import ButtonCommand from "@components/CommandChat/Components/ButtonCommand"
import InputCmd from "@components/CommandChat/Components/InputCmd"
import PopoverCommand from "@components/CommandChat/Components/SelectTokenCmd"
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

const CmdSwapToken = () => {
  const [fromToken, setFromToken] = useState(1)
  const [amount, setAmount] = useState("")
  const [toToken, setToToken] = useState(2)

  return (
    <div className="flex items-center gap-2">
      <ButtonCommand title="/swap" />
      <PopoverCommand
        value={fromToken}
        onChangeValue={(token) => setFromToken(token.id)}
        list={LIST_TOKEN}
      />
      <InputCmd
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        placeholder="Enter amount"
        className="w-[120px]"
      />
      <span>to</span>
      <PopoverCommand
        value={toToken}
        onChangeValue={(token) => setToToken(token.id)}
        list={LIST_TOKEN}
      />
    </div>
  )
}

export default CmdSwapToken
