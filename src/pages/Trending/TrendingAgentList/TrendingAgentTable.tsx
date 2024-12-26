import { solanaCircleIcon } from "@assets/svg"
import AvatarCustom from "@components/AvatarCustom"
import TableData from "@pages/MyData/Components/TableData"
import { centerTextEllipsis } from "@utils/index"
import NumberWithChange from "./NumbeWithChange"
import { Link } from "@nextui-org/react"

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
  },
  {
    key: ColumnKey.MindShare,
    label: "Global mindshare",
  },
  {
    key: ColumnKey.TotalMessage,
    label: "Total Messages",
  },
  {
    key: ColumnKey.ClanMember,
    label: "Clan Members",
  },
  {
    key: ColumnKey.Price,
    label: "Price",
  },
  {
    key: ColumnKey.MarketCap,
    label: "Market Cap",
  },
  {
    key: ColumnKey.Action,
    label: "",
  },
]

interface Props {
  trendingAgentList: any[]
}

const TrendingAgentTable = ({ trendingAgentList }: Props) => {
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
          <div className="flex items-center gap-2">
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
                <span className="text-16 font-medium text-mercury-700">
                  {token?.symbol?.toUpperCase()}
                </span>
                <span className="line-clamp-1 text-16 font-bold text-mercury-900">
                  {item?.user?.username}
                </span>
              </div>
              <div>
                <span className="text-13 font-medium text-mercury-600">
                  {addressToken}
                </span>
              </div>
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

  return (
    <TableData
      columns={columns}
      rows={trendingAgentList}
      renderCell={renderCell}
    />
  )
}

export default TrendingAgentTable
