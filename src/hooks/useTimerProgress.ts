import { useState, useLayoutEffect, useRef } from "react"

const useTimerProgress = (time = 0, repeat = true, reset: () => void) => {
  const [timerProgress, setTimerProgress] = useState(0)
  const step = time / 100
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useLayoutEffect(() => {
    if (!time || step <= 0) return
    if (!repeat && timerProgress >= 100) return

    const interval = setInterval(() => {
      setTimerProgress((v) => {
        if (v >= 100) {
          reset()
          return repeat ? 0 : 100
        }
        return v + 1
      })
    }, step)

    intervalRef.current = interval

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [time, repeat, step, reset])

  return { timerProgress, setTimerProgress }
}

export default useTimerProgress
