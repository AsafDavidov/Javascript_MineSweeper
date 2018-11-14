class Api::V1::GamesController < ApplicationController
  def index
    @games = Game.all
    render json: @games, status: :ok
  end
  def create
    g = Game.new(game_params)
    g.save
    render json: g, status: :created
  end

  private

  def game_params
    params.require(:game).permit(:time_taken,:winner,:user_id)
  end
end
