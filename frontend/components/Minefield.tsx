import React, { useState, useEffect } from 'react'
import { Cell } from './Cell.tsx'
import GameInfoBar from './GameInfoBar.tsx'
import { useMinefield } from '../hooks/useMinefield.ts'
import { useCellInteraction } from '../hooks/useCellInteraction.ts'
import { useGameContext } from '../contexts/GameContext.tsx'

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
  //const { minefield, hiddenNonMinesCells, setHiddenNonMinesCells } = useMinefield()
  const { minefield } = useMinefield()
  const {
    onClick,
    onRightClick,
    //revealedCells,
    //flaggedCells,
    //questionMarkedCells,
    currentGameWon
  } = useCellInteraction(
    minefield,
    //hiddenNonMinesCells,
    //setHiddenNonMinesCells,
    gameIsRunning,
    startTimer,
    onExplode,
    gameWon,
    stopTimer,
    onFlagCellChange
  )

  const {  revealedCells, flaggedCells, questionMarkedCells, safeUnrevealedCells } = useGameContext()

  useEffect(() => {
    console.log(safeUnrevealedCells.size)
    if(safeUnrevealedCells.size === 0 && minefield.length > 0) currentGameWon()
  }, [safeUnrevealedCells])


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
