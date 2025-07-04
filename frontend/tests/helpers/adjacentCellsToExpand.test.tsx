import { renderHook, act, waitFor } from '@testing-library/react'
import { adjacentCellsToExpand } from '../../src/helpers/adjacentCellsToExpand'

describe('adjacentCellsToExpand', () => {
  describe('given row and col coordinates and a minefield', () => {
    it('return all adjacentent coordinates of cell', () => {
      const minefield = [
        ['0-0', '0-1', '0-2'],
        ['1-0', '1-1', '1-2'],
        ['2-0', '2-1', '2-2'],
      ]
      const flaggedCells = new Set<string>()
      const revealedCells = new Set<string>()
      const questionMarkedCells = new Set<string>()
      const result = adjacentCellsToExpand(
        1, 1, minefield, flaggedCells, revealedCells, questionMarkedCells
      )

      const expectedResult = [[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]]
      expect(result).toEqual(expectedResult)
    })

    describe('when some adjacent cells are out of bounds of minefield', () => {
      it('return only coordinates of cells within bound', () => {
        const minefield = [
          ['0-0', '0-1', '0-2'],
          ['1-0', '1-1', '1-2'],
          ['2-0', '2-1', '2-2'],
        ]
        const flaggedCells = new Set<string>()
        const revealedCells = new Set<string>()
        const questionMarkedCells = new Set<string>()
        const result = adjacentCellsToExpand(
          0, 0, minefield, flaggedCells, revealedCells, questionMarkedCells
        )

        const expectedResult = [[0,1],[1,0],[1,1]]
        expect(result).toEqual(expectedResult)
      })
    })

    describe('when some of the adjacent cells are listed on revealedCells', () => {
      it('do not return those coordinates', () => {
        const minefield = [
          ['0-0', '0-1', '0-2'],
          ['1-0', '1-1', '1-2'],
          ['2-0', '2-1', '2-2'],
        ]
        const revealedCells = new Set(['0-0', '1-0', '2-0'])
        const flaggedCells = new Set<string>()
        const questionMarkedCells = new Set<string>()
        const result = adjacentCellsToExpand(
          1, 1, minefield, flaggedCells, revealedCells, questionMarkedCells
        )

        const expectedResult = [[0,1],[0,2],[1,2], [2,1], [2,2]]
        expect(result).toEqual(expectedResult)
      })
    })

    describe('when some of the adjacent cells are listed on flaggedCells', () => {
      it('do not return those coordinates', () => {
        const minefield = [
          ['0-0', '0-1', '0-2'],
          ['1-0', '1-1', '1-2'],
          ['2-0', '2-1', '2-2'],
        ]
        const revealedCells = new Set<string>()
        const flaggedCells = new Set(['0-0', '1-0', '2-0'])
        const questionMarkedCells = new Set<string>()
        const result = adjacentCellsToExpand(
          1, 1, minefield, flaggedCells, revealedCells, questionMarkedCells
        )

        const expectedResult = [[0,1],[0,2],[1,2], [2,1], [2,2]]
        expect(result).toEqual(expectedResult)
      })
    })

    describe('when some of the adjacent cells are listed on questionMarkedCells', () => {
      it('do not return those coordinates', () => {
        const minefield = [
          ['0-0', '0-1', '0-2'],
          ['1-0', '1-1', '1-2'],
          ['2-0', '2-1', '2-2'],
        ]
        const revealedCells = new Set<string>()
        const flaggedCells = new Set<string>()
        const questionMarkedCells = new Set(['0-0', '1-0', '2-0'])
        const result = adjacentCellsToExpand(
          1, 1, minefield, flaggedCells, revealedCells, questionMarkedCells
        )

        const expectedResult = [[0,1],[0,2],[1,2], [2,1], [2,2]]
        expect(result).toEqual(expectedResult)
      })
    })

    describe('when some of the adjacent cells are out of bounds and present on every Set list', () => {
      it('do not return those coordinates', () => {
        const minefield = [
          ['0-0', '0-1', '0-2'],
          ['1-0', '1-1', '1-2'],
          ['2-0', '2-1', '2-2'],
        ]
        const revealedCells = new Set(['0-0'])
        const flaggedCells = new Set(['0-2'])
        const questionMarkedCells = new Set(['1-0'])
        const result = adjacentCellsToExpand(
          0, 1, minefield, flaggedCells, revealedCells, questionMarkedCells
        )

        const expectedResult = [[1,1], [1,2]]
        expect(result).toEqual(expectedResult)
      })
    })
  })
})
