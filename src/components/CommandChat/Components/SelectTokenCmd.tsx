import { ArrowButtonFilledIcon } from "@components/Icons/Arrow"
import { CoinGeckoId } from "@hooks/useCoingecko"
import useOutsideClick from "@hooks/useOutSideClick"
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react"
import { useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

export interface IToken {
  id: string | number
  avatar: string
  title: string
  coinGeckoId: CoinGeckoId
}

interface ISelectTokenCmd {
  list: IToken[]
  value: number | string
  onChangeValue: (item: IToken) => void
}

const SelectTokenCmd: React.FC<ISelectTokenCmd> = ({
  list,
  value,
  onChangeValue,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const itemActive = list.find((item) => item.id === value)
  const hasActive = (id: string | number) => itemActive?.id === id
  const refTrigger = useRef<any>()
  useOutsideClick(refTrigger, () => setIsOpen(false))

  return (
    <Popover isOpen={isOpen} placement="top">
      <PopoverTrigger>
        <Button
          ref={refTrigger}
          onClick={() => setIsOpen(true)}
          className="h-9 rounded-lg bg-mercury-300 px-2"
        >
          <img className="h-5 w-5 rounded-full" src={itemActive?.avatar} />
          <span className="font-semibold">{itemActive?.title}</span>
          <ArrowButtonFilledIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="min-w-[150px] py-1">
          {list.map((item) => (
            <div
              key={item.id}
              className={twMerge(
                "mb-[1px] flex cursor-pointer items-center gap-2 rounded-md px-1 py-1 duration-300 last:mb-0 hover:bg-mercury-50",
                hasActive(item.id) && "bg-mercury-100",
              )}
              onClick={() => {
                onChangeValue(item)
                setIsOpen(false)
              }}
            >
              <img
                className="h-6 w-6 rounded-full object-cover"
                src={item.avatar}
              />
              <span className="font-medium">{item.title}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default SelectTokenCmd
