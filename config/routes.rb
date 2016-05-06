# == Route Map
#
# Prefix Verb   URI Pattern          Controller#Action
#   root GET    /                    pages#splash
#    faq GET    /faq(.:format)       pages#faq
#  users POST   /users(.:format)     users#create
#   user GET    /users/:id(.:format) users#show
#        PATCH  /users/:id(.:format) users#update
#        PUT    /users/:id(.:format) users#update
#        DELETE /users/:id(.:format) users#destroy
#  login POST   /login(.:format)     session#create
#        DELETE /login(.:format)     session#destroy
#

Rails.application.routes.draw do

  root :to => 'pages#splash'
  get '/faq' => 'pages#faq'

  resources :users, :only => [:create, :update, :show, :destroy]

  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
