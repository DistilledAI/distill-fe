import { FilledUserIcon } from "@components/Icons/UserIcon"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { shortenNumber } from "@utils/index"
import { getTotalMemberGroup } from "services/group"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"

interface TotalMemberBadgeProps {
  groupId: string
  isQuery?: boolean
  classname?: string
  textClassName?: string
  iconSize?: number
  memberFixed?: number
}

const TotalMemberBadge = ({
  groupId,
  classname,
  textClassName,
  iconSize = 12,
  memberFixed,
}: TotalMemberBadgeProps) => {
  const queryClient = useQueryClient()
  const totalMemberCached = queryClient.getQueryData([
    QueryDataKeys.TOTAL_MEMBER_GROUP,
    groupId,
  ])
  const { data } = useQuery({
    queryKey: [QueryDataKeys.TOTAL_MEMBER_GROUP, groupId],
    queryFn: () => getTotalMemberGroup(Number(groupId)),
    enabled: !!groupId && !totalMemberCached,
  })

  return (
    <div
      className={twMerge(
        "flex h-fit w-fit min-w-[18px] items-center rounded-full bg-[#FF3B30] px-[5px] py-[1px]",
        classname,
      )}
    >
      <FilledUserIcon size={iconSize} color="#FFFFFF" />
      <span
        className={twMerge(
          "text-[13px] font-medium leading-[140%] text-white",
          textClassName,
        )}
      >
        {memberFixed
          ? shortenNumber(memberFixed)
          : shortenNumber(Number(data?.total?.total) || 0)}
      </span>
    </div>
  )
}

export default TotalMemberBadge
