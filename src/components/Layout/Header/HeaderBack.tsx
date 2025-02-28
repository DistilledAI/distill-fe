import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { useNavigate } from "react-router-dom"

interface Props {
  name?: string
  onBack?: () => void
  children?: React.ReactNode
}

const HeaderBack = ({ name, onBack, children }: Props) => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }
  return (
    <div className="fixed left-3 top-2 z-[51] flex w-full items-center gap-2 md:hidden">
      <button
        onClick={handleBack}
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-mercury-70"
      >
        <div className="rotate-90">
          <ChevronDownIcon />
        </div>
      </button>
      {children ? (
        children
      ) : (
        <span className="line-clamp-1 text-16 font-bold text-mercury-950">
          {name}
        </span>
      )}
    </div>
  )
}

export default HeaderBack
