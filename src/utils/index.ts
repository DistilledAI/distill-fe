import FingerprintJS from "@fingerprintjs/fingerprintjs"
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

export const textToVoice = (text: string) => {
  if (!window.speechSynthesis) {
    console.error("Not support Speech Synthesis.")
    return
  }

  const maleVoices = [
    "Google US English Male",
    "Microsoft David Desktop - English (United States)",
  ]

  const foundVoice = window.speechSynthesis
    .getVoices()
    .find(({ name }) => maleVoices.includes(name))
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  if (foundVoice) utter.voice = foundVoice
  else console.log("no voice found, using default")
  utter.rate = 1
  speechSynthesis.speak(utter)
}
