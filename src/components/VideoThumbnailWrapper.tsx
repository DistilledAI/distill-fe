import { useVideoThumbnail } from "@hooks/useVideoThumbnail"

interface VideoThumbnailWrapperProps {
  videoUrl: string | null | undefined
  size?: number
  time?: number
  children: (
    thumbnail: string | null,
    loading: boolean,
    isVideo: boolean,
  ) => React.ReactNode
}

export const VideoThumbnailWrapper = ({
  videoUrl,
  size = 32,
  time = 0,
  children,
}: VideoThumbnailWrapperProps) => {
  const { thumbnail, loading, videoRef } = useVideoThumbnail(
    videoUrl,
    size,
    time,
  )

  const isVideo = (videoUrl && /\.(mp4|webm|ogg)$/i.test(videoUrl)) || false

  return (
    <>
      {isVideo && (
        <video
          ref={videoRef}
          muted
          preload="auto"
          className="hidden"
          crossOrigin="anonymous"
        />
      )}
      {children(thumbnail, loading, isVideo)}
    </>
  )
}
