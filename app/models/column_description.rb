# == Schema Information
#
# Table name: column_descriptions
#
#  id         :integer          not null, primary key
#  name       :string
#  data_type  :string
#  table_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ColumnDescription < ActiveRecord::Base
  belongs_to :table
end
