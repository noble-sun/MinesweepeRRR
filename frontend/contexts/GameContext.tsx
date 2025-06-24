import React, { createContext, useContext, useState, ReactNode } from 'react'

type CellKey = string

type GameContextType = {
  flaggedCells: Set<CellKey>
  setFlaggedCells: React.Dispatch<React.SetStateAction<Set<CellKey>>>

  questionMarkedCells: Set<CellKey>
  setQuestionMarkedCells: React.Dispatch<React.SetStateAction<Set<CellKey>>>

  revealedCells: Set<CellKey>
  SetRevealedCells: React.Dispatch<React.SetStateAction<Set<CellKey>>>

  safeUnrevealedCells: Set<CellKey>
  setSafeUnrevealedCells: React.Dispatch<React.SetStateAction<Set<CellKey>>>
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({children}: { children: ReactNode}) => {
  const [flaggedCells, setFlaggedCells] = useState<Set<CellKey>>(new Set())
  const [questionMarkedCells, setQuestionMarkedCells] = useState<Set<CellKey>>(new Set())
  const [revealedCells, setRevealedCells] = useState<Set<CellKey>>(new Set())
  const [safeUnrevealedCells, setSafeUnrevealedCells] = useState<Set<CellKey>>(new Set())

  return (
    <GameContext.Provider value={{
      flaggedCells, setFlaggedCells,
      questionMarkedCells, setQuestionMarkedCells,
      revealedCells, setRevealedCells,
      safeUnrevealedCells, setSafeUnrevealedCells
    }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGameContext must be within a GameProvider")
  }

  return context
}
