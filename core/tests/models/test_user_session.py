# test_user.py
# test users model
from core import create_app
from core.models import db
from core.models.user_session import UserSession

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
  new_user = UserSession(user_id=1, token='token')  
  # should create successfully without errors
  cdb.session.add(new_user)
  cdb.session.commit()


def test_delete(connect_db):
  cdb = connect_db
  
  new_user = UserSession(user_id=1, token='token') 
  # create data first
  cdb.session.add(new_user)
  cdb.session.commit()
  # query data
  users = cdb.session.query(UserSession).all()
  assert users == [new_user]
  # remove row
  cdb.session.delete(new_user)
  cdb.session.commit()

  users = cdb.session.query(UserSession).all()
  assert users == []

