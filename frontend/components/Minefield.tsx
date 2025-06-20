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

  const [time, setTime] = useState(0)
  const [timeInterval, setTimeInterval] = useState(null)

  const startTime = () => {
    if(timeInterval === null) {
      setTimeInterval(setInterval(() => {
        setTime((oldTime) => oldTime + 1)
      }, 1000))
    }
  }

  const [bombExplosion, setBombExplosion] = useState(false)
  const [flaggedCells, setFlaggedCells] = useState<Set<string>>(new Set())
  const [revealedCells, setRevealedCells] = useState<Set<string>>(new Set())
  const handleClick = (row: number, col: number, hasMine: boolean, flagged: boolean) => {
    const key = `${row}-${col}`
    if(!flaggedCells.has(key)) {
      setRevealedCells(prev => new Set(prev).add(key))
      if(!bombExplosion) { startTime() }
      if(hasMine) {
        clearInterval(timeInterval)
        setTimeInterval(null)
        setBombExplosion(true)
        setSmileFace("=(")
      }
    }
  }

  const handleRightClick = (row: number, col: number) => {
    const key = `${row}-${col}`
    if(!bombExplosion) { startTime() }

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
  const [ smileFace, setSmileFace] = useState("=)")

  return (
    <>
      <div className="flex justify-between items-center grow">
        <span> Mines: {minesCount} </span>
        <div onClick={() => { window.location.reload()}} className="cursor-pointer"> <i>{smileFace}</i> </div>
        <span> Time: {time} </span>
      </div>
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
              bombExploded={bombExplosion}
              flagged={flaggedCells.has(`${rowIndex}-${colIndex}`)}
            />
          ))}
        </div>
      ))}
    </div>
    </>
  )
}
