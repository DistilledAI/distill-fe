import TableData from "@pages/MyData/Components/TableData"
import { useParams } from "react-router-dom"
import { hasSyncDataByStatus } from "@pages/MyData/helpers"
import { InfoCircleIcon } from "@components/Icons/InfoCircleIcon"
import SyncData from "@pages/MyData/SyncData"
import DeleteData from "@pages/MyData/DeleteData"
import moment from "moment"
import React from "react"
import { IBotData } from "types/user"
import useWindowSize from "@hooks/useWindowSize"
import TableDataMobile from "@pages/MyData/Components/TableDataMobile"
import { TYPE_DATA_KEY } from "@pages/ChatPage/ChatContainer/RightContent/MyPrivateAgentContent/CreatePrivateAgent"
import { capitalizeFirstLetter } from "@utils/index"

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

const ListData: React.FC<{
  data: IBotData[]
  hasNextPage: boolean
  fetchNextPage: () => void
}> = ({ data, hasNextPage, fetchNextPage }) => {
  const { isMobile } = useWindowSize()
  const { agentId } = useParams()

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

  const renderCell = (item: Record<string, any>, columnKey: string) => {
    const dataId = item?.id
    const isSocialMediaType = item?.key === TYPE_DATA_KEY.SOCIAL_MEDIA

    switch (columnKey) {
      case ColumnKey.Type:
        return (
          <span className="line-clamp-1 max-w-[100px] text-base text-mercury-600">
            {isSocialMediaType
              ? capitalizeFirstLetter(item.name)
              : item[columnKey]}
          </span>
        )
      case ColumnKey.Date:
        return (
          <span className="line-clamp-1 text-base text-mercury-600 max-md:line-clamp-none max-md:whitespace-nowrap">
            {moment(item[columnKey]).format("ll")}
          </span>
        )
      case ColumnKey.Action:
        return (
          <div className="flex items-center justify-end gap-4">
            <SyncData
              botId={Number(agentId)}
              dataId={dataId}
              status={item.status}
            />
            <DeleteData botId={item.userId} ids={[item.id]} />
          </div>
        )
      case ColumnKey.Name:
        return (
          <div className="flex flex-row items-center gap-1">
            {hasSyncDataByStatus(item.status) && <InfoCircleIcon />}
            <a
              className="line-clamp-1 max-w-[120px] hover:underline max-md:max-w-full"
              href={item.value}
              target="_blank"
            >
              <span className="text-base text-mercury-950">
                {isSocialMediaType ? item.value : item[columnKey]}
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

  return isMobile ? (
    <TableDataMobile
      data={data.map((item) => ({
        type: item.type,
        value: item.name,
        createdAt: item.createdAt,
        id: item.id,
        key: item.key,
        name: item.name,
      }))}
      loadMore={fetchNextPage}
      hasMore={hasNextPage}
      botId={Number(agentId)}
    />
  ) : (
    <TableData
      tdClassName={getTdClassName}
      thClassName={getThClassName}
      columns={columns}
      rows={data}
      renderCell={renderCell}
      loadMore={{ onLoadMore: fetchNextPage, hasMore: hasNextPage }}
      baseClassName="max-h-[370px] overflow-auto"
    />
  )
}

export default ListData
