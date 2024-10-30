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
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}