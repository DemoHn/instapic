# test_image.py
# test image model
from core import create_app
from core.models import db
from core.models.image import Image

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
    yield db
    # teardown
    db.drop_all()

def test_create_image(connect_db):
  cdb = connect_db
  new_image = Image(user_id=1, detail_url='detail_url', thumbnail_url='thumbnail_url')

  cdb.session.add(new_image)
  cdb.session.commit()

def test_ensure_url_nonempty(connect_db):
  s = connect_db.session

  new_image = Image(detail_url='1')
  new_image_2 = Image(thumbnail_url='2')

  with pytest.raises(Exception):
    s.add(new_image)
    s.commit()

  with pytest.raises(Exception):
    s.add(new_image_2)
    s.commit()

def test_delete(connect_db):
  s = connect_db.session

  new_image = Image(user_id=1, detail_url='1', thumbnail_url='2')
  # create data first
  s.add(new_image)
  s.commit()
  # query data
  imgs = s.query(Image).all()
  assert imgs == [new_image]
  # remove row
  s.delete(new_image)
  s.commit()

  imgs = s.query(Image).all()
  assert imgs == []