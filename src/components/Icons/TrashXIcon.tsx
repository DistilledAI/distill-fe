import { IconProps } from "types/icons"

export const TrashXIcon = ({ size = 25, color = "#FF3B30" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M4.5 7H20.5M5.5 7L6.5 19C6.5 19.5304 6.71071 20.0391 7.08579 20.4142C7.46086 20.7893 7.96957 21 8.5 21H16.5C17.0304 21 17.5391 20.7893 17.9142 20.4142C18.2893 20.0391 18.5 19.5304 18.5 19L19.5 7M9.5 7V4C9.5 3.73478 9.60536 3.48043 9.79289 3.29289C9.98043 3.10536 10.2348 3 10.5 3H14.5C14.7652 3 15.0196 3.10536 15.2071 3.29289C15.3946 3.48043 15.5 3.73478 15.5 4V7M10.5 12L14.5 16M14.5 12L10.5 16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
