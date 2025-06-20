import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Cell } from './Cell.tsx'
import GameInfoBar from './GameInfoBar.tsx'

export default function Minefield(
  {startTimer, stopTimer, gameIsRunning, onExplode, exploded}: {
    startTimer: () => void,
    stopTimer: () => void,
    gameIsRunning: boolean,
    onExplode: () => void,
    exploded: boolean
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
  }

  const handleRightClick = (row: number, col: number) => {
    const key = `${row}-${col}`
    if(!gameIsRunning) { startTimer() }
    const updateFlaggedCount = flaggedCells.has(key) ? 1 : -1
    setMinesCount((prevCount) => prevCount + updateFlaggedCount)

    setFlaggedCells(prevFlagged => {
      const flagged = new Set(prevFlagged)
      flagged.has(key) ? flagged.delete(key) : flagged.add(key)
      return flagged
    })
    console.log(`Right Clicked cell ${row}-${col}`)
  }

  const [minesCount, setMinesCount] = useState(40)

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
