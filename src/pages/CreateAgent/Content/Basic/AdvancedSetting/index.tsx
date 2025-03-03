import { PlusIcon } from "@components/Icons/Plus"
import { Textarea } from "@nextui-org/react"
import { FieldLabel } from "@pages/AgentDetail/CategoryLabel"
import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { twMerge } from "tailwind-merge"

const AdvancedSetting = () => {
  const [visible, setVisible] = useState(false)
  const { control } = useFormContext()

  return (
    <div className="mt-6">
      <div
        onClick={() => setVisible(!visible)}
        className="mb-5 flex cursor-pointer items-center gap-1 hover:opacity-70"
      >
        <span className="font-semibold text-brown-600">Advanced settings</span>
        {visible ? (
          <span className="ml-1 h-[2px] w-[12px] bg-brown-600"></span>
        ) : (
          <PlusIcon />
        )}
      </div>
      <div className={twMerge("hidden", visible && "flex flex-col gap-4")}>
        <div>
          <FieldLabel text="Greeting message" />

          <Controller
            name="firstMsg"
            control={control}
            render={({ field: { value, onChange } }: any) => {
              return (
                <Textarea
                  placeholder="An agent’s opening message in a new context."
                  className="w-full rounded-xl border border-mercury-400"
                  classNames={{
                    inputWrapper: "bg-mercury-70",
                  }}
                  rows={4}
                  onChange={(e) => onChange(e.target.value)}
                  value={value || ""}
                />
              )
            }}
          />
        </div>
        {/* <div>
          <FieldLabel text="Sample Prompts" />

          <Controller
            name="sample_prompts"
            control={control}
            render={({ field: { value, onChange } }: any) => {
              return (
                <Textarea
                  placeholder="Provide example questions or prompts that users might ask the Agent to help it understand typical queries."
                  className="w-full rounded-xl border border-mercury-400"
                  classNames={{
                    inputWrapper: "bg-mercury-70",
                  }}
                  rows={4}
                  onChange={(e) => onChange(e.target.value)}
                  value={value || ""}
                />
              )
            }}
          />
        </div>
        <div>
          <FieldLabel
            text="Target Audience"
            desc="Describe the typical user who will interact with this agent"
          />

          <Controller
            name="audience_profile"
            control={control}
            render={({ field: { value, onChange } }: any) => {
              return (
                <Textarea
                  placeholder='e.g., "Young professionals seeking career advice" or "children learning math basics"'
                  className="w-full rounded-xl border border-mercury-400"
                  classNames={{
                    inputWrapper: "bg-mercury-70",
                  }}
                  rows={4}
                  onChange={(e) => onChange(e.target.value)}
                  value={value || ""}
                />
              )
            }}
          />
        </div> */}
      </div>
    </div>
  )
}

export default AdvancedSetting
