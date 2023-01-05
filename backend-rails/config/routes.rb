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
    end
  end

  resources :plan_requests, only: %i[index create update destroy show] do
  end
end
