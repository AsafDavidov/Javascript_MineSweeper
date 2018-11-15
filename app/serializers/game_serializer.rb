class GameSerializer < ActiveModel::Serializer
  attributes :id, :time_taken,:winner, :user_id, :difficulty
  belongs_to :user
end
