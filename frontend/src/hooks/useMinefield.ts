import { useEffect, useState } from 'react'

import { useGameContext } from '../contexts/GameContext.tsx'
import minesweeperApi, { MineCell, Minefield as MinefieldType } from '../utils/api.ts'

export const useMinefield = () => {
  const [minefield, setMinefield] = useState<MinefieldType>([])
  const { setSafeUnrevealedCells } = useGameContext()

  useEffect(() => {
    minesweeperApi
      .generateMinefield()
      .then((data: MinefieldType) => {
        setMinefield(data)

        const tempNonMines = new Set<string>()
        data.forEach((row: MineCell[], rowIndex: number) => {
          row.forEach((cell: MineCell, colIndex: number) => {
            if (!cell.mine) tempNonMines.add(`${rowIndex}-${colIndex}`)
          })
        })
        setSafeUnrevealedCells(tempNonMines)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [setSafeUnrevealedCells])

  return { minefield }
}
