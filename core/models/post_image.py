from . import db

# model PostImage stores the relationship between post and image
# since one post may have multiple images
class PostImage(db.Model):
  __tablename__ = 'post_images'
  # id: the primary key
  id = db.Column(db.Integer, primary_key=True)

  post_id = db.Column(db.Integer, nullable=False)

  image_id = db.Column(db.Integer, nullable=False)

  # created_at
  created_at = db.Column(db.DateTime, nullable=False)

  # updated_at
  updated_at = db.Column(db.DateTime, nullable=False)