import { twMerge } from "tailwind-merge"

const ActiveEffect: React.FC<{ isActive: boolean; className?: string }> = ({
  isActive,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "absolute -left-[17px] top-1/2 w-[5px] -translate-y-1/2 bg-lgd-code-agent-1 opacity-0 transition-all duration-300 ease-linear",
        className,
        !isActive &&
          "h-3 rounded-br-lg rounded-tr-lg group-hover/item:opacity-100",
        isActive && "block h-10 rounded-br-full rounded-tr-full opacity-100",
      )}
    />
  )
}
export default ActiveEffect
