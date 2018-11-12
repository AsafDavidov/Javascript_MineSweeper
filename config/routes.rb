Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :games, only: [:index, :show,:update]
      resources :users, only: [:index, :show,:update]
    end
  end
end
