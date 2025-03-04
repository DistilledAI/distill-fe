import distilledAiPrivateAgent from "@assets/video/distilled-ai-private-agent-3d.mp4"
import { ArrowBottomSquareOutlineIcon } from "@components/Icons/Arrow"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
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
        base: "bg-white max-md:!m-0 max-md:h-[calc(100vh-100px)]",
        body: "!p-0",
      }}
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      size="5xl"
    >
      <ModalContent>
        <ModalBody>
          <div className="relative h-[680px] w-full bg-cover bg-center bg-no-repeat">
            <div className="flex-items-center absolute left-0 top-4 z-10 w-full justify-between px-4">
              <span className="text-[24px] font-semibold text-mercury-950">
                Add FAQ Samples
              </span>
              <div className="z-20 cursor-pointer" onClick={onClose}>
                <CloseFilledIcon color="#545454" />
              </div>
            </div>
            <video
              autoPlay
              playsInline
              loop
              muted
              className="h-full object-cover"
            >
              <source src={distilledAiPrivateAgent} type="video/mp4" />
              <track kind="captions"></track>
            </video>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-[22px] border border-white bg-mercury-100 p-6 backdrop-blur-md aria-selected:pb-0">
              <div className="mb-6 rounded-[22px] border border-mercury-100 bg-mercury-70 p-4">
                <div className="m-auto text-center">
                  <div className="text-24 font-semibold">💡 Tips</div>
                  <span className="text-base-md text-mercury-900">
                    Ensure your file is in CSV format. The more accurate your
                    data, the better your agents learn. Follow the template
                    below:
                  </span>
                  <div
                    onClick={() =>
                      saveAs(
                        "/agents_faqs-template.csv",
                        "agents_faqs-template",
                      )
                    }
                    className="m-auto mt-2 flex w-fit cursor-pointer items-center justify-center gap-2 hover:underline"
                  >
                    <span className="text-base-b text-brown-500">
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
                containerClassName="rounded-[14px] p-0"
              >
                <div className="flex flex-col items-center gap-3 rounded-[14px] border border-dashed border-mercury-700 bg-mercury-200 py-6">
                  <CSVIcon />
                  <span className="text-base-b text-center text-mercury-900">
                    Click to upload *.csv file
                  </span>
                </div>
              </UploadCustom>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddFAQModal
