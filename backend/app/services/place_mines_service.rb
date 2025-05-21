# require_relative "#{Rails.root.join("app/minesweeper/minefield")}"

class PlaceMinesService
  def self.call(minefield:, mine_count:)
    new(minefield: minefield, mine_count: mine_count).call
  end

  def initialize(minefield:, mine_count:)
    @minefield = minefield
    @mine_count = mine_count
  end

  def call
    @minefield.clear_field unless @minefield.mine_count.zero?

    mines_placed = 0
    while mines_placed < @mine_count
      x = rand(@minefield.size)
      y = rand(@minefield.size)

      cell = @minefield.cell(x, y)

      next if cell.mine?

      cell.place_mine

      mines_placed += 1
    end

    true
  end
end
