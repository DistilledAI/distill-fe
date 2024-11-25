import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { StarUserIconOutline } from "@components/Icons/UserIcon"
import { COMMUNICATION_STYLE_LIST, PERSONALITY_LIST } from "@constants/index"
import { Input, Textarea } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import CategoryLabel, { FieldLabel } from "../CategoryLabel"
import { Controller, useFormContext } from "react-hook-form"
import InteractFrequency from "./InteractFrequency"
import ToneAdaptation from "./ToneAdaptation"
import ResponseLength from "./ResponseLength"
import SuggestReplies from "./SuggestReplies"

interface BehaviorItem {
  value: string
  label: string
  type?: string
}

export interface SelectedBehaviors {
  agentPersonal: string[]
  agentCommunication: string[]
}

interface AgentBehaviorsProps {
  selectedBehaviors: SelectedBehaviors
  onSelectBehaviors: (selected: SelectedBehaviors) => void
  valueCustomDefault?: any
}

const AgentBehaviors: React.FC<AgentBehaviorsProps> = ({
  selectedBehaviors,
  onSelectBehaviors,
  valueCustomDefault,
}) => {
  const { control } = useFormContext()
  const [customFields, setCustomFields] = useState<{
    [key: string]: { value: string; isFocused: boolean }
  }>({})

  useEffect(() => {
    if (valueCustomDefault) {
      setCustomFields(valueCustomDefault)
    }
  }, [valueCustomDefault])

  const handleSelect = (type: keyof SelectedBehaviors, item: string) => {
    const isAlreadySelected = selectedBehaviors[type].includes(item)
    const updatedSelection = isAlreadySelected ? [] : [item]
    const customField = customFields[type]

    if (customField && customField?.value) {
      setCustomFields((prevState) => ({
        ...prevState,
        [type]: {
          ...customField,
          value: "",
        },
      }))
    }

    onSelectBehaviors({
      ...selectedBehaviors,
      [type]: updatedSelection,
    })
  }

  const handleSelectCustomField = (
    type: keyof SelectedBehaviors,
    value: string,
    key: string,
  ) => {
    setCustomFields((prev) => ({
      ...prev,
      [key]: { ...prev[key], value },
    }))

    onSelectBehaviors({
      ...selectedBehaviors,
      [type]: [value],
    })
  }

  const handleInputFocus = (key: string) => {
    setCustomFields((prev) => ({
      ...prev,
      [key]: { ...prev[key], isFocused: true },
    }))
  }

  const handleInputBlur = (key: string) => {
    setCustomFields((prev) => ({
      ...prev,
      [key]: { ...prev[key], isFocused: false },
    }))
  }

  const renderBehaviorItem = (
    item: BehaviorItem,
    type: keyof SelectedBehaviors,
  ) => {
    const isSelected = selectedBehaviors[type].includes(item.value)
    const isCustomField = item?.type && item.type === "custom"
    const customFieldState = customFields[item.value] || {
      value: "",
      isFocused: false,
    }

    if (isCustomField) {
      return (
        <Input
          key={item.value}
          value={customFieldState.value}
          onValueChange={(value) => {
            handleSelectCustomField(type, value, item.value)
          }}
          onFocus={() => handleInputFocus(item.value)}
          onBlur={() => handleInputBlur(item.value)}
          placeholder={
            customFieldState.isFocused ? "Enter your text" : "Custom behavior"
          }
          classNames={{
            base: "w-fit",
            mainWrapper: "w-fit",
            inputWrapper: twMerge(
              "rounded-[14px] p-4 font-medium border-[2px] h-[64px] transition-all duration-300 ease-in-out hover:!bg-brown-50 focus:!bg-brown-50 focus-within:!bg-brown-50 border-transparent bg-mercury-30",
              customFieldState.value && "border-brown-500 bg-brown-50",
            ),
            input: "text-[16px] font-medium text-mercury-700 w-[124px]",
          }}
          className="font-medium"
          startContent={<span>⭐</span>}
        />
      )
    }

    return (
      <div
        key={item.value}
        onClick={() => handleSelect(type, item.value)}
        className={twMerge(
          "flex cursor-pointer items-center gap-2 rounded-[14px] border-[2px] border-white bg-mercury-30 p-4 text-mercury-900 transition-all duration-300 ease-in-out",
          isSelected && "border-brown-500 bg-brown-50",
        )}
      >
        <span
          className={twMerge(
            "relative left-4 text-[16px] font-medium transition-all duration-300 ease-in-out",
            isSelected && "left-0",
          )}
        >
          {item.label}
        </span>
        <div
          className={twMerge(
            "opacity-0 transition-all duration-100 ease-in-out",
            isSelected && "opacity-100",
          )}
        >
          <CheckFilledIcon color="#A2845E" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <CategoryLabel
        text="Agent Behaviors"
        icon={<StarUserIconOutline color="#A2845E" />}
      />
      {/* Personalities */}
      <div>
        <FieldLabel
          text="Your Agent’s Personality"
          desc="Choose one trait that best describes your agent's personality."
          containerClassName="mb-4"
        />
        <div className="flex flex-wrap gap-2">
          {PERSONALITY_LIST.map((item: BehaviorItem) =>
            renderBehaviorItem(item, "agentPersonal"),
          )}
        </div>
      </div>
      {/* Communication Styles */}
      <div>
        <FieldLabel
          text="Communication Style"
          desc="Select one tone and style your agent should use when communicating."
          containerClassName="mb-4"
        />
        <div className="flex flex-wrap gap-2">
          {COMMUNICATION_STYLE_LIST.map((item: BehaviorItem) =>
            renderBehaviorItem(item, "agentCommunication"),
          )}
        </div>
      </div>
      <div>
        <FieldLabel
          text="Customization Instructions"
          containerClassName="mb-4"
        />
        <Controller
          name="customization"
          control={control}
          render={({ field: { value, onChange } }: any) => {
            return (
              <div className="w-full">
                <Textarea
                  placeholder="Additional notes on how to shape the Agent’s responses or behavior."
                  minRows={3}
                  maxRows={3}
                  className="w-full rounded-xl border border-mercury-400"
                  classNames={{
                    inputWrapper: "bg-mercury-70",
                  }}
                  value={value || ""}
                  onChange={(e) => {
                    onChange(e.target.value)
                  }}
                />
              </div>
            )
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1">
        <InteractFrequency />
        <ToneAdaptation />
        <ResponseLength />
        <SuggestReplies />
      </div>
    </div>
  )
}

export default AgentBehaviors
