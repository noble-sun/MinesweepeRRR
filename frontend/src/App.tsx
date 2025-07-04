import './App.css'

import { useState } from 'react'

import GameInfoBar from './components/GameInfoBar.tsx'
import Minefield from './components/Minefield.tsx'
import { GameProvider } from './contexts/GameContext.tsx'
import { useGameState } from './hooks/useGameState.ts'
import { useTimer } from './hooks/useTimer.ts'

function App() {
  const { time, gameIsRunning, startTimer, stopTimer } = useTimer()
  const { mineCount, updateMineCount, updateGameStatus, gameStatusText } = useGameState()

  const [exploded, setExploded] = useState(false)

  return (
    <>
      <GameProvider>
        <div>{gameStatusText()}</div>
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


