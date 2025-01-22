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
  const renderCell = (item: Record<string, any>, columnKey: string) => {
    console.log(item)
    switch (columnKey) {
      default:
        return null
    }
  }

  return (
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
        items={[]}
        emptyContent={
          <div className="pb-6 pt-4 text-base text-mercury-600">Empty</div>
        }
      >
        {(item) => (
          <TableRow key={item}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as string)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default HistoryTable
