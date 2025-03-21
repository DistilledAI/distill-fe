import { PlusIcon } from "@components/Icons/Plus"
import { Spinner } from "@nextui-org/react"
import React, { useState, useRef } from "react"
import { toast } from "react-toastify"
import { uploadMyData } from "services/user"
import FileTipModal from "./FileTipModal"

interface UploadCustomProps {
  fileKey: string
  icon?: any
  label?: string
  accept?: string
  maxCount?: number
  multiple?: boolean
  moreCustomRequest?: (data: any) => void
  children?: React.ReactNode
  containerClassName?: string
  description?: string
}

const maxSizeUpload = 20

const UploadCommon: React.FC<UploadCustomProps> = ({
  fileKey,
  accept = "application/pdf,.txt",
  multiple,
  moreCustomRequest,
}) => {
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTriggerClick = () => {
    setShowModal(true)
  }

  const handleModalConfirm = () => {
    setShowModal(false)
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const beforeUpload = (file: File): boolean => {
    const isLtSize = file.size / 1024 / 1024 < maxSizeUpload
    if (!isLtSize) {
      toast.error(
        `The file ${file.name} size must be smaller than ${maxSizeUpload}MB!`,
      )
    }
    return isLtSize
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const validFiles = Array.from(files).filter(beforeUpload)
      if (validFiles.length > 0) {
        setLoading(true)

        // Process each file individually
        const uploadPromises = validFiles.map((file) => {
          const formData = new FormData()
          formData.append("file", file)
          formData.append("key", fileKey)
          return uploadMyData(formData)
        })

        // Handle all uploads at once
        Promise.all(uploadPromises)
          .then((responses) => {
            const fileIds = responses
              .filter((response) => response)
              .map((response) => response?.data?.[0]?.id)
              .filter(Boolean)

            if (fileIds.length > 0 && moreCustomRequest) {
              return moreCustomRequest(fileIds)
            }
            return null
          })
          .catch((error) => {
            console.error(error)
            toast.error("Failed to upload.")
          })
          .finally(() => {
            setLoading(false)
          })
      }
      e.target.value = ""
    }
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleTriggerClick}
        className="inline-flex h-[32px] cursor-pointer items-center gap-1 rounded-full bg-mercury-950 px-3 text-15 font-semibold text-white"
        disabled={loading}
      >
        {loading ? (
          <Spinner color="white" size="sm" />
        ) : (
          <PlusIcon color="white" />
        )}
        Add Plain text files
      </button>

      <FileTipModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onPress={handleModalConfirm}
      />

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        multiple={multiple}
        accept={accept}
        onChange={handleFileInputChange}
      />
    </div>
  )
}

export default UploadCommon
