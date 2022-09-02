require "rails_helper"

RSpec.describe "User login", :type => :request do

  it "user login success" do
    post "/api/v1/login", 
    :params =>
    { :email => "test12@test.com", :password => "test12" }

    expect(response).to have_http_status(:success)
  end

end