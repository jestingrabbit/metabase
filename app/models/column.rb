# == Schema Information
#
# Table name: columns
#
#  id         :integer          not null, primary key
#  name       :string
#  data_type  :string
#  rank       :integer
#  color      :string
#  table_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Column < ActiveRecord::Base
  belongs_to :table
end
