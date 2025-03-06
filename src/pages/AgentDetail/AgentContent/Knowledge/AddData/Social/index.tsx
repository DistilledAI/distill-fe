import ItemData from "../ItemData"
import DataWrapper from "../DataWrapper"
import { BotDataTypeKey } from "@types"
import { useAppSelector } from "@hooks/useAppRedux"
import useFetchByCategory from "../useFetchByCategory"
import AddXSocial from "./AddX"
import React from "react"
import useLoadDataInfinite from "../useLoadMoreData"

const AddSocialProfile: React.FC<{
  onMoreCustomRequest: (data: any, callback: () => void) => void
}> = ({ onMoreCustomRequest }) => {
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const botId = myAgent?.id as number

  const { list, hasNextPage, fetchNextPage, refetch, isFetchingNextPage } =
    useFetchByCategory(BotDataTypeKey.SOCIAL_MEDIA, botId)

  const scrollContainerRef = useLoadDataInfinite({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  return (
    <DataWrapper
      title="Social profile"
      description="Provide the X (Twitter) account links from which your agents can consistently learn."
    >
      <div
        ref={scrollContainerRef}
        className="max-h-[250px] flex-1 overflow-y-auto scrollbar-hide"
      >
        <div className="grid grid-cols-3 gap-2">
          {list.map((item) => (
            <ItemData
              id={item.id}
              key={item.id}
              value={item.value}
              title={item.value}
              status={item.status}
              category={BotDataTypeKey.SOCIAL_MEDIA}
            />
          ))}
        </div>
        {isFetchingNextPage && (
          <div className="my-1 text-center text-14 text-mercury-700">
            Loading...
          </div>
        )}
      </div>
      <div className="flex w-[190px] flex-col items-end">
        <AddXSocial
          moreCustomRequest={(data: any, callback) =>
            onMoreCustomRequest(data, () => {
              refetch()
              callback()
            })
          }
        />
      </div>
    </DataWrapper>
  )
}

export default AddSocialProfile
