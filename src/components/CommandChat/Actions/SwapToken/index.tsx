import { maxIcon, solanaLogo } from "@assets/images"
import ButtonCommand from "@components/CommandChat/Components/ButtonCommand"
import InputCmd from "@components/CommandChat/Components/InputCmd"
import SelectTokenCmd, {
  IToken,
} from "@components/CommandChat/Components/SelectTokenCmd"
import { TokenKey, TOKENS } from "@pages/MyPrivateRoom/DexActionCore/constants"
import { setValueSwap } from "./helpers"
import { useCommandMsgChat } from "@components/CommandChat/Providers/CommandMessageProvider"

export const LIST_TOKEN_SWAP: IToken[] = [
  {
    id: TOKENS[TokenKey.MAX].address,
    title: TOKENS[TokenKey.MAX].label,
    avatar: maxIcon,
  },
  {
    id: TOKENS[TokenKey.SOLANA].address,
    title: TOKENS[TokenKey.SOLANA].label,
    avatar: solanaLogo,
  },
]

const CmdSwapToken = () => {
  const { setInfoAction, infoAction } = useCommandMsgChat()

  return (
    <div className="flex items-center gap-2">
      <ButtonCommand title="/swap" />
      <SelectTokenCmd
        value={infoAction?.data?.swap?.fromToken as string}
        onChangeValue={(token) =>
          setValueSwap("fromToken", token.id, setInfoAction)
        }
        list={LIST_TOKEN_SWAP}
      />
      <InputCmd
        value={infoAction?.data?.swap?.amount as string}
        onChange={(e) => setValueSwap("amount", e.target.value, setInfoAction)}
        type="number"
        placeholder="Enter amount"
        className="w-[120px]"
      />
      <span>to</span>
      <SelectTokenCmd
        value={infoAction?.data?.swap?.toToken as string}
        onChangeValue={(token) =>
          setValueSwap("toToken", token.id, setInfoAction)
        }
        list={LIST_TOKEN_SWAP}
      />
    </div>
  )
}

export default CmdSwapToken
