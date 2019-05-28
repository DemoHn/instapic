from . import db

class Post(db.Model):
  __tablename__ = 'posts'
  # id: post id, the primary key
  id = db.Column(db.Integer, primary_key=True)

  # post create user
  user_id = db.Column(db.Integer, nullable=False)
  
  # description: a detailed text edited by user for this post
  description = db.Column(db.Text, nullable=True)
  
  # created_at
  created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

  # updated_at
  updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), server_onupdate=db.func.now())