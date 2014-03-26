require 'spec_helper'

feature 'User views home Page', :js do
  scenario 'user can visit page and see the game board' do
    visit root_path
    expect(page).to have_content "Play-Periodically!"
    within('#game-board') do
      expect(page).to have_css '#tile_0'
      expect(page).to have_css '#tile_12'
      expect(page).to have_css '#tile_23'
    end
  end
end
