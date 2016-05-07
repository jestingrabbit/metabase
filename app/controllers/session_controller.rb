class SessionController < ApplicationController

  def create
    identifier = params[:identifier]
    @user = User.find_by(:name => identifier) || User.find_by(:email => identifier)
    if @user.present? && @user.authenticate(params[:password])
      session[:user_id] = user.id
      render :json => @user
    else
      render :json => false
    end
  end

  def show
    render :json => session
  end

  def destroy
    session[:user_id] =nil
    redirect_to root_path
  end

end
