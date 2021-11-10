class Api::V1::UsersController < ApplicationController
    before_action :authorized, only: [:auto_login, :destroy]
    
  #register    
  def create
    @user = User.create(user_params)
    if @user.valid?
      session[:user_id] = @user.id
      cookies[:my_csrf_token]= form_authenticity_token
      render json: { user: @user }
    else
      render json: { error: "Invaild email or password"}
    end
  end


  #login
  def login

    @user = User.find_by(email: params[:email])

    @token = Token.find_by(user_login: @user.id)

    if @token
      return render json: {message: "this user is login"}, status: :forbidden
    end

    if @user && @user.authenticate(params[:password])
      @token = Token.new(token_params)
      @token.user_login = @user.id
      #store user id in session and token table to identity 
      if @token.save
        session[:user_id] = @user.id
        cookies[:my_csrf_token]= form_authenticity_token
        render json: {user: @user}
      end
    else
      render json: {message: "Invalid email or password"}, status: :forbidden
    end
  end

  #logout
  def destroy
    #clear this user token
    @token = Token.find_by(user_login: session[:user_id])

    puts @token, "token here..."
    #if @Token
      @token.destroy
      session.delete(:user_id)
      cookies[:my_csrf_token] = nil
      render json: { message: 'log out success!!' }
    #else
      #render json: { message: 'logout fail, please try again' }, status: :unprocessable_entity
    #end
  end

  def auto_login
    @user = User.find_by(id: session[:user_id])
    render json: @user
  end

  def user_params
    params.permit(:email, :password)
  end

  def token_params
    params.permit(:user_login)
  end


end
