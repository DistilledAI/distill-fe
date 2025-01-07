import { ArrowsMaximizeIcon } from "@components/Icons/Arrow"
import {
  PauseIcon,
  PlayIcon,
  VolumeIcon,
  VolumeOffIcon,
} from "@components/Icons/Voice"
import React, { useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

interface Props {
  videoSrc: string
  onMuteToggle?: ((muted: boolean) => void) | undefined
  muted?: boolean
  classNames?: {
    wrapper?: string
    video?: string
    volumeBtn?: string
    playBtn?: string
    fullScreenBtn?: string
  }
  isVolumeIcon?: boolean
  isPlayIcon?: boolean
  isFullScreenIcon?: boolean
  volumeIcon?: React.ReactNode
  playIcon?: React.ReactNode
  fullScreenIcon?: React.ReactNode
  imgPreview?: string
  skeletonPreview?: React.ReactNode
}

const VideoCustom = ({
  videoSrc,
  muted = true,
  onMuteToggle,
  classNames,
  isVolumeIcon = false,
  isPlayIcon = false,
  isFullScreenIcon = false,
  volumeIcon,
  playIcon,
  fullScreenIcon,
  imgPreview,
  skeletonPreview,
}: Props) => {
  const videoRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(!videoRef.current?.paused)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      if (onMuteToggle) {
        onMuteToggle(videoRef.current.muted)
      }
    }
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (isFullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      } else {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen()
        } else if (videoRef.current.webkitRequestFullscreen) {
          videoRef.current.webkitRequestFullscreen()
        } else if (videoRef.current.msRequestFullscreen) {
          videoRef.current.msRequestFullscreen()
        }
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === videoRef.current)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onplay = () => setIsPlaying(true)
      videoRef.current.onpause = () => setIsPlaying(false)
    }
  }, [])

  useEffect(() => {
    if (isFullscreen && videoRef.current) {
      videoRef.current.muted = muted
    } else {
      if (onMuteToggle) {
        onMuteToggle(videoRef?.current?.muted)
      }
    }
  }, [isFullscreen, muted])

  return (
    <div className={twMerge("relative", classNames?.wrapper)}>
      <video
        ref={videoRef}
        muted={muted}
        autoPlay
        playsInline
        loop
        controls={false}
        onLoadedData={() => setIsLoaded(true)}
        className={twMerge(
          classNames?.video,
          isFullscreen && "fullscreen",
          !isLoaded && "hidden",
        )}
      >
        <source src={videoSrc} type="video/mp4" />
        <track kind="captions" />
      </video>
      {!!imgPreview && !isLoaded && (
        <img className={classNames?.video} src={imgPreview} alt="preview" />
      )}
      {!imgPreview && !isLoaded && skeletonPreview}
      <div></div>
      {/* Volume Button */}
      {isVolumeIcon && !isFullscreen && (
        <button
          type="button"
          onClick={toggleVideoMute}
          className={twMerge(
            "absolute left-5 top-5 z-10 p-[1px]",
            classNames?.volumeBtn,
          )}
        >
          {volumeIcon ? (
            volumeIcon
          ) : muted ? (
            <VolumeOffIcon color="white" />
          ) : (
            <VolumeIcon color="white" />
          )}
        </button>
      )}
      {/* Play/Pause Button */}
      {isPlayIcon && !isFullscreen && (
        <button
          type="button"
          onClick={togglePlayPause}
          className={twMerge(
            "absolute bottom-5 left-5 z-10 p-[1px]",
            classNames?.playBtn,
          )}
        >
          {playIcon ? playIcon : isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      )}
      {/* Fullscreen Button */}
      {isFullScreenIcon && !isFullscreen && (
        <button
          type="button"
          onClick={toggleFullscreen}
          className={twMerge(
            "absolute bottom-5 right-5 z-10 p-[1px]",
            classNames?.fullScreenBtn,
          )}
        >
          {fullScreenIcon ? fullScreenIcon : <ArrowsMaximizeIcon />}
        </button>
      )}
    </div>
  )
}

export default VideoCustom
