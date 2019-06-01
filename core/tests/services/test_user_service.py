import pytest
from core import create_app
from core.services.user_service import (
  generate_hash,
  verify_hash,
  register_user,
  generate_random_token
)
test_config = {
  'SECRET_KEY': '<secret>',
  'TESTING': True,
  'PBKDF2_ITERATION_TIMES': 1000,
  'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:'
}

@pytest.fixture()
def new_app():
  app = create_app(test_config)
  with app.app_context():
    yield app

def test_generate_hash(new_app):
  word = 'asdf'
  h1 = generate_hash(word)
  h2 = generate_hash(word)
  # should be different by times
  assert h1 != h2  

def test_verify_hash(new_app):
  word = 'asdfg'
  passhash = generate_hash(word)
  assert verify_hash(word, passhash)

  # should be differenet
  new_word = 'asdfg_new_word'
  assert verify_hash(new_word, passhash) == False

def test_generate_random_token(new_app):
  tok1 = generate_random_token()
  tok2 = generate_random_token()
  
  assert tok1 != tok2
  assert len(tok1) == 64  
  assert len(tok2) == 64

def test_register_success(new_app):
  pass

def test_register_dup_error(new_app):
  pass