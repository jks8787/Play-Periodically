require 'spec_helper'

describe Score do
  describe "associations" do
    it { should belong_to :user }
  end

  describe "validation" do
    it { should validate_presence_of(:value) }
  end
end
