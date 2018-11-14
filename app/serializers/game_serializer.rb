class GameSerializer < ActiveModel::Serializer
  attributes :id, :time_taken,:winner, :user_id
  belongs_to :user
end
