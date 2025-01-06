import { Icon2Props } from "types/icons"

export const BroadcastIcon = ({
  size = 16,
  color = "#F5DCE2",
  color2 = "#F4E7DC",
}: Icon2Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 17"
      fill="none"
    >
      <path
        d="M12.2427 13.4094C13.0818 12.5702 13.6532 11.5011 13.8847 10.3373C14.1162 9.17338 13.9974 7.96698 13.5433 6.87063C13.0891 5.77428 12.3201 4.83721 11.3334 4.17793C10.3467 3.51864 9.18669 3.16675 8 3.16675C6.81332 3.16675 5.65328 3.51864 4.66659 4.17793C3.6799 4.83721 2.91086 5.77428 2.45673 6.87063C2.0026 7.96698 1.88378 9.17338 2.11529 10.3373C2.34679 11.5011 2.91823 12.5702 3.75734 13.4094"
        stroke="url(#paint0_linear_5050_44164)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.3586 11.524C10.8247 11.0578 11.1421 10.4639 11.2707 9.81729C11.3992 9.17072 11.3331 8.50054 11.0808 7.8915C10.8285 7.28247 10.4013 6.76192 9.85311 6.39569C9.30497 6.02946 8.66054 5.83398 8.0013 5.83398C7.34207 5.83398 6.69764 6.02946 6.14949 6.39569C5.60135 6.76192 5.17411 7.28247 4.92179 7.8915C4.66947 8.50054 4.60341 9.17072 4.73196 9.81729C4.8605 10.4639 5.17788 11.0578 5.64397 11.524"
        stroke="url(#paint1_linear_5050_44164)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.33203 9.16667C7.33203 9.34348 7.40227 9.51305 7.52729 9.63807C7.65232 9.7631 7.82189 9.83333 7.9987 9.83333C8.17551 9.83333 8.34508 9.7631 8.4701 9.63807C8.59513 9.51305 8.66536 9.34348 8.66536 9.16667C8.66536 8.98986 8.59513 8.82029 8.4701 8.69526C8.34508 8.57024 8.17551 8.5 7.9987 8.5C7.82189 8.5 7.65232 8.57024 7.52729 8.69526C7.40227 8.82029 7.33203 8.98986 7.33203 9.16667Z"
        stroke="url(#paint2_linear_5050_44164)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_5050_44164"
          x1="2"
          y1="8.28806"
          x2="11.197"
          y2="3.2107"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color2} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_5050_44164"
          x1="4.66797"
          y1="8.67901"
          x2="9.77726"
          y2="5.85818"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color2} />
        </linearGradient>
        <linearGradient
          id="paint2_linear_5050_44164"
          x1="7.33203"
          y1="9.16667"
          x2="8.4231"
          y2="8.65254"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color2} />
        </linearGradient>
      </defs>
    </svg>
  )
}
