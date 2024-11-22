import React from "react"
import CategoryLabel, { FieldLabel } from "../CategoryLabel"
import { TargetIcon } from "@components/Icons"
import { Controller, useFormContext } from "react-hook-form"
import { Textarea } from "@nextui-org/react"

const TargetAudience: React.FC = () => {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <CategoryLabel text="Target Audience" icon={<TargetIcon />} />
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
      <div>
        <FieldLabel
          text="Target Audience"
          desc="Describe the typical user who will interact with this agent"
        />

        <Controller
          name=""
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
      </div>
      <div>
        <FieldLabel text="Sample Prompts" />

        <Controller
          name=""
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
    </div>
  )
}

export default TargetAudience
