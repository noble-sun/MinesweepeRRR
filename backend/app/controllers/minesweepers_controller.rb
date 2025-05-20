class MinesweepersController < ApplicationController
  def generate
    board = Minefield.new(size: 16)
    placed_mines = PlaceMinesService.call(minefield: board, mine_count: 40)

    render json: board.grid
  end
end
