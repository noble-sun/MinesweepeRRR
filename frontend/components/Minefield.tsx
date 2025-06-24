import React, { useState, useEffect } from 'react'
import { Cell } from './Cell.tsx'
import GameInfoBar from './GameInfoBar.tsx'
import { useMinefield } from '../hooks/useMinefield.ts'
import { useRevealCells } from '../hooks/useRevealCells.ts'
import { useFlags } from '../hooks/useFlags.ts'

export default function Minefield(
  {startTimer, stopTimer, gameIsRunning, onExplode, exploded, onFlagCellChange, gameWon}: {
    startTimer: () => void,
    stopTimer: () => void,
    gameIsRunning: boolean,
    onExplode: () => void,
    exploded: boolean,
    onFlagCellChange: () => void,
    gameWon: () => void
  }
) {

  const { minefield, hiddenNonMinesCells, setHiddenNonMinesCells } = useMinefield()

  const {
    flaggedCells,
    questionMarkedCells,
    placeFlag,
    placeQuestionMark,
    removeQuestionMark
  } = useFlags(onFlagCellChange)

  const {
    revealedCells,
    revealCell,
    expandAdjacentCells
  } = useRevealCells(minefield, flaggedCells, questionMarkedCells, setHiddenNonMinesCells)


  const handleClick = (row: number, col: number, hasMine: boolean, flagged: boolean) => {
    if(!gameIsRunning) { startTimer() }

    const key = `${row}-${col}`
    if(flaggedCells.has(key) || questionMarkedCells.has(key)) { return }
    setHiddenNonMinesCells(prev => {
      const nm = new Set(prev)
      nm.delete(key)
      return nm
    })

    if(hasMine) { loser() }

    revealCell(row, col)
    expandAdjacentCells(row, col) 
  }

  const handleRightClick = (row: number, col: number) => {
    if(!gameIsRunning) { startTimer() }
    const key = `${row}-${col}`
    
    if (revealedCells.has(key)) return

    if (questionMarkedCells.has(key)) {
      removeQuestionMark(key)
    } else {
      flaggedCells.has(key) ? placeQuestionMark(key) : placeFlag(key)
    }
  }

  useEffect(() => {
    if(hiddenNonMinesCells.size === 0 && minefield.length > 0) { winner() }
  })

  const winner = () => {
    stopTimer()
    gameWon(true)
  }

  const loser = () => {
    stopTimer()
    onExplode()
    gameWon(false)
  }

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
              onClick={handleClick}
              onRightClick={handleRightClick}
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
