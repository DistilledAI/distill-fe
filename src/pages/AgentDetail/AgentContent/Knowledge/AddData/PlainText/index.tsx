import ItemData from "../ItemData"
import DataWrapper from "../DataWrapper"
import { PDFTypeIcon } from "@components/Icons/PDFTypeIcon"
import UploadCommon from "../UploadCommon"
import { TYPE_DATA_KEY } from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/CreatePrivateAgent"
import React from "react"
import { useAppSelector } from "@hooks/useAppRedux"
import useFetchByCategory from "../useFetchByCategory"
import { BotDataTypeKey } from "@types"
import useLoadDataInfinite from "../useLoadMoreData"
import { TxtIcon } from "@components/Icons/TextIcon"

const PlainTextFile: React.FC<{
  onMoreCustomRequest: (data: any, callback: () => void) => void
}> = ({ onMoreCustomRequest }) => {
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const botId = myAgent?.id as number

  const { list, hasNextPage, fetchNextPage, refetch, isFetchingNextPage } =
    useFetchByCategory(BotDataTypeKey.PLAIN_TEXT_FILE, botId)

  const scrollContainerRef = useLoadDataInfinite({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const getIconDisplay = (type: string) => {
    if (type === "text/plain") return <TxtIcon />
    return <PDFTypeIcon />
  }

  return (
    <DataWrapper
      title="Plain text files"
      description="Freely provide any text-based content (stories, news, reports, articles, guides, scripts, research papers, etc.)"
    >
      <div className="flex-1">
        <div
          ref={scrollContainerRef}
          className="max-h-[250px] flex-1 overflow-y-auto scrollbar-hide"
        >
          {list.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {list.map((item) => (
                <ItemData
                  id={item.id}
                  key={item.id}
                  value={item.value}
                  title={item.name}
                  status={item.status}
                  icon={getIconDisplay(item.type)}
                  category={BotDataTypeKey.PLAIN_TEXT_FILE}
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
      <div className="flex w-[190px] flex-col items-end">
        <div>
          <UploadCommon
            moreCustomRequest={(data: any) => {
              onMoreCustomRequest(data, refetch)
            }}
            fileKey={TYPE_DATA_KEY.PLAIN_TEXT_FILE}
            label="Plain text files"
            description="PDF, TXT"
            multiple
          />
        </div>
        <p className="mt-2 text-13 font-medium text-mercury-800">
          *PDF, *TXT (Max file size: 20MB)
        </p>
      </div>
    </DataWrapper>
  )
}

export default PlainTextFile
