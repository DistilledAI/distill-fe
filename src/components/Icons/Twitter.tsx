import { IconProps } from "types/icons"

export const TwitterIcon = ({ size = 19, color = "#545454" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 19 18"
      fill="none"
    >
      <path
        d="M14.7033 0.875H17.4599L11.4374 7.75833L18.5224 17.125H12.9749L8.62992 11.4442L3.65825 17.125H0.899922L7.34159 9.7625L0.544922 0.875H6.23326L10.1608 6.0675L14.7033 0.875ZM13.7358 15.475H15.2633L5.40326 2.43833H3.76409L13.7358 15.475Z"
        fill={color}
      />
    </svg>
  )
}

export const TwitterOnlineIcon = () => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.2052 2.375H17.9619L11.9394 9.25833L19.0244 18.625H13.4769L9.13188 12.9442L4.16021 18.625H1.40187L7.84354 11.2625L1.04688 2.375H6.73521L10.6627 7.5675L15.2052 2.375ZM14.2377 16.975H15.7652L5.90521 3.93833H4.26604L14.2377 16.975Z"
        fill="#545454"
      />
      <g filter="url(#filter0_d_3429_34298)">
        <path
          d="M10 10.5C10 7.73858 12.2386 5.5 15 5.5C17.7614 5.5 20 7.73858 20 10.5C20 13.2614 17.7614 15.5 15 15.5C12.2386 15.5 10 13.2614 10 10.5Z"
          fill="#34C759"
        />
        <path
          d="M10.5 10.5C10.5 8.01472 12.5147 6 15 6C17.4853 6 19.5 8.01472 19.5 10.5C19.5 12.9853 17.4853 15 15 15C12.5147 15 10.5 12.9853 10.5 10.5Z"
          stroke="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3429_34298"
          x="9"
          y="4.5"
          width="12"
          height="12"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3429_34298"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3429_34298"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}
