import { EditPenFilledIcon } from "@components/Icons/Edit"
import useAuthState from "@hooks/useAuthState"
import { Button } from "@nextui-org/react"
import { IUser, updateUser as updateUserSlice } from "@reducers/userSlice"
import { useRef } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { updateUser } from "services/user"

const AgentUsername = () => {
  const { user } = useAuthState()
  const dispatch = useDispatch()
  const nameRef = useRef<any>()

  const handleUpdate = async () => {
    const username = nameRef.current.innerText
    if (username === user?.username) return
    dispatch(updateUserSlice({ user: { ...user, username } as IUser }))
    await updateUser({ username })
    toast.success("Updated successfully!")
  }

  const handleFocus = () => {
    nameRef.current.focus()
    const range = document.createRange()
    const selection = window.getSelection()
    if (!selection) return
    range.selectNodeContents(nameRef.current)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault()
      nameRef.current.blur()
    }
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-mercury-600">Name:</span>
      <div className="flex items-center gap-2">
        <span
          ref={nameRef}
          onBlur={handleUpdate}
          onKeyDown={handleKeyDown}
          className="line-clamp-1 block max-w-36 text-ellipsis whitespace-nowrap text-mercury-900 focus:border-none focus:outline-none"
        >
          {user?.username}
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

export default AgentUsername
