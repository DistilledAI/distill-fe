import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { Button, Input, Modal, ModalContent, Textarea } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import AuthorAvatar from "./AuthorAvatar"
import useAuthState from "@hooks/useAuthState"
import { useDispatch } from "react-redux"
import { IUser, updateUser as updateUserSlice } from "@reducers/userSlice"
import { updateUser } from "services/user"
import { toast } from "react-toastify"

const NAME_MAX_LENGTH = 30
const DESC_MAX_LENGTH = 500

const EditProfile: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const { user } = useAuthState()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [description, setDescription] = useState("-")
  const [username, setUsername] = useState(user?.username)

  useEffect(() => {
    setDescription(user?.description || "-")
    setUsername(user?.username)
  }, [user?.description, user?.username])

  const handleUpdate = async () => {
    try {
      if (loading) return
      setLoading(true)
      const isOverLengthName = username && username.length > NAME_MAX_LENGTH
      const isOverLengthDesc =
        description && description.length > DESC_MAX_LENGTH
      if (isOverLengthName)
        return toast.warning(`Max length username: ${NAME_MAX_LENGTH}`)
      if (isOverLengthDesc)
        return toast.warning(`Max length description: ${DESC_MAX_LENGTH}`)

      dispatch(
        updateUserSlice({ user: { ...user, description, username } as IUser }),
      )
      await updateUser({
        description,
        username,
        avatar: user?.avatar,
      })
      toast.success("Updated successfully!")
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      classNames={{
        base: "bg-mercury-100 py-6 max-md:py-4",
        wrapper: "z-[99]",
        backdrop: "z-[99]",
      }}
      size="lg"
      backdrop="blur"
    >
      <ModalContent>
        <div className="px-4">
          <div className="flex items-center justify-between">
            <p className="text-20 font-semibold">Edit Profile</p>
            <div onClick={onClose} className="cursor-pointer">
              <CloseFilledIcon />
            </div>
          </div>
          <div className="mb-4 mt-2 flex items-center justify-center">
            <AuthorAvatar />
          </div>
          <div className="rounded-[22px] border-1 border-mercury-100 bg-mercury-70 p-4">
            <div>
              <p className="mb-1 font-medium">
                Profile Name<span className="text-red-500">*</span>
              </p>
              <Input
                value={username}
                onValueChange={setUsername}
                classNames={{
                  inputWrapper:
                    "border-1 rounded-[8px] border-mercury-400 bg-white",
                }}
                placeholder="Enter profile name"
              />
            </div>
            <div className="mt-3">
              <p className="mb-1 font-medium">Bio</p>
              <Textarea
                value={description}
                onValueChange={setDescription}
                classNames={{
                  inputWrapper:
                    "border-1 rounded-[8px] border-mercury-400 bg-white",
                }}
                rows={3}
                placeholder="Enter bio"
              />
            </div>
          </div>
          <Button
            isLoading={loading}
            onPress={handleUpdate}
            className="mt-5 h-[50px] w-full rounded-full bg-mercury-950 font-semibold text-white"
          >
            Save
          </Button>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default EditProfile
