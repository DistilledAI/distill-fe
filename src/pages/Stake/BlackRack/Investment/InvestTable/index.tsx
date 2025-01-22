import { IconTrendingUp, UnTrendingIcon } from "@components/Icons/DefiLens"
import { HourglassHighIcon } from "@components/Icons/Hour"
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import { numberWithCommas, toBN } from "@utils/format"
import { twMerge } from "tailwind-merge"
import moment from "moment"
import React from "react"
import ItemWithdraw from "./ItemWithdraw"
import { SPL_DECIMAL } from "@pages/Stake/config"
import { usdcLogo } from "@assets/images"

enum ColumnKey {
  Amount = "amount",
  State = "state",
  Duration = "duration",
  Action = "action",
}

const columns = [
  {
    key: ColumnKey.Amount,
    label: "Amount",
    sortable: false,
  },
  {
    key: ColumnKey.State,
    label: "State",
    sortable: false,
  },
  {
    key: ColumnKey.Duration,
    label: "Date to Withdraw",
    sortable: false,
  },
  {
    key: ColumnKey.Action,
    label: "Action",
    sortable: false,
  },
]

const InvestTable: React.FC<{
  list: {
    id: number
    amount: number
    unstakedAtTime: number
  }[]
  getListUnbonding: () => void
}> = ({ list, getListUnbonding }) => {
  const renderState = (state: string) => {
    switch (state) {
      case "staking":
        return (
          <div className="flex items-center gap-1">
            <IconTrendingUp size={14} color="#2CB34E" />
            <span className="text-14 font-medium text-green-500">Staking</span>
          </div>
        )
      case "unbonding":
        return (
          <div className="flex items-center gap-1">
            <HourglassHighIcon />
            <span className="text-14 font-medium text-orange-600">
              Unbonding
            </span>
          </div>
        )
      case "unstaked":
        return (
          <div className="flex items-center gap-1">
            <UnTrendingIcon />
            <span className="text-14 font-medium text-mercury-800">
              Unbonded
            </span>
          </div>
        )
      default:
        return null
    }
  }

  const renderAction = (state: string, id: number, isWithdraw: boolean) => {
    switch (state) {
      case "staking":
        return (
          <Button className="h-6 rounded-full bg-mercury-100 text-[14px] font-medium text-mercury-900">
            UNSTAKE
          </Button>
        )
      case "unbonding":
        return (
          <Button className="h-6 rounded-full bg-mercury-950 text-[14px] font-medium text-white">
            CANCEL
          </Button>
        )
      case "unstaked":
        return (
          <ItemWithdraw
            id={id}
            isWithdraw={isWithdraw}
            callback={getListUnbonding}
          />
        )
      default:
        return null
    }
  }

  const renderCell = (item: Record<string, any>, columnKey: string) => {
    const totalAmount = toBN(item.amount)
      .div(10 ** SPL_DECIMAL)
      .toNumber()

    const duration = moment(item.unstakedAtTime * 1000).format("lll")
    const isCanWithdraw = Date.now() >= item.unstakedAtTime * 1000

    switch (columnKey) {
      case ColumnKey.Amount:
        return (
          <div className="flex items-center gap-2 pr-4">
            <img className="h-5 w-5 rounded-full object-cover" src={usdcLogo} />
            <span className="text-16 font-bold text-mercury-900 max-md:text-15">
              {numberWithCommas(totalAmount)}
            </span>
          </div>
        )

      case ColumnKey.State:
        return renderState(isCanWithdraw ? "unstaked" : "unbonding")

      case ColumnKey.Duration:
        return (
          <span className="text-14 font-medium text-mercury-900">
            {duration || "-"}
          </span>
        )

      case ColumnKey.Action:
        return renderAction("unstaked", item.id, isCanWithdraw)

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
            allowsSorting={column.sortable}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={list}
        emptyContent={
          <div className="pb-6 pt-4 text-base text-mercury-600">Empty</div>
        }
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as string)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default InvestTable
