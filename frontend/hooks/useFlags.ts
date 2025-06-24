import { useState } from 'react'

export const useFlags = (onFlagCellChange: (delta: number) => void) => {
  const [flaggedCells, setFlaggedCells] = useState<Set<string>>(new Set())
  const [questionMarkedCells, setQuestionMarkedCells] = useState<Set<string>>(new Set())

  const placeFlag = (key: string) => {
    if (!flaggedCells.has(key)) {
      onFlagCellChange(-1)
      setFlaggedCells(prev => new Set(prev).add(key))
    }
  }

  const placeQuestionMark = (key: string) => {
    setQuestionMarkedCells(prev => new Set(prev).add(key))

    if (flaggedCells.has(key)) {
      onFlagCellChange(1)
      setFlaggedCells(prev => {
        const cells = new Set(prev)
        cells.delete(key)
        return cells
      })
    }
  }

  const removeQuestionMark = (key: string) => {
    setQuestionMarkedCells(prev => {
      const cells = new Set(prev)
      cells.delete(key)
      return cells
    })
  }

  return {
    flaggedCells,
    questionMarkedCells,
    placeFlag,
    placeQuestionMark,
    removeQuestionMark
  }
}
