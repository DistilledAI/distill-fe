import { solanaCircleIcon } from "@assets/svg"
import AvatarCustom from "@components/AvatarCustom"
import { centerTextEllipsis } from "@utils/index"
import NumberWithChange from "./NumbeWithChange"
import {
  cn,
  Link,
  Pagination,
  PaginationItemRenderProps,
  PaginationItemType,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react"
import { useState } from "react"
import { InfoCircleOutlineIcon } from "@components/Icons/InfoCircleIcon"
import { twMerge } from "tailwind-merge"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"

enum ColumnKey {
  Name = "name",
  MindShare = "mindShare",
  TotalMessage = "totalMessage",
  ClanMember = "clanMember",
  Price = "price",
  MarketCap = "marketCap",
  Action = "action",
}

const columns = [
  {
    key: ColumnKey.Name,
    label: "Agents name",
    sortable: false,
  },
  {
    key: ColumnKey.MindShare,
    label: "Global mindshare",
    desc: "The percentage of the total conversation about the token on Twitter.",
    sortable: true,
  },
  {
    key: ColumnKey.TotalMessage,
    label: "Total Messages",
    sortable: true,
  },
  {
    key: ColumnKey.ClanMember,
    label: "Clan Members",
    sortable: true,
  },
  {
    key: ColumnKey.Price,
    label: "Price",
    sortable: true,
  },
  {
    key: ColumnKey.MarketCap,
    label: "Market Cap",
    sortable: true,
  },
  {
    key: ColumnKey.Action,
    label: "",
    sortable: false,
  },
]

interface Props {
  trendingAgentList: any[]
  onPageChange: (page: number) => void
  page: number
  totalPages: number
}

const TrendingAgentTable = ({
  trendingAgentList,
  onPageChange,
  page,
  totalPages,
}: Props) => {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: ColumnKey.TotalMessage,
    direction: "descending",
  })

  const renderCell = (item: Record<string, any>, columnKey: string) => {
    const token = item?.user?.botWallet?.tokenize
      ? JSON.parse(item?.user?.botWallet?.tokenize)
      : {}

    const addressToken = token?.sol
      ? centerTextEllipsis(token?.sol)
      : "Not tokenize yet"

    switch (columnKey) {
      case ColumnKey.Name:
        return (
          <div className="flex items-center gap-3">
            <div>
              <AvatarCustom
                badgeIcon={<img src={solanaCircleIcon} />}
                className="h-11 w-11 rounded-lg"
                src={item?.user?.avatar}
                publicAddress={item?.user?.publicAddress}
              />
            </div>
            <div>
              <div className="flex gap-1">
                <span
                  className={twMerge(
                    "text-[16px] font-medium text-mercury-700",
                    !token?.symbol && "hidden",
                  )}
                >
                  {token?.symbol?.toUpperCase()}
                </span>
                <span className="line-clamp-1 text-16 font-bold text-mercury-900">
                  {item?.user?.username}
                </span>
              </div>
              <span className="text-13 font-medium text-mercury-600">
                {addressToken}
              </span>
            </div>
          </div>
        )

      case ColumnKey.MindShare:
        return <NumberWithChange />

      case ColumnKey.TotalMessage:
        return (
          <span className="text-14 text-mercury-950">
            {item?.totalMsg1day || "-"}
          </span>
        )

      case ColumnKey.ClanMember:
        return (
          <span className="text-14 text-mercury-950">
            {item?.memberClan1day || "-"}
          </span>
        )

      case ColumnKey.Price:
        return (
          <NumberWithChange
            value={item?.price?.toFixed(3)}
            percentage={item?.gPrice}
            unit="$"
          />
        )

      case ColumnKey.MarketCap:
        return (
          <NumberWithChange
            value={item?.marketCap1day}
            percentage={item?.gMarketCap1day}
            unit="$"
          />
        )

      case ColumnKey.Action:
        return (
          <Link
            href={`https://raydium.io/swap/?inputMint=sol&outputMint=${token?.sol}`}
            target="_blank"
            className="text-16 font-medium text-[#A2845E]"
            isDisabled={!token?.sol}
          >
            Trade
          </Link>
        )

      default:
        return null
    }
  }

  const thClassName = (key: string) => {
    switch (key) {
      case ColumnKey.MindShare:
        return "flex h-full items-center"
      default:
        return ""
    }
  }

  const renderItem = ({
    ref,
    key,
    value,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={cn(className, "h-8 w-8 min-w-8 -rotate-90 bg-mercury-70")}
          onClick={onNext}
        >
          <ChevronDownIcon />
        </button>
      )
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={cn(className, "h-8 w-8 min-w-8 rotate-90 bg-mercury-70")}
          onClick={onPrevious}
        >
          <ChevronDownIcon />
        </button>
      )
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      )
    }

    return (
      <button
        key={key}
        ref={ref}
        className={className}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    )
  }

  const renderPagination = () => {
    return trendingAgentList ? (
      <Pagination
        showControls
        initialPage={1}
        radius="full"
        renderItem={renderItem}
        total={totalPages}
        variant="light"
        classNames={{
          base: "flex justify-center",
          cursor: "bg-lgd-code-hot-ramp font-bold",
        }}
        onChange={onPageChange}
        page={page}
      />
    ) : null
  }

  return (
    <Table
      isHeaderSticky
      aria-label="trending agent table"
      classNames={{
        base: "mt-4 md:mt-6",
        wrapper:
          "shadow-none border-1 border-white rounded-[22px] gap-0 bg-white md:bg-mercury-30 pb-0",
        thead: [
          "h-9 [&>tr]:first:shadow-none",
          "before:absolute before:bottom-0 before:w-full before:border-b-1 before:border-mercury-100",
        ].join(" "),
        th: "bg-transparent h-5 p-0 pr-4 text-base font-normal text-mercury-600",
        td: "pl-0 pr-4 py-2",
        tbody: "[&>tr:first-child>td]:pt-4",
        emptyWrapper: "h-10",
        sortIcon: "ml-1 text-[#363636]",
        table: "min-h-[500px]",
      }}
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      bottomContent={renderPagination()}
      bottomContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            className={twMerge(
              thClassName(column.key),
              "data-[hover=true]:text-[#363636]",
              sortDescriptor.column === column.key && "text-[#363636]",
            )}
            key={column.key}
            allowsSorting={column.sortable}
          >
            {column.label}
            {column?.desc ? (
              <Tooltip content={column.desc}>
                <div className="ml-1">
                  <InfoCircleOutlineIcon size={12} color="#888888" />
                </div>
              </Tooltip>
            ) : null}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={trendingAgentList}
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

export default TrendingAgentTable
