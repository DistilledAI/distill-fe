import { CheckFilledIcon, CloseFilledIcon } from "@components/Icons/DefiLens"
import { Button } from "@nextui-org/react"
import {
  IDataProposal,
  ProposalType,
} from "@pages/Dao/CreateProposal/useCreateProposal"
import { IProposal } from "@pages/Dao/Proposals/useProposals"
import React, { useState } from "react"
import { twMerge } from "tailwind-merge"
import useSubmitVote from "./useSubmitVote"
import { getProposalStatus, ProposalStatus } from "@pages/Dao/Proposals/helper"
import useGetUserVote from "./useGetUserVote"
import useConnectPhantom from "@pages/Stake/useConnectPhantom"
import useStakerInfo from "@pages/Dao/CreateProposal/useStakerInfo"
import { getInfoTokenByAddress } from "@pages/Stake/helpers"
import { useParams } from "react-router-dom"
import { StakeTokenAddress } from "@pages/Stake"

const VoteOption = ({
  label,
  icon,
  value,
  selected = false,
  onClick,
  className,
}: {
  label: string
  value: number
  icon?: React.ReactNode
  selected?: boolean
  onClick?: (val: number) => void
  className?: string
}) => (
  <div
    onClick={() => {
      if (onClick) onClick(value)
    }}
    className={twMerge(
      "flex cursor-pointer items-center justify-between rounded-full px-4 py-2 hover:bg-mercury-100",
      selected
        ? "border border-mercury-100 bg-mercury-200 font-semibold"
        : "bg-mercury-70",
      className,
    )}
  >
    <p className="line-clamp-1 text-16 text-mercury-950">{label}</p>
    <div className="flex-shrink-0">{icon && icon}</div>
  </div>
)

interface Props {
  proposalDetail: IProposal | null
  proposalIpfs: IDataProposal | null
  getProposalsDetail: () => void
}

const VotingWidget = ({
  proposalDetail,
  proposalIpfs,
  getProposalsDetail,
}: Props) => {
  const [option, setOption] = useState<number | null>(null)
  const { loading, handleVote } = useSubmitVote()
  const { agentAddress } = useParams()
  const { isCanAction } = useStakerInfo()
  const { isConnectWallet, connectWallet } = useConnectPhantom()
  const { option: optionUser, getUserVote } = useGetUserVote(
    proposalDetail?.proposal,
  )
  const vaultInfo = getInfoTokenByAddress(agentAddress as StakeTokenAddress)

  const proposalStatus =
    proposalDetail && getProposalStatus(proposalDetail, Date.now() / 1000)

  const isCanSubmitVote =
    option !== null &&
    optionUser === null &&
    proposalStatus === ProposalStatus.OPEN &&
    isCanAction

  const isCanVote =
    optionUser === null && proposalStatus === ProposalStatus.OPEN && isCanAction

  const onSubmit = async () => {
    if (!isCanSubmitVote || !proposalDetail?.proposal) {
      return
    }
    handleVote(proposalDetail.proposal, option, () => {
      getUserVote()
      getProposalsDetail()
    })
  }

  const handleSelectOption = (val: number) => {
    if (!isCanVote) return
    setOption(val)
  }

  if (!proposalIpfs) return null

  const voteType = proposalIpfs.vote.type
  const displayVoteByType = (type: ProposalType) => {
    switch (type) {
      case ProposalType.YesNo:
        return (
          <>
            <VoteOption
              onClick={handleSelectOption}
              value={0}
              selected={option === 0 || optionUser === 0}
              label="Yes"
              icon={<CheckFilledIcon />}
              className={!isCanVote ? "cursor-default" : ""}
            />
            <VoteOption
              onClick={handleSelectOption}
              value={1}
              selected={option === 1 || optionUser === 1}
              label="No"
              icon={<CloseFilledIcon />}
              className={!isCanVote ? "cursor-default" : ""}
            />
          </>
        )

      default:
        return proposalIpfs.vote.data?.map((item, index) => (
          <VoteOption
            onClick={handleSelectOption}
            value={index}
            selected={option === index || optionUser === index}
            key={item}
            icon={
              option === index || optionUser === index ? (
                <CheckFilledIcon />
              ) : null
            }
            label={item}
            className={!isCanVote ? "cursor-default" : ""}
          />
        ))
    }
  }

  return (
    <div className="mt-4 space-y-2">
      <div className="flex flex-col gap-1">{displayVoteByType(voteType)}</div>
      {isConnectWallet ? (
        <>
          <Button
            isDisabled={!isCanSubmitVote}
            onPress={onSubmit}
            isLoading={loading}
            className="btn-primary w-full !bg-mercury-950 !text-white"
          >
            {optionUser === null ? "Cast your vote" : "Voted"}
          </Button>
          {isCanAction !== null && isCanAction === false && (
            <div className="mt-2 italic text-red-500">
              To vote you need to stake ${vaultInfo?.tokenName} vault!
            </div>
          )}
        </>
      ) : (
        <>
          <Button
            onPress={connectWallet}
            className="btn-primary w-full !bg-mercury-950 !text-white"
          >
            Connect wallet to vote
          </Button>
        </>
      )}
    </div>
  )
}

export default VotingWidget
