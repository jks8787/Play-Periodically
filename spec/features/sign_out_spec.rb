require 'spec_helper'

feature 'user signs out' do

	scenario 'successfully' do
		user = create(:user)
		visit root_path
    click_link 'Sign in'
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Sign in'
    visit root_path
		click_link 'Sign out'
		expect(page).to_not have_content "Logged in as"
	end
end
