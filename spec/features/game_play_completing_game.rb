require 'spec_helper'

feature 'user can play a game', :js do

  scenario 'user plays the game till all matches reached' do
    visit root_path
    page.execute_script("playPeriodically.newBoard(['H', 'H']);")
    find('#tile_0').click
    selector0 = "#tile_0.element_H.flipped-over"
    expect(page).to have_css selector0
    find('#tile_1').click
    expect(page).to have_content "Please Sign in - if you want to save your scores!"
    expect(page).to have_content "you matched all the elements!"
  end

end



