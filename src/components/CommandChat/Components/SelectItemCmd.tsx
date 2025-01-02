import { ArrowButtonFilledIcon } from "@components/Icons/Arrow"
import useOutsideClick from "@hooks/useOutSideClick"
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react"
import { useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

export interface IItemSelect {
  id: number
  value: any
  title: string
}

interface ISelectItemCmd {
  list: IItemSelect[]
  value: number
  onChangeValue: (item: IItemSelect) => void
}

const SelectItemCmd: React.FC<ISelectItemCmd> = ({
  list,
  value,
  onChangeValue,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const refTrigger = useRef<any>()
  useOutsideClick(refTrigger, () => setIsOpen(false))
  const itemActive = list.find((item) => item.value === value)
  const hasActive = (id: number) => itemActive?.id === id

  return (
    <Popover isOpen={isOpen} placement="top">
      <PopoverTrigger>
        <Button
          ref={refTrigger}
          onClick={() => setIsOpen(true)}
          className="h-9 rounded-lg bg-mercury-300 px-2"
        >
          <span className="font-semibold">{itemActive?.title}</span>
          <ArrowButtonFilledIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="min-w-[150px] py-1">
          {list.map((item) => (
            <div
              className={twMerge(
                "mb-[1px] flex cursor-pointer items-center gap-2 rounded-md px-1 py-1 duration-300 last:mb-0 hover:bg-mercury-50",
                hasActive(item.id) && "bg-mercury-100",
              )}
              onClick={() => {
                onChangeValue(item)
                setIsOpen(false)
              }}
            >
              <span className="font-medium">{item.title}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default SelectItemCmd
