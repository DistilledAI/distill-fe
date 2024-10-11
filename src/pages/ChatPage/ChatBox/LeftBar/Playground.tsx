import { FilledWindowIcon } from "@components/Icons/FilledWindowIcon"
import { Button } from "@nextui-org/react"

const Playground = () => {
  return (
    <Button isDisabled className="btn-primary min-h-[60px]">
      <div>
        <FilledWindowIcon />
      </div>
      Playground
    </Button>
  )
}
export default Playground
