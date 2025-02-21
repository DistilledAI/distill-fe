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
import { Checkbox } from "@nextui-org/react"
import CategoryLabel from "@pages/AgentDetail/CategoryLabel"
import { useFormContext } from "react-hook-form"

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
    value: "personality_traits",
    type: "custom",
  },
]

export interface SelectedBehaviors {
  personality_traits: string[]
}

const Personality = () => {
  const { watch, setValue } = useFormContext()
  console.log("XXXX", watch("personality_traits"))

  const selectedBehaviors = {
    personality_traits: watch("personality_traits"),
  }
  const handleSelectBehaviors = (selected: SelectedBehaviors) => {
    const { personality_traits } = selected
    setValue("personality_traits", personality_traits)
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
      <div className="mt-5 grid grid-cols-3 gap-4 rounded-[22px] bg-[#E9E3D8] p-3">
        {PERSONALITY_LIST.map((item) => (
          <div
            key={item.value}
            onClick={() => handleSelect("personality_traits", item.value)}
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
              isSelected={watch("personality_traits")?.[0] === item.value}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Personality
