import { TablerPlusIcon } from "@components/Icons/TablerPlusIcon"
import { TrashXIcon } from "@components/Icons/TrashXIcon"
import { Spinner } from "@nextui-org/react"
import useDeleteData from "@pages/MyData/DeleteData/useDelete"
import { calculateFileSize } from "@utils/index"
import type { UploadFile, UploadProps } from "antd"
import { Upload } from "antd"
import { UploadFileStatus } from "antd/es/upload/interface"
import { useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { uploadMyData } from "services/user"
import { styled } from "styled-components"
import { twMerge } from "tailwind-merge"

interface UploadCustomProps {
  fileKey: string
  icon: any
  label: string
  accept?: string
  maxCount?: number
  multiple?: boolean
  moreCustomRequest?: any
  isComingSoon?: boolean
}

const maxSizeUpload = 20

const FILE_UPLOAD_STATUS = {
  UPLOADING: "uploading",
  ERROR: "error",
  DONE: "done",
} as any

const UploadCustom: React.FC<UploadCustomProps> = ({
  fileKey,
  icon,
  label,
  accept = ".doc,.docx,application/pdf",
  multiple,
  moreCustomRequest,
  isComingSoon = false,
}) => {
  const { botId } = useParams()
  const messagesEndRef = useRef<any>()
  const [fileListValue, setFileList] = useState<UploadFile[]>([])
  const { onDelete } = useDeleteData()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleChange: UploadProps["onChange"] = async ({ fileList }) => {
    if (isComingSoon) return
    scrollToBottom()
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
    if (isComingSoon) return
    const { onSuccess, onError, file } = options
    const formData = new FormData()
    formData.append("file", file)
    formData.append("key", fileKey)
    try {
      const response = await uploadMyData(formData)
      if (response) {
        onSuccess(response?.data?.[0])
      }
    } catch (error) {
      console.error(error)
      onError(error)
      toast.error(`${file.name} failed to upload.`)
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

  const mapIconFromStatus: Record<UploadFileStatus | string, JSX.Element> = {
    uploading: <Spinner size="sm" />,
    done: <TrashXIcon />,
    error: <TrashXIcon />,
  }

  const handleRemoveFile = async (record: any) => {
    await onDelete({ botId: Number(botId), ids: [record?.response?.id] })
    //set display value
    const newFileList = fileListValue?.filter(
      (item: any) => item.uid !== record?.uid,
    )
    setFileList(newFileList)
  }

  return (
    <div
      className={twMerge(
        "h-fit !w-full rounded-[32px] border-[1px] border-mercury-200 bg-mercury-50 p-1",
        isComingSoon && "opacity-65",
      )}
    >
      <StyledUpload
        {...props}
        showUploadList={false}
        accept={accept}
        style={{
          width: "100%",
        }}
        className="!w-full"
        // maxCount={maxCount}
        multiple={multiple}
        disabled={isComingSoon}
      >
        <div
          className={twMerge(
            "flex h-[50px] w-full min-w-[130px] cursor-pointer items-center justify-between gap-2 rounded-full border border-mercury-70 bg-mercury-30 p-4 shadow-6",
            isComingSoon && "cursor-default",
          )}
        >
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-base-14-b text-center">{label}</span>
            {isComingSoon && (
              <span className="text-brown-600">(Coming Soon)</span>
            )}
          </div>
          <TablerPlusIcon />
        </div>
      </StyledUpload>

      {fileListValue.length > 0 && (
        <div className="flex max-h-[150px] flex-col overflow-auto p-3">
          {fileListValue.map((item: any) => {
            const isError = item?.status === FILE_UPLOAD_STATUS.ERROR
            const isUploading = item?.status === FILE_UPLOAD_STATUS.UPLOADING

            return (
              <div
                className="mb-3 grid w-full grid-cols-8 items-center gap-3"
                key={item.uid}
              >
                {isError || isUploading ? (
                  <div className="group col-span-6 max-w-[250px] truncate">
                    <span
                      aria-selected={isError}
                      className="text-base-14-sb aria-selected:text-[#FF3B30]"
                    >
                      {item.name}
                    </span>
                  </div>
                ) : (
                  <Link
                    target="_blank"
                    to={item?.response?.value}
                    className="col-span-6 max-w-[250px] truncate hover:underline"
                  >
                    <span className="text-base-14-sb">{item.name}</span>
                  </Link>
                )}

                <div className="col-span-2 flex w-full items-center justify-between">
                  <div className="text-14">
                    {calculateFileSize(item?.response?.size)}
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleRemoveFile(item)}
                  >
                    {mapIconFromStatus?.[item?.status]}
                  </div>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  )
}

const StyledUpload = styled(Upload)`
  &&& {
    .ant-upload {
      width: 100%;
    }
  }
`

export default UploadCustom
