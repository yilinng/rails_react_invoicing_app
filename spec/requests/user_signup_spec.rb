require "rails_helper"

RSpec.describe "User signup", :type => :request do

  it "user signup success" do
    post "/api/v1/signup", 
    :params => attributes_for(:user) 

    expect(response).to have_http_status(:success)
  end

   it "user signup miss email" do
    post "/api/v1/signup", 
    :params =>
    { :email => "", :password => "test12" }

    expect(response).to have_http_status(403)
  end

   it "user signup miss password" do
    post "/api/v1/signup", 
    :params =>
    { :email => "test12@test.com", :password => "" }

    expect(response).to have_http_status(403)
  end

end