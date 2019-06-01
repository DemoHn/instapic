# test_post_image.py
# test if PostImage model works
from core import create_app
from core.models import db
from core.models.image import Image
from core.models.post_image import PostImage

import pytest
test_config = {
  'TESTING': True,
  'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:'
}

@pytest.fixture()
def connect_db():
  # setup
  app = create_app(test_config)
  with app.app_context():
    # add example image
    new_image = Image(user_id=1, detail_url='detail_url', thumbnail_url='thumbnail_url')
    new_image2 = Image(user_id=2, detail_url='detail_url2', thumbnail_url='thumbnail_url2')    
    # add example data
    db.session.bulk_save_objects([new_image, new_image2])
    db.session.commit()
        
    yield db
    # teardown
    db.drop_all()

def test_create_post_image(connect_db):
  cdb = connect_db
  new_post_image = PostImage(post_id=1, image_id=1)

  # should success
  cdb.session.add(new_post_image)
  cdb.session.commit()

def test_has_relationship(connect_db):
  cdb = connect_db
  new_post_image = PostImage(post_id=1, image_id=1)

  # should create success
  cdb.session.add(new_post_image)
  cdb.session.commit()

  # should get its related table
  data = cdb.session.query(PostImage).join(PostImage.image).filter_by(user_id=1).first()
  assert data.post_id == 1
  assert data.image_id == 1
  # get image info
  assert data.image.detail_url == 'detail_url'