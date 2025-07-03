import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Cell } from '../../components/Cell'

describe('Cell component', () => {
  describe("when 'isRevealed' is true", () => {
    describe("when 'hasMine' is false", () => {
      describe("when 'clue' is 1 or higher", () => {
        it("renders 'clue' value", () => {
          const isRevealed = true
          const hasMine = false
          const clue = 3

          render(
            <Cell
              row={ 0 } col={ 0 }
              onClick={ vi.fn() }
              onRightClick={ vi.fn() }
              isRevealed={ isRevealed }
              hasMine={ hasMine }
              flagged={ false }
              questionMarked={ false }
              exploded={ false }
              clue={ clue }
            />
          )

          const button = screen.getByRole('button')
          expect(button.textContent).toBe('3')
          expect(button).toHaveClass('!bg-gray-400')
        })
      })

      describe("when 'clue' is zero", () => {
        it("renders empty string", () => { 
          const isRevealed = true
          const hasMine = false
          const clue = 0

          render(
            <Cell
              row={ 0 } col={ 0 }
              onClick={ vi.fn() }
              onRightClick={ vi.fn() }
              isRevealed={ isRevealed }
              hasMine={ hasMine }
              flagged={ false }
              questionMarked={ false }
              exploded={ false }
              clue={ clue }
            />
          )

          const button = screen.getByRole('button')
          expect(button.textContent).toBe('')
          expect(button).toHaveClass('!bg-gray-400')
        })
      })
    })

    describe("when 'hasMine' is true", () => {
      it("renders mine image", () => {
        const isRevealed = true
        const hasMine = true
        const clue = null

        render(
          <Cell
            row={ 0 } col={ 0 }
            onClick={ vi.fn() }
            onRightClick={ vi.fn() }
            isRevealed={ isRevealed }
            hasMine={ hasMine }
            flagged={ false }
            questionMarked={ false }
            exploded={ false }
            clue={ clue }
          />
        )
 
        expect(screen.getByRole('img')).toHaveAttribute('src')
        expect(screen.getByAltText('mine')).toBeInTheDocument()
        expect(screen.getByRole('button')).toHaveClass('!bg-red-700')
      })
    })

    describe("when 'flagged' is true", () => {
      it("do not render flag image", () => {
        const isRevealed = true
        const flagged = true

        render(
          <Cell
            row={ 0 } col={ 0 }
            onClick={ vi.fn() }
            onRightClick={ vi.fn() }
            isRevealed={ isRevealed }
            hasMine={ false }
            flagged={ flagged }
            questionMarked={ false }
            exploded={ false }
            clue={ 3 }
          />
        )

        expect(screen.queryByRole('img')).not.toBeInTheDocument()
        expect(screen.getByRole('button').textContent).toBe('3')
      })
    })

    describe("when 'questionMark' is true", () => {
      it("do not render question mark image", () => {
        const isRevealed = true
        const questionMarked = true

        render(
          <Cell
            row={ 0 } col={ 0 }
            onClick={ vi.fn() }
            onRightClick={ vi.fn() }
            isRevealed={ isRevealed }
            hasMine={ false }
            flagged={ false }
            questionMarked={ questionMarked }
            exploded={ false }
            clue={ 3 }
          />
        )

        expect(screen.queryByRole('img')).not.toBeInTheDocument()
        expect(screen.getByRole('button').textContent).toBe('3')
      })
    })
  })

  describe("when 'isRevealed' is false", () => {
    describe("when 'flagged' is true", () => {
      it("renders flag image", () => {
        const isRevealed = false
        const flagged = true

        render(
          <Cell
            row={ 0 } col={ 0 }
            onClick={ vi.fn() }
            onRightClick={ vi.fn() }
            isRevealed={ isRevealed }
            hasMine={ false }
            flagged={ flagged }
            questionMarked={ false }
            exploded={ false }
            clue={ 0 }
          />
        )

        expect(screen.getByRole('img')).toHaveAttribute('src')
        expect(screen.getByAltText('flag')).toBeInTheDocument()
      })
    })

    describe("when 'questionMark' is true", () => {
      it("renders question mark image", () => {
        const isRevealed = false
        const questionMarked = true

        render(
          <Cell
            row={ 0 } col={ 0 }
            onClick={ vi.fn() }
            onRightClick={ vi.fn() }
            isRevealed={ isRevealed }
            hasMine={ false }
            flagged={ false }
            questionMarked={ questionMarked }
            exploded={ false }
            clue={ 0 }
          />
        )

        expect(screen.getByRole('img')).toHaveAttribute('src')
        expect(screen.getByAltText('questionMark')).toBeInTheDocument()
      })
    })
  })

  describe("when 'exploded' is true", () => {
    it("disables button", () => {
      const isRevealed = false
      const exploded = true

      render(
        <Cell
          row={ 0 } col={ 0 }
          onClick={ vi.fn() }
          onRightClick={ vi.fn() }
          isRevealed={ isRevealed }
          hasMine={ false }
          flagged={ false }
          questionMarked={ false }
          exploded={ exploded }
          clue={ 0 }
        />
      )

      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe("when 'exploded' is false", () => {
    it("do not disable button", () => {
      const isRevealed = false
      const exploded = false

      render(
        <Cell
          row={ 0 } col={ 0 }
          onClick={ vi.fn() }
          onRightClick={ vi.fn() }
          isRevealed={ isRevealed }
          hasMine={ false }
          flagged={ false }
          questionMarked={ false }
          exploded={ exploded }
          clue={ 0 }
        />
      )

      expect(screen.getByRole('button')).not.toBeDisabled()
    })
  })

  describe("when clicking button", () => {
    it("calls 'onclick' function with correct arguments", () => {
      const onClick = vi.fn()
      const row = 0
      const col = 0
      const hasMine = false

      render(
        <Cell
          row={ row } col={ col }
          onClick={ onClick }
          onRightClick={ vi.fn() }
          isRevealed={ false }
          hasMine={ hasMine }
          flagged={ false }
          questionMarked={ true }
          exploded={ false }
          clue={ 0 }
        />
      )
    
      fireEvent.click(screen.getByRole('button'))

      expect(onClick).toHaveBeenCalledWith(row, col, hasMine)
    })
  })

  describe("when right clicking button", () => {
    it("calls 'onRightclick' function with correct arguments and prevents default", () => {
      const onRightClick = vi.fn()
      const preventDefault = vi.fn()
      const row = 0
      const col = 0

      render(
        <Cell
          row={ row } col={ col }
          onClick={ vi.fn() }
          onRightClick={ onRightClick }
          isRevealed={ false }
          hasMine={ false }
          flagged={ false }
          questionMarked={ true }
          exploded={ false }
          clue={ 0 }
        />
      )
    
      const button = screen.getByRole('button')

      const event = new MouseEvent('contextmenu', {
        bubbles: true, //Makes the event bubble up through the DOM
        cancelable: true, //Allows event to be cancellable
        button: 2 //Right click
      })

      // Overrides the default preventDefault function to spy the function
      Object.defineProperty(event, 'preventDefault', {
        value: preventDefault,
        writable: true
      })

      button.dispatchEvent(event)
      expect(preventDefault).toHaveBeenCalled()
      expect(onRightClick).toHaveBeenCalledWith(row, col)
    })
  })
})
