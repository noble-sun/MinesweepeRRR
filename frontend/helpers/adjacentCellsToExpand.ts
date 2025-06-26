import  { Minefield } from '../src/utils/api.ts'

export const adjacentCellsToExpand = (
  row: number,
  col: number,
  minefield: Minefield,
  flaggedCells: Set<string>,
  revealedCells: Set<string>,
  questionMarkedCells: Set<string>
): [number, number][] => {
  const neighbors: [number, number][] = []
  const directions = [-1, 0, 1]

  for (let rowDirection of directions) {
    for (let colDirection of directions) {
      if ((rowDirection === 0) && (colDirection === 0)) continue
      const neighborRow = row + rowDirection
      const neighborCol = col + colDirection
      const key = `${neighborRow}-${neighborCol}`

      const validNeighborRow = (neighborRow >= 0) && (neighborRow < minefield[0].length)
      const validNeighborCol = (neighborCol >= 0) && (neighborCol < minefield.length)
      if (
        validNeighborRow &&
        validNeighborCol &&
        !flaggedCells.has(key) &&
        !revealedCells.has(key) &&
        !questionMarkedCells.has(key)
      ) {
        neighbors.push([neighborRow, neighborCol])
      }
    }
  }

  return neighbors
}
