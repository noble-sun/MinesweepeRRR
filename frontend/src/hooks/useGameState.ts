import { useState } from 'react'

export function useGameState() {
  const [mineCount, setMineCount] = useState(40)
  const [gameWon, setGameWon] = useState<boolean | null>(null)

  const updateMineCount = (value: number) => {
    setMineCount((prevCount) => prevCount + value)
  }

  const updateGameStatus = (value: boolean) => {
    setGameWon(value)
  }

  const gameStatusText = () => {
    if (gameWon === null) return
    const text = gameWon ? 'You Won!!!' : 'You Lost!'

    return text
  }

  return {
    mineCount,
    gameWon,
    updateMineCount,
    updateGameStatus,
    gameStatusText,
  }
}
