class ScoresController < ApplicationController

  def index
    @scores = Score.order(value: :asc)
  end

  def create
    if user_signed_in?
      @score = Score.new(user_id: current_user.id)
      @score.value = params[:value]
      @score.save!
    else
      respond_to do |format|
        format.html { redirect_to root_path, notice: 'to save your scores - please sign in!' }
      end
    end
    render json: @score
  end


  private

  def score_params
    params.require(:score).permit(:value)
  end

end
