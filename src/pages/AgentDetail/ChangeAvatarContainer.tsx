import { Upload, UploadFile, UploadProps } from "antd"
import { useState } from "react"
import { toast } from "react-toastify"

const maxSizeUpload = 50

const ChangeAvatarContainer: React.FC<{
  children: React.ReactNode
  handleUpload: (file: File) => void
  accept?: string
}> = ({ children, handleUpload, accept = "image/*" }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleChange: UploadProps["onChange"] = ({ fileList }) => {
    const newFileList = fileList.filter((item) => item.status !== undefined)
    const fileListDone = newFileList.filter((item) => item?.status === "done")
    const newFileListDone = fileListDone.map((item) => item?.response?.id)
    console.log("🚀 ~ newFileListDone:", newFileListDone)
    // setValue(fieldkey, newFileListDone)
    setFileList(newFileList)
  }

  const handleCustomRequest = async (options: any) => {
    const { file } = options
    handleUpload(file)
    // try {
    //   const response = await uploadMyData(formData)
    //   if (response) {
    //     onSuccess(response?.data?.[0])
    //     setValue("avatar", response?.data?.[0]?.value)
    //   }
    // } catch (error) {
    //   console.error(error)
    //   onError(error)
    //   toast.error(`${file.name} failed to upload.`)
    // }
  }

  const beforeUpload = async (file: any) => {
    const isLtSize = file.size / 1024 / 1024 < maxSizeUpload
    if (!isLtSize) {
      toast.error(`The file size must be smaller than ${maxSizeUpload}MB!`)
    }

    return isLtSize
  }

  const props: UploadProps = {
    name: "file",
    onChange: handleChange,
    fileList: fileList,
    customRequest: handleCustomRequest,
    beforeUpload,
    showUploadList: false,
  }
  return (
    <Upload {...props} accept={accept}>
      {children}
    </Upload>
  )
}
export default ChangeAvatarContainer
