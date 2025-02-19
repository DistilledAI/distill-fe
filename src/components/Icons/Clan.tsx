import { Icon2Props } from "types/icons"

export const ClanIcon = ({
  size = 28,
  color = "#FF075A",
  color2 = "#FF9035",
}: Icon2Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 28 29"
      fill="none"
    >
      <path
        d="M14.0001 4C16.7253 6.411 20.282 7.66633 23.9168 7.5C24.446 9.30018 24.6079 11.1884 24.3929 13.0524C24.178 14.9164 23.5905 16.7181 22.6654 18.3506C21.7404 19.9831 20.4966 21.4129 19.008 22.5552C17.5194 23.6975 15.8164 24.5289 14.0001 25C12.1839 24.5289 10.4809 23.6975 8.99227 22.5552C7.50368 21.4129 6.25989 19.9831 5.33483 18.3506C4.40976 16.7181 3.82229 14.9164 3.60732 13.0524C3.39235 11.1884 3.55427 9.30018 4.08347 7.5C7.71825 7.66633 11.275 6.411 14.0001 4Z"
        stroke="url(#paint0_linear_7650_65441)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.75 14.5H19.25M14 19.75V9.25M11.375 11.875L16.625 17.125M11.375 17.125L16.625 11.875"
        stroke="url(#paint1_linear_7650_65441)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7650_65441"
          x1="3.51514"
          y1="25"
          x2="24.8626"
          y2="4.39102"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color2} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_7650_65441"
          x1="8.75"
          y1="19.75"
          x2="19.4243"
          y2="9.43025"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color2} />
        </linearGradient>
      </defs>
    </svg>
  )
}
