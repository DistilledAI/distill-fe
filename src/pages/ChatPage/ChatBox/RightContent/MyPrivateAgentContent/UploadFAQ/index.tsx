import { MessageQuestionIcon } from "@components/Icons/Message"
import { TablerPlusIcon } from "@components/Icons/TablerPlusIcon"
import AddFAQModal, { FaqSample } from "./AddFAQModal"
import { useDisclosure } from "@nextui-org/react"
import { useState } from "react"
import { TrashXIcon } from "@components/Icons/TrashXIcon"
import useDeleteData from "@pages/MyData/DeleteData/useDelete"
import { useParams } from "react-router-dom"

interface Props {
  onMoreCustomRequest: (data: number[]) => any
}

const UploadFAQ = ({ onMoreCustomRequest }: Props) => {
  const { botId } = useParams()
  const { onDelete } = useDeleteData()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [faqSamples, setFaqSamples] = useState<Array<FaqSample>>([])

  const updateFaqSamples = async (faqSample: FaqSample) => {
    if (faqSample?.id) {
      const res = await onMoreCustomRequest([faqSample?.id])
      if (res) {
        setFaqSamples((prev) => [...prev, faqSample])
        onClose()
      }
    }
  }

  const deleteFaqSample = async (faqSampleId: number) => {
    await onDelete({
      botId: Number(botId),
      ids: [faqSampleId],
    })
    const newFaqSamples = faqSamples.filter((item) => item.id !== faqSampleId)
    setFaqSamples(newFaqSamples)
  }

  return (
    <>
      <div className="h-fit !w-full rounded-[32px] border-[1px] border-mercury-200 bg-mercury-50 p-1">
        <div
          className="flex h-[50px] w-full min-w-[130px] cursor-pointer items-center justify-between gap-2 rounded-full border border-mercury-70 bg-mercury-30 p-4 shadow-6"
          onClick={onOpen}
        >
          <div className="flex items-center gap-2">
            <div>
              <MessageQuestionIcon />
            </div>
            <span className="text-center text-14 font-bold text-mercury-950">
              FAQ Samples
            </span>
          </div>
          <TablerPlusIcon />
        </div>
        {faqSamples.length ? (
          <div className="flex max-h-[100px] flex-col gap-1 overflow-auto p-3">
            {faqSamples.map((item, index) => (
              <div
                className="flex w-full items-center justify-between gap-4"
                key={index}
              >
                <div>
                  <p className="max-w-[300px] truncate text-14 font-semibold text-mercury-950">
                    {item.question}
                  </p>
                  <p className="max-w-[300px] truncate text-12 text-mercury-700">
                    {item.answer}
                  </p>
                </div>
                <button type="button" onClick={() => deleteFaqSample(item.id)}>
                  <TrashXIcon />
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <AddFAQModal
        isOpen={isOpen}
        onClose={onClose}
        updateFaqSamples={updateFaqSamples}
      />
    </>
  )
}

export default UploadFAQ
