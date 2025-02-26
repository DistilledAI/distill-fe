import useLoadMoreByScroll from "@hooks/useLoadMoreByScroll"
import { TYPE_DATA_KEY } from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/CreatePrivateAgent"
import { capitalizeFirstLetter } from "@utils/index"
import moment from "moment"
import React, { useRef } from "react"
import ActionMoreTableMobile from "./ActionMoreTableMobile"

export interface ITableData {
  type?: string
  value: string
  createdAt: string
  id: number
}

const TableDataMobile: React.FC<{
  data: ITableData[]
  loadMore: () => void
  hasMore: boolean
  botId: number
}> = ({ data, loadMore, hasMore, botId }) => {
  const isEmpty = data.length === 0
  const tableRef = useRef<any>(null)
  useLoadMoreByScroll(tableRef, loadMore, hasMore)

  return (
    <div
      ref={tableRef}
      className="max-h-[300px] overflow-y-auto rounded-[22px] border-1 border-white bg-mercury-30 p-4"
    >
      {isEmpty ? (
        <span className="text-14 text-base text-mercury-600">Empty</span>
      ) : (
        data.map((item: any, index) => {
          const isSocialMediaType = item?.key === TYPE_DATA_KEY.SOCIAL_MEDIA

          return (
            <div
              key={`${item.value}-${index}`}
              className="flex items-center justify-between border-b-1 border-mercury-100 py-2 first:pt-0 last:border-none last:pb-0"
            >
              <div className="flex max-w-[calc(100%-50px)] flex-col gap-1">
                {item.type && (
                  <p className="m-0 line-clamp-1 max-w-[200px] text-base text-mercury-600">
                    {isSocialMediaType
                      ? capitalizeFirstLetter(item?.name)
                      : item.type}
                  </p>
                )}
                <a
                  className="m-0 line-clamp-1 max-w-[200px] text-14 text-base text-mercury-950"
                  href={item.value}
                  target="_blank"
                >
                  {item.value}
                </a>
                <p className="m-0 text-14 text-base text-mercury-600">
                  {moment(item.createdAt).format("ll")}
                </p>
              </div>
              <div className="flex w-[50px] justify-end">
                <ActionMoreTableMobile data={item} botId={botId} />
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default TableDataMobile
