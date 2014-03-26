require 'spec_helper'

feature 'User can play the game', :js do
  scenario 'user can click on the cards - then they are flipped over' do
    visit root_path
    find('#tile_0').click
    selector0 = %w(He Ne N H B P Si Li Mg O Na C).map{ |e| "#tile_0.element_#{e}.flipped-over" }.join(',')
    expect(page).to have_css selector0
    find('#tile_1').click
    selector1 = %w(He Ne N H B P Si Li Mg O Na C).map{ |e| "#tile_1.element_#{e}.flipped-over" }.join(',')
    expect(page).to have_css selector1
  end

  scenario 'user can click on the cards - then they are flipped back unless they match' do
    visit root_path
    find('#tile_0').click
    selector0 = %w(He Ne N H B P Si Li Mg O Na C).map{ |e| "#tile_0.element_#{e}.flipped-over" }.join(',')
    expect(page).to have_css selector0
    find('#tile_1').click
    selector1 = %w(He Ne N H B P Si Li Mg O Na C).map{ |e| "#tile_1.element_#{e}.flipped-over" }.join(',')
    expect(page).to have_css selector1

    if selector1 != selector0
      selector0back = %w(He Ne N H B P Si Li Mg O Na C).map{ |e| "#tile_0.element_#{e}.flipped" }.join(',')
      selector1back = %w(He Ne N H B P Si Li Mg O Na C).map{ |e| "#tile_1.element_#{e}.flipped" }.join(',')
      expect(page).to have_css selector1back
      expect(page).to have_css selector0back
    else
      expect(page).to have_css selector1 && selector0
    end
  end

end
