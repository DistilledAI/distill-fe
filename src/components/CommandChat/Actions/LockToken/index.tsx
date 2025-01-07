import { maxIcon } from "@assets/images"
import ButtonCommand from "@components/CommandChat/Components/ButtonCommand"
import InputCmd from "@components/CommandChat/Components/InputCmd"
import SelectItemCmd from "@components/CommandChat/Components/SelectItemCmd"
import SelectTokenCmd, {
  IToken,
} from "@components/CommandChat/Components/SelectTokenCmd"
import { useCommandMsgChat } from "@components/CommandChat/Providers/CommandMessageProvider"
import {
  LOCK_TIME_OPTIONS,
  TokenKey,
  TOKENS,
} from "@pages/MyPrivateRoom/DexActionCore/constants"
import { setValueLock } from "./helpers"
import { CoinGeckoId } from "@hooks/useCoingecko"

export const LIST_TOKEN_LOCK: IToken[] = [
  {
    id: TOKENS[TokenKey.MAX].address,
    title: TOKENS[TokenKey.MAX].label,
    avatar: maxIcon,
    coinGeckoId: CoinGeckoId["max-2"],
  },
]

const CmdLockToken = () => {
  const { setInfoAction, infoAction } = useCommandMsgChat()

  return (
    <div className="flex items-center gap-2">
      <ButtonCommand title="/lock" />
      <SelectTokenCmd
        value={infoAction?.data?.lock?.fromToken as string}
        onChangeValue={(token) =>
          setValueLock("fromToken", token.id, setInfoAction)
        }
        list={LIST_TOKEN_LOCK}
      />
      <SelectItemCmd
        value={infoAction?.data?.lock?.duration as number}
        onChangeValue={(item) =>
          setValueLock("duration", item.value, setInfoAction)
        }
        list={LOCK_TIME_OPTIONS}
      />
      <InputCmd
        value={infoAction?.data?.lock?.amount as string}
        onChange={(e) => setValueLock("amount", e.target.value, setInfoAction)}
        type="number"
        placeholder="Enter amount"
        className="w-[120px]"
      />
    </div>
  )
}

export default CmdLockToken
