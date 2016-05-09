class SessionController < ApplicationController

  def create
    identifier = params[:identifier]
    @user = User.find_by(:name => identifier) || User.find_by(:email => identifier)
    if @user.present? && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render :json => @user
    else
      session[:user_id] = nil
      render :json => nil, :status => :unprocessable_entity
    end
  end

  def show
    if @current_user.present?
      render :json => { :session => session, :user => @current_user }
    else
      render :json => nil
    end
  end

  def destroy
    session[:user_id] =nil
    redirect_to root_path
  end

end
