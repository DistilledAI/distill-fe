import { daoIcon } from "@assets/svg"
import { PATH_NAMES } from "@constants/index"
import { Button } from "@nextui-org/react"
import { StakeTokenAddress } from "@pages/Stake"
import { getInfoTokenByAddress } from "@pages/Stake/helpers"
import { useNavigate } from "react-router-dom"

interface Props {
  address: StakeTokenAddress | null
}

const DaoButton = ({ address }: Props) => {
  const navigate = useNavigate()
  if (!address) return null

  const tokenInfo = getInfoTokenByAddress(address)
  if (!tokenInfo) return null

  return (
    <Button
      onPress={() =>
        navigate(`${PATH_NAMES.DAO}/${tokenInfo.address}/proposals`, {
          state: { isHistory: "true" },
        })
      }
      className="h-11 w-full rounded-full bg-mercury-70 text-mercury-950"
    >
      <div>
        <img src={daoIcon} />
      </div>
      <span className="text-base text-mercury-950">DAO</span>
    </Button>
  )
}

export default DaoButton
