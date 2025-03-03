import { UploadIcon } from "@components/Icons"
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
  label,
  accept = ".doc,.docx,application/pdf,.txt",
  multiple,
  moreCustomRequest,
  description,
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
        const newFileList = fileListDone?.map((item) => ({
          ...item,
          connectedToAgent: true,
        }))
        setFileList(newFileList)
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
      <div className="flex h-16 w-full cursor-pointer items-center justify-between rounded-2xl bg-mercury-950 px-6">
        <div className="flex flex-col items-start">
          <span className="text-base-b text-mercury-30">{label}</span>
          <span className="text-[13px] font-medium text-mercury-500">
            {description}
          </span>
        </div>
        {loading ? (
          <Spinner color="white" size="sm" />
        ) : (
          <UploadIcon color="#FFFF" />
        )}
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
