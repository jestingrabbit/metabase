# == Schema Information
#
# Table name: tables
#
#  id          :integer          not null, primary key
#  plural      :string
#  database_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Table < ActiveRecord::Base
  belongs_to :database
  has_many :column_descriptions
end
