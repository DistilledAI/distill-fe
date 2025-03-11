export const getUserName = (input: any) => {
  if (!input) return null

  let url: string
  try {
    const parsedInput = JSON.parse(input)
    if (parsedInput?.url?.value) {
      url = parsedInput.url.value
    } else {
      return null
    }
  } catch (e) {
    url = input.value ? input.value : input
  }
  const match = url.match(/x\.com\/([^/]+)/)
  if (match && match[1] !== "home") {
    return match[1]
  }
  return null
}

export const getLinkXByURL = (input: string) => {
  const username = getUserName(input)
  if (username) return `https://x.com/${username}`
  return `https://x.com/${input}`
}
