import AvatarCustom from "@components/AvatarCustom"
import { SettingIcon } from "@components/Icons"
import { CopyIcon } from "@components/Icons/Copy"
import { ShareWithQrIcon } from "@components/Icons/Share"
import {
  MAP_DISPLAY_FROM_STATUS_MY_AGENT,
  PATH_NAMES,
  Publish,
  STATUS_AGENT,
} from "@constants/index"
import { Button, useDisclosure } from "@nextui-org/react"
import TableData from "@pages/MyData/Components/TableData"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { publishMarketplace } from "services/chat"
import { twMerge } from "tailwind-merge"
import { IAgentData } from "types/user"
import ShareModal from "../Profile/ShareProfile/ShareModal"

enum ColumnKey {
  Agent = "agent",
  Address = "address",
  Status = "status",
  Action = "action",
}

const columns = [
  {
    key: ColumnKey.Agent,
    label: "My Agents",
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
  const [agentSelected, setAgentSelected] = useState<number | null>(null)
  const isPending = (status: number) => status === STATUS_AGENT.PENDING
  const navigate = useNavigate()

  const onPublishMarketplace = async (botId: number) => {
    try {
      const res = await publishMarketplace(botId)
      if (res) {
        navigate(PATH_NAMES.MARKETPLACE)
        toast.success(`published successfully`)
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  }

  const renderCell = (item: Record<string, any>, columnKey: string) => {
    switch (columnKey) {
      case ColumnKey.Agent:
        return (
          <div className="flex gap-3">
            <div>
              <AvatarCustom
                publicAddress={item.publicAddress || item.username}
                className="h-6 w-6"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="line-clamp-1 font-bold text-mercury-950">
                  {item.username}
                </p>
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
              </div>
              <p className="line-clamp-1 text-13 text-mercury-600">
                {item.description}
              </p>
            </div>
          </div>
        )

      case ColumnKey.Action:
        const isPublished = item.publish === Publish.Published

        return (
          <div className="flex gap-2">
            <Button
              onClick={() => onPublishMarketplace(item.id)}
              isDisabled={item.status !== STATUS_AGENT.ACTIVE}
            >
              {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <div className="inline-flex cursor-pointer items-center gap-1 font-medium text-[#A2845E] hover:opacity-70">
              <SettingIcon /> Edit
            </div>
          </div>
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
            <span className="text-16 font-medium text-mercury-900">
              {centerTextEllipsis(item.publicAddress, 5)}
            </span>
            <CopyIcon />
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
        return "align-top text-right"

      default:
        return "align-top"
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
        baseClassName="max-h-[400px]"
      />
      <ShareModal
        shareUrl={`${appUrl}${PATH_NAMES.INVITE}/${agentSelected}`}
        isOpen={isOpen && !!agentSelected}
        onClose={() => {
          onClose()
          setAgentSelected(null)
        }}
      />
    </>
  )
}

export default ListAgent