# test_user.py
# test users model
from core import create_app
from core.models import db
from core.models.user import User

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

def test_create_user(connect_db):  
  cdb = connect_db
  new_user = User(name='sample', password_hash='hash')  
  # should create successfully without errors
  cdb.session.add(new_user)
  cdb.session.commit()

def test_create_user_again(connect_db):
  cdb = connect_db
  new_user = User(name='s1', password_hash='hash')
  new_user2 = User(name='s1', password_hash='hash2')
  # should create successfully without errors  
  cdb.session.add(new_user)
  cdb.session.add(new_user2)

  with pytest.raises(Exception):
    cdb.session.commit()

def test_delete(connect_db):
  cdb = connect_db

  new_user = User(name='sample_delete', password_hash='hash')  
  # create data first
  cdb.session.add(new_user)
  cdb.session.commit()
  # query data
  users = cdb.session.query(User).all()
  assert users == [new_user]
  # remove row
  cdb.session.delete(new_user)
  cdb.session.commit()

  users = cdb.session.query(User).all()
  assert users == []

