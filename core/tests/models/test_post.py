from core import create_app
from core.models import db
from core.models.post import Post
from core.models.user import User
from core.models.post_image import PostImage
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
    exp_user = User(name='name', password_hash='hash')
    exp_image = Image(user_id=1, detail_url='detail', thumbnail_url='thumbnail')
    exp_post_image = PostImage(post_id=1, image_id=1)

    for obj in [exp_user, exp_image, exp_post_image]:
      db.session.add(obj)
      db.session.commit()
    yield db
    # teardown
    db.drop_all()

def test_create_post(connect_db):
  cdb = connect_db
  new_post = Post(user_id=1, description='desc')
  # should create success
  cdb.session.add(new_post)
  cdb.session.commit()

def test_relationship(connect_db):
  cdb = connect_db
  new_post = Post(user_id=1, description='desc')
  # should create success
  cdb.session.add(new_post)
  cdb.session.commit()

  # query with join
  data = (cdb.session.query(Post)
    .join(Post.images)
    .join(PostImage.image)  
    .join(Post.user)).first()

  assert data.user.name == 'name'
  assert len(data.images) == 1
  assert data.images[0].image.detail_url == 'detail'

  
