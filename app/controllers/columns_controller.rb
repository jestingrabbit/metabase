class ColumnsController < ApplicationController
  before_action :get_database_and_table_and_check_ownership, :only => [:index, :create]
  before_action :get_database_and_table_and_column_and_check_current_user_ownership, :except => [:index, :create]

  def index
    @columns = @table.columns if @table
    @columns.sort_by! {|c| c.rank}
    render :json => @columns
  end

  def create
    @column = Column.new column_params
    @column.table_id = @table.id
    if @column.save
      render :json => @column
    else
      render :json => @column, :status => :unprocessable_entity
    end
  end

  def update
    @column.update column_params
    unless @column.errors.any?
      @column.save
      render :json => @column
    else
      render :json => @column.errors, :status => :unprocessable_entity
    end
  end

  def show
    render :json => @column
  end

  def destroy #dependent destroy
    @column.destroy
    render :json => true
  end

  private

  def column_params
    params.require(:column).permit(
      :name,
      :data_type,
      :rank,
      :color,
      :table_id
    )
  end

  def get_database_and_table_and_check_ownership
    @table = Table.find_by :id => params[:table_id]
    @database = @table.database
    check_ownership_of_database
  end

  def get_database_and_table_and_column_and_check_current_user_ownership
    @column = Column.find_by :id => params[:id]
    @table = @column.table if @column
    @database = @table.database if @table
    check_ownership_of_database
  end

  def check_ownership_of_database
    unless @current_user && @database && @database.user_id == @current_user.id
      render :json => {}, :status => :unprocessable_entity
    end
  end

end
