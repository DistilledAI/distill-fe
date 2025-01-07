import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import { LIST_TOKEN_STAKE, StakeTokenAddress } from ".."
import { useNavigate, useSearchParams } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"
import { getInfoTokenByAddress } from "../helpers"

const SelectToken = () => {
  const [searchParams] = useSearchParams()
  const tokenAddress = searchParams.get("token")
  const navigate = useNavigate()
  const tokenInfo = getInfoTokenByAddress(tokenAddress as StakeTokenAddress)

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="flex h-[46px] items-center gap-1 rounded-full bg-mercury-100 px-2">
          <img
            className="h-8 w-8 rounded-full object-cover"
            src={tokenInfo?.avatar}
          />
          <span>{tokenInfo?.tokenName}</span>
          <ChevronDownIcon size={18} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {LIST_TOKEN_STAKE.map((item) => (
          <DropdownItem
            onClick={() =>
              navigate(`${PATH_NAMES.STAKING}?token=${item.address}`)
            }
            key={item.address}
          >
            <div className="flex items-center gap-2">
              <img
                src={item.avatar}
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="font-semibold">{item.tokenName}</span>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default SelectToken
