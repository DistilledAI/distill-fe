import BigNumber from "bignumber.js"

export const validateNumber: any = (amount: any) => {
  if (typeof amount === "string") return validateNumber(Number(amount))
  if (Number.isNaN(amount) || !Number.isFinite(amount)) return 0
  return amount
}

export const formatNumberKMB = (num: number, isUsd: boolean = true) => {
  const prefixShow = isUsd ? "$" : ""

  if (num >= 1e9) {
    return prefixShow + (num / 1e9).toFixed(2) + "B"
  }

  if (num >= 1e6) {
    return prefixShow + (num / 1e6).toFixed(2) + "M"
  }

  if (num >= 1e3) {
    return prefixShow + (num / 1e3).toFixed(2) + "K"
  }
  return isUsd
    ? formatDisplayUsdt(num, 2)
    : numberWithCommas(num, undefined, { maximumFractionDigits: 2 })
}

// TODO: need to seperate format funcs to format module later.
export const formatDisplayUsdt = (
  amount: number | string,
  dp = 2,
  dpMin = 4,
): string => {
  const validatedAmount = validateNumber(amount)
  if (validatedAmount < 1)
    return `$${toFixedIfNecessary(amount.toString(), dpMin).toString()}`

  return `$${numberWithCommas(
    toFixedIfNecessary(amount.toString(), dp),
    undefined,
    { maximumFractionDigits: 6 },
  )}`
  // return `$${numberWithCommas(toFixedIfNecessary(amount.toString(), dp))}`;
}

export const toFixedIfNecessary = (value: string, dp: number): number => {
  return +parseFloat(value).toFixed(dp)
}

// add `,` when split thounsand value.
export const numberWithCommas = (
  x: number,
  locales: Intl.LocalesArgument = undefined,
  options: Intl.NumberFormatOptions = {},
) => {
  if (isNegative(x)) return "0"
  return x.toLocaleString(locales, options)
}

export const isNegative = (number: number) => number <= 0

export function formatLargeNumber(number: number) {
  if (!number || number === 0) return "0"
  const suffixes = ["", "K", "M", "B", "T"] // '', Thousand, Million, Billion, Trillion
  const tier = Math.floor(Math.log10(Math.abs(number)) / 3)

  if (tier <= 0) return number.toString() // No suffix for numbers less than 1,000

  const scaledNumber = number / Math.pow(10, tier * 3)
  return scaledNumber.toFixed(2) + suffixes[tier]
}

export const toBN = (number: BigNumber.Value) => {
  return new BigNumber(number)
}

/**
 * Returns a shortened string by replacing characters in between with '...'.
 * @param str The input string.
 * @param from The position of the character to be kept as-is in the resulting string.
 * @param end The number of characters to be kept as-is at the end of the resulting string.
 * @returns The shortened string, or '-' if the input string is null or undefined.
 */
export const reduceString = (
  str: string,
  from: number = 4,
  end: number = 4,
) => {
  if (!str) {
    return "-"
  }

  return str && typeof str.substring === "function"
    ? str.substring(0, from) + "..." + str.substring(str.length - end)
    : "-"
}
