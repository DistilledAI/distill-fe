import { DatabaseIcon } from "@components/Icons/DatabaseImportIcon"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { BrainOutlineIcon } from "@components/Icons/Sidebar"
import { useAppSelector } from "@hooks/useAppRedux"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react"
import { BotDataTypeKey } from "@types"
import { useEffect, useState } from "react"
import { getMyBotData } from "services/user"

const Citations: React.FC<{ privateData: any[]; isPrivateChat?: boolean }> = ({
  privateData,
  isPrivateChat,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const myAgent = useAppSelector((state) => state.agents.myAgent) as any
  const [citaionsData, setCitaionsData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const FILE_TYPE_TO_LABEL = {
    [BotDataTypeKey.PLAIN_TEXT_FILE]: "Plain text file",
    [BotDataTypeKey.SOCIAL_MEDIA]: "Social profile",
    [BotDataTypeKey.FAQ]: "FAQ Samples",
  } as any

  const callGetMyAgentData = async () => {
    try {
      setLoading(true)
      const res = await getMyBotData(myAgent?.id, {
        limit: 20,
        offset: 0,
        filter: JSON.stringify({
          documentIds: [
            "5be61d40-81d7-4524-a8c8-92fb694e6de2",
            "7fa45421-edf7-4849-8d83-222d97869acd",
          ],
        }),
      })
      if (res.data) {
        setCitaionsData(res.data.items)
      }
    } catch (error) {
      console.log("error", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      callGetMyAgentData()
    }
  }, [isOpen])

  if (privateData.length === 0) return <div />

  return (
    <>
      <button
        type="button"
        className="mb-4 flex items-center gap-1 rounded-md bg-brown-50 px-2 py-[6px] text-13 font-medium text-brown-600"
        onClick={() => {
          if (isPrivateChat) return
          onOpen()
        }}
      >
        <DatabaseIcon size={14} color="#83664B" />
        <span>{privateData.length} connected sources</span>
      </button>

      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          wrapper: "z-[100]",
          backdrop: "z-[100]",
        }}
        hideCloseButton
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerBody>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-base-md text-mercury-800">
                    Citations
                  </span>
                  <div onClick={onClose} className="cursor-pointer">
                    <CloseFilledIcon />
                  </div>
                </div>

                <button
                  type="button"
                  className="flex items-center gap-1 rounded-md text-14 font-bold text-mercury-950"
                  onClick={onOpen}
                >
                  <BrainOutlineIcon size={20} color="#83664B" />
                  <span>{citaionsData.length} connected sources</span>
                </button>

                {loading ? (
                  privateData.map(() => (
                    <div className="flex w-full flex-col gap-2">
                      <Skeleton className="rounded-lg">
                        <div className="h-[70px] rounded-lg bg-default-300" />
                      </Skeleton>
                    </div>
                  ))
                ) : (
                  <div className="w-full space-y-4">
                    {citaionsData.map((item: any) => (
                      <div className="flex flex-col items-start justify-between rounded-lg bg-brown-50 p-2">
                        <div className="mb-2 flex w-full items-center justify-between">
                          <span className="text-14 font-medium text-gray-900">
                            {FILE_TYPE_TO_LABEL[item?.key]}
                          </span>
                          <DatabaseIcon size={14} color="#83664B" />
                        </div>
                        <span className="text-13 font-bold text-mercury-950">
                          {item?.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}
export default Citations
