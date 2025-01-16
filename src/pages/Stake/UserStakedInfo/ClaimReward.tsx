// import { GiftBorderIcon } from "@components/Icons"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { Modal, ModalContent } from "@nextui-org/react"
import React from "react"
import ItemReward from "./ItemReward"
import { Virtuoso } from "react-virtuoso"
import { TokenInfo } from "./useGetListToken"

const ClaimReward: React.FC<{
  isOpen: boolean
  onClose: () => void
  onOpenChange: () => void
  tokens: TokenInfo[]
  refresh: () => void
}> = ({ isOpen, onClose, onOpenChange, refresh, tokens }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      hideCloseButton
      classNames={{
        base: "bg-[#E6E6E6]",
      }}
      size="md"
      placement="center"
    >
      <ModalContent>
        <div className="relative p-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-14 font-medium text-mercury-700">
              {tokens.length} {tokens.length > 1 ? "Assets" : "Asset"}
            </p>
            <div onClick={onClose} className="cursor-pointer">
              <CloseFilledIcon />
            </div>
          </div>
          <div className="relative flex h-[250px] flex-col gap-1 overflow-y-auto">
            <Virtuoso
              style={{ height: "100%" }}
              data={tokens}
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
