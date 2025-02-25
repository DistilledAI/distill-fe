import { BoltIcon } from "@components/Icons"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getRemainingDays, getRemainingDaysPercentage } from "@utils/index"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { QueryDataKeys } from "types/queryDataKeys"

const ProgressDays = () => {
  const queryClient = useQueryClient()
  const pathRef = useRef<any>(null)
  const [totalLength, setTotalLength] = useState(0)
  const { chatId } = useParams()
  const groupId =
    queryClient
      .getQueryData([`${QueryDataKeys.CHAT_ID_BY_USERNAME}-${chatId}`])
      ?.toString() || ""
  const { data: groupDetail } = useQuery<any>({
    queryKey: [QueryDataKeys.GROUP_DETAIL, groupId],
    enabled: !!groupId,
    staleTime: 0,
  })
  const groupCreateDate = new Date(
    groupDetail?.data?.group?.event?.createdAt,
  ).getTime()
  const groupEndDate = groupDetail?.data?.group?.event?.endDate * 1000
  const { remainingDays } = getRemainingDays(groupCreateDate, groupEndDate)
  const { percentage } = getRemainingDaysPercentage(
    groupCreateDate,
    groupEndDate,
  )

  useEffect(() => {
    queryClient.setQueryData(
      [QueryDataKeys.EARN_EXP_REMAINING_DAYS],
      () => remainingDays,
    )
  }, [remainingDays])

  useEffect(() => {
    if (pathRef.current) {
      setTotalLength(pathRef.current.getTotalLength())
    }
  }, [])

  const dashOffset = totalLength - (percentage / 100) * totalLength

  return (
    <div
      className="progress-wrapper"
      style={{
        position: "relative",
        width: "380px",
        height: "33px",
        margin: "24px auto",
      }}
    >
      <div className="absolute -top-8 left-1/2 flex w-full -translate-x-1/2 items-center justify-center gap-1">
        <BoltIcon />
        <span className="text-14 text-mercury-950">
          {/* {totalDays - remainingDays}/{totalDays} days */}
          Round Progress: {percentage}%
          {percentage === 100 ? " - Campaign completed!" : ""}
        </span>
      </div>
      {/* Background Path */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="380"
        height="33"
        viewBox="0 0 380 33"
        fill="none"
      >
        <path
          d="M0 30.8243C50.865 12.9446 117.85 2 190 2C262.15 2 329.135 12.9446 380 30.8243"
          stroke="#DFDFDF"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* Solid Progress Path */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="380"
        height="33"
        viewBox="0 0 380 33"
        fill="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <g filter="url(#progressFilter)">
          <path
            ref={pathRef}
            d="M0 30.8243C50.865 12.9446 117.85 2 190 2C262.15 2 329.135 12.9446 380 30.8243"
            stroke="#6B50B5"
            strokeWidth="4"
            strokeDasharray={totalLength}
            strokeDashoffset={dashOffset}
            strokeLinecap="square"
            style={{
              transition: "stroke-dashoffset 0.5s ease",
            }}
          />
        </g>
        <defs>
          <filter
            id="progressFilter"
            x="-5"
            y="-5"
            width="390"
            height="43"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="2"
              floodColor="#6B50B5"
              floodOpacity="0.5"
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}

export default ProgressDays
