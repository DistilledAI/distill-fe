import HeadSectionData from "../Components/HeadSectionData"
// import { EditPenFilledIcon } from "@components/Icons/Edit"
import { InfoCircleIcon } from "@components/Icons/InfoCircleIcon"
import { PhotoPlusIcon } from "@components/Icons/PhotoPlusIcon"
import useWindowSize from "@hooks/useWindowSize"
import { BotDataTypeKey } from "@types"
import moment from "moment"
import React from "react"
import TableData from "../Components/TableData"
import TableDataMobile from "../Components/TableDataMobile"
import DeleteData from "../DeleteData"
import SyncData, { SyncLabel } from "../SyncData"
import useFetchByCategory from "../useFetchByCategory"
import { hasSyncData, hasSyncDataByStatus } from "../helpers"

enum ColumnKey {
  Name = "name",
  Type = "type",
  Date = "createdAt",
  Action = "action",
}

const columns = [
  {
    key: ColumnKey.Name,
    label: "Name",
  },
  {
    key: ColumnKey.Type,
    label: "Type",
  },
  {
    key: ColumnKey.Date,
    label: "Date",
  },
  {
    key: ColumnKey.Action,
    label: "Action",
  },
]

const MediaData: React.FC<{
  botId: number
  category: BotDataTypeKey
}> = ({ botId, category }) => {
  const { isMobile } = useWindowSize()
  const {
    list: data,
    hasNextPage,
    fetchNextPage,
  } = useFetchByCategory(category, botId)

  const renderCell = (item: Record<string, any>, columnKey: string) => {
    const dataId = item?.id

    switch (columnKey) {
      case ColumnKey.Type:
        return (
          <span className="line-clamp-1 text-base text-mercury-600">
            {item[columnKey]}
          </span>
        )
      case ColumnKey.Date:
        return (
          <span className="line-clamp-1 text-base text-mercury-600">
            {moment(item[columnKey]).format("ll")}
          </span>
        )
      case ColumnKey.Action:
        return (
          <div className="flex items-center justify-end gap-4">
            <SyncData botId={botId} dataId={dataId} status={item.status} />
            <DeleteData
              botId={item.userId}
              ids={[item.id]}
              // category={category}
            />
          </div>
        )
      case ColumnKey.Name:
        return (
          <div className="flex flex-row items-center gap-1">
            {hasSyncDataByStatus(item.status) && <InfoCircleIcon />}
            <a
              className="max-w-[150px] truncate hover:underline"
              href={item.value}
              target="_blank"
            >
              <span className="text-base text-mercury-950">
                {item[columnKey]}
              </span>
            </a>
          </div>
        )

      default:
        return (
          <span className="line-clamp-1 text-base text-mercury-950">
            {item[columnKey]}
          </span>
        )
    }
  }

  const getTdClassName = (key: string) => {
    switch (key) {
      case ColumnKey.Action:
        return "w-[140px] text-right"
      case ColumnKey.Name:
        return "w-[200px]"
      case ColumnKey.Type:
        return "w-[180px]"
      case ColumnKey.Date:
        return "w-[180px]"

      default:
        return ""
    }
  }
  const getThClassName = getTdClassName

  return (
    <div>
      <div className="flex justify-between max-sm:flex-col max-sm:justify-start">
        <HeadSectionData
          iconTitle={<PhotoPlusIcon color="#A2845E" size={24} />}
          title="Photos & Videos "
          addTitle="Add media"
        />
        {hasSyncData(data) && <SyncLabel />}
      </div>
      <div className="mt-4">
        {isMobile ? (
          <TableDataMobile
            data={data.map((item) => ({
              type: item.type,
              value: item.name,
              createdAt: item.createdAt,
              id: item.id,
            }))}
            loadMore={fetchNextPage}
            hasMore={hasNextPage}
            category={category}
            botId={botId}
          />
        ) : (
          <TableData
            tdClassName={getTdClassName}
            thClassName={getThClassName}
            columns={columns}
            rows={data}
            renderCell={renderCell}
            loadMore={{ onLoadMore: fetchNextPage, hasMore: hasNextPage }}
            baseClassName="max-h-[400px] overflow-auto"
          />
        )}
      </div>
    </div>
  )
}

export default MediaData
