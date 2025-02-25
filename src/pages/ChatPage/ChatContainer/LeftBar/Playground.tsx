import { FilledWindowIcon } from "@components/Icons/FilledWindowIcon"
import { useAppSelector } from "@hooks/useAppRedux"
import { Button } from "@nextui-org/react"
import { twMerge } from "tailwind-merge"

const Playground = () => {
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)

  return (
    <Button
      isDisabled
      className={twMerge(
        "btn-primary min-h-[60px]",
        sidebarCollapsed && "min-h-14 min-w-14",
      )}
    >
      <div>
        <FilledWindowIcon />
      </div>
      <span
        className={twMerge(
          "text-[16px] text-mercury-900",
          sidebarCollapsed && "hidden",
        )}
      >
        Playground
      </span>
    </Button>
  )
}
export default Playground
