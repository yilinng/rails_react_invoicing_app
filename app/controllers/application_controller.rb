class ApplicationController < ActionController::Base
    helper_method :logged_in?, :logged_in_user
  
    def logged_in_user
        decoded_token = cookies[:my_csrf_token]
      if decoded_token && session[:user_id]
        user_id = session[:user_id]
        @user = User.find_by(id: user_id)
      end
    end
  
    def logged_in?
      !!logged_in_user
    end
  
    def authorized
      render json: { message: 'Please log in.' }, status: :unauthorized unless logged_in?
    end
end