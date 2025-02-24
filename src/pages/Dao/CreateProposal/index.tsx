import { Button, Input, Tab, Tabs, Textarea, Tooltip } from "@nextui-org/react"
import React, { useState } from "react"
import { PlusIcon } from "@components/Icons/Plus"
import { CheckFilledIcon, CloseFilledIcon } from "@components/Icons/DefiLens"
import BackButton from "@pages/AuthorProfile/BackButton"
import useConnectPhantom from "@pages/Stake/useConnectPhantom"
import useCreateProposal, { ProposalType } from "./useCreateProposal"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import useStakerInfo from "./useStakerInfo"
import { getInfoTokenByAddress } from "@pages/Stake/helpers"
import { StakeTokenAddress } from "@pages/Stake"

const CreateProposal: React.FC = () => {
  const [tab, setTab] = useState<ProposalType>(ProposalType.YesNo)
  const { agentAddress } = useParams()
  const { isConnectWallet, address } = useConnectPhantom()
  const { onSubmit, loading } = useCreateProposal()
  const [options, setOptions] = useState([""])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const MAX_OPTION = 8

  const { isCanAction } = useStakerInfo()
  const vaultInfo = getInfoTokenByAddress(agentAddress as StakeTokenAddress)

  const handleCreate = async () => {
    if (!agentAddress || loading || !isConnectWallet) return
    if (!title) return toast.warning("Please enter title!")
    if (!description) return toast.warning("Please enter description!")
    if (tab === ProposalType.Options && options.includes(""))
      return toast.warning("Please enter title option!")

    onSubmit({
      title,
      description,
      creator: address,
      agentAddress,
      vote: {
        type: tab,
        data: tab === ProposalType.YesNo ? null : options,
      },
    })
  }

  return (
    <div className="mx-auto mb-5 max-w-[844px] px-4 pb-20 pt-14 md:p-6 md:pt-0">
      <BackButton className="fixed left-0 top-0 h-[50px] pl-4 max-md:h-[40px] max-md:w-full max-md:bg-white" />
      {isCanAction !== null && isCanAction === false && (
        <div className="mb-2 font-medium italic text-red-500">
          You must stake ${vaultInfo?.tokenName} to cast your vote!
        </div>
      )}
      <div className="flex items-center justify-between">
        <p className="text-24 font-semibold max-md:text-18">New Proposal</p>
        <Tooltip isDisabled={isConnectWallet} content="Login to continue">
          <div>
            <Button
              onPress={handleCreate}
              isLoading={loading}
              isDisabled={!isConnectWallet || !isCanAction}
              className="rounded-full bg-primary !text-16 font-semibold text-white max-md:h-[36px] max-md:!text-14"
            >
              <PlusIcon color="white" size={16} /> Create
            </Button>
          </div>
        </Tooltip>
      </div>
      <p className="font-medium text-mercury-800 max-md:mt-2 max-md:text-14">
        Creating a proposal will cost a fee of 100 $MAX, and that $MAX will be
        burned.
      </p>
      <div className="mt-6">
        <div>
          <p className="mb-2 text-18 font-semibold max-md:text-16">
            Title <span className="font-medium text-red-500">(*)</span>
          </p>
          <Input
            onValueChange={setTitle}
            value={title}
            placeholder="Give your proposal a title"
          />
        </div>
        <div className="mt-4">
          <p className="mb-2 text-18 font-semibold max-md:text-16">
            Description <span className="font-medium text-red-500">(*)</span>
          </p>
          <Textarea
            rows={6}
            minRows={6}
            maxRows={6}
            onValueChange={setDescription}
            value={description}
            placeholder="Give your proposal a description (supports Markdown)..."
          />
        </div>
      </div>
      <div className="mt-4">
        <div>
          <p className="mb-2 text-18 font-semibold max-md:text-16">Vote type</p>
          <Tabs
            classNames={{
              base: "w-full",
              tabList: "w-full md:w-[250px] bg-mercury-200 ",
              tab: "font-medium text-mercury-900",
            }}
            onSelectionChange={(key) => setTab(key as ProposalType)}
          >
            <Tab key={ProposalType.YesNo} title="Yes/No">
              <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                <div className="md:max-w-[300px]">
                  <div className="flex items-center justify-between rounded-full bg-mercury-70 px-4 py-2 font-medium">
                    Yes
                    <CheckFilledIcon />
                  </div>
                  <div className="mt-1 flex items-center justify-between rounded-full bg-mercury-70 px-4 py-2 font-medium">
                    No
                    <CloseFilledIcon />
                  </div>
                </div>
                <div className="max-md:mt-4">
                  <p className="mb-1 font-bold leading-none">How it works:</p>
                  <ul className="list-outside list-disc pl-5 text-[15px] text-mercury-800">
                    <li>
                      <b>Stake into an agent’s vault</b> to unlock governance.
                    </li>
                    <li>
                      Proposals pass with <b>50% threshold & 10% quorum</b>.
                    </li>
                    <li>
                      <b>Voting lasts 7 days</b>—meet quorum, or the proposal is
                      removed.
                    </li>
                  </ul>
                </div>
              </div>
            </Tab>
            <Tab key={ProposalType.Options} title="Options">
              <div>
                <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                  <div>
                    <p className="mb-2 text-14 text-mercury-800">
                      Max: 8 options
                    </p>
                    {options.map((item, index) => (
                      <div key={index} className="mt-1 flex items-center gap-2">
                        <Input
                          onValueChange={(val) =>
                            setOptions((prev) =>
                              prev.map((op, i) => {
                                if (i === index) return val
                                return op
                              }),
                            )
                          }
                          value={item}
                          classNames={{
                            inputWrapper: "min-h-[38px] rounded-full h-[38px]",
                          }}
                          placeholder="Enter title"
                        />
                        {options.length !== 1 && (
                          <div
                            onClick={() =>
                              setOptions((prev) =>
                                prev.filter((_op, i) => i !== index),
                              )
                            }
                            className="cursor-pointer"
                          >
                            <CloseFilledIcon color="red" />
                          </div>
                        )}
                      </div>
                    ))}
                    {options.length < MAX_OPTION ? (
                      <Button
                        onPress={() => setOptions((prev) => [...prev, ""])}
                        className="mt-3 h-[36px] rounded-full bg-mercury-950 text-white"
                      >
                        + Add a new option
                      </Button>
                    ) : null}
                  </div>
                  <div>
                    <p className="mb-1 font-bold leading-none">How it works:</p>
                    <ul className="list-outside list-disc pl-5 text-[15px] text-mercury-800">
                      <li>
                        <b>Stake into an agent’s vault</b> to unlock governance.
                      </li>
                      <li>
                        Proposals pass with{" "}
                        <b>
                          the option that receives the highest percentage of
                          votes & 10% quorum
                        </b>
                        .
                      </li>
                      <li>
                        <b>Voting lasts 7 days</b>—meet quorum, or the proposal
                        is removed.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default CreateProposal
