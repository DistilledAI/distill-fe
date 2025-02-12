import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { useState } from "react"
import { Accordion, AccordionItem } from "@nextui-org/react"
import { twMerge } from "tailwind-merge"
import { IProposal } from "./useProposals"
import ProposalItem from "./ProposalItem"

interface Props {
  proposals: IProposal[]
}

const ProposalsHistory = ({ proposals }: Props) => {
  const [selectedKey, setSelectedKey] = useState<string>("1")
  const newProposals = proposals?.filter(
    (item) => Date.now() / 1000 > item.expirationTime,
  )

  return (
    <div className="-mx-2 space-y-6">
      <Accordion
        onSelectionChange={(key: any) =>
          setSelectedKey(key?.currentKey as string)
        }
        selectedKeys={[selectedKey]}
      >
        <AccordionItem
          key="1"
          title={
            <div className="group ml-3 flex cursor-pointer items-center gap-2">
              <div
                className={twMerge(
                  "transition-all duration-200 ease-linear",
                  !selectedKey && "-rotate-90",
                )}
              >
                <ChevronDownIcon color="#7B7B7B" size={18} />
              </div>
              <span className="text-14 text-mercury-800 group-hover:text-mercury-950">
                History • {newProposals.length} proposals
              </span>
            </div>
          }
          classNames={{
            base: "w-full",
            trigger: "p-0",
            content: "pt-6 space-y-3 ",
          }}
          hideIndicator
          disableIndicatorAnimation
        >
          {newProposals?.map((item, index) => (
            <ProposalItem
              key={index}
              proposal={item}
              order={newProposals.length - index}
            />
          ))}
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default ProposalsHistory
