require 'spec_helper'

describe User do
 describe "associations" do
    it { should have_many :scores }
  end

  describe "validation" do
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password) }
  end
end
