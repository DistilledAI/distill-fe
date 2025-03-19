import { useState, useEffect, useRef } from "react"

const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube.com\/watch\?v=|youtu.be\/|youtube.com\/embed\/)([^"&?/s]{11})/i,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

const generateVideoThumbnail = (
  video: HTMLVideoElement,
  size: number = 32,
  time: number = 0,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")

    if (!context) {
      reject(new Error("Cannot get 2D context from canvas"))
      return
    }

    video.addEventListener("loadedmetadata", () => {
      const aspectRatio = video.videoWidth / video.videoHeight
      if (aspectRatio > 1) {
        canvas.width = size
        canvas.height = size / aspectRatio
      } else {
        canvas.width = size * aspectRatio
        canvas.height = size
      }

      video.currentTime = time
    })

    video.addEventListener("seeked", () => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      const thumbnail = canvas.toDataURL("image/png")
      resolve(thumbnail)
    })

    video.addEventListener("error", (e) => {
      console.error("Video error:", e.message, e)
      reject(new Error("Failed to load video: " + e.message))
    })

    video.addEventListener("canplay", () => {
      console.log("Video can play, ready to seek")
    })

    const cleanup = () => {
      video.removeEventListener("loadedmetadata", () => {})
      video.removeEventListener("seeked", () => {})
      video.removeEventListener("error", () => {})
      video.removeEventListener("canplay", () => {})
    }

    video.addEventListener("loadedmetadata", cleanup, { once: true })
    video.addEventListener("error", cleanup, { once: true })
  })
}

export const useVideoThumbnail = (
  videoUrl: string | null | undefined,
  size: number = 32,
  time: number = 0,
) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoUrl) {
      setThumbnail(null)
      setLoading(false)
      return
    }

    // Check if it's a YouTube URL
    const youtubeId = getYouTubeVideoId(videoUrl)
    if (youtubeId) {
      // Use YouTube thumbnail API
      const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
      setThumbnail(thumbnailUrl)
      setLoading(false)
      return
    }

    const isVideo = /\.(mp4|webm|ogg)$/i.test(videoUrl)

    if (!isVideo) {
      setThumbnail(videoUrl)
      setLoading(false)
      return
    }

    if (videoRef.current) {
      setLoading(true)
      const video = videoRef.current
      video.src = videoUrl

      generateVideoThumbnail(video, size, time)
        .then((thumb) => {
          setThumbnail(thumb)
          setLoading(false)
        })
        .catch((err) => {
          console.error("Thumbnail generation failed:", err)
          setThumbnail(null)
          setLoading(false)
        })
    }
  }, [videoUrl, size, time])

  return { thumbnail, loading, videoRef }
}
