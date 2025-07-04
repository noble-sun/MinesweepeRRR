import React, { useEffect } from 'react'

import { useCellInteraction } from '../hooks/useCellInteraction.ts'
import { useGameContext } from '../hooks/useGameContext.ts'
import { useMinefield } from '../hooks/useMinefield.ts'
import { Cell } from './Cell.tsx'

export default function Minefield({
  startTimer,
  stopTimer,
  gameIsRunning,
  onExplode,
  exploded,
  onFlagCellChange,
  gameWon,
}: {
  startTimer: () => void
  stopTimer: () => void
  gameIsRunning: boolean | null
  onExplode: () => void
  exploded: boolean
  onFlagCellChange: (v: number) => void
  gameWon: (v: boolean) => void
}) {
  const { minefield } = useMinefield()
  const { onClick, onRightClick, currentGameWon } = useCellInteraction(
    minefield,
    gameIsRunning,
    startTimer,
    onExplode,
    gameWon,
    stopTimer,
    onFlagCellChange,
  )

  const { revealedCells, flaggedCells, questionMarkedCells, safeUnrevealedCells } = useGameContext()

  useEffect(() => {
    if (safeUnrevealedCells.size === 0 && minefield.length > 0) currentGameWon()
  }, [safeUnrevealedCells, currentGameWon, minefield.length])

  return (
    <>
      <div className="block" id="minefield">
        {minefield.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <Cell
                key={`cell-${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                isRevealed={revealedCells.has(`${rowIndex}-${colIndex}`)}
                onClick={onClick}
                onRightClick={onRightClick}
                hasMine={cell.mine}
                clue={cell.clue}
                exploded={exploded}
                flagged={flaggedCells.has(`${rowIndex}-${colIndex}`)}
                questionMarked={questionMarkedCells.has(`${rowIndex}-${colIndex}`)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
