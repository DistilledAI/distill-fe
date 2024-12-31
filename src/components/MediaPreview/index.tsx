import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import ReactDOM from "react-dom"
import { QueryDataKeys } from "types/queryDataKeys"

const MediaPreview = () => {
  const queryClient = useQueryClient()
  const { data: mediaUrl } = useQuery({
    initialData: "",
    queryKey: [QueryDataKeys.MEDIA_PREVIEW],
    staleTime: 0,
  })

  if (!mediaUrl) return null

  const onClose = () => {
    queryClient.setQueryData([QueryDataKeys.MEDIA_PREVIEW], () => "")
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[100] flex h-full w-full items-center">
      <div
        onClick={onClose}
        className="absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.7)]"
      />
      <img
        className="relative m-auto max-h-[calc(100dvh-40px)] min-h-[200px] min-w-[200px] max-w-[calc(100dvw-40px)] object-cover"
        alt="view"
        src={mediaUrl}
      />
      <button
        type="button"
        className="absolute right-5 top-5 rounded-full bg-white p-2 sm:right-2 sm:top-2"
        onClick={onClose}
      >
        <CloseFilledIcon />
      </button>
    </div>,
    document.body,
    QueryDataKeys.MEDIA_PREVIEW,
  )
}

export default MediaPreview
