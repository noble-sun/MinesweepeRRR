import { adjacentCellsToExpand } from '../helpers/adjacentCellsToExpand.ts'
import type { Minefield } from '../src/utils/api'
import { useGameContext } from '../contexts/GameContext.tsx'

export const useRevealCells = (minefield: Minefield) => {
  const {
    flaggedCells,
    questionMarkedCells,
    revealedCells, setRevealedCells,
    safeUnrevealedCells, setSafeUnrevealedCells
  } = useGameContext()

  const revealCell = (row: number, col: number) => {
    const key = `${row}-${col}`
    setRevealedCells(prev => new Set(prev).add(key))
    setSafeUnrevealedCells(prev => {
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

  return { revealCell, expandAdjacentCells }
}
