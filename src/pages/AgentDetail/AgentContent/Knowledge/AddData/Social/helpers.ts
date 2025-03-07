export const getUserName = (url: string) => {
  if (!url) return null

  const match = url.match(/x\.com\/([^/]+)/)
  if (match && match[1] !== "home") {
    return match[1]
  }
  return null
}
