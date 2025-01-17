import { ACTIVE_COLORS } from "@constants/index"
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import { fetchRetry } from "@oraichain/oraidex-common"
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

export const isImageUrl = (url: string) => {
  return /\.(jpeg|jpg|gif|png|webp|svg)$/.test(url)
}

export const getActiveColorRandomById = (id: number | string | undefined) => {
  if (!id || isNaN(Number(id)))
    return {
      bgColor: "",
      borderColor: "",
      textColor: "",
    }
  return ACTIVE_COLORS[Number(id) % ACTIVE_COLORS.length]
}

const randseed = new Array(4)

function seedrand(seed: any) {
  randseed.fill(0)

  for (let i = 0; i < seed.length; i++) {
    randseed[i % 4] =
      (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i)
  }
}

function rand() {
  // based on Java's String.hashCode(), expanded to 4 32bit values
  const t = randseed[0] ^ (randseed[0] << 11)

  randseed[0] = randseed[1]
  randseed[1] = randseed[2]
  randseed[2] = randseed[3]
  randseed[3] = randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8)

  return (randseed[3] >>> 0) / ((1 << 31) >>> 0)
}

function createColor() {
  // saturation is the whole color spectrum
  const h = Math.floor(rand() * 360)
  // saturation goes from 40 to 100, it avoids greyish colors
  const s = `${rand() * 60 + 40}%`
  // lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%
  const l = `${(rand() + rand() + rand() + rand()) * 25}%`

  return `hsl(${h},${s},${l})`
}

function createImageData(size: number) {
  const width = size // Only support square icons for now
  const height = size

  const dataWidth = Math.ceil(width / 2)
  const mirrorWidth = width - dataWidth

  const data = []
  for (let y = 0; y < height; y++) {
    let row = []
    for (let x = 0; x < dataWidth; x++) {
      // this makes foreground and background color to have a 43% (1/2.3) probability
      // spot color has 13% chance
      row[x] = Math.floor(rand() * 2.3)
    }
    const r = row.slice(0, mirrorWidth)
    r.reverse()
    row = row.concat(r)

    for (let i = 0; i < row.length; i++) {
      data.push(row[i])
    }
  }

  return data
}

function buildOpts(opts: any) {
  const newOpts: any = {}

  newOpts.seed = opts.seed || Math.floor(Math.random() * 10 ** 16).toString(16)

  seedrand(newOpts.seed)

  newOpts.size = opts.size || 8
  newOpts.scale = opts.scale || 4
  newOpts.color = opts.color || createColor()
  newOpts.bgcolor = opts.bgcolor || createColor()
  newOpts.spotcolor = opts.spotcolor || createColor()

  return newOpts
}

export function renderIcon(opts: any, canvas: any) {
  opts = buildOpts(opts || {})
  const imageData = createImageData(opts.size)
  const width = Math.sqrt(imageData.length)

  canvas.width = canvas.height = opts.size * opts.scale

  const cc = canvas.getContext("2d")
  cc.fillStyle = opts.bgcolor
  cc.fillRect(0, 0, canvas.width, canvas.height)
  cc.fillStyle = opts.color

  for (let i = 0; i < imageData.length; i++) {
    // if data is 0, leave the background
    if (imageData[i]) {
      const row = Math.floor(i / width)
      const col = i % width

      // if data is 2, choose spot color, if 1 choose foreground
      cc.fillStyle = imageData[i] === 1 ? opts.color : opts.spotcolor

      cc.fillRect(col * opts.scale, row * opts.scale, opts.scale, opts.scale)
    }
  }

  return canvas
}

export const fileToBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export const isPassFileSize = (fileSize: number, maxSize: number) => {
  if (fileSize > maxSize) {
    toast.warning(`Max size: ${(maxSize / 1024 / 1024).toFixed(2)} MB`)
    return false
  }

  return true
}

export const calculateFileSize = (fileSize: number) => {
  if (!fileSize) return ""
  const units = ["bytes", "KB", "MB", "GB"]
  let unitIndex = 0

  while (fileSize >= 1024 && unitIndex < units.length - 1) {
    fileSize /= 1024
    unitIndex++
  }

  return `${Math.round(fileSize)} ${units[unitIndex]}`
}

export const getRemainingDays = (createdAt: number, endDate: number) => {
  const now = Date.now()

  if (endDate <= createdAt) {
    return { totalDays: 0, remainingDays: 0 }
  }

  const totalDays =
    Math.ceil((endDate - createdAt) / (1000 * 60 * 60 * 24)) || 0

  if (now < createdAt) {
    return { totalDays, remainingDays: totalDays }
  }

  const remainingTime = endDate - now || 0
  if (remainingTime <= 0) {
    return { totalDays, remainingDays: 0 }
  }

  const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24))
  return { totalDays, remainingDays }
}

export const getRemainingDaysPercentage = (
  createdAt: number,
  endDate: number,
) => {
  const { totalDays, remainingDays } = getRemainingDays(createdAt, endDate)

  if (totalDays === 0) {
    return { percentage: 100 }
  }

  const percentage = 100 - Math.round((remainingDays / totalDays) * 100)

  return { percentage }
}

export const formatNumberWithComma = (num: number) => {
  if (num) {
    return num.toLocaleString("en-US")
  }
  return "0"
}

export const isMarkdownImage = (str: string) => {
  const markdownImageRegex =
    /^!\[.*\]\(https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|svg|webp)(\?.*)?\)$/i
  return markdownImageRegex.test(str.trim())
}

export const getTokensPriceByIds = async (
  tokens: string[],
  cachedPrices = {},
): Promise<any> => {
  if (tokens.length === 0) return cachedPrices

  const BASE_URL =
    "https://api.geckoterminal.com/api/v2/networks/solana/tokens/multi/"
  const TOKEN_LIST = tokens.map(encodeURIComponent).join(",")
  const fullUrl = BASE_URL + TOKEN_LIST
  const prices: any = { ...cachedPrices }
  try {
    const resp = await fetchRetry(fullUrl)
    const rawData = await resp.json()
    // update cached
    for (const key of tokens) {
      const tokenInfo = rawData.data.find(
        (item: any) => item.attributes.address,
      )
      prices[key] = tokenInfo?.attributes?.price_usd
    }
  } catch {
    // remain old cache
    console.log("error getTokensPriceByIds: ", prices)
  }
  return prices
}

export async function fetchJSONDataFromUrl(url: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    const json = await response.json()

    return json
  } catch (error) {
    console.log("error", error)
    return {
      image: url,
    }
  }
}

export const shortenNumber = (number: number) => {
  if (number >= 1000000000000) {
    return (number / 1000000000000).toFixed(1).replace(".0", "") + "T"
  } else if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1).replace(".0", "") + "B"
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(".0", "") + "M"
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(".0", "") + "k"
  }
  return number
}
