import { SocialLinkIcon } from "@components/Icons/SocialLinkIcon"
import HeadSectionData from "../Components/HeadSectionData"
// import { EditPenFilledIcon } from "@components/Icons/Edit"
import { InfoCircleIcon } from "@components/Icons/InfoCircleIcon"
import useWindowSize from "@hooks/useWindowSize"
import { TYPE_DATA_KEY } from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent/CreatePrivateAgent"
import { BotDataTypeKey } from "@types"
import { capitalizeFirstLetter } from "@utils/index"
import moment from "moment"
import React from "react"
import TableData from "../Components/TableData"
import TableDataMobile from "../Components/TableDataMobile"
import DeleteData from "../DeleteData"
import SyncData from "../SyncData"
import useFetchByCategory from "../useFetchByCategory"

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

const LinkData: React.FC<{
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
    const isSocialMediaType = item?.key === TYPE_DATA_KEY.SOCIAL_MEDIA
    const dataId = item?.id
    switch (columnKey) {
      case ColumnKey.Type:
        return (
          <span className="line-clamp-1 text-base text-mercury-600">
            {isSocialMediaType
              ? capitalizeFirstLetter(item?.name)
              : item[columnKey]}
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
          <div className="flex items-center gap-4">
            {/* <div className="cursor-pointer hover:opacity-70">
              <EditPenFilledIcon color="#545454" />
            </div> */}
            <DeleteData
              botId={item.userId}
              ids={[item.id]}
              category={category}
            />
            <SyncData botId={botId} dataId={dataId} />
          </div>
        )
      case ColumnKey.Name:
        return (
          <div className="flex flex-row items-center gap-1">
            <InfoCircleIcon />
            <a
              className="max-w-[150px] truncate hover:underline"
              href={item.value}
              target="_blank"
            >
              <span className="text-base text-mercury-950">
                {isSocialMediaType ? item?.value : item[columnKey]}
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
        return "w-[100px]"
      case ColumnKey.Name:
        return "w-[200px]"
      case ColumnKey.Type:
        return "w-[200px]"
      case ColumnKey.Date:
        return "w-[150px]"

      default:
        return ""
    }
  }
  const getThClassName = getTdClassName

  return (
    <div>
      <HeadSectionData
        iconTitle={<SocialLinkIcon color="#A2845E" size={24} />}
        title="Website Links/Social media"
        addTitle="Add link"
      />
      <div className="mt-4">
        {isMobile ? (
          <TableDataMobile
            data={data.map((item) => ({
              type: item.type,
              value: item.value,
              name: item.name,
              key: item.key,
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
            baseClassName="max-h-[400px]"
          />
        )}
      </div>
    </div>
  )
}

export default LinkData
