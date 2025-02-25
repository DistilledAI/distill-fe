import {
  TemAdventurous,
  TemCustom,
  TemFriendly,
  TemHumorous,
  TemProfessional,
  TemSupportive,
} from "@assets/images"
import { BookDownloadIcon } from "@components/Icons"
import { LockFilledIcon } from "@components/Icons/AgentDetailIcon"
import { StarUserIconOutline } from "@components/Icons/UserIcon"
import { Checkbox, Textarea, useDisclosure } from "@nextui-org/react"
import CategoryLabel from "@pages/AgentDetail/CategoryLabel"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import CommunicationStylePreset from "./CommunicationStylePreset"

const PERSONALITY_LIST = [
  {
    icon: TemFriendly,
    label: "Friendly",
    selected: false,
    value: `Friendly: "Connects with users through warmth, empathy, and approachable communication."`,
    desc: "Connects with users through warmth, empathy, and approachable communication.",
  },
  {
    icon: TemProfessional,
    label: "Professional",
    selected: false,
    value: `Professional: "Delivers precise, insightful, and high-quality responses with confidence."`,
    desc: "Delivers precise, insightful, and high-quality responses with confidence.",
  },
  {
    icon: TemHumorous,
    label: "Humorous",
    selected: false,
    value: `Humorous: "Sprinkles humor into conversations while staying helpful and engaging."`,
    desc: "Sprinkles humor into conversations while staying helpful and engaging.",
  },
  {
    icon: TemSupportive,
    label: "Supportive",
    selected: false,
    value: `Supportive: "Guides users with patience, encouragement, and unwavering care."`,
    desc: "Guides users with patience, encouragement, and unwavering care.",
  },
  {
    icon: TemAdventurous,
    label: "Adventurous",
    selected: false,
    value: `Adventurous: "Sparks excitement and curiosity, inspiring users to explore new ideas."`,
    desc: "Sparks excitement and curiosity, inspiring users to explore new ideas.",
  },
  {
    icon: TemCustom,
    label: "Custom",
    selected: false,
    value: "",
    type: "custom",
  },
]

export interface BehaviorItem {
  value: string
  label: string
  type?: string
  emoji?: string
  desc?: string
}

export interface SelectedBehaviors {
  personality_traits: string[]
  communication_style: string[]
}

const Personality = () => {
  const { watch, setValue } = useFormContext()
  const [isCustom, setIsCustom] = useState(false)
  const { onOpen, isOpen, onClose } = useDisclosure()

  const selectedBehaviors = {
    personality_traits: watch("personality_traits"),
    communication_style: watch("communication_style"),
  }
  const handleSelectBehaviors = (selected: SelectedBehaviors) => {
    const { personality_traits, communication_style } = selected
    setValue("personality_traits", personality_traits)
    setValue("communication_style", communication_style)
  }

  const handleSelect = (type: keyof SelectedBehaviors, item: string) => {
    const isAlreadySelected = selectedBehaviors[type].includes(item)
    const updatedSelection = isAlreadySelected ? [] : [item]

    handleSelectBehaviors({
      ...selectedBehaviors,
      [type]: updatedSelection,
    })
  }

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <CategoryLabel
          text="Personality"
          icon={<StarUserIconOutline color="#A2845E" />}
        />
        <div className="flex items-center gap-1 rounded-full bg-mercury-70 px-2">
          <LockFilledIcon />
          <span className="font-medium uppercase text-mercury-700">
            private
          </span>
        </div>
      </div>
      <div className="mt-3">
        <p className="font-semibold">
          Templates<span className="text-red-500">*</span>
        </p>
        <p className="font-medium text-mercury-700">
          Select the trait that best describe your agent's personality.
        </p>
      </div>
      <div className="mt-5 rounded-[22px] bg-[#E9E3D8] p-3">
        <div className="grid grid-cols-3 gap-4">
          {PERSONALITY_LIST.map((item) => (
            <div
              key={item.value}
              onClick={() => {
                handleSelect("personality_traits", item.value)
                if (item.type === "custom") setIsCustom((prev) => !prev)
                else setIsCustom(false)
              }}
              className="flex cursor-pointer items-center justify-between rounded-[14px] border-1 border-white bg-mercury-30 p-3"
            >
              <div className="flex items-center gap-3">
                <img
                  className="h-10 w-10 rounded-[8px] object-cover"
                  src={item.icon}
                  alt="avatar"
                />
                <p className="text-14 font-medium">{item.label}</p>
              </div>
              <Checkbox
                radius="full"
                onValueChange={(check) => {
                  if (item.type === "custom") {
                    setIsCustom(check ? true : false)
                  }
                  setValue("personality_traits", check ? [item.value] : [])
                }}
                isSelected={
                  (selectedBehaviors.personality_traits[0] === item.value &&
                    item.type !== "custom") ||
                  (item.type === "custom" && isCustom)
                }
              />
            </div>
          ))}
        </div>
        {(selectedBehaviors.personality_traits[0] || isCustom) && (
          <>
            <div className="mt-5">
              <p className="mb-1 font-semibold">Agent's Purpose</p>
              <Textarea
                classNames={{
                  inputWrapper: "!bg-mercury-30  border-1 border-mercury-400",
                  input: "text-15 font-semibold !text-brown-600",
                }}
                onValueChange={(val) => {
                  setValue("personality_traits", [val])
                  if (PERSONALITY_LIST.find((item) => item.value === val))
                    setIsCustom(false)
                  else setIsCustom(true)
                }}
                value={selectedBehaviors.personality_traits[0]}
              />
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="mb-1 font-semibold">Communication Style</p>
                <div
                  onClick={onOpen}
                  className="flex cursor-pointer items-center gap-1 hover:opacity-70"
                >
                  <BookDownloadIcon />
                  <span className="font-semibold text-brown-600">
                    More Presets
                  </span>
                </div>
              </div>
              <Textarea
                classNames={{
                  inputWrapper: "!bg-mercury-30  border-1 border-mercury-400",
                  input: "text-15 font-semibold !text-brown-600",
                }}
                onValueChange={(val) =>
                  handleSelect("communication_style", val)
                }
                value={selectedBehaviors.communication_style}
              />
            </div>
          </>
        )}
      </div>
      {isOpen && (
        <CommunicationStylePreset
          handleSelect={handleSelect}
          selectedBehaviors={selectedBehaviors}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </div>
  )
}

export default Personality
