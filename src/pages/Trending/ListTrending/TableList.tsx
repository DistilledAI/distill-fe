import { solanaCircleIcon } from "@assets/svg"
import AvatarCustom from "@components/AvatarCustom"
import { CretUpFilledIcon } from "@components/Icons/TrendingPage"
import TableData from "@pages/MyData/Components/TableData"
import { centerTextEllipsis } from "@utils/index"
import { Link } from "react-router-dom"

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

const DATA = [
  {
    id: 1,
    name: "Max",
    token: "$MAX",
    avatar: "https://storage.distilled.ai/avatar/maxi.png",
    contractAddress: "orai18asdhgcmk39729940hhkao0je9",
    tradeLink: "https://storage.distilled.ai/avatar/maxi.png",
    iconNetwork: "",
    mindShare: {
      value: "18.6%",
      percent: "51.4%",
    },
    totalMessage: {
      value: "241.5K",
      percent: "55%",
    },
    clanMember: {
      value: "21.5K",
      percent: "12%",
    },
    price: {
      value: "$1.23",
      percent: "200%",
    },
    marketCap: {
      value: "$14.3M",
      percent: "22%",
    },
  },
  {
    id: 2,
    name: "Min",
    token: "$MIN",
    avatar: "https://storage.distilled.ai/avatar/maxi.png",
    contractAddress: "orai18asdhgcmk39729940hhkao0je9",
    tradeLink: "https://storage.distilled.ai/avatar/maxi.png",
    mindShare: {
      value: "18.6%",
      percent: "51.4%",
    },
    totalMessage: {
      value: "241.5K",
      percent: "55%",
    },
    clanMember: {
      value: "21.5K",
      percent: "12%",
    },
    price: {
      value: "$1.23",
      percent: "200%",
    },
    marketCap: {
      value: "$14.3M",
      percent: "22%",
    },
  },
]

const TableList = () => {
  const renderCell = (item: Record<string, any>, columnKey: string) => {
    switch (columnKey) {
      case ColumnKey.Name:
        return (
          <div className="flex items-center gap-2">
            <div>
              <AvatarCustom
                badgeIcon={<img src={solanaCircleIcon} />}
                className="h-[44px] w-[44px] rounded-[8px]"
                src={item.avatar}
              />
            </div>
            <div>
              <div className="flex gap-1">
                <span className="text-mercury-700">{item.token}</span>
                <span className="font-semibold">{item.name}</span>
              </div>
              <div>
                <p>{centerTextEllipsis(item.contractAddress)}</p>
              </div>
            </div>
          </div>
        )

      case ColumnKey.MindShare:
        return (
          <div className="flex items-center gap-2">
            <span className="text-14 text-mercury-950">
              {item.mindShare.value}
            </span>
            <div className="flex items-center">
              <CretUpFilledIcon color="#20993F" />
              <span className="text-14 text-[#20993F]">
                {item.mindShare.percent}
              </span>
            </div>
          </div>
        )

      case ColumnKey.TotalMessage:
        return (
          <div className="flex items-center gap-2">
            <span className="text-14 text-mercury-950">
              {item.totalMessage.value}
            </span>
            <div className="flex items-center">
              <CretUpFilledIcon color="#20993F" />
              <span className="text-14 text-[#20993F]">
                {item.totalMessage.percent}
              </span>
            </div>
          </div>
        )

      case ColumnKey.ClanMember:
        return (
          <div className="flex items-center gap-2">
            <span className="text-14 text-mercury-950">
              {item.clanMember.value}
            </span>
            <div className="flex items-center">
              <CretUpFilledIcon color="#20993F" />
              <span className="text-14 text-[#20993F]">
                {item.clanMember.percent}
              </span>
            </div>
          </div>
        )

      case ColumnKey.Price:
        return (
          <div className="flex items-center gap-2">
            <span className="text-14 text-mercury-950">{item.price.value}</span>
            <div className="flex items-center">
              <CretUpFilledIcon color="#20993F" />
              <span className="text-14 text-[#20993F]">
                {item.price.percent}
              </span>
            </div>
          </div>
        )

      case ColumnKey.MarketCap:
        return (
          <div className="flex items-center gap-2">
            <span className="text-14 text-mercury-950">
              {item.marketCap.value}
            </span>
            <div className="flex items-center">
              <CretUpFilledIcon color="#20993F" />
              <span className="text-14 text-[#20993F]">
                {item.marketCap.percent}
              </span>
            </div>
          </div>
        )

      case ColumnKey.Action:
        return (
          <Link to="#" className="font-medium text-[#A2845E]">
            Trade
          </Link>
        )

      default:
        return null
    }
  }

  return <TableData columns={columns} rows={DATA} renderCell={renderCell} />
}

export default TableList
