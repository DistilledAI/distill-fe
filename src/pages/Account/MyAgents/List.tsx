import AvatarCustom from "@components/AvatarCustom"
import { CopyIcon } from "@components/Icons/Copy"
import { ShareWithQrIcon } from "@components/Icons/Share"
import {
  MAP_DISPLAY_FROM_STATUS_MY_AGENT,
  PATH_NAMES,
  STATUS_AGENT,
} from "@constants/index"
import { useDisclosure } from "@nextui-org/react"
import TableData from "@pages/MyData/Components/TableData"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import React, { useState } from "react"
import { twMerge } from "tailwind-merge"
import { IAgentData } from "types/user"
import ShareModal from "../../../components/ShareQRModal"
import MyAgentAction from "./Action"
import PublishedOnMarket from "@components/PublishedOnMarket"

enum ColumnKey {
  Agent = "agent",
  Address = "address",
  Status = "status",
  Action = "action",
}

const columns = [
  {
    key: ColumnKey.Agent,
    label: "Agents name",
  },
  {
    key: ColumnKey.Address,
    label: "Address",
  },
  {
    key: ColumnKey.Status,
    label: "Status",
  },
  {
    key: ColumnKey.Action,
    label: "",
  },
]

const appUrl = window.location.origin

const ListAgent: React.FC<{
  agents: IAgentData[]
}> = ({ agents }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    isOpen: isOpenPublished,
    onClose: onClosePublished,
    onOpen: onOpenPublished,
  } = useDisclosure()
  const [agentSelected, setAgentSelected] = useState<number | null>(null)
  const [dataPublished, setDataPublished] = useState<IAgentData>()
  const isPending = (status: number) => status === STATUS_AGENT.PENDING

  const renderCell = (item: Record<string, any>, columnKey: string) => {
    switch (columnKey) {
      case ColumnKey.Agent:
        return (
          <div className="flex gap-3">
            <div>
              <AvatarCustom
                src={item.avatar ?? undefined}
                publicAddress={item.publicAddress || item.username}
                className="h-6 w-6"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                {!isPending(item.status) && (
                  <div
                    onClick={() => {
                      onOpen()
                      setAgentSelected(item.id)
                    }}
                    className={twMerge(
                      "cursor-pointer",
                      isPending(item.status) ? "cursor-default opacity-70" : "",
                    )}
                  >
                    <ShareWithQrIcon />
                  </div>
                )}
                <p className="line-clamp-1 max-w-[130px] font-bold text-mercury-950">
                  {item.username}
                </p>
              </div>
              <p className="line-clamp-1 max-w-[130px] text-13 text-mercury-600">
                {item.description}
              </p>
            </div>
          </div>
        )

      case ColumnKey.Action:
        return (
          <MyAgentAction
            data={item as any}
            onPublishDone={(value) => {
              onOpenPublished()
              setDataPublished(value)
            }}
          />
        )

      case ColumnKey.Status:
        return (
          <div
            style={{
              color: MAP_DISPLAY_FROM_STATUS_MY_AGENT[item.status]?.color,
            }}
          >
            {MAP_DISPLAY_FROM_STATUS_MY_AGENT[item.status]?.label ?? "- - -"}
          </div>
        )

      case ColumnKey.Address:
        return item.publicAddress ? (
          <div
            onClick={(e) => copyClipboard(e, item.publicAddress)}
            className="inline-flex cursor-pointer items-center gap-1 hover:opacity-70"
          >
            <CopyIcon />
            <span className="text-16 font-medium text-mercury-900">
              {centerTextEllipsis(item.publicAddress, 5)}
            </span>
          </div>
        ) : (
          "- - -"
        )

      default:
        return (
          <span className="line-clamp-1 text-base text-mercury-950">
            {item[columnKey]}
          </span>
        )
    }
  }

  const getThClassName = (key: string) => {
    switch (key) {
      case ColumnKey.Agent:
        return "font-semibold text-mercury-950"
      case ColumnKey.Action:
        return "w-[100px]"

      default:
        return ""
    }
  }

  const getTdClassName = (key: string) => {
    switch (key) {
      case ColumnKey.Action:
        return "text-right"

      default:
        return ""
    }
  }

  return (
    <>
      <TableData
        thClassName={getThClassName}
        tdClassName={getTdClassName}
        columns={columns}
        rows={agents}
        renderCell={renderCell}
        baseClassName="max-h-[400px] overflow-auto"
      />
      <ShareModal
        shareUrl={`${appUrl}${PATH_NAMES.INVITE}/${agentSelected}`}
        isOpen={isOpen && !!agentSelected}
        onClose={() => {
          onClose()
          setAgentSelected(null)
        }}
      />
      {dataPublished && (
        <PublishedOnMarket
          isOpen={isOpenPublished}
          onClose={() => {
            onClosePublished()
            setDataPublished(undefined)
          }}
          data={{
            avatar: dataPublished.avatar ?? undefined,
            nameDisplay: dataPublished.username,
            username: dataPublished.username,
            description: dataPublished.description ?? "",
            publicAddress:
              dataPublished.publicAddress ?? dataPublished.username,
            id: dataPublished.id,
          }}
        />
      )}
    </>
  )
}

export default ListAgent
