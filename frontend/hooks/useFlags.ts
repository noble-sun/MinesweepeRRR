import { useGameContext } from '../contexts/GameContext.tsx'

export const useFlags = (onFlagCellChange: (delta: number) => void) => {

  const {
    flaggedCells, setFlaggedCells,
    questionMarkedCells, setQuestionMarkedCells
  } = useGameContext()

  const placeFlag = (key: string) => {
    if (!flaggedCells.has(key)) {
      onFlagCellChange(-1)
      setFlaggedCells(prev => new Set(prev).add(key))
    }
  }

  const placeQuestionMark = (key: string) => {
    if (!flaggedCells.has(key)) return

    setQuestionMarkedCells(prev => new Set(prev).add(key))

    setFlaggedCells(prev => {
      const cells = new Set(prev)
      cells.delete(key)
      return cells
    })
    onFlagCellChange(1)
  }

  const removeQuestionMark = (key: string) => {
    if(!questionMarkedCells.has(key)) return

    setQuestionMarkedCells(prev => {
      const cells = new Set(prev)
      cells.delete(key)
      return cells
    })
  }

  return {
    placeFlag,
    placeQuestionMark,
    removeQuestionMark
  }
}
