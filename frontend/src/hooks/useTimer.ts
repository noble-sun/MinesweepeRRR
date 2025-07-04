import { useEffect, useRef, useState } from 'react'

export function useTimer() {
  const [time, setTime] = useState(0)
  const [gameIsRunning, setGameIsRunning] = useState<boolean | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startTimer = () => {
    if (!gameIsRunning) {
      setGameIsRunning(true)
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    }
  }

  const stopTimer = () => {
    setGameIsRunning(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return { time, gameIsRunning, startTimer, stopTimer }
}
