// import { ArrowsBarToUpIcon } from "@components/Icons/Arrow"
// import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
// import { CloseFilledIcon } from "@components/Icons/DefiLens"
// import { useQueries, useQueryClient } from "@tanstack/react-query"
// import { twMerge } from "tailwind-merge"
// import { QueryDataKeys } from "types/queryDataKeys"

import TotalMemberBadge from "@components/TotalMemberBadge"
import { UserGroup } from "@pages/ChatPage/ChatContainer/LeftBar/useFetchGroups"

interface Props {
  groupDetail?: UserGroup | null
}

const ToggleActionsMobile = ({ groupDetail }: Props) => {
  // const queryClient = useQueryClient()
  // const queries = useQueries({
  //   queries: [
  //     {
  //       queryKey: [QueryDataKeys.EXPAND_LIVE_CHAT],
  //     },
  //     {
  //       queryKey: [QueryDataKeys.CLOSE_LIVE_CHAT],
  //     },
  //   ],
  // })
  // const isExpandLiveChat = !!queries[0].data
  // const isCloseLiveChat = !!queries[1].data

  // const handleExpandChatLive = (isExpand: boolean) => {
  //   queryClient.setQueryData<boolean>(
  //     [QueryDataKeys.EXPAND_LIVE_CHAT],
  //     () => isExpand,
  //   )
  // }

  // const handleCloseChatLive = (isClose: boolean) => {
  //   queryClient.setQueryData<boolean>(
  //     [QueryDataKeys.CLOSE_LIVE_CHAT],
  //     () => isClose,
  //   )
  //   handleExpandChatLive(false)
  // }

  return (
    <div className="flex items-center gap-2 border-b border-b-mercury-100 px-4 py-2 md:hidden">
      <h4 className="text-16 font-bold text-mercury-950">Live Chat</h4>
      <TotalMemberBadge groupId={groupDetail?.groupId?.toString() || ""} />

      {/* <div className="flex items-center gap-4">
        <button
          type="button"
          className={twMerge(
            "rounded-full p-[5.5px] hover:bg-mercury-30",
            isCloseLiveChat && "hidden",
          )}
          onClick={() => handleExpandChatLive(!isExpandLiveChat)}
        >
          {isExpandLiveChat ? <ChevronDownIcon /> : <ArrowsBarToUpIcon />}
        </button>
        <button
          type="button"
          className={twMerge(
            "rounded-full p-[5.5px] hover:bg-mercury-30",
            isCloseLiveChat && "hidden",
          )}
          onClick={() => handleCloseChatLive(true)}
        >
          <CloseFilledIcon />
        </button>
        <button
          type="button"
          className={twMerge(
            "hidden rounded-full p-[5.5px] hover:bg-mercury-30",
            isCloseLiveChat && "block rotate-180",
          )}
          onClick={() => handleCloseChatLive(false)}
        >
          <ChevronDownIcon />
        </button>
      </div> */}
    </div>
  )
}

export default ToggleActionsMobile
