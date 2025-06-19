export interface CellProps {
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
  hasMine: boolean;
  clue: number;
}
