import { Button } from "@nextui-org/react"
import { useFormContext, useWatch } from "react-hook-form"

interface Props {
  isLoading: boolean
}

const Header = ({ isLoading }: Props) => {
  const { control } = useFormContext()
  const username = useWatch({ control, name: "username" })

  return (
    <div className="sticky top-[50px] z-10 flex items-center justify-center bg-lgd-muted-beige-2 p-3 backdrop-blur-3xl md:top-[68px]">
      <div className="flex w-full max-w-[768px] gap-2 max-md:flex-col md:items-center md:justify-between">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-24 font-semibold text-mercury-950">
            Agent Initialization
          </span>
          <span className="text-base font-medium text-brown-10">
            Your Private Agent is private to you only.
          </span>
        </div>
        <div className="flex gap-3">
          <Button
            className="h-[44px] rounded-full bg-mercury-950 text-[16px] text-mercury-30 max-md:w-full"
            type="submit"
            isLoading={isLoading}
            isDisabled={!username}
          >
            Create Private Agent
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Header
