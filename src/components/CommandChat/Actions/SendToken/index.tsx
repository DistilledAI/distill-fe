import { maxIcon, solanaLogo } from "@assets/images"
import ButtonCommand from "@components/CommandChat/Components/ButtonCommand"
import InputCmd from "@components/CommandChat/Components/InputCmd"
import SelectTokenCmd, {
  IToken,
} from "@components/CommandChat/Components/SelectTokenCmd"
import { useCommandMsgChat } from "@components/CommandChat/Providers/CommandMessageProvider"
import { setValueSend } from "./helpers"
import { TokenKey, TOKENS } from "@pages/MyPrivateRoom/DexActionCore/constants"

export const LIST_TOKEN_SEND: IToken[] = [
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

const CmdSendToken = () => {
  const { setInfoAction, infoAction } = useCommandMsgChat()

  return (
    <div className="flex items-center gap-2">
      <ButtonCommand title="/send" />
      <InputCmd
        value={infoAction?.data?.send?.amount as string}
        onChange={(e) => setValueSend("amount", e.target.value, setInfoAction)}
        type="number"
        placeholder="Enter amount"
        className="w-[120px]"
      />
      <SelectTokenCmd
        value={infoAction?.data?.send?.tokenAddress as string}
        onChangeValue={(token) =>
          setValueSend("tokenAddress", token.id, setInfoAction)
        }
        list={LIST_TOKEN_SEND}
      />
      <span>to</span>
      <InputCmd
        value={infoAction?.data?.send?.toAccountAddress as string}
        onChange={(e) =>
          setValueSend("toAccountAddress", e.target.value, setInfoAction)
        }
        placeholder="Enter recipient address"
        className="w-[180px]"
      />
    </div>
  )
}

export default CmdSendToken
