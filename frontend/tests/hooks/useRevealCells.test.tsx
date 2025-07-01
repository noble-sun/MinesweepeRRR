import { renderHook, waitFor, act } from '@testing-library/react'
import { useRevealCells } from '../../hooks/useRevealCells'
import { useGameContext } from '../../contexts/GameContext'
import { renderHookWithGameContext } from '../test-utils'

describe('useRevealCells', () => {
  describe('revealCell', () => {
    describe('when cell key is not present on revealedCells state', () => {
      it('add cell key to state', async () => {
        const result = renderHookWithGameContext(() => ({
          useRevealCellsResult: useRevealCells(),
          useGameContextResult: useGameContext()
        }))

        const key = '0-0'
        act(() => {
          result.current!.useGameContextResult.setSafeUnrevealedCells(new Set([key]))
        })

        act(() => {
          result.current!.useRevealCellsResult.revealCell(0, 0)
        })

        await waitFor(() => {
          expect(result.current!.useGameContextResult.revealedCells.has(key)).toBe(true)
          expect(result.current!.useGameContextResult.safeUnrevealedCells.has(key)).toBe(false)
        })
      })
    })

    describe('when cell key is present on revealedCells state', () => {
      it('should quietly return and not add cell key to state', async () => {
        const key = '0-0'

        const setRevealedCellsSpy = vi.fn()
        const setSafeUnrevealedCellsSpy = vi.fn()
        const overrideStates = {
          revealedCells: new Set([key]),
          setRevealedCells: setRevealedCellsSpy,
          setSafeUnrevealedCells: setSafeUnrevealedCellsSpy
        }

        const result = renderHookWithGameContext(
          () => ({
            useRevealCellsResult: useRevealCells(),
            useGameContextResult: useGameContext()
          }),
          overrideStates
        )

        act(() => {
          result.current!.useRevealCellsResult.revealCell(0, 0)
        })

        expect(setRevealedCellsSpy).not.toHaveBeenCalled()
        expect(setSafeUnrevealedCellsSpy).not.toHaveBeenCalled()
      })
    })
  })
})
