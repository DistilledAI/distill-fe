import FingerprintJS from "@fingerprintjs/fingerprintjs"
import { IUser } from "@reducers/user/UserSlice"
import { cloneElement, createElement } from "react"
import { toast } from "react-toastify"

export function defineElement(element: any, props = {}) {
  if (element) {
    return typeof element === "function"
      ? createElement(element, props)
      : cloneElement(element, props)
  }

  return null
}

export const capitalizeFirstLetter = (str: string): string => {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  return ""
}

export const getVisitorId = async () => {
  const fp = await FingerprintJS.load()
  const result = await fp.get()
  return result.visitorId
}

export const centerTextEllipsis = (
  text: string,
  size?: number,
  key?: string,
) => {
  return `${text?.slice(0, size || 5)}${key || "..."}${text?.slice(-(size || 5))}`
}

export const copyClipboard = (event: any, text: string) => {
  event.stopPropagation()
  navigator.clipboard.writeText(text)
  toast.success("Copied!")
}

export const makeId = (length = 8) => {
  let result = ""
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const textToVoice = async (
  text: string,
  speaker: IUser["configBot"],
) => {
  if (!window.speechSynthesis) {
    console.error("Speech Synthesis is not supported.")
    return
  }

  try {
    const response = await fetch(
      "https://ai-dev.cupiee.com/voice/text_to_speech",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          lang: "en",
          speaker,
          pitch: 1,
          ref_voice: "",
        }),
      },
    )

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const blob = await response.blob()

    if (blob) {
      const audioContext = new AudioContext()
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          audioContext.decodeAudioData(
            reader.result,
            (buffer) => {
              const source = audioContext.createBufferSource()
              source.buffer = buffer
              source.connect(audioContext.destination)
              source.start(0)
            },
            (error) => {
              console.error("Error decoding audio data:", error)
            },
          )
        }
      }

      reader.onerror = (error) => {
        console.error("Error reading audio blob:", error)
      }

      reader.readAsArrayBuffer(blob)
    } else {
      console.error("Response is not a Blob.")
    }
  } catch (error) {
    console.error("Error fetching audio data:", error)
  }
}
