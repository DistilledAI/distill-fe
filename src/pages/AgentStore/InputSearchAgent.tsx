import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { Input } from "@nextui-org/react"

const InputSearchAgent = () => {
  return (
    <Input
      startContent={<FilledSearchIcon size={24} color="#363636" />}
      placeholder="Search Agents.."
      classNames={{
        inputWrapper: "!bg-transparent shadow-none",
        input: "text-[20px] text-mercury-950 placeholder:text-mercury-800",
      }}
    />
  )
}

export default InputSearchAgent
