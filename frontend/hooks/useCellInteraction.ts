import { useRevealCells } from '../hooks/useRevealCells.ts'
import { useFlags } from '../hooks/useFlags.ts'
import type { Minefield } from '../src/utils/api.ts'
import { useGameContext } from '../contexts/GameContext.tsx'

export const useCellInteraction = (
  minefield: Minefield,
  gameIsRunning: boolean | null,
  startTimer: () => void,
  onExplode: () => void,
  gameWon: (won: boolean) => void,
  stopTimer: () => void,
  onFlagCellChange: (delta: number) => void
) => {

  const {
    flaggedCells,
    questionMarkedCells,
    revealedCells,
    setSafeUnrevealedCells
  } = useGameContext()

  const {
    placeFlag,
    placeQuestionMark,
    removeQuestionMark
  } = useFlags(onFlagCellChange)

  const {
    revealCell,
    expandAdjacentCells
  } = useRevealCells(minefield)

  const currentGameLost = () => {
    stopTimer()
    onExplode()
    gameWon(false)
  }

  const currentGameWon = () => {
    stopTimer()
    gameWon(true)
  }

  const onClick = (row: number, col: number, hasMine: boolean) => {
    if (gameIsRunning == null) startTimer()
    
    const key = `${row}-${col}`
    if (flaggedCells.has(key) || questionMarkedCells.has(key)) return

    setSafeUnrevealedCells(prev => {
      const cells = new Set(prev)
      cells.delete(key)
      return cells
    })

    revealCell(row, col)

    if (hasMine) return currentGameLost()

    expandAdjacentCells(row, col)
  }

  const onRightClick = (row: number, col: number) => {
    if (gameIsRunning == null) startTimer()
    if (!gameIsRunning) return

    const key = `${row}-${col}`
    if (revealedCells.has(key)) return

    const placeMineIndicationFlag = () => {
      flaggedCells.has(key) ? placeQuestionMark(key) : placeFlag(key)
    }

    questionMarkedCells.has(key) ? removeQuestionMark(key) : placeMineIndicationFlag()
  }

  return {
    onClick,
    onRightClick,
    currentGameWon
  }
}

