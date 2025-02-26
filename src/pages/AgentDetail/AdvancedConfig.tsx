// import { scaler } from "@assets/images"
import { ClipboardTextIcon } from "@components/Icons/ClipboardTextIcon"
import { Textarea } from "@nextui-org/react"
import { Controller, useFormContext } from "react-hook-form"
import CategoryLabel, { FieldLabel } from "./CategoryLabel"

const AdvancedConfig: React.FC = () => {
  const { control } = useFormContext()

  return (
    <div>
      <CategoryLabel
        text="Advanced Configuration"
        icon={<ClipboardTextIcon />}
      />
      <div className="my-4">
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
                minRows={5}
                maxRows={5}
                onChange={(e) => onChange(e.target.value)}
                value={value || ""}
              />
            )
          }}
        />
      </div>

      {/* <div className="flex w-full justify-between gap-6 max-sm:flex-wrap">
        <div className="w-[65%] max-sm:w-full">
          <FieldLabel text="Prompt" required />
          <Textarea
            placeholder="Instruct your agent on how to act and respond to messages from users."
            className="w-full rounded-xl border border-mercury-400"
            classNames={{
              inputWrapper: "bg-mercury-70",
            }}
            minRows={7}
            maxRows={7}
          />
        </div>
        <div className="w-[35%] max-sm:w-full">
          <div className="flex justify-between">
            <FieldLabel text="Mood" />
            <span className="text-base-sb text-[#4F705B] max-sm:text-13">
              Positive, Energetic
            </span>
          </div>
          <img
            className="m-auto h-auto w-[250px] object-cover p-4"
            src={scaler}
            alt="agent creative"
          />
        </div>
      </div> */}
    </div>
  )
}
export default AdvancedConfig
