import { EditPenFilledIcon } from "@components/Icons/Edit"
import useAuthState from "@hooks/useAuthState"
import { Button } from "@nextui-org/react"
import { IUser, updateUser as updateUserSlice } from "@reducers/userSlice"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { updateUser } from "services/user"

const AuthorDescription = () => {
  const { user } = useAuthState()
  const dispatch = useDispatch()
  const descriptionRef = useRef<any>()
  const [value, setValue] = useState("-")

  useEffect(() => {
    setValue(user?.description || "-")
  }, [user?.description])

  const handleUpdate = async () => {
    const MAX_LENGTH = 500
    const isSameOldDesc = value === user?.description
    const isOverLength = value && value.length > MAX_LENGTH
    if (isSameOldDesc) return
    if (isOverLength) return toast.warning(`Max length ${MAX_LENGTH}`)

    dispatch(
      updateUserSlice({ user: { ...user, description: value } as IUser }),
    )
    await updateUser({
      description: value,
      username: user?.username,
      avatar: user?.avatar,
    })
    toast.success("Updated successfully!")
  }

  const handleFocus = () => {
    descriptionRef.current.focus()
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault()
      descriptionRef.current.blur()
    }
  }

  const handleOnChange = (value: string) => {
    setValue(value)
  }

  return (
    <div className="flex items-center gap-6">
      <span className="text-mercury-600">Bio:</span>
      <div className="line-clamp-2 flex flex-1 items-center justify-end gap-2">
        <textarea
          className="text-base-md w-full resize-none border-none bg-transparent text-right shadow-none outline-none"
          value={value}
          onChange={(e) => handleOnChange(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={descriptionRef}
          onBlur={handleUpdate}
          rows={2}
        />
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

export default AuthorDescription
