require 'spec_helper'

feature 'User can flip the cards for the game', :js do
  scenario 'user can click on the cards - then they are flipped over - sees no highlighting' do
    visit root_path
    page.execute_script("playPeriodically.newBoard(['H', 'He', 'B', 'Li']);")
    find('#tile_0').click
    selector0 = %w(He Ne N H B P Si Li Mg O Na C).map{ |e| "#tile_0.element_#{e}.flipped-over" }.join(',')
    expect(page).to have_css selector0
    find('#tile_1').click
    selector1 = %w(He Ne N H B P Si Li Mg O Na C).map{ |e| "#tile_1.element_#{e}.flipped-over" }.join(',')
    expect(page).to have_css selector1
    expect(page).to have_no_css ".matched"
  end

  scenario 'user can click on the cards - then they are flipped over - see highlighting' do
    visit root_path
    page.execute_script("playPeriodically.newBoard(['He', 'He', 'He', 'He']);")
    find('#tile_0').click
    selector0 = %w(He Ne N H B P Si Li Mg O Na C).map{ |e| "#tile_0.element_#{e}.flipped-over" }.join(',')
    expect(page).to have_css selector0
    find('#tile_1').click
    selector1 = %w(He Ne N H B P Si Li Mg O Na C).map{ |e| "#tile_1.element_#{e}.flipped-over" }.join(',')
    expect(page).to have_css selector1
    expect(page).to have_css ".matched"
  end
end
