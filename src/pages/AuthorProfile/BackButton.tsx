import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <Button
      className="group absolute left-8 top-[22px] z-20 hidden items-center gap-x-3 bg-transparent md:flex"
      onPress={() => navigate(-1)}
    >
      <div className="rounded-full bg-transparent p-[2px] group-hover:bg-mercury-50">
        <ArrowLeftFilledIcon size={24} />
      </div>
      <span className="text-16 font-bold text-mercury-950">Back</span>
    </Button>
  )
}

export default BackButton
