class TablesController < ApplicationController
  before_action :get_database_and_table_and_check_ownership, :except => [:index, :create]
  before_action :get_database_and_check_current_user_ownership, :only => [:index, :create]

  def index
    @tables = @database.tables if @database
    render :json => @tables
  end

  def create
    @table = Table.new table_params
    @table.database_id = @database.id
    normalize
    if @table.save
      render :json => @table
    else
      render :json => @table, :status => :unprocessable_entity
    end
  end

  def update
    @table.update table_params
    normalize
    unless @table.errors.any?
      @table.save
      render :json => @table
    else
      render :json => @table.errors, :status => :unprocessable_entity
    end
  end

  def show
    render :json => @table
  end

  def destroy #dependent destroy
    @table.destroy
    render :json => true
  end

  private

  def table_params
    params.require(:table).permit(
      :plural,
      :singular,
      :color,
      :top,
      :left,
      :database_id,
      :created_at,
      :updated_at
    )
  end

  def get_database_and_table_and_check_ownership
    @table = Table.find_by :id => params[:id]
    @database = @table.database
    check_ownership_of_database
  end

  def get_database_and_check_current_user_ownership
    @database = Database.find_by :id => params[:database_id]
    check_ownership_of_database
  end

  def check_ownership_of_database
    unless @current_user && @database && @database.user_id == @current_user.id
      render :json => {}, :status => :unprocessable_entity
    end
  end

  def normalize
    if @table.present?
      @table.plural =  @table.plural.strip.pluralize #fingers crossed
      @table.singular = @table.plural.pluralize(1)
    end
  end

end
