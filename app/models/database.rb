# == Schema Information
#
# Table name: databases
#
#  id         :integer          not null, primary key
#  name       :string
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Database < ActiveRecord::Base
  belongs_to :user
  has_many :tables, :dependent => :destroy
  has_many :associations, :dependent => :destroy
end
