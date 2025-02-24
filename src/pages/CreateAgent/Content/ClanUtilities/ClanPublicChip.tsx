import { WorldGlobalIcon } from "@components/Icons/World"

const ClanPublicChip = () => {
  return (
    <div className="flex items-center gap-1 rounded-full bg-[#007AFF]/15 px-2 py-1">
      <div>
        <WorldGlobalIcon size={12} color="#007AFF" />
      </div>
      <span className="text-13 font-medium text-[#007AFF]">PUBLIC</span>
    </div>
  )
}

export default ClanPublicChip
