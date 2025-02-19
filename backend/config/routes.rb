Rails.application.routes.draw do
  resources :tasks
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  
  namespace :api do
    namespace :v1 do
      resources :desafios do
        
      end
    end
    resources :tasks, only: [:create]
  end
end
