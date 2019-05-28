import pytest
from core import create_app
from core.services.post_service import (
  validate_image_ids,
  validate_image_items,
  create_post,
  get_post_response
)
# models
from core.models import db
from core.models.image import Image
from core.models.post_image import PostImage
from core.models.user import User
from core.models.post import Post
# errors
from core.errors import ValidationException

test_config = {
  'SECRET_KEY': '<secret>',
  'TESTING': True,
  'PBKDF2_ITERATION_TIMES': 1000,
  'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:'
}

image_fixtures = [
  Image(id=1, user_id = 10, detail_url='A', thumbnail_url='B'),
  Image(id=2, user_id = 10, detail_url='C', thumbnail_url='B'),
  Image(id=3, user_id = 10, detail_url='D', thumbnail_url='B'),
  Image(id=4, user_id = 10, detail_url='E', thumbnail_url='B'),
  Image(id=5, user_id = 11, detail_url='A', thumbnail_url='B'),
  Image(id=6, user_id = 12, detail_url='A', thumbnail_url='B'),
]

@pytest.fixture()
def new_app():
  app = create_app(test_config)
  with app.app_context():
    yield app

@pytest.fixture()
def insert_images_db():
  app = create_app(test_config)
  with app.app_context():
    db.session.bulk_save_objects(image_fixtures)
    db.session.commit()
    yield db
    # teardown
    db.drop_all()

# private functions
def test_validate_image_ids(insert_images_db):
  # add image data
  valid_user = 10
  valid_image_ids = [1,2,3,4]
  # if not throw error, that's the biggest victory LOL
  validate_image_ids(valid_user, valid_image_ids)

def test_validate_image_ids_wrong_user(insert_images_db):
  valid_user = 10
  image_ids = [1,2,3,5] # 5 is from user: 11, so it's invalid

  with pytest.raises(ValidationException):
    validate_image_ids(valid_user, image_ids)

def test_validate_image_ids_fail_new_ids(insert_images_db):
  valid_user = 10
  image_ids = [1,2,3,100] # 100 is additional, so it's invalid

  with pytest.raises(ValidationException):
    validate_image_ids(valid_user, image_ids)

# validate image items length
def test_validate_image_items(new_app):
  valid_items = [1,2,3,5] # within 1 <= x <= 4, pass
  validate_image_items(valid_items)

def test_validate_image_items_greater_then_max(new_app):
  invalid_items = [1,2,3,5,7,8,9]
  with pytest.raises(ValidationException):
    validate_image_items(invalid_items)

def test_validate_image_items_lower_then_min(new_app):
  invalid_items = [] # within
  with pytest.raises(ValidationException):
    validate_image_items(invalid_items)

# # get post response
# def test_get_post_response(insert_images_db):
#   idb = insert_images_db
#   # new user
#   new_user = User(id=10, name='A', password_hash='B')

#   idb.session.add(new_user)
#   idb.session.commit()
#   # new post data
#   new_post = Post(user_id=new_user.id)

#   idb.session.add(new_post)
#   idb.session.commit()
#   # post image data
#   new_post_images = [
#     PostImage(image_id=4, post_id=new_post.id),
#     PostImage(image_id=3, post_id=new_post.id)
#   ]

#   idb.session.bulk_save_objects(new_post_images)
#   idb.session.commit()

#   data = get_post_response(new_post.id)
#   print(data[0].images[0].image)
#   assert 0