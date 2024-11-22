import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { StarUserIconOutline } from "@components/Icons/UserIcon"
import { COMMUNICATION_STYLE_LIST, PERSONALITY_LIST } from "@constants/index"
import { Button, Input, Switch, Textarea } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import CategoryLabel, { FieldLabel } from "../CategoryLabel"
import { Controller, useFormContext } from "react-hook-form"
import {
  BriefIcon,
  DetailedIcon,
  ModerateIcon,
  SyncOutlineIcon,
} from "@components/Icons"
import SliderCustom from "@components/SliderCustom"

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
        <div>
          <p className="font-semibold text-mercury-950">
            Interaction Frequency
          </p>
          <p className="min-h-[48px] text-mercury-700">
            How often should the Agent reach out proactively?
          </p>
          <div className="mt-4 max-w-[220px] rounded-[22px] bg-mercury-30 p-4">
            <div className="flex items-center gap-2">
              <div className="grid grid-cols-3 gap-[3px]">
                <div className="flex h-1 w-1 items-center justify-center">
                  <span className="h-full w-full rounded-full bg-mercury-900"></span>
                </div>
                <div className="flex h-1 w-1 items-center justify-center">
                  <span className="h-full w-full rounded-full bg-mercury-900"></span>
                </div>
                <div className="flex h-1 w-1 items-center justify-center">
                  <span className="h-full w-full rounded-full bg-mercury-900"></span>
                </div>
                <div className="flex h-1 w-1 items-center justify-center">
                  <span className="h-full w-full rounded-full bg-mercury-900"></span>
                </div>
                <div className="flex h-1 w-1 items-center justify-center">
                  <span className="h-full w-full rounded-full bg-mercury-900"></span>
                </div>
                <div className="flex h-1 w-1 items-center justify-center">
                  <span className="h-full w-full rounded-full bg-mercury-900"></span>
                </div>
              </div>
              <p className="font-medium">Occasionally</p>
            </div>
            <div className="mt-10 flex items-center gap-2">
              <Button className="h-[33px] w-[52px] min-w-0 rounded-full bg-mercury-100">
                <span className="h-[2px] w-3 bg-mercury-900"></span>
              </Button>
              <Button className="relative h-[33px] w-[52px] min-w-0 rounded-full bg-mercury-100">
                <span className="h-[2px] w-3 bg-mercury-900"></span>
                <span className="absolute left-1/2 h-3 w-[2px] -translate-x-1/2 bg-mercury-900"></span>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold text-mercury-950">Tone Adaption</p>
          <p className="text-mercury-700">
            Should the Agent adapt its tone depending on the user's mood or
            input?
          </p>
          <div className="mt-4 max-w-[220px] rounded-[22px] bg-mercury-30 p-4">
            <div className="flex items-center gap-2">
              <SyncOutlineIcon />
              <p className="font-medium">Adapt</p>
            </div>
            <div className="mt-11 flex items-center gap-2">
              <Switch aria-label="Adapt" />
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold text-mercury-950">Response Length</p>
          <p className="text-mercury-700">
            How detailed should the Agent's responses be?
          </p>
          <div className="mt-4 max-w-[300px] rounded-[22px] bg-mercury-30 p-4">
            <div className="grid grid-cols-3">
              <div className="flex flex-col">
                <BriefIcon />
                <span className="text-15 font-medium text-mercury-900">
                  Brief
                </span>
              </div>
              <div className="flex flex-col items-center">
                <ModerateIcon />
                <span className="text-15 font-medium text-mercury-900">
                  Moderate
                </span>
              </div>
              <div className="flex flex-col items-end">
                <DetailedIcon />
                <span className="text-15 font-medium text-mercury-900">
                  Detailed
                </span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <SliderCustom
                defaultValue={3}
                maxValue={6}
                minValue={0}
                step={3}
              />
            </div>
          </div>
        </div>
        <div className="pointer-events-none opacity-50">
          <p className="font-semibold text-mercury-950">
            Suggest Replies{" "}
            <span className="rounded-full bg-mercury-950 px-2 py-[2px] text-14 text-white">
              COMING SOON
            </span>
          </p>
          <p className="text-mercury-700">How many suggestions per message?</p>
          <div className="mt-4 max-w-[300px] rounded-[22px] bg-mercury-30 p-4">
            <div className="grid grid-cols-3">
              <div className="flex flex-col">
                <BriefIcon />
                <span className="text-15 font-medium text-mercury-900">
                  Brief
                </span>
              </div>
              <div className="flex flex-col items-center">
                <ModerateIcon />
                <span className="text-15 font-medium text-mercury-900">
                  Moderate
                </span>
              </div>
              <div className="flex flex-col items-end">
                <DetailedIcon />
                <span className="text-15 font-medium text-mercury-900">
                  Detailed
                </span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <SliderCustom
                defaultValue={3}
                maxValue={6}
                minValue={0}
                step={3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentBehaviors
