import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Cell } from './Cell.tsx'
import GameInfoBar from './GameInfoBar.tsx'

export default function Minefield(
  {startTimer, stopTimer, gameIsRunning, onExplode, exploded, onFlagCellChange}: {
    startTimer: () => void,
    stopTimer: () => void,
    gameIsRunning: boolean,
    onExplode: () => void,
    exploded: boolean,
    onFlagCellChange: () => void
  }
) {
  const [minefield, setMinefield] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/minesweepers/generate')
      .then(response => {
        setMinefield(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const [flaggedCells, setFlaggedCells] = useState<Set<string>>(new Set())
  const [revealedCells, setRevealedCells] = useState<Set<string>>(new Set())
  const handleClick = (row: number, col: number, hasMine: boolean, flagged: boolean) => {
    const key = `${row}-${col}`
    if(!flaggedCells.has(key)) {
      setRevealedCells(prev => new Set(prev).add(key))
      if(!gameIsRunning) { startTimer() }
      if(hasMine) {
        stopTimer()
        onExplode()
      }
    }

    const adjacentRows: number[] = [row-1, row, row+1]
    const adjacentCols: number[] = [col-1, col, col+1]
    const adjacentCells: [number, number][] =
      adjacentRows.flatMap( (neighborRow): [number, number][] =>
        adjacentCols.map( (neighborCol): [number, number] =>
          [neighborRow,neighborCol]
        )
      )

    const validTuple: boolean = ([tRow, tCol]: [number, number]) => {
      if(tRow === row && tCol === col) { return false }

      return (tRow >= 0) && (tRow <= minefield[0].length - 1) &&
        (tCol >= 0) && (tCol <= minefield.length - 1)
    }

    const validAdjacentCells: [number, number][] =
      adjacentCells.filter((tuple) => validTuple(tuple))

    if (minefield[row][col].clue === 0) {
      validAdjacentCells.map(([tRow, tCol]: [number, number]) => {
        const key = `${tRow}-${tCol}`
        if(typeof minefield[tRow][tCol].clue === "number") {
          setRevealedCells(prev => new Set(prev).add(key))
        }
      })
    }

    console.log(validAdjacentCells)
  }


  const handleRightClick = (row: number, col: number) => {
    if(!gameIsRunning) { startTimer() }
    const key = `${row}-${col}`

    const updateMineCountBy = flaggedCells.has(key) ? 1 : -1
    onFlagCellChange(updateMineCountBy)

    setFlaggedCells(prevFlagged => {
      const flagged = new Set(prevFlagged)
      flagged.has(key) ? flagged.delete(key) : flagged.add(key)
      return flagged
    })
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
            />
          ))}
        </div>
      ))}
    </div>
    </>
  )
}
