import { useEffect, useState, useCallback, useRef } from "react"

const useWindowSize = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [screenHeight, setScreenHeight] = useState(window.innerHeight)
  const resizeTimeoutRef = useRef<any>(null)

  const handleResize = useCallback(() => {
    clearTimeout(resizeTimeoutRef.current)

    resizeTimeoutRef.current = setTimeout(() => {
      setScreenWidth(window.innerWidth)
      setScreenHeight(window.innerHeight)
    }, 100)
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    return () => {
      clearTimeout(resizeTimeoutRef.current)
      window.removeEventListener("resize", handleResize)
    }
  }, [handleResize])

  const isMobile = screenWidth < 768
  const isTablet = screenWidth >= 768 && screenWidth < 1024
  const isDesktop = screenWidth >= 1024

  return {
    screenWidth,
    screenHeight,
    isMobile,
    isTablet,
    isDesktop,
  }
}

export default useWindowSize
