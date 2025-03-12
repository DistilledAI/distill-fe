import { arrowTrendImg, vaultButtonBg } from "@assets/images"
import { PATH_NAMES } from "@constants/index"
import { StakeTokenAddress } from "@pages/Stake"
import { getInfoTokenByAddress } from "@pages/Stake/helpers"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"

interface Props {
  address: StakeTokenAddress | null
  className?: string
}

const VaultButton = ({ address, className }: Props) => {
  const navigate = useNavigate()

  if (!address) return null

  const tokenInfo = getInfoTokenByAddress(address)
  if (!tokenInfo) return null

  const avatarUrl = tokenInfo.avatar2 || tokenInfo.avatar
  const vaultPath = `${PATH_NAMES.STAKING}?token=${tokenInfo.address}`

  return (
    <button
      onClick={() => navigate(vaultPath, { state: { isHistory: "true" } })}
      type="button"
      className={twMerge(
        "mt-3 flex w-full cursor-pointer items-center justify-between rounded-full bg-[rgba(52,54,54,0.7)] backdrop-blur-[10px]",
        className,
      )}
    >
      <div
        className="flex h-11 w-full items-center rounded-full bg-center bg-no-repeat px-[6px] md:gap-[54px]"
        style={{
          backgroundImage: `url(${vaultButtonBg})`,
          backgroundSize: "105% 105%",
        }}
      >
        <div className="relative">
          <img
            src={avatarUrl}
            alt={`${tokenInfo.label} avatar`}
            className="h-8 w-8 rounded-full bg-cover"
            loading="lazy"
          />
          <img
            src={arrowTrendImg}
            alt="trend icon"
            className="absolute -right-2 bottom-0 h-5 w-5"
          />
        </div>

        <span
          className="w-full text-ellipsis text-16 font-extrabold italic text-white md:w-auto"
          style={{ textShadow: "0px 0px 10px rgba(255, 255, 255, 0.20)" }}
        >
          <span className="hidden bg-lgd-golden-glow bg-clip-text text-transparent md:inline">
            {tokenInfo.label}'s{" "}
          </span>
          Vault
        </span>
      </div>
    </button>
  )
}

export default VaultButton
