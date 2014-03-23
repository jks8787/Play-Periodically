class RemoveTopScoreFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :top_score, :integer
  end
end
