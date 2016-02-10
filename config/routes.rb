Rails.application.routes.draw do
  root "poems#random"

  get "/poems/random", to: "poems#random"
end
