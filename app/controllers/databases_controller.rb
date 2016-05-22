class DatabasesController < ApplicationController
  before_action :get_database_and_check_ownership, :except => [:index, :create]
  before_action :check_current_user, :only => [:index, :create]

  def index
    @databases = @current_user.databases
    @databases = @databases.order(:updated_at).reverse
    render :json => @databases
  end

  def create
    @database = Database.new database_params
    @database.user_id = @current_user.id
    @database.name = @database.name.strip.gsub(/\s+/, "_")

    # Chrome has my back on this, and, because its a developer tool, I think I can assume chrome, at least for our purposes today.
    # if @database.name.size == 0
    #   @database.name = "test" << @database.id.to_s
    # end

    if @database.save
      render :json => @database
    else
      render :json => {}, :status => :unprocessable_entity
    end
  end

  def update
    @database.update database_params
    unless @database.errors.any?
      @database.save
      render :json => @database
    else
      render :json => @database.errors, :status => :unprocessable_entity
    end
  end

  def show
    render :json => @database
  end

  def full
    @tables = @database.tables
    @full_tables = @tables.map do |table|
      columns = table.columns.sort_by { |c| c.rank}
      {:table => table, :columns => columns}
    end
    render :json => {
      :database => @database,
      :tables => @full_tables
    }
  end

  def destroy #dependent destroy
    @database.destroy
    render :json => true
  end

  private

  def database_params
    params.require(:database).permit(
      :name,
      :user_id,
      :created_at,
      :updated_at,
      :color_index
    )
  end

  def get_database_and_check_ownership
    @database = Database.find_by :id => params[:id]
    unless @current_user && @database && @database.user_id == @current_user.id
      render :json => {}, :status => :unprocessable_entity
    end
  end

  def check_current_user
    unless @current_user
      render :json => {}, :status => :unprocessable_entity
    end
  end

end
