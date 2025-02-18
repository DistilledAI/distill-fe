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
    <div
      onClick={() => inputRef.current?.click()}
      className="relative flex cursor-pointer items-center gap-1"
    >
      <AvatarCustom
        className="h-[70px] w-[70px]"
        src={user?.avatar}
        publicAddress={user?.publicAddress}
      />
      <Button
        onPress={() => inputRef.current?.click()}
        className="absolute -bottom-[2px] -right-[2px] flex h-6 w-6 min-w-0 items-center justify-center rounded-full bg-white p-0"
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
