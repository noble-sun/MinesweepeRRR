import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Cell } from './Cell.tsx'
import GameInfoBar from './GameInfoBar.tsx'

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
  const [minefield, setMinefield] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/minesweepers/generate')
      .then(response => {
        setMinefield(response.data)
        
        const tempNotMines = new Set()
        response.data.forEach((row, rowIndex) => {
          row.forEach((cell, colIndex) => {
            if(!cell.mine) { tempNotMines.add(`${rowIndex}-${colIndex}`)}
          })
        })

        setNotMines(tempNotMines)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const [notMines, setNotMines] = useState<Set<string>>(new Set())

  const [flaggedCells, setFlaggedCells] = useState<Set<string>>(new Set())
  const [revealedCells, setRevealedCells] = useState<Set<string>>(new Set())
  const handleClick = (row: number, col: number, hasMine: boolean, flagged: boolean) => {
    if(!gameIsRunning) { startTimer() }

    const key = `${row}-${col}`
    if(flaggedCells.has(key) || question.has(key)) { return }
    setNotMines(prev => {
      const nm = new Set(prev)
      nm.delete(key)
      return nm
    })

    if(hasMine) { loser() }

    setRevealedCells(prev => new Set(prev).add(key))
    expandAdjacentCells(row, col) 
  }

  const expandAdjacentCells = (row: number, col: number, visited: Set<string> = new Set()) => {
    const key = `${row}-${col}`
    if (visited.has(key)) return
    visited.add(key)

    const expandedCellsRevealed = []
    if (minefield[row][col].clue === 0) {
      const adjacentCellsNotYetRevealed = getValidAdjacentCells(row, col)

      adjacentCellsNotYetRevealed.map(([tRow, tCol]: [number, number]) => {
        const key = `${tRow}-${tCol}`
        setRevealedCells(prev => new Set(prev).add(key))
        setNotMines(prev => {
          const nm = new Set(prev)
          nm.delete(key)
          return nm
        })
      })

      const cellsToExpand = adjacentCellsNotYetRevealed.filter(([aRow, aCol]) => {
        return minefield[aRow][aCol].clue === 0
      })

      cellsToExpand.map(([cRow, cCol]) => {
        expandAdjacentCells(cRow, cCol, visited)
      })
    }
  }

  const getValidAdjacentCells: [number, number][] = (row: number, col: number) => {
    const adjacentRows: number[] = [row-1, row, row+1]
    const adjacentCols: number[] = [col-1, col, col+1]
    const adjacentCells: [number, number][] =
      adjacentRows.flatMap( (neighborRow): [number, number][] =>
        adjacentCols.map( (neighborCol): [number, number] =>
          [neighborRow,neighborCol]
        )
      )

    const validTuple: boolean = ([tRow, tCol]: [number, number]) => {
      if(flaggedCells.has(`${tRow}-${tCol}`)) { return false }
      if(question.has(`${tRow}-${tCol}`)) { return false }
      if(revealedCells.has(`${tRow}-${tCol}`)) { return false }
      if(tRow === row && tCol === col) { return false }

      return (tRow >= 0) && (tRow <= minefield[0].length - 1) &&
        (tCol >= 0) && (tCol <= minefield.length - 1)
    }

    return adjacentCells.filter((tuple) => validTuple(tuple))
  }

  const handleRightClick = (row: number, col: number) => {
    if(!gameIsRunning) { startTimer() }
    const key = `${row}-${col}`


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

  const [question, setQuestion] = useState<Set<string>>(new Set())
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
    console.log(notMines.size)
    if(notMines.size === 0 && minefield.length > 0) { winner() }
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
