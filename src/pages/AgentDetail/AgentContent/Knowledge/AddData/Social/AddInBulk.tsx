import { ArrowBottomSquareOutlineIcon } from "@components/Icons/Arrow"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { CSVIcon } from "@components/Icons/TextIcon"
import { Modal, ModalBody, ModalContent } from "@nextui-org/react"
import { TYPE_DATA_KEY } from "@pages/ChatPageOld/ChatContainer/RightContent/MyPrivateAgentContent/CreatePrivateAgent"
import UploadCustom from "@pages/ChatPageOld/ChatContainer/RightContent/MyPrivateAgentContent/UploadCustom"
import { saveAs } from "file-saver"

interface Props {
  isOpen: boolean
  onClose: () => void
  onMoreCustomRequest: any
}

const AddSocialBulkModal = ({
  isOpen,
  onClose,
  onMoreCustomRequest,
}: Props) => {
  return (
    <>
      <Modal
        classNames={{
          base: "bg-white rounded-[22px] max-md:!m-0 max-md:h-[calc(100vh-100px)]",
          body: "!p-0",
        }}
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton
        size="xl"
      >
        <ModalContent>
          <ModalBody>
            <div className="relative w-full">
              <div className="flex-items-center absolute left-0 top-3 z-10 w-full justify-between px-6">
                <span className="text-20 font-semibold text-mercury-950">
                  Add Links In Bulk
                </span>
                <div className="z-20 cursor-pointer" onClick={onClose}>
                  <CloseFilledIcon color="#545454" />
                </div>
              </div>
              <div className="rounded-[22px] border border-white bg-mercury-100 p-6 backdrop-blur-md aria-selected:pb-0">
                <div className="mb-6 mt-7 rounded-[22px] border border-mercury-100 bg-mercury-70 p-4">
                  <div className="m-auto text-center">
                    <div className="text-20 font-semibold">💡 Tips</div>
                    <span className="font-medium text-mercury-900">
                      Ensure your file is in CSV format. Follow the template
                      below:
                    </span>
                    <div
                      onClick={() =>
                        saveAs(
                          "/social_links-template.csv",
                          "social_links-template",
                        )
                      }
                      className="m-auto mt-2 flex w-fit cursor-pointer items-center justify-center gap-2 hover:underline"
                    >
                      <span className="text-base-b text-brown-500">
                        social_links-template.csv
                      </span>
                      <ArrowBottomSquareOutlineIcon color="#a2845e" size={20} />
                    </div>
                  </div>
                </div>
                <UploadCustom
                  fileKey={TYPE_DATA_KEY.SOCIAL_MEDIA}
                  accept=".csv"
                  moreCustomRequest={onMoreCustomRequest}
                  containerClassName="rounded-[14px] p-0"
                  isBulk
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
    </>
  )
}

export default AddSocialBulkModal
