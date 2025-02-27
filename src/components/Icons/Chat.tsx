import { IconProps } from "types/icons"

export const ChatResumeIcon = ({ size = 20, color = "#545454" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 21"
      fill="none"
    >
      <path
        d="M10.005 17.15C8.76266 17.1514 7.53603 16.8723 6.41667 16.3333L2.5 17.1667L3.58333 13.9167C1.64667 11.0525 2.395 7.35668 5.33333 5.27168C8.27167 3.18751 12.4917 3.35835 15.2042 5.67168C16.865 7.08835 17.6458 9.03918 17.4925 10.9583M15.8333 13.8333V18.8333M15.8333 18.8333L18.3333 16.3333M15.8333 18.8333L13.3333 16.3333"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ChatIcon = ({ size = 20, color = "#fafafa" }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_2657_20675"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={size}
        height={size}
      >
        <path
          d="M10.5 9.16683V9.17516M7.16667 9.16683V9.17516M13.8333 9.16683V9.17516M15.5 3.3335C16.163 3.3335 16.7989 3.59689 17.2678 4.06573C17.7366 4.53457 18 5.17045 18 5.8335V12.5002C18 13.1632 17.7366 13.7991 17.2678 14.2679C16.7989 14.7368 16.163 15.0002 15.5 15.0002H11.3333L7.16667 17.5002V15.0002H5.5C4.83696 15.0002 4.20107 14.7368 3.73223 14.2679C3.26339 13.7991 3 13.1632 3 12.5002V5.8335C3 5.17045 3.26339 4.53457 3.73223 4.06573C4.20107 3.59689 4.83696 3.3335 5.5 3.3335H15.5Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_2657_20675)">
        <rect x="0.5" width="20" height="20" fill={color} />
      </g>
    </svg>
  )
}
