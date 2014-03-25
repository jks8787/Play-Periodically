class ScoresController < ApplicationController

  def index
    @scores = Score.order(value: :desc)
  end

  def create
    if user_signed_in?
      @score = Score.new(user_id: current_user.id)
      @score.value = params[:value]
      @score.save!
      render json: @score
    else
      render json: { message: "to have scores saved - please sign in" }
    end
  end


  private

  def score_params
    params.require(:score).permit(:value)
  end

end
