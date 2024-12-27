import { BgIconProps, IconProps } from "types/icons"

export const ArrowUpFilledIcon = ({
  size = 20,
  color = "#545454",
  bgColor = "#FAFAFA",
}: BgIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_215_2516"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={size}
        height={size}
      >
        <path
          d="M10 4.16675V15.8334M10 4.16675L15 9.16675M10 4.16675L5 9.16675"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_215_2516)">
        <rect width={size} height={size} fill={bgColor} />
      </g>
    </svg>
  )
}

export const ArrowLeftFilledIcon = ({
  size = 20,
  color = "#676767",
}: BgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M7.97508 4.94141L2.91675 9.99974L7.97508 15.0581"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.0834 10H3.05835"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ArrowBottomSquareOutlineIcon = ({
  size = 12,
  color = "#545454",
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M4 6L6 8M6 8L8 6M6 8V4"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 1.5C9.6 1.5 10.5 2.4 10.5 6C10.5 9.6 9.6 10.5 6 10.5C2.4 10.5 1.5 9.6 1.5 6C1.5 2.4 2.4 1.5 6 1.5Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ArrowsSort = ({ size = 21, color = "#545454" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        d="M3 7.49984L6.33333 4.1665M6.33333 4.1665L9.66667 7.49984M6.33333 4.1665V15.8332M18 12.4998L14.6667 15.8332M14.6667 15.8332L11.3333 12.4998M14.6667 15.8332V4.1665"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ArrowsBarToUpIcon = ({
  size = 24,
  color = "#545454",
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M12.5 10.5V20.5M12.5 10.5L16.5 14.5M12.5 10.5L8.5 14.5M4.5 4.5H20.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ArrowsMaximizeIcon = ({
  size = 24,
  color = "#545454",
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M16 4H20M20 4V8M20 4L14 10M8 20H4M4 20V16M4 20L10 14M16 20H20M20 20V16M20 20L14 14M8 4H4M4 4V8M4 4L10 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ArrowRightIcon = ({ size = 20, color = "#545454" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 21"
      fill="none"
    >
      <path
        d="M7.5 5.5L12.5 10.5L7.5 15.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ArrowsTargetIcon = ({
  size = 16,
  color = "#545454",
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M7.33203 7.99992C7.33203 8.17673 7.40227 8.3463 7.52729 8.47132C7.65232 8.59635 7.82189 8.66658 7.9987 8.66658C8.17551 8.66658 8.34508 8.59635 8.4701 8.47132C8.59513 8.3463 8.66536 8.17673 8.66536 7.99992C8.66536 7.82311 8.59513 7.65354 8.4701 7.52851C8.34508 7.40349 8.17551 7.33325 7.9987 7.33325C7.82189 7.33325 7.65232 7.40349 7.52729 7.52851C7.40227 7.65354 7.33203 7.82311 7.33203 7.99992Z"
        fill="#676767"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.9974 4.66675C7.33813 4.66675 6.69366 4.86224 6.1455 5.22852C5.59733 5.59479 5.17009 6.11538 4.9178 6.72447C4.66551 7.33356 4.5995 8.00378 4.72811 8.65038C4.85673 9.29699 5.1742 9.89093 5.64037 10.3571C6.10655 10.8233 6.70049 11.1407 7.3471 11.2694C7.9937 11.398 8.66392 11.332 9.27301 11.0797C9.8821 10.8274 10.4027 10.4001 10.769 9.85198C11.1352 9.30382 11.3307 8.65935 11.3307 8.00008"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.66503 2.03668C7.42907 1.89802 6.18057 2.14687 5.09223 2.74879C4.00389 3.35072 3.12949 4.27598 2.58999 5.39659C2.05049 6.51719 1.87256 7.77775 2.0808 9.0039C2.28905 10.2301 2.87318 11.3612 3.75239 12.2408C4.6316 13.1205 5.76245 13.7052 6.98849 13.9141C8.21454 14.1229 9.47519 13.9456 10.5961 13.4067C11.7169 12.8678 12.6426 11.9938 13.2451 10.9058C13.8476 9.81775 14.0971 8.56937 13.959 7.33335"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 6V4L12 2V4H14L12 6H10ZM10 6L8 8"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ArrowsRelyIcon = ({ size = 20, color = "#545454" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M15.0013 15V9.99996C15.0013 9.33692 14.7379 8.70103 14.2691 8.23219C13.8002 7.76335 13.1643 7.49996 12.5013 7.49996H4.16797M4.16797 7.49996L7.5013 4.16663M4.16797 7.49996L7.5013 10.8333"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ArrowsLeftIcon = ({ size = 20, color = "#E8E9EE" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.7501 19.2071C16.1406 18.8166 16.1406 18.1834 15.7501 17.7929L9.95718 12L15.7501 6.20711C16.1406 5.81658 16.1406 5.18342 15.7501 4.79289C15.3596 4.40237 14.7264 4.40237 14.3359 4.79289L8.54297 10.5858C7.76192 11.3668 7.76192 12.6332 8.54297 13.4142L14.3359 19.2071C14.7264 19.5976 15.3596 19.5976 15.7501 19.2071Z"
        fill={color}
      />
    </svg>
  )
}

export const ArrowButtonFilledIcon = ({
  size = 16,
  color = "#545454",
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 13 12"
      fill="none"
    >
      <path
        d="M9.499 4.5C9.925 4.5 10.1475 4.993 9.8905 5.3115L9.8525 5.3535L6.8525 8.3535C6.7664 8.43959 6.65185 8.4913 6.53034 8.49894C6.40883 8.50658 6.2887 8.46963 6.1925 8.395L6.1455 8.3535L3.1455 5.3535L3.104 5.3065L3.077 5.268L3.05 5.22L3.0415 5.202L3.028 5.1685L3.012 5.1145L3.007 5.088L3.002 5.058L3 5.0295V4.9705L3.0025 4.9415L3.007 4.9115L3.012 4.8855L3.028 4.8315L3.0415 4.798L3.0765 4.732L3.109 4.687L3.1455 4.6465L3.1925 4.605L3.231 4.578L3.279 4.551L3.297 4.5425L3.3305 4.529L3.3845 4.513L3.411 4.508L3.441 4.503L3.4695 4.501L9.499 4.5Z"
        fill={color}
      />
    </svg>
  )
}

export const ArrowsRightIcon = ({
  size = 20,
  color = "#E8E9EE",
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.24992 4.7929C7.8594 5.18342 7.8594 5.81658 8.24992 6.20711L14.0428 12L8.24992 17.7929C7.8594 18.1834 7.8594 18.8166 8.24992 19.2071C8.64045 19.5976 9.27361 19.5976 9.66413 19.2071L15.457 13.4142C16.2381 12.6332 16.2381 11.3668 15.457 10.5858L9.66414 4.7929C9.27361 4.40237 8.64045 4.40237 8.24992 4.7929Z"
        fill={color}
      />
    </svg>
  )
}
