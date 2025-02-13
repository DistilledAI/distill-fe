import AvatarCustom from "@components/AvatarCustom"
import useStakerInfo from "@pages/Dao/CreateProposal/useStakerInfo"
import { useWallet } from "@solana/wallet-adapter-react"
import { centerTextEllipsis } from "@utils/index"
import useTotalStakeAll from "./useTotalStakeAll"

const VotePower = () => {
  const { totalUserStake } = useStakerInfo()
  const { totalStakeAll } = useTotalStakeAll()
  const { publicKey } = useWallet()

  const votePower =
    totalStakeAll === 0 ? 0 : (totalUserStake / totalStakeAll) * 100

  if (totalUserStake === 0) return null

  return (
    <div className="mt-4 rounded-xl bg-mercury-70 p-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <AvatarCustom
            className="h-6 w-6"
            publicAddress={publicKey?.toBase58()}
          />
          <p className="text-14 font-medium leading-3">
            {centerTextEllipsis(publicKey?.toBase58() || "")}
          </p>
        </div>
        <div>
          <p className="text-14 font-medium">
            Voting power:{" "}
            <span className="text-orange-500">{+votePower.toFixed(6)}%</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default VotePower
