import { Icon2Props } from "types/icons"

export const CollapseLeftIcon = ({
  size = 20,
  color = "#676767",
  color2 = "#545454",
}: Icon2Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M7.49967 3.33325V16.6666M3.33301 4.99992C3.33301 4.55789 3.5086 4.13397 3.82116 3.82141C4.13372 3.50885 4.55765 3.33325 4.99967 3.33325H14.9997C15.4417 3.33325 15.8656 3.50885 16.1782 3.82141C16.4907 4.13397 16.6663 4.55789 16.6663 4.99992V14.9999C16.6663 15.4419 16.4907 15.8659 16.1782 16.1784C15.8656 16.491 15.4417 16.6666 14.9997 16.6666H4.99967C4.55765 16.6666 4.13372 16.491 3.82116 16.1784C3.5086 15.8659 3.33301 15.4419 3.33301 14.9999V4.99992Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.4997 8.33325L10.833 9.99992L12.4997 11.6666"
        stroke={color2}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
