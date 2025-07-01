import { renderHook, waitFor } from '@testing-library/react'
import { useMinefield } from '../../hooks/useMinefield'
import { useGameContext } from '../../contexts/GameContext'
import { renderHookWithGameContext } from '../test-utils'
import minesweeperApi, { Minefield as MinefieldType, MineCell } from '../../src/utils/api.ts'
import axios from 'axios'

describe('useMinefield', () => {
  it('should return the initial value for minefield', async () => {
    const result = renderHookWithGameContext(() => ({
      useMinefieldResult: useMinefield()
    }))

    expect(result.current!.useMinefieldResult.minefield).toEqual([])
  })

  describe('when data is fetched from API successfully', () => {
    it('should return data from minefield and update states', async () => {
      const apiResponse = [
        [{ mine: false, clue: 1, x: 0, y: 0 }, { mine: true, clue: null, x: 1, y: 0 }],
        [{ mine: false, clue: 1, x: 0, y: 1 }, { mine: false, clue: 1, x: 1, y: 1 }]
      ]

      vi.spyOn(minesweeperApi, 'generateMinefield').mockResolvedValue(apiResponse)

      const result = renderHookWithGameContext(() => ({
        useMinefieldResult: useMinefield(),
        useGameContextResult: useGameContext()
      }))

      const cellKeysWithoutMines = ['0-0', '1-0', '1-1']
      await waitFor(() => {
        expect(result.current!.useMinefieldResult.minefield).toEqual(apiResponse)
        expect(Array.from(
          result.current!.useGameContextResult.safeUnrevealedCells
        )).toEqual(cellKeysWithoutMines)
      })
    })
  })
})
