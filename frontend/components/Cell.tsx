import React from 'react'
import { CellProps } from './types'

export const Cell = ({ row, col, onClick, hasMine, clue }: CellProps) => {
  return (
    <button
      key={`cell-button-${row}-${col}`}
      id={`cell-button-${row}-${col}`}
      className="!w-6 h-6 !p-0 !m-0 !border !rounded-none !border-gray-700
        flex items-center justify-center hover:!bg-gray-700 active:!bg-gray-800"
      onClick={() => onClick(hasMine, row, col)}
    >
      {hasMine ? '*' : clue}
    </button>
  )
}

