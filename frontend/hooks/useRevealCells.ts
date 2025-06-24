import { useState } from 'react'
import { adjacentCellsToExpand } from '../helpers/adjacentCellsToExpand.ts'
import type { Minefield } from '../src/utils/api'

export const useRevealCells = (
  minefield: Minefield,
  flaggedCells: Set<string>,
  questionMarkedCells: Set<string>,
  setHiddenNonMinesCells: (v: Set<string>) => void
) => {
  const [revealedCells, setRevealedCells] = useState<Set<string>>(new Set())

  const revealCell = (row: number, col: number) => {
    const key = `${row}-${col}`
    setRevealedCells(prev => new Set(prev).add(key))
    setHiddenNonMinesCells(prev => {
      const cells = new Set(prev)
      cells.delete(key)
      return cells
    })
  }

  const expandAdjacentCells = (row: number, col: number, visited = new Set<string>()) => {
    const key = `${row}-${col}`
    if (visited.has(key)) return
    visited.add(key)

    if (minefield[row][col].clue === 0) {
      const adjacent = adjacentCellsToExpand(
        row,
        col,
        minefield,
        flaggedCells,
        revealedCells,
        questionMarkedCells
      )

      adjacent.forEach(([r, c]) => revealCell(r, c))

      adjacent
        .filter(([r, c]) => minefield[r][c].clue === 0)
        .forEach(([r, c]) => expandAdjacentCells(r, c, visited))
    }
  }

  return { revealedCells, revealCell, expandAdjacentCells }
}
