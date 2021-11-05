Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resource :users, only: [:create]

      post "/signup", to: "users#create"
      post "/login", to: "users#login"
      post "/logout", to: "users#destroy"
      get "/autoLogin", to: "users#auto_login"
      get "/invoices", to: "invoices#index"
      get '/invoices/:id', to: 'invoices#show'
      delete '/invoices/:id', to: 'invoices#destroy'
      post "/invoices/create", to: "invoices#create" 
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
