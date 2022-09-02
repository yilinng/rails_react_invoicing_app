require "rails_helper"

RSpec.describe "User signup success and invoice something", :type => :request do

  before(:each) do
    post "/api/v1/signup", 
    :params => attributes_for(:user) 

    expect(response).to have_http_status(:success)
  end

  it "user create new one success" do
    post "/api/v1/invoices/create", 
    :params => attributes_for(:invoice)

    expect(response).to have_http_status(:created)
  end


  it "user will show invoice list" do
    get "/api/v1/invoices" 

    expect(response).to have_http_status(:success)

  end

end