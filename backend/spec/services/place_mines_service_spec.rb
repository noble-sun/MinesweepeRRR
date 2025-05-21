require 'rails_helper'

RSpec.describe PlaceMinesService, type: :service do
  describe ".call" do
    context "randomly place a given number of mines in the minefield" do
      it 'successfully' do
        minefield = Minefield.new(size: 4)

        expect(described_class.call(minefield:, mine_count: 5)).to be_truthy
        expect(minefield.mine_count).to eq(5)
      end

      context "when called twice or more for the same Minefield instance" do
        context "overwrite the current mines and place new ones" do
          it 'sucessfully' do
            minefield = Minefield.new(size: 4)

            described_class.call(minefield:, mine_count: 5)
            described_class.call(minefield:, mine_count: 5)

            expect(minefield.mine_count).to eq(5)
          end
        end
      end
    end
  end
end
