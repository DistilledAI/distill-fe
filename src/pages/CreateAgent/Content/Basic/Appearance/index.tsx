import { maxAvatarPlaceholder2 } from "@assets/images"
import { CameraIcon } from "@components/Icons"
import { ClipboardTextIcon } from "@components/Icons/ClipboardTextIcon"
import { TelegramIcon } from "@components/Icons/RewardsIcons"
import { TwitterIcon } from "@components/Icons/Twitter"
import { WorldGlobalIcon } from "@components/Icons/World"
import { Input } from "@nextui-org/react"
import CategoryLabel, { FieldLabel } from "@pages/AgentDetail/CategoryLabel"
import ChangeAvatarContainer from "@pages/AgentDetail/ChangeAvatarContainer"
import { fileToBase64, isPassFileSize } from "@utils/index"
import { Controller, useFormContext } from "react-hook-form"
import { toast } from "react-toastify"
import ClanPublicChip from "../../ClanUtilities/ClanPublicChip"

const Appearance = () => {
  const { control, setValue, watch } = useFormContext()
  const avatarWatch = watch("avatar")

  const handleUploadAvatar = async (file: File) => {
    try {
      const maxSize = 5 * 1024 * 1024
      if (!isPassFileSize(file.size, maxSize)) return
      setValue("avatarFile", file, { shouldDirty: true })
      const fileBase64 = await fileToBase64(file)
      if (fileBase64) setValue("avatar", fileBase64, { shouldDirty: true })
    } catch (error) {
      console.error(error)
      toast.error(`${file.name} failed to upload.`)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <CategoryLabel text="Public Appearance" icon={<ClipboardTextIcon />} />
        <ClanPublicChip />
      </div>
      <div className="mt-6 flex flex-wrap gap-4 rounded-[22px] border-1 border-mercury-100 bg-mercury-30 p-6 max-md:p-4">
        <div className="flex w-[240px] flex-col items-center justify-center max-md:w-full">
          <ChangeAvatarContainer handleUpload={handleUploadAvatar}>
            <div className="group relative h-[140px] w-[140px] cursor-pointer overflow-hidden rounded-full border-1 border-mercury-100 max-md:h-[80px] max-md:w-[80px]">
              <img
                className="h-full w-full object-cover"
                src={avatarWatch || maxAvatarPlaceholder2}
              />
              <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brown-50 opacity-0 group-hover:opacity-100">
                <CameraIcon />
              </div>
            </div>
          </ChangeAvatarContainer>
          <p className="mt-4 text-center text-13 font-medium text-mercury-800 max-md:mt-2">
            Max file size: 5MB
          </p>
        </div>
        <div className="flex-1">
          <div>
            <Controller
              name="username"
              control={control}
              render={({ field: { value, onChange } }: any) => {
                return (
                  <div className="w-full">
                    <FieldLabel text="Agent name" required />
                    <div className="flex items-center max-sm:h-auto">
                      <Input
                        key="agent-name"
                        value={value}
                        type="text"
                        placeholder="Keep it unique and short."
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
          <div className="mt-4">
            <Controller
              name="description"
              control={control}
              render={({ field: { value, onChange } }: any) => {
                return (
                  <div className="w-full">
                    <FieldLabel text="Short Bio" required />
                    <div className="flex items-center max-sm:h-auto">
                      <Input
                        key="agent-description"
                        value={value}
                        type="text"
                        placeholder='e.g., "A helpful customer service agent"'
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
          <div className="mt-4">
            <div className="mb-2">
              <h4 className="text-16 font-semibold text-mercury-950 max-md:text-14">
                Links
              </h4>
            </div>
            <div className="grid grid-cols-3 gap-2 max-md:grid-cols-1">
              <Controller
                name="x_link"
                control={control}
                render={({ field: { value, onChange } }: any) => {
                  return (
                    <div className="w-full">
                      <div className="flex items-center max-sm:h-auto">
                        <Input
                          startContent={<TwitterIcon />}
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
                name="website_link"
                control={control}
                render={({ field: { value, onChange } }: any) => {
                  return (
                    <div className="w-full">
                      <div className="flex items-center max-sm:h-auto">
                        <Input
                          startContent={<WorldGlobalIcon />}
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
                name="telegram_link"
                control={control}
                render={({ field: { value, onChange } }: any) => {
                  return (
                    <div className="w-full">
                      <div className="flex items-center max-sm:h-auto">
                        <Input
                          startContent={<TelegramIcon />}
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
      </div>
    </div>
  )
}

export default Appearance
