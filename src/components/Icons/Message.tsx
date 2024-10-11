import { IconProps } from "types/icons"

export const MessageDots = ({ size = 20, color = "#545454" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M10 9.16683V9.17516M6.66667 9.16683V9.17516M13.3333 9.16683V9.17516M15 3.3335C15.663 3.3335 16.2989 3.59689 16.7678 4.06573C17.2366 4.53457 17.5 5.17045 17.5 5.8335V12.5002C17.5 13.1632 17.2366 13.7991 16.7678 14.2679C16.2989 14.7368 15.663 15.0002 15 15.0002H10.8333L6.66667 17.5002V15.0002H5C4.33696 15.0002 3.70107 14.7368 3.23223 14.2679C2.76339 13.7991 2.5 13.1632 2.5 12.5002V5.8335C2.5 5.17045 2.76339 4.53457 3.23223 4.06573C3.70107 3.59689 4.33696 3.3335 5 3.3335H15Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
