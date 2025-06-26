class AddClueError < StandardError; end
class NoMineError < StandardError; end

class Cell
  def initialize(x:, y:)
    @mine = false
    @clue = 0
    @x = x
    @y = y
  end

  def neighbors
    [ x-1, x, x+1 ].product([ y-1, y, y+1 ]) - [ [ x, y ] ]
  end

  def add_clue_count
    raise AddClueError.new("Cannot add clue when there's a mine") if mine?

    @clue += 1
  end

  def set_clue_as_mine
    raise NoMineError.new("Cannot define clue as mine when there isn't a mine placed") unless mine?

    @clue = nil
  end

  def place_mine; @mine = true end
  def mine?; mine end
  def clue_count; clue end

  private

  attr_reader :mine, :revealed, :flagged, :clue, :x, :y
end
