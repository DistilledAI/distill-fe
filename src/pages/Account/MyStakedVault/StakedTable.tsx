import AvatarCustom from "@components/AvatarCustom"
import { PATH_NAMES } from "@constants/index"
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import ItemTotalStaked from "./ItemTotalStaked"
import ItemMyStaked from "./ItemMyStaked"
import React from "react"
import { IVaultData } from "."
import { INVEST_ADDRESS } from "@pages/Stake/BlackRack/Investment/constants"
import { StakeTokenAddress } from "@pages/Stake"
import { CategoryRacksVault } from "@pages/Stake/BlackRack"

enum ColumnKey {
  VaultName = "vault_name",
  TotalStaked = "total_staked",
  MyStaked = "my_staked",
  Action = "action",
}

const columns = [
  {
    key: ColumnKey.VaultName,
    label: "Vault Name",
  },
  {
    key: ColumnKey.TotalStaked,
    label: "Total Staked",
  },
  {
    key: ColumnKey.MyStaked,
    label: "My Staked",
  },
  {
    key: ColumnKey.Action,
    label: "Action",
  },
]

const StakedTable: React.FC<{
  list: IVaultData[]
  emptyContent?: string
}> = ({ list, emptyContent = "Empty" }) => {
  const navigate = useNavigate()

  const renderCell = (item: Record<string, any>, columnKey: string) => {
    switch (columnKey) {
      case ColumnKey.VaultName:
        return (
          <div className="flex items-center gap-2">
            <AvatarCustom src={item.avatar} className="h-[32px] w-[32px]" />
            <p className="line-clamp-1 text-14 font-medium">{item.label}</p>
          </div>
        )

      case ColumnKey.TotalStaked:
        return <ItemTotalStaked data={item} />

      case ColumnKey.MyStaked:
        return <ItemMyStaked data={item} />

      case ColumnKey.Action: {
        const isAgentFund = item.address === INVEST_ADDRESS.shareToken
        const url = isAgentFund
          ? `${PATH_NAMES.STAKING}?token=${StakeTokenAddress.BlackRack}&category=${CategoryRacksVault.AIFund2}`
          : `${PATH_NAMES.STAKING}?token=${item.address}`
        return (
          <div className="flex items-center justify-end">
            <div
              className="cursor-pointer whitespace-nowrap rounded-full bg-mercury-950 px-4 py-1 font-semibold text-white hover:opacity-70 max-md:px-3 max-md:text-13"
              onClick={() => navigate(url, { state: { isHistory: "true" } })}
            >
              Go to Vault
            </div>
          </div>
        )
      }

      default:
        return null
    }
  }

  return (
    <Table
      isHeaderSticky
      aria-label="table"
      classNames={{
        wrapper:
          "shadow-none bg-mercury-30 border-1 border-mercury-100 rounded-[22px] px-6 gap-0",
        th: "bg-transparent h-5 p-0 pb-1 pr-4 text-base font-normal text-mercury-600",
        td: "pl-0 pr-4 py-2",
        thead:
          "[&>tr]:first:shadow-none after:absolute after:left-0 after:bottom-0 after:z-[-1] after:w-full after:h-[50px] after:bg-mercury-30 before:border-b-1 before:absolute before:bottom-0 before:h-1 before:w-full before:border-mercury-100",
        tbody: "[&>tr:first-child>td]:pt-4",
        emptyWrapper: "h-10",
        base: "overflow-scroll",
      }}
      bottomContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={list}
        emptyContent={
          <span className="text-base text-mercury-600">{emptyContent}</span>
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

export default StakedTable
