require 'spec_helper'

feature 'User views home Page', :js do

  scenario 'user can visit page and see the game board' do
    visit root_path
    expect(page).to have_content "Play-Periodically!"
    game_board = page.evaluate_script("document.getElementById('game-board').innerHTML")
    game_board.should include("<div id=\"tile_0\"></div")
    game_board.should include("<div id=\"tile_23\"></div")
  end

  scenario 'user can visit page and see the periodic table' do
    visit root_path
    expect(page).to have_content "Play-Periodically!"
    page.html.should include('<rect x="0" y="0" width="55" height="55" rx="5" ry="5" style="fill: #edf46e; "></rect>')
    page.html.should include('<text x="3" y="14" style="fill: #232323; font-size: 1em; alignment-baseline: middle; font-family: sans-serif; ">H</text>')
    page.html.should include('<rect x="0" y="0" width="55" height="55" rx="5" ry="5" style="fill: #00b392; "></rect>')
    page.html.should include('<text x="3" y="14" style="fill: #232323; font-size: 1em; alignment-baseline: middle; font-family: sans-serif; ">Uuh</text>')
  end
end


