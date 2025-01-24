import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import { twMerge } from "tailwind-merge"
import React from "react"
import useFetchHistory from "../useFetchHistory"
import moment from "moment"
import { formatNumberWithComma } from "@utils/index"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"

enum ColumnKey {
  Date = "date",
  ShareTotal = "shareTotal",
  AUM = "aum",
  SharePrice = "sharePrice",
}

const columns = [
  {
    key: ColumnKey.Date,
    label: "Date",
  },
  {
    key: ColumnKey.ShareTotal,
    label: "Total Shares",
  },
  {
    key: ColumnKey.AUM,
    label: "AUM",
  },
  {
    key: ColumnKey.SharePrice,
    label: "Share Price",
  },
]

const HistoryTable: React.FC = () => {
  const { data, getData, page, isLastPage, isFistPage } = useFetchHistory()

  const renderCell = (item: Record<string, any>, columnKey: string) => {
    console.log(item)
    switch (columnKey) {
      case ColumnKey.Date:
        return <div>{moment(item.date).format("ll")}</div>
      case ColumnKey.ShareTotal:
        return <div>{formatNumberWithComma(item.totalShares)}</div>
      case ColumnKey.SharePrice:
        return (
          <div className="font-medium">
            ${formatNumberWithComma(item.shareValues)}
          </div>
        )
      case ColumnKey.AUM:
        return (
          <div className="font-medium">${formatNumberWithComma(item.aum)}</div>
        )

      default:
        return null
    }
  }

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="stake table"
        classNames={{
          base: "mt-4 md:mt-6",
          wrapper:
            "shadow-none border-1 border-mercury-100 rounded-[22px] gap-0 bg-white md:bg-mercury-30 pb-0",
          thead: [
            "h-9 [&>tr]:first:shadow-none",
            "before:absolute before:bottom-0 before:w-full before:border-b-1 before:border-mercury-100",
          ].join(" "),
          th: "bg-transparent h-5 p-0 pr-4 text-base font-normal text-mercury-600",
          td: "pl-0 pr-3 py-4",
          tbody: "[&>tr:first-child>td]:pt-4",
          emptyWrapper: "h-10",
          sortIcon: "ml-1 text-[#363636]",
        }}
        bottomContentPlacement="outside"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              className={twMerge("data-[hover=true]:text-[#363636]")}
              key={column.key}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={data}
          emptyContent={
            <div className="pb-6 pt-4 text-base text-mercury-600">Empty</div>
          }
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey as string)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mt-4 flex w-full items-center justify-center gap-2">
        <button
          disabled={isFistPage}
          className={twMerge(
            "flex h-7 w-7 min-w-7 rotate-90 items-center justify-center rounded-full bg-mercury-70",
            isFistPage && "opacity-70",
          )}
          onClick={() => {
            if (!isFistPage) getData(page - 1)
          }}
        >
          <ChevronDownIcon size={16} />
        </button>
        <button
          disabled={isLastPage}
          className={twMerge(
            "flex h-7 w-7 min-w-7 -rotate-90 items-center justify-center rounded-full bg-mercury-70",
            isLastPage && "opacity-70",
          )}
          onClick={() => {
            if (!isLastPage) getData(page + 1)
          }}
        >
          <ChevronDownIcon size={16} />
        </button>
      </div>
    </>
  )
}

export default HistoryTable
