from . import db

class Image(db.Model):
  __tablename__ = 'images'
  # id: the primary key
  id = db.Column(db.Integer, primary_key=True)

  # for performance consideration, we separate a image to 2 part:
  #    1) detail, stores the original image
  #    2) thumbnail, stores the compressed image for preview
  detail_url = db.Column(db.Text, nullable=False)
  
  thumbnail_url = db.Column(db.Text, nullable=False)
  
  # created_at
  created_at = db.Column(db.DateTime, nullable=False)
  
  # updated_at
  updated_at = db.Column(db.DateTime, nullable=False)