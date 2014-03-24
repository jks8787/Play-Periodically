PlayPeriodically::Application.routes.draw do
  root to: 'home#index'
  devise_for :users
  resources :scores
end
