import { renderHook, waitFor, act } from '@testing-library/react'
import { useRevealCells } from '../../src/hooks/useRevealCells'
import { useGameContext } from '../../src/contexts/GameContext'
import { renderHookWithGameContext } from '../test-utils'
import * as expandCellsHelper from '../../src/helpers/adjacentCellsToExpand.ts'

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

  describe('expandAdjacentCells', () => {
    describe('when cell clue value is zero', () => {
      describe('when all adjacent cells have clue values above zero', () => {
        it('add all adjacent cell keys to revealedCells state', () => {
          const minefield = [
            [
              { x: 0, y: 0, mine: false, clue: 1},
              { x: 0, y: 1, mine: false, clue: 1},
              { x: 0, y: 2, mine: false, clue: 1},
            ],
            [
              { x: 1, y: 0, mine: false, clue: 1},
              { x: 1, y: 1, mine: false, clue: 0},
              { x: 1, y: 2, mine: false, clue: 1},
            ],
            [
              { x: 2, y: 0, mine: false, clue: 1},
              { x: 2, y: 1, mine: false, clue: 1},
              { x: 2, y: 2, mine: false, clue: 1},
            ]
          ]

          const result = renderHookWithGameContext(() => ({
            useRevealCellsResult: useRevealCells(minefield),
            useGameContextResult: useGameContext()
          }))

          act(() => {
            result.current!.useRevealCellsResult.expandAdjacentCells(1, 1)
          })

          const expectedCellKeys = ['0-0', '0-1', '0-2', '1-0', '1-2', '2-0', '2-1', '2-2'] 
          expect([...result.current!.useGameContextResult.revealedCells]).toEqual(
            expectedCellKeys
          )
        })
      })

      describe('when one of the adjacent cells clue value is zero', () => {
        it('recursively add adjacent cell keys to revealedCells state to every'/
           'revealed cell with clue value equal to zero', () => {
          const minefield = [
            [
              { x: 0, y: 0, mine: false, clue: 0},
              { x: 0, y: 1, mine: false, clue: 1},
              { x: 0, y: 2, mine: false, clue: 1},
            ],
            [
              { x: 1, y: 0, mine: false, clue: 0},
              { x: 1, y: 1, mine: false, clue: 1},
              { x: 1, y: 2, mine: true, clue: null},
            ],
            [
              { x: 2, y: 0, mine: false, clue: 0},
              { x: 2, y: 1, mine: false, clue: 1},
              { x: 2, y: 2, mine: false, clue: 1},
            ]
          ]

          const result = renderHookWithGameContext(() => ({
            useRevealCellsResult: useRevealCells(minefield),
            useGameContextResult: useGameContext()
          }))

          act(() => {
            result.current!.useRevealCellsResult.expandAdjacentCells(0, 0)
          })

          const expectedCellKeys = ['0-1', '1-0', '1-1', '0-0', '2-0', '2-1']
          expect([...result.current!.useGameContextResult.revealedCells]).toEqual(
            expectedCellKeys
          )
        })
      })
    })
  })
})
