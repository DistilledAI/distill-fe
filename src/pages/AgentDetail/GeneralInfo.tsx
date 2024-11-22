import AvatarCustom from "@components/AvatarCustom"
import { ClipboardTextIcon } from "@components/Icons/ClipboardTextIcon"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Textarea,
} from "@nextui-org/react"
import { Controller, useFormContext } from "react-hook-form"
import { IAgentData } from "types/user"
import CategoryLabel, { FieldLabel } from "./CategoryLabel"
import ChangeAvatarContainer from "./ChangeAvatarContainer"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { fileToBase64, isPassFileSize } from "@utils/index"
import { toast } from "react-toastify"
import { twMerge } from "tailwind-merge"
import { QuestionUserIconOutline } from "@components/Icons/UserIcon"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"

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
      <CategoryLabel text="General info" icon={<ClipboardTextIcon />} />
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
          <FieldLabel text="Description" />
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
                  placeholder="Briefly outline your agent story or mission."
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
      </div>
      <div className="flex w-full justify-between pt-3 max-md:flex-col">
        <div className="max-md:mb-5">
          <p className="font-semibold text-mercury-950">
            Your Agent's Primary purpose
          </p>
          <span className="text-mercury-700">
            What is the main role of the Agent?
          </span>
        </div>
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
    </div>
  )
}
export default GeneralInfo
