import { ClanOutlineIcon } from "@components/Icons/Sidebar"
import ClanPublicChip from "./ClanPublicChip"
import { Input, Switch, Textarea } from "@nextui-org/react"
import ClanTitle from "./ClanTitle"
import ChangeAvatarContainer from "@pages/AgentDetail/ChangeAvatarContainer"
import { maxAvatarPlaceholder2 } from "@assets/images"
import { BroadcastIcon } from "@components/Icons/Broadcast"
import TotalMemberBadge from "@components/TotalMemberBadge"
import { fileToBase64, isPassFileSize } from "@utils/index"
import VideoCustom from "@components/VideoCustom"
import { useEffect, useState } from "react"
import LabelRequired from "./LabelRequired"
import { toast } from "react-toastify"
import { Controller, useFormContext } from "react-hook-form"

type MediaPreview = {
  src: string
  type: "image" | "video" | null
}

const ClanAppearance: React.FC = () => {
  const { control, setValue } = useFormContext()
  const [mediaPreview, setMediaPreview] = useState<MediaPreview>({
    src: "",
    type: "image",
  })

  useEffect(() => {
    return () => {
      if (mediaPreview.type === "video" && mediaPreview.src) {
        URL.revokeObjectURL(mediaPreview.src)
      }
    }
  }, [mediaPreview])

  const handleUpdateImageClan = async (file: File) => {
    try {
      const maxSize = 5 * 1024 * 1024
      if (!isPassFileSize(file.size, maxSize)) return

      if (file.type.startsWith("image/")) {
        const fileBase64 = await fileToBase64(file)
        setMediaPreview({
          src: fileBase64 as string,
          type: "image",
        })
        setValue("clan.imageLive", file)
        setValue("clan.videoLive", null)
      } else if (file.type.startsWith("video/")) {
        const videoSrc = URL.createObjectURL(file)
        setMediaPreview({
          src: videoSrc,
          type: "video",
        })
        setValue("clan.videoLive", file)
        setValue("clan.imageLive", null)
      } else {
        throw new Error("Unsupported file type")
      }
    } catch (error) {
      console.error(error)
      toast.error(`${file.name} failed to upload.`)
    }
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
      <div className="flex space-x-6">
        <Controller
          control={control}
          name="clan.isEnableClan"
          render={({ field }) => (
            <Switch
              isSelected={field.value}
              onValueChange={(isSelected) => field.onChange(isSelected ? 1 : 0)}
              classNames={{
                label: "text-[16px] font-bold text-mercury-950",
              }}
            >
              Enable Clan
            </Switch>
          )}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 rounded-[22px] border border-mercury-100 bg-mercury-30 p-6">
        <div className="col-span-1 flex flex-col items-center gap-4">
          <LabelRequired label="Streaming Photo or Video" />
          <ChangeAvatarContainer
            accept="image/*, video/*"
            handleUpload={handleUpdateImageClan}
          >
            <div
              className={
                "relative h-[200px] w-[160px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-mercury-100"
              }
            >
              {mediaPreview.type === "image" ? (
                <div
                  className="h-full w-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${mediaPreview.src || maxAvatarPlaceholder2})`,
                  }}
                />
              ) : (
                <VideoCustom
                  videoSrc={mediaPreview.src}
                  classNames={{
                    wrapper: "w-full h-full bg-mercury-100",
                    video: "h-full w-full object-cover",
                  }}
                />
              )}

              <div className="absolute inset-0 z-10 rounded-lg border-[2px] border-white/20" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.70) 0%, #000 100%)",
                  opacity: 0.1,
                }}
              />
              <div
                className="absolute inset-0 top-[21.05%] h-[78.95%] w-full"
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
              name="clan.label"
              render={({ field }) => (
                <Input
                  {...field}
                  classNames={{
                    inputWrapper:
                      "bg-mercury-70 rounded-lg border border-mercury-400 p-4",
                    input: "text-[15px] font-medium text-mercury-950",
                  }}
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
                  classNames={{
                    inputWrapper:
                      "bg-mercury-70 rounded-lg border border-mercury-400 p-4",
                    input: "text-[15px] font-medium text-mercury-950",
                  }}
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
