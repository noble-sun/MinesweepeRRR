require "rails_helper"

RSpec.describe "Minesweepers", type: :request do
  describe "GET /generate" do
    context "generate a 16x16 minefield with 40 mines and its clues" do
      it "successfully returns a nested array with mines and clues" do
        get minesweepers_generate_path

        expect(response).to have_http_status(:success)

        response_body = JSON.parse(response.body)
        expect(response_body.count).to eq(16)
        expect(response_body.first.count).to eq(16)
        expect(response_body.flatten.select { |cell| cell["mine"] }.count).to eq(40)
      end
    end
  end
end
