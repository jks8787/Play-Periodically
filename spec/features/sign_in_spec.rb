require 'spec_helper'

feature 'user signs in' do

  background do
    @user = create(:user)
  end

  scenario 'successfully' do
    visit root_path
    click_link 'Sign in'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: @user.password
    click_button 'Sign in'
    expect(page).to have_content "Logged in as #{@user.email}"
    expect(page).to have_link 'Sign out'
  end

  scenario 'unsuccessfully' do
    visit root_path
    click_link 'Sign in'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: 'something'
    click_button 'Sign in'
    expect(page).to_not have_content "Logged in as"
  end

end
