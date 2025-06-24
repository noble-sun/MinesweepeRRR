import { useEffect, useState } from 'react'
import minesweeperApi, { Minefield as MinefieldType } from '../src/utils/api.ts'
import { useGameContext } from '../contexts/GameContext.tsx'

export const useMinefield = () => {
  const [minefield, setMinefield] = useState<MinefieldType>([])
  //const [hiddenNonMinesCells, setHiddenNonMinesCells] = useState<Set<string>>(new Set())

  const { setSafeUnrevealedCells } = useGameContext()

  useEffect(() => {
    minesweeperApi.generateMinefield()
      .then((data: Minefieldtype) => {
        setMinefield(data)

        const tempNonMines = new Set<string>()
        data.forEach((row, rowIndex) => {
          row.forEach((cell, colIndex) => {
            if (!cell.mine) tempNonMines.add(`${rowIndex}-${colIndex}`)
          })
        })
        setSafeUnrevealedCells(tempNonMines)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return { minefield }
}
