class UsersController < ApplicationController
                      # ApplicationController
  before_filter :login_check, :only => [:update, :destroy]

  def show
    @user = User.find params[:id]
    unless @user == @current_user
      @user[:email] = nil
    end
    render :json => @user
  end

  def create
    @user = User.new user_params
    if @user.save
      session[:user_id] = @user.id
      session[:user] = @user
      render :json => @user
    else
      render :json => @user.errors, :status => :unprocessable_entity
    end
  end

  def update
    @user = @current_user
    @user.update user_params
    render :json => @user #chance I'll have to revisit this, but lets go with it for now.
  end

  def destroy
    @user = @current_user
    @user.destroy
    redirect_to root_path
  end

  private

  def user_params
    params.require(:user).permit(
      :name,
      :email,
      :password,
      :password_confirmation
    )
  end

  def login_check
    unless @current_user
      flash[:error] = "You can't do that unless you're logged in."
      redirect_to root_path
    end
  end
end
