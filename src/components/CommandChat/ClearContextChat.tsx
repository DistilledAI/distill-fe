import { RefreshIcon } from "@components/Icons/RefreshIcon"

const ClearContextChat = () => {
  return (
    <div className="mt-2 flex items-center justify-end gap-1">
      <div className="flex cursor-pointer items-center gap-1">
        <div>
          <RefreshIcon size={18} color="#676767" />
        </div>
        <span className="text-13 text-mercury-500 underline">
          Clear Context
        </span>
      </div>
    </div>
  )
}

export default ClearContextChat
