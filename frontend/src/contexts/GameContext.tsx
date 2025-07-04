import React, { createContext, ReactNode, useState } from 'react'

type CellKey = string

export type GameContextType = {
  flaggedCells: Set<CellKey>
  setFlaggedCells: React.Dispatch<React.SetStateAction<Set<CellKey>>>

  questionMarkedCells: Set<CellKey>
  setQuestionMarkedCells: React.Dispatch<React.SetStateAction<Set<CellKey>>>

  revealedCells: Set<CellKey>
  setRevealedCells: React.Dispatch<React.SetStateAction<Set<CellKey>>>

  safeUnrevealedCells: Set<CellKey>
  setSafeUnrevealedCells: React.Dispatch<React.SetStateAction<Set<CellKey>>>
}

export const GameContext = createContext<GameContextType | undefined>(undefined)
type GameProviderProps = {
  children: ReactNode
  value?: Partial<GameContextType>
}

export const GameProvider = ({ children, value = {} }: GameProviderProps) => {
  const [flaggedCells, setFlaggedCells] = useState<Set<CellKey>>(new Set())
  const [questionMarkedCells, setQuestionMarkedCells] = useState<Set<CellKey>>(new Set())
  const [revealedCells, setRevealedCells] = useState<Set<CellKey>>(new Set())
  const [safeUnrevealedCells, setSafeUnrevealedCells] = useState<Set<CellKey>>(new Set())

  return (
    <GameContext.Provider
      value={{
        flaggedCells: value.flaggedCells ?? flaggedCells,
        setFlaggedCells: value.setFlaggedCells ?? setFlaggedCells,
        questionMarkedCells: value.questionMarkedCells ?? questionMarkedCells,
        setQuestionMarkedCells: value.setQuestionMarkedCells ?? setQuestionMarkedCells,
        revealedCells: value.revealedCells ?? revealedCells,
        setRevealedCells: value.setRevealedCells ?? setRevealedCells,
        safeUnrevealedCells: value.safeUnrevealedCells ?? safeUnrevealedCells,
        setSafeUnrevealedCells: value.setSafeUnrevealedCells ?? setSafeUnrevealedCells,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
