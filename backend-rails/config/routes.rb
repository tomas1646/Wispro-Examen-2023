Rails.application.routes.draw do
  resources :users, only: %i[create] do
    collection do
      post :login
    end
  end

  resources :internet_plans, only: %i[create update] do
    collection do
      get :grouped_by_isp
      get :isp_plans
      get :isp_plans_offered
    end
  end

  resources :plan_requests, only: %i[create show] do
    collection do
      get :my_requests
      get :pending
    end
    member do
      put :accept
      put :reject
      put :modify
    end
  end
end
