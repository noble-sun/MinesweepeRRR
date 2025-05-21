class CellOutOfBoundsError < StandardError; end

class Minefield
  attr_reader :size, :grid

  def initialize(size:)
    @size = size
    @grid = Array.new(size) do |x|
      Array.new(size) do |y|
        Cell.new(x:, y:)
      end
    end
  end

  def cell(x, y)
    return grid[x][y] if in_bounds?(x, y)

    raise CellOutOfBoundsError.new("Cell outside grid limits")
  end

  def clear_field
    @grid = Array.new(size) do |x|
      Array.new(size) do |y|
        Cell.new(x:, y:)
      end
    end
  end

  def mine_count
    grid.flatten.filter { |cell| cell.mine? }.count
  end

  def in_bounds?(x, y)
    x.between?(0, size - 1) && y.between?(0, size - 1)
  end
end
