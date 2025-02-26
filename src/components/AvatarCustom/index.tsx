import { Badge } from "@nextui-org/react"
import { renderIcon } from "@utils/index"
import React, { ReactNode, useEffect, useRef } from "react"
import { twMerge } from "tailwind-merge"

export interface AvatarCustomProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  badgeIcon?: string | ReactNode
  className?: string
  badgeClassName?: string
  badgeBaseClassName?: string
  icon?: React.ReactNode
  publicAddress?: string
  scalePoint?: number
  isLive?: boolean
}

const AvatarCustom: React.FC<AvatarCustomProps> = ({
  badgeIcon,
  className,
  badgeClassName,
  badgeBaseClassName,
  scalePoint,
  src,
  icon,
  publicAddress = "",
  isLive = false,
  ...props
}) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!src && publicAddress && canvasRef.current) {
      const canvas = canvasRef.current
      renderIcon(
        { seed: publicAddress?.toLowerCase(), scale: scalePoint, size: 10 },
        canvas,
      )
      const dataUrl = canvas?.toDataURL()
      if (dataUrl && imageRef.current) {
        imageRef.current.src = dataUrl
      }
    }
  }, [src, scalePoint, publicAddress])

  if (badgeIcon) {
    return (
      <Badge
        content={badgeIcon}
        placement="bottom-right"
        variant="solid"
        isOneChar
        classNames={{
          base: twMerge("h-fit", badgeBaseClassName),
          badge: twMerge(
            "w-[18px] h-[18px] right-[15%] bottom-[15%] z-1",
            badgeClassName,
          ),
        }}
        showOutline={false}
      >
        <div
          className={twMerge(
            "box-border h-10 w-10 overflow-hidden rounded-full border-[2px] border-mercury-400 bg-mercury-100",
            isLive &&
              "relative h-9 w-9 border-white outline outline-2 outline-[#FF3B30]",
            className,
          )}
        >
          <canvas ref={canvasRef} style={{ display: "none" }} />
          {icon ? (
            <div className="flex h-full w-full items-center justify-center">
              {icon}
            </div>
          ) : (
            <img
              className="h-full w-full object-cover"
              ref={imageRef}
              src={src}
              loading="lazy"
              {...props}
            />
          )}

          {/* <img
          src=""
            width={28}
            height={25}
            className="absolute -top-[10px] left-1/2 -translate-x-1/2"
          /> */}
        </div>
      </Badge>
    )
  }

  return (
    <div
      className={twMerge(
        "box-border h-10 w-10 overflow-hidden rounded-full border-[2px] border-mercury-400 bg-mercury-100",
        isLive && "h-9 w-9 border-white outline outline-2 outline-[#FF3B30]",
        className,
      )}
    >
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {icon ? (
        <div className="flex h-full w-full items-center justify-center">
          {icon}
        </div>
      ) : (
        <img
          className="h-full w-full object-cover"
          ref={imageRef}
          src={src}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  )
}
export default AvatarCustom
