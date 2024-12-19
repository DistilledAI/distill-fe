import { TrendingIcon } from "@components/Icons/TrendingPage"
import TableData from "@pages/MyData/Components/TableData"

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
    mindshare: {
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
    mindshare: {
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

const ListTrending = () => {
  const renderCell = (item: Record<string, any>, columnKey: string) => {
    console.log(item)
    switch (columnKey) {
      case ColumnKey.Name:
        return <div>HELLO</div>

      default:
        return (
          <span className="line-clamp-1 text-base text-mercury-950">x</span>
        )
    }
  }

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <TrendingIcon />
          <p className="text-22 font-semibold text-mercury-950">Trending</p>
        </div>
        <div className="flex items-center border-b-1 border-mercury-100">
          <div className="border-b-2 border-mercury-950 px-4 py-2">24h</div>
          <div className="px-4 py-2">7D</div>
          <div className="px-4 py-2">1M</div>
        </div>
      </div>
      <div className="mt-6">
        <TableData columns={columns} rows={DATA} renderCell={renderCell} />
      </div>
    </div>
  )
}

export default ListTrending
