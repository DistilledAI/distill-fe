import { useState, useLayoutEffect } from "react"

const useTimerProgress = (time = 0, repeat = true, reset: () => void) => {
  const [timerProgress, setTimerProgress] = useState(0)
  const step = time / 100

  useLayoutEffect(() => {
    if (!time) return
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

    return () => clearInterval(interval)
  }, [timerProgress, repeat, step])

  return { timerProgress, setTimerProgress }
}

export default useTimerProgress
