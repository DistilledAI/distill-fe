import { Button, Input, Tab, Tabs, Textarea } from "@nextui-org/react"
import React, { useState } from "react"
import { PlusIcon } from "@components/Icons/Plus"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import BackButton from "@pages/AuthorProfile/BackButton"

const enum ProposalType {
  YesNo = "yes_no",
  Options = "options",
}

const CreateProposal: React.FC = () => {
  const [tab, setTab] = useState<ProposalType>(ProposalType.YesNo)
  const [options, setOptions] = useState([""])
  console.log(tab)

  return (
    <div className="mx-auto mb-5 max-w-[844px] px-4">
      <BackButton className="fixed left-0 top-0 h-[50px] max-md:h-[40px] max-md:w-full max-md:bg-white" />
      <div className="flex items-center justify-between">
        <p className="text-24 font-semibold">New Proposal</p>
        <Button className="rounded-full bg-primary !text-16 font-semibold text-white">
          <PlusIcon color="white" size={16} /> Create
        </Button>
      </div>
      <div className="mt-6 rounded-lg border-1 border-mercury-100 p-4">
        <div>
          <p className="mb-1 font-semibold">
            Title <span className="font-medium text-red-500">(*)</span>
          </p>
          <Input placeholder="Give your proposal a title" />
        </div>
        <div className="mt-4">
          <p className="mb-1 font-semibold">
            Description <span className="font-medium text-red-500">(*)</span>
          </p>
          <Textarea
            rows={6}
            minRows={6}
            maxRows={6}
            placeholder="Give your proposal a description (supports Markdown)..."
          />
        </div>
      </div>
      <div className="mt-6">
        <div>
          <p className="mb-2 text-18 font-semibold">Proposal type</p>
          <Tabs
            classNames={{
              tabList: "w-[250px] bg-mercury-200",
              // base: "w-[200px]",
              tab: "font-medium text-mercury-900",
            }}
            onSelectionChange={(key) => setTab(key as ProposalType)}
          >
            <Tab key={ProposalType.YesNo} title="Yes/No">
              <div className="max-w-[200px]">
                <div className="cursor-pointer rounded-md bg-mercury-70 px-2 py-1 text-14 font-medium">
                  Yes
                </div>
                <div className="mt-1 cursor-pointer rounded-md bg-mercury-70 px-2 py-1 text-14 font-medium">
                  No
                </div>
              </div>
            </Tab>
            <Tab key={ProposalType.Options} title="Options">
              <div className="max-w-[400px]">
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
                      classNames={{ inputWrapper: "min-h-[36px] h-[36px]" }}
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
                {options.length < 8 ? (
                  <Button
                    onPress={() => setOptions((prev) => [...prev, ""])}
                    className="mt-3 h-[36px] rounded-full bg-mercury-950 text-white"
                  >
                    + Add a new option
                  </Button>
                ) : null}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default CreateProposal
