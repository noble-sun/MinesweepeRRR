export interface CellProps {
  row: number
  col: number
  onClick: (row: number, col: number, hasMine: boolean) => void
  onRightClick: (row: number, col: number) => void
  hasMine: boolean
  clue: number | null
  isRevealed: boolean
  flagged: boolean
  questionMarked: boolean
  exploded: boolean
}
