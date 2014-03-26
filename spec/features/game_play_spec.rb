require 'spec_helper'

feature 'User views home Page', :js do

  scenario 'user can click on the cards' do
    visit root_path
    find('#tile_0').click
    selector = %w(He Ne N H B P Si Li Mg O Na C).map{ |e| "#tile_0.element_#{e}" }.join(',')
    expect(page).to have_css selector
  end
end
