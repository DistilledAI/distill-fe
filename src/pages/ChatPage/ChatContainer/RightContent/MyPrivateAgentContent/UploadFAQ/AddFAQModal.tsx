import CloseButton from "@components/CloseButton"
import { ArrowBottomSquareOutlineIcon } from "@components/Icons/Arrow"
import { CSVIcon } from "@components/Icons/TextIcon"
import { Modal, ModalBody, ModalContent } from "@nextui-org/react"
import { saveAs } from "file-saver"
import { TYPE_DATA_KEY } from "../CreatePrivateAgent"
import UploadCustom from "../UploadCustom"

export interface FaqSample {
  id: number
  question: string
  answer: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  onMoreCustomRequest: any
}

export const faqSampleDefault = {
  id: NaN,
  question: "",
  answer: "",
}

const AddFAQModal = ({ isOpen, onClose, onMoreCustomRequest }: Props) => {
  return (
    <Modal
      classNames={{
        base: "bg-mercury-100 rounded-[22px] shadow-10 backdrop-blur-[10px] border border-white",
        body: "p-6 pb-10 gap-6",
      }}
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      size="lg"
    >
      <ModalContent>
        <ModalBody>
          <div className="flex items-center justify-between">
            <h3 className="text-24 font-semibold text-mercury-950">
              Add FAQ Samples
            </h3>
            <CloseButton
              onClose={() => {
                onClose()
              }}
              className="h-9 w-9 min-w-9"
            />
          </div>
          <div className="space-y-4 rounded-[22px] border border-mercury-100 bg-mercury-70 p-4">
            <div className="m-auto text-center">
              <span className="text-base-md text-mercury-900">
                Please fill out this template to add your samples:
                <br />
              </span>
              <div
                onClick={() =>
                  saveAs("/agents_faqs-template.csv", "agents_faqs-template")
                }
                className="mt-2 flex cursor-pointer items-center justify-center gap-2 hover:underline"
              >
                <span className="text-base-sb text-brown-500">
                  agents_faqs-template.csv
                </span>
                <ArrowBottomSquareOutlineIcon color="#a2845e" size={20} />
              </div>
            </div>
          </div>
          <UploadCustom
            fileKey={TYPE_DATA_KEY.FAQ}
            accept=".csv"
            moreCustomRequest={onMoreCustomRequest}
            containerClassName="rounded-[14px] bg-mercury-200"
          >
            <div className="flex flex-col items-center gap-3 rounded-[14px] border border-dashed border-mercury-700 bg-mercury-30 py-6">
              <CSVIcon />
              <span className="text-base-b text-center">
                Click to upload *.csv file
              </span>
            </div>
          </UploadCustom>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddFAQModal
