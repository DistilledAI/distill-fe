import { EditPenFilledIcon } from "@components/Icons/Edit"
import { Button } from "@nextui-org/react"
import { useRef } from "react"

const AgentDescription = () => {
  const descRef = useRef<any>()

  const handleUpdate = async () => {}

  const handleFocus = () => {
    descRef.current.focus()
    const range = document.createRange()
    const selection = window.getSelection()
    if (!selection) return
    range.selectNodeContents(descRef.current)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault()
      descRef.current.blur()
    }
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-mercury-600">Description:</span>
      <div className="flex items-center gap-2">
        <span
          ref={descRef}
          onBlur={handleUpdate}
          onKeyDown={handleKeyDown}
          className="line-clamp-1 block max-w-52 text-ellipsis whitespace-nowrap text-mercury-900 focus:border-none focus:outline-none"
        >
          -
        </span>
        <Button
          onPress={handleFocus}
          className="h-auto w-auto min-w-0 bg-transparent p-0"
        >
          <EditPenFilledIcon />
        </Button>
      </div>
    </div>
  )
}

export default AgentDescription
