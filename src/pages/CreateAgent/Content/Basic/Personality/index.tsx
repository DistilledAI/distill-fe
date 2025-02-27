import {
  TemAdventurous,
  TemCustom,
  TemFriendly,
  TemHumorous,
  TemProfessional,
  TemSupportive,
} from "@assets/images"
import { LockFilledIcon } from "@components/Icons/AgentDetailIcon"
import { StarUserIconOutline } from "@components/Icons/UserIcon"
import { Checkbox, Textarea } from "@nextui-org/react"
import CategoryLabel from "@pages/AgentDetail/CategoryLabel"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

const PERSONALITY_LIST = [
  {
    icon: TemFriendly,
    label: "Friendly",
    selected: false,
    value: `Friendly: "Connects with users through warmth, empathy, and approachable communication."`,
    desc: "Connects with users through warmth, empathy, and approachable communication.",
    communication:
      "Engages in a relaxed and conversational tone, keeping interactions light and approachable.",
  },
  {
    icon: TemProfessional,
    label: "Professional",
    selected: false,
    value: `Professional: "Provides users with clear, precise, and reliable information while maintaining a courteous and professional demeanor."`,
    desc: "Delivers precise, insightful, and high-quality responses with confidence.",
    communication:
      "Engages in a formal and structured tone, ensuring interactions are concise, respectful, and informative.",
  },
  {
    icon: TemHumorous,
    label: "Humorous",
    selected: false,
    value: `Humorous: "Engages users with wit, playfulness, and a lighthearted approach making interactions fun and entertaining while still being helpful."`,
    desc: "Sprinkles humor into conversations while staying helpful and engaging.",
    communication:
      "Uses a casual and clever tone, incorporating jokes, puns, and playful banter to keep conversations engaging and enjoyable.",
  },
  {
    icon: TemSupportive,
    label: "Supportive",
    selected: false,
    value: `Supportive: "Creates a safe, understanding, and encouraging space for users, offering guidance, reassurance, and positivity in every interaction."`,
    desc: "Guides users with patience, encouragement, and unwavering care.",
    communication:
      "Engages in a compassionate and uplifting tone, ensuring conversations feel empathetic, patient, and deeply supportive.",
  },
  {
    icon: TemAdventurous,
    label: "Adventurous",
    selected: false,
    value: `Adventurous: "Inspires users to explore, take risks, and embrace new challenges with enthusiasm and curiosity."`,
    desc: "Sparks excitement and curiosity, inspiring users to explore new ideas.",
    communication:
      "Engages in a bold and energetic tone, using exciting, dynamic, and adventurous language to make every interaction feel like a new journey or quest.",
  },
  {
    icon: TemCustom,
    label: "Custom",
    selected: false,
    value: "",
    communication: "",
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

  const selectedBehaviors = {
    personality_traits: watch("personality_traits"),
    communication_style: watch("communication_style"),
  }

  useEffect(() => {
    const isCustomData =
      selectedBehaviors.personality_traits[0] &&
      selectedBehaviors.personality_traits[0] !== "" &&
      !PERSONALITY_LIST.find(
        (item) => item.value === selectedBehaviors.personality_traits[0],
      )
    if (isCustomData) setIsCustom(true)
  }, [selectedBehaviors.personality_traits])

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
          <span className="font-medium uppercase text-mercury-700 max-md:text-14">
            private
          </span>
        </div>
      </div>
      <div className="mt-3">
        <p className="font-semibold">
          Templates<span className="text-red-500">*</span>
        </p>
        <p className="font-medium text-mercury-700 max-md:text-14">
          Select the trait that best describe your agent's personality.
        </p>
      </div>
      <div className="mt-5 rounded-[22px] bg-[#E9E3D8] p-3 max-md:p-2">
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-md:gap-2">
          {PERSONALITY_LIST.map((item) => (
            <div
              key={item.value}
              onClick={() => {
                setValue("personality_traits", [item.value])
                setValue("communication_style", [item.communication])
                if (item.type === "custom") setIsCustom(true)
                else setIsCustom(false)
              }}
              className="flex cursor-pointer items-center justify-between rounded-[14px] border-1 border-white bg-mercury-30 p-3 max-md:p-2"
            >
              <div className="flex items-center gap-3 max-md:gap-2">
                <img
                  className="h-10 w-10 rounded-[8px] object-cover"
                  src={item.icon}
                  alt="avatar"
                />
                <p className="truncate text-14 font-medium max-md:max-w-[70px]">
                  {item.label}
                </p>
              </div>
              <Checkbox
                className="max-md:p-0"
                radius="full"
                onValueChange={(check) => {
                  if (!check) return
                  if (item.type === "custom") {
                    setIsCustom(true)
                  } else {
                    setIsCustom(false)
                  }
                  setValue("personality_traits", [item.value])
                  setValue("communication_style", [item.communication])
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
              <p className="mb-1 font-semibold max-md:text-14">
                Agent's Purpose
              </p>
              <Textarea
                classNames={{
                  inputWrapper: "!bg-mercury-30  border-1 border-mercury-400",
                  input: "text-15 max-md:text-14 font-semibold !text-brown-600",
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
                <p className="mb-1 font-semibold max-md:text-14">
                  Communication Style
                </p>
              </div>
              <Textarea
                classNames={{
                  inputWrapper: "!bg-mercury-30  border-1 border-mercury-400",
                  input: "text-15 max-md:text-14 font-semibold !text-brown-600",
                }}
                onValueChange={(val) =>
                  handleSelect("communication_style", val)
                }
                value={selectedBehaviors.communication_style[0]}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Personality
