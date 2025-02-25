import { useEffect } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { toast } from "react-toastify"
import { Input, Switch, Textarea } from "@nextui-org/react"
import { ClanOutlineIcon } from "@components/Icons/Sidebar"
import { BroadcastIcon } from "@components/Icons/Broadcast"
import ChangeAvatarContainer from "@pages/AgentDetail/ChangeAvatarContainer"
import VideoCustom from "@components/VideoCustom"
import TotalMemberBadge from "@components/TotalMemberBadge"
import ClanPublicChip from "./ClanPublicChip"
import ClanTitle from "./ClanTitle"
import LabelRequired from "./LabelRequired"
import { isPassFileSize } from "@utils/index"
import { maxAvatarPlaceholder2 } from "@assets/images"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const VIDEO_EXTENSIONS = [
  ".mp4",
  ".mov",
  ".avi",
  ".mkv",
  ".webm",
  ".flv",
  ".wmv",
]

const ClanAppearance: React.FC = () => {
  const { control, setValue, watch } = useFormContext()

  const imageLive = watch("clan.imageLive")

  const mediaSrc = (() => {
    if (imageLive instanceof File) return URL.createObjectURL(imageLive)
    if (typeof imageLive === "string") return imageLive
    return maxAvatarPlaceholder2
  })()

  const isVideo =
    (imageLive instanceof File && imageLive.type.startsWith("video/")) ||
    (typeof imageLive === "string" &&
      VIDEO_EXTENSIONS.some((ext) => imageLive.toLowerCase().endsWith(ext)))

  useEffect(() => {
    return () => {
      if (imageLive instanceof File && mediaSrc.startsWith("blob:")) {
        URL.revokeObjectURL(mediaSrc)
      }
    }
  }, [imageLive, mediaSrc])

  const handleMediaUpload = (file: File) => {
    if (!isPassFileSize(file.size, MAX_FILE_SIZE)) return

    try {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        setValue("clan.imageLive", file)
      } else {
        throw new Error("Unsupported file type")
      }
    } catch (error) {
      console.error(error)
      toast.error(`${file.name} failed to upload.`)
    }
  }

  const inputClassNames = {
    inputWrapper: "bg-mercury-70 rounded-lg border border-mercury-400 p-4",
    input: "text-[15px] font-medium text-mercury-950",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <ClanTitle
          icon={<ClanOutlineIcon size={24} color="#A2845E" />}
          title="Clan Appearance"
        />
        <ClanPublicChip />
      </div>

      <Controller
        control={control}
        name="clan.isEnableClan"
        render={({ field }) => (
          <Switch
            isSelected={field.value === 1}
            onValueChange={(isSelected) => field.onChange(isSelected ? 1 : 0)}
            classNames={{ label: "text-[16px] font-bold text-mercury-950" }}
          >
            Enable Clan
          </Switch>
        )}
      />

      <div className="grid grid-cols-3 gap-4 rounded-[22px] border border-mercury-100 bg-mercury-30 p-6">
        <div className="col-span-1 flex flex-col items-center gap-4">
          <LabelRequired label="Streaming Photo or Video" />
          <ChangeAvatarContainer
            accept="image/*, video/*"
            handleUpload={handleMediaUpload}
          >
            <div className="relative h-[200px] w-[160px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-mercury-100">
              {isVideo ? (
                <VideoCustom
                  videoSrc={mediaSrc}
                  classNames={{
                    wrapper: "w-full h-full bg-mercury-100",
                    video: "h-full w-full object-cover",
                  }}
                />
              ) : (
                <div
                  className="h-full w-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${mediaSrc})` }}
                />
              )}
              <div className="absolute inset-0 z-10 rounded-lg border-[2px] border-white/20" />
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.70) 0%, #000 100%)",
                }}
              />
              <div
                className="absolute inset-0 top-[21.05%] h-[78.95%]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 28.5%, #000 100%)",
                }}
              />
              <div className="absolute left-3 top-3 z-10">
                <BroadcastIcon />
              </div>
              <div className="absolute bottom-[10px] left-[10px] z-10">
                <TotalMemberBadge
                  groupId="123"
                  iconSize={10}
                  textClassName="text-[11px] leading-[110%]"
                  memberFixed={999}
                />
              </div>
            </div>
          </ChangeAvatarContainer>
          <span className="text-13 font-medium text-mercury-800">
            Max file size: 5MB
          </span>
        </div>

        <div className="col-span-2 space-y-4">
          <div className="space-y-2">
            <LabelRequired label="Clan name" />
            <Controller
              control={control}
              name="clan.name"
              render={({ field }) => (
                <Input
                  {...field}
                  classNames={inputClassNames}
                  placeholder="Keep it unique and short."
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <LabelRequired label="Clan Description" />
            <Controller
              control={control}
              name="clan.description"
              render={({ field }) => (
                <Textarea
                  {...field}
                  classNames={inputClassNames}
                  placeholder={`e.g., "A helpful customer service agent"`}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClanAppearance
