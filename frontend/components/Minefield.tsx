import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Cell } from './Cell.tsx'

export default function Minefield() {
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

  const [revealedCells, setRevealedCells] = useState<Set<string>>(new Set())
  const handleClick = (row: number, col: number) => {
    const key = `${row}-${col}`
    setRevealedCells(prev => new Set(prev).add(key))
  }

  return (
    <div className="block">
      {minefield.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => ( 
            <Cell
              key={`cell-${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              isRevealed={revealedCells.has(`${rowIndex}-${colIndex}`)}
              onClick={handleClick}
              hasMine={cell.mine}
              clue={cell.clue}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
