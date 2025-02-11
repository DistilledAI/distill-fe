import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { InfoCircleOutlineIcon } from "@components/Icons/InfoCircleIcon"
import { Tooltip } from "@nextui-org/react"

const VotingStats = () => (
  <div className="rounded-2xl border border-mercury-100 bg-mercury-70">
    <StatBlock title="Ratio of votes">
      <VoteRatio />
    </StatBlock>

    <div className="h-[1px] w-full bg-mercury-100" />

    <StatBlock>
      <TurnoutStats />
    </StatBlock>
  </div>
)

export default VotingStats

const StatBlock = ({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) => (
  <div className="space-y-4 px-4 py-3">
    {title && (
      <span className="text-16 font-medium text-mercury-950">{title}</span>
    )}
    {children}
  </div>
)

const VoteRatio = () => (
  <>
    <div className="flex items-center justify-between">
      <span className="text-16 text-green-500">92.49% Yes</span>
      <div className="space-x-3">
        <span className="text-16 text-[#FF3B30]">2.461% No</span>
        <span className="text-16 text-mercury-700">5.053% Abstain</span>
      </div>
    </div>
    <div className="relative flex h-3 w-full items-start rounded-full">
      <div className="h-full w-1/3 rounded-bl-full rounded-tl-full bg-green-500" />
      <div className="h-full w-1/3 bg-[#FF3B30]" />
      <div className="h-full w-1/3 rounded-br-full rounded-tr-full bg-mercury-300" />
    </div>
    <div className="flex items-center justify-between">
      <span className="text-16 text-mercury-700">Passing threshold</span>
      <div className="flex items-center gap-1">
        <span className="text-16 text-mercury-950">{`Majority (>50%)`}</span>
        <CheckFilledIcon />
      </div>
    </div>
  </>
)

const TurnoutStats = () => (
  <>
    <span className="text-16 text-mercury-950">15% turnout</span>
    <div className="relative flex h-3 w-full items-start rounded-full bg-mercury-100">
      <div className="h-full w-1/3 rounded-full bg-mercury-300" />
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <span className="text-16 text-mercury-700">Quorum</span>
        <Tooltip content="This proportion of voting power must vote on a proposal for it to pass.">
          <div>
            <InfoCircleOutlineIcon size={18} color="#7B7B7B" />
          </div>
        </Tooltip>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-16 text-mercury-950">10%</span>
        <CheckFilledIcon />
      </div>
    </div>
  </>
)
