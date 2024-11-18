import AvatarCustom from "@components/AvatarCustom"
import { EditPenOutlineIcon } from "@components/Icons/Edit"
import useAuthState from "@hooks/useAuthState"
import useFetchMe from "@hooks/useFetchMe"
import { Button } from "@nextui-org/react"
import { useRef } from "react"
import { toast } from "react-toastify"
import { updateAvatarUser } from "services/user"

const AuthorAvatar = () => {
  const { user } = useAuthState()
  const inputRef = useRef<any>(null)
  const { fetchData } = useFetchMe(false)

  const handleUploadAvatar = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      await updateAvatarUser(formData)
      toast.success("Updated successfully!")
      fetchData()
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
      console.error(error)
    }
  }

  const onChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) handleUploadAvatar(file)
  }

  return (
    <div className="relative flex items-center gap-1">
      <AvatarCustom src={user?.avatar} publicAddress={user?.publicAddress} />
      <Button
        onClick={() => inputRef.current?.click()}
        className="absolute -bottom-1 -right-1 flex h-5 w-5 min-w-0 items-center justify-center rounded-full bg-white p-0"
      >
        <EditPenOutlineIcon />
      </Button>
      <input
        onChange={onChangeAvatar}
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/*"
      />
    </div>
  )
}

export default AuthorAvatar
