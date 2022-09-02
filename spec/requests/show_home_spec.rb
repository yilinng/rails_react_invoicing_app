require "rails_helper"

RSpec.describe "Show home page", :type => :request do

  it "show home page" do
   
    get "/"
    expect(response).to have_http_status(:success)
  end

end