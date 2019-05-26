from . import db

class UserSession(db.Model):
  __tablename__ = 'user_sessions'
  # id: user id, the primary key
  id = db.Column(db.Integer, primary_key=True)

  # user_id, no foreign key with user_id for better migration and
  # testing, but it requires carefully checking (whether user exists) on service layer!
  user_id = db.Column(db.Integer, nullable=False)
  
  # user token, can be existed for many times for one user
  token = db.Column(db.String(255), unique=False, nullable=False)

  # created_at
  created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

  # updated_at
  updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), server_onupdate=db.func.now())