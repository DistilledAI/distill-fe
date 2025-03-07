import { PlusIcon } from "@components/Icons/Plus"
import { Spinner } from "@nextui-org/react"
import type { UploadFile, UploadProps } from "antd"
import { Upload } from "antd"
import React, { useState } from "react"
import { toast } from "react-toastify"
import { uploadMyData } from "services/user"
import styled from "styled-components"

interface UploadCustomProps {
  fileKey: string
  icon?: any
  label?: string
  accept?: string
  maxCount?: number
  multiple?: boolean
  moreCustomRequest?: any
  children?: React.ReactNode
  containerClassName?: string
  description?: string
}

const maxSizeUpload = 20

const FILE_UPLOAD_STATUS = {
  UPLOADING: "uploading",
  ERROR: "error",
  DONE: "done",
} as any

const UploadCommon: React.FC<UploadCustomProps> = ({
  fileKey,
  accept = "application/pdf,.txt",
  multiple,
  moreCustomRequest,
}) => {
  const [loading, setLoading] = useState(false)
  const [fileListValue, setFileList] = useState<UploadFile[]>([])

  const handleChange: UploadProps["onChange"] = async ({ fileList }) => {
    const newFileList = fileList.filter((item) => item.status !== undefined)
    const fileListDone = newFileList?.filter(
      (item) => item?.status === FILE_UPLOAD_STATUS.DONE,
    )
    setFileList(newFileList)

    const isExistfileListUploading = newFileList
      ?.map((item) => item?.status)
      ?.includes(FILE_UPLOAD_STATUS.UPLOADING)

    if (!isExistfileListUploading) {
      const newFileUploadDone = fileListDone?.filter(
        (item: any) => !item?.connectedToAgent,
      )
      const newFileIdUploadDone = newFileUploadDone.map(
        (item) => item?.response?.id,
      )
      const res = await moreCustomRequest(newFileIdUploadDone)
      if (res) {
        setFileList([])
      }
    }
  }

  const handleCustomRequest = async (options: any) => {
    const { onSuccess, onError, file } = options
    const formData = new FormData()
    formData.append("file", file)
    formData.append("key", fileKey)
    try {
      setLoading(true)
      const response = await uploadMyData(formData)
      if (response) {
        onSuccess(response?.data?.[0])
      }
    } catch (error) {
      console.error(error)
      onError(error)
      toast.error(`${file.name} failed to upload.`)
    } finally {
      setLoading(false)
    }
  }

  const beforeUpload = async (file: any) => {
    const isLtSize = file.size / 1024 / 1024 < maxSizeUpload
    if (!isLtSize) {
      toast.error(
        `The file ${file.name} size must be smaller than ${maxSizeUpload}MB!`,
      )
    }
    if (!loading) {
      setFileList([])
    }

    return isLtSize
  }

  const props: UploadProps = {
    name: "file",
    onChange: handleChange,
    fileList: fileListValue,
    customRequest: handleCustomRequest,
    beforeUpload,
  }

  return (
    <StyledUpload
      {...props}
      accept={accept}
      multiple={multiple}
      showUploadList={false}
      className="w-full"
    >
      <div className="inline-flex h-[32px] cursor-pointer items-center gap-1 rounded-full bg-mercury-950 px-3 text-15 font-semibold text-white">
        {loading ? (
          <Spinner color="white" size="sm" />
        ) : (
          <PlusIcon color="white" />
        )}
        Add Plain text files
      </div>
    </StyledUpload>
  )
}

const StyledUpload = styled(Upload)`
  &&& {
    .ant-upload {
      width: 100%;
    }
  }
`

export default UploadCommon
