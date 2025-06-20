import React from 'react'
import { CellProps } from './types'

export const Cell = ({ row, col, onClick, hasMine, clue, isRevealed, bombExploded, onRightClick, flagged }: CellProps) => {
  const displayContextValue = () => {
    if(isRevealed) return hasMine ? "*" : clue;
    if(flagged) return "!"
    return ""
  }

  return (
    <button
      key={`cell-button-${row}-${col}`}
      id={`cell-button-${row}-${col}`}
      className={`!w-6 h-6 !p-0 !m-0 !border !rounded-none !border-gray-600 text-black
        flex items-center justify-center
        ${isRevealed ? (hasMine ? "!bg-red-700" : "!bg-gray-400") : "!bg-gray-500"}
        ${bombExploded ? "" : "hover:!bg-gray-700 active:!bg-gray-800"}}
        `}
      onClick={() => onClick(row, col, hasMine)}
      onContextMenu={(e) => {
        e.preventDefault()
        onRightClick(row, col)
      }}
      disabled={bombExploded}
    >
      { displayContextValue() }
    </button>
  )
}

