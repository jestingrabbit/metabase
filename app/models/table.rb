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

  validates :plural, :format => { :with => /[a-zA-Z]/,
    message: "gimme at least one letter" }

  after_validation :normalize

  belongs_to :database
  has_many :columns, :dependent => :destroy

  def normalize
    self.plural = self.plural.strip.gsub(/\s+/, "_").gsub(/\W/, '').gsub(/\d*/, '').downcase.pluralize #fingers crossed
    self.singular = self.plural.pluralize(1)
  end

end
