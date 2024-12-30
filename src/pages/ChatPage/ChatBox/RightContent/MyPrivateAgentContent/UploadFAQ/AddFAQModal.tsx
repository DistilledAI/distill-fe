import CloseButton from "@components/CloseButton"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
} from "@nextui-org/react"
import { useEffect, useState } from "react"
import { uploadMyData } from "services/user"
import { TYPE_DATA_KEY } from "../CreatePrivateAgent"
import { toast } from "react-toastify"

export interface FaqSample {
  id: number
  question: string
  answer: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  updateFaqSamples: (faqSample: FaqSample) => void
  faqSampleSelected?: FaqSample
}

export const faqSampleDefault = {
  id: NaN,
  question: "",
  answer: "",
}

const AddFAQModal = ({
  isOpen,
  onClose,
  updateFaqSamples,
  faqSampleSelected,
}: Props) => {
  const [faqSample, setFaqSample] = useState<FaqSample>(faqSampleDefault)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (faqSampleSelected?.id) {
      setFaqSample(faqSampleSelected)
    }
  }, [faqSampleSelected])

  const onFaqSampleChange = (key: string, value: string) => {
    setFaqSample((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const addFaqSample = async () => {
    console.log({ faqSample })
    try {
      setIsLoading(true)
      const payload = {
        key: TYPE_DATA_KEY.FAQ,
        value: JSON.stringify(faqSample),
      }
      const res = await uploadMyData(payload)
      if (res) {
        await updateFaqSamples({
          ...faqSample,
          id: res?.data?.id,
        })
        setFaqSample(faqSampleDefault)
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      classNames={{
        base: "bg-mercury-100 rounded-[22px] shadow-10 backdrop-blur-[10px] border border-white",
        body: "p-6 pb-10 gap-6",
      }}
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
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
                setFaqSample(faqSampleDefault)
              }}
              className="h-9 w-9 min-w-9"
            />
          </div>
          <div className="space-y-4 rounded-[22px] border border-mercury-100 bg-mercury-70 p-4">
            <Input
              classNames={{
                inputWrapper: "border border-mercury-400 rounded-lg p-2 h-11",
                input:
                  "text-[16px] text-mercury-950 placeholder:text-mercury-700",
              }}
              placeholder="Enter Question"
              onValueChange={(value) => onFaqSampleChange("question", value)}
              value={faqSample.question}
            />
            <Input
              classNames={{
                inputWrapper: "border border-mercury-400 rounded-lg p-2 h-11",
                input:
                  "text-[16px] text-mercury-950 placeholder:text-mercury-700",
              }}
              placeholder="Enter Answer"
              onValueChange={(value) => onFaqSampleChange("answer", value)}
              value={faqSample.answer}
            />
          </div>
          <Button
            onPress={addFaqSample}
            isLoading={isLoading}
            className="mt-1 h-14 rounded-full bg-mercury-950 text-[18px] font-semibold !text-white"
          >
            Save
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddFAQModal
