PlayPeriodically::Application.routes.draw do
  resources :scores

  devise_for :users
  root to: 'home#index'
end
