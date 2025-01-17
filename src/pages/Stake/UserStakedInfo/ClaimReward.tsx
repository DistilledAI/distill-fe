import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { Input, Modal, ModalContent } from "@nextui-org/react"
import React, { useState } from "react"
import ItemReward from "./ItemReward"
import { Virtuoso } from "react-virtuoso"
import { TokenInfo } from "./useGetListToken"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"

const ClaimReward: React.FC<{
  isOpen: boolean
  onClose: () => void
  onOpenChange: (val: boolean) => void
  tokens: TokenInfo[]
  refresh: (rewardToken: string) => void
}> = ({ isOpen, onClose, onOpenChange, refresh, tokens }) => {
  const [searchTokenAddr, setSearchTokenAddr] = useState("")
  const filteredRewardList = tokens.filter((item) =>
    item.rewardToken.toLowerCase().includes(searchTokenAddr.toLowerCase()),
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      hideCloseButton
      classNames={{
        base: "bg-[#E6E6E6]",
      }}
      size="sm"
      placement="center"
    >
      <ModalContent>
        <div className="relative p-6">
          <div className="relative mb-4 flex items-center justify-center">
            <p className="text-14 font-medium text-mercury-950">
              Claimable Rewards
            </p>
            <div onClick={onClose} className="absolute right-0 cursor-pointer">
              <CloseFilledIcon />
            </div>
          </div>
          <Input
            onValueChange={setSearchTokenAddr}
            startContent={<FilledSearchIcon />}
            placeholder="Search by contract address"
            classNames={{
              inputWrapper: "!bg-mercury-70 rounded-full",
            }}
          />
          <div className="relative mt-5 flex h-[280px] flex-col gap-1 overflow-y-auto">
            <Virtuoso
              style={{ height: "100%" }}
              data={filteredRewardList}
              increaseViewportBy={300}
              itemContent={(index, item) => {
                return (
                  <ItemReward
                    key={item.rewardToken}
                    item={item}
                    refresh={refresh}
                    className={index === tokens.length - 1 ? "pb-5" : ""}
                  />
                )
              }}
            />
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #E6E6E6 100%)",
              }}
              className="absolute bottom-0 z-10 flex h-6 w-full"
            ></div>
          </div>
          {/* <Button className="mt-2 w-full rounded-full bg-mercury-950 font-semibold text-white">
            <GiftBorderIcon /> Claim All
          </Button> */}
        </div>
      </ModalContent>
    </Modal>
  )
}

export default ClaimReward
