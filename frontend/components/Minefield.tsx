import React, { useState, useEffect } from 'react'
import { Cell } from './Cell.tsx'
import GameInfoBar from './GameInfoBar.tsx'
import { useMinefield } from '../hooks/useMinefield.ts'
import { useRevealCells } from '../hooks/useRevealCells.ts'

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

  const [question, setQuestion] = useState<Set<string>>(new Set())
  const [flaggedCells, setFlaggedCells] = useState<Set<string>>(new Set())
  const { minefield, hiddenNonMinesCells, setHiddenNonMinesCells } = useMinefield()
  const {
    revealedCells,
    revealCell,
    expandAdjacentCells
  } = useRevealCells(minefield, flaggedCells, question, setHiddenNonMinesCells)

  const handleClick = (row: number, col: number, hasMine: boolean, flagged: boolean) => {
    if(!gameIsRunning) { startTimer() }

    const key = `${row}-${col}`
    if(flaggedCells.has(key) || question.has(key)) { return }
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

    if (question.has(key)) {
      setQuestion(prevQuestion => {
        const questionMarked = new Set(prevQuestion)
        questionMarked.delete(key)

        return questionMarked
      })
    } else {
      flaggedCells.has(key) ? placeQuestion(row, col) : placeFlag(row, col)
    }
  }

  const placeFlag = (row: number, col: number) => {
    const key = `${row}-${col}`
    const updateMineCountBy = flaggedCells.has(key) ? 1 : -1
    onFlagCellChange(updateMineCountBy)

    setFlaggedCells(prevFlagged => new Set(prevFlagged).add(key))
  }

  const placeQuestion = (row: number, col: number) => {
    const key = `${row}-${col}`
    setQuestion(prevQuestion => new Set(prevQuestion).add(key))

    const updateMineCountBy = flaggedCells.has(key) ? 1 : -1
    onFlagCellChange(updateMineCountBy)

    setFlaggedCells(prevFlagged => {
      const flagged = new Set(prevFlagged)
      flagged.delete(key)
      return flagged
    })
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
              questionMarked={question.has(`${rowIndex}-${colIndex}`)}
            />
          ))}
        </div>
      ))}
    </div>
    </>
  )
}
