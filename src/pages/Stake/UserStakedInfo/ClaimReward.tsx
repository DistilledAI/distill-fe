import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { Input, Modal, ModalContent, Spinner } from "@nextui-org/react"
import React, { useCallback } from "react"
import ItemReward from "./ItemReward"
import { Virtuoso } from "react-virtuoso"
import { TokenInfo } from "./useGetListToken"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { LIMIT } from "./useGetListReward"
import { debounce } from "lodash"

const ClaimReward: React.FC<{
  isOpen: boolean
  onClose: () => void
  onOpenChange: (val: boolean) => void
  tokens: TokenInfo[]
  loading: boolean
  hasMore: boolean
  loadMore: () => void
  refresh: (rewardToken: string) => void
  getListReward: ({
    next,
    rewardToken,
  }: {
    next: null | string
    rewardToken?: string
  }) => Promise<void>
}> = ({
  isOpen,
  onClose,
  hasMore,
  loading,
  loadMore,
  onOpenChange,
  refresh,
  tokens,
  getListReward,
}) => {
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      getListReward({ next: null, rewardToken: value })
    }, 300),
    [getListReward],
  )

  const onScroll = useCallback(
    async (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
      const isAtBottom = scrollHeight - scrollTop === clientHeight
      if (isAtBottom && hasMore) {
        loadMore()
      }
    },
    [hasMore, loadMore],
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
            onValueChange={(val) => debouncedSearch(val)}
            startContent={<FilledSearchIcon />}
            placeholder="Search by contract address"
            classNames={{
              inputWrapper: "!bg-mercury-70 rounded-full",
            }}
          />
          <div className="relative mt-5 flex h-[280px] flex-col gap-1 overflow-y-auto">
            <Virtuoso
              style={{ height: "100%" }}
              data={tokens}
              increaseViewportBy={500}
              onScroll={tokens.length >= LIMIT ? onScroll : undefined}
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
          {loading && (
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-end justify-center opacity-70">
              {/* <Button
                isLoading={loading}
                onClick={loadMore}
                className="h-[34px] rounded-full bg-mercury-900 text-13 font-semibold text-white"
              >
                Load More
              </Button> */}
              <Spinner size="sm" />
            </div>
          )}
        </div>
      </ModalContent>
    </Modal>
  )
}

export default ClaimReward
