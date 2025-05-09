import {
  TemAdventurous,
  TemCustom,
  TemFriendly,
  TemHumorous,
  TemProfessional,
  TemSupportive,
} from "@assets/images"
// import { LockFilledIcon } from "@components/Icons/AgentDetailIcon"
import { StarUserIconOutline } from "@components/Icons/UserIcon"
import { Checkbox, Textarea } from "@nextui-org/react"
import CategoryLabel, { FieldLabel } from "@pages/AgentDetail/CategoryLabel"
import { useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"

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

// const SUPPORT_LANGUAGE_AGENT = [
//   {
//     label: "English",
//     value: "en",
//   },
//   {
//     label: "Japanese",
//     value: "ja",
//   },
//   {
//     label: "Thai",
//     value: "th",
//   },
//   {
//     label: "Portuguese",
//     value: "pt",
//   },
// ]

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
  const { watch, setValue, control } = useFormContext()
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
    setValue("personality_traits", personality_traits, { shouldDirty: true })
    setValue("communication_style", communication_style, { shouldDirty: true })
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
          text="Characteristics"
          icon={<StarUserIconOutline color="#A2845E" />}
        />
      </div>

      <div className="mt-6">
        <Controller
          name="description"
          control={control}
          render={({ field: { value, onChange } }: any) => {
            return (
              <div className="w-full">
                <FieldLabel text="Personality" required />
                <div className="flex items-center max-sm:h-auto">
                  <Textarea
                    key="agent-description"
                    value={value}
                    type="text"
                    placeholder="Describe what your agent is and what it does"
                    className="w-full"
                    classNames={{
                      inputWrapper:
                        "!bg-mercury-30 border-1 border-mercury-400",
                      input:
                        "text-15 max-md:text-14 font-medium !text-mercury-950",
                    }}
                    onChange={(e) => onChange(e.target.value)}
                  />
                </div>
              </div>
            )
          }}
        />
      </div>

      <div className="mt-6">
        <p className="font-semibold">
          Tone of Voice<span className="text-red-500">*</span>
        </p>
        <p className="font-medium text-mercury-700 max-md:text-14">
          Select the trait that best describes your agent’s voice.
        </p>
      </div>

      <div className="mt-6 rounded-[22px] bg-[#E9E3D8] p-3 max-md:p-2">
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-md:gap-2">
          {PERSONALITY_LIST.map((item) => {
            const isSelected =
              (selectedBehaviors.personality_traits[0] === item.value &&
                item.type !== "custom") ||
              (item.type === "custom" && isCustom)

            return (
              <div
                key={item.value}
                onClick={() => {
                  setValue("communication_style", [item.communication], {
                    shouldDirty: true,
                  })
                  if (item.type === "custom") {
                    setIsCustom(true)
                    setValue("personality_traits", ["personality_traits"], {
                      shouldDirty: true,
                    })
                  } else {
                    setIsCustom(false)

                    setValue("personality_traits", [item.value], {
                      shouldDirty: true,
                    })
                  }
                }}
                aria-selected={isSelected}
                className="group flex cursor-pointer items-center justify-between rounded-[14px] border-2 border-transparent bg-mercury-30 p-3 aria-selected:border-brown-500 aria-selected:bg-brown-50 max-md:p-2"
              >
                <div className="flex items-center gap-3 max-md:gap-2">
                  <img
                    className="h-10 w-10 rounded-[8px] object-cover"
                    src={item.icon}
                    alt="avatar"
                  />
                  <p className="truncate text-14 font-medium group-aria-selected:font-semibold group-aria-selected:text-brown-600 max-md:max-w-[70px]">
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
                      setValue("personality_traits", ["personality_traits"], {
                        shouldDirty: true,
                      })
                    } else {
                      setIsCustom(false)
                      setValue("personality_traits", [item.value], {
                        shouldDirty: true,
                      })
                    }
                    setValue("communication_style", [item.communication], {
                      shouldDirty: true,
                    })
                  }}
                  isSelected={isSelected}
                />
              </div>
            )
          })}
        </div>
        {(selectedBehaviors.personality_traits[0] || isCustom) && (
          <>
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="mb-1 font-semibold max-md:text-14">
                  Communication Style
                </p>
              </div>
              <Textarea
                classNames={{
                  inputWrapper: "!bg-mercury-30  border-1 border-mercury-400",
                  input: "text-15 max-md:text-14 font-semibold !text-brown-600",
                }}
                onValueChange={(val) => {
                  handleSelect("communication_style", val)
                  if (
                    PERSONALITY_LIST.find((item) => item.communication === val)
                  ) {
                    setIsCustom(false)
                    setValue(
                      "personality_traits",
                      [
                        PERSONALITY_LIST.find(
                          (item) => item.communication === val,
                        )?.value,
                      ],
                      { shouldDirty: true },
                    )
                    setValue("personality_traits", [""], {
                      shouldDirty: true,
                    })
                  } else {
                    setIsCustom(true)
                    setValue("personality_traits", ["personality_traits"], {
                      shouldDirty: true,
                    })
                  }
                }}
                value={selectedBehaviors.communication_style[0]}
              />
            </div>
          </>
        )}
      </div>

      {/* <div className="mt-6 flex w-full justify-between rounded-[22px] border border-mercury-100 bg-mercury-30 p-6 max-sm:flex-col max-sm:p-4">
        <div className="flex items-center gap-2 max-sm:mb-3">
          <WorldGlobalIcon />
          <span className="text-base-sb">Preferred Response Language</span>
        </div>

        <Controller
          name="specific_language"
          control={control}
          render={({ field: { value, onChange } }: any) => {
            return (
              <div>
                <Select
                  aria-label="Select Language"
                  placeholder="Select language"
                  classNames={{
                    trigger: "rounded-full !bg-mercury-100 w-[150px]",
                    value: "!text-14 !text-mercury-950 !font-medium",
                  }}
                  disableSelectorIconRotation
                  selectionMode="single"
                  selectedKeys={value ? [value] : ""}
                  onChange={(e) => onChange(e.target.value)}
                >
                  {SUPPORT_LANGUAGE_AGENT.map((record) => (
                    <SelectItem
                      key={record.value}
                      classNames={{
                        title: "text-14 text-mercury-950 font-medium",
                      }}
                    >
                      {record.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            )
          }}
        />
      </div> */}
    </div>
  )
}

export default Personality
