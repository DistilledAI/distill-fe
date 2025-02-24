import ClanTitle from "./ClanTitle"
import { CodesanboxIcon } from "@components/Icons/RewardsIcons"
import ClanPublicChip from "./ClanPublicChip"
import { Input, Switch } from "@nextui-org/react"
import LabelRequired from "./LabelRequired"

const TokenInfo = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <ClanTitle
          icon={<CodesanboxIcon size={24} color="#A2845E" />}
          title="Tokenize Info"
        />
        <ClanPublicChip />
      </div>
      <div className="flex items-center rounded-lg bg-brown-50 p-4 text-13 font-bold text-brown-600">
        💡 You can launch your token on Agents.land after completing your
        agent’s creation.
      </div>

      <Switch
        defaultSelected
        classNames={{
          label: "text-[16px] font-bold text-mercury-950",
        }}
      >
        Mark as Tokenized
      </Switch>

      <div className="flex items-center gap-4">
        <div className="flex-1 space-y-2">
          <LabelRequired label="Contract address" />
          <Input
            classNames={{
              inputWrapper:
                "bg-mercury-70 rounded-lg border border-mercury-400 p-4",
              input: "text-[14px] font-medium text-mercury-950 ",
            }}
            placeholder="Copy the exact capitalization to avoid errors."
            endContent={
              <button className="rounded bg-brown-50 px-2 text-16 font-bold text-brown-600">
                PASTE
              </button>
            }
          />
        </div>
        <div className="flex-1 space-y-2">
          <LabelRequired label="Trading link" />
          <Input
            classNames={{
              inputWrapper:
                "bg-mercury-70 rounded-lg border border-mercury-400 px-4 py-2",
              input: "text-[14px] font-medium text-mercury-950 ",
            }}
            placeholder="e.g. https://agents.land/trading/ABC"
            endContent={
              <button className="rounded bg-brown-50 px-2 text-16 font-bold text-brown-600">
                PASTE
              </button>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default TokenInfo
