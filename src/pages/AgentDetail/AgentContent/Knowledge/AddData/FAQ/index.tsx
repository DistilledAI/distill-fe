import { CSVIcon } from "@components/Icons/TextIcon"
import DataWrapper from "../DataWrapper"
import ItemData from "../ItemData"
import { useAppSelector } from "@hooks/useAppRedux"
import { BotDataTypeKey } from "@types"
import useFetchByCategory from "../useFetchByCategory"
import useLoadDataInfinite from "../useLoadMoreData"
import UploadFAQ from "../UploadFAQ"
import React, { useEffect } from "react"
import SkeletonData from "../SkeletonData"
import { MY_DATA_STATUS } from "@constants/index"

const FaqData: React.FC<{
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
  } = useFetchByCategory(BotDataTypeKey.FAQ, botId)

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
      title="FAQ Samples"
      description="The more accurate your data, the better your agents learn."
    >
      <div className="flex-1">
        <div
          ref={scrollContainerRef}
          className="max-h-[250px] flex-1 overflow-y-auto scrollbar-hide"
        >
          {isLoading ? (
            <SkeletonData />
          ) : list.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 max-md:grid-cols-1">
              {list.map((item) => (
                <ItemData
                  id={item.id}
                  key={item.id}
                  value={item.value}
                  title={item.name}
                  status={item.status}
                  icon={<CSVIcon size={24} />}
                  category={BotDataTypeKey.FAQ}
                  className={{ classNameTitle: "max-w-[150px]" }}
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
      </div>
      <div className="flex w-[190px] flex-col items-end max-md:w-full max-md:items-start">
        <UploadFAQ
          onMoreCustomRequest={(data: any, callback) => {
            onMoreCustomRequest(data, () => {
              refetch()
              callback()
            })
          }}
        />
      </div>
    </DataWrapper>
  )
}

export default FaqData
