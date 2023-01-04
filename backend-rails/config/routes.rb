Rails.application.routes.draw do
  resources :users, only: %i[create show] do
    collection do
      post :login
    end
  end
end
