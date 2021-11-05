class Api::V1::UserController < ApplicationController
  #sign up
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.valid?
      #token = encode_token({user_id: @user.id})
      render json: { user: @user }
    else
      render json: { error: "Invaild email or password"}
    end
  end

  def user_params
    params.permit(:username, :password)
  end

end
