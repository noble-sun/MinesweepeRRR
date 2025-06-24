import { useRevealCells } from '../hooks/useRevealCells.ts'
import { useFlags } from '../hooks/useFlags.ts'
import type { Minefield } from '../src/utils/api.ts'
import { useGameContext } from '../contexts/GameContext.tsx'

export const useCellInteraction = (
  minefield: Minefield,
  //hiddenNonMinesCells: Set<string>,
  //setHiddenNonMinesCells: (v: Set<string>) => void,
  gameIsRunning: boolean,
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
    safeUnrevealedCells, setSafeUnrevealedCells
  } = useGameContext()

  const {
    //flaggedCells,
    //questionMarkedCells,
    placeFlag,
    placeQuestionMark,
    removeQuestionMark
  } = useFlags(onFlagCellChange)

  const {
    //revealedCells,
    revealCell,
    expandAdjacentCells
  } = useRevealCells(minefield)
  //} = useRevealCells(minefield, flaggedCells, questionMarkedCells, setHiddenNonMinesCells)

  const currentGameLost = () => {
    stopTimer()
    onExplode()
    gameWon(false)
  }

  const currentGameWon = () => {
    stopTimer()
    gameWon(true)
  }

  const onClick = (row: number, col: number, hasMine: boolean, flagged: boolean) => {
    if (!gameIsRunning) startTimer()
    
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
    if (!gameIsRunning) startTimer()

    const key = `${row}-${col}`
    if (revealedCells.has(key)) return

    const placeMineIndicationFlag = flaggedCells.has(key) ? placeQuestionMark(key) : placeFlag(key)
    questionMarkedCells.has(key) ? removeQuestionMark(key) : placeMineIndicationFlag
  }

  return {
    onClick,
    onRightClick,
    revealedCells,
    flaggedCells,
    questionMarkedCells,
    currentGameWon
  }
}

