# == Schema Information
#
# Table name: tables
#
#  id          :integer          not null, primary key
#  plural      :string
#  color       :string
#  top         :integer
#  left        :integer
#  database_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Table < ActiveRecord::Base
  belongs_to :database
  has_many :columns
end
