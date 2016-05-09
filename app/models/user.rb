# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string
#  email           :string
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :email, :name, :uniqueness => true
  validates :name, :format => {
    :without => /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/,
    :message => "don't make your username look like an email"
  }
  validates :email, :format => {
    :with => /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/,
    :message => "make your email look like an email"
  }

  has_secure_password
  has_many :databases
end
