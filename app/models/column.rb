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

  validates :name, :format => { :with => /[a-zA-Z]/,
    message: "gimme at least one letter" }

  after_validation :normalize

  belongs_to :table

  def normalize
    self.name = self.name.strip.gsub(/\s+/, "_").gsub(/\W/, '').gsub(/\d*/, '').downcase
  end

end
