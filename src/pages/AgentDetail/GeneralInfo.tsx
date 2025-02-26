import AvatarCustom from "@components/AvatarCustom"
import { WorldIcon } from "@components/Icons/AgentDetailIcon"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { ClipboardTextIcon } from "@components/Icons/ClipboardTextIcon"
import { Input, Textarea } from "@nextui-org/react"
import { fileToBase64, isPassFileSize } from "@utils/index"
import { Controller, useFormContext } from "react-hook-form"
import { toast } from "react-toastify"
import { twMerge } from "tailwind-merge"
import { IAgentData } from "types/user"
import CategoryLabel, { FieldLabel } from "./CategoryLabel"
import ChangeAvatarContainer from "./ChangeAvatarContainer"

export const DESC_MAX_LENGTH = 200

const GeneralInfo: React.FC<{
  agentData?: IAgentData
}> = ({ agentData }) => {
  const { control, watch, setValue } = useFormContext()
  const descLength = watch("description")?.length ?? 0
  const avatarWatch = watch("avatar")

  const handleUploadAvatar = async (file: File) => {
    try {
      const maxSize = 5 * 1024 * 1024
      if (!isPassFileSize(file.size, maxSize)) return
      setValue("avatarFile", file)
      const fileBase64 = await fileToBase64(file)
      if (fileBase64) setValue("avatar", fileBase64)
    } catch (error) {
      console.error(error)
      toast.error(`${file.name} failed to upload.`)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <CategoryLabel text="Public Appearance" icon={<ClipboardTextIcon />} />
        <div className="flex items-center gap-1 rounded-full bg-[rgba(0,122,255,0.15)] px-2">
          <WorldIcon size={20} color="#007AFF" />
          <span className="font-medium uppercase text-[#007AFF]">public</span>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-[56px] max-sm:flex-col max-sm:items-start max-sm:gap-5">
        <Controller
          name="username"
          control={control}
          render={({ field: { value, onChange } }: any) => {
            return (
              <div className="w-full">
                <FieldLabel text="Agent name" required />
                <div className="flex h-[72px] items-center max-sm:h-auto">
                  <Input
                    key="agent-name"
                    value={value}
                    type="text"
                    placeholder="Keep it unique and within 4-30 characters."
                    className="w-full"
                    classNames={{
                      mainWrapper: "border border-mercury-400 rounded-xl",
                      inputWrapper: " bg-mercury-70",
                    }}
                    onChange={(e) => onChange(e.target.value)}
                  />
                </div>
              </div>
            )
          }}
        />

        <div>
          <FieldLabel text="Agent picture" />
          <div className="flex items-center gap-[18px]">
            <ChangeAvatarContainer handleUpload={handleUploadAvatar}>
              <AvatarCustom
                src={avatarWatch ?? undefined}
                icon={!avatarWatch ? <FilledBrainAIIcon size={32} /> : null}
                publicAddress={agentData?.publicAddress ?? agentData?.username}
                className="h-[72px] w-[72px] cursor-pointer max-sm:h-[50px] max-sm:w-[50px]"
              />
            </ChangeAvatarContainer>
            {/* <Button className="h-[44px] rounded-full border border-mercury-50 bg-mercury-950">
              <span className="text-base text-white">Use AI Generated</span>
            </Button> */}
            <ChangeAvatarContainer handleUpload={handleUploadAvatar}>
              <button
                type="button"
                className="h-[44px] w-[130px] rounded-full border border-mercury-50 bg-mercury-30 max-sm:h-[38px] max-sm:w-auto max-sm:bg-mercury-100 max-sm:px-3"
              >
                <span className="text-base text-mercury-950 max-sm:text-14">
                  Upload picture
                </span>
              </button>
            </ChangeAvatarContainer>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between">
          <FieldLabel text="Bio" required />
          <span
            className={twMerge(
              "text-base-md text-mercury-900 max-sm:text-14",
              descLength > DESC_MAX_LENGTH && "text-red-500",
            )}
          >
            {descLength}/{DESC_MAX_LENGTH}
          </span>
        </div>

        <Controller
          name="description"
          control={control}
          render={({ field: { value, onChange } }: any) => {
            return (
              <div className="w-full">
                <Textarea
                  placeholder={`e.g., "A helpful customer service agent"`}
                  minRows={5}
                  maxRows={5}
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

        <div className="mt-4 flex gap-4 max-md:flex-wrap">
          <Controller
            name="website_link"
            control={control}
            render={({ field: { value, onChange } }: any) => {
              return (
                <div className="w-full">
                  <FieldLabel text="Website Link" />
                  <div className="flex items-center max-sm:h-auto">
                    <Input
                      value={value}
                      type="text"
                      placeholder="https://example.com/"
                      className="w-full"
                      classNames={{
                        mainWrapper: "border border-mercury-400 rounded-xl",
                        inputWrapper: " bg-mercury-70",
                      }}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  </div>
                </div>
              )
            }}
          />
          <Controller
            name="x_link"
            control={control}
            render={({ field: { value, onChange } }: any) => {
              return (
                <div className="w-full">
                  <FieldLabel text="X (Twitter) Link" />
                  <div className="flex items-center max-sm:h-auto">
                    <Input
                      value={value}
                      type="text"
                      placeholder="https://x.com/username"
                      className="w-full"
                      classNames={{
                        mainWrapper: "border border-mercury-400 rounded-xl",
                        inputWrapper: " bg-mercury-70",
                      }}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  </div>
                </div>
              )
            }}
          />
          <Controller
            name="telegram_link"
            control={control}
            render={({ field: { value, onChange } }: any) => {
              return (
                <div className="w-full">
                  <FieldLabel text="Telegram Link" />
                  <div className="flex items-center max-sm:h-auto">
                    <Input
                      value={value}
                      type="text"
                      placeholder="https://t.me/username"
                      className="w-full"
                      classNames={{
                        mainWrapper: "border border-mercury-400 rounded-xl",
                        inputWrapper: " bg-mercury-70",
                      }}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  </div>
                </div>
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}
export default GeneralInfo
