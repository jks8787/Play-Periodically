require 'spec_helper'

feature 'user can play a game', :js do

  background do
    @user = create(:user)
  end

  scenario 'user plays the game till all matches reached' do
    visit root_path
    # click_link 'Sign in'
    # fill_in 'Email', with: @user.email
    # fill_in 'Password', with: @user.password
    # click_button 'Sign in'
    # expect(page).to have_content "Logged in as #{@user.email}"

    tile_selector_array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map{ |t| "#tile_#{t}" }
    # selector = %w(He Ne N H B P Si Li Mg O Na C).map{ |e| "#tile_1.element_#{e}.flipped-over" }.join(',')
    selector = ".flipped"
    while count != 24
      tile_selector_array.each do |tile|
        find.tile.click
        expect(page).to have_css(selector, count: count)
      end
    end

  end

end
