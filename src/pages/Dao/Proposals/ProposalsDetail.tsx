import { ChartBarIcon } from "@components/Icons/Chart"
import { CheckFilledIcon, CloseFilledIcon } from "@components/Icons/DefiLens"
import { InfoCircleOutlineIcon } from "@components/Icons/InfoCircleIcon"
import { Button, Tooltip } from "@nextui-org/react"
import BackButton from "@pages/AuthorProfile/BackButton"
import Markdown from "react-markdown"
import { useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const ProposalsDetail = () => {
  const { proposalId } = useParams()

  return (
    <div className="mx-auto max-w-[1024px] p-6 pt-3">
      <BackButton className="fixed left-0 top-0 h-[50px] max-md:h-[40px] max-md:w-full max-md:bg-white" />
      <div className="grid grid-cols-[350px_1fr] gap-6">
        <div className="col-span-1">
          <div className="fixed w-full max-w-[350px]">
            <h2 className="text-24 font-semibold">Proposal {proposalId}</h2>
            <div className="flex items-center gap-2">
              <ChartBarIcon />
              <span className="text-16 text-mercury-950">Status</span>
            </div>
            <p className="mt-2 text-16 text-mercury-950">
              This proposal is closed for voting with a turnout of 19.25% and
              100% of voters in favor. It was passed and executed.
            </p>

            <div className="my-6 h-[1px] w-full bg-mercury-100" />

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-16 text-mercury-700">DAO</span>
                </div>
                <span className="text-16 text-mercury-950 underline">MAX</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-16 text-mercury-700">Creator</span>
                </div>
                <span className="text-16 text-mercury-950 underline">XAM</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-16 text-mercury-700">Status</span>
                </div>
                <span className="text-16 text-mercury-950">Open</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-16 text-mercury-700">Time left</span>
                </div>
                <span className="text-16 text-mercury-950">2 days</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex flex-col gap-1">
                <div
                  className={twMerge(
                    "flex items-center justify-between rounded-full border border-transparent bg-mercury-70 px-4 py-2",
                    "border-mercury-100 bg-mercury-200 font-semibold",
                  )}
                >
                  <span className="text-16 text-mercury-950">Yes</span>
                  <CheckFilledIcon />
                </div>
                <div className="flex items-center justify-between rounded-full bg-mercury-70 px-4 py-2">
                  <span className="text-16 text-mercury-950">No</span>
                  <CloseFilledIcon />
                </div>
              </div>
              <Button
                isDisabled
                className="btn-primary w-full !bg-mercury-950 !text-white"
              >
                Cast your vote
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-28 font-semibold">
            Improvements on oraix staking interface to show revenue stats
          </h2>
          <div>
            <span className="text-14 text-mercury-700">XAM – February 5</span>
            <Markdown className="text-16 text-mercury-950">
              Since some weeks its not clear when the week change and how many
              fees will be split between stakers. I think this metrics can help
              and encourage people to stake with more anticipation, when there
              is a good week of revenue. But on my point of view is important to
              show transparency and automation. So I would like to propose to be
              shown on staking page the following metrics: A counter of revenue
              that its generated on the week that will be available for next
              period ( only the % that will be spiltted between stakers) . a
              counter of time for the change of next period a historical graph
              of revenue ( weekly and monthly) that was shared between stakers a
              historical graph of revenue ( weekly and monthly) of Oraix staked.
              A historical graph of apy % revenue ( weekly and monthly) It will
              useful to see how we evolve on this metrics during the history.
              Thanks.
            </Markdown>
          </div>
          <div className="rounded-2xl border border-mercury-100 bg-mercury-70">
            <div className="space-y-4 px-4 py-3">
              <span className="text-16 font-medium text-mercury-950">
                Ratio of votes
              </span>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-16 text-green-500">92.49% Yes</span>
                  <div className="space-x-3">
                    <span className="text-16 text-[#FF3B30]">2.461% No</span>
                    <span className="text-16 text-mercury-700">
                      5.053% Abstain
                    </span>
                  </div>
                </div>
                <div className="relative flex h-3 w-full items-start rounded-full">
                  <div className="h-full w-1/3 rounded-bl-full rounded-tl-full bg-green-500" />
                  <div className="h-full w-1/3 bg-[#FF3B30]" />
                  <div className="h-full w-1/3 rounded-br-full rounded-tr-full bg-mercury-300" />
                  {/* <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 -rotate-90">
                    <PlayIcon size={18} color="#ADADAD" />
                  </div> */}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-16 text-mercury-700">
                    Passing threshold
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-16 text-mercury-950">
                      {`Majority (>50%)`}
                    </span>
                    <CheckFilledIcon />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[1px] w-full bg-mercury-100" />
            <div className="space-y-4 px-4 py-3">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProposalsDetail
