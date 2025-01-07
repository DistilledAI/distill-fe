import { maxAvatar } from "@assets/images"
import AvatarCustom from "@components/AvatarCustom"
import { IconTrendingUp, UnTrendingIcon } from "@components/Icons/DefiLens"
import { HourglassHighIcon } from "@components/Icons/Hour"
import {
  Button,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import { numberWithCommas } from "@utils/format"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

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
    label: "Duration",
    sortable: false,
  },
  {
    key: ColumnKey.Action,
    label: "Action",
    sortable: false,
  },
]

const items = [
  {
    id: 1,
    avatar: maxAvatar,
    amount: 11110257,
    state: "staking",
    duration: "24 days left",
  },
  {
    id: 2,
    avatar: maxAvatar,
    amount: 11110257,
    state: "unbonding",
    duration: "24 days left",
  },
  {
    id: 3,
    avatar: maxAvatar,
    amount: 11110257,
    state: "unstaked",
    duration: "24 days left",
  },
]

const StakeTable = () => {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: ColumnKey.Amount,
    direction: "descending",
  })

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
              Unstaked
            </span>
          </div>
        )
      default:
        return null
    }
  }

  const renderAction = (state: string) => {
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
          <Button className="h-6 rounded-full bg-mercury-950 text-[14px] font-medium text-white">
            WITHDRAW
          </Button>
        )
      default:
        return null
    }
  }

  const renderCell = (item: Record<string, any>, columnKey: string) => {
    switch (columnKey) {
      case ColumnKey.Amount:
        return (
          <div className="flex items-center gap-2">
            <AvatarCustom
              className="h-5 w-5 rounded-full border-transparent"
              src={item?.avatar}
              publicAddress={item?.publicAddress}
            />
            <span className="text-16 font-bold text-mercury-900">
              {numberWithCommas(item?.amount)}
            </span>
          </div>
        )

      case ColumnKey.State:
        return renderState(item?.state)

      case ColumnKey.Duration:
        return (
          <span className="text-14 font-medium text-mercury-900">
            {item?.duration || "-"}
          </span>
        )

      case ColumnKey.Action:
        return renderAction(item.state)

      default:
        return null
    }
  }

  // const thClassName = (key: string) => {
  //   switch (key) {
  //     case ColumnKey.MindShare:
  //       return "flex h-full items-center"
  //     default:
  //       return ""
  //   }
  // }

  // const renderItem = ({
  //   ref,
  //   key,
  //   value,
  //   onNext,
  //   onPrevious,
  //   setPage,
  //   className,
  // }: PaginationItemRenderProps) => {
  //   if (value === PaginationItemType.NEXT) {
  //     return (
  //       <button
  //         key={key}
  //         className={cn(className, "h-8 w-8 min-w-8 -rotate-90 bg-mercury-70")}
  //         onClick={onNext}
  //       >
  //         <ChevronDownIcon />
  //       </button>
  //     )
  //   }

  //   if (value === PaginationItemType.PREV) {
  //     return (
  //       <button
  //         key={key}
  //         className={cn(className, "h-8 w-8 min-w-8 rotate-90 bg-mercury-70")}
  //         onClick={onPrevious}
  //       >
  //         <ChevronDownIcon />
  //       </button>
  //     )
  //   }

  //   if (value === PaginationItemType.DOTS) {
  //     return (
  //       <button key={key} className={className}>
  //         ...
  //       </button>
  //     )
  //   }

  //   return (
  //     <button
  //       key={key}
  //       ref={ref}
  //       className={className}
  //       onClick={() => setPage(value)}
  //     >
  //       {value}
  //     </button>
  //   )
  // }

  // const renderPagination = () => {
  //   return trendingAgentList ? (
  //     <Pagination
  //       showControls
  //       initialPage={1}
  //       radius="full"
  //       renderItem={renderItem}
  //       total={totalPages}
  //       variant="light"
  //       classNames={{
  //         base: "flex justify-center",
  //         cursor: "bg-lgd-code-hot-ramp font-bold",
  //       }}
  //       onChange={onPageChange}
  //       page={page}
  //     />
  //   ) : null
  // }

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
        td: "pl-0 pr-3 py-6",
        tbody: "[&>tr:first-child>td]:pt-4",
        emptyWrapper: "h-10",
        sortIcon: "ml-1 text-[#363636]",
      }}
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      // bottomContent={renderPagination()}
      bottomContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            className={twMerge(
              // thClassName(column.key),
              "data-[hover=true]:text-[#363636]",
              sortDescriptor.column === column.key && "text-[#363636]",
            )}
            key={column.key}
            allowsSorting={column.sortable}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={items}
        emptyContent={<span className="text-base text-mercury-600">Empty</span>}
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

export default StakeTable
