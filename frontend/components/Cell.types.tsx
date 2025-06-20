export interface CellProps {
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
  onRightClick: (row: number, col: number) => void;
  hasMine: boolean;
  clue: number;
  isRevealed: boolean;
  bombExploded: boolean;
  flagged: boolean;
}
