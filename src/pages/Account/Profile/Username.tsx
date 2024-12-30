import { EditPenFilledIcon } from "@components/Icons/Edit"
import useAuthState from "@hooks/useAuthState"
import { Button } from "@nextui-org/react"
import { IUser, updateUser as updateUserSlice } from "@reducers/userSlice"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { updateUser } from "services/user"

const AuthorUsername = () => {
  const { user } = useAuthState()
  const dispatch = useDispatch()
  const nameRef = useRef<any>()
  const [value, setValue] = useState(user?.username)

  useEffect(() => {
    setValue(user?.username)
  }, [user?.username])

  const handleUpdate = async () => {
    const MAX_LENGTH = 30
    const isSameOldName = value === user?.username
    const isOverLength = value && value.length > MAX_LENGTH
    const isNoneValue = (value && value.trim() === "") || !value
    if (isNoneValue) return setValue(user?.username)
    if (isSameOldName) return
    if (isOverLength) return toast.warning(`Max characters: ${MAX_LENGTH}`)
    dispatch(updateUserSlice({ user: { ...user, username: value } as IUser }))
    await updateUser({
      username: value,
      description: user?.description,
      avatar: user?.avatar,
    })
    toast.success("Updated successfully!")
  }

  const handleFocus = () => {
    nameRef.current.focus()
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault()
      nameRef.current.blur()
    }
  }

  const handleOnChange = (value: string) => {
    setValue(value)
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-mercury-600">Display name:</span>
      <div className="flex items-center gap-2">
        <input
          className="text-base-md max-w-36 border-none bg-transparent text-right shadow-none outline-none"
          value={value}
          onChange={(e) => handleOnChange(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={nameRef}
          onBlur={handleUpdate}
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

export default AuthorUsername
