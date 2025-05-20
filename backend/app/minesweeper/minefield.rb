class Minefield
  attr_reader :size, :grid

  def initialize(size:)
    @size = size
    @grid = Array.new(size) { Array.new(size) { Cell.new } }
  end

  def cell(x, y)
    grid[x][y]
  end

  def clear_field
    @grid = Array.new(size) { Array.new(size) { Cell.new } }
  end

  def mine_count
    grid.flatten.filter { |cell| cell.mine? }.count
  end
end
