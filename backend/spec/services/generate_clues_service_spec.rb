require "rails_helper"

RSpec.describe GenerateCluesService, type: :service do
  describe ".call" do
    context "given a minefield with mines, generate clues on adjacent fields" do
      it "successfully" do
        minefield = Minefield.new(size: 3)
        minefield.cell(2, 1).place_mine

        expect(described_class.call(minefield:)).to be_truthy

        expected_clues = [ [ 1, 0 ], [ 2, 0 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ] ]
        expected_clues.each do |x, y|
          expect(minefield.cell(x, y).clue_count).to eq(1)
        end

        empty_fields = [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ]
        empty_fields.each do |x, y|
          expect(minefield.cell(x, y).clue_count).to eq(0)
        end
      end

      context "when field has a mine" do
        it "do not add clue count to it" do
          minefield = Minefield.new(size: 4)
          first_mine = minefield.cell(3, 0)
          first_mine.place_mine
          second_mine = minefield.cell(3, 1)
          second_mine.place_mine

          described_class.call(minefield:)

          expect(first_mine.clue_count).to be_nil
          expect(second_mine.clue_count).to be_nil

          expected_clue_1 = [ [ 2, 2 ], [ 3, 2 ] ]
          expected_clue_1.each do |x, y|
            expect(minefield.cell(x, y).clue_count).to eq(1)
          end

          expected_clue_2 = [ [ 2, 0 ], [ 2, 1 ] ]
          expected_clue_2.each do |x, y|
            expect(minefield.cell(x, y).clue_count).to eq(2)
          end
        end
      end
    end
  end
end
