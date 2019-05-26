from . import db

class User(db.Model):
  __tablename__ = 'users'
  # id: user id, the primary key
  id = db.Column(db.Integer, primary_key=True)

  # name: username
  name = db.Column(db.String(80), unique=True, nullable=False)

  # passwordhash: password has
  password_hash = db.Column(db.Text, nullable=False)

  # created_at
  created_at = db.Column(db.DateTime, nullable=False)

  # updated_at
  updated_at = db.Column(db.DateTime, nullable=False)

  def __repr__(self):
    return '<User {}>'.format(self.name)