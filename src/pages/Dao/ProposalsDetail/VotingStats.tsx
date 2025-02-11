import { CheckFilledIcon, CloseFilledIcon } from "@components/Icons/DefiLens"
import { InfoCircleOutlineIcon } from "@components/Icons/InfoCircleIcon"
import { Tooltip } from "@nextui-org/react"
import { IProposal } from "../Proposals/useProposals"
import { PlayIcon } from "@components/Icons/Voice"
import {
  IDataProposal,
  ProposalType,
} from "../CreateProposal/useCreateProposal"
import { getPercentVotes } from "../Proposals/helper"
import { twMerge } from "tailwind-merge"
import { Web3SolanaLockingToken } from "@pages/Stake/web3Locking"
import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

interface Props {
  proposalDetail: IProposal | null
  proposalIpfs: IDataProposal | null
}

const VotingStats = ({ proposalDetail, proposalIpfs }: Props) => {
  const wallet = useWallet()
  const { agentAddress } = useParams()
  const [turnout, setTurnout] = useState<number>(0)

  const getTurnout = async () => {
    if (!agentAddress) return
    const web3SolanaLockingToken = new Web3SolanaLockingToken()
    const res = await web3SolanaLockingToken.getVaultInfo(agentAddress, wallet)
    if (res?.totalStaked) {
      const totalStaked = res?.totalStaked?.toNumber()
      const totalVoteCount =
        proposalDetail?.voteCount.reduce(
          (total, current) => total + current,
          0,
        ) || 0

      setTurnout(totalVoteCount / totalStaked)
    }
  }

  useEffect(() => {
    getTurnout()
  }, [wallet, proposalDetail?.voteCount, agentAddress])

  return (
    <div className="overflow-hidden rounded-2xl border border-mercury-100 bg-mercury-70">
      <StatBlock title="Ratio of votes">
        <VoteRatio
          proposalIpfs={proposalIpfs}
          proposalDetail={proposalDetail}
        />
      </StatBlock>

      <div className="h-[1px] w-full bg-mercury-100" />

      <StatBlock>
        <TurnoutStats
          quorum={proposalDetail?.quorum ? proposalDetail?.quorum * 100 : 0}
          turnout={turnout}
        />
      </StatBlock>
    </div>
  )
}

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

const VoteRatio = ({ proposalDetail, proposalIpfs }: Props) => {
  const voteType = proposalIpfs?.vote.type
  const voteOptions = proposalIpfs?.vote.data || []
  const percent = getPercentVotes(proposalDetail?.voteCount)
  console.log({ proposalDetail })

  const renderRatioVotes = () => {
    if (voteType === ProposalType.YesNo) {
      return (
        <div className="overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-16 text-green-500">{percent[0]}% Yes</span>
            <div className="space-x-3">
              <span className="text-16 text-[#FF3B30]">{percent[1]}% No</span>
              {/* <span className="text-16 text-mercury-700">5.053% Abstain</span> */}
            </div>
          </div>
          <div className="relative flex h-3 w-full items-start rounded-full">
            <div
              className={twMerge(
                "h-full w-1/2 max-w-full rounded-bl-full rounded-tl-full bg-green-500",
                percent[0] === 100 && "rounded-full",
              )}
              style={{
                width: `${percent[0]}%`,
              }}
            />
            {/* <div className="h-full w-1/2 bg-[#FF3B30]" /> */}
            <div
              className="h-full w-1/2 rounded-br-full rounded-tr-full bg-[#FF3B30]"
              style={{
                width: `${percent[1]}%`,
              }}
            />
            <div className="absolute -bottom-[14px] left-1/2 -translate-x-1/2 -rotate-90">
              <PlayIcon color="#888888" size={18} />
            </div>
          </div>
        </div>
      )
    }
    return (
      <ul className="flex flex-col space-y-1">
        {voteOptions.length ? (
          voteOptions.map((val, index) => {
            return (
              <div
                className={twMerge(
                  "relative rounded-full bg-mercury-100 px-4 py-2",
                )}
              >
                <div
                  className={twMerge(
                    "absolute inset-0 rounded-full bg-mercury-300",
                    percent[index] < 100 && "rounded-br-none rounded-tr-none",
                  )}
                  style={{
                    width: `${percent[index]}%`,
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <p className="line-clamp-1 text-16 text-mercury-950">{val}</p>
                  <span className="flex-shrink-0 text-16 font-semibold text-mercury-950">
                    {percent[index]}%
                  </span>
                </div>
              </div>
            )
          })
        ) : (
          <></>
        )}
      </ul>
    )
  }

  return (
    <>
      {renderRatioVotes()}
      <div className="flex items-center justify-between">
        <span className="text-16 text-mercury-700">Passing threshold</span>
        <div className="flex items-center gap-1">
          <span className="text-16 text-mercury-950">{`Majority (>${proposalDetail?.threshold ? proposalDetail?.threshold * 100 : 0}%)`}</span>
          <CheckFilledIcon />
        </div>
      </div>
    </>
  )
}

const TurnoutStats = ({
  quorum,
  turnout,
}: {
  quorum: number
  turnout: number
}) => (
  <>
    <span className="text-16 text-mercury-950">{turnout}% turnout</span>
    <div className="relative flex h-3 w-full items-start rounded-full bg-mercury-100">
      <div
        className="h-full rounded-full bg-mercury-300"
        style={{
          width: `${turnout}%`,
        }}
      />
      <div className="absolute -bottom-[14px] left-[10%] -translate-x-1/2 -rotate-90">
        <PlayIcon color="#888888" size={18} />
      </div>
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
        <span className="text-16 text-mercury-950">{quorum}%</span>
        {quorum >= 10 ? <CheckFilledIcon /> : <CloseFilledIcon />}
      </div>
    </div>
  </>
)
