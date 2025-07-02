import { renderHook, act, waitFor } from '@testing-library/react'
import { useGameContext } from '../../contexts/GameContext'
import { useCellInteraction } from '../../hooks/useCellInteraction'
import { renderHookWithGameContext } from '../test-utils'
import * as useRevealCellsModule from '../../hooks/useRevealCells'

describe('useCellInteraction', () => {
  describe('onClick', () => { 
    it('reveal cells and update safeUnrevealedCells state', () => {
      const revealCellMock = vi.fn()
      const expandAdjacentCellsMock = vi.fn()
      vi.spyOn(useRevealCellsModule, 'useRevealCells').mockReturnValue({
        revealCell: revealCellMock,
        expandAdjacentCells: expandAdjacentCellsMock
      })

      const key = '0-0'
      const minefield = [[]]
      const gameIsRunningMock = true
      const setSafeUnrevealedCellsSpy = vi.fn()
      const result = renderHookWithGameContext(
        () => ({
          useCellInteractionResult: useCellInteraction(minefield, gameIsRunningMock),
          useGameContextResult: useGameContext()
        })
      )

      act(() => {
        result.current!.useGameContextResult.setSafeUnrevealedCells(new Set([key]))
      })

      act(() => {
        result.current!.useCellInteractionResult.onClick(0, 0, false)
      })

      expect(revealCellMock).toHaveBeenCalled
      expect(expandAdjacentCellsMock).toHaveBeenCalled
      expect(result.current!.useGameContextResult.safeUnrevealedCells.has(key)).toBe(false)
    })

    describe('when hasMine is true', () => {
      it('only reveal clicked cell and call end of game functions', () => {
        const revealCellMock = vi.fn()
        const expandAdjacentCellsMock = vi.fn()
        vi.spyOn(useRevealCellsModule, 'useRevealCells').mockReturnValue({
          revealCell: revealCellMock,
          expandAdjacentCells: expandAdjacentCellsMock
        })

        const key = '0-0'
        const gameIsRunningMock = true
        const setSafeUnrevealedCellsSpy = vi.fn()
        const startTimerMock = vi.fn()
        const onExplodeMock = vi.fn()
        const gameWonMock = vi.fn()
        const stopTimerMock = vi.fn()
        const result = renderHookWithGameContext(
          () => ({
            useCellInteractionResult: useCellInteraction(
              [[]], gameIsRunningMock, startTimerMock, onExplodeMock, gameWonMock, stopTimerMock
            ),
            useGameContextResult: useGameContext()
          })
        )

        act(() => {
          result.current!.useGameContextResult.setSafeUnrevealedCells(new Set([key]))
        })

        act(() => {
          const hasMine = true
          result.current!.useCellInteractionResult.onClick(0, 0, hasMine)
        })

        expect(revealCellMock).toHaveBeenCalled
        expect(expandAdjacentCellsMock).not.toHaveBeenCalled
        expect(result.current!.useGameContextResult.safeUnrevealedCells.has(key)).toBe(false)  
        expect(stopTimerMock).toHaveBeenCalled
        expect(onExplodeMock).toHaveBeenCalled
        expect(gameWonMock).toHaveBeenCalledWith(false)
      })
    })

    describe('when cell key is flagged', () => {
      it("do not update safeUnrevealedCells state and don't reveal cell", () => {
        const revealCellMock = vi.fn()
        const expandAdjacentCellsMock = vi.fn()
        vi.spyOn(useRevealCellsModule, 'useRevealCells').mockReturnValue({
          revealCell: revealCellMock,
          expandAdjacentCells: expandAdjacentCellsMock
        })

        const minefield = [[]]
        const gameIsRunningMock = true
        const setSafeUnrevealedCellsSpy = vi.fn()
        const result = renderHookWithGameContext(
          () => ({
            useCellInteractionResult: useCellInteraction(minefield, gameIsRunningMock),
            useGameContextResult: useGameContext()
          }),
          {
            flaggedCells: new Set(['0-0']),
            setSafeUnrevealedCells: setSafeUnrevealedCellsSpy
          }
        )

        act(() => {
          result.current!.useCellInteractionResult.onClick(0, 0, false)
        })

        expect(revealCellMock).not.toHaveBeenCalled
        expect(expandAdjacentCellsMock).not.toHaveBeenCalled
        expect(setSafeUnrevealedCellsSpy)
      })
    })

    describe('when cell key is question marked', () => {
      it("do not update safeUnrevealedCells state and don't reveal cell", () => {
        const revealCellMock = vi.fn()
        const expandAdjacentCellsMock = vi.fn()
        vi.spyOn(useRevealCellsModule, 'useRevealCells').mockReturnValue({
          revealCell: revealCellMock,
          expandAdjacentCells: expandAdjacentCellsMock
        })

        const minefield = [[]]
        const gameIsRunningMock = true
        const setSafeUnrevealedCellsSpy = vi.fn()
        const result = renderHookWithGameContext(
          () => ({
            useCellInteractionResult: useCellInteraction(minefield, gameIsRunningMock),
            useGameContextResult: useGameContext()
          }),
          {
            questionMarkedCells: new Set(['0-0']),
            setSafeUnrevealedCells: setSafeUnrevealedCellsSpy
          }
        )

        act(() => {
          result.current!.useCellInteractionResult.onClick(0, 0, false)
        })

        expect(revealCellMock).not.toHaveBeenCalled
        expect(expandAdjacentCellsMock).not.toHaveBeenCalled
        expect(setSafeUnrevealedCellsSpy)
      })
    })

    describe('when gameIsRunning state', () => {
      describe('is null/undefined', () => {
        it('call startTimer function prop', () => {
          const revealCellMock = vi.fn()
          const expandAdjacentCellsMock = vi.fn()
          vi.spyOn(useRevealCellsModule, 'useRevealCells').mockReturnValue({
            revealCell: revealCellMock,
            expandAdjacentCells: expandAdjacentCellsMock
          })

          const minefield = [[]]
          const startTimerMock = vi.fn()
          const gameIsRunningMock = null
          const result = renderHookWithGameContext(() => ({
            useCellInteractionResult: useCellInteraction(minefield, gameIsRunningMock, startTimerMock),
          }))

          act(() => {
            result.current!.useCellInteractionResult.onClick(0, 0, false)
          })

          expect(startTimerMock).toHaveBeenCalled
          expect(revealCellMock).toHaveBeenCalled
          expect(expandAdjacentCellsMock).toHaveBeenCalled
        })
      })

      describe('is true', () => {
        it('does not call startTimer function prop again', () => {
          const revealCellMock = vi.fn()
          const expandAdjacentCellsMock = vi.fn()
          vi.spyOn(useRevealCellsModule, 'useRevealCells').mockReturnValue({
            revealCell: revealCellMock,
            expandAdjacentCells: expandAdjacentCellsMock
          })

          const minefield = [[]]
          const startTimerMock = vi.fn()
          const gameIsRunningMock = true
          const result = renderHookWithGameContext(() => ({
            useCellInteractionResult: useCellInteraction(minefield, gameIsRunningMock, startTimerMock),
          }))

          act(() => {
            result.current!.useCellInteractionResult.onClick(0, 0, false)
          })

          expect(startTimerMock).not.toHaveBeenCalled
          expect(revealCellMock).toHaveBeenCalled
          expect(expandAdjacentCellsMock).toHaveBeenCalled
        })
      })
    })

  })
})
