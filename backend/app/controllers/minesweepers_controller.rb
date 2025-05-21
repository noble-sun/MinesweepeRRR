class MinesweepersController < ApplicationController
  def generate
    board = Minefield.new(size: 16)
    PlaceMinesService.call(minefield: board, mine_count: 40)
    GenerateCluesService.call(minefield: board)

    render json: board.grid, status: :ok
  end
end
