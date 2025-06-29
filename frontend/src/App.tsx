import './App.css'

import { useEffect, useRef, useState } from 'react'

import GameInfoBar from '../components/GameInfoBar.tsx'
import Minefield from '../components/Minefield.tsx'
import { GameProvider } from '../contexts/GameContext.tsx'

function App() {
  const [exploded, setExploded] = useState(false)

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

  const [mineCount, setMineCount] = useState(40)
  const updateMineCount = (value: number) => {
    setMineCount((prevCount) => prevCount + value)
  }

  const [gameWon, setGameWon] = useState<boolean | null>(null)
  const updateGameStatus = (value: boolean) => {
    setGameWon(value)
  }

  const renderGameStatus = () => {
    if (gameWon === null) return
    const text = gameWon ? 'You Won!!!' : 'You Lost!'

    return <span>{text}</span>
  }
  return (
    <>
      <GameProvider>
        <div>{renderGameStatus()}</div>
        <GameInfoBar time={time} exploded={exploded} mineCount={mineCount} />
        <Minefield
          startTimer={startTimer}
          stopTimer={stopTimer}
          gameIsRunning={gameIsRunning}
          onExplode={() => setExploded(true)}
          exploded={exploded}
          onFlagCellChange={updateMineCount}
          gameWon={updateGameStatus}
        />
      </GameProvider>
    </>
  )
}

export default App
