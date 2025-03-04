import { CursorIcon, DislikeFillIcon, LikeFillIcon } from "@components/Icons"
import { LockFilledIcon } from "@components/Icons/AgentDetailIcon"
import { ArrowRightIcon } from "@components/Icons/Arrow"
import { Textarea } from "@nextui-org/react"
import React, { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { twMerge } from "tailwind-merge"

const TopicRestriction: React.FC = () => {
  const { control } = useFormContext()
  const [visible, setVisible] = useState(false)

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <div
          onClick={() => setVisible(!visible)}
          className="flex cursor-pointer items-center gap-1 hover:opacity-70"
        >
          <CursorIcon />
          <span className="text-[22px] font-semibold max-md:text-18">
            Topic Restrictions
          </span>
          <div
            className={twMerge(
              "mt-1 rotate-[90deg] max-md:mt-[2px]",
              visible && "rotate-[-90deg]",
            )}
          >
            <ArrowRightIcon size={24} />
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-mercury-70 px-2">
          <LockFilledIcon />
          <span className="font-medium uppercase text-mercury-700 max-md:text-14">
            private
          </span>
        </div>
      </div>
      <div className={twMerge("hidden", visible && "block")}>
        <div className="mt-6 grid grid-cols-2 gap-6 max-md:grid-cols-1">
          <div className="rounded-[22px] bg-green-50 p-4">
            <div className="flex items-center gap-1">
              <LikeFillIcon />
              <p className="font-semibold">Knowledge Domain</p>
            </div>
            <p className="my-2 min-h-10 leading-5 text-mercury-700">
              List any specific areas of knowledge the Agent should specialize
              in
            </p>
            <Controller
              name="knowledge_domain"
              control={control}
              render={({ field: { value, onChange } }: any) => {
                return (
                  <div className="w-full">
                    <Textarea
                      classNames={{
                        inputWrapper: "border-1 border-mercury-400",
                      }}
                      rows={3}
                      value={value || ""}
                      placeholder='eg., "finance, fitness, coding"'
                      onChange={(e) => {
                        onChange(e.target.value)
                      }}
                    />
                  </div>
                )
              }}
            />
          </div>
          <div className="rounded-[22px] bg-[#FDF0EF] p-4">
            <div className="flex items-center gap-1">
              <DislikeFillIcon />
              <p className="font-semibold">Prohibited Topics</p>
            </div>
            <p className="my-2 min-h-10 leading-5 text-mercury-700">
              Specify any topics the Agent should avoid
            </p>
            <Controller
              name="prohibited_topics"
              control={control}
              render={({ field: { value, onChange } }: any) => {
                return (
                  <div className="w-full">
                    <Textarea
                      classNames={{
                        inputWrapper: "border-1 border-mercury-400",
                      }}
                      rows={3}
                      placeholder='eg., "politics, religion, violence"'
                      onChange={(e) => {
                        onChange(e.target.value)
                      }}
                      value={value || ""}
                    />
                  </div>
                )
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopicRestriction
