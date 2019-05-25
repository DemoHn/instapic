from . import db

class Post(db.Model):
  __tablename__ = 'posts'
  # id: post id, the primary key
  id = db.Column(db.Integer, primary_key=True)

  # description: a detailed text edited by user for this post
  description = db.Column(db.Text, nullable=True)
  
  # created_at
  created_at = db.Column(db.DateTime, nullable=False)
  
  # updated_at
  updated_at = db.Column(db.DateTime, nullable=False)