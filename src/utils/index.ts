import FingerprintJS from "@fingerprintjs/fingerprintjs"
// import { IUser } from "@reducers/user/UserSlice"
import { cloneElement, createElement } from "react"
import { toast } from "react-toastify"
// import { postTextToSpeech } from "services/chat"

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

// export const textToVoice = async (
//   text: string,
//   speaker: IUser["configBot"],
// ) => {
//   if (!window.speechSynthesis) {
//     console.error("Not support Speech Synthesis.")
//     return
//   }

//   const res = await postTextToSpeech(text, speaker)

//   console.log({ res })

//   const maleVoices = [
//     "Google US English Male",
//     "Microsoft David Desktop - English (United States)",
//   ]

//   const speakText = () => {
//     window.speechSynthesis.cancel()

//     const voices = window.speechSynthesis.getVoices()
//     const foundVoice = voices.find(({ name }) => maleVoices.includes(name))

//     if (foundVoice) {
//       console.log("Using male voice:", foundVoice.name)
//       const utter = new SpeechSynthesisUtterance(text)
//       utter.voice = foundVoice
//       utter.rate = 1
//       window.speechSynthesis.speak(utter)
//     } else {
//       console.log("No male voice found, using default")
//       const utter = new SpeechSynthesisUtterance(text)
//       utter.rate = 1
//       window.speechSynthesis.speak(utter)
//     }
//   }

//   if (window.speechSynthesis.getVoices().length === 0) {
//     window.speechSynthesis.addEventListener("voiceschanged", () => {
//       speakText()
//     })
//   } else {
//     speakText()
//   }
// }
