import { arrowTrendImg, vaultButtonBg } from "@assets/images"
import { PATH_NAMES } from "@constants/index"
import { StakeTokenAddress } from "@pages/Stake"
import { getInfoTokenByAddress } from "@pages/Stake/helpers"
import { useNavigate } from "react-router-dom"

interface Props {
  address: StakeTokenAddress | null
}

const VaultButton = ({ address }: Props) => {
  const navigate = useNavigate()

  if (!address) return null

  const tokenInfo = getInfoTokenByAddress(address)
  if (!tokenInfo) return null

  const avatarUrl = tokenInfo.avatar2 || tokenInfo.avatar
  const vaultPath = `${PATH_NAMES.STAKING}?token=${tokenInfo.address}`

  return (
    <button
      onClick={() => navigate(vaultPath)}
      type="button"
      className="mt-3 flex cursor-pointer items-center justify-between rounded-full bg-[rgba(52,54,54,0.7)] backdrop-blur-[10px]"
    >
      <div
        className="flex h-12 w-full items-center gap-10 rounded-full bg-center bg-no-repeat px-3"
        style={{
          backgroundImage: `url(${vaultButtonBg})`,
          backgroundSize: "105% 105%",
        }}
      >
        <div className="relative">
          <img
            src={avatarUrl}
            alt={`${tokenInfo.label} avatar`}
            className="h-9 w-9 rounded-full bg-cover"
            loading="lazy"
          />
          <img
            src={arrowTrendImg}
            alt="trend icon"
            className="absolute -right-2 bottom-0 h-5 w-5"
          />
        </div>

        <span
          className="text-ellipsis text-16 font-extrabold italic text-white"
          style={{ textShadow: "0px 0px 10px rgba(255, 255, 255, 0.20)" }}
        >
          <span className="bg-lgd-golden-glow bg-clip-text text-transparent">
            {tokenInfo.label}'s{" "}
          </span>
          Vault
        </span>
      </div>
    </button>
  )
}

export default VaultButton
