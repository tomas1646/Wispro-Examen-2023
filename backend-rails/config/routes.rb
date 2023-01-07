Rails.application.routes.draw do
  resources :users, only: %i[create show] do
    collection do
      post :login
    end
  end

  resources :internet_plans, only: %i[index create update destroy show] do
    collection do
      get :grouped_by_isp
      get :isp_plans
      get :isp_plans_offered
    end
  end

  resources :plan_requests, only: %i[index create update destroy show] do
    collection do
      get :my_requests
      get :pending_requests
    end
    member do
      put :accept_request
      put :reject_request
      put :modify_plan
    end
  end
end
