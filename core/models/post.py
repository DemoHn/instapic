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

  # relationship
  # get posts' user
  user = db.relationship('User', foreign_keys=[user_id], primaryjoin='Post.user_id == User.id', uselist=False)
  # get posts' uploading images
  images = db.relationship('PostImage', foreign_keys=[id], primaryjoin='Post.id == PostImage.post_id', uselist=True)