import { useCallback, useEffect, useRef, useState } from "react"

export function useHover(): [any, boolean] {
  const ref = useRef<any>(null)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const handleMouseHover = useCallback(() => {
    setIsHovered(!isHovered)
  }, [isHovered])

  useEffect(() => {
    const element = ref.current
    if (element) {
      element.addEventListener("mouseenter", handleMouseHover)
      element.addEventListener("mouseleave", handleMouseHover)
    }

    return () => {
      if (element) {
        element.removeEventListener("mouseenter", handleMouseHover)
        element.removeEventListener("mouseleave", handleMouseHover)
      }
    }
  })

  return [ref, isHovered]
}
