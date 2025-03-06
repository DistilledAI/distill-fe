import ItemData from "../ItemData"
import DataWrapper from "../DataWrapper"
import { BotDataTypeKey } from "@types"
import { useAppSelector } from "@hooks/useAppRedux"
import useFetchByCategory from "../useFetchByCategory"
import AddXSocial from "./AddX"
import React, { useEffect } from "react"
import useLoadDataInfinite from "../useLoadMoreData"
import SkeletonData from "../SkeletonData"
import { MY_DATA_STATUS } from "@constants/index"

const AddSocialProfile: React.FC<{
  onMoreCustomRequest: (data: any, callback: () => void) => void
  setIsWarningSync: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ onMoreCustomRequest, setIsWarningSync }) => {
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const botId = myAgent?.id as number

  const {
    list,
    hasNextPage,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
    isLoading,
  } = useFetchByCategory(BotDataTypeKey.SOCIAL_MEDIA, botId)

  useEffect(() => {
    const isWarning = list.some((item) => item.status === MY_DATA_STATUS.ACTIVE)
    if (isWarning) setIsWarningSync(true)
  }, [list])

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
        {isLoading ? (
          <SkeletonData />
        ) : list.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 max-md:grid-cols-1">
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
        ) : (
          <div className="flex h-[50px] w-full items-center justify-center text-15 text-mercury-800">
            Empty
          </div>
        )}
        {isFetchingNextPage && (
          <div className="my-1 text-center text-14 text-mercury-700">
            Loading...
          </div>
        )}
      </div>
      <div className="flex w-[190px] flex-col items-end max-md:w-full max-md:items-start">
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
