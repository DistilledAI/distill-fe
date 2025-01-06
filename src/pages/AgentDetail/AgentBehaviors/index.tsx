import { LockFilledIcon } from "@components/Icons/AgentDetailIcon"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { CheckFilledIcon } from "@components/Icons/DefiLens"
import {
  QuestionUserIconOutline,
  StarUserIconOutline,
} from "@components/Icons/UserIcon"
import { COMMUNICATION_STYLE_LIST, PERSONALITY_LIST } from "@constants/index"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Textarea,
} from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import CategoryLabel, { FieldLabel } from "../CategoryLabel"
import InteractFrequency from "./InteractFrequency"
import ResponseLength from "./ResponseLength"
import SuggestReplies from "./SuggestReplies"
import ToneAdaptation from "./ToneAdaptation"

interface BehaviorItem {
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

interface AgentBehaviorsProps {
  selectedBehaviors: SelectedBehaviors
  onSelectBehaviors: (selected: SelectedBehaviors) => void
  valueCustomDefault?: any
  isCreate?: boolean
}

const AgentBehaviors: React.FC<AgentBehaviorsProps> = ({
  selectedBehaviors,
  onSelectBehaviors,
  valueCustomDefault,
  isCreate = false,
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
            base: "w-[85%]",
            mainWrapper: "w-full",
            inputWrapper: twMerge(
              "rounded-[14px] p-4 font-medium border-[2px] h-[64px] transition-all duration-300 ease-in-out hover:!bg-brown-50 focus:!bg-brown-50 focus-within:!bg-brown-50 border-transparent bg-mercury-30 ",
              customFieldState.value && "border-brown-500 bg-brown-50",
            ),
            input:
              "text-[16px] font-medium text-mercury-950 placeholder:text-mercury-700",
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
          "flex w-[85%] cursor-pointer items-center gap-3 rounded-[14px] border-[2px] border-white bg-mercury-30 p-3 text-mercury-900 transition-all duration-300 ease-in-out",
          isSelected && "border-brown-500 bg-brown-50",
        )}
      >
        <span>{item.emoji}</span>
        <div className="flex w-full items-center justify-between">
          <div>
            <span
              className={twMerge(
                "text-base-b relative transition-all duration-300 ease-in-out",
                isSelected && "left-0",
              )}
            >
              {item.label}
            </span>
            <br />
            <span className="relative text-14 text-mercury-800 transition-all duration-300 ease-in-out">
              {item.desc}
            </span>
          </div>
          <div
            className={twMerge(
              "opacity-0 transition-all duration-100 ease-in-out",
              isSelected && "opacity-100",
            )}
          >
            <CheckFilledIcon color="#A2845E" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <CategoryLabel
          text="Behaviors"
          icon={<StarUserIconOutline color="#A2845E" />}
        />
        <div className="flex items-center gap-1 rounded-full bg-mercury-70 px-2">
          <LockFilledIcon />
          <span className="font-medium uppercase text-mercury-700">
            private
          </span>
        </div>
      </div>

      <div className="flex w-full items-center justify-between max-md:flex-col">
        <p className="font-semibold text-mercury-950">
          What is the main role of the Agent?
        </p>
        <Dropdown classNames={{ base: "mt-1" }}>
          <DropdownTrigger>
            <Button className="z-[1] flex h-12 max-w-[230px] items-center bg-mercury-30">
              <QuestionUserIconOutline />
              <span className="text-16 font-medium text-mercury-900">
                Customer Support
              </span>
              <ChevronDownIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions">
            <DropdownItem color="default" key="support">
              <span className="font-medium">Customer Support</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {!isCreate && (
        <>
          <div>
            <FieldLabel
              text="Describe your Agent’s purpose"
              containerClassName="mb-4"
              required
            />
            <Controller
              name="agent_describe"
              control={control}
              render={({ field: { value, onChange } }: any) => {
                return (
                  <div className="w-full">
                    <Textarea
                      placeholder={`e.g., "A helpful customer service agent"`}
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

          <div>
            <FieldLabel
              text="Customization Instructions"
              containerClassName="mb-4"
            />
            <Controller
              name="customization_instruction"
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
        </>
      )}

      <div>
        <FieldLabel
          text="Your Agent’s Personality"
          desc="Select the trait that best describe your agent's personality."
          containerClassName="mb-4"
        />
        <div className="flex flex-col flex-wrap gap-2">
          {PERSONALITY_LIST.map((item: BehaviorItem) =>
            renderBehaviorItem(item, "personality_traits"),
          )}
        </div>
      </div>

      <div>
        <FieldLabel
          text="Communication Style"
          desc="Select one tone and style your agent should use when communicating."
          containerClassName="mb-4"
        />
        <div className="flex flex-wrap gap-2">
          {COMMUNICATION_STYLE_LIST.map((item: BehaviorItem) =>
            renderBehaviorItem(item, "communication_style"),
          )}
        </div>
      </div>

      {!isCreate && (
        <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1">
          <InteractFrequency />
          <ToneAdaptation />
          <ResponseLength />
          <SuggestReplies />
        </div>
      )}
    </div>
  )
}

export default AgentBehaviors
